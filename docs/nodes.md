# Nodes

This document describes the main nodes in `dify/prompt-checkup.yml`.

## 用户输入

Collects the prompt to be evaluated, task description, task type, background information, output requirements, diagnosis depth, and current chat supplement. It is the start node and does not call an LLM. Its outputs feed the interaction intent routing and later diagnostic nodes.

## 交互意图判断

Determines whether the current user message starts a new diagnosis or adjusts the previous result. It receives the current conversation input and classifies it with an LLM-backed question classifier. It routes to either the main diagnosis path or the follow-up adjustment path.

## 结构预检

Performs rule-based structural checks on the submitted prompt. It extracts objective signals such as length, role wording, task intent, output format, constraints, examples, vague wording, and injection risk. This is a code node, not an LLM node, and its results feed the validity gate, classifier, structured diagnosis, and scoring code.

## 输入有效性判断

Checks whether the submitted prompt is empty or too short based on precheck results. It is an if-else node and does not call an LLM. Invalid input goes to the invalid reply, while valid input goes to task classification.

## 无效输入回复

Returns a direct message when the prompt is missing or too short. It receives the invalid reason from the precheck and validity gate. This is an answer node and does not call an LLM.

## 任务分类

Classifies valid input into `non_prompt`, `needs_context`, or `diagnosable_prompt`. It receives the user input and structural precheck result, then uses an LLM-backed question classifier. Its output controls whether the flow returns a non-prompt reply, brief diagnosis, or full diagnosis.

## 非 Prompt 回复

Explains that the submitted content is not suitable for prompt diagnosis. It receives the `non_prompt` classification result. This is an answer node and does not call an LLM.

## 简短诊断

Generates lightweight feedback when the input looks prompt-like but lacks enough context for full scoring. It receives the user input, form fields, and precheck result. This is an LLM node and should not produce a full score.

## 简短诊断回复

Returns the brief diagnosis text to the user. It receives the output of the brief diagnosis LLM node. This is an answer node and does not call an LLM.

## 结构化诊断

Performs the main semantic evaluation for diagnosable prompts. It receives the prompt, task fields, current supplement, and structural precheck result, then outputs strict JSON with scoring dimensions, main issues, missing information, risk severity, rewrite strategy, optimized prompt, and enhanced prompt. This is an LLM node.

## 评分计算

Parses the structured diagnosis JSON and combines semantic scores with the objective precheck score. It calculates final score, grade, risk level, risk cap status, and summary fields. This is a code node and applies conservative caps for high or critical risk.

## 最终报告生成

Turns structured diagnosis, scoring results, and precheck findings into a readable Markdown report. It must not re-diagnose, re-score, or execute the evaluated prompt. This is an LLM node.

## 最终回复

Returns the final Markdown report to the user. It receives the output of the final report generation node. This is an answer node and does not call an LLM.

## 追问调整

Adjusts the previous diagnosis result, optimized prompt, or enhanced prompt based on the user's follow-up request. It receives the current follow-up text and conversation context, uses an LLM, and should not rerun full diagnosis unless the user explicitly asks for re-diagnosis with changed form data.

## 追问回复

Returns the follow-up adjustment result to the user. It receives the output of the follow-up adjustment node. This is an answer node and does not call an LLM.
