# Changelog

## v0.2.0 - Local Web UI

### Added

- Added a local React Web UI for PromptCheckup.
- Added a local Node.js Dify API wrapper.
- Added real Dify diagnosis through the user's own Dify App API.
- Added multi-turn follow-up support.
- Added re-diagnose current form.
- Added new session handling.
- Added local draft persistence.
- Added Chinese / English / Japanese UI.
- Added copy full report, copy last answer, and download Markdown actions.

### Changed

- Removed dedicated optimized / advanced prompt copy actions from v0.2 because Dify currently returns these
  sections as natural-language Markdown rather than stable machine-readable fields.
- Updated task type and review depth handling to submit canonical Dify values while keeping localized UI labels.

### Security

- Kept Dify API Key server-side in the local wrapper.
- Confirmed browser requests use local `/api/chat` instead of calling Dify directly.

### Known Limitations

- Dedicated optimized / advanced prompt copy will return in a future version after Dify outputs stable structured
  fields or Markdown markers.
- Review-depth modes may need stronger Dify Flow prompt logic to produce more differentiated outputs.

## v0.1.0 - Initial Dify Flow Release

- Added exported Dify Chatflow.
- Added workflow documentation.
- Added tested examples for Chinese, English, and Japanese.
- Added risk scoring and follow-up behavior documentation.
