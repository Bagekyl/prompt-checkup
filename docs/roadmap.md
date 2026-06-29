# Roadmap

## v0.1.0 - Reproducible Dify Flow

- Exported Dify Chatflow DSL
- Workflow architecture documentation
- Node descriptions
- Prompt design notes
- Code node explanation
- Tested examples for Chinese, English, and Japanese
- Risk scoring and follow-up behavior documentation

## v0.2.0 - Web UI + Local Wrapper

The goal is to implement a browser interaction interface similar in spirit to the existing local Luxun project style.

- Local Web UI
- Form input area
- Follow-up chat input
- Markdown report rendering
- Copy buttons for optimized and advanced prompts
- Loading / error / empty-state handling
- Minimal local backend wrapper for calling the Dify API without exposing API keys in browser
- Local setup guide

Out of scope:

- Database
- User accounts
- Report history
- Multi-user permissions
- Full workflow reimplementation in code

## v0.3.0 - Expanded Multilingual Support

v0.1 officially supports Chinese, English, and Japanese. v0.3 focuses on adding more officially tested languages.

- Additional supported languages
- Extended multilingual pre-check keywords
- Language-specific test cases
- Updated prompt templates and report wording
- Regression tests for new languages
