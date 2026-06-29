# Prompt Design Notes

This document summarizes the key prompt design in `dify/prompt-checkup.yml`.
It does not reproduce the full exported prompts.

## Interaction Intent Routing

The interaction router separates new diagnosis requests from follow-up adjustment requests.
The routing prompt treats first-run messages, "start diagnosis", stricter scoring requests,
and focus-area instructions as `new_diagnosis`.
It treats requests such as "make it shorter", "rewrite the previous version",
"only keep the optimized prompt", or "make the enhanced version fit a smaller model"
as `follow_up_adjustment`.

When the user explicitly says the form has changed and asks to re-diagnose,
the workflow should return to the new diagnosis path instead of only adjusting the previous result.

## Brief Diagnosis

The brief diagnosis prompt is used for `needs_context` input.
It should explain what information is missing and provide a basic improved template,
but it must not produce a full diagnosis score.
The DSL prompt also asks the node to use neutral wording and avoid marketing-style claims.

## Structured JSON Diagnosis

The structured diagnosis prompt asks the model to produce strict JSON for the full diagnosis branch.
The JSON includes scoring dimensions, overall assessment, main issues, missing information,
rewrite strategy, risk severity, optimized prompt, enhanced prompt, and risk notes.
The downstream code node depends on valid JSON, so this prompt should avoid extra prose outside the JSON object.

## Risk Severity Design

Risk severity is designed to prevent structurally complete but unsafe prompts from receiving high final scores.
RAG, knowledge-base QA, policy, price, legal, medical, and other high-impact tasks should be penalized when
they encourage unsupported guesses, fabricated citations, or direct conclusions without enough evidence.
The score calculation node applies a cap when risk severity is high or critical.

## Final Report Generation

The final report prompt turns existing diagnosis and score fields into Markdown.
It must not redo diagnosis, recalculate scores, or execute the evaluated prompt.
Optimized and enhanced prompts are placed in separate code blocks so users can copy them easily.

## Follow-up Adjustment

The follow-up adjustment prompt modifies the previous result based on the user's new request.
It can compress, rewrite, change style, or adapt the optimized or enhanced prompt.
It should not run a new full diagnosis or assign a new score unless the user explicitly requests re-diagnosis.

## Multilingual Policy

v0.1 officially supports Chinese / 中文, English, and Japanese / 日本語.
The workflow should preserve the user's language when generating reports and rewritten prompts.
Other languages are future expansion targets, not official v0.1 support claims.

## Platform-Neutral Wording Policy

The prompts avoid tying the output to a specific model platform when the user did not request one.
Wording should work for Dify, ChatGPT, Claude, Gemini, local models, and API-based assistants
unless the user names a target environment.

## Anti-Hallucination and Placeholder Policy

When required facts are missing, the workflow should use clear placeholders or ask the downstream model
to request more information.
It should not invent source names, citations, course chapters, laws, prices, product facts, medical facts,
or policy details.
For RAG and knowledge-base tasks, the optimized prompt should require source-first answers
and should allow "unable to confirm" when evidence is insufficient.
