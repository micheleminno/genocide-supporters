import { useId, useState } from "react";

export default function EntityCard({ entity, onTagClick, initiallyExpanded = false }) {
  const [expandedInvolvement, setExpandedInvolvement] = useState(initiallyExpanded);
  const [expandedSource, setExpandedSource] = useState(false);
  const hid = useId();

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(entity.source || "");
    } catch {}
  };

  return (
    <article className="card h-100 shadow-sm" aria-labelledby={`${hid}-title`}>
      <div className="card-body d-flex flex-column">
        {/* Titolo */}
        <header className="mb-2">
          <h3 id={`${hid}-title`} className="card-title h5 mb-1">{entity.name}</h3>

          {/* Badge Paese / Settore */}
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="badge bg-primary border-0"
              onClick={() => onTagClick?.("country", entity.country)}
              title={`Filtra per paese: ${entity.country}`}
            >
              {entity.country}
            </button>
            <button
              type="button"
              className="badge bg-success border-0"
              onClick={() => onTagClick?.("sector", entity.sector)}
              title={`Filtra per settore: ${entity.sector}`}
            >
              {entity.sector}
            </button>
          </div>
        </header>

        {/* Coinvolgimento */}
        <section className="mb-2" aria-labelledby={`${hid}-inv`}>
          <h4 id={`${hid}-inv`} className="visually-hidden">Coinvolgimento</h4>
          <p className={`card-text ${expandedInvolvement ? "" : "clamp-1"}`}>
            <strong>Coinvolgimento:</strong> {entity.involvement}
          </p>
          <button
            type="button"
            className="btn btn-link p-0 small"
            onClick={() => setExpandedInvolvement(v => !v)}
            aria-expanded={expandedInvolvement}
            aria-controls={`${hid}-inv-text`}
          >
            {expandedInvolvement ? "Riduci" : "Espandi"}
          </button>
        </section>

        {/* Fonte */}
        <footer className="mt-auto pt-2 border-top" aria-labelledby={`${hid}-src`}>
          <h4 id={`${hid}-src`} className="visually-hidden">Fonte</h4>
          <div className="small text-muted d-flex flex-column gap-2">
            <div>
              <span className="fw-semibold me-1">Fonte:</span>
              <span className={expandedSource ? "" : "clamp-1"}>{entity.source}</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-link p-0 small"
                onClick={() => setExpandedSource(v => !v)}
                aria-expanded={expandedSource}
              >
                {expandedSource ? "Riduci" : "Espandi"}
              </button>

              {entity.source && (
                <>
                  <span className="text-body-tertiary">•</span>
                  <button
                    type="button"
                    onClick={copySource}
                    className="btn btn-outline-secondary btn-sm py-0"
                    title="Copia fonte"
                  >
                    Copia
                  </button>
                </>
              )}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
