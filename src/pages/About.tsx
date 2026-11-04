import { Bed, Coffee, Heart, Leaf, Sparkles, UserRound } from 'lucide-react';
import BookCta from '@/components/BookCta';
import Img from '@/components/Img';
import PageHeader from '@/components/PageHeader';
import { timeline } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

const philosophy = [
  { icon: Heart, title: 'Feel at home', text: 'Our first goal is simple: that you settle in as if this were your own house on the island.' },
  { icon: Bed, title: 'COCO-MAT sleep', text: 'Every studio is furnished with natural COCO-MAT mattresses, bedding and bath products for truly restful nights.' },
  { icon: UserRound, title: 'Individual attention', text: 'With only five studios, we have time for each guest, from arrival tips to the little extras that make a stay.' },
  { icon: Coffee, title: 'Breakfast ideas', text: 'Ask us where to find the best local bakeries, cheeses and honey to stock your kitchenette each morning.' },
  { icon: Sparkles, title: 'Choose your pillow', text: 'A selection of COCO-MAT pillows lets you pick the firmness and filling that suit you best.' },
  { icon: Leaf, title: 'Care for the island', text: 'We follow an environmental policy that respects Lemnos, its resources and its village life.' },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="About us"
        title="A family house"
        accent="since 1901"
        lead="The story of Archontiko Tsikari, and the way we welcome guests today."
        photo={media.about.family}
        alt="The Tsikaris family mansion in Varos"
      />

      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="eyebrow reveal text-clay-600">Our philosophy</p>
            <h2 className="reveal mt-6 text-4xl text-ink-900 sm:text-5xl">
              Hospitality the way <em className="text-clay-600">a family</em> does it
            </h2>
            <p className="reveal mt-6 text-ink-500">
              We are not a large hotel and we don&rsquo;t want to be. We look after a handful of guests at a time, with care and
              attention that only a family-run house can offer.
            </p>
            <div className="reveal mt-10 grid grid-cols-2 gap-4">
              <Img photo={media.about.portraitA} alt="Archontiko Tsikari detail" sizes="(min-width: 1024px) 20vw, 50vw" className="aspect-[3/4] w-full rounded-3xl object-cover" />
              <Img photo={media.about.portraitB} alt="Archontiko Tsikari interior" sizes="(min-width: 1024px) 20vw, 50vw" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {philosophy.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reveal group rounded-3xl border border-sand-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(38,36,31,0.25)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-100 text-clay-600 transition-colors duration-500 group-hover:bg-clay-500 group-hover:text-sand-50">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-2xl text-ink-900">{title}</h3>
                <p className="mt-3 text-sm text-ink-500">{text}</p>
              </div>
            ))}
            <p className="reveal font-serif text-2xl italic text-ink-700 sm:col-span-2">
              Relax, explore, and enjoy every moment of your journey.
            </p>
          </div>
        </div>
      </section>

      <section id="history" className="bg-ink-900 py-24 text-sand-100 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow reveal text-clay-300">Our history</p>
                <h2 className="reveal mt-6 text-4xl text-sand-50 sm:text-5xl">More than a century on the square</h2>
                <Img photo={media.about.lemnos} alt="Lemnos landscape" sizes="(min-width: 1024px) 30vw, 100vw" className="reveal mt-10 aspect-[4/5] w-full rounded-3xl object-cover" />
              </div>
            </div>
            <ol className="relative border-l border-sand-50/15 lg:col-span-8 lg:ml-8">
              {timeline.map((t) => (
                <li key={t.year + t.title} className="reveal relative pb-14 pl-10 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-clay-400 bg-ink-900" />
                  <p className="eyebrow text-clay-300">{t.year}</p>
                  <h3 className="mt-3 text-3xl text-sand-50">{t.title}</h3>
                  <p className="mt-3 max-w-xl font-light text-sand-200/80">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <BookCta eyebrow="Experience it yourself" title="Ready to" />
    </div>
  );
}
