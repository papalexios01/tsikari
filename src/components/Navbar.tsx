import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Img from '@/components/Img';
import { navLinks, contact, tel } from '@/data/content';
import { media } from '@/data/media';
import { href, type Route } from '@/lib/router';

export default function Navbar({ route }: { route: Route }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 64);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const before = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const toggle = buttonRef.current;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key !== 'Tab') return;
      const elements = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
      if (!elements.length) return;
      if (event.shiftKey && document.activeElement === elements[0]) {
        event.preventDefault();
        elements[elements.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) {
        event.preventDefault();
        elements[0].focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.body.style.overflow = priorOverflow;
      (before?.isConnected ? before : toggle)?.focus();
    };
  }, [open]);

  useEffect(() => { setOpen(false); }, [route]);

  return (
    <header className={['ge-nav', solid || open ? 'ge-nav--solid' : ''].join(' ')}>
      <div className="ge-nav__inner">
        <button ref={buttonRef} type="button" className="ge-nav__menu" aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open} aria-controls="ge-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={19} strokeWidth={1.25} /> : <Menu size={19} strokeWidth={1.25} />}
          <span>{open ? 'CLOSE' : 'MENU'}</span>
        </button>
        <a className="ge-nav__wordmark" href={href('home')} aria-label="Archontiko Tsikari homepage"
          onClick={() => setOpen(false)}>
          <span>ARCHONTIKO</span><span>TSIKARI</span>
        </a>
        <div className="ge-nav__right">
          <span className="ge-nav__location">VAROS, LEMNOS</span>
          <a className="ge-nav__book" href={href('booking')} onClick={() => setOpen(false)}>
            <span>BOOK A STAY</span><ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div id="ge-navigation" ref={panelRef} role={open ? 'dialog' : undefined} aria-modal={open ? true : undefined}
        aria-label="Site navigation" aria-hidden={!open} className={['ge-navpanel', open ? 'ge-navpanel--open' : ''].join(' ')}>
        <div className="ge-navpanel__photo">
          <Img photo={media.home.facade} alt="Historic Archontiko Tsikari mansion" sizes="40vw" />
          <span>AN ISLAND HOME SINCE 1901</span>
        </div>
        <div className="ge-navpanel__content">
          <p className="ge-eyebrow">DISCOVER TSIKARI</p>
          <nav aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <a key={link.route} className={route === link.route ? 'is-current' : ''} aria-current={route === link.route ? 'page' : undefined}
                href={href(link.route)} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2,'0')}</span><strong>{link.label}</strong><ArrowUpRight aria-hidden="true" size={22} strokeWidth={1} />
              </a>
            ))}
          </nav>
          <div className="ge-navpanel__contact">
            <a href={tel(contact.mobile)}>{contact.mobile}</a>
            <a href={'mailto:' + contact.email}>{contact.email}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
