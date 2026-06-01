import { useEffect, useState } from 'react';
import { getPortfolioScrollOffset } from '../utils/portfolioScroll';

export function useScrollOffset() {
  const [offset, setOffset] = useState(128);

  useEffect(() => {
    const update = () => setOffset(getPortfolioScrollOffset());

    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return offset;
}
