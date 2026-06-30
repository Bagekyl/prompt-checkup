import type { Dictionary, Language } from '../i18n';

const languages: Array<{ label: string; value: Language }> = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' }
];

type LanguageSwitcherProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  t: Dictionary;
};

export default function LanguageSwitcher({ language, onLanguageChange, t }: LanguageSwitcherProps) {
  return (
    <div aria-label={t.header.language} className="inline-flex rounded-full border border-lavender-200 bg-lavender-50 p-1">
      {languages.map((item) => (
        <button
          className={`h-8 rounded-full px-3 text-sm font-medium transition ${
            language === item.value
              ? 'bg-white text-lavender-700 shadow-sm'
              : 'text-slate-500 hover:text-lavender-700'
          }`}
          key={item.value}
          onClick={() => onLanguageChange(item.value)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
