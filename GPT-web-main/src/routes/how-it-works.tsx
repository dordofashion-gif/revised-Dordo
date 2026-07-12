import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ImageUp,
  MailCheck,
  Ruler,
  Scissors,
  Sparkles,
} from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | DORDO AI Couture Process" },
      {
        name: "description",
        content:
          "Learn how DORDO turns your uploaded references, AI design concept, atelier review, private quote, and couture creation into a real custom dress.",
      },
      { property: "og:title", content: "How It Works | DORDO AI Couture Process" },
      {
        property: "og:description",
        content:
          "A clear luxury couture process: share your vision, generate an AI concept, receive atelier review, get a private quote, and begin couture creation.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    number: "1",
    icon: ImageUp,
    title: "Share your vision",
    text: "Upload inspiration, face and body references, fabric ideas, and notes. Tell us the occasion, mood, silhouette, color direction, and details you imagine.",
  },
  {
    number: "2",
    icon: Sparkles,
    title: "Generate your AI concept",
    text: "Preview a custom design direction before requesting a quote. The AI concept helps translate your taste into a first visual language.",
  },
  {
    number: "3",
    icon: ClipboardCheck,
    title: "Atelier review",
    text: "Our team reviews the design, measurements, fabric direction, construction needs, and finishing details to understand what the real garment requires.",
  },
  {
    number: "4",
    icon: MailCheck,
    title: "Private quote",
    text: "You receive pricing, timeline, and next steps. Your proposal is prepared privately based on your design brief and the complexity of the piece.",
  },
  {
    number: "5",
    icon: Scissors,
    title: "Couture creation",
    text: "Your dress is crafted and refined for your moment, moving from concept to pattern, fabric, fitting direction, and final couture finish.",
  },
];

const reassurance = [
  "This is not just AI imagery. The AI preview is the beginning of the couture conversation.",
  "The atelier reviews whether the design can be translated into real fabric, structure, movement, and fit.",
  "Your quote is prepared after the design is reviewed, not automatically generated like a shopping cart product.",
];

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="process" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.36)_72%,rgba(251,246,238,0.08)_100%)] lg:z-10" />
          <img
            src={gallery1}
            alt="DORDO couture process"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-45 lg:w-[58%] lg:opacity-90"
            loading="eager"
          />

          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[680px] items-center py-16 lg:grid-cols-[0.52fr_0.48fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                How It Works
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                From your first idea to a private couture proposal, every step is designed to make
                the process clear, elegant, and trustworthy.
              </p>
              <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/design">
                    Start the process
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
          <div className="container-atelier py-16 md:py-22">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                The DORDO process
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                A guided path from imagination to atelier review
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>

            <div className="mt-14 space-y-7">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-6 border border-[#cbbfae]/70 bg-card p-6 shadow-[0_18px_55px_rgba(32,25,18,0.06)] md:grid-cols-[0.2fr_0.8fr] md:p-8 lg:grid-cols-[0.18fr_0.32fr_0.5fr] lg:items-center"
                >
                  <div className="flex items-center gap-4">
                    <span className="dordo-gold-text font-serif text-5xl tracking-[-0.04em]">
                      {step.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl uppercase tracking-[0.06em] text-[#2a231d]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-8 text-muted-foreground md:text-base">
                    {step.text}
                  </p>
                  {index < steps.length - 1 ? (
                    <div className="hidden h-px bg-gradient-to-r from-primary/35 to-transparent lg:col-span-3 lg:block" />
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="container-atelier grid gap-12 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden border border-[#cbbfae]/70 bg-card shadow-[0_24px_70px_rgba(40,31,21,0.08)]">
              <img
                src={gallery2}
                alt="DORDO atelier review"
                className="h-[520px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Why this matters
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                The process answers the question: can this become a real dress?
              </h2>
              <GoldDivider className="mt-6" />
              <div className="mt-8 space-y-5">
                {reassurance.map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 border-b border-[#d8cbbb] pb-5 last:border-b-0"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-base leading-8 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="dordo-btn-dark mt-8 h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">Enter the design studio</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier grid gap-10 py-16 md:py-20 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Designed for trust
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                No instant checkout. No generic product. A private couture path.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <TrustCard
                title="No payment now"
                text="First, we understand your vision and prepare a private quote."
              />
              <TrustCard
                title="Atelier review"
                text="Your design is checked for fabric, fit, construction, and detail complexity."
              />
              <TrustCard
                title="Clear next steps"
                text="You receive pricing, timeline, and what we need to move forward."
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-7 text-center">
      <Ruler className="mx-auto h-7 w-7 text-primary" />
      <h3 className="mt-5 font-serif text-2xl uppercase tracking-[0.07em] text-primary">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/66">{text}</p>
    </div>
  );
}
