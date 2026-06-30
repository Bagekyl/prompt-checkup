import { useEffect, useMemo, useState } from 'react';
import Footer from './components/Footer';
import FollowUpBox, { type ChatMessage } from './components/FollowUpBox';
import Header from './components/Header';
import MockControls, { type ReportStatus } from './components/MockControls';
import PromptForm, { type PromptFormState } from './components/PromptForm';
import ReportPanel, { type ReportContent } from './components/ReportPanel';
import { dictionaries, type Language } from './i18n';
import { LocalApiError, sendLocalChatMessage } from './lib/apiClient';
import { extractAdvancedPrompt, extractOptimizedPrompt } from './lib/markdownExtract';
import { examplePrompt, mockReports } from './lib/mockReport';

const formDraftKey = 'promptcheckup.formDraft';
const languageKey = 'promptcheckup.uiLanguage';

const emptyForm: PromptFormState = {
  customTaskType: '',
  prompt: '',
  taskDescription: '',
  taskType: 'general',
  context: '',
  outputRequirements: '',
  reviewDepth: 'standard'
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => loadStoredLanguage());
  const [form, setForm] = useState<PromptFormState>(() => loadStoredForm());
  const [status, setStatus] = useState<ReportStatus>('empty');
  const [activeReport, setActiveReport] = useState<ReportContent | null>(null);
  const [conversationId, setConversationId] = useState('');
  const [lastMessageId, setLastMessageId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [followUpError, setFollowUpError] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState('');
  const [toast, setToast] = useState('');
  const t = dictionaries[language];
  const mockReport = useMemo(() => mockReports[language], [language]);
  const latestAssistantAnswer =
    [...messages].reverse().find((message) => message.role === 'assistant')?.content || activeReport?.lastAnswer || '';

  useEffect(() => {
    localStorage.setItem(languageKey, language);
  }, [language]);

  useEffect(() => {
    if (hasFormDraft(form)) {
      localStorage.setItem(formDraftKey, JSON.stringify(form));
    } else {
      localStorage.removeItem(formDraftKey);
    }
  }, [form]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1900);
  };

  const showMockReport = () => {
    setActiveReport({ ...mockReport, kind: 'mock' });
    setErrorMessage('');
    setFollowUpError('');
    setStatus('loading');
    window.setTimeout(() => setStatus('report'), 900);
  };

  const startDiagnosis = async () => {
    const promptText = form.prompt.trim();

    if (!promptText) {
      setErrorMessage(t.form.promptRequired);
      setStatus('error');
      showToast(t.form.promptRequired);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setFollowUpError('');

    try {
      const response = await sendLocalChatMessage({
        conversation_id: conversationId,
        inputs: buildInputs(form, t),
        query: t.form.startQuery,
        user: 'local-user'
      });

      setConversationId(response.conversation_id);
      setLastMessageId(response.message_id);
      setLiveReport(response.answer, response.message_id);
      appendAssistantMessage(response.answer, 'diagnosis');
      setStatus('report');
    } catch (error) {
      setErrorMessage(getReadableErrorMessage(error, t));
      setStatus('error');
    }
  };

  const clearForm = () => {
    setForm(emptyForm);
    localStorage.removeItem(formDraftKey);
    showToast(t.toast.cleared);
  };

  const fillExample = () => {
    setForm(examplePrompt[language]);
    setStatus('empty');
    showToast(t.toast.exampleFilled);
  };

  const clearReport = () => {
    setStatus('empty');
    setActiveReport(null);
    setErrorMessage('');
    showToast(t.toast.reportCleared);
  };

  const setMockError = () => {
    setErrorMessage(t.report.errorDescription);
    setStatus('error');
  };

  const newSession = () => {
    setConversationId('');
    setLastMessageId('');
    setMessages([]);
    setActiveReport(null);
    setStatus('empty');
    setErrorMessage('');
    setFollowUpError('');
    setStreamingMessageId('');
    showToast(t.toast.newSession);
  };

  const onSendFollowUp = (content: string) => {
    const reDiagnoseAction = t.followUp.quickActions[t.followUp.quickActions.length - 1];
    const query = content === reDiagnoseAction ? t.followUp.reDiagnoseQuery : content;
    void sendFollowUp(query, content === reDiagnoseAction);
  };

  const sendFollowUp = async (query: string, updateMainReport = false) => {
    if (!conversationId) {
      showToast(t.followUp.noConversation);
      return;
    }

    const userMessage = createMessage('user', query, 'follow_up');
    setMessages((current) => [...current, userMessage]);
    setFollowUpLoading(true);
    setFollowUpError('');

    try {
      const response = await sendLocalChatMessage({
        conversation_id: conversationId,
        inputs: buildInputs(form, t),
        query,
        user: 'local-user'
      });
      setConversationId(response.conversation_id);
      setLastMessageId(response.message_id);
      if (updateMainReport) {
        setLiveReport(response.answer, response.message_id);
      }
      appendAssistantMessage(response.answer, 'follow_up');
      if (updateMainReport || activeReport) {
        setStatus('report');
      }
    } catch (error) {
      setFollowUpError(getReadableErrorMessage(error, t));
    } finally {
      setFollowUpLoading(false);
    }
  };

  const setLiveReport = (answer: string, messageId: string) => {
    setActiveReport({
      advancedPrompt: extractAdvancedPrompt(answer),
      kind: 'live',
      lastAnswer: answer,
      markdown: answer,
      messageId,
      optimizedPrompt: extractOptimizedPrompt(answer)
    });
  };

  const appendAssistantMessage = (answer: string, kind: NonNullable<ChatMessage['kind']>) => {
    const assistantMessage = createMessage('assistant', answer, kind);
    setMessages((current) => [...current, assistantMessage]);
    setStreamingMessageId(assistantMessage.id);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#f1e7ff_0,#fbf8ff_34%,#fff_68%)] text-slate-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-gradient-to-b from-lavender-100/70 to-transparent" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Header language={language} onLanguageChange={setLanguage} t={t} />

        <main className="grid flex-1 grid-cols-1 gap-5 py-5 lg:grid-cols-[minmax(380px,0.92fr)_minmax(0,1.35fr)]">
          <section className="min-w-0">
            <PromptForm
              form={form}
              language={language}
              onChange={setForm}
              onClear={clearForm}
              onFillExample={fillExample}
              onStart={startDiagnosis}
              t={t}
            />
          </section>

          <section className="flex min-w-0 flex-col gap-4">
            <MockControls onClear={clearReport} onError={setMockError} onMockReport={showMockReport} t={t} />
            <ReportPanel
              errorMessage={errorMessage}
              latestAssistantAnswer={latestAssistantAnswer}
              report={activeReport}
              showToast={showToast}
              status={status}
              t={t}
            />
            <FollowUpBox
              conversationId={conversationId}
              errorMessage={followUpError}
              isLoading={followUpLoading}
              messages={messages}
              onNewSession={newSession}
              onSend={onSendFollowUp}
              streamingMessageId={streamingMessageId}
              t={t}
            />
          </section>
        </main>

        <Footer t={t} />
      </div>

      {toast ? (
        <div className="toast-pop fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-lavender-200 bg-white/95 px-4 py-2 text-sm font-medium text-lavender-800 shadow-soft backdrop-blur">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function buildInputs(form: PromptFormState, t: (typeof dictionaries)['zh']) {
  return {
    prompt_text: form.prompt,
    task_description: getTaskDescriptionPayload(form, t),
    task_type: getTaskTypeCanonical(form.taskType),
    context: form.context,
    output_requirements: form.outputRequirements,
    review_depth: getReviewDepthCanonical(form.reviewDepth)
  };
}

function createMessage(role: ChatMessage['role'], content: string, kind: NonNullable<ChatMessage['kind']>): ChatMessage {
  return {
    content,
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    kind,
    role
  };
}

function loadStoredLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  const stored = localStorage.getItem(languageKey);
  return stored === 'en' || stored === 'ja' || stored === 'zh' ? stored : 'zh';
}

function loadStoredForm(): PromptFormState {
  if (typeof window === 'undefined') {
    return emptyForm;
  }
  const stored = localStorage.getItem(formDraftKey);
  if (!stored) {
    return emptyForm;
  }
  try {
    const parsed = JSON.parse(stored) as Partial<PromptFormState>;
    return {
      customTaskType: typeof parsed.customTaskType === 'string' ? parsed.customTaskType : '',
      prompt: typeof parsed.prompt === 'string' ? parsed.prompt : '',
      taskDescription: typeof parsed.taskDescription === 'string' ? parsed.taskDescription : '',
      taskType: normalizeTaskType(parsed.taskType),
      context: typeof parsed.context === 'string' ? parsed.context : '',
      outputRequirements: typeof parsed.outputRequirements === 'string' ? parsed.outputRequirements : '',
      reviewDepth: isReviewDepth(parsed.reviewDepth) ? parsed.reviewDepth : 'standard'
    };
  } catch {
    return emptyForm;
  }
}

function hasFormDraft(form: PromptFormState) {
  return Boolean(
    form.prompt.trim() ||
      form.taskDescription.trim() ||
      form.customTaskType.trim() ||
      form.context.trim() ||
      form.outputRequirements.trim() ||
      form.taskType !== 'general' ||
      form.reviewDepth !== 'standard'
  );
}

function isTaskType(value: unknown): value is PromptFormState['taskType'] {
  return (
    value === 'general' ||
    value === 'learning' ||
    value === 'content' ||
    value === 'summary' ||
    value === 'extraction' ||
    value === 'qa' ||
    value === 'rag' ||
    value === 'coding' ||
    value === 'data' ||
    value === 'translation' ||
    value === 'custom'
  );
}

function normalizeTaskType(value: unknown): PromptFormState['taskType'] {
  if (isTaskType(value)) {
    return value;
  }
  if (value === 'writing') {
    return 'summary';
  }
  return 'general';
}

function isReviewDepth(value: unknown): value is PromptFormState['reviewDepth'] {
  return value === 'quick' || value === 'standard' || value === 'deep' || value === 'optimizedOnly' || value === 'strict';
}

function getReviewDepthCanonical(reviewDepth: PromptFormState['reviewDepth']) {
  const values: Record<PromptFormState['reviewDepth'], string> = {
    quick: '快速诊断',
    standard: '标准诊断',
    deep: '深度诊断',
    optimizedOnly: '只输出优化版',
    strict: '严格评分模式'
  };
  return values[reviewDepth];
}

function getTaskTypeCanonical(taskType: PromptFormState['taskType']) {
  const values: Record<PromptFormState['taskType'], string> = {
    general: '通用任务',
    content: '内容生成',
    summary: '总结改写',
    extraction: '信息提取',
    qa: '问答助手',
    learning: '学习辅导',
    coding: '编程辅助',
    data: '数据分析',
    translation: '翻译 / 多语言',
    rag: '问答助手',
    custom: '通用任务'
  };
  return values[taskType];
}

function getTaskDescriptionPayload(form: PromptFormState, t: (typeof dictionaries)['zh']) {
  const customTaskType = form.customTaskType.trim();
  if (form.taskType !== 'custom' || !customTaskType) {
    return form.taskDescription;
  }

  const customLine = `${t.form.taskType.customPayloadPrefix} ${customTaskType}`;
  return [form.taskDescription.trim(), customLine].filter(Boolean).join('\n\n');
}

function getReadableErrorMessage(error: unknown, t: (typeof dictionaries)['zh']) {
  if (error instanceof LocalApiError) {
    const parts = [error.message || 'Local chat request failed'];
    if (error.status) {
      parts.push(`Status: ${error.status}`);
    }
    if (!/not configured/i.test(error.message)) {
      parts.push(t.report.difyErrorHint);
    }
    return parts.join(' ');
  }

  if (error instanceof Error && error.message) {
    return `${error.message} ${t.report.difyErrorHint}`;
  }

  return `Network error. ${t.report.difyErrorHint}`;
}
