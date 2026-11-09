import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate, type LinkProps } from 'react-router-dom';

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
    if (transitionName) event.currentTarget.style.viewTransitionName = transitionName;
    document.startViewTransition(() => flushSync(() => navigate(to)));
  };
  return <Link to={to} onClick={handleClick} {...props} />;
}
