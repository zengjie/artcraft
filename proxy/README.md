# ArtCraft fal Proxy

Node.js 24+ 服务，无 npm 运行时依赖。fal 密钥只保存在服务端，飞书用于内部用户身份认证。

```bash
cd proxy
cp .env.example .env
# 配置 FAL_KEY、FEISHU_APP_ID、FEISHU_APP_SECRET
npm start
```

[飞书登录与部署](../docs/feishu-login.md) · [统一接入、维护与验收](../docs/fal-proxy-integration.md)

## 桌面体验

保留 ArtCraft 原版首页、创作页面、模型选择器、历史网格和编辑器。fal 是同一模型选择器中的服务商，已适配模型默认优先 fal；用户明确选择官方后保留该选择。官方登录、余额、订阅、升级入口仍使用官方服务。两边凭据独立，不互相转发；失败不会自动切到另一付费服务。

在 Settings → Account 的 fal Proxy 区块使用飞书登录。桌面端 `ARTCRAFT_PROXY_URL` 默认 `http://localhost:12345`；前端构建使用 `VITE_FAL_PROXY=true`，Rust 使用 `fal-proxy` feature。macOS 本地构建入口为 `script/artcraft/build_fal_proxy_macos.sh`。

## 能力

| 能力         | fal 模型                                   | 列价（2026-10-07 fal 定价接口）     | 接入状态                                   |
|--------------|--------------------------------------------|-------------------------------------|--------------------------------------------|
| 文生图       | FLUX.1 Schnell / FLUX.1 Dev                | $0.003 / $0.025 每百万像素          | 原版图片页面；Dev 已真实验收               |
| 图片生成编辑 | Nano Banana / Nano Banana 2 / Pro          | $0.0398 / $0.08 / $0.15 每张        | 原版图片、2D/3D 编辑流程；2 已真实验收     |
| 图片生成编辑 | Seedream 4 / 4.5                           | $0.03 / $0.04 每张                  | 原版图片页面；4 已真实验收，4.5 仅 schema  |
| 角度编辑     | Qwen Image Edit Multiple Angles            | $0.035 每百万像素                   | 原版角度能力                               |
| 蒙版修补     | FLUX Fill Pro                              | $0.05 每百万像素                    | 蒙版输入                                   |
| 视频         | Kling 2.5 Turbo Pro                        | $0.07 每秒                          | 原版视频页面，文生/图生，已真实验收        |
| 视频         | Kling 2.6 Pro / Veo 3.1 / Veo 3.1 Fast     | $0.07 / $0.40 / $0.15 每秒          | 原版视频页面；仅 schema 核对，未付费验收   |
| 视频提示词   | Video Prompt Generator                     | $0.001 每次                         | 视频提示框 Draft prompt 按钮               |
| 音频         | Stable Audio Open / ElevenLabs Sound Effects | 按算力秒 / $0.002 每秒            | 原版音频页面；音效已真实验收               |
| 3D 网格      | Hunyuan 3D 2.1 / V3 图生 / V3 文生          | $0.30 每次 / $0.015 每单位          | 原版 3D 选择器；V3 图生已真实验收          |
| 背景移除     | BiRefNet                                   | 按算力秒                            | 原版背景移除页面                           |
| 物体 Splat   | TripoSplat                                 | $0.05 每次                          | 原版 3D 世界页，文案注明为物体 PLY         |
| 世界资产包   | Hunyuan World                              | $0.30 每次                          | 原版 3D 世界页，标签表单，结果为 ZIP 下载  |

“接入”不等于所有桌面操作均通过端到端验收，具体证据见验收文档。fal 未覆盖的模型继续走原有官方/第三方路线，不能将 Midjourney、Sora、World Labs 等宣称为 fal 等价实现。

列价来自 fal 定价接口，由 `capabilities` 的 `price` 字段下发（`usd` 加 `unit`：image、megapixel、second、request、compute_second、unit）。桌面端据此在生成按钮和费用面板显示估算；按算力计费的模型只显示单价，不编造总额。最终以 fal 账单为准。

模型清单位于 `src/models.mjs`，能力协议为 `/v1/proxy/capabilities`。客户端不能提交任意目标 URL；队列 URL 限制为 `https://queue.fal.run` 且禁止重定向。未知或不支持的非空参数明确报错。Nano Banana 的编辑器系统提示词为固定上下文前缀，不是官方的提示词增强服务。

## 状态、文件和计费

- SQLite 持久化会话、任务、幂等记录及素材索引；保留 `DATA_DIR`，当前支持单实例。
- 上传上限 20 MiB；本地素材以 data URI 交给 fal，引用归属按用户校验。
- 素材详情和文件使用不可猜测的 capability URL，持有完整链接即可读取。不要视为必须登录才能访问的私有文件。
- 输出保留 fal CDN 链接，并接入原版桌面自动下载。长期存档请下载，Proxy 不保证 CDN 永久保留。
- fal 由服务端账号按用量支付；估价未知时显示按量计费，不伪造 ArtCraft 积分。最终以 fal 账单为准。
- `MAX_ACTIVE_JOBS_PER_USER` 与 `MAX_DAILY_JOBS_PER_USER` 限制任务数，**不是美元硬预算**。团队应在 fal 侧配置支出控制并监控账单。
- 不确定的提交不自动重试；先核对 fal 队列，避免重复扣费。
- 远端 Proxy 使用 HTTPS；WebView 需要加载其素材时，将确切 origin 加入桌面 CSP，避免任意 HTTPS 通配。

## 测试

`npm test` 使用本地模拟飞书/fal 服务，不产生费用。`tools/live-smoke.mjs` 是付费验收工具，需明确预算授权，稳定幂等键及持久化账本；不得删除账本后盲目重跑。
