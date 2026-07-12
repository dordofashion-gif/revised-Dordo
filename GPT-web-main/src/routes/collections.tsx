import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Gem, Sparkles } from "lucide-react";
import heroGown from "@/assets/collections-hero.webp";
import bridalCouture from "@/assets/collections-bridal-couture.webp";
import eveningGowns from "@/assets/collections-evening-gowns.webp";
import engagementDresses from "@/assets/collections-engagement-dresses.webp";
import receptionDresses from "@/assets/collections-reception-dresses.webp";
import redCarpetLooks from "@/assets/collections-red-carpet-looks.webp";
import cocktailOccasion from "@/assets/collections-cocktail-occasion.webp";
import customStatement from "@/assets/collections-custom-statement.webp";
import modestCouture from "@/assets/collections-modest-couture.webp";
import motherOfBride from "@/assets/collections-mother-of-bride.webp";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "DORDO Collections | Luxury Custom Dress Inspiration" },
      {
        name: "description",
        content:
          "Explore nine DORDO couture collections including bridal, evening, engagement, reception, red carpet, cocktail, modest couture, mother-of-the-bride, and custom statement pieces.",
      },
      { property: "og:title", content: "DORDO Collections | Luxury Custom Dress Inspiration" },
      {
        property: "og:description",
        content:
          "Discover couture categories to inspire your next custom dress and move directly into the DORDO design studio.",
      },
    ],
  }),
  component: CollectionsPage,
});

const categories = [
  {
    title: "Bridal Couture",
    description:
      "Timeless silhouettes, luminous fabrics, and exquisite detail created for the most personal day of your life.",
    image: bridalCouture,
    accent: "Soft ivory structure, romantic volume, and couture delicacy.",
  },
  {
    title: "Evening Gowns",
    description:
      "Refined drama for galas, black-tie evenings, and elegant entrances that linger in memory.",
    image: eveningGowns,
    accent: "Fluid lines, sculpted glamour, and effortless sophistication.",
  },
  {
    title: "Engagement Dresses",
    description:
      "Celebrate the beginning of your story with radiant shapes, romantic lightness, and graceful feminine detail.",
    image: engagementDresses,
    accent: "Romantic charm balanced with modern couture polish.",
  },
  {
    title: "Reception Dresses",
    description:
      "Designed for movement, celebration, and a second look that still feels deeply luxurious.",
    image: receptionDresses,
    accent: "Lightness, shimmer, and ease for your unforgettable evening.",
  },
  {
    title: "Red Carpet Looks",
    description:
      "Confident silhouettes, commanding lines, and striking details worthy of a grand arrival.",
    image: redCarpetLooks,
    accent: "Editorial glamour with a couture finish.",
  },
  {
    title: "Cocktail & Occasion Wear",
    description:
      "Polished custom looks for celebrations, parties, dinners, and every elegant moment in between.",
    image: cocktailOccasion,
    accent: "Sharp femininity with contemporary elegance.",
  },
  {
    title: "Custom Statement Pieces",
    description:
      "One-of-one couture expressions for clients who want something extraordinary and entirely their own.",
    image: customStatement,
    accent: "Creative freedom guided by private atelier attention.",
  },
  {
    title: "Modest Couture",
    description:
      "Graceful coverage, refined structure, and elevated detailing shaped into a quietly luxurious statement.",
    image: modestCouture,
    accent: "Elegant restraint with a fully couture finish.",
  },
  {
    title: "Mother of the Bride & Formal Occasion",
    description:
      "Sophisticated custom dressing with polished lines, flattering structure, and timeless event elegance.",
    image: motherOfBride,
    accent: "Refined presence designed for beautiful, memorable occasions.",
  },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Discover your direction",
    text: "Use these categories as a starting point if you know the feeling you want, but not yet the exact design.",
  },
  {
    icon: Gem,
    title: "Refine your references",
    text: "Each collection helps you identify the silhouette, mood, and fabric language that best fits your event.",
  },
  {
    icon: Crown,
    title: "Move into the atelier",
    text: "Once a style speaks to you, enter the design studio and let DORDO shape it into your private custom concept.",
  },
];

function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="collections" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.88)_36%,rgba(251,246,238,0.34)_68%,rgba(251,246,238,0.04)_100%)] lg:z-10" />
          <img
            src={heroGown}
            alt="DORDO couture collection inspiration"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-65 lg:w-[58%] lg:opacity-92"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[680px] items-center py-16 lg:grid-cols-[0.5fr_0.5fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Collections
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                Explore couture directions for every chapter, from bridal romance to dramatic
                statement dressing.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                These categories are created to inspire clients who know the mood they want, but
                need a more refined starting point before entering the DORDO design studio.
              </p>
              <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/design">
                    Begin your design
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border-[#b9ab9a] bg-[#fffaf3]/55 px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none backdrop-blur hover:bg-white/85"
                >
                  <Link to="/quote">Request consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="dordo-mobile-section container-atelier py-16 md:py-22">
            <div className="text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Find your style direction
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Couture inspirations for every kind of moment
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>

            <div className="dordo-mobile-card-rail mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category.title}
                  className="overflow-hidden border border-[#cbbfae]/70 bg-card shadow-[0_22px_70px_rgba(32,25,18,0.08)]"
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                      <h3 className="font-serif text-3xl uppercase leading-tight tracking-[0.05em]">
                        {category.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/82">{category.accent}</p>
                    </div>
                  </div>
                  <div className="space-y-6 p-7">
                    <p className="text-sm leading-8 text-muted-foreground">
                      {category.description}
                    </p>
                    <Button
                      asChild
                      className="dordo-btn-dark h-11 rounded-none px-6 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
                    >
                      <Link to="/design">
                        Design this style
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            <p className="dordo-mobile-swipe-note md:hidden">
              Swipe to explore all nine collections →
            </p>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="dordo-mobile-section container-atelier py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Why this page matters
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                A curated place to begin when inspiration feels broad.
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>

            <div className="dordo-mobile-card-rail dordo-compact-rail mt-12 grid gap-6 md:grid-cols-3">
              {reasons.map((item) => (
                <div key={item.title} className="dordo-card p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl uppercase tracking-[0.07em] text-[#2a231d]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier flex flex-col items-center py-16 text-center md:py-20">
            <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
              Ready to move from inspiration to design?
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
              Let DORDO turn the collection you love into a concept designed around you.
            </h2>
            <GoldDivider className="mt-5 justify-center" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              Enter the design studio, upload your references, and request a private couture
              direction shaped for your event, body, and personal style.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="dordo-btn-gold h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">Design your dress</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-white/20 bg-transparent px-8 text-[0.78rem] uppercase tracking-[0.18em] text-white shadow-none hover:bg-white/10"
              >
                <Link to="/quote">Book a private consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
