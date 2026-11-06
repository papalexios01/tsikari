import { Img } from "@/components/site/Img";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { amenities, features, homeGallery, places, rooms, stats } from "@/data/content";
import { media } from "@/data/media";
import { Btn, Eyebrow, Page, btnClass } from "@/components/site/ui";
import { Lightbox } from "@/components/site/Lightbox";
import { nextDay, todayLocal } from "@/lib/dates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Archontiko Tsikari — A 1901 mansion with five studios in Varos, Lemnos" },
      { name: "description", content: "Boutique studios in a restored 1901 mansion on the village square of Varos, Lemnos. COCO-MAT beds, private kitchenettes, family hospitality." },
      { property: "og:title", content: "Archontiko Tsikari — Varos, Lemnos" },
      { property: "og:description", content: "Five studios in a restored 1901 mansion at the heart of Lemnos." },
    ],
    links: [{ rel: "preload", as: "image", href: "/img/main-1-1920.webp", imageSrcSet: "/img/main-1-800.webp 800w, /img/main-1-1280.webp 1280w, /img/main-1-1920.webp 1920w", imageSizes: "100vw", fetchPriority: "high" }],
  }),
  component: Home,
});

function Home() {
  return (
    <Page>
      <Hero />
      <Stats />
      <Intro />
      <Features />
      <Rooms />
      <Marquee />
      <Amenities />
      <Mosaic />
      <Places />
      <Closing />
    </Page>
  );
}

function Hero() {
  return (
    <section className="grain relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-ink-foreground">
      <Img photo={media.home.exterior} alt="Archontiko Tsikari exterior with the 1907 drinking fountain on Varos square" priority className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
      <div className="veil absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 lg:px-10 lg:pb-20">
        <p className="eyebrow animate-rise text-gold">Varos, Lemnos · Est. 1901</p>
        <h1 className="display animate-rise mt-6 text-[17vw] sm:text-8xl lg:text-[11rem]" style={{ animationDelay: "0.15s" }}>
          Archontiko <br /><em className="text-gold">Tsikari</em>
        </h1>
        <div className="animate-rise mt-10 flex flex-col gap-8 border-t border-ink-foreground/20 pt-8 lg:flex-row lg:items-end lg:justify-between" style={{ animationDelay: "0.35s" }}>
          <p className="max-w-md text-lg font-light text-ink-foreground/85">
            A merchant's mansion on the village square, lovingly restored into five quiet studios at the heart of the island.
          </p>
          <AvailabilityBar />
        </div>
      </div>
    </section>
  );
}

function AvailabilityBar() {
  const navigate = useNavigate();
  const [ci, setCi] = useState("");
  const [co, setCo] = useState("");
  const [g, setG] = useState(2);
  const cell = "flex flex-col gap-1 px-5 py-3";
  const inp = "bg-transparent text-sm text-ink-foreground outline-none [color-scheme:dark]";
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); navigate({ to: "/booking", search: { in: ci || undefined, out: co || undefined, guests: g } }); }}
      className="flex flex-wrap items-stretch divide-x divide-ink-foreground/20 border border-ink-foreground/25 bg-ink/40 backdrop-blur-md"
    >
      <label className={cell}><span className="eyebrow text-[0.55rem] text-gold">Check-in</span><input type="date" min={todayLocal()} value={ci} onChange={(e) => setCi(e.target.value)} className={inp} /></label>
      <label className={cell}><span className="eyebrow text-[0.55rem] text-gold">Check-out</span><input type="date" min={nextDay(ci || todayLocal())} value={co} onChange={(e) => setCo(e.target.value)} className={inp} /></label>
      <label className={cell}><span className="eyebrow text-[0.55rem] text-gold">Guests</span>
        <select value={g} onChange={(e) => setG(Number(e.target.value))} className={cn(inp, "[&>option]:text-foreground")}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select>
      </label>
      <button className={cn(btnClass("light"), "px-6")}>Check availability</button>
    </form>
  );
}

function Stats() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((s, i) => (
          <div key={s.label} className={cn("reveal py-12 lg:py-16", i > 0 && "lg:border-l lg:pl-10", i % 2 && "border-l pl-6 lg:pl-10")} style={{ transitionDelay: `${i * 0.1}s` }}>
            <p className="display text-6xl text-primary lg:text-7xl">{s.value}</p>
            <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6">
          <Eyebrow className="reveal">Discover Tsikari</Eyebrow>
          <h2 className="reveal mt-8 text-5xl sm:text-6xl lg:text-7xl">
            Hotel-quality studios, <em className="text-primary">with the warmth</em> of a family home.
          </h2>
          <p className="reveal mt-8 max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
            Built in 1901 by Haralabos Tsikaris, a trader from Asia Minor, the mansion has watched over the square of Varos for more than a century. Today his descendants welcome guests into five individually styled studios, with COCO-MAT sleep and island hospitality.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <Btn to="/about">Our story</Btn>
            <Btn to="/rooms" variant="outline">View studios</Btn>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div className="reveal img-zoom overflow-hidden shadow-lift"><Img photo={media.home.facade} sizes="(min-width:1024px) 50vw, 100vw" alt="The mansion facade" className="aspect-[4/5] w-full object-cover" /></div>
          <div className="reveal img-zoom absolute -bottom-12 -left-6 hidden w-1/2 overflow-hidden border-8 border-background shadow-lift sm:block lg:-left-16">
            <Img photo={media.entrance[0]!} sizes="(min-width:1024px) 25vw, 50vw" alt="Entrance of Archontiko Tsikari" className="aspect-square w-full object-cover" />
          </div>
          <p className="reveal absolute -right-2 top-10 hidden font-serif text-[9rem] leading-none text-primary/15 lg:block" translate="no">1901</p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [active, setActive] = useState(0);
  const f = features[active]!;
  return (
    <section className="grain relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow reveal text-gold">Find out more</p>
            <h2 className="reveal mt-6 max-w-2xl text-5xl sm:text-6xl">Three reasons to stay</h2>
          </div>
          <div className="reveal flex gap-8">
            {features.map((x, i) => (
              <button key={x.id} onClick={() => setActive(i)} className={cn("border-b pb-2 text-left transition-all duration-500", i === active ? "border-gold text-ink-foreground" : "border-transparent text-ink-foreground/45 hover:text-ink-foreground")}>
                <span className="block font-serif text-sm italic text-gold">0{i + 1}</span>
                <span className="eyebrow">{x.tab}</span>
              </button>
            ))}
          </div>
        </div>
        <div key={f.id} className="animate-in fade-in slide-in-from-bottom-6 mt-16 grid gap-14 duration-1000 lg:grid-cols-12">
          <div className="img-zoom overflow-hidden lg:col-span-6"><Img photo={f.image} sizes="(min-width:1024px) 50vw, 100vw" alt={f.title} className="aspect-[4/5] h-full w-full object-cover" /></div>
          <div className="lg:col-span-6">
            <h3 className="text-4xl sm:text-5xl">{f.title}</h3>
            <p className="mt-4 font-serif text-2xl italic text-gold">{f.lead}</p>
            <div className="mt-8 space-y-4 font-light leading-relaxed text-ink-foreground/75">{f.body.slice(0, 2).map((b) => <p key={b}>{b}</p>)}</div>
            <ul className="mt-10 grid grid-cols-2 gap-px bg-ink-foreground/15">
              {f.highlights.map((h) => <li key={h} className="bg-ink p-5 text-sm">{h}</li>)}
            </ul>
            <p className="eyebrow mt-10 text-gold">{f.extrasTitle}</p>
            <p className="mt-3 text-sm text-ink-foreground/65">{f.extras.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="reveal">Rooms</Eyebrow>
            <h2 className="reveal mt-6 text-5xl sm:text-6xl">Our studios</h2>
          </div>
          <Btn to="/rooms" variant="outline" className="reveal">All details</Btn>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {rooms.map((r, i) => (
            <Link key={r.id} to="/rooms" hash={r.id} className="reveal group block" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="img-zoom relative overflow-hidden">
                <Img photo={r.photos[1] ?? r.photos[0]!} sizes="(min-width:768px) 50vw, 100vw" alt={r.name} className="aspect-[4/3] w-full object-cover" />
                <span className="eyebrow absolute left-5 top-5 bg-background/90 px-3 py-2 text-[0.6rem] text-foreground">Up to {r.guests} guests</span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl">{r.name}</h3>
                  <p className="mt-3 max-w-md text-muted-foreground">{r.summary}</p>
                </div>
                <span className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["COCO-MAT sleep", "Village square views", "Since 1901", "Five studios", "Lemnos", "Family hospitality"];
  return (
    <div className="overflow-hidden border-y border-border bg-sand py-8">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-4xl italic text-foreground/80 sm:text-5xl">{w}<span className="text-2xl not-italic text-primary">✦</span></span>
        ))}
      </div>
    </div>
  );
}

function Amenities() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="reveal">Amenities</Eyebrow>
            <h2 className="reveal mt-6 text-5xl sm:text-6xl">Thoughtful <em className="text-primary">details</em></h2>
            <p className="reveal mt-6 text-muted-foreground">Everything you need for an unhurried island stay, and a few things you didn't know you wanted.</p>
          </div>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {amenities.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="reveal group bg-background p-8 transition-colors duration-500 hover:bg-card" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
              <Icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.2} />
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mosaic() {
  const [idx, setIdx] = useState<number | null>(null);
  const photos = homeGallery.map((g) => g.photo);
  return (
    <section className="pb-28 lg:pb-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="reveal text-5xl sm:text-6xl">A glimpse inside</h2>
          <Btn to="/gallery" variant="outline" className="reveal hidden sm:inline-flex">Full gallery</Btn>
        </div>
        <div className="grid grid-flow-dense auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4">
          {homeGallery.map((g, i) => (
            <button key={g.photo + i} onClick={() => setIdx(i)} className={cn("reveal img-zoom relative overflow-hidden", g.span)}>
              <Img photo={g.photo} alt={g.alt} sizes="(min-width:768px) 50vw, 100vw" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <Lightbox photos={photos} index={idx} onChange={setIdx} />
    </section>
  );
}

function Places() {
  return (
    <section className="bg-sand py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="reveal">Limnos Island</Eyebrow>
            <h2 className="reveal mt-6 text-5xl sm:text-6xl">Right in the heart of Lemnos</h2>
            <p className="reveal mt-6 text-lg font-light text-muted-foreground">Varos sits at the island’s centre, so every beach and village is close at hand.</p>
            <div className="reveal img-zoom mt-10 overflow-hidden shadow-lift">
              <Img photo={media.home.island} alt="Lemnos coastline" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {places.map((p, i) => (
            <li key={p.name} className="reveal group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-foreground/15 py-7 transition-colors duration-500 last:border-b hover:border-primary sm:grid-cols-[4rem_1fr_auto]">
              <span className="font-serif text-lg italic text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground"><span className="eyebrow mr-3 text-[0.6rem] text-foreground/70">{p.area}</span>{p.note}</p>
              </div>
              <span className="whitespace-nowrap text-right"><span className="display text-4xl text-primary">{p.minutes}</span> <span className="eyebrow text-[0.6rem] text-muted-foreground">min</span></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-40 text-center text-ink-foreground">
      <Img photo={media.home.banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="eyebrow reveal text-gold">Relax, explore, enjoy</p>
        <h2 className="display reveal mt-6 text-6xl sm:text-8xl">Your table on the square is <em className="text-gold">waiting</em>.</h2>
        <div className="reveal mt-12 flex justify-center"><Btn to="/booking" variant="light">Plan your stay</Btn></div>
      </div>
    </section>
  );
}
