import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';
import { Button } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';
import omniImage from '../assets/omni.jpeg';
import curioImage from '../assets/curio.png';
import solveeImage from '../assets/solvee-listing.jpeg';
import subbyImage from '../assets/subby-listing.jpeg';
import { Link } from 'react-router-dom';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
  </svg>
);

// Data Configuration
const projects: Project[] = [
  {
    id: 'omnios',
    name: 'OmniOS',
    tagline: 'The OS that thinks like you.',
    description: 'A fully local, privacy-focused operating system where AI isn\'t just a feature—it\'s the core. Semantic understanding, proactive intelligence, and privacy by design. Join the future of personal computing.',
    link: 'https://omniaios.com',
    status: 'Coming Early 2026',
    tags: ['AI Native', 'OS', 'Privacy', 'Open Source'],
    isPrimary: true,
    image: omniImage,
    linkText: 'Learn more and join waitlist'
  },
  {
    id: 'curio',
    name: 'Curio',
    tagline: 'Master the art of knowing.',
    description: 'Master any topic with a personalized AI curriculum that curates the web\'s best resources into your perfect learning path. Constant AI guidance for your curiosity.',
    link: 'https://ailearningapp.vercel.app',
    status: 'Launching Soon',
    tags: ['EdTech', 'AI', 'Web Platform'],
    image: curioImage
  },
  {
    id: 'solvee',
    name: 'Solvee',
    tagline: 'AI Homework Helper',
    description: 'Helping over 25k+ students solve problems instantly. Scan, solve, and understand with detailed AI explanations. Available on iOS and Android.',
    link: 'https://apps.apple.com/pl/app/solvee-ai-homework-helper/id6754188493',
    tags: ['Mobile App', 'Education', 'AI'],
    appStoreLink: 'https://apps.apple.com/pl/app/solvee-ai-homework-helper/id6754188493',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.mikolajpiech.solvee',
    icon: 'https://play-lh.googleusercontent.com/pF3GMpXEu5E7BBxasZZWhxoR2om3Z5m3K-7u2zwgZ0w0-PXVLAeEya9rxbDRxDctG1s=w240-h480-rw',
    // Using a vertical math/homework related image
    image: solveeImage,
    layout: 'split'
  },
  {
    id: 'subby',
    name: 'Subby',
    tagline: 'Subscription Manager',
    description: 'Never pay for an unwanted subscription again. Track trials, manage expenses, and save money effortlessly.',
    link: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
    tags: ['FinTech', 'Utility', 'Mobile App'],
    appStoreLink: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.subby',
    icon: 'https://play-lh.googleusercontent.com/prc2RCfFpOXnnFKvRE92ty0cWv1or2Kaxd4-PjxJadEFjVFDrvxPKCEZlWZliU5M4DJl2vlV-niOvPLadCM4=w240-h480-rw',
    // Using a vertical clean interface/list image
    image: subbyImage,
    layout: 'split'
  }
];

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 text-stone-400 hover:text-ink hover:bg-stone-100 rounded-full transition-all duration-300 flex items-center justify-center"
  >
    {icon}
  </a>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-stone-200">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 transition-all duration-300">
        <span className="font-serif italic text-xl tracking-tight text-ink">Mikołaj Piech</span>
        <div className="flex gap-4">
          <Button href="#contact" variant="outline" className="!px-5 !py-2 !text-xs tracking-wide">
            Get in touch
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-light leading-[0.95] text-ink mb-6 tracking-tight">
                Builder.<br/>
                <span className="font-serif-italic text-stone-400">Founder.</span><br/>
                Minimalist.
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl space-y-6"
            >
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light">
                I'm <span className="text-ink font-medium">Mikołaj</span>, an app and web developer from Poland.
              </p>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light">
                I build tools that solve problems and make life easier - all while doing work I genuinely love. Currently pouring most of my energy into my biggest project yet: <a href="https://omniaios.com" target="_blank" rel="noopener noreferrer" className="text-ink hover:underline decoration-stone-300 underline-offset-4">OmniOS</a>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 pt-4 items-center"
            >
              <SocialIcon href="https://x.com/mikolajpiech" icon={<XLogo className="w-5 h-5" />} />
              <SocialIcon href="https://www.linkedin.com/in/mikolajpiech/" icon={<Linkedin size={20} />} />
              <SocialIcon href="https://github.com/realmikolajpiech" icon={<Github size={20} />} />
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] md:aspect-square relative overflow-hidden rounded-full md:rounded-[3rem] group">
              <img 
                src="https://pbs.twimg.com/profile_images/2007024280098205696/cEOCvzEr_400x400.jpg" 
                alt="Mikołaj Piech"
                className="w-full h-full object-cover group-hover:grayscale transition-all duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-full md:rounded-[3rem]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white border-t border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-stone-400 mb-6 block">Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif text-ink mb-10 leading-tight">
              "Simplicity is the <span className="font-serif-italic">ultimate</span> sophistication."
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed text-lg font-light">
              I believe in technology that feels human. No clutter, no dark patterns, no noise.
              Just clean, privacy-focused software that respects your attention and your data. 
              This is the foundation of OmniOS and everything I build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-4xl font-serif text-ink mb-3">Projects</h2>
            <p className="text-stone-500 font-light text-lg">Tools for a better digital life.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Connect/Footer */}
      <footer id="contact" className="bg-ink text-off-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif font-light mb-10 leading-[0.9]"
          >
            Let's build the <br/><span className="font-serif-italic text-stone-500">future</span>.
          </motion.h2>
          <p className="text-stone-400 text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Always excited to connect with fellow founders, builders, and tech enthusiasts.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button href="mailto:hello@mikolajpiech.com" variant="secondary" external>
              Email Me <Mail className="ml-2 w-4 h-4" />
            </Button>
            <Button href="https://www.linkedin.com/in/mikolajpiech/" variant="outline" className="text-off-white border-stone-700 hover:border-off-white hover:bg-stone-800" external>
              LinkedIn
            </Button>
            <Button href="https://www.x.com/mikolajpiech/" variant="outline" className="text-off-white border-stone-700 hover:border-off-white hover:bg-stone-800" external>
              <XLogo className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-32 pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Mikołaj Piech. All rights reserved.</p>
            <div className="flex gap-8 items-center">
              <a href="mailto:hello@mikolajpiech.com" className="hover:text-off-white transition-colors">hello@mikolajpiech.com</a>
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                 <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">LinkedIn</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to="/privacy-policy" className="hover:text-off-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
