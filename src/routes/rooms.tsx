import { Img } from "@/components/site/Img";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { rooms } from "@/data/content";
import { media } from "@/data/media";
import { Btn, Eyebrow, Page, PageHero } from "@/components/site/ui";
import { Lightbox } from "@/components/site/Lightbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Studios — Archontiko Tsikari, Varos, Lemnos" },
      {
        name: "description",
        content:
          "Studios for 2-3 and families of 2-4, with COCO-MAT bedding, kitchenettes and village square views.",
      },
      { property: "og:title", content: "Our studios — Archontiko Tsikari" },
      {
        property: "og:description",
        content: "Five individually styled studios in a restored 1901 mansion.",
      },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Rooms"
        title="Five studios,"
        accent="each with its own quiet"
        lead="Earth tones, hand-picked objects and windows that frame the village square."
        photo={media.studio23[0]!}
      />
      {rooms.map((r, i) => (
        <RoomBlock key={r.id} room={r} flip={i % 2 === 1} />
      ))}
    </Page>
  );
}

function RoomBlock({ room, flip }: { room: (typeof rooms)[number]; flip: boolean }) {
  const [idx, setIdx] = useState<number | null>(null);
  const [main, setMain] = useState(0);
  return (
    <section id={room.id} className={cn("scroll-mt-24 py-24 lg:py-32", flip && "bg-sand")}>
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <button
            onClick={() => setIdx(main)}
            className="reveal img-zoom block w-full overflow-hidden shadow-lift"
          >
            <Img
              photo={room.photos[main]!}
              sizes="(min-width:1024px) 58vw, 100vw"
              alt={room.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
          <div className="reveal mt-3 flex gap-3 overflow-x-auto pb-2">
            {room.photos.slice(0, 12).map((p, i) => (
              <button
                key={p}
                onClick={() => setMain(i)}
                className={cn(
                  "w-24 shrink-0 overflow-hidden transition-opacity",
                  i === main ? "opacity-100 ring-2 ring-primary" : "opacity-55 hover:opacity-100",
                )}
              >
                <Img photo={p} alt="" sizes="96px" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
          <button
            onClick={() => setIdx(0)}
            className="eyebrow link-line mt-4 text-[0.6rem] text-muted-foreground"
          >
            {room.photos.length} photos
          </button>
        </div>
        <div className="lg:col-span-5 lg:pt-8">
          <Eyebrow className="reveal">Up to {room.guests} guests</Eyebrow>
          <h2 className="reveal mt-6 text-5xl sm:text-6xl">{room.name}</h2>
          <p className="reveal mt-6 text-lg font-light leading-relaxed text-muted-foreground">
            {room.summary}
          </p>
          <ul className="reveal mt-10 space-y-4 border-t border-border pt-8">
            {room.details.map((d) => (
              <li key={d} className="flex items-center gap-4">
                <Check className="h-4 w-4 text-primary" />
                {d}
              </li>
            ))}
          </ul>
          <div className="reveal mt-12">
            <Btn to="/booking" search={{ room: room.id }}>
              Request this studio
            </Btn>
          </div>
        </div>
      </div>
      <Lightbox photos={room.photos} index={idx} onChange={setIdx} />
    </section>
  );
}
