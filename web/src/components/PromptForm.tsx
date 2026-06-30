import { ClipboardPenLine, Eraser, Play, Sparkles } from 'lucide-react';
import type { Dictionary, Language } from '../i18n';

export type ReviewDepth = 'quick' | 'standard' | 'deep' | 'optimizedOnly' | 'strict';
export type TaskType =
  | 'coding'
  | 'content'
  | 'custom'
  | 'data'
  | 'extraction'
  | 'general'
  | 'learning'
  | 'qa'
  | 'rag'
  | 'summary'
  | 'translation';

export type PromptFormState = {
  customTaskType: string;
  prompt: string;
  taskDescription: string;
  taskType: TaskType;
  context: string;
  outputRequirements: string;
  reviewDepth: ReviewDepth;
};

type PromptFormProps = {
  demoAccessCode: string;
  form: PromptFormState;
  language: Language;
  onAccessCodeChange: (value: string) => void;
  onChange: (form: PromptFormState) => void;
  onClearAccessCode: () => void;
  onClear: () => void;
  onFillExample: () => void;
  onStart: () => void;
  t: Dictionary;
};

const fieldClasses =
  'w-full rounded-2xl border border-lavender-100 bg-white/90 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-lavender-300 focus:ring-4 focus:ring-lavender-100';

export default function PromptForm({
  demoAccessCode,
  form,
  onAccessCodeChange,
  onChange,
  onClear,
  onClearAccessCode,
  onFillExample,
  onStart,
  t
}: PromptFormProps) {
  const update = <K extends keyof PromptFormState>(key: K, value: PromptFormState[K]) =>
    onChange({ ...form, [key]: value });

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-lavender-100 px-3 py-1 text-xs font-semibold text-lavender-700">
            <ClipboardPenLine size={14} />
            {t.form.kicker}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{t.form.title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{t.form.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.prompt.label}</span>
          <textarea
            className={`${fieldClasses} min-h-[180px] resize-y`}
            onChange={(event) => update('prompt', event.target.value)}
            placeholder={t.form.prompt.placeholder}
            value={form.prompt}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.taskDescription.label}</span>
          <textarea
            className={`${fieldClasses} min-h-[104px] resize-y`}
            onChange={(event) => update('taskDescription', event.target.value)}
            placeholder={t.form.taskDescription.placeholder}
            value={form.taskDescription}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(170px,0.46fr)]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.taskType.label}</span>
            <select
              className={fieldClasses}
              onChange={(event) => update('taskType', event.target.value as TaskType)}
              value={form.taskType}
            >
              {t.form.taskType.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {form.taskType === 'custom' ? (
          <TextField
            label={t.form.taskType.customLabel}
            onChange={(value) => update('customTaskType', value)}
            placeholder={t.form.taskType.customPlaceholder}
            value={form.customTaskType}
          />
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.context.label}</span>
          <textarea
            className={`${fieldClasses} min-h-[96px] resize-y`}
            onChange={(event) => update('context', event.target.value)}
            placeholder={t.form.context.placeholder}
            value={form.context}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.outputRequirements.label}</span>
          <textarea
            className={`${fieldClasses} min-h-[96px] resize-y`}
            onChange={(event) => update('outputRequirements', event.target.value)}
            placeholder={t.form.outputRequirements.placeholder}
            value={form.outputRequirements}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.reviewDepth.label}</span>
          <select
            className={fieldClasses}
            onChange={(event) => update('reviewDepth', event.target.value as ReviewDepth)}
            value={form.reviewDepth}
          >
            {t.form.reviewDepth.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-2xl border border-lavender-100 bg-lavender-50/50 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="min-w-0 flex-1">
            <span className="mb-2 block text-sm font-semibold text-slate-800">{t.form.demoAccessCode.label}</span>
            <input
              autoComplete="off"
              className={fieldClasses}
              onChange={(event) => onAccessCodeChange(event.target.value)}
              placeholder={t.form.demoAccessCode.placeholder}
              type="password"
              value={demoAccessCode}
            />
          </label>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-lavender-200 bg-white px-4 text-sm font-semibold text-lavender-700 transition hover:bg-lavender-50"
            onClick={onClearAccessCode}
            type="button"
          >
            {t.form.demoAccessCode.clear}
          </button>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">{t.form.demoAccessCode.helper}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 xl:flex-row">
        <button
          className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-2xl bg-lavender-600 px-5 py-3 text-center text-sm font-semibold leading-snug text-white shadow-lg shadow-lavender-300/30 transition hover:bg-lavender-700 xl:flex-1"
          onClick={onStart}
          type="button"
        >
          <Play className="shrink-0" size={17} />
          <span className="min-w-0 whitespace-normal break-words">{t.form.actions.start}</span>
        </button>
        <button
          className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-2xl border border-lavender-200 bg-white px-4 py-3 text-center text-sm font-semibold leading-snug text-lavender-700 transition hover:bg-lavender-50 xl:w-auto"
          onClick={onFillExample}
          type="button"
        >
          <Sparkles className="shrink-0" size={17} />
          <span className="min-w-0 whitespace-normal break-words">{t.form.actions.fill}</span>
        </button>
        <button
          className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold leading-snug text-slate-600 transition hover:bg-slate-50 xl:w-auto"
          onClick={onClear}
          type="button"
        >
          <Eraser className="shrink-0" size={17} />
          <span className="min-w-0 whitespace-normal break-words">{t.form.actions.clear}</span>
        </button>
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

function TextField({ label, onChange, placeholder, value }: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <input
        className={fieldClasses}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </label>
  );
}
