import cors from 'cors';
import express from 'express';
import { DifyClientError, sendChatMessage } from '../../shared/difyClient.js';
import { chatRequestSchema } from '../../shared/validation.js';
import { env, getDifyClientConfig, isDifyConfigured } from './env.js';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'prompt-checkup-local-wrapper',
    configured: isDifyConfigured()
  });
});

app.post('/api/chat', async (request, response) => {
  const parsed = chatRequestSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      error: 'Invalid chat request',
      details: parsed.error.flatten().fieldErrors
    });
    return;
  }

  try {
    const result = await sendChatMessage(parsed.data, getDifyClientConfig());
    response.json(result);
  } catch (error) {
    if (error instanceof DifyClientError) {
      response.status(error.status).json({
        error: error.message,
        status: error.status,
        ...(error.hint ? { hint: error.hint } : {}),
        ...(error.details ? { details: error.details } : {})
      });
      return;
    }

    console.error('Unexpected local wrapper error', error instanceof Error ? error.message : error);
    response.status(500).json({
      error: 'Unexpected local wrapper error'
    });
  }
});

app.listen(env.port, () => {
  console.log(`PromptCheckup local wrapper listening on http://localhost:${env.port}`);
  console.log(`Dify API configured: ${isDifyConfigured() ? 'yes' : 'no'}`);
});
