import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type CopyEmailProps = {
  email: string;
  className?: string;
};

export function CopyEmail({ email, className = '' }: CopyEmailProps) {
  const { site } = useLanguage();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  if (!ready) return <a href={`mailto:${email}`} className={className}>{email}</a>;

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label={copied ? site.common.email_on_clipboard.replace('{{email}}', email) : `${site.ui.copy} ${email}`}
    >
      <span>{email}</span>
      <span className="inline-flex h-4 min-w-4 items-center justify-center" aria-hidden="true">
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5 opacity-55 transition-opacity group-hover:opacity-100" />
        )}
      </span>
      <span className="sr-only" aria-live="polite">{copied ? site.ui.copied : ''}</span>
    </button>
  );
}
