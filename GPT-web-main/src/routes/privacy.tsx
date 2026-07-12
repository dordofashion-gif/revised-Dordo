import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Image Use | DORDO" },
      {
        name: "description",
        content:
          "Learn how DORDO uses uploaded photos, body references, dress inspiration, and fabric images for private custom dress requests.",
      },
      { property: "og:title", content: "Privacy & Image Use | DORDO" },
      {
        property: "og:description",
        content:
          "Your uploaded photos are used only to understand your design request and are reviewed privately by the DORDO atelier.",
      },
    ],
  }),
  component: PrivacyPage,
});

const privacyPoints = [
  {
    icon: ShieldCheck,
    title: "Used only for your request",
    text: "Your uploaded photos are used only to understand your design request, style direction, fit needs, and couture preferences.",
  },
  {
    icon: EyeOff,
    title: "Not sold or publicly shared",
    text: "We do not sell your uploaded images or publicly share your face, body references, inspiration photos, or private notes.",
  },
  {
    icon: LockKeyhole,
    title: "Private atelier review",
    text: "Your request is reviewed privately by the DORDO atelier so we can prepare guidance, a quote, or next steps.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="privacy" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.36)_72%,rgba(251,246,238,0.06)_100%)] lg:z-10" />
          <img
            src={heroGown}
            alt="DORDO private image use policy"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-42 lg:w-[56%] lg:opacity-78"
            loading="eager"
          />
          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[590px] items-center py-16 lg:grid-cols-[0.56fr_0.44fr]">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Privacy & Image Use
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                Feel confident uploading your personal references.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                DORDO asks for images because custom dresses are personal. Your photos help us
                understand fit, styling, fabric direction, and your design vision.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Our simple promise
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Your uploaded photos are treated as part of a private couture brief.
              </h2>
              <GoldDivider className="mt-5 justify-center" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {privacyPoints.map((item) => (
                <div key={item.title} className="dordo-card p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-serif text-2xl uppercase tracking-[0.07em] text-[#2a231d]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="container-atelier grid gap-10 py-16 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                What you may upload
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                References that help us design more accurately.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Face or personal style photo",
                "Body shape / fit reference",
                "Dress inspiration image",
                "Fabric or texture reference",
              ].map((item) => (
                <div key={item} className="border border-[#d7cbb9] bg-white/70 p-6">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className="mt-4 font-serif text-xl uppercase tracking-[0.06em] text-[#2a231d]">
                    {item}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Used to understand your request and reviewed privately with your couture brief.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier flex flex-col items-center py-16 text-center md:py-20">
            <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
              Begin privately
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
              Your design request stays between you and the DORDO atelier.
            </h2>
            <GoldDivider className="mt-5 justify-center" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              Start the design studio, or request a private consultation if you want guidance first.
            </p>
            <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
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
                <Link to="/consultation">
                  Request consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
