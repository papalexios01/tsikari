import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import RoomsShowcase from '@/components/RoomsShowcase';
import WhyChoose from '@/components/WhyChoose';
import Amenities from '@/components/Amenities';
import Island from '@/components/Island';
import Gallery from '@/components/Gallery';
import BookCta from '@/components/BookCta';

const marquee = ['Five studios', 'Est. 1901', 'Varos village square', 'COCO-MAT sleep', 'Heart of Lemnos', 'Family hospitality'];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="overflow-hidden bg-sand-50 py-10" aria-hidden>
        <div className="flex w-max animate-marquee gap-16">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-16 font-serif text-4xl text-ink-900 sm:text-5xl">
              <span className={i % 2 ? 'italic text-clay-600' : ''}>{m}</span>
              <span className="h-2 w-2 rotate-45 bg-clay-400" />
            </span>
          ))}
        </div>
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
