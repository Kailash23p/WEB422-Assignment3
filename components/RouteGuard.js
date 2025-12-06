import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { readToken } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

const PUBLIC_PATHS = ['/login', '/register', '/about', '/'];

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  const updateAtom = async () => {
    try {
      const list = await getFavourites();
      setFavouritesList(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Failed to update favourites atom:', error);
      setFavouritesList([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = readToken();
    if (token) {
      updateAtom();
    } else {
      setFavouritesList([]);
    }
    authCheck(router.pathname);

    const hideContent = () => setAuthorized(false);
    const handleRouteChange = (url) => authCheck(url);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const authCheck = (url) => {
    const path = url.split('?')[0];
    const token = readToken();

    if (!PUBLIC_PATHS.includes(path) && !token) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  };

  return authorized ? children : null;
}

export default RouteGuard;
