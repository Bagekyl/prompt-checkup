import { AlertTriangle, FileX2, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Dictionary } from '../i18n';

export type ReportStatus = 'empty' | 'error' | 'loading' | 'report';

type MockControlsProps = {
  onClear: () => void;
  onError: () => void;
  onMockReport: () => void;
  t: Dictionary;
};

export default function MockControls({ onClear, onError, onMockReport, t }: MockControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl">
      <p className="text-sm font-medium text-slate-500">{t.mockControls.label}</p>
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
