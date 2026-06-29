import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import type { Dictionary } from '../i18n';

export type FollowUpMessage = {
  content: string;
  id: string;
  role: 'assistant' | 'user';
};

type FollowUpBoxProps = {
  conversationId?: string;
  messages: FollowUpMessage[];
  onNewSession: () => void;
  onSend: (content: string) => void;
  t: Dictionary;
};

export default function FollowUpBox({ conversationId, messages, onNewSession, onSend, t }: FollowUpBoxProps) {
  const [value, setValue] = useState('');

  const send = (content = value) => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setValue('');
  };

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur-xl">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{t.followUp.title}</h2>
            <p className="text-sm leading-6 text-slate-500">{t.followUp.description}</p>
          </div>
          <button
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-lavender-200 bg-white px-3 text-xs font-semibold text-lavender-700 transition hover:bg-lavender-50"
            onClick={onNewSession}
            type="button"
          >
            {t.followUp.newSession}
          </button>
        </div>
        {conversationId ? (
          <p className="mt-2 max-w-full truncate rounded-full bg-lavender-50 px-3 py-1 text-xs font-medium text-lavender-700">
            {t.followUp.conversation}: {conversationId}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {t.followUp.quickActions.map((action) => (
          <button
            className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1.5 text-xs font-semibold text-lavender-700 transition hover:bg-lavender-100"
            key={action}
            onClick={() => send(action)}
            type="button"
          >
            {action}
          </button>
        ))}
      </div>

      {messages.length ? (
        <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              className={`rounded-3xl px-4 py-3 text-sm leading-6 ${
                message.role === 'user'
                  ? 'ml-auto max-w-[88%] bg-lavender-600 text-white'
                  : 'mr-auto max-w-[92%] border border-lavender-100 bg-lavender-50 text-slate-700'
              }`}
              key={message.id}
            >
              {message.content}
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex gap-2">
        <input
          className="h-12 min-w-0 flex-1 rounded-2xl border border-lavender-100 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-lavender-300 focus:ring-4 focus:ring-lavender-100"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              send();
            }
          }}
          placeholder={t.followUp.placeholder}
          value={value}
        />
        <button
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-lavender-800"
          onClick={() => send()}
          type="button"
        >
          <SendHorizonal size={17} />
          {t.followUp.send}
        </button>
      </div>
    </div>
  );
}
