import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

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

const { getPortfolioProjects, getPageMeta } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

function buildLlmsTxt() {
  return `# ${SITE_NAME}

> Founder & developer who designs and builds web apps, mobile apps, websites, and digital products.

${site.seo.person_description}

## Docs
- [Full site summary (${SITE_URL}/llms-full.txt)](${SITE_URL}/llms-full.txt): Plain-text bio, services, projects, proof, and FAQs, the best source for AI agents
- [Structured data (${SITE_URL}/schema.json)](${SITE_URL}/schema.json): JSON-LD with Person, WebSite, and projects

## Pages
- [Home](${SITE_URL}/): About, proof, selected work, services, and contact
- [Portfolio (interactive)](${SITE_URL}/portfolio): Detailed shipped products in the main site
- [Portfolio (plain HTML for agents)](${SITE_URL}/portfolio): Crawlable project details without JavaScript
- [Privacy Policy](${SITE_URL}/privacy-policy): Data handling for this website and published apps

## Contact
- Email: ${CONTACT_EMAIL}
- LinkedIn: ${agent.profiles.linkedin}
- X: ${agent.profiles.x}
- GitHub: ${agent.profiles.github}
- Instagram: ${agent.profiles.instagram}
`;
}

function buildLlmsFullTxt(projects) {
  const lines = [
    `# ${SITE_NAME} | Full Site Summary`,
    '',
    'This file is a plain-text, citation-friendly summary of mikolajpiech.com for AI agents and answer engines.',
    '',
    '## About',
    '',
    site.seo.person_description,
    '',
    `${site.hero.headline_line1} ${site.hero.headline_line2}`,
    '',
    site.hero.description,
    '',
    '## Stats',
    '',
    `- ${site.portfolio.stats.apps}`,
    `- ${site.portfolio.stats.downloads}`,
    `- ${site.portfolio.stats.platforms}`,
    `- ${site.portfolio.stats.acquired}`,
    '',
    '## Services',
    '',
    ...site.capabilities.items.map((item) => `- ${item.title}: ${item.description}`),
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
    if (project.link) lines.push(`Website: ${project.link}`);
    if (project.appStoreLink) lines.push(`App Store: ${project.appStoreLink}`);
    if (project.playStoreLink) lines.push(`Google Play: ${project.playStoreLink}`);
    lines.push('');
  }

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
  lines.push(`Instagram: ${agent.profiles.instagram}`);
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`Home: ${SITE_URL}/`);
  lines.push(`Portfolio: ${SITE_URL}/portfolio`);
  lines.push(`Portfolio (crawlable HTML): ${SITE_URL}/portfolio`);
  lines.push(`Privacy Policy: ${SITE_URL}/privacy-policy`);
  lines.push(`LLM summary (this file): ${SITE_URL}/llms-full.txt`);
  lines.push(`Structured data: ${SITE_URL}/schema.json`);

  return `${lines.join('\n')}\n`;
}

const projects = getPortfolioProjects('en').map((project) => ({ ...project, nameDisplay: project.name }));
const jsonLd = getPageMeta('portfolio', site, 'en').structuredData;

mkdirSync(publicDir, { recursive: true });
const outputs = {
  'llms.txt': buildLlmsTxt(),
  'llms-full.txt': buildLlmsFullTxt(projects),
  'schema.json': `${JSON.stringify(jsonLd, null, 2)}\n`,
};
for (const [name, content] of Object.entries(outputs)) {
  writeFileSync(join(publicDir, name), content);
  if (existsSync(join(root, 'dist'))) copyFileSync(join(publicDir, name), join(root, 'dist', name));
}
console.log('Generated AI guides and structured data from the visible portfolio.');
