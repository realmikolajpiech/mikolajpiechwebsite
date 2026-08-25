import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import type { Language } from '../types';
import siteEn from '../content/site.json';
import sitePl from '../content/site.pl.json';
import { getLanguageFromPath } from '../utils/localizedRoutes';

type SiteContent = typeof siteEn;

type LanguageContextValue = {
  language: Language;
  site: SiteContent;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    site: (language === 'pl' ? sitePl : siteEn) as SiteContent,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
