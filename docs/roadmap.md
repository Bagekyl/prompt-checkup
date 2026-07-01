# Roadmap

## v0.1.0 - Reproducible Dify Flow

- Exported Dify Chatflow DSL
- Workflow architecture documentation
- Node descriptions
- Prompt design notes
- Code node explanation
- Tested examples for Chinese, English, and Japanese
- Risk scoring and follow-up behavior documentation

## v0.2.0 - Local Web UI

- Local Dify API wrapper
- Browser-based PromptCheckup UI
- Real Dify diagnosis
- Multi-turn follow-up
- Re-diagnose current form
- New session
- Local draft persistence
- Chinese / English / Japanese UI
- Copy full report
- Copy last answer
- Download Markdown

Out of scope:

- Dedicated optimized prompt copy
- Dedicated advanced prompt copy
- Database
- Login / user accounts
- Cloud history
- Docker / production deployment
- Desktop app

## v0.2.1 - CI Setup

- Add GitHub Actions CI
- Run build and production dependency audit on pull requests and pushes to `main`
- Improve repository maintainability before the Vercel demo deployment work

## v0.3.0 - Vercel Demo Deployment

- Prepare a hosted demo deployment path for the Web UI
- Add Vercel API Functions for `/api/health` and `/api/chat`
- Add access-code protected demo sharing
- Add input length limits for public demo safety
- Add Vercel deployment guide and safe sharing notes
- Keep Dify API keys server-side
- Document environment variable setup for hosted demo usage
- Keep local development workflow available

## v0.4.0 - Streaming Response

- Add streaming response support for the Dify Chat API
- Stream long diagnosis reports progressively in the Web UI
- Improve perceived latency and reduce blocking-mode timeout risk
- Improve loading, timeout, and retry states

## v0.5.0 - Structured Dify Output and Flow Optimization

- Improve the Dify Flow output contract
- Add stable structured fields or explicit Markdown markers for `optimized_prompt` and `advanced_prompt`
- Reduce unnecessary LLM-node latency where possible
- Restore dedicated optimized / advanced prompt copy actions after backend output is machine-readable
- Make review-depth modes produce more clearly differentiated outputs
- Consider a fast demo mode for public Vercel sharing
- Improve consistency of Chinese, English, and Japanese report sections
- Ensure optimized / advanced prompts are wrapped consistently in fenced code blocks or structured fields

## v0.6.0 - Report Reading Experience

- Improve report section layout
- Add score / risk / severity badges
- Improve code block, table, and long-report rendering
- Add collapsible report sections
- Improve Markdown export formatting

## v0.7.0 - Deployment and Reproducibility

- Add clearer setup and troubleshooting guides
- Add environment validation
- Improve Dify API error messages
- Add production build instructions
- Keep deployment guidance focused on secure API key handling

## v0.8.0 - Multilingual Expansion

- Improve i18n architecture
- Add more UI languages
- Add multilingual test cases
- Standardize UI language vs report output language behavior
- Improve Dify Flow language-control prompts

## v0.9.0 - Prompt Workspace

- Add local diagnosis history
- Add saved prompt templates
- Add reusable test cases
- Add optional local storage or database support
- Support import / export of reports and prompt records
