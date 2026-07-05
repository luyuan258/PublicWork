# Claude Code Skills 及 MCP 功能完整指南

> 📅 更新时间：2026年6月12日
> 📍 安装目录：`C:\Users\LiuWenLong\.claude\skills`

---

## 📋 目录

1. [Skills 概述](#skills-概述)
2. [MCP 服务器配置](#mcp-服务器配置)
3. [核心开发 Skills](#核心开发-skills)
4. [代码质量与测试 Skills](#代码质量与测试-skills)
5. [文档与内容 Skills](#文档与内容-skills)
6. [设计与创意 Skills](#设计与创意-skills)
7. [安全与审计 Skills](#安全与审计-skills)
8. [DevOps 与工程 Skills](#devops-与工程-skills)
9. [Matt Pocock 工程 Skills](#matt-pocock-工程-skills)
10. [ECC 高级 Skills](#ecc-高级-skills)
11. [Antigravity Agent Skills](#antigravity-agent-skills)
12. [效率与工具 Skills](#效率与工具-skills)
13. [Open-Design 设计系统 Skills](#open-design-设计系统-skills)
14. [Open-Design Figma Skills](#open-design-figma-skills)
15. [Open-Design 图像生成 Skills](#open-design-图像生成-skills)
16. [Open-Design 视频/音频 Skills](#open-design-视频音频-skills)
17. [Open-Design 文档/演示 Skills](#open-design-文档演示-skills)
18. [Open-Design 前端/原型 Skills](#open-design-前端原型-skills)
19. [Open-Design 营销/品牌 Skills](#open-design-营销品牌-skills)
20. [Open-Design 模板 Skills](#open-design-模板-skills)
21. [Open-Design 帧动画 Skills](#open-design-帧动画-skills)

---

## Skills 概述

Claude Code Skills 是可扩展的功能模块，通过在 `~/.claude/skills` 目录下放置 `SKILL.md` 文件来激活。每个skill都有特定的触发条件和功能描述。

### 工作原理

- **自动触发**：当用户输入匹配skill描述中的关键词时，Claude会自动激活该skill
- **手动触发**：用户可以通过 `/skill-name` 命令手动调用
- **组合使用**：多个skills可以协同工作

---

## MCP 服务器配置

### 当前配置的 MCP 服务器

| MCP 名称 | 命令 | 功能描述 |
|---------|------|---------|
| **ppt-master** | `python E:/PublicWork/mcp/ppt-master-mcp/server.py` | PowerPoint演示文稿生成和操作服务 |

### MCP 工具列表

当前会话中可用的 MCP 工具：

| 工具名称 | 功能描述 | 使用场景 |
|---------|---------|---------|
| `mcp__ide__executeCode` | 在Jupyter内核中执行Python代码 | 数据分析、计算、可视化 |
| `mcp__ide__getDiagnostics` | 获取VS Code语言诊断信息 | 代码错误检查、类型检查 |
| `mcp__mcp-image__generate_image` | AI图像生成 | 根据文本提示生成图像 |

---

## 核心开发 Skills

### 1. Claude API (`claude-api`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `anthropic`, `claude api`, `sdk`, `prompt caching`, `tool use`, `batch`, `model` |
| **功能** | 构建、调试和优化Claude API/Anthropic SDK应用 |
| **详细说明** | 包含prompt caching、模型迁移（4.5→4.6→4.7）、Managed Agents、流式传输、批处理等 |

**支持的语言**：Python, Go, Java, Ruby, PHP, C#, cURL

---

### 2. 前端设计 (`frontend-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `website`, `landing page`, `dashboard`, `react component`, `html`, `css`, `ui`, `web component` |
| **功能** | 创建高质量、生产级的前端界面 |
| **详细说明** | 生成创意、精致的代码和UI设计，避免通用AI美学 |

---

### 3. 前端模式 (`ecc-skills/frontend-patterns`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `react`, `state management`, `hooks`, `rendering`, `forms`, `next.js` |
| **功能** | React、Next.js前端开发模式、状态管理、性能优化和UI最佳实践 |

---

### 4. 后端模式 (`ecc-skills/backend-patterns`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `api`, `express`, `node.js`, `database`, `server`, `middleware` |
| **功能** | 后端架构模式、API设计、数据库优化和服务器端最佳实践 |

---

### 5. API设计 (`ecc-skills/api-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `rest api`, `endpoint`, `status code`, `pagination`, `versioning`, `rate limiting` |
| **功能** | REST API设计模式，包括资源命名、状态码、分页、过滤、错误响应、版本控制和速率限制 |

---

### 6. 编码标准 (`ecc-skills/coding-standards`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `coding style`, `naming`, `readability`, `best practices`, `code quality` |
| **功能** | 跨项目的基础编码规范，包括命名、可读性、不可变性和代码质量审查 |

---

## 代码质量与测试 Skills

### 7. 代码审查 (`code-reviewer`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `code review`, `quality`, `best practices`, `refactor`, `code smell` |
| **功能** | 自动代码质量和最佳实践分析 |
| **详细说明** | 当文件被修改、保存或提交时自动触发，分析代码风格、模式、潜在bug和安全基础 |

---

### 8. 测试生成器 (`test-generator`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `test`, `testing`, `jest`, `vitest`, `pytest`, `unit test`, `integration test` |
| **功能** | 自动为新函数和组件建议测试 |
| **详细说明** | 创建Jest、Vitest、Pytest模式的测试脚手架 |

---

### 9. E2E测试 (`ecc-skills/e2e-testing`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `e2e`, `playwright`, `end-to-end`, `page object model`, `browser test` |
| **功能** | Playwright E2E测试模式、Page Object Model、配置、CI/CD集成 |

---

### 10. TDD工作流 (`ecc-skills/tdd-workflow`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `tdd`, `test-driven`, `red-green-refactor`, `test first` |
| **功能** | 测试驱动开发，80%+覆盖率，包括单元、集成和E2E测试 |

---

### 11. 验证循环 (`ecc-skills/verification-loop`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `verify`, `validation`, `check`, `confirm` |
| **功能** | Claude Code会话的综合验证系统 |

---

### 12. 评估工具集 (`ecc-skills/eval-harness`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `eval`, `evaluation`, `benchmark`, `test harness` |
| **功能** | Claude Code会话的正式评估框架，实现评估驱动开发(EDD)原则 |

---

## 文档与内容 Skills

### 13. API文档生成 (`api-documenter`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `api docs`, `swagger`, `openapi`, `documentation`, `endpoint` |
| **功能** | 从代码和注释自动生成API文档 |
| **详细说明** | 创建OpenAPI/Swagger规范，当API端点改变或用户提到API文档时触发 |

---

### 14. README更新器 (`readme-updater`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `readme`, `documentation`, `project docs`, `setup instructions` |
| **功能** | 保持README文件与项目变更同步 |
| **详细说明** | 当项目结构变化、功能添加或设置说明修改时触发 |

---

### 15. 文档协作 (`doc-coauthoring`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `write docs`, `proposal`, `technical spec`, `documentation`, `draft` |
| **功能** | 引导用户通过结构化工作流协作编写文档 |
| **详细说明** | 帮助用户高效转移上下文、通过迭代细化内容并验证文档对读者的有效性 |

---

### 16. 文档生成 (`antigravity-skills/documentation`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `api docs`, `architecture docs`, `readme`, `code comments`, `technical writing` |
| **功能** | 文档生成工作流，涵盖API文档、架构文档、README文件、代码注释和技术写作 |

---

### 17. 文档查找 (`ecc-skills/documentation-lookup`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `docs`, `documentation`, `api reference`, `setup`, `react`, `next.js`, `prisma` |
| **功能** | 通过Context7 MCP使用最新的库和框架文档，而不是训练数据 |

---

### 18. Word文档 (`docx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `word doc`, `.docx`, `report`, `memo`, `letter`, `template`, `table of contents` |
| **功能** | 创建、读取、编辑和操作Word文档(.docx文件) |
| **详细说明** | 支持目录、标题、页码、信头等专业格式 |

---

### 19. PDF处理 (`pdf`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `.pdf`, `pdf`, `merge pdf`, `split pdf`, `watermark`, `ocr`, `pdf form` |
| **功能** | PDF文件的全面处理 |
| **详细说明** | 读取/提取文本/表格、合并/拆分PDF、旋转页面、添加水印、创建新PDF、填充PDF表单、加密/解密、OCR扫描 |

---

### 20. PowerPoint (`pptx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `deck`, `slides`, `presentation`, `.pptx`, `pitch deck` |
| **功能** | 创建、读取、编辑和操作PowerPoint演示文稿 |
| **详细说明** | 支持模板、布局、演讲者备注、评论、合并/拆分幻灯片文件 |

---

### 21. Excel表格 (`xlsx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `spreadsheet`, `.xlsx`, `.xlsm`, `.csv`, `.tsv`, `excel`, `data cleaning` |
| **功能** | 电子表格文件的全面处理 |
| **详细说明** | 打开/读取/编辑/修复现有文件、创建新电子表格、格式化、图表、数据清理 |

---

### 22. 内部通讯 (`internal-comms`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `status report`, `leadership update`, `newsletter`, `faq`, `incident report`, `project update` |
| **功能** | 帮助编写各种内部通讯 |
| **详细说明** | 状态报告、领导层更新、3P更新、公司通讯、FAQ、事件报告、项目更新等 |

---

### 23. 文章编辑 (`mattpocock-personal/edit-article`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `edit article`, `revise`, `improve article`, `article draft` |
| **功能** | 通过重构章节、提高清晰度和精简散文来编辑和改进文章 |

---

## 设计与创意 Skills

### 24. 算法艺术 (`algorithmic-art`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `generative art`, `algorithmic art`, `p5.js`, `flow field`, `particle system`, `art using code` |
| **功能** | 使用p5.js创建算法艺术，支持种子随机性和交互式参数探索 |
| **详细说明** | 创建原创算法艺术，避免复制现有艺术家作品以防止版权侵权 |

---

### 25. 画布设计 (`canvas-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `poster`, `art`, `design`, `static piece`, `png`, `pdf` |
| **功能** | 使用设计哲学创建美丽的视觉艺术 |
| **详细说明** | 创建原创视觉设计，支持PNG和PDF格式 |

---

### 26. 品牌指南 (`brand-guidelines`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `brand colors`, `style guidelines`, `visual formatting`, `design standards`, `anthropic` |
| **功能** | 应用Anthropic官方品牌颜色和排版到任何文档 |
| **详细说明** | 当品牌颜色或样式指南、视觉格式或公司设计标准适用时使用 |

---

### 27. 主题工厂 (`theme-factory`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `theme`, `style`, `colors`, `fonts`, `design system` |
| **功能** | 为各种文档应用主题样式 |
| **详细说明** | 10个预设主题，可应用于幻灯片、文档、报告、HTML着陆页等 |

---

### 28. Web制品构建器 (`web-artifacts-builder`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `artifact`, `react`, `tailwind`, `shadcn`, `complex html`, `state management` |
| **功能** | 使用现代前端技术创建精致的多组件claude.ai HTML制品 |
| **详细说明** | 需要状态管理、路由或shadcn/ui组件的复杂制品 |

---

### 29. Slack GIF创建器 (`slack-gif-creator`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `gif`, `animated gif`, `slack`, `animation` |
| **功能** | 创建针对Slack优化的动画GIF |
| **详细说明** | 提供约束、验证工具和动画概念 |

---

## 安全与审计 Skills

### 30. 安全审计 (`security-auditor`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `security`, `vulnerability`, `owasp`, `sql injection`, `xss`, `auth`, `deployment` |
| **功能** | 持续安全漏洞扫描 |
| **详细说明** | 扫描OWASP Top 10、常见漏洞和不安全模式。在审查代码、部署前或文件更改时使用 |

---

### 31. 安全审查 (`ecc-skills/security-review`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `authentication`, `user input`, `secrets`, `api endpoint`, `payment`, `sensitive` |
| **功能** | 添加身份验证、处理用户输入、处理密钥、创建API端点或实现支付/敏感功能时的安全检查清单和模式 |

---

### 32. 安全审计 (`antigravity-skills/security-audit`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `security audit`, `web app testing`, `api security`, `penetration testing`, `vulnerability scanning` |
| **功能** | 综合安全审计工作流，涵盖Web应用测试、API安全、渗透测试、漏洞扫描和安全加固 |

---

### 33. 密钥扫描器 (`secret-scanner`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `secret`, `api key`, `credential`, `token`, `.env`, `exposed`, `security check` |
| **功能** | 检测代码中暴露的密钥、API密钥、凭据和令牌 |
| **详细说明** | 在提交前、文件保存时或提到安全时使用，防止意外密钥暴露 |

---

### 34. 依赖审计 (`dependency-auditor`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `npm audit`, `pip-audit`, `vulnerability`, `package.json`, `requirements.txt`, `dependency` |
| **功能** | 检查依赖项的已知漏洞 |
| **详细说明** | 当package.json或requirements.txt更改或部署前使用，对有漏洞的依赖项发出警报 |

---

## DevOps 与工程 Skills

### 35. Git提交助手 (`git-commit-helper`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `git commit`, `commit message`, `staged changes`, `conventional commit` |
| **功能** | 自动生成约定式提交消息 |
| **详细说明** | 分析git diff以创建清晰、描述性的约定式提交消息 |

---

### 36. Git护栏 (`mattpocock-misc/git-guardrails-claude-code`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `git guardrails`, `git safety`, `block push`, `block reset`, `destructive git` |
| **功能** | 设置Claude Code钩子以阻止危险的git命令（push、reset --hard、clean、branch -D等） |

---

### 37. Pre-commit设置 (`mattpocock-misc/setup-pre-commit`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `pre-commit`, `husky`, `lint-staged`, `commit hooks`, `formatting` |
| **功能** | 在当前仓库中设置Husky pre-commit钩子，配合lint-staged（Prettier）、类型检查和测试 |

---

### 38. 架构设计 (`antigravity-skills/architecture`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `architecture`, `decision`, `trade-off`, `adr`, `system design` |
| **功能** | 架构决策框架，需求分析、权衡评估、ADR文档 |

---

### 39. 数据库设计 (`antigravity-skills/database-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `database`, `schema`, `indexing`, `orm`, `serverless database` |
| **功能** | 数据库设计原则和决策，模式设计、索引策略、ORM选择、无服务器数据库 |

---

### 40. DevOps (`mattpocock-engineering/devops`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `devops`, `ci/cd`, `deployment`, `docker`, `kubernetes`, `infrastructure` |
| **功能** | DevOps最佳实践和工作流 |

---

### 41. MCP构建器 (`mcp-builder`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `mcp server`, `model context protocol`, `tool integration`, `external api` |
| **功能** | 创建高质量MCP服务器的指南 |
| **详细说明** | 支持Python（FastMCP）或Node/TypeScript（MCP SDK）构建MCP服务器以集成外部API或服务 |

---

### 42. MCP服务器模式 (`ecc-skills/mcp-server-patterns`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `mcp`, `model context protocol`, `tools`, `resources`, `prompts`, `zod`, `stdio`, `http` |
| **功能** | 使用Node/TypeScript SDK构建MCP服务器——工具、资源、提示、Zod验证、stdio vs Streamable HTTP |

---

### 43. Next.js Turbopack (`ecc-skills/nextjs-turbopack`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `next.js`, `turbopack`, `webpack`, `bundling`, `caching`, `dev speed` |
| **功能** | Next.js 16+和Turbopack——增量打包、FS缓存、开发速度，以及何时使用Turbopack vs webpack |

---

### 44. Airflow DAG模式 (`antigravity-skills/airflow-dag-patterns`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `airflow`, `dag`, `data pipeline`, `workflow`, `scheduling`, `batch job` |
| **功能** | 构建生产级Apache Airflow DAG，包含操作器、传感器、测试和部署的最佳实践 |

---

## Matt Pocock 工程 Skills

### 45. 诊断 (`mattpocock-engineering/diagnose`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `diagnose`, `debug`, `bug`, `broken`, `failing`, `performance regression` |
| **功能** | 针对困难bug和性能回归的纪律性诊断循环 |
| **详细说明** | 复现→最小化→假设→检测→修复→回归测试 |

---

### 46. 文档验证 (`mattpocock-engineering/grill-with-docs`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `grill`, `stress test plan`, `domain model`, `terminology`, `context.md`, `adr` |
| **功能** | 挑战你的计划与现有领域模型的验证会话，精炼术语，并在决策结晶时更新文档 |

---

### 47. 改进代码库架构 (`mattpocock-engineering/improve-codebase-architecture`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `improve architecture`, `refactoring`, `consolidate modules`, `testable`, `navigable` |
| **功能** | 根据CONTEXT.md中的领域语言和docs/adr/中的决策，发现代码库中的深化机会 |

---

### 48. 设置Matt Pocock Skills (`mattpocock-engineering/setup-matt-pocock-skills`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `setup skills`, `agent skills`, `issue tracker`, `triage labels` |
| **功能** | 在AGENTS.md/CLAUDE.md和docs/agents/中设置`## Agent skills`块 |
| **详细说明** | 首次使用其他Matt Pocock skills之前运行 |

---

### 49. TDD (`mattpocock-engineering/tdd`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `tdd`, `test-driven`, `red-green-refactor`, `integration tests`, `test first` |
| **功能** | 红-绿-重构循环的测试驱动开发 |

---

### 50. 转换为Issues (`mattpocock-engineering/to-issues`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `convert plan to issues`, `create tickets`, `break down work`, `implementation issues` |
| **功能** | 使用tracer-bullet垂直切片将计划、规范或PRD分解为项目问题跟踪器上可独立获取的issues |

---

### 51. 转换为PRD (`mattpocock-engineering/to-prd`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `create prd`, `product requirements`, `from context` |
| **功能** | 将当前对话上下文转换为PRD并发布到项目问题跟踪器 |

---

### 52. 分诊 (`mattpocock-engineering/triage`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `triage`, `issue workflow`, `bug review`, `feature request`, `afk agent` |
| **功能** | 通过分诊角色驱动的状态机对issues进行分类 |

---

### 53. 放大视角 (`mattpocock-engineering/zoom-out`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `zoom out`, `broader context`, `higher level`, `bigger picture` |
| **功能** | 告诉agent放大视角，提供更广泛的背景或更高层次的视角 |

---

### 54. 搭建练习 (`mattpocock-misc/scaffold-exercises`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `scaffold exercises`, `exercise stubs`, `course section`, `exercise directory` |
| **功能** | 创建包含章节、问题、解决方案和解释器的练习目录结构，通过linting |

---

### 55. 迁移到Shoehorn (`mattpocock-misc/migrate-to-shoehorn`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `shoehorn`, `replace as`, `type assertions`, `partial test data` |
| **功能** | 将测试文件从`as`类型断言迁移到@total-typescript/shoehorn |

---

### 56. 编辑文章 (`mattpocock-personal/edit-article`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `edit article`, `revise`, `improve article`, `article draft` |
| **功能** | 通过重构章节、提高清晰度和精简散文来编辑和改进文章 |

---

### 57. Obsidian仓库 (`mattpocock-personal/obsidian-vault`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `obsidian`, `notes`, `wikilinks`, `vault`, `search notes`, `create notes` |
| **功能** | 在Obsidian仓库中搜索、创建和管理笔记，支持wikilinks和索引笔记 |

---

### 58. 洞穴人 (`mattpocock-productivity/caveman`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `caveman`, `few token`, `simple language`, `concise` |
| **功能** | 使用洞穴人式简短语言，减少65%的token使用 |

---

### 59. 质问我 (`mattpocock-productivity/grill-me`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `grill me`, `stress test`, `plan`, `design`, `interview` |
| **功能** | 不断采访用户关于计划或设计，直到达成共识，解决决策树的每个分支 |

---

### 60. 编写Skill (`mattpocock-productivity/write-a-skill`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `write skill`, `create skill`, `build skill`, `new skill` |
| **功能** | 创建具有适当结构、渐进式披露和捆绑资源的新agent skills |

---

## ECC 高级 Skills

### 61. Agent自省调试 (`ecc-skills/agent-introspection-debugging`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `agent failure`, `self-debugging`, `introspection`, `capture`, `diagnosis`, `recovery` |
| **功能** | AI agent故障的结构化自调试工作流 |

---

### 62. 深度研究 (`ecc-skills/deep-research`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `research`, `deep research`, `web search`, `synthesis`, `citations`, `evidence` |
| **功能** | 使用firecrawl和exa MCP进行多源深度研究 |
| **详细说明** | 搜索网络、综合发现并交付带引用的报告 |

---

### 63. 策略性压缩 (`ecc-skills/strategic-compact`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `compact`, `context`, `compress`, `summarize` |
| **功能** | 在逻辑间隔建议手动上下文压缩，以在任务阶段之间保留上下文 |

---

### 64. Claude Code全解 (`ecc-skills/everything-claude-code`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `claude code`, `development conventions`, `patterns`, `javascript project` |
| **功能** | Claude Code的开发约定和模式，JavaScript项目约定式提交 |

---

## Antigravity Agent Skills

### 65. Agent编排 (`antigravity-skills/agent-orchestrator`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `orchestration`, `multi-agent`, `workflow`, `automation`, `agent coordination` |
| **功能** | 编排生态系统中所有agents的元技能 |
| **详细说明** | 自动扫描skills、按能力匹配、协调多技能工作流和注册管理 |

---

### 66. AI工程师 (`antigravity-skills/ai-engineer`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `llm`, `rag`, `vector search`, `multimodal ai`, `agent`, `ai integration` |
| **功能** | 构建生产级LLM应用、高级RAG系统和智能agents |
| **详细说明** | 实现向量搜索、多模态AI、agent编排和企业AI集成 |

---

### 67. Agent内存系统 (`antigravity-skills/agent-memory-systems`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `memory`, `agent memory`, `context retention`, `long-term memory` |
| **功能** | 智能agents的内存系统，内存是智能agents的基石 |

---

### 68. AI产品 (`antigravity-skills/ai-product`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `ai product`, `ai-powered`, `product development`, `ai integration` |
| **功能** | AI产品开发，每个产品都将由AI驱动 |

---

### 69. AI SEO (`antigravity-skills/ai-seo`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `seo`, `ai search`, `llm citations`, `ai overviews`, `chatgpt`, `perplexity`, `visibility` |
| **功能** | 为AI搜索和LLM引用优化内容 |
| **详细说明** | 优化AI Overviews、ChatGPT、Perplexity、Claude、Gemini等系统的可见性 |

---

## 效率与工具 Skills

### 70. Web应用测试 (`webapp-testing`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `playwright`, `web testing`, `frontend testing`, `browser screenshot`, `ui debugging` |
| **功能** | 使用Playwright与本地Web应用交互和测试的工具包 |
| **详细说明** | 支持验证前端功能、调试UI行为、捕获浏览器截图和查看浏览器日志 |

---

### 71. Skill创建器 (`skill-creator`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `create skill`, `edit skill`, `optimize skill`, `eval`, `benchmark` |
| **功能** | 创建新skills、修改和改进现有skills，并测量skill性能 |
| **详细说明** | 从头创建skill、编辑或优化现有skill、运行评估、基准测试、优化描述以提高触发准确性 |

---

## Open-Design 设计系统 Skills

> 来源：[nexu-io/open-design](https://github.com/nexu-io/open-design)（⭐ 63.6k，Apache-2.0）

### 72. 设计简报 (`design-brief`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `design brief`, `create a design brief`, `ilang brief`, `structured brief` |
| **功能** | 解析I-Lang协议格式的结构化设计简报，消除模糊请求 |
| **详细说明** | 要求明确调色板、排版、布局、情绪、密度和约束等维度 |

---

### 73. 设计咨询 (`design-consultation`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `design consultation`, `design from scratch`, `design system kickoff`, `brand workshop` |
| **功能** | 从零构建完整设计系统，包含创意风险和产品级模型 |
| **详细说明** | 适用于启动研讨会和品牌从零创建工作 |

---

### 74. 设计文档 (`design-md`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `design.md`, `design doc`, `design tokens doc`, `visual rules doc` |
| **功能** | 创建和管理DESIGN.md文件 |
| **详细说明** | 捕获设计方向、设计令牌和视觉规则的单一真实来源 |

---

### 75. 设计审查 (`design-review`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `design review`, `visual audit`, `before after`, `pre launch design check` |
| **功能** | 视觉审计后修复，使用原子提交和前后截图对比 |
| **详细说明** | 适用于发布前收紧已发布的UI |

---

### 76. Apple人机界面指南 (`apple-hig`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `apple hig`, `human interface`, `ios design`, `macos design`, `visionos design` |
| **功能** | Apple HIG作为14个agent skills，覆盖平台、基础、组件、模式、输入和技术 |
| **详细说明** | 支持iOS、macOS、visionOS、watchOS和tvOS |

---

### 77. 色彩专家 (`color-expert`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `color theory`, `palette generator`, `color science`, `oklch palette`, `contrast check` |
| **功能** | 色彩科学专家，286K字参考材料 |
| **详细说明** | 覆盖OKLCH/OKLAB、调色板生成、可访问性/对比度、色彩命名、颜料混合和历史色彩理论 |

---

### 78. 创意总监 (`creative-director`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `creative director`, `campaign concept`, `creative critique`, `cannes review`, `scamper` |
| **功能** | AI创意总监，递归自我评估 |
| **详细说明** | 20+方法论（SIT、TRIZ、Bisociation、SCAMPER、Synectics），3轴评估校准Cannes/D&AD/HumanKind，5阶段流程 |

---

### 79. 品牌套件 (`brandkit`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `brand kit`, `brand guidelines board`, `logo system`, `identity board` |
| **功能** | 高端品牌套件图像生成 |
| **详细说明** | 极简、电影、编辑、暗科技、奢华、文化、安全、游戏、开发者工具和消费者应用品牌系统 |

---

### 80. 头脑风暴 (`brainstorming`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `brainstorm`, `ideation`, `concept exploration`, `rough ideas`, `design alternatives` |
| **功能** | 通过结构化提问和替代方案探索，将粗略想法转化为完整设计 |

---

### 81. 提示增强 (`enhance-prompt`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `enhance prompt`, `design prompt`, `ui prompt`, `design vocabulary` |
| **功能** | 使用设计规范和UI/UX词汇改进建议 |
| **详细说明** | 适用于设计到代码工作流和澄清视觉输出请求 |

---

### 82. 设计参考合约 (`reference-design-contract`)

| 属性 | 描述 |
|-----|------|
| **功能** | 设计参考合约，确保设计一致性和质量标准 |

---

### 83. 平台设计 (`platform-design`)

| 属性 | 描述 |
|-----|------|
| **功能** | 针对不同平台的设计规范和适配 |

---

### 84. 极致设计打磨 (`impeccable-design-polish`)

| 属性 | 描述 |
|-----|------|
| **功能** | 对设计进行精细打磨，提升视觉品质 |

---

### 85. UI/UX专业版 (`ui-ux-pro-max`)

| 属性 | 描述 |
|-----|------|
| **功能** | 全面的UI/UX设计能力，覆盖设计系统、组件库和交互模式 |

---

### 86. 设计规划审查 (`plan-design-review`)

| 属性 | 描述 |
|-----|------|
| **功能** | 设计规划阶段的审查和评估 |

---

### 87. 重新设计 (`redesign-skill`)

| 属性 | 描述 |
|-----|------|
| **功能** | 对现有设计进行重新设计和优化 |

---

### 88. Web设计指南 (`web-design-guidelines`)

| 属性 | 描述 |
|-----|------|
| **功能** | Web设计最佳实践和指南 |

---

### 89. SwiftUI设计 (`swiftui-design`)

| 属性 | 描述 |
|-----|------|
| **功能** | SwiftUI框架的设计模式和最佳实践 |

---

## Open-Design Figma Skills

### 90. Figma代码连接 (`figma-code-connect-components`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma code connect`, `design to code`, `figma components`, `code connect` |
| **功能** | 将Figma设计组件连接到代码组件，设计系统更新自动流入代码库 |

---

### 91. Figma设计系统规则 (`figma-create-design-system-rules`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma rules`, `design system rules`, `figma to code rules`, `figma tokens` |
| **功能** | 为Figma到代码工作流生成项目特定的设计系统规则 |

---

### 92. Figma创建新文件 (`figma-create-new-file`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma new file`, `figjam new`, `create figma file` |
| **功能** | 创建新的空白Figma Design或FigJam文件 |

---

### 93. Figma生成设计 (`figma-generate-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma generate design`, `code to figma`, `screen generation`, `figma from code` |
| **功能** | 使用设计系统组件从代码或描述在Figma中构建或更新屏幕 |

---

### 94. Figma生成库 (`figma-generate-library`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma library`, `design system library`, `figma from codebase`, `sync figma` |
| **功能** | 从代码库构建或更新专业级设计系统库 |

---

### 95. Figma实现设计 (`figma-implement-design`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma to code`, `implement figma`, `figma fidelity`, `1:1 figma` |
| **功能** | 将Figma设计转换为生产就绪代码，1:1视觉保真度 |

---

### 96. Figma使用 (`figma-use`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `figma use`, `figma plugin api`, `figma canvas`, `figma scripts` |
| **功能** | 运行Figma Plugin API脚本，进行画布写入、检查、变量和设计系统工作 |
| **详细说明** | 此目录中每个其他Figma技能的先决条件 |

---

## Open-Design 图像生成 Skills

### 97. fal.ai 3D生成 (`fal-3d`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal 3d`, `text to 3d`, `image to 3d`, `3d model gen`, `game asset 3d` |
| **功能** | 从文本或图像通过fal.ai生成3D模型 |

---

### 98. fal.ai 图像生成 (`fal-generate`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal generate`, `fal.ai image`, `flux image`, `sdxl`, `ideogram` |
| **功能** | 使用fal.ai AI模型生成图像和视频 |

---

### 99. fal.ai 图像编辑 (`fal-image-edit`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal image edit`, `inpaint`, `style transfer`, `background removal`, `object removal` |
| **功能** | AI驱动的图像编辑：风格迁移、背景移除、对象移除和修复 |

---

### 100. fal.ai Kling O3 (`fal-kling-o3`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal kling`, `kling o3`, `kling video`, `kling image` |
| **功能** | 使用Kling O3生成图像和视频 |

---

### 101. fal.ai 唇形同步 (`fal-lip-sync`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `lip sync`, `talking head`, `audio to video`, `avatar video`, `fal lipsync` |
| **功能** | 创建说话头像视频和唇形同步 |

---

### 102. fal.ai 实时生成 (`fal-realtime`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal realtime`, `streaming image`, `realtime image gen`, `moodboard` |
| **功能** | 实时和流式AI图像生成 |

---

### 103. fal.ai 图像修复 (`fal-restore`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal restore`, `restore image`, `deblur`, `denoise`, `fix faces` |
| **功能** | 修复和提升图像质量：去模糊、去噪、修复人脸和恢复旧文档 |

---

### 104. fal.ai 模型训练 (`fal-train`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal train`, `train lora`, `custom model`, `personalized image gen`, `brand lora` |
| **功能** | 在fal.ai上训练自定义AI模型（LoRA） |

---

### 105. fal.ai 虚拟试穿 (`fal-tryon`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `virtual tryon`, `fal tryon`, `try on clothes`, `lookbook`, `ecommerce styling` |
| **功能** | 虚拟试穿——查看衣服穿在人身上的效果 |

---

### 106. fal.ai 超分辨率 (`fal-upscale`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal upscale`, `upscale image`, `super resolution`, `4k upscale`, `enhance resolution` |
| **功能** | 使用AI超分辨率模型放大和增强图像和视频分辨率 |

---

### 107. fal.ai 视频编辑 (`fal-video-edit`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal video edit`, `video upscale`, `video style transfer`, `remove video bg`, `video remix` |
| **功能** | 使用AI编辑现有视频：风格迁移、放大、背景移除和添加音频 |

---

### 108. fal.ai 视觉分析 (`fal-vision`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `fal vision`, `image analysis`, `object detection`, `ocr image`, `visual qa` |
| **功能** | 分析图像：分割对象、检测、OCR、描述和视觉问答 |

---

### 109. Venice图像生成 (`venice-image-generate`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Venice AI生成图像 |

---

### 110. Venice图像编辑 (`venice-image-edit`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Venice AI编辑图像 |

---

### 111. Imagen (`imagen`)

| 属性 | 描述 |
|-----|------|
| **功能** | Google Imagen图像生成 |

---

### 112. Replicate (`replicate`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Replicate平台运行AI模型 |

---

### 113. 图像生成器 (`imagegen`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通用图像生成技能 |

---

### 114. 图像增强器 (`image-enhancer`)

| 属性 | 描述 |
|-----|------|
| **功能** | 图像质量增强和优化 |

---

### 115. 电商图像工作流 (`ecommerce-image-workflow`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `ecommerce product images`, `product image set`, `product photography workflow` |
| **功能** | 参考产品电商图像工作流 |

---

### 116. 截图营销 (`screenshots-marketing`)

| 属性 | 描述 |
|-----|------|
| **功能** | 用于营销的截图生成和优化 |

---

### 116. 像素媒体 (`pixelbin-media`)

| 属性 | 描述 |
|-----|------|
| **功能** | 媒体文件处理和优化 |

---

## Open-Design 视频/音频 Skills

### 117. Sora (`sora`)

| 属性 | 描述 |
|-----|------|
| **功能** | OpenAI Sora视频生成 |

---

### 118. Remotion (`remotion`)

| 属性 | 描述 |
|-----|------|
| **功能** | 使用React创建视频的Remotion框架 |

---

### 119. Venice视频 (`venice-video`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Venice AI生成视频 |

---

### 120. Venice音频-音乐 (`venice-audio-music`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Venice AI生成音乐 |

---

### 121. Venice音频-语音 (`venice-audio-speech`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通过Venice AI生成语音 |

---

### 122. 语音 (`speech`)

| 属性 | 描述 |
|-----|------|
| **功能** | 语音合成和处理 |

---

### 123. AI音乐专辑 (`ai-music-album`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `ai music`, `music album`, `lyric writing`, `track sequencing`, `album production` |
| **功能** | 全生命周期AI音乐专辑制作——概念、歌词起草、曲目排序和导出 |

---

### 124. 视频下载器 (`video-downloader`)

| 属性 | 描述 |
|-----|------|
| **功能** | 从各种平台下载视频 |

---

### 125. YouTube剪辑器 (`youtube-clipper`)

| 属性 | 描述 |
|-----|------|
| **功能** | YouTube视频剪辑和片段提取 |

---

### 126. 视频超帧 (`video-hyperframes`)

| 属性 | 描述 |
|-----|------|
| **功能** | 基于HyperFrames的视频模板系统 |

---

### 127. GIF贴纸制作器 (`gif-sticker-maker`)

| 属性 | 描述 |
|-----|------|
| **功能** | 创建GIF和贴纸 |

---

## Open-Design 文档/演示 Skills

### 128. Word文档-新版 (`docx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `docx`, `word document`, `tracked changes`, `design brief doc`, `copy doc` |
| **功能** | 创建、编辑和分析Word文档，支持修订、评论和格式 |

---

### 129. PDF处理-新版 (`pdf`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `.pdf`, `pdf`, `merge pdf`, `split pdf`, `watermark`, `ocr`, `pdf form` |
| **功能** | PDF文件的全面处理，支持读取、合并、拆分、水印、OCR等 |

---

### 130. PPTX (`pptx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `deck`, `slides`, `presentation`, `.pptx`, `pitch deck` |
| **功能** | 创建、读取、编辑和操作PowerPoint演示文稿 |

---

### 131. PPTX生成器 (`pptx-generator`)

| 属性 | 描述 |
|-----|------|
| **功能** | PowerPoint演示文稿生成器 |

---

### 132. PPTX保真度审计 (`pptx-html-fidelity-audit`)

| 属性 | 描述 |
|-----|------|
| **功能** | 审计PPTX到HTML转换的保真度 |

---

### 133. PPT Keynote (`ppt-keynote`)

| 属性 | 描述 |
|-----|------|
| **功能** | Keynote风格的演示文稿创建 |

---

### 134. 幻灯片 (`slides`)

| 属性 | 描述 |
|-----|------|
| **功能** | 通用幻灯片创建和管理 |

---

### 135. HTML PPT (`html-ppt-retro-quarterly-review`)

| 属性 | 描述 |
|-----|------|
| **功能** | 使用HTML创建复古风格的季度回顾演示文稿 |

---

### 136. Nanobanana PPT (`nanobanana-ppt`)

| 属性 | 描述 |
|-----|------|
| **功能** | Nanobanana风格的PPT生成 |

---

### 137. Minimax PDF (`minimax-pdf`)

| 属性 | 描述 |
|-----|------|
| **功能** | Minimax PDF生成 |

---

### 138. Minimax DOCX (`minimax-docx`)

| 属性 | 描述 |
|-----|------|
| **功能** | Minimax Word文档生成 |

---

### 139. Excel表格 (`xlsx`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `spreadsheet`, `.xlsx`, `.xlsm`, `.csv`, `.tsv`, `excel`, `data cleaning` |
| **功能** | 电子表格文件的全面处理 |

---

### 140. 数据报告 (`data-report`)

| 属性 | 描述 |
|-----|------|
| **功能** | 把CSV/Excel/JSON数据转成漂亮的可视化报告页 |

---

### 141. 发布说明 (`release-notes-one-pager`)

| 属性 | 描述 |
|-----|------|
| **功能** | 创建单页发布说明文档 |

---

### 142. 简历 (`resume-modern`)

| 属性 | 描述 |
|-----|------|
| **功能** | 创建现代风格简历 |

---

### 143. 文章杂志 (`article-magazine`)

| 属性 | 描述 |
|-----|------|
| **功能** | Huashu风格杂志文章版式，将Markdown转成精排长文HTML |

---

### 144. 文档-羊皮纸 (`doc-kami-parchment`)

| 属性 | 描述 |
|-----|------|
| **功能** | 暖羊皮纸底+墨蓝单色accent的编辑级排印文档 |

---

## Open-Design 前端/原型 Skills

### 145. 粗野主义设计 (`brutalist-skill`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `industrial brutalist UI`, `tactical telemetry`, `swiss industrial`, `brutalist interface` |
| **功能** | 原始机械界面，融合瑞士印刷和军事终端美学 |

---

### 146. D3可视化 (`d3-visualization`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `d3`, `d3.js`, `interactive chart`, `data visualization`, `editorial chart` |
| **功能** | D3图表和交互式数据可视化，全面的D3.js技能 |

---

### 147. 前端开发 (`frontend-dev`)

| 属性 | 描述 |
|-----|------|
| **功能** | 前端开发最佳实践和模式 |

---

### 148. 前端技能 (`frontend-skill`)

| 属性 | 描述 |
|-----|------|
| **功能** | 前端开发技能集合 |

---

### 149. 前端幻灯片 (`frontend-slides`)

| 属性 | 描述 |
|-----|------|
| **功能** | 前端技术演示幻灯片 |

---

### 150. 极简设计 (`minimalist-skill`)

| 属性 | 描述 |
|-----|------|
| **功能** | 极简主义设计原则和实现 |

---

### 151. 登录流程 (`login-flow`)

| 属性 | 描述 |
|-----|------|
| **功能** | 登录和认证流程设计 |

---

### 152. 柔和技能 (`soft-skill`)

| 属性 | 描述 |
|-----|------|
| **功能** | 软技能和沟通技巧 |

---

### 153. shadcn/ui (`shadcn-ui`)

| 属性 | 描述 |
|-----|------|
| **功能** | shadcn/ui组件库集成和使用 |

---

### 154. 着色器开发 (`shader-dev`)

| 属性 | 描述 |
|-----|------|
| **功能** | WebGL着色器开发 |

---

### 155. Three.js (`threejs`)

| 属性 | 描述 |
|-----|------|
| **功能** | Three.js 3D图形开发 |

---

### 156. GSAP核心 (`gsap-core`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP动画库核心功能 |

---

### 157. GSAP框架 (`gsap-frameworks`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP与前端框架集成 |

---

### 158. GSAP性能 (`gsap-performance`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP动画性能优化 |

---

### 159. GSAP插件 (`gsap-plugins`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP插件使用指南 |

---

### 160. GSAP React (`gsap-react`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP在React中的使用 |

---

### 161. GSAP ScrollTrigger (`gsap-scrolltrigger`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP滚动触发动画 |

---

### 162. GSAP时间线 (`gsap-timeline`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP时间线动画编排 |

---

### 163. GSAP工具 (`gsap-utils`)

| 属性 | 描述 |
|-----|------|
| **功能** | GSAP工具函数和辅助方法 |

---

### 164. Flutter动画 (`flutter-animating-apps`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `flutter animation`, `flutter motion`, `mobile animation`, `flutter transitions` |
| **功能** | 在Flutter应用中实现动画效果、过渡和运动 |

---

### 165. 手绘图表 (`hand-drawn-diagrams`)

| 属性 | 描述 |
|-----|------|
| **功能** | 手绘风格的图表和示意图 |

---

### 166. 运动设计 (`emilkowalski-motion`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `emil kowalski`, `motion polish`, `micro interaction`, `interaction animation` |
| **功能** | 受Emil Kowalski动画指导启发的运动设计，添加优雅的微交互 |

---

### 167. 海报英雄 (`poster-hero`)

| 属性 | 描述 |
|-----|------|
| **功能** | 英雄海报设计和生成 |

---

### 168. VFX文本光标 (`vfx-text-cursor`)

| 属性 | 描述 |
|-----|------|
| **功能** | 文本光标视觉特效 |

---

### 169. Hatch宠物 (`hatch-pet`)

| 属性 | 描述 |
|-----|------|
| **功能** | 交互式宠物设计 |

---

### 170. 输出技能 (`output-skill`)

| 属性 | 描述 |
|-----|------|
| **功能** | 输出格式化和处理 |

---

### 171. UI技能 (`ui-skills`)

| 属性 | 描述 |
|-----|------|
| **功能** | UI设计技能集合 |

---

### 172. WPDS (`wpds`)

| 属性 | 描述 |
|-----|------|
| **功能** | WordPress设计系统 |

---

## Open-Design 营销/品牌 Skills

### 173. 广告创意 (`ad-creative`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `ad creative`, `ad headline`, `ad copy`, `paid social ad`, `search ad` |
| **功能** | 生成和迭代广告创意，包括标题、描述和主要文本 |

---

### 174. 竞品广告提取 (`competitive-ads-extractor`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `competitive ads`, `ad library extract`, `competitor creative`, `ad teardown` |
| **功能** | 从广告库中提取和分析竞争对手广告 |

---

### 175. 文案写作 (`copywriting`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `copywriting`, `landing copy`, `ad copy`, `homepage copy`, `rewrite copy` |
| **功能** | 为着陆页、主页和广告撰写和重写营销文案 |

---

### 176. 域名头脑风暴 (`domain-name-brainstormer`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `domain name`, `brainstorm domain`, `tld check`, `startup name`, `product name` |
| **功能** | 生成创意域名想法并检查多个TLD的可用性 |

---

### 177. 营销心理学 (`marketing-psychology`)

| 属性 | 描述 |
|-----|------|
| **功能** | 营销心理学原理和应用 |

---

### 178. 付费墙优化 (`paywall-upgrade-cro`)

| 属性 | 描述 |
|-----|------|
| **功能** | 付费墙升级和转化率优化 |

---

## Open-Design 模板 Skills

### 179. 推特卡片 (`card-twitter`)

| 属性 | 描述 |
|-----|------|
| **功能** | 推特金句/数据卡，适合配推文 |

---

### 180. 小红书卡片 (`card-xiaohongshu`)

| 属性 | 描述 |
|-----|------|
| **功能** | 小红书风格知识卡片，多张联排可滑动浏览 |

---

### 181. FAQ页面 (`faq-page`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `faq`, `FAQ`, `frequently asked questions`, `help center`, `support page` |
| **功能** | 带可折叠手风琴部分的常见问题页面 |

---

### 182. 3D设备模型 (`mockup-device-3d`)

| 属性 | 描述 |
|-----|------|
| **功能** | 3D设备模型和展示 |

---

### 183. 全页截图 (`full-page-screenshot`)

| 属性 | 描述 |
|-----|------|
| **功能** | 全页面截图捕获 |

---

### 184. 截图 (`screenshot`)

| 属性 | 描述 |
|-----|------|
| **功能** | 截图工具 |

---

### 185. 导出调试 (`export-download-debugging`)

| 属性 | 描述 |
|-----|------|
| **触发关键词** | `export image failed`, `image export`, `download is 0kb`, `0 KB file` |
| **功能** | 诊断和修复浏览器、预览或Electron导出/下载失败 |

---

## Open-Design 帧动画 Skills

### 186. 瑞士金融科技模板 (`digits-fintech-swiss-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 瑞士网格金融科技演示模板，黑色/暖纸/霓虹绿对比 |

---

### 187. 编辑勃艮第模板 (`editorial-burgundy-principles-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 编辑工作室演示模板，勃艮第/腮红/哑光金色调 |

---

### 188. 8位轨道视频模板 (`8-bit-orbit-video-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 基于HyperFrames的复古像素演示运动设计视频模板 |

---

### 189. 暗黑时尚模板 (`after-hours-editorial-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 奢华暗黑编辑HyperFrames模板，三页电影故事板 |

---

### 190. 田野笔记模板 (`field-notes-editorial-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 编辑"田野笔记"报告模板，柔和纸张背景 |

---

### 191. 瑞士创意模板 (`swiss-creative-mode-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 瑞士创意模式模板 |

---

### 192. 瑞士用户研究视频模板 (`swiss-user-research-video-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 瑞士风格用户研究视频模板 |

---

### 193. 被年回顾视频模板 (`weread-year-in-review-video-template`)

| 属性 | 描述 |
|-----|------|
| **功能** | 微信读书年度回顾视频模板 |

---

### 194. 贵藏编辑模板 (`deck-guizang-editorial`)

| 属性 | 描述 |
|-----|------|
| **功能** | 电子杂志×电子墨水，10个版面+5套调色板 |

---

### 195. 开放幻灯片画布 (`deck-open-slide-canvas`)

| 属性 | 描述 |
|-----|------|
| **功能** | 锁死1920×1080画布，React组件级自由组合 |

---

### 196. 瑞士国际模板 (`deck-swiss-international`)

| 属性 | 描述 |
|-----|------|
| **功能** | 16列网格+单一饱和accent+22个锁死版面 |

---

### 197. NYT数据图表帧 (`frame-data-chart-nyt`)

| 属性 | 描述 |
|-----|------|
| **功能** | NYT新闻编辑室排版+错峰揭示动画+编辑级图表 |

---

### 198. 流程图便利贴帧 (`frame-flowchart-sticky`)

| 属性 | 描述 |
|-----|------|
| **功能** | SVG曲线连接+便利贴节点+光标交互 |

---

### 199. 故障标题帧 (`frame-glitch-title`)

| 属性 | 描述 |
|-----|------|
| **功能** | 故障效果标题动画 |

---

### 200. 光泄漏电影帧 (`frame-light-leak-cinema`)

| 属性 | 描述 |
|-----|------|
| **功能** | 光泄漏电影效果 |

---

### 201. 液体背景英雄帧 (`frame-liquid-bg-hero`)

| 属性 | 描述 |
|-----|------|
| **功能** | 液体背景英雄区域效果 |

---

### 202. Logo片尾帧 (`frame-logo-outro`)

| 属性 | 描述 |
|-----|------|
| **功能** | Logo片尾动画 |

---

### 203. macOS通知帧 (`frame-macos-notification`)

| 属性 | 描述 |
|-----|------|
| **功能** | macOS风格通知动画 |

---

### 204. 其他帧模板

| 技能 | 功能 |
|-----|------|
| `stitch-loop` | 循环动画模板 |
| `stitch-skill` | Stitch技能 |
| `taste-skill` | 品味技能 |
| `taste-skill-v1` | 品味技能v1 |
| `gpt-tasteskill` | GPT品味技能 |
| `image-to-code-skill` | 图像转代码 |
| `imagegen-frontend-mobile` | 移动端图像生成前端 |
| `imagegen-frontend-web` | Web端图像生成前端 |
| `agent-browser` | 浏览器自动化CLI |
| `research-decision-room` | 研究决策室 |

---

## 📊 Skills 统计摘要

| 类别 | 数量 | 主要功能 |
|-----|------|---------|
| 核心开发 | 6 | API开发、前端、后端、编码标准 |
| 代码质量与测试 | 6 | 代码审查、测试生成、TDD、E2E测试 |
| 文档与内容 | 11 | API文档、README、Word、PDF、PPT、Excel |
| 设计与创意 | 6 | 算法艺术、品牌指南、主题、GIF |
| 安全与审计 | 5 | 安全扫描、密钥检测、依赖审计 |
| DevOps与工程 | 9 | Git、架构、数据库、MCP、CI/CD |
| Matt Pocock系列 | 16 | 诊断、TDD、PRD、分诊、文档 |
| ECC高级 | 4 | 深度研究、验证、压缩 |
| Antigravity Agent | 5 | Agent编排、AI工程、内存系统 |
| 效率与工具 | 2 | Web测试、Skill创建 |
| **Open-Design 设计系统** | **17** | 设计简报、咨询、审查、色彩、创意总监 |
| **Open-Design Figma** | **7** | Figma代码连接、设计生成、库同步 |
| **Open-Design 图像生成** | **21** | fal.ai全系列、Venice、Imagen、电商图像 |
| **Open-Design 视频/音频** | **11** | Sora、Remotion、Venice视频/音频、GIF |
| **Open-Design 文档/演示** | **17** | Word、PDF、PPTX、数据报告、简历 |
| **Open-Design 前端/原型** | **27** | D3、GSAP全系列、Three.js、Flutter、shadcn |
| **Open-Design 营销/品牌** | **6** | 广告创意、竞品分析、文案、域名 |
| **Open-Design 模板** | **7** | 推特/小红书卡片、FAQ、3D模型 |
| **Open-Design 帧动画** | **19** | 瑞士模板、NYT图表、故障效果、液体背景 |
| **总计** | **200+** | - |

---

## 🔧 使用建议

### 快速查找

1. **按关键词搜索**：使用 `Ctrl+F` 搜索触发关键词
2. **按类别浏览**：根据目录结构找到相关skills
3. **组合使用**：多个skills可以协同工作

### 最佳实践

1. **明确需求**：清楚描述你想要完成的任务
2. **使用关键词**：在描述中包含触发关键词
3. **逐步细化**：从高级描述开始，逐步细化需求
4. **验证结果**：使用验证skills确认输出质量

### 常用组合

| 任务 | 推荐Skills组合 |
|-----|----------------|
| 全栈开发 | `frontend-design` + `backend-patterns` + `api-design` + `test-generator` |
| 代码审查 | `code-reviewer` + `security-auditor` + `dependency-auditor` |
| 文档编写 | `api-documenter` + `readme-updater` + `doc-coauthoring` |
| 安全加固 | `security-review` + `secret-scanner` + `security-audit` |
| 测试策略 | `tdd-workflow` + `e2e-testing` + `test-generator` + `verification-loop` |
| 品牌设计 | `design-brief` + `design-consultation` + `brandkit` + `creative-director` |
| Figma工作流 | `figma-use` + `figma-generate-design` + `figma-implement-design` |
| 图像生成 | `fal-generate` + `fal-image-edit` + `fal-upscale` + `image-enhancer` |
| 视频制作 | `sora` + `remotion` + `video-hyperframes` + `fal-kling-o3` |
| 营销素材 | `ad-creative` + `copywriting` + `competitive-ads-extractor` + `screenshots-marketing` |
| 演示文稿 | `pptx` + `slides` + `deck-swiss-international` + `ppt-keynote` |
| UI动效 | `emilkowalski-motion` + `gsap-core` + `gsap-scrolltrigger` + `flutter-animating-apps` |

---

## 📝 更新日志

- **2026-06-12**：新增Open-Design skills（130+个），来源 [nexu-io/open-design](https://github.com/nexu-io/open-design)，包含设计系统、Figma集成、图像/视频生成、文档处理、前端原型、营销品牌、模板和帧动画等完整设计能力
- **2026-06-05**：初始版本，包含70+个skills和MCP配置

---

> 💡 **提示**：此文档会随着skills的更新而更新。如需获取最新版本，请访问相应的GitHub仓库。
