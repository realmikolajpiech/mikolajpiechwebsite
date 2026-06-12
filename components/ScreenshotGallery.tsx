import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

const lightboxImageStyles: Record<NonNullable<ProjectScreenshot['variant']>, string> = {
  phone: 'max-h-[88dvh] max-w-[min(92vw,22rem)] rounded-[2rem]',
  desktop: 'max-h-[78dvh] max-w-[min(96vw,40rem)] rounded-[1rem]',
  wide: 'max-h-[72dvh] max-w-[min(96vw,36rem)] rounded-[1.25rem]',
};

const hoverSpring = { type: 'spring' as const, stiffness: 260, damping: 22, mass: 0.85 };
const lightboxSlideTransition = { type: 'tween' as const, duration: 0.34, ease: [0.16, 1, 0.3, 1] };
const MOBILE_QUERY = '(max-width: 767px)';

function getDesktopTrackWidth(element: HTMLElement) {
  const left = element.getBoundingClientRect().left;
  return Math.max(0, document.documentElement.clientWidth - left);
}

const lightboxSlideVariants = {
  enter: (direction: number) => ({
    x: `${direction * 100}%`,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: `${direction * -100}%`,
    opacity: 0,
  }),
};

function isIconShot(shot: ProjectScreenshot) {
  return (
    shot.caption?.toLowerCase().includes('icon') ||
    shot.caption?.toLowerCase().includes('brand') ||
    shot.alt?.toLowerCase().includes('icon') ||
    shot.alt?.toLowerCase().includes('brand')
  );
}

function ScreenshotFrame({
  shot,
  variant,
  iconShot,
}: {
  shot: ProjectScreenshot;
  variant: NonNullable<ProjectScreenshot['variant']>;
  iconShot: boolean;
}) {
  return (
    <>
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
    </>
  );
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots, projectName }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState(1);
  const [trackWidth, setTrackWidth] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const hasOverflow = maxScroll > 4;

    setCanScrollLeft(hasOverflow && el.scrollLeft > 4);
    setCanScrollRight(hasOverflow && el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);
    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  useLayoutEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const applyTrackWidth = () => {
      if (isMobile) {
        scroll.style.width = '';
        setTrackWidth(null);
        requestAnimationFrame(updateScrollState);
        return;
      }

      const width = getDesktopTrackWidth(scroll);
      scroll.style.width = `${width}px`;
      setTrackWidth(width);
      requestAnimationFrame(updateScrollState);
    };

    applyTrackWidth();
    window.addEventListener('resize', applyTrackWidth, { passive: true });
    window.addEventListener('scroll', applyTrackWidth, { passive: true });

    const resizeObserver = new ResizeObserver(applyTrackWidth);
    resizeObserver.observe(scroll);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    return () => {
      window.removeEventListener('resize', applyTrackWidth);
      window.removeEventListener('scroll', applyTrackWidth);
      resizeObserver.disconnect();
      scroll.style.width = '';
    };
  }, [screenshots.length, isMobile, updateScrollState]);

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

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setSlideDirection(-1);
        setActiveIndex((index) => (index !== null && index > 0 ? index - 1 : index));
      }
      if (event.key === 'ArrowRight') {
        setSlideDirection(1);
        setActiveIndex((index) =>
          index !== null && index < screenshots.length - 1 ? index + 1 : index,
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, screenshots.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    if (!isMobile) return;
    setSlideDirection(1);
    setActiveIndex(index);
  };

  const stepLightbox = (direction: 'prev' | 'next') => {
    setSlideDirection(direction === 'next' ? 1 : -1);
    setActiveIndex((index) => {
      if (index === null) return index;
      if (direction === 'prev') return Math.max(0, index - 1);
      return Math.min(screenshots.length - 1, index + 1);
    });
  };

  if (screenshots.length === 0) return null;

  const showControls = screenshots.length > 1;
  const activeShot = activeIndex !== null ? screenshots[activeIndex] : null;
  const activeVariant = activeShot?.variant ?? 'phone';
  const activeIconShot = activeShot ? isIconShot(activeShot) : false;

  return (
    <>
      <div
        ref={wrapperRef}
        className={`relative min-w-0 overflow-visible ${
          isMobile ? 'w-[100vw] max-w-[100vw] ml-[calc(50%-50vw)]' : ''
        }`}
      >
        {showControls && !isMobile && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll screenshots left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-800/95 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {showControls && !isMobile && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll screenshots right"
            className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-800/95 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
            style={
              trackWidth !== null
                ? { left: Math.max(0, trackWidth - 44) }
                : { right: '0.5rem' }
            }
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div
          ref={scrollRef}
          className={`flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-proximity pb-1 scrollbar-hide ${
            isMobile ? 'py-4 -my-2 w-full' : 'py-8 sm:py-10 -my-6 sm:-my-8'
          }`}
          style={{
            width: !isMobile && trackWidth !== null ? `${trackWidth}px` : undefined,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
            {screenshots.map((shot, index) => {
              const variant = shot.variant ?? 'phone';
              const iconShot = isIconShot(shot);
              const isFirst = index === 0;
              const isLast = index === screenshots.length - 1;
              const transformOrigin = isFirst
                ? 'left center'
                : isLast
                  ? 'right center'
                  : 'center center';
              const frameProps = {
                className: `relative overflow-hidden bg-[#F5F5F7] dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-700/50 ${
                  isMobile ? 'cursor-pointer touch-manipulation active:scale-[0.98] p-0 text-left' : 'cursor-default'
                } ${frameStyles[variant]}`,
                style: {
                  transformOrigin,
                  boxShadow: '0 8px 30px -12px rgba(0,0,0,0.12)',
                } as const,
                whileHover: isMobile
                  ? undefined
                  : {
                      scale: 1.14,
                      zIndex: 40,
                      boxShadow: '0 32px 64px -18px rgba(0,0,0,0.28)',
                      borderColor: 'rgba(168,162,158,0.55)',
                    },
                transition: hoverSpring,
              };

              return (
                <figure
                  key={`${shot.src}-${index}`}
                  className={`shrink-0 snap-start overflow-visible px-1 sm:px-1.5 ${isFirst ? 'pl-2 sm:pl-2.5' : ''} ${isLast ? 'pr-2 sm:pr-2.5' : ''}`}
                >
                  {isMobile ? (
                    <motion.button
                      type="button"
                      onClick={() => openLightbox(index)}
                      aria-label={`View ${shot.alt} fullscreen`}
                      {...frameProps}
                    >
                      <ScreenshotFrame shot={shot} variant={variant} iconShot={iconShot} />
                    </motion.button>
                  ) : (
                    <motion.div {...frameProps}>
                      <ScreenshotFrame shot={shot} variant={variant} iconShot={iconShot} />
                    </motion.div>
                  )}
                </figure>
              );
            })}
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeIndex !== null && activeShot && (
              <motion.div
                key="screenshot-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={`${projectName} screenshot viewer`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 px-4 py-6"
                onClick={() => setActiveIndex(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close screenshot viewer"
                  className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center backdrop-blur-sm"
                >
                  <X size={20} />
                </button>

                {showControls && activeIndex > 0 && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      stepLightbox('prev');
                    }}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center backdrop-blur-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {showControls && activeIndex < screenshots.length - 1 && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      stepLightbox('next');
                    }}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center backdrop-blur-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                <div className="relative w-full max-w-full h-[88dvh] overflow-hidden px-12 sm:px-14">
                  <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                    <motion.div
                      key={activeIndex}
                      custom={slideDirection}
                      variants={lightboxSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={lightboxSlideTransition}
                      onClick={(event) => event.stopPropagation()}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={activeShot.src}
                        alt={activeShot.alt}
                        loading="eager"
                        decoding="async"
                        className={`block w-auto h-auto object-contain bg-[#F5F5F7] border border-white/10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] ${lightboxImageStyles[activeVariant]} ${
                          activeIconShot ? 'p-8' : ''
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};
