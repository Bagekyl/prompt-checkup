import type { PromptFormState } from '../components/PromptForm';
import type { Language } from '../i18n';

export type MockReport = {
  advancedPrompt: string;
  lastAnswer: string;
  markdown: string;
  optimizedPrompt: string;
};

export const examplePrompt: Record<Language, PromptFormState> = {
  zh: {
    customTaskType: '',
    prompt:
      '你是一个知识库问答助手。请根据给定知识库回答用户问题，必须给出引用。如果没有相关资料，也要根据经验推测一个答案。',
    taskDescription: '企业知识库问答 Prompt 诊断',
    taskType: 'rag',
    context: '用于内部政策、报销和合规问题。希望减少幻觉和伪造引用风险。',
    outputRequirements: '输出 Markdown 报告，包含评分、风险、优化版 Prompt 和增强版 Prompt。',
    reviewDepth: 'strict'
  },
  en: {
    customTaskType: 'Product analytics',
    prompt:
      'You are a product analyst. Analyze customer feedback and summarize product issues, sentiment, evidence quotes, and recommended actions.',
    taskDescription: 'Product feedback analysis prompt review',
    taskType: 'custom',
    context: 'Used by a product team to review qualitative feedback from support tickets and surveys.',
    outputRequirements: 'Return a Markdown report with score, risks, optimized prompt, and advanced prompt.',
    reviewDepth: 'standard'
  },
  ja: {
    customTaskType: '',
    prompt:
      'あなたは日本語作文の添削先生です。次の文章を自然な日本語に直し、主な修正点と次に注意すべきポイントを説明してください。',
    taskDescription: '日本語作文添削プロンプトの診断',
    taskType: 'summary',
    context: '日本語学習者向け。学習者の意図を変えず、自然な表現に改善したい。',
    outputRequirements: 'Markdown レポート、スコア、改善版、拡張版プロンプトを出力。',
    reviewDepth: 'standard'
  }
};

const optimizedZh = `你是一个企业知识库问答助手。请严格基于已检索到的知识库片段回答用户问题。

规则：
1. 只有当知识库片段支持结论时，才给出明确答案。
2. 如果资料不足，请说明“当前知识库无法确认”，并列出需要补充的信息。
3. 不得伪造引用、文件名、章节号或政策条款。
4. 对报销、合同、劳动用工和合规问题，必须提示用户以正式制度或负责人确认为准。

输出：
- 简要结论
- 依据片段
- 无法确认的信息
- 建议下一步`;

const advancedZh = `你是一个企业知识库问答助手，目标是在不伪造依据的前提下，帮助用户理解内部政策和流程。

请根据输入的【用户问题】和【知识库片段】回答：

1. 先判断知识库片段是否足以支持结论。
2. 如果足够，输出简明答案，并逐条标明依据。
3. 如果不足，必须明确说明无法确认，不得根据常识推测为确定结论。
4. 对合规、劳动、合同、报销等高风险问题，只能提供信息整理和待确认事项，不得替代正式审批或法律意见。
5. 所有引用都必须来自输入片段，不得编造来源。

输出格式：

## 结论

## 依据

## 风险与限制

## 建议补充信息`;

const optimizedEn = `You are a product feedback analyst. Analyze only the provided customer feedback.

Return:
- Executive summary
- Issue categories with evidence quotes
- Sentiment signals
- Product action recommendations

Rules:
- Do not invent evidence.
- If feedback is too short, explain what information is missing.
- Separate observed facts from recommendations.`;

const advancedEn = `You are a senior product feedback analyst helping a product manager turn qualitative feedback into clear next actions.

Use only the provided feedback text. Do not infer user intent beyond the evidence.

Output:

## Executive Summary

## Issue Categories
For each category, include:
- Description
- Evidence quotes
- Estimated severity
- Confidence level

## Sentiment Signals

## Recommended Actions
Separate quick fixes from product discovery questions.

## Missing Information
List any missing context that would make the analysis more reliable.`;

const optimizedJa = `あなたは日本語作文の添削先生です。学習者の意図を変えず、自然な日本語に直してください。

出力：
1. 修正後の文章
2. 主な修正点
3. 次に注意すべきポイント

条件：
- 学習者のレベルに合わせた説明にしてください。
- 難しすぎる表現を避けてください。
- 判断できない部分は、確認が必要だと明記してください。`;

const advancedJa = `あなたは日本語作文の添削先生です。以下の【学習者の文章】を、学習目的に合わせて自然な日本語に改善してください。

方針：
1. 学習者の意図や事実関係を変えない。
2. 不自然な表現、文法、語彙、敬体・常体の揺れを確認する。
3. 学習者レベルが不明な場合は、中級者向けの説明にする。
4. 複数の自然な言い換えがある場合は、代表例を示す。

出力形式：

## 修正後の文章

## 主な修正点

## より自然な表現

## 次に注意すべきポイント`;

export const mockReports: Record<Language, MockReport> = {
  zh: {
    optimizedPrompt: optimizedZh,
    advancedPrompt: advancedZh,
    lastAnswer: '已根据上一轮报告生成一版更安全的 RAG Prompt，重点避免无依据推测和伪造引用。',
    markdown: `# Prompt 体检报告

> 这是 Web UI 静态原型中的 mock report，用于验证 Markdown 渲染、复制、下载和渐进展示效果。

## 总体结论

| 项目 | 结果 |
| --- | --- |
| 最终评分 | 42 / 100 |
| 等级 | 需要重写 |
| 风险等级 | 高风险 |
| 风险封顶 | yes |

该 Prompt 的任务目标清晰，但存在明显冲突：它要求“严格基于知识库”，同时又要求资料不足时进行推测。这会显著提高幻觉、伪造引用和错误合规建议风险。

## 主要问题

- 知识库不足时仍要求推测，破坏 RAG 的来源优先原则。
- 要求必须给出引用，但没有限制引用必须来自真实片段。
- 对政策、合同、合规类问题要求直接结论，风险较高。
- 禁止回答不知道，会迫使模型输出无依据内容。

## 优化版 Prompt

\`\`\`text
${optimizedZh}
\`\`\`

## 增强版 Prompt

\`\`\`text
${advancedZh}
\`\`\`

---

后续建议：在连接 Dify API 后，将本报告区域替换为真实 Chatflow 输出，并保留复制与下载能力。`
  },
  en: {
    optimizedPrompt: optimizedEn,
    advancedPrompt: advancedEn,
    lastAnswer: 'The optimized prompt now separates observed evidence from recommendations and avoids unsupported claims.',
    markdown: `# Prompt Diagnosis Report

> This is a mock report for the static Web UI prototype. It validates Markdown rendering, copy actions, download, and progressive display.

## Overall Assessment

| Item | Result |
| --- | --- |
| Final score | 78 / 100 |
| Grade | Usable with improvements |
| Risk level | Low / Medium |
| Risk cap | no |

The prompt has a clear task and useful output structure. The main improvement is to define evidence handling, confidence, severity, and missing-information behavior more explicitly.

## Main Issues

- Issue categories are not clearly defined.
- Evidence quotes are requested, but confidence handling is not specified.
- Product recommendations could mix observed facts with assumptions.
- The prompt should ask for missing information when feedback is too short.

## Optimized Prompt

\`\`\`text
${optimizedEn}
\`\`\`

## Advanced Prompt

\`\`\`text
${advancedEn}
\`\`\`

---

Next step: when the Dify API is connected, replace this mock report with the real Chatflow response while keeping copy and export actions.`
  },
  ja: {
    optimizedPrompt: optimizedJa,
    advancedPrompt: advancedJa,
    lastAnswer: '改善版では、学習者レベル、添削方針、確認できない内容の扱いを明確にしました。',
    markdown: `# プロンプト診断レポート

> これは Web UI 静的プロトタイプ用の mock report です。Markdown 表示、コピー、保存、段階的な表示を確認するためのものです。

## 総合評価

| 項目 | 結果 |
| --- | --- |
| 最終スコア | 80 / 100 |
| 評価 | 改善すれば実用可 |
| リスク | 低〜中 |
| リスク上限 | no |

タスクは明確で、出力形式も比較的わかりやすいです。改善点は、学習者レベル、添削の厳しさ、説明の深さをより明確にすることです。

## 主な課題

- 学習者レベルが指定されていない。
- どの程度自然に直すか、添削方針が少し曖昧。
- 修正理由の説明量が指定されていない。
- 判断できない内容の扱いを明示するとより安全。

## 改善版プロンプト

\`\`\`text
${optimizedJa}
\`\`\`

## 拡張版プロンプト

\`\`\`text
${advancedJa}
\`\`\`

---

次の段階では、Dify API 接続後にこの mock report を実際の Chatflow 出力に置き換えます。`
  }
};

export function createFollowUpReply(language: Language, userRequest: string) {
  if (language === 'en') {
    return `Mock adjustment received: "${userRequest}". In the connected version, this will be sent as a follow-up request to the Dify Chatflow. For now, the prototype would return a shorter and stricter version of the advanced prompt.`;
  }
  if (language === 'ja') {
    return `Mock 調整を受け取りました：「${userRequest}」。接続版では、この内容を Dify Chatflow の追加入力として送信します。現段階では、拡張版プロンプトを短く、より明確にした結果を返す想定です。`;
  }
  return `已收到 mock 追问：「${userRequest}」。接入 Dify Chatflow 后，这里会把追问作为多轮调整请求发送。当前原型会模拟返回一版更短、更严格的增强版 Prompt。`;
}
