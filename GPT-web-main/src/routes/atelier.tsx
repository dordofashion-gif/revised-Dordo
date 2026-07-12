import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Crown,
  Gem,
  HeartHandshake,
  MapPin,
  Ruler,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import dornaPortrait from "@/assets/dorna-farshneshani-atelier.webp";
import {
  BrandWord,
  PageHeroWordmark,
  GoldDivider,
  SiteFooter,
  SiteHeader,
} from "@/components/site-brand";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "Our Atelier | Dorna Farshneshani & DORDO Couture" },
      {
        name: "description",
        content:
          "Meet Dorna Farshneshani, DORDO couture dressmaker with more than 12 years of experience in custom-made dresses, bridal gowns, and occasionwear. Private in-person consultations are available in Burlingame, California.",
      },
      { property: "og:title", content: "Our Atelier | Dorna Farshneshani & DORDO Couture" },
      {
        property: "og:description",
        content:
          "Discover the DORDO atelier in Burlingame, California, where AI-assisted design meets more than 12 years of custom dressmaking experience.",
      },
    ],
  }),
  component: AtelierPage,
});

const expertise = [
  {
    icon: Award,
    value: "12+",
    title: "Years of Experience",
    text: "More than twelve years dedicated to custom dressmaking and refined garment construction.",
  },
  {
    icon: Scissors,
    value: "One-of-One",
    title: "Custom Made",
    text: "Each proposal is developed for one client, one body, and one meaningful occasion.",
  },
  {
    icon: MapPin,
    value: "Burlingame",
    title: "California Atelier",
    text: "A local couture setting where clients can request a private in-person meeting.",
  },
  {
    icon: HeartHandshake,
    value: "Personal",
    title: "Atelier Attention",
    text: "Design choices, measurements, fabrics, and construction are reviewed with human care.",
  },
];

const philosophy = [
  {
    icon: Sparkles,
    title: "Your vision first",
    text: "Every DORDO piece begins with your occasion, references, body language, preferences, and the feeling you want the dress to carry.",
  },
  {
    icon: Scissors,
    title: "Experienced judgment",
    text: "AI can imagine quickly, but more than twelve years of dressmaking experience guides what can be cut, balanced, fitted, and beautifully made.",
  },
  {
    icon: ShieldCheck,
    title: "Private by nature",
    text: "Your photos, measurements, design notes, and personal references are treated as a private couture brief, not public content.",
  },
];

const craftDetails = [
  "Silhouette, proportion, body balance, and intended movement are reviewed before quotation.",
  "Fabric direction, lining, structure, embellishment, and finishing are considered as one complete garment.",
  "Bridal gowns, custom dresses, eveningwear, and special-occasion pieces are approached as individual commissions.",
  "The selected AI concept is refined into a realistic direction before any production commitment is made.",
];

function AtelierPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="atelier" />

      <main>
        <section className="dordo-atelier-hero relative overflow-hidden border-b border-black/5 bg-[#f4eadc]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(185,134,55,0.18),transparent_31%),linear-gradient(135deg,#fbf6ee_0%,#f4eadc_52%,#e7d7c3_100%)]" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-[#b78645]/12" />
          <div className="absolute -left-6 top-32 h-48 w-48 rounded-full border border-[#b78645]/10" />

          <div className="dordo-atelier-hero-grid container-atelier relative grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[0.5fr_0.5fr] lg:gap-16 lg:py-20">
            <div className="dordo-atelier-copy relative z-10 max-w-2xl">
              <PageHeroWordmark />
              <p className="mt-5 flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.27em] text-[#8d6427]">
                <span className="h-px w-10 bg-[#a87932]" />
                Burlingame, California
              </p>
              <h1 className="mt-6 font-serif text-[2.8rem] uppercase leading-[1.08] tracking-[0.055em] text-[#211b16] sm:text-[3.6rem] lg:text-[4.4rem]">
                Our Atelier
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl font-serif text-2xl leading-[1.5] text-[#302922]/88 sm:text-[1.75rem]">
                AI begins the vision. Dorna Farshneshani brings it into the world through real
                couture experience.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-9 text-[#55493f]">
                With more than 12 years of experience in custom-made dresses, bridal gowns,
                eveningwear, and special-occasion pieces, Dorna personally reviews the ideas that
                move from the DORDO design studio toward a made-to-measure proposal.
              </p>

              <div className="mobile-primary-actions mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-13 rounded-none px-8 text-[0.76rem] uppercase tracking-[0.2em] shadow-[0_18px_38px_rgba(20,17,14,0.16)]"
                >
                  <Link to="/design">
                    Begin your design
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-13 rounded-none border-[#a99478] bg-[#fffaf3]/60 px-8 text-[0.76rem] uppercase tracking-[0.2em] shadow-none backdrop-blur hover:bg-white/90"
                >
                  <Link to="/consultation">Request a private meeting</Link>
                </Button>
              </div>
            </div>

            <div className="dordo-atelier-portrait relative mx-auto w-full max-w-[610px] lg:justify-self-end">
              <div className="absolute -inset-5 border border-[#9f7133]/28" />
              <div className="absolute -bottom-8 -left-8 h-[46%] w-[44%] bg-[#18352d]" />
              <div className="relative overflow-hidden border border-[#b9a486] bg-[#f7efe4] p-2 shadow-[0_36px_90px_rgba(38,27,17,0.22)]">
                <img
                  src={dornaPortrait}
                  alt="Dorna Farshneshani, DORDO couture dressmaker in the Burlingame atelier"
                  className="aspect-[4/5] w-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-2 bottom-2 bg-gradient-to-t from-[#15120f]/92 via-[#15120f]/55 to-transparent px-7 pb-7 pt-20 text-white">
                  <p className="text-[0.72rem] uppercase tracking-[0.25em] text-[#d8b779]">
                    Your Couture Dressmaker
                  </p>
                  <h2 className="mt-2 font-serif text-3xl tracking-[0.025em]">
                    Dorna Farshneshani
                  </h2>
                  <p className="mt-2 text-sm tracking-[0.06em] text-white/72">
                    Custom Dress & Bridal Couture · Burlingame, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="dordo-mobile-section container-atelier grid gap-12 py-16 md:py-22 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-primary">
                Meet Your Dressmaker
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-[#2a231d] md:text-5xl">
                Experience, patience, and a personal eye behind every design.
              </h2>
              <GoldDivider className="mt-6" />
            </div>

            <div>
              <div className="space-y-6 text-lg leading-9 text-muted-foreground">
                <p>
                  Dorna Farshneshani has spent more than twelve years creating custom-made dresses,
                  bridal gowns, evening gowns, and occasionwear for clients who want something
                  individual rather than ready-made.
                </p>
                <p>
                  At DORDO, she connects traditional dressmaking knowledge with a new AI-assisted
                  design process. The generated image helps communicate the visual idea, while her
                  experience guides the real decisions: proportion, fabric behavior, support,
                  coverage, construction, fit, and finishing.
                </p>
                <p>
                  The goal is not to copy an image blindly. It is to understand what the client
                  loves about it, preserve the emotion, and shape it into a garment that can be
                  thoughtfully made and confidently worn.
                </p>
              </div>

              <div className="mt-10 border-l-2 border-primary bg-[#f5ebdd] px-7 py-6">
                <p className="font-serif text-2xl italic leading-9 text-[#3a3027]">
                  “Every design should feel personal before it ever becomes fabric.”
                </p>
                <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Dorna Farshneshani
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#f7efe4]">
          <div className="container-atelier py-14 md:py-18">
            <div className="dordo-mobile-card-rail dordo-compact-rail grid gap-px overflow-hidden border border-[#c9b89f] bg-[#c9b89f] sm:grid-cols-2 xl:grid-cols-4">
              {expertise.map((item) => (
                <div key={item.title} className="bg-[#fffaf4] p-7 md:p-8">
                  <item.icon className="h-6 w-6 text-primary" />
                  <p className="mt-6 font-serif text-3xl leading-none text-[#2a231d]">
                    {item.value}
                  </p>
                  <h3 className="mt-3 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-[#8d6427]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier py-16 md:py-22">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-primary">
                The Atelier Philosophy
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Luxury is not generated alone. It is edited, balanced, and made personal.
              </h2>
              <GoldDivider className="mt-6 justify-center" />
            </div>

            <div className="dordo-mobile-card-rail dordo-compact-rail mt-12 grid gap-6 md:grid-cols-3">
              {philosophy.map((item) => (
                <div
                  key={item.title}
                  className="border border-[#d5c6b2] bg-[#fbf6ee] p-8 text-center shadow-[0_20px_55px_rgba(38,28,18,0.06)]"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-primary">
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

        <section className="border-y border-black/5 bg-[#f3e9dc]">
          <div className="container-atelier grid gap-12 py-16 md:py-22 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-primary">
                AI + Human Craft
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                The image communicates the dream. Experience shapes the garment.
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mt-7 text-lg leading-9 text-muted-foreground">
                An AI preview is a visual starting point, not a production pattern. Dorna reviews
                every selected concept through the realities of fabric, fit, support, movement,
                measurements, event timing, and the details required to create the piece well.
              </p>
              <div className="mt-8 space-y-4">
                {craftDetails.map((detail) => (
                  <div
                    key={detail}
                    className="flex gap-4 border-b border-[#d1c0aa] pb-4 last:border-b-0"
                  >
                    <Gem className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-5 -top-5 h-full w-full border border-[#a87932]/25" />
              <div className="relative overflow-hidden border border-[#c4b299] bg-card p-2 shadow-[0_28px_75px_rgba(40,31,21,0.14)]">
                <img
                  src={gallery1}
                  alt="DORDO evening couture craftsmanship"
                  className="dordo-atelier-secondary-image h-[610px] w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#112820] text-[#f8f1e8]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(196,151,81,0.22),transparent_32%),linear-gradient(120deg,#0e211b_0%,#17372d_65%,#0f241d_100%)]" />
          <div className="container-atelier relative grid gap-10 py-16 md:py-22 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-[#d0a966]">
                The Burlingame Atelier
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Meet in person and begin with a private conversation.
              </h2>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-lg leading-9 text-white/72">
                DORDO is located in Burlingame, California. Clients may request an in-person meeting
                to discuss their occasion, preferred silhouette, fabric direction, measurements,
                timing, and the AI concepts they are considering.
              </p>
              <Button
                asChild
                className="dordo-btn-gold mt-8 h-12 rounded-none px-8 text-[0.76rem] uppercase tracking-[0.19em] shadow-none"
              >
                <Link to="/consultation">
                  Request an in-person meeting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="dordo-mobile-card-rail dordo-compact-rail grid gap-4 sm:grid-cols-3">
              <LocationCard
                icon={MapPin}
                title="Burlingame, CA"
                text="A local atelier setting for private custom-dress conversations."
              />
              <LocationCard
                icon={CalendarDays}
                title="In Person"
                text="Request a face-to-face meeting through the private consultation page."
              />
              <LocationCard
                icon={Ruler}
                title="Design Details"
                text="Discuss measurements, fabrics, fit, construction, and next steps together."
              />
            </div>
          </div>
        </section>

        <section className="bg-[#fbf6ee]">
          <div className="container-atelier grid gap-12 py-16 md:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-primary">
                Private Couture Service
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Your request is treated with discretion and personal attention.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="dordo-mobile-card-rail dordo-compact-rail grid gap-6 md:grid-cols-3">
              <PrivateCard
                title="Discreet"
                text="Your photos, measurements, and design ideas are handled privately."
                icon={ShieldCheck}
              />
              <PrivateCard
                title="Personal"
                text="No two briefs are the same. The proposal is shaped around you."
                icon={HeartHandshake}
              />
              <PrivateCard
                title="One-of-One"
                text="The purpose is one considered garment for one meaningful moment."
                icon={Crown}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 bg-[#efe3d4]">
          <div className="container-atelier py-16 text-center md:py-22">
            <BrandWord className="block text-[4rem] leading-none tracking-[0.06em] sm:text-[5.4rem]" />
            <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.1em] text-[#2a231d] md:text-4xl">
              Begin your couture journey
            </h2>
            <GoldDivider className="mt-5 justify-center" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-muted-foreground">
              Start with an AI-assisted concept or request a private meeting with Dorna at the
              Burlingame atelier.
            </p>
            <div className="mobile-primary-actions mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">Design your dress</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-[#a99579] bg-transparent px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
              >
                <Link to="/consultation">Request consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function PrivateCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-[#d2c2ad] bg-white/55 p-7 text-center shadow-[0_16px_45px_rgba(36,28,19,0.05)]">
      <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-serif text-2xl uppercase tracking-[0.07em] text-[#2a231d]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function LocationCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-white/12 bg-white/[0.045] p-6 backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d0a966]/30 bg-[#d0a966]/10 text-[#d0a966]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-serif text-2xl text-[#f8f1e8]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/64">{text}</p>
    </div>
  );
}
