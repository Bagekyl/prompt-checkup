export type LocalChatInputs = {
  context?: string;
  output_requirements?: string;
  prompt_text?: string;
  review_depth?: string;
  task_description?: string;
  task_type?: string;
};

export type LocalChatRequest = {
  conversation_id?: string;
  inputs: LocalChatInputs;
  query: string;
  user?: string;
};

export type LocalChatResponse = {
  answer: string;
  conversation_id: string;
  message_id: string;
  raw: {
    usage?: unknown;
  };
};

export class LocalApiError extends Error {
  field?: string;
  hint?: string;
  limit?: number;
  status?: number;

  constructor(message: string, status?: number, hint?: string, field?: string, limit?: number) {
    super(message);
    this.name = 'LocalApiError';
    this.status = status;
    this.hint = hint;
    this.field = field;
    this.limit = limit;
  }
}

export async function sendLocalChatMessage(request: LocalChatRequest): Promise<LocalChatResponse> {
  return sendLocalChatMessageWithOptions(request);
}

export async function sendLocalChatMessageWithOptions(
  request: LocalChatRequest,
  options: { demoAccessCode?: string } = {}
): Promise<LocalChatResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const accessCode = options.demoAccessCode?.trim();
  if (accessCode) {
    headers['x-demo-access-code'] = accessCode;
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers,
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await safeJson(response);
    throw new LocalApiError(getErrorMessage(error), response.status, getErrorHint(error), getErrorField(error), getErrorLimit(error));
  }

  return response.json() as Promise<LocalChatResponse>;
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'error' in error && typeof error.error === 'string') {
    return error.error;
  }

  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'Local chat request failed';
}

function getErrorHint(error: unknown) {
  if (error && typeof error === 'object' && 'hint' in error && typeof error.hint === 'string') {
    return error.hint;
  }

  return undefined;
}

function getErrorField(error: unknown) {
  if (error && typeof error === 'object' && 'field' in error && typeof error.field === 'string') {
    return error.field;
  }

  return undefined;
}

function getErrorLimit(error: unknown) {
  if (error && typeof error === 'object' && 'limit' in error && typeof error.limit === 'number') {
    return error.limit;
  }

  return undefined;
}
