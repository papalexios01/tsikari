import { ArrowDown, MapPin } from 'lucide-react';
import AvailabilityBar from '@/components/AvailabilityBar';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Hero() {
  return (
    <section id="top" className="bg-sand-50 p-2 sm:p-3">
      <div className="relative flex min-h-[calc(100svh-16px)] flex-col overflow-hidden rounded-[28px] bg-ink-900 sm:min-h-[calc(100svh-24px)] sm:rounded-[36px]">
        <Img
          photo={media.home.exterior}
          priority
          alt="Archontiko Tsikari boutique hotel exterior with the 1907 drinking fountain in Varos village square, Lemnos"
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/10 to-ink-900/80" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-6 pt-32 sm:px-8 lg:px-10 lg:pb-10">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="eyebrow flex animate-fade-up items-center gap-3 text-sand-100" style={{ animationDelay: '200ms' }}>
              <span className="h-px w-8 bg-sand-100/60" />
              Traditional Hotel &middot; Est. 1901
              <span className="h-px w-8 bg-sand-100/60" />
            </p>
            <h1 className="display mt-6 text-sand-50">
              <span className="line-mask">
                <span className="block animate-line-up text-[15vw] sm:text-[12vw] lg:text-[148px]" style={{ animationDelay: '300ms' }}>
                  Archontiko
                </span>
              </span>
              <span className="line-mask">
                <span className="block animate-line-up text-[15vw] italic text-sand-200 sm:text-[12vw] lg:text-[148px]" style={{ animationDelay: '450ms' }}>
                  Tsikari
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-base font-light text-sand-100/90 sm:text-lg" style={{ animationDelay: '650ms' }}>
              A traditional mansion of five quiet studios on the village square, where hotel comfort meets the warmth of a
              family-run guesthouse.
            </p>
          </div>

          <div className="mt-10 animate-fade-up" style={{ animationDelay: '800ms' }}>
            <AvailabilityBar />
            <div className="mt-5 flex items-center justify-between text-sand-100/80">
              <p className="flex items-center gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5" /> Varos, Lemnos 81400, Greece
              </p>
              <a href={href('home', 'house')} className="group hidden items-center gap-3 text-xs sm:flex" aria-label="Scroll down">
                Discover the house
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-50/30 transition-colors duration-500 group-hover:bg-sand-50 group-hover:text-ink-900">
                  <ArrowDown className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
