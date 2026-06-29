# PromptCheckup Local Wrapper

This directory contains the v0.2 local Node/Express wrapper for calling the Dify Chat API safely.

The wrapper keeps `DIFY_API_KEY` on the server side. Browser code should call local endpoints such as `/api/chat` and must not read or embed the Dify App API key.

## Setup

Create a local `.env` file from the root template:

```bash
cp .env.example .env
```

Then fill in your own Dify App API key:

```env
DIFY_API_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_real_dify_app_api_key
DIFY_USER=local-user
SERVER_PORT=8787
```

Do not commit `.env`.

## Development

From the repository root:

```bash
npm install
npm run dev:server
```

The server listens on `http://localhost:8787` by default.

## Endpoints

### GET `/api/health`

Returns local wrapper status:

```json
{
  "ok": true,
  "service": "prompt-checkup-local-wrapper",
  "configured": false
}
```

`configured` indicates whether a non-placeholder `DIFY_API_KEY` is available. The key itself is never returned.

### POST `/api/chat`

Forwards a blocking chat request to Dify `/chat-messages`.

```json
{
  "inputs": {
    "prompt_text": "",
    "task_description": "",
    "task_type": "",
    "context": "",
    "output_requirements": "",
    "review_depth": ""
  },
  "query": "开始诊断",
  "conversation_id": "",
  "user": "local-user"
}
```

The wrapper sends `response_mode: "blocking"` to Dify. Streaming is not implemented in this phase.

If `DIFY_API_KEY` is not configured, the endpoint returns:

```json
{
  "error": "DIFY_API_KEY is not configured"
}
```

## Safety

- Keep API keys in `.env`.
- Do not expose Dify keys through `VITE_*` variables.
- Do not log full API keys.
- Commit only `.env.example`, never `.env`.
