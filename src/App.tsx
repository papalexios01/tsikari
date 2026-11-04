import { MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Rooms from '@/pages/Rooms';
import GalleryPage from '@/pages/GalleryPage';
import HowToGetHere from '@/pages/HowToGetHere';
import Contact from '@/pages/Contact';
import Booking from '@/pages/Booking';
import { contact } from '@/data/content';
import { useRoute } from '@/lib/router';

export default function App() {
  const { route, anchor } = useRoute();

  const page = {
    home: <Home />,
    about: <About />,
    rooms: <Rooms />,
    gallery: <GalleryPage />,
    'how-to-get-here': <HowToGetHere />,
    contact: <Contact />,
    booking: <Booking room={anchor} />,
  }[route];

  return (
    <>
      <Navbar route={route} />
      <main key={route}>{page}</main>
      <Footer />
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success-500 text-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-110 hover:bg-success-600"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-ink-900 px-4 py-2 text-xs text-sand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          WhatsApp us
        </span>
      </a>
    </>
  );
}
