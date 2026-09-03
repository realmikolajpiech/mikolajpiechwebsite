import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { applyThemeClass, getStoredTheme } from './utils/theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

applyThemeClass(getStoredTheme());

const app = (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// The shared server 404 is English. Unknown URLs mount their localized error page.
const prerenderedPath = rootElement.dataset.prerenderedPath;
if (rootElement.hasChildNodes() && prerenderedPath === window.location.pathname) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
