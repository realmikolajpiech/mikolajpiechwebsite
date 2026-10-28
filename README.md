My personal website
mikolajpiech.com

**Local development**

Run `npm ci`, then `npm run dev`. The predev step generates responsive WebP images and their manifest from the original assets. Generated files in `public/images` and `data/image-manifest.json` are intentionally ignored by Git.

**Build and verification**

Run `npm run build`, `npx tsc --noEmit`, `npm run seo:check`, and `npm run performance:check`. The performance check guards the initial JavaScript budget, bundled font preloads, responsive preview sizes, and complete static rendering. The build generates responsive images, client and server bundles, synchronized AI guides, six indexable HTML documents, and two error documents. All visible portfolio data and project structured data come from `data/projects.ts` and the localized content files.

Run `npm run preview -- --host 127.0.0.1 --port 4174`, then `npm run seo:check -- http://127.0.0.1:4174` to also check clean URLs, legacy redirects, and HTTP 404 responses. Preview models the static routing in `vercel.json`; the contact API still requires Vercel.

After building, run `npm run test:home` and `npm run test:scroll-spy`. Homepage tests cover preview loading, menu keyboard behavior, theme changes, language navigation, and contact success/error/validation with mocked requests. No emails are sent by these tests.

Vercel builds with `npm run build` and serves `dist`. Unknown paths use `404.html` with a 404 response. The common static error page is English; JavaScript selects the Polish error page for unknown `/pl/...` paths. All canonical pages are prerendered and remain readable without JavaScript. `/` and `/pl` use the small `home-client.ts` enhancement for menu, theme, language, and contact interactions, with a 5 KiB gzip JavaScript budget. Other pages load `entry-client.tsx` and hydrate with React. Both form implementations share `utils/contact.ts`. Language switches preserve scroll across documents through session storage.

Beasties extracts each prerendered document's critical CSS, including dark mode and mobile menu states. The complete shared stylesheet loads without blocking and applies during browser idle time, with a noscript fallback. The homepage's 13 KiB WebP portrait is embedded in its HTML, avoiding an additional LCP image request. Its external variants remain available to React navigation and other consumers; social metadata retains the original JPEG. Project previews load within 350 px of the viewport through IntersectionObserver, with original images in noscript fallbacks.

Fonts are generated from Fontsource into committed WOFF2 files under `assets/fonts`, with original licences. Serif Latin/Extended subsets are merged; English and Polish characters, used typography, body Latin-1 characters, and Manrope's variable weights are retained. Vite fingerprints the files and preloads body, heading, and italic heading faces. `npm run fonts:generate` requires Python packages `fonttools==4.60.2` and `brotli==1.2.1`; normal builds need neither. Regenerate fonts after changing supported languages or adding characters to the page copy.

Secondary React pages load in separate client chunks. The server entry supplies eager page components so prerendering produces complete HTML; Suspense preserves it while a direct visit hydrates its page chunk. Framer Motion stays with the pages that use it. Responsive image generation includes the WebP portrait, 160–320 px previews, and 48 px icons; changes to the generator invalidate cached variants.

The homepage uses the existing portrait as its social and primary image. Other pages retain the existing social graphic; `npm run og:generate` remains available to regenerate that graphic. `npm run llm:generate` rebuilds the shared server module before generating the guides and external portfolio schema. `/crawl/portfolio` and `/crawl/portfolio.html` redirect to the already-prerendered portfolio.

**Pending copy and external work**

`SEO-CONTENT-PROPOSAL.md` records the approved homepage copy, metadata, related-site credits, and Clevr Apps relationship. Existing Clevr Apps product pages are linked from the portfolio; future personal case studies should contain unique material rather than duplicate product copy.

After deployment, verify the homepage and `/pl` in Google Search Console, inspect Google's selected canonical and last crawl, submit `/sitemap.xml`, and request recrawling of changed pages. Save branded-query performance before comparing subsequent weeks. Check verified search-crawler requests in hosting logs. These account checks and related-site credits have not been performed by this repository change.
