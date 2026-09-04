import { useConfidenceToCart } from "../../context";

export function DemoResetButton() {
  const { resetDemo } = useConfidenceToCart();

  return (
    <button
      type="button"
      onClick={resetDemo}
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-nykaa-hairline bg-nykaa-surface px-5 py-2.5 text-sm font-medium text-nykaa-ink transition-colors hover:border-nykaa-pink hover:text-nykaa-pink"
    >
      Reset demo
    </button>
  );
}
