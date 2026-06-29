import { Clipboard, ClipboardCheck, Code2, Download, FileText, Wand2 } from 'lucide-react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Dictionary } from '../i18n';
import { useProgressiveText } from '../lib/progressiveText';
import type { ReportStatus } from './MockControls';

export type ReportContent = {
  advancedPrompt?: string;
  kind: 'live' | 'mock';
  lastAnswer: string;
  markdown: string;
  messageId?: string;
  optimizedPrompt?: string;
};

type ReportPanelProps = {
  errorMessage?: string;
  report: ReportContent | null;
  showToast: (message: string) => void;
  status: ReportStatus;
  t: Dictionary;
};

const markdownComponents: Components = {
  table({ node: _node, ...props }) {
    return (
      <div className="report-table-wrap">
        <table {...props} />
      </div>
    );
  }
};

export default function ReportPanel({ errorMessage, report, showToast, status, t }: ReportPanelProps) {
  const markdown = report?.markdown || '';
  const badgeLabel = getReportBadgeLabel(status, report, t);
  const visibleReport = useProgressiveText(status === 'report' ? markdown : '', {
    chunkSize: 42,
    intervalMs: 16
  });

  const copyText = async (value: string, message: string) => {
    await navigator.clipboard.writeText(value);
    showToast(message);
  };

  const downloadMarkdown = () => {
    if (!report) {
      showToast(t.toast.noReport);
      return;
    }

    const blob = new Blob([report.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'prompt-checkup-report.md';
    anchor.click();
    URL.revokeObjectURL(url);
    showToast(t.toast.downloaded);
  };

  const copyReport = () => {
    if (!report) {
      showToast(t.toast.noReport);
      return;
    }
    void copyText(report.markdown, t.toast.copied);
  };

  const copyLastAnswer = () => {
    if (!report) {
      showToast(t.toast.noReport);
      return;
    }
    void copyText(report.lastAnswer, t.toast.copied);
  };

  const copyOptionalPrompt = (value: string | undefined, fallbackMessage: string) => {
    if (!value) {
      showToast(fallbackMessage);
      return;
    }
    void copyText(value, t.toast.copied);
  };

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/85 shadow-soft backdrop-blur-xl">
      <div className="border-b border-lavender-100 px-5 py-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            {badgeLabel ? (
              <p className="inline-flex rounded-full bg-lavender-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-lavender-600">
                {badgeLabel}
              </p>
            ) : null}
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{t.report.title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <ToolButton icon={<Clipboard size={15} />} onClick={copyReport}>
              {t.report.actions.copyFull}
            </ToolButton>
            <ToolButton icon={<ClipboardCheck size={15} />} onClick={copyLastAnswer}>
              {t.report.actions.copyLast}
            </ToolButton>
            <ToolButton
              icon={<Wand2 size={15} />}
              onClick={() => copyOptionalPrompt(report?.optimizedPrompt, t.toast.optimizedNotFound)}
            >
              {t.report.actions.copyOptimized}
            </ToolButton>
            <ToolButton
              icon={<Code2 size={15} />}
              onClick={() => copyOptionalPrompt(report?.advancedPrompt, t.toast.advancedNotFound)}
            >
              {t.report.actions.copyAdvanced}
            </ToolButton>
            <ToolButton icon={<Download size={15} />} onClick={downloadMarkdown}>
              {t.report.actions.download}
            </ToolButton>
          </div>
        </div>
      </div>

      <div className="min-h-[560px] p-5">
        {status === 'empty' ? <EmptyState t={t} /> : null}
        {status === 'loading' ? <LoadingState t={t} /> : null}
        {status === 'error' ? <ErrorState message={errorMessage} t={t} /> : null}
        {status === 'report' ? (
          <article
            aria-live="polite"
            className="report-stream report-markdown prose prose-slate max-w-none prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-xl"
          >
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
              {visibleReport}
            </ReactMarkdown>
          </article>
        ) : null}
      </div>
    </div>
  );
}

function getReportBadgeLabel(status: ReportStatus, report: ReportContent | null, t: Dictionary) {
  if (status === 'empty') {
    return t.report.badges.waiting;
  }
  if (status === 'error') {
    return t.report.badges.error;
  }
  if (status === 'report') {
    return report?.kind === 'live' ? t.report.badges.live : t.report.badges.mock;
  }
  return '';
}

type ToolButtonProps = {
  children: string;
  icon: ReactNode;
  onClick: () => void;
};

function ToolButton({ children, icon, onClick }: ToolButtonProps) {
  return (
    <button
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-lavender-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-700"
      onClick={onClick}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}

function EmptyState({ t }: { t: Dictionary }) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-dashed border-lavender-200 bg-lavender-50/50 p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lavender-600 shadow-sm">
        <FileText size={25} />
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{t.report.emptyTitle}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{t.report.emptyDescription}</p>
    </div>
  );
}

function LoadingState({ t }: { t: Dictionary }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-lavender-700">{t.report.loadingTitle}</p>
        <p className="mt-1 text-sm text-slate-500">{t.report.loadingDescription}</p>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            className="h-4 animate-pulse rounded-full bg-gradient-to-r from-lavender-100 via-white to-lavender-100"
            key={index}
            style={{ width: `${92 - index * 6}%` }}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="h-24 animate-pulse rounded-3xl bg-lavender-50" key={index} />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, t }: { message?: string; t: Dictionary }) {
  return (
    <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6">
      <p className="text-sm font-semibold text-rose-700">{t.report.errorTitle}</p>
      <p className="mt-2 text-sm leading-6 text-rose-600">{message || t.report.errorDescription}</p>
    </div>
  );
}
