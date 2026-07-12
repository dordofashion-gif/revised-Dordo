import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, ElementType, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Download,
  Gem,
  ImagePlus,
  Loader2,
  LockKeyhole,
  PencilLine,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import heroGown from "@/assets/hero-gown.jpg";
import { BrandWord, GoldDivider, SiteFooter, SiteHeader } from "@/components/site-brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design Your Dress | DORDO AI Couture Studio" },
      {
        name: "description",
        content:
          "Build a private custom dress concept with DORDO. Upload references, choose silhouette, color, fabric, and details, generate AI variations, then request an atelier quote.",
      },
      { property: "og:title", content: "Design Your Dress | DORDO" },
      {
        property: "og:description",
        content:
          "Upload your references, define your style, and create a couture concept for atelier review.",
      },
    ],
  }),
  component: DesignStudio,
});

const OCCASIONS = [
  { value: "Wedding", detail: "Ceremony or bridal look" },
  { value: "Reception", detail: "A second bridal statement" },
  { value: "Evening gala", detail: "Formal and refined" },
  { value: "Red carpet", detail: "High-impact couture" },
  { value: "Cocktail", detail: "Shorter, modern occasion" },
  { value: "Celebration", detail: "Birthday or private event" },
];

const SILHOUETTES = [
  { value: "A-line", detail: "Softly fitted, timeless", icon: Sparkles },
  { value: "Mermaid", detail: "Sculpted with dramatic flare", icon: Gem },
  { value: "Ball gown", detail: "Defined waist, full skirt", icon: WandSparkles },
  { value: "Column", detail: "Clean, elongated line", icon: PencilLine },
  { value: "Fit-and-flare", detail: "Balanced and feminine", icon: CheckCircle2 },
  { value: "Corset gown", detail: "Structured bodice focus", icon: ShieldCheck },
];

const FABRICS = [
  "Silk satin",
  "Crepe",
  "Chiffon",
  "Lace",
  "Tulle",
  "Velvet",
  "Organza",
  "Beaded mesh",
];
const LENGTHS = ["Floor-length", "Cathedral train", "Chapel train", "Tea-length", "Midi", "Mini"];
const NECKLINES = [
  "Sweetheart",
  "V-neck",
  "Off-shoulder",
  "Strapless",
  "Square neck",
  "High neck",
  "Asymmetric",
];
const SLEEVE_STYLES = [
  "Sleeveless",
  "Cap sleeve",
  "Short sleeve",
  "Long sleeve",
  "Puff sleeve",
  "Cape sleeve",
  "Detachable sleeve",
];
const BACK_STYLES = [
  "Closed back",
  "Low back",
  "Open back",
  "Lace-up corset",
  "Button back",
  "Illusion back",
];
const DETAILS = [
  "Hand beading",
  "Pearl work",
  "Crystal detail",
  "Embroidery",
  "Draping",
  "Ruching",
  "Slit",
  "Overskirt",
  "Bow",
  "Detachable train",
];
const COLOR_SWATCHES = [
  { name: "Ivory", hex: "#f4efe4" },
  { name: "Champagne", hex: "#d8c2a2" },
  { name: "Blush", hex: "#d9b4ad" },
  { name: "Black", hex: "#171717" },
  { name: "Emerald", hex: "#173f32" },
  { name: "Burgundy", hex: "#5b1f2a" },
  { name: "Navy", hex: "#18263d" },
  { name: "Gold", hex: "#b58a45" },
];

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_REFERENCE_IMAGES = 8;

const steps = [
  { id: 1, label: "References", short: "Upload" },
  { id: 2, label: "Preferences", short: "Style" },
  { id: 3, label: "Generate", short: "AI" },
  { id: 4, label: "Review", short: "Select" },
];

type UploadedImage = {
  id: string;
  label: string;
  data: string;
};

type ChoiceOption = {
  value: string;
  detail?: string;
  icon?: ElementType;
};

function DesignStudio() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [occasion, setOccasion] = useState("");
  const [customOccasion, setCustomOccasion] = useState("");
  const [silhouette, setSilhouette] = useState("");
  const [customSilhouette, setCustomSilhouette] = useState("");
  const [fabric, setFabric] = useState("");
  const [length, setLength] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [customFabric, setCustomFabric] = useState("");
  const [neckline, setNeckline] = useState("");
  const [sleeveStyle, setSleeveStyle] = useState("");
  const [backStyle, setBackStyle] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  const [extraDetails, setExtraDetails] = useState("");

  const [facePhoto, setFacePhoto] = useState<UploadedImage | null>(null);
  const [frontBodyPhoto, setFrontBodyPhoto] = useState<UploadedImage | null>(null);
  const [inspirationPhotos, setInspirationPhotos] = useState<UploadedImage[]>([]);

  const [variations, setVariations] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState("");
  const [loading, setLoading] = useState(false);

  const allReferences = useMemo(
    () => [
      ...(facePhoto ? [facePhoto] : []),
      ...(frontBodyPhoto ? [frontBodyPhoto] : []),
      ...inspirationPhotos,
    ],
    [facePhoto, frontBodyPhoto, inspirationPhotos],
  );

  const buildPrompt = () => {
    const occasionDirection = customOccasion.trim() || occasion;
    const silhouetteDirection = customSilhouette.trim() || silhouette;
    const colorDirection = customColor.trim() || selectedColor;
    const structuredParts = [
      prompt.trim(),
      "luxury custom couture dress",
      occasionDirection ? `occasion: ${occasionDirection.toLowerCase()}` : "",
      silhouetteDirection ? `silhouette: ${silhouetteDirection.toLowerCase()}` : "",
      fabric ? `primary fabric: ${fabric.toLowerCase()}` : "",
      customFabric ? `custom fabric or texture: ${customFabric.trim()}` : "",
      colorDirection ? `color palette: ${colorDirection}` : "",
      length ? `length: ${length.toLowerCase()}` : "",
      neckline ? `neckline: ${neckline.toLowerCase()}` : "",
      sleeveStyle ? `sleeve style: ${sleeveStyle.toLowerCase()}` : "",
      backStyle ? `back style: ${backStyle.toLowerCase()}` : "",
      selectedDetails.length ? `details: ${selectedDetails.join(", ").toLowerCase()}` : "",
      extraDetails ? `special instructions: ${extraDetails.trim()}` : "",
      "full-length editorial fashion image",
      "realistic couture construction",
      "elegant luxury atelier lighting",
      "high-end fashion photography",
    ].filter(Boolean);

    return structuredParts.join(", ");
  };

  const handleSingleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    label: string,
    setter: (image: UploadedImage | null) => void,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      validateImageFile(file);
      const data = await compressImage(file);
      setter({ id: createId(), label, data });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read this image.");
    }
  };

  const handleMultipleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    label: string,
    current: UploadedImage[],
    setter: (images: UploadedImage[]) => void,
    groupLimit: number,
  ) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    const remainingGroup = Math.max(0, groupLimit - current.length);
    const remainingTotal = Math.max(0, MAX_REFERENCE_IMAGES - allReferences.length);
    const allowed = Math.min(remainingGroup, remainingTotal);

    if (allowed <= 0) {
      toast.error(`You can attach up to ${MAX_REFERENCE_IMAGES} references in total.`);
      return;
    }

    const chosen = files.slice(0, allowed);
    if (files.length > allowed)
      toast.info(`Only the first ${allowed} image${allowed === 1 ? "" : "s"} were added.`);

    const next: UploadedImage[] = [];
    for (const [index, file] of chosen.entries()) {
      try {
        validateImageFile(file);
        const data = await compressImage(file);
        next.push({ id: createId(), label: `${label} ${current.length + index + 1}`, data });
      } catch (error) {
        toast.error(
          `${file.name}: ${error instanceof Error ? error.message : "Could not read image."}`,
        );
      }
    }
    setter([...current, ...next]);
  };

  const removeMultiImage = (
    id: string,
    current: UploadedImage[],
    setter: (images: UploadedImage[]) => void,
  ) => setter(current.filter((image) => image.id !== id));

  const toggleDetail = (detail: string) => {
    setSelectedDetails((current) =>
      current.includes(detail) ? current.filter((item) => item !== detail) : [...current, detail],
    );
  };

  const generate = async () => {
    const finalPrompt = buildPrompt();
    if (
      !prompt.trim() &&
      !occasion &&
      !customOccasion &&
      !silhouette &&
      !customSilhouette &&
      !fabric &&
      !customFabric &&
      !selectedColor &&
      !customColor
    ) {
      toast.error("Describe your vision or choose a few design preferences first.");
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      const body: Record<string, string> = { prompt: finalPrompt };
      const currentModelReference = inspirationPhotos[0]?.data;
      if (currentModelReference) body.image = currentModelReference;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const contentType = res.headers.get("content-type") || "";
      const responseBody = contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() };

      if (!res.ok) throw new Error(responseBody.error || "Image generation failed");
      if (!responseBody.image) throw new Error("No image was returned by the image service.");

      setVariations((current) => [responseBody.image, ...current].slice(0, 4));
      setSelectedDesign(responseBody.image);
      setStep(4);
      toast.success("Your couture concept is ready.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const saveDesignForQuote = () => {
    const finalPrompt = buildPrompt();
    try {
      if (selectedDesign) sessionStorage.setItem("dordoGeneratedImage", selectedDesign);
      sessionStorage.setItem("dordoDesignPrompt", finalPrompt);
      sessionStorage.setItem(
        "dordoReferenceImages",
        JSON.stringify(allReferences.slice(0, MAX_REFERENCE_IMAGES)),
      );
    } catch {
      sessionStorage.removeItem("dordoReferenceImages");
      toast.info(
        "Your selected design was saved, but some large reference images must be uploaded again on the quote page.",
      );
    }
  };

  const nextStep = () => {
    if (
      step === 2 &&
      !prompt.trim() &&
      !occasion &&
      !customOccasion &&
      !silhouette &&
      !customSilhouette &&
      !fabric &&
      !customFabric &&
      !selectedColor &&
      !customColor
    ) {
      toast.error("Add at least one preference or a short description of your dress.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  };

  const previousStep = () => setStep((current) => Math.max(1, current - 1));

  const previewImage = selectedDesign || variations[0] || inspirationPhotos[0]?.data || heroGown;
  const promptSummary = buildPrompt();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader current="design" />

      <main>
        <section className="border-b border-black/6 bg-[#f7f0e7]">
          <div className="dordo-design-intro container-atelier py-12 md:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[0.74rem] uppercase tracking-[0.3em] text-primary">
                DORDO private design studio
              </p>
              <BrandWord className="mx-auto mt-5 block max-w-[590px] text-[4.4rem] leading-none sm:text-[5.8rem] lg:text-[6.8rem]" />
              <h1 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.035em] text-[#28211b] sm:text-5xl">
                Design a dress that begins with you.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Upload what inspires you, define the details, create AI variations, and send your
                selected concept to the atelier for a real couture review.
              </p>
            </div>

            <StepProgress step={step} onStepChange={setStep} hasDesign={Boolean(selectedDesign)} />
          </div>
        </section>

        <section className="bg-[#fbf6ee]">
          <div className="dordo-design-shell container-atelier py-10 md:py-14">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,.62fr)] xl:gap-7">
              <div className="dordo-mobile-preview-card xl:hidden">
                <img src={previewImage} alt="Current DORDO design direction" />
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#d8b36e]">
                    Step {step} of 4 · Live preview
                  </p>
                  <p className="mt-2 font-serif text-[1.35rem] leading-tight text-white">
                    {selectedDesign
                      ? "Selected couture concept"
                      : inspirationPhotos[0]
                        ? "Reference direction"
                        : "Your design journey"}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/62">
                    {allReferences.length} references · {variations.length} AI variations
                  </p>
                </div>
              </div>

              <div className="dordo-design-form-card dordo-card p-5 sm:p-7 md:p-9">
                {step === 1 && (
                  <div>
                    <StepHeading
                      number="1"
                      eyebrow="Your private references"
                      title="Show us what words cannot"
                      text="References are optional, but they help communicate personal style, proportion, fabric, and the look you want. Images are prepared for private atelier review."
                    />

                    <div className="dordo-mobile-card-rail dordo-compact-rail mt-8 grid gap-5 lg:grid-cols-3">
                      <SingleUploadCard
                        id="face-photo"
                        title="Face / personal style"
                        helper="A clear portrait or styling photo."
                        icon={UserRound}
                        image={facePhoto}
                        onChange={(event) =>
                          handleSingleUpload(event, "Face / personal style", setFacePhoto)
                        }
                        onRemove={() => setFacePhoto(null)}
                      />
                      <SingleUploadCard
                        id="front-body-photo"
                        title="Front body reference"
                        helper="A fitted, full-length front view."
                        icon={Camera}
                        image={frontBodyPhoto}
                        onChange={(event) =>
                          handleSingleUpload(event, "Front body reference", setFrontBodyPhoto)
                        }
                        onRemove={() => setFrontBodyPhoto(null)}
                      />
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      <MultiUploadCard
                        id="dress-inspiration"
                        title="Dress inspiration"
                        helper="Add dresses, sketches, or screenshots. The image can guide our AI model to generate your desired design."
                        icon={Sparkles}
                        images={inspirationPhotos}
                        max={4}
                        onChange={(event) =>
                          handleMultipleUpload(
                            event,
                            "Dress inspiration",
                            inspirationPhotos,
                            setInspirationPhotos,
                            4,
                          )
                        }
                        onRemove={(id) =>
                          removeMultiImage(id, inspirationPhotos, setInspirationPhotos)
                        }
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-4 border border-[#d7cbb9] bg-[#f8f1e8] p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-3">
                        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-[#2a231d]">Private by design</p>
                          <p className="mt-1 text-xs leading-6 text-muted-foreground">
                            Your personal references are not shown publicly. Only dress inspiration
                            is sent to the current AI model.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="dordo-mobile-step-actions mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="h-12 rounded-none border-[#a99a87] bg-transparent px-6 text-[0.72rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                      >
                        Continue without photos
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="dordo-btn-dark h-12 rounded-none px-8 text-[0.72rem] uppercase tracking-[0.18em] shadow-none"
                      >
                        Define the design <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <StepHeading
                      number="2"
                      eyebrow="Design preferences"
                      title="Build the visual language of your dress."
                      text="Select what you know and describe anything that is not listed. Every choice remains editable before you generate."
                    />

                    <DesignSection
                      title="Occasion"
                      helper="Choose a suggested occasion or describe your own event."
                    >
                      <ChoiceGrid
                        options={OCCASIONS}
                        value={occasion}
                        onChange={(value) => {
                          setOccasion(value);
                          if (value) setCustomOccasion("");
                        }}
                        columns="md:grid-cols-3"
                      />
                      <div className="mt-4">
                        <FieldLabel label="Custom occasion or event">
                          <Input
                            value={customOccasion}
                            onChange={(event) => {
                              setCustomOccasion(event.target.value);
                              if (event.target.value) setOccasion("");
                            }}
                            placeholder="Example: engagement dinner, cultural ceremony, or graduation gala"
                            className="h-12 rounded-none bg-[#fffaf4]"
                          />
                        </FieldLabel>
                      </div>
                    </DesignSection>

                    <DesignSection
                      title="Silhouette"
                      helper="Choose the closest shape or describe a custom silhouette."
                    >
                      <ChoiceGrid
                        options={SILHOUETTES}
                        value={silhouette}
                        onChange={(value) => {
                          setSilhouette(value);
                          if (value) setCustomSilhouette("");
                        }}
                        columns="md:grid-cols-3"
                      />
                      <div className="mt-4">
                        <FieldLabel label="Custom silhouette or shape">
                          <Input
                            value={customSilhouette}
                            onChange={(event) => {
                              setCustomSilhouette(event.target.value);
                              if (event.target.value) setSilhouette("");
                            }}
                            placeholder="Example: fitted corset bodice with a soft asymmetric overskirt"
                            className="h-12 rounded-none bg-[#fffaf4]"
                          />
                        </FieldLabel>
                      </div>
                    </DesignSection>

                    <DesignSection
                      title="Color direction"
                      helper="Choose a palette or describe a precise shade."
                    >
                      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                        {COLOR_SWATCHES.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => {
                              setSelectedColor(color.name);
                              setCustomColor("");
                            }}
                            className={cn(
                              "group border bg-white p-2 text-center transition",
                              selectedColor === color.name && !customColor
                                ? "border-[#1c1a17] ring-1 ring-[#1c1a17]"
                                : "border-[#d5c8b6] hover:border-primary",
                            )}
                          >
                            <span
                              className="mx-auto block aspect-square w-full border border-black/10"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="mt-2 block text-[0.63rem] uppercase tracking-[0.12em] text-[#51473d]">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <FieldLabel label="Custom color or palette">
                          <Input
                            value={customColor}
                            onChange={(event) => {
                              setCustomColor(event.target.value);
                              if (event.target.value) setSelectedColor("");
                            }}
                            placeholder="Example: muted rose with warm champagne undertone"
                            className="h-12 rounded-none bg-[#fffaf4]"
                          />
                        </FieldLabel>
                      </div>
                    </DesignSection>

                    <DesignSection
                      title="Fabric"
                      helper="Select a primary fabric and add a custom description if needed."
                    >
                      <PillChoices options={FABRICS} value={fabric} onChange={setFabric} />
                      <div className="mt-4">
                        <FieldLabel label="Custom fabric, texture, or embellishment material">
                          <Input
                            value={customFabric}
                            onChange={(event) => setCustomFabric(event.target.value)}
                            placeholder="Example: pearl-embroidered lace over silk satin"
                            className="h-12 rounded-none bg-[#fffaf4]"
                          />
                        </FieldLabel>
                      </div>
                    </DesignSection>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <DesignSection compact title="Neckline">
                        <PillChoices options={NECKLINES} value={neckline} onChange={setNeckline} />
                      </DesignSection>
                      <DesignSection compact title="Sleeves">
                        <PillChoices
                          options={SLEEVE_STYLES}
                          value={sleeveStyle}
                          onChange={setSleeveStyle}
                        />
                      </DesignSection>
                      <DesignSection compact title="Length & train">
                        <PillChoices options={LENGTHS} value={length} onChange={setLength} />
                      </DesignSection>
                      <DesignSection compact title="Back style">
                        <PillChoices
                          options={BACK_STYLES}
                          value={backStyle}
                          onChange={setBackStyle}
                        />
                      </DesignSection>
                    </div>

                    <DesignSection title="Couture details" helper="Choose as many as you want.">
                      <div className="flex flex-wrap gap-2">
                        {DETAILS.map((detail) => {
                          const active = selectedDetails.includes(detail);
                          return (
                            <button
                              key={detail}
                              type="button"
                              onClick={() => toggleDetail(detail)}
                              className={cn(
                                "inline-flex min-h-10 items-center border px-4 text-[0.68rem] uppercase tracking-[0.14em] transition",
                                active
                                  ? "border-[#1b1b1a] bg-[#1b1b1a] text-white"
                                  : "border-[#cbbdaa] bg-[#fffaf4] text-[#51473d] hover:border-primary",
                              )}
                            >
                              {active ? <Check className="mr-2 h-3.5 w-3.5" /> : null}
                              {detail}
                            </button>
                          );
                        })}
                      </div>
                    </DesignSection>

                    <DesignSection
                      title="Describe your vision"
                      helper="This is where you can be specific, emotional, or completely original."
                    >
                      <Textarea
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                        placeholder="Example: A sculpted black evening gown inspired by 1950s couture, with a clean off-shoulder neckline, dramatic draping at the hip, and a refined floor-length skirt..."
                        className="min-h-[150px] resize-none rounded-none bg-[#fffaf4]"
                      />
                    </DesignSection>

                    <DesignSection
                      title="Fit concerns or special instructions"
                      helper="Tell the atelier what should feel covered, supported, detachable, comfortable, or emphasized."
                    >
                      <Textarea
                        value={extraDetails}
                        onChange={(event) => setExtraDetails(event.target.value)}
                        placeholder="Example: Supportive corset structure, comfortable movement through the hips, detachable sleeves, no deep back..."
                        className="min-h-[120px] resize-none rounded-none bg-[#fffaf4]"
                      />
                    </DesignSection>

                    <div className="dordo-mobile-step-actions mt-8 flex flex-col justify-between gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                        className="h-12 rounded-none border-[#a99a87] bg-transparent px-6 text-[0.72rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> References
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="dordo-btn-dark h-12 rounded-none px-8 text-[0.72rem] uppercase tracking-[0.18em] shadow-none"
                      >
                        Review the brief <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <StepHeading
                      number="3"
                      eyebrow="AI concept generation"
                      title="Review the brief before creating."
                      text="The AI image is a visual concept. Fabric behavior, support, fit, embellishment, and construction are evaluated later by the atelier."
                    />

                    <div className="mt-8 grid gap-5 md:grid-cols-[1fr_220px]">
                      <div className="border border-[#d5c8b6] bg-[#fffaf4] p-6">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                          Design brief sent to AI
                        </p>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                          {promptSummary || "Your design brief will appear here."}
                        </p>
                      </div>
                      <div className="border border-[#d5c8b6] bg-[#f3eadf] p-5">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                          Reference use
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {inspirationPhotos[0]
                            ? "The first dress reference will guide this image generation."
                            : "This generation will use your written design brief only."}
                        </p>
                        <p className="mt-3 text-xs leading-6 text-muted-foreground">
                          Face and body photos are not sent to the current AI model.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3 border border-[#d5c8b6] bg-[#151717] p-5 text-white">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d5aa63]" />
                      <p className="text-sm leading-7 text-white/68">
                        Generate up to four variations during this session. You can select the
                        strongest direction, download it, edit your preferences, or generate another
                        version.
                      </p>
                    </div>

                    <div className="dordo-mobile-step-actions mt-8 flex flex-col justify-between gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                        className="h-12 rounded-none border-[#a99a87] bg-transparent px-6 text-[0.72rem] uppercase tracking-[0.18em] shadow-none hover:bg-white/70"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Edit preferences
                      </Button>
                      <Button
                        type="button"
                        onClick={generate}
                        disabled={loading}
                        className="dordo-btn-dark h-12 rounded-none px-8 text-[0.72rem] uppercase tracking-[0.18em] shadow-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating concept
                          </>
                        ) : (
                          <>
                            <WandSparkles className="mr-2 h-4 w-4" />
                            Generate couture concept
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <StepHeading
                      number="4"
                      eyebrow="Select your direction"
                      title="Choose the concept you want the atelier to review."
                      text="You can generate additional variations, return to your preferences, or continue with the selected image and private design brief."
                    />

                    {variations.length ? (
                      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {variations.map((image, index) => (
                          <button
                            key={`${image.slice(0, 36)}-${index}`}
                            type="button"
                            onClick={() => setSelectedDesign(image)}
                            className={cn(
                              "group relative overflow-hidden border bg-[#f1e8dc] p-2 transition",
                              selectedDesign === image
                                ? "border-[#191817] ring-1 ring-[#191817]"
                                : "border-[#d2c4b1] hover:border-primary",
                            )}
                          >
                            <img
                              src={image}
                              alt={`DORDO AI variation ${index + 1}`}
                              className="aspect-[3/4] w-full object-cover"
                            />
                            <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center bg-[#151717] text-xs text-white">
                              {index + 1}
                            </span>
                            {selectedDesign === image ? (
                              <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center bg-[#c69a52] text-[#151515]">
                                <Check className="h-4 w-4" />
                              </span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 border border-dashed border-[#c6b7a4] bg-[#fffaf4] p-10 text-center">
                        <ImagePlus className="mx-auto h-9 w-9 text-primary" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          No AI variation has been generated yet.
                        </p>
                      </div>
                    )}

                    <div className="mt-7 border border-[#d5c8b6] bg-[#fffaf4] p-5">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                        Selected design brief
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {promptSummary || "No design brief yet."}
                      </p>
                    </div>

                    <div className="dordo-mobile-step-actions mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="h-12 rounded-none border-[#a99a87] bg-transparent px-4 text-[0.68rem] uppercase tracking-[0.16em] shadow-none hover:bg-white/70"
                      >
                        <PencilLine className="mr-2 h-4 w-4" />
                        Edit design
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generate}
                        disabled={loading || variations.length >= 4}
                        className="h-12 rounded-none border-[#a99a87] bg-transparent px-4 text-[0.68rem] uppercase tracking-[0.16em] shadow-none hover:bg-white/70"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        {variations.length >= 4 ? "4 variations ready" : "Another variation"}
                      </Button>
                      {selectedDesign ? (
                        <Button
                          asChild
                          variant="outline"
                          className="h-12 rounded-none border-[#a99a87] bg-transparent px-4 text-[0.68rem] uppercase tracking-[0.16em] shadow-none hover:bg-white/70"
                        >
                          <a href={selectedDesign} download="dordo-ai-couture-concept.png">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      ) : null}
                      <Button
                        asChild
                        onClick={saveDesignForQuote}
                        disabled={!selectedDesign}
                        className="dordo-btn-dark h-12 rounded-none px-5 text-[0.68rem] uppercase tracking-[0.16em] shadow-none"
                      >
                        <Link to="/quote">
                          Request atelier quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="hidden xl:sticky xl:top-[108px] xl:block xl:self-start">
                <div className="overflow-hidden border border-[#bfae98] bg-[#eee3d6] shadow-[0_26px_70px_rgba(38,29,20,.13)]">
                  <div className="flex items-start justify-between gap-4 bg-[#141616] px-6 py-5 text-white">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#d5aa63]">
                        Live design preview
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-tight">
                        Your current visual direction
                      </p>
                    </div>
                    <Sparkles className="h-5 w-5 text-[#d5aa63]" />
                  </div>
                  <div className="relative p-4">
                    <img
                      src={previewImage}
                      alt="DORDO couture preview"
                      className="aspect-[3/4] min-h-[520px] w-full object-cover object-center"
                    />
                    <div className="absolute inset-x-8 bottom-8 border border-white/20 bg-black/58 px-4 py-3 text-white backdrop-blur-sm">
                      <p className="text-[0.64rem] uppercase tracking-[0.18em] text-[#e0b76e]">
                        {selectedDesign
                          ? "Selected AI concept"
                          : inspirationPhotos[0]
                            ? "Reference preview"
                            : "DORDO inspiration"}
                      </p>
                      <p className="mt-1 text-xs text-white/68">
                        The final garment is confirmed only after atelier review.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 border border-[#d0c2af] bg-[#fffaf4] text-center">
                  <div className="p-4">
                    <p className="font-serif text-xl text-[#2b241e]">{allReferences.length}</p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      References
                    </p>
                  </div>
                  <div className="border-x border-[#d0c2af] p-4">
                    <p className="font-serif text-xl text-[#2b241e]">{variations.length}</p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Variations
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="font-serif text-xl text-[#2b241e]">{step}/4</p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Progress
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function StepProgress({
  step,
  onStepChange,
  hasDesign,
}: {
  step: number;
  onStepChange: (step: number) => void;
  hasDesign: boolean;
}) {
  return (
    <div className="dordo-step-progress mx-auto mt-10 max-w-4xl">
      <div className="relative grid grid-cols-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-[#cbbdaa]" />
        <div
          className="absolute left-[12.5%] top-5 h-px bg-[#1d1c1a] transition-all"
          style={{ width: `${Math.max(0, step - 1) * 25}%` }}
        />
        {steps.map((item) => {
          const active = item.id === step;
          const complete = item.id < step || (item.id === 4 && hasDesign);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onStepChange(item.id)}
              className="relative z-10 flex flex-col items-center"
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center border text-sm transition",
                  active
                    ? "border-[#1c1b19] bg-[#1c1b19] text-white"
                    : complete
                      ? "border-primary bg-primary text-white"
                      : "border-[#c4b5a1] bg-[#f7f0e7] text-muted-foreground",
                )}
              >
                {complete && !active ? <Check className="h-4 w-4" /> : item.id}
              </span>
              <span
                className={cn(
                  "mt-3 hidden text-[0.64rem] uppercase tracking-[0.18em] sm:block",
                  active ? "text-[#1d1c1a]" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
              <span
                className={cn(
                  "mt-3 text-[0.62rem] uppercase tracking-[0.14em] sm:hidden",
                  active ? "text-[#1d1c1a]" : "text-muted-foreground",
                )}
              >
                {item.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepHeading({
  number,
  eyebrow,
  title,
  text,
}: {
  number: string;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-5 border-b border-[#d8cbb9] pb-7 md:grid-cols-[74px_1fr]">
      <span className="font-serif text-5xl text-[#c3b198]">{number}</span>
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.23em] text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.025em] text-[#29221c] md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function SingleUploadCard({
  id,
  title,
  helper,
  icon: Icon,
  image,
  onChange,
  onRemove,
}: {
  id: string;
  title: string;
  helper: string;
  icon: ElementType;
  image: UploadedImage | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-[#d4c7b5] bg-[#fffaf4] p-3">
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="group relative block cursor-pointer overflow-hidden border border-dashed border-[#bfae98] bg-[#f4ecdf] transition hover:border-primary"
      >
        {image ? (
          <img src={image.data} alt={title} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <span className="flex aspect-[4/3] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Icon className="h-8 w-8 text-primary/75" />
            <span className="text-[0.64rem] uppercase tracking-[0.18em]">Upload image</span>
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/68 px-3 py-2 text-center text-[0.62rem] uppercase tracking-[0.15em] text-white transition group-hover:translate-y-0">
          Choose another
        </span>
      </label>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-lg leading-tight text-[#29221c]">{title}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{helper}</p>
        </div>
        {image ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[#c8baa8] text-muted-foreground hover:text-destructive"
            aria-label={`Remove ${title}`}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function MultiUploadCard({
  id,
  title,
  helper,
  icon: Icon,
  images,
  max,
  onChange,
  onRemove,
}: {
  id: string;
  title: string;
  helper: string;
  icon: ElementType;
  images: UploadedImage[];
  max: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="border border-[#d4c7b5] bg-[#fffaf4] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-xl text-[#29221c]">{title}</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">{helper}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden border border-[#cbbdaa] bg-[#f2e8dc]"
          >
            <img src={image.data} alt={image.label} className="aspect-square w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(image.id)}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center bg-black/70 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Remove ${image.label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {images.length < max ? (
          <>
            <input
              id={id}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onChange}
            />
            <label
              htmlFor={id}
              className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[#bfae98] bg-[#f4ecdf] text-muted-foreground transition hover:border-primary hover:bg-white"
            >
              <Icon className="h-6 w-6 text-primary/75" />
              <span className="text-[0.58rem] uppercase tracking-[0.14em]">Add photos</span>
            </label>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ChoiceGrid({
  options,
  value,
  onChange,
  columns,
}: {
  options: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <div className={cn("dordo-choice-grid grid gap-3 sm:grid-cols-2", columns)}>
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(active ? "" : option.value)}
            className={cn(
              "relative min-h-[112px] border p-4 text-left transition",
              active
                ? "border-[#1d1c1a] bg-[#1d1c1a] text-white shadow-[0_14px_30px_rgba(0,0,0,.12)]"
                : "border-[#d2c4b1] bg-[#fffaf4] text-[#2b241e] hover:border-primary hover:bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif text-xl leading-tight">{option.value}</p>
                {option.detail ? (
                  <p
                    className={cn(
                      "mt-2 text-xs leading-5",
                      active ? "text-white/62" : "text-muted-foreground",
                    )}
                  >
                    {option.detail}
                  </p>
                ) : null}
              </div>
              {Icon ? (
                <Icon className={cn("h-5 w-5", active ? "text-[#d9ad64]" : "text-primary")} />
              ) : null}
            </div>
            {active ? (
              <span className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center border border-[#d9ad64] text-[#d9ad64]">
                <Check className="h-3.5 w-3.5" />
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PillChoices({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(active ? "" : option)}
            className={cn(
              "min-h-10 border px-4 text-[0.66rem] uppercase tracking-[0.13em] transition",
              active
                ? "border-[#1d1c1a] bg-[#1d1c1a] text-white"
                : "border-[#cbbdaa] bg-[#fffaf4] text-[#51473d] hover:border-primary",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function DesignSection({
  title,
  helper,
  children,
  compact = false,
}: {
  title: string;
  helper?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "mt-7" : "mt-9 border-t border-[#dfd3c3] pt-8"}>
      <div className="mb-4">
        <h3 className="font-serif text-2xl leading-tight text-[#2b241e]">{title}</h3>
        {helper ? <p className="mt-2 text-xs leading-6 text-muted-foreground">{helper}</p> : null}
      </div>
      {children}
    </section>
  );
}

function FieldLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function validateImageFile(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Please upload an image file.");
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
