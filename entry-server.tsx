import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ThemeProvider } from './context/ThemeContext';

export { getPageMeta } from './utils/seo';
export { getPortfolioProjects } from './data/projects';
export { getLocalizedPath } from './utils/localizedRoutes';

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  );
}
