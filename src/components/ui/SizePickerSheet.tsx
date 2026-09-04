import type { Size } from "../../types";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

interface SizePickerSheetProps {
  open: boolean;
  productName: string;
  onClose: () => void;
  onSelect: (size: Size) => void;
}

/** Shown only when fit badge is insufficient — keeps one-click pure elsewhere. */
export function SizePickerSheet({
  open,
  productName,
  onClose,
  onSelect,
}: SizePickerSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-nykaa-ink/40"
        aria-label="Close size picker"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose a size"
        className="relative z-10 w-full max-w-[480px] rounded-t-2xl bg-nykaa-surface p-5 shadow-xl animate-[slideUp_200ms_ease-out]"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-nykaa-hairline" />
        <h2 className="font-display text-base font-semibold text-nykaa-ink">
          Choose a size
        </h2>
        <p className="mt-1 text-xs text-nykaa-muted">
          Not enough fit data yet for {productName}. Pick a size to move to cart.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSelect(size)}
              className="min-w-[3rem] rounded-full border border-nykaa-hairline px-4 py-2 text-sm font-semibold text-nykaa-ink transition hover:border-nykaa-pink hover:text-nykaa-pink"
            >
              {size}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm text-nykaa-muted"
        >
          Cancel
        </button>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: 0.6; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
