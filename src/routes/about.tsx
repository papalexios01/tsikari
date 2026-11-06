import { Img } from "@/components/site/Img";
import { createFileRoute } from "@tanstack/react-router";
import { Bed, Coffee, Heart, Leaf, Sparkles, UserRound } from "lucide-react";
import { timeline } from "@/data/content";
import { media } from "@/data/media";
import { Btn, Eyebrow, Page, PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our story — Archontiko Tsikari, a family house since 1901" },
      {
        name: "description",
        content:
          "The history of the Tsikaris mansion in Varos, Lemnos, and the family hospitality we offer today.",
      },
      { property: "og:title", content: "Our story — Archontiko Tsikari" },
      {
        property: "og:description",
        content: "A merchant's mansion on the square of Varos, restored by his descendants.",
      },
    ],
  }),
  component: About,
});

const philosophy = [
  {
    icon: Heart,
    title: "Feel at home",
    text: "Our first goal is simple: that you settle in as if this were your own house on the island.",
  },
  {
    icon: Bed,
    title: "COCO-MAT sleep",
    text: "Every studio is furnished with natural COCO-MAT mattresses, bedding and bath products for truly restful nights.",
  },
  {
    icon: UserRound,
    title: "Individual attention",
    text: "With only five studios, we have time for each guest, from arrival tips to the little extras that make a stay.",
  },
  {
    icon: Coffee,
    title: "Breakfast ideas",
    text: "Ask us where to find the best local bakeries, cheeses and honey to stock your kitchenette each morning.",
  },
  {
    icon: Sparkles,
    title: "Choose your pillow",
    text: "A selection of COCO-MAT pillows lets you pick the firmness and filling that suit you best.",
  },
  {
    icon: Leaf,
    title: "Care for the island",
    text: "We follow an environmental policy that respects Lemnos, its resources and its village life.",
  },
];

function About() {
  return (
    <Page>
      <PageHero
        eyebrow="About us"
        title="A family house"
        accent="since 1901"
        lead="The story of Archontiko Tsikari, and the way we welcome guests today."
        photo={media.home.facade}
      />
      <section className="py-28 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <Eyebrow className="reveal">Our philosophy</Eyebrow>
            <h2 className="reveal mt-8 text-5xl sm:text-6xl">
              Hospitality the way <em className="text-primary">a family</em> does it
            </h2>
            <p className="reveal mt-8 text-lg font-light text-muted-foreground">
              We are not a large hotel and we don't want to be. We look after a handful of guests at
              a time, with care and attention that only a family-run house can offer.
            </p>
            <figure className="reveal mt-12">
              <Img
                photo={media.about.portraitB}
                alt="Archontiko Tsikari before and after its restoration"
                sizes="(min-width:1024px) 34vw, 100vw"
                className="h-auto w-full shadow-soft"
              />
              <figcaption className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-px w-8 bg-primary" />
                Then &amp; now — the mansion before and after restoration
              </figcaption>
            </figure>
          </div>
          <div className="grid gap-px self-start bg-border sm:grid-cols-2 lg:col-span-7">
            {philosophy.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="reveal bg-background p-10"
                style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
              >
                <span className="font-serif text-sm italic text-primary">0{i + 1}</span>
                <Icon className="mt-4 h-7 w-7 text-primary" strokeWidth={1.2} />
                <h3 className="mt-6 text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grain relative bg-ink py-28 text-ink-foreground lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow reveal text-gold">Our history</p>
              <h2 className="reveal mt-6 text-5xl sm:text-6xl">
                More than a century on the square
              </h2>
              <Img
                photo={media.about.family}
                sizes="(min-width:1024px) 40vw, 100vw"
                alt="The Tsikaris family, early 20th century"
                className="reveal mt-12 h-auto w-full grayscale-[30%]"
              />
            </div>
          </div>
          <ol className="lg:col-span-7">
            {timeline.map((t) => (
              <li
                key={t.year + t.title}
                className="reveal grid gap-4 border-t border-ink-foreground/15 py-12 sm:grid-cols-[10rem_1fr]"
              >
                <p className="display text-4xl text-gold">{t.year}</p>
                <div>
                  <h3 className="text-3xl">{t.title}</h3>
                  <p className="mt-4 font-light leading-relaxed text-ink-foreground/70">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="py-32 text-center">
        <p className="reveal mx-auto max-w-3xl px-6 font-serif text-4xl italic sm:text-5xl">
          Relax, explore, and enjoy every moment of your journey.
        </p>
        <div className="reveal mt-12 flex justify-center">
          <Btn to="/booking">Book a stay</Btn>
        </div>
      </section>
    </Page>
  );
}
