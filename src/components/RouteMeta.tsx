import { useEffect } from 'react';
import type { Route } from '@/lib/router';

const descriptions: Record<Route, { title: string; description: string }> = {
  home: {
    title: 'Archontiko Tsikari | Historic Boutique Stay in Varos, Lemnos',
    description: 'Stay in a restored 1901 mansion on Varos village square in Lemnos. Five peaceful studios with COCO-MAT beds, private kitchenettes and personal hospitality.',
  },
  about: {
    title: 'Our Story | Archontiko Tsikari, Lemnos',
    description: 'Discover the history of the Tsikari family mansion, built in 1901, and the warm hospitality of our five-studio guesthouse in Varos, Lemnos.',
  },
  rooms: {
    title: 'Studios & Accommodation | Archontiko Tsikari',
    description: 'Explore two types of studios for two to four guests at Archontiko Tsikari, with fully equipped kitchenettes and COCO-MAT bedding.',
  },
  gallery: {
    title: 'Photo Gallery | Archontiko Tsikari, Lemnos',
    description: 'Browse original photographs of Archontiko Tsikari, its guest studios, historic details and surroundings on Lemnos island.',
  },
  'how-to-get-here': {
    title: 'How to Get Here | Archontiko Tsikari, Varos',
    description: 'Travel directions to Archontiko Tsikari in Varos, Lemnos, by ferry or plane, with maps and convenient routes from Myrina port and the airport.',
  },
  contact: {
    title: 'Contact Archontiko Tsikari | Lemnos, Greece',
    description: 'Contact Archontiko Tsikari in Varos, Lemnos, for questions about rooms, directions and a personal stay enquiry.',
  },
  booking: {
    title: 'Request Availability | Archontiko Tsikari',
    description: 'Enquire about dates, guests and studio availability at Archontiko Tsikari. We reply personally with available accommodation and rates.',
  },
};

export default function RouteMeta({ route }: { route: Route }) {
  useEffect(() => {
    const page = descriptions[route];
    document.title = page.title;
    const update = (selector: string, value: string) => {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = value;
    };
    update('meta[name="description"]', page.description);
    update('meta[property="og:title"]', page.title);
    update('meta[property="og:description"]', page.description);
    update('meta[name="twitter:title"]', page.title);
    update('meta[name="twitter:description"]', page.description);
  }, [route]);

  return null;
}
