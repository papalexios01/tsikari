import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import RoomsShowcase from '@/components/RoomsShowcase';
import WhyChoose from '@/components/WhyChoose';
import Amenities from '@/components/Amenities';
import Island from '@/components/Island';
import Gallery from '@/components/Gallery';
import BookCta from '@/components/BookCta';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="ge-ticker" aria-label="Since 1901 · Lemnos · Greece">
        <span>AN AUTHENTIC ISLAND EXPERIENCE</span><span className="ge-ticker__star" aria-hidden="true">✳</span><span>VAROS, LEMNOS</span>
        <span className="ge-ticker__star" aria-hidden="true">✳</span><span>THE ART OF SLOW LIVING</span>
      </div>
      <Intro />
      <RoomsShowcase />
      <WhyChoose />
      <Amenities />
      <Island />
      <Gallery />
      <BookCta />
    </>
  );
}
