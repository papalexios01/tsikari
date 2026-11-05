import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/Img';
import { features } from '@/data/content';
import { href } from '@/lib/router';

export default function WhyChoose() {
  const [active,setActive]=useState(0);
  const feature=features[active];
  return (
    <section id="discover" className="ge-experience">
      <div className="ge-container">
        <div className="ge-experience__head"><p className="ge-eyebrow"><span className="ge-section-index">03</span> THE EXPERIENCE</p>
          <h2>Every detail,<br/><em>considered.</em></h2>
          <p>A quietly thoughtful stay, shaped around the pleasures of island life.</p>
        </div>
        <div className="ge-experience__grid">
          <div className="ge-experience__photowrap"><Img photo={feature.image} sizes="(min-width: 960px) 50vw, 100vw" alt={feature.title} />
            <p>0{active+1} / 03 — {feature.tab.toUpperCase()}</p></div>
          <div className="ge-experience__content">
            <div className="ge-experience__tabs" aria-label="Discover the experience" role="group">
              {features.map((f,i)=><button type="button" aria-pressed={active===i} key={f.id} onClick={()=>setActive(i)} className={active===i?'is-active':''}>
                <span>0{i+1}</span>{f.tab}</button>)}
            </div>
            <div className="ge-experience__copy" key={feature.id}>
              <p className="ge-eyebrow">THE ART OF HOSPITALITY</p>
              <h3>{feature.title}</h3>
              <p>{feature.body[0]}</p>
              <ul>{feature.highlights.slice(0,4).map((h)=><li key={h}>{h}</li>)}</ul>
              <a href={href('booking')} className="ge-textlink">PLAN YOUR STAY <ArrowUpRight size={18} strokeWidth={1.3}/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
