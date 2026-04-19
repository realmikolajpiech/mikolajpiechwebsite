import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Apple, Play } from 'lucide-react';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isPrimary = project.isPrimary;
  const isSplit = project.layout === 'split';

      if (isSplit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative flex flex-col-reverse md:flex-row min-h-auto md:min-h-[500px] w-full overflow-hidden rounded-[2rem] bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500"
      >
        {project.status && (
          <div className="absolute top-5 left-5 px-3 py-1 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-full border border-stone-100 dark:border-stone-700 z-20 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 dark:text-stone-300">{project.status}</span>
          </div>
        )}
        {/* Left Side: Content */}
        <div className="flex flex-col justify-between w-full md:w-[55%] p-6 md:p-8 relative bg-white dark:bg-transparent z-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              {project.icon && (
                <img 
                  src={project.icon} 
                  alt={`${project.name} icon`} 
                  className="w-14 h-14 rounded-[22%] shadow-md object-cover bg-white dark:bg-stone-800"
                />
              )}
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-serif text-ink dark:text-stone-50">{project.name}</h3>
            </div>
            
            <p className="text-base font-medium text-stone-800 dark:text-stone-200 mb-3 font-serif italic">{project.tagline}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-6 line-clamp-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50/50 dark:bg-stone-800/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Store Links */}
          {(project.appStoreLink || project.playStoreLink) && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-stone-100 dark:border-stone-700/50">
              {project.appStoreLink && (
                <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-stone-600 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors group/link">
                  <Apple size={14} className="mb-0.5" /> 
                  <span>App Store</span>
                </a>
              )}
              {project.playStoreLink && (
                <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-stone-600 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors group/link">
                  <Play size={14} className="mb-0.5" /> 
                  <span>Play Store</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full md:w-[45%] h-64 md:h-auto bg-[#F5F5F7] dark:bg-stone-950/50 overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center py-8 px-4">
              <div className="relative h-full w-auto aspect-[9/19] rounded-[1.2rem] overflow-hidden shadow-md bg-white dark:bg-stone-900">
                {project.video ? (
                  <video 
                    src={project.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={`${project.name} screenshot`} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative flex flex-col ${isPrimary ? 'md:col-span-2 h-auto' : 'min-h-[450px]'} w-full overflow-hidden rounded-[2rem] bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500`}
    >
      {/* Background/Image Area */}
      <div className={`relative w-full overflow-hidden ${isPrimary ? 'h-96' : 'h-[55%]'} bg-[#F5F5F7] dark:bg-stone-950/50`}>
        {project.icon ? (
          /* Mobile App Layout: Icon Dominant + Vertical Screenshot */
          <div className="w-full h-full flex items-center justify-between px-8 md:px-12 relative overflow-hidden">
             
             {/* Icon - The 'Majority' Visual */}
             <div className="relative z-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out">
                <img 
                  src={project.icon} 
                  alt={`${project.name} icon`} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[22%] shadow-2xl object-cover bg-white dark:bg-stone-900"
                />
             </div>
             
             {/* Vertical Screenshot Frame - Positioned nicely to the right */}
             <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 h-[85%] w-auto aspect-[9/19] bg-white dark:bg-stone-900 rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border-[4px] border-white dark:border-stone-900 overflow-hidden transform rotate-[-3deg] group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                {project.video ? (
                  <video 
                    src={project.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={`${project.name} screenshot`} 
                    className="w-full h-full object-cover"
                  />
                )}
             </div>
          </div>
        ) : (
          /* Standard Layout */
          <>
            {project.video ? (
              <video 
                src={project.video} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
                 <span className="font-serif text-4xl text-stone-300 dark:text-stone-600 italic">{project.name}</span>
              </div>
            )}
          </>
        )}
        
        {project.status && (
          <div className="absolute top-5 left-5 px-3 py-1 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-full border border-stone-100 dark:border-stone-700 z-20 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 dark:text-stone-300">{project.status}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col justify-between flex-grow p-8 md:px-10 md:pt-10 md:pb-6 relative bg-white dark:bg-transparent">
        <div>
          <div className={`flex ${isPrimary ? 'flex-col md:flex-row justify-between gap-4 md:gap-6' : 'justify-between'} items-start md:items-center mb-3`}>
            <h3 className="text-3xl font-serif text-ink dark:text-stone-50">{project.name}</h3>
            {project.linkText ? (
              <Button 
                href={project.link} 
                external 
                className="!py-2 !px-5 !text-xs tracking-wide -mt-1 w-full md:w-auto text-center justify-center"
              >
                {project.linkText}
              </Button>
            ) : (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 -mr-2 -mt-2 rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-300 dark:text-stone-600 hover:text-ink dark:hover:text-stone-50 transition-colors">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </a>
            )}
          </div>
          <p className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4 font-serif italic">{project.tagline}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-md mb-8">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50/50 dark:bg-stone-800/50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Store Links if available */}
        {(project.appStoreLink || project.playStoreLink) && (
          <div className="flex gap-4 mt-8 pt-6 border-t border-stone-100 dark:border-stone-700/50">
            {project.appStoreLink && (
              <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold tracking-wide text-stone-600 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors group/link">
                <Apple size={16} className="mb-0.5" /> 
                <span>App Store</span>
              </a>
            )}
            {project.playStoreLink && (
              <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold tracking-wide text-stone-600 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors group/link">
                <Play size={16} className="mb-0.5" /> 
                <span>Play Store</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
