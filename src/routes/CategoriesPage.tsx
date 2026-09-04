import { Link } from "react-router-dom";

export function CategoriesPage() {
  const cats = [
    "Ethnic wear",
    "Western wear",
    "Footwear",
    "Accessories",
    "Jewellery",
    "Fashion Selects",
  ];

  return (
    <section className="px-4 py-6">
      <h1 className="font-display text-xl font-semibold text-nykaa-ink">
        Categories
      </h1>
      <p className="mt-1 text-sm text-nykaa-muted">
        Demo stub. Confidence-to-Cart lives on Home and Wishlist.
      </p>
      <ul className="mt-5 space-y-2">
        {cats.map((c) => (
          <li key={c}>
            <Link
              to="/"
              className="flex items-center justify-between rounded-panel border border-nykaa-hairline bg-nykaa-surface px-4 py-3 text-sm font-medium text-nykaa-ink hover:border-nykaa-pink"
            >
              {c}
              <span className="text-nykaa-pink">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
