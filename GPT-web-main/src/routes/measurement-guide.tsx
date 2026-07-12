import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Ruler, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gallery2 from "@/assets/gallery-2.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/measurement-guide")({
  head: () => ({
    meta: [
      { title: "Measurement Guide | DORDO Couture" },
      {
        name: "description",
        content:
          "Learn how to take bust, waist, hips, shoulder width, arm length, height, and dress length measurements for a DORDO private couture quote.",
      },
      { property: "og:title", content: "Measurement Guide | DORDO Couture" },
      {
        property: "og:description",
        content:
          "A simple luxury measurement guide to help DORDO prepare a more accurate private couture quote.",
      },
    ],
  }),
  component: MeasurementGuidePage,
});

const measurements = [
  {
    name: "Bust",
    text: "Measure around the fullest part of the bust, keeping the tape level across the back.",
    marker: "A",
  },
  {
    name: "Waist",
    text: "Measure around the natural waist, usually the narrowest point above the belly button.",
    marker: "B",
  },
  {
    name: "Hips",
    text: "Measure around the fullest part of the hips while standing naturally with feet together.",
    marker: "C",
  },
  {
    name: "Shoulder width",
    text: "Measure from the edge of one shoulder to the edge of the other across the back.",
    marker: "D",
  },
  {
    name: "Arm length",
    text: "Measure from the shoulder point down to the wrist, with the arm slightly relaxed.",
    marker: "E",
  },
  {
    name: "Height",
    text: "Measure from the top of the head to the floor while standing straight without shoes.",
    marker: "F",
  },
  {
    name: "Dress length",
    text: "Measure from the shoulder or hollow of the neck down to the desired hem or train length.",
    marker: "G",
  },
];

const tips = [
  "Use a soft measuring tape.",
  "Stand naturally and do not hold your breath.",
  "Ask someone to help for better accuracy.",
  "Do not pull the tape too tight.",
];

function MeasurementGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="measurement" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.86)_38%,rgba(251,246,238,0.32)_70%,rgba(251,246,238,0.04)_100%)] lg:z-10" />
          <img
            src={gallery2}
            alt="DORDO measurement guide couture reference"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-50 lg:w-[58%] lg:opacity-90"
            loading="eager"
          />

          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[650px] items-center py-16 lg:grid-cols-[0.52fr_0.48fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Measurement Guide
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                Accurate measurements help our atelier prepare a safer, more realistic private
                couture quote.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                Use this guide before submitting your quote request. Exact fitting can be refined
                later, but clear measurements help us understand proportion, length, and
                construction needs from the beginning.
              </p>
              <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                >
                  <Link to="/quote">
                    Request private quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border-[#b9ab9a] bg-[#fffaf3]/55 px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none backdrop-blur hover:bg-white/85"
                >
                  <Link to="/design">Design first</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier grid gap-12 py-16 md:py-22 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="dordo-card p-6 md:p-8">
              <div className="text-center">
                <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                  Schematic guide
                </p>
                <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.08em] text-[#2a231d]">
                  Where to measure
                </h2>
                <GoldDivider className="mt-5 justify-center" />
              </div>

              <div className="mt-8 border border-[#d7cbb9] bg-[#fbf6ee] p-4 md:p-6">
                <MeasurementSketch />
              </div>
              <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">
                This is a simple guide for quote preparation. For final production, the atelier may
                request additional fit details or a follow-up consultation.
              </p>
            </div>

            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                How to measure
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Give the atelier the numbers that shape the dress.
              </h2>
              <GoldDivider className="mt-6" />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {measurements.map((item) => (
                  <div
                    key={item.name}
                    className="border border-[#d7cbb9] bg-white/65 p-5 shadow-[0_14px_40px_rgba(35,27,18,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-serif text-sm text-primary">
                        {item.marker}
                      </span>
                      <h3 className="font-serif text-xl uppercase tracking-[0.07em] text-[#2a231d]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="container-atelier grid gap-12 py-16 md:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Measurement tips
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Small measuring habits make a big difference.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {tips.map((tip) => (
                <div key={tip} className="flex gap-4 border border-[#d7cbb9] bg-[#fffaf4] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121619] text-[#f8f1e8]">
          <div className="container-atelier grid gap-10 py-16 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                Why it matters
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                A safer quote begins with better proportion details.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <GuideValue
                icon={Ruler}
                title="Better sizing"
                text="The atelier can understand your proportions before preparing the quote."
              />
              <GuideValue
                icon={UserRound}
                title="Better fit conversation"
                text="Measurements help us ask smarter questions before construction begins."
              />
              <GuideValue
                icon={ShieldCheck}
                title="Less confusion"
                text="Clear numbers reduce mistakes and make the request feel more professional."
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function MeasurementSketch() {
  return (
    <svg
      viewBox="0 0 760 900"
      role="img"
      aria-label="DORDO body measurement schematic"
      className="mx-auto h-auto w-full max-w-[620px]"
    >
      <rect x="0" y="0" width="760" height="900" fill="#fbf6ee" />
      <text
        x="380"
        y="54"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="28"
        fill="#8a5c22"
        letterSpacing="4"
      >
        DORDO MEASUREMENT SKETCH
      </text>
      <text
        x="380"
        y="86"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fill="#756b5f"
        letterSpacing="3"
      >
        FRONT VIEW GUIDE
      </text>

      <g
        fill="none"
        stroke="#2a231d"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      >
        <circle cx="380" cy="145" r="38" />
        <path d="M380 184 C356 216 350 246 350 290" />
        <path d="M380 184 C404 216 410 246 410 290" />
        <path d="M350 240 C316 260 300 304 286 360" />
        <path d="M410 240 C444 260 460 304 474 360" />
        <path d="M350 290 C332 350 325 420 320 500" />
        <path d="M410 290 C428 350 435 420 440 500" />
        <path d="M320 500 C312 610 315 710 335 805" />
        <path d="M440 500 C448 610 445 710 425 805" />
        <path d="M350 805 L330 842" />
        <path d="M425 805 L445 842" />
      </g>

      <g stroke="#9a6821" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M292 250 H468" />
        <path d="M318 350 H442" />
        <path d="M302 470 H458" />
        <path d="M333 220 H427" />
        <path d="M475 260 C505 350 520 440 508 552" />
        <path d="M580 100 V842" />
        <path d="M235 205 V825" />
      </g>

      <g fill="#9a6821" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">
        <circle cx="270" cy="250" r="18" fill="#9a6821" />
        <text x="270" y="258" textAnchor="middle" fill="#fffaf4">
          A
        </text>
        <circle cx="296" cy="350" r="18" fill="#9a6821" />
        <text x="296" y="358" textAnchor="middle" fill="#fffaf4">
          B
        </text>
        <circle cx="280" cy="470" r="18" fill="#9a6821" />
        <text x="280" y="478" textAnchor="middle" fill="#fffaf4">
          C
        </text>
        <circle cx="308" cy="220" r="18" fill="#9a6821" />
        <text x="308" y="228" textAnchor="middle" fill="#fffaf4">
          D
        </text>
        <circle cx="520" cy="405" r="18" fill="#9a6821" />
        <text x="520" y="413" textAnchor="middle" fill="#fffaf4">
          E
        </text>
        <circle cx="580" cy="470" r="18" fill="#9a6821" />
        <text x="580" y="478" textAnchor="middle" fill="#fffaf4">
          F
        </text>
        <circle cx="235" cy="515" r="18" fill="#9a6821" />
        <text x="235" y="523" textAnchor="middle" fill="#fffaf4">
          G
        </text>
      </g>

      <g fontFamily="Arial, sans-serif" fontSize="17" fill="#3a3128">
        <text x="92" y="255">
          A Bust
        </text>
        <text x="105" y="355">
          B Waist
        </text>
        <text x="96" y="475">
          C Hips
        </text>
        <text x="95" y="223">
          D Shoulder width
        </text>
        <text x="535" y="408">
          E Arm length
        </text>
        <text x="602" y="475">
          F Height
        </text>
        <text x="78" y="518">
          G Dress length
        </text>
      </g>

      <g stroke="#c9bca8" strokeWidth="2" strokeDasharray="6 8">
        <line x1="175" y1="250" x2="252" y2="250" />
        <line x1="175" y1="350" x2="278" y2="350" />
        <line x1="175" y1="470" x2="262" y2="470" />
        <line x1="230" y1="220" x2="290" y2="220" />
        <line x1="538" y1="405" x2="660" y2="405" />
        <line x1="598" y1="470" x2="680" y2="470" />
        <line x1="95" y1="515" x2="217" y2="515" />
      </g>

      <text
        x="380"
        y="875"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fill="#756b5f"
      >
        Use one unit consistently — inches or centimeters — and write the unit in your quote notes.
      </text>
    </svg>
  );
}

function GuideValue({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-white/5 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-serif text-xl uppercase tracking-[0.07em] text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/68">{text}</p>
    </div>
  );
}
