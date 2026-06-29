# Casual Incomplete Input Test

## Prompt under test

```text
帮我写一个提示词，让 AI 帮我做学习计划。
```

## Expected behavior

This should enter `needs_context` and produce a brief diagnosis. It should not generate a full score because the task lacks learner background, subject, time range, target exam or goal, available study time, output format, and constraints.
