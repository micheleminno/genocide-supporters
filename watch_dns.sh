#!/usr/bin/env bash
set -euo pipefail

DOMAIN="genocidesupporters.org"
WWW="www.${DOMAIN}"
RESOLVERS=("8.8.8.8" "1.1.1.1" "9.9.9.9")
NETLIFY_NS=("dns1.p01.nsone.net." "dns2.p01.nsone.net." "dns3.p01.nsone.net." "dns4.p01.nsone.net.")
OK_IP_REGEX='^(75\.2\.60\.5|99\.83\.190\.102)$'   # Netlify LB IP fallback/legacy (ok se ne vedi uno dei due)

check_ns() {
  for r in "${RESOLVERS[@]}"; do
    got=$(dig NS "$DOMAIN" +short @"$r" | sort)
    for need in "${NETLIFY_NS[@]}"; do
      grep -q "^${need}$" <<<"$got" || return 1
    done
  done
}

check_apex() {
  for r in "${RESOLVERS[@]}"; do
    a=$(dig +short "$DOMAIN" @"$r" | head -n1)
    [[ "$a" =~ $OK_IP_REGEX ]] || return 1
  done
}

check_www() {
  for r in "${RESOLVERS[@]}"; do
    cname=$(dig CNAME +short "$WWW" @"$r" | tr '[:upper:]' '[:lower:]')
    [[ "$cname" == "genocidesupporters.netlify.app." ]] || return 1
  done
}

echo "Monitor DNS per $DOMAIN (CTRL+C per uscire)…"
while true; do
  ts=$(date "+%H:%M:%S")
  if check_ns && check_apex && check_www; then
    echo "[$ts] ✅ Propagazione OK su tutti i resolver."
    # Notifica macOS
    osascript -e 'display notification "DNS propagato: puoi fare Renew SSL su Netlify" with title "Netlify DNS"'
    say "DNS propagato per genocidesupporters dot org"
    exit 0
  else
    echo "[$ts] ⏳ Ancora in propagazione…"
  fi
  sleep 600   # 10 minuti
done
