import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Crown,
  Gem,
  LockKeyhole,
  Scissors,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import heroGownMobile from "@/assets/hero-gown-mobile.webp";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DORDO | AI-Assisted Bespoke Dresses & Couture Atelier" },
      {
        name: "description",
        content:
          "Imagine your custom dress with DORDO's AI design studio, then work with our atelier to refine the concept into a made-to-measure couture proposal.",
      },
      { property: "og:title", content: "DORDO | AI-Assisted Bespoke Couture" },
      {
        property: "og:description",
        content: "Imagine your dress. Refine it with AI. Bring it to life with the DORDO atelier.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const atelierSteps = [
  {
    number: "1",
    icon: Sparkles,
    title: "Define your vision",
    desc: "Tell us about the occasion, silhouette, color, fabric, and details you imagine.",
  },
  {
    number: "2",
    icon: WandSparkles,
    title: "Create with AI",
    desc: "Upload references and generate a visual concept that can be refined before quotation.",
  },
  {
    number: "3",
    icon: Gem,
    title: "Atelier review",
    desc: "Our team assesses construction, materials, fit, timing, and the realities of making the piece.",
  },
  {
    number: "4",
    icon: Scissors,
    title: "Crafted for you",
    desc: "Once the proposal is approved, your design moves into the bespoke production process.",
  },
];

const collections = [
  {
    src: gallery2,
    title: "Bridal",
    desc: "Ceremony gowns, reception looks, and one-of-one bridal pieces.",
    to: "/collections",
  },
  {
    src: gallery1,
    title: "Evening",
    desc: "Refined statement dresses for galas, celebrations, and formal events.",
    to: "/collections",
  },
  {
    src: gallery3,
    title: "Signature Custom",
    desc: "A private design developed around your personal references and style.",
    to: "/design",
  },
];

const promisePoints = [
  "A private design brief reviewed by the DORDO team",
  "Custom color, fabric, silhouette, and detail direction",
  "Clear quotation before any production commitment",
  "Measurement guidance and fit clarification from the atelier",
];

const faqs = [
  {
    q: "Do I need perfect measurements before I begin?",
    a: "No. You can create a concept first and complete or confirm measurements during the quote and consultation process.",
  },
  {
    q: "Is the AI image the final garment design?",
    a: "It is a visual starting point. The atelier reviews structure, fabric behavior, embellishment, fit, and production feasibility before preparing a real proposal.",
  },
  {
    q: "Do I pay when I request a quote?",
    a: "No. A quote request is a private review, not a checkout or purchase commitment.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="home" />

      <main>
        <section className="dordo-home-hero relative isolate min-h-[720px] overflow-hidden border-b border-black/8 bg-[#eee4d7] lg:min-h-[780px]">
          <picture className="dordo-home-hero-media">
            <source media="(max-width: 767px)" srcSet={heroGownMobile} />
            <img
              src={heroGown}
              alt="Luxury DORDO couture gown"
              className="dordo-home-hero-image absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-[62%_center]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="dordo-home-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(247,239,228,.99)_0%,rgba(247,239,228,.94)_34%,rgba(247,239,228,.68)_50%,rgba(16,17,17,.10)_74%,rgba(16,17,17,.24)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/24 to-transparent lg:hidden" />

          <div className="dordo-home-hero-layout container-atelier relative z-10 grid min-h-[720px] items-center py-16 lg:min-h-[780px] lg:grid-cols-[0.54fr_0.46fr]">
            <div className="dordo-home-hero-copy max-w-[760px] pb-44 sm:pb-24 lg:pb-0">
              <PageHeroWordmark />
              <p className="mt-5 flex items-center gap-3 text-[0.73rem] font-medium uppercase tracking-[0.28em] text-[#8d6427]">
                <span className="h-px w-10 bg-[#a87932]" />
                Private AI-assisted couture atelier
              </p>
              <h1 className="dordo-home-hero-headline mt-6 mr-[200px] max-w-[680px] font-['Bacasime_Antique',serif] text-[2.6rem] leading-[1.08] tracking-[-0.045em] text-[#211b16] sm:text-[3.6rem] lg:text-[4.65rem]">
                Imagine your dress We bring it to life!
              </h1>
              <p className="mt-6 max-w-[610px] text-base leading-8 text-[#51473d] sm:text-lg sm:leading-9">
                Build a custom gown concept in our AI design studio, then work with the DORDO
                atelier to turn your selected vision into a considered, made-to-measure proposal.
              </p>

              <div className="mobile-primary-actions mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-13 rounded-none px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-[0_16px_35px_rgba(0,0,0,.15)]"
                >
                  <Link to="/design">
                    Design your dress
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-13 rounded-none border-[#9e8d78] bg-[#fffaf3]/55 px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-none backdrop-blur hover:bg-white/90"
                >
                  <Link to="/how-it-works">Explore the process</Link>
                </Button>
              </div>

              <div className="dordo-home-trust mt-10 grid max-w-[650px] gap-4 border-t border-[#8c7b68]/25 pt-6 text-xs text-[#5c5147] sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <LockKeyhole className="h-4 w-4 text-primary" />
                  Private image review
                </p>
                <p className="flex items-center gap-2">
                  <Gem className="h-4 w-4 text-primary" />
                  Bespoke atelier assessment
                </p>
                <p className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary" />
                  No payment to request a quote
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 right-5 z-20 hidden w-[310px] border border-white/25 bg-[#121414]/88 p-6 text-white shadow-[0_24px_65px_rgba(0,0,0,.28)] backdrop-blur-md lg:block xl:right-[max(2rem,calc((100vw-1540px)/2+1.5rem))]">
            <p className="text-[0.68rem] uppercase tracking-[0.23em] text-[#d8ad65]">
              The DORDO method
            </p>
            <p className="mt-3 mr-5 font-serif text-2xl leading-tight">
              Digital imagination, grounded in real couture construction.
            </p>
            <Link
              to="/atelier"
              className="mt-5 inline-flex items-center text-[0.7rem] uppercase tracking-[0.18em] text-white/65 transition hover:text-white"
            >
              Meet the atelier <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#f7f0e7]">
          <div className="dordo-mobile-section container-atelier py-18 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.76rem] uppercase tracking-[0.28em] text-primary">
                From idea to atelier
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
                A clearer way to begin a truly custom dress.
              </h2>
              <GoldDivider className="mt-6 justify-center" />
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                You do not need a technical sketch or fashion vocabulary. Start with what you
                know—your occasion, inspiration, body references, and the feeling you want the dress
                to create.
              </p>
            </div>

            <div className="dordo-mobile-card-rail dordo-compact-rail mt-[5px] grid gap-px overflow-hidden border border-[#d3c5b2] bg-[#d3c5b2] md:grid-cols-2 xl:grid-cols-4">
              {atelierSteps.map((step) => (
                <article
                  key={step.title}
                  className="group relative bg-[#fffaf4] p-7 transition hover:bg-white md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-4xl text-[#c8b89f]">{step.number}</span>
                    <div className="flex h-11 w-11 items-center justify-center border border-primary/25 bg-primary/8 text-primary transition group-hover:bg-primary group-hover:text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-0 font-serif text-2xl leading-tight text-[#28211b]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.desc}</p>
                </article>
              ))}
            </div>
            <p className="dordo-mobile-swipe-note md:hidden">
              Swipe to follow the atelier journey →
            </p>

            <div className="mt-9 text-center">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-[#a99a87] bg-transparent px-7 text-[0.72rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
              >
                <Link to="/how-it-works">
                  See every step <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#121414] text-[#f7f1e9]">
          <div className="container-atelier grid min-h-[680px] gap-0 lg:grid-cols-2">
            <div className="relative min-h-[520px] lg:min-h-full">
              <img
                src={gallery3}
                alt="DORDO couture design inspiration"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/5 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#e2b96e]">
                  Your references
                </p>
                <p className="mt-4 max-w-lg font-serif text-3xl leading-tight md:text-4xl">
                  A photograph, fabric, sketch, or memory can become the beginning of the design.
                </p>
              </div>
            </div>

            <div className="flex items-center px-7 py-16 md:px-12 lg:px-16">
              <div className="max-w-xl">
                <p className="text-[0.76rem] uppercase tracking-[0.28em] text-[#d5aa63]">
                  AI concept → atelier proposal
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] md:text-5xl">
                  The image is the beginning—not the promise.
                </h2>
                <GoldDivider className="mt-6" />
                <p className="mt-7 text-base leading-8 text-white/68">
                  AI helps you communicate the look. The DORDO atelier then evaluates what matters
                  in the real world: fabric weight, support, drape, closures, embellishment, fit,
                  comfort, and the time required to make it well.
                </p>
                <ul className="mt-7 space-y-4">
                  {promisePoints.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-white/72">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-[#d5aa63]/40 text-[#d5aa63]">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="dordo-btn-gold mt-9 h-12 rounded-none px-7 text-[0.72rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/design">
                    Create your first concept <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fbf6ee]">
          <div className="dordo-mobile-section container-atelier py-18 md:py-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.76rem] uppercase tracking-[0.28em] text-primary">
                  Designed for your chapter
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
                  Couture without a catalog limit.
                </h2>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center text-[0.72rem] uppercase tracking-[0.2em] text-[#4d4339] transition hover:text-primary"
              >
                View collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="dordo-mobile-card-rail mt-12 grid gap-6 lg:grid-cols-3">
              {collections.map((item, index) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className={
                    index === 1
                      ? "group relative min-h-[520px] overflow-hidden border border-[#cbbfae] lg:mt-10"
                      : "group relative min-h-[520px] overflow-hidden border border-[#cbbfae]"
                  }
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                    <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#ddb66d]">
                      DORDO collection
                    </p>
                    <h3 className="mt-3 font-serif text-4xl tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">{item.desc}</p>
                    <span className="mt-6 inline-flex items-center text-[0.7rem] uppercase tracking-[0.2em] text-white/85">
                      Explore{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/6 bg-[#fffaf4]">
          <div className="dordo-mobile-section container-atelier grid gap-12 py-18 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[0.76rem] uppercase tracking-[0.28em] text-primary">
                Before you begin
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
                Straight answers for a private custom process.
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
                The design studio is meant to make the first conversation easier—not to replace the
                judgment of an experienced atelier.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-8 h-12 rounded-none border-[#a99a87] bg-transparent px-7 text-[0.72rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
              >
                <Link to="/faq">Read all questions</Link>
              </Button>
            </div>

            <div className="divide-y divide-[#d7cbb9] border-y border-[#d7cbb9]">
              {faqs.map((item, index) => (
                <article key={item.q} className="grid gap-4 py-7 sm:grid-cols-[48px_1fr]">
                  <span className="font-serif text-2xl text-primary">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-[#29221c]">{item.q}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e9ded0]">
          <img
            src={gallery2}
            alt="DORDO bridal couture"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#e9ded0]/75 backdrop-blur-[1px]" />
          <div className="dordo-mobile-section container-atelier relative flex flex-col items-center py-20 text-center md:py-28">
            <p className="text-[0.76rem] uppercase tracking-[0.28em] text-primary">
              Begin your private design
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight tracking-[-0.045em] md:text-6xl">
              Your dress does not have to exist yet.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#53483d]">
              Create the first visual direction with AI, or speak with the atelier if you would
              rather be guided from the beginning.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="dordo-btn-dark h-13 rounded-none px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-none"
              >
                <Link to="/design">
                  Design your dress <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-none border-[#8f7e6b] bg-white/35 px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-none hover:bg-white/75"
              >
                <Link to="/consultation">Book a consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
