import { useId, useState } from "react";

export default function EntityCard({
  entity,
  onTagClick,           // opzionale: (type, value) => void
  anchor = true,         // se true, genera un id e un link di ancora
  initiallyExpanded = false,
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const hid = useId(); // per etichette aria
  const anchorId = anchor
    ? (entity.name || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")
    : undefined;

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(entity.source || "");
    } catch {
      // no-op
    }
  };

  return (
    <article
      id={anchorId}
      className="group relative rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:bg-neutral-900 dark:border-neutral-800"
      aria-labelledby={`${hid}-title`}
    >
      {/* Bordino accento su hover/focus */}
      <span className="pointer-events-none absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Titolo + ancora */}
      <header className="mb-3">
        <h3
          id={`${hid}-title`}
          className="text-lg sm:text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-100"
        >
          {entity.name}
        </h3>
        {anchor && (
          <a
            href={`#${anchorId}`}
            className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-red-700 underline underline-offset-4 dark:text-neutral-400 dark:hover:text-red-400"
            title="Link diretto a questa entità"
          >
            <span aria-hidden>🔗</span>
            Link diretto
          </a>
        )}
      </header>

      {/* Meta: Paese e Settore */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onTagClick?.("country", entity.country)}
          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200"
          aria-label={`Filtra per paese: ${entity.country}`}
          title={`Filtra per paese: ${entity.country}`}
        >
          🌍 <span>{entity.country}</span>
        </button>

        <button
          type="button"
          onClick={() => onTagClick?.("sector", entity.sector)}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200"
          aria-label={`Filtra per settore: ${entity.sector}`}
          title={`Filtra per settore: ${entity.sector}`}
        >
          🏷️ <span>{entity.sector}</span>
        </button>
      </div>

      {/* Coinvolgimento con clamp + toggle */}
      <section aria-labelledby={`${hid}-involvement`} className="mb-3">
        <h4 id={`${hid}-involvement`} className="sr-only">Coinvolgimento</h4>
        <p className={`text-sm text-neutral-800 dark:text-neutral-200 ${expanded ? "" : "line-clamp-3"}`}>
          {entity.involvement}
        </p>
        {/* Toggle compare solo se testo lungo (sempre visibile: semplice e robusto) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs underline underline-offset-4 text-neutral-600 hover:text-red-700 dark:text-neutral-400 dark:hover:text-red-400"
          aria-expanded={expanded}
          aria-controls={`${hid}-involvement-text`}
        >
          {expanded ? "Comprimi" : "Espandi"}
        </button>
      </section>

      {/* Fonte + copia */}
      <footer className="mt-3 border-t pt-3 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold">Fonte:</span>
          <span className="select-text">{entity.source}</span>
          {entity.source && (
            <>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <button
                type="button"
                onClick={copySource}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:border-red-400 hover:text-red-700 dark:hover:text-red-400"
                title="Copia fonte"
              >
                ⧉ Copia
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
}
