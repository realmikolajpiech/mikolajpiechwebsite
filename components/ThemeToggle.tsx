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
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label={site.ui.toggle_theme}
    >
      <div
        className="transition-transform duration-300 motion-reduce:transition-none"
        style={{ transform: `rotate(${theme === 'dark' ? 180 : 0}deg)` }}
      >
        {theme === 'light' && <Sun className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
        {theme === 'dark' && <Moon className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
        {theme === 'system' && <Monitor className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
      </div>
    </button>
  );
}
