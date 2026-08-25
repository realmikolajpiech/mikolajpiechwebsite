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
import twojaSiecLogo from '../assets/twojasiec/twojasiec-logo.jpeg';
import twojaSiecFeed from '../assets/twojasiec/twojasiec-feed.jpeg';
import twojaSiecEventDetails from '../assets/twojasiec/twojasiec-event-details.jpeg';
import twojaSiecEvents from '../assets/twojasiec/twojasiec-events.jpeg';
import twojaSiecAlerts from '../assets/twojasiec/twojasiec-alerts.jpeg';
import justMineHome from '../assets/justmine/justmine-home.jpg';
import justMineExamples from '../assets/justmine/justmine-examples.jpg';
import justMineHowItWorks from '../assets/justmine/justmine-how-it-works.jpg';
import justMineStep4 from '../assets/justmine/justmine-create-step-4.jpg';
import justMinePricing from '../assets/justmine/justmine-pricing.jpg';
import justMineLogo from '../assets/justmine/justmine-logo.png';
import safeLabsLogo from '../assets/safelabs/safelabs-logo.png';
import safeLabsHome from '../assets/safelabs/safelabs-home.jpg';
import safeLabsPasswordCheck from '../assets/safelabs/safelabs-password-check.jpg';
import safeLabsEbook from '../assets/safelabs/safelabs-ebook.jpg';
import dragonLogo from '../assets/dragon/dragon-logo.png';
import dragonHome from '../assets/dragon/dragon-home.jpg';
import dragonClasses from '../assets/dragon/dragon-classes.jpg';
import dragonSignup from '../assets/dragon/dragon-signup.jpg';
// import platoicLogo from '../assets/platoic-logo.png';

export const SHOW_OMNI = false;
export const SHOW_PLATOIC = false;
const PORTFOLIO_ONLY_PROJECT_IDS = new Set(['dragon']);

function buildAllProjects(language: Language): Project[] {
  const isPl = language === 'pl';
  const site = (isPl ? sitePl : siteEn) as typeof siteEn;
  const tr = (english: string, polish: string) => isPl ? polish : english;

  return [
  {
    id: 'justmine',
    name: 'Just Mine',
    tagline: site.projects.justmine.tagline,
    description: site.projects.justmine.description,
    tags: isPl ? ['Dzieci', 'Personalizacja', 'Internet', 'AI'] : ['Kids', 'Personalization', 'Web', 'AI'],
    platform: tr('Web app', 'Aplikacja internetowa'),
    category: tr('Personalized Publishing', 'Książki personalizowane'),
    scope: tr('Design to launch', 'Od projektu po wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://getjustmine.com',
    linkText: site.projects.justmine.link_text,
    icon: justMineLogo,
    iconStyle: 'wordmark',
    image: justMineHome,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: justMineHome, alt: tr('Just Mine website home page', 'Strona główna Just Mine'), variant: 'desktop' },
      { src: justMineExamples, alt: tr('Just Mine story types and use cases', 'Rodzaje historii i zastosowania Just Mine'), variant: 'desktop' },
      { src: justMineHowItWorks, alt: tr('How creating a personalized Just Mine book works', 'Jak działa tworzenie spersonalizowanej książki Just Mine'), variant: 'desktop' },
      { src: justMineStep4, alt: tr('Just Mine book creator — personalized story ideas', 'Kreator książki Just Mine — spersonalizowane pomysły na historie'), variant: 'desktop' },
      { src: justMinePricing, alt: tr('Just Mine formats and pricing', 'Formaty i ceny książek Just Mine'), variant: 'desktop' },
    ],
  },
  {
    id: 'safelabs',
    name: 'Safe Labs',
    tagline: site.projects.safelabs.tagline,
    description: site.projects.safelabs.description,
    tags: isPl ? ['Strona', 'Edukacja', 'Cyberbezpieczeństwo'] : ['Website', 'Education', 'Cybersecurity'],
    platform: tr('Website', 'Strona internetowa'),
    category: tr('Cybersecurity', 'Cyberbezpieczeństwo'),
    scope: tr('Design & development', 'Projekt i wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://safelabs.pl/',
    linkText: site.projects.safelabs.link_text,
    icon: safeLabsLogo,
    image: safeLabsHome,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: safeLabsHome, alt: tr('Safe Labs cybersecurity workshops website', 'Strona warsztatów Safe Labs z cyberbezpieczeństwa'), variant: 'desktop', fit: 'contain' },
      { src: safeLabsPasswordCheck, alt: tr('Safe Labs password strength audit tool', 'Narzędzie Safe Labs do audytu siły hasła'), variant: 'desktop' },
      { src: safeLabsEbook, alt: tr('Safe Labs cybersecurity e-book page', 'Strona e-booka Safe Labs o cyberbezpieczeństwie'), variant: 'desktop' },
    ],
  },
  {
    id: 'dragon',
    name: 'UKS Dragon Mokrzyska',
    tagline: site.projects.dragon.tagline,
    description: site.projects.dragon.description,
    tags: isPl ? ['Strona', 'Sport', 'Klub sportowy'] : ['Website', 'Sports', 'Sports Club'],
    platform: tr('Website', 'Strona internetowa'),
    category: tr('Sports & Community', 'Sport i społeczność'),
    scope: tr('Design & development', 'Projekt i wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://uksdragonmokrzyska.vercel.app/',
    linkText: site.projects.dragon.link_text,
    icon: dragonLogo,
    image: dragonHome,
    imageFit: 'cover',
    layout: 'web',
    screenshots: [
      { src: dragonHome, alt: tr('UKS Dragon Mokrzyska sports club website', 'Strona klubu sportowego UKS Dragon Mokrzyska'), variant: 'desktop' },
      { src: dragonClasses, alt: tr('UKS Dragon Mokrzyska training schedule', 'Harmonogram zajęć UKS Dragon Mokrzyska'), variant: 'desktop' },
      { src: dragonSignup, alt: tr('UKS Dragon Mokrzyska enrollment form', 'Formularz zapisów UKS Dragon Mokrzyska'), variant: 'desktop' },
    ],
  },
  {
    id: 'trailo',
    name: 'Trailo',
    tagline: site.projects.trailo.tagline,
    description: site.projects.trailo.description,
    tags: isPl ? ['Podróże', 'Internet', 'Aplikacja mobilna', 'AI'] : ['Travel', 'Web', 'Mobile App', 'AI'],
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
    id: 'twojasiec',
    name: 'Twoja Sieć',
    tagline: site.projects.twojasiec.tagline,
    description: site.projects.twojasiec.description,
    tags: isPl
      ? ['Lokalne informacje', 'Wydarzenia', 'Aplikacja mobilna']
      : ['Local News', 'Events', 'Mobile App'],
    platform: tr('Mobile app', 'Aplikacja mobilna'),
    category: tr('Local Information', 'Lokalne informacje'),
    scope: tr('Product design & development', 'Projekt produktu i aplikacji'),
    status: site.projects.twojasiec.status,
    icon: twojaSiecLogo,
    image: twojaSiecFeed,
    layout: 'split',
    screenshots: [
      { src: twojaSiecFeed, alt: tr('Twoja Sieć personalized local news feed', 'Spersonalizowany lokalny feed aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecEventDetails, alt: tr('Twoja Sieć local event details', 'Szczegóły lokalnego wydarzenia w aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecEvents, alt: tr('Twoja Sieć local events calendar', 'Kalendarz lokalnych wydarzeń w aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecAlerts, alt: tr('Twoja Sieć local safety and traffic alerts', 'Lokalne alerty bezpieczeństwa i drogowe w aplikacji Twoja Sieć'), variant: 'phone' },
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

function getVisibleProjects(language: Language): Project[] {
  return buildAllProjects(language).filter(
    (project) =>
      (SHOW_OMNI || project.id !== 'omni') &&
      (SHOW_PLATOIC || project.id !== 'platoic'),
  );
}

export function getProjects(language: Language = 'en'): Project[] {
  return getVisibleProjects(language).filter((project) => !PORTFOLIO_ONLY_PROJECT_IDS.has(project.id));
}

export function getPortfolioProjects(language: Language = 'en'): Project[] {
  return getVisibleProjects(language);
}

export function getProjectById(id: string, language: Language = 'en'): Project | undefined {
  return getPortfolioProjects(language).find((project) => project.id === id);
}
