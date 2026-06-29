# Follow-up Tests

## Follow-up adjustment test

First run a full diagnosis with a diagnosable prompt, then send:

```text
把上一轮的增强版 Prompt 压缩到 300 字以内，保留最关键的约束和输出格式。
```

Expected behavior:

```text
follow_up_adjustment
no new full diagnosis
no new score
returns a compressed version of the previous enhanced prompt
```

## Changed form re-diagnosis test

After changing the form fields, send:

```text
我改了表单，请按新的表单重新诊断。
```

Expected behavior:

```text
new_diagnosis
uses updated form fields
returns to the full diagnosis flow if the prompt is sufficient
```
