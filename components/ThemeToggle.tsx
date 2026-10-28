import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { site } = useLanguage();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      data-theme-toggle
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label={site.ui.toggle_theme}
    >
      <div
        className="transition-transform duration-300 motion-reduce:transition-none"
        style={{ transform: `rotate(${theme === 'dark' ? 180 : 0}deg)` }}
      >
        <Sun data-theme-icon="light" style={{ display: theme === 'light' ? 'block' : 'none' }} className="w-5 h-5 text-stone-900 dark:text-stone-100" />
        <Moon data-theme-icon="dark" style={{ display: theme === 'dark' ? 'block' : 'none' }} className="w-5 h-5 text-stone-900 dark:text-stone-100" />
        <Monitor data-theme-icon="system" style={{ display: theme === 'system' ? 'block' : 'none' }} className="w-5 h-5 text-stone-900 dark:text-stone-100" />
      </div>
    </button>
  );
}
