import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, Ship, ArrowUpRight } from "lucide-react";
import { maps, travelRoutes } from "@/data/content";
import { media } from "@/data/media";
import { Eyebrow, Page, PageHero } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/how-to-get-here")({
  head: () => ({
    meta: [
      { title: "How to get here — Archontiko Tsikari, Varos, Lemnos" },
      {
        name: "description",
        content:
          "Ferries and flights to Lemnos, and directions from Myrina port and the airport to Varos.",
      },
      { property: "og:title", content: "How to get to Archontiko Tsikari" },
      {
        property: "og:description",
        content: "3 minutes from the airport, 20 minutes from Myrina port.",
      },
    ],
  }),
  component: HowTo,
});

function HowTo() {
  const tabs = [
    { id: "hotel", label: "The Hotel", src: maps.hotel, link: maps.links.hotel },
    {
      id: "airport",
      label: "From the airport",
      src: maps.fromAirport,
      link: maps.links.fromAirport,
    },
    { id: "port", label: "From Myrina port", src: maps.fromPort, link: maps.links.fromPort },
  ];
  const [t, setT] = useState(0);
  const cur = tabs[t]!;
  return (
    <Page>
      <PageHero
        eyebrow="How to Get Here"
        title="Getting to"
        accent="Lemnos"
        lead="By sea or by air — and then just a short drive to the square of Varos."
        photo={media.about.lemnos}
      />
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Eyebrow className="reveal">Routes</Eyebrow>
          <h2 className="reveal mt-6 text-5xl sm:text-6xl">Ferries & flights</h2>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {travelRoutes.map((r, i) => {
              const Icon = r.mode === "ferry" ? Ship : Plane;
              return (
                <div
                  key={r.title + r.mode}
                  className="reveal bg-background p-8"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.2} />
                  <p className="eyebrow mt-6 text-[0.6rem] text-muted-foreground">
                    {r.mode === "ferry" ? "By ferry from" : "By plane from"}
                  </p>
                  <h3 className="mt-2 text-3xl">{r.title}</h3>
                  <ul className="mt-6 space-y-2">
                    {r.carriers.map((c) => (
                      <li key={c.name}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="link-line inline-flex items-center gap-1 text-sm"
                        >
                          {c.name}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="reveal text-5xl sm:text-6xl">Find your way</h2>
            <div className="reveal flex flex-wrap gap-2">
              {tabs.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setT(i)}
                  className={cn(
                    "eyebrow border px-5 py-3 text-[0.62rem] transition-all",
                    i === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/20 hover:border-foreground",
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <div className="reveal mt-10 overflow-hidden shadow-lift">
            <iframe
              key={cur.id}
              title={cur.label}
              src={cur.src}
              loading="lazy"
              className="h-[520px] w-full border-0 grayscale-[30%]"
            />
          </div>
          <a
            href={cur.link}
            target="_blank"
            rel="noreferrer"
            className="link-line mt-6 inline-flex items-center gap-2 text-sm"
          >
            Open in Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </Page>
  );
}
