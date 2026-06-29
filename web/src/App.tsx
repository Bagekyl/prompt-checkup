import { useMemo, useState } from 'react';
import Footer from './components/Footer';
import FollowUpBox, { type FollowUpMessage } from './components/FollowUpBox';
import Header from './components/Header';
import MockControls, { type ReportStatus } from './components/MockControls';
import PromptForm, { type PromptFormState } from './components/PromptForm';
import ReportPanel, { type ReportContent } from './components/ReportPanel';
import { dictionaries, type Language } from './i18n';
import { sendLocalChatMessage } from './lib/apiClient';
import { extractAdvancedPrompt, extractOptimizedPrompt } from './lib/markdownExtract';
import { createFollowUpReply, examplePrompt, mockReports } from './lib/mockReport';

const emptyForm: PromptFormState = {
  prompt: '',
  taskDescription: '',
  taskType: '',
  context: '',
  outputRequirements: '',
  reviewDepth: 'standard'
};

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [form, setForm] = useState<PromptFormState>(emptyForm);
  const [status, setStatus] = useState<ReportStatus>('empty');
  const [activeReport, setActiveReport] = useState<ReportContent | null>(null);
  const [conversationId, setConversationId] = useState('');
  const [lastMessageId, setLastMessageId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState<FollowUpMessage[]>([]);
  const [toast, setToast] = useState('');
  const t = dictionaries[language];
  const mockReport = useMemo(() => mockReports[language], [language]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1900);
  };

  const showMockReport = () => {
    setActiveReport(mockReport);
    setErrorMessage('');
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

    try {
      const response = await sendLocalChatMessage({
        conversation_id: conversationId,
        inputs: {
          prompt_text: form.prompt,
          task_description: form.taskDescription,
          task_type: form.taskType,
          context: form.context,
          output_requirements: form.outputRequirements,
          review_depth: getReviewDepthLabel(form, t)
        },
        query: t.form.startQuery,
        user: 'local-user'
      });

      setConversationId(response.conversation_id);
      setLastMessageId(response.message_id);
      setActiveReport({
        advancedPrompt: extractAdvancedPrompt(response.answer),
        lastAnswer: response.answer,
        markdown: response.answer,
        messageId: response.message_id,
        optimizedPrompt: extractOptimizedPrompt(response.answer)
      });
      setStatus('report');
    } catch (error) {
      setErrorMessage(getReadableErrorMessage(error));
      setStatus('error');
    }
  };

  const clearForm = () => {
    setForm(emptyForm);
    setStatus('empty');
    setMessages([]);
    setActiveReport(null);
    setErrorMessage('');
    showToast(t.toast.cleared);
  };

  const fillExample = () => {
    setForm(examplePrompt[language]);
    setStatus('empty');
    showToast(t.toast.exampleFilled);
  };

  const clearReport = () => {
    setStatus('empty');
    setMessages([]);
    setActiveReport(null);
    setErrorMessage('');
    showToast(t.toast.reportCleared);
  };

  const setMockError = () => {
    setErrorMessage(t.report.errorDescription);
    setStatus('error');
    setMessages([]);
  };

  const newSession = () => {
    setConversationId('');
    setLastMessageId('');
    setMessages([]);
    showToast(t.toast.newSession);
  };

  const onSendFollowUp = (content: string) => {
    const userMessage: FollowUpMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };
    const assistantMessage: FollowUpMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: createFollowUpReply(language, content)
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setStatus((current) => (current === 'empty' && activeReport ? 'report' : current));
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
            <ReportPanel errorMessage={errorMessage} report={activeReport} showToast={showToast} status={status} t={t} />
            <FollowUpBox
              conversationId={conversationId}
              messages={messages}
              onNewSession={newSession}
              onSend={onSendFollowUp}
              t={t}
            />
          </section>
        </main>

        <Footer t={t} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-lavender-200 bg-white/95 px-4 py-2 text-sm font-medium text-lavender-800 shadow-soft backdrop-blur">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function getReviewDepthLabel(form: PromptFormState, t: (typeof dictionaries)['zh']) {
  return t.form.reviewDepth.options.find((option) => option.value === form.reviewDepth)?.label || form.reviewDepth;
}

function getReadableErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Network error';
}
