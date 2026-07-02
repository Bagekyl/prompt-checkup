import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Dictionary } from '../i18n';
import { useProgressiveText } from '../lib/progressiveText';

export type ChatRole = 'assistant' | 'system' | 'user';

export type ChatMessage = {
  content: string;
  createdAt: string;
  id: string;
  kind?: 'diagnosis' | 'error' | 'follow_up' | 'system';
  role: ChatRole;
};

type FollowUpBoxProps = {
  conversationId?: string;
  errorMessage?: string;
  isLoading: boolean;
  messages: ChatMessage[];
  onNewSession: () => void;
  onSend: (content: string) => void;
  streamingMessageId?: string;
  t: Dictionary;
};

export default function FollowUpBox({
  conversationId,
  errorMessage,
  isLoading,
  messages,
  onNewSession,
  onSend,
  streamingMessageId,
  t
}: FollowUpBoxProps) {
  const [value, setValue] = useState('');

  const send = (content = value) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) {
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
            className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full border border-lavender-200 bg-white px-3 py-1.5 text-xs font-semibold text-lavender-700 transition hover:bg-lavender-50"
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
            className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1.5 text-xs font-semibold text-lavender-700 transition hover:bg-lavender-100 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            key={action}
            onClick={() => send(action)}
            type="button"
          >
            {action}
          </button>
        ))}
      </div>

      {messages.length ? (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t.followUp.historyTitle}
          </p>
          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} streaming={message.id === streamingMessageId} />
            ))}
            {isLoading ? <LoadingBubble label={t.followUp.loading} /> : null}
          </div>
        </div>
      ) : isLoading ? (
        <div className="mt-4">
          <LoadingBubble label={t.followUp.loading} />
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-4 rounded-3xl border border-rose-100 bg-rose-50 px-4 py-3">
          <p className="text-sm font-semibold text-rose-700">{t.followUp.errorTitle}</p>
          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-rose-600">{errorMessage}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          className="h-12 min-w-0 flex-1 rounded-2xl border border-lavender-100 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-lavender-300 focus:ring-4 focus:ring-lavender-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          disabled={isLoading}
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
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-lavender-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
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

function MessageBubble({ message, streaming }: { message: ChatMessage; streaming: boolean }) {
  const visibleContent = useProgressiveText(streaming ? message.content : '', {
    chunkSize: 38,
    intervalMs: 16
  });
  const content = streaming ? visibleContent : message.content;

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="w-fit max-w-[min(78%,720px)] whitespace-pre-wrap break-words rounded-3xl bg-lavender-600 px-4 py-3 text-left text-sm leading-6 text-white shadow-sm shadow-lavender-200/50 max-sm:max-w-[86%]">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === 'system' || message.kind === 'error') {
    return (
      <div className="mr-auto max-w-[92%] rounded-3xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
        {message.content}
      </div>
    );
  }

  return (
    <div className="mr-auto max-w-[94%] rounded-3xl border border-lavender-100 bg-lavender-50 px-4 py-3 text-slate-700">
      <div className="report-markdown prose prose-slate max-w-none prose-headings:mt-3 prose-headings:text-base prose-p:my-2 prose-pre:my-3 prose-ul:my-2 prose-ol:my-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function LoadingBubble({ label }: { label: string }) {
  return (
    <div className="mr-auto max-w-[92%] rounded-3xl border border-lavender-100 bg-lavender-50 px-4 py-3">
      <p className="text-sm font-semibold text-lavender-700">{label}</p>
      <div className="mt-3 space-y-2">
        <div className="h-3 w-56 animate-pulse rounded-full bg-lavender-100" />
        <div className="h-3 w-44 animate-pulse rounded-full bg-lavender-100" />
      </div>
    </div>
  );
}
