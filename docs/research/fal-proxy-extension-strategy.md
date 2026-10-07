# fal Proxy 扩展与持续跟进上游的实施研究

研究日期：2026-10-07。本文是待实施方案，不表示官方商业入口已恢复，也不表示全部 AIGC 能力已接入。

## 结论

建议把 fal Proxy 做成独立服务，加上一个编译进客户端的 provider 适配模块；先在 ArtCraft 中建立很小的通用接入接口，再将团队配置、飞书认证和 fal 模型映射放在独立模块中。不要继续把全局 ArtCraft API 地址替换成 Proxy，也不要继续把所有 provider 强制映射为 `Artcraft`。这种替换虽然快速验证了生成链路，却把官方账号、订阅、模型服务、历史任务与团队服务耦合到了一起。

上游已有多 provider 路由、动态 Omni 请求、模型目录和任务事件，可作为接入位置；目前检查的源码没有提供第三方业务插件安装器、稳定插件协议或 React 页面扩展插槽。Tauri 的 plugin 是 Rust crate 与可选 JS 包，可以封装本机命令、状态、生命周期及权限；它本身不等于 ArtCraft 业务插件平台，不能据此声称现有安装包可无修改热插拔 fal/飞书插件。[Tauri 插件文档](https://v2.tauri.app/develop/plugins/)

原有商业入口必须保持实际可用：官方登录、订阅/充值、官方付费模型、官方作业查询均应使用官方服务及其凭据。仅恢复几个购买链接不够。具体 License 要求及企业内部使用措辞的确认事项，应与本轮许可证审查一起处理；本文不作授权结论。

## 核验版本和范围

只读查询 GitHub `repos/storytold/artcraft/commits/main`，上游最新 commit 为 `3e5793b6934b51536606720e5d56bcfd1fe7cc2d`，提交时间 `2026-10-07T00:56:14Z`；与本地 `upstream/main` 一致。本轮没有 fetch、rebase、改写历史或发送上游消息。研究当前 fork 的基线为 `21a4385738`。[上游固定版本](https://github.com/storytold/artcraft/tree/3e5793b6934b51536606720e5d56bcfd1fe7cc2d)

以下既有能力基于固定版本源码阅读；没有把当前 fork 的兼容 API 当成上游承诺的公共扩展协议。

## 已存在的接入位置

1. **Omni 请求边界。** `OmniRequest` 使用 `serde(flatten)` 保留服务端模型和参数字段；存在 image/video/mesh/splat/audio modality。上游 `uses_artcraft()` 按 provider 决定官方或原生路径，历史特殊图像编辑仍有独立请求格式。这里适合注入 provider 选择，但仅改此处无法同时解决上传、费用估计、轮询和历史数据。[上游 request.rs](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/desktop/artcraft/src/core/commands/generate/omni/request.rs)
2. **模型目录。** 前端 `modelsStore` 拉取图像/视频目录，`buildModelsFromListing` 将服务端模型与本地显示元数据结合。这比维护第二份完整 UI 模型列表更适合接入动态能力。音频、mesh、splat 和专用编辑工具仍需逐个核验，不能从两个目录推断全界面已动态化。[上游模型 store](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/frontend/libs/tauri-api/src/lib/models/modelsStore.ts)、[目录转换](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/frontend/libs/model-list/src/lib/loader/buildModelsFromListing.ts)
3. **provider 和凭据枚举。** 上游已有 `GenerationProvider::Fal`、API key 管理和 provider 列表，但它们是编译时类型与显式注册列表，不是任意第三方 provider 的发现机制。`Fal` 原生 API key 接入也不等于带飞书身份的 `fal_proxy`。[provider enum](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/schema/public/enums/src/common/generation_provider.rs)、[provider list](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/desktop/artcraft/src/core/commands/providers/provider_list_command.rs)
4. **提交和任务追踪。** 当前 Omni dispatch 从全局 `StorytellerCredentialManager` 取凭据、使用 `storyteller_host`，并把任务写成 `GenerationProvider::Artcraft`。因此不能仅切换生成 URL 就实现并行服务。必须让提交、任务持久化、轮询、完成事件与资源查询共同记录 provider 实例。[上游 dispatch](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/desktop/artcraft/src/core/commands/generate/omni/dispatch.rs)、[官方轮询线程](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/desktop/artcraft/src/services/storyteller/threads/storyteller_task_polling_thread/storyteller_task_polling_thread.rs)
5. **认证和订阅耦合。** 前端恢复登录时先取 session，再取 active subscriptions；订阅请求失败会清除登录状态。团队身份必须有独立状态，不能继续借官方 session 加空订阅响应模拟官方账号。[上游 authentication fetchers](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/frontend/apps/artcraft/app/src/signals/authentication/fetchers.ts)
6. **Tauri 宿主。** `lib.rs` 显式安装插件和命令。封装成 Rust 插件可缩小主工程差异，但依然需要 Cargo 依赖、宿主注册、前端入口和权限配置。[上游 lib.rs](https://github.com/storytold/artcraft/blob/3e5793b6934b51536606720e5d56bcfd1fe7cc2d/crates/desktop/artcraft/src/lib.rs)

## 建议新增的接口，而非已存在的 SDK

第一版不建设任意代码插件市场；建立受控的 provider 接入协议即可。下列名称是设计建议。

- `ProviderInstance`：稳定实例 ID、provider kind、origin、protocol version、显示名称。区分 `artcraft`、原生 `fal` 与团队 `fal_proxy:<instance>`；不可仅以 model ID 或 hostname 作为账号标识。
- `ProviderSession`：按实例和账号隔离的认证状态与凭据储存；独立登录/退出。官方凭据只发官方 origin，团队 session 只发登记的 Proxy origin。`FAL_KEY` 仅保留在服务端。切换 Proxy URL 时不能沿用旧 origin 的 cookie 或凭据。
- `GenerationBackend`：`listCapabilities / estimate / upload / submit / poll / resolveAsset`；`cancel` 等操作由 capability 声明支持与否。保留 upstream 官方 backend，新增 Proxy backend。能力包括 modality、输入类型、参数 schema、输出类型及限制，而不是仅一组模型名称。
- `JobRef`、`AssetRef`：至少包含 provider instance、owner/account、opaque ID；历史任务永远按创建时 provider 轮询。切换默认 provider 不迁移已提交任务。引用另一 provider 的素材时，显式下载后重新上传，或拒绝并说明；不可把一个服务的 media token 原样交给另一个服务。
- 前端聚合目录保留相同模型的不同提供方选项；缓存键包含 provider、账号和目录版本。显示价格来源，不能把官方 credits 和 fal 费用混为同一余额。
- 官方 UI 组件继续使用官方 client/session。新增团队 provider 设置和飞书登录面板；生成面板可记住用户主动选择的 `fal Proxy` 默认值。Proxy 不支持某能力时显示原因并提供明确的官方入口；不静默切换计费方或自动提交另一付费服务。

建议文件边界：独立 `provider-contract` 类型/接口、`fal-proxy-provider` Rust crate（可后续包装 Tauri plugin）、小型前端 provider 面板包、独立部署的 `proxy/`。先保持模块在单仓便于测试，接口稳定后再拆仓。上游不接受接口前，仍需维护接入补丁；没有技术方法保证永远零冲突 rebase。

## 凭据、官方商业入口与数据迁移

必须先恢复官方 `AppEnvConfigs`/API host 的含义，再引入独立 `ProxyConfig`，不能在官方 client 上根据“当前模式”交换 host。官方购买动作、账号刷新、付费生成和后台任务可能同时发生，单个可变 host 容易错发凭据与任务。

当前 fork 的全局 host、强制 `uses_artcraft()`、图像 provider 强制赋值、Feishu-only 登录、目录裁剪、顶部栏和 BillingSettingsPane 替换均需转为**可附加的独立 provider**。恢复官方功能需验证实际调用链，不能仅根据 UI 可见判断完成。对应差异可在 [fork 比较页](https://github.com/zengjie/artcraft/compare/3e5793b6934b51536606720e5d56bcfd1fe7cc2d...21a4385738) 检查。

迁移旧本地任务时尤其谨慎：当前 Proxy 任务被标成 `Artcraft`。新版本不能把全部旧 Artcraft 记录直接改名，也不能将其全发回官方。应备份旧数据库；按旧构建配置及可验证的 Proxy 作业记录确认来源，迁入明确的 legacy Proxy 实例。来源不明的记录保持待确认且禁止自动重发。会话也不能因为 cookie 名相同而复用；首次使用独立 Proxy 身份可重新飞书登录。上述迁移尚未实施。

Tauri 权限和 CSP 分别处理。插件命令只开放必要能力，OAuth 网页不获得本机插件权限；media/img/connect 的域名通过受控配置准入或通过同源资产网关返回，避免为方便任意 endpoint 放开全部来源。capabilities 控制 WebView 可调用的命令，本身不是 provider 级凭据隔离。[Tauri capabilities](https://v2.tauri.app/security/capabilities/)

## 小补丁栈与上游合作

建议维护以下逻辑独立的提交/PR，避免每次升级重新大改顶部栏或所有生成命令：

1. **通用 provider context + 回归测试**：保留默认官方行为，分离端点、凭据、job/asset 来源，迁移数据有版本。
2. **通用目录/路由/会话 UI 接口**：支持多个 provider 实例及其能力；官方登录与付费服务仍可用。
3. **外部 Proxy adapter**：只实现协议，不内置团队凭据、不改变 upstream 默认服务。将 fal 映射和飞书组织策略留在独立 Proxy。
4. **内部发行配置**：品牌标注、默认 provider 偏好、部署地址与精确 CSP、打包配置、运维文档。与前三项分开，便于 upstream 接受通用改进。

先向维护者提供可审阅设计和保持官方服务的演示，再提最小通用接口 PR；不要先要求其接受企业专用认证或复杂插件市场。此研究没有发送 Issue/PR。若上游未接受，保留模块化 fork 仍可降低冲突，但需持续维护。

同步流程建议在干净的临时 worktree/CI 分支执行：记录 upstream base 与 fork head，fetch upstream 后对候选分支 rebase，审查冲突及 `git range-diff`，运行下面的回归门槛，再发布新的内部构建。共享稳定分支不自动 force push；不能把 rebase 无冲突视为业务兼容验证。Git 官方将 range-diff 定位为比较两个 patch series，适合审查 rebase 后补丁语义变化。[git rebase](https://git-scm.com/docs/git-rebase)、[git range-diff](https://git-scm.com/docs/git-range-diff)

## 验收门槛

- 官方账号登录、订阅/充值入口、官方目录、估价、提交和完成链路保持可达；实际扣费购买需使用适当测试环境或明确授权，不以生产购买作自动回归。
- 飞书和官方账号同时登录、各自退出、重启恢复、Proxy origin 变更、不同租户用户隔离；捕获请求验证 cookie/token 不跨 origin。
- 官方与 Proxy 同时提交任务，切换默认 provider、断网恢复和重启后，作业只在创建 provider 查询；幂等重试不重复扣费。
- 按 AIGC 覆盖矩阵逐项测试：输入上传、schema 映射、成功/失败/取消、输出下载和详情播放、重建/编辑复用。单元测试、mock 集成、真实 fal 冒烟分别标记，不能以 mock 通过宣称全功能实测。
- Proxy 新模型可在不更新客户端时出现的范围与限制有测试；未知参数不静默丢弃；不支持能力不冒充成功。
- 历史任务和素材跨 provider 来源迁移可回滚；账号缓存和列表无串用。
- 上游原测试套件、Rust/前端构建、macOS 包运行、图片/视频/音频/3D 输出展示；官网和购买入口仍正常。构建时未启用扩展的版本应保持 upstream 默认行为。

推荐实施顺序是：先解决 License 适用范围与恢复官方能力的设计，再分离 provider/session/资源来源，接着模块化现有 Proxy，最后按覆盖矩阵补齐 AIGC 模型与工具。不要将“插件化”或“可持续 rebase”当成全部模型已经可用的证明。
