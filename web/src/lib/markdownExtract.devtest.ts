import { extractAdvancedPrompt, extractOptimizedPrompt } from './markdownExtract';

const fence = '```';

const cases = [
  {
    name: 'Chinese optimized heading with markdown code block',
    actual: extractOptimizedPrompt(`# 报告

## 优化版 Prompt

${fence}markdown
# 角色
你是一个写作助手。
${fence}`),
    expected: '# 角色\n你是一个写作助手。'
  },
  {
    name: 'English advanced heading with plain code block',
    actual: extractAdvancedPrompt(`# Report

## Advanced Prompt

${fence}
# Role
You are a reviewer.
${fence}`),
    expected: '# Role\nYou are a reviewer.'
  },
  {
    name: 'Japanese optimized heading with text code block',
    actual: extractOptimizedPrompt(`# レポート

## 改善版プロンプト

${fence}text
# 役割
あなたは添削者です。
${fence}`),
    expected: '# 役割\nあなたは添削者です。'
  },
  {
    name: 'Skip invalid markdown-only code block',
    actual: extractAdvancedPrompt(`# Report

## Enhanced Prompt

${fence}markdown
markdown
${fence}

${fence}md
# Task
Rewrite the prompt safely.
${fence}`),
    expected: '# Task\nRewrite the prompt safely.'
  },
  {
    name: 'Fallback to section body without code block',
    actual: extractOptimizedPrompt(`# Report

## Improved Prompt

# Role
You are a concise assistant.

## Next Section
Not part of the prompt.`),
    expected: '# Role\nYou are a concise assistant.'
  }
];

for (const testCase of cases) {
  if (testCase.actual !== testCase.expected) {
    throw new Error(
      `${testCase.name} failed.\nExpected:\n${testCase.expected}\n\nActual:\n${testCase.actual}`
    );
  }
}

console.log(`markdown extraction dev checks passed: ${cases.length}`);
