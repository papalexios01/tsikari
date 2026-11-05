import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function BookCta({ eyebrow = 'AN INVITATION', title = 'Your next' }: { eyebrow?:string; title?:string }) {
  return (
    <section className="ge-finalcta" aria-labelledby="last-cta-heading">
      <Img photo={media.home.facade} sizes="100vw" alt="Archontiko Tsikari mansion in Varos" />
      <div className="ge-finalcta__veil" aria-hidden="true" />
      <div className="ge-finalcta__inner">
        <p className="ge-eyebrow">{eyebrow}</p>
        <h2 id="last-cta-heading">{title} <em>chapter starts here.</em></h2>
        <p>Come as a guest. Leave with a story.</p>
        <a href={href('booking')} className="ge-finalcta__button">PLAN YOUR STAY <ArrowUpRight size={18} strokeWidth={1.4} /></a>
        <span>VAROS · LEMNOS · GREECE</span>
      </div>
    </section>
  );
}
