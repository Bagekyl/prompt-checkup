const optimizedHeadings = [
  '优化版 Prompt',
  '优化版 prompt',
  '优化后的 Prompt',
  '基础优化版 Prompt',
  '改善版 Prompt',
  'Optimized Prompt',
  'optimized prompt',
  'Optimized Version',
  'Improved Prompt',
  'Basic Optimized Prompt',
  '最適化されたプロンプト',
  '改善版プロンプト',
  '改善された Prompt'
];

const advancedHeadings = [
  '增强版 Prompt',
  '增强版 prompt',
  '强化版 Prompt',
  '完整增强版 Prompt',
  '高级版 Prompt',
  'Advanced Prompt',
  'advanced prompt',
  'Enhanced Prompt',
  'Advanced Version',
  '強化版プロンプト',
  '詳細版プロンプト',
  '高度なプロンプト',
  '拡張版プロンプト'
];

export function extractOptimizedPrompt(markdown: string) {
  return extractCodeBlockAfterHeading(markdown, optimizedHeadings);
}

export function extractAdvancedPrompt(markdown: string) {
  return extractCodeBlockAfterHeading(markdown, advancedHeadings);
}

function extractCodeBlockAfterHeading(markdown: string, headings: string[]) {
  const section = findSection(markdown, headings);
  if (!section) {
    return '';
  }

  const codeBlock = section.content.match(/```[^\n]*\n([\s\S]*?)\n```/);
  if (codeBlock?.[1]?.trim()) {
    return codeBlock[1].trim();
  }

  return cleanupSectionText(section.content);
}

function findSection(markdown: string, headings: string[]) {
  const headingSet = headings.map(normalizeHeading);
  const lines = markdown.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const heading = parseHeadingLine(lines[index]);
    if (!heading || !matchesHeading(heading.text, headingSet)) {
      continue;
    }

    const contentStart = index + 1;
    let contentEnd = lines.length;

    for (let next = contentStart; next < lines.length; next += 1) {
      const nextHeading = parseHeadingLine(lines[next]);
      if (nextHeading && nextHeading.level <= heading.level) {
        contentEnd = next;
        break;
      }
    }

    return {
      content: lines.slice(contentStart, contentEnd).join('\n'),
      heading
    };
  }

  return null;
}

function parseHeadingLine(line: string) {
  const markdownHeading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
  if (markdownHeading) {
    return {
      level: markdownHeading[1].length,
      text: markdownHeading[2]
    };
  }

  const boldHeading = line.match(/^\s*(?:[-*]\s*)?\*\*(.+?)\*\*\s*:?\s*$/);
  if (boldHeading) {
    return {
      level: 6,
      text: boldHeading[1]
    };
  }

  return null;
}

function matchesHeading(value: string, normalizedHeadings: string[]) {
  const normalized = normalizeHeading(value);
  return normalizedHeadings.some((heading) => normalized.includes(heading) || heading.includes(normalized));
}

function normalizeHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_#~:：\-–—()[\]【】「」『』]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanupSectionText(value: string) {
  return value
    .replace(/^\s*---+\s*$/gm, '')
    .replace(/^\s*> ?/gm, '')
    .trim();
}
