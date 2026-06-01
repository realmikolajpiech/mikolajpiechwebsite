import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectScreenshot } from '../types';

interface ScreenshotGalleryProps {
  screenshots: ProjectScreenshot[];
  projectName: string;
}

const frameStyles: Record<NonNullable<ProjectScreenshot['variant']>, string> = {
  phone: 'w-[200px] sm:w-[236px] md:w-[264px] aspect-[9/19.5] rounded-[1.875rem] sm:rounded-[2.125rem]',
  desktop: 'w-[min(84vw,480px)] sm:w-[min(64vw,520px)] aspect-[16/10] rounded-[0.875rem] sm:rounded-[1rem]',
  wide: 'w-[min(80vw,460px)] sm:w-[min(60vw,500px)] aspect-[4/3] rounded-[1.25rem] sm:rounded-[1.5rem]',
};

const hoverSpring = { type: 'spring' as const, stiffness: 260, damping: 22, mass: 0.85 };

function isIconShot(shot: ProjectScreenshot) {
  return (
    shot.caption?.toLowerCase().includes('icon') ||
    shot.caption?.toLowerCase().includes('brand') ||
    shot.alt?.toLowerCase().includes('icon') ||
    shot.alt?.toLowerCase().includes('brand')
  );
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const hasOverflow = el.scrollWidth > wrapper.clientWidth + 4;

    setCanScrollLeft(hasOverflow && el.scrollLeft > 4);
    setCanScrollRight(hasOverflow && el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    const scheduleUpdate = () => requestAnimationFrame(updateScrollState);

    scheduleUpdate();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(el);
    resizeObserver.observe(wrapper);

    const images = el.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', scheduleUpdate);
    });

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      images.forEach((img) => img.removeEventListener('load', scheduleUpdate));
    };
  }, [screenshots.length, updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (screenshots.length === 0) return null;

  const showControls = screenshots.length > 1;

  return (
    <div ref={wrapperRef} className="relative w-full overflow-visible">
      <div className="relative w-[calc(100%+1.25rem)] -mr-5 sm:w-[calc(100%+1.5rem)] sm:-mr-6 md:w-[calc(100%+3rem)] md:-mr-12 lg:w-[calc(100%+3rem+(100vw-min(100vw,80rem))/2)] lg:-mr-[calc(3rem+(100vw-min(100vw,80rem))/2)]">
        {showControls && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll screenshots left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-800/95 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {showControls && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll screenshots right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-800/95 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-8 sm:py-10 -my-6 sm:-my-8 pl-5 sm:pl-6 pb-1 scrollbar-hide [clip-path:inset(-3rem_-1rem_-3rem_-3rem)]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {screenshots.map((shot, index) => {
            const variant = shot.variant ?? 'phone';
            const iconShot = isIconShot(shot);

            return (
              <motion.figure
                key={`${shot.src}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 snap-center overflow-visible px-1 sm:px-1.5"
              >
                <motion.div
                  className={`relative cursor-default overflow-hidden bg-[#F5F5F7] dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-700/50 ${frameStyles[variant]}`}
                  style={{
                    transformOrigin: 'center center',
                    boxShadow: '0 8px 30px -12px rgba(0,0,0,0.12)',
                  }}
                  whileHover={{
                    scale: 1.14,
                    zIndex: 40,
                    boxShadow: '0 32px 64px -18px rgba(0,0,0,0.28)',
                    borderColor: 'rgba(168,162,158,0.55)',
                  }}
                  transition={hoverSpring}
                >
                  <div className={`absolute inset-0 flex items-center justify-center ${iconShot ? 'p-8 sm:p-10' : ''}`}>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      className={`w-full h-full ${iconShot ? 'object-contain rounded-[22%]' : 'object-cover'}`}
                    />
                  </div>
                  {variant === 'phone' && (
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[1.875rem] sm:rounded-[2.125rem] pointer-events-none" />
                  )}
                </motion.div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </div>
  );
};
