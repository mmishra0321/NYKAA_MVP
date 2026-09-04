import { TRIGGER_LABELS } from "../../lib/nudgeCopy";
import type { Nudge, Product } from "../../types";

interface NudgeCardProps {
  nudge: Nudge;
  product?: Product;
  onDismiss: (nudgeId: string) => void;
  onOpen: (nudgeId: string) => void;
}

export function NudgeCard({ nudge, product, onDismiss, onOpen }: NudgeCardProps) {
  return (
    <article
      className={`rounded-panel border bg-nykaa-surface p-4 transition ${
        nudge.read ? "border-nykaa-hairline" : "border-nykaa-pink/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full bg-nykaa-pink/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-nykaa-pink">
          {TRIGGER_LABELS[nudge.trigger]}
        </span>
        {!nudge.read ? (
          <span className="text-[10px] font-medium text-nykaa-pink">New</span>
        ) : null}
      </div>
      <h2 className="mt-2 text-sm font-semibold text-nykaa-ink">{nudge.title}</h2>
      {product ? (
        <p className="mt-0.5 text-xs text-nykaa-muted">{product.brand}</p>
      ) : null}
      <p className="mt-2 text-xs leading-relaxed text-nykaa-ink">{nudge.body}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onOpen(nudge.id)}
          className="rounded-full bg-nykaa-pink px-3 py-1.5 text-xs font-semibold text-white hover:bg-nykaa-pink-hover"
        >
          View item
        </button>
        <button
          type="button"
          onClick={() => onDismiss(nudge.id)}
          className="rounded-full border border-nykaa-hairline px-3 py-1.5 text-xs font-medium text-nykaa-muted hover:border-nykaa-pink hover:text-nykaa-pink"
        >
          Dismiss
        </button>
      </div>
    </article>
  );
}
