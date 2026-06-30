import type { ReviewDepth, TaskType } from '../components/PromptForm';

export type Language = 'en' | 'ja' | 'zh';

export type Dictionary = {
  footer: {
    difyTemplate: string;
    documentation: string;
    lines: string[];
    localWebUi: string;
    roadmap: string;
  };
  followUp: {
    conversation: string;
    description: string;
    errorTitle: string;
    historyTitle: string;
    loading: string;
    newSession: string;
    noConversation: string;
    placeholder: string;
    quickActions: string[];
    reDiagnoseQuery: string;
    send: string;
    title: string;
  };
  form: {
    actions: {
      clear: string;
      fill: string;
      start: string;
    };
    context: FieldCopy;
    description: string;
    kicker: string;
    outputRequirements: FieldCopy;
    prompt: FieldCopy;
    promptRequired: string;
    reviewDepth: {
      label: string;
      options: Array<{ label: string; value: ReviewDepth }>;
    };
    taskDescription: FieldCopy;
    taskType: FieldCopy & {
      customLabel: string;
      customPayloadPrefix: string;
      customPlaceholder: string;
      options: Array<{ label: string; value: TaskType }>;
    };
    title: string;
    startQuery: string;
  };
  header: {
    language: string;
    subtitle: string;
  };
  mockControls: {
    clearReport: string;
    collapse: string;
    description: string;
    expand: string;
    label: string;
    showError: string;
    showReport: string;
  };
  report: {
    actions: {
      copyFull: string;
      copyLast: string;
      download: string;
    };
    badges: {
      error: string;
      live: string;
      mock: string;
      waiting: string;
    };
    difyErrorHint: string;
    emptyDescription: string;
    emptyTitle: string;
    errorDescription: string;
    errorTitle: string;
    kicker: string;
    loadingDescription: string;
    loadingTitle: string;
    title: string;
  };
  toast: {
    cleared: string;
    copied: string;
    downloaded: string;
    draftRestored: string;
    draftSaved: string;
    exampleFilled: string;
    newSession: string;
    noReport: string;
    reportCleared: string;
  };
};

type FieldCopy = {
  label: string;
  placeholder: string;
};
