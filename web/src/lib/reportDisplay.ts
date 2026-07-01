const redundantReportTitlePatterns = [
  /^【\s*(Prompt\s*体检报告|Prompt Diagnosis Report|プロンプト診断レポート)\s*】$/i,
  /^#{1,6}\s*(Prompt\s*体检报告|Prompt Diagnosis Report|プロンプト診断レポート)\s*$/i,
  /^(Prompt\s*体检报告|Prompt Diagnosis Report|プロンプト診断レポート)$/i
];

export function normalizeReportDisplayMarkdown(markdown: string) {
  const withoutBom = markdown.replace(/^\uFEFF/, '');
  const lines = withoutBom.split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim() !== '');

  if (firstContentIndex === -1) {
    return '';
  }

  const firstContentLine = lines[firstContentIndex].trim();
  if (!isRedundantReportTitle(firstContentLine)) {
    return markdown;
  }

  let nextContentIndex = firstContentIndex + 1;
  while (nextContentIndex < lines.length && lines[nextContentIndex].trim() === '') {
    nextContentIndex += 1;
  }

  return lines.slice(nextContentIndex).join('\n');
}

function isRedundantReportTitle(line: string) {
  return redundantReportTitlePatterns.some((pattern) => pattern.test(line));
}
