import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
        const token = process.env.CLOUDFLARE_API_TOKEN;

        if (!accountId || !token) {
          console.error("Missing Cloudflare environment variables", {
            hasAccountId: Boolean(accountId),
            hasToken: Boolean(token),
          });
          return jsonResponse(
            {
              error:
                "Image generation is not configured yet. Please add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in the server environment variables.",
            },
            500,
          );
        }

        let body: { prompt?: unknown; image?: unknown };
        try {
          body = (await request.json()) as { prompt?: unknown; image?: unknown };
        } catch {
          return jsonResponse({ error: "Invalid request body" }, 400);
        }

        if (!body.prompt || typeof body.prompt !== "string" || !body.prompt.trim()) {
          return jsonResponse({ error: "A prompt is required" }, 400);
        }

        const prompt = body.prompt.trim().slice(0, 4000);
        const image = typeof body.image === "string" ? body.image : undefined;

        // Keep the current working model setup for now.
        // When the new API/model details are ready, this is the file to update.
        const model = image
          ? "@cf/runwayml/stable-diffusion-v1-5-img2img"
          : "@cf/black-forest-labs/flux-1-schnell";
        const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

        const requestBody: Record<string, unknown> = { prompt };
        if (image) {
          // Strip data URI prefix and whitespace; current Cloudflare img2img route expects clean base64 in `image_b64`.
          let b64 = image.trim();
          if (b64.startsWith("data:") && b64.includes(",")) {
            b64 = b64.split(",")[1];
          }
          b64 = b64.replace(/\s/g, "");
          requestBody.image_b64 = b64;
          requestBody.strength = 0.6;
          requestBody.num_steps = 20;
          requestBody.guidance = 7.5;
        }

        try {
          const upstream = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          const upstreamText = await upstream.text();
          let data: {
            result?: { image?: string };
            image?: string;
            success?: boolean;
            errors?: { message?: string }[];
          } | null = null;

          try {
            data = upstreamText ? JSON.parse(upstreamText) : null;
          } catch {
            data = null;
          }

          if (!upstream.ok) {
            console.error("Cloudflare image generation failed", {
              status: upstream.status,
              model,
              response: data || upstreamText,
            });
            const upstreamMessage = data?.errors?.[0]?.message;
            return jsonResponse(
              { error: upstreamMessage || "Image generation failed. Please try again." },
              upstream.status,
            );
          }

          const returnedImage = data?.result?.image || data?.image;
          if (!returnedImage) {
            console.error("No image returned from Cloudflare", {
              model,
              response: data || upstreamText,
            });
            return jsonResponse({ error: "No image returned from Cloudflare" }, 502);
          }

          const mime = returnedImage.startsWith("/9j/") ? "image/jpeg" : "image/png";
          const imageDataUri = returnedImage.startsWith("data:")
            ? returnedImage
            : `data:${mime};base64,${returnedImage}`;

          return jsonResponse({ image: imageDataUri });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Image generation failed";
          console.error("Image generation route failed", err);
          return jsonResponse({ error: message }, 500);
        }
      },
    },
  },
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
