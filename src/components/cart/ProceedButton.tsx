interface ProceedButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export function ProceedButton({ disabled, onClick }: ProceedButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-full bg-nykaa-pink px-4 py-3 text-sm font-semibold text-white transition hover:bg-nykaa-pink-hover disabled:cursor-not-allowed disabled:bg-nykaa-hairline disabled:text-nykaa-muted"
    >
      Proceed
    </button>
  );
}
