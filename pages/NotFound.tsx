import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-stone-200 flex flex-col">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
      </nav>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-stone-400 mb-6 block">Error 404</span>
            
            <h1 className="text-6xl md:text-9xl font-serif text-ink mb-8 leading-none">
              Lost<span className="text-stone-300">?</span>
            </h1>
            
            <p className="text-xl text-stone-500 font-light mb-12 leading-relaxed max-w-lg mx-auto">
              The page you are looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button href="/" variant="primary">
                Return Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-sm text-stone-400 font-light">
          © {new Date().getFullYear()} Mikołaj Piech
        </p>
      </footer>
    </div>
  );
}
