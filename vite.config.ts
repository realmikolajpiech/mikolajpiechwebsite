import path from 'path';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import hosting from './vercel.json';

export default defineConfig(({ mode, isPreview }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Production has a static document per route; only development needs SPA fallback.
      appType: isPreview ? 'mpa' : 'spa',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), {
        name: 'static-preview-routing',
        configurePreviewServer(server) {
          const output = path.resolve(server.config.root, server.config.build.outDir);
          server.middlewares.use((request, response, next) => {
            const url = new URL(request.url ?? '/', 'http://localhost');
            const redirect = hosting.redirects.find((rule) => rule.source === url.pathname);
            const cleanPath = url.pathname.endsWith('.html') ? url.pathname.slice(0, -5)
              : url.pathname.length > 1 && url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : null;
            const destination = redirect?.destination ?? cleanPath;
            if (destination) {
              response.writeHead(308, { Location: `${destination}${url.search}` });
              response.end();
              return;
            }
            next();
          });
          return () => server.middlewares.use((request, response, next) => {
            let pathname: string;
            try { pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname); }
            catch { response.writeHead(400); response.end(); return; }
            const file = path.resolve(output, `.${pathname}`);
            if (file.startsWith(`${output}${path.sep}`) && existsSync(file) && statSync(file).isFile()) return next();
            response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(request.method === 'HEAD' ? undefined : readFileSync(path.join(output, '404.html')));
          });
        },
      }],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
