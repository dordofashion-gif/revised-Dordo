import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Gem,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitQuote } from "@/lib/quote.functions";
import heroGown from "@/assets/hero-gown.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Private Consultation | DORDO" },
      {
        name: "description",
        content:
          "Book a private DORDO consultation for bridal couture, eveningwear, and custom dress requests before using the AI design studio.",
      },
      { property: "og:title", content: "Book a Private Consultation | DORDO" },
      {
        property: "og:description",
        content:
          "For brides, eveningwear clients, and custom couture requests who want guidance before beginning their DORDO design journey.",
      },
    ],
  }),
  component: ConsultationPage,
});

const consultationSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  occasion: z.string().optional(),
  deadline: z.string().optional(),
  silhouette: z.string().optional(),
  fabricDirection: z.string().optional(),
  budgetRange: z.string().optional(),
  aiIdeas: z.string().optional(),
  notes: z.string().optional(),
});

type ConsultationForm = z.infer<typeof consultationSchema>;

const discussionItems = [
  "Your occasion",
  "Your preferred silhouette",
  "Your fabric direction",
  "Your timeline",
  "Your budget range",
  "Your AI design ideas",
];

const reassurance = [
  {
    icon: MessageCircle,
    title: "Guided before design",
    text: "Ideal if you feel unsure, need styling direction, or want our atelier to understand your event first.",
  },
  {
    icon: ShieldCheck,
    title: "Private request",
    text: "Your photos, measurements, and design ideas are treated as a private couture conversation.",
  },
  {
    icon: Clock,
    title: "Clear next steps",
    text: "We help you understand what to prepare before moving into the AI design studio or quote stage.",
  },
];

function ConsultationPage() {
  const submit = useServerFn(submitQuote);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationForm>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = async (data: ConsultationForm) => {
    const consultationSummary = [
      "Private consultation request",
      data.occasion ? `Occasion: ${data.occasion}` : "",
      data.silhouette ? `Preferred silhouette: ${data.silhouette}` : "",
      data.fabricDirection ? `Fabric direction: ${data.fabricDirection}` : "",
      data.deadline ? `Timeline / preferred date: ${data.deadline}` : "",
      data.budgetRange ? `Budget range: ${data.budgetRange}` : "",
      data.aiIdeas ? `AI design ideas: ${data.aiIdeas}` : "",
      data.notes ? `Additional notes: ${data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await submit({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          occasion: data.occasion,
          deadline: data.deadline,
          notes: consultationSummary,
          designPrompt: consultationSummary,
          generatedImage: "",
        },
      });
      setSubmitted(true);
      toast.success("Your consultation request has been received.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send request";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="consultation" />

      <main>
        <section className="dordo-split-hero relative overflow-hidden border-b border-black/5 bg-[#fbf6ee]">
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,238,0.98)_0%,rgba(251,246,238,0.9)_42%,rgba(251,246,238,0.38)_72%,rgba(251,246,238,0.06)_100%)] lg:z-10" />
          <img
            src={heroGown}
            alt="DORDO private consultation"
            className="dordo-split-hero-image absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-48 lg:w-[58%] lg:opacity-88"
            loading="eager"
          />

          <div className="dordo-split-hero-layout container-atelier relative z-20 grid min-h-[650px] items-center py-16 lg:grid-cols-[0.54fr_0.46fr] lg:py-20">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <h1 className="mt-4 font-serif text-3xl uppercase leading-[1.25] tracking-[0.08em] text-[#2a231d] sm:text-4xl">
                Book a Private Consultation
              </h1>
              <GoldDivider className="mt-6" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#302922]/78">
                For brides, eveningwear clients, and custom couture requests.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                Some clients prefer to talk first. This page gives you a calm way to ask for
                guidance before designing with AI or submitting a full quote request.
              </p>
              <Button
                asChild
                className="dordo-btn-dark mt-8 h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
              >
                <a href="#consultation-form">
                  Request consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf4]">
          <div className="container-atelier grid gap-10 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-primary">
                What we discuss
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                A private conversation before the couture journey begins.
              </h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {discussionItems.map((item) => (
                <div
                  key={item}
                  className="border border-[#d7cbb9] bg-white/70 p-6 shadow-[0_14px_40px_rgba(35,27,18,0.04)]"
                >
                  <Gem className="h-5 w-5 text-primary" />
                  <p className="mt-4 font-serif text-xl uppercase tracking-[0.06em] text-[#2a231d]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#fbf6ee]">
          <div className="container-atelier grid gap-6 py-12 md:grid-cols-3">
            {reassurance.map((item) => (
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
        </section>

        <section id="consultation-form" className="bg-[#fffaf4]">
          <div className="dordo-mobile-section container-atelier py-16 md:py-20">
            {submitted ? (
              <div className="mx-auto max-w-2xl border border-[#cbbfae] bg-[#fbf6ee] px-8 py-16 text-center shadow-[0_24px_70px_rgba(40,31,21,0.10)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-6 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
                  Your consultation request has been received.
                </h2>
                <GoldDivider className="mt-5 justify-center" />
                <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                  Our atelier will review your notes and contact you with guidance for your private
                  couture journey.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="dordo-btn-dark h-12 rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none"
                  >
                    <Link to="/">Return home</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none border-[#b9ab9a] bg-transparent px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                  >
                    <Link to="/design">Design your dress</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-7 lg:grid-cols-[0.6fr_0.4fr]">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="dordo-quote-form-card dordo-card p-6 md:p-8"
                >
                  <p className="text-[0.8rem] uppercase tracking-[0.24em] text-primary">
                    Consultation request
                  </p>
                  <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] md:text-4xl">
                    Tell us what you are considering.
                  </h2>
                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <Field label="Full name *" error={errors.name?.message}>
                      <Input {...register("name")} className="h-12 rounded-none bg-background" />
                    </Field>
                    <Field label="Email *" error={errors.email?.message}>
                      <Input
                        type="email"
                        {...register("email")}
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                    <Field label="Phone">
                      <Input {...register("phone")} className="h-12 rounded-none bg-background" />
                    </Field>
                    <Field label="Timeline / needed by">
                      <Input
                        {...register("deadline")}
                        placeholder="Wedding date, event month, or flexible"
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                    <Field label="Occasion">
                      <Input
                        {...register("occasion")}
                        placeholder="Wedding, gala, engagement..."
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                    <Field label="Preferred silhouette">
                      <Input
                        {...register("silhouette")}
                        placeholder="Ball gown, mermaid, A-line..."
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                    <Field label="Fabric direction">
                      <Input
                        {...register("fabricDirection")}
                        placeholder="Silk satin, lace, tulle, velvet..."
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                    <Field label="Budget range">
                      <Input
                        {...register("budgetRange")}
                        placeholder="Optional range or undecided"
                        className="h-12 rounded-none bg-background"
                      />
                    </Field>
                  </div>
                  <div className="mt-5 space-y-2">
                    <Label className="text-[0.74rem] uppercase tracking-[0.16em] text-muted-foreground">
                      AI design ideas
                    </Label>
                    <Textarea
                      {...register("aiIdeas")}
                      placeholder="Tell us if you already have AI ideas, inspiration photos, or a style direction..."
                      className="min-h-[120px] rounded-none bg-background resize-none"
                    />
                  </div>
                  <div className="mt-5 space-y-2">
                    <Label className="text-[0.74rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Additional notes
                    </Label>
                    <Textarea
                      {...register("notes")}
                      placeholder="Anything you want our atelier to know before contacting you..."
                      className="min-h-[120px] rounded-none bg-background resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="dordo-btn-dark mt-7 h-12 w-full rounded-none px-8 text-[0.78rem] uppercase tracking-[0.18em] shadow-none sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      "Request consultation"
                    )}
                  </Button>
                </form>

                <aside className="space-y-6">
                  <div className="overflow-hidden border border-[#cbbfae] bg-card shadow-[0_24px_70px_rgba(40,31,21,0.08)]">
                    <img
                      src={gallery1}
                      alt="DORDO consultation inspiration"
                      className="h-[420px] w-full object-cover object-center sm:h-[520px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#d7cbb9] bg-white/70 p-6">
                    <p className="text-[0.8rem] uppercase tracking-[0.24em] text-primary">
                      Not ready for consultation?
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      You can also explore collections first or start directly in the AI design
                      studio.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-none border-[#b9ab9a] bg-transparent px-5 text-[0.74rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                      >
                        <Link to="/collections">Collections</Link>
                      </Button>
                      <Button
                        asChild
                        className="dordo-btn-gold h-11 rounded-none px-5 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
                      >
                        <Link to="/design">Design studio</Link>
                      </Button>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[0.74rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
