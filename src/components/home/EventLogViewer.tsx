import { useState } from "react";
import { useConfidenceToCart } from "../../context";

/** Minimal grader-facing event log — not a metrics dashboard. */
export function EventLogViewer() {
  const { state } = useConfidenceToCart();
  const { eventLog } = state;
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-panel border border-nykaa-hairline bg-nykaa-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-medium text-nykaa-ink"
        aria-expanded={open}
      >
        <span>Demo events · {eventLog.length}</span>
        <span className="text-nykaa-muted">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? (
        <ul className="max-h-48 space-y-1.5 overflow-y-auto border-t border-nykaa-hairline px-3 py-2 text-[11px] text-nykaa-muted">
          {eventLog.length === 0 ? (
            <li>No events yet. Open wishlist or simulate a nudge.</li>
          ) : (
            [...eventLog].reverse().map((e, i) => (
              <li key={`${e.at}-${e.name}-${i}`} className="font-mono leading-snug">
                <span className="text-nykaa-pink">{e.name}</span>
                {" · "}
                {Object.entries(e.payload)
                  .map(([k, v]) => `${k}=${String(v)}`)
                  .join(" ")}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
