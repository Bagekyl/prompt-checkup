import { isDifyConfigured } from '../shared/difyClient.js';

type JsonResponse = {
  end: () => void;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => JsonResponse;
};

type JsonRequest = {
  method?: string;
};

export default function handler(request: JsonRequest, response: JsonResponse) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  response.status(200).json({
    ok: true,
    service: 'prompt-checkup-vercel-api',
    configured: isDifyConfigured(process.env.DIFY_API_KEY),
    mode: 'vercel'
  });
}
