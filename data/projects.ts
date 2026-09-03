import imageManifest from './image-manifest.json';
import { Language, Project } from '../types';
import siteEn from '../content/site.json';
import sitePl from '../content/site.pl.json';
import omniVideo from '../assets/omni-teaser.mp4';

const omniImage = imageManifest['assets/omni.jpeg'].src;
const solvee1 = imageManifest['assets/solvee-sc/solvee1.webp'].src;
const solvee2 = imageManifest['assets/solvee-sc/solvee2.webp'].src;
const solvee3 = imageManifest['assets/solvee-sc/solvee3.webp'].src;
const solvee4 = imageManifest['assets/solvee-sc/solvee4.webp'].src;
const solveeLogo = imageManifest['assets/solvee-logo.png'].src;
const subby1 = imageManifest['assets/subby-sc/subby1.png'].src;
const subby2 = imageManifest['assets/subby-sc/subby2.png'].src;
const subby3 = imageManifest['assets/subby-sc/subby3.png'].src;
const subbyLogo = imageManifest['assets/subby-logo.png'].src;
const doso1 = imageManifest['assets/doso-sc/doso1.png'].src;
const doso2 = imageManifest['assets/doso-sc/doso2.png'].src;
const doso3 = imageManifest['assets/doso-sc/doso3.png'].src;
const doso4 = imageManifest['assets/doso-sc/doso4.png'].src;
const doso5 = imageManifest['assets/doso-sc/doso5.png'].src;
const dosoLogo = imageManifest['assets/doso-logo.png'].src;
const trailoIcon = imageManifest['assets/trailo-icon.png'].src;
const trailoMobile1 = imageManifest['assets/trailo-mobile-sc/trailo-mobile-1.png'].src;
const trailoMobile2 = imageManifest['assets/trailo-mobile-sc/trailo-mobile-2.png'].src;
const trailoMobile3 = imageManifest['assets/trailo-mobile-sc/trailo-mobile-3.png'].src;
const trailoMobile4 = imageManifest['assets/trailo-mobile-sc/trailo-mobile-4.png'].src;
const twojaSiecLogo = imageManifest['assets/twojasiec/twojasiec-logo.jpeg'].src;
const twojaSiecFeed = imageManifest['assets/twojasiec/twojasiec-feed.jpeg'].src;
const twojaSiecEventDetails = imageManifest['assets/twojasiec/twojasiec-event-details.jpeg'].src;
const twojaSiecEvents = imageManifest['assets/twojasiec/twojasiec-events.jpeg'].src;
const twojaSiecAlerts = imageManifest['assets/twojasiec/twojasiec-alerts.jpeg'].src;
const justMineHome = imageManifest['assets/justmine/justmine-home.jpg'].src;
const justMineExamples = imageManifest['assets/justmine/justmine-examples.jpg'].src;
const justMineHowItWorks = imageManifest['assets/justmine/justmine-how-it-works.jpg'].src;
const justMineStep4 = imageManifest['assets/justmine/justmine-create-step-4.jpg'].src;
const justMinePricing = imageManifest['assets/justmine/justmine-pricing.jpg'].src;
const justMineLogo = imageManifest['assets/justmine/justmine-logo.png'].src;
const safeLabsLogo = imageManifest['assets/safelabs/safelabs-logo.png'].src;
const safeLabsHome = imageManifest['assets/safelabs/safelabs-home.jpg'].src;
const safeLabsPasswordCheck = imageManifest['assets/safelabs/safelabs-password-check.jpg'].src;
const safeLabsEbook = imageManifest['assets/safelabs/safelabs-ebook.jpg'].src;
const dragonLogo = imageManifest['assets/dragon/dragon-logo.png'].src;
const dragonHome = imageManifest['assets/dragon/dragon-home.jpg'].src;
const dragonClasses = imageManifest['assets/dragon/dragon-classes.jpg'].src;
const dragonSignup = imageManifest['assets/dragon/dragon-signup.jpg'].src;
// const platoicLogo = imageManifest['assets/platoic-logo.png'].src;

export const SHOW_OMNI = false;
export const SHOW_PLATOIC = false;
export const FEATURED_PROJECT_IDS = ['justmine', 'solvee', 'trailo', 'subby'];
const PORTFOLIO_ONLY_PROJECT_IDS = new Set(['dragon']);
const PROJECT_ORDER = [
  'justmine',
  'solvee',
  'trailo',
  'doso',
  'subby',
  'twojasiec',
  'safelabs',
  'dragon',
  'omni',
] as const;

function buildAllProjects(language: Language): Project[] {
  const isPl = language === 'pl';
  const site = (isPl ? sitePl : siteEn) as typeof siteEn;
  const tr = (english: string, polish: string) => isPl ? polish : english;

  return [
  {
    id: 'justmine',
    name: 'Charmy Books',
    tagline: site.projects.justmine.tagline,
    description: site.projects.justmine.description,
    whyBuiltIt: tr(
      "Personalized children's books have existed for years, but most personalization stops at changing a name or inserting a few predefined details. I wanted to see what becomes possible when the entire story and visual world can be generated specifically for one child, while still producing something coherent enough to feel like a real book rather than a collection of AI outputs.",
      'Spersonalizowane książki dla dzieci istnieją od lat, ale w większości z nich personalizacja kończy się na zmianie imienia lub dodaniu kilku wcześniej zdefiniowanych szczegółów. Chciałem sprawdzić, co staje się możliwe, gdy cała historia i jej wizualny świat powstają specjalnie dla jednego dziecka, a jednocześnie pozostają na tyle spójne, by całość przypominała prawdziwą książkę, a nie zbiór wyników wygenerowanych przez AI.',
    ),
    tags: isPl ? ['Dzieci', 'Personalizacja', 'Internet', 'AI'] : ['Kids', 'Personalization', 'Web', 'AI'],
    platform: tr('Web app', 'Aplikacja internetowa'),
    category: tr('Personalized Publishing', 'Książki personalizowane'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Design to launch', 'Od projektu po wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://charmybooks.com',
    linkText: site.projects.justmine.link_text,
    icon: justMineLogo,
    iconStyle: 'wordmark',
    image: justMineHome,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: justMineHome, alt: tr('Charmy Books website home page', 'Strona główna Charmy Books'), variant: 'desktop' },
      { src: justMineExamples, alt: tr('Charmy Books story types and use cases', 'Rodzaje historii i zastosowania Charmy Books'), variant: 'desktop' },
      { src: justMineHowItWorks, alt: tr('How creating a personalized Charmy Books book works', 'Jak działa tworzenie spersonalizowanej książki w Charmy Books'), variant: 'desktop' },
      { src: justMineStep4, alt: tr('Charmy Books book creator - personalized story ideas', 'Kreator książki Charmy Books - spersonalizowane pomysły na historie'), variant: 'desktop' },
      { src: justMinePricing, alt: tr('Charmy Books formats and pricing', 'Formaty i ceny Charmy Books'), variant: 'desktop' },
    ],
    technologies: [
      { label: tr('AI systems', 'Systemy AI'), items: tr('xAI Grok and Grok Imagine for structured story generation, image generation, and character-consistent visual pipelines', 'xAI Grok i Grok Imagine do strukturyzowanego generowania historii, ilustracji i pipeline’ów zachowujących spójność postaci') },
      { label: tr('Generation architecture', 'Architektura generowania'), items: tr('Asynchronous generation with durable Supabase queues, Railway workers, retries, idempotency, and streamed progress', 'Asynchroniczne generowanie z trwałymi kolejkami Supabase, workerami Railway, ponawianiem zadań, idempotencją i strumieniowaniem postępu') },
      { label: tr('Product platform', 'Platforma produktu'), items: 'Next.js, React, TypeScript, Tailwind CSS, Vercel AI SDK, Zod' },
      { label: tr('Data & security', 'Dane i bezpieczeństwo'), items: tr('Supabase PostgreSQL, authentication, private storage, signed uploads, and row-level access controls', 'Supabase PostgreSQL, uwierzytelnianie, prywatny storage, podpisane uploady i kontrola dostępu na poziomie rekordów') },
      { label: tr('Commerce', 'Sprzedaż'), items: tr('Stripe Checkout and webhooks, paid-generation gating, and Lulu print-on-demand fulfillment', 'Stripe Checkout i webhooki, uruchamianie dalszego generowania po płatności oraz realizacja druku na żądanie przez Lulu') },
    ],
  },
  {
    id: 'safelabs',
    name: 'Safe Labs',
    tagline: site.projects.safelabs.tagline,
    description: site.projects.safelabs.description,
    tags: isPl ? ['Strona', 'Edukacja', 'Cyberbezpieczeństwo'] : ['Website', 'Education', 'Cybersecurity'],
    platform: tr('Website', 'Strona internetowa'),
    category: tr('Cybersecurity', 'Cyberbezpieczeństwo'),
    role: tr('Co-organizer · Design & development', 'Współorganizator · Projekt i wdrożenie'),
    scope: tr('Design & development', 'Projekt i wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://safelabs.pl/',
    linkText: site.projects.safelabs.link_text,
    icon: safeLabsLogo,
    image: safeLabsHome,
    imageFit: 'contain',
    layout: 'web',
    screenshots: [
      { src: safeLabsHome, alt: tr('Safe Labs cybersecurity workshops website', 'Strona warsztatów Safe Labs z cyberbezpieczeństwa'), variant: 'desktop', fit: 'contain' },
      { src: safeLabsPasswordCheck, alt: tr('Safe Labs password strength audit tool', 'Narzędzie Safe Labs do audytu siły hasła'), variant: 'desktop' },
      { src: safeLabsEbook, alt: tr('Safe Labs cybersecurity e-book page', 'Strona e-booka Safe Labs o cyberbezpieczeństwie'), variant: 'desktop' },
    ],
    technologies: [
      { label: tr('Web platform', 'Platforma webowa'), items: 'React 19, TypeScript, Vite, React Router, Framer Motion' },
      { label: tr('Password-audit engine', 'Silnik audytu haseł'), items: tr('zxcvbn extended with a custom Polish corpus and a 50k-word frequency list, running in a dedicated Web Worker so analysis stays responsive and the password never leaves the browser', 'zxcvbn rozszerzony o autorski polski korpus i listę 50 tys. najczęstszych słów, uruchamiany w dedykowanym Web Workerze, dzięki czemu analiza pozostaje płynna, a hasło nigdy nie opuszcza przeglądarki') },
      { label: tr('Data infrastructure', 'Infrastruktura danych'), items: tr('Supabase PostgreSQL for workshop inquiries and e-book delivery telemetry', 'Supabase PostgreSQL do obsługi zgłoszeń na warsztaty i telemetrii dystrybucji e-booka') },
    ],
  },
  {
    id: 'dragon',
    name: 'UKS Dragon Mokrzyska',
    tagline: site.projects.dragon.tagline,
    description: site.projects.dragon.description,
    tags: isPl ? ['Strona', 'Sport', 'Klub sportowy'] : ['Website', 'Sports', 'Sports Club'],
    platform: tr('Website', 'Strona internetowa'),
    category: tr('Sports & Community', 'Sport i społeczność'),
    role: tr('Product designer & developer', 'Projektant i developer'),
    scope: tr('Design & development', 'Projekt i wdrożenie'),
    operatingSystem: 'Web',
    link: 'https://uksdragonmokrzyska.vercel.app/',
    linkText: site.projects.dragon.link_text,
    icon: dragonLogo,
    image: dragonHome,
    imageFit: 'cover',
    layout: 'web',
    screenshots: [
      { src: dragonHome, alt: tr('UKS Dragon Mokrzyska sports club website', 'Strona klubu sportowego UKS Dragon Mokrzyska'), variant: 'desktop' },
      { src: dragonClasses, alt: tr('UKS Dragon Mokrzyska training schedule', 'Harmonogram zajęć UKS Dragon Mokrzyska'), variant: 'desktop' },
      { src: dragonSignup, alt: tr('UKS Dragon Mokrzyska enrollment form', 'Formularz zapisów UKS Dragon Mokrzyska'), variant: 'desktop' },
    ],
    technologies: [
      { label: tr('Web platform', 'Platforma webowa'), items: 'Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4' },
      { label: tr('Content management', 'Zarządzanie treścią'), items: tr('Custom admin panel with Tiptap rich-text editing for news, galleries, sports sections, tournaments, and page content', 'Autorski panel administracyjny z edytorem tekstu Tiptap do aktualności, galerii, sekcji sportowych, turniejów i treści stron') },
      { label: tr('Data & security', 'Dane i bezpieczeństwo'), items: tr('Supabase PostgreSQL, authentication, image storage, and row-level security policies', 'Supabase PostgreSQL, uwierzytelnianie, przechowywanie zdjęć i polityki bezpieczeństwa na poziomie rekordów') },
      { label: tr('Club operations', 'Obsługa klubu'), items: tr('Server Actions, enrollment workflows, consent tracking, admin filtering, CSV exports, and incremental revalidation', 'Server Actions, obsługa zapisów, ewidencja zgód, filtrowanie w panelu, eksport CSV i przyrostowe odświeżanie treści') },
    ],
  },
  {
    id: 'trailo',
    name: 'Trailo',
    tagline: site.projects.trailo.tagline,
    description: site.projects.trailo.description,
    whyBuiltIt: tr(
      'I love traveling, but planning a trip still means stitching together flights, hotels, places, opening hours, tickets, routes, budgets and notes across a dozen different tools. I wanted to rethink the experience from the ground up: instead of building another itinerary generator, I treated the entire trip as one connected system and built Trailo around everything a traveler needs before and during the journey.',
      'Uwielbiam podróżować, ale planowanie wyjazdu nadal oznacza łączenie lotów, hoteli, miejsc, godzin otwarcia, biletów, tras, budżetów i notatek rozsianych po kilkunastu różnych narzędziach. Chciałem przemyśleć to doświadczenie od podstaw: zamiast tworzyć kolejny generator planu podróży, potraktowałem cały wyjazd jako jeden połączony system i zbudowałem Trailo wokół wszystkiego, czego podróżnik potrzebuje przed podróżą i w jej trakcie.',
    ),
    tags: isPl ? ['Podróże', 'Internet', 'Aplikacja mobilna', 'AI'] : ['Travel', 'Web', 'Mobile App', 'AI'],
    platform: 'Web · iOS · Android',
    category: tr('AI Travel', 'Podróże z AI'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Full product · design to launch', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    operatingSystem: 'Web, iOS, Android',
    link: 'https://trailoapp.com',
    linkText: site.projects.trailo.link_text,
    appStoreLink: 'https://apps.apple.com/us/app/trailo-ai-trip-planner/id6767237924',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.trailo',
    icon: trailoIcon,
    image: trailoMobile1,
    layout: 'split',
    screenshots: [
      { src: trailoMobile1, alt: tr('Trailo mobile trip plan with map and itinerary', 'Mobilny plan podróży Trailo z mapą i harmonogramem'), variant: 'phone' },
      { src: trailoMobile2, alt: tr('Trailo mobile trip overview with flights', 'Podsumowanie podróży i lotów w Trailo'), variant: 'phone' },
      { src: trailoMobile3, alt: tr('Trailo mobile attraction tickets', 'Bilety do atrakcji w aplikacji Trailo'), variant: 'phone' },
      { src: trailoMobile4, alt: tr('Trailo mobile trip budget', 'Budżet podróży w aplikacji Trailo'), variant: 'phone' },
    ],
    technologies: [
      { label: tr('Multi-agent AI', 'System wieloagentowy AI'), items: tr('Multi-agent orchestration using xAI Grok and the OpenAI Responses API, with specialized research, planning, validation, and guardian agents', 'Orkiestracja wielu agentów wykorzystująca xAI Grok i OpenAI Responses API, ze specjalizowanymi agentami do researchu, planowania, walidacji i kontroli jakości') },
      { label: tr('Agent infrastructure', 'Infrastruktura agentowa'), items: tr('Native web search, structured outputs, tool calling, multi-pass evaluation, usage tracking, and durable background jobs', 'Natywne wyszukiwanie internetowe, strukturyzowane odpowiedzi, wywoływanie narzędzi, wieloetapowa ewaluacja, monitoring użycia i trwałe zadania w tle') },
      { label: tr('Cross-platform architecture', 'Architektura wieloplatformowa'), items: tr('Next.js, React, Expo, React Native, TypeScript, and Turborepo with shared types and domain logic', 'Next.js, React, Expo, React Native, TypeScript i Turborepo ze współdzielonymi typami i logiką domenową') },
      { label: tr('Data & security', 'Dane i bezpieczeństwo'), items: tr('Supabase PostgreSQL, authentication, storage, RLS, durable jobs, and end-to-end encryption', 'Supabase PostgreSQL, uwierzytelnianie, storage, RLS, trwałe zadania i szyfrowanie end-to-end') },
      { label: tr('Travel intelligence', 'Inteligencja podróżna'), items: tr('MapLibre, HERE, LiteAPI, Tripadvisor, Wikipedia, Wikidata, and live exchange-rate data', 'MapLibre, HERE, LiteAPI, Tripadvisor, Wikipedia, Wikidata i dane kursów walut w czasie rzeczywistym') },
      { label: tr('Commerce & deployment', 'Płatności i wdrożenie'), items: tr('Stripe, RevenueCat, Railway, Vercel, and native push-notification delivery', 'Stripe, RevenueCat, Railway, Vercel i natywna obsługa powiadomień push') },
    ],
  },
  {
    id: 'twojasiec',
    name: 'Twoja Sieć',
    tagline: site.projects.twojasiec.tagline,
    description: site.projects.twojasiec.description,
    tags: isPl
      ? ['Lokalne informacje', 'Wydarzenia', 'Aplikacja mobilna']
      : ['Local News', 'Events', 'Mobile App'],
    platform: tr('Mobile app', 'Aplikacja mobilna'),
    category: tr('Local Information', 'Lokalne informacje'),
    role: tr('Product designer & developer', 'Projektant i developer'),
    scope: tr('Product design & development', 'Projekt produktu i aplikacji'),
    status: site.projects.twojasiec.status,
    icon: twojaSiecLogo,
    image: twojaSiecFeed,
    layout: 'split',
    screenshots: [
      { src: twojaSiecFeed, alt: tr('Twoja Sieć personalized local news feed', 'Spersonalizowany lokalny feed aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecEventDetails, alt: tr('Twoja Sieć local event details', 'Szczegóły lokalnego wydarzenia w aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecEvents, alt: tr('Twoja Sieć local events calendar', 'Kalendarz lokalnych wydarzeń w aplikacji Twoja Sieć'), variant: 'phone' },
      { src: twojaSiecAlerts, alt: tr('Twoja Sieć local safety and traffic alerts', 'Lokalne alerty bezpieczeństwa i drogowe w aplikacji Twoja Sieć'), variant: 'phone' },
    ],
    technologies: [
      { label: tr('Mobile stack', 'Stack mobilny'), items: 'Expo, React Native, React, TypeScript' },
      { label: tr('Location', 'Lokalizacja'), items: tr('Device geolocation, reverse geocoding, and radius-based personalization', 'Geolokalizacja urządzenia, geokodowanie odwrotne i personalizacja według promienia') },
      { label: tr('Native integrations', 'Integracje natywne'), items: tr('Calendar event creation, map routing, in-app browsing, and native sharing', 'Tworzenie wydarzeń w kalendarzu, nawigacja w mapach, przeglądarka w aplikacji i natywne udostępnianie') },
    ],
  },
  {
    id: 'subby',
    name: 'Subby',
    tagline: site.projects.subby.tagline,
    description: site.projects.subby.description,
    outcome: tr('Helps people track subscriptions and trials before they turn into unwanted charges.', 'Pomaga kontrolować subskrypcje i okresy próbne, zanim zmienią się w niechciane opłaty.'),
    whyBuiltIt: tr(
      'I kept losing money on free trials and subscriptions I forgot to cancel. Instead of relying on calendar reminders or constantly checking my bank account, I wanted one simple place that knew what I was subscribed to, when I would be charged, and warned me beforehand. So I built Subby.',
      'Ciągle traciłem pieniądze na darmowe okresy próbne i subskrypcje, których zapominałem anulować. Zamiast polegać na przypomnieniach w kalendarzu lub ciągle sprawdzać konto bankowe, chciałem mieć jedno proste miejsce, które wie, co subskrybuję, kiedy zostanie pobrana kolejna opłata i ostrzeże mnie wcześniej. Dlatego stworzyłem Subby.',
    ),
    tags: isPl ? ['FinTech', 'Finanse', 'Aplikacja mobilna'] : ['FinTech', 'Utility', 'Mobile App'],
    platform: 'iOS · Android',
    category: tr('Finance & Utility', 'Finanse osobiste'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Full product · design to deploy', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    appStoreLink: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.subby',
    icon: subbyLogo,
    image: subby1,
    layout: 'split',
    screenshots: [
      { src: subby1, alt: tr('Subby overview dashboard', 'Panel główny aplikacji Subby'), variant: 'phone' },
      { src: subby2, alt: tr('Subby subscriptions list', 'Lista subskrypcji w aplikacji Subby'), variant: 'phone' },
      { src: subby3, alt: tr('Subby spending analytics', 'Analiza wydatków w aplikacji Subby'), variant: 'phone' },
    ],
    technologies: [
      { label: tr('Mobile stack', 'Stack mobilny'), items: 'Expo, React Native, React, TypeScript, Expo Router' },
      { label: tr('Local-first data', 'Dane local-first'), items: tr('AsyncStorage-backed multi-profile subscription data, preferences, currencies, and notification state', 'Dane subskrypcji dla wielu profili, preferencje, waluty i stan powiadomień przechowywane lokalnie w AsyncStorage') },
      { label: tr('Bank intelligence', 'Analiza bankowa'), items: tr('Enable Banking open-banking integration, Cloudflare Workers, recurring-payment detection, and xAI Grok with web search for merchant classification', 'Integracja open banking z Enable Banking, Cloudflare Workers, wykrywanie płatności cyklicznych oraz xAI Grok z wyszukiwaniem internetowym do klasyfikacji sprzedawców') },
      { label: tr('Native experience', 'Funkcje natywne'), items: tr('Renewal and trial notifications, plus app quick actions', 'Powiadomienia o odnowieniach i okresach próbnych oraz szybkie akcje aplikacji') },
      { label: tr('Commerce & support', 'Płatności i zaplecze'), items: tr('RevenueCat subscriptions and entitlements, plus Supabase authentication and PostgreSQL for feedback and legacy account migration', 'Subskrypcje i uprawnienia RevenueCat oraz Supabase Auth i PostgreSQL do obsługi opinii i migracji starszych kont') },
    ],
  },
  {
    id: 'doso',
    name: 'Doso',
    tagline: site.projects.doso.tagline,
    description: site.projects.doso.description,
    whyBuiltIt: tr(
      'Health information is usually fragmented across medication reminders, lab reports, notes and separate health apps. I wanted to explore what a personal health system could look like if those pieces shared context, while keeping sensitive data local and treating reliability and safety as core engineering constraints rather than afterthoughts.',
      'Informacje o zdrowiu są zwykle rozproszone między przypomnieniami o lekach, wynikami badań, notatkami i osobnymi aplikacjami zdrowotnymi. Chciałem sprawdzić, jak mógłby wyglądać osobisty system zdrowotny, gdyby wszystkie te elementy współdzieliły kontekst, a wrażliwe dane pozostawały lokalnie na urządzeniu, zaś niezawodność i bezpieczeństwo były podstawowymi wymaganiami technicznymi, a nie dodatkiem na końcu.',
    ),
    tags: isPl ? ['Zdrowie', 'Aplikacja mobilna', 'AI'] : ['Health', 'Mobile App', 'AI'],
    platform: 'iOS',
    category: tr('Health & Wellness', 'Zdrowie'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Full product · design to launch', 'Kompleksowa realizacja · od projektu po wdrożenie'),
    appStoreLink: 'https://apps.apple.com/app/doso-pill-reminder-tracker/id6761341859',
    icon: dosoLogo,
    image: doso1,
    layout: 'split',
    screenshots: [
      { src: doso1, alt: tr('Doso home dashboard', 'Panel główny aplikacji Doso'), variant: 'phone' },
      { src: doso2, alt: tr('Doso lab results analysis', 'Analiza wyników badań w aplikacji Doso'), variant: 'phone' },
      { src: doso3, alt: tr('Doso medication interaction warning', 'Ostrzeżenie o interakcji leków w aplikacji Doso'), variant: 'phone' },
      { src: doso4, alt: tr('Doso voice medication input', 'Głosowe dodawanie leków w aplikacji Doso'), variant: 'phone' },
      { src: doso5, alt: tr('Doso profile management', 'Zarządzanie profilem w aplikacji Doso'), variant: 'phone' },
    ],
    technologies: [
      { label: tr('Mobile stack', 'Stack mobilny'), items: 'Expo, React Native, React, TypeScript, Expo Router, Zustand' },
      { label: tr('AI health assistant', 'Asystent zdrowotny AI'), items: tr('xAI Grok behind a rate-limited Cloudflare Worker for health chat, medication parsing, and structured interaction checks with server-side safety rules', 'xAI Grok za limitowanym Cloudflare Workerem do czatu zdrowotnego, rozpoznawania leków i strukturyzowanego sprawdzania interakcji z regułami bezpieczeństwa po stronie serwera') },
      { label: tr('Health data & privacy', 'Dane zdrowotne i prywatność'), items: tr('Local-first SQLite health records, SecureStore preferences, isolated multi-profile stores, and device-backup restrictions', 'Lokalne dane zdrowotne w SQLite, preferencje w SecureStore, odseparowane magazyny danych dla wielu profili i ograniczenia kopii zapasowych urządzenia') },
      { label: tr('Medication engine', 'System leków'), items: tr('Dose scheduling, adherence and refill calculations, Expo Notifications, and exact critical alarms with Notifee', 'Harmonogramowanie dawek, obliczanie regularności i terminów uzupełnienia leków, Expo Notifications oraz dokładne alarmy krytyczne z Notifee') },
      { label: tr('Voice & reports', 'Głos i raporty'), items: tr('Native speech recognition for medication entry and localized PDF health reports with printing, file export, and sharing', 'Natywne rozpoznawanie mowy do dodawania leków oraz lokalizowane raporty zdrowotne PDF z drukowaniem, eksportem plików i udostępnianiem') },
      { label: tr('Subscriptions', 'Subskrypcje'), items: tr('RevenueCat purchases with server-side Pro entitlement validation at the AI gateway', 'Płatności RevenueCat z weryfikacją uprawnień Pro po stronie serwera w bramce AI') },
    ],
  },
  {
    id: 'solvee',
    name: 'Solvee',
    tagline: site.projects.solvee.tagline,
    description: site.projects.solvee.description,
    whyBuiltIt: tr(
      'I noticed that getting an answer to a school problem was easy, but getting an explanation that actually helped you understand it was not. I built Solvee around that distinction: take any problem, whether photographed or typed, understand what kind of problem it is, and turn the answer into a structured, interactive learning experience.',
      'Zauważyłem, że łatwo jest dostać odpowiedź na szkolne zadanie, ale znacznie trudniej znaleźć wyjaśnienie, które naprawdę pomaga je zrozumieć. Zbudowałem Solvee wokół tej różnicy: aplikacja przyjmuje dowolne zadanie, sfotografowane lub wpisane, rozpoznaje jego rodzaj i zamienia odpowiedź w uporządkowane, interaktywne doświadczenie edukacyjne.',
    ),
    tags: isPl ? ['Aplikacja mobilna', 'Edukacja', 'AI'] : ['Mobile App', 'Education', 'AI'],
    platform: 'iOS · Android',
    category: tr('Education · AI', 'Edukacja · AI'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Built & sold · 25K+ downloads', 'Stworzenie i sprzedaż · 25 tys. pobrań'),
    status: site.projects.solvee.status,
    icon: solveeLogo,
    image: solvee1,
    layout: 'split',
    screenshots: [
      { src: solvee1, alt: tr('Solvee camera scan for math exercises', 'Skanowanie zadania matematycznego aparatem w Solvee'), variant: 'phone' },
      { src: solvee2, alt: tr('Solvee step-by-step math solution', 'Rozwiązanie zadania krok po kroku w Solvee'), variant: 'phone' },
      { src: solvee3, alt: tr('Solvee AI tools home screen', 'Ekran główny narzędzi AI w Solvee'), variant: 'phone' },
      { src: solvee4, alt: tr('Solvee app screenshot', 'Zrzut ekranu aplikacji Solvee'), variant: 'phone' },
    ],
    technologies: [
      { label: tr('Mobile stack', 'Stack mobilny'), items: 'Expo, React Native, React, TypeScript, Expo Router' },
      { label: tr('Multimodal AI routing', 'Multimodalny routing AI'), items: tr('Gemini 2.5 Flash classifies photographed or typed exercises by subject and routes them through specialized pipelines for mathematics, sciences, humanities, and languages', 'Gemini 2.5 Flash klasyfikuje sfotografowane lub wpisane zadania według przedmiotu i kieruje je do wyspecjalizowanych pipeline’ów dla matematyki, nauk ścisłych, humanistyki i języków') },
      { label: tr('Learning generation', 'Generowanie materiałów'), items: tr('Structured step-by-step solutions, contextual follow-up tutoring, generated practice exercises and quizzes, translation, vocabulary, presentations, and lesson notes', 'Strukturyzowane rozwiązania krok po kroku, kontekstowy tutoring w kolejnych pytaniach oraz generowanie ćwiczeń, quizów, tłumaczeń, słownictwa, prezentacji i notatek z lekcji') },
      { label: tr('Technical content', 'Treści techniczne'), items: tr('Custom structured-response blocks with LaTeX, MathJax, and KaTeX rendering plus interactive Desmos integration', 'Autorski system bloków strukturyzowanej odpowiedzi z renderowaniem LaTeX, MathJax i KaTeX oraz interaktywną integracją z Desmos') },
      { label: tr('Backend & commerce', 'Backend i płatności'), items: tr('Firebase Authentication, Firestore, Cloud Functions, Analytics, and RevenueCat entitlement management', 'Firebase Authentication, Firestore, Cloud Functions, Analytics oraz zarządzanie uprawnieniami przez RevenueCat') },
    ],
  },
  // {
  //   id: 'platoic',
  //   name: 'Platoic',
  //   tagline: site.projects.platoic.tagline,
  //   description: site.projects.platoic.description,
  //   tags: ['Education', 'AI', 'Web'],
  //   platform: 'Web',
  //   category: 'EdTech · AI',
  //   scope: 'Full product · in development',
  //   status: site.projects.platoic.status,
  //   icon: platoicLogo,
  //   image: platoicLogo,
  //   screenshots: [
  //     { src: platoicLogo, alt: 'Platoic learning platform brand', variant: 'wide', caption: 'Product identity' },
  //   ],
  // },
  {
    id: 'omni',
    name: 'Omni',
    tagline: site.projects.omni.tagline,
    description: site.projects.omni.description,
    outcome: tr('Desktop AI assistant that understands your files, email, and workflow.', 'Asystent AI na komputer, który rozumie Twoje pliki, pocztę i sposób pracy.'),
    link: 'https://heyomni.app',
    tags: isPl ? ['AI', 'Produktywność', 'Desktop'] : ['AI', 'Productivity', 'Desktop'],
    platform: 'macOS · Windows',
    category: tr('AI Productivity', 'Produktywność z AI'),
    role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i rozwój produktu'),
    scope: tr('Full product · early access', 'Kompleksowa realizacja · wczesny dostęp'),
    status: site.projects.omni.status,
    video: omniVideo,
    image: omniImage,
    linkText: site.projects.omni.link_text,
    screenshots: [
      { src: omniImage, alt: tr('Omni AI assistant interface', 'Interfejs asystenta AI Omni'), variant: 'desktop', caption: tr('AI that knows your computer', 'AI, które zna Twój komputer') },
    ],
  },
  ];
}

function getVisibleProjects(language: Language): Project[] {
  return buildAllProjects(language)
    .filter(
      (project) =>
        (SHOW_OMNI || project.id !== 'omni') &&
        (SHOW_PLATOIC || project.id !== 'platoic'),
    )
    .sort((a, b) => {
      const aIndex = PROJECT_ORDER.indexOf(a.id as (typeof PROJECT_ORDER)[number]);
      const bIndex = PROJECT_ORDER.indexOf(b.id as (typeof PROJECT_ORDER)[number]);
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
        (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    });
}

export function getProjects(language: Language = 'en'): Project[] {
  return getVisibleProjects(language).filter((project) => !PORTFOLIO_ONLY_PROJECT_IDS.has(project.id));
}

export function getPortfolioProjects(language: Language = 'en'): Project[] {
  return getVisibleProjects(language);
}

export function getProjectById(id: string, language: Language = 'en'): Project | undefined {
  return getPortfolioProjects(language).find((project) => project.id === id);
}

export function getFeaturedProjects(language: Language = 'en'): Project[] {
  const site = language === 'pl' ? sitePl : siteEn;
  return FEATURED_PROJECT_IDS.flatMap((id) => {
    const project = getProjectById(id, language);
    if (!project) return [];
    const copy = site.projects[id as keyof typeof site.projects];
    return [{ ...project, description: typeof copy === 'object' && 'homepage_description' in copy
      ? copy.homepage_description : project.description }];
  });
}
