import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import site from '../content/site.json';

export default function NotFound() {
  const year = new Date().getFullYear();
  const nf = site.not_found;

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 flex flex-col transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink dark:text-stone-50 hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-100 dark:bg-stone-800 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6 block">{nf.error_code}</span>

            <h1 className="text-6xl md:text-9xl font-serif text-ink dark:text-stone-50 mb-8 leading-none">
              {nf.title}
            </h1>

            <p className="text-xl text-stone-500 dark:text-stone-400 font-light mb-12 leading-relaxed max-w-lg mx-auto">
              {nf.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button href="/" variant="primary">
                {nf.button}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="py-8 px-6 text-center">
        <p className="text-sm text-stone-400 dark:text-stone-500 font-light">
          {site.common.all_rights_reserved.replace('{{year}}', String(year))}
        </p>
      </footer>
    </div>
  );
}
