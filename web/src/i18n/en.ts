import type { Dictionary } from './types';

export const en: Dictionary = {
  header: {
    subtitle: 'Multilingual Prompt Diagnosis & Optimization',
    language: 'UI language'
  },
  form: {
    kicker: 'Prompt checkup form',
    title: 'Describe your prompt task',
    description: 'Fill in the form to call your Dify Chatflow through the local Dify API wrapper and generate a real diagnosis report.',
    prompt: {
      label: 'Prompt to Check',
      placeholder: 'Paste the prompt you want to diagnose and optimize...'
    },
    promptRequired: 'Please enter a prompt to check first.',
    taskDescription: {
      label: 'Task Description',
      placeholder: 'Example: RAG QA, product feedback analysis, writing correction'
    },
    taskType: {
      label: 'Task Type',
      placeholder: 'Select a task type',
      customLabel: 'Custom Task Type',
      customPlaceholder: 'Enter your custom task type',
      options: [
        { label: 'General Task', value: 'general' },
        { label: 'Learning Support', value: 'learning' },
        { label: 'Writing Polishing', value: 'writing' },
        { label: 'Content Generation', value: 'content' },
        { label: 'RAG / Knowledge Base QA', value: 'rag' },
        { label: 'Coding Assistance', value: 'coding' },
        { label: 'Data Analysis', value: 'data' },
        { label: 'Translation / Multilingual', value: 'translation' },
        { label: 'Custom', value: 'custom' }
      ]
    },
    context: {
      label: 'Context',
      placeholder: 'Add business context, audience, input source, or constraints.'
    },
    outputRequirements: {
      label: 'Output Requirements',
      placeholder: 'Describe Markdown, tables, JSON, citations, or fixed output structure.'
    },
    reviewDepth: {
      label: 'Review Depth',
      options: [
        { label: 'Quick Review', value: 'quick' },
        { label: 'Standard Review', value: 'standard' },
        { label: 'Deep Review', value: 'deep' },
        { label: 'Optimized Prompt Only', value: 'optimizedOnly' },
        { label: 'Strict Scoring Mode', value: 'strict' }
      ]
    },
    actions: {
      start: 'Start Diagnosis',
      clear: 'Clear Form',
      fill: 'Fill Example'
    },
    startQuery: '开始诊断'
  },
  report: {
    kicker: 'Mock report',
    title: 'Diagnosis Report',
    emptyTitle: 'Fill the form to start diagnosis',
    emptyDescription: 'Markdown report, scores, risk notes, optimized prompt, and advanced prompt will appear here.',
    loadingTitle: 'Generating diagnosis...',
    loadingDescription: 'The local wrapper is calling your Dify Chatflow and waiting for the report.',
    errorTitle: 'Diagnosis request failed',
    errorDescription: 'Request failed. Please check your Dify API key, model provider configuration, or network connection.',
    difyErrorHint: 'Request failed. Please check your Dify API key, model provider configuration, or network connection.',
    badges: {
      mock: 'MOCK REPORT',
      live: 'LIVE REPORT',
      error: 'ERROR STATE',
      waiting: 'WAITING'
    },
    actions: {
      copyFull: 'Copy full report',
      copyLast: 'Copy last answer',
      copyOptimized: 'Copy optimized prompt',
      copyAdvanced: 'Copy advanced prompt',
      download: 'Download Markdown'
    }
  },
  followUp: {
    title: 'Follow-up Adjustment',
    description: 'Continue the current session, adjust the latest report, or re-diagnose the current form.',
    placeholder: 'Example: compress the advanced prompt to 300 words',
    conversation: 'Current session',
    newSession: 'New Session',
    send: 'Send',
    loading: 'Sending follow-up...',
    errorTitle: 'Follow-up request failed',
    historyTitle: 'Multi-turn message history',
    noConversation: 'Run a diagnosis first before sending a follow-up.',
    reDiagnoseQuery: 'I have updated the form. Please run a new full diagnosis based on the current form inputs.',
    quickActions: [
      'Shorten the advanced prompt',
      'Make it stricter',
      'Rewrite it in English',
      'Rewrite it in Japanese',
      'Keep only the optimized prompt',
      'Re-diagnose current form'
    ]
  },
  mockControls: {
    label: 'Developer Preview Tools',
    description: 'Preview mock reports, error state, and report clearing without affecting real diagnosis.',
    expand: 'Expand',
    collapse: 'Collapse',
    showReport: 'Show Mock Report',
    showError: 'Error State',
    clearReport: 'Clear Report'
  },
  footer: {
    difyTemplate: 'Dify Template · Coming soon',
    documentation: 'Documentation',
    roadmap: 'Roadmap',
    lines: [
      'A multilingual prompt diagnosis and optimization workflow built with Dify Chatflow.',
      'Built for prompt engineering learning, AI workflow debugging, and safer prompt iteration.',
      'Tested languages: Chinese · English · Japanese',
      'This local Web UI calls your own Dify App API. Model usage and API costs depend on your Dify workspace and model provider configuration.',
      'Built by Bryce Xing · Open-source under the MIT License'
    ]
  },
  toast: {
    copied: 'Copied to clipboard',
    downloaded: 'Markdown downloaded',
    draftRestored: 'Local form draft restored',
    draftSaved: 'Draft saved locally.',
    cleared: 'Form cleared',
    exampleFilled: 'Example filled',
    advancedNotFound: 'Could not find an advanced prompt block in the current report.',
    newSession: 'New session started. Form inputs are preserved.',
    noReport: 'There is no report to copy yet',
    optimizedNotFound: 'Could not find an optimized prompt block in the current report.',
    reportCleared: 'Report cleared'
  }
};
