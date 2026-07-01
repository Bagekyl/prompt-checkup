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
      customPayloadPrefix: '用户自定义任务类型：',
      customPlaceholder: '填写你的任务类型',
      options: [
        { label: '通用任务', value: 'general' },
        { label: '内容生成', value: 'content' },
        { label: '总结改写', value: 'summary' },
        { label: '信息提取', value: 'extraction' },
        { label: '问答助手', value: 'qa' },
        { label: '学习辅导', value: 'learning' },
        { label: '编程辅助', value: 'coding' },
        { label: '数据分析', value: 'data' },
        { label: '翻译 / 多语言', value: 'translation' },
        { label: 'RAG / 知识库问答', value: 'rag' },
        { label: '自定义', value: 'custom' }
      ]
    },
    context: {
      label: '背景信息',
      placeholder: '补充业务背景、用户对象、输入来源或限制条件。'
    },
    demoAccessCode: {
      label: '试用访问码',
      placeholder: '公开 Demo 需要访问码',
      clear: '清除访问码',
      helper: '访问码只保存在本机浏览器 localStorage，并通过请求 header 发送。'
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
    errorStatusLabel: '状态',
    errorHintLabel: '建议',
    errors: {
      accessCodeTitle: '访问码无效或缺失',
      accessCodeDescription: '请填写正确的试用访问码后再试。',
      inputTooLongTitle: '输入内容过长',
      inputTooLongDescription: '请缩短待评估 Prompt、背景信息或输出要求后再试。',
      networkTitle: '网络请求失败',
      networkDescription: '请检查网络连接，或稍后重试。',
      serverConfigTitle: '服务端配置不完整',
      serverConfigDescription: 'Dify API Key 尚未配置。请检查 Vercel Environment Variables。',
      timeoutTitle: '诊断请求超时',
      timeoutDescription: 'Dify Chatflow 或上游模型响应时间过长。',
      timeoutHint: '复杂报告在 blocking mode 下可能需要较长时间。请尝试缩短 Prompt、使用较轻诊断模式，或稍后重试。',
      unknownTitle: '诊断请求失败'
    },
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
    localWebUi: 'Local Web UI',
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
    newSession: '新会话已开始。表单内容已保留。',
    noReport: '当前没有可复制的报告',
    reportCleared: '报告已清空'
  }
};
