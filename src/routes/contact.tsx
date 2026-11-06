import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { contact, maps, tel } from "@/data/content";
import { media } from "@/data/media";
import { Btn, Eyebrow, Page, PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Archontiko Tsikari, Varos, Lemnos" },
      { name: "description", content: "Call, email or WhatsApp Archontiko Tsikari in Varos, Lemnos. We speak Greek, English, French, Romanian and Italian." },
      { property: "og:title", content: "Contact Archontiko Tsikari" },
      { property: "og:description", content: "Get in touch to plan your stay in Lemnos." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, label: "Mobile", value: contact.mobile, href: tel(contact.mobile) },
    { icon: Phone, label: "Landline", value: contact.landline, href: tel(contact.landline) },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: contact.whatsapp },
  ];
  return (
    <Page>
      <PageHero eyebrow="Get in touch" title="We'd love to" accent="hear from you" photo={media.home.banner} />
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <Eyebrow className="reveal">Contact</Eyebrow>
            <h2 className="reveal mt-6 text-5xl sm:text-6xl">Say <em className="text-primary">yassas</em></h2>
            <ul className="mt-12 divide-y divide-border border-y border-border">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="reveal">
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-6 py-6">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.3} />
                    <span className="flex-1">
                      <span className="eyebrow block text-[0.6rem] text-muted-foreground">{label}</span>
                      <span className="mt-1 block break-all font-serif text-2xl">{value}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 flex gap-3 text-muted-foreground"><MapPin className="h-5 w-5 text-primary" />{contact.address.join(", ")}</p>
            <p className="reveal mt-3 text-sm text-muted-foreground">We speak {contact.languages.join(", ")}.</p>
            <div className="reveal mt-10"><Btn to="/booking">Request availability</Btn></div>
          </div>
          <div className="reveal overflow-hidden shadow-lift lg:col-span-7">
            <iframe title="Map" src={maps.hotel} loading="lazy" className="h-full min-h-[520px] w-full border-0" />
          </div>
        </div>
      </section>
    </Page>
  );
}
