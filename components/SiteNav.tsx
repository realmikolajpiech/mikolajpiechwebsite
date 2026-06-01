import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import site from '../content/site.json';

interface SiteNavProps {
  showPortfolioLink?: boolean;
}

export const SiteNav: React.FC<SiteNavProps> = ({ showPortfolioLink = true }) => {
  const { pathname } = useLocation();
  const isPortfolio = pathname === '/portfolio';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
      <Link
        to="/"
        className="font-serif italic text-lg sm:text-xl tracking-tight text-ink dark:text-stone-50 hover:opacity-80 transition-opacity truncate max-w-[55vw] sm:max-w-none"
      >
        Mikołaj Piech
      </Link>
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {showPortfolioLink && (
          <Link
            to="/portfolio"
            className={`inline-flex items-center px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-medium tracking-wide rounded-full border transition-all duration-300 ${
              isPortfolio
                ? 'border-ink dark:border-stone-100 text-ink dark:text-stone-50 bg-stone-100/50 dark:bg-stone-800/50'
                : 'border-stone-200 dark:border-stone-700 text-ink dark:text-stone-50 hover:border-stone-400 dark:hover:border-stone-500'
            }`}
          >
            {site.portfolio.title}
          </Link>
        )}
        <Button
          href="/#contact"
          variant="outline"
          className="!p-2.5 sm:!px-5 sm:!py-2 !text-xs tracking-wide sm:inline-flex"
          aria-label={site.common.get_in_touch}
        >
          <Mail size={16} strokeWidth={1.75} className="sm:hidden" />
          <span className="hidden sm:inline">{site.common.get_in_touch}</span>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};
