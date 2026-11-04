import { useState } from 'react';
import { ArrowRight, Check, Images, Users } from 'lucide-react';
import BookCta from '@/components/BookCta';
import Img, { imageSources } from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import PageHeader from '@/components/PageHeader';
import { rooms, type Room } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

function RoomSection({ room, flip }: { room: Room; flip: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const photos = [...room.photos]
    .sort((a, b) => (imageSources(b).width ?? 0) - (imageSources(a).width ?? 0) || room.photos.indexOf(a) - room.photos.indexOf(b))
    .map((photo, i) => ({ photo, alt: `${room.name}, photo ${i + 1}` }));
  const [cover, ...rest] = photos;

  return (
    <article id={room.id} className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className={`reveal lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <button onClick={() => setIndex(0)} className="group relative block w-full overflow-hidden rounded-[32px]" aria-label={`Open ${room.name} photos`}>
            <Img photo={cover.photo} alt={cover.alt} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-sand-50/90 px-4 py-2 text-xs font-medium text-ink-800 backdrop-blur">
              <Images className="h-4 w-4" /> {photos.length} photos
            </span>
          </button>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {rest.slice(0, 4).map((p, i) => (
              <button key={p.photo} onClick={() => setIndex(i + 1)} className="group relative overflow-hidden rounded-2xl" aria-label={`Open ${p.alt}`}>
                <Img photo={p.photo} alt={p.alt} sizes="(min-width: 1024px) 14vw, 25vw" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {i === 3 && rest.length > 4 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-ink-900/55 font-serif text-2xl text-sand-50">+{rest.length - 4}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <p className="eyebrow reveal flex items-center gap-2 text-clay-600">
            <Users className="h-4 w-4" /> Up to {room.guests} guests
          </p>
          <h2 className="reveal mt-5 text-4xl text-ink-900 sm:text-5xl">{room.name}</h2>
          <p className="reveal mt-6 text-ink-500">{room.summary}</p>
          <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2">
            {room.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-ink-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" /> {d}
              </li>
            ))}
          </ul>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <a href={href('booking', room.id)} className="btn-primary group">
              Book this room
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <button onClick={() => setIndex(0)} className="btn-ghost border-sand-300 text-ink-800 hover:bg-sand-100">
              View all photos
            </button>
          </div>
        </div>
      </div>
      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </article>
  );
}

export default function Rooms() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Rooms"
        title="Five studios,"
        accent="two ways to stay"
        lead="Two types of studios, five in total, each with a kitchenette, COCO-MAT bedding and the calm of a restored 1901 mansion."
        photo={media.studio23[16]}
        alt="Studio at Archontiko Tsikari"
      />
      <div className="divide-y divide-sand-200 bg-sand-50">
        {rooms.map((r, i) => (
          <RoomSection key={r.id} room={r} flip={i % 2 === 1} />
        ))}
      </div>
      <BookCta />
    </div>
  );
}
