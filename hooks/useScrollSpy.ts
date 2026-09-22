import { useEffect, useState } from 'react';
import { getMostVisibleProject } from '../utils/visibleProject';

const DEFAULT_OFFSET = 128;

export function useScrollSpy(ids: string[], offset = DEFAULT_OFFSET) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;
    const sections = ids.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });

    const update = () => {
      const bounds = sections.map(({ id, element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        return { id, top, bottom };
      });
      const current = getMostVisibleProject(bounds, Math.min(offset, window.innerHeight), window.innerHeight);
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const observer = new ResizeObserver(onScroll);
    sections.forEach(({ element }) => observer.observe(element));
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
