import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';
import { ContactForm } from '../components/ContactForm';
import { StoryList } from '../components/StoryCard';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getHomeStories } from '../data/stories';
import { getPageMeta } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../utils/localizedRoutes';
import { ThreadsIcon } from '../components/ThreadsIcon';
import { SubstackIcon } from '../components/SubstackIcon';
import imageManifest from '../data/image-manifest.json';

const XIcon = () => <svg viewBox="0 0 300 271" fill="currentColor" aria-hidden="true"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" /></svg>;

const profiles = [
  { name: 'X', icon: XIcon, href: 'https://x.com/mikolajpiech', visible: true },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/mikolajpiech/', visible: true },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/mikolajpiech', visible: true },
  // Set visible to true to restore a hidden profile in both places.
  { name: 'Threads', icon: ThreadsIcon, href: 'https://www.threads.com/@mikolajpiech', visible: false },
  { name: 'Substack', icon: SubstackIcon, href: 'https://substack.com/@mikolajpiech', visible: false },
  { name: 'GitHub', icon: Github, href: 'https://github.com/realmikolajpiech', visible: false },
];

function SocialLinks({ label, hero = false }: { label: string; hero?: boolean }) {
  return <div className={`personal-socials${hero ? ' personal-hero-socials' : ''}`} role="group" aria-label={label}>
    {profiles.filter(profile => profile.visible).map(profile => <a href={profile.href} key={profile.name} target="_blank" rel="noopener noreferrer" aria-label={profile.name} title={profile.name}><profile.icon aria-hidden="true" /></a>)}
  </div>;
}

export default function Home() {
  const { language, site } = useLanguage();
  const copy = site.personal;
  const portfolioPath = getLocalizedPath('portfolio', language);
  const [before, after] = site.hero.intro.split('Clevr Apps');
  const hasClevrAppsLink = after !== undefined;
  const stories = getHomeStories(language);

  return (
    <div className="personal-home">
      <PageMeta {...getPageMeta('home', site, language)} />
      <a href="#main" className="personal-skip">{copy.skip}</a>
      <SiteNav personal />
      <main id="main" className="personal-container">
        <section className="personal-hero" aria-labelledby="intro-title">
          <div className="personal-intro">
            <h1 id="intro-title">Mikołaj <span>Piech</span></h1>
            <p>{hasClevrAppsLink ? <>{before}<a href="https://clevrapps.com/" target="_blank" rel="noopener noreferrer">Clevr Apps</a>{after}</> : site.hero.intro}</p>
            <div className="personal-intro-links">
              <a href="#work">{copy.work_link}<ArrowDown size={16} aria-hidden="true" /></a>
              <a href="#about">{copy.about_title}</a>
            </div>
            <SocialLinks label={copy.social_label} hero />
          </div>
          <div className="personal-portrait">
            <ResponsiveImage src={imageManifest['public/mikolaj-profile.jpg'].src} sizes="(max-width: 767px) 88px, 416px" loading="eager" decoding="sync" fetchPriority="high" alt="Mikołaj Piech" />
          </div>
        </section>

        <section id="work" className="personal-work" aria-labelledby="work-title">
          <div className="personal-section-heading">
            <div><h2 id="work-title">{language === 'pl' ? 'Wybrane projekty' : 'Selected projects'}</h2></div>
          </div>
          <StoryList stories={stories} language={language} />
          <div className="personal-more-projects">
            <Link className="personal-more-link" to={portfolioPath}>{copy.more_projects}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className="personal-studio-note">{copy.studio_note} <a href="https://clevrapps.com/" target="_blank" rel="noopener noreferrer">Clevr Apps<ArrowUpRight size={14} aria-hidden="true" /></a></p>
        </section>

        <section id="about" className="personal-about" aria-labelledby="about-title">
          <h2 id="about-title">{copy.about_title}</h2>
          <div>{copy.about_paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section id="contact" className="personal-contact" aria-labelledby="contact-title">
          <div className="personal-contact-intro"><h2 id="contact-title">{copy.contact_title}</h2><a className="personal-email" href="mailto:hello@mikolajpiech.com">hello@mikolajpiech.com<ArrowUpRight size={22} aria-hidden="true" /></a>
          <SocialLinks label={copy.social_label} /></div>
          <ContactForm personal />
        </section>
      </main>
      <footer className="personal-footer personal-container"><p>© {new Date().getFullYear()} Mikołaj Piech</p><Link to={getLocalizedPath('privacy', language)}>{site.common.privacy_policy}</Link></footer>
    </div>
  );
}
