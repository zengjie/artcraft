# ArtCraft fal Proxy

独立 Node.js 24+ 服务，无 npm 运行时依赖。兼容 ArtCraft 的 Omni 生成、原生登录挑战、任务列表、上传素材和批次结果协议；fal 密钥只在服务端使用。

```bash
cd proxy
cp .env.example .env
# 配置 FAL_KEY、FEISHU_APP_ID、FEISHU_APP_SECRET
npm start
```

完整登录与部署说明见 [飞书登录配置](../docs/feishu-login.md)。桌面端通过 `ARTCRAFT_PROXY_URL` 指向此服务，默认 `http://localhost:12345`。

## 支持的模型与操作

| 能力         | 模型                          | 支持的输入                     |
|--------------|-------------------------------|--------------------------------|
| 文生图       | FLUX.1 Schnell                | 提示词、比例、1–4 张            |
| 图片生成编辑 | Nano Banana                   | 提示词、参考图、比例、1–4 张    |
| 视频         | Kling 2.5 Turbo Pro            | 提示词、首帧/尾帧、5/10 秒      |
| 音频         | Stable Audio Open             | 提示词，30 秒                  |
| 3D 网格      | Hunyuan 3D 2.1                | 单张图片、可选纹理             |
| 背景移除     | BiRefNet                      | 已上传图片                     |
| 蒙版修补     | FLUX Fill Pro                 | 图片、蒙版、提示词             |

模型清单位于 `src/models.mjs`；客户端不能提交任意目标 URL。任务提交使用 fal Queue API；状态和结果采用 fal 返回的 URL，严格限制为 `https://queue.fal.run` 并禁止重定向。

原版模型不能全部一一替换。本版本不提供 Midjourney、Sora 网页自动化、World Labs 高斯世界生成、原版订阅/充值、角色服务或云项目同步；这些 API 不会转发回官方服务。未适配模型返回明确错误，模型选择器以 Proxy 的列表为准。3D 场景与 2D 编辑器仍保留原版代码。

## 状态、文件和计费

- SQLite 保存会话、生成任务、幂等记录和素材索引。持久化 `DATA_DIR`，当前仅支持单实例。
- 上传文件上限 20 MiB。本地上传作为 data URI 交给 fal，支持 localhost 联调。素材列表和引用校验按用户隔离。
- 为兼容原生客户端的匿名详情请求，素材详情和文件采用不可猜测的 capability URL；持有完整链接即可读取。不要将这些链接当成登录后才可访问的私有文件。
- 生成结果保留 fal CDN 链接，桌面端沿用原版自动下载流程。Proxy 不保证 fal CDN 永久保存，需要长期存档时请下载到本地。
- 费用由服务端 fal 账号承担。成本估算返回未知价格，实际扣费以 fal 为准；不虚构 ArtCraft 积分或免费额度。
- 上游提交超时可能已经生成。Proxy 保留不确定的提交记录，不自动重试；请先在 fal 控制台核对，再决定是否发起新的生成。
- 若部署到自定义 Proxy 域名，按需把该具体 HTTPS origin 加入 `crates/desktop/artcraft/tauri.conf.json` 的 `connect-src`，供 WebView 加载上传素材；不要使用任意 HTTPS 通配规则。

## 验证

```bash
npm test
```

测试使用本地 HTTP 服务及模拟飞书/fal 响应，覆盖 OAuth 状态绑定、设备确认、租户白名单、会话撤销、幂等请求、队列成功/失败、素材归属、CORS 和持久化。测试不需要密钥，不产生 fal 费用。真实 OAuth 与生成需配置应用和密钥联调。

官方参考：[fal Queue](https://fal.ai/docs/documentation/model-apis/inference/queue)、[fal 模型 API](https://fal.ai/models)、[飞书 OAuth](https://open.feishu.cn/document/authentication-management/access-token/get-user-access-token)。
