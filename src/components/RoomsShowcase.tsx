import { ArrowUpRight, Users } from 'lucide-react';
import Img, { imageSources } from '@/components/Img';
import { rooms } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

const largest = (photos: string[]) =>
  photos.reduce((best, p) => ((imageSources(p).width ?? 0) > (imageSources(best).width ?? 0) ? p : best), photos[0]);

export default function RoomsShowcase() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="studios" ref={ref} className="bg-sand-100 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="section-num reveal text-clay-600">02 &nbsp;/&nbsp; Stay</p>
            <h2 className="reveal mt-8 max-w-2xl text-5xl text-ink-900 sm:text-6xl lg:text-7xl">
              Our <em className="text-clay-600">studios</em>
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-ink-500">
              Five quiet studios, each with COCO-MAT bedding and its own fully equipped kitchenette, in two layouts for
              couples and families.
            </p>
            <a href={href('rooms')} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
              <span className="border-b border-ink-900/30 pb-1 transition-colors group-hover:border-clay-600 group-hover:text-clay-600">View all rooms</span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {rooms.map((room, i) => (
            <article key={room.id} className="reveal group" style={{ transitionDelay: `${i * 150}ms` }}>
              <a href={href('rooms', room.id)} className="relative block aspect-[4/5] overflow-hidden rounded-[32px] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Img
                  photo={largest(room.photos)}
                  alt={room.name}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-sand-50/90 px-4 py-2 text-xs text-ink-800 backdrop-blur">
                  <Users className="h-3.5 w-3.5" /> Up to {room.guests} guests
                </span>
                <span className="absolute right-5 top-5 rounded-full bg-ink-900/40 px-4 py-2 text-xs text-sand-50 backdrop-blur">
                  {room.photos.length} photos
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <p className="font-serif text-lg italic text-sand-200">0{i + 1}</p>
                    <h3 className="mt-1 text-3xl text-sand-50 sm:text-4xl">{room.name}</h3>
                  </div>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand-50 text-ink-900 transition-all duration-500 group-hover:rotate-45 group-hover:bg-clay-600 group-hover:text-sand-50">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
              <div className="mt-6 flex flex-col gap-5 px-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <p className="text-sm text-ink-500">{room.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {room.details.slice(1, 4).map((d) => (
                      <li key={d} className="rounded-full border border-sand-300 px-3 py-1 text-xs text-ink-700">{d}</li>
                    ))}
                  </ul>
                </div>
                <a href={href('booking', room.id)} className="btn-dark shrink-0 !px-6 !py-3">Book now</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
