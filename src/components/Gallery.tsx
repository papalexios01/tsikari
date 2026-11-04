import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Img from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import { homeGallery } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

export default function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="bg-sand-100 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow reveal text-clay-600">Gallery</p>
            <h2 className="reveal mt-6 text-4xl text-ink-900 sm:text-5xl">Moments at Tsikari</h2>
          </div>
          <a href={href('gallery')} className="reveal group inline-flex items-center gap-2 text-sm font-medium text-clay-600 hover:text-clay-700">
            View the full gallery
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {homeGallery.map((g, i) => (
            <button
              key={g.photo}
              onClick={() => setIndex(i)}
              className={`reveal group relative overflow-hidden rounded-3xl ${g.span}`}
              aria-label={`Open photo: ${g.alt}`}
            >
              <Img photo={g.photo} alt={g.alt} sizes={g.span ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              <span className="absolute inset-0 bg-ink-900/0 transition-colors duration-500 group-hover:bg-ink-900/25" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox photos={homeGallery} index={index} onChange={setIndex} />
    </section>
  );
}
