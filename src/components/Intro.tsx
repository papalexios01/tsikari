import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Intro() {
  return (
    <section id="house" className="ge-intro">
      <div className="ge-container">
        <div className="ge-intro__heading">
          <p className="ge-eyebrow"><span className="ge-section-index">01</span> THE HOUSE</p>
          <h2>Not just a place to stay.<br /><em>A place to belong.</em></h2>
          <p className="ge-intro__standfirst">In the heart of a quiet Lemnos village, a family home opens its doors to a more meaningful way of travelling.</p>
        </div>
        <div className="ge-intro__grid">
          <div className="ge-intro__photomain">
            <Img photo={media.home.exterior} sizes="(min-width: 960px) 50vw, 100vw"
              alt="Archontiko Tsikari mansion and village square" />
            <span className="ge-photo-caption">01 / THE MANSION · VAROS SQUARE</span>
          </div>
          <div className="ge-intro__story">
            <span className="ge-intro__year" aria-hidden="true">1901</span>
            <div className="ge-intro__details">
              <p className="ge-eyebrow">ROOTED IN HISTORY</p>
              <h3>A house with<br /><em>a soul.</em></h3>
              <p>Built in 1901 and carefully restored, Archontiko Tsikari is a peaceful, five-studio retreat overlooking the historic stone fountain of Varos.</p>
              <p>Original character, thoughtful comforts and personal hospitality come together in the warm surroundings of a family-run home.</p>
              <a href={href('about')} className="ge-textlink">EXPLORE OUR STORY <ArrowUpRight size={18} strokeWidth={1.3} /></a>
            </div>
            <div className="ge-intro__detailphoto">
              <Img photo={media.entrance[3]} sizes="(min-width: 960px) 35vw, 80vw" alt="Historic details of Archontiko Tsikari's entrance" />
            </div>
          </div>
        </div>
        <div className="ge-figures" aria-label="Hotel facts">
          <div><strong>1901</strong><span>ESTABLISHED</span></div>
          <div><strong>05</strong><span>PRIVATE STUDIOS</span></div>
          <div><strong>02</strong><span>ROOM CONFIGURATIONS</span></div>
          <div><strong>01</strong><span>ISLAND TO EXPLORE</span></div>
        </div>
      </div>
    </section>
  );
}
