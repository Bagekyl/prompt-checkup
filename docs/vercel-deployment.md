# Vercel Deployment

PromptCheckup v0.3 adds a Vercel deployment path while preserving the local Express wrapper for development.

## What This Adds

- Vercel static frontend from `web/dist`
- Vercel API Functions under `/api`
- Dify API Key stored in Vercel Environment Variables
- Demo access code protection with `DEMO_ACCESS_CODE`
- Input length limits for public demo safety

The browser still calls `/api/chat`. It never calls Dify directly and never receives the Dify API key.

## Deploy Steps

1. Push the v0.3 branch, then merge to `main` after review and manual testing.
2. Import the GitHub repository into Vercel.
3. Confirm build settings:

```text
Build Command: npm run build --workspace web
Output Directory: web/dist
```

4. Configure Vercel Environment Variables:

```env
DIFY_API_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_dify_app_api_key_here
DIFY_USER=local-user
DEMO_ACCESS_CODE=change_me_for_public_demo
```

5. Deploy.
6. Open the generated Vercel URL.

Do not commit real environment values to GitHub.

## Safe Sharing

- Share the Vercel URL and access code only with intended testers.
- Rotate `DEMO_ACCESS_CODE` when needed.
- Monitor Dify and model provider usage.
- Use Vercel Firewall, WAF, or rate limiting if available.
- Avoid publishing unrestricted API access.

## Test Checklist

- `GET /api/health` returns `ok: true`.
- Web UI opens.
- Correct access code allows diagnosis.
- Missing access code is rejected.
- Wrong access code is rejected.
- Too-long input is rejected with a field and limit.
- Browser Network does not expose `DIFY_API_KEY`.
- Vercel environment variables are not committed to GitHub.

## Known Limitations

- v0.3 uses the Dify Chat API in blocking mode for the initial Vercel demo deployment.
- Complex or long Dify Chatflow reports may take a long time to start generating and can hit upstream or serverless timeout limits.
- If `/api/chat` returns 504, the request may have timed out while waiting for Dify or the configured model provider.
- Try a shorter prompt, a lighter review mode, or retry later.
- Streaming response support is planned for a later version.
- Dify Flow performance optimization is planned separately and may include fewer LLM nodes, shorter default reports, structured output, or a dedicated fast demo mode.
- The demo access code is lightweight protection, not full authentication.
- There is no per-user quota.
- There is no database logging.
- There is no payment or usage billing.
- For public demos, use Vercel Firewall, WAF, or rate limiting.
