import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const site = JSON.parse(readFileSync(join(root, 'content/site.json'), 'utf8'));
const agent = JSON.parse(readFileSync(join(root, 'content/agent.json'), 'utf8'));

const SITE_URL = site.seo.site_url;
const SITE_NAME = site.seo.site_name;
const CONTACT_EMAIL = agent.contact.email;

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getProjects() {
  return agent.visible_projects.map((id) => {
    const copy = site.projects[id];
    const meta = agent.project_meta[id];
    return {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      nameDisplay: id === 'solvee' ? 'Solvee' : id.charAt(0).toUpperCase() + id.slice(1),
      tagline: copy.tagline,
      description: copy.description,
      status: copy.status,
      tags: meta.tags,
      ...meta,
    };
  });
}

function getTimeline() {
  return agent.timeline_order.map((key) => site.timeline.items[key]);
}

function buildJsonLd(projects) {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const projectsId = `${SITE_URL}/#projects`;
  const faqId = `${SITE_URL}/#faq`;

  const projectSchemas = projects.map((project, index) => {
    const item = {
      '@type': project.applicationType,
      name: project.nameDisplay,
      description: project.description,
      applicationCategory: project.category,
      operatingSystem: project.operatingSystem,
      author: { '@id': personId },
    };

    if (project.appStoreLink) item.url = project.appStoreLink;
    if (project.status) item.creativeWorkStatus = project.status;

    return {
      '@type': 'ListItem',
      position: index + 1,
      item,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: site.seo.person_description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        jobTitle: 'Founder & Developer',
        url: SITE_URL,
        image: `${SITE_URL}/mikolaj-profile.jpg`,
        email: CONTACT_EMAIL,
        sameAs: Object.values(agent.profiles),
        description: site.seo.person_description,
        knowsAbout: agent.knows_about,
      },
      {
        '@type': 'ItemList',
        '@id': projectsId,
        name: 'Apps by Mikołaj Piech',
        itemListElement: projectSchemas,
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        mainEntity: agent.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

function buildLlmsTxt() {
  return `# ${SITE_NAME}

> Founder & developer who builds and ships consumer apps on iOS, Android, and web.

${site.seo.person_description}

## Docs
- [Full site summary (${SITE_URL}/llms-full.txt)](${SITE_URL}/llms-full.txt): Plain-text bio, projects, timeline, FAQs — best source for AI agents
- [Structured data (${SITE_URL}/schema.json)](${SITE_URL}/schema.json): JSON-LD with Person, WebSite, projects, and FAQs

## Pages
- [Home](${SITE_URL}/): About, projects overview, timeline, contact
- [Portfolio (interactive)](${SITE_URL}/portfolio): Detailed shipped apps in the main site
- [Portfolio (plain HTML for agents)](${SITE_URL}/crawl/portfolio.html): Crawlable project details without JavaScript
- [Privacy Policy](${SITE_URL}/privacy-policy): Data handling for this website and published apps

## Contact
- Email: ${CONTACT_EMAIL}
- LinkedIn: ${agent.profiles.linkedin}
- X: ${agent.profiles.x}
- GitHub: ${agent.profiles.github}
`;
}

function buildLlmsFullTxt(projects, timeline) {
  const lines = [
    `# ${SITE_NAME} — Full Site Summary`,
    '',
    'This file is a plain-text, citation-friendly summary of mikolajpiech.com for AI agents and answer engines.',
    '',
    '## About',
    '',
    site.seo.person_description,
    '',
    `${site.hero.headline_line1} ${site.hero.headline_line2}`,
    '',
    'Shipped apps on iOS, Android, and web. Solvee reached 25k+ downloads before acquisition. Always building new products.',
    '',
    '## Stats',
    '',
    `- ${site.portfolio.stats.apps}`,
    `- ${site.portfolio.stats.downloads}`,
    `- ${site.portfolio.stats.platforms}`,
    `- ${site.portfolio.stats.acquired}`,
    '',
    '## Projects',
    '',
  ];

  for (const project of projects) {
    lines.push(`### ${project.nameDisplay}${project.status ? ` (${project.status})` : ''}`);
    lines.push('');
    lines.push(`Tagline: ${project.tagline}`);
    lines.push(`Description: ${project.description}`);
    lines.push(`Platform: ${project.platform}`);
    lines.push(`Category: ${project.category}`);
    lines.push(`Scope: ${project.scope}`);
    if (project.appStoreLink) lines.push(`App Store: ${project.appStoreLink}`);
    if (project.playStoreLink) lines.push(`Google Play: ${project.playStoreLink}`);
    lines.push('');
  }

  lines.push('## Timeline');
  lines.push('');
  for (const item of timeline) {
    lines.push(`- ${item.date} — ${item.title}: ${item.description}`);
  }

  lines.push('');
  lines.push('## Frequently Asked Questions');
  lines.push('');
  for (const faq of agent.faqs) {
    lines.push(`Q: ${faq.question}`);
    lines.push(`A: ${faq.answer}`);
    lines.push('');
  }

  lines.push('## Contact');
  lines.push('');
  lines.push(`Email: ${CONTACT_EMAIL}`);
  lines.push(`Website: ${SITE_URL}`);
  lines.push(`LinkedIn: ${agent.profiles.linkedin}`);
  lines.push(`X: ${agent.profiles.x}`);
  lines.push(`GitHub: ${agent.profiles.github}`);
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`Home: ${SITE_URL}/`);
  lines.push(`Portfolio: ${SITE_URL}/portfolio`);
  lines.push(`Portfolio (crawlable HTML): ${SITE_URL}/crawl/portfolio.html`);
  lines.push(`Privacy Policy: ${SITE_URL}/privacy-policy`);
  lines.push(`LLM summary (this file): ${SITE_URL}/llms-full.txt`);
  lines.push(`Structured data: ${SITE_URL}/schema.json`);

  return `${lines.join('\n')}\n`;
}

function buildPortfolioHtml(projects) {
  const projectArticles = projects
    .map((project) => {
      const links = [
        project.appStoreLink
          ? `<a href="${project.appStoreLink}" rel="noopener noreferrer">App Store</a>`
          : '',
        project.playStoreLink
          ? `<a href="${project.playStoreLink}" rel="noopener noreferrer">Google Play</a>`
          : '',
      ]
        .filter(Boolean)
        .join(' · ');

      return `      <article id="${project.id}">
        <h2>${escapeHtml(project.nameDisplay)}${project.status ? ` — ${escapeHtml(project.status)}` : ''}</h2>
        <p><strong>${escapeHtml(project.tagline)}</strong></p>
        <p>${escapeHtml(project.description)}</p>
        <p>Platform: ${escapeHtml(project.platform)} · Category: ${escapeHtml(project.category)} · ${escapeHtml(project.scope)}</p>
        ${links ? `<p>${links}</p>` : ''}
      </article>`;
    })
    .join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(site.seo.pages.portfolio.title)}</title>
    <meta name="description" content="${escapeHtml(site.seo.pages.portfolio.description)}" />
    <link rel="canonical" href="${SITE_URL}/portfolio" />
    <link rel="alternate" type="text/plain" href="${SITE_URL}/llms-full.txt" title="LLM-readable site summary" />
  </head>
  <body>
    <header>
      <nav>
        <a href="${SITE_URL}/">${escapeHtml(SITE_NAME)}</a>
        <a href="${SITE_URL}/portfolio">Portfolio</a>
        <a href="${SITE_URL}/privacy-policy">Privacy Policy</a>
        <a href="${SITE_URL}/llms-full.txt">LLM summary</a>
      </nav>
    </header>

    <main>
      <h1>${escapeHtml(site.portfolio.headline)} ${escapeHtml(site.portfolio.headline_accent)}</h1>
      <p>${escapeHtml(site.portfolio.subtitle)}</p>
      <ul>
        <li>${escapeHtml(site.portfolio.stats.apps)}</li>
        <li>${escapeHtml(site.portfolio.stats.downloads)}</li>
        <li>${escapeHtml(site.portfolio.stats.platforms)}</li>
        <li>${escapeHtml(site.portfolio.stats.acquired)}</li>
      </ul>

${projectArticles}
    </main>

    <footer>
      <p>${escapeHtml(site.portfolio.cta_description)}</p>
      <p>Contact: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
      <p><a href="${SITE_URL}/">Back to home</a></p>
    </footer>
  </body>
</html>
`;
}

function patchIndexHtml(jsonLd) {
  const indexPath = join(root, 'index.html');
  const html = readFileSync(indexPath, 'utf8');
  const json = JSON.stringify(jsonLd, null, 2);
  const start = '    <!-- GENERATED:JSON-LD:START -->';
  const end = '    <!-- GENERATED:JSON-LD:END -->';
  const replacement = `${start}\n    <script type="application/ld+json">\n${json}\n    </script>\n    ${end}`;

  const pattern = /    <!-- GENERATED:JSON-LD:START -->[\s\S]*?    <!-- GENERATED:JSON-LD:END -->/;
  if (!pattern.test(html)) {
    throw new Error('JSON-LD markers not found in index.html');
  }

  writeFileSync(indexPath, html.replace(pattern, replacement));
}

const projects = getProjects();
const timeline = getTimeline();
const jsonLd = buildJsonLd(projects);

mkdirSync(join(publicDir, 'crawl'), { recursive: true });

writeFileSync(join(publicDir, 'llms.txt'), buildLlmsTxt());
writeFileSync(join(publicDir, 'llms-full.txt'), buildLlmsFullTxt(projects, timeline));
writeFileSync(join(publicDir, 'schema.json'), `${JSON.stringify(jsonLd, null, 2)}\n`);
writeFileSync(join(publicDir, 'crawl', 'portfolio.html'), buildPortfolioHtml(projects));
patchIndexHtml(jsonLd);

console.log('Generated LLM assets:');
console.log('  public/llms.txt');
console.log('  public/llms-full.txt');
console.log('  public/schema.json');
console.log('  public/crawl/portfolio.html');
console.log('  index.html (JSON-LD synced)');
