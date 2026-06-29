import { BookOpen, Github, Map } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Dictionary } from '../i18n';

type FooterProps = {
  t: Dictionary;
};

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="mt-auto rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-end">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-slate-950">PromptCheckup</p>
          {t.footer.lines.map((line) => (
            <p className="max-w-4xl text-sm leading-6 text-slate-500" key={line}>
              {line}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FooterLink href="https://github.com/Bagekyl/prompt-checkup" icon={<Github size={16} />}>
            GitHub
          </FooterLink>
          <span className="inline-flex h-10 items-center rounded-full border border-lavender-100 bg-lavender-50 px-4 text-sm font-medium text-lavender-700">
            {t.footer.difyTemplate}
          </span>
          <FooterLink href="https://github.com/Bagekyl/prompt-checkup#readme" icon={<BookOpen size={16} />}>
            {t.footer.documentation}
          </FooterLink>
          <FooterLink href="https://github.com/Bagekyl/prompt-checkup/blob/main/docs/roadmap.md" icon={<Map size={16} />}>
            {t.footer.roadmap}
          </FooterLink>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  children: string;
  href: string;
  icon: ReactNode;
};

function FooterLink({ children, href, icon }: FooterLinkProps) {
  return (
    <a
      className="inline-flex h-10 items-center gap-2 rounded-full border border-lavender-100 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-700"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {icon}
      {children}
    </a>
  );
}
