import { Github } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import type { Dictionary, Language } from '../i18n';
import { APP_VERSION } from '../lib/version';

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  t: Dictionary;
};

export default function Header({ language, onLanguageChange, t }: HeaderProps) {
  return (
    <header className="rounded-[28px] border border-white/70 bg-white/75 px-5 py-4 shadow-soft backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender-100 text-2xl shadow-inner">
              🩺
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xl font-semibold tracking-tight text-slate-950">PromptCheckup</p>
                <span className="rounded-full border border-lavender-200 bg-lavender-50 px-2.5 py-0.5 text-xs font-semibold text-lavender-700">
                  {APP_VERSION}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{t.header.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} t={t} />
          <a
            className="inline-flex h-10 items-center gap-2 rounded-full border border-lavender-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-lavender-300 hover:bg-lavender-50"
            href="https://github.com/Bagekyl/prompt-checkup"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={17} />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
