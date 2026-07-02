import type { ValidatedChatRequest } from './validation.js';

export const publicDemoInputLimits = {
  context: 12000,
  output_requirements: 4000,
  prompt_text: 8000,
  query: 2000,
  review_depth: 200,
  task_description: 2000,
  task_type: 200
} as const;

type InputLimitField = keyof typeof publicDemoInputLimits;

export type InputLengthError = {
  field: InputLimitField;
  limit: number;
};

export function validateInputLengths(request: ValidatedChatRequest): InputLengthError | null {
  const values: Record<InputLimitField, string> = {
    context: request.inputs.context,
    output_requirements: request.inputs.output_requirements,
    prompt_text: request.inputs.prompt_text,
    query: request.query,
    review_depth: request.inputs.review_depth,
    task_description: request.inputs.task_description,
    task_type: request.inputs.task_type
  };

  for (const [field, limit] of Object.entries(publicDemoInputLimits) as Array<[InputLimitField, number]>) {
    if (values[field].length > limit) {
      return { field, limit };
    }
  }

  return null;
}
