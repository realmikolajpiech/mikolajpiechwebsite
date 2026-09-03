**SEO and AI search audit — mikolajpiech.com — 3 September 2026**

The site already has most technical SEO foundations. The next priorities are to establish Google's actual indexing status, make the homepage a clearer reference for Mikołaj Piech, strengthen legitimate links from related sites, and remove avoidable rendering and image-loading overhead. More AI-specific metadata is a low priority.

This is an analysis, not a deployed change. Findings come from the repository, direct public HTTP responses, rendered pages, a live Google search, and official documentation. No Search Console property, Googlebot logs, backlink database, analytics account, or real-user performance report was available. Confirmed implementation issues below are not proof of why Google ranks a particular result.

**What the comparison establishes**

A signed-out Google search for “Mikołaj Piech”, with Polish language/country parameters and personalization disabled via `pws=0`, showed LinkedIn as the first ordinary web result. The personal website was absent from the first results page. The page also contained unrelated people sharing the name. This reproduces the reported symptom in one search context; results can vary by location, time, and user. It does not establish that the homepage is unindexed.

The supplied Oskar screenshot shows a text result with a portrait thumbnail, not a Knowledge Panel. Google's term is a “text result image.” Ranking and image selection are separate outcomes. [Google's result anatomy](https://developers.google.com/search/docs/appearance/visual-elements-gallery).

| Signal checked | Your site | Oskar's site |
| --- | --- | --- |
| Rendered homepage H1 | “I build and ship digital products.” | “Oskar Minor” |
| Name in title | Present | Present |
| Person JSON-LD and social links | Present | Present |
| Homepage HTML without running JS | Full prerendered React content plus a separate noscript summary | Empty React root; visible content depends on JS |
| Canonical and language alternatives in fetched HTML | Present | Not found |
| robots.txt and sitemap.xml | Valid files | Both tested paths returned homepage HTML |
| Preferred Open Graph image | Text-heavy promotional graphic containing a portrait | Portrait |

Oskar's site is not a technical SEO model to copy wholesale. Similar traffic does not establish similar relevance, links, or ranking signals; Google's systems evaluate many signals, including relationships between pages. We have not measured either site's overall link authority or historical indexing. [Google ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide).

**Already working — preserve these**

All six sitemap pages returned HTTP 200 with their own prerendered content, language, title, description, and canonical URL: `/`, `/pl`, `/portfolio`, `/pl/portfolio`, `/privacy-policy`, and `/pl/polityka-prywatnosci`. English/Polish alternatives were present. The HTTPS www hostname redirected to the preferred non-www hostname; HTTP responses redirected toward HTTPS.

No blocking robots meta tag or X-Robots-Tag was present on the tested main pages. `robots.txt` allows all user agents. The portrait and social image return valid JPEG responses. The inline JSON-LD parses, and contains a stable Person ID with links to your social profiles. The main portfolio is already available as HTML to non-JavaScript clients.

**Priority 1: establish indexing versus ranking**

Use Search Console URL Inspection on `/` and `/pl`. Record the indexed status, Google's selected canonical, last crawl, and the crawled HTML. Compare the indexed version with a live test. An accessible live page is not proof of an indexed page, and successful indexing does not imply a high ranking. [Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).

| Inspection result | Next action |
| --- | --- |
| Not discovered | Submit the existing sitemap and check meaningful inbound/internal links |
| Discovered but not indexed | Check crawl availability and whether Google has attempted a fetch |
| Crawled but not indexed | Inspect fetched content, duplication, canonical selection, and the usefulness of the homepage |
| Google selected a different canonical | Identify that URL and reconcile redirects, canonicals, and links |
| Indexed with the intended canonical | Focus on identity, content, and legitimate external recognition |

Review Search Performance for accented and unaccented name queries, grouped by landing page, country, and device. Save a baseline before changes. A `site:` query and a single manual search are not substitutes for URL Inspection.

**Priority 2: make the name and biography unmistakable**

The English hero introduces only “Mikołaj.” The Polish hero does not identify you in its introductory sentence. Your full name is present in navigation, metadata, and footer, so this is an opportunity to improve clarity, not a missing-name indexing blocker.

Make your full name the visible H1, retaining the product-building message as supporting copy. Suggested English copy:

> Mikołaj Piech
>
> Founder and app developer from Poland.
>
> I design, build, and launch web and mobile products, including Trailo, Subby, and Charmy Books.

Suggested Polish copy:

> Mikołaj Piech
>
> Twórca aplikacji mobilnych i internetowych.
>
> Projektuję, tworzę i rozwijam produkty cyfrowe, m.in. Trailo, Subby i Charmy Books.

Add a concise visible biography connecting your identity, work, and project ownership. Explain your actual role and collaborators accurately. Present download or acquisition claims with dates and supporting evidence where available; the existing claims were not independently verified in this audit.

Keep titles name-led. Suitable options are `Mikołaj Piech | App Developer & Founder` and `Mikołaj Piech | Twórca aplikacji i stron internetowych`. Add `Mikolaj Piech` as an alternate spelling on the Person object, reflecting the public spelling used on GitHub/X. Avoid turning headings into lists of keyword variants.

Relevant files: [English content](/Users/mikolaj/Desktop/MobileApps/personalwebsite/content/site.json:66), [Polish content](/Users/mikolaj/Desktop/MobileApps/personalwebsite/content/site.pl.json:66), [homepage](/Users/mikolaj/Desktop/MobileApps/personalwebsite/pages/Home.tsx:67).

**Priority 3: improve the portrait signals**

Your portrait is crawlable, square, and 400 × 400 pixels. The homepage currently declares a 1200 × 630 promotional image containing large text and a smaller portrait as `og:image`; it has no `primaryImageOfPage`. Oskar declares his portrait in both Open Graph and Person metadata.

Associate the homepage explicitly with `#person` using `mainEntity`, and set `primaryImageOfPage` to the portrait. Prefer a clean, representative portrait for the homepage Open Graph image as well. If a higher-resolution original exists, supply that rather than upscaling the 400-pixel image. Google's image guidance explicitly supports these preferred-image signals, discourages text-heavy images, and says selection remains automated. [Image SEO guidance](https://developers.google.com/search/docs/appearance/google-images).

Use `ProfilePage` on a genuine biography/profile page whose primary focus is you, with your Person object as `mainEntity`. It is not a prerequisite for the screenshot's thumbnail and does not guarantee special presentation. [ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

Optionally add `max-image-preview:large` to indexable pages. This permits larger previews; its absence does not prohibit an ordinary thumbnail. If implemented, change `PageMeta` too, because it currently removes the robots tag on indexable pages. [Preview controls](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

Relevant files: [prerendered schema](/Users/mikolaj/Desktop/MobileApps/personalwebsite/scripts/prerender.mjs:72), [page metadata](/Users/mikolaj/Desktop/MobileApps/personalwebsite/components/PageMeta.tsx:61), [image generator](/Users/mikolaj/Desktop/MobileApps/personalwebsite/scripts/generate-og-image.mjs).

**Priority 4: fix delivery and rendering weaknesses**

| Confirmed finding | Recommended change | Practical significance |
| --- | --- | --- |
| Both `/seo-audit-missing-20260903` and `/pl/seo-audit-missing-20260903` returned the complete English homepage with HTTP 200 | Replace the catch-all homepage rewrite with proper static route delivery and a real HTTP 404 fallback | Avoids successful homepage responses at arbitrary nonexistent URLs |
| `#root` is hidden until JS adds `app-ready`; important motion wrappers also start transparent | Make meaningful prerendered content visible by default; enhance with animation after startup | Improves resilience when JS is delayed or fails |
| The client uses `createRoot` on prerendered markup | Use hydration after verifying server/client output agrees | Avoids rebuilding markup already sent by the server |
| `/` automatically redirects Polish-browser visitors to `/pl` using JavaScript | Keep stable language URLs and offer a language suggestion/link | Makes each language version directly accessible |

The client already adds `noindex` on its NotFound page, which mitigates the invalid-URL issue for crawlers that execute the code. The recommended server 404 removes the dependence on that execution. This is not evidence that Google currently reports soft 404s for valid pages. [JavaScript SEO and status codes](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

A noscript summary already exists, so the site is not wholly unreadable without JavaScript. However, it creates a second shortened content source, and text extraction during this audit included both versions. Prefer one complete, visible HTML representation. Resolve hydration differences in theme, route, locale, and other nondeterministic output before switching APIs.

Google recommends avoiding automatic language redirects and providing links between language versions. [Multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

Relevant files: [Vercel routes](/Users/mikolaj/Desktop/MobileApps/personalwebsite/vercel.json), [initial visibility](/Users/mikolaj/Desktop/MobileApps/personalwebsite/index.html:51), [language redirect](/Users/mikolaj/Desktop/MobileApps/personalwebsite/index.html:86), [client entry](/Users/mikolaj/Desktop/MobileApps/personalwebsite/index.tsx:15).

**Priority 5: reduce image overhead**

The live homepage contains nine image preloads, and none of its nine images is marked lazy. HTTP Content-Length measurements total **4,763,646 bytes, approximately 4.76 MB**, for those images alone. These are resource sizes, not a measured mobile speed score or real-user transfer total.

| Resource | Bytes |
| --- | ---: |
| Subby screenshot | 1,465,574 |
| Trailo screenshot | 1,294,062 |
| Trailo icon | 1,159,134 |
| Charmy Books logo | 433,266 |
| Portrait | 24,053 |

Resize icons to their rendered needs, convert suitable screenshots to WebP/AVIF, provide responsive sources, and lazy-load below-the-fold project images. Keep the hero portrait eager. Check generated HTML because React's server render is emitting image preloads automatically. Existing aspect-ratio containers help reserve space; add explicit intrinsic dimensions where appropriate.

This is a clear performance opportunity, not proof that Core Web Vitals caused the name-search problem. Measure mobile Lighthouse and field data after the change. [Image performance guidance](https://developers.google.com/search/docs/appearance/google-images).

Relevant file: [project cards](/Users/mikolaj/Desktop/MobileApps/personalwebsite/components/ProjectCard.tsx:47).

**Priority 6: publish stronger evidence and keep AI-facing content consistent**

Create substantial project case studies, beginning with Solvee, Trailo, and Subby. A useful page explains the problem, your role, what you built, significant decisions, dates, results, and evidence. Link to it from the portfolio and connect it to your Person object. Dedicated URLs allow each project to be linked and cited independently; merely splitting short descriptions into many pages would add little value.

Strengthen legitimate references back to the personal site. The public GitHub profile and Trailo homepage already link to it. Direct HTML checks found no equivalent link on the Charmy Books or Safe Labs homepages; this does not rule out links in their rendered content or other pages. Check those sites before adding accurate creator/team credits. Also review LinkedIn's website field, app developer/support links, and relevant school or event credits. Coordinate shared-project changes with the actual maintainers; do not manufacture endorsements or buy links.

Your AI assets need consistency more than expansion. Two generators currently produce different graphs: the external `schema.json` contains project authors and FAQs, while prerendering replaces the inline graph with a smaller version. The rendered portfolio has eight projects, but the generated list omits Twoja Sieć. Client navigation updates ordinary metadata without replacing page-specific JSON-LD. Consolidate shared entity/project definitions and keep visible content and metadata aligned.

The FAQs in the external schema and text summary are not a visible FAQ section on the homepage. Move useful factual answers into visible biography/project content if they help visitors. Do not add FAQ markup expecting a Google enhancement: Google retired FAQ rich results starting 7 May 2026. [Google's documentation updates](https://developers.google.com/search/updates).

`llms.txt`, `llms-full.txt`, and `/crawl/portfolio` are already accessible. The crawl copy correctly canonicalizes to `/portfolio`; the `.html` link first redirects to the clean URL. Since the main portfolio is already prerendered, this extra copy is optional maintenance overhead.

Google's current AI guidance says special AI text files and special schema are unnecessary, and `llms.txt` does not affect Google rankings or AI visibility. Prioritize original, useful content and reliable indexing. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

For ChatGPT search, `OAI-SearchBot` is the relevant crawler; `GPTBot` controls potential training use separately. Your current wildcard allowance already permits both. Check verified crawler access in hosting logs if discovery remains poor: a successful ordinary HTTP request does not prove access from crawler IPs. There is no need to change training permissions to improve search eligibility. [Official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

Relevant files: [AI asset generator](/Users/mikolaj/Desktop/MobileApps/personalwebsite/scripts/generate-llm-assets.mjs:40), [prerender project list](/Users/mikolaj/Desktop/MobileApps/personalwebsite/scripts/prerender.mjs:9), [project data](/Users/mikolaj/Desktop/MobileApps/personalwebsite/data/projects.ts:200).

**Implementation order and acceptance criteria**

1. Capture Search Console baseline and inspect both homepages. Identify any indexing/canonical problem before attributing the symptom to rankings.
2. Ship name-led copy, visible biography, portrait associations, and consistent metadata. Keep EN/PL content aligned.
3. Correct unknown-path status codes, language redirects, startup visibility, and unnecessary image loading. Verify direct requests, client navigation, and delayed/disabled JavaScript.
4. Publish the first substantive case studies and fill verified gaps in creator links on related sites.
5. Validate deployed structured data, all six current canonical routes, real 404 responses, crawler access, and image sizes. Submit the existing sitemap and request recrawling of materially changed pages.
6. Review name-query impressions, landing pages, CTR, and position over subsequent weeks. Track referrals and a small repeatable set of AI-search questions such as “Who created Trailo?” Record actual citations and accuracy, not only whether an answer mentions the name. Neither a thumbnail, first position, nor AI citation can be promised on a fixed schedule.
