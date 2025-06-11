import { useState, useEffect } from 'react';
import useRecipe from './useRecipe';

export function useScrollDirection() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const { isFavoritesPage } = useRecipe();

  useEffect(() => {
    if (isFavoritesPage) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isFavoritesPage]);

  return { isAtTop };
}
