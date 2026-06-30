# Test Cases

These test cases describe the expected behavior for the Dify Flow and the v0.2.0 local Web UI.
Example inputs are stored in `examples/`.

## 1. Chinese RAG high-risk test

Goal: verify risk score capping.

Example file: `examples/zh-rag-risk.md`

Expected:

```text
score <= 45 or below 59
grade = 需要重写
risk_level = 高风险
risk_severity = critical / high
risk_cap_applied = yes
```

Key traps:

- "严格基于知识库" conflicts with "无信息也要推测".
- The prompt requires citations but allows guesses, which can cause fabricated citations.
- High-risk domains ask for direct conclusions without enough evidence.
- The prompt forbids saying "I do not know".

## 2. Japanese writing correction prompt test

Goal: verify Japanese recognition and output.

Example file: `examples/ja-writing-correction.md`

Expected:

```text
full diagnosis branch
Japanese report
score around 70-85
risk low / medium
```

Key points:

- The workflow should not misclassify a Japanese natural-language role prompt.
- It should identify issues around output format, learner level, correction policy,
  and explanation depth.
- The final report and rewritten prompt should remain in Japanese unless the user requests otherwise.

## 3. English product feedback prompt test

Goal: verify English prompt input and English output.

Example file: `examples/en-product-feedback.md`

Expected:

```text
full diagnosis branch
English report
clear scoring dimensions
risk low / medium
optimized prompt and enhanced prompt in English
```

## 4. Casual incomplete input test

Goal: verify that incomplete prompt-like input enters `needs_context` and produces a brief diagnosis.

Example file: `examples/casual-input-test.md`

Expected:

```text
needs_context
brief diagnosis
no full final score
basic optimized template
```

## 5. Non-prompt test

Goal: verify that ordinary non-prompt content enters `non_prompt` and returns the non-prompt reply.

Example file: `examples/non-prompt-test.md`

Example input:

```text
我最近想买一个机械键盘，预算 500 元左右，最好声音不要太吵，日常打字和写代码都能用，有没有什么推荐？
```

Expected:

```text
non_prompt
non-prompt reply
no diagnosis score
asks user to submit a real prompt
```

## 6. Follow-up adjustment test

Goal: verify that a second-turn request to compress or rewrite the previous enhanced prompt
enters the follow-up adjustment branch instead of re-diagnosis.

Example file: `examples/follow-up-tests.md`

Expected:

```text
follow_up_adjustment
no new full diagnosis
no new score
returns modified previous optimized/enhanced prompt
```

## 7. Changed form re-diagnosis test

Goal: verify that when the user changes form fields and says "我改了表单，请按新的表单重新诊断",
the workflow enters the full diagnosis flow again.

Example file: `examples/follow-up-tests.md`

Expected:

```text
new_diagnosis
uses updated form fields
may enter diagnosable_prompt
full structured diagnosis when input is sufficient
new final report
```

## 8. v0.2 Web UI regression checklist

Run these checks before preparing a v0.2 release.

### Health check

Expected:

```text
GET /api/health returns ok = true
configured does not expose the Dify API key
```

### Chinese diagnosis

Expected:

```text
Start Diagnosis calls local /api/chat
main report renders real Dify Markdown
conversation_id is saved
```

### English UI with canonical payload

Expected:

```text
UI labels are English
task_type and review_depth submitted to Dify use canonical Chinese values
no Dify 400 caused by localized labels
```

### Japanese UI with canonical payload

Expected:

```text
UI labels are Japanese
task_type and review_depth submitted to Dify use canonical Chinese values
no Dify 400 caused by localized labels
```

### Follow-up

Expected:

```text
follow-up reuses conversation_id
user message and assistant reply are appended to history
main report is not replaced by an ordinary follow-up reply
```

### Re-diagnose current form

Expected:

```text
uses current form fields
preserves conversation_id
updates main report when the new diagnosis returns
```

### New Session

Expected:

```text
clears conversation_id, message history, and current report
preserves form inputs
```

### localStorage draft

Expected:

```text
form fields and UI language restore after refresh
Clear Form removes the local form draft
New Session does not remove the form draft
```

### Report actions

Expected:

```text
Copy full report works
Copy last answer works
Download Markdown works
Dedicated optimized / advanced prompt copy actions are not present in v0.2
```

### Network safety

Expected:

```text
browser calls local /api/chat
browser does not call Dify directly
browser network panel does not expose DIFY_API_KEY or Authorization Bearer Dify key
```
