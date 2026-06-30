import { z } from 'zod';

export const chatRequestSchema = z.object({
  conversation_id: z.string().optional().default(''),
  inputs: z
    .object({
      context: z.string().optional().default(''),
      output_requirements: z.string().optional().default(''),
      prompt_text: z.string().optional().default(''),
      review_depth: z.string().optional().default(''),
      task_description: z.string().optional().default(''),
      task_type: z.string().optional().default('')
    })
    .default({}),
  query: z.string().trim().min(1, 'query is required'),
  user: z.string().trim().optional()
});

export type ValidatedChatRequest = z.infer<typeof chatRequestSchema>;
