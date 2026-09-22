import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Progressive enhancement: prerendered content stays visible without JavaScript. */
export function MotionExperience() {
  const { pathname } = useLocation();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const animations = new Set<Animation>();
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reveal = (element: HTMLElement) => {
      if (preference.matches) return;
      const animation = element.animate([
        { opacity: 0, translate: '0 24px' },
        { opacity: 1, translate: '0 0' },
      ], {
        duration: 800,
        delay: Number(element.dataset.reveal || 0),
        easing: 'cubic-bezier(.16,1,.3,1)',
        fill: 'backwards',
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(element => observer.observe(element));

    let frame = 0;
    let current: HTMLElement | null = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      current?.style.removeProperty('--pointer-x');
      current?.style.removeProperty('--pointer-y');
      current = null;
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const surface = (event.target as Element).closest<HTMLElement>('[data-spotlight]');
      if (surface !== current) reset();
      if (!surface) return;
      current = surface;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = surface.getBoundingClientRect();
        surface.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        surface.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      });
    };
    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
        reset();
      }
    };
    preference.addEventListener('change', stopMotion);
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      reset();
      preference.removeEventListener('change', stopMotion);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
    };
  }, [pathname]);
  return null;
}
