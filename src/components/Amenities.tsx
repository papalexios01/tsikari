import Img from '@/components/Img';
import { amenities } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

export default function Amenities() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="amenities" ref={ref} className="bg-sand-50 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="section-num reveal text-clay-600">04 &nbsp;/&nbsp; What we offer</p>
              <h2 className="reveal mt-8 text-5xl text-ink-900 sm:text-6xl lg:text-7xl">
                Amen<em className="text-clay-600">ities</em>
              </h2>
              <p className="reveal mt-6 max-w-md text-ink-500">
                Thoughtful comforts, natural materials and a little everyday luxury, chosen to make you feel at home from
                the first evening.
              </p>
              <div className="reveal-img relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
                <Img photo={media.gallery[2]} alt="Studio at Archontiko Tsikari" sizes="38vw" className="h-full w-full object-cover" />
                <span className="absolute bottom-5 left-5 rounded-full bg-sand-50/90 px-5 py-2.5 text-xs text-ink-800 backdrop-blur">
                  {amenities.length} comforts in every stay
                </span>
              </div>
            </div>
          </div>

          <ul className="grid self-start overflow-hidden rounded-[32px] border border-sand-200 sm:grid-cols-2 lg:col-span-7">
            {amenities.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal group relative -mb-px -mr-px border-b border-r border-sand-200 bg-sand-50 p-8 transition-colors duration-500 hover:bg-ink-900"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sand-300 text-clay-600 transition-all duration-500 group-hover:border-clay-300 group-hover:bg-clay-600 group-hover:text-sand-50">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-sm italic text-ink-300 transition-colors duration-500 group-hover:text-sand-200/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl text-ink-900 transition-colors duration-500 group-hover:text-sand-50">{title}</h3>
                <p className="mt-2 text-sm text-ink-500 transition-colors duration-500 group-hover:text-sand-200/80">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
