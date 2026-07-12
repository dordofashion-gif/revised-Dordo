import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportClientError } from "../lib/client-error-reporting";
import { BrandWord, GoldDivider } from "@/components/site-brand";

function LuxuryMessage({
  title,
  body,
  actionLabel,
  onRetry,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="dordo-page-frame max-w-2xl px-8 py-14 text-center md:px-14">
        <BrandWord className="block text-[4.5rem] leading-none tracking-[0.05em] md:text-[6rem]" />
        <h1 className="mt-5 font-serif text-3xl uppercase tracking-[0.08em] text-[#2a231d] md:text-4xl">
          {title}
        </h1>
        <GoldDivider className="mt-5 justify-center" />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onRetry ? (
            <button
              onClick={onRetry}
              className="dordo-btn-dark inline-flex h-11 items-center justify-center px-7 text-[0.76rem] uppercase tracking-[0.18em]"
            >
              {actionLabel || "Try again"}
            </button>
          ) : null}
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center border border-[#b9ab9a] bg-transparent px-7 text-[0.76rem] uppercase tracking-[0.18em] text-[#211b15] transition hover:bg-white/70"
          >
            Go home
          </Link>
          <Link
            to="/design"
            className="dordo-btn-dark inline-flex h-11 items-center justify-center px-7 text-[0.76rem] uppercase tracking-[0.18em]"
          >
            Design your dress
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <LuxuryMessage
      title="Page not found"
      body="The page you are looking for does not exist or has moved. Return to the atelier and continue your couture journey."
    />
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportClientError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <LuxuryMessage
      title="This page did not load"
      body="Something went wrong on our end. You can try again or return to the Dordo atelier."
      actionLabel="Try again"
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dordo | AI Custom Dress & Couture Atelier" },
      {
        name: "description",
        content:
          "Luxury AI custom dress and couture atelier. Design your dress online, generate an AI preview, and request a bespoke quote.",
      },
      { name: "author", content: "Dordo Fashion" },
      { property: "og:title", content: "Dordo | AI Custom Dress & Couture Atelier" },
      {
        property: "og:description",
        content: "Bespoke couture, designed by AI and crafted by artistry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Aboreto&family=Abril+Fatface&family=Bacasime+Antique:ital@0;1&family=Bodoni+Moda:opsz,wght@6..96,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
