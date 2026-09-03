My personal website
mikolajpiech.com

**Local development**

Run `npm ci`, then `npm run dev`. The predev step generates responsive WebP images and their manifest from the original assets. Generated files in `public/images` and `data/image-manifest.json` are intentionally ignored by Git.

**Build and verification**

Run `npm run build`, `npx tsc --noEmit`, and `npm run seo:check`. The build generates responsive images, client and server bundles, synchronized AI guides, six indexable HTML documents, and two error documents. All visible portfolio data and project structured data come from `data/projects.ts` and the localized content files.

Run `npm run preview -- --host 127.0.0.1 --port 4174`, then `npm run seo:check -- http://127.0.0.1:4174` to also check clean URLs, legacy redirects, and HTTP 404 responses. Preview models the static routing in `vercel.json`; the contact API still requires Vercel.

Vercel builds with `npm run build` and serves `dist`. Unknown paths use `404.html` with a 404 response. The common static error page is English; JavaScript selects the Polish error page for unknown `/pl/...` paths. The existing six canonical pages hydrate their prerendered HTML. They remain readable without JavaScript, with native technology disclosures and email links. Contact form fields wait for hydration.

The homepage uses the existing portrait as its social and primary image. Other pages retain the existing social graphic; `npm run og:generate` remains available to regenerate that graphic. `npm run llm:generate` rebuilds the shared server module before generating the guides and external portfolio schema. `/crawl/portfolio` and `/crawl/portfolio.html` redirect to the already-prerendered portfolio.

**Pending copy and external work**

`SEO-CONTENT-PROPOSAL.md` records the approved homepage copy, metadata, related-site credits, and Clevr Apps relationship. Existing Clevr Apps product pages are linked from the portfolio; future personal case studies should contain unique material rather than duplicate product copy.

After deployment, verify the homepage and `/pl` in Google Search Console, inspect Google's selected canonical and last crawl, submit `/sitemap.xml`, and request recrawling of changed pages. Save branded-query performance before comparing subsequent weeks. Check verified search-crawler requests in hosting logs. These account checks and related-site credits have not been performed by this repository change.
