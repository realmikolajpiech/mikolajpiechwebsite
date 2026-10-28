import { applyThemeClass, getStoredTheme } from './utils/theme';
import { clearLanguageScroll, getLanguageScroll, rememberLanguageScroll } from './utils/languageScroll';
import { emptyContactForm, submitContact, type ContactFields } from './utils/contact';

/** Enhance the prerendered homepage without downloading the React application. */
export function enhanceHome() {
  const loadPreview = (image: HTMLImageElement) => {
    if (image.dataset.deferredSizes) image.sizes = image.dataset.deferredSizes;
    if (image.dataset.deferredSrcset) image.srcset = image.dataset.deferredSrcset;
    image.loading = 'eager';
    image.src = image.dataset.deferredSrc!;
    delete image.dataset.deferredSrc;
    delete image.dataset.deferredSrcset;
    delete image.dataset.deferredSizes;
  };
  const previews = document.querySelectorAll<HTMLImageElement>('img[data-deferred-src]');
  if (typeof IntersectionObserver === 'undefined') {
    previews.forEach(loadPreview);
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadPreview(entry.target as HTMLImageElement);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '350px' });
    previews.forEach((image) => observer.observe(image));
  }

  const nav = document.querySelector<HTMLElement>('.personal-nav')!;
  const menuButton = nav.querySelector<HTMLButtonElement>('.personal-menu-toggle')!;
  const menu = document.getElementById(menuButton.getAttribute('aria-controls')!)!;
  const setMenu = (open: boolean) => {
    nav.dataset.menuOpen = String(open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', (open ? menuButton.dataset.menuCloseLabel : menuButton.dataset.menuOpenLabel)!);
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setMenu(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target as Node)) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget as Node | null)) setMenu(false);
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  let theme = getStoredTheme();
  const themeButton = nav.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;
  const updateTheme = () => {
    applyThemeClass(theme);
    (themeButton.firstElementChild as HTMLElement).style.transform = `rotate(${theme === 'dark' ? 180 : 0}deg)`;
    themeButton.querySelectorAll<SVGElement>('[data-theme-icon]').forEach((icon) => {
      icon.style.display = icon.dataset.themeIcon === theme ? 'block' : 'none';
    });
  };
  updateTheme();
  themeButton.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    try { localStorage.setItem('theme', theme); } catch { /* Storage may be disabled. */ }
    updateTheme();
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme === 'system') updateTheme();
  });

  const languageLink = nav.querySelector<HTMLAnchorElement>('a[hreflang]')!;
  const updateLanguageLink = () => { languageLink.hash = window.location.hash; };
  updateLanguageLink();
  window.addEventListener('hashchange', updateLanguageLink);
  languageLink.addEventListener('click', (event) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try { localStorage.setItem('site-language', languageLink.hreflang); } catch { /* Storage may be disabled. */ }
    rememberLanguageScroll(languageLink.pathname, window.scrollY);
  });
  const top = getLanguageScroll(window.location.pathname);
  if (top !== null) {
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: 'instant' });
      requestAnimationFrame(() => {
        window.scrollTo({ top, behavior: 'instant' });
        clearLanguageScroll(window.location.pathname);
      });
    });
  }

  const form = document.querySelector<HTMLFormElement>('.personal-form')!;
  form.querySelector('fieldset')!.disabled = false;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const idleLabel = submit.querySelector<HTMLElement>('[data-submit-idle]')!;
  const pendingLabel = submit.querySelector<HTMLElement>('[data-submit-pending]')!;
  const feedback = form.querySelector<HTMLElement>('[aria-live]')!;
  let status = 'idle';
  const showFeedback = (message: string, success = false) => {
    const paragraph = document.createElement('p');
    paragraph.className = success ? 'flex items-center gap-2 text-emerald-400' : 'text-red-400';
    if (success) {
      const template = document.createElement('template');
      template.innerHTML = '<svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
      paragraph.append(template.content);
    }
    paragraph.append(document.createTextNode(message));
    feedback.replaceChildren(paragraph);
  };
  form.addEventListener('input', () => {
    if (status === 'error') {
      status = 'idle';
      feedback.replaceChildren();
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status === 'sending' || !form.reportValidity()) return;
    status = 'sending';
    feedback.replaceChildren();
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    idleLabel.style.display = 'none';
    pendingLabel.style.display = 'inline-flex';
    try {
      const data = new FormData(form);
      const fields = Object.fromEntries(Object.keys(emptyContactForm).map((key) => [key, String(data.get(key) ?? '')])) as ContactFields;
      await submitContact(fields, form.dataset.contactError!);
      form.reset();
      status = 'success';
      showFeedback(form.dataset.contactSent!, true);
    } catch (error) {
      status = 'error';
      showFeedback(error instanceof Error ? error.message : form.dataset.contactError!);
    } finally {
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
      idleLabel.style.display = 'inline-flex';
      pendingLabel.style.display = 'none';
    }
  });

}
