import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/Img';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Island() {
  return (
    <section id="island" className="ge-island">
      <div className="ge-island__image"><Img photo={media.home.island} alt="Lemnos island landscape" sizes="100vw" /></div>
      <div className="ge-island__tint" aria-hidden="true"/>
      <div className="ge-container ge-island__inner">
        <p className="ge-eyebrow"><span className="ge-section-index">05</span> THE ISLAND</p>
        <div className="ge-island__body"><h2>Discover <em>Lemnos.</em></h2>
          <div><p>Ancient villages, windswept coastlines, golden beaches and authentic Aegean hospitality. Stay in Varos and explore the island at your own pace.</p>
            <a href={href('how-to-get-here')} className="ge-textlink">YOUR JOURNEY BEGINS HERE <ArrowUpRight size={19} strokeWidth={1.3}/></a></div></div>
        <span className="ge-island__coordinate">VAROS · NORTH AEGEAN · GREECE</span>
      </div>
    </section>
  );
}
