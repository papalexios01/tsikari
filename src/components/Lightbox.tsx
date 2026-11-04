import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { imageSources } from '@/components/Img';

export type Photo = { photo: string; alt: string };

type Props = {
  photos: Photo[];
  index: number | null;
  onChange: (i: number | null) => void;
};

export default function Lightbox({ photos, index, onChange }: Props) {
  const count = photos.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') onChange((index + 1) % count);
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, count, onChange]);

  if (index === null || !photos[index]) return null;
  const current = photos[index];
  const sources = imageSources(current.photo);
  const neighbours = count > 1 ? [photos[(index + 1) % count], photos[(index - 1 + count) % count]] : [];
  const step = (d: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange((index + d + count) % count);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur"
      onClick={() => onChange(null)}
    >
      <button className="absolute right-4 top-4 z-10 rounded-full p-3 text-sand-50 transition-colors hover:bg-sand-50/10" aria-label="Close">
        <X className="h-6 w-6" />
      </button>
      {count > 1 && (
        <button
          className="absolute left-2 z-10 rounded-full bg-ink-900/40 p-3 text-sand-50 transition-colors hover:bg-sand-50/15 sm:left-6"
          aria-label="Previous photo"
          onClick={step(-1)}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}
      <figure className="flex max-h-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={current.photo}
          src={sources.src}
          srcSet={sources.srcSet}
          sizes="92vw"
          width={sources.width}
          height={sources.height}
          alt={current.alt}
          decoding="async"
          style={{ backgroundColor: sources.color }}
          className="h-auto max-h-[82vh] w-auto max-w-full animate-fade-up rounded-2xl object-contain shadow-2xl"
        />
        {neighbours.map((n) => {
          const s = imageSources(n.photo);
          return <img key={n.photo} src={s.src} srcSet={s.srcSet} sizes="92vw" alt="" aria-hidden className="hidden" />;
        })}
        <figcaption className="mt-4 text-center text-sm text-sand-200">
          {current.alt} <span className="text-sand-200/50">· {index + 1} / {count}</span>
        </figcaption>
      </figure>
      {count > 1 && (
        <button
          className="absolute right-2 z-10 rounded-full bg-ink-900/40 p-3 text-sand-50 transition-colors hover:bg-sand-50/15 sm:right-6"
          aria-label="Next photo"
          onClick={step(1)}
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      )}
    </div>
  );
}
