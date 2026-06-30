import type { ChatResponse, DifyClientConfig } from './types.js';
import type { ValidatedChatRequest } from './validation.js';

type DifyChatResponse = {
  answer?: string;
  conversation_id?: string;
  message_id?: string;
  metadata?: {
    usage?: unknown;
  };
};

export class DifyClientError extends Error {
  details?: unknown;
  status: number;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = 'DifyClientError';
    this.status = status;
    this.details = details;
  }
}

export function isDifyConfigured(apiKey?: string) {
  return Boolean(apiKey && apiKey !== 'your_dify_app_api_key_here');
}

export async function sendChatMessage(request: ValidatedChatRequest, config: DifyClientConfig): Promise<ChatResponse> {
  if (!isDifyConfigured(config.apiKey)) {
    throw new DifyClientError('DIFY_API_KEY is not configured', 500);
  }

  const payload = {
    inputs: request.inputs,
    query: request.query,
    response_mode: 'blocking',
    user: request.user || config.defaultUser,
    ...(request.conversation_id ? { conversation_id: request.conversation_id } : {})
  };

  const response = await fetch(`${stripTrailingSlash(config.apiBaseUrl)}/chat-messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new DifyClientError('Dify chat request failed', response.status, sanitizeDifyError(data));
  }

  const chatData = data as DifyChatResponse;

  return {
    answer: typeof chatData.answer === 'string' ? chatData.answer : '',
    conversation_id: typeof chatData.conversation_id === 'string' ? chatData.conversation_id : '',
    message_id: typeof chatData.message_id === 'string' ? chatData.message_id : '',
    raw: {
      usage: chatData.metadata?.usage
    }
  };
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function sanitizeDifyError(data: unknown) {
  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const record = data as Record<string, unknown>;
  return {
    code: record.code,
    message: record.message,
    status: record.status
  };
}
