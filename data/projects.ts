import { Project } from '../types';
import site from '../content/site.json';
import omniImage from '../assets/omni.jpeg';
import omniVideo from '../assets/omni-teaser.mp4';
import solveeImage from '../assets/solvee-listing.jpeg';
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
// import platoicLogo from '../assets/platoic-logo.png';

export const SHOW_OMNI = false;
export const SHOW_PLATOIC = false;

const allProjects: Project[] = [
  {
    id: 'trailo',
    name: 'Trailo',
    tagline: site.projects.trailo.tagline,
    description: site.projects.trailo.description,
    link: 'https://trailoapp.com',
    tags: ['Travel', 'Web', 'Mobile App', 'AI'],
    platform: 'Web · iOS & Android soon',
    category: 'AI Travel',
    scope: 'Full product · design to launch',
    operatingSystem: 'Web',
    icon: trailoIcon,
    image: trailoMobile1,
    linkText: site.projects.trailo.link_text,
    layout: 'split',
    screenshots: [
      { src: trailoMobile1, alt: 'Trailo mobile trip plan with map and itinerary', variant: 'phone' },
      { src: trailoMobile2, alt: 'Trailo mobile trip overview with flights', variant: 'phone' },
      { src: trailoMobile3, alt: 'Trailo mobile attraction tickets', variant: 'phone' },
      { src: trailoMobile4, alt: 'Trailo mobile trip budget', variant: 'phone' },
    ],
  },
  {
    id: 'subby',
    name: 'Subby',
    tagline: site.projects.subby.tagline,
    description: site.projects.subby.description,
    outcome: 'Helps people track subscriptions and trials before they turn into unwanted charges.',
    tags: ['FinTech', 'Utility', 'Mobile App'],
    platform: 'iOS · Android',
    category: 'Finance & Utility',
    scope: 'Full product · design to deploy',
    appStoreLink: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.subby',
    icon: subbyLogo,
    image: subby1,
    layout: 'split',
    screenshots: [
      { src: subby1, alt: 'Subby overview dashboard', variant: 'phone' },
      { src: subby2, alt: 'Subby subscriptions list', variant: 'phone' },
      { src: subby3, alt: 'Subby spending analytics', variant: 'phone' },
    ],
  },
  {
    id: 'doso',
    name: 'Doso',
    tagline: site.projects.doso.tagline,
    description: site.projects.doso.description,
    tags: ['Health', 'Mobile App', 'AI'],
    platform: 'iOS',
    category: 'Health & Wellness',
    scope: 'Full product · design to launch',
    appStoreLink: 'https://apps.apple.com/app/doso-pill-reminder-tracker/id6761341859',
    icon: dosoLogo,
    image: doso1,
    layout: 'split',
    screenshots: [
      { src: doso1, alt: 'Doso home dashboard', variant: 'phone' },
      { src: doso2, alt: 'Doso lab results analysis', variant: 'phone' },
      { src: doso3, alt: 'Doso medication interaction warning', variant: 'phone' },
      { src: doso4, alt: 'Doso voice medication input', variant: 'phone' },
      { src: doso5, alt: 'Doso profile management', variant: 'phone' },
    ],
  },
  {
    id: 'solvee',
    name: 'Solvee',
    tagline: site.projects.solvee.tagline,
    description: site.projects.solvee.description,
    tags: ['Mobile App', 'Education', 'AI'],
    platform: 'iOS · Android',
    category: 'Education · AI',
    scope: 'Built & sold · 25k+ downloads',
    status: site.projects.solvee.status,
    icon: solveeLogo,
    image: solveeImage,
    layout: 'split',
    screenshots: [
      { src: solveeImage, alt: 'Solvee AI homework solver', variant: 'phone' },
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
    outcome: 'Desktop AI assistant that understands your files, email, and workflow.',
    link: 'https://heyomni.app',
    tags: ['AI', 'Productivity', 'Desktop'],
    platform: 'macOS · Windows',
    category: 'AI Productivity',
    scope: 'Full product · early access',
    status: site.projects.omni.status,
    video: omniVideo,
    image: omniImage,
    linkText: site.projects.omni.link_text,
    screenshots: [
      { src: omniImage, alt: 'Omni AI assistant interface', variant: 'desktop', caption: 'AI that knows your computer' },
    ],
  },
];

export function getProjects(): Project[] {
  return allProjects.filter(
    (project) =>
      (SHOW_OMNI || project.id !== 'omni') &&
      (SHOW_PLATOIC || project.id !== 'platoic'),
  );
}

export function getPortfolioProjects(): Project[] {
  return getProjects();
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}
