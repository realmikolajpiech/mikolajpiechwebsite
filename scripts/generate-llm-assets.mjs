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

const { getPortfolioProjects, getPageMeta, getStories } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

function buildLlmsTxt() {
  return `# ${SITE_NAME}

> Founder & developer who designs and builds web apps, mobile apps, websites, and digital products.

${site.seo.person_description}

${site.hero.intro}

## Docs
- [Full site summary (${SITE_URL}/llms-full.txt)](${SITE_URL}/llms-full.txt): Plain-text bio, interests, projects, and FAQs, the best source for AI agents
- [Structured data (${SITE_URL}/schema.json)](${SITE_URL}/schema.json): JSON-LD with Person, WebSite, and projects

## Pages
- [Home](${SITE_URL}/): Personal introduction, selected work, interests, and contact
- [Projects and stories](${SITE_URL}/portfolio): Four project stories and a compact list of other work
${getStories('en').map(story => `- [${story.project.name}](${SITE_URL}${story.path}): ${story.title}`).join('\n')}
- [Privacy Policy](${SITE_URL}/privacy-policy): Website data handling, contact details, and links to app privacy notices

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
    site.hero.intro,
    'Studio: https://clevrapps.com/',
    '',
    ...site.personal.about_paragraphs,
    '',
    '## Project stories',
    '',
  ];

  for (const story of getStories('en')) {
    lines.push(`### ${story.project.name}: ${story.title}`, '', `${SITE_URL}${story.path}`, '', story.summary, '', `Role: ${story.role}`, `Outcome: ${story.outcome}`, '');
    for (const section of story.sections) lines.push(`#### ${section.title}`, '', section.body, '');
  }
  lines.push('## Other project information', '');

  for (const project of projects) {
    lines.push(`### ${project.nameDisplay}${project.status ? ` (${project.status})` : ''}`);
    lines.push('');
    lines.push(`Tagline: ${project.tagline}`);
    lines.push(`Description: ${project.description}`);
    if (project.milestone) lines.push(`Milestone: ${project.milestone}`);
    lines.push(`Platform: ${project.platform}`);
    lines.push(`Category: ${project.category}`);
    lines.push(`Scope: ${project.scope}`);
    if (project.link) lines.push(`Website: ${project.link}`);
    if (project.studioLink) lines.push(`Clevr Apps product page: ${project.studioLink}`);
    if (project.appStoreLink) lines.push(`App Store: ${project.appStoreLink}`);
    if (project.playStoreLink) lines.push(`Google Play: ${project.playStoreLink}`);
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
