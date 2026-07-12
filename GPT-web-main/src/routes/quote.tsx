import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Gem,
  ImagePlus,
  Loader2,
  LockKeyhole,
  Ruler,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { submitQuote } from "@/lib/quote.functions";
import heroGown from "@/assets/hero-gown.jpg";
import { PageHeroWordmark, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>) => search,
  head: () => ({
    meta: [
      { title: "Private Couture Quote | DORDO" },
      {
        name: "description",
        content:
          "Request a private DORDO couture quote. Share your selected design, timeline, measurements, budget direction, and references for atelier review.",
      },
      { property: "og:title", content: "Private Couture Quote | DORDO" },
      {
        property: "og:description",
        content:
          "Your custom dress concept, measurements, references, materials, and timeline are reviewed by the DORDO atelier before pricing is prepared.",
      },
    ],
  }),
  component: QuotePage,
});

const optionalPositiveNumber = z.preprocess(
  (value) =>
    value === "" || value === null || typeof value === "undefined" ? undefined : Number(value),
  z.number().positive().optional(),
);

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  country: z.string().optional(),
  preferredContact: z.string().optional(),
  occasion: z.string().optional(),
  deadline: z.string().optional(),
  budget: z.string().optional(),
  measurementUnit: z.enum(["inches", "centimeters"]),
  bust: optionalPositiveNumber,
  waist: optionalPositiveNumber,
  hips: optionalPositiveNumber,
  height: optionalPositiveNumber,
  shoulderWidth: optionalPositiveNumber,
  armLength: optionalPositiveNumber,
  dressLength: optionalPositiveNumber,
  notes: z.string().optional(),
  designPrompt: z.string().optional(),
  generatedImage: z.string().optional(),
  referenceImages: z.string().optional(),
  consent: z.boolean().refine((value) => value, "Please confirm the privacy and quote terms."),
});

type QuoteForm = z.infer<typeof quoteSchema>;

type UploadedImage = {
  id: string;
  label: string;
  data: string;
};

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_REFERENCE_IMAGES = 8;

const reassuranceBlocks = [
  {
    icon: CreditCard,
    title: "No payment required",
    text: "This begins a private review. It is not a checkout or purchase commitment.",
  },
  {
    icon: ShieldCheck,
    title: "Private atelier review",
    text: "Your photos, notes, measurements, and selected concept are treated as a private couture brief.",
  },
  {
    icon: Gem,
    title: "Real construction assessed",
    text: "We consider fabric, structure, embellishment, finishing, fit, and timing before pricing.",
  },
  {
    icon: Clock,
    title: "Response in 24–48 hours",
    text: "Our team reviews your request and contacts you with quote details and any needed clarification.",
  },
];

const budgetOptions = [
  "I need guidance",
  "Under $1,500",
  "$1,500–$3,000",
  "$3,000–$5,000",
  "$5,000–$10,000",
  "$10,000+",
];

function QuotePage() {
  const { image, prompt } = useSearch({ from: "/quote" }) as { image?: string; prompt?: string };
  const submit = useServerFn(submitQuote);
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [referenceImages, setReferenceImages] = useState<UploadedImage[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      designPrompt: "",
      generatedImage: "",
      referenceImages: "[]",
      measurementUnit: "inches",
      consent: false,
    },
  });

  const measurementUnit = watch("measurementUnit");

  useEffect(() => {
    const storedImage = sessionStorage.getItem("dordoGeneratedImage") || "";
    const storedPrompt = sessionStorage.getItem("dordoDesignPrompt") || "";
    const storedReferences = sessionStorage.getItem("dordoReferenceImages") || "[]";
    const finalImage = image || storedImage;
    const finalPrompt = prompt || storedPrompt;

    let parsedReferences: UploadedImage[] = [];
    try {
      const parsed = JSON.parse(storedReferences);
      if (Array.isArray(parsed)) {
        parsedReferences = parsed
          .filter((item): item is UploadedImage =>
            Boolean(
              item &&
              typeof item.id === "string" &&
              typeof item.label === "string" &&
              typeof item.data === "string",
            ),
          )
          .slice(0, MAX_REFERENCE_IMAGES);
      }
    } catch {
      parsedReferences = [];
    }

    setSelectedImage(finalImage);
    setSelectedPrompt(finalPrompt);
    setReferenceImages(parsedReferences);
    setValue("generatedImage", finalImage);
    setValue("designPrompt", finalPrompt);
    setValue("referenceImages", JSON.stringify(parsedReferences));
  }, [image, prompt, setValue]);

  useEffect(() => {
    setValue("referenceImages", JSON.stringify(referenceImages), { shouldValidate: true });
  }, [referenceImages, setValue]);

  const onSubmit = async (data: QuoteForm) => {
    try {
      await submit({ data });
      setSubmitted(true);
      sessionStorage.removeItem("dordoGeneratedImage");
      sessionStorage.removeItem("dordoDesignPrompt");
      sessionStorage.removeItem("dordoReferenceImages");
      toast.success("Your private request has been received.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send request";
      toast.error(message);
    }
  };

  const handleReferenceUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    const remaining = MAX_REFERENCE_IMAGES - referenceImages.length;
    if (remaining <= 0) {
      toast.error(`You can attach up to ${MAX_REFERENCE_IMAGES} references.`);
      return;
    }

    const chosen = files.slice(0, remaining);
    if (files.length > remaining)
      toast.info(`Only the first ${remaining} image${remaining === 1 ? "" : "s"} were added.`);

    const next: UploadedImage[] = [];
    for (const [index, file] of chosen.entries()) {
      try {
        validateImageFile(file);
        const data = await compressImage(file);
        next.push({
          id: createId(),
          label: `Quote reference ${referenceImages.length + index + 1}`,
          data,
        });
      } catch (error) {
        toast.error(
          `${file.name}: ${error instanceof Error ? error.message : "Could not read image."}`,
        );
      }
    }
    setReferenceImages((current) => [...current, ...next].slice(0, MAX_REFERENCE_IMAGES));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="quote" />

      <main>
        <section className="dordo-split-hero relative isolate overflow-hidden border-b border-black/6 bg-[#eee4d7]">
          <img
            src={selectedImage || heroGown}
            alt="DORDO private couture quote"
            className="dordo-split-hero-image absolute inset-0 h-full w-full object-cover object-[68%_center]"
            loading="eager"
          />
          <div className="dordo-split-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(247,239,228,.99)_0%,rgba(247,239,228,.94)_40%,rgba(247,239,228,.64)_62%,rgba(20,20,20,.20)_100%)]" />

          <div className="dordo-split-hero-layout container-atelier relative z-10 grid min-h-[610px] items-center py-16 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="dordo-split-hero-copy max-w-2xl">
              <PageHeroWordmark />
              <p className="mt-4 text-[0.74rem] uppercase tracking-[0.28em] text-primary">
                Private atelier review
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em] text-[#28211b] sm:text-5xl">
                Turn your selected concept into a real couture proposal.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#51473d]">
                Share your event, timing, budget direction, measurements, and private references.
                The DORDO team reviews what it will take to make the garment before preparing
                pricing.
              </p>
              <div className="mobile-primary-actions mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="dordo-btn-dark h-13 rounded-none px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-none"
                >
                  <a href="#quote-form">
                    Start the request <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-13 rounded-none border-[#9e8d78] bg-white/35 px-8 text-[0.74rem] uppercase tracking-[0.2em] shadow-none hover:bg-white/75"
                >
                  <Link to="/measurement-guide">Measurement guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 bg-[#fffaf4]">
          <div className="dordo-quote-reassurance container-atelier grid gap-px border-x border-[#d7cbb9] bg-[#d7cbb9] md:grid-cols-2 xl:grid-cols-4">
            {reassuranceBlocks.map((item) => (
              <div key={item.title} className="bg-[#fffaf4] p-6 text-center md:p-7">
                <div className="mx-auto flex h-11 w-11 items-center justify-center border border-primary/25 bg-primary/8 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-serif text-xl leading-tight text-[#2a231d]">
                  {item.title}
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f7f0e7]" id="quote-form">
          <div className="dordo-design-shell container-atelier py-12 md:py-18">
            {submitted ? (
              <div className="mx-auto max-w-3xl border border-[#cbbfae] bg-[#fffaf4] px-7 py-16 text-center shadow-[0_24px_70px_rgba(40,31,21,.10)] md:px-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="mt-6 text-[0.74rem] uppercase tracking-[0.25em] text-primary">
                  Request received
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
                  Your private couture brief is now with the atelier.
                </h2>
                <GoldDivider className="mt-6 justify-center" />
                <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                  We will review the design direction, references, measurements, budget, and timing.
                  We may contact you for clarification before preparing the proposal.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="dordo-btn-dark h-12 rounded-none px-8 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
                  >
                    <Link to="/">Return home</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none border-[#a99a87] bg-transparent px-8 text-[0.74rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                  >
                    <Link to="/collections">Explore collections</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-7">
                <div className="dordo-mobile-preview-card xl:hidden">
                  <img src={selectedImage || heroGown} alt="Selected DORDO design" />
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#d8b36e]">
                      Private couture request
                    </p>
                    <p className="mt-2 font-serif text-[1.35rem] leading-tight text-white">
                      {selectedImage
                        ? "Your selected concept is attached"
                        : "Atelier guidance is available"}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/62">
                      No payment is required to submit this request.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="dordo-quote-form-card dordo-card p-5 sm:p-7 md:p-9"
                >
                  <FormSection
                    number="1"
                    eyebrow="Contact & event"
                    title="Tell us who this dress is for."
                    text="Only your name and email are required to begin. The remaining details help us respond with a more useful first review."
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Full name *" error={errors.name?.message}>
                        <Input
                          {...register("name")}
                          autoComplete="name"
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Email *" error={errors.email?.message}>
                        <Input
                          type="email"
                          {...register("email")}
                          autoComplete="email"
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Phone / WhatsApp">
                        <Input
                          {...register("phone")}
                          autoComplete="tel"
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Country / delivery location">
                        <Input
                          {...register("country")}
                          autoComplete="country-name"
                          placeholder="Country or city"
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Preferred contact method">
                        <select
                          {...register("preferredContact")}
                          className="dordo-select h-12 w-full rounded-none bg-[#fffaf4] px-3 text-sm"
                        >
                          <option value="">Select one</option>
                          <option value="Email">Email</option>
                          <option value="Phone">Phone</option>
                          <option value="WhatsApp">WhatsApp</option>
                        </select>
                      </Field>
                      <Field label="Occasion / event">
                        <Input
                          {...register("occasion")}
                          placeholder="Wedding, gala, reception..."
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Need by">
                        <Input
                          type="date"
                          {...register("deadline")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </Field>
                      <Field label="Budget direction">
                        <select
                          {...register("budget")}
                          className="dordo-select h-12 w-full rounded-none bg-[#fffaf4] px-3 text-sm"
                        >
                          <option value="">Select a range</option>
                          {budgetOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </FormSection>

                  <FormSection
                    number="2"
                    eyebrow="Measurements"
                    title="Share what you have today."
                    text="You do not need perfect measurements at this stage. Choose one unit system and leave any uncertain field empty. The atelier can guide you later."
                  >
                    <div className="mb-5 flex flex-col gap-3 border border-[#d6caba] bg-[#f7efe4] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Ruler className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-[#2a231d]">Measurement units</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Use the same unit for every field.
                          </p>
                        </div>
                      </div>
                      <div className="flex border border-[#bfae98] bg-[#fffaf4]">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value="inches"
                            {...register("measurementUnit")}
                            className="peer sr-only"
                          />
                          <span className="block px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground peer-checked:bg-[#1b1b1a] peer-checked:text-white">
                            Inches
                          </span>
                        </label>
                        <label className="cursor-pointer border-l border-[#bfae98]">
                          <input
                            type="radio"
                            value="centimeters"
                            {...register("measurementUnit")}
                            className="peer sr-only"
                          />
                          <span className="block px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground peer-checked:bg-[#1b1b1a] peer-checked:text-white">
                            Centimeters
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      <MeasurementField
                        label="Bust"
                        unit={measurementUnit}
                        error={errors.bust?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("bust")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Waist"
                        unit={measurementUnit}
                        error={errors.waist?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("waist")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Hips"
                        unit={measurementUnit}
                        error={errors.hips?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("hips")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Height"
                        unit={measurementUnit}
                        error={errors.height?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("height")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Shoulder width"
                        unit={measurementUnit}
                        error={errors.shoulderWidth?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("shoulderWidth")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Arm length"
                        unit={measurementUnit}
                        error={errors.armLength?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("armLength")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                      <MeasurementField
                        label="Dress length"
                        unit={measurementUnit}
                        error={errors.dressLength?.message}
                      >
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          {...register("dressLength")}
                          className="h-12 rounded-none bg-[#fffaf4]"
                        />
                      </MeasurementField>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-5 h-11 rounded-none border-[#a99a87] bg-transparent px-5 text-[0.68rem] uppercase tracking-[0.16em] shadow-none hover:bg-white/70"
                    >
                      <Link to="/measurement-guide">
                        <Ruler className="mr-2 h-4 w-4" />
                        Open measurement guide
                      </Link>
                    </Button>
                  </FormSection>

                  <FormSection
                    number="3"
                    eyebrow="Private references"
                    title="Add anything the atelier should see."
                    text="References from the AI design studio appear here automatically. You can remove them or add more fabric, fit, dress, or styling images."
                  >
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                      {referenceImages.map((reference) => (
                        <div
                          key={reference.id}
                          className="group relative overflow-hidden border border-[#cbbdaa] bg-[#f2e8dc]"
                        >
                          <img
                            src={reference.data}
                            alt={reference.label}
                            className="aspect-square w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setReferenceImages((current) =>
                                current.filter((item) => item.id !== reference.id),
                              )
                            }
                            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center bg-black/70 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                            aria-label={`Remove ${reference.label}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {referenceImages.length < MAX_REFERENCE_IMAGES ? (
                        <>
                          <input
                            id="quote-reference-upload"
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleReferenceUpload}
                          />
                          <label
                            htmlFor="quote-reference-upload"
                            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[#bfae98] bg-[#f4ecdf] text-muted-foreground transition hover:border-primary hover:bg-white"
                          >
                            <Upload className="h-6 w-6 text-primary/75" />
                            <span className="text-center text-[0.58rem] uppercase tracking-[0.13em]">
                              Add photos
                            </span>
                          </label>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                      <p>JPG, PNG, or WebP. Up to 8 MB per original image.</p>
                      <p className="shrink-0 uppercase tracking-[0.14em] text-primary">
                        {referenceImages.length}/{MAX_REFERENCE_IMAGES}
                      </p>
                    </div>
                  </FormSection>

                  <FormSection
                    number="4"
                    eyebrow="Final notes"
                    title="Tell us what matters most."
                    text="Mention fit concerns, coverage, comfort, fabric expectations, embellishment, delivery, or questions you want answered in the first response."
                  >
                    <Field label="Additional notes" error={errors.notes?.message}>
                      <Textarea
                        placeholder="Example: I want a supportive bodice, comfortable movement, a detachable train, and no deep back. I am open to fabric suggestions within the selected budget..."
                        {...register("notes")}
                        className="min-h-[160px] resize-none rounded-none bg-[#fffaf4]"
                      />
                    </Field>

                    <input type="hidden" {...register("designPrompt")} />
                    <input type="hidden" {...register("generatedImage")} />
                    <input type="hidden" {...register("referenceImages")} />

                    <label className="mt-6 flex cursor-pointer items-start gap-3 border border-[#d4c7b5] bg-[#f7efe4] p-5">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="mt-1 h-4 w-4 accent-[#1b1b1a]"
                      />
                      <span className="text-sm leading-7 text-muted-foreground">
                        I confirm that I am submitting these details and images for private DORDO
                        atelier review. I understand that this is a quote request, not a final order
                        or payment, and that measurements may need verification before production.
                      </span>
                    </label>
                    {errors.consent?.message ? (
                      <p className="mt-2 text-xs text-destructive">{errors.consent.message}</p>
                    ) : null}
                  </FormSection>

                  <div className="dordo-mobile-submit-actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="dordo-btn-dark h-13 rounded-none px-8 text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending private request
                        </>
                      ) : (
                        <>
                          Send private request <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-13 rounded-none border-[#a99a87] bg-transparent px-6 text-[0.74rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                    >
                      <Link to="/design">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to design
                      </Link>
                    </Button>
                  </div>
                </form>

                <aside className="hidden space-y-5 xl:sticky xl:top-[108px] xl:block xl:self-start">
                  <div className="overflow-hidden border border-[#bfae98] bg-[#eee3d6] shadow-[0_24px_70px_rgba(40,31,21,.12)]">
                    <div className="bg-[#141616] px-6 py-5 text-white">
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#d5aa63]">
                        Selected design
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-tight">
                        Concept sent with your request
                      </p>
                    </div>
                    <div className="p-4">
                      <img
                        src={selectedImage || heroGown}
                        alt="Selected DORDO design"
                        className="aspect-[3/4] w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="dordo-card p-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                      Design summary
                    </p>
                    <p className="mt-4 max-h-[220px] overflow-y-auto pr-2 text-sm leading-7 text-muted-foreground">
                      {selectedPrompt ||
                        "If you created a design in the AI studio, its summary will appear here. You may still request a consultation without an AI design."}
                    </p>
                  </div>

                  <div className="border border-[#2b2d2d] bg-[#141616] p-7 text-white">
                    <div className="flex items-center gap-3">
                      <LockKeyhole className="h-5 w-5 text-[#d5aa63]" />
                      <p className="font-serif text-xl">What happens next</p>
                    </div>
                    <ol className="mt-5 space-y-4 text-sm leading-7 text-white/68">
                      <li className="flex gap-3">
                        <span className="text-[#d5aa63]">1</span>
                        <span>
                          We review the design, references, measurements, budget, and date.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#d5aa63]">2</span>
                        <span>
                          We contact you if fit, fabric, or construction details need clarification.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#d5aa63]">3</span>
                        <span>
                          We prepare a personalized proposal and explain the next commitment step.
                        </span>
                      </li>
                    </ol>
                    <Button
                      asChild
                      className="dordo-btn-gold mt-6 h-11 rounded-none px-5 text-[0.68rem] uppercase tracking-[0.18em] shadow-none"
                    >
                      <Link to="/how-it-works">See the complete process</Link>
                    </Button>
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

function FormSection({
  number,
  eyebrow,
  title,
  text,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-[#d8cbb9] py-8 first:pt-0 last:border-b-0 last:pb-0">
      <div className="grid gap-4 md:grid-cols-[64px_1fr]">
        <span className="font-serif text-4xl text-[#c3b198]">{number}</span>
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.03em] text-[#29221c]">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{text}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function MeasurementField({
  label,
  unit,
  error,
  children,
}: {
  label: string;
  unit: "inches" | "centimeters";
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center justify-between gap-2 text-[0.68rem] uppercase tracking-[0.13em] text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary">{unit === "inches" ? "in" : "cm"}</span>
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function validateImageFile(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("Use JPG, PNG, or WebP format.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image must be smaller than 8 MB.");
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("This image could not be opened."));
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Could not prepare this image."));
          return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.76));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
