# fal Proxy AIGC 工作流覆盖审计

审计日期：2026-10-07。源码基线：`21a438573837afa5fe136edd2752529819738224`。本次仅阅读源码和 fal 官方文档，未调用付费生成。

**不能确认所有 AIGC 功能均可经 fal Proxy 执行。** 当前 Proxy 有 5 个公开模型、2 个隐藏适配器；有些编辑器不走普通模型选择流程。把所有请求强制送往 Proxy，并不等于这些请求的字段、结果和 UI 都已经适配。现有测试以 Proxy 模拟上游为主，不能代替客户端逐项验收。

## 证据等级

- **真实端到端已验证**：此前会话中 FLUX 图片完成生成和下载；用户生成的 Kling 视频经播放器修复后明确反馈“可以正常播放”。不据此推断全部参数组合、首尾帧或其他模型均通过。
- **适配器存在，未真实验收**：字段转换存在；部分有模拟或纯函数测试，部分只有代码证据。矩阵逐项注明。
- **未适配／被阻断**：调用无法到达可用适配器，或缺少模型、字段、输出支持。
- **非 AIGC 本地操作**：不需要 fal 推理，但相关生成按钮须另行验收。

## 工作流矩阵

以下源码链接相对于本文件。`P` = [Proxy 模型与输入转换](../../proxy/src/models.mjs)，`R` = [HTTP 路由](../../proxy/src/server.mjs)，`T` = [模拟测试](../../proxy/test/proxy.test.mjs)。

| 用户工作流                      | 当前状态           | 已有证据与限制                                                                                       | 源码来源                                                                                                                                                                                     |
| -------------------------- | -------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 普通文生图：FLUX.1 Schnell       | 真实端到端已验证       | 一次图片生成及下载；支持 1–4 张、五种比例，不支持参考图。                                                               | [图片入口](../../frontend/libs/components/promptbox/src/lib/PromptBoxImage.tsx)、P、T                                                                                                          |
| 普通视频：Kling 2.5 Turbo Pro   | 真实端到端已验证（单条视频） | 用户确认详情页播放恢复；不代表文生、图生、首尾帧、5/10 秒的全部组合均实测。                                                      | [视频入口](../../frontend/libs/components/promptbox/src/lib/PromptBoxVideo.tsx)、P                                                                                                            |
| Kling 首尾帧与参数组合             | 适配器存在，仅字段模拟测试  | start/end 映射 image_url/tail_image_url；5/10 秒、单条；拒绝多参考图、视频/音频/角色参考和 generate_audio。            | P、T                                                                                                                                                                                      |
| Nano Banana 文生图／参考图编辑      | 适配器存在，未真实验收    | 参考图触发 /edit，image_urls 最多 8 张；遮罩显式拒绝。上传权限、data URI 有模拟测试，非 Nano 完整桌面实测。                       | P、[素材解析](../../proxy/src/media.mjs)、T                                                                                                                                                    |
| Moodboard 排版、拖入图库          | 非 AIGC 本地操作    | sendToGeneration 把参考图放入 Image 提示框并切页；不是独立推理端点。                                                | [桌面适配器](../../frontend/apps/artcraft/app/src/pages/PageMoodboard/desktopMoodboardAdapter.tsx)                                                                                            |
| Moodboard 参考图生成            | 条件适配，未真实验收     | 最终依赖 Nano Banana edit；Schnell 会拒绝参考图，不能把 Moodboard 本地可用当成生成已通过。                               | [桌面适配器](../../frontend/apps/artcraft/app/src/pages/PageMoodboard/desktopMoodboardAdapter.tsx)、P                                                                                          |
| Draw 绘图、图层与布局              | 非 AIGC 本地操作    | 本地画布编辑不需 fal；生成、去背景、局部重绘须分开验收。                                                                | [Draw](../../frontend/apps/artcraft/app/src/pages/PageDraw/PageDraw.tsx)                                                                                                                 |
| Draw 整图编辑／画布生成             | 条件适配，未真实验收     | canvas_image_media_token 被合并为 image_media_tokens；仅 Nano Banana edit 可接收此输入。                   | [Draw](../../frontend/apps/artcraft/app/src/pages/PageDraw/PageDraw.tsx)、[Omni dispatch](../../crates/desktop/artcraft/src/core/commands/generate/omni/dispatch.rs)、P                    |
| Draw 遮罩局部重绘                | 未贯通／被阻断        | 新入口走 GenerateImage；已写的旧 FLUX Fill 路由不能证明该入口可用；见下方详细字段断点。                                      | [Draw](../../frontend/apps/artcraft/app/src/pages/PageDraw/PageDraw.tsx)、[原生图像入口](../../crates/desktop/artcraft/src/core/commands/generate/generate_image/generate_image_command.rs)、P、R |
| 旧 FLUX Fill 专用 inpaint API | 适配器存在，无专项验收    | /v1/generate/image/inpaint/flux_pro_1 接收 image_media_token、mask_media_token、num_images；隐藏于目录。 | [旧原生 handler](../../crates/desktop/artcraft/src/core/commands/deprecated/image_inpaint/artcraft/handle_artcraft_flux_pro_1_inpaint.rs)、P、R                                               |
| 去背景                        | 适配器存在，无专项验收    | 原生上传后发送 media_file_token，Proxy 转 BiRefNet image_url；需验收透明度、结果事件与回填原图层。                        | [去背景 handler](../../crates/desktop/artcraft/src/core/commands/enqueue/image_bg_removal/artcraft/handle_generic_bg_removal_artcraft.rs)、P、R                                               |
| Angles 相机角度                | 未适配／被阻断        | qwen_edit_2511_angles、flux_2_lora_angles 均不在 allowlist；角度/俯仰/缩放字段没有映射。                        | [Angles](../../frontend/apps/artcraft/app/src/pages/PageAngles/Angles.tsx)、P                                                                                                             |
| 3D Stage 编辑、摆放、相机          | 非 AIGC 本地操作    | Three.js 场景操作本身不需要推理；云端场景保存不是已适配的 Proxy 功能。                                                   | [场景适配器](../../frontend/apps/artcraft/app/src/pages/PageScene/useTauriPageSceneAdapter.tsx)                                                                                               |
| 3D Stage 截图引导图像生成          | 条件适配，未真实验收     | scene_image_media_token 经 Omni 合并为参考图，依赖 Nano Banana edit；不是结构化 3D 场景生成。                      | [场景适配器](../../frontend/apps/artcraft/app/src/pages/PageScene/useTauriPageSceneAdapter.tsx)、[Omni dispatch](../../crates/desktop/artcraft/src/core/commands/generate/omni/dispatch.rs)、P  |
| 音效／音频生成                    | 适配器存在，仅字段模拟测试  | Stable Audio 文本输入固定 seconds_total=30；不是完整音乐、歌声、配音、音频编辑或克隆能力。                                  | [音频页](../../frontend/apps/artcraft/app/src/pages/PageAudio/CreateAudio.tsx)、[请求构造](../../frontend/libs/omni-gen/src/lib/omni-gen-audio.ts)、P、T                                           |
| 图生 3D Mesh                 | 适配器存在，仅字段模拟测试  | Hunyuan3D 2.1 恰好一张参考图；enable_texture → textured_mesh；需真实 GLB 下载、预览、导入 Stage 验收。               | [3D 生成入口](../../frontend/apps/artcraft/app/src/components/experiences/ImageTo3DExperience.tsx)、P、T                                                                                       |
| 文生 3D Mesh                 | 未适配            | 页面有文本模式，但当前 Hunyuan adapter 强制一张图；纯文字请求会失败。                                                   | [3D 生成入口](../../frontend/apps/artcraft/app/src/components/experiences/ImageTo3DExperience.tsx)、P                                                                                         |
| Gaussian Splat／World       | 未适配／被阻断        | 有 /generate/splat 路由，但没有任何 modality=splat 模型；也没有 splat 结果提取和任务分类支持。                           | [3D 生成入口](../../frontend/apps/artcraft/app/src/components/experiences/ImageTo3DExperience.tsx)、P、[结果解析](../../proxy/src/generation.mjs)                                                  |
| 图片去水印                      | 上游页面占位，未实现推理   | handleRemoveWatermark 只等待 2 秒并提示完成；未发送推理请求。                                                   | [图片水印页](../../frontend/apps/artcraft/app/src/pages/PageImageWatermarkRemover/ImageWatermarkRemover.tsx)                                                                                  |
| 视频去水印                      | 上游页面占位，未实现推理   | 同样仅 setTimeout 模拟完成；不能宣称已有 AI 去水印能力。                                                          | [视频水印页](../../frontend/apps/artcraft/app/src/pages/PageVideoWatermarkRemover/VideoWatermarkRemover.tsx)                                                                                  |
| 系统提示词／LLM 提示词增强            | Proxy 未实现      | 客户端存在 enable_system_prompt；Proxy 没有消费该字段或 LLM 调用。不能视作功能保留。                                    | [3D PromptBox](../../frontend/libs/components/promptbox/src/lib/PromptBox3D.tsx)、[Draw](../../frontend/apps/artcraft/app/src/pages/PageDraw/PageDraw.tsx)、P                              |
| 其他原有模型／历史任务重新生成            | 不保证可用          | 默认目录只有当前公开模型；历史持久化模型仍可能进入请求，但 allowlist 拒绝。原生 fal_client 代码多不等于 Proxy 覆盖多。                    | [模型加载器](../../frontend/libs/model-list/src/lib/loader/buildModelsFromListing.ts)、[强制路由](../../crates/desktop/artcraft/src/core/commands/generate/omni/request.rs)、P                      |

## 本次执行的验证

主线程运行了不访问网络的 `buildInput` 探针：`flux_2_lora_angles`、`qwen_edit_2511_angles`、`flux_pro_1p1`、`marble_0p1_plus` 均返回 400；FLUX、Nano Banana、Kling、Stable Audio、Hunyuan 的已适配样例成功构造输入，**这不是 fal 上游验证**。`npm test --prefix proxy` 在允许本地监听后 9/9 通过，测试使用模拟上游，没有付费生成。

## 已定位的字段和调用链断点

1. **Draw inpaint 的新旧链不同。** 新 `enqueueInpaint` 发送 `model`、`image_media_tokens`、`inpainting_mask_image_raw_bytes` 到 `GenerateImage`。当 model=`flux_pro_1`，`uses_legacy_image_endpoint` 转入 native handler，但 `handle_artcraft` 并未把 `FluxPro1` 当成 legacy-only；随后 [模型转换](../../crates/desktop/artcraft/src/core/api_adapters/models/image/tauri_image_model_to_enums_model.rs) 将其映射为 `flux_pro_1p1`，而 [原生 Omni builder](../../crates/desktop/artcraft/src/core/commands/generate/generate_image/providers/artcraft/handle_artcraft_via_omni_endpoint.rs) 不包含 mask 字段。Proxy 也不接受 `flux_pro_1p1`。不能仅因为旧专用 API 有适配器而把当前 Draw 标成已支持。
2. **Nano Banana 不能冒充遮罩编辑。** 新 Omni 会上传并保留 `inpainting_mask_image_media_token`，而 Nano adapter 明确拒绝它。隐藏 Fill 模型没有公开到模型目录，当前公开两图像模型不能提供完整 mask 工作流。
3. **Angles 的输入语义需要单独适配。** 页面发送 `adjust_horizontal_angle`、`adjust_vertical_angle`、`adjust_zoom`。现有 Proxy 对这三个字段不消费，且没有角度模型；不能换成普通 edit 模型后忽略控制值。
4. **强制路由使原有服务无法充当后备。** `uses_artcraft()` 恒 true，图像命令又覆盖 provider 为 Artcraft；当前 Artcraft host 实际为 Proxy。仅把原有商业按钮重新显示出来不足以恢复官方生成和付费服务；账户、目录、媒体和任务还需要服务隔离。
5. **结果契约也影响覆盖。** [Generation.poll](../../proxy/src/generation.mjs) 只取 images/image/video/audio_file/audio/model_glb_pbr/model_glb；新增模型即使能提交，也可能因返回字段不同失败。Splat 更需结果类型、文件格式与原生完成事件一起接通。
6. **UI 能力仍有静态来源。** [buildModelsFromListing](../../frontend/libs/model-list/src/lib/loader/buildModelsFromListing.ts) 的 `canEditImages`、`usesInpaintingMask`、`canEditAngles` 依赖本地 overlay，未来仅在服务端加模型不会自动使它出现在所有编辑器里。功能覆盖应按页面和输入模式验收。

## fal 官方文档核对与候选

以下仅代表有可研究的 API，不表示本项目已接入、已通过测试或已验证费用。

- **Angles 优先候选：** [Qwen Image Edit 2511 Multiple Angles](https://fal.ai/models/fal-ai/qwen-image-edit-2511-multiple-angles/api)。官方 schema 有 `image_urls`、`horizontal_angle`、`vertical_angle`、`zoom` 和 `additional_prompt`，与现有角度 UI 语义较接近。要明确角度坐标和 zoom 范围转换，不能直接猜值。
- **遮罩编辑：** [FLUX Fill Pro](https://fal.ai/models/fal-ai/flux-pro/v1/fill/api)。已有 Proxy adapter 的方向正确，但先修新 Draw 请求与其 image/mask 输入的桥接，再检查 mask 黑白方向、尺寸和回填事件。
- **Mesh：** [Hunyuan3D 2.1](https://fal.ai/models/fal-ai/hunyuan3d-v21/api) 为图生 3D；不能据此声称文生 3D 已支持。文生 3D 可研究独立模型或显式两阶段流程，成本和中间图必须对用户可见。
- **音频：** [Stable Audio](https://fal.ai/models/fal-ai/stable-audio/api) 可作为现有文本音效链路的验收对象；其他音频产品能力应分别定义，不用同一模型名称概括全部。
- **Splat、LLM 增强、去水印：** 本次未确立完整的 fal 候选与兼容结果契约，不承诺全 fal 覆盖。优先保留可用的官方路径并显示当前 Proxy 不支持；水印页面的假成功应单独纠正。

## 建议验收顺序

1. 建立 capability/workflow 清单，区分图片生成、参考编辑、mask、背景、角度、场景引导、视频各输入模式、音频、mesh、splat、提示词增强。每项附来源、限制、真实验收时间。
2. 修通 Draw mask 与 Angles；为 unsupported 参数提供清晰报错，避免静默忽略系统提示词、分辨率等选项。
3. 用客户端真实请求建立契约测试：上传 → submit → poll → media → native event → 页面回填，而不只是直接调用 buildInput。
4. 在约定的小额预算内逐项真实验收：Nano edit、Draw canvas、mask、背景、Angles、Stage、Audio、Mesh；视频另验首尾帧。新增费用调用前说明具体模型和次数。
5. 对暂不能经 Proxy 执行的项目，保留官方商业服务入口及准确标识，避免静默把一次请求从内部服务切到付费官方账户。

只有每个用户可见生成工作流的关键输入、结果展示和导出都通过，才应使用“所有 AIGC 功能覆盖”这一表述。上游模型目录与 fal 模型目录不会天然一一对应。
