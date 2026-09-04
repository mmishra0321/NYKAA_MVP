const CHIPS = [
  "Ethnic",
  "Western",
  "Footwear",
  "Accessories",
  "Jewellery",
  "Fashion Selects",
] as const;

export function CategoryChips() {
  return (
    <div className="border-b border-nykaa-hairline bg-nykaa-surface">
      <ul className="flex gap-2 overflow-x-auto px-3 py-2.5 scrollbar-none">
        {CHIPS.map((label, i) => (
          <li key={label} className="shrink-0">
            <button
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
                i === 0
                  ? "bg-nykaa-pink text-white"
                  : "bg-[#F3F3F3] text-nykaa-ink"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
