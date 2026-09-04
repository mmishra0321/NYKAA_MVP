import type { Product, Size } from "../../types";

interface CompleteTheLookRowProps {
  parentName: string;
  items: Product[];
  onAdd: (productId: string, size: Size) => void;
  defaultSize?: Size;
}

export function CompleteTheLookRow({
  parentName,
  items,
  onAdd,
  defaultSize = "M",
}: CompleteTheLookRowProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-3 rounded-panel border border-nykaa-hairline bg-nykaa-surface p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-nykaa-pink">
        Complete the look
      </p>
      <p className="mt-0.5 text-xs text-nykaa-muted">
        Pairs well with {parentName}. Finishes the look.
      </p>
      <ul className="mt-3 flex items-stretch gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex w-36 shrink-0 flex-col rounded-lg border border-nykaa-hairline p-2"
          >
            <div className="shine-media h-28 w-full shrink-0 rounded-md">
              <img
                src={item.imageUrl}
                alt=""
                className="h-full w-full object-cover bg-nykaa-canvas"
              />
            </div>
            <p className="mt-2 line-clamp-2 h-8 text-[11px] font-medium leading-4 text-nykaa-ink">
              {item.name}
            </p>
            <p className="mt-0.5 text-[11px] text-nykaa-muted">
              ₹{item.priceInr.toLocaleString("en-IN")}
            </p>
            <button
              type="button"
              onClick={() => onAdd(item.id, defaultSize)}
              className="mt-auto w-full rounded-full bg-nykaa-pink px-2 py-1.5 text-[11px] font-semibold text-white hover:bg-nykaa-pink-hover"
            >
              Add · {defaultSize}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
