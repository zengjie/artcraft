# fal Proxy 统一接入与验收

更新：2026-10-07（目录扩展与界面整理）。此文描述当前实现；早期 research 文件是设计过程记录，以此文的交付状态为准。

## 产品约定

同一时间只运行一种生成服务。首次启动出现服务选择：ArtCraft 官方服务，或飞书登录的团队 fal 账号；选择持久保存在本机，Settings → Accounts 的 Generation service 区块可切换，切换时应用重载。ArtCraft 模式下 fal 扩展完全不渲染，模型、账号、登录与商业入口与上游一致；fal 模式下模型选择器只列出 fal 托管模型（沿用上游同名模型的名称与描述），账号区只保留团队 fal 账号，官方登录弹窗不再出现，未连接飞书时由服务门禁引导登录。这样界面只呈现一套服务，也不把 fal 模型混入官方商业界面。

沿用 ArtCraft 原版 UI。没有独立 fal 工作区。图片、视频、音频、3D 等使用原有页面、选择器、历史和编辑器回调；同一个模型可拥有官方与 fal 两套能力参数，选中服务商后使用对应参数。fal 已适配能力优先，用户明确选择官方后不强行覆盖。

官方首页品牌、登录、余额、升级及订阅入口保留，官方 API host 不变。飞书登录放在原版 Account 设置及登录窗口中，只管理 Proxy 会话。不会伪造官方登录或将官方积分用于 fal；不会自动向另一服务商重试付费请求。LICENSE 原文未修改，沿用上游商业入口。

## fal 在界面中的呈现

fal 元素沿用 ArtCraft 的粗野主义体系，不引入新色与新字体。费用沿用原版“图标加数字”的语法：ArtCraft 积分是硬币图标加积分数，fal 则是 fal 标志加美元列价，放在同一位置、同一字号。界面文案与上游一致使用英文句式，服务商与账号在界面上统一显示为 "FAL"；因为同一时间只运行一种服务，不会与上游自带的官方 FAL 通道同屏出现。

- 生成按钮：`FalCostTag` 读取 Proxy capabilities 的 `price`，按数量、时长换算列价；按算力计费的模型显示 "metered"，悬停说明单价与计费归属。
- 费用面板：fal 服务商下显示分辨率、时长、数量、单价与估算，并注明由团队 fal 账户结算、以 fal 账单为准。
- 账户设置与服务门禁：`FAL account` 区块与 ArtCraft、Grok、Midjourney 区块同构，飞书确认码以等宽数字展示。
- 默认模型：fal 模式下页面优先选择上游默认模型的 fal 版本（图片页 Nano Banana Pro、视频页 Kling 2.5 Turbo Pro 等，见 `defaultModelForPage.ts`），用户显式选择后不再覆盖。
- 3D 世界页：选中 TripoSplat 或 Hunyuan World 时副标题、按钮文案与说明随之变化，明示产物是物体 PLY 或 ZIP 包，不冒充 World Labs 世界。Hunyuan World 需要填写两层前景与场景类型，结果以可下载卡片呈现。
- 未授权错误：ArtCraft 模式下未登录时生成失败不再显示原始 JSON，而是说明需要登录 ArtCraft 并打开登录弹窗；fal 模式下提示重新用飞书连接。两种模式都不会自动改走另一服务。
- 全量 fal 目录快照见 `docs/research/fal-model-catalog-2026-10-07.md`（1459 个活跃端点，按类别列出，已接入端点有标注）。
- 视频提示框：fal 服务商下提供 "Draft prompt" 按钮，用 fal 视频提示词生成器把短想法扩写为完整提示词，可一键撤销。

## 模块与维护边界

- `extensions/fal-proxy/native`：独立 Rust provider，固定源站、操作白名单、原生会话持久化。凭据不进入 JavaScript，HTTPS 或本机 HTTP，禁止重定向，文件权限 0600。
- `frontend/libs/fal-proxy`：模型目录合并、账户区块、素材 API 适配。使用上游组件样式，无单独主题。
- `crates/desktop/artcraft/src/fal_proxy_integration.rs`：少量宿主接缝，接入原生生成、任务、编辑器完成事件与自动下载。
- `frontend/libs/api/src/lib/ApiExtensions.ts`：通用 API 扩展接缝，官方会话/商业接口不重定向。
- `proxy/`：模型适配、飞书 OAuth、任务/素材存储，可独立部署。

这是**源码扩展**，不是上游已有的稳定动态插件 ABI。Rust 可用 `--no-default-features` 禁用该 provider；前端不设置 `VITE_FAL_PROXY=true` 时不启用扩展。仍需维护宿主中的选择器、枚举、生成与事件接缝，不能保证未来 rebase 零冲突。

新的 Proxy 任务使用显式 `fal_proxy` provider。任务数据库 `queue_status_url` / `queue_response_url` 在这个 provider 下分别存放源站和所有者标记，仅供隔离校验，不作为任意可请求 URL。原版 provider 含义不变。

为避免旧原型将 Proxy 任务标作 ArtCraft 而误轮询，新版本使用 `official_tasks_v7.sqlite`。旧 `tasks_v7.sqlite` 保留但不自动迁移，旧 Proxy 已完成结果仍来自服务端历史；旧本地待办任务需要人工核对，不能静默重新提交。

## 素材与能力边界

素材按来源读取，混合批次拆开查询。已登录用户的官方与 Proxy 历史在原版视图合并；公共他人主页不混入自己的 Proxy 素材。跨服务商图片引用会读取原素材、转换 PNG 并上传到目标服务商（20 MiB 限制），因此选择目标服务商意味着该次生成素材会传给它。音频/视频跨服务商引用尚无通用搬运实现。

当前合并历史以两边返回页排序合并，尚无全局跨来源游标：大量历史或翻页时可能不完全连续。Proxy 新素材使用 `mf_fpx_` 前缀，旧素材依靠已加载历史识别。

Nano Banana 编辑器系统提示词采用固定的画布/3D 场景上下文前缀，不等价于官方增强模型。Hunyuan World 返回 ZIP，TripoSplat 返回物体 PLY；都不冒充 World Labs Marble 的可探索世界。世界 ZIP 和视频提示词目前仅 Proxy API 已接通，不宣称桌面世界编辑流程完成。

## 验收记录

2026-10-07 目录扩展后新增 5 项真实验收，全部成功并核对文件头：FLUX.1 Dev（JPEG）、Seedream 4 文生图（JPEG）、Nano Banana 2 图像编辑（PNG）、ElevenLabs 音效（MP3）、Hunyuan 3D V3 图生网格（GLB）。累计 API 预留 US$12.88，加桌面 Nano 单张 US$0.10、浏览器链路 Draft prompt US$0.01 与 Hunyuan World US$0.30，共 US$13.29。Seedance 1.0 Lite（2 秒 480p 文生视频）与 Seedance 2.0 US（4 秒 480p 无音频文生视频，验证团队账号对 US 托管版的访问权限）已真实验收；Seedance 2.5（US 托管版）、2.0 Fast（含首尾帧与最多 9 张参考图）、Seedance 1.5 Pro、Kling 2.6 Pro、Veo 3.1、Veo 3.1 Fast、Seedream 4.5、Nano Banana Pro 仅完成 fal schema 与参数映射单元测试，未付费真实验收；Veo 单次 4 到 8 秒的列价为 US$0.60 到 US$3.20，默认不选中。

此前真实 fal API 验收 14/14 成功：FLUX 文生图、Nano 文生图/图像编辑、Qwen 角度、Fill 蒙版、Kling 文生/图生视频、Hunyuan 图生/文生网格、背景移除、音频、TripoSplat、Hunyuan World、视频提示词。13 个文件输出读取成功并核对 JPEG/PNG/MP4/GLB/WAV/PLY/ZIP 文件头，另一个返回文本。

付费测试的保守预算预留为 US$12.04，另为桌面 Nano 单张测试预留 US$0.10，总预留 US$12.14（截至首轮；最新累计见上文），低于用户授权 US$20。**预留不是实际账单**；没有读取最终账单，不能宣称精确实际费用或服务端已有美元硬限额。测试账本位于本机 `/tmp/artcraft-fal-live/`，不提交含素材链接和个人标识的日志。

已验证的模拟界面行为（Playwright 加浏览器夹具，`frontend/tools/testing/fal-proxy-seamless.mjs` 与截图审查）：图片、视频、音频、3D 物体、3D 世界、角度页的 fal 列价标签与费用面板、Nano Banana 与 Veo 家族中的 fal 服务商芯片、Hunyuan World 标签表单、视频页 Draft prompt 按钮、账户区块。Draft prompt 与 Hunyuan World 已用真实 Proxy 与真实 fal 走完前端链路：Chrome 加载生产构建，Tauri IPC 由镜像原生白名单的桥接替代，直连本机 Proxy。视频页短想法经 Draft prompt 扩写为 405 字提示词并可撤销；3D 世界页上传单图、填写两层前景与场景类型后生成 Hunyuan World，约 10 分钟后出现下载卡片，ZIP 为 78 MB 且文件头校验为 PK。该链路覆盖前端与 Proxy，不覆盖 Rust 原生层与系统下载对话框；终端无屏幕录制权限，未直接操控 Tauri 窗口。

已验证的桌面行为：原版首页和商业入口、统一图片页优先 fal、Nano 同一选择器切换 ArtCraft/fal、真实单张生成后进入原版历史、将结果送入原版视频首帧。独立模拟 UI 测试 `frontend/tools/testing/fal-proxy-seamless.mjs` 验证原版入口及 fal 原生请求参数。所有复杂编辑器、全模型官方真实付费生成和所有桌面世界流程**尚未逐项端到端验证**，API 成功不替代这些验收。

本地检查：Proxy 单元/集成测试，原生会话隔离/源站/白名单测试，21 项选择器与目录单测，前端生产构建、Rust 默认构建与禁用扩展构建。完整前端 TypeScript 检查仍有上游复合项目声明输出及其他既有错误；不将 Vite 构建通过称为完整类型检查通过。

## 本地构建与部署

飞书与 HTTPS 部署按 [飞书登录配置](feishu-login.md)，Proxy 模型及限制按 [Proxy README](../proxy/README.md)。

```bash
npm test --prefix proxy
SQLX_OFFLINE=true cargo test -p fal_proxy_provider --offline
SQLX_OFFLINE=true cargo check -p artcraft --offline
SQLX_OFFLINE=true cargo check -p artcraft --no-default-features --offline
# 在 frontend 目录：
./node_modules/.bin/vitest run --config tools/testing/vitest.fal-proxy.config.ts
# 在仓库根目录打包 macOS：
./script/artcraft/build_fal_proxy_macos.sh
```

最新本机 DMG 为 `../dist/ArtCraft-fal-Local-0.41.0-fal-pricing.dmg`（含 sha256）。本地包关闭官方 updater，使用独立 bundle identifier，避免被官方更新覆盖扩展。它是本机调试包，未做 Developer ID 公证，不作为正式企业分发成品。

## 跟进上游

`extensions/fal-proxy/upstream-base` 记录已验证基线。每次升级先提交本地改动，再执行：

```bash
git fetch upstream main
./script/artcraft/verify_upstream_candidate.sh upstream/main
```

脚本在临时 detached worktree 中重放提交并保存 range-diff，冲突保留在候选目录，不修改日常分支、不 force push。候选必须重新运行构建、隔离测试、官方入口与上述桌面验收，再人工决定合入；只完成 Git 重放不等于功能兼容。CI 目前自动运行 Proxy/native 测试，桌面打包与真实模型验收仍需本机及授权预算。

将服务端、通用扩展接缝和 fal 适配分层维护；适合回馈上游的通用接缝可单独提 PR。不要把飞书租户、内部域名、密钥及测试资产提交给上游。
