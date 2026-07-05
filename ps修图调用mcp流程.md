---
name: ps-photo-editing-mcp
description: |
  专业的 Photoshop 照片修图流程，整合三个 MCP 服务：
  - adobe-photoshop（完整修图工具集，需 UXP 插件 + Proxy Server）
  - photoshop-com（COM 接口基础操作）
  - mcp-image（AI 识图分析与生图）
  适用场景：PS 修图、调色、裁剪、调整图层、滤镜、批量操作等。
---

# Photoshop 修图 MCP 调用完整流程

## 一、架构总览

```
AI (opencode) ──MCP──> Python Server (ps-mcp.py) ──Socket.IO──> Node.js Proxy (:3001) ──Socket.IO──> PS UXP Plugin ──batchPlay──> Photoshop
                                 │
                                 └──COM 备选路径──> Photoshop COM Interface ──ExtendScript/executeAction──> Photoshop
```

### 三个 MCP 服务对比

| MCP Server | 通讯方式 | 能力 | 依赖 | 修图有用性 |
|---|---|---|---|---|
| **adobe-photoshop** | Socket.IO → localhost:3001 → UXP Plugin | 数百个修图工具（裁剪/曝光/曲线/色彩平衡/HSL/清晰度/去雾/选区/图层样式等） | Proxy Server + UXP 插件 | ⭐⭐⭐⭐⭐ |
| **photoshop-com** | COM (Windows ActiveX) | 基础操作（建文档/纯色层/文字层/打开/保存/查信息） | 无 | ⭐ 太基础 |
| **mcp-image** | HTTP API | AI 识图描述、AI 生图、风格迁移 | 无 | ⭐⭐ 辅助分析 |

### 通讯链路

- **adobe-photoshop**: 最强但需完整链路（Proxy + UXP Plugin），缺一环即不可用
- **photoshop-com**: 通过 `photoshop_python_api` / `comtypes` 直接操作 Photoshop COM 接口，是保底方案
- **当 adobe-photoshop 不可用时，退回到 COM 接口 + ExtendScript 执行 ActionDescriptor**

---

## 二、MCP 配置 (opencode.json)

路径 `C:\Users\<用户名>\.config\opencode\opencode.json`：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "photoshop-com": {
      "type": "local",
      "command": ["E:/PublicWork/mcp/photoshop-mcp/.venv/Scripts/photoshop-mcp-server.exe"],
      "env": { "PS_VERSION": "2026" },
      "timeout": 30000,
      "enabled": true
    },
    "adobe-photoshop": {
      "type": "local",
      "command": [
        "E:/PublicWork/mcp/photoshop-mcp/.venv/Scripts/python.exe",
        "E:/PublicWork/mcp/photoshop-mcp/ps-mcp.py"
      ],
      "timeout": 30000,
      "enabled": true
    },
    "mcp-image": {
      "type": "local",
      "command": ["node", "E:/PublicWork/mcp/mcp-image-custom/dist/index.js"],
      "enabled": true
    }
  }
}
```

> **关键：** `adobe-photoshop` 依赖 localhost:3001 的 Socket.IO Proxy Server（Node.js 进程），以及 Photoshop 内运行的 UXP 插件。两者缺一不可。

---

## 三、Proxy Server 部署与启动

### 3.1 源码位置

| 组件 | 路径 |
|---|---|
| Python MCP Server | `E:\PublicWork\mcp\photoshop-mcp\ps-mcp.py` |
| Node.js Proxy Server | `E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket\proxy.js` |
| UXP Plugin (PS) | `E:\PublicWork\mcp\photoshop-mcp\uxp\ps\manifest.json` |
| 官方仓库 | `https://github.com/mikechambers/adb-mcp` |

### 3.2 一键安装

```powershell
# 1. 克隆官方仓库（仅首次）
git clone --depth 1 https://github.com/mikechambers/adb-mcp.git $env:TEMP\adb-mcp

# 2. 复制 Proxy Server 和 UXP Plugin 到永久路径（仅首次）
Copy-Item -Path "$env:TEMP\adb-mcp\adb-proxy-socket\*" -Destination "E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket\" -Recurse -Force
Copy-Item -Path "$env:TEMP\adb-mcp\uxp\ps\*" -Destination "E:\PublicWork\mcp\photoshop-mcp\uxp\ps\" -Recurse -Force

# 3. 安装 npm 依赖（仅首次）
Set-Location "E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket"
npm install --production

# 4. 启动 Proxy Server（每次使用前）
Start-Process -FilePath "node" -ArgumentList "proxy.js" -WorkingDirectory "E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket" -WindowStyle Hidden -PassThru

# 5. 验证端口是否监听
Test-NetConnection -ComputerName localhost -Port 3001
```

### 3.3 Proxy Server 日志

```powershell
Get-Content "E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket\proxy.log"
```

正常输出：`adb-mcp Command proxy server running on ws://localhost:3001`

---

## 四、UXP 插件安装（手动，需用户操作）

### 前置条件

1. Photoshop 版本 ≥ 26.0（2025 或 2026）
2. Adobe Creative Cloud Desktop 已安装
3. 从 Creative Cloud 安装 **UXP Developer Tools**（免费）
4. PS 设置 > 插件 > 勾选「启用开发者模式」> 重启 PS

### 加载步骤（仅首次 + 每次重启 PS 后重做）

1. 启动 **UXP Developer Tools**（Creative Cloud 中打开）
2. File > Add Plugin
3. 选择 `E:\PublicWork\mcp\photoshop-mcp\uxp\ps\manifest.json`
4. 点击 **Load**
5. 在 Photoshop 菜单：插件 > Photoshop MCP Agent > Photoshop MCP Agent
6. 面板中点击 **Connect**
7. 面板显示 "Connected" 即成功，同时 Proxy Server 日志显示 `Client registered for application: photoshop`

### 启动检查清单

| # | 步骤 | 验证 |
|---|---|---|
| 1 | PS 开发者模式已启用 | Preferences > Plug-ins 勾选 |
| 2 | Proxy Server 运行中 | `Test-NetConnection localhost 3001` |
| 3 | UXP 插件已 Load | UXP Dev Tool 显示 Loaded |
| 4 | 插件面板已 Connect | 面板显示 Connected |
| 5 | MCP 服务器已启动 | opencode 可调用 adobe-photoshop 工具 |

**注意：** 每次重启 Photoshop 后，需要在 UXP Developer Tools 中重新 Load 插件，并点击 Connect。

---

## 五、COM 接口备选方案（当 UXP 插件不可用时）

### 5.1 何时使用

- UXP Developer Tools 未安装或 Creative Cloud 不可用
- Proxy Server 或 UXP 插件未正常加载
- `adobe-photoshop` MCP 工具报 Connection Timed Out

### 5.2 COM 接口能力

```
PowerShell New-Object -ComObject "Photoshop.Application"
  ├── app.version / app.documents / app.activeDocument
  ├── app.doJavaScript(jsCode)              // 执行 ExtendScript
  ├── app.executeAction(typeID, desc, mode) // 执行 ActionDescriptor
  ├── app.executeActionGet(ref)             // 获取属性
  ├── app.stringIDToTypeID("name")          // 字符串 ID 转类型 ID
  ├── app.charIDToTypeID("XXXX")            // 字符 ID 转类型 ID
  ├── app.open(filePath)                    // 打开文件
  └── ActionDescriptor / ActionReference / ActionList 构建命令
```

Python 侧（更推荐）：
```python
from photoshop import Session
with Session() as s:
    doc = s.active_document
    app = s.app
    app.doJavaScript(js_code)
```

### 5.3 ExtendScript 关键操作速查

#### 裁剪（4:5 竖向）
```javascript
var H = doc.height.value;
var W = Math.round(H * 4 / 5);
var L = Math.round((doc.width.value - W) / 2);
doc.crop([L, 0, L + W, H]);  // 注意：第三个参数 width 和第四个参数 height 会导致 SIZE CHANGE，不要传！
```

#### 创建调整图层（通用模板）
```javascript
var d = new ActionDescriptor();
var r = new ActionReference();
r.putClass(app.stringIDToTypeID("adjustmentLayer"));
d.putReference(app.charIDToTypeID("null"), r);
var u = new ActionDescriptor();
var t = new ActionDescriptor();
// 设置 t 的属性...
u.putObject(app.stringIDToTypeID("type"), app.stringIDToTypeID("adjustmentTypeName"), t);
d.putObject(app.charIDToTypeID("Usng"), app.stringIDToTypeID("adjustmentLayer"), u);
app.executeAction(app.charIDToTypeID("Mk  "), d, DialogModes.NO);
```

#### 各调整图层参数速查

| 调整类型 | stringID | 关键参数 |
|---|---|---|
| 曝光度 | `exposure` | `exposure`(double), `offset`(double), `gammaCorrection`(double) |
| 曲线 | `curves` | `Crv `(ActionList of points), 每个 point: `Hrzn`(int,0-255), `Vrtc`(int,0-255) |
| 色彩平衡 | `colorBalance` | `shadowLevels`(list), `midtoneLevels`(list), `highlightLevels`(list), `preserveLuminosity`(bool) |
| 自然饱和度 | `vibrance` | `vibrance`(int,-100..100), `saturation`(int,-100..100) |
| 色相/饱和度 | `hueSaturation` | `hue`(int), `saturation`(int), `lightness`(int), `colorize`(bool) |
| 可选颜色 | `selectiveColor` | `method`(enum), `color`(enum 目标色), `cyan/magenta/yellowColor/black`(int) |
| 照片滤镜 | `photoFilter` | `color`(RGBColor), `density`(int), `preserveLuminosity`(bool) |

#### 滤镜速查

| 滤镜 | stringID | 参数 |
|---|---|---|
| High Pass（清晰度） | `highPass` | `Rds `(UnitDouble, #Pxl) |
| Smart Sharpen（纹理） | `smartSharpen` | `amount`(#Prc), `radius`(#Pxl), `noise`(int), `blurType`(enum) |

#### 保存文件
```javascript
// PSD（保留图层）
var psdFile = new File('E:/output.psd');
doc.saveAs(psdFile, new PhotoshopSaveOptions());

// JPEG
var jpgFile = new File('C:/temp/preview.jpg');
var jpgOptions = new JPEGSaveOptions();
jpgOptions.quality = 12;
doc.saveAs(jpgFile, jpgOptions, true);  // asCopy=true
```

---

## 六、标准修图工作流（可直接粘贴给 AI）

### 自然风光快速调色（森林 / 天空等）

```
使用 Photoshop COM 接口对当前文档执行以下操作：

1. 裁剪为 4:5 竖向
2. 创建曝光度调整层：exposure=-0.5, offset=0, gamma=1.0
3. 创建曲线调整层：提阴影(0→15) + S曲线(128→132) + 压高光(255→242)
4. 创建色彩平衡层：阴影(-5,5,-5) 中间调(-8,10,-3) 高光(-5,3,0)
5. 创建自然饱和度层：vibrance=12, saturation=-5
6. 创建可选颜色层：绿色 cyan=-8, magenta=3, yellow=8, black=-3
7. 创建照片滤镜层：暖色 RGB(245,230,210) density=12
8. High Pass 清晰度层：radius=2.5, blend=Overlay, opacity=35%
9. Smart Sharpen 纹理层：amount=50, radius=0.8, opacity=40%
10. 保存 PSD + JPEG 预览
```

### 快速诊断指令

```
检查 Photoshop COM 连接状态，列出文档和图层信息
```

### 测试连接指令

```
检查 localhost:3001 端口是否可用，验证 Proxy Server 是否运行
```

---

## 七、常见问题排查

### Q: adobe-photoshop 工具全部返回 "Connection Timed Out"
1. 检查 Proxy Server：`Test-NetConnection localhost 3001`
2. 若端口不通：重新启动 Proxy Server（见 3.2 步骤 4）
3. 若端口通但工具仍失败：检查 UXP 插件是否已 Load 并 Connect（面板显示 Connected 字样）
4. 若插件无法加载：使用 COM 备选方案（见第五节）

### Q: photoshop-com 返回 "消息筛选器显示应用程序正在使用中"
1. Photoshop 正在显示模态对话框（如 Camera Raw 弹窗、打开/保存对话框）
2. 手动关闭对话框（点击 Open/Cancel）
3. 等待几秒后重试

### Q: 打开 NEF 文件超时
NEF 打开会触发 Camera Raw 对话框，COM 接口在对话框期间无法操作：
- 用 SendKeys 发送 Enter 键关闭对话框
- 或手动在 PS 中操作 Camera Raw

### Q: COM 创建新连接后读不到文档
- 使用 Python `photoshop.Session` 上下文管理器，不要直接用 PowerShell COM 对象
- 或者重用已有的 COM 对象，避免重复创建

### Q: ActionDescriptor 操作失败（"该功能可能无法在此版本的 Photoshop 中使用"）
- 参数名或类型不正确（stringID vs charID）
- 参数值超出范围
- 该操作在当前 PS 选择状态或文档状态下不支持
- 尝试改用 `app.doJavaScript()` 中执行 ExtendScript

---

## 八、文件清单

| 路径 | 说明 |
|---|---|
| `E:\PublicWork\mcp\photoshop-mcp\ps-mcp.py` | adobe-photoshop MCP Server |
| `E:\PublicWork\mcp\photoshop-mcp\adb-proxy-socket\proxy.js` | Node.js Proxy Server |
| `E:\PublicWork\mcp\photoshop-mcp\uxp\ps\manifest.json` | UXP 插件清单 |
| `C:\Users\%USERNAME%\.config\opencode\opencode.json` | opencode MCP 配置 |
| `E:\OpenWork\DSC_4277_forest_edit.psd` | 本次修图示例输出（10层PSD） |
