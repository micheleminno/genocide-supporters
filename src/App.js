import "./styles.css";
import React, { useState } from "react";
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Entità Coinvolte nel Genocidio e nell’Occupazione (Rapporto ONU 2025)
      </h1>

      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setFilterCountry(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tutti i Paesi</option>
          {uniqueCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setFilterSector(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tutti i Settori</option>
          {uniqueSectors.map((sector, i) => (
            <option key={i} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredEntities.map((entity, index) => (
          <div key={index} className="border p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{entity.name}</h2>
            <p>
              <strong>Paese:</strong> {entity.country}
            </p>
            <p>
              <strong>Settore:</strong> {entity.sector}
            </p>
            <p>
              <strong>Coinvolgimento:</strong> {entity.involvement}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Fonte:</strong> {entity.source}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <a href="Rapporto-Francesca-Albanese.pdf" className="underline">
          Consulta il documento completo originale (PDF)
        </a>
      </div>
    </div>
  );
}
