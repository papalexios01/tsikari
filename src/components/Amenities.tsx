import { ArrowUpRight } from 'lucide-react';
import { amenities } from '@/data/content';
import { href } from '@/lib/router';

export default function Amenities() {
  const selected=amenities.slice(0,8);
  return (
    <section id="amenities" className="ge-amenities">
      <div className="ge-container">
        <div className="ge-amenities__heading">
          <div><p className="ge-eyebrow"><span className="ge-section-index">04</span> THOUGHTFUL COMFORTS</p>
            <h2>The little things <em>matter.</em></h2></div>
          <p>Simple luxuries and the comforts of home, for an easy, unhurried stay on Lemnos.</p>
        </div>
        <div className="ge-amenities__list">
          {selected.map(({icon:Icon,title,text},i)=><article className="ge-amenities__item" key={title}>
            <span className="ge-amenities__number">{String(i+1).padStart(2,'0')}</span>
            <Icon aria-hidden="true" size={27} strokeWidth={1.1}/>
            <h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
        <a href={href('rooms')} className="ge-textlink">EXPLORE THE STUDIOS <ArrowUpRight size={18} strokeWidth={1.3}/></a>
      </div>
    </section>
  );
}
