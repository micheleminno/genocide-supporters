import { useEffect, useState } from "react";

export default function SiteFooter({
  lastUpdated = "2025-08-11",
  pdfUrl = "Rapporto-Francesca-Albanese.pdf",
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
  }, [controlledLang]);

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
    <footer className="mt-12 border-t bg-white/70 backdrop-blur dark:bg-neutral-900/70 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Licenza */}
        <section aria-labelledby="license-title">
          <h2 id="license-title" className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {L.license}
          </h2>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {L.contentsUnder}{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400"
            >
              CC BY-NC-SA 4.0
            </a>.
          </p>

          {/* Badge CC ufficiali */}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Creative Commons BY-NC-SA 4.0"
            title="Creative Commons BY-NC-SA 4.0"
          >
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" width="22" height="22" className="dark:invert" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" width="22" height="22" className="dark:invert" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" width="22" height="22" className="dark:invert" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" width="22" height="22" className="dark:invert" />
          </a>

          <ul className="mt-3 space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
            <li>• BY — Attribution</li>
            <li>• NC — Non Commercial</li>
            <li>• SA — Share Alike</li>
          </ul>
        </section>

        {/* Risorse */}
        <nav aria-labelledby="resources-title">
          <h2 id="resources-title" className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {L.resources}
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a href={pdfUrl} className="underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400">
                📄 {L.report}
              </a>
            </li>
            {repoUrl && (
              <li>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400"
                >
                  🧩 {L.source}
                </a>
              </li>
            )}
            <li>
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.it"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400"
              >
                ⚖️ {L.legal}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contatti */}
        <address className="not-italic" aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {L.contact}
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            {contactEmail && (
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400"
                >
                  ✉️ {contactEmail}
                </a>
              </li>
            )}
            <li className="text-neutral-600 dark:text-neutral-400">{L.location}</li>
          </ul>
        </address>

        {/* Info + Switch lingua */}
        <section aria-labelledby="info-title">
          <h2 id="info-title" className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {L.info}
          </h2>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {L.lastUpdate}:{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>

          {/* Switch lingua */}
          <div className="mt-4 inline-flex rounded-full border overflow-hidden">
            <button
              type="button"
              onClick={() => changeLang("it")}
              className={`text-xs px-3 py-2 ${lang === "it" ? "bg-red-600 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => changeLang("en")}
              className={`text-xs px-3 py-2 border-l ${lang === "en" ? "bg-red-600 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
            >
              EN
            </button>
          </div>

          {/* Utility */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={privacyUrl} className="text-xs underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400">
              {L.privacy}
            </a>
            <span className="text-neutral-400 text-xs">•</span>
            <a href={cookiePolicyUrl} className="text-xs underline underline-offset-4 hover:text-red-700 dark:hover:text-red-400">
              {L.cookies}
            </a>
            <span className="text-neutral-400 text-xs">•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs px-3 py-1.5 rounded-full border hover:border-red-400 hover:text-red-700 dark:hover:text-red-400"
            >
              ⤴︎ {L.backToTop}
            </button>
            <button
              type="button"
              onClick={() => {
                const root = document.documentElement;
                root.classList.toggle("dark");
                localStorage.setItem("color-scheme", root.classList.contains("dark") ? "dark" : "light");
              }}
              className="text-xs px-3 py-1.5 rounded-full border hover:border-red-400 hover:text-red-700 dark:hover:text-red-400"
            >
              🌓
            </button>
          </div>
        </section>
      </div>

      {/* Barra inferiore */}
      <div className="border-t dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} — Dati dal Rapporto ONU di Francesca Albanese.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1">
              <span aria-hidden>🏷️</span>
              <span>{version}</span>
            </span>
            <span className="hidden sm:inline">{L.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
