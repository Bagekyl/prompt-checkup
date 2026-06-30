const optimizedHeadings = [
  '优化版 Prompt',
  '优化版 prompt',
  '优化后的 Prompt',
  '基础优化版 Prompt',
  '改善版 Prompt',
  '优化 Prompt',
  '优化后的提示词',
  'Optimized Prompt',
  'optimized prompt',
  'Optimized Version',
  'Improved Prompt',
  'Basic Optimized Prompt',
  '最適化されたプロンプト',
  '最適化された Prompt',
  '改善版プロンプト',
  '改善版 Prompt',
  '改善されたプロンプト',
  '改善された Prompt',
  '最適化プロンプト'
];

const advancedHeadings = [
  '增强版 Prompt',
  '增强版 prompt',
  '强化版 Prompt',
  '完整增强版 Prompt',
  '高级版 Prompt',
  '增强后的 Prompt',
  '强化后的 Prompt',
  'Advanced Prompt',
  'advanced prompt',
  'Enhanced Prompt',
  'Advanced Version',
  'Enhanced Version',
  '強化版プロンプト',
  '強化版 Prompt',
  '詳細版プロンプト',
  '詳細版 Prompt',
  '高度なプロンプト',
  '高度な Prompt',
  '拡張版プロンプト',
  '拡張版 Prompt'
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

  for (const codeBlock of extractFencedCodeBlocks(section.content)) {
    const cleaned = cleanupPromptText(codeBlock);
    if (isValidPromptBlock(cleaned)) {
      return cleaned;
    }
  }

  const fallback = cleanupPromptText(section.content);
  return isValidPromptBlock(fallback) ? fallback : '';
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
    let fence = '';
    let hasBodyContent = false;

    for (let next = contentStart; next < lines.length; next += 1) {
      const fenceMatch = lines[next].match(/^\s*(`{3,}|~{3,})[^\n]*$/);
      if (fenceMatch) {
        if (!fence) {
          fence = fenceMatch[1];
          continue;
        }
        if (fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) {
          fence = '';
          continue;
        }
      }

      if (fence) {
        continue;
      }

      const nextHeading = parseHeadingLine(lines[next]);
      const isSameLevelBoundary = nextHeading && nextHeading.level === heading.level;
      const isHigherBoundaryAfterBody = nextHeading && nextHeading.level < heading.level && hasBodyContent;
      if (isSameLevelBoundary || isHigherBoundaryAfterBody) {
        contentEnd = next;
        break;
      }

      if (lines[next].trim()) {
        hasBodyContent = true;
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
  const normalized = normalizeHeading(stripHeadingNumber(value));
  return normalizedHeadings.some((heading) => normalized.includes(heading) || heading.includes(normalized));
}

function normalizeHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_#~:：;；,.，。、\-–—()[\]【】「」『』]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHeadingNumber(value: string) {
  return value
    .trim()
    .replace(/^(?:第?\s*)?[一二三四五六七八九十百千万]+[、.．:：\s-]*/u, '')
    .replace(/^\d+(?:\.\d+)*[、.．:：\s-]*/u, '')
    .replace(/^[ivxlcdm]+[.)、.．:：\s-]*/iu, '')
    .trim();
}

function cleanupSectionText(value: string) {
  return value
    .replace(/^\s*---+\s*$/gm, '')
    .replace(/^\s*> ?/gm, '')
    .trim();
}

function extractFencedCodeBlocks(value: string) {
  const lines = value.split(/\r?\n/);
  const blocks: string[] = [];
  let blockStart = -1;
  let fenceChar = '';
  let fenceLength = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (blockStart === -1) {
      const opening = line.match(/^\s*(`{3,}|~{3,})[^\n]*$/);
      if (opening) {
        blockStart = index + 1;
        fenceChar = opening[1][0];
        fenceLength = opening[1].length;
      }
      continue;
    }

    const closingPattern = new RegExp(String.raw`^\s*${escapeRegExp(fenceChar.repeat(fenceLength))}\s*$`);
    if (closingPattern.test(line)) {
      blocks.push(lines.slice(blockStart, index).join('\n'));
      blockStart = -1;
      fenceChar = '';
      fenceLength = 0;
    }
  }

  return blocks;
}

function cleanupPromptText(value: string) {
  let result = cleanupSectionText(value);

  for (let pass = 0; pass < 4; pass += 1) {
    const unwrapped = unwrapOuterFence(result);
    if (unwrapped === result) {
      break;
    }
    result = cleanupSectionText(unwrapped);
  }

  return result
    .replace(/^\s*(?:markdown|md|text)\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function unwrapOuterFence(value: string) {
  const lines = value.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return value.trim();
  }

  const opening = lines[0].match(/^\s*(`{3,}|~{3,})(?:\s*(?:markdown|md|text))?\s*$/i);
  if (!opening) {
    return value.trim();
  }

  const closing = lines[lines.length - 1].trim();
  if (closing !== opening[1]) {
    return value.trim();
  }

  return lines.slice(1, -1).join('\n').trim();
}

function isValidPromptBlock(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  if (['markdown', 'md', 'text'].includes(normalized)) {
    return false;
  }

  if (/^`{3,}\s*(?:markdown|md|text)?\s*`{3,}$/i.test(normalized)) {
    return false;
  }

  if (/^(?:`{3,}|~{3,})\s*(?:markdown|md|text)?$/i.test(normalized)) {
    return false;
  }

  return true;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
