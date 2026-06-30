import { env, isDifyConfigured } from './env.js';
import type { ChatResponse, SafeErrorResponse } from './types.js';
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
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = 'DifyClientError';
    this.status = status;
    this.details = details;
  }
}

export async function sendChatMessage(request: ValidatedChatRequest): Promise<ChatResponse> {
  if (!isDifyConfigured()) {
    throw new DifyClientError('DIFY_API_KEY is not configured', 500);
  }

  const payload = {
    inputs: request.inputs,
    query: request.query,
    response_mode: 'blocking',
    user: request.user || env.difyUser,
    ...(request.conversation_id ? { conversation_id: request.conversation_id } : {})
  };

  const response = await fetch(`${env.difyApiBaseUrl}/chat-messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.difyApiKey}`,
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
