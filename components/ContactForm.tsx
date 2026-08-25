import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
  website: '',
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status === 'error') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok || !result) {
        throw new Error(result?.message || 'Something went wrong. Please try again.');
      }

      setForm(initialForm);
      setStatus('success');
      setFeedback('Message sent. I’ll get back to you soon.');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-stone-700/80 bg-stone-900/70 px-4 py-3.5 text-sm text-off-white outline-none transition placeholder:text-stone-600 focus:border-stone-400 focus:ring-2 focus:ring-stone-500/20';
  const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-[0.13em] text-stone-400';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-stone-800 bg-stone-900/55 p-5 sm:p-7 md:p-8 text-left shadow-2xl shadow-black/10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={updateField}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-company" className={labelClass}>Company <span className="normal-case tracking-normal text-stone-600">(optional)</span></label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
          value={form.company}
          onChange={updateField}
          placeholder="Company or product name"
          className={fieldClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>What are you building?</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={5}
          value={form.message}
          onChange={updateField}
          placeholder="Tell me a little about the idea, scope, and where you are right now."
          className={`${fieldClass} min-h-[9rem] resize-y`}
        />
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={updateField}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-stone-500">
          Prefer email?{' '}
          <a href="mailto:hello@mikolajpiech.com" className="text-stone-300 underline decoration-stone-700 underline-offset-4 transition hover:text-white">
            hello@mikolajpiech.com
          </a>
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex min-w-[148px] items-center justify-center rounded-full bg-off-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-stone-200 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" className="min-h-6 pt-3 text-sm">
        {feedback && (
          <p className={status === 'success' ? 'flex items-center gap-2 text-emerald-400' : 'text-red-400'}>
            {status === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0" />}
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
