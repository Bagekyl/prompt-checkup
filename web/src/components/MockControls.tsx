import { AlertTriangle, ChevronDown, FileX2, RotateCcw, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Dictionary } from '../i18n';

export type ReportStatus = 'empty' | 'error' | 'loading' | 'report';

type MockControlsProps = {
  onClear: () => void;
  onError: () => void;
  onMockReport: () => void;
  t: Dictionary;
};

export default function MockControls({ onClear, onError, onMockReport, t }: MockControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[22px] border border-lavender-100/80 bg-white/55 p-3 shadow-sm backdrop-blur-xl">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 text-left"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-600">
          <Wrench className="shrink-0 text-lavender-500" size={15} />
          <span className="truncate">{t.mockControls.label}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-lavender-100 bg-white px-2.5 py-1 text-xs font-semibold text-lavender-700">
          {isOpen ? t.mockControls.collapse : t.mockControls.expand}
          <ChevronDown className={`transition ${isOpen ? 'rotate-180' : ''}`} size={14} />
        </span>
      </button>

      {isOpen ? (
        <div className="mt-3 border-t border-lavender-100/80 pt-3">
          <p className="mb-3 text-xs leading-5 text-slate-500">{t.mockControls.description}</p>
          <div className="flex flex-wrap gap-2">
            <ControlButton icon={<RotateCcw size={15} />} onClick={onMockReport}>
              {t.mockControls.showReport}
            </ControlButton>
            <ControlButton icon={<AlertTriangle size={15} />} onClick={onError}>
              {t.mockControls.showError}
            </ControlButton>
            <ControlButton icon={<FileX2 size={15} />} onClick={onClear}>
              {t.mockControls.clearReport}
            </ControlButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type ControlButtonProps = {
  children: string;
  icon: ReactNode;
  onClick: () => void;
};

function ControlButton({ children, icon, onClick }: ControlButtonProps) {
  return (
    <button
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-lavender-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-lavender-50 hover:text-lavender-700"
      onClick={onClick}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}
