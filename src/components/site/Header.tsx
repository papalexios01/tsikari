import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { media } from "@/data/media";
import { chooseLocale, getLocale, type Locale } from "@/lib/locale";
import { btnClass } from "./ui";

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Rooms", to: "/rooms" },
  { label: "Gallery", to: "/gallery" },
  { label: "How to Get Here", to: "/how-to-get-here" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setLocale(getLocale());
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const solid = scrolled || open;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-700", solid ? "bg-background/90 py-3 text-foreground shadow-soft backdrop-blur-xl" : "py-6 text-ink-foreground")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" translate="no">
          <img src={media.logo} alt="Archontiko Tsikari" className={cn("h-10 w-10 rounded-full object-cover transition-all", solid ? "" : "ring-1 ring-ink-foreground/30")} />
          <span className="leading-none">
            <span className="block font-serif text-2xl">Archontiko Tsikari</span>
            <span className="eyebrow mt-1 block text-[0.55rem] opacity-70">Varos · Lemnos · 1901</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="link-line pb-1 text-[0.72rem] font-medium uppercase tracking-[0.2em]" activeProps={{ className: "text-clay" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden text-[0.7rem] font-semibold tracking-[0.2em] sm:flex" translate="no">
            {(["en", "el"] as const).map((l) => (
              <button key={l} onClick={() => chooseLocale(l)} className={cn("px-1.5 uppercase transition-opacity", locale === l ? "opacity-100" : "opacity-45 hover:opacity-100")}>
                {l === "en" ? "EN" : "ΕΛ"}
              </button>
            ))}
          </div>
          <Link to="/booking" className={cn(btnClass(solid ? "solid" : "light"), "hidden px-6 py-3 md:inline-flex")}>
            Book a stay
          </Link>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="xl:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 xl:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="block border-b border-border py-4 font-serif text-3xl">
              {n.label}
            </Link>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <Link to="/booking" className={btnClass("solid")}>Book a stay</Link>
            <div className="flex gap-3 text-sm font-semibold" translate="no">
              <button onClick={() => chooseLocale("en")}>EN</button>
              <button onClick={() => chooseLocale("el")}>ΕΛ</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
