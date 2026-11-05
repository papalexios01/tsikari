import { useEffect, useRef, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { imageSources } from '@/lib/imageSources';

export type Photo = { photo: string; alt: string };

type Props = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export default function Lightbox({ photos, index, onChange }: Props) {
  const count = photos.length;
  const isOpen = index !== null && Boolean(photos[index]);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(index);
  const onChangeRef = useRef(onChange);
  indexRef.current = index;
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onChangeRef.current(null);
      } else if ((event.key === 'ArrowRight' || event.key === 'ArrowLeft') && count > 1) {
        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        onChangeRef.current(((indexRef.current ?? 0) + delta + count) % count);
      } else if (event.key === 'Tab') {
        const buttons = Array.from(containerRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, count]);

  if (!isOpen || index === null) return null;
  const current = photos[index];
  const sources = imageSources(current.photo);
  const neighbours = count > 1 ? [photos[(index + 1) % count], photos[(index - 1 + count) % count]] : [];

  const step = (delta: number) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange((index + delta + count) % count);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur"
      onClick={() => onChange(null)}
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full p-3 text-sand-50 transition-colors hover:bg-sand-50/10"
        aria-label="Close photo gallery"
        onClick={(event) => { event.stopPropagation(); onChange(null); }}
      >
        <X className="h-6 w-6" />
      </button>
      {count > 1 && (
        <button
          type="button"
          className="absolute left-2 z-10 rounded-full bg-ink-900/40 p-3 text-sand-50 transition-colors hover:bg-sand-50/15 sm:left-6"
          aria-label="Previous photo"
          onClick={step(-1)}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}
      <figure className="flex max-h-full max-w-6xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
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
        {neighbours.map((nextPhoto) => {
          const next = imageSources(nextPhoto.photo);
          return <img key={nextPhoto.photo} src={next.src} srcSet={next.srcSet} sizes="92vw" alt="" aria-hidden className="hidden" />;
        })}
        <figcaption className="mt-4 text-center text-sm text-sand-200" aria-live="polite">
          {current.alt} <span className="text-sand-200/60">· {index + 1} / {count}</span>
        </figcaption>
      </figure>
      {count > 1 && (
        <button
          type="button"
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
