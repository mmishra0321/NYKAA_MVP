import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { FitBadge, FitSource } from "../../types";

const variantClass: Record<FitSource, string> = {
  personal:
    "border-nykaa-pink/50 bg-gradient-to-br from-nykaa-pink/15 to-nykaa-peach/25 text-nykaa-ink shadow-[0_0_0_1px_rgba(252,39,121,0.12),0_6px_16px_-8px_rgba(252,39,121,0.45)]",
  crowd:
    "border-nykaa-ink/20 bg-gradient-to-br from-nykaa-ink/[0.06] to-nykaa-surface text-nykaa-ink shadow-sm",
  insufficient: "border-nykaa-hairline bg-[#f3f3f3] text-nykaa-muted",
};

interface FitConfidenceBadgeProps {
  badge: FitBadge;
  /** When true, shortLabel is always visible; detail expands on tap */
  defaultExpanded?: boolean;
  /**
   * Fixed footprint for grids/rails (no expand, clamped copy).
   * Use everywhere cards sit side-by-side.
   */
  compact?: boolean;
}

/**
 * Layer 1 — always visible on the wishlist tile (no tap required to see confidence).
 * Insufficient is muted, not alarming.
 */
export function FitConfidenceBadge({
  badge,
  defaultExpanded = false,
  compact = false,
}: FitConfidenceBadgeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const size = badge.confidentSize;
  const sourceLabel =
    badge.source === "personal"
      ? "For you"
      : badge.source === "crowd"
        ? "Buyers"
        : "Limited";

  if (compact) {
    return (
      <div
        className={`animate-badge-in flex h-[4.25rem] flex-col justify-between overflow-hidden rounded-xl border-2 px-2.5 py-2 ${variantClass[badge.source]}`}
        data-fit-source={badge.source}
      >
        <div className="flex items-center gap-1">
          {badge.source !== "insufficient" ? (
            <Sparkles
              size={11}
              className="shrink-0 text-nykaa-pink"
              aria-hidden
            />
          ) : null}
          <p className="min-w-0 truncate text-[10px] font-bold uppercase tracking-[0.05em] text-nykaa-pink">
            Fit confidence · {sourceLabel}
          </p>
        </div>
        <div className="flex h-5 items-center">
          {size ? (
            <span className="rounded-md bg-nykaa-pink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Size {size}
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-nykaa-muted">
              Pick a size
            </span>
          )}
        </div>
        <p className="truncate text-[11px] font-semibold leading-tight text-nykaa-ink">
          {badge.shortLabel}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`animate-badge-in flex flex-col rounded-xl border-2 px-2.5 py-2 ${variantClass[badge.source]}`}
      data-fit-source={badge.source}
    >
      <div className="flex items-start gap-1.5">
        <div className="min-w-0 flex-1">
          <div className="flex min-h-[1.25rem] flex-wrap items-center gap-1">
            {badge.source !== "insufficient" ? (
              <Sparkles
                size={12}
                className="shrink-0 text-nykaa-pink"
                aria-hidden
              />
            ) : (
              <span className="inline-block h-3 w-3 shrink-0" aria-hidden />
            )}
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-nykaa-pink">
              Fit confidence · {sourceLabel}
            </p>
            {size ? (
              <span className="rounded-md bg-nykaa-pink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                Size {size}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs font-semibold leading-snug text-nykaa-ink">
            {badge.shortLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
          aria-expanded={expanded}
          aria-label={expanded ? "Hide fit detail" : "Show fit detail"}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      {expanded ? (
        <p className="mt-2 border-t border-current/10 pt-2 text-[11px] leading-relaxed opacity-90">
          {badge.detail}
        </p>
      ) : null}
    </div>
  );
}
