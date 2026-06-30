import type { Dictionary } from './types';

export const ja: Dictionary = {
  header: {
    subtitle: '多言語プロンプト診断・改善ツール / Multilingual Prompt Diagnosis & Optimization',
    language: 'UI 言語'
  },
  form: {
    kicker: 'プロンプト診断フォーム',
    title: 'プロンプトのタスクを説明',
    description:
      'フォームに入力すると、ローカルの Dify API ラッパー経由であなたの Dify Chatflow を呼び出し、実際の診断レポートを生成します。',
    prompt: {
      label: '診断対象プロンプト',
      placeholder: '診断・改善したいプロンプトを貼り付けてください...'
    },
    promptRequired: '先に診断対象プロンプトを入力してください。',
    taskDescription: {
      label: 'タスク説明',
      placeholder: '例：RAG QA、商品フィードバック分析、作文添削'
    },
    taskType: {
      label: 'タスクタイプ',
      placeholder: 'タスクタイプを選択',
      customLabel: 'カスタムタスクタイプ',
      customPayloadPrefix: 'ユーザー定義タスクタイプ：',
      customPlaceholder: 'カスタムタスクタイプを入力',
      options: [
        { label: '汎用タスク', value: 'general' },
        { label: 'コンテンツ生成', value: 'content' },
        { label: '要約・書き換え', value: 'summary' },
        { label: '情報抽出', value: 'extraction' },
        { label: 'QA アシスタント', value: 'qa' },
        { label: '学習支援', value: 'learning' },
        { label: 'コーディング支援', value: 'coding' },
        { label: 'データ分析', value: 'data' },
        { label: '翻訳 / 多言語', value: 'translation' },
        { label: 'RAG / ナレッジベースQA', value: 'rag' },
        { label: 'カスタム', value: 'custom' }
      ]
    },
    context: {
      label: '背景情報',
      placeholder: '業務背景、対象ユーザー、入力元、制約条件を補足してください。'
    },
    outputRequirements: {
      label: '出力要件',
      placeholder: 'Markdown、表、JSON、引用、固定フォーマットなどを指定してください。'
    },
    reviewDepth: {
      label: '診断深度',
      options: [
        { label: '簡易診断', value: 'quick' },
        { label: '標準診断', value: 'standard' },
        { label: '詳細診断', value: 'deep' },
        { label: '改善版のみ', value: 'optimizedOnly' },
        { label: '厳格採点モード', value: 'strict' }
      ]
    },
    actions: {
      start: '診断を開始',
      clear: 'フォームをクリア',
      fill: 'サンプルを入力'
    },
    startQuery: '开始诊断'
  },
  report: {
    kicker: 'Mock report',
    title: '診断レポート',
    emptyTitle: 'フォームを入力して診断を開始',
    emptyDescription: 'Markdown レポート、スコア、リスクメモ、改善版と拡張版プロンプトをここに表示します。',
    loadingTitle: '診断レポートを生成中...',
    loadingDescription: 'ローカルラッパーがあなたの Dify Chatflow を呼び出し、レポートの返却を待っています。',
    errorTitle: '診断リクエストに失敗しました',
    errorDescription: 'リクエストに失敗しました。Dify API キー、モデルプロバイダー設定、またはネットワーク状態を確認してください。',
    difyErrorHint: 'リクエストに失敗しました。Dify API キー、モデルプロバイダー設定、またはネットワーク状態を確認してください。',
    badges: {
      mock: 'モックレポート',
      live: '診断レポート',
      error: 'エラー状態',
      waiting: '診断待ち'
    },
    actions: {
      copyFull: '全文をコピー',
      copyLast: '最後の回答をコピー',
      copyOptimized: '改善版をコピー',
      copyAdvanced: '拡張版をコピー',
      download: 'Markdown を保存'
    }
  },
  followUp: {
    title: '追加調整',
    description: '現在の会話を続けて、最新レポートの調整や現在のフォームでの再診断を行います。',
    placeholder: '例：拡張版プロンプトを 300 字以内に短縮',
    conversation: '現在のセッション',
    newSession: '新しいセッション',
    send: '送信',
    loading: '追加指示を送信中...',
    errorTitle: '追加指示の送信に失敗しました',
    historyTitle: '多輪メッセージ履歴',
    noConversation: '先に診断を実行してから追加指示を送信してください。',
    reDiagnoseQuery: 'フォーム内容を更新しました。現在のフォーム入力に基づいて、もう一度完全な診断を行ってください。',
    quickActions: [
      '強化版プロンプトを短くする',
      'より厳格にする',
      '英語に書き換える',
      '日本語に書き換える',
      '改善版プロンプトのみ残す',
      '現在のフォームで再診断する'
    ]
  },
  mockControls: {
    label: '開発者プレビューツール',
    description: 'mock レポート、エラー状態、レポートのクリアを確認するための補助ツールです。',
    expand: '展開',
    collapse: '折りたたむ',
    showReport: 'モックレポートを表示',
    showError: 'エラー状態',
    clearReport: 'レポートをクリア'
  },
  footer: {
    difyTemplate: 'Dify Template · 準備中',
    documentation: 'Documentation',
    localWebUi: 'ローカル Web UI',
    roadmap: 'Roadmap',
    lines: [
      'Dify Chatflow で構築された多言語プロンプト診断・改善ツール。',
      'プロンプトエンジニアリングの学習、AI ワークフローのデバッグ、より安全なプロンプト改善に役立ちます。',
      'テスト済み言語：中国語 · English · 日本語',
      'このローカル Web UI は、あなた自身の Dify App API を呼び出します。モデルの使用量と API コストは、あなたの Dify ワークスペースとモデルプロバイダー設定に依存します。',
      'Bryce Xing によって開発 · MIT License でオープンソース公開'
    ]
  },
  toast: {
    copied: 'クリップボードにコピーしました',
    downloaded: 'Markdown を保存しました',
    draftRestored: 'ローカルの下書きを復元しました',
    draftSaved: '下書きはローカルに保存されました。',
    cleared: 'フォームをクリアしました',
    exampleFilled: 'サンプルを入力しました',
    advancedNotFound: '現在のレポート内にコピー可能な強化版プロンプトが見つかりませんでした。',
    newSession: '新しいセッションを開始しました。フォーム内容は保持されています。',
    noReport: 'コピーできるレポートはまだありません',
    optimizedNotFound: '現在のレポート内にコピー可能な改善版プロンプトが見つかりませんでした。',
    reportCleared: 'レポートをクリアしました'
  }
};
