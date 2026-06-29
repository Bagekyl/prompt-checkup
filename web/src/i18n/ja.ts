import type { Dictionary } from './types';

export const ja: Dictionary = {
  header: {
    subtitle: '多言語プロンプト診断・改善ツール / Multilingual Prompt Diagnosis & Optimization',
    language: 'UI 言語'
  },
  form: {
    kicker: 'プロンプト診断フォーム',
    title: 'プロンプトのタスクを説明',
    description: 'この段階では静的プロトタイプとして、mock レポートで Dify Chatflow 体験を再現します。',
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
      placeholder: '例：ナレッジベース QA'
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
        { label: 'クイック診断', value: 'quick' },
        { label: '標準診断', value: 'standard' },
        { label: '詳細診断', value: 'deep' },
        { label: '改善版プロンプトのみ', value: 'optimizedOnly' },
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
    loadingTitle: '診断をシミュレーション中...',
    loadingDescription: '構造チェック、タスク分類、リスク評価、レポート生成を実行しています。',
    errorTitle: '静的エラー状態',
    errorDescription: 'これはスタイル確認用のプロトタイプ状態です。まだ実 API には接続していません。',
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
    description: '前回の拡張版プロンプトを短縮、書き換え、再診断する mock 入力です。',
    placeholder: '例：拡張版プロンプトを 300 字以内に短縮',
    conversation: '現在のセッション',
    newSession: '新しいセッション',
    send: '送信',
    quickActions: [
      '拡張版プロンプトを短くする',
      'より厳格にする',
      '英語にする',
      '日本語にする',
      '現在のフォームを再診断'
    ]
  },
  mockControls: {
    label: 'プロトタイプ状態',
    showReport: 'レポート表示',
    showError: 'エラー状態',
    clearReport: 'レポートをクリア'
  },
  footer: {
    difyTemplate: 'Dify Template · 準備中',
    documentation: 'Documentation',
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
    cleared: 'フォームをクリアしました',
    exampleFilled: 'サンプルを入力しました',
    advancedNotFound: '現在のレポートに拡張版プロンプトのコードブロックが見つかりません。',
    newSession: '新しいセッションを開始しました',
    noReport: 'コピーできるレポートはまだありません',
    optimizedNotFound: '現在のレポートに改善版プロンプトのコードブロックが見つかりません。',
    reportCleared: 'レポートをクリアしました'
  }
};
