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

export async function sendLocalChatMessage(request: LocalChatRequest): Promise<LocalChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(getErrorMessage(error));
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

  return 'Local chat request failed';
}
