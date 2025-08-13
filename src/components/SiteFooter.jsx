import { useState, useEffect } from "react";

export default function SiteFooter({
  lastUpdated = "2025-08-11",
  pdfUrl = "/Rapporto-Francesca-Albanese.pdf",
  contactEmail = "info@example.org",
  repoUrl,
  privacyUrl = "/privacy",
  cookiePolicyUrl = "/cookie-policy",
  version = "v1.3.2",
  lang: controlledLang,
  onLangChange,
}) {
  const [lang, setLang] = useState(controlledLang || "it");

  const L = {
    it: {
      license: "Licenza",
      resources: "Risorse",
      contact: "Contatti",
      info: "Info",
      report: "Rapporto ONU (PDF)",
      source: "Codice sorgente",
      legal: "Testo legale licenza",
      lastUpdate: "Ultimo aggiornamento",
      backToTop: "Torna su",
      theme: "Tema chiaro/scuro",
      privacy: "Privacy",
      cookies: "Cookie",
      madeWith: "Fatto con ❤️ e rispetto per i diritti umani.",
      location: "Roma · Italia",
      contentsUnder: "Contenuti rilasciati con",
    },
    en: {
      license: "License",
      resources: "Resources",
      contact: "Contacts",
      info: "Info",
      report: "UN Report (PDF)",
      source: "Source code",
      legal: "License legal code",
      lastUpdate: "Last updated",
      backToTop: "Back to top",
      theme: "Light/Dark theme",
      privacy: "Privacy",
      cookies: "Cookies",
      madeWith: "Made with ❤️ and respect for human rights.",
      location: "Rome · Italy",
      contentsUnder: "Contents released under",
    },
  }[lang];

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (!controlledLang && saved && (saved === "it" || saved === "en")) {
      setLang(saved);
    }
  }, [controlledLang]);

  useEffect(() => {
    if (controlledLang && controlledLang !== lang) setLang(controlledLang);
  }, [controlledLang]); // eslint-disable-line

  const changeLang = (next) => {
    if (controlledLang) {
      onLangChange?.(next);
    } else {
      setLang(next);
      localStorage.setItem("lang", next);
      onLangChange?.(next);
    }
  };

  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Licenza */}
          <div className="col-md-3">
            <h5>{L.license}</h5>
            <p className="small mb-2">
              {L.contentsUnder}{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"
                target="_blank"
                rel="noopener noreferrer"
                className="link-dark"
              >
                CC BY-NC-SA 4.0
              </a>
            </p>
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"
              target="_blank"
              rel="noopener noreferrer"
              title="Creative Commons BY-NC-SA 4.0"
              className="d-inline-flex gap-1 mb-2"
            >
              <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" width="22" height="22" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" width="22" height="22" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" width="22" height="22" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" width="22" height="22" />
            </a>
            <ul className="list-unstyled small text-muted mb-0">
              <li>• BY — Attribution</li>
              <li>• NC — Non Commercial</li>
              <li>• SA — Share Alike</li>
            </ul>
          </div>

          {/* Risorse */}
          <div className="col-md-3">
            <h5>{L.resources}</h5>
            <ul className="list-unstyled small">
              <li>
                <a href={pdfUrl} className="link-dark">
                  📄 {L.report}
                </a>
              </li>
              {repoUrl && (
                <li>
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="link-dark">
                    🧩 {L.source}
                  </a>
                </li>
              )}
              <li>
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dark"
                >
                  ⚖️ {L.legal}
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div className="col-md-3">
            <h5>{L.contact}</h5>
            <ul className="list-unstyled small">
              {contactEmail && (
                <li>
                  <a href={`mailto:${contactEmail}`} className="link-dark">
                    ✉️ {contactEmail}
                  </a>
                </li>
              )}
              <li className="text-muted">{L.location}</li>
            </ul>
          </div>

          {/* Info + Switch lingua */}
          <div className="col-md-3">
            <h5>{L.info}</h5>
            <p className="small text-muted mb-2">
              {L.lastUpdate}:{" "}
              <time dateTime={lastUpdated}>
                {new Date(lastUpdated).toLocaleDateString(
                  lang === "it" ? "it-IT" : "en-GB",
                  { day: "2-digit", month: "long", year: "numeric" }
                )}
              </time>
            </p>

            {/* Switch lingua */}
            <div className="btn-group btn-group-sm mb-3" role="group" aria-label="Language switch">
              <button
                type="button"
                className={`btn ${lang === "it" ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => changeLang("it")}
              >
                IT
              </button>
              <button
                type="button"
                className={`btn ${lang === "en" ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => changeLang("en")}
              >
                EN
              </button>
            </div>

            {/* Link privacy e cookie */}
            <div className="d-flex flex-wrap gap-2 small mb-3">
              <a href={privacyUrl} className="link-dark">{L.privacy}</a>
              <span>•</span>
              <a href={cookiePolicyUrl} className="link-dark">{L.cookies}</a>
            </div>

            {/* Pulsanti utility */}
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                ⤴︎ {L.backToTop}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  const root = document.documentElement;
                  root.classList.toggle("dark");
                  localStorage.setItem("color-scheme", root.classList.contains("dark") ? "dark" : "light");
                }}
              >
                🌓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferiore */}
      <div className="border-top py-3 bg-white">
        <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted gap-2">
          <p className="mb-0">
            © {new Date().getFullYear()} — Dati dal Rapporto ONU di Francesca Albanese.
          </p>
          <div className="d-flex align-items-center gap-2">
            <span className="badge text-bg-light border">
              🏷️ {version}
            </span>
            <span>{L.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
