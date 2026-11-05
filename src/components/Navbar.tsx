import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { contact, navLinks, tel } from '@/data/content';
import { media } from '@/data/media';
import { href, type Route } from '@/lib/router';

type Props = { route: Route };

export default function Navbar({ route }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, []);

  useEffect(() => setOpen(false), [route]);

  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'px-3 pt-3' : 'px-2 pt-2 sm:px-3 sm:pt-3'}`}>
      <div
        className={`relative z-20 mx-auto flex items-center justify-between gap-6 overflow-hidden transition-all duration-500 ${
          solid
            ? 'max-w-6xl rounded-full bg-sand-50/90 py-2 pl-5 pr-2 shadow-[0_12px_40px_-16px_rgba(23,22,19,0.35)] ring-1 ring-ink-900/5 backdrop-blur-xl sm:pl-7'
            : 'max-w-7xl px-4 py-5 sm:px-8 lg:px-10'
        }`}
      >
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-clay-500 transition-opacity ${solid ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `scaleX(${progress})` }}
        />
        <a href={href('home')} className="flex shrink-0 items-center" aria-label="Archontiko Tsikari home">
          <img
            src={media.logo}
            alt="Archontiko Tsikari"
            width={300}
            height={100}
            className={`w-auto transition-all duration-500 ${solid ? 'h-10 brightness-0' : 'h-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-14'}`}
          />
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => {
            const active = l.route === route;
            return (
              <a
                key={l.route}
                href={href(l.route)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  solid
                    ? active ? 'bg-ink-900 text-sand-50' : 'text-ink-700 hover:bg-sand-200/70 hover:text-ink-900'
                    : active ? 'bg-sand-50/20 text-sand-50 backdrop-blur' : 'text-sand-50/90 hover:bg-sand-50/10 hover:text-sand-50'
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a href={tel(contact.mobile)} className={`flex items-center gap-2 text-sm transition-colors ${solid ? 'text-ink-700 hover:text-clay-600' : 'text-sand-50/90 hover:text-sand-50'}`}>
            <Phone className="h-4 w-4" /> {contact.mobile}
          </a>
          <a
            href={href('booking')}
            className={`group inline-flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-sm font-medium transition-all duration-500 ${
              solid ? 'bg-ink-900 text-sand-50 hover:bg-clay-600' : 'bg-sand-50 text-ink-900 hover:bg-clay-600 hover:text-sand-50'
            }`}
          >
            Book Now
            <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${solid ? 'bg-sand-50 text-ink-900' : 'bg-ink-900 text-sand-50'}`}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-controls="mobile-navigation"
          onClick={() => setOpen((o) => !o)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden ${solid ? 'bg-ink-900 text-sand-50' : 'bg-sand-50/15 text-sand-50 backdrop-blur'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        ref={menuRef}
        aria-hidden={!open}
        className={`fixed inset-0 z-10 overflow-y-auto bg-sand-50 px-6 pb-10 pt-28 transition-all duration-500 xl:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {navLinks.map((l, i) => (
            <a
              key={l.route}
              href={href(l.route)}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 border-b border-sand-200 py-4 font-serif text-4xl transition-colors hover:text-clay-600 ${l.route === route ? 'text-clay-600' : 'text-ink-900'}`}
            >
              <span className="font-sans text-xs text-ink-400">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={href('booking')} onClick={() => setOpen(false)} className="btn-dark mt-8 w-full">Book Now</a>
        <a href={tel(contact.mobile)} className="btn-ghost mt-3 w-full border-sand-300 text-ink-800">
          <Phone className="h-4 w-4" /> {contact.mobile}
        </a>
      </div>
    </header>
  );
}
