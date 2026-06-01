import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { applyThemeClass, getStoredTheme, markAppReady } from './utils/theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

applyThemeClass(getStoredTheme());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    markAppReady();
  });
});
