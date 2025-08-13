import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useMemo, useState } from "react";
import EntityCard from "./components/EntityCard";
import SiteFooter from "./components/SiteFooter";
import entities from "./entities.json";

export default function EntityList() {
  const [filterCountry, setFilterCountry] = useState("");
  const [filterSector, setFilterSector] = useState("");

  // Liste uniche per i filtri (ordinate)
  const uniqueCountries = useMemo(
    () => [...new Set(entities.map((e) => e.country))].sort(),
    []
  );
  const uniqueSectors = useMemo(
    () => [...new Set(entities.map((e) => e.sector))].sort(),
    []
  );

  // Lista filtrata e deduplicata
  const filteredEntities = useMemo(() => {
    let list = entities;
    if (filterCountry) list = list.filter((e) => e.country === filterCountry);
    if (filterSector) list = list.filter((e) => e.sector === filterSector);

    const seen = new Set();
    return list.filter((e) => {
      const key = `${e.name}|${e.country}|${e.sector}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [filterCountry, filterSector]);

  return (
    <div className="bg-light text-dark min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="border-bottom bg-white">
        <div className="container py-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end">
            <div>
              <h1 className="h3 text-danger fw-bold">
                Entità coinvolte nel genocidio dei Palestinesi e nell’occupazione della Palestina
              </h1>
              <p className="text-muted small mb-0">
                Dati tratti dal Rapporto ONU di Francesca Albanese e altre fonti ONU – 2025
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container flex-grow-1 py-4">
        {/* Filtri */}
        <section className="bg-white border rounded-3 shadow-sm p-4 mb-4">
          <h2 className="h6 mb-3">Filtra risultati</h2>
          <div className="row g-3">
            <div className="col-sm-6 col-lg-4">
              <label htmlFor="country" className="form-label">Paese</label>
              <select
                id="country"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="form-select"
              >
                <option value="">Tutti i Paesi</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label htmlFor="sector" className="form-label">Settore</label>
              <select
                id="sector"
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="form-select"
              >
                <option value="">Tutti i Settori</option>
                {uniqueSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Risultati */}
        <section>
          {/* ✅ Badge conteggio risultati */}
          <div className="my-3">
            <span className="badge bg-secondary fs-6">
              {filteredEntities.length} risult{filteredEntities.length === 1 ? "ato" : "ati"}
            </span>
          </div>

          <h2 className="visually-hidden">Risultati</h2>

          {filteredEntities.length > 0 ? (
            <div className="row g-4">
              {filteredEntities.map((entity) => (
                <div
                  key={`${entity.name}|${entity.country}|${entity.sector}`}
                  className="col-12 col-sm-6 col-lg-4 col-xl-3"
                >
                  <EntityCard
                    entity={entity}
                    onTagClick={(type, value) => {
                      if (type === "country") setFilterCountry(value);
                      if (type === "sector") setFilterSector(value);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted small py-5">
              Nessun risultato. Prova a modificare i filtri.
            </div>
          )}
        </section>

        {/* Link al documento */}
        <aside className="mt-4">
          <div className="alert alert-info d-flex align-items-center gap-2 mb-0" role="alert">
            <span role="img" aria-label="Documento">📄</span>
            <div>
              <a
                href="Rapporto-Francesca-Albanese.pdf"
                className="fw-semibold text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulta il rapporto ONU di Francesca Albanese (PDF)
              </a>
              <div className="small text-muted">
                Fonte ufficiale ONU – aggiornato al 2025
              </div>
            </div>
          </div>
        </aside>

      </main>

      {/* Footer */}
      <SiteFooter
        lastUpdated="2025-08-13"
        pdfUrl="/Rapporto-Francesca-Albanese.pdf"
        contactEmail="genocide_supporters@protonmail.com"
        repoUrl="https://github.com/micheleminno/genocide-supporters"
        privacyUrl="/privacy"
        cookiePolicyUrl="/cookie-policy"
        version="v1.0.0"
      />
    </div>
  );
}
