import { useMemo, useState } from 'react';
import Img from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import PageHeader from '@/components/PageHeader';
import { galleryGroups, media } from '@/data/media';

const ALL = 'all';

export default function GalleryPage() {
  const [filter, setFilter] = useState(ALL);
  const [index, setIndex] = useState<number | null>(null);

  const photos = useMemo(() => {
    const groups = filter === ALL ? galleryGroups : galleryGroups.filter((g) => g.id === filter);
    const seen = new Set<string>();
    return groups.flatMap((g) =>
      g.photos.filter((p) => !seen.has(p) && seen.add(p)).map((p, i) => ({ photo: p, alt: `${g.label}, photo ${i + 1}` })),
    );
  }, [filter]);

  const total = useMemo(() => new Set(galleryGroups.flatMap((g) => g.photos)).size, []);

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title="Inside"
        accent="Archontiko Tsikari"
        lead={`${total} photos of the mansion, the studios and the island around it.`}
        photo={media.exterior[0]}
        alt="Archontiko Tsikari exterior"
      />

      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="sticky top-[72px] z-30 -mx-6 overflow-x-auto bg-sand-50/90 px-6 py-4 backdrop-blur-xl lg:mx-0 lg:rounded-full lg:px-2">
            <div className="flex w-max gap-2">
              {[{ id: ALL, label: 'All photos' }, ...galleryGroups].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setFilter(g.id)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                    filter === g.id ? 'bg-ink-900 text-sand-50' : 'bg-sand-100 text-ink-700 hover:bg-sand-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div key={filter} className="mt-8 columns-2 gap-4 md:columns-3 xl:columns-4">
            {photos.map((p, i) => (
              <button
                key={p.photo}
                onClick={() => setIndex(i)}
                className="group relative mb-4 block w-full animate-fade-up overflow-hidden rounded-2xl bg-sand-200"
                style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
                aria-label={`Open ${p.alt}`}
              >
                <Img photo={p.photo} alt={p.alt} intrinsic sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-[1.2s] group-hover:scale-105" />
                <span className="absolute inset-0 bg-ink-900/0 transition-colors duration-500 group-hover:bg-ink-900/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </div>
  );
}
