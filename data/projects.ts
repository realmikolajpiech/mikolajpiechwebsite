import { Language, Project } from '../types';
import siteEn from '../content/site.json';
import sitePl from '../content/site.pl.json';
import omniImage from '../assets/omni.jpeg';
import omniVideo from '../assets/omni-teaser.mp4';
import solvee1 from '../assets/solvee-sc/solvee1.webp';
import solvee2 from '../assets/solvee-sc/solvee2.webp';
import solvee3 from '../assets/solvee-sc/solvee3.webp';
import solvee4 from '../assets/solvee-sc/solvee4.webp';
import solveeLogo from '../assets/solvee-logo.png';
import subby1 from '../assets/subby-sc/subby1.png';
import subby2 from '../assets/subby-sc/subby2.png';
import subby3 from '../assets/subby-sc/subby3.png';
import subbyLogo from '../assets/subby-logo.png';
import doso1 from '../assets/doso-sc/doso1.png';
import doso2 from '../assets/doso-sc/doso2.png';
import doso3 from '../assets/doso-sc/doso3.png';
import doso4 from '../assets/doso-sc/doso4.png';
import doso5 from '../assets/doso-sc/doso5.png';
import dosoLogo from '../assets/doso-logo.png';
import trailoIcon from '../assets/trailo-icon.png';
import trailoMobile1 from '../assets/trailo-mobile-sc/trailo-mobile-1.png';
import trailoMobile2 from '../assets/trailo-mobile-sc/trailo-mobile-2.png';
import trailoMobile3 from '../assets/trailo-mobile-sc/trailo-mobile-3.png';
import trailoMobile4 from '../assets/trailo-mobile-sc/trailo-mobile-4.png';
import kiddumiHero from '../assets/kiddumi/hero-family-book.jpg';
import kiddumiFamily from '../assets/kiddumi/family-profile-collage.webp';
import kiddumiKeepsake from '../assets/kiddumi/hardcover-keepsake-mockup.webp';
import safeLabsLogo from '../assets/safelabs/safelabs-logo.png';
import safeLabsHome from '../assets/safelabs/safelabs-home.jpg';
// import platoicLogo from '../assets/platoic-logo.png';

export const SHOW_OMNI = false;
export const SHOW_PLATOIC = false;

function buildAllProjects(language: Language): Project[] {
  const isPl = language === 'pl';
  const site = (isPl ? sitePl : siteEn) as typeof siteEn;
  const tr = (english: string, polish: string) => isPl ? polish : english;

  return [
  {
    id: 'kiddumi',
    name: 'Kiddumi',
    tagline: site.projects.kiddumi.tagline,
    description: site.projects.kiddumi.description,
    tags: isPl ? ['Dzieci', 'Personalizacja', 'Web', 'AI'] : ['Kids', 'Personalization', 'Web', 'AI'],
    platform: 'Web',
    category: tr('Personalized Publishing', 'Książki personalizowane'),
    scope: tr('Full product · design to launch', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://childrenbooks-ten.vercel.app/',
    linkText: site.projects.kiddumi.link_text,
    image: kiddumiHero,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: kiddumiHero, alt: tr('A family reading a personalized Kiddumi storybook', 'Rodzina czytająca spersonalizowaną książkę Kiddumi'), variant: 'desktop' },
      { src: kiddumiFamily, alt: tr('Kiddumi family profile with a child, sibling, and pet', 'Profil rodziny Kiddumi z dzieckiem, rodzeństwem i zwierzęciem'), variant: 'wide' },
      { src: kiddumiKeepsake, alt: tr('Personalized Kiddumi hardcover book mockup', 'Wizualizacja spersonalizowanej książki Kiddumi w twardej oprawie'), variant: 'wide' },
    ],
  },
  {
    id: 'safelabs',
    name: 'Safe Labs',
    tagline: site.projects.safelabs.tagline,
    description: site.projects.safelabs.description,
    tags: isPl ? ['Strona', 'Edukacja', 'Cyberbezpieczeństwo'] : ['Website', 'Education', 'Cybersecurity'],
    platform: 'Web',
    category: tr('Education & Cybersecurity', 'Edukacja i cyberbezpieczeństwo'),
    scope: tr('Website · design and development', 'Strona internetowa · projekt i wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://safelabs.pl/',
    linkText: site.projects.safelabs.link_text,
    icon: safeLabsLogo,
    image: safeLabsHome,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: safeLabsHome, alt: tr('Safe Labs cybersecurity education website', 'Strona edukacyjna Safe Labs o cyberbezpieczeństwie'), variant: 'desktop' },
    ],
  },
  {
    id: 'trailo',
    name: 'Trailo',
    tagline: site.projects.trailo.tagline,
    description: site.projects.trailo.description,
    tags: isPl ? ['Podróże', 'Web', 'Aplikacja mobilna', 'AI'] : ['Travel', 'Web', 'Mobile App', 'AI'],
    platform: 'Web · iOS · Android',
    category: tr('AI Travel', 'Podróże z AI'),
    scope: tr('Full product · design to launch', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    operatingSystem: 'Web, iOS, Android',
    link: 'https://trailoapp.com',
    linkText: site.projects.trailo.link_text,
    appStoreLink: 'https://apps.apple.com/us/app/trailo-ai-trip-planner/id6767237924',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.trailo',
    icon: trailoIcon,
    image: trailoMobile1,
    layout: 'split',
    screenshots: [
      { src: trailoMobile1, alt: tr('Trailo mobile trip plan with map and itinerary', 'Mobilny plan podróży Trailo z mapą i harmonogramem'), variant: 'phone' },
      { src: trailoMobile2, alt: tr('Trailo mobile trip overview with flights', 'Podsumowanie podróży i lotów w Trailo'), variant: 'phone' },
      { src: trailoMobile3, alt: tr('Trailo mobile attraction tickets', 'Bilety do atrakcji w aplikacji Trailo'), variant: 'phone' },
      { src: trailoMobile4, alt: tr('Trailo mobile trip budget', 'Budżet podróży w aplikacji Trailo'), variant: 'phone' },
    ],
  },
  {
    id: 'subby',
    name: 'Subby',
    tagline: site.projects.subby.tagline,
    description: site.projects.subby.description,
    outcome: tr('Helps people track subscriptions and trials before they turn into unwanted charges.', 'Pomaga kontrolować subskrypcje i okresy próbne, zanim zmienią się w niechciane opłaty.'),
    tags: isPl ? ['FinTech', 'Finanse', 'Aplikacja mobilna'] : ['FinTech', 'Utility', 'Mobile App'],
    platform: 'iOS · Android',
    category: tr('Finance & Utility', 'Finanse osobiste'),
    scope: tr('Full product · design to deploy', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    appStoreLink: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.subby',
    icon: subbyLogo,
    image: subby1,
    layout: 'split',
    screenshots: [
      { src: subby1, alt: tr('Subby overview dashboard', 'Panel główny aplikacji Subby'), variant: 'phone' },
      { src: subby2, alt: tr('Subby subscriptions list', 'Lista subskrypcji w aplikacji Subby'), variant: 'phone' },
      { src: subby3, alt: tr('Subby spending analytics', 'Analiza wydatków w aplikacji Subby'), variant: 'phone' },
    ],
  },
  {
    id: 'doso',
    name: 'Doso',
    tagline: site.projects.doso.tagline,
    description: site.projects.doso.description,
    tags: isPl ? ['Zdrowie', 'Aplikacja mobilna', 'AI'] : ['Health', 'Mobile App', 'AI'],
    platform: 'iOS',
    category: tr('Health & Wellness', 'Zdrowie'),
    scope: tr('Full product · design to launch', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    appStoreLink: 'https://apps.apple.com/app/doso-pill-reminder-tracker/id6761341859',
    icon: dosoLogo,
    image: doso1,
    layout: 'split',
    screenshots: [
      { src: doso1, alt: tr('Doso home dashboard', 'Panel główny aplikacji Doso'), variant: 'phone' },
      { src: doso2, alt: tr('Doso lab results analysis', 'Analiza wyników badań w aplikacji Doso'), variant: 'phone' },
      { src: doso3, alt: tr('Doso medication interaction warning', 'Ostrzeżenie o interakcji leków w aplikacji Doso'), variant: 'phone' },
      { src: doso4, alt: tr('Doso voice medication input', 'Głosowe dodawanie leków w aplikacji Doso'), variant: 'phone' },
      { src: doso5, alt: tr('Doso profile management', 'Zarządzanie profilem w aplikacji Doso'), variant: 'phone' },
    ],
  },
  {
    id: 'solvee',
    name: 'Solvee',
    tagline: site.projects.solvee.tagline,
    description: site.projects.solvee.description,
    tags: isPl ? ['Aplikacja mobilna', 'Edukacja', 'AI'] : ['Mobile App', 'Education', 'AI'],
    platform: 'iOS · Android',
    category: tr('Education · AI', 'Edukacja · AI'),
    scope: tr('Built & sold · 25k+ downloads', 'Stworzenie i sprzedaż · 25k+ pobrań'),
    status: site.projects.solvee.status,
    icon: solveeLogo,
    image: solvee1,
    layout: 'split',
    screenshots: [
      { src: solvee1, alt: tr('Solvee camera scan for math exercises', 'Skanowanie zadania matematycznego aparatem w Solvee'), variant: 'phone' },
      { src: solvee2, alt: tr('Solvee step-by-step math solution', 'Rozwiązanie zadania krok po kroku w Solvee'), variant: 'phone' },
      { src: solvee3, alt: tr('Solvee AI tools home screen', 'Ekran główny narzędzi AI w Solvee'), variant: 'phone' },
      { src: solvee4, alt: tr('Solvee app screenshot', 'Zrzut ekranu aplikacji Solvee'), variant: 'phone' },
    ],
  },
  // {
  //   id: 'platoic',
  //   name: 'Platoic',
  //   tagline: site.projects.platoic.tagline,
  //   description: site.projects.platoic.description,
  //   tags: ['Education', 'AI', 'Web'],
  //   platform: 'Web',
  //   category: 'EdTech · AI',
  //   scope: 'Full product · in development',
  //   status: site.projects.platoic.status,
  //   icon: platoicLogo,
  //   image: platoicLogo,
  //   screenshots: [
  //     { src: platoicLogo, alt: 'Platoic learning platform brand', variant: 'wide', caption: 'Product identity' },
  //   ],
  // },
  {
    id: 'omni',
    name: 'Omni',
    tagline: site.projects.omni.tagline,
    description: site.projects.omni.description,
    outcome: tr('Desktop AI assistant that understands your files, email, and workflow.', 'Asystent AI na komputer, który rozumie Twoje pliki, pocztę i sposób pracy.'),
    link: 'https://heyomni.app',
    tags: isPl ? ['AI', 'Produktywność', 'Desktop'] : ['AI', 'Productivity', 'Desktop'],
    platform: 'macOS · Windows',
    category: tr('AI Productivity', 'Produktywność z AI'),
    scope: tr('Full product · early access', 'Kompleksowa realizacja · wczesny dostęp'),
    status: site.projects.omni.status,
    video: omniVideo,
    image: omniImage,
    linkText: site.projects.omni.link_text,
    screenshots: [
      { src: omniImage, alt: tr('Omni AI assistant interface', 'Interfejs asystenta AI Omni'), variant: 'desktop', caption: tr('AI that knows your computer', 'AI, które zna Twój komputer') },
    ],
  },
  ];
}

export function getProjects(language: Language = 'en'): Project[] {
  return buildAllProjects(language).filter(
    (project) =>
      (SHOW_OMNI || project.id !== 'omni') &&
      (SHOW_PLATOIC || project.id !== 'platoic'),
  );
}

export function getPortfolioProjects(language: Language = 'en'): Project[] {
  return getProjects(language);
}

export function getProjectById(id: string, language: Language = 'en'): Project | undefined {
  return getProjects(language).find((project) => project.id === id);
}
