const SLIDES = [
  {
    id: "slide-ethnic",
    title: "Wedding guest edits",
    subtitle: "Saved looks with clearer fit signals",
    image: "/images/hero-wedding.jpg",
    target: "saved-for-you-heading",
  },
  {
    id: "slide-western",
    title: "Everyday western",
    subtitle: "Size confidence before you decide",
    image: "/images/hero-western.jpg",
    target: "featured-heading",
  },
  {
    id: "slide-footwear",
    title: "Footwear favorites",
    subtitle: "Revisit what you saved, without the wait-and-forget",
    image: "/images/hero-footwear.jpg",
    target: "saved-for-you-heading",
  },
] as const;

export function HeroCarousel() {
  return (
    <section className="px-0 pt-0" aria-label="Featured">
      <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto scrollbar-none">
        {SLIDES.map((slide) => (
          <li
            key={slide.id}
            className="w-full shrink-0 snap-center px-3 pt-3"
          >
            <div className="shine-media relative flex h-[190px] flex-col justify-end overflow-hidden rounded-panel p-5 text-white">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-nykaa-ink/85 via-nykaa-ink/35 to-transparent"
                aria-hidden
              />
              <div className="relative z-[1]">
                <p className="font-display text-xl font-semibold leading-snug">
                  {slide.title}
                </p>
                <p className="mt-1 max-w-[85%] text-sm text-white/90">
                  {slide.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(slide.target)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="mt-4 inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-nykaa-pink"
                >
                  Explore →
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
