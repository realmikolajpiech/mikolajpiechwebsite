import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ThemeProvider } from './context/ThemeContext';

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  );
}
