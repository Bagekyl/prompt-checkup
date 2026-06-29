# Test Cases

These test cases describe the expected behavior for v0.1.
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
