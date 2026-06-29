const optimizedHeadings = [
  '优化版 Prompt',
  '优化版 prompt',
  'Optimized Prompt',
  'optimized prompt',
  '改善版プロンプト'
];

const advancedHeadings = [
  '增强版 Prompt',
  '增强版 prompt',
  'Advanced Prompt',
  'advanced prompt',
  '拡張版プロンプト'
];

export function extractOptimizedPrompt(markdown: string) {
  return extractCodeBlockAfterHeading(markdown, optimizedHeadings);
}

export function extractAdvancedPrompt(markdown: string) {
  return extractCodeBlockAfterHeading(markdown, advancedHeadings);
}

function extractCodeBlockAfterHeading(markdown: string, headings: string[]) {
  const headingPattern = headings.map(escapeRegExp).join('|');
  const fence = '`'.repeat(3);
  const pattern = new RegExp(
    String.raw`(?:^|\n)#{1,4}\s*(?:${headingPattern})\s*\n[\s\S]*?` +
      fence +
      String.raw`(?:\w+)?\s*\n([\s\S]*?)\n` +
      fence,
    'i'
  );
  const match = markdown.match(pattern);
  return match?.[1]?.trim() || '';
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
