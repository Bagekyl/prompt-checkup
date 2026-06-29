import type { Dictionary } from './types';

export const en: Dictionary = {
  header: {
    subtitle: 'Multilingual Prompt Diagnosis & Optimization',
    language: 'UI language'
  },
  form: {
    kicker: 'Prompt checkup form',
    title: 'Describe your prompt task',
    description: 'This static prototype uses a mock report to preview the future Dify Chatflow experience.',
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
      placeholder: 'Example: knowledge-base QA'
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
    loadingTitle: 'Simulating diagnosis...',
    loadingDescription: 'Running precheck, task classification, risk review, and report generation.',
    errorTitle: 'Static error state',
    errorDescription: 'This is a styled prototype state. No real API is connected yet.',
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
    description: 'Mock a second-turn request to compress, rewrite, or re-diagnose the previous result.',
    placeholder: 'Example: compress the advanced prompt to 300 words',
    conversation: 'Current session',
    newSession: 'New Session',
    send: 'Send',
    quickActions: [
      'Shorten the advanced prompt',
      'Make it stricter',
      'Rewrite in English',
      'Rewrite in Japanese',
      'Re-diagnose current form'
    ]
  },
  mockControls: {
    label: 'Prototype state controls',
    showReport: 'Show report',
    showError: 'Error state',
    clearReport: 'Clear report'
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
    cleared: 'Form cleared',
    exampleFilled: 'Example filled',
    advancedNotFound: 'Could not find an advanced prompt block in the current report.',
    newSession: 'New session started',
    noReport: 'There is no report to copy yet',
    optimizedNotFound: 'Could not find an optimized prompt block in the current report.',
    reportCleared: 'Report cleared'
  }
};
