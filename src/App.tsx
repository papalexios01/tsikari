import RouteMeta from '@/components/RouteMeta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Rooms from '@/pages/Rooms';
import GalleryPage from '@/pages/GalleryPage';
import HowToGetHere from '@/pages/HowToGetHere';
import Contact from '@/pages/Contact';
import Booking from '@/pages/Booking';
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
      <main id="main-content" tabIndex={-1} key={route}>{page}</main>
      <Footer />
    </>
  );
}
