# English Product Feedback Prompt Test

## Form fields

- Language: English
- Task type: Product feedback analysis
- Diagnosis depth: normal

## Prompt under test

```text
You are a product analyst.
Analyze the following customer feedback and summarize the top product issues,
emotional tone, and suggested next actions.

Input:
{{customer_feedback}}

Output format:
- Executive summary
- Issue categories
- User sentiment
- Evidence quotes
- Recommended product actions

Rules:
- Do not invent evidence.
- If the feedback is too short, say what additional information is needed.
- Keep the tone concise and useful for a product manager.
```

## Expected behavior

This should enter the full diagnosis branch and produce an English report.
The risk should be low or medium, with improvement suggestions around clearer category definitions,
prioritization, and evidence handling.
