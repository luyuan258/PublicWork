# MCP 图片生成与识别工作流

基于 `mcp-image-custom` 的图片生成与识图完整指南：顶部是给 agent 用的快速调用 skill，下部是给人读的原理与排错。

> 📅 最近更新：2026-06-24
> 修复 3 个阻断性 bug：① opencode.json 字段 `env` → `environment`；② 识图 `XTY_TEXT_MODEL` 必须用 `gemini-2.5-flash`（`gpt-image-2` 不支持视觉）；③ `mcpServer.js` 在 `SKIP_PROMPT_ENHANCEMENT=true` 时未初始化 textClient 导致 `analyze_image` 失败。

---

## Part 1 · Skill 快速调用

> 触发关键词：`生成图片` / `识图` / `分析图片` / `generate image` / `analyze image` / `看这张图是什么`
> 目标：让 agent 在一次对话内完成「生图」或「识图」，跳过重复的配置排错。

### 何时使用

- 用户给出图片路径并问「这图里是什么 / 用的什么工具 / 描述内容」→ 走 **识图** 流程
- 用户要一张新图（海报、插画、UI 概念、mockup…）→ 走 **生图** 流程
- 既要看图又要在其基础上改 → 先 **识图** 拿到描述，再 **生图**（可传 `inputImagePath` 做图生图）

### 前置条件（一次配置，永久生效）

`E:/PublicWork/opencode.json` 中已有以下配置（**字段必须是 `environment` 不是 `env`**）：

```json
{
  "mcp": {
    "mcp-image": {
      "type": "local",
      "command": ["node", "E:/PublicWork/mcp/mcp-image-custom/dist/index.js"],
      "enabled": true,
      "environment": {
        "IMAGE_PROVIDER": "xty",
        "OPENAI_API_KEY": "sk-xxxx",
        "OPENAI_BASE_URL": "https://api.xty.app/v1",
        "XTY_IMAGE_MODEL": "gpt-image-2",
        "XTY_TEXT_MODEL": "gemini-2.5-flash",
        "IMAGE_QUALITY": "fast",
        "IMAGE_OUTPUT_DIR": "E:/PublicWork/images",
        "SKIP_PROMPT_ENHANCEMENT": "true"
      }
    }
  }
}
```

> 单 MCP 同时承担生图（`gpt-image-2`）和识图（`gemini-2.5-flash`）。
> 修改配置后必须 **重启 opencode** 才生效。

### 识图流程（Analyze Image）

**一句话调用：**

```
请用 mcp-image 的 analyze_image 工具分析 D:\path\to\image.png，告诉我图里是什么工具/内容
```

**Agent 标准动作：**

1. 直接调用 `mcp-image_analyze_image`（在 opencode 里工具名带 MCP 前缀），传 `imagePath` 和具体的 `question`
2. 拿到文本描述后，**直接转述给用户**，不要自行脑补图里没有的细节
3. 若报 `CONFIG_ERROR: GEMINI_API_KEY required` → 检查 `environment` 字段名 + `IMAGE_PROVIDER=xty`（见下方排错）
4. 若报 524 超时 → 图片太大，先压缩到 < 100KB 再试

**示例：识图微信截图**

```text
User: 使用 mcp-image-analyze 告诉我 E:\PublicWork\images\xxx.png 是什么工具和内容？
Assistant: [调用 mcp-image_analyze_image, imagePath=..., question="请详细描述图片内容，特别是使用的工具/软件和显示的具体内容"]
Assistant: 这是微信 PC 客户端界面截图，左侧聊天列表当前选中「Ai coding:Where is the future ?」……
```

### 生图流程（Generate Image）

**一句话调用：**

```
帮我生成一张 16:9 的极简风格咖啡店海报，文件名 coffee-shop-poster
```

**Agent 标准动作：**

1. 若用户中文描述模糊，**先转成结构化英文 prompt**（主体 + 构图 + 光线 + 风格 + 比例）
2. 调用 `mcp-image_generate_image`，传 `prompt` + `aspectRatio` + `fileName`
3. 成功后图片落在 `E:/PublicWork/images/<fileName>.png`，把**绝对路径**回给用户
4. 如需图生图，把参考图绝对路径传 `inputImagePath`

**Prompt 模板：**

```text
A minimalist poster for a coffee shop, warm beige background,
single espresso cup centered, soft morning light from left,
editorial typography space at top, 16:9 aspect ratio, high detail
```

### 组合流程：识图 → 改图

1. `analyze_image` 拿到原图描述
2. 基于描述 + 用户修改诉求，构造英文 `prompt`
3. `generate_image`，可选传 `inputImagePath=原图` 做风格延续

### 工具参数速查

**`generate_image` - 生成图片**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `prompt` | string | ✅ | 提示词，**建议英文**以获得最佳效果 |
| `fileName` | string | ❌ | 输出文件名（不带扩展名，自动补 `.png`） |
| `inputImagePath` | string | ❌ | 参考图绝对路径，用于**图生图** / 风格迁移 |
| `aspectRatio` | string | ❌ | `1:1` `3:4` `4:3` `9:16` `16:9` `21:9` 等 |
| `imageSize` | string | ❌ | `1K` `2K` `4K` |
| `quality` | string | ❌ | `fast`（默认）/ `balanced` / `quality` |
| `blendImages` | boolean | ❌ | 多主体合成 |
| `maintainCharacterConsistency` | boolean | ❌ | 同角色多场景一致性 |
| `useWorldKnowledge` | boolean | ❌ | 历史人物/地标等真实世界知识 |
| `useGoogleSearch` | boolean | ❌ | 需要实时信息的场景 |

**`analyze_image` - 分析/识别图片**

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `imagePath` | string | ✅ | — | 图片文件的**绝对路径** |
| `question` | string | ❌ | "请详细描述这张图片的内容" | 自定义问题，例如 "图里用的是什么软件？显示了什么内容？" |

### 排错速查（30 秒定位）

| 报错 | 根因 | 修复 |
|---|---|---|
| `CONFIG_ERROR: GEMINI_API_KEY required` | opencode.json 用了 `env` 而非 `environment`，导致 `IMAGE_PROVIDER` 没传入进程，回退到默认 `gemini` | 把字段名改成 `environment`，重启 opencode |
| 同上，但字段已对 | `mcpServer.js` 旧版在 `SKIP_PROMPT_ENHANCEMENT=true` 时不初始化 textClient | 升级 `mcpServer.js`：textClient 始终初始化（识图路径强依赖它） |
| 524 Cloudflare 超时 | 图片 > 100KB 或 `XTY_TEXT_MODEL` 不是视觉模型 | 压缩图片；确认 `XTY_TEXT_MODEL=gemini-2.5-flash`，**不要**用 `gpt-image-2` 识图 |
| `analyze_image` 工具不显示 | MCP 进程没启动 / 配置没加载 | `node E:/PublicWork/mcp/mcp-image-custom/dist/index.js` 手动跑看报错；重启 opencode |
| 生图出来是黑屏/乱码 | prompt 太短或质量档太低 | 提升到 `quality: "balanced"`，prompt 加风格/光线描述 |
| Request timed out | 网络问题 | 检查 API 连通性，增加 timeout |

### 自检命令（PowerShell，进 MCP 目录跑）

```powershell
$env:IMAGE_PROVIDER="xty"
$env:OPENAI_API_KEY="sk-xxxx"
$env:OPENAI_BASE_URL="https://api.xty.app/v1"
$env:XTY_TEXT_MODEL="gemini-2.5-flash"
$env:XTY_IMAGE_MODEL="gpt-image-2"
$env:IMAGE_QUALITY="fast"
$env:IMAGE_OUTPUT_DIR="E:/PublicWork/images"
$env:SKIP_PROMPT_ENHANCEMENT="true"
node -e "const {getConfig}=require('E:/PublicWork/mcp/mcp-image-custom/dist/utils/config.js'); console.log(JSON.stringify(getConfig(),null,2))"
```

期望输出：`"success": true` 且 `imageProvider: "xty"`。若 `success: false` 报 GEMINI_API_KEY，说明 `IMAGE_PROVIDER` 没生效。

---

## Part 2 · 完整原理（给开发者读）

### 架构概览

```
+--------------------------------------------------------+
|                         opencode                         |
|                            |                             |
|              +-------------+------------+                |
|              v                          v                |
|       generate_image            analyze_image            |
|       (生图工具)                 (识图工具)              |
|              |                          |                |
|              v                          v                |
|        gpt-image-2              gemini-2.5-flash         |
|              |                          |                |
|              +-------------+------------+                |
|                            v                             |
|                    api.xty.app/v1                        |
|                 (OpenAI-compatible proxy)                |
+--------------------------------------------------------+
```

> 也可拆成两个独立 MCP（`mcp-image-gen` / `mcp-image-analyze`），各自独立配置 `XTY_TEXT_MODEL`。当前仓库用单 MCP 方案，两个工具共用一个进程。

### 模型选择

| 模型 | 用途 | 视觉能力 |
|---|---|---|
| `gpt-image-2` | 图片生成 | No（不支持识图） |
| `gemini-2.5-flash` | 图片分析/识图 | Yes |

> `gpt-image-2` 不支持 chat completions 的 vision 输入，会导致 Cloudflare 524 超时。必须使用 `gemini-2.5-flash` 或其他视觉模型进行图片分析。

### 完整识别流程

```
输入图片路径
    |
    v
+---------------------------+
| 1. 验证图片路径            |  securityManager.sanitizeInputFilePath()
|    验证文件类型            |  securityManager.validateImageFile()
+----------+----------------+
           |
           v
+---------------------------+
| 2. 读取图片文件            |  fs.readFile()
|    转 Base64 编码         |  buffer.toString('base64')
+----------+----------------+
           |
           v
+---------------------------+
| 3. 图片预处理              |  如文件过大(>500KB)，压缩至 512px JPEG
|    System.Drawing          |  质量 60%，确保请求体 < 100KB
+----------+----------------+
           |
           v
+---------------------------+
| 4. 初始化客户端            |  initializeClients()
|    创建 OpenAI 客户端      |  baseURL: api.xty.app/v1
|    加载 gemini-2.5-flash   |
+----------+----------------+
           |
           v
+---------------------------+
| 5. 构建 Vision 请求        |  POST /v1/chat/completions
|    model: gemini-2.5-flash |
|    messages: [{            |
|      role: "user",         |
|      content: [            |
|        {type:"text"},      |
|        {type:"image_url"}  |
|      ]                     |
|    }]                      |
+----------+----------------+
           |
           v
+---------------------------+
| 6. API 调用                |  timeout: 180s
|    提取文本内容            |  choices[0].message.content
+----------+----------------+
           |
           v
+---------------------------+
| 7. 返回分析结果            |  纯文本描述返回给用户
+---------------------------+
```

### API 调用示例

```javascript
const response = await fetch('https://api.xty.app/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gemini-2.5-flash',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: '请描述这张图片' },
        { type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
      ]
    }],
    max_tokens: 2048
  })
});
```

### 图片预处理 (PowerShell + .NET)

```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("input.png")

# 缩放至 512px 宽
$w = 512
$h = [int]($img.Height * $w / $img.Width)
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $w, $h)

# 保存为 JPEG Quality 60
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 60L)
$bmp.Save("output.jpg", $codec, $ep)

$g.Dispose(); $img.Dispose(); $bmp.Dispose()
```

### 代码修改清单

#### `dist/server/mcpServer.js`
- 新增 `analyze_image` 工具定义（`getToolsList()`）
- 新增 `handleAnalyzeImage()` 处理方法
- 修改 `initializeClients()` 确保始终初始化 textClient（不再依赖 `skipPromptEnhancement`）

#### `dist/api/openaiTextClient.js`
- `generateText()`: `responses.create` 改为 `chat.completions.create`
- `buildInput()` 改为 `buildMessages()`: 使用标准 Chat Completions vision 格式
- `extractResponseText()`: 从 `choices[0].message.content` 提取

#### `opencode.json`
- **环境变量字段必须叫 `environment`**（opencode schema 规定），写成 `env` 会被静默忽略
- 生图工具走 `XTY_IMAGE_MODEL=gpt-image-2`
- 识图工具走 `XTY_TEXT_MODEL=gemini-2.5-flash`

#### `dist/server/mcpServer.js`（识图 Bug 修复）
- **问题**：`initializeClients()` 原本在 `SKIP_PROMPT_ENHANCEMENT=true` 时直接 `return`，且 textClient 只在增强开启时才初始化；而 `handleAnalyzeImage()` 强依赖 `this.textClient`，导致 `Cannot read properties of undefined` 或环境变量未透传后回退到 `gemini` 报 `GEMINI_API_KEY required`。
- **修复**：把 textClient 的初始化从 `if (!config.skipPromptEnhancement)` 里提升出来，保证 `analyze_image` 路径下 textClient 始终被创建；早退条件改为 `if (this.imageClient && this.textClient && ...)`。

---

## 相关文件

- 配置：`E:/PublicWork/opencode.json`
- MCP 代码：`E:/PublicWork/mcp/mcp-image-custom/dist/server/mcpServer.js`
- 图片输出目录：`E:/PublicWork/images/`
