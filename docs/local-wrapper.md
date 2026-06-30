# Local Dify API Wrapper

PromptCheckup v0.2.0 includes a local wrapper service under `server/`.

The wrapper exists so the browser UI can call a local endpoint while the Dify App API key stays on the server side. This avoids putting `DIFY_API_KEY` in browser code, bundled JavaScript, or public frontend environment variables.

## Architecture

```text
Browser Web UI
-> /api/chat
-> Local Express wrapper
-> Dify Chat API /chat-messages
```

The current implementation uses blocking mode only. Streaming UI and streaming transport can be considered in a later optimization step.

The browser should call local `/api/chat`, not Dify directly.

## Environment

Create a local `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required variables:

```env
DIFY_API_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_dify_app_api_key_here
DIFY_USER=local-user
SERVER_PORT=8787
```

Optional frontend-safe variable:

```env
VITE_API_BASE_URL=http://localhost:8787
```

Never create `VITE_DIFY_API_KEY`. Vite public variables are exposed to browser-side code.

## Commands

Run both web and server from the repository root:

```bash
npm install
npm run dev
```

Run only the local wrapper:

```bash
npm run dev:server
```

Run only the Web UI:

```bash
npm run dev:web
```

Build both workspaces:

```bash
npm run build
```

## Health Check

```bash
curl http://localhost:8787/api/health
```

Expected shape:

```json
{
  "ok": true,
  "service": "prompt-checkup-local-wrapper",
  "configured": false
}
```

`configured` may be `true` when a real local Dify API key is present. The key itself is never returned.

## Chat Endpoint

```bash
curl -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
      "prompt_text": "请帮我诊断这个 Prompt",
      "task_description": "",
      "task_type": "",
      "context": "",
      "output_requirements": "",
      "review_depth": "standard"
    },
    "query": "开始诊断",
    "conversation_id": "",
    "user": "local-user"
  }'
```

The local wrapper forwards to:

```text
${DIFY_API_BASE_URL}/chat-messages
```

It adds:

```json
{
  "response_mode": "blocking"
}
```

The response returned to the frontend is normalized:

```json
{
  "answer": "...",
  "conversation_id": "...",
  "message_id": "...",
  "raw": {
    "usage": {}
  }
}
```

## Common Errors

### Missing key

If `DIFY_API_KEY` is not configured, `/api/chat` returns a clear local error.
Create `.env` from `.env.example` and fill a real Dify App API key.

### Dify 400

A 400 response usually means the Dify app rejected the request body or a Chatflow input value.
The Web UI maps task type and review depth to canonical values before submission, but custom Dify Flow changes
may require matching input definitions.

### Dify 401 unauthorized

A 401 response usually means the Dify App API key is missing, invalid, revoked, or belongs to a different app.
Do not print the key while debugging.

### Dify 504 timeout

A 504 response usually means Dify or the model provider did not finish in time.
Retry with a shorter prompt or check the model provider status.

### Model provider error

Model provider errors are controlled by the user's own Dify workspace configuration.
Check provider credentials, quota, model availability, and workspace billing.

## Current Scope

Implemented:

- Local Express wrapper
- `.env` based Dify configuration
- `/api/health`
- `/api/chat`
- Vite dev proxy from `/api` to `http://localhost:8787`
- Frontend diagnosis submission through local `/api/chat`
- Multi-turn follow-up through the same endpoint

Not implemented in v0.2.0:

- Streaming UI
- Backend persistence
- Database
- Login or user accounts
- Cloud history
