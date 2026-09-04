import { useState } from "react";

const CHIPS = [
  { id: "ethnic", label: "Ethnic", target: "saved-for-you-heading" },
  { id: "western", label: "Western", target: "saved-for-you-heading" },
  { id: "footwear", label: "Footwear", target: "featured-heading" },
  { id: "accessories", label: "Accessories", target: "featured-heading" },
  { id: "jewellery", label: "Jewellery", target: "saved-for-you-heading" },
  { id: "fashion", label: "Fashion Selects", target: "featured-heading" },
] as const;

export function CategoryChips() {
  const [active, setActive] = useState<(typeof CHIPS)[number]["id"]>(CHIPS[0].id);

  return (
    <div className="border-b border-nykaa-hairline bg-nykaa-surface">
      <ul className="flex gap-2 overflow-x-auto px-3 py-2.5 scrollbar-none">
        {CHIPS.map((chip) => (
          <li key={chip.id} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setActive(chip.id);
                document
                  .getElementById(chip.target)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
                active === chip.id
                  ? "bg-nykaa-pink text-white"
                  : "bg-[#F3F3F3] text-nykaa-ink"
              }`}
            >
              {chip.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
