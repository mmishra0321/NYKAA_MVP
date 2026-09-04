interface MoveToCartButtonProps {
  disabled?: boolean;
  helperText?: string;
  /** Confident size shown as a standout chip when one-click is ready */
  sizeLabel?: string;
  onClick?: () => void;
}

/**
 * Status row above the button is always the same height so sibling cards align.
 */
export function MoveToCartButton({
  disabled = false,
  helperText,
  sizeLabel,
  onClick,
}: MoveToCartButtonProps) {
  return (
    <div>
      <div className="mb-2 flex h-7 items-center justify-center gap-2">
        {sizeLabel ? (
          <>
            <span className="rounded-full bg-nykaa-pink/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-nykaa-pink ring-1 ring-nykaa-pink/30">
              One-click
            </span>
            <span className="rounded-full bg-nykaa-pink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_4px_12px_-4px_rgba(252,39,121,0.7)]">
              Size {sizeLabel}
            </span>
          </>
        ) : helperText ? (
          <p className="text-center text-[11px] leading-tight text-nykaa-muted">
            {helperText}
          </p>
        ) : (
          <span className="invisible text-[11px]" aria-hidden>
            One-click
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="w-full rounded-full bg-nykaa-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-nykaa-pink-hover disabled:cursor-not-allowed disabled:bg-nykaa-hairline disabled:text-nykaa-muted"
      >
        Move to Cart
      </button>
    </div>
  );
}
