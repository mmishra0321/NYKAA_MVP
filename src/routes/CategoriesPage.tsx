import { Link } from "react-router-dom";

export function CategoriesPage() {
  const cats = [
    { label: "Ethnic wear", hash: "saved-for-you-heading" },
    { label: "Western wear", hash: "saved-for-you-heading" },
    { label: "Footwear", hash: "featured-heading" },
    { label: "Accessories", hash: "featured-heading" },
    { label: "Jewellery", hash: "saved-for-you-heading" },
    { label: "Fashion Selects", hash: "featured-heading" },
  ];

  return (
    <section className="px-4 py-6">
      <h1 className="font-display text-xl font-semibold text-nykaa-ink">
        Categories
      </h1>
      <p className="mt-1 text-sm text-nykaa-muted">
        Browse into Saved looks with Fit Confidence on Home.
      </p>
      <ul className="mt-5 space-y-2">
        {cats.map((c) => (
          <li key={c.label}>
            <Link
              to={`/#${c.hash}`}
              className="flex items-center justify-between rounded-panel border border-nykaa-hairline bg-nykaa-surface px-4 py-3 text-sm font-medium text-nykaa-ink hover:border-nykaa-pink"
            >
              {c.label}
              <span className="text-nykaa-pink">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
