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

| 能力         | fal 模型                      | 接入状态                       |
|--------------|-------------------------------|--------------------------------|
| 文生图       | FLUX.1 Schnell                | 原版图片页面                   |
| 图片生成编辑 | Nano Banana                   | 原版图片、2D/3D 编辑流程适配    |
| 角度编辑     | Qwen Image Edit Multiple Angles | 原版角度能力适配             |
| 蒙版修补     | FLUX Fill Pro                 | 蒙版输入适配                   |
| 视频         | Kling 2.5 Turbo Pro            | 原版视频页面，文生/图生         |
| 音频         | Stable Audio Open             | 原版音频页面                   |
| 3D 网格      | Hunyuan 3D 2.1 / V3 Text       | 原版 3D 选择器，图生/文生       |
| 背景移除     | BiRefNet                      | 原版背景移除页面               |
| 物体 Splat   | TripoSplat                    | 原版 3D 选择器                 |
| 世界资产     | Hunyuan World                 | Proxy API；ZIP 不冒充 Marble 世界 |
| 视频提示词   | Video Understanding           | Proxy API；尚未接入桌面专用流程 |

“适配”不等于所有桌面操作均通过端到端验收，具体证据见验收文档。fal 未覆盖的模型继续走原有官方/第三方路线，不能将 Midjourney、Sora、World Labs 等宣称为 fal 等价实现。

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
