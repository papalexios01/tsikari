import { ArrowUpRight, Users } from 'lucide-react';
import Img from '@/components/Img';
import { rooms } from '@/data/content';
import { media } from '@/data/media';
import { href } from '@/lib/router';
import { getLocale } from '@/lib/locale';

const covers = [media.studio23[16], media.studio24[30]];

export default function RoomsShowcase() {
  const greek = getLocale() === 'el';
  return (
    <section id="studios" className="ge-rooms">
      <div className="ge-container">
        <div className="ge-rooms__intro">
          <div><p className="ge-eyebrow"><span className="ge-section-index">02</span> THE ACCOMMODATION</p>
            <h2>Rest is <em>an art.</em></h2></div>
          <div><p>Five comfortable studios, arranged in two configurations for couples and families, with COCO-MAT bedding and private kitchenettes.</p>
            <a className="ge-textlink" href={href('rooms')}>VIEW ALL ACCOMMODATION <ArrowUpRight size={18} strokeWidth={1.3}/></a></div>
        </div>
        <div className="ge-rooms__grid">
          {rooms.map((room,index) => (
            <article key={room.id} className={'ge-room ' + (index ? 'ge-room--offset' : '')}>
              <a href={href('rooms',room.id)} className="ge-room__picture" aria-label={'Explore ' + room.name}>
                <Img photo={covers[index]} sizes="(min-width: 1024px) 45vw, 92vw" alt={room.name + ' at Archontiko Tsikari'} />
                <span className="ge-room__index">0{index+1} / 02</span>
                <span className="ge-room__arrow"><ArrowUpRight size={23} strokeWidth={1.2}/></span>
              </a>
              <div className="ge-room__details">
                <div><p className="ge-eyebrow">{greek ? 'ΑΥΤΟΝΟΜΟ ΣΤΟΥΝΤΙΟ · ΕΩΣ ' : 'PRIVATE STUDIO · UP TO '}{room.guests}{greek ? ' ΑΤΟΜΑ' : ' GUESTS'}</p><h3>{index===0?'The Classic Studio':'The Family Studio'}</h3></div>
                <a href={href('booking',room.id)} className="ge-room__book">ENQUIRE <ArrowUpRight size={15} strokeWidth={1.3}/></a>
              </div>
              <p className="ge-room__summary">{room.summary}</p>
              <div className="ge-room__features"><span><Users size={15} strokeWidth={1.5}/> {greek ? 'ΕΩΣ ' : 'UP TO '}{room.guests}{greek ? ' ΑΤΟΜΑ' : ' GUESTS'}</span><span>COCO-MAT BEDDING</span><span>PRIVATE KITCHENETTE</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
