import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Gem, Scissors, Sparkles, SwatchBook } from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/fabric-guide")({
  head: () => ({
    meta: [
      { title: "Fabric & Details Guide | DORDO Couture Vocabulary" },
      {
        name: "description",
        content:
          "A luxury guide to couture fabrics and dress details including silk satin, chiffon, lace, tulle, corset bodice, draping, embroidery, trains, sleeves, necklines, slits, and back design.",
      },
      { property: "og:title", content: "Fabric & Details Guide | DORDO Couture Vocabulary" },
      {
        property: "og:description",
        content:
          "Learn the fabric and detail vocabulary that helps DORDO understand and design your custom couture dress.",
      },
    ],
  }),
  component: FabricGuidePage,
});

const fabrics = [
  {
    name: "Silk satin",
    feel: "Luminous, smooth, elegant",
    description:
      "A polished luxury fabric with a soft glow. Ideal for refined bridal gowns, evening dresses, and clean sculpted silhouettes.",
  },
  {
    name: "Chiffon",
    feel: "Light, airy, romantic",
    description:
      "Soft and flowing, often used for sleeves, overlays, movement, and delicate gowns with an ethereal feeling.",
  },
  {
    name: "Lace",
    feel: "Romantic, detailed, timeless",
    description:
      "Adds texture, pattern, and femininity. Beautiful for bridal couture, sleeves, bodices, and delicate panels.",
  },
  {
    name: "Tulle",
    feel: "Soft volume, dreamy layers",
    description:
      "A light net fabric used for skirts, veils, layered volume, and soft fairytale structure.",
  },
  {
    name: "Organza",
    feel: "Crisp, sheer, architectural",
    description:
      "Creates sculptural volume and clean shape while staying light. Excellent for dramatic skirts and modern couture details.",
  },
  {
    name: "Velvet",
    feel: "Rich, deep, dramatic",
    description:
      "A luxurious fabric with depth and softness. Beautiful for colder seasons, evening gowns, and elegant statement pieces.",
  },
  {
    name: "Crepe",
    feel: "Modern, smooth, refined",
    description:
      "A graceful fabric with subtle texture. Works well for minimalist gowns, fitted silhouettes, and polished occasion dresses.",
  },
  {
    name: "Beaded mesh",
    feel: "Sparkling, detailed, couture",
    description:
      "Adds shimmer and hand-finished detail. Often used for overlays, bodices, sleeves, and glamorous evening looks.",
  },
];

const details = [
  {
    name: "Corset bodice",
    description:
      "Structured support through the waist and bust, often used to create definition and couture shaping.",
  },
  {
    name: "Draping",
    description:
      "Fabric arranged in soft folds to create movement, elegance, and body-conscious shape.",
  },
  {
    name: "Hand embroidery",
    description:
      "Detailed decorative work added by hand for a more personal, luxury couture finish.",
  },
  {
    name: "Pearl details",
    description: "Soft luminous embellishment for bridal, romantic, and refined evening designs.",
  },
  {
    name: "Train length",
    description:
      "The extension of fabric behind the dress, ranging from subtle sweep to dramatic cathedral effect.",
  },
  {
    name: "Sleeves",
    description:
      "Sleeve choices can make a dress feel romantic, modest, dramatic, soft, or modern.",
  },
  {
    name: "Neckline",
    description:
      "The shape around the neck and bust, such as sweetheart, square, off-shoulder, halter, or V-neck.",
  },
  {
    name: "Slit",
    description:
      "An opening in the skirt that adds movement, drama, and a more evening-focused silhouette.",
  },
  {
    name: "Back design",
    description:
      "The rear detail of the dress, such as low back, lace-up, covered buttons, illusion mesh, or statement cutout.",
  },
];

const vocabularyTips = [
  "Instead of only saying ‘simple,’ describe whether you mean clean, minimal, elegant, fitted, soft, or modern.",
  "Instead of only saying ‘sparkly,’ mention beading, sequins, crystals, pearl details, or shimmer fabric.",
  "Instead of only saying ‘princess,’ mention ball gown, tulle volume, corset bodice, train length, and romantic details.",
];

function FabricGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="guide" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.36)_72%,rgba(251,246,238,0.08)_100%)] lg:z-10" />
          <img
            src={gallery3}
            alt="DORDO fabric and details guide"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-45 lg:w-[58%] lg:opacity-90"
            loading="eager"
          />

          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[680px] items-center py-16 lg:grid-cols-[0.52fr_0.48fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Fabric & Details Guide
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                Learn the language of fabrics, silhouettes, and couture details so your dream dress
                becomes easier to describe.
              </p>
              <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/design">
                    Use this guide in the studio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border-[#b9ab9a] bg-[#fffaf3]/55 px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none backdrop-blur hover:bg-white/85"
                >
                  <Link to="/collections">Explore collections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-22">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">Fabrics</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Choose the feeling before choosing the fabric
              </h2>
              <GoldDivider className="mt-5 justify-center" />
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Each fabric changes how a dress moves, holds shape, reflects light, and feels on the
                body.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {fabrics.map((fabric) => (
                <article key={fabric.name} className="dordo-card p-7">
                  <SwatchBook className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 font-serif text-2xl uppercase tracking-[0.07em] text-[#2a231d]">
                    {fabric.name}
                  </h3>
                  <p className="mt-2 text-[0.76rem] uppercase tracking-[0.2em] text-primary">
                    {fabric.feel}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {fabric.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="container-atelier grid gap-12 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">Details</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Details are how your dress becomes personal.
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mt-7 text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
                If you are unsure what to write in the design form, use these words to describe the
                parts of the dress you care about most.
              </p>
              <Button
                asChild
                className="dordo-btn-dark mt-8 h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">Open the design studio</Link>
              </Button>
            </div>
            <div className="overflow-hidden border border-[#cbbfae]/70 bg-card shadow-[0_24px_70px_rgba(40,31,21,0.08)]">
              <img
                src={gallery2}
                alt="Couture details and fabric inspiration"
                className="h-[560px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-22">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Couture vocabulary
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Details to mention in your request
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {details.map((detail) => (
                <article
                  key={detail.name}
                  className="border border-[#cbbfae]/70 bg-card p-6 shadow-[0_16px_45px_rgba(32,25,18,0.05)]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-primary">
                      <Gem className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl uppercase tracking-[0.07em] text-[#2a231d]">
                        {detail.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier grid gap-12 py-16 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                How to describe your idea
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Better words create a better design brief.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="space-y-5">
              {vocabularyTips.map((tip) => (
                <div key={tip} className="flex gap-4 border border-white/10 bg-white/5 p-5">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-7 text-white/72">{tip}</p>
                </div>
              ))}
              <div className="pt-4">
                <Button
                  asChild
                  className="dordo-btn-gold h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/design">
                    Begin your couture brief
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
