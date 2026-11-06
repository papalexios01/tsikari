import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact, tel } from "@/data/content";
import { nav } from "./Header";
import { Btn } from "./ui";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10">
        <div className="grid gap-16 border-b border-ink-foreground/15 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-gold">An island home since 1901</p>
            <h2 className="display mt-6 text-5xl sm:text-7xl">
              Come stay <em className="text-gold">with us</em> on Lemnos.
            </h2>
            <div className="mt-10"><Btn to="/booking" variant="light">Book a stay</Btn></div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <div>
              <p className="eyebrow text-ink-foreground/50">Explore</p>
              <ul className="mt-6 space-y-3">
                {nav.map((n) => (
                  <li key={n.to}><Link to={n.to} className="link-line font-serif text-2xl">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-ink-foreground/50">Get in touch</p>
              <ul className="mt-6 space-y-4 text-sm font-light text-ink-foreground/80">
                <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{contact.address.join(", ")}</li>
                {[contact.mobile, contact.landline].map((n) => (
                  <li key={n}><a href={tel(n)} className="flex gap-3 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{n}</a></li>
                ))}
                <li><a href={`mailto:${contact.email}`} className="flex gap-3 break-all hover:text-gold"><Mail className="h-4 w-4 shrink-0 text-gold" />{contact.email}</a></li>
                <li><a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-gold"><MessageCircle className="h-4 w-4 text-gold" />WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p translate="no" className="display select-none py-6 text-center text-[17vw] leading-none text-ink-foreground/[0.06] lg:text-[12rem]">Tsikari</p>
        <div className="flex flex-col justify-between gap-2 pb-10 text-xs text-ink-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Archontiko Tsikari · Varos, Lemnos</p>
          <p>We speak {contact.languages.join(", ")}.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-500 hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
