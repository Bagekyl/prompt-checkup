# Changelog

## Unreleased - v0.2 Web UI Alpha

- Added local Web UI, local Dify API wrapper, real diagnosis calls, follow-up adjustment, multi-turn history,
  local draft persistence, and Markdown report rendering.
- Added stable report actions: copy full report, copy latest assistant answer, and download Markdown.
- Changed: Removed dedicated optimized/advanced prompt copy buttons from the v0.2 Web UI because Dify currently
  returns these sections as natural-language Markdown rather than stable machine-readable fields. Users can still
  copy the full report, copy the latest answer, or download Markdown.
- Planned for v0.3: restore dedicated optimized/advanced prompt copy after the Dify output contract provides
  stable structured fields or explicit Markdown markers for `optimized_prompt` and `advanced_prompt`.

## v0.1.0 - Initial Dify Flow Release

- Added exported Dify Chatflow.
- Added workflow documentation.
- Added tested examples for Chinese, English, and Japanese.
- Added risk scoring and follow-up behavior documentation.
