import type { Language, Project } from '../types';
import { getProjectById } from './projects';
import { getStoryPath, type StoryId } from '../utils/localizedRoutes';

export interface ProjectStory {
  id: StoryId;
  project: Project;
  path: string;
  kind: string;
  title: string;
  summary: string;
  role: string;
  outcome: string;
  /** A recorded result (downloads, a ranking). Left out when a project has none. */
  stat?: { value: string; label: string };
  /** A plain one-line description shown under the title when there is no figure. */
  note?: string;
  /** Screenshot indices shown on the card and story cover. */
  cover: number[];
  sections: { title: string; body: string }[];
  /** Screenshots placed after the section with index `after`. */
  evidence: { index: number; after: number; caption: string }[];
  action: { label: string; href: string };
}

export function getStories(language: Language): ProjectStory[] {
  const tr = (en: string, pl: string) => language === 'pl' ? pl : en;
  const make = (id: StoryId, story: Omit<ProjectStory, 'id' | 'project' | 'path'>): ProjectStory => ({
    id, project: getProjectById(id, language)!, path: getStoryPath(id, language), ...story,
  });
  return [
    make('jedziemy', {
      kind: tr('Project notes · ongoing', 'O projekcie · w rozwoju'),
      title: tr('An app for running a driving school.', 'Aplikacja do prowadzenia szkoły jazdy.'),
      summary: tr('Together with Marcel Chudyba, I’m building an app for driving schools. Instructors propose a lesson, students confirm it in the app, and the office sees hours and payments without phoning anyone.', 'Razem z Marcelem Chudybą buduję aplikację dla szkół jazdy. Instruktor proponuje termin, kursant potwierdza go w aplikacji, a biuro widzi godziny i wpłaty bez dzwonienia.'),
      role: tr('Co-founder · Product design & engineering', 'Współzałożyciel · Projekt i programowanie'),
      outcome: tr('An ongoing project with Marcel Chudyba', 'Projekt rozwijany z Marcelem Chudybą'),
      note: tr('The office plans lessons and tracks hours and payments in a web dashboard. Instructors and students book lessons in a mobile app, where students also learn theory.', 'Biuro planuje jazdy i pilnuje godzin oraz wpłat w panelu w przeglądarce. Instruktorzy i kursanci umawiają jazdy w aplikacji mobilnej, a kursanci uczą się w niej też teorii.'),
      cover: [0, 1, 2],
      sections: [
        { title: tr('Where it started', 'Skąd ten pomysł'), body: tr('We don’t run a driving school; I know it from the student’s side. When I was getting my licence, I arranged lessons by text message, counted my own hours and sometimes had to remind my instructor about the next lesson. He kept everything in a notebook, and when he had to cancel, he phoned other instructors one by one. Jedziemy exists so that neither students nor instructors have to work like that.', 'Nie prowadzimy szkoły jazdy. Znam ją od strony kursanta. Gdy robiłem prawo jazdy, terminy ustalałem SMS-ami, sam liczyłem swoje godziny i zdarzało mi się przypominać instruktorowi o kolejnej jeździe. Instruktor miał wszystko w zeszycie, a gdy musiał odwołać jazdę, dzwonił po kolei do innych instruktorów. Jedziemy powstało, żeby ani kursant, ani instruktor nie musieli tak pracować.') },
        { title: tr('From proposal to a lesson in the schedule', 'Od propozycji do jazdy w grafiku'), body: tr('An instructor proposes a time, the student confirms it in the app, and the lesson goes into the school’s shared schedule. Students mark once when they can drive, so the instructor doesn’t have to ask. When a lesson is cancelled, the instructor sees who could take the free slot instead of calling down a list.', 'Instruktor proponuje termin, kursant potwierdza go w aplikacji, a jazda trafia do wspólnego grafiku szkoły. Kursant raz zaznacza, kiedy może jeździć, więc instruktor nie musi o to pytać. Gdy jazda wypada, instruktor widzi, komu pasuje wolne okienko, zamiast obdzwaniać kolejne osoby.') },
        { title: tr('Hours and payments without paper notes', 'Godziny i wpłaty bez kartek'), body: tr('After each lesson the instructor records the time and what the student should practise again. The office sees completed and remaining hours, payments and overdue instalments for every course, without collecting notes from the team.', 'Po każdej jeździe instruktor zapisuje czas i to, co kursant ma powtórzyć. Biuro widzi odbyte i pozostałe godziny, wpłaty oraz zaległe raty każdego kursu, bez zbierania kartek od zespołu.') },
        { title: tr('Theory in the same app', 'Teoria w tej samej aplikacji'), body: tr('Students also prepare for the theory exam in Jedziemy: short sessions of 5, 10 or 15 minutes, wrong answers coming back in reviews, and mock exams built on the official question catalogue. For the school, it’s one more reason a student might choose them. Jedziemy is still in active development.', 'Kursanci przygotowują się w Jedziemy także do egzaminu teoretycznego: krótkie sesje na 5, 10 lub 15 minut, błędne odpowiedzi wracające w powtórkach i egzaminy próbne oparte na oficjalnym katalogu pytań. Dla szkoły to dodatkowy powód, żeby kursant wybrał właśnie ją. Jedziemy jest wciąż rozwijane.') },
      ],
      evidence: [
        { index: 0, after: 1, caption: tr('The instructor proposes a lesson.', 'Instruktor proponuje termin.') },
        { index: 1, after: 1, caption: tr('The student confirms it in the app.', 'Kursant potwierdza go w aplikacji.') },
        { index: 2, after: 2, caption: tr('After the lesson: time driven and skills to practise again.', 'Po jeździe: czas prowadzenia i umiejętności do powtórki.') },
        { index: 3, after: 3, caption: tr('The theory course, chapter by chapter.', 'Kurs teorii, rozdział po rozdziale.') },
        { index: 4, after: 3, caption: tr('Feedback right next to the exam question.', 'Omówienie odpowiedzi przy pytaniu egzaminacyjnym.') },
      ],
      action: { label: tr('Open Jedziemy', 'Otwórz Jedziemy'), href: 'https://jedziemy.app' },
    }),
    make('solvee', {
      kind: tr('Case study', 'Case study'),
      title: tr('Building the homework app I needed.', 'Aplikacja do zadań, której sam potrzebowałem.'),
      summary: tr('I was a student. The tools I tried gave me ready-made answers; I wanted to understand how to get there. That became Solvee.', 'Byłem uczniem. Narzędzia, z których korzystałem, podawały gotowe odpowiedzi. Chciałem zrozumieć, jak do nich dojść. Z tego powstało Solvee.'),
      role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i programowanie'),
      outcome: tr('25,000+ downloads · acquired in 2026', 'Ponad 25 tys. pobrań · sprzedane w 2026'),
      stat: { value: tr('25,000+', '25 000+'), label: tr('downloads, then acquired in 2026', 'pobrań, a potem sprzedaż w 2026') },
      cover: [0, 1, 2],
      sections: [
        { title: tr('Starting with my own problem', 'Punktem wyjścia był mój problem'), body: tr('When I needed help with homework, getting the final answer was only part of the problem. I wanted a tool that would explain the solution step by step, so I could follow the reasoning. I designed Solvee around that need.', 'Kiedy potrzebowałem pomocy z zadaniem domowym, sama końcowa odpowiedź nie wystarczała. Chciałem narzędzia, które wyjaśni rozwiązanie krok po kroku i pozwoli prześledzić tok rozumowania. Wokół tej potrzeby zaprojektowałem Solvee.') },
        { title: tr('Begin with the exercise', 'Zacząć od zadania'), body: tr('The starting point could be a photo or a typed exercise. The app classified the problem by subject and routed it to a suitable solution pipeline. A student could bring the exercise they already had, without first translating it into a carefully written prompt.', 'Punktem wyjścia mogło być zdjęcie lub wpisana treść zadania. Aplikacja rozpoznawała przedmiot i kierowała problem do odpowiedniej ścieżki rozwiązania. Uczeń mógł zacząć od zadania, które już miał przed sobą, bez układania rozbudowanego polecenia.') },
        { title: tr('Make the reasoning readable', 'Pokazać rozumowanie'), body: tr('I built structured solution blocks with mathematical notation, rather than leaving every explanation as one long chat message. LaTeX rendering and interactive graphs supported the explanation where plain text was not enough. The work covered both generating the answer and presenting its steps clearly on a phone.', 'Zbudowałem uporządkowane bloki rozwiązania z zapisem matematycznym. Wyjaśnienie nie musiało być jedną długą wiadomością na czacie. Renderowanie LaTeX i interaktywne wykresy uzupełniały je tam, gdzie zwykły tekst nie wystarczał. Praca obejmowała zarówno generowanie odpowiedzi, jak i czytelne pokazanie jej etapów na telefonie.') },
        { title: tr('Leave room for the next question', 'Zostawić miejsce na kolejne pytanie'), body: tr('A worked solution was followed by contextual questions and tools for generating practice exercises and quizzes. That kept the next step connected to the problem the student was working on. It followed the original motivation: help someone work through the subject, beyond displaying a final result.', 'Po rozwiązaniu można było zadawać pytania w jego kontekście oraz generować ćwiczenia i quizy. Kolejny krok pozostawał powiązany z zadaniem, nad którym pracował uczeń. To rozwijało pierwotny pomysł: pomóc przejść przez temat i zrozumieć go, zamiast kończyć na wyświetleniu wyniku.') },
        { title: tr('Where it ended up', 'Co wydarzyło się dalej'), body: tr('I took Solvee through product design, development, launch and iteration. It reached more than 25,000 downloads before being acquired in 2026. The project is now part of my past work; Clevr Apps no longer publishes or supports it.', 'Przeszedłem z Solvee przez projekt produktu, programowanie, premierę i dalszy rozwój. Aplikacja osiągnęła ponad 25 tys. pobrań, zanim została sprzedana w 2026 roku. Dziś to zakończony projekt w moim portfolio; Clevr Apps już go nie publikuje ani nie wspiera.') },
      ],
      evidence: [
        { index: 0, after: 1, caption: tr('The exercise was the starting point. Original store screenshot of camera input.', 'Punktem wyjścia było zadanie. Oryginalny zrzut sklepowy pokazujący aparat.') },
        { index: 1, after: 2, caption: tr('The explanation was the product. Original store screenshot showing a worked solution.', 'Istotą produktu było wyjaśnienie. Oryginalny zrzut sklepowy pokazujący rozwiązanie.') },
      ],
      action: { label: tr('View the product archive', 'Zobacz archiwum aplikacji'), href: 'https://clevrapps.com/apps/solvee/' },
    }),
    make('subby', {
      kind: tr('Project notes', 'O projekcie'),
      title: tr('I kept forgetting to cancel free trials.', 'Zapominałem anulować okresy próbne.'),
      summary: tr('I kept forgetting to cancel free trials and lost money on them. I also had no idea how much I paid for subscriptions in total. I built Subby for myself, and it helped a lot.', 'Zapominałem anulować darmowe okresy próbne i traciłem na tym pieniądze. Nie wiedziałem też, ile w sumie płacę za subskrypcje. Stworzyłem Subby dla siebie i bardzo mi to pomogło.'),
      role: tr('Founder · Product design & engineering', 'Założyciel · Projekt i programowanie'),
      outcome: tr('Published on iOS and Android', 'Dostępne na iOS i Androidzie'),
      note: tr('Subscriptions, free trials and what they cost in total, in one place.', 'Subskrypcje, okresy próbne i ich łączny koszt w jednym miejscu.'),
      cover: [1, 0, 2],
      sections: [
        { title: tr('Starting with forgotten trials', 'Punktem wyjścia były zapomniane okresy próbne'), body: tr('Free trials I forgot to cancel kept turning into charges. On top of that, I could not see how much all my subscriptions cost together; the payments were scattered across the month. Calendar reminders and checking my bank account were not enough. I wanted one simple place that knew what I was subscribed to, what it added up to, and warned me before the next charge. Since then it has helped me a lot.', 'Okresy próbne, których zapominałem anulować, zamieniały się w opłaty. Do tego nie widziałem, ile kosztują wszystkie moje subskrypcje razem, bo płatności były rozrzucone po całym miesiącu. Przypomnienia w kalendarzu i sprawdzanie konta bankowego nie wystarczały. Chciałem jednego prostego miejsca, które wie, co subskrybuję, ile to razem kosztuje, i ostrzeże mnie przed kolejną opłatą. Od tamtej pory bardzo mi to pomaga.') },
        { title: tr('Put the next charge first', 'Najpierw najbliższa opłata'), body: tr('The overview opens with monthly spend, the trials that are about to end and the payments coming up next. Each subscription carries its next billing date, and Subby sends renewal and trial notifications before it arrives. The data stays on the phone, with separate profiles, currencies and preferences.', 'Ekran główny zaczyna się od miesięcznych wydatków, kończących się okresów próbnych i najbliższych płatności. Każda subskrypcja ma datę kolejnej opłaty, a Subby wysyła powiadomienia o odnowieniach i końcu okresu próbnego, zanim ten dzień nadejdzie. Dane zostają na telefonie, z osobnymi profilami, walutami i ustawieniami.') },
        { title: tr('Show what it adds up to', 'Pokazać, ile to kosztuje razem'), body: tr('The second problem was the total. Subby adds every subscription up per week, month and year, and splits the spending by category and billing cycle, so the cost is visible in one place instead of scattered across bank statements. I designed and built Subby end to end, from the product to its release on iOS and Android. It is published by Clevr Apps.', 'Drugim problemem była suma. Subby zlicza wszystkie subskrypcje w skali tygodnia, miesiąca i roku oraz dzieli wydatki według kategorii i cyklu rozliczeń, więc koszt widać w jednym miejscu, a nie na wyciągach z banku. Zaprojektowałem i stworzyłem Subby od początku do końca, od produktu po premierę na iOS i Androidzie. Aplikację publikuje Clevr Apps.') },
      ],
      evidence: [
        { index: 1, after: 1, caption: tr('Every subscription with its price and the days left until the next charge.', 'Każda subskrypcja z ceną i liczbą dni do kolejnej opłaty.') },
        { index: 2, after: 2, caption: tr('Monthly spending split by category and billing cycle.', 'Miesięczne wydatki według kategorii i cyklu rozliczeń.') },
      ],
      action: { label: tr('See Subby', 'Zobacz Subby'), href: 'https://clevrapps.com/apps/subby/' },
    }),
    make('twojasiec', {
      kind: tr('Project notes', 'O projekcie'),
      title: tr('Making local information easier to find.', 'Łatwiejszy dostęp do lokalnych informacji.'),
      summary: tr('I designed and built Twoja Sieć around a selected area: local news, alerts and events brought together in one app.', 'Zaprojektowałem i stworzyłem Twoją Sieć wokół wybranej okolicy: lokalnych wiadomości, alertów i wydarzeń zebranych w jednej aplikacji.'),
      role: tr('Product designer & developer', 'Projektant produktu i developer'),
      outcome: tr('No. 11 in Poland’s App Store · 28 Sep 2026', '11. miejsce w polskim App Store · 28.09.2026'),
      stat: { value: tr('No. 11', '11. miejsce'), label: tr('in Poland’s App Store downloads · 28 Sep 2026', 'w pobraniach polskiego App Store · 28.09.2026') },
      cover: [2, 0, 3],
      sections: [
        { title: tr('Start with the area', 'Zacząć od okolicy'), body: tr('Local information is spread across websites and community groups. Twoja Sieć uses a selected area as the starting point, with location and radius-based personalization connecting the feed to the place a person cares about.', 'Lokalne informacje są rozproszone między stronami internetowymi i grupami społecznościowymi. W Twojej Sieci punktem wyjścia jest wybrana okolica. Lokalizacja i personalizacja według promienia łączą treści z miejscem, które interesuje użytkownika.') },
        { title: tr('Separate the jobs', 'Rozdzielić potrzeby'), body: tr('News, alerts and events share a location, but serve different needs. I gave them distinct views, with saved stories and event details available when someone needs to return to an item or act on it.', 'Wiadomości, alerty i wydarzenia dotyczą tego samego miejsca, ale odpowiadają na różne potrzeby. Dostały osobne widoki. Zapisane materiały i szczegóły wydarzeń pomagają wrócić do konkretnej informacji lub coś z nią zrobić.') },
        { title: tr('Connect information to an action', 'Połączyć informację z działaniem'), body: tr('Calendar integration, map routes and native sharing connect the information to a practical next step. On 28 September 2026, Twoja Sieć reached No. 11 among the most downloaded apps in Poland’s App Store. That dated ranking is the project milestone recorded here.', 'Integracja z kalendarzem, trasami w mapach i natywnym udostępnianiem łączy informację z konkretnym działaniem. 28 września 2026 roku Twoja Sieć znalazła się na 11. miejscu w rankingu najczęściej pobieranych aplikacji w polskim App Store. Ten wynik z konkretnego dnia jest kamieniem milowym projektu.') },
      ],
      evidence: [
        { index: 0, after: 0, caption: tr('A local feed gives the selected area a single starting point.', 'Lokalny feed daje jeden punkt wyjścia do informacji z wybranej okolicy.') },
        { index: 1, after: 2, caption: tr('An event detail screen connects reading to planning a visit.', 'Szczegóły wydarzenia łączą przeczytanie informacji z zaplanowaniem wizyty.') },
      ],
      action: { label: tr('Open Twoja Sieć', 'Otwórz Twoją Sieć'), href: 'https://twojasiec.app/' },
    }),
  ];
}

/** The homepage shows the first three stories; /portfolio shows all of them. */
export function getHomeStories(language: Language): ProjectStory[] {
  return getStories(language).slice(0, 3);
}

export function getStory(id: string, language: Language) {
  return getStories(language).find(story => story.id === id);
}
