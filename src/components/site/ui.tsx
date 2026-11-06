import { Img } from "@/components/site/Img";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target)),
        ),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Page({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4 text-clay", className)}>
      <span className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}

type BtnProps = {
  to: string;
  children: ReactNode;
  variant?: "solid" | "light" | "outline" | "outlineLight";
  className?: string;
  search?: Record<string, unknown>;
};
const variants = {
  solid: "bg-primary text-primary-foreground hover:bg-ink",
  light: "bg-background text-foreground hover:bg-primary hover:text-primary-foreground",
  outline: "border border-foreground/30 text-foreground hover:bg-foreground hover:text-background",
  outlineLight:
    "border border-ink-foreground/40 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
};
export const btnClass = (variant: keyof typeof variants = "solid") =>
  cn(
    "group inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] transition-all duration-500",
    variants[variant],
  );

export function Btn({ to, children, variant = "solid", className, search }: BtnProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={to as any} search={search as any} className={cn(btnClass(variant), className)}>
      {children}
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  photo,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  photo: string;
}) {
  return (
    <section className="grain relative flex min-h-[78vh] items-end overflow-hidden bg-ink text-ink-foreground">
      <Img
        photo={photo}
        priority
        alt=""
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="veil absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <p className="eyebrow animate-rise text-gold">{eyebrow}</p>
        <h1
          className="display animate-rise mt-6 max-w-5xl text-6xl sm:text-7xl lg:text-[8.5rem]"
          style={{ animationDelay: "0.15s" }}
        >
          {title} {accent && <em className="text-gold">{accent}</em>}
        </h1>
        {lead && (
          <p
            className="animate-rise mt-8 max-w-xl text-lg font-light text-ink-foreground/80"
            style={{ animationDelay: "0.3s" }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
