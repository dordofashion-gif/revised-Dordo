import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://dordo.dordofashion.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/design", changefreq: "weekly", priority: "0.9" },
          { path: "/atelier", changefreq: "monthly", priority: "0.85" },
          { path: "/collections", changefreq: "weekly", priority: "0.88" },
          { path: "/how-it-works", changefreq: "monthly", priority: "0.86" },
          { path: "/fabric-guide", changefreq: "monthly", priority: "0.84" },
          { path: "/measurement-guide", changefreq: "monthly", priority: "0.83" },
          { path: "/consultation", changefreq: "monthly", priority: "0.82" },
          { path: "/faq", changefreq: "monthly", priority: "0.78" },
          { path: "/privacy", changefreq: "yearly", priority: "0.72" },
          { path: "/gallery", changefreq: "monthly", priority: "0.82" },
          { path: "/quote", changefreq: "monthly", priority: "0.8" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
