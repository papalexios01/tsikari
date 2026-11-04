import Img from '@/components/Img';
import { amenities } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

export default function Amenities() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="amenities" ref={ref} className="bg-sand-100 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow reveal text-clay-600">What we offer</p>
              <h2 className="reveal mt-6 text-4xl text-ink-900 sm:text-5xl">Amenities</h2>
              <p className="reveal mt-6 text-ink-500">
                Thoughtful comforts, natural materials and a little everyday luxury, chosen to make you feel at home from
                the first evening.
              </p>
              <div className="reveal mt-10 hidden overflow-hidden rounded-3xl lg:block">
                <Img photo={media.gallery[2]} alt="Studio at Archontiko Tsikari" sizes="34vw" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {amenities.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal group rounded-3xl border border-sand-200 bg-sand-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-clay-300 hover:shadow-[0_24px_48px_-24px_rgba(124,63,41,0.35)]"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-100 text-clay-600 transition-colors duration-500 group-hover:bg-clay-600 group-hover:text-sand-50">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-2xl text-ink-900">{title}</h3>
                <p className="mt-2 text-sm text-ink-500">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
