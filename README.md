# PromptCheckup

A multilingual prompt diagnosis and optimization workflow built with Dify Chatflow.

PromptCheckup 是一个基于 Dify Chatflow 的多语言 Prompt 体检工具，支持结构预检、意图分流、任务分类、结构化诊断、风险评分、
Prompt 优化、多轮追问调整和修改表单后的重新诊断。

中文名：Prompt 体检医生

## Features

- 可导入的 Dify Chatflow DSL：`dify/prompt-checkup.yml`
- 当前官方支持语言：Chinese / 中文、English、Japanese / 日本語
- 结构预检：检查长度、角色、任务信号、输出格式、限制条件、示例和潜在注入风险
- 意图分流：区分新诊断、追问调整和修改表单后的重新诊断
- 任务分类：区分 `non_prompt`、`needs_context` 和 `diagnosable_prompt`
- 完整诊断：输出评分、等级、风险级别、主要问题、优化版 Prompt 和增强版 Prompt
- 风险封顶：对高风险或严重风险 Prompt 进行保守评分
- 追问调整：支持基于上一轮结果进行压缩、改写、风格调整或补充

## Architecture

v0.1 是可复现的 Dify Chatflow 版本。核心流程如下：

```text
User Input
-> Interaction Intent Routing
-> Precheck
-> Validity Gate
-> Task Classification
-> Non-Prompt Reply / Brief Diagnosis / Structured Diagnosis
-> Score Calculation
-> Final Report
-> Follow-up Adjustment
```

详细说明见 [docs/architecture.md](docs/architecture.md) 和 [docs/nodes.md](docs/nodes.md)。

## Screenshots

![Workflow overview](dify/screenshots/flow-overview.png)

## Quick Start

1. 准备一个可用的 Dify 环境。
2. 导入 `dify/prompt-checkup.yml`。
3. 在 Dify 中配置自己的模型供应商和 API Key。
4. 运行示例测试用例，确认中文、英文、日文和追问调整分支表现正常。

不要把任何 API Key、Dify App Key 或模型供应商密钥提交到 GitHub。
真实配置请放在本地 `.env` 或 Dify 控制台中。

## Import into Dify

在 Dify 控制台中创建或导入应用时，选择本仓库中的：

```text
dify/prompt-checkup.yml
```

导入后需要自行检查并配置模型供应商，例如 Gemini、OpenAI 或其他 Dify 支持的模型提供方。
导出的 Flow 不包含可公开使用的真实密钥。

## Test Cases

测试说明见 [docs/test-cases.md](docs/test-cases.md)。示例输入放在 [examples/](examples/) 目录中，包括：

- Chinese RAG high-risk test
- English product feedback prompt test
- Japanese writing correction prompt test
- Casual incomplete input test
- Non-prompt test
- Follow-up adjustment test
- Changed form re-diagnosis test

## Roadmap

- v0.1.0: Reproducible Dify Flow
- v0.2.0: Web UI + Local Wrapper
- v0.3.0: Expanded Multilingual Support

当前版本不包含 Web UI。本地浏览器交互界面和本地 Dify API wrapper 计划在 v0.2 中实现。
更多正式支持语言计划在 v0.3 中扩展。

## Safety Notes

- 不要提交 `.env`、真实 API Key、Dify App Key 或模型供应商密钥。
- 高风险任务应要求模型基于来源回答；无法确认时必须说明无法确认。
- RAG、知识库问答、政策、价格、法律、医疗等场景必须避免伪造引用和无依据推测。
- 优化 Prompt 时应使用清晰占位符，不应虚构用户没有提供的教材、章节、政策、价格、来源或引用。

## License

MIT License. See [LICENSE](LICENSE).
