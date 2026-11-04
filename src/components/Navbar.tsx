import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { contact, navLinks, tel } from '@/data/content';
import { media } from '@/data/media';
import { href, type Route } from '@/lib/router';

type Props = { route: Route };

export default function Navbar({ route }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => setOpen(false), [route]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-sand-50/90 py-3 shadow-[0_1px_0_rgba(38,36,31,0.08)] backdrop-blur-xl' : 'py-6'
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-clay-500 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <a href={href('home')} className="flex shrink-0 items-center" aria-label="Archontiko Tsikari home">
          <img
            src={media.logo}
            alt="Archontiko Tsikari"
            width={300}
            height={100}
            className={`h-11 w-auto transition-all duration-500 sm:h-12 ${solid ? 'brightness-0' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]'}`}
          />
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {navLinks.map((l) => {
            const active = l.route === route;
            return (
              <a
                key={l.route}
                href={href(l.route)}
                aria-current={active ? 'page' : undefined}
                className={`group relative text-sm transition-colors duration-300 ${
                  solid ? (active ? 'text-clay-600' : 'text-ink-700 hover:text-clay-600') : 'text-sand-50/90 hover:text-sand-50'
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a href={tel(contact.mobile)} className={`flex items-center gap-2 text-sm transition-colors ${solid ? 'text-ink-700 hover:text-clay-600' : 'text-sand-50/90 hover:text-sand-50'}`}>
            <Phone className="h-4 w-4" /> {contact.mobile}
          </a>
          <a href={href('booking')} className="btn-primary !px-6 !py-3">Book Now</a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex h-11 w-11 items-center justify-center rounded-full xl:hidden ${solid ? 'text-ink-900' : 'text-sand-50'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-sand-50 px-6 pb-10 pt-6 transition-all duration-500 xl:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex flex-col">
          {navLinks.map((l) => (
            <a
              key={l.route}
              href={href(l.route)}
              onClick={() => setOpen(false)}
              className={`border-b border-sand-200 py-4 font-serif text-3xl transition-colors hover:text-clay-600 ${l.route === route ? 'text-clay-600' : 'text-ink-900'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href={href('booking')} onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">Book Now</a>
        <a href={tel(contact.mobile)} className="btn-ghost mt-3 w-full border-sand-300 text-ink-800">
          <Phone className="h-4 w-4" /> {contact.mobile}
        </a>
      </div>
    </header>
  );
}
