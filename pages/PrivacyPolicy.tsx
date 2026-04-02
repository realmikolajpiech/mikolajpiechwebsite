import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import site from '../content/site.json';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
  </svg>
);

type PartnerRow = {
  partner: string;
  purpose: string;
  linkLabel: string;
  linkHref?: string;
  linkHrefApple?: string;
  linkHrefGoogle?: string;
};

const linkClass =
  'text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all';

export default function PrivacyPolicy() {
  const p = site.privacy;
  const partners = p.partners as PartnerRow[];
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink dark:text-stone-50 hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Button href="/#contact" variant="outline" className="!px-5 !py-2 !text-xs tracking-wide hidden sm:inline-flex">
            {site.common.get_in_touch}
          </Button>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-ink dark:text-stone-50 mb-10 leading-tight">{p.title}</h1>

          <div className="prose prose-stone dark:prose-invert prose-lg max-w-none font-light text-stone-600 dark:text-stone-300">
            <p className="text-stone-500 dark:text-stone-400 mb-8">{p.last_updated}</p>

            <p className="mb-6">
              {p.intro_before_link}
              <a
                href="https://mikolajpiech.com"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mikolajpiech.com
              </a>
              {p.intro_after_link}
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s1_title}</h3>

            <h4 className="text-xl font-medium text-ink dark:text-stone-50 mt-6 mb-3">{p.s1a_title}</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              {p.s1a_items.map((item, i) => (
                <li key={i} className="text-stone-600 dark:text-stone-300">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-medium text-ink dark:text-stone-50 mt-6 mb-3">{p.s1b_title}</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              {p.s1b_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s2_title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              {p.s2_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s3_title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              {p.s3_items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s4_title}</h3>
            <p className="mb-4">{p.s4_p1}</p>
            <p className="mb-4">{p.s4_p2}</p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-700">
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">{p.table_partner}</th>
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">{p.table_purpose}</th>
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">{p.table_privacy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {partners.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-4">{row.partner}</td>
                      <td className="py-2 pr-4">{row.purpose}</td>
                      <td className="py-2 pr-4">
                        {row.linkHrefApple && row.linkHrefGoogle ? (
                          <>
                            <a
                              href={row.linkHrefApple}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-ink dark:hover:text-stone-200"
                            >
                              apple.com
                            </a>
                            {' / '}
                            <a
                              href={row.linkHrefGoogle}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-ink dark:hover:text-stone-200"
                            >
                              google.com
                            </a>
                          </>
                        ) : (
                          <a
                            href={row.linkHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-ink dark:hover:text-stone-200"
                          >
                            {row.linkLabel}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mb-6">{p.s4_p3}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s5_title}</h3>
            <p className="mb-4">{p.s5_p1}</p>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: p.s5_p2 }} />
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: p.s5_p3 }} />
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: p.s5_p4 }} />
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: p.s5_p5 }} />
            <p className="mb-6">
              For full details on Google&apos;s data handling, please see the{' '}
              <a
                href="https://ai.google.dev/gemini-api/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Gemini API Terms of Service
              </a>
              {' '}and{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Google Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s6_title}</h3>
            <p className="mb-6">{p.s6_p1}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s7_title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              {p.s7_items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mb-6">
              {p.s7_p1}
              <br />
              To exercise any right, contact me at{' '}
              <a href="mailto:contact@mikolajpiech.com" className={linkClass}>
                contact@mikolajpiech.com
              </a>
              .
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s8_title}</h3>
            <p className="mb-6">{p.s8_p1}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s9_title}</h3>
            <p className="mb-6">{p.s9_p1}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s10_title}</h3>
            <p className="mb-6">{p.s10_p1}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s11_title}</h3>
            <p className="mb-6">{p.s11_p1}</p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">{p.s12_title}</h3>
            <p className="mb-2">{p.s12_name}</p>
            <p className="mb-2">
              {p.s12_email_label}{' '}
              <a href="mailto:contact@mikolajpiech.com" className={linkClass}>
                contact@mikolajpiech.com
              </a>
            </p>
            <p className="mb-6">
              {p.s12_site_label}{' '}
              <a href="https://mikolajpiech.com" className={linkClass}>
                https://mikolajpiech.com
              </a>
            </p>
          </div>
        </motion.div>
      </section>

      <footer id="contact" className="bg-ink text-off-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">{site.common.all_rights_reserved.replace('{{year}}', String(year))}</p>
            <div className="flex gap-8 items-center">
              <a href="mailto:hello@mikolajpiech.com" className="hover:text-off-white transition-colors">hello@mikolajpiech.com</a>
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                 <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">{site.common.linkedin}</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to="/privacy-policy" className="text-off-white transition-colors">{site.common.privacy_policy}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
