import { useState } from 'react';
import { ArrowUpRight, Expand } from 'lucide-react';
import Img from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import { homeGallery } from '@/data/content';
import { href } from '@/lib/router';

const picks=[homeGallery[0],homeGallery[2],homeGallery[5],homeGallery[4],homeGallery[6]];
export default function Gallery() {
  const [index,setIndex]=useState<number|null>(null);
  return (
    <section id="gallery" className="ge-gallery">
      <div className="ge-container">
        <div className="ge-gallery__head"><div><p className="ge-eyebrow"><span className="ge-section-index">06</span> A CLOSER LOOK</p>
          <h2>A sense <em>of place.</em></h2></div><a className="ge-textlink" href={href('gallery')}>THE FULL GALLERY <ArrowUpRight size={18} strokeWidth={1.3}/></a></div>
        <div className="ge-gallery__grid">
          {picks.map((item,i)=><button key={item.photo} type="button" onClick={()=>setIndex(i)}
            aria-label={'View photo: '+item.alt} className={'ge-gallery__image ge-gallery__image--'+(i+1)}>
            <Img photo={item.photo} alt={item.alt} sizes={i===0?'(min-width: 960px) 52vw, 100vw':'(min-width: 960px) 25vw, 50vw'} />
            <span><Expand size={18} strokeWidth={1.3}/></span></button>)}
        </div>
      </div>
      <Lightbox photos={picks} index={index} onChange={setIndex} />
    </section>
  );
}
