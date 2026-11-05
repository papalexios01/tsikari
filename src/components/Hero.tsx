import { ArrowDown, ArrowUpRight } from 'lucide-react';
import AvailabilityBar from '@/components/AvailabilityBar';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Hero() {
  return (
    <section id="top" className="ge-hero" aria-labelledby="hero-title">
      <div className="ge-hero__stage">
        <Img photo={media.home.facade} priority sizes="100vw"
          alt="Archontiko Tsikari historic mansion on Varos village square, Lemnos"
          className="ge-hero__photo" />
        <div className="ge-hero__veil" aria-hidden="true" />
        <div className="ge-hero__inner">
          <div className="ge-hero__center">
            <div className="ge-hero__chapter" aria-hidden="true">
              <span>ESTABLISHED 1901</span><span className="ge-rule" /><span>VAROS · LEMNOS</span>
            </div>
            <p className="ge-hero__pretitle">AN INTIMATE HERITAGE RETREAT</p>
            <h1 id="hero-title" className="ge-hero__title"><span>Archontiko</span> <span>Tsikari</span></h1>
            <p className="ge-hero__subtitle">A century of stories. <em>A place to feel at home.</em></p>
          </div>
          <div className="ge-hero__reservation">
            <div className="ge-hero__booking-head">
              <span>YOUR STAY BEGINS HERE</span>
              <span>DIRECT ENQUIRY · PERSONALLY CONFIRMED</span>
            </div>
            <AvailabilityBar />
          </div>
          <div className="ge-hero__footer">
            <p>A restored 1901 mansion on the village square.<br />Five thoughtfully appointed studios, unmistakably Lemnos.</p>
            <a href={href('home','house')} className="ge-hero__discover">
              EXPLORE THE HOUSE <ArrowDown size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
            <a href={href('about')} className="ge-hero__story">
              OUR STORY <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
