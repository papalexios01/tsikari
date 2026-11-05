import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import AvailabilityBar from '@/components/AvailabilityBar';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-sand-50 p-2 sm:p-3">
      <div className="relative flex min-h-[820px] flex-col overflow-hidden rounded-[24px] bg-ink-900 sm:min-h-[860px] sm:rounded-[32px] lg:min-h-[min(950px,100svh)]">
        <Img
          photo={media.home.exterior}
          priority
          alt="Archontiko Tsikari historic mansion and 1907 fountain on Varos village square, Lemnos"
          sizes="100vw"
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/55 to-ink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/25" />
        <span aria-hidden className="absolute right-10 top-36 hidden border-r border-sand-50/40 pr-4 text-right text-[10px] uppercase tracking-[0.35em] text-sand-50/85 lg:block">
          A house with a story<br />since 1901
        </span>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-6 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-9">
          <div className="flex flex-1 flex-col justify-center pb-14 pt-6 sm:pb-16">
            <p className="eyebrow flex animate-fade-up items-center gap-3 text-sand-100" style={{ animationDelay: '100ms' }}>
              <span className="h-px w-9 bg-sand-100/65" />
              VAROS · LEMNOS · GREECE
            </p>
            <h1 id="hero-heading" className="mt-7 max-w-5xl font-serif text-[clamp(72px,12vw,164px)] font-normal leading-[0.83] tracking-[-0.055em] text-sand-50">
              <span className="line-mask"><span className="block animate-line-up pb-[0.08em]" style={{ animationDelay: '160ms' }}>Archontiko</span></span>
              <span className="line-mask"><em className="block animate-line-up pb-[0.08em] font-normal text-sand-200" style={{ animationDelay: '280ms' }}>Tsikari.</em></span>
            </h1>
            <div className="mt-8 flex max-w-3xl flex-col gap-5 border-t border-sand-50/35 pt-6 sm:mt-10 sm:flex-row sm:items-start sm:gap-12">
              <p className="animate-fade-up font-serif text-3xl italic leading-none text-sand-50 sm:max-w-[260px] sm:text-4xl" style={{ animationDelay: '420ms' }}>
                Where history feels like home.
              </p>
              <p className="max-w-sm animate-fade-up text-sm font-light leading-7 text-sand-100/90 sm:pt-1 sm:text-base" style={{ animationDelay: '500ms' }}>
                Five peaceful studios in a beautifully restored 1901 mansion. The character of old Lemnos, with the warmth of a family-run home.
              </p>
            </div>
            <a href={href('about')} className="group mt-8 inline-flex w-fit items-center gap-3 text-sm font-medium text-sand-50 transition-colors hover:text-clay-300">
              Explore our story
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-50/50 transition-colors group-hover:border-clay-300 group-hover:bg-clay-600 group-hover:text-sand-50">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '620ms' }}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-sand-100/85 sm:mb-4">
              <span>Plan your island stay</span>
              <span>An enquiry, not an instant reservation</span>
            </div>
            <AvailabilityBar />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sand-100/85">
              <span className="flex items-center gap-2 text-xs">
                <MapPin className="h-4 w-4" /> Varos, Lemnos 81400, Greece
              </span>
              <a href={href('home', 'house')} className="group inline-flex items-center gap-3 text-xs">
                Discover the house
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-50/35 transition-colors group-hover:bg-sand-50 group-hover:text-ink-900">
                  <ArrowDown className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
