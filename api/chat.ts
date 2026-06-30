import { DifyClientError, sendChatMessage } from '../shared/difyClient.js';
import { validateInputLengths } from '../shared/limits.js';
import { chatRequestSchema } from '../shared/validation.js';

type JsonResponse = {
  end: () => void;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => JsonResponse;
};

type JsonRequest = {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  method?: string;
};

export default async function handler(request: JsonRequest, response: JsonResponse) {
  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isDemoAccessAllowed(request)) {
    response.status(403).json({ error: 'Invalid or missing demo access code.' });
    return;
  }

  const parsedBody = parseRequestBody(request.body);
  if (!parsedBody.ok) {
    response.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const parsed = chatRequestSchema.safeParse(parsedBody.body);
  if (!parsed.success) {
    response.status(400).json({
      error: 'Invalid chat request',
      details: parsed.error.flatten().fieldErrors
    });
    return;
  }

  const lengthError = validateInputLengths(parsed.data);
  if (lengthError) {
    response.status(400).json({
      error: 'Input is too long.',
      field: lengthError.field,
      limit: lengthError.limit
    });
    return;
  }

  try {
    const result = await sendChatMessage(parsed.data, {
      apiBaseUrl: getDifyApiBaseUrl(),
      apiKey: process.env.DIFY_API_KEY,
      defaultUser: process.env.DIFY_USER || 'local-user'
    });
    response.status(200).json(result);
  } catch (error) {
    if (error instanceof DifyClientError) {
      response.status(error.status).json({
        error: error.message,
        ...(error.details ? { details: error.details } : {})
      });
      return;
    }

    console.error('Unexpected Vercel API error', error instanceof Error ? error.message : 'unknown error');
    response.status(500).json({ error: 'Unexpected Vercel API error' });
  }
}

function getDifyApiBaseUrl() {
  return (process.env.DIFY_API_BASE_URL || 'https://api.dify.ai/v1').replace(/\/+$/, '');
}

function isDemoAccessAllowed(request: JsonRequest) {
  const expected = process.env.DEMO_ACCESS_CODE?.trim();
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

  if (!expected) {
    return !isProduction;
  }

  return getHeader(request, 'x-demo-access-code') === expected;
}

function getHeader(request: JsonRequest, name: string) {
  const exact = request.headers[name];
  const lower = request.headers[name.toLowerCase()];
  const value = exact ?? lower;
  return Array.isArray(value) ? value[0] : value;
}

function parseRequestBody(body: unknown): { body: unknown; ok: true } | { ok: false } {
  if (typeof body === 'string') {
    try {
      return { body: JSON.parse(body), ok: true };
    } catch {
      return { ok: false };
    }
  }

  if (body && typeof body === 'object') {
    return { body, ok: true };
  }

  return { ok: false };
}
