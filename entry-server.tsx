import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DosoPrivacy from './pages/DosoPrivacy';
import DosoSupport from './pages/DosoSupport';
import NotFound from './pages/NotFound';

const pages = { Portfolio, PrivacyPolicy, DosoPrivacy, DosoSupport, NotFound };

export { getPageMeta } from './utils/seo';
export { getPortfolioProjects } from './data/projects';
export { getLocalizedPath } from './utils/localizedRoutes';

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes pages={pages} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}
