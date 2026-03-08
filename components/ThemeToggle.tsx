import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' && <Sun className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
        {theme === 'dark' && <Moon className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
        {theme === 'system' && <Monitor className="w-5 h-5 text-stone-900 dark:text-stone-100" />}
      </motion.div>
    </button>
  );
}
