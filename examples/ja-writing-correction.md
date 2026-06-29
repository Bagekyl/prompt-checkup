# Japanese Writing Correction Prompt Test

## Form fields

- Language: Japanese / 日本語
- Task type: Writing correction
- Diagnosis depth: normal

## Prompt under test

```text
あなたは日本語作文の添削先生です。次の文章を自然な日本語に直してください。

入力：
{{student_text}}

出力：
1. 修正後の文章
2. 主な修正点
3. 学習者が次に注意すべきポイント

条件：
- 学習者の意図を変えないでください。
- 難しすぎる表現は避けてください。
- 必要に応じて、より自然な言い換えを提案してください。
```

## Expected behavior

This should enter the full diagnosis branch and return a Japanese report.
Expected score is around 70-85, with low or medium risk.
The diagnosis should mention missing details such as learner level, correction strictness,
explanation depth, and examples.
