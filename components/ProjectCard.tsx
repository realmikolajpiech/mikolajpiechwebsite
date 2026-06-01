import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Apple, Play } from 'lucide-react';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const StatusBadge = ({ status }: { status: string }) => {
  const isSold = status.toLowerCase() === 'sold';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 ${
        isSold
          ? 'bg-ink text-off-white dark:bg-stone-100 dark:text-ink shadow-sm'
          : 'bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-600'
      }`}
    >
      {status}
    </span>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isPrimary = project.isPrimary;
  const isSplit = project.layout === 'split';

      if (isSplit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative flex flex-col md:flex-row w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500 md:min-h-[500px]"
      >
        {/* Image */}
        <div className="relative w-full md:w-[45%] md:order-2 aspect-[16/10] sm:aspect-[5/4] md:aspect-auto md:min-h-[500px] bg-[#F5F5F7] dark:bg-stone-950/50 overflow-hidden shrink-0">
           <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <div className={`relative overflow-hidden shadow-md bg-white dark:bg-stone-900 ${
                project.imageFit === 'contain'
                  ? 'w-full max-w-[min(100%,22rem)] aspect-[16/10] rounded-xl sm:rounded-[1.2rem]'
                  : 'h-[min(100%,20rem)] sm:h-[min(100%,24rem)] w-auto aspect-[9/19] rounded-[1.25rem] sm:rounded-[1.2rem]'
              }`}>
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
                    alt={`${project.name} preview`} 
                    className={`w-full h-full ${project.imageFit === 'contain' ? 'object-contain p-3 sm:p-4' : 'object-cover'}`}
                  />
                )}
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between w-full md:w-[55%] md:order-1 p-5 sm:p-6 md:p-8 relative bg-white dark:bg-transparent z-10">
          <div>
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              {project.icon && (
                <img 
                  src={project.icon} 
                  alt={`${project.name} icon`} 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] shadow-md object-cover bg-white dark:bg-stone-800 shrink-0"
                />
              )}
              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-serif text-ink dark:text-stone-50">{project.name}</h3>
                  {project.status && <StatusBadge status={project.status} />}
                </div>
                <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 font-serif italic leading-snug">{project.tagline}</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed mb-5 sm:mb-6">{project.description}</p>
            
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50/50 dark:bg-stone-800/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {(project.appStoreLink || project.playStoreLink || (project.link && project.linkText)) && (
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 pt-5 border-t border-stone-100 dark:border-stone-700/50">
              {project.link && project.linkText && (
                <Button href={project.link} external className="!py-2.5 !px-4 !text-xs tracking-wide w-full sm:w-auto justify-center">
                  {project.linkText}
                </Button>
              )}
              {project.appStoreLink && (
                <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700/60 bg-white/80 dark:bg-stone-800/40 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors flex-1 sm:flex-none min-w-[calc(50%-0.25rem)] sm:min-w-0">
                  <Apple size={14} strokeWidth={1.75} /> 
                  App Store
                </a>
              )}
              {project.playStoreLink && (
                <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700/60 bg-white/80 dark:bg-stone-800/40 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors flex-1 sm:flex-none min-w-[calc(50%-0.25rem)] sm:min-w-0">
                  <Play size={14} strokeWidth={1.75} /> 
                  Play Store
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative flex flex-col ${isPrimary ? 'md:col-span-2' : ''} w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500`}
    >
      {/* Background/Image Area */}
      <div className={`relative w-full overflow-hidden ${isPrimary ? 'aspect-[4/3] sm:h-96 sm:aspect-auto' : 'aspect-[4/3] sm:aspect-[16/10]'} bg-[#F5F5F7] dark:bg-stone-950/50 shrink-0`}>
        {project.icon ? (
          <div className="w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12 relative overflow-hidden">
             <div className="relative z-10 shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out">
                <img 
                  src={project.icon} 
                  alt={`${project.name} icon`} 
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[22%] shadow-2xl object-cover bg-white dark:bg-stone-900"
                />
             </div>
             
             <div className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 h-[78%] sm:h-[85%] w-auto aspect-[9/19] bg-white dark:bg-stone-900 rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border-[3px] sm:border-[4px] border-white dark:border-stone-900 overflow-hidden transform rotate-[-3deg] group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
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
          <div className="absolute top-5 right-5 z-20">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col justify-between flex-grow p-5 sm:p-8 md:px-10 md:pt-10 md:pb-6 relative bg-white dark:bg-transparent">
        <div>
          <div className={`flex flex-col gap-3 sm:gap-4 ${isPrimary ? 'md:flex-row md:justify-between md:items-center' : ''} mb-3`}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="text-2xl sm:text-3xl font-serif text-ink dark:text-stone-50">{project.name}</h3>
              {project.status && !project.icon && <StatusBadge status={project.status} />}
            </div>
            {project.linkText ? (
              <Button 
                href={project.link} 
                external 
                className="!py-2.5 !px-5 !text-xs tracking-wide w-full sm:w-auto text-center justify-center shrink-0"
              >
                {project.linkText}
              </Button>
            ) : project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="self-start p-2 -ml-2 rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-300 dark:text-stone-600 hover:text-ink dark:hover:text-stone-50 transition-colors">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
          <p className="text-base sm:text-lg font-medium text-stone-800 dark:text-stone-200 mb-3 sm:mb-4 font-serif italic">{project.tagline}</p>
          <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed mb-5 sm:mb-8">{project.description}</p>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50/50 dark:bg-stone-800/50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {(project.appStoreLink || project.playStoreLink) && (
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-100 dark:border-stone-700/50">
            {project.appStoreLink && (
              <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700/60 bg-white/80 dark:bg-stone-800/40 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors flex-1 sm:flex-none min-w-[calc(50%-0.25rem)] sm:min-w-0">
                <Apple size={16} strokeWidth={1.75} /> 
                App Store
              </a>
            )}
            {project.playStoreLink && (
              <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700/60 bg-white/80 dark:bg-stone-800/40 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors flex-1 sm:flex-none min-w-[calc(50%-0.25rem)] sm:min-w-0">
                <Play size={16} strokeWidth={1.75} /> 
                Play Store
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
