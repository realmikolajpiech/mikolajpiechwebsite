import type { MouseEvent } from 'react';
import { Link, useNavigate, type LinkProps } from 'react-router-dom';

let finishPendingTransition: (() => void) | undefined;

export function finishRouteTransition() {
  finishPendingTransition?.();
}

type Props = LinkProps & {
  to: string;
  /** Gives the link this view-transition name only while its own navigation animates. */
  transitionName?: string;
};

/**
 * A router link that animates the page change with the View Transitions API.
 * React Router's own `viewTransition` prop needs a data router; this site uses BrowserRouter.
 * Browsers without the API, modified clicks and reduced-motion users navigate normally.
 */
export function TransitionLink({ to, transitionName, onClick, ...props }: Props) {
  const navigate = useNavigate();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    const link = event.currentTarget;
    const previousName = link.style.viewTransitionName;
    if (transitionName) link.style.viewTransitionName = transitionName;

    const transition = document.startViewTransition(() => new Promise<void>(resolve => {
      finishRouteTransition();
      // React Router may commit later, especially when the destination loads a new bundle.
      const timeout = window.setTimeout(() => {
        transition.skipTransition();
        finish();
      }, 1000);
      const finish = () => {
        window.clearTimeout(timeout);
        finishPendingTransition = undefined;
        resolve();
      };
      finishPendingTransition = finish;
      navigate(to);
    }));

    const restoreName = () => {
      if (transitionName) link.style.viewTransitionName = previousName;
    };
    void transition.ready.then(restoreName, restoreName);
  };
  return <Link to={to} onClick={handleClick} {...props} />;
}
