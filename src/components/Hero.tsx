import { ArrowRight, MapPin } from 'lucide-react';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900">
      <Img
        photo={media.home.exterior}
        priority
        alt="Archontiko Tsikari boutique hotel exterior with the 1907 drinking fountain in Varos village square, Lemnos"
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow flex animate-fade-up items-center gap-2 text-sand-200" style={{ animationDelay: '200ms' }}>
            <MapPin className="h-3.5 w-3.5" /> Varos, Lemnos · Est. 1901
          </p>
          <h1
            className="mt-6 animate-fade-up text-5xl font-normal text-sand-50 sm:text-7xl lg:text-[104px]"
            style={{ animationDelay: '350ms' }}
          >
            Archontiko
            <span className="block italic text-sand-200">Tsikari</span>
          </h1>
          <p className="eyebrow mt-6 animate-fade-up text-clay-300" style={{ animationDelay: '420ms' }}>
            Traditional Hotel &nbsp;·&nbsp; Est. 1901
          </p>
          <p
            className="mt-8 max-w-xl animate-fade-up text-base font-light text-sand-100/90 sm:text-lg"
            style={{ animationDelay: '500ms' }}
          >
            A traditional mansion of five quiet studios on the village square, where hotel comfort meets the warmth of a
            family-run guesthouse.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: '650ms' }}>
            <a href={href('booking')} className="btn-primary group">
              Check availability
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href={href('rooms')} className="btn-ghost border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50 hover:text-ink-900">
              View our rooms
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between border-t border-sand-50/20 pt-6">
          <p className="eyebrow text-sand-200/80">Traditional Hotel</p>
          <a href={href('home', 'house')} className="hidden items-center gap-4 text-sand-200/80 sm:flex" aria-label="Scroll down">
            <span className="eyebrow">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-sand-50/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll bg-sand-50" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
