import { createFileRoute } from "@tanstack/react-router";
import { Bed, Info, MapPin, Sparkles, UserRound } from "lucide-react";
import { bookingPerks } from "@/data/content";
import { media } from "@/data/media";
import { Page, PageHero } from "@/components/site/ui";
import { BookingForm, type BookingPrefill } from "@/components/site/BookingForm";

export const Route = createFileRoute("/booking")({
  validateSearch: (s: Record<string, unknown>): BookingPrefill => ({
    room: typeof s["room"] === "string" ? s["room"] : undefined,
    in: typeof s["in"] === "string" ? s["in"] : undefined,
    out: typeof s["out"] === "string" ? s["out"] : undefined,
    guests:
      Number.isInteger(Number(s["guests"])) && Number(s["guests"]) > 0 && Number(s["guests"]) <= 4
        ? Number(s["guests"])
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a stay — Archontiko Tsikari, Lemnos" },
      {
        name: "description",
        content:
          "Send your dates and we'll reply personally with availability and our best direct rates.",
      },
      { property: "og:title", content: "Book direct — Archontiko Tsikari" },
      {
        property: "og:description",
        content: "Request availability for our studios in Varos, Lemnos.",
      },
    ],
  }),
  component: Booking,
});

const icons = [Bed, MapPin, UserRound, Sparkles];

function Booking() {
  const search = Route.useSearch();
  return (
    <Page>
      <PageHero
        eyebrow="Booking"
        title="Plan your"
        accent="stay"
        lead="Send us your dates and we will reply personally with availability and our best direct rates."
        photo={media.exterior[1]!}
      />
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal border border-border bg-card p-8 shadow-soft sm:p-12 lg:col-span-7">
            <p className="eyebrow text-primary">Availability request</p>
            <h2 className="mt-4 text-5xl">Tell us about your trip</h2>
            <p className="mb-10 mt-3 text-sm text-muted-foreground">
              No payment is taken here. We confirm everything with you directly.
            </p>
            <BookingForm key={JSON.stringify(search)} prefill={search} />
          </div>
          <aside className="grain relative self-start overflow-hidden bg-ink p-8 text-ink-foreground sm:p-12 lg:col-span-5">
            <p className="eyebrow text-gold">Why book direct?</p>
            <h3 className="mt-4 text-4xl">Hotel-style studios at friendly prices</h3>
            <ul className="mt-10 space-y-8">
              {bookingPerks.map((p, i) => {
                const Icon = icons[i % icons.length]!;
                return (
                  <li key={p.title} className="flex gap-5">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.3} />
                    <div>
                      <p className="font-serif text-2xl">{p.title}</p>
                      <p className="mt-1 text-sm font-light text-ink-foreground/70">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-10 flex gap-3 border-t border-ink-foreground/15 pt-8 text-sm font-light text-ink-foreground/70">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Please note we have no 24-hour reception or restaurant. Let us know your arrival time
              and we'll be there to welcome you.
            </p>
          </aside>
        </div>
      </section>
    </Page>
  );
}
