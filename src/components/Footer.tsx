import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { contact, navLinks, tel } from '@/data/content';
import { href } from '@/lib/router';

export default function Footer() {
  return (
    <footer className="ge-footer">
      <div className="ge-container">
        <div className="ge-footer__top">
          <a href={href('home')} className="ge-footer__brand" aria-label="Archontiko Tsikari home">
            <span>ARCHONTIKO</span><span>TSIKARI</span></a>
          <div className="ge-footer__statement">The kind of place<br/>you come back <em>to.</em></div>
        </div>
        <div className="ge-footer__columns">
          <div><p className="ge-eyebrow">AN ISLAND HOME SINCE 1901</p>
            <p>Five thoughtfully appointed studios in a restored family mansion on the village square of Varos, Lemnos.</p>
            <a href={href('booking')} className="ge-footer__booking">RESERVE YOUR STAY <ArrowUpRight size={16} strokeWidth={1.3}/></a>
          </div>
          <div><p className="ge-eyebrow">EXPLORE</p>
            <nav aria-label="Footer navigation">{navLinks.map(l=><a key={l.route} href={href(l.route)}>{l.label}</a>)}
              <a href={href('booking')}>Booking</a></nav>
          </div>
          <div><p className="ge-eyebrow">GET IN TOUCH</p>
            <a href={tel(contact.mobile)}><Phone size={15} strokeWidth={1.2}/>{contact.mobile}</a>
            <a href={'mailto:'+contact.email}><Mail size={15} strokeWidth={1.2}/>{contact.email}</a>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WHATSAPP <ArrowUpRight size={15} strokeWidth={1.2}/></a>
            <p className="ge-footer__address"><MapPin size={15} strokeWidth={1.2}/>{contact.address.join(', ')}</p>
          </div>
        </div>
        <div className="ge-footer__bottom"><span>© {new Date().getFullYear()} ARCHONTIKO TSIKARI. ALL RIGHTS RESERVED.</span><span>BUILT ON HERITAGE · ROOTED IN LEMNOS</span></div>
      </div>
    </footer>
  );
}
