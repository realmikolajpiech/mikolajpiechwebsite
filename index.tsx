import './index.css';
import './pages/PersonalHome.css';
import { enhanceHome } from './home-client';
import { inject } from '@vercel/analytics';

const path = window.location.pathname;
const root = document.getElementById('root');
if ((path === '/' || path === '/pl') && root?.dataset.prerenderedPath === path) {
  enhanceHome();
  if (import.meta.env.PROD && !['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
    inject({ mode: 'production' });
  }
} else {
  void import('./entry-client');
}
