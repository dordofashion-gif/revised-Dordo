import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Inspiration | DORDO" },
      {
        name: "description",
        content:
          "Explore DORDO inspiration categories including ivory bridal, champagne evening gowns, black couture drama, romantic lace details, minimalist silhouettes, and regal red-carpet designs.",
      },
      { property: "og:title", content: "Gallery & Inspiration | DORDO" },
      {
        property: "og:description",
        content:
          "Use DORDO inspiration cards as a starting point for your private AI couture design request.",
      },
    ],
  }),
  component: GalleryPage,
});

const inspirations = [
  {
    title: "Ivory bridal inspiration",
    description: "Soft ivory romance, luminous bridal volume, and timeless ceremony elegance.",
    image: gallery2,
  },
  {
    title: "Champagne evening gowns",
    description: "Warm metallic tones, graceful movement, and refined evening sophistication.",
    image: gallery1,
  },
  {
    title: "Black couture drama",
    description:
      "Bold silhouettes, darker glamour, and statement details for unforgettable entrances.",
    image: heroGown,
  },
  {
    title: "Romantic lace details",
    description: "Delicate texture, feminine softness, and handcrafted-looking couture finishing.",
    image: gallery2,
  },
  {
    title: "Modern minimalist silhouettes",
    description: "Clean lines, quiet luxury, and structure that lets proportion speak.",
    image: gallery3,
  },
  {
    title: "Regal red-carpet designs",
    description: "Commanding presence, polished drama, and couture confidence for grand events.",
    image: gallery1,
  },
];

function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="gallery" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.36)_72%,rgba(251,246,238,0.06)_100%)] lg:z-10" />
          <img
            src={heroGown}
            alt="DORDO inspiration gallery"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-48 lg:w-[58%] lg:opacity-88"
            loading="eager"
          />
          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[650px] items-center py-16 lg:grid-cols-[0.54fr_0.46fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Gallery & Inspiration
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                A curated place to find your mood before entering the design studio.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                These sample inspirations are not fixed products. They are starting points for your
                own DORDO couture concept.
              </p>
              <Button
                asChild
                className="dordo-btn-dark mt-8 h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">
                  Start with inspiration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-22">
            <div className="text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Inspiration categories
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Find the feeling you want your dress to hold.
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {inspirations.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden border border-[#cbbfae]/70 bg-card shadow-[0_22px_70px_rgba(32,25,18,0.08)]"
                >
                  <div className="relative h-[430px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/12 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                      <Images className="mb-4 h-6 w-6 text-[#e8c47c]" />
                      <h2 className="font-serif text-3xl uppercase leading-tight tracking-[0.05em]">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/82">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-7">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Sample inspiration
                    </p>
                    <Button
                      asChild
                      className="dordo-btn-dark h-11 rounded-none px-5 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
                    >
                      <Link to="/design">Use as inspiration</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier flex flex-col items-center py-16 text-center md:py-20">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
              Your final DORDO piece is not copied from a card. It is designed around you.
            </h2>
            <GoldDivider className="mt-5 justify-center" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              Choose a mood, upload your own references, and let the atelier review your custom
              direction.
            </p>
            <Button
              asChild
              className="dordo-btn-gold mt-8 h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
            >
              <Link to="/design">Design your dress</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
