import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optionalPositiveNumber = z.preprocess((value) => {
  if (value === "" || value === null || typeof value === "undefined") return undefined;
  return Number(value);
}, z.number().positive().optional());

const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(80).optional(),
  country: z.string().max(120).optional(),
  preferredContact: z.string().max(40).optional(),
  occasion: z.string().max(120).optional(),
  deadline: z.string().max(40).optional(),
  budget: z.string().max(80).optional(),
  measurementUnit: z.enum(["inches", "centimeters"]),
  bust: optionalPositiveNumber,
  waist: optionalPositiveNumber,
  hips: optionalPositiveNumber,
  height: optionalPositiveNumber,
  shoulderWidth: optionalPositiveNumber,
  armLength: optionalPositiveNumber,
  dressLength: optionalPositiveNumber,
  notes: z.string().max(4000).optional(),
  designPrompt: z.string().max(6000).optional(),
  generatedImage: z.string().max(4_500_000).optional(),
  referenceImages: z.string().max(15_000_000).optional(),
  consent: z.boolean().refine((value) => value),
});

type QuoteData = z.infer<typeof quoteSchema>;

type ResendAttachment = {
  filename: string;
  content: string;
};

type StoredReference = {
  label: string;
  data: string;
};

export const submitQuote = createServerFn({ method: "POST" })
  .validator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.QUOTE_FROM_EMAIL;
    const toEmail = process.env.QUOTE_RECIPIENT_EMAIL;

    const missing = [
      !resendKey ? "RESEND_API_KEY" : null,
      !fromEmail ? "QUOTE_FROM_EMAIL" : null,
      !toEmail ? "QUOTE_RECIPIENT_EMAIL" : null,
    ].filter(Boolean);

    if (missing.length > 0) {
      console.error(`Missing email environment variable(s): ${missing.join(", ")}`);
      throw new Error(
        "Email sending is not configured yet. Please contact the atelier directly or try again later.",
      );
    }

    const isConsultation =
      data.designPrompt?.toLowerCase().includes("private consultation request") ?? false;
    const { html, attachments } = buildQuoteEmail(data);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Dordo Fashion <${fromEmail}>`,
        to: [toEmail],
        reply_to: data.email,
        subject: `${isConsultation ? "New consultation request" : "New couture quote request"} from ${data.name}`,
        html,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!emailResponse.ok) {
      const text = await emailResponse.text().catch(() => "Resend request failed");
      console.error("Resend email failed:", text);
      throw new Error("Could not send your request. Please try again.");
    }

    return { ok: true };
  });

function buildQuoteEmail(data: QuoteData): { html: string; attachments: ResendAttachment[] } {
  const generatedImage = parseDataUri(data.generatedImage);
  const references = parseReferenceImages(data.referenceImages);

  const attachments: ResendAttachment[] = [];
  if (generatedImage) {
    attachments.push({
      filename: `dordo-selected-ai-design.${generatedImage.extension}`,
      content: generatedImage.base64,
    });
  }

  references.slice(0, 8).forEach((reference, index) => {
    const parsed = parseDataUri(reference.data);
    if (!parsed) return;
    attachments.push({
      filename: `${String(index + 1).padStart(2, "0")}-${safeFilename(reference.label || "reference")}.${parsed.extension}`,
      content: parsed.base64,
    });
  });

  const unitLabel = data.measurementUnit === "centimeters" ? "cm" : "in";
  const measurements = (
    [
      ["Bust", data.bust],
      ["Waist", data.waist],
      ["Hips", data.hips],
      ["Height", data.height],
      ["Shoulder width", data.shoulderWidth],
      ["Arm length", data.armLength],
      ["Dress length", data.dressLength],
    ] as [string, number | undefined][]
  )
    .filter(([, value]) => typeof value === "number" && value > 0)
    .map(
      ([label, value]) =>
        `<li style="margin-bottom:7px;"><strong>${label}:</strong> ${value} ${unitLabel}</li>`,
    )
    .join("");

  const isConsultation =
    data.designPrompt?.toLowerCase().includes("private consultation request") ?? false;
  const emailTitle = isConsultation
    ? "New Private Consultation Request"
    : "New Couture Quote Request";

  const html = `<!doctype html>
<html>
  <body style="font-family:Arial,Helvetica,sans-serif;background:#f4ede4;color:#211b15;padding:24px;margin:0;">
    <div style="max-width:760px;margin:0 auto;background:#fffaf4;border:1px solid #d8cbb8;padding:36px;box-shadow:0 18px 50px rgba(35,27,18,.08);">
      <div style="text-align:center;border-bottom:1px solid #ded2c2;padding-bottom:24px;margin-bottom:28px;">
        <div style="font-family:Georgia,serif;font-size:48px;letter-spacing:.08em;color:#9a6821;line-height:1;font-weight:600;">DORDO</div>
        <div style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;margin-top:12px;color:#2a231d;">${emailTitle}</div>
      </div>

      <div style="background:#171818;color:#f8f1e8;padding:18px 20px;margin-bottom:28px;">
        <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d5aa63;">Submission summary</div>
        <div style="font-family:Georgia,serif;font-size:22px;margin-top:8px;">${escapeHtml(data.name)}</div>
        <div style="font-size:13px;color:rgba(255,255,255,.68);margin-top:6px;">${escapeHtml(data.occasion || "Occasion not specified")} · ${escapeHtml(data.deadline || "Date not specified")}</div>
      </div>

      ${sectionTitle("Customer & contact")}
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone / WhatsApp", data.phone)}
      ${row("Country / delivery", data.country)}
      ${row("Preferred contact", data.preferredContact)}

      ${sectionTitle("Project details")}
      ${row("Occasion", data.occasion)}
      ${row("Need by", data.deadline)}
      ${row("Budget direction", data.budget)}
      ${row("Measurement unit", data.measurementUnit)}
      ${data.designPrompt ? `<p style="line-height:1.7;"><strong>Design brief:</strong><br>${escapeHtml(data.designPrompt)}</p>` : ""}
      ${generatedImage ? `<p style="line-height:1.7;"><strong>Selected AI design:</strong> attached.</p>` : ""}
      ${references.length ? `<p style="line-height:1.7;"><strong>Private reference images:</strong> ${references.length} attached.</p>` : ""}

      ${measurements ? `${sectionTitle(`Measurements (${unitLabel})`)}<ul style="padding-left:20px;line-height:1.6;">${measurements}</ul>` : ""}
      ${data.notes ? `${sectionTitle("Customer notes")}<p style="line-height:1.8;">${escapeHtml(data.notes)}</p>` : ""}

      <div style="border-top:1px solid #ded2c2;margin-top:32px;padding-top:18px;color:#746b61;font-size:12px;line-height:1.7;">
        This is a private couture quote request. No payment has been collected. Measurements, construction, fabric availability, timeline, and feasibility must be confirmed before an order is accepted.
      </div>
    </div>
  </body>
</html>`;

  return { html, attachments };
}

function sectionTitle(title: string) {
  return `<h2 style="font-family:Georgia,serif;font-size:18px;letter-spacing:.07em;color:#9a6821;margin:28px 0 14px;padding-bottom:8px;border-bottom:1px solid #e1d5c5;">${escapeHtml(title)}</h2>`;
}

function row(label: string, value?: string) {
  return value
    ? `<p style="line-height:1.6;margin:8px 0;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
    : "";
}

function parseReferenceImages(value?: string): StoredReference[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is StoredReference =>
        Boolean(
          item &&
          typeof item === "object" &&
          "label" in item &&
          "data" in item &&
          typeof item.label === "string" &&
          typeof item.data === "string",
        ),
      )
      .slice(0, 8);
  } catch {
    return [];
  }
}

function parseDataUri(value?: string) {
  if (!value || !value.startsWith("data:image/")) return null;

  const match = value.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/);
  if (!match) return null;

  const subtype = match[1];
  const base64 = match[2];
  const extension = subtype === "jpeg" ? "jpg" : subtype;

  return { base64, extension };
}

function safeFilename(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "reference"
  );
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}
