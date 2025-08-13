#!/usr/bin/env bash
set -euo pipefail

DOMAIN="genocidesupporters.org"
WWW="www.${DOMAIN}"

# Resolver pubblici per confronti incrociati
RESOLVERS=("8.8.8.8" "1.1.1.1" "9.9.9.9")

ok=true
hr(){ printf '%*s\n' 60 | tr ' ' '─'; }

echo "🔍 Controllo DNS/HTTP/HTTPS per: $DOMAIN"
hr

# 1) Nameserver: accetta qualsiasi pool p0X (p01, p02, ...)
echo "🧭 Nameserver attesi (Netlify / NS1, qualsiasi pool p0X):"
echo "   dns[1-4].p0X.nsone.net."
echo "🧭 Nameserver risolti:"
ns_all_ok=true
ns_regex='^dns[1-4]\.p0[0-9]+\.nsone\.net\.$'
for r in "${RESOLVERS[@]}"; do
  got="$(dig NS "$DOMAIN" +short @"$r" | sort)"
  echo "   [$r]"
  if [[ -n "$got" ]]; then
    awk '{print "     • "$0}' <<<"$got"
  else
    echo "     • —"
    ns_all_ok=false
  fi
  # Verifica che ci siano (almeno) quattro NS e che tutti combacino col pattern NS1 p0X
  cnt=$(wc -l <<<"$got" | tr -d ' ')
  if (( cnt < 4 )); then ns_all_ok=false; fi
  while read -r ns; do
    [[ "$ns" =~ $ns_regex ]] || ns_all_ok=false
  done <<<"$got"
done
$ns_all_ok && echo "   ✅ Nameserver OK su tutti i resolver" || { echo "   ❌ Nameserver non uniformi / non NS1"; ok=false; }
hr

# 2) A/AAAA apex per resolver
echo "🌐 Record A/AAAA per $DOMAIN (per resolver):"
for r in "${RESOLVERS[@]}"; do
  a="$(dig +short A "$DOMAIN" @"$r")"
  aaaa="$(dig +short AAAA "$DOMAIN" @"$r")"
  echo "   [$r]"
  [[ -n "$a"    ]] && awk '{print "     • A     " $0}' <<<"$a"    || echo "     • A     —"
  [[ -n "$aaaa" ]] && awk '{print "     • AAAA  " $0}' <<<"$aaaa" || echo "     • AAAA  —"
  [[ -z "$a$aaaa" ]] && { echo "     ❌ non risolve"; ok=false; }
done
hr

# 2b) www: con Netlify DNS spesso c'è flattening (niente CNAME)
echo "🔗 Controllo $WWW:"
for r in "${RESOLVERS[@]}"; do
  cn="$(dig CNAME +short "$WWW" @"$r" | tr '[:upper:]' '[:lower:]')"
  if [[ -n "$cn" ]]; then
    echo "   [$r] $cn"
    # opzionale: se vuoi imporre un CNAME specifico, scommenta e adatta la riga sotto
    # [[ "$cn" == "genocidesupporters.netlify.app." ]] || { echo "     ❌ CNAME inatteso su $r"; ok=false; }
  else
    echo "   [$r] — (flattening)"
  fi
done
hr

# 3) HTTP/HTTPS headers
echo "📡 HTTP headers:"
http_h="$(curl -sI "http://$DOMAIN" --connect-timeout 8 || true)"
if [[ -n "$http_h" ]]; then
  echo "$http_h" | sed 's/^/   /'
  echo "$http_h" | grep -qi '^Server:.*Netlify' || { echo "   ❌ Server HTTP non sembra Netlify"; ok=false; }
else
  echo "   ❌ Nessuna risposta HTTP"
  ok=false
fi
hr

echo "🔒 HTTPS headers:"
https_h="$(curl -sI "https://$DOMAIN" --connect-timeout 8 || true)"
if [[ -n "$https_h" ]]; then
  echo "$https_h" | sed 's/^/   /'
  echo "$https_h" | grep -qi '^Server:.*Netlify' || { echo "   ❌ Server HTTPS non sembra Netlify"; ok=false; }
else
  echo "   ❌ Nessuna risposta HTTPS"
  ok=false
fi
hr

# 4) Certificato TLS — parsing robusto della data su macOS (BSD date) e Linux (GNU date)
echo "🧾 Certificato TLS (estratto):"

parse_openssl_notafter() {
  # Input: stringa completa "Nov 10 07:58:00 2025 GMT"
  local s="$1" epoch=""
  # Tentativo macOS/BSD:
  if date -u -j -f "%b %d %T %Y %Z" "$s" "+%s" >/dev/null 2>&1; then
    epoch="$(date -u -j -f "%b %d %T %Y %Z" "$s" "+%s")"
    echo "$epoch"; return 0
  fi
  # Tentativo GNU coreutils:
  if date -u -d "$s" "+%s" >/dev/null 2>&1; then
    epoch="$(date -u -d "$s" "+%s")"
    echo "$epoch"; return 0
  fi
  return 1
}

if command -v openssl >/dev/null 2>&1; then
  cert="$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName 2>/dev/null || true)"
  if [[ -n "$cert" ]]; then
    echo "$cert" | sed 's/^/   /'
    # CN deve contenere il dominio
    if ! echo "$cert" | grep -qi "CN=.*$DOMAIN"; then
      echo "   ❌ CN non contiene il dominio atteso"
      ok=false
    fi
    # Scadenza
    not_after="$(sed -n 's/^notAfter=\(.*\)$/\1/p' <<<"$cert")"
    if [[ -n "$not_after" ]]; then
      now_epoch="$(date -u +%s)"
      if expiry_epoch="$(parse_openssl_notafter "$not_after")"; then
        if (( expiry_epoch <= now_epoch )); then
          echo "   ❌ Certificato scaduto ($not_after)"
          ok=false
        fi
      else
        echo "   ⚠️ impossibile interpretare la data di scadenza"
      fi
    else
      echo "   ⚠️ campo notAfter non trovato"
    fi
  else
    echo "   ❌ impossibile leggere il certificato con openssl"
    ok=false
  fi
else
  echo "   ℹ️ openssl non disponibile: salto i dettagli del certificato"
fi
hr

if $ok; then
  echo "✅ Tutto OK: NS → Netlify, DNS risolve, HTTP/HTTPS su Netlify, TLS valido"
  exit 0
else
  echo "⚠️ Alcuni controlli non sono passati (vedi sopra)."
  exit 1
fi
