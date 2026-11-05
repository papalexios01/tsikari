import { lazy, Suspense } from 'react';
import RouteMeta from '@/components/RouteMeta';
import Localize from '@/components/Localize';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import { useRoute } from '@/lib/router';

const About = lazy(() => import('@/pages/About'));
const Rooms = lazy(() => import('@/pages/Rooms'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const HowToGetHere = lazy(() => import('@/pages/HowToGetHere'));
const Contact = lazy(() => import('@/pages/Contact'));
const Booking = lazy(() => import('@/pages/Booking'));

export default function App() {
  const { route, anchor } = useRoute();
  const page = {
    home: <Home />,
    about: <About />,
    rooms: <Rooms />,
    gallery: <GalleryPage />,
    'how-to-get-here': <HowToGetHere />,
    contact: <Contact />,
    booking: <Booking anchor={anchor} />,
  }[route];

  return (
    <>
      <RouteMeta route={route} />
      <a href="#main-content" className="skip-link" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      <Navbar route={route} />
      <main id="main-content" tabIndex={-1} key={route}>
        <Suspense fallback={<div className="ts-route-loading" role="status" aria-label="Loading">ARCHONTIKO TSIKARI</div>}>
          {page}
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <Localize />
    </>
  );
}
