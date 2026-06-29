import type { ReviewDepth } from '../components/PromptForm';

export type Language = 'en' | 'ja' | 'zh';

export type Dictionary = {
  footer: {
    difyTemplate: string;
    documentation: string;
    lines: string[];
    roadmap: string;
  };
  followUp: {
    conversation: string;
    description: string;
    newSession: string;
    placeholder: string;
    quickActions: string[];
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
    taskType: FieldCopy;
    title: string;
    startQuery: string;
  };
  header: {
    language: string;
    subtitle: string;
  };
  mockControls: {
    clearReport: string;
    label: string;
    showError: string;
    showReport: string;
  };
  report: {
    actions: {
      copyAdvanced: string;
      copyFull: string;
      copyLast: string;
      copyOptimized: string;
      download: string;
    };
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
    advancedNotFound: string;
    cleared: string;
    copied: string;
    downloaded: string;
    exampleFilled: string;
    newSession: string;
    noReport: string;
    optimizedNotFound: string;
    reportCleared: string;
  };
};

type FieldCopy = {
  label: string;
  placeholder: string;
};
