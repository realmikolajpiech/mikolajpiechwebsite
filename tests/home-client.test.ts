import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test, type TestContext } from 'node:test';
import { JSDOM } from 'jsdom';
import { enhanceHome } from '../home-client';
import { clearLanguageScroll, getLanguageScroll } from '../utils/languageScroll';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<link\b[^>]*>/g, '');

function setup(t: TestContext) {
  const dom = new JSDOM(html, { url: 'http://localhost/#about', pretendToBeVisual: true });
  const { window } = dom;
  const media = new Map<string, { matches: boolean; callbacks: Function[]; addEventListener: Function }>();
  window.matchMedia = ((query: string) => {
    if (!media.has(query)) media.set(query, { matches: false, callbacks: [], addEventListener(_type: string, fn: Function) { this.callbacks.push(fn); } });
    return media.get(query);
  }) as typeof window.matchMedia;
  let intersect!: IntersectionObserverCallback;
  const observed = new Set<Element>();
  class PreviewObserver {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe(element: Element) { observed.add(element); }
    unobserve(element: Element) { observed.delete(element); }
  }
  for (const [key, value] of Object.entries({ window, document: window.document, navigator: window.navigator, localStorage: window.localStorage, sessionStorage: window.sessionStorage, FormData: window.FormData, IntersectionObserver: PreviewObserver })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => previous ? Object.defineProperty(globalThis, key, previous) : Reflect.deleteProperty(globalThis, key));
  }
  t.after(() => dom.window.close());
  clearLanguageScroll('/pl');
  enhanceHome();
  const document = window.document;
  return { window, document, media, observed, intersect };
}

test('preview images load only when approaching the viewport', (t) => {
  const { document, observed, intersect } = setup(t);
  const image = document.querySelector<HTMLImageElement>('img[data-deferred-src]')!;
  const source = image.dataset.deferredSrc;
  assert.ok(observed.has(image));
  assert.ok(image.src.startsWith('data:image/gif;'));
  intersect([{ target: image, isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
  assert.equal(image.dataset.deferredSrc, source);
  intersect([{ target: image, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
  assert.equal(new URL(image.src).pathname, source);
  assert.ok(image.srcset.includes('240w'));
  assert.equal(image.loading, 'eager');
  assert.equal(image.dataset.deferredSrc, undefined);
  assert.equal(observed.has(image), false);
});

test('mobile menu opens, closes with Escape, and becomes inert after closing', (t) => {
  const { window, document } = setup(t);
  const button = document.querySelector<HTMLButtonElement>('.personal-menu-toggle')!;
  const menu = document.getElementById('personal-mobile-menu')!;
  button.click();
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(menu.inert, false);
  assert.equal(button.getAttribute('aria-label'), 'Close menu');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(menu.inert, true);
  assert.equal(document.activeElement, button);
  button.click();
  document.body.dispatchEvent(new window.Event('pointerdown', { bubbles: true }));
  assert.equal(button.getAttribute('aria-expanded'), 'false');
});

test('theme cycles through light, dark, system and follows system changes', (t) => {
  const { document, media, window } = setup(t);
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;
  button.click();
  assert.equal(window.localStorage.getItem('theme'), 'light');
  button.click();
  assert.equal(window.localStorage.getItem('theme'), 'dark');
  assert.ok(document.documentElement.classList.contains('dark'));
  assert.equal(document.querySelector<SVGElement>('[data-theme-icon="dark"]')!.style.display, 'block');
  button.click();
  assert.equal(window.localStorage.getItem('theme'), 'system');
  const system = media.get('(prefers-color-scheme: dark)')!;
  system.matches = true;
  system.callbacks.forEach((fn) => fn());
  assert.ok(document.documentElement.classList.contains('dark'));
});

test('language navigation preserves the anchor and stores scroll for the next document', (t) => {
  const { window, document } = setup(t);
  Object.defineProperty(window, 'scrollY', { value: 420 });
  const link = document.querySelector<HTMLAnchorElement>('a[hreflang]')!;
  assert.equal(link.hash, '#about');
  link.addEventListener('click', (event) => event.preventDefault());
  link.click();
  assert.equal(getLanguageScroll('/pl'), 420);
  assert.deepEqual(JSON.parse(window.sessionStorage.getItem('site-language-scroll')!), { pathname: '/pl', top: 420 });
  clearLanguageScroll('/pl');
  assert.equal(getLanguageScroll('/pl'), null);
});

function fillForm(document: Document) {
  const form = document.querySelector<HTMLFormElement>('.personal-form')!;
  for (const [name, value] of Object.entries({ name: 'Test', email: 'test@example.com', message: 'A valid test message longer than twenty characters.' })) {
    form.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value = value;
  }
  return form;
}

const settle = () => new Promise<void>((resolve) => setImmediate(resolve));

test('contact submission sends the same payload, shows pending state, and resets after success', async (t) => {
  const { window, document } = setup(t);
  let finish!: (response: Response) => void;
  const request = t.mock.method(globalThis, 'fetch', () => new Promise<Response>((resolve) => { finish = resolve; }));
  const form = fillForm(document);
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(button.disabled, true);
  assert.equal(form.getAttribute('aria-busy'), 'true');
  assert.equal(request.mock.calls.length, 1);
  const [url, options] = request.mock.calls[0].arguments;
  assert.equal(url, '/api/contact');
  const payload = JSON.parse(options.body as string);
  assert.equal(payload.email, 'test@example.com');
  assert.equal(payload.company, '');
  assert.equal(payload.website, '');
  assert.equal(typeof payload.browserContext.timezone, 'string');
  finish(new Response('{"message":"Sent"}', { status: 200 }));
  await settle();
  assert.equal(button.disabled, false);
  assert.equal(form.getAttribute('aria-busy'), 'false');
  assert.equal(form.querySelector<HTMLInputElement>('[name="email"]')!.value, '');
  assert.equal(form.querySelector('[aria-live]')!.textContent, form.dataset.contactSent);
});

test('contact errors use translated feedback and clear when the user edits', async (t) => {
  const { window, document } = setup(t);
  t.mock.method(globalThis, 'fetch', async () => new Response('{"message":"Error"}', { status: 500 }));
  const form = fillForm(document);
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await settle();
  assert.equal(form.querySelector('[aria-live]')!.textContent, form.dataset.contactError);
  form.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(form.querySelector('[aria-live]')!.textContent, '');
  assert.equal(form.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled, false);
});

test('invalid fields never call the contact endpoint', (t) => {
  const { window, document } = setup(t);
  const request = t.mock.method(globalThis, 'fetch', async () => new Response('{}'));
  document.querySelector('form')!.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(request.mock.calls.length, 0);
});
