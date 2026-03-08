import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 flex flex-col transition-colors duration-300">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink dark:text-stone-50 hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-100 dark:bg-stone-800 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6 block">{t('not_found.error_code')}</span>
            
            <h1 className="text-6xl md:text-9xl font-serif text-ink dark:text-stone-50 mb-8 leading-none">
              {t('not_found.title')}
            </h1>
            
            <p className="text-xl text-stone-500 dark:text-stone-400 font-light mb-12 leading-relaxed max-w-lg mx-auto">
              {t('not_found.description')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button href="/" variant="primary">
                {t('not_found.button')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-sm text-stone-400 dark:text-stone-500 font-light">
          {t('common.all_rights_reserved', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
