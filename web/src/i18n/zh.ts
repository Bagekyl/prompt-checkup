import type { Dictionary } from './types';

export const zh: Dictionary = {
  header: {
    subtitle: '多语言 Prompt 体检与优化工具 / Multilingual Prompt Diagnosis & Optimization',
    language: '界面语言'
  },
  form: {
    kicker: 'Prompt 体检表单',
    title: '描述你的提示词任务',
    description: '本阶段是静态原型，会用 mock 报告模拟 Dify Chatflow 的最终体验。',
    prompt: {
      label: '待评估 Prompt',
      placeholder: '粘贴你想体检和优化的 Prompt...'
    },
    taskDescription: {
      label: '任务描述',
      placeholder: '例如：RAG 问答、产品反馈分析、写作批改'
    },
    taskType: {
      label: '任务类型',
      placeholder: '例如：知识库问答'
    },
    context: {
      label: '背景信息',
      placeholder: '补充业务背景、用户对象、输入来源或限制条件。'
    },
    outputRequirements: {
      label: '输出要求',
      placeholder: '说明你希望模型输出 Markdown、表格、JSON、引用或固定结构。'
    },
    reviewDepth: {
      label: '诊断深度',
      options: [
        { label: '快速诊断', value: 'quick' },
        { label: '标准诊断', value: 'standard' },
        { label: '深度诊断', value: 'deep' },
        { label: '只输出优化版', value: 'optimizedOnly' },
        { label: '严格评分模式', value: 'strict' }
      ]
    },
    actions: {
      start: '开始诊断',
      clear: '清空表单',
      fill: '填入示例'
    }
  },
  report: {
    kicker: 'Mock report',
    title: '诊断报告',
    emptyTitle: '填写表单后开始诊断',
    emptyDescription: '这里会展示 Markdown 报告、评分、风险提示、优化版 Prompt 和增强版 Prompt。',
    loadingTitle: '正在模拟诊断...',
    loadingDescription: '系统正在执行结构预检、任务分类、风险评估和报告生成。',
    errorTitle: '静态错误状态',
    errorDescription: '这是本阶段用于验证样式的错误状态，尚未连接真实 API。',
    actions: {
      copyFull: '复制全文',
      copyLast: '复制最后回复',
      copyOptimized: '复制优化版',
      copyAdvanced: '复制增强版',
      download: '下载 Markdown'
    }
  },
  followUp: {
    title: '追问调整',
    description: '模拟对上一轮增强版 Prompt 的压缩、改写或重新诊断请求。',
    placeholder: '例如：把增强版压缩到 300 字以内',
    send: '发送',
    quickActions: ['缩短增强版 Prompt', '改得更严格', '改成英文', '改成日文', '重新诊断当前表单']
  },
  mockControls: {
    label: '原型状态控制',
    showReport: '显示报告',
    showError: '错误状态',
    clearReport: '清空报告'
  },
  footer: {
    difyTemplate: 'Dify Template · 即将上线',
    documentation: 'Documentation',
    roadmap: 'Roadmap',
    lines: [
      '基于 Dify Chatflow 的多语言 Prompt 体检与优化工具。',
      '适用于 Prompt Engineering 学习、AI 工作流调试和更安全的提示词迭代。',
      '已测试语言：中文 · English · 日本語',
      '本地 Web UI 会调用你自己的 Dify App API。模型调用量和费用取决于你的 Dify 工作区和模型供应商配置。',
      '由 Bryce Xing 构建 · 基于 MIT License 开源'
    ]
  },
  toast: {
    copied: '已复制到剪贴板',
    downloaded: 'Markdown 已下载',
    cleared: '表单已清空',
    exampleFilled: '示例已填入',
    reportCleared: '报告已清空'
  }
};
