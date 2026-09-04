import { NudgeCard } from "./NudgeCard";
import type { Nudge, Product } from "../../types";

interface NudgeListProps {
  nudges: Nudge[];
  products: Product[];
  onDismiss: (nudgeId: string) => void;
  onOpen: (nudgeId: string) => void;
}

export function NudgeList({
  nudges,
  products,
  onDismiss,
  onOpen,
}: NudgeListProps) {
  const active = nudges.filter((n) => !n.dismissed);

  if (active.length === 0) {
    return (
      <div className="rounded-panel border border-dashed border-nykaa-hairline bg-nykaa-surface p-8 text-center text-sm text-nykaa-muted">
        No active nudges. Simulate a trigger below to fire one.
      </div>
    );
  }

  const byId = new Map(products.map((p) => [p.id, p]));

  return (
    <ul className="space-y-3">
      {active.map((nudge) => (
        <li key={nudge.id}>
          <NudgeCard
            nudge={nudge}
            product={byId.get(nudge.productId)}
            onDismiss={onDismiss}
            onOpen={onOpen}
          />
        </li>
      ))}
    </ul>
  );
}
