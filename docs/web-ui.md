# Web UI

PromptCheckup v0.2.0 includes a local browser UI built with React, TypeScript, Vite, and Tailwind CSS.
It is designed for local use with your own Dify App API through the local wrapper in `server/`.

## Features

- Prompt diagnosis form
- Real Dify diagnosis through local `/api/chat`
- Multi-turn follow-up messages
- Re-diagnose current form
- New session
- Local form draft persistence
- Chinese / English / Japanese UI
- Markdown report rendering
- Copy full report
- Copy last answer
- Download Markdown

The Web UI does not call Dify directly and does not know the Dify API key.

## Form Fields

- Prompt to check
- Task description
- Task type
- Context
- Output requirements
- Review depth

Task type and review depth are displayed in the selected UI language, but the payload sent to Dify uses canonical
Chinese values accepted by the current Chatflow.

## Follow-Up Behavior

After the first diagnosis returns a `conversation_id`, follow-up messages reuse that conversation.
User messages and assistant replies are appended to the multi-turn history.
Copy last answer uses the latest assistant message, not the first report.

If there is no active conversation, the UI asks the user to run a diagnosis first.

## Re-Diagnose Current Form

Re-diagnose current form sends the current form fields with a re-diagnosis query while preserving the active
conversation. The returned answer updates the main report and is also appended to message history.

## New Session

New Session clears the conversation ID, message ID, message history, and current report.
It preserves the current form so the user can start a fresh Dify conversation without retyping the form.

## Local Draft Persistence

The UI stores form fields and UI language in `localStorage`.
Clear Form removes the form draft.
New Session does not remove the form draft.

No API key is stored in `localStorage`.

## UI Language and Report Language

The UI language controls labels, buttons, placeholders, and local messages.
The report output language is controlled by the Dify Chatflow and the user's prompt/form context.

v0.2.0 includes UI copy for Chinese, English, and Japanese.

## Report Actions

v0.2.0 exposes stable report actions only:

- Copy full report
- Copy last answer
- Download Markdown

Dedicated optimized / advanced prompt copy actions were removed from v0.2 because the current Dify report returns
those sections as natural-language Markdown rather than stable machine-readable fields.
They can return after the Dify output contract provides stable structured fields or explicit Markdown markers.
