import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
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
      <div className="overflow-hidden border-y border-sand-200 bg-sand-100 py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-12">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 font-serif text-2xl italic text-ink-700">
              {m}
              <span className="h-1.5 w-1.5 rounded-full bg-clay-500" />
            </span>
          ))}
        </div>
      </div>
      <Intro />
      <WhyChoose />
      <Amenities />
      <Island />
      <Gallery />
      <BookCta />
    </>
  );
}
