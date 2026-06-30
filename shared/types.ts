export type DifyChatInputs = {
  context?: string;
  output_requirements?: string;
  prompt_text?: string;
  review_depth?: string;
  task_description?: string;
  task_type?: string;
};

export type ChatRequest = {
  conversation_id?: string;
  inputs: DifyChatInputs;
  query: string;
  user?: string;
};

export type ChatResponse = {
  answer: string;
  conversation_id: string;
  message_id: string;
  raw: {
    usage?: unknown;
  };
};

export type DifyClientConfig = {
  apiBaseUrl: string;
  apiKey?: string;
  defaultUser: string;
};

export type SafeErrorResponse = {
  details?: unknown;
  error: string;
};
