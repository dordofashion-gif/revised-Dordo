import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";
import heroGown from "@/assets/hero-gown.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | DORDO Couture Questions" },
      {
        name: "description",
        content:
          "Answers to common questions about DORDO AI previews, custom dress creation, quotes, privacy, timelines, wedding dresses, and international requests.",
      },
      { property: "og:title", content: "FAQ | DORDO Couture Questions" },
      {
        property: "og:description",
        content:
          "Learn how DORDO turns AI dress concepts into private couture quote requests and custom garment proposals.",
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    question: "Can DORDO really make the dress from the AI design?",
    answer:
      "The AI image is a concept direction, not an automatic final pattern. Our atelier reviews the design for fabric, construction, fit, finishing, and real-life wearability before preparing a quote or next steps.",
  },
  {
    question: "How accurate is the AI preview?",
    answer:
      "The preview helps communicate mood, silhouette, color, fabric feeling, and design direction. Exact construction, fabric availability, measurements, and tailoring details are confirmed by the atelier during review.",
  },
  {
    question: "Can I upload my own reference photos?",
    answer:
      "Yes. You can upload personal style photos, body-shape references, dress inspiration, and fabric references to help DORDO understand your vision more clearly.",
  },
  {
    question: "Do I need exact measurements now?",
    answer:
      "Exact measurements are helpful, but you can begin with your design idea first. For quote accuracy, bust, waist, hips, shoulder width, arm length, height, and dress length are recommended.",
  },
  {
    question: "How long does a custom dress take?",
    answer:
      "Timeline depends on design complexity, fabric, embellishment, fittings, and event date. Share your deadline in the quote or consultation form so the atelier can advise realistically.",
  },
  {
    question: "Do you make wedding dresses?",
    answer:
      "Yes. DORDO supports bridal couture, reception dresses, engagement looks, evening gowns, red-carpet styles, and private statement pieces.",
  },
  {
    question: "Can I request changes after the AI preview?",
    answer:
      "Yes. The AI preview is the beginning of the design conversation. You can request adjustments to silhouette, neckline, sleeves, fabric direction, train, slit, back design, and other details.",
  },
  {
    question: "How do I receive a quote?",
    answer:
      "Submit your design or consultation request. The DORDO atelier reviews your notes, measurements, reference images, fabric direction, construction needs, and timeline before contacting you with a private quote.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "DORDO can review international requests. Shipping, timeline, fittings, and delivery details are discussed during the private quote process.",
  },
  {
    question: "Is my photo private?",
    answer:
      "Yes. Uploaded images are used to understand your design request and are reviewed privately by the DORDO atelier. They are not used as public content without your permission.",
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="faq" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.36)_72%,rgba(251,246,238,0.06)_100%)] lg:z-10" />
          <img
            src={heroGown}
            alt="DORDO FAQ couture support"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-45 lg:w-[56%] lg:opacity-85"
            loading="eager"
          />
          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[590px] items-center py-16 lg:grid-cols-[0.54fr_0.46fr]">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Frequently Asked Questions
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                Clear answers before you begin your custom dress journey.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                This page helps clients understand how AI previewing, atelier review, privacy,
                quoting, and couture creation work together.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-20">
            <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
              <aside className="dordo-card h-fit p-7 lg:sticky lg:top-28">
                <HelpCircle className="h-8 w-8 text-primary" />
                <h2 className="mt-5 font-serif text-3xl tracking-[-0.03em]">Still unsure?</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  If you are not ready to design yet, book a private consultation and let our
                  atelier guide your first step.
                </p>
                <Button
                  asChild
                  className="dordo-btn-dark mt-6 h-12 rounded-none px-6 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/consultation">
                    Request consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </aside>

              <div className="space-y-5">
                {faqs.map((item, index) => (
                  <article
                    key={item.question}
                    className="border border-[#d7cbb9] bg-white/72 p-6 shadow-[0_14px_38px_rgba(35,27,18,0.04)] md:p-7"
                  >
                    <div className="flex gap-4">
                      <span className="font-serif text-2xl text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-[#2a231d]">
                          {item.question}
                        </h2>
                        <p className="mt-3 text-sm leading-8 text-muted-foreground md:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier grid gap-6 py-12 md:grid-cols-2">
            <div className="border border-white/10 bg-white/5 p-7">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-serif text-2xl uppercase tracking-[0.06em] text-primary">
                Ready to create?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66">
                Start with your references and generate a private couture direction.
              </p>
              <Button
                asChild
                className="dordo-btn-gold mt-5 h-11 rounded-none px-6 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">Design your dress</Link>
              </Button>
            </div>
            <div className="border border-white/10 bg-white/5 p-7">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-serif text-2xl uppercase tracking-[0.06em] text-primary">
                Need privacy details?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66">
                Read how DORDO uses uploaded images and personal design references.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-5 h-11 rounded-none border-white/20 bg-transparent px-6 text-[0.74rem] uppercase tracking-[0.18em] text-white shadow-none hover:bg-white/10"
              >
                <Link to="/privacy">Image use & privacy</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
