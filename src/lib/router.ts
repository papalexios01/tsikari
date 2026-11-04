import { useEffect, useState } from 'react';

export type Route = 'home' | 'about' | 'rooms' | 'gallery' | 'how-to-get-here' | 'contact' | 'booking';

const ROUTES: Route[] = ['home', 'about', 'rooms', 'gallery', 'how-to-get-here', 'contact', 'booking'];

const parse = (): { route: Route; anchor: string } => {
  const [path, anchor = ''] = window.location.hash.replace(/^#\/?/, '').split('#');
  const route = ROUTES.includes(path as Route) ? (path as Route) : 'home';
  return { route, anchor: path && !ROUTES.includes(path as Route) ? path : anchor };
};

export const href = (route: Route, anchor?: string) => `#/${route === 'home' ? '' : route}${anchor ? `#${anchor}` : ''}`;

export function useRoute() {
  const [state, setState] = useState(parse);

  useEffect(() => {
    const onChange = () => setState(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useEffect(() => {
    if (state.anchor) {
      requestAnimationFrame(() => document.getElementById(state.anchor)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [state]);

  return state;
}
