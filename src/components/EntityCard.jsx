import { useId, useState } from "react";

export default function EntityCard({ entity, onTagClick, initiallyExpanded = false }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const hid = useId();

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(entity.source || "");
    } catch {}
  };

  return (
    <article className="card h-100 shadow-sm" aria-labelledby={`${hid}-title`}>
      <div className="card-body d-flex flex-column">
        <header className="mb-2">
          <h3 id={`${hid}-title`} className="card-title h5 mb-1">
            {entity.name}
          </h3>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="badge bg-primary border-0"
              onClick={() => onTagClick?.("country", entity.country)}
            >
              {entity.country}
            </button>
            <button
              type="button"
              className="badge bg-success border-0"
              onClick={() => onTagClick?.("sector", entity.sector)}
            >
              {entity.sector}
            </button>
          </div>
        </header>

        <section className="mb-2">
          <p className={`card-text ${expanded ? "" : "text-truncate"}`} style={!expanded ? { WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}>
            <strong>Coinvolgimento:</strong> {entity.involvement}
          </p>
          <button
            type="button"
            className="btn btn-link p-0 small"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Comprimi" : "Espandi"}
          </button>
        </section>

        <footer className="mt-auto pt-2 border-top small text-muted d-flex align-items-center gap-2">
          <span className="fw-semibold">Fonte:</span>
          <span>{entity.source}</span>
          {entity.source && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={copySource}
                className="btn btn-outline-secondary btn-sm py-0"
              >
                Copia
              </button>
            </>
          )}
        </footer>
      </div>
    </article>
  );
}
