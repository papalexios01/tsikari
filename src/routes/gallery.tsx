import { Img } from "@/components/site/Img";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { galleryGroups, media } from "@/data/media";
import { Page, PageHero } from "@/components/site/ui";
import { Lightbox } from "@/components/site/Lightbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Archontiko Tsikari, Lemnos" },
      {
        name: "description",
        content: "Photos of the mansion, its entrance, the studios and the island of Lemnos.",
      },
      { property: "og:title", content: "Gallery — Archontiko Tsikari" },
      { property: "og:description", content: "Step inside the 1901 mansion and its five studios." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [group, setGroup] = useState(galleryGroups[0]!.id);
  const [idx, setIdx] = useState<number | null>(null);
  const photos = galleryGroups.find((g) => g.id === group)!.photos;
  return (
    <Page>
      <PageHero
        eyebrow="Gallery"
        title="Moments from"
        accent="the mansion"
        photo={media.home.facade}
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="sticky top-20 z-10 -mx-6 mb-12 flex gap-2 overflow-x-auto bg-background/90 px-6 py-4 backdrop-blur">
            {galleryGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setGroup(g.id)}
                className={cn(
                  "eyebrow shrink-0 border px-5 py-3 text-[0.62rem] transition-all duration-500",
                  g.id === group
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground",
                )}
              >
                {g.label} <span className="opacity-60">· {g.photos.length}</span>
              </button>
            ))}
          </div>
          <div
            key={group}
            className="animate-in fade-in columns-1 gap-4 duration-700 sm:columns-2 lg:columns-3"
          >
            {photos.map((p, i) => (
              <button
                key={p}
                onClick={() => setIdx(i)}
                className="img-zoom mb-4 block w-full overflow-hidden"
              >
                <Img
                  photo={p}
                  alt=""
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <Lightbox photos={photos} index={idx} onChange={setIdx} />
    </Page>
  );
}
