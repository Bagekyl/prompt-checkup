import type { Dictionary } from './types';

export const zh: Dictionary = {
  header: {
    subtitle: '多语言 Prompt 体检与优化工具 / Multilingual Prompt Diagnosis & Optimization',
    language: '界面语言'
  },
  form: {
    kicker: 'Prompt 体检表单',
    title: '描述你的提示词任务',
    description: '填写表单后，PromptCheckup 会通过本地 Dify API wrapper 调用你的 Dify Chatflow，并生成真实诊断报告。',
    prompt: {
      label: '待评估 Prompt',
      placeholder: '粘贴你想体检和优化的 Prompt...'
    },
    promptRequired: '请先填写待评估 Prompt。',
    taskDescription: {
      label: '任务描述',
      placeholder: '例如：RAG 问答、产品反馈分析、写作批改'
    },
    taskType: {
      label: '任务类型',
      placeholder: '选择任务类型',
      customLabel: '自定义任务类型',
      customPlaceholder: '填写你的任务类型',
      options: [
        { label: '通用任务', value: 'general' },
        { label: '学习辅导', value: 'learning' },
        { label: '写作润色', value: 'writing' },
        { label: '内容生成', value: 'content' },
        { label: 'RAG / 知识库问答', value: 'rag' },
        { label: '代码辅助', value: 'coding' },
        { label: '数据分析', value: 'data' },
        { label: '翻译 / 多语言', value: 'translation' },
        { label: '自定义', value: 'custom' }
      ]
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
    },
    startQuery: '开始诊断'
  },
  report: {
    kicker: 'Mock report',
    title: '诊断报告',
    emptyTitle: '填写表单后开始诊断',
    emptyDescription: '这里会展示 Markdown 报告、评分、风险提示、优化版 Prompt 和增强版 Prompt。',
    loadingTitle: '正在生成诊断...',
    loadingDescription: '本地 wrapper 正在调用 Dify Chatflow，并等待诊断报告返回。',
    errorTitle: '诊断请求失败',
    errorDescription: '请求失败。请检查 Dify API Key、模型供应商配置或网络状态。',
    difyErrorHint: '请求失败。请检查 Dify API Key、模型供应商配置或网络状态。',
    badges: {
      mock: '模拟报告',
      live: '真实报告',
      error: '错误状态',
      waiting: '等待诊断'
    },
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
    description: '基于当前会话继续追问、调整上一轮报告，或按当前表单重新诊断。',
    placeholder: '例如：把增强版压缩到 300 字以内',
    conversation: '当前会话',
    newSession: '新会话',
    send: '发送',
    loading: '正在发送追问...',
    errorTitle: '追问请求失败',
    historyTitle: '多轮消息历史',
    noConversation: '请先运行一次诊断，再进行追问。',
    reDiagnoseQuery: '我已经修改了表单内容，请根据当前表单重新进行完整诊断。',
    quickActions: ['缩短增强版 Prompt', '改得更严格', '改成英文', '改成日文', '只保留优化版', '根据当前表单重新诊断']
  },
  mockControls: {
    label: '开发者预览工具',
    description: '用于预览 mock 报告、错误状态和清空报告，不影响正式诊断。',
    expand: '展开',
    collapse: '收起',
    showReport: '显示模拟报告',
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
    draftRestored: '已恢复本地表单草稿',
    draftSaved: '表单草稿已自动保存。',
    cleared: '表单已清空',
    exampleFilled: '示例已填入',
    advancedNotFound: '当前报告中未找到可复制的增强版 Prompt。',
    newSession: '新会话已开始。表单内容已保留。',
    noReport: '当前没有可复制的报告',
    optimizedNotFound: '当前报告中未找到可复制的优化版 Prompt。',
    reportCleared: '报告已清空'
  }
};
