import "./styles.css";
import React, { useState } from "react";
import EntityCard from "./components/EntityCard";
import SiteFooter from "./components/SiteFooter";
import entities from "./entities.json";

export default function EntityList() {
  const [filterCountry, setFilterCountry] = useState("");
  const [filterSector, setFilterSector] = useState("");

  const filteredEntities = entities.filter((e) => {
    return (
      (!filterCountry || e.country === filterCountry) &&
      (!filterSector || e.sector === filterSector)
    );
  });

  const uniqueCountries = [...new Set(entities.map((e) => e.country))];
  const uniqueSectors = [...new Set(entities.map((e) => e.sector))];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <nav
            aria-label="Intestazione sito"
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-red-700">
                Entità coinvolte nel genocidio dei Palestinesi e nell’occupazione della Palestina
              </h1>
              <p className="text-sm text-gray-600">
                Dati tratti dal Rapporto ONU di Francesca Albanese e altre fonti ONU – 2025
              </p>
            </div>

            {/* Contatore risultati (aggiornato dinamicamente) */}
            <div
              aria-live="polite"
              className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1 w-fit"
            >
              {filteredEntities.length} risult{filteredEntities.length === 1 ? "ato" : "ati"}
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sezione filtri */}
        <section
          aria-labelledby="filters-title"
          className="bg-white rounded-2xl shadow-sm border mt-6"
        >
          <div className="p-4 sm:p-6">
            <h2 id="filters-title" className="text-base font-semibold mb-4">
              Filtra risultati
            </h2>

            <form
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-end"
              aria-describedby="filters-help"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Paese
                </label>
                <select
                  id="country"
                  value={filterCountry || ""}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="">Tutti i Paesi</option>
                  {uniqueCountries.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="sector" className="text-sm font-medium text-gray-700">
                  Settore
                </label>
                <select
                  id="sector"
                  value={filterSector || ""}
                  onChange={(e) => setFilterSector(e.target.value)}
                  className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="">Tutti i Settori</option>
                  {uniqueSectors.map((sector, i) => (
                    <option key={i} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spazio espandibile: es. barra ricerca o ordinamento in futuro */}
              <div className="hidden lg:block" />
            </form>

            <p id="filters-help" className="sr-only">
              Usa i menu per filtrare per Paese e Settore.
            </p>
          </div>

          <div className="border-t" />
        </section>

        {/* Lista risultati */}
        <section aria-labelledby="results-title" className="mt-6">
          <h2 id="results-title" className="sr-only">
            Risultati
          </h2>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEntities.map((entity, index) => (
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEntities.map((entity, i) => (
                  <EntityCard
                    key={i}
                    entity={entity}
                    onTagClick={(type, value) => {
                      if (type === "country") setFilterCountry(value);
                      if (type === "sector") setFilterSector(value);
                      // scroll in alto ai filtri (opzionale)
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Stato vuoto */}
          {filteredEntities.length === 0 && (
            <div className="mt-10 text-center text-sm text-gray-600">
              Nessun risultato. Prova a modificare i filtri.
            </div>
          )}
        </section>

        {/* Link documento */}
        <aside className="mt-8">
          <a
            href="Rapporto-Francesca-Albanese.pdf"
            className="inline-flex items-center gap-2 text-sm underline hover:text-red-700"
          >
            <span aria-hidden>📄</span>
            Consulta il rapporto ONU di Francesca Albanese (PDF)
          </a>
        </aside>
      </main>

      {/* Footer */}
      <SiteFooter
        lastUpdated="2025-08-11"
        pdfUrl="/Rapporto-Francesca-Albanese.pdf"
        contactEmail="michele@example.org"
        repoUrl="https://github.com/tuo-repo"
        privacyUrl="/privacy"
        cookiePolicyUrl="/cookie-policy"
        version="v1.3.2"
      />
    </div>
  );
}
