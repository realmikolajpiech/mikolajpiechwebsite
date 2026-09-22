import { useEffect, useState } from 'react';
import { getPortfolioScrollOffset } from '../utils/portfolioScroll';

export function useScrollOffset() {
  const [offset, setOffset] = useState(128);

  useEffect(() => {
    const update = () => setOffset(getPortfolioScrollOffset());

    const observer = new ResizeObserver(update);
    document.querySelectorAll('nav.fixed, nav[data-project-navigation]').forEach(nav => observer.observe(nav));
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return offset;
}
