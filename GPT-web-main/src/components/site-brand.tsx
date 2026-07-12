import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Instagram, LockKeyhole, Mail, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dordo-logo.png";
import wordmarkLogoTexture from "@/assets/dordo-wordmark-logo-texture.png";
import { cn } from "@/lib/utils";

type CurrentPage =
  | "home"
  | "atelier"
  | "collections"
  | "process"
  | "guide"
  | "measurement"
  | "consultation"
  | "faq"
  | "privacy"
  | "gallery"
  | "design"
  | "quote";

type HeaderProps = {
  current?: CurrentPage;
};

const navItems = [
  { label: "Home", to: "/", page: "home" as const },
  { label: "Design Your Dress", to: "/design", page: "design" as const },
  { label: "Collections", to: "/collections", page: "collections" as const },
  { label: "How It Works", to: "/how-it-works", page: "process" as const },
  { label: "Our Atelier", to: "/atelier", page: "atelier" as const },
  { label: "FAQ", to: "/faq", page: "faq" as const },
];

export function DordoLogo({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <img
      src={logo}
      alt="Dordo"
      className={cn(
        "h-auto object-contain",
        small ? "w-[88px] sm:w-[104px]" : "w-[126px] sm:w-[165px]",
        className,
      )}
      loading="eager"
    />
  );
}

export function BrandWord({ className }: { className?: string }) {
  return (
    <span className={cn("dordo-wordmark-wrap", className)} aria-label="DORDO">
      <img src={wordmarkLogoTexture} alt="DORDO" className="dordo-wordmark-image" loading="eager" />
    </span>
  );
}

export function PageHeroWordmark() {
  return (
    <BrandWord className="block text-[4.8rem] leading-none tracking-[0.04em] sm:text-[6.4rem] lg:text-[7.6rem]" />
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-16 bg-primary/45" />
      <span className="text-primary">✦</span>
      <span className="h-px w-16 bg-primary/45" />
    </div>
  );
}

export function SiteHeader({ current = "home" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="hidden border-b border-white/8 bg-[#111313] text-[#f7f1e9] md:block">
        <div className="container-atelier flex min-h-9 items-center justify-between gap-6 text-[0.66rem] uppercase tracking-[0.18em] text-white/58">
          <p className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#d5aa63]" />
            AI-assisted design · Made-to-measure couture
          </p>
          <p className="flex items-center gap-2">
            <LockKeyhole className="h-3.5 w-3.5 text-[#d5aa63]" />
            Private image review · No payment to request a quote
          </p>
        </div>
      </div>

      <header className="dordo-site-header sticky top-0 z-50 border-b border-black/7 bg-[#fbf6ee]/96 backdrop-blur-xl">
        <div className="dordo-header-inner container-atelier flex h-[68px] items-center justify-between gap-4 sm:h-[76px] lg:h-[82px]">
          <Link
            to="/"
            className="shrink-0 transition-opacity hover:opacity-85"
            aria-label="Dordo home"
            onClick={() => setMobileOpen(false)}
          >
            <DordoLogo small />
          </Link>

          <nav className="hidden items-center gap-5 text-[0.84rem] font-medium uppercase tracking-[0.16em] text-[#3c342d]/78 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "relative py-3 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-[#171411] hover:after:scale-x-100",
                  current === item.page && "text-[#171411] after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden h-10 rounded-none border-[#aa9b88] bg-transparent px-5 text-[0.66rem] uppercase tracking-[0.16em] shadow-none hover:bg-white/65 lg:inline-flex"
            >
              <Link to="/consultation">Consultation</Link>
            </Button>
            <Button
              asChild
              className="dordo-btn-dark hidden h-10 rounded-none px-5 text-[0.66rem] uppercase tracking-[0.16em] shadow-none sm:inline-flex"
            >
              <Link to="/design">Start designing</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="dordo-menu-trigger inline-flex h-11 w-11 items-center justify-center border border-[#b9ab9a] bg-white/45 text-[#211b15] transition hover:bg-white/80 xl:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[70] bg-black/55 backdrop-blur-[3px] transition-opacity xl:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={cn(
          "dordo-mobile-menu fixed inset-y-0 right-0 z-[80] flex w-full max-w-[460px] flex-col bg-[#f8f1e8] shadow-[-24px_0_70px_rgba(0,0,0,.22)] transition-transform duration-300 xl:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 sm:px-6 sm:py-5">
          <DordoLogo small />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#b9ab9a] bg-white/50"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 sm:py-7">
          <p className="mb-5 text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            Explore DORDO
          </p>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "dordo-mobile-nav-link flex min-h-14 items-center justify-between py-4 font-serif text-[1.45rem] tracking-[0.01em] text-[#29221c]",
                  current === item.page && "text-primary",
                )}
              >
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <div className="mt-7 grid gap-3 dordo-mobile-menu-actions">
            <Button
              asChild
              className="dordo-btn-dark h-12 rounded-none text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
            >
              <Link to="/design" onClick={() => setMobileOpen(false)}>
                Design your dress
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-none border-[#a99a87] bg-transparent text-[0.74rem] uppercase tracking-[0.18em] shadow-none"
            >
              <Link to="/consultation" onClick={() => setMobileOpen(false)}>
                Book a consultation
              </Link>
            </Button>
          </div>
        </nav>

        <div className="border-t border-black/8 bg-[#151717] px-5 py-5 text-white sm:px-6 sm:py-6">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#d5aa63]">
            Private couture support
          </p>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Questions about fit, fabric, or the AI studio? Start with a private consultation.
          </p>
        </div>
      </aside>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#111313] text-[#f7f1e9]">
      <div className="container-atelier py-14 md:py-18">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <BrandWord className="block max-w-[260px] text-[3rem] leading-none" />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/62">
              A private AI-assisted couture atelier for women who want a one-of-one dress, developed
              around their vision and crafted with considered detail.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:info@dordofashion.com"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition hover:border-[#d5aa63] hover:text-[#d5aa63]"
                aria-label="Email DORDO"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition hover:border-[#d5aa63] hover:text-[#d5aa63]"
                aria-label="DORDO on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">Discover</p>
              <ul className="mt-5 space-y-3 text-white/60">
                <li>
                  <Link className="transition hover:text-white" to="/atelier">
                    Our Atelier
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/collections">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/gallery">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/how-it-works">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">Guidance</p>
              <ul className="mt-5 space-y-3 text-white/60">
                <li>
                  <Link className="transition hover:text-white" to="/fabric-guide">
                    Fabric & Details
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/measurement-guide">
                    Measurement Guide
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/faq">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" to="/privacy">
                    Privacy & Image Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">Begin</p>
              <p className="mt-5 leading-7 text-white/60">
                Create an AI concept or speak with the atelier before you begin.
              </p>
              <Button
                asChild
                className="dordo-btn-gold mt-5 h-11 rounded-none px-5 text-[0.7rem] uppercase tracking-[0.18em] shadow-none"
              >
                <Link to="/design">
                  Start designing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-[0.66rem] uppercase tracking-[0.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dordo Fashion. Bespoke couture, designed by you.</p>
          <p>AI concepting · Human atelier review · Made-to-measure</p>
        </div>
      </div>
    </footer>
  );
}
