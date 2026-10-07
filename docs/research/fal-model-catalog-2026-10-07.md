# fal 模型目录快照（2026-10-07）

通过 `genmedia models --category=<类别> --limit=100`（含分页）从 fal 模型目录接口枚举，仅含状态为 active 的端点。共 1459 个端点。本文件是能力参考，不代表 ArtCraft fork 已接入；已接入的端点在表中以“已接入”标注，其余走官方或尚未接入。价格以 `genmedia pricing <endpoint>` 或 fal 定价页为准。

| 类别 | 端点数 |
|------|--------|
| text-to-image | 202 |
| image-to-image | 394 |
| text-to-video | 136 |
| image-to-video | 195 |
| video-to-video | 199 |
| audio-to-video | 18 |
| text-to-audio | 50 |
| audio-to-audio | 44 |
| text-to-speech | 37 |
| speech-to-text | 10 |
| audio-to-text | 2 |
| video-to-audio | 6 |
| image-to-3d | 36 |
| text-to-3d | 10 |
| 3d-to-3d | 7 |
| vision | 32 |
| image-to-text | 1 |
| video-to-text | 2 |
| image-to-json | 3 |
| text-to-json | 3 |
| json | 6 |
| llm | 8 |
| training | 57 |
| unknown | 1 |

## text-to-image（202）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/qwen-image-3/text-to-image` | Qwen Image 3 Text to Image | Generates images from a text prompt at resolutions up to 2048×2048, with automatic prompt rewriting and prompt-guided resolution selection, | |
| `blackforestlabs/flux-3/text-to-image` | Flux 3 Image | FLUX 3 Image is Black Forest Labs' newest image model. Generate detailed, well-composed images in native 2K and 4K with precise layout contr | |
| `bria/fibo-bbq-preview/generate` | Fibo Bbq Preview | A preview to the next level of control of Text-to-Image models. | |
| `bria/fibo-gen-1.5/text-to-image` | Fibo Gen 1.5 Text to Image | Text-to-image model with high-fidelity outputs, accurate typography, and style preset, strong in photorealism, textures, and beyond. JSON-st | |
| `bria/fibo-lite/generate` | Fibo Lite | Fast, low-latency text-to-image model with high-quality output and full JSON-structured controllability. Open-source, trained on licensed da | |
| `bria/fibo/generate` | Fibo | SOTA open-source text-to-image model delivering high-fidelity outputs with accurate typography. JSON-structured prompts provide production-r | |
| `bytedance/seedream/v5/flash/text-to-image` | Seedream | Seedream 5.0 Flash is a fast image generation and editing model, built for workflows where speed and budget matter. | |
| `bytedance/seedream/v5/lite/text-to-image` | Seedream | Text to Image endpoint for the fast Lite version of Seedream 5.0, supporting high quality intelligent text-to-image generation. | |
| `bytedance/seedream/v5/pro/text-to-image` | Seedream 5.0 Pro Text to Image | ByteDance's Seedream 5.0 Pro is flagship text-to-image model, with deep-thinking prompt understanding, native text in 14 languages, and prec | |
| `fal-ai/aura-flow` | AuraFlow | AuraFlow v0.3 is an open-source flow-based text-to-image generation model that achieves state-of-the-art results on GenEval. The model is cu | |
| `fal-ai/bagel` | Bagel | Bagel is a 7B parameter from Bytedance-Seed multimodal model that can generate both text and images. | |
| `fal-ai/bitdance` | Bitdance | Image generation with BitDance. Fast, high-resolution photorealistic images using an autoregressive LLM— for efficient, high-quality results | |
| `fal-ai/boogu-image` | Boogu Image | Text To Image Model using Boogu-Image | |
| `fal-ai/bria/text-to-image/base` | Bria Text-to-Image Base | Bria's Text-to-Image model, trained exclusively on licensed data for safe and risk-free commercial use. Available also as source code and we | |
| `fal-ai/bria/text-to-image/fast` | Bria Text-to-Image Fast | Bria's Text-to-Image model with perfect harmony of latency and quality. Trained exclusively on licensed data for safe and risk-free commerci | |
| `fal-ai/bria/text-to-image/hd` | Bria Text-to-Image HD | Bria's Text-to-Image model for HD images. Trained exclusively on licensed data for safe and risk-free commercial use. Available also as sour | |
| `fal-ai/bytedance/seedream/v4.5/text-to-image` | Bytedance Seedream V4.5 Text To Image | A new-generation image creation model ByteDance, Seedream 4.5 integrates image generation and image editing capabilities into a single, unif | 已接入|
| `fal-ai/bytedance/seedream/v4/text-to-image` | Bytedance Seedream V4 Text To Image | A new-generation image creation model ByteDance, Seedream 4.0 integrates image generation and image editing capabilities into a single, unif | 已接入|
| `fal-ai/cogview4` | CogView | Generate high quality images from text prompts using CogView4. Longer text prompts will result in better quality images. | |
| `fal-ai/dreamshaper` | Dreamshaper | Dreamshaper model. | |
| `fal-ai/emu-3.5-image/text-to-image` | Emu 3.5 Image | Generate images from text using Emu 3.5 Image | |
| `fal-ai/ernie-image` | Ernie Image | High-quality text-to-image model by Baidu. Supports English, Chinese, and Japanese prompts with built-in prompt expansion. | |
| `fal-ai/ernie-image/lora` | Ernie Image Lora | High-quality text-to-image model by Baidu. Supports English, Chinese, and Japanese prompts with built-in prompt expansion. | |
| `fal-ai/ernie-image/lora/turbo` | Ernie Image Lora Turbo | High-quality text-to-image model by Baidu. Supports English, Chinese, and Japanese prompts with built-in prompt expansion. | |
| `fal-ai/ernie-image/turbo` | Ernie Image Turbo | High-quality text-to-image model by Baidu. Supports English, Chinese, and Japanese prompts with built-in prompt expansion. | |
| `fal-ai/fast-fooocus-sdxl/image-to-image` | Fooocus | Fooocus extreme speed mode as a standalone app. | |
| `fal-ai/fast-lcm-diffusion` | Latent Consistency Models (v1.5/XL) | Run SDXL at the speed of light | |
| `fal-ai/fast-lightning-sdxl` | Stable Diffusion XL Lightning | Run SDXL at the speed of light | |
| `fal-ai/fast-sdxl` | Stable Diffusion XL | Run SDXL at the speed of light | |
| `fal-ai/fast-sdxl-controlnet-canny` | ControlNet SDXL | Generate Images with ControlNet. | |
| `fal-ai/flux-1/dev` | FLUX.1 [dev] | FLUX.1 [dev] is a 12 billion parameter flow transformer that generates high-quality images from text. It is suitable for personal and commer | |
| `fal-ai/flux-1/krea` | FLUX.1 Krea [dev] | FLUX.1 Krea [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux-1/schnell` | FLUX.1 [schnell] | Fastest inference in the world for the 12 billion parameter FLUX.1 [schnell] text-to-image model. | |
| `fal-ai/flux-1/srpo` | FLUX.1 SRPO [dev] | FLUX.1 SRPO [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux-2` | FLUX 2 | Text-to-image generation with FLUX.2 [dev] from Black Forest Labs. Enhanced realism, crisper text generation, and native editing capabilitie | |
| `fal-ai/flux-2-flex` | Flux 2 Flex | Text-to-image generation with FLUX.2 [flex] from Black Forest Labs. Features adjustable inference steps and guidance scale for fine-tuned co | |
| `fal-ai/flux-2-lora-gallery/ballpoint-pen-sketch` | Flux 2 Lora Gallery | Ballpoint pen sketch drawing style | |
| `fal-ai/flux-2-lora-gallery/digital-comic-art` | Flux 2 Lora Gallery | Transforms images into comic book style | |
| `fal-ai/flux-2-lora-gallery/hdr-style` | FLUX 2 Lora Gallery Hdr Style | HDR surrealistic effect with intense colors | |
| `fal-ai/flux-2-lora-gallery/realism` | FLUX 2 Lora Gallery Realism | Makes images more photorealistic and natural | |
| `fal-ai/flux-2-lora-gallery/satellite-view-style` | Flux 2 Lora Gallery | Generates satellite/aerial view style images | |
| `fal-ai/flux-2-lora-gallery/sepia-vintage` | Flux 2 Lora Gallery | Applies sepia vintage effect to images | |
| `fal-ai/flux-2-max` | Flux 2 Max | FLUX.2 [max] delivers state-of-the-art image generation and advanced image editing with exceptional realism, precision, and consistency. | |
| `fal-ai/flux-2-pro` | Flux 2 Pro | Image editing with FLUX.2 [pro] from Black Forest Labs. Ideal for high-quality image manipulation, style transfer, and sequential editing wo | |
| `fal-ai/flux-2/flash` | FLUX 2 Flash | Text-to-image generation with FLUX.2 [dev] from Black Forest Labs. Enhanced realism, crisper text generation, and native editing capabilitie | |
| `fal-ai/flux-2/klein/4b` | FLUX.2 [klein] 4B | Text-to-image generation with FLUX.2 [klein] 4B from Black Forest Labs. Enhanced realism, crisper text generation, and native editing capabi | |
| `fal-ai/flux-2/klein/4b/base` | FLUX.2 [klein] 4B Base | Text-to-image generation with FLUX.2 [klein] 4B Base from Black Forest Labs. Enhanced realism, crisper text generation, and native editing c | |
| `fal-ai/flux-2/klein/4b/base/lora` | FLUX.2 [klein] 4B Base LoRA | Text-to-image generation with LoRA support for FLUX.2 [klein] 4B Base from Black Forest Labs. Custom style adaptation and fine-tuned model v | |
| `fal-ai/flux-2/klein/4b/lora` | FLUX.2 [klein] 4B LoRA | Text-to-image generation with FLUX.2 [klein] 4B from Black Forest Labs and custom LoRA. Enhanced realism, crisper text generation, and nativ | |
| `fal-ai/flux-2/klein/9b` | FLUX.2 [klein] 9B | Text-to-image generation with FLUX.2 [klein] 9B from Black Forest Labs. Enhanced realism, crisper text generation, and native editing capabi | |
| `fal-ai/flux-2/klein/9b/base` | FLUX.2 [klein] 9B Base | Text-to-image generation with FLUX.2 [klein] 9B Base from Black Forest Labs. Enhanced realism, crisper text generation, and native editing c | |
| `fal-ai/flux-2/klein/9b/base/lora` | FLUX.2 [klein] 9B Base LoRA | Text-to-image generation with LoRA support for FLUX.2 [klein] 9B Base from Black Forest Labs. Custom style adaptation and fine-tuned model v | |
| `fal-ai/flux-2/klein/9b/lora` | FLUX.2 [klein] 9B LoRA | Text-to-image generation with FLUX.2 [klein] 9B from Black Forest Labs and custom LoRA. | |
| `fal-ai/flux-2/lora` | FLUX 2 Lora | Text-to-image generation with LoRA support for FLUX.2 [dev] from Black Forest Labs. Custom style adaptation and fine-tuned model variations. | |
| `fal-ai/flux-2/turbo` | FLUX 2 Turbo | Text-to-image generation with FLUX.2 [dev] from Black Forest Labs. Enhanced realism, crisper text generation, and native editing capabilitie | |
| `fal-ai/flux-control-lora-canny` | FLUX.1 [dev] Control LoRA Canny | FLUX Control LoRA Canny is a high-performance endpoint that uses a control image to transfer structure to the generated image, using a Canny | |
| `fal-ai/flux-control-lora-depth` | FLUX.1 [dev] Control LoRA Depth | FLUX Control LoRA Depth is a high-performance endpoint that uses a control image to transfer structure to the generated image, using a depth | |
| `fal-ai/flux-general` | FLUX.1 [dev] with Controlnets and Loras | A versatile endpoint for the FLUX.1 [dev] model that supports multiple AI extensions including LoRA, ControlNet conditioning, and IP-Adapter | |
| `fal-ai/flux-kontext-lora/text-to-image` | Flux Kontext Lora | Super fast text-to-image endpoint for the FLUX.1 Kontext [dev] model with LoRA support, enabling rapid and high-quality image generation usi | |
| `fal-ai/flux-krea-lora` | FLUX.1 Krea [dev] with LoRAs | Super fast endpoint for the FLUX.1 [dev] model with LoRA support, enabling rapid and high-quality image generation using pre-trained LoRA ad | |
| `fal-ai/flux-krea-lora/stream` | Flux Krea Lora | Super fast endpoint for the FLUX.1 [dev] model with LoRA support, enabling rapid and high-quality image generation using pre-trained LoRA ad | |
| `fal-ai/flux-lora` | FLUX.1 [dev] with LoRAs | Super fast endpoint for the FLUX.1 [dev] model with LoRA support, enabling rapid and high-quality image generation using pre-trained LoRA ad | |
| `fal-ai/flux-lora/inpainting` | FLUX.1 [dev] Inpainting with LoRAs | Super fast endpoint for the FLUX.1 [dev] inpainting model with LoRA support, enabling rapid and high-quality image inpaingting using pre-tra | |
| `fal-ai/flux-lora/stream` | Flux Lora | Super fast endpoint for the FLUX.1 [dev] model with LoRA support, enabling rapid and high-quality image generation using pre-trained LoRA ad | |
| `fal-ai/flux-pro/kontext/max/text-to-image` | FLUX.1 Kontext [max] | FLUX.1 Kontext [max] text-to-image is a new premium model brings maximum performance across all aspects – greatly improved prompt adherence. | |
| `fal-ai/flux-pro/kontext/text-to-image` | FLUX.1 Kontext [pro] | The FLUX.1 Kontext [pro] text-to-image delivers state-of-the-art image generation results with unprecedented prompt following, photorealisti | |
| `fal-ai/flux-pro/v1.1` | FLUX1.1 [pro] | FLUX1.1 [pro] is an enhanced version of FLUX.1 [pro], improved image generation capabilities, delivering superior composition, detail, and a | |
| `fal-ai/flux-pro/v1.1-ultra` | FLUX1.1 [pro] ultra | FLUX1.1 [pro] ultra is the newest version of FLUX1.1 [pro], maintaining professional-grade image quality while delivering up to 2K resolutio | |
| `fal-ai/flux-pro/v1.1-ultra-finetuned` | FLUX1.1 [pro] ultra Fine-tuned | FLUX1.1 [pro] ultra fine-tuned is the newest version of FLUX1.1 [pro] with a fine-tuned LoRA, maintaining professional-grade image quality w | |
| `fal-ai/flux-subject` | FLUX.1 Subject | Super fast endpoint for the FLUX.1 [schnell] model with subject input capabilities, enabling rapid and high-quality image generation for per | |
| `fal-ai/flux/dev` | FLUX.1 [dev] | FLUX.1 [dev] is a 12 billion parameter flow transformer that generates high-quality images from text. It is suitable for personal and commer | 已接入|
| `fal-ai/flux/krea` | FLUX.1 Krea [dev] | FLUX.1 Krea [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux/schnell` | FLUX.1 [schnell] | FLUX.1 [schnell] is a 12 billion parameter flow transformer that generates high-quality images from text in 1 to 4 steps, suitable for perso | 已接入|
| `fal-ai/flux/srpo` | FLUX.1 SRPO [dev] | FLUX.1 SRPO [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/fooocus` | Fooocus | Default parameters with automated optimizations and quality improvements. | |
| `fal-ai/fooocus/image-prompt` | Fooocus Image Prompt | Default parameters with automated optimizations and quality improvements. | |
| `fal-ai/fooocus/inpaint` | Fooocus Inpainting | Default parameters with automated optimizations and quality improvements. | |
| `fal-ai/fooocus/upscale-or-vary` | Fooocus Upscale or Vary | Default parameters with automated optimizations and quality improvements. | |
| `fal-ai/gemini-25-flash-image` | Gemini 2.5 Flash Image | Google's famous original image generation and editing model, a.k.a Nano Banana | |
| `fal-ai/gemini-3-pro-image-preview` | Gemini 3 Pro Image Preview | Gemini 3 Pro Image (a.k.a Nano Banana Pro) is Google's state-of-the-art high-fidelity image generation and editing model | |
| `fal-ai/gemini-3.1-flash-image-preview` | Gemini 3.1 Flash Image Preview | Gemini 3.1 Flash Image (a.k.a Nano Banana 2) is Google's new state-of-the-art fast image generation and editing model | |
| `fal-ai/glm-image` | GLM Image | Create high-quality images with accurate text rendering and rich knowledge details—supports editing, style transfer, and maintaining consist | |
| `fal-ai/gpt-image-1-mini` | GPT Image 1 Mini | GPT Image 1 mini combines OpenAI's advanced language capabilities, powered by GPT-5, with GPT Image 1 Mini for efficient image generation. | |
| `fal-ai/gpt-image-1.5` | GPT-Image 1.5 | GPT Image 1.5 generates high-fidelity images with strong prompt adherence, preserving composition, lighting, and fine-grained detail. | |
| `fal-ai/gpt-image-1/text-to-image` | gpt-image-1 | OpenAI's latest image generation and editing model: gpt-1-image. | |
| `fal-ai/hidream-i1-dev` | Hidream I1 Dev | HiDream-I1 dev is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation qu | |
| `fal-ai/hidream-i1-fast` | Hidream I1 Fast | HiDream-I1 fast is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation q | |
| `fal-ai/hidream-i1-full` | Hidream I1 Full | HiDream-I1 full is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation q | |
| `fal-ai/hidream-o1-image` | Hidream O1 Image | Unified image generation with HiDream-O1-Image. Create, edit, and personalize high-resolution images up to 2K—single native model handles te | |
| `fal-ai/hidream-o1-image/dev` | Hidream O1 Image | Unified image generation with HiDream-O1-Image. Create, edit, and personalize high-resolution images up to 2K—single native model handles te | |
| `fal-ai/hunyuan-image/v2.1/text-to-image` | Hunyuan Image | Use the amazing capabilities of hunyuan image 2.1 to generate images that express the feelings of your text. | |
| `fal-ai/hunyuan-image/v3/instruct/text-to-image` | Hunyuan Image 3.0 Instruct | Instruct version of Hunyuan-Image 3.0, with internal reasoning capabilities. | |
| `fal-ai/hunyuan-image/v3/text-to-image` | Hunyuan Image | Leverage the state-of-the-art capabilities of Hunyuan Image 3.0 to generate visual content that effectively conveys the messaging of your wr | |
| `fal-ai/ideogram/custom-models/generate` | Ideogram | Train Ideogram on your photos, your style, your subject, your look, from a small set of reference images to images that feel consistently yo | |
| `fal-ai/ideogram/v2` | Ideogram V2 | Generate high-quality images, posters, and logos with Ideogram V2. Features exceptional typography handling and realistic outputs optimized | |
| `fal-ai/ideogram/v2/turbo` | Ideogram V2 Turbo | Accelerated image generation with Ideogram V2 Turbo. Create high-quality visuals, posters, and logos with enhanced speed while maintaining I | |
| `fal-ai/ideogram/v2a` | Ideogram V2A | Generate high-quality images, posters, and logos with Ideogram V2A. Features exceptional typography handling and realistic outputs optimized | |
| `fal-ai/ideogram/v2a/turbo` | Ideogram V2A Turbo | Accelerated image generation with Ideogram V2A Turbo. Create high-quality visuals, posters, and logos with enhanced speed while maintaining | |
| `fal-ai/ideogram/v3` | Ideogram Text to Image | Generate high-quality images, posters, and logos with Ideogram V3. Features exceptional typography handling and realistic outputs optimized | |
| `fal-ai/ideogram/v3/generate-transparent` | Ideogram Transparent | Generate images with transparent backgrounds using Ideogram Transparent model | |
| `fal-ai/illusion-diffusion` | Illusion Diffusion | Create illusions conditioned on image. | |
| `fal-ai/janus` | DeepSeek Janus-Pro | DeepSeek Janus-Pro is a novel text-to-image model that unifies multimodal understanding and generation through an autoregressive framework | |
| `fal-ai/kling-image/o3/text-to-image` | Kling Image | Kling Omni 3: Top-tier text-to-image with flawless consistency. | |
| `fal-ai/kling-image/v3/text-to-image` | Kling Image | Kling V3: Latest Kling Image model | |
| `fal-ai/kolors` | Kolors | Photorealistic Text-to-Image | |
| `fal-ai/krea-2/turbo` | Krea 2 Turbo | Generate high-fidelity images from text in seconds with Krea 2 Turbo, the speed-optimized open-source version of Krea 2, preserving its aest | |
| `fal-ai/krea-2/turbo/lora` | Krea 2 Text to Image Turbo LoRA | Generate high-fidelity images from text with Krea 2 using a custom-trained LoRA. Apply your LoRA weights to carry a learned subject, charact | |
| `fal-ai/krea-2/turbo/style` | Krea 2 Text to Image Turbo Style | Generate high-fidelity images from text with Krea 2 using a style reference image. Apply a reference image to guide the visual style into ne | |
| `fal-ai/longcat-image` | Longcat Image | LongCat image is a 6B parameter model excelling at multilingual text rendering, photorealism and deployment efficiency. | |
| `fal-ai/lora` | Stable Diffusion with LoRAs | Run Any Stable Diffusion model with customizable LoRA weights. | |
| `fal-ai/luma-photon` | Luma Photon | Generate images from your prompts using Luma Photon. Photon is the most creative, personalizable, and intelligent visual models for creative | |
| `fal-ai/luma-photon/flash` | Luma Photon Flash | Generate images from your prompts using Luma Photon Flash. Photon Flash is the most creative, personalizable, and intelligent visual models | |
| `fal-ai/lumina-image/v2` | Lumina Image 2 | Lumina-Image-2.0 is a 2 billion parameter flow-based diffusion transforer which features improved performance in image quality, typography, | |
| `fal-ai/minimax/image-01` | MiniMax (Hailuo AI) Text to Image | Generate high quality images from text prompts using MiniMax Image-01. Longer text prompts will result in better quality images. | |
| `fal-ai/nano-banana` | Nano Banana | Google's famous original image generation and editing model | 已接入|
| `fal-ai/nano-banana-2` | Nano Banana 2 | Nano Banana 2 is Google's new state-of-the-art fast image generation and editing model | 已接入|
| `fal-ai/nano-banana-pro` | Nano Banana Pro | Nano Banana Pro is Google's new state-of-the-art image generation and editing model | 已接入|
| `fal-ai/nucleus-image` | Nucleus Image | Nucleus-Image is a text-to-image generation model built on a sparse mixture-of-experts (MoE) diffusion transformer architecture. | |
| `fal-ai/omnigen-v1` | OmniGen v1 | OmniGen is a unified image generation model that can generate a wide range of images from multi-modal prompts. It can be used for various ta | |
| `fal-ai/omnigen-v2` | Omnigen V2 | OmniGen is a unified image generation model that can generate a wide range of images from multi-modal prompts. It can be used for various ta | |
| `fal-ai/ovis-image` | Ovis Image | Ovis-Image is a 7B text-to-image model specifically optimized for quick, high quality text rendering. | |
| `fal-ai/patina/material` | PATINA | Generate complete seamlessly tiling PBR materials including normal, roughness, basecolor, height and metalness maps up to 8K | |
| `fal-ai/pixart-sigma` | PixArt-Σ | Weak-to-Strong Training of Diffusion Transformer for 4K Text-to-Image Generation | |
| `fal-ai/playground-v25` | Playground v2.5 | State-of-the-art open-source model in aesthetic quality | |
| `fal-ai/pony-v7` | Pony V7 | Pony V7 is a finetuned text to image for superior aesthetics and prompt following. | |
| `fal-ai/qwen-image` | Qwen Image | Qwen-Image is an image generation foundation model in the Qwen series that achieves significant advances in complex text rendering and preci | |
| `fal-ai/qwen-image-2512` | Qwen Image 2512 | Qwen Image 2512 is an improved version of Qwen Image with better text rendering, finer natural textures, and more realistic human generation | |
| `fal-ai/qwen-image-2512/lora` | Qwen Image 2512 | LoRA inference endpoint for Qwen Image 2512, an improved version of Qwen Image with better text rendering, finer natural textures, and more | |
| `fal-ai/qwen-image-max/text-to-image` | Qwen Image Max | Text-to-Image endpoint for Qwen-Image-Max. Qwen Image Max improves upon the Qwen Image Plus series by enhancing the realism and naturalness | |
| `fal-ai/realistic-vision` | Realistic Vision | Generate realistic images. | |
| `fal-ai/recraft-20b` | Recraft 20b | Recraft 20b is a new and affordable text-to-image model. | |
| `fal-ai/recraft/v3/text-to-image` | Recraft V3 | Recraft V3 is a text-to-image model with the ability to generate long texts, vector art, images in brand style, and much more. As of today, | |
| `fal-ai/recraft/v4.1/pro/text-to-image` | Recraft V4.1 Text to Image Pro | Recraft V4.1 Pro pushes the V4.1 model into high-resolution territory — up to 2048×2048 and ultra-wide formats. Made for hero imagery, campa | |
| `fal-ai/recraft/v4.1/pro/text-to-vector` | Recraft V4.1 Text to Vector Pro | Recraft V4.1 Pro Vector generates large-format, fully editable SVGs with the structural clarity professional illustrators expect. Built for | |
| `fal-ai/recraft/v4.1/text-to-image` | Recraft V4.1 Text to Image | Recraft V4.1 builds on the design-first foundation of V4 with sharper prompt control and cleaner composition. Tuned for brand systems and e | |
| `fal-ai/recraft/v4.1/text-to-vector` | Recraft V4.1 Text to Vector | Recraft V4.1 Vector turns prompts into fully editable SVGs with structured layers and clean geometry. Built for logos, icons, and illustrati | |
| `fal-ai/recraft/v4.1/utility/pro/text-to-image` | Recraft V4.1 Utility Text to Image | Recraft V4.1 Utility Pro pairs the high-resolution output of V4.1 Pro with a faster, cost-efficient runtime. Designed for studios shipping l | |
| `fal-ai/recraft/v4.1/utility/text-to-image` | Recraft V4.1 Text to Image Utility | Recraft V4.1 Utility is a faster, lighter variant of V4.1 made for high-volume creative workflows. Ideal for ideation, A/B exploration, and | |
| `fal-ai/recraft/v4/pro/text-to-image` | Recraft V4 Pro | Recraft V4 was developed with designers to bring true visual taste to AI image generation. Built for brand systems and production-ready work | |
| `fal-ai/recraft/v4/pro/text-to-vector` | Recraft V4 Pro (Vector) | Recraft V4 was developed with designers to bring true visual taste to AI image generation. Built for brand systems and production-ready work | |
| `fal-ai/recraft/v4/text-to-image` | Recraft V4 | Recraft V4 was developed with designers to bring true visual taste to AI image generation. Built for brand systems and production-ready work | |
| `fal-ai/recraft/v4/text-to-vector` | Recraft V4 (Vector) | Recraft V4 was developed with designers to bring true visual taste to AI image generation. Built for brand systems and production-ready work | |
| `fal-ai/sana` | Sana | Sana can synthesize high-resolution, high-quality images with strong text-image alignment at a remarkably fast speed, with the ability to ge | |
| `fal-ai/sana/sprint` | Sana Sprint | Sana Sprint is a text-to-image model capable of generating 4K images with exceptional speed. | |
| `fal-ai/sana/v1.5/1.6b` | Sana v1.5 1.6B | Sana v1.5 1.6B is a lightweight text-to-image model that delivers 4K image generation with impressive efficiency. | |
| `fal-ai/sana/v1.5/4.8b` | Sana v1.5 4.8B | Sana v1.5 4.8B is a powerful text-to-image model that generates ultra-high quality 4K images with remarkable detail. | |
| `fal-ai/sdxl-controlnet-union` | SDXL ControlNet Union | An efficent SDXL multi-controlnet text-to-image model. | |
| `fal-ai/sensenova-u1-infographic` | Sensenova U1 Infographic | Generate Infographic Image with Sensenova U1 | |
| `fal-ai/stable-cascade` | Stable Cascade | Stable Cascade: Image generation on a smaller & cheaper latent space. | |
| `fal-ai/stable-cascade/sote-diffusion` | SoteDiffusion | Anime finetune of Würstchen V3. | |
| `fal-ai/stable-diffusion-v15` | Stable Diffusion v1.5 | Stable Diffusion v1.5 | |
| `fal-ai/stable-diffusion-v3-medium` | Stable Diffusion V3 | Stable Diffusion 3 Medium (Text to Image) is a Multimodal Diffusion Transformer (MMDiT) model that improves image quality, typography, promp | |
| `fal-ai/stable-diffusion-v35-large` | Stable Diffusion 3.5 Large | Stable Diffusion 3.5 Large is a Multimodal Diffusion Transformer (MMDiT) text-to-image model that features improved performance in image qua | |
| `fal-ai/stable-diffusion-v35-medium` | Stable Diffusion 3.5 Medium | Stable Diffusion 3.5 Medium is a Multimodal Diffusion Transformer (MMDiT) text-to-image model that features improved performance in image qu | |
| `fal-ai/vecglypher` | Vecglypher | Vector font generation with VecGlypher. Create custom glyphs from text descriptions or reference images—outputs clean SVG paths directly wit | |
| `fal-ai/vidu/q2/text-to-image` | Vidu | Use vidu Text-to-Image to turn your prompts into reality. | |
| `fal-ai/wan-25-preview/text-to-image` | Wan 2.5 Text to Image | Wan 2.5 text-to-image model. | |
| `fal-ai/wan/v2.2-5b/text-to-image` | Wan | Wan 2.2's 5B model generates high-resolution, photorealistic images with powerful prompt understanding and fine-grained visual detail | |
| `fal-ai/wan/v2.2-a14b/text-to-image` | Wan | Wan 2.2's 14B model generates high-resolution, photorealistic images with powerful prompt understanding and fine-grained visual detail | |
| `fal-ai/wan/v2.2-a14b/text-to-image/lora` | Wan v2.2 A14B Text-to-Image A14B with LoRAs | Wan 2.2's 14B model with LoRA support generates high-fidelity images with enhanced prompt alignment, style adaptability. | |
| `fal-ai/wan/v2.7/pro/text-to-image` | Wan | Generate premium-quality images from text prompts using the enhanced WAN 2.7 Pro model with superior detail and composition. | |
| `fal-ai/wan/v2.7/text-to-image` | Wan | Generate high-quality images from text prompts using the WAN 2.7 model with advanced prompt understanding and detailed output. | |
| `fal-ai/z-image/base` | Z Image Base | Z-Image is the foundation model of the Z- Image family, engineered for good quality, robust generative diversity, broad stylistic coverage, | |
| `fal-ai/z-image/base/lora` | Z Image Base Lora | LoRA endpoint for Z-Image, the foundation model of the Z- Image family. | |
| `fal-ai/z-image/turbo` | Z Image Turbo | Z-Image Turbo is a super fast text-to-image model of 6B parameters developed by Tongyi-MAI. | |
| `fal-ai/z-image/turbo/lora` | Z Image Turbo Lora | Text-to-Image endpoint with LoRA support for Z-Image Turbo, a super fast text-to-image model of 6B parameters developed by Tongyi-MAI. | |
| `fal-ai/z-image/turbo/tiling` | Z-Image Turbo Seamless Tiling | Generate seamlessly tiling photorealistic images from text using Z-Image Turbo | |
| `fal-ai/z-image/turbo/tiling/lora` | Z-Image Turbo Seamless Tiling Lora | Generate seamlessly tiling photorealistic images from text using Z-Image Turbo and custom LoRA | |
| `google/nano-banana-2-lite` | Nano Banana 2 Lite | Nano banana lite is the efficiency-focused model in the image generation family. Sub-2 second latency with cost-effective generation and edi | |
| `google/nano-banana-2.1` | Nano Banana 2.1 | Nano Banana 2.1 by Google generates images from text prompts, with output resolutions up to 4K, adjustable aspect ratios, and optional web s | |
| `google/nano-banana-lite` | Nano Banana Lite | Nano banana lite is the efficiency-focused model in the image generation family. Sub-2 second latency with cost-effective generation and edi | |
| `ideogram/v4` | Ideogram V4.0 Text to Image | Generate high-quality images, posters, and logos with Ideogram's latest V4.0q — producing crisp visuals with accurate text rendering, fine d | |
| `ideogram/v4.5` | Ideogram V4.5 Text to Image | Generate high-quality images, posters, and logos with Ideogram 4.5, with accurate text rendering and low, medium, or high quality tiers. | |
| `ideogram/v4/fast` | V4.0q [fast] | Generate high-quality images, posters, and logos with Ideogram's latest V4.0q — producing crisp visuals with accurate text rendering, fine d | |
| `ideogram/v4/instant` | V4.0q [instant] | Generate high-quality images, posters, and logos with Ideogram's latest V4.0q — producing crisp visuals with accurate text rendering, fine d | |
| `ideogram/v4/lora` | Ideogram V4.0q Text to Image (LoRA) | Generate high-quality images, posters, and logos with Ideogram's latest V4.0q using LoRA — producing crisp visuals with accurate text render | |
| `krea/v2/large/text-to-image` | Krea 2 Large | Generate high-fidelity images from text with Krea 2 Large, supporting aspect ratio, creativity, seed controls, and optional style references | |
| `krea/v2/medium/text-to-image` | Krea 2 Medium | Generate high-quality images from text with Krea 2 Medium, supporting aspect ratio, creativity controls, seeds, and optional style reference | |
| `krea/v2/medium/turbo/text-to-image` | Krea 2 Medium Text to Image Turbo | Generate high-fidelity images extremely fast from text with Krea 2 Medium Turbo, supporting aspect ratio, creativity, seed controls, and opt | |
| `luma/agent/uni-1/v1/max` | Luma Uni-1 Text to Image Max | Luma Uni-1 Max generates a single image at the model's highest fidelity, delivering richer detail and stronger prompt adherence than the bas | |
| `luma/agent/uni-1/v1/text-to-image` | Luma Uni-1 Text to Image | Luma Uni-1 turns a text prompt into a single high-fidelity image, with control over aspect ratio and visual style, plus optional web-sourced | |
| `meta/muse-image/text-to-image` | Meta Muse Image Text to Image | Meta's Muse Image model has faithful instruction-following and exceptional visual fidelity, with fine details like text, plots, and QR codes | |
| `microsoft/mai-image-2.5` | Mai Image 2.5 Text to Image | MAI-Image-2.5 is Microsoft's photorealistic image generation and editing model that turns text prompts or uploaded images into high-quality, | |
| `microsoft/mai-image-2.5-pro` | MAI Image 2.5 Pro (Text to Image) | Generate high-fidelity, design-ready images with precise typography, strong prompt alignment, and rich visual detail using Microsoft's flags | |
| `nvidia/cosmos-3-super/text-to-image` | Cosmos 3 Super | Cosmos3 is a collection of Omnimodal world models capable of generating dynamic, high-quality video, image, audio, and action commands from | |
| `openai/gpt-image-2` | GPT Image 2 API | GPT Image 2, OpenAI's latest image model, is capable of creating extremely detailed images with fine typography. | |
| `openai/gpt-image-2.5/flare/text-to-image` | GPT Image 2.5 Flare Text to Image | OpenAI's default image model for most applications. Fast, high-quality generation with natural lighting, rich textures, and support for comp | |
| `openai/gpt-image-2.5/sunburst/text-to-image` | GPT Image 2.5 Sunburst Text to Image | OpenAI's precision-focused image model, built for premium visual work, extra fidelity on intricate detail, in exchange for longer generation | |
| `recraft/v4.1/flash/text-to-image` | Recraft V4.1 Flash Text to Image | Recraft V4.1 Flash generates raster images from text prompts, including photography, illustrations, and mixed-media compositions, with contr | |
| `recraft/v4/style/pro/text-to-image` | Recraft V4 Styles Pro Text to Image | Generates raster images that hold a consistent style, from either a saved style ID or reference images attached directly. | |
| `recraft/v4/style/pro/text-to-vector` | Recraft V4 Styles Pro Text to Vector | Generates vector images that hold a consistent style, from either a saved style ID or reference images attached directly. | |
| `recraft/v4/style/text-to-image` | Recraft V4 Styles Text to Image | Generates raster images that hold a consistent style, from either a saved style ID or reference images attached directly. | |
| `recraft/v4/style/text-to-vector` | Recraft V4 Styles Text to Vector | Generates vector images that hold a consistent style, from either a saved style ID or reference images attached directly. | |
| `rundiffusion-fal/juggernaut-flux-lora` | Juggernaut Flux Base LoRA | Juggernaut Base Flux LoRA by RunDiffusion is a drop-in replacement for Flux [Dev] that delivers sharper details, richer colors, and enhanced | |
| `rundiffusion-fal/juggernaut-flux/base` | Juggernaut Flux Base | Juggernaut Base Flux by RunDiffusion is a drop-in replacement for Flux [Dev] that delivers sharper details, richer colors, and enhanced real | |
| `rundiffusion-fal/juggernaut-flux/lightning` | Juggernaut Flux Lightning | Juggernaut Lightning Flux by RunDiffusion provides blazing-fast, high-quality images rendered at five times the speed of Flux. Perfect for m | |
| `rundiffusion-fal/juggernaut-flux/pro` | Juggernaut Flux Pro | Juggernaut Pro Flux by RunDiffusion is the flagship Juggernaut model rivaling some of the most advanced image models available, often surpas | |
| `rundiffusion-fal/rundiffusion-photo-flux` | Rundiffusion Photo Flux | RunDiffusion Photo Flux provides insane realism. With this enhancer, textures and skin details burst to life, turning your favorite prompts | |
| `wan/v2.6/text-to-image` | Wan v2.6 Text to Image | Wan 2.6 text-to-image model. | |
| `xai/grok-imagine-image` | Grok Imagine Image | Generate highly aesthetic images with xAI's Grok Imagine Image generation model. | |
| `xai/grok-imagine-image/quality/text-to-image` | Grok Imagine Image | Grok Imagine Pro is an advanced AI model from xAI that creates high-quality visuals from text prompts and allows you to edit or analyze exis | |
| `xai/grok-imagine-image/v2.0/text-to-image` | Grok Imagine Image 2.0 | Generate images from text using xAi's Grok Imagine 2.0 model. | |

## image-to-image（394）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/qwen-image-3/edit` | Qwen Image 3 Image Editing | Edits images from one to three reference images and a natural-language instruction, preserving key details such as facial features and ident | |
| `blackforestlabs/flux-3/edit-image` | Flux 3 Image | FLUX 3 Image Edit from Black Forest Labs makes precise local edits without changing the rest of the image, and combines up to 10 references | |
| `bria/embed-product` | Embed Product | Seamlessly embed products into any scene with pixel-perfect control, automatic perspective, and natural lighting. Trained on licensed data - | |
| `bria/extract-object` | Extract Object | Bria Extract Object uses text prompts to isolate a selected object from an image and return it as an RGBA PNG with a transparent background. | |
| `bria/fibo-edit-1.5/edit` | Fibo Edit 1.5 Image Editing | Commercially safe, multi-reference image editing model. Follows natural language instructions alone or with up to 4 reference images, purpos | |
| `bria/fibo-edit-1.5/product-holding` | Bria Product Holding (FIBO-Edit-1.5) | Bria Product Holding edits a person photo to show the subject holding or carrying a product, using one to three product reference images and | |
| `bria/fibo-edit-1.5/virtual-try-on` | Bria Virtual Try-On (FIBO-Edit-1.5) | Bria Virtual Try-On edits a person photo to show the subject wearing garments or accessories from one to three reference images, guided by o | |
| `bria/fibo-edit/add_object_by_text` | Fibo Edit [Add Object by Text] | Precisely insert new objects into images with structured spatial commands. Context-aware, high-quality editing with seamless blending. Train | |
| `bria/fibo-edit/blend` | Fibo Edit [Blend] | image composition model. Combine and blend multiple image parts into complex compositions through natural language and sequential editing. | |
| `bria/fibo-edit/colorize` | Fibo Edit [Colorize] | Image colorization and color-grading model. Bring color to black-and-white photos or apply curated color treatments using simple style-based | |
| `bria/fibo-edit/edit` | Fibo Edit | High-fidelity image editing model with state-of-the-art controllability. Combines JSON + Mask + Image for precise, fine-grained edits ideal | |
| `bria/fibo-edit/erase_by_text` | Fibo Edit [Erase by Text] | Remove unwanted objects from images with a text prompt - fast, precise editing that seamlessly blends results. Built for production scale an | |
| `bria/fibo-edit/relight` | Fibo Edit [Relight] | Precise, controllable photo re-lighting with structured text inputs. Apply natural lighting styles, soften harsh shadows, and transform scen | |
| `bria/fibo-edit/replace_object_by_text` | Fibo Edit [Replace Object by Text] | Replace any object in an image using plain language with fine-grained, precise edits and strong prompt adherence. Trained on licensed data f | |
| `bria/fibo-edit/reseason` | Fibo Edit [Reseason] | Transform the season or weather of an image - summer to winter, sunny to rainy - with realistic atmosphere and lighting. Trained exclusively | |
| `bria/fibo-edit/restore` | Fibo Edit [Restore] | Photo restoration model that automatically denoises, deblurs, and enhances old or damaged photos - removes imperfections while preserving or | |
| `bria/fibo-edit/restyle` | Fibo Edit [Restyle] | Production-grade style transfer that maps photos to distinct artistic styles using curated, brand-safe presets. Trained exclusively on licen | |
| `bria/fibo-edit/rewrite_text` | Fibo Edit [Rewrite Text] | Precisely rewrite text inside images while preserving typography, fonts, and layout. High-quality, brand-safe edits trained exclusively on l | |
| `bria/fibo-edit/sketch_to_colored_image` | Fibo Edit [Sketch to Image] | Convert line drawings and sketches into photorealistic, fully colored images with preserved structure. Trained exclusively on licensed data | |
| `bria/genfill/v2` | Genfill | The GenFill Route enables the generation of objects by prompt in a specific region of an image. You can define the area for object generatio | |
| `bria/increase-resolution` | Bria Increase Resolution: Upscale Images up to 4x Without Losing Detail \| fal | Upscale any image 2x or 4x, up to 8192×8192, with Bria Increase Resolution. Preserves the original content — no regeneration, no altered det | |
| `bria/product-dimensions` | Bria Product Dimensions | Bria Product Dimensions turns one product photo and its measurements into a marketplace-ready dimension image with callout lines, labels, an | |
| `bria/replace-background` | Replace Background | Generate professional, eCommerce-ready product shots by replacing backgrounds with realistic lighting and accurate perspective from a simple | |
| `bria/upscale/creative` | Upscale | Professional-grade creative upscaler that doubles resolution up to 10MP, regenerating sharper textures, refined details, and cleaner faces. | |
| `bytedance/seedream/v5/flash/edit` | Seedream | Seedream 5.0 Flash is a fast image generation and editing model, built for workflows where speed and budget matter. | |
| `bytedance/seedream/v5/flash/layerize` | Seedream | Seedream 5.0 Flash is a fast image generation and editing model, built for workflows where speed and budget matter. | |
| `bytedance/seedream/v5/lite/edit` | Seedream | Image editing endpoint for the fast Lite version of Seedream 5.0, supporting high quality intelligent image editing with multiple inputs. | |
| `bytedance/seedream/v5/pro/edit` | Seedream 5.0 Pro Image Editing | Seedream 5.0 Pro is grounded, region-precise image editing model that changes one element while keeping the rest of the frame intact with la | |
| `bytedance/seedream/v5/pro/layerize` | Seedream 5.0 Pro Layerize | Splits a finished image into independent, editable transparent-PNG layers — background plus separate elements, from a text description, retu | |
| `clarityai/crystal-upscaler` | Crystal Upscaler | An advanced image enhancement tool designed specifically for facial details and portrait photography, utilizing Clarity AI's upscaling techn | |
| `fal-ai/aura-sr` | AuraSR | Upscale your images with AuraSR. | |
| `fal-ai/bagel/edit` | Bagel | Bagel is a 7B parameter multimodal model from Bytedance-Seed that can generate both images and text. | |
| `fal-ai/ben/v2/image` | ben-v2-image | A fast and high quality model for image background removal. | |
| `fal-ai/bernini-r/edit-image` | Bernini-R Edit Image | Edit any image with a natural-language instruction using Bernini-R, changing the weather, materials, objects, or style while preserving the | |
| `fal-ai/birefnet` | Birefnet Background Removal | bilateral reference framework (BiRefNet) for high-resolution dichotomous image segmentation (DIS) | 已接入|
| `fal-ai/birefnet/v2` | Birefnet Background Removal V2 | bilateral reference framework (BiRefNet) for high-resolution dichotomous image segmentation (DIS) | |
| `fal-ai/boogu-image/edit` | Boogu Image | Image To Image Model using Boogu-Image | |
| `fal-ai/bria/background/remove` | Bria RMBG 2.0 | Bria RMBG 2.0 enables seamless removal of backgrounds from images, ideal for professional editing tasks. Trained exclusively on licensed dat | |
| `fal-ai/bria/background/replace` | Bria Background Replace | Bria Background Replace allows for efficient swapping of backgrounds in images via text prompts or reference image, delivering realistic and | |
| `fal-ai/bria/eraser` | Bria Eraser | Bria Eraser enables precise removal of unwanted objects from images while maintaining high-quality outputs. Trained exclusively on licensed | |
| `fal-ai/bria/expand` | Bria Expand Image | Bria Expand expands images beyond their borders in high quality. Trained exclusively on licensed data for safe and risk-free commercial use. | |
| `fal-ai/bria/genfill` | Bria GenFill | Bria GenFill enables high-quality object addition or visual transformation. Trained exclusively on licensed data for safe and risk-free comm | |
| `fal-ai/bria/product-shot` | Bria Product Shot | Place any product in any scenery with just a prompt or reference image while maintaining high integrity of the product. Trained exclusively | |
| `fal-ai/bria/reimagine` | Bria | Structure Reference allows generating new images while preserving the structure of an input image, guided by text prompts. Perfect for trans | |
| `fal-ai/bytedance/seedream/v4.5/edit` | Bytedance Seedream V4.5 Edit | A new-generation image creation model ByteDance, Seedream 4.5 integrates image generation and image editing capabilities into a single, unif | 已接入|
| `fal-ai/bytedance/seedream/v4/edit` | Bytedance Seedream V4 Edit | A new-generation image creation model ByteDance, Seedream 4.0 integrates image generation and image editing capabilities into a single, unif | 已接入|
| `fal-ai/cartoonify` | Cartoonify | Transform images into 3D cartoon artwork using an AI model that applies cartoon stylization while preserving the original image's compositio | |
| `fal-ai/cat-vton` | try-on | Image based high quality Virtual Try-On | |
| `fal-ai/chrono-edit` | Chrono Edit | NVIDIA's Logically Consistent and Physics-Aware Image Editing Model | |
| `fal-ai/chrono-edit-lora` | Chrono Edit Lora | LoRA endpoint for the Chrono Edit model. | |
| `fal-ai/chrono-edit-lora-gallery/paintbrush` | Chrono Edit Lora Gallery | You can make edits simply by drawing a quick sketch on the input image. | |
| `fal-ai/chrono-edit-lora-gallery/upscaler` | Chrono Edit Lora Gallery | Upscales and cleans up the image. | |
| `fal-ai/clarity-upscaler` | Clarity Upscaler | Clarity upscaler for upscaling images with high very fidelity. | |
| `fal-ai/codeformer` | CodeFormer | Fix distorted or blurred photos of people with CodeFormer. | |
| `fal-ai/control-light` | ControlLight | ControlLight is a LoRA fine-tune of FLUX.2 [klein] 9B that enhances low-light images while preserving scene structure and fine details, with | |
| `fal-ai/creative-upscaler` | Creative Upscaler | Create creative upscaled images. | |
| `fal-ai/ddcolor` | DDColor | Bring colors into old or new black and white photos with DDColor. | |
| `fal-ai/docres` | DocRes | Enhance low-resolution, blur, shadowed documents with the superior quality of docres for sharper, clearer results. | |
| `fal-ai/docres/dewarp` | DocRes-dewarp | Enhance wraped, folded documents with the superior quality of docres for sharper, clearer results. | |
| `fal-ai/drct-super-resolution` | DRCT-Super-Resolution | Upscale your images with DRCT-Super-Resolution. | |
| `fal-ai/dreamomni2/edit` | DreamOmni2 | DreamOmni2 is a unified multimodal model for text and image guided image editing. | |
| `fal-ai/dwpose` | DWPose Pose Prediction | Predict poses from images. | |
| `fal-ai/emu-3.5-image/edit-image` | Emu 3.5 Image | Edit images with a text prompt using Emu 3.5 Image | |
| `fal-ai/esrgan` | Upscale Images | Upscale images by a given factor. | |
| `fal-ai/evf-sam` | EVF-SAM2 Segmentation | EVF-SAM2 combines natural language understanding with advanced segmentation capabilities, allowing you to precisely mask image regions using | |
| `fal-ai/fashn/tryon/v1.5` | FASHN Virtual Try-On V1.5 | FASHN v1.5 delivers precise virtual try-on capabilities, accurately rendering garment details like text and patterns at 576x864 resolution f | |
| `fal-ai/fashn/tryon/v1.6` | FASHN Virtual Try-On V1.6 | FASHN v1.6 delivers precise virtual try-on capabilities, accurately rendering garment details like text and patterns at 864x1296 resolution | |
| `fal-ai/fast-lcm-diffusion/image-to-image` | Latent Consistency Models (v1.5/XL) | Run SDXL at the speed of light | |
| `fal-ai/fast-lcm-diffusion/inpainting` | Latent Consistency Models (v1.5/XL) | Run SDXL at the speed of light | |
| `fal-ai/fast-lightning-sdxl/image-to-image` | Stable Diffusion XL Lightning | Run SDXL at the speed of light | |
| `fal-ai/fast-lightning-sdxl/inpainting` | Stable Diffusion XL Lightning | Run SDXL at the speed of light | |
| `fal-ai/fast-sdxl-controlnet-canny/image-to-image` | ControlNet SDXL | Generate Images with ControlNet. | |
| `fal-ai/fast-sdxl-controlnet-canny/inpainting` | ControlNet SDXL | Generate Images with ControlNet. | |
| `fal-ai/fast-sdxl/image-to-image` | Stable Diffusion XL | Run SDXL at the speed of light | |
| `fal-ai/fast-sdxl/inpainting` | Stable Diffusion XL | Run SDXL at the speed of light | |
| `fal-ai/feynobg` | Feynobg Background Remover | FeyNobg is a state of the art AI model for background removal from feyninc | |
| `fal-ai/ffmpeg-api/extract-frame` | Ffmpeg Api | ffmpeg endpoint for first, middle and last frame extraction from videos | |
| `fal-ai/film` | FILM | Interpolate images with FILM - Frame Interpolation for Large Motion | |
| `fal-ai/firered-image-edit` | Firered Image Edit | FireRed Image Edit is FireRed's state of the art open source editing model, re-trained from Qwen Image Edit 2509. | |
| `fal-ai/firered-image-edit-v1.1` | Firered Image Edit V1.1 | FireRed Image Edit v1.1 is an updated version of FireRed Image Edit, with improved image editing capabilities. | |
| `fal-ai/florence-2-large/caption-to-phrase-grounding` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/dense-region-caption` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/object-detection` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/ocr-with-region` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/open-vocabulary-detection` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/referring-expression-segmentation` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/region-proposal` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/region-to-segmentation` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/flowedit` | Flow-Edit | The model provides you high quality image editing capabilities. | |
| `fal-ai/flux-1/dev/image-to-image` | FLUX.1 [dev] | FLUX.1 [dev] is a 12 billion parameter flow transformer that generates high-quality images from text. It is suitable for personal and commer | |
| `fal-ai/flux-1/dev/redux` | FLUX.1 [dev] Redux | FLUX.1 [dev] Redux is a high-performance endpoint for the FLUX.1 [dev] model that enables rapid transformation of existing images, deliverin | |
| `fal-ai/flux-1/krea/image-to-image` | FLUX.1 Krea [dev] | FLUX.1 Krea [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux-1/krea/redux` | FLUX.1 Krea [dev] Redux | FLUX.1 Krea [dev] Redux is a high-performance endpoint for the FLUX.1 Krea [dev] model that enables rapid transformation of existing images, | |
| `fal-ai/flux-1/schnell/redux` | FLUX.1 [schnell] Redux | FLUX.1 [schnell] Redux is a high-performance endpoint for the FLUX.1 [schnell] model that enables rapid transformation of existing images, d | |
| `fal-ai/flux-1/srpo/image-to-image` | FLUX.1 SRPO [dev] | FLUX.1 SRPO [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux-2-flex/edit` | Flux 2 Flex | Image editing with FLUX.2 [flex] from Black Forest Labs. Supports multi-reference editing with customizable inference steps and enhanced tex | |
| `fal-ai/flux-2-lora-gallery/add-background` | Flux 2 Lora Gallery | Add a background to images with white/clean background | |
| `fal-ai/flux-2-lora-gallery/apartment-staging` | Flux 2 Lora Gallery | Virtually furnishes an empty apartment | |
| `fal-ai/flux-2-lora-gallery/face-to-full-portrait` | Flux 2 Lora Gallery | Extends a face into a full body portrait | |
| `fal-ai/flux-2-lora-gallery/multiple-angles` | Flux 2 Lora Gallery | Generates same object from different angles (azimuth/elevation) | |
| `fal-ai/flux-2-lora-gallery/virtual-tryon` | Flux 2 Lora Gallery | Virtual clothing try-on (2 images: person + garment) | |
| `fal-ai/flux-2-max/edit` | Flux 2 Max | FLUX.2 [max] delivers state-of-the-art image generation and advanced image editing with exceptional realism, precision, and consistency. | |
| `fal-ai/flux-2-pro/edit` | FLUX 2 Pro Edit | Text-to-image generation with FLUX.2 [pro] from Black Forest Labs. Optimized for maximum quality, exceptional photorealism and artistic imag | |
| `fal-ai/flux-2-pro/outpaint` | FLUX 2 Pro Outpaint | Outpainting generation with FLUX.2 [pro] from Black Forest Labs. Optimized for maximum quality, exceptional photorealism and artistic images | |
| `fal-ai/flux-2/edit` | FLUX 2 Edit | Image-to-image editing with FLUX.2 [dev] from Black Forest Labs. Precise modifications using natural language descriptions and hex color con | |
| `fal-ai/flux-2/flash/edit` | FLUX 2 Flash Edit | Image-to-image editing with FLUX.2 [dev] from Black Forest Labs. Precise modifications using natural language descriptions and hex color con | |
| `fal-ai/flux-2/klein/4b/base/edit` | FLUX.2 [klein] 4B Base | Image-to-image editing with FLUX.2 [klein] 4B Base from Black Forest Labs. Precise modifications using natural language descriptions and hex | |
| `fal-ai/flux-2/klein/4b/base/edit/lora` | FLUX.2 [klein] 4B Base LoRA | Image-to-image editing with LoRA support for FLUX.2 [klein] 4B Base from Black Forest Labs. Specialized style transfer and domain-specific m | |
| `fal-ai/flux-2/klein/4b/edit` | FLUX.2 [klein] 4B | Image-to-image editing with FLUX.2 [klein] 4B from Black Forest Labs. Precise modifications using natural language descriptions and hex colo | |
| `fal-ai/flux-2/klein/4b/edit/lora` | FLUX.2 [klein] 4B LoRA | Image-to-image editing with FLUX.2 [klein] 4B from Black Forest Labs and custom LoRA. Precise modifications using natural language descripti | |
| `fal-ai/flux-2/klein/9b/base/edit` | FLUX.2 [klein] 9B Base | Image-to-image editing with Flux 2 [klein] 9B Base from Black Forest Labs. Precise modifications using natural language descriptions and hex | |
| `fal-ai/flux-2/klein/9b/base/edit/lora` | FLUX.2 [klein] 9B Base LoRA | Image-to-image editing with LoRA support for FLUX.2 [klein] 9B Base from Black Forest Labs. Specialized style transfer and domain-specific m | |
| `fal-ai/flux-2/klein/9b/edit` | FLUX.2 [klein] 9B | Image-to-image editing with FLUX.2 [klein] 9B from Black Forest Labs. Precise modifications using natural language descriptions and hex colo | |
| `fal-ai/flux-2/klein/9b/edit/lora` | FLUX.2 [klein] 9B LoRA | Image-to-image editing with FLUX.2 [klein] 9B from Black Forest Labs and custom LoRA. Precise modifications using natural language descripti | |
| `fal-ai/flux-2/klein/realtime` | Flux 2 [klein] Realtime | Realtime generation with FLUX.2 [klein] from Black Forest Labs. | |
| `fal-ai/flux-2/lora/edit` | FLUX 2 Lora Edit | Image-to-image editing with LoRA support for FLUX.2 [dev] from Black Forest Labs. Specialized style transfer and domain-specific modificatio | |
| `fal-ai/flux-2/turbo/edit` | FLUX 2 Turbo Edit | Image-to-image editing with FLUX.2 [dev] from Black Forest Labs. Precise modifications using natural language descriptions and hex color con | |
| `fal-ai/flux-control-lora-canny/image-to-image` | FLUX.1 [dev] Control LoRA Canny | FLUX Control LoRA Canny is a high-performance endpoint that uses a control image using a Canny edge map to transfer structure to the generat | |
| `fal-ai/flux-control-lora-depth/image-to-image` | FLUX.1 [dev] Control LoRA Depth | FLUX Control LoRA Depth is a high-performance endpoint that uses a control image using a depth map to transfer structure to the generated im | |
| `fal-ai/flux-general/differential-diffusion` | FLUX.1 [dev] with Controlnets and Loras | A specialized FLUX endpoint combining differential diffusion control with LoRA, ControlNet, and IP-Adapter support, enabling precise, region | |
| `fal-ai/flux-general/image-to-image` | FLUX.1 [dev] with Controlnets and Loras | FLUX General Image-to-Image is a versatile endpoint that transforms existing images with support for LoRA, ControlNet, and IP-Adapter extens | |
| `fal-ai/flux-general/inpainting` | FLUX.1 [dev] with Controlnets and Loras | FLUX General Inpainting is a versatile endpoint that enables precise image editing and completion, supporting multiple AI extensions includi | |
| `fal-ai/flux-general/rf-inversion` | FLUX.1 [dev] with Controlnets and Loras | A general purpose endpoint for the FLUX.1 [dev] model, implementing the RF-Inversion pipeline. This can be used to edit a reference image ba | |
| `fal-ai/flux-kontext-lora` | Flux Kontext Lora | Fast endpoint for the FLUX.1 Kontext [dev] model with LoRA support, enabling rapid and high-quality image editing using pre-trained LoRA ada | |
| `fal-ai/flux-kontext-lora/inpaint` | Flux Kontext Lora | Fast inpainting endpoint for the FLUX.1 Kontext [dev] model with LoRA support, enabling rapid and high-quality image inpainting with referen | |
| `fal-ai/flux-kontext/dev` | FLUX.1 Kontext [dev] | Frontier image editing model. | |
| `fal-ai/flux-krea-lora/image-to-image` | FLUX.1 Krea [dev] with LoRAs | FLUX LoRA Image-to-Image is a high-performance endpoint that transforms existing images using FLUX models, leveraging LoRA adaptations to en | |
| `fal-ai/flux-krea-lora/inpainting` | FLUX.1 Krea [dev] Inpainting with LoRAs | Super fast endpoint for the FLUX.1 [dev] inpainting model with LoRA support, enabling rapid and high-quality image inpaingting using pre-tra | |
| `fal-ai/flux-lora-canny` | FLUX.1 [dev] Canny with LoRAs | Utilize Flux.1 [dev] Controlnet to generate high-quality images with precise control over composition, style, and structure through advanced | |
| `fal-ai/flux-lora-depth` | FLUX.1 [dev] Depth with LoRAs | Generate high-quality images from depth maps using Flux.1 [dev] depth estimation model. The model produces accurate depth representations fo | |
| `fal-ai/flux-lora-fill` | FLUX.1 [dev] Fill with LoRAs | FLUX.1 [dev] Fill is a high-performance endpoint for the FLUX.1 [pro] model that enables rapid transformation of existing images, delivering | |
| `fal-ai/flux-lora/image-to-image` | FLUX.1 [dev] with LoRAs | FLUX LoRA Image-to-Image is a high-performance endpoint that transforms existing images using FLUX models, leveraging LoRA adaptations to en | |
| `fal-ai/flux-pro/kontext` | FLUX.1 Kontext [pro] | FLUX.1 Kontext [pro] handles both text and reference images as inputs, seamlessly enabling targeted, local edits and complex transformations | |
| `fal-ai/flux-pro/kontext/max` | FLUX.1 Kontext [max] | FLUX.1 Kontext [max] is a model with greatly improved prompt adherence and typography generation meet premium consistency for editing withou | |
| `fal-ai/flux-pro/kontext/max/multi` | FLUX.1 Kontext [max] | Experimental version of FLUX.1 Kontext [max] with multi image handling capabilities | |
| `fal-ai/flux-pro/kontext/multi` | FLUX.1 Kontext [pro] | Experimental version of FLUX.1 Kontext [pro] with multi image handling capabilities | |
| `fal-ai/flux-pro/v1.1-ultra/redux` | FLUX1.1 [pro] ultra Redux | FLUX1.1 [pro] ultra Redux is a high-performance endpoint for the FLUX1.1 [pro] model that enables rapid transformation of existing images, d | |
| `fal-ai/flux-pro/v1.1/redux` | FLUX1.1 [pro] Redux | FLUX1.1 [pro] Redux is a high-performance endpoint for the FLUX1.1 [pro] model that enables rapid transformation of existing images, deliver | |
| `fal-ai/flux-pro/v1/erase` | Flux Pro Erase | Latest object erasing model from Black Forest Labs. Remove undesired objects, texts from images. | |
| `fal-ai/flux-pro/v1/fill` | FLUX.1 [pro] Fill | FLUX.1 [pro] Fill is a high-performance endpoint for the FLUX.1 [pro] model that enables rapid transformation of existing images, delivering | 已接入|
| `fal-ai/flux-pro/v1/fill-finetuned` | FLUX.1 [pro] Fill Fine-tuned | FLUX.1 [pro] Fill Fine-tuned is a high-performance endpoint for the FLUX.1 [pro] model with a fine-tuned LoRA that enables rapid transformat | |
| `fal-ai/flux-pro/v1/vto` | FLUX Virtual Try-On | Generate virtual try-on results from a person image plus one or more garment references. | |
| `fal-ai/flux-pulid` | PuLID Flux | An endpoint for personalized image generation using Flux as per given description. | |
| `fal-ai/flux-vision-upscaler` | Flux Vision Upscaler | Flux Vision Upscaler for magnify/upscaling images with high fidelity and creativity. | |
| `fal-ai/flux/dev/image-to-image` | FLUX.1 [dev] | FLUX.1 Image-to-Image is a high-performance endpoint for the FLUX.1 [dev] model that enables rapid transformation of existing images, delive | |
| `fal-ai/flux/dev/redux` | FLUX.1 [dev] Redux | FLUX.1 [dev] Redux is a high-performance endpoint for the FLUX.1 [dev] model that enables rapid transformation of existing images, deliverin | |
| `fal-ai/flux/krea/image-to-image` | FLUX.1 Krea [dev] | FLUX.1 Krea [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/flux/krea/redux` | FLUX.1 Krea [dev] Redux | FLUX.1 Krea [dev] Redux is a high-performance endpoint for the FLUX.1 Krea [dev] model that enables rapid transformation of existing images, | |
| `fal-ai/flux/schnell/redux` | FLUX.1 [schnell] Redux | FLUX.1 [schnell] Redux is a high-performance endpoint for the FLUX.1 [schnell] model that enables rapid transformation of existing images, d | |
| `fal-ai/flux/srpo/image-to-image` | FLUX.1 SRPO [dev] | FLUX.1 SRPO [dev] is a 12 billion parameter flow transformer that generates high-quality images from text with incredible aesthetics. It is | |
| `fal-ai/gemini-25-flash-image/edit` | Gemini 2.5 Flash Image | Google's famous original image generation and editing model, a.k.a Nano Banana | |
| `fal-ai/gemini-3-pro-image-preview/edit` | Gemini 3 Pro Image Preview | Gemini 3 Pro Image (a.k.a Nano Banana Pro) is Google's state-of-the-art high-fidelity image generation and editing model | |
| `fal-ai/gemini-3.1-flash-image-preview/edit` | Gemini 3.1 Flash Image Preview | Gemini 3.1 Flash Image (a.k.a. Nano Banana 2) is Google's new state-of-the-art fast image generation and editing model | |
| `fal-ai/ghiblify` | Ghiblify Images | Reimagine and transform your ordinary photos into enchanting Studio Ghibli style artwork | |
| `fal-ai/glm-image/image-to-image` | Glm Image | Create high-quality images with accurate text rendering and rich knowledge details—supports editing, style transfer, and maintaining consist | |
| `fal-ai/gpt-image-1-mini/edit` | GPT Image 1 Mini | GPT Image 1 mini combines OpenAI's advanced language capabilities, powered by GPT-5, with GPT Image 1 Mini for efficient image generation. | |
| `fal-ai/gpt-image-1.5/edit` | GPT-Image 1.5 | GPT Image 1.5 generates high-fidelity images with strong prompt adherence, preserving composition, lighting, and fine-grained detail. | |
| `fal-ai/gpt-image-1/edit-image` | gpt-image-1 | OpenAI's latest image generation and editing model: gpt-1-image. | |
| `fal-ai/hidream-i1-full/image-to-image` | Hidream I1 Full | HiDream-I1 full is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation q | |
| `fal-ai/hidream-o1-image/dev/edit` | Hidream O1 Image | Unified image generation with HiDream-O1-Image. Create, edit, and personalize high-resolution images up to 2K—single native model handles te | |
| `fal-ai/hidream-o1-image/edit` | Hidream O1 Image | Unified image generation with HiDream-O1-Image. Create, edit, and personalize high-resolution images up to 2K—single native model handles te | |
| `fal-ai/hunyuan-image/v3/instruct/edit` | Hunyuan Image | Image editing endpoint for Hunyuan Image 3.0 Instruct. | |
| `fal-ai/hunyuan_world` | Hunyuan World | Hunyuan World 1.0 turns a single image into a panorama or a 3D world. It creates realistic scenes from the image, allowing you to explore an | |
| `fal-ai/hy-wu-edit` | Hy Wu Edit | Image editing with HY-WU. Transfer outfits, swap faces, and blend textures instantly—no finetuning needed, just describe what you want and p | |
| `fal-ai/iclight-v2` | IC-Light-v2 for Image Relighting | An endpoint for re-lighting photos and changing their backgrounds per a given description | |
| `fal-ai/ideogram/character` | Ideogram V3 Character | Generate consistent character appearances across multiple images. Maintain facial features, proportions, and distinctive traits for cohesive | |
| `fal-ai/ideogram/character/edit` | Ideogram V3 Character Edit | Modify consistent characters while preserving their core identity. Edit poses, expressions, or clothing without losing recognizable characte | |
| `fal-ai/ideogram/character/remix` | Ideogram V3 Character Remix | Transform your consistent character into different art styles, settings, or scenarios while maintaining their distinctive appearance and ide | |
| `fal-ai/ideogram/object-removal` | Ideogram Object Removal | Prompt-free object removal from an image and mask, erasing objects with their shadows and reflections and reconstructing the scene cleanly. | |
| `fal-ai/ideogram/remove-background` | Ideogram Remove Background | Remove backgrounds from existing images with Ideogram's remove background feature. Isolate subjects cleanly for compositing and creative reu | |
| `fal-ai/ideogram/upscale` | Ideogram Upscale | Ideogram Upscale enhances the resolution of the reference image by up to 2X and might enhance the reference image too. Optionally refine out | |
| `fal-ai/ideogram/v2/edit` | Ideogram V2 Edit | Transform existing images with Ideogram V2's editing capabilities. Modify, adjust, and refine images while maintaining high fidelity and rea | |
| `fal-ai/ideogram/v2/remix` | Ideogram V2 Remix | Reimagine existing images with Ideogram V2's remix feature. Create variations and adaptations while preserving core elements and adding new | |
| `fal-ai/ideogram/v2/turbo/edit` | Ideogram V2 Turbo Edit | Edit images faster with Ideogram V2 Turbo. Quick modifications and adjustments while preserving the high-quality standards and realistic out | |
| `fal-ai/ideogram/v2/turbo/remix` | Ideogram V2 Turbo Remix | Rapidly create image variations with Ideogram V2 Turbo Remix. Fast and efficient reimagining of existing images while maintaining creative c | |
| `fal-ai/ideogram/v2a/remix` | Ideogram V2A Remix | Create variations of existing images with Ideogram V2A Remix while maintaining creative control through prompt guidance. | |
| `fal-ai/ideogram/v2a/turbo/remix` | Ideogram V2A Turbo Remix | Rapidly create image variations with Ideogram V2A Turbo Remix. Fast and efficient reimagining of existing images while maintaining creative | |
| `fal-ai/ideogram/v3/edit` | Ideogram V3 Edit | Transform existing images with Ideogram V3's editing capabilities. Modify, adjust, and refine images while maintaining high fidelity and rea | |
| `fal-ai/ideogram/v3/layerize-text` | Ideogram | Ideogram Layerize takes an existing flat graphic, removes text, and returns structured text containers you can edit/recompose in html or jso | |
| `fal-ai/ideogram/v3/reframe` | Ideogram | Extend existing images with Ideogram V3's reframe feature. Create expanded versions and adaptations while preserving main image and adding n | |
| `fal-ai/ideogram/v3/remix` | Ideogram | Reimagine existing images with Ideogram V3's remix feature. Create variations and adaptations while preserving core elements and adding new | |
| `fal-ai/ideogram/v3/replace-background` | Ideogram Replace Background | Replace backgrounds existing images with Ideogram V3's replace background feature. Create variations and adaptations while preserving core e | |
| `fal-ai/image-apps-v2/age-modify` | Age Modify | Modify a face to look younger or older while keeping identity realistic. | |
| `fal-ai/image-apps-v2/city-teleport` | City Teleport | Place a person’s photo into iconic cities worldwide. | |
| `fal-ai/image-apps-v2/expression-change` | Expression Change | Change facial expressions in photos with realistic results. | |
| `fal-ai/image-apps-v2/hair-change` | Hair Change | Change hairstyles and hair colors in photos realistically. | |
| `fal-ai/image-apps-v2/headshot-photo` | Headshot Generator | Generate professional headshot photos with customizable backgrounds. | |
| `fal-ai/image-apps-v2/makeup-application` | Makeup Changer | Apply realistic makeup styles with adjustable intensity. | |
| `fal-ai/image-apps-v2/object-removal` | Object Removal | Remove unwanted objects seamlessly from any image. | |
| `fal-ai/image-apps-v2/outpaint` | Image Outpaint | Directional outpainting. Choose edges to expand. left, right, top, or center (uniform all sides). Only expanded areas are generated; an opti | |
| `fal-ai/image-apps-v2/perspective` | Perspective Change | Easily adjust the perspective of any image to different angles. | |
| `fal-ai/image-apps-v2/photo-restoration` | Photo Restoration | Restore old or damaged photos by fixing colors, scratches, and resolution. | |
| `fal-ai/image-apps-v2/photography-effects` | Photography Effects | Apply diverse photography styles and effects to transform your images. | |
| `fal-ai/image-apps-v2/portrait-enhance` | Portrait Enhance | Enhance and refine portrait photos with improved clarity and detail. | |
| `fal-ai/image-apps-v2/product-holding` | Product Holding | Place products naturally in a person’s hands for realistic marketing visuals. | |
| `fal-ai/image-apps-v2/product-photography` | Product Photography | Generate professional product photography with realistic lighting and backgrounds. | |
| `fal-ai/image-apps-v2/relighting` | Relighting | Adjust and enhance images with different lighting styles. | |
| `fal-ai/image-apps-v2/style-transfer` | Style Transfer | Apply artistic styles like impressionism, cubism, or surrealism to your images. | |
| `fal-ai/image-apps-v2/texture-transform` | Texture Transform | Transform objects with different surface textures like marble, wood, or fabric. | |
| `fal-ai/image-apps-v2/virtual-try-on` | Virtual Try-on | Try on clothes virtually by combining person and clothing images. | |
| `fal-ai/image-editing/baby-version` | Image Editing | Transform any person into their baby version, while preserving the original pose and expression with childlike features. | |
| `fal-ai/image-editing/background-change` | Image Editing Background Change | Replace your photo's background with any scene you desire, from beach sunsets to urban landscapes, with perfect lighting and shadows | |
| `fal-ai/image-editing/broccoli-haircut` | Image Editing Broccoli Haircut | Transform your character's hair into broccoli style while keeping the original characters likeness | |
| `fal-ai/image-editing/cartoonify` | Image Editing Cartoonify | Transform your photos into vibrant cool cartoons with bold outlines and rich colors. | |
| `fal-ai/image-editing/color-correction` | Image Editing Color Correction | Perfect your photos with professional color grading, balanced tones, and vibrant yet natural colors | |
| `fal-ai/image-editing/expression-change` | Image Editing Expression Change | Change facial expressions in photos to any emotion you desire, from smiles to serious looks. | |
| `fal-ai/image-editing/face-enhancement` | Image Editing Face Enhancement | Enhance facial features with professional retouching while maintaining a natural, realistic look | |
| `fal-ai/image-editing/hair-change` | Image Editing Hair Change | Experiment with different hairstyles, from bald to any style you can imagine, while maintaining natural lighting and realistic results. | |
| `fal-ai/image-editing/object-removal` | Image Editing Object Removal | Remove unwanted objects or people from your photos while seamlessly blending the background. | |
| `fal-ai/image-editing/photo-restoration` | Image Editing Photo Restoration | Restore and enhance old or damaged photos by removing imperfections, adding color while preserving the original character and details of the | |
| `fal-ai/image-editing/plushie-style` | Image Editing Plushie Style | Transform your photos into cool plushies while keeping the original characters likeness | |
| `fal-ai/image-editing/professional-photo` | Image Editing Professional Photo | Turn your casual photos into stunning professional studio portraits with perfect lighting and high-end photography style. | |
| `fal-ai/image-editing/realism` | Image Editing Realism | Add details to faces, enhance face features, remove blur. | |
| `fal-ai/image-editing/reframe` | Image Editing Reframe | The reframe endpoint intelligently adjusts an image's aspect ratio while preserving the main subject's position, composition, pose, and pers | |
| `fal-ai/image-editing/retouch` | Image Editing Retouch | Retouch photos of faces. Remove blemishes and improve the skin. | |
| `fal-ai/image-editing/scene-composition` | Image Editing Scene Composition | Place your subject in any scene you imagine, from enchanted forests to urban settings, with professional composition and lighting | |
| `fal-ai/image-editing/style-transfer` | Image Editing Style Transfer | Transform your photos into artistic masterpieces inspired by famous styles like Van Gogh's Starry Night or any artistic style you choose. | |
| `fal-ai/image-editing/text-removal` | Image Editing Text Removal | Remove all text and writing from images while preserving the background and natural appearance. | |
| `fal-ai/image-editing/time-of-day` | Image Editing Time Of Day | Transform your photos to any time of day, from golden hour to midnight, with appropriate lighting and atmosphere. | |
| `fal-ai/image-editing/weather-effect` | Image Editing Weather Effect | Add realistic weather effects like snowfall, rain, or fog to your photos while maintaining the scene's mood. | |
| `fal-ai/image-editing/wojak-style` | Image Editing Wojak Style | Transform your photos into wojak style while keeping the original characters likeness | |
| `fal-ai/image-editing/youtube-thumbnails` | Image Editing Youtube Thumbnails | Generate YouTube thumbnails with custom text | |
| `fal-ai/image-preprocessors/depth-anything/v2` | Image Preprocessors | Depth Anything v2 preprocessor. | |
| `fal-ai/image-preprocessors/hed` | Image Preprocessors | Holistically-Nested Edge Detection (HED) preprocessor. | |
| `fal-ai/image-preprocessors/lineart` | Image Preprocessors | Line art preprocessor. | |
| `fal-ai/image-preprocessors/midas` | Image Preprocessors | MiDaS depth estimation preprocessor. | |
| `fal-ai/image-preprocessors/mlsd` | Image Preprocessors | M-LSD line segment detection preprocessor. | |
| `fal-ai/image-preprocessors/pidi` | Image Preprocessors | PIDI (Pidinet) preprocessor. | |
| `fal-ai/image-preprocessors/sam` | Image Preprocessors | Segment Anything Model (SAM) preprocessor. | |
| `fal-ai/image-preprocessors/scribble` | Image Preprocessors | Scribble preprocessor. | |
| `fal-ai/image-preprocessors/teed` | Image Preprocessors | TEED (Temporal Edge Enhancement Detection) preprocessor. | |
| `fal-ai/image-preprocessors/zoe` | Image Preprocessors | ZoeDepth preprocessor. | |
| `fal-ai/image2pixel` | Image2Pixel | Turn images into pixel-perfect retro art | |
| `fal-ai/image2svg` | Image2svg | Image2SVG transforms raster images into clean vector graphics, preserving visual quality while enabling scalable, customizable SVG outputs w | |
| `fal-ai/imageutils/depth` | Midas Depth Estimation | Create depth maps using Midas depth estimation. | |
| `fal-ai/imageutils/marigold-depth` | Marigold Depth Estimation | Create depth maps using Marigold depth estimation. | |
| `fal-ai/imageutils/rembg` | Remove Background | Remove the background from an image. | |
| `fal-ai/inpaint` | Inpainting sdxl and sd | Inpaint images with SD and SDXL | |
| `fal-ai/instant-character` | Instant Character | InstantCharacter creates high-quality, consistent characters from text prompts, supporting diverse poses, styles, and appearances with stron | |
| `fal-ai/invisible-watermark` | Invisible Watermark | Invisible Watermark is a model that can add an invisible watermark to an image. | |
| `fal-ai/ip-adapter-face-id` | IP Adapter Face ID | High quality zero-shot personalization | |
| `fal-ai/joyai-image-edit` | Joyai Image Edit | All-in-one image AI with JoyAI-Image. Understand, create, and edit images through natural language—the model's deep visual understanding pow | |
| `fal-ai/kling-image/o1` | Kling O1 Image | Perform precise image edits using strong reference control, transforming subjects, styles, and local details while preserving visual consist | |
| `fal-ai/kling-image/o3/image-to-image` | Kling Image | Kling Omni 3: Top-tier image-to-image with flawless consistency. | |
| `fal-ai/kling-image/v3/image-to-image` | Kling Image | Kling Image V3: Latest kling image model | |
| `fal-ai/kolors/image-to-image` | Kolors Image to Image | Photorealistic Image-to-Image | |
| `fal-ai/lcm-sd15-i2i` | Optimized Latent Consistency (SDv1.5) | Produce high-quality images with minimal inference steps. Optimized for 512x512 input image size. | |
| `fal-ai/leffa/pose-transfer` | Leffa Pose Transfer | Leffa Pose Transfer is an endpoint for changing pose of an image with a reference image. | |
| `fal-ai/leffa/virtual-tryon` | Leffa Virtual TryOn | Leffa Virtual TryOn is a high quality image based Try-On endpoint which can be used for commercial try on. | |
| `fal-ai/live-portrait/image` | Live Portrait | Transfer expression from a video to a portrait. | |
| `fal-ai/longcat-image/edit` | Longcat Image | LongCat image Edit is a 6B parameter image editing model excelling at multilingual text rendering, photorealism and deployment efficiency. | |
| `fal-ai/lora/image-to-image` | Stable Diffusion with LoRAs | Run Any Stable Diffusion model with customizable LoRA weights. | |
| `fal-ai/lora/inpaint` | Stable Diffusion with LoRAs | Run Any Stable Diffusion model with customizable LoRA weights. | |
| `fal-ai/luma-photon/flash/modify` | Luma Photon | Edit images from your prompts using Luma Photon. Photon is the most creative, personalizable, and intelligent visual models for creatives, b | |
| `fal-ai/luma-photon/flash/reframe` | Luma Photon Flash Reframe | This advanced tool intelligently expands your visuals, seamlessly blending new content to enhance creativity and adaptability, offering unma | |
| `fal-ai/luma-photon/modify` | Luma Photon | Edit images from your prompts using Luma Photon. Photon is the most creative, personalizable, and intelligent visual models for creatives, b | |
| `fal-ai/luma-photon/reframe` | Luma Photon Reframe | Extend and reframe images with Luma Photon Reframe. This advanced tool intelligently expands your visuals, seamlessly blending new content t | |
| `fal-ai/marigold-v2` | Marigold V2 Depth | Estimate depth from a single image with Marigold V2, a diffusion-based depth model built on Qwen-Image-Edit, returning a colorized depth map | |
| `fal-ai/minimax/image-01/subject-reference` | Minimax Image Subject Reference | Generate images from text and a reference image using MiniMax Image-01 for consistent character appearance. | |
| `fal-ai/moondream-next/detection` | MoonDreamNext Detection | MoonDreamNext Detection is a multimodal vision-language model for gaze detection, bbox detection, point detection, and more. | |
| `fal-ai/moondream3-preview/segment` | Moondream3 Preview [Segment] | Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilit | |
| `fal-ai/nafnet/deblur` | NAFNet-deblur | Use NAFNet to fix issues like blurriness and noise in your images. This model specializes in image restoration and can help enhance the over | |
| `fal-ai/nafnet/denoise` | NAFNet-denoise | Use NAFNet to fix issues like blurriness and noise in your images. This model specializes in image restoration and can help enhance the over | |
| `fal-ai/nano-banana-2/edit` | Nano Banana 2 | Nano Banana 2 is Google's new state-of-the-art image generation and editing model | |
| `fal-ai/nano-banana-pro/edit` | Nano Banana Pro | Nano Banana Pro is Google's new state-of-the-art image generation and editing model | |
| `fal-ai/nano-banana/edit` | Nano Banana | Google's famous original image generation and editing model | |
| `fal-ai/object-removal` | Object Removal | Removes objects and their visual effects using natural language, replacing them with contextually appropriate content | |
| `fal-ai/object-removal/bbox` | Object Removal | Removes box-selected objects and their visual effects, seamlessly reconstructing the scene with contextually appropriate content. | |
| `fal-ai/object-removal/mask` | Object Removal | Removes mask-selected objects and their visual effects, seamlessly reconstructing the scene with contextually appropriate content. | |
| `fal-ai/omni-zero` | Omni Zero | Any pose, any style, any identity | |
| `fal-ai/pasd` | PASD | Pixel-Aware Diffusion Model for Realistic Image Super-Resolution and Personalized Stylization | |
| `fal-ai/patina` | PATINA | PATINA creates seamless high-resolution normal, roughness, basecolor (albedo), height (displacement) and metalness maps from images | |
| `fal-ai/patina/material/extract` | PATINA | Extract seamless tiling textures with PBR attribute maps from images | |
| `fal-ai/photomaker` | PhotoMaker | Customizing Realistic Human Photos via Stacked ID Embedding | |
| `fal-ai/playground-v25/image-to-image` | Playground v2.5 | State-of-the-art open-source model in aesthetic quality | |
| `fal-ai/playground-v25/inpainting` | Playground v2.5 | State-of-the-art open-source model in aesthetic quality | |
| `fal-ai/post-processing` | Post Processing | Post Processing is an endpoint that can enhance images using a variety of techniques including grain, blur, sharpen, and more. | |
| `fal-ai/post-processing/blur` | Post Processing Blur | Apply Gaussian or Kuwahara blur effects with adjustable radius and sigma parameters | |
| `fal-ai/post-processing/chromatic-aberration` | Post Processing Chromatic Aberration | Create chromatic aberration by shifting red, green, and blue channels horizontally or vertically with customizable shift amounts. | |
| `fal-ai/post-processing/color-correction` | Post Processing Color Correction | Adjust color temperature, brightness, contrast, saturation, and gamma values for color correction. | |
| `fal-ai/post-processing/color-tint` | Post Processing Color Tint | Apply various color tints (sepia, red, green, blue, cyan, magenta, yellow, purple, orange, warm, cool, lime, navy, vintage, rose, teal, maro | |
| `fal-ai/post-processing/desaturate` | Post Processing Desaturate | Reduce color saturation using different methods (luminance Rec.709, luminance Rec.601, average, lightness) with adjustable factor. | |
| `fal-ai/post-processing/dissolve` | Post Processing Dissolve | Blend two images together using smooth linear interpolation with a configurable blend factor. | |
| `fal-ai/post-processing/dodge-burn` | Post Processing Dodge Burn | Apply dodge and burn effects with multiple modes and adjustable intensity. | |
| `fal-ai/post-processing/grain` | Post Processing Grain | Apply film grain effect with different styles (modern, analog, kodak, fuji, cinematic, newspaper) and customizable intensity and scale | |
| `fal-ai/post-processing/parabolize` | Post Processing Parabolize | Apply a parabolic distortion effect with configurable coefficient and vertex position. | |
| `fal-ai/post-processing/sharpen` | Post Processing Sharpen | Apply sharpening effects with three modes: basic unsharp mask, smart sharpening with edge preservation, and Contrast Adaptive Sharpening (CA | |
| `fal-ai/post-processing/solarize` | Post Processing Solarize | Apply solarization effect by inverting pixel values above a threshold | |
| `fal-ai/post-processing/vignette` | Post Processing Vignette | Add a darkening vignette effect around the edges of the image with adjustable strength | |
| `fal-ai/qwen-image-edit` | Qwen Image Edit | Endpoint for Qwen's Image Editing model. Has superior text editing capabilities. | |
| `fal-ai/qwen-image-edit-2509` | Qwen Image Edit 2509 | Endpoint for Qwen's Image Editing Plus model also known as Qwen-Image-Edit-2509. Has superior text editing capabilities and multi-image supp | |
| `fal-ai/qwen-image-edit-2509-lora` | Qwen Image Edit 2509 Lora | LoRA endpoint for the Qwen Image Edit 2509 model. | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/add-background` | Qwen Image Edit 2509 Lora Gallery | Add a realistic scene behind the object with white background | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/face-to-full-portrait` | Qwen Image Edit 2509 Lora Gallery | Generate full portrait from a cropped face photo | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/group-photo` | Qwen Image Edit 2509 Lora Gallery | Create group photos | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/integrate-product` | Qwen Image Edit 2509 Lora Gallery | Blend products into backgrounds with automatic perspective and lighting correction | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/lighting-restoration` | Qwen Image Edit 2509 Lora Gallery | Removes harsh shadows and light spots from images, replacing them with soft, even, natural-looking illumination. | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles` | Qwen Image Edit 2509 Lora Gallery | Precise camera position and angle control (rotation, zoom, vertical movement) | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/next-scene` | Qwen Image Edit 2509 Lora Gallery | Create cinematic transitions and scene progressions (camera movements, framing changes) | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/remove-element` | Qwen Image Edit 2509 Lora Gallery | Remove unwanted elements (objects, people, text) while maintaining image consistency | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/remove-lighting` | Qwen Image Edit 2509 Lora Gallery | Remove existing lighting and apply soft, even illumination | |
| `fal-ai/qwen-image-edit-2509-lora-gallery/shirt-design` | Qwen Image Edit 2509 Lora Gallery | Apply designs/graphics onto people's shirts | |
| `fal-ai/qwen-image-edit-2511` | Qwen Image Edit 2511 | Endpoint for Qwen's Image Editing 2511 model. | |
| `fal-ai/qwen-image-edit-2511-multiple-angles` | Qwen Image Edit 2511 Multiple Angles | Generates same scene from different angles (azimuth/elevation) with Qwen image Edit 2511 and the Lora Multiple Angles | 已接入|
| `fal-ai/qwen-image-edit-2511/lora` | Qwen Image Edit 2511 | Endpoint for Qwen's Image Editing 2511 model with LoRa support. | |
| `fal-ai/qwen-image-edit-lora` | Qwen Image Edit Lora | LoRA inference endpoint for the Qwen Image Editing model. | |
| `fal-ai/qwen-image-edit-plus` | Qwen Image Edit Plus | Endpoint for Qwen's Image Editing Plus model also known as Qwen-Image-Edit-2509. Has superior text editing capabilities and multi-image supp | |
| `fal-ai/qwen-image-edit-plus-lora` | Qwen Image Edit Plus Lora | LoRA endpoint for the Qwen Image Edit Plus model. | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/add-background` | Qwen Image Edit Plus Lora Gallery | Add a realistic scene behind the object with white background | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/face-to-full-portrait` | Qwen Image Edit Plus Lora Gallery | Generate full portrait from a cropped face photo | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/group-photo` | Qwen Image Edit Plus Lora Gallery | Create group photos | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/integrate-product` | Qwen Image Edit Plus Lora Gallery | Blend products into backgrounds with automatic perspective and lighting correction | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/lighting-restoration` | Qwen Image Edit Plus Lora Gallery | Removes harsh shadows and light spots from images, replacing them with soft, even, natural-looking illumination. | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/multiple-angles` | Qwen Image Edit Plus Lora Gallery | Precise camera position and angle control (rotation, zoom, vertical movement) | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/next-scene` | Qwen Image Edit Plus Lora Gallery | Create cinematic transitions and scene progressions (camera movements, framing changes) | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/remove-element` | Qwen Image Edit Plus Lora Gallery | Remove unwanted elements (objects, people, text) while maintaining image consistency | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/remove-lighting` | Qwen Image Edit Plus Lora Gallery | Remove existing lighting and apply soft, even illumination | |
| `fal-ai/qwen-image-edit-plus-lora-gallery/shirt-design` | Qwen Image Edit Plus Lora Gallery | Apply designs/graphics onto people's shirts | |
| `fal-ai/qwen-image-edit/image-to-image` | Qwen Image Edit | Image to Image Endpoint for Qwen's Image Editing model. Has superior text editing capabilities. | |
| `fal-ai/qwen-image-edit/inpaint` | Qwen Image Edit | Inpainting Endpoint for the Qwen Edit Image editing model. | |
| `fal-ai/qwen-image-layered` | Qwen Image Layered | Qwen-Image-Layered is a model capable of decomposing an image into multiple RGBA layers. | |
| `fal-ai/qwen-image-layered/lora` | Qwen Image Layered | Qwen-Image-Layered is a model capable of decomposing an image into multiple RGBA layers. Use loras to get your custom outputs. | |
| `fal-ai/qwen-image-max/edit` | Qwen Image Max | Image editing endpoint for Qwen-Image-Max. Qwen Image Max improves upon the Qwen Image Plus series by enhancing the realism and naturalness | |
| `fal-ai/qwen-image/image-to-image` | Qwen Image | Qwen-Image (Image-to-Image) transforms and edits input images with high fidelity, enabling precise style transfer, enhancement, and creative | |
| `fal-ai/recraft/upscale/creative` | Recraft Creative Upscale | Enhances a given raster image using the 'creative upscale' tool, increasing image resolution, making the image sharper and cleaner. | |
| `fal-ai/recraft/upscale/crisp` | Recraft Crisp Upscale | Enhances a given raster image using 'crisp upscale' tool, boosting resolution with a focus on refining small details and faces. | |
| `fal-ai/recraft/v3/image-to-image` | Recraft V3 | Recraft V3 is a text-to-image model with the ability to generate long texts, vector art, images in brand style, and much more. As of today, | |
| `fal-ai/recraft/vectorize` | Recraft | Converts a given raster image to SVG format using Recraft model. | |
| `fal-ai/retoucher` | Face Retoucher | Automatically retouches faces to smooth skin and remove blemishes. | |
| `fal-ai/rife` | RIFE | Interpolate images with RIFE - Real-Time Intermediate Flow Estimation | |
| `fal-ai/sam-3-1/image` | Sam 3 1 | SAM 3.1 builds comes with Object Multiplex, a shared-memory approach for joint multi-object tracking that delivers faster speeds with larger | |
| `fal-ai/sam-3-1/image-rle` | Sam 3 1 | SAM 3.1 builds comes with Object Multiplex, a shared-memory approach for joint multi-object tracking that delivers faster speeds with larger | |
| `fal-ai/sam-3/image` | Segment Anything Model 3 | SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text o | |
| `fal-ai/sam-3/image-rle` | Sam 3 | SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text o | |
| `fal-ai/sam2/auto-segment` | Segment Anything Model 2 | SAM 2 is a model for segmenting images automatically. It can return individual masks or a single mask for the entire image. | |
| `fal-ai/sam2/image` | Segment Anything Model 2 | SAM 2 is a model for segmenting images and videos in real-time. | |
| `fal-ai/sdxl-controlnet-union/image-to-image` | SDXL ControlNet Union | An efficent SDXL multi-controlnet image-to-image model. | |
| `fal-ai/sdxl-controlnet-union/inpainting` | SDXL ControlNet Union | An efficent SDXL multi-controlnet inpainting model. | |
| `fal-ai/seedvr/upscale/image` | SeedVR2 | Use SeedVR2 to upscale your images | |
| `fal-ai/seedvr/upscale/image/seamless` | SeedVR2 | Use SeedVR2 to upscale images, retaining seamless tiling | |
| `fal-ai/smart-resize` | Smart Resize | Smart image resize to arbitrary dimensions, powered by Nano Banana Pro with vision-LLM-guided prompting for composition-aware recomposition | |
| `fal-ai/stepx-edit2` | Stepx Edit2 | Image-to-image editing with Step1X-Edit v2 from StepFun. Reasoning-enhanced modifications through a thinking–editing–reflection loop with ML | |
| `fal-ai/telestyle-v2` | Telestyle V2 Style Transfer | Restyle any image with TeleStyle v2 — provide an original image and a styling reference, and the model re-renders the original in the refere | |
| `fal-ai/uno` | Uno | An AI model that transforms input images into new ones based on text prompts, blending reference visuals with your creative directions. | |
| `fal-ai/uso` | Uso | Use USO to perform subject driven generations using reference image. | |
| `fal-ai/vecglypher/image-to-svg` | Vecglypher | Vector font generation with VecGlypher. Create custom glyphs from text descriptions or reference images—outputs clean SVG paths directly wit | |
| `fal-ai/vidu/q2/reference-to-image` | Vidu | Vidu Reference-to-Image creates images by using a reference images and combining them with a prompt. | |
| `fal-ai/vidu/reference-to-image` | Vidu | Vidu Reference-to-Image creates images by using a reference images and combining them with a prompt. | |
| `fal-ai/wan-25-preview/image-to-image` | Wan 2.5 Image to Image | Wan 2.5 image-to-image model. | |
| `fal-ai/wan/v2.2-a14b/image-to-image` | Wan | Wan 2.2's 14B model edit high-resolution, photorealistic images with powerful prompt understanding and fine-grained visual detail | |
| `fal-ai/wan/v2.7/edit` | Wan | Transform and edit existing images with text-guided instructions using the WAN 2.7 model for creative image manipulation. | |
| `fal-ai/wan/v2.7/pro/edit` | Wan | Edit and transform images using text instructions with the WAN 2.7 Pro model for precise, professional-grade image modifications. | |
| `fal-ai/workflow-utilities/extract-nth-frame` | Workflow Utilities Extract Nth Frame | FFMPEG Untility for Extracting nth Frame | |
| `fal-ai/z-image/turbo/controlnet` | Z Image Turbo Controlnet | Generate images from text and edge, depth or pose images using Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `fal-ai/z-image/turbo/controlnet/lora` | Z Image Turbo Controlnet Lora | Generate images from text and edge, depth or pose images using custom LoRA and Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `fal-ai/z-image/turbo/image-to-image` | Z Image Turbo Image To Image | Generate images from text and images using Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `fal-ai/z-image/turbo/image-to-image/lora` | Z Image Turbo Image To Image Lora | Generate images from text and images using custom LoRA and Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `fal-ai/z-image/turbo/inpaint` | Z Image Turbo Inpaint | Generate images from text, an image and a mask using Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `fal-ai/z-image/turbo/inpaint/lora` | Z Image Turbo Inpaint Lora | Generate images from text, an image, a mask and custom LoRA using Z-Image Turbo, Tongyi-MAI's super-fast 6B model. | |
| `google/nano-banana-2.1/edit` | Nano Banana 2.1 Edit | Nano Banana 2.1 Edit by Google transforms reference images using text instructions, with output resolutions up to 4K and optional video or P | |
| `google/nano-banana-lite/edit` | Nano Banana Lite Edit | Nano banana lite is the efficiency-focused model in the image generation family. Sub-2 second latency with cost-effective generation and edi | |
| `google/virtual-try-on` | Google Virtual Try On | Generate realistic virtual try-on images from a person image and a clothing product image. | |
| `hitem3d/hi3d/image-to-relief` | Hi3D Image to Relief | Generate a 3D relief depth map with Hi3D from a single image. | |
| `ideogram/v4.5/edit` | Ideogram V4.5 Edit | Edit images with Ideogram 4.5: prompt edits with up to 4 reference images, optional mask, and a high-precision mode that keeps unchanged pix | |
| `ideogram/v4/image-to-image` | Ideogram V4.0q Image to Image | Ideogram V4.0q Image-to-Image transforms an input image with a text prompt, restyling and reworking the composition while preserving its cor | |
| `ideogram/v4/image-to-image/lora` | Ideogram V4.0q Image to Image LoRA | Ideogram V4.0q Image-to-Image LoRA applies a custom-trained LoRA on top of an input image, steering edits toward a specific style, subject, | |
| `ideogram/v4/tiling` | Ideogram V4.0q Tiling | Ideogram V4.0q Tiling generates seamless, edge-matching textures and patterns that repeat infinitely in any direction, ideal for backgrounds | |
| `ideogram/v4/tiling/lora` | Ideogram V4.0q Tiling LoRA | Ideogram V4.0q Tiling LoRA produces seamless repeatable patterns guided by a custom-trained LoRA, locking a specific aesthetic or motif into | |
| `luma/agent/uni-1/v1/edit` | Luma Uni-1 Edit | Luma Uni-1 Edit reworks a source image from a text instruction, preserving the original composition while applying style changes and followi | |
| `luma/agent/uni-1/v1/max/edit` | Luma Uni-1 Edit Max | Luma Uni-1 Max Edit applies text-guided edits to a source image at maximum fidelity, holding the original structure while honoring reference | |
| `meta/muse-image/edit` | Meta Muse Image Edit | Meta's Muse Image model does precise edits that change only what you ask, stay coherent across turns, and compose from multiple reference im | |
| `microsoft/mai-image-2.5-pro/edit` | MAI Image 2.5 Pro (Edit) | Apply precise, controllable edits to a reference image while preserving composition, typography, identity, and fine visual detail. | |
| `microsoft/mai-image-2.5/edit` | Mai Image 2.5 | MAI-Image-2.5 is Microsoft's photorealistic image generation and editing model that turns text prompts or uploaded images into high-quality, | |
| `openai/gpt-image-2.5/flare/edit` | GPT Image 2.5 Flare Edit | Precise image editing that changes only what's asked, keeping subject, composition, and background intact, with reference subjects staying r | |
| `openai/gpt-image-2.5/sunburst/edit` | GPT Image 2.5 Sunburst Edit | Editing built for the tightest control, edits scoped precisely to the instruction, with subject and composition preserved across many rounds | |
| `openai/gpt-image-2/edit` | GPT Image 2 API | GPT Image 2, OpenAI's latest image model, is capable of making fine-grained, detailed edits to images. | |
| `pixelcut/background-removal` | Pixelcut Background Remover | Pixelcut’s Background Remover enables fast, ultra high-quality removal of backgrounds from images. Perfect for e-commerce and image editing | |
| `pixelcut/product-photo` | Pixelcut Product Photo | Pixelcut's Background Remover produces fast, high-quality cutouts built for e-commerce product imagery | |
| `rundiffusion-fal/juggernaut-flux-lora/inpainting` | Juggernaut Flux Lora | Juggernaut Base Flux LoRA Inpainting by RunDiffusion is a drop-in replacement for Flux [Dev] inpainting that delivers sharper details, riche | |
| `rundiffusion-fal/juggernaut-flux/base/image-to-image` | Juggernaut Flux Base | Juggernaut Base Flux by RunDiffusion is a drop-in replacement for Flux [Dev] that delivers sharper details, richer colors, and enhanced real | |
| `rundiffusion-fal/juggernaut-flux/pro/image-to-image` | Juggernaut Flux Pro | Juggernaut Pro Flux by RunDiffusion is the flagship Juggernaut model rivaling some of the most advanced image models available, often surpas | |
| `smoretalk-ai/rembg-enhance` | Rembg Enhance (Remove Background Enhance) | Rembg-enhance is optimized for 2D vector images, 3D graphics, and photos by leveraging matting technology. | |
| `topaz/adjust/image` | Topaz Adjust Image | Professional color and lighting correction powered by Topaz Labs. Adjust V2 fixes exposure, White Balance corrects color casts, Colorize add | |
| `topaz/denoise/image` | Topaz Denoise Image | Professional photo denoising powered by Topaz Labs. Normal, Strong and Extreme presets clean noise at source resolution; Denoise Max adds ge | |
| `topaz/restore/image` | Topaz Restore Image | Professional image restoration powered by Topaz Labs. Recover 3 generatively rebuilds natural detail; Dust-Scratch V2 cleans film dust and s | |
| `topaz/sharpen/image` | Topaz Sharpen Image | Professional photo sharpening powered by Topaz Labs. Models tuned per blur type (lens, motion, portrait, wildlife), plus Super Focus for gen | |
| `topaz/upscale/image/creative` | Topaz Upscale Image Creative | Professional creative image upscaling powered by Topaz Labs. Bloom 2 reinvents detail with adjustable creativity and color preservation. Bes | |
| `topaz/upscale/image/generative` | Topaz Upscale Image Generative | Professional generative image upscaling powered by Topaz Labs. Wonder 3.5 leads the range, with Redefine for prompt-guided detail and Recove | |
| `topaz/upscale/image/precision` | Topaz Upscale Image Precision | Professional photo upscaling powered by Topaz Labs. Gigapixel precision models (Standard V2, High Fidelity, Low Resolution, CGI, Text Refine | |
| `topaz/upscale/image/transparent` | Topaz Upscale Image Transparent | Professional transparent-image upscaling powered by Topaz Labs. Preserves the alpha channel end to end with PNG output. Best for logos, stic | |
| `wan/v2.6/image-to-image` | Wan v2.6 Image to Image | Wan 2.6 image-to-image model. | |
| `xai/grok-imagine-image/edit` | Grok Imagine Image | Edit images precisely with xAI's Grok Imagine model | |
| `xai/grok-imagine-image/quality/edit` | Grok Imagine Image Editing Quality | Grok Imagine Pro is an advanced AI model from xAI that creates high-quality visuals from text prompts and allows you to edit or analyze exis | |
| `xai/grok-imagine-image/v2.0/edit` | Grok Imagine Image 2.0 | Edit images with xAi's Grok Imagine 2.0 model. | |

## text-to-video（136）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/happy-horse/text-to-video` | Happy Horse | Generate 1080p video with synchronized native audio from a text prompt. Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4. Duration: 3–15s. | |
| `alibaba/happy-horse/v1.1/text-to-video` | Happy Horse 1.1 Text to Video | Happy Horse 1.1 is Alibaba's #1-ranked video model. This text-to-video endpoint generates 1080p video with synchronized native audio and mul | |
| `alibaba/wan-3.0-prime/text-to-video` | Wan 3.0 Prime | Wan 3.0 Prime Text-to-Video transforms written prompts into polished videos with accelerated generation, fluid motion, strong scene fidelity | |
| `alibaba/wan-3.0/text-to-video` | Wan Text to Video | Wan 3.0 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `argil/avatars/text-to-video` | Avatars Text to Video | High-quality avatar videos that feel real, generated from your text | |
| `blackforestlabs/flux-3/text-to-video` | Flux 3 Text to Video | FLUX 3 is Black Forest Labs' frontier video model. This endpoint generates video directly from a text prompt, translating a written descript | |
| `blackforestlabs/flux-3/text-to-video/draft` | Flux 3 Text To Video Draft | FLUX.3 is Black Forest Labs' frontier audio/video model. Generate fast, low-cost draft previews from a text prompt, with a reusable draft ca | |
| `bytedance/seedance-2.0/fast/text-to-video` | Seedance 2.0 Fast Text to Video | ByteDance's most advanced text-to-video model, fast tier. Lower latency and cost with cinematic output, native audio, multi-shot editing, an | |
| `bytedance/seedance-2.0/mini/text-to-video` | Seedance 2.0 Mini Text to Video | Seedance 2.0 Mini is a faster version of Seedance 2.0 that brings great performance and high generation speed at a lower cost. | |
| `bytedance/seedance-2.0/text-to-video` | Seedance 2.0 Text to Video API | ByteDance's most advanced text-to-video model. Cinematic output with native audio, multi-shot editing, real-world physics, and director-leve | |
| `bytedance/seedance-2.0/us/text-to-video` | Seedance 2.0 US Text to Video | US hosted version of ByteDance's most advanced text-to-video model. Cinematic output with native audio, multi-shot editing, real-world physi | |
| `bytedance/seedance-2.5/text-to-video` | Seedance 2.5 Text to Video | Dreamina Seedance 2.5 generates native 30-second single-shot video at up to 720p from a single text prompt, reasoning about the whole shot a | |
| `bytedance/seedance-2.5/us/text-to-video` | Seedance 2.5 US Text to Video | US-hosted ByteDance Seedance 2.5 generates cinematic video from text with synchronized audio, up to 30-second duration, and 480p, 720p or 10 | |
| `creatify/boreal` | Boreal | Create product, UGC, and presenter videos with synchronized native audio from text, with optional image and audio inputs. | |
| `fal-ai/bernini-r/text-to-video` | Bernini-R Text to Video | Generate high-quality video from a text prompt with Bernini-R, ByteDance's unified video generation and editing model. | |
| `fal-ai/bytedance/seedance/v1.5/pro/text-to-video` | Bytedance Seedance V1.5 Pro Text To Video | Generate videos with audio with Seedance 1.5 | 已接入|
| `fal-ai/bytedance/seedance/v1/pro/fast/text-to-video` | Bytedance Seedance V1 Pro Fast Text To Video | Text to Video endpoint for Seedance 1.0 Pro Fast, a next-generation video model designed to deliver maximum performance at minimal cost | |
| `fal-ai/bytedance/seedance/v1/pro/text-to-video` | Seedance 1.0 Pro | Seedance 1.0 Pro, a high quality video generation model developed by Bytedance. | |
| `fal-ai/cogvideox-5b` | CogVideoX-5B | Generate videos from prompts using CogVideoX-5B | |
| `fal-ai/cosmos-predict-2.5/distilled/text-to-video` | Cosmos Predict 2.5 2B Distilled | Generate video from text and videos using NVIDIA's 2B Cosmos Distilled Model | |
| `fal-ai/cosmos-predict-2.5/text-to-video` | Cosmos Predict 2.5 2B | Generate video from text using NVIDIA's 2B Cosmos Post-Trained Model | |
| `fal-ai/fast-animatediff/text-to-video` | AnimateDiff | Animate your ideas! | |
| `fal-ai/fast-animatediff/turbo/text-to-video` | AnimateDiff Turbo | Animate your ideas in lightning speed! | |
| `fal-ai/fast-svd-lcm/text-to-video` | Stable Video Diffusion Turbo | Generate short video clips from your images using SVD v1.1 at Lightning Speed | |
| `fal-ai/fast-svd/text-to-video` | Stable Video Diffusion | Generate short video clips from your prompts using SVD v1.1 | |
| `fal-ai/heygen/avatar3/digital-twin` | Heygen | Heygen Avatar V3 Model for Digital Twin | |
| `fal-ai/heygen/avatar4/digital-twin` | Heygen | Heygen Avatar 4 Digital Twin Model | |
| `fal-ai/heygen/avatar5/digital-twin` | Heygen v5 Digital Twin | Create natural HeyGen Avatar V digital twin videos from text or audio, with lip-sync, optional backgrounds, captions, and MP4/WebM output. | |
| `fal-ai/heygen/v2/video-agent` | Heygen | Heygen Text to Video Generation Model | |
| `fal-ai/heygen/v3/video-agent` | Heygen Video Agent | Generate videos with a single prompt. Describe what you want in plain text, and the agent handles avatar selection, scripting, scene composi | |
| `fal-ai/hunyuan-video` | Hunyuan Video | Hunyuan Video is an Open video generation model with high visual quality, motion diversity, text-video alignment, and generation stability. | |
| `fal-ai/hunyuan-video-v1.5/text-to-video` | Hunyuan Video V1.5 | Hunyuan Video 1.5 is Tencent's latest and best video model | |
| `fal-ai/infinitalk/single-text` | Infinitalk | Infinitalk model generates a talking avatar video from a text and audio file. The avatar lip-syncs to the provided audio with natural facial | |
| `fal-ai/infinity-star/text-to-video` | Infinity Star | InfinityStar’s unified 8B spacetime autoregressive engine to turn any text prompt into crisp 720p videos - 10× faster than diffusion models. | |
| `fal-ai/kandinsky5-pro/text-to-video` | Kandinsky5 Pro | Kandinsky 5.0 Pro is a diffusion model for fast, high-quality text-to-video generation. | |
| `fal-ai/kandinsky5/text-to-video` | Kandinsky5 | Kandinsky 5.0 is a diffusion model for fast, high-quality text-to-video  generation. | |
| `fal-ai/kandinsky5/text-to-video/distill` | Kandinsky5 | Kandinsky 5.0 Distilled is a lightweight diffusion model for fast, high-quality text-to-video generation. | |
| `fal-ai/kandinsky6-lite/text-to-video` | Kandinsky 6.0 Lite | Kandinsky 6.0 Lite is a lightweight, high-speed text-to-video model from Kandinsky Lab, built for fast, efficient generation with strong pro | |
| `fal-ai/kandinsky6-pro/text-to-video` | Kandinsky 6.0 Pro | Kandinsky 6.0 Pro is Kandinsky Lab's flagship text-to-video model, generating high-resolution clips with cinematic motion and precise prompt | |
| `fal-ai/kling-video/lipsync/audio-to-video` | Kling LipSync Audio-to-Video | Kling LipSync is an audio-to-video model that generates realistic lip movements from audio input. | |
| `fal-ai/kling-video/lipsync/text-to-video` | Kling LipSync Text-to-Video | Kling LipSync is a text-to-video model that generates realistic lip movements from text input. | |
| `fal-ai/kling-video/o3/4k/text-to-video` | Kling Video | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/o3/pro/text-to-video` | Kling O3 Text to Video [Pro] | Generate realistic videos using Kling O3 from Kling Team! | |
| `fal-ai/kling-video/o3/standard/text-to-video` | Kling O3 Text to Video [Standard] | Generate realistic videos using Kling O3 from Kling Team! | |
| `fal-ai/kling-video/v1.5/pro/effects` | Kling 1.5 | Generate video clips from your prompts using Kling 1.5 (pro) | |
| `fal-ai/kling-video/v1.6/pro/effects` | Kling 1.6 | Generate video clips from your prompts using Kling 1.6 (pro) | |
| `fal-ai/kling-video/v1.6/standard/effects` | Kling 1.6 | Generate video clips from your prompts using Kling 1.6 (std) | |
| `fal-ai/kling-video/v1/standard/effects` | Kling 1.0 | Generate video clips from your prompts using Kling 1.0 | |
| `fal-ai/kling-video/v2.5-turbo/pro/text-to-video` | Kling v2.5 Text to Video | Kling 2.5 Turbo Pro: Top-tier text-to-video generation with unparalleled motion fluidity, cinematic visuals, and exceptional prompt precisio | 已接入|
| `fal-ai/kling-video/v2.6/pro/text-to-video` | Kling Video v2.6 Text to Video | Kling 2.6 Pro: Top-tier text-to-video with cinematic visuals, fluid motion, and native audio generation. | 已接入|
| `fal-ai/kling-video/v3/4k/text-to-video` | Kling Video V3 Text to Video 4K | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/v3/pro/text-to-video` | Kling Video v3 Text to Video [Pro] | Kling 3.0 Pro: Top-tier text-to-video with cinematic visuals, fluid motion, and native audio generation, with multi-shot support. | |
| `fal-ai/kling-video/v3/standard/text-to-video` | Kling Video v3 Text to Video [Standard] | Kling 3.0 Standard: Top-tier text-to-video with cinematic visuals, fluid motion, and native audio generation, with multi-shot support. | |
| `fal-ai/kling-video/v3/turbo/pro/text-to-video` | Kling Video V3 Turbo Pro Text to Video | Generate high quality 1080p videos using Kling's Turbo 3.0 model, with improved lipsync and multishot generation capabilities. | |
| `fal-ai/kling-video/v3/turbo/standard/text-to-video` | Kling Video V3 Standard Turbo Text to Video | Kling 3.0 Turbo Standard is a fast, cost-efficient video generation model that turns text prompts directly into 720P video with native audio | |
| `fal-ai/krea-wan-14b/text-to-video` | Krea Wan 14b- Text to Video | Fast Text-to-Video endpoint for Krea's Wan 14b model. | |
| `fal-ai/longcat-video/distilled/text-to-video/480p` | LongCat Video Distilled | Generate long videos from text using LongCat Video Distilled | |
| `fal-ai/longcat-video/distilled/text-to-video/720p` | LongCat Video Distilled | Generate long videos in 720p/30fps from text using LongCat Video Distilled | |
| `fal-ai/longcat-video/text-to-video/480p` | LongCat Video | Generate long videos from text using LongCat Video | |
| `fal-ai/longcat-video/text-to-video/720p` | LongCat Video | Generate long videos in 720p/30fps from text using LongCat Video | |
| `fal-ai/ltx-2.3-22b/distilled/text-to-video` | LTX-2.3 22B Distilled | Generate video with audio from text using LTX-2.3 Distilled | |
| `fal-ai/ltx-2.3-22b/distilled/text-to-video/lora` | LTX-2.3 22B Distilled | Generate video with audio from text using LTX-2.3 Distilled and custom LoRA | |
| `fal-ai/ltx-2.3-22b/text-to-video` | LTX-2.3 22B | Generate video with audio from text using LTX-2.3 | |
| `fal-ai/ltx-2.3-22b/text-to-video/lora` | LTX-2.3 22B | Generate video with audio from text using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-quality/text-to-video` | Ltx 2.3 Quality | Generate high-quality video with audio from text using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/text-to-video/lora` | Ltx 2.3 Quality | Generate high-quality video with audio from text using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3/text-to-video` | LTX Video 2.3 Pro | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-2.3/text-to-video/fast` | LTX 2.3 Video Fast | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-video` | LTX Video (preview) | Generate videos from prompts using LTX Video | |
| `fal-ai/ltx-video-13b-distilled` | LTX Video-0.9.7 13B Distilled | Generate videos from prompts using LTX Video-0.9.7 13B Distilled and custom LoRA | |
| `fal-ai/ltx-video-v095` | LTX Video-0.9.5 | Generate videos from prompts using LTX Video-0.9.5 | |
| `fal-ai/ltxv-13b-098-distilled` | LTX-Video 13B 0.9.8 Distilled | Generate long videos from prompts using LTX Video-0.9.8 13B Distilled and custom LoRA | |
| `fal-ai/magi-distilled` | MAGI-1 (Distilled) | MAGI-1 distilled is a faster video generation model with exceptional understanding of physical interactions and cinematic prompts | |
| `fal-ai/minimax/hailuo-02/pro/text-to-video` | MiniMax Hailuo 02 [Pro] (Text to Video) | MiniMax Hailuo-02 Text To Video API (Pro, 1080p): Advanced video generation model with 1080p resolution | |
| `fal-ai/minimax/hailuo-02/standard/text-to-video` | MiniMax Hailuo 02 [Standard] (Text to Video) | MiniMax Hailuo-02 Text To Video API (Standard, 768p): Advanced video generation model with 768p resolution | |
| `fal-ai/minimax/hailuo-2.3/pro/text-to-video` | MiniMax Hailuo 2.3 [Pro] (Text to Video) | MiniMax Hailuo-2.3 Text To Video API (Pro, 1080p): Advanced text-to-video generation model with 1080p resolution | |
| `fal-ai/minimax/hailuo-2.3/standard/text-to-video` | MiniMax Hailuo 2.3 [Standard] (Text to Video) | MiniMax Hailuo-2.3 Text To Video API (Standard, 768p): Advanced text-to-video generation model with 768p resolution | |
| `fal-ai/minimax/video-01` | MiniMax (Hailuo AI) Video 01 | Generate video clips from your prompts using MiniMax model | |
| `fal-ai/minimax/video-01-director` | MiniMax (Hailuo AI) Video 01 Director | Generate video clips more accurately with respect to natural language descriptions and using camera movement instructions for shot control. | |
| `fal-ai/minimax/video-01-live` | MiniMax (Hailuo AI) Video 01 Live | Generate video clips from your prompts using MiniMax model | |
| `fal-ai/ovi` | Ovi Text to Video | A unified paradigm for audio-video generation | |
| `fal-ai/pika/v2.1/text-to-video` | Pika Text to Video (v2.1) | Start with a simple text input to create dynamic generations that defy expectations. Anything you dream can come to life with sharp details, | |
| `fal-ai/pika/v2.2/text-to-video` | Pika Text to Video (v2.2) | Start with a simple text input to create dynamic generations that defy expectations in up to 1080p. Experience better image clarity and cris | |
| `fal-ai/pika/v2/turbo/text-to-video` | Pika Text to Video Turbo (v2) | Pika v2 Turbo creates videos from a text prompt with high quality output. | |
| `fal-ai/pixverse/c1/text-to-video` | PixVerse C1 Text To Video | Generate film-grade videos from text prompts with native audio, up to 1080p and 15 seconds, using PixVerse C1. | |
| `fal-ai/pixverse/v3.5/text-to-video` | PixVerse V3.5 Text To Video | Generate high quality video clips from text prompts using PixVerse v3.5 | |
| `fal-ai/pixverse/v3.5/text-to-video/fast` | PixVerse V3.5 Text To Video Fast | Generate high quality video clips quickly from text prompts using PixVerse v3.5 Fast | |
| `fal-ai/pixverse/v4.5/text-to-video` | PixVerse V4.5 Text To Video | Generate high quality video clips from text and image prompts using PixVerse v4.5 | |
| `fal-ai/pixverse/v4.5/text-to-video/fast` | PixVerse V4.5 Text To Video Fast | Generate high quality and fast video clips from text and image prompts using PixVerse v4.5 fast | |
| `fal-ai/pixverse/v4/text-to-video` | PixVerse V4 Text To Video | Generate high quality video clips from text and image prompts using PixVerse v4 | |
| `fal-ai/pixverse/v4/text-to-video/fast` | PixVerse V4 Text To Video Fast | Generate high quality and fast video clips from text and image prompts using PixVerse v4 fast | |
| `fal-ai/pixverse/v5.5/text-to-video` | PixVerse V5.5 Text To Video | Generate high quality video clips from text and image prompts using PixVerse v5.5 | |
| `fal-ai/pixverse/v5.6/text-to-video` | PixVerse V5.6 Text To Video | Use the latest pixverse v5.6 model to turn your texts into amazing videos. | |
| `fal-ai/pixverse/v5/text-to-video` | PixVerse V5 Text To Video | Generate high quality video clips from text and image prompts using PixVerse v5 | |
| `fal-ai/pixverse/v6/text-to-video` | PixVerse V6 Text To Video | Pixverse's latest v6 Model. | |
| `fal-ai/t2v-turbo` | T2V Turbo - Video Crafter | Generate short video clips from your prompts | |
| `fal-ai/veo3.1` | Veo 3.1 | Veo 3.1 by Google, the most advanced AI video generation model in the world. With sound on! | 已接入|
| `fal-ai/veo3.1/fast` | Veo 3.1 Fast | Faster and more cost effective version of Google's Veo 3.1! | 已接入|
| `fal-ai/veo3.1/lite` | Veo3.1 Lite Text to Video | Veo 3.1 Lite balances practical utility with professional capabilities, supporting Text-to-Video and Image-to-Video | |
| `fal-ai/vidu/q1/text-to-video` | Vidu Text to Video | Vidu Q1 Text to Video generates high-quality 1080p videos with exceptional visual quality and motion diversity | |
| `fal-ai/vidu/q2/text-to-video` | Vidu | Use the latest Vidu Q2 models which much more better quality and control on your videos. | |
| `fal-ai/vidu/q3/text-to-video/turbo` | Vidu | Vidu's Q3 Turbo Model. | |
| `fal-ai/wan-25-preview/text-to-video` | Wan 2.5 Text to Video | Wan 2.5 text-to-video model. | |
| `fal-ai/wan-pro/text-to-video` | Wan-2.1 Pro Text-to-Video | Wan-2.1 Pro is a premium text-to-video model that generates high-quality 1080p videos at 30fps with up to 6 seconds duration, delivering exc | |
| `fal-ai/wan-t2v` | Wan-2.1 Text-to-Video | Wan-2.1 is a text-to-video model that generates high-quality videos with high visual quality and motion diversity from text prompts | |
| `fal-ai/wan-t2v-lora` | Wan-2.1 Text-to-Video with LoRAs | Add custom LoRAs to Wan-2.1 is a text-to-video model that generates high-quality videos with high visual quality and motion diversity from i | |
| `fal-ai/wan/v2.2-5b/text-to-video` | Wan v2.2 5B | Wan 2.2's 5B model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding | |
| `fal-ai/wan/v2.2-5b/text-to-video/distill` | Wan | Wan 2.2's 5B distill model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding | |
| `fal-ai/wan/v2.2-5b/text-to-video/fast-wan` | Wan | Wan 2.2's 5B FastVideo model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding | |
| `fal-ai/wan/v2.2-a14b/text-to-video` | Wan-2.2 Text-to-Video A14B | Wan-2.2 text-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts. | |
| `fal-ai/wan/v2.2-a14b/text-to-video/lora` | Wan-2.2 Text-to-Video A14B with LoRAs | Wan-2.2 text-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts. T | |
| `fal-ai/wan/v2.2-a14b/text-to-video/turbo` | Wan | Wan-2.2 turbo text-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prom | |
| `fal-ai/wan/v2.7/text-to-video` | Wan Text to Video | Wan 2.7 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `google/gemini-omni-flash` | Gemini Omni Flash | Creates video with synchronized audio from text input. Grounded in Gemini's real-world knowledge, with improved physics understanding for mo | |
| `google/gemini-omni-flash/v1.1/text-to-video` | Gemini Omni Flash 1.1 Text to Video | Gemini Omni Flash 1.1 is Google's multimodal video model. This endpoint generates video with synchronized native audio from a text prompt, g | |
| `lightricks/ltx-2.5/text-to-video/fast` | Ltx 2.5 Text to Video Fast | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint generates synchronized video and audio from a text prompt in a single pa | |
| `lightricks/ltx-2.5/text-to-video/pro` | Ltx 2.5 Text to Video Fast | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint generates synchronized video and audio from a text prompt in a single pa | |
| `luma/agent/ray/v3.2/text-to-video` | Luma Ray 3.2 Text to Video | Luma Ray 3.2 generates cinematic video from a text prompt, with control over resolution, duration, and seamless looping, plus reference imag | |
| `minimax/h3-max-turbo/text-to-video` | H3 Max Turbo Text to Video | fal's H3 Max Turbo is a post-trained variant of MiniMax H3, tuned for stronger prompt adherence and better aesthetics while co-optimized wit | |
| `minimax/h3-max/director` | H3 Max Director | Direct continuous, realtime video streams with live prompts while preserving characters, settings, and story continuity. | |
| `minimax/h3-max/styles/16bit-pixel` | H3 Max 16-bit Pixel | Generates 768p video with audio in a 16-bit pixel-art style from text prompts or an optional first-frame image. Supports durations of 5–15 s | |
| `minimax/h3-max/styles/hand-drawn` | H3 Max Hand Drawn | Generates 768p video with audio in a hand-drawn animation style from text prompts or an optional first-frame image. Supports durations of 5– | |
| `minimax/h3-max/styles/low-poly` | H3 Max Low Poly | Generates 768p video with audio in a retro low-poly 3D style from text prompts or an optional first-frame image. Supports durations of 5–15 | |
| `minimax/h3-max/styles/retro-toon-70s` | H3 Max Retro Toon 70s | Generates 768p video with audio in a retro 1970s hand-painted animation style from text prompts or an optional first-frame image. Supports d | |
| `minimax/h3-max/styles/vhs` | H3 Max VHS | Generates 768p VHS-style video with audio from text prompts or an optional first-frame image. Supports 5–15 second clips and adjustable tape | |
| `minimax/h3-max/text-to-video` | MiniMax H3 Max Text to Video | fal's H3 Max is a post-trained variant of MiniMax H3, tuned for stronger prompt adherence and better aesthetics while co-optimized with our | |
| `minimax/h3/text-to-video` | MiniMax H3 Text to Video | MiniMax H3 is a frontier video model. This endpoint generates video from a text prompt alone, rendering at 2K in durations from 5 to 15 seco | |
| `minimax/h3/text-to-video/lora` | MiniMax H3 Text to Video LoRA | Generate video with synchronized audio from a text prompt using MiniMax H3; load a trained LoRA at adjustable strength to lock in style, cha | |
| `mirage-api/avatar-x/text-to-video` | Avatar X | The Avatar X API offers access to Mirage's most advanced generation model yet, delivering industry-leading identity preservation and express | |
| `moonvalley/marey/t2v` | Marey Realism V1.5 | Generate a video from a text prompt with Marey, a generative video model trained exclusively on fully licensed data. | |
| `veed/avatars/text-to-video` | Avatars | Generate high-quality videos with UGC-like avatars from text | |
| `veed/fabric-1.0/text` | Fabric 1.0 | VEED Fabric 1.0 text-to-video API | |
| `wan/v2.6/text-to-video` | Wan v2.6 Text to Video | Wan 2.6 text-to-video model. | |
| `xai/grok-imagine-video/text-to-video` | Grok Imagine Video | Generate videos with audio from text using Grok Imagine Video. | |
| `xai/grok-imagine-video/v1.5/lite/text-to-video` | Grok Imagine Video 1.5 Lite Text to Video | Generate videos from text prompts using xAI's Grok Imagine Video 1.5 Lite model. | |
| `xai/grok-imagine-video/v1.5/text-to-video` | Grok Imagine Video 1.5 Text to Video | Generate videos from prompts with audio using xAI's Grok Imagine 1.5 Video model. | |

## image-to-video（195）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/happy-horse/image-to-video` | Happy Horse | Alibaba's #1-ranked Happy Horse 1.0 — generate 1080p video with synchronized native audio and multilingual lip-sync from text prompts or ima | |
| `alibaba/happy-horse/reference-to-video` | Happy Horse | Generate 1080p video with synchronized native audio from a text prompt and references. Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4. Duration: 3 | |
| `alibaba/happy-horse/v1.1/image-to-video` | Happy Horse 1.1 Image to Video | Happy Horse 1.1 is Alibaba's #1-ranked video model. This image-to-video endpoint animates a still image into 1080p video with synchronized n | |
| `alibaba/happy-horse/v1.1/reference-to-video` | Happy Horse 1.1 Reference to Video | Happy Horse 1.1 is Alibaba's #1-ranked video model. This reference-to-video endpoint turns up to 9 reference images into 1080p video with sy | |
| `alibaba/wan-3.0-prime/image-to-video` | Wan 3.0 Prime | Wan 3.0 Prime Image-to-Video turns still images into dynamic, cinematic sequences with rapid turnaround, natural motion, and excellent visua | |
| `alibaba/wan-3.0/image-to-video` | Wan 3.0 | Wan 3.0 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `alibaba/wan-3.0/reference-to-video` | Wan 3.0 | Wan 3.0 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `blackforestlabs/flux-3/first-last-frame-to-video` | Flux 3 First Last Frame to Video | FLUX 3 is Black Forest Labs' frontier video model. This endpoint generates the video between a defined start and end frame, interpolating a | |
| `blackforestlabs/flux-3/first-last-frame-to-video/draft` | Flux 3 First Last Frame to Video Draft | FLUX.3 is Black Forest Labs' frontier audio/video model. Generate fast, low-cost draft previews between a start and an end frame, with a reu | |
| `blackforestlabs/flux-3/image-to-video` | FLUX 3 Image to Video | FLUX 3 is Black Forest Labs' frontier video model. This endpoint animates a single still image into video, extending one frame into coherent | |
| `blackforestlabs/flux-3/image-to-video/draft` | Flux 3 Image To Video Draft | FLUX.3 is Black Forest Labs' frontier audio/video model. Generate fast, low-cost draft previews that animate a still image, with a reusable | |
| `blackforestlabs/flux-3/keyframes-to-video` | Flux 3 Image to Video | FLUX 3 is Black Forest Labs' frontier video model. This endpoint builds video from a sequence of keyframes, generating the motion between ea | |
| `blackforestlabs/flux-3/keyframes-to-video/draft` | Flux 3 Keyframes To Video Draft | FLUX.3 is Black Forest Labs' frontier audio/video model. Generate fast, low-cost draft previews pinned to your keyframe images, with a reusa | |
| `bytedance/lynx` | Lynx | Generate subject consistent videos using Lynx from ByteDance! | |
| `bytedance/seedance-2.0/fast/image-to-video` | Seedance 2.0 Fast Image to Video | ByteDance's most advanced image-to-video model, fast tier. Lower latency and cost with synchronized audio, start and end frame control, and | |
| `bytedance/seedance-2.0/fast/reference-to-video` | Seedance 2.0 Fast Reference to Video | ByteDance's most advanced reference-to-video model, fast tier. Lower latency and cost with up to 9 images, 3 videos, and 3 audio clips as in | |
| `bytedance/seedance-2.0/image-to-video` | Seedance 2 Image to Video | ByteDance's most advanced image-to-video model. Animate still images into cinematic video with synchronized audio, start and end frame contr | |
| `bytedance/seedance-2.0/mini/image-to-video` | Seedance 2.0 Mini Image to Video | Seedance 2.0 Mini is a faster version of Seedance 2.0 that brings great performance and high generation speed at a lower cost. | |
| `bytedance/seedance-2.0/mini/reference-to-video` | Seedance 2.0 Mini | Seedance 2.0 Mini is a faster version of Seedance 2.0 that brings great performance and high generation speed at a lower cost. | |
| `bytedance/seedance-2.0/reference-to-video` | Seedance 2 Reference to Video | ByteDance's most advanced reference-to-video model. Generate video from up to 9 images, 3 videos, and 3 audio clips with native audio and ci | |
| `bytedance/seedance-2.0/us/image-to-video` | Seedance 2.0 US Image to Video | US hosted version of ByteDance's most advanced image-to-video model. Animate still images into cinematic video with synchronized audio, star | |
| `bytedance/seedance-2.0/us/reference-to-video` | Seedance 2.0 US Reference to Video | US hosted version of ByteDance's most advanced reference-to-video model. Generate video from up to 9 images, 3 videos, and 3 audio clips wit | |
| `bytedance/seedance-2.5/image-to-video` | Seedance 2.5 Image to Video | Dreamina Seedance 2.5 animates a single still into a native 30-second clip at up to 720p, extending one frame into continuous, coherent moti | |
| `bytedance/seedance-2.5/reference-to-video` | Seedance 2.5 Reference to Video | Dreamina Seedance 2.5 generates video from up to 50 multimodal references images, video, audio, and style inputs, locking a character, set, | |
| `bytedance/seedance-2.5/us/image-to-video` | Seedance 2.5 US Image to Video | US-hosted ByteDance Seedance 2.5 animates still images with synchronized audio and optional end-frame control. Generate videos up to 30 seco | |
| `bytedance/seedance-2.5/us/reference-to-video` | Seedance 2.5 US Reference to Video | US-hosted ByteDance Seedance 2.5 generates video with native audio from up to 30 images, 10 videos, and 10 audio references. Supports refere | |
| `fal-ai/ai-avatar/multi` | AI Avatar Multi | MultiTalk model generates a multi-person conversation video from an image and audio files. Creates a realistic scene where multiple people s | |
| `fal-ai/ai-avatar/multi-text` | AI Avatar Multi Text | MultiTalk model generates a multi-person conversation video from an image and text inputs. Converts text to speech for each person, generati | |
| `fal-ai/ai-avatar/single-text` | AI Avatar Single Text | MultiTalk model generates a talking avatar video from an image and text. Converts text to speech automatically, then generates the avatar sp | |
| `fal-ai/amt-interpolation/frame-interpolation` | AMT Frame Interpolation | Interpolate between image frames | |
| `fal-ai/bernini-r/reference-to-video` | Bernini-R Reference to Video | Turn up to five reference images into one continuous, consistent video with Bernini-R, with smooth, stable camera motion and no scene cuts. | |
| `fal-ai/bytedance/omnihuman` | OmniHuman | OmniHuman generates video using an image of a human figure paired with an audio file. It produces vivid, high-quality videos where the chara | |
| `fal-ai/bytedance/omnihuman/v1.5` | Bytedance Omnihuman V1.5 | Omnihuman v1.5 is a new and improved version of Omnihuman. It generates video using an image of a human figure paired with an audio file. It | |
| `fal-ai/bytedance/seedance/v1.5/pro/image-to-video` | Bytedance Seedance V1.5 Pro Image To Video | Generate videos with audio with Seedance 1.5 (supports start & end frame) | 已接入|
| `fal-ai/bytedance/seedance/v1/pro/fast/image-to-video` | Bytedance Seedance V1 Pro Fast Image To Video | Image to Video endpoint for Seedance 1.0 Pro Fast, a next-generation video model designed to deliver maximum performance at minimal cost | |
| `fal-ai/bytedance/seedance/v1/pro/image-to-video` | Seedance 1.0 Pro | Seedance 1.0 Pro, a high quality video generation model developed by Bytedance. | |
| `fal-ai/cogvideox-5b/image-to-video` | CogVideoX-5B | Generate videos from images and prompts using CogVideoX-5B | |
| `fal-ai/cosmos-predict-2.5/image-to-video` | Cosmos Predict 2.5 2B | Generate video from text and images using NVIDIA's 2B Cosmos Post-Trained Model | |
| `fal-ai/creatify/aurora` | Creatify Aurora | Generate high fidelity, studio quality videos of your avatar speaking or singing using the Aurora from Creatify team! | |
| `fal-ai/davinci-magihuman` | Davinci Magihuman | Expressive facial performance, natural speech-expression coordination, realistic body motion, and accurate audio-video synchronization with | |
| `fal-ai/flashhead` | Flashhead | SoulX-FlashHead is a unified 1.3B-parameter framework designed for high-fidelity, infinite-length, and real-time streaming portrait video ge | |
| `fal-ai/framepack` | Framepack | Framepack is an efficient Image-to-video model that autoregressively generates videos. | |
| `fal-ai/framepack/f1` | Framepack F1 | Framepack is an efficient Image-to-video model that autoregressively generates videos. | |
| `fal-ai/framepack/flf2v` | Framepack | Framepack is an efficient Image-to-video model that autoregressively generates videos. | |
| `fal-ai/heygen/avatar4/image-to-video` | Heygen | Heygen Photo Avatar 4 Model | |
| `fal-ai/hunyuan-video-image-to-video` | Hunyuan Video Image-to-Video Inference | Image to Video for the high-quality Hunyuan Video I2V model. | |
| `fal-ai/hunyuan-video-img2vid-lora` | Hunyuan Video Image-to-Video LoRA Inference | Image to Video for the Hunyuan Video model using a custom trained LoRA. | |
| `fal-ai/hunyuan-video-v1.5/image-to-video` | Hunyuan Video V1.5 | Hunyuan Video 1.5 is Tencent's latest and best video model | |
| `fal-ai/kandinsky5-pro/image-to-video` | Kandinsky5 Pro | Kandinsky 5.0 Pro is a diffusion model for fast, high-quality image-to-video generation. | |
| `fal-ai/kandinsky6-lite/image-to-video` | Kandinsky 6.0 Lite | Kandinsky 6.0 Lite animates a single image into a short video clip, with fast, lightweight inference and prompt-guided motion. | |
| `fal-ai/kandinsky6-pro/image-to-video` | Kandinsky 6.0 Pro | Kandinsky 6.0 Pro turns a start frame into a high-resolution, cinematic video clip with controllable motion and strong visual fidelity. | |
| `fal-ai/kling-video/ai-avatar/v2/pro` | Kling AI Avatar v2 Pro | Kling AI Avatar v2 Pro: The premium endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters | |
| `fal-ai/kling-video/ai-avatar/v2/standard` | Kling AI Avatar v2 Standard | Kling AI Avatar v2 Standard:  Endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters | |
| `fal-ai/kling-video/o1/image-to-video` | Kling O1 First Frame Last Frame to Video [Pro] | Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene | |
| `fal-ai/kling-video/o1/reference-to-video` | Kling O1 Reference Image to Video [Pro] | Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and env | |
| `fal-ai/kling-video/o1/standard/image-to-video` | Kling O1 First Frame Last Frame to Video [Standard] | Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene | |
| `fal-ai/kling-video/o1/standard/reference-to-video` | Kling O1 Reference Image to Video [Standard] | Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and env | |
| `fal-ai/kling-video/o3/4k/image-to-video` | Kling Video | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/o3/4k/reference-to-video` | Kling Video | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/o3/pro/image-to-video` | Kling O3 Image to Video [Pro] | Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene | |
| `fal-ai/kling-video/o3/pro/reference-to-video` | Kling O3 Reference to Video [Pro] | Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and env | |
| `fal-ai/kling-video/o3/standard/image-to-video` | Kling O3 Image to Video [Pro] | Generate a video by taking a start frame and an end frame, animating the transition between them while following text-driven style and scene | |
| `fal-ai/kling-video/o3/standard/reference-to-video` | Kling O3 Reference to Video [Standard] | Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and env | |
| `fal-ai/kling-video/v1/pro/ai-avatar` | Kling AI Avatar Pro | Kling AI Avatar Pro: The premium endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters | |
| `fal-ai/kling-video/v1/standard/ai-avatar` | Kling AI Avatar | Kling AI Avatar Standard:  Endpoint for creating avatar videos with realistic humans, animals, cartoons, or stylized characters | |
| `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` | Kling Video | Kling 2.5 Turbo Pro: Top-tier image-to-video generation with unparalleled motion fluidity, cinematic visuals, and exceptional prompt precisi | 已接入|
| `fal-ai/kling-video/v2.5-turbo/standard/image-to-video` | Kling Video | Kling 2.5 Turbo Standard: Top-tier image-to-video generation with unparalleled motion fluidity, cinematic visuals, and exceptional prompt pr | |
| `fal-ai/kling-video/v2.6/pro/image-to-video` | Kling Video v2.6 Image to Video | Kling 2.6 Pro: Top-tier image-to-video with cinematic visuals, fluid motion, and native audio generation. | 已接入|
| `fal-ai/kling-video/v3/4k/image-to-video` | Kling Video | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/v3/pro/image-to-video` | Kling Video v3 Image to Video [Pro] | Kling 3.0 Pro: Top-tier image-to-video with cinematic visuals, fluid motion, and native audio generation, with custom element support. | |
| `fal-ai/kling-video/v3/standard/image-to-video` | Kling Video v3 Image to Video [Standard] | Kling 3.0 Standard: Top-tier image-to-video with cinematic visuals, fluid motion, and native audio generation, with custom element support. | |
| `fal-ai/kling-video/v3/turbo/pro/image-to-video` | Kling Video V3 Turbo Pro Image to Video | Generate high quality 1080p videos from images using Kling's Turbo 3.0 model, with improved lipsync and multishot generation capabilities. | |
| `fal-ai/kling-video/v3/turbo/standard/image-to-video` | Kling Video V3 Standard Turbo Image to Video | Kling 3.0 Turbo Standard animates a first and last frame reference image into 720P video with native audio, delivering quick, affordable ima | |
| `fal-ai/live-portrait` | Live Portrait | Transfer expression from a video to a portrait. | |
| `fal-ai/longcat-video/distilled/image-to-video/480p` | LongCat Video Distilled | Generate long videos from images using LongCat Video Distilled | |
| `fal-ai/longcat-video/distilled/image-to-video/720p` | LongCat Video Distilled | Generate long videos in 720p/30fps from images using LongCat Video Distilled | |
| `fal-ai/longcat-video/image-to-video/480p` | LongCat Video | Generate long videos from images using LongCat Video | |
| `fal-ai/longcat-video/image-to-video/720p` | LongCat Video | Generate long videos in 720p/30fps from images using LongCat Video | |
| `fal-ai/ltx-2.3-22b/distilled/image-to-video` | LTX-2.3 22B Distilled | Generate video with audio from images using LTX-2.3 Distilled | |
| `fal-ai/ltx-2.3-22b/distilled/image-to-video/lora` | LTX-2.3 22B Distilled | Generate video with audio from images using LTX-2.3 Distilled and custom LoRA | |
| `fal-ai/ltx-2.3-22b/image-to-video` | LTX-2.3 22B | Generate video with audio from images using LTX-2.3 | |
| `fal-ai/ltx-2.3-22b/image-to-video/lora` | LTX-2.3 22B | Generate video with audio from images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-quality/image-to-video` | Ltx 2.3 Quality | Generate high-quality video with audio from images using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/image-to-video/lora` | Ltx 2.3 Quality | Generate high-quality video with audio from images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-quality/ingredient` | Ltx 2.3 Quality | Generate high-quality video with audio from reference, character sheet, storyboard using LTX-2.3 | |
| `fal-ai/ltx-2.3/image-to-video` | LTX 2.3 Video Pro | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-2.3/image-to-video/fast` | LTX 2.3 Video Fast | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-video-13b-distilled/image-to-video` | LTX Video-0.9.7 13B Distilled | Generate videos from prompts and images using LTX Video-0.9.7 13B Distilled and custom LoRA | |
| `fal-ai/ltx-video/image-to-video` | LTX Video (preview) | Generate videos from images using LTX Video | |
| `fal-ai/ltxv-13b-098-distilled/image-to-video` | LTX-Video 13B 0.9.8 Distilled | Generate long videos from prompts and images using LTX Video-0.9.8 13B Distilled and custom LoRA | |
| `fal-ai/magi-distilled/image-to-video` | MAGI-1 (Distilled) | MAGI-1 distilled generates videos faster from images with exceptional understanding of physical interactions and prompting | |
| `fal-ai/minimax/hailuo-02-fast/image-to-video` | Minimax | Create blazing fast and economical videos with MiniMax Hailuo-02 Image To Video API at 512p resolution | |
| `fal-ai/minimax/hailuo-02/pro/image-to-video` | MiniMax Hailuo 02 [Pro] (Image to Video) | MiniMax Hailuo-02 Image To Video API (Pro, 1080p): Advanced image-to-video generation model with 1080p resolution | |
| `fal-ai/minimax/hailuo-02/standard/image-to-video` | MiniMax Hailuo 02 [Standard] (Image to Video) | MiniMax Hailuo-02 Image To Video API (Standard, 768p, 512p): Advanced image-to-video generation model with 768p and 512p resolutions | |
| `fal-ai/minimax/hailuo-2.3-fast/pro/image-to-video` | MiniMax Hailuo 2.3 Fast [Pro] (Image to Video) | MiniMax Hailuo-2.3-Fast Image To Video API (Pro, 1080p): Advanced fast image-to-video generation model with 1080p resolution | |
| `fal-ai/minimax/hailuo-2.3-fast/standard/image-to-video` | MiniMax Hailuo 2.3 Fast [Standard] (Image to Video) | MiniMax Hailuo-2.3-Fast Image To Video API (Standard, 768p): Advanced fast image-to-video generation model with 768p resolution | |
| `fal-ai/minimax/hailuo-2.3/pro/image-to-video` | MiniMax Hailuo 2.3 [Pro] (Image to Video) | MiniMax Hailuo-2.3 Image To Video API (Pro, 1080p): Advanced image-to-video generation model with 1080p resolution | |
| `fal-ai/minimax/hailuo-2.3/standard/image-to-video` | MiniMax Hailuo 2.3 [Standard] (Image to Video) | MiniMax Hailuo-2.3 Image To Video API (Standard, 768p): Advanced image-to-video generation model with 768p resolution | |
| `fal-ai/minimax/video-01-director/image-to-video` | MiniMax (Hailuo AI) Video 01 Director - Image to Video | Generate video clips more accurately with respect to initial image, natural language descriptions, and using camera movement instructions fo | |
| `fal-ai/minimax/video-01-live/image-to-video` | MiniMax (Hailuo AI) Video 01 | Generate video clips from your images using MiniMax Video model | |
| `fal-ai/minimax/video-01-subject-reference` | MiniMax (Hailuo AI) Video 01 Subject Reference | Generate video clips maintaining consistent, realistic facial features and identity across dynamic video content | |
| `fal-ai/minimax/video-01/image-to-video` | MiniMax (Hailuo AI) Video 01 | Generate video clips from your images using MiniMax Video model | |
| `fal-ai/musetalk` | MuseTalk | MuseTalk is a real-time high quality audio-driven lip-syncing model. Use MuseTalk to animate a face with your own audio. | |
| `fal-ai/ovi/image-to-video` | Ovi | Ovi can generate videos with audio from image and text inputs. | |
| `fal-ai/pika/v2.1/image-to-video` | Pika Image to Video (v2.1) | Turn photos into mind-blowing, dynamic videos. Your images can can come to life with sharp details, impressive character control and cinemat | |
| `fal-ai/pika/v2.2/image-to-video` | Pika Image to Video (v2.2) | Turn photos into mind-blowing, dynamic videos in up to 1080p. Experience better image clarity and crisper, sharper visuals. | |
| `fal-ai/pika/v2.2/pikaframes` | Pika | Discover ultimate control with Pikaframes key frame interpolation, a stunning image-to-video feature that allows you to upload up to 5 keyfr | |
| `fal-ai/pika/v2.2/pikascenes` | Pika Scenes (v2.2) | Pika Scenes v2.2 creates videos from a images with high quality output. | |
| `fal-ai/pika/v2/turbo/image-to-video` | Pika Image to Video Turbo (v2) | Turbo is the model to use when you feel the need for speed. Turn your image to stunning video up to 3x faster – all with high quality output | |
| `fal-ai/pixverse/c1/image-to-video` | PixVerse C1 Image To Video | Animate images into cinematic videos with PixVerse C1, supporting 1080p resolution and native audio generation. | |
| `fal-ai/pixverse/c1/reference-to-video` | PixVerse C1 Reference To Video | Generate character-consistent videos from reference images using PixVerse C1, with subject and background references. | |
| `fal-ai/pixverse/c1/transition` | PixVerse C1 Transition | Create seamless cinematic transitions between two images with PixVerse C1, with native audio and up to 1080p. | |
| `fal-ai/pixverse/swap` | PixVerse Swap | Generate high quality video clips by swapping person, objects and background using Pixverse Swap. | |
| `fal-ai/pixverse/v3.5/effects` | PixVerse V3.5 Effects | Generate high quality video clips with different effects using PixVerse v3.5 | |
| `fal-ai/pixverse/v3.5/image-to-video` | PixVerse V3.5 Image To Video | Generate high quality video clips from text and image prompts using PixVerse v3.5 | |
| `fal-ai/pixverse/v3.5/image-to-video/fast` | PixVerse V3.5 Image To Video Fast | Generate high quality video clips from text and image prompts quickly using PixVerse v3.5 Fast | |
| `fal-ai/pixverse/v3.5/transition` | PixVerse V3.5 Transition | Create seamless transition between images using PixVerse v3.5 | |
| `fal-ai/pixverse/v4.5/effects` | PixVerse V4.5 Effects | Generate high quality video clips with different effects using PixVerse v4.5 | |
| `fal-ai/pixverse/v4.5/image-to-video` | PixVerse V4.5 Image To Video | Generate high quality video clips from text and image prompts using PixVerse v4.5 | |
| `fal-ai/pixverse/v4.5/image-to-video/fast` | PixVerse V4.5 Image To Video Fast | Generate fast high quality video clips from text and image prompts using PixVerse v4.5 | |
| `fal-ai/pixverse/v4.5/transition` | PixVerse V4.5 Transition | Create seamless transition between images using PixVerse v4.5 | |
| `fal-ai/pixverse/v4/effects` | PixVerse V4 Effects | Generate high quality video clips with different effects using PixVerse v4 | |
| `fal-ai/pixverse/v4/image-to-video` | PixVerse V4 Image To Video | Generate high quality video clips from text and image prompts using PixVerse v4 | |
| `fal-ai/pixverse/v4/image-to-video/fast` | PixVerse V4 Image To Video Fast | Generate fast high quality video clips from text and image prompts using PixVerse v4 | |
| `fal-ai/pixverse/v5.5/effects` | PixVerse V5.5 Effects | Pixverse Effects | |
| `fal-ai/pixverse/v5.5/image-to-video` | PixVerse V5.5 Image To Video | Generate high quality video clips from text and image prompts using PixVerse v5.5 | |
| `fal-ai/pixverse/v5.5/transition` | PixVerse V5.5 Transition | Pixverse Transition | |
| `fal-ai/pixverse/v5.6/image-to-video` | PixVerse V5.6 Image To Video | Use the latest pixverse v5.6 model to turn your texts and images into amazing videos. | |
| `fal-ai/pixverse/v5.6/transition` | PixVerse V5.6 Transition | Use the latest pixverse v5.6 model to turn your texts and images into amazing videos. | |
| `fal-ai/pixverse/v5/effects` | PixVerse V5 Effects | Generate high quality video clips with different effects using PixVerse v5 | |
| `fal-ai/pixverse/v5/image-to-video` | PixVerse V5 Image To Video | Generate high quality video clips from text and image prompts using PixVerse v5 | |
| `fal-ai/pixverse/v5/transition` | PixVerse V5 Transition | Create seamless transition between images using PixVerse v5 | |
| `fal-ai/pixverse/v6/image-to-video` | PixVerse V6 Image To Video | Pixverse's latest V6 Model | |
| `fal-ai/pixverse/v6/transition` | PixVerse V6 Transition | Pixverse's latest v6 Model. | |
| `fal-ai/sadtalker` | Sad Talker | Learning Realistic 3D Motion Coefficients for Stylized Audio-Driven Single Image Talking Face Animation | |
| `fal-ai/sadtalker/reference` | Sad Talker | Learning Realistic 3D Motion Coefficients for Stylized Audio-Driven Single Image Talking Face Animation | |
| `fal-ai/stable-video` | High Quality Stable Video Diffusion | Generate short video clips from your images using SVD v1.1 | |
| `fal-ai/sync-lipsync/v3/image-to-video` | sync-3 Avatar Image to Video | sync-3 image to video turns a single still into a talking character, and works with any illustration or animated frame paired with a voice t | |
| `fal-ai/veo3.1/fast/first-last-frame-to-video` | Veo 3.1 Fast | Generate videos from a first/last frame using Google's Veo 3.1 Fast | |
| `fal-ai/veo3.1/fast/image-to-video` | Veo 3.1 Fast | Generate videos from your image prompts using Veo 3.1 fast. | 已接入|
| `fal-ai/veo3.1/fast/reference-to-video` | Veo 3.1 Fast | Generate videos from reference images using Google's Veo 3.1 Fast | |
| `fal-ai/veo3.1/first-last-frame-to-video` | Veo 3.1 | Generate videos from a first and last framed using Google's Veo 3.1 | |
| `fal-ai/veo3.1/image-to-video` | Veo 3.1 | Veo 3.1 is the latest state-of-the art video generation model from Google DeepMind | 已接入|
| `fal-ai/veo3.1/lite/first-last-frame-to-video` | Veo3.1 Lite FLF | Veo 3.1 Lite balances practical utility with professional capabilities, supporting Text-to-Video and Image-to-Video | |
| `fal-ai/veo3.1/lite/image-to-video` | Veo3.1 Lite Image to Video | Veo 3.1 Lite balances practical utility with professional capabilities, supporting Text-to-Video and Image-to-Video | |
| `fal-ai/veo3.1/reference-to-video` | Veo 3.1 | Generate Videos from images using Google's Veo 3.1 | |
| `fal-ai/vidu/image-to-video` | Vidu Image to Video | Vidu Image to Video generates high-quality videos with exceptional visual quality and motion diversity from a single image | |
| `fal-ai/vidu/q1/image-to-video` | Vidu Image to Video | Vidu Q1 Image to Video generates high-quality 1080p videos with exceptional visual quality and motion diversity from a single image | |
| `fal-ai/vidu/q1/start-end-to-video` | Vidu Start End to Video | Vidu Q1 Start-End to Video generates smooth transition 1080p videos between specified start and end images. | |
| `fal-ai/vidu/q2/image-to-video/pro` | Vidu | Use the latest Vidu Q2 models which much more better quality and control on your videos. | |
| `fal-ai/vidu/q2/image-to-video/turbo` | Vidu | Use the latest Vidu Q2 models which much more better quality and control on your videos. | |
| `fal-ai/vidu/q3/image-to-video/turbo` | Vidu | Vidu's Q3 Turbo Model | |
| `fal-ai/vidu/reference-to-video` | Vidu Reference to Video | Vidu Reference to Video creates videos by using a reference images and combining them with a prompt. | |
| `fal-ai/vidu/start-end-to-video` | Vidu Start-End to Video | Vidu Start-End to Video generates smooth transition videos between specified start and end images. | |
| `fal-ai/vidu/template-to-video` | Vidu Template to Video | Vidu Template to Video lets you create different effects by applying motion templates to your images. | |
| `fal-ai/wan-25-preview/image-to-video` | Wan 2.5 Image to Video | Wan 2.5 image-to-video model. | |
| `fal-ai/wan-effects` | Wan Effects | Wan Effects generates high-quality videos with popular effects from images | |
| `fal-ai/wan-flf2v` | Wan-2.1 First-Last-Frame-to-Video | Wan-2.1 flf2v generates dynamic videos by intelligently bridging a given first frame to a desired end frame through smooth, coherent motion | |
| `fal-ai/wan-i2v` | Wan-2.1 Image-to-Video | Wan-2.1 is a image-to-video model that generates high-quality videos with high visual quality and motion diversity from images | |
| `fal-ai/wan-i2v-lora` | Wan-2.1 Image-to-Video with LoRAs | Add custom LoRAs to Wan-2.1 is a image-to-video model that generates high-quality videos with high visual quality and motion diversity from | |
| `fal-ai/wan-pro/image-to-video` | Wan-2.1 Pro Image-to-Video | Wan-2.1 Pro is a premium image-to-video model that generates high-quality 1080p videos at 30fps with up to 6 seconds duration, delivering ex | |
| `fal-ai/wan/v2.2-5b/image-to-video` | Wan v2.2 5B | Wan 2.2's 5B model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding | |
| `fal-ai/wan/v2.2-a14b/image-to-video` | Wan v2.2 A14B | fal-ai/wan/v2.2-A14B/image-to-video | |
| `fal-ai/wan/v2.2-a14b/image-to-video/lora` | Wan v2.2 A14B Image-to-Video A14B with LoRAs | Wan-2.2 image-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts a | |
| `fal-ai/wan/v2.2-a14b/image-to-video/turbo` | Wan | Wan-2.2 Turbo image-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text pro | |
| `fal-ai/wan/v2.7/image-to-video` | Wan | Wan 2.7 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `fal-ai/wan/v2.7/reference-to-video` | Wan 2.7 Reference to Video | Wan 2.7 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `google/gemini-omni-flash/image-to-video` | Gemini Omni Flash | Animates a still image into video with audio. Extends a single frame into coherent motion, grounded in Gemini's physical understanding of ho | |
| `google/gemini-omni-flash/reference-to-video` | Gemini Omni Flash | Generates video with audio from combined multimodal references. Accepts text, images, audio, and video together as input to guide subject, m | |
| `google/gemini-omni-flash/v1.1/image-to-video` | Gemini Omni Flash 1.1 Image to Video | Gemini Omni Flash 1.1 is Google's multimodal video model. This endpoint animates a still image into video with synchronized audio, extending | |
| `google/gemini-omni-flash/v1.1/reference-to-video` | Gemini Omni Flash 1.1 Reference to Video | Gemini Omni Flash 1.1 is Google's multimodal video model. This endpoint generates video from combined multimodal references, images, videos | |
| `lightricks/ltx-2.5/image-to-video/fast` | LTX 2.5 Image to Video Fast | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint animates a still image into video with synchronized audio in a single pa | |
| `lightricks/ltx-2.5/image-to-video/pro` | LTX 2.5 Image to Video Pro | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint animates a still image into video with synchronized audio in a single pa | |
| `luma/agent/ray/v3.2/image-to-video` | Luma Ray 3.2 Image to Video | Luma Ray 3.2 animates a source image into cinematic motion guided by a text prompt, preserving the starting frame's look while controlling r | |
| `minimax/h3-max-turbo/image-to-video` | H3 Max Turbo Image to Video | fal's H3 Max Turbo is a post-trained variant of MiniMax H3, tuned for stronger prompt adherence and better aesthetics while co-optimized wit | |
| `minimax/h3-max/camera-controls` | H3 Max Camera Controls | H3 Max Multi Angle turns a single image into a video with precise, keyframe-based control over the camera's orbit, elevation, and distance i | |
| `minimax/h3-max/image-to-video` | H3 Max Image to Video | fal's H3 Max is a post-trained variant of MiniMax H3, tuned for stronger prompt adherence and better aesthetics while co-optimized with our | |
| `minimax/h3-max/lip-sync/image-to-video` | H3 Max Lip Sync Image to Video | H3 Max Lip Sync generates a video from an image and supplied audio, synchronizing mouth movements to the soundtrack. It supports optional tr | |
| `minimax/h3-max/reference-to-video` | H3 Max Reference to Video | fal's H3 Max is a post-trained variant of MiniMax H3, tuned for stronger prompt adherence and better aesthetics while co-optimized with our | |
| `minimax/h3/image-to-video` | MiniMax H3 Image to Video | MiniMax H3 is a frontier video model. This endpoint animates a supplied image into 2K video, using it as the opening frame or pairs a first | |
| `minimax/h3/image-to-video/lora` | MiniMax H3 Image to Video LoRA | Images into video with synchronized audio using MiniMax H3; your image becomes the first frame, prompt optional, with trained LoRA support f | |
| `minimax/h3/reference-to-video` | MiniMax H3 Reference to Video | MiniMax H3 is a frontier video model. This endpoint generates 2K video from multimodal references up to 9 images for subject and style, 3 vi | |
| `mirage-api/avatar-x/reference-to-video` | Mirage Avatar X | The Avatar X API offers access to Mirage's most advanced generation model yet, delivering industry-leading identity preservation and express | |
| `moonvalley/marey/i2v` | Marey Realism V1.5 | Generate a video starting from an image as the first frame with Marey, a generative video model trained exclusively on fully licensed data. | |
| `nvidia/cosmos-3-super/image-to-video` | Cosmos 3 Super Image to Video | Cosmos3 is a collection of Omnimodal world models capable of generating dynamic, high-quality video, image, audio, and action commands from | |
| `pixelcut/looping-video` | Pixelcut Looping Video | Turn one product photo into a seamless 5 to 15 second video loop with a locked camera, subtle ambient motion or a full 360° spin. | |
| `veed/fabric-1.0` | Fabric 1.0 | VEED Fabric 1.0 is an image-to-video API that turns any image into a talking video | |
| `veed/fabric-1.0/fast` | Fabric 1.0 Fast | VEED Fabric 1.0 is an image-to-video API that turns any image into a talking video | |
| `wan/v2.6/image-to-video` | Wan v2.6 Image to Video | Wan 2.6 image-to-video model. | |
| `wan/v2.6/image-to-video/flash` | V2.6 | Wan 2.6 image-to-video flash model. | |
| `xai/grok-imagine-video/image-to-video` | Grok Imagine Video | Generate videos from images with audio using xAI's Grok Imagine Video model. | |
| `xai/grok-imagine-video/reference-to-video` | Grok Imagine Reference to Video | Generate videos using multiple reference images with xAI's Grok Imagine video model | |
| `xai/grok-imagine-video/v1.5/image-to-video` | Grok Imagine Video 1.5 | Generate videos from images with audio using xAI's Grok Imagine 1.5 Video model. | |
| `xai/grok-imagine-video/v1.5/lite/image-to-video` | Grok Imagine Video 1.5 Lite Image to Video | Generate videos from images using xAI's Grok Imagine Video 1.5 Lite model. | |
| `xai/grok-imagine-video/v1.5/reference-to-video` | Grok Imagine Video 1.5 Reference to Video | Generate videos from images and audio references using xAI's Grok Imagine 1.5 Video model. | |

## video-to-video（199）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/happy-horse/video-edit` | Happy Horse Video Edit | HappyHorse video editing supports advanced video editing through natural language instructions. It allows for local or global editing of vid | |
| `alibaba/wan-3.0-prime/reference-to-video` | Wan 3.0 Prime | Wan 3.0 Prime Reference-to-Video combines reference images, videos, and audio into a unified video with fast generation and strong multimoda | |
| `blackforestlabs/flux-3/draft-enhance` | Flux 3 Draft Enhance | FLUX.3 is Black Forest Labs' frontier audio/video model. Re-render a previously generated draft at full quality — same seed, same motion, no | |
| `blackforestlabs/flux-3/edit-video` | Flux 3 FAST Edit Video | FLUX.3 Edit Video [FAST] is Black Forest Labs' frontier video model. This endpoint edits an existing video from natural-language instruction | |
| `blackforestlabs/flux-3/extend-video` | Flux 3 Extend Video | FLUX 3 is Black Forest Labs' frontier video model. This endpoint continues an existing clip beyond its final frame, generating additional fo | |
| `blackforestlabs/flux-3/extend-video/draft` | Flux 3 Extend Video Draft | FLUX.3 is Black Forest Labs' frontier audio/video model. Generate fast, low-cost draft previews that continue an existing clip, with a reusa | |
| `blackforestlabs/flux-video-upscale` | Flux Video Upscale | Upscale videos to 1080p, 2K, or 4K via API. FLUX 3 powered super-resolution with a precise mode and a creative detail-enhancement mode. | |
| `bria/bria_video_eraser/erase/keypoints` | Bria Video Eraser | A high-fidelity capability for erasing unwanted objects, people, or visual elements from videos while maintaining aesthetic quality and temp | |
| `bria/bria_video_eraser/erase/mask` | Bria Video Eraser Erase Mask | A high-fidelity capability for erasing unwanted objects, people, or visual elements from videos while maintaining aesthetic quality and temp | |
| `bria/bria_video_eraser/erase/prompt` | Bria Video Eraser | A high-fidelity capability for erasing unwanted objects, people, or visual elements from videos while maintaining aesthetic quality and temp | |
| `bria/video/background-removal` | Video | Automatically remove backgrounds from videos -perfect for creating clean, professional content without a green screen. | |
| `bria/video/background-removal/green-screen-despill` | Video | Remove background from videos filmed using chromakey, with automatic green spill suppression for clean, professional edges. | |
| `bria/video/background-removal/realtime` | Bria's VRMBG 3.0 Realtime | Remove video backgrounds in real time with Bria’s VRMBG 3.0 model. Built for live streaming, real-time video apps, content creation, and low | |
| `bria/video/background-removal/v3` | Bria's VRMBG 3.0 | Remove backgrounds from any video with Bria's VRMBG 3.0. Fast, accurate background removal across talking heads, podcasts, product videos, c | |
| `bria/video/erase/keypoints` | Video | High-fidelity keypoint-driven video object removal - minimal input, strong temporal consistency. Trained on licensed data for risk-free comm | |
| `bria/video/erase/mask` | Video | High-fidelity mask-based video object removal with strong temporal consistency. Erase unwanted objects, people, or elements while preserving | |
| `bria/video/erase/prompt` | Video | Erase unwanted objects, people, or elements from video with a text prompt. High-fidelity output with strong temporal consistency, trained on | |
| `bria/video/increase-resolution` | Video | Professional-grade video upscaler with strong temporal consistency, enhancing videos up to 8K resolution. Trained on fully licensed and comm | |
| `cassetteai/video-sound-effects-generator` | Video Sound Effects Generator | Add sound effects to your videos | |
| `clarityai/crystal-video-upscaler` | Crystal Upscaler [Video] | Do high precision video upscaling that respects the original video perfectly using Crystal Upscaler's new video upscaling method! | |
| `decart/lucy-2-5/realtime` | Lucy 2.5 | Real-time, prompt-driven video editing over WebRTC. Restyle, swap backgrounds, and add or replace objects live on a webcam or streamed feed | |
| `decart/lucy2-vton/realtime` | Lucy 2.1 VTON Realtime | Realtime Try On experience with Decart Lucy 2.1 VTON | |
| `fal-ai/amt-interpolation` | AMT Interpolation | Interpolate between video frames | |
| `fal-ai/auto-caption` | Auto-Captioner | Automatically generates text captions for your videos from the audio as per text colour/font specifications | |
| `fal-ai/ben/v2/video` | Ben-Video-Bg-Rm | A model for high quality and smooth background removal for videos. | |
| `fal-ai/bernini-r/edit-video` | Bernini-R Edit Video | Edit any video with a natural-language instruction using Bernini-R, changing objects, weather, background, or camera angle while keeping the | |
| `fal-ai/bernini-r/reference-edit-video` | Bernini-R Reference Edit Video | Edit a video guided by reference images with Bernini-R, bringing an object, material, background, style, or weather from a reference image i | |
| `fal-ai/birefnet/v2/video` | Birefnet | Video background removal version of bilateral reference framework (BiRefNet) for high-resolution dichotomous image segmentation (DIS) | |
| `fal-ai/bytedance-upscaler/upscale/video` | Bytedance Upscaler Upscale Video | Upscale videos with Bytedance's video upscaler. | |
| `fal-ai/bytedance/dreamactor/v2` | Bytedance Dreamactor V2 | Transfer motion from a video to characters in an image using Dreamactor v2. Great performance for non-human and multiple characters | |
| `fal-ai/cogvideox-5b/video-to-video` | CogVideoX-5B | Generate videos from videos and prompts using CogVideoX-5B | |
| `fal-ai/controlfoley` | Controlfoley | Foley Control is a video-to-audio model that automatically generates synchronized sound effects for videos, using text prompts to shape the | |
| `fal-ai/cosmos-predict-2.5/video-to-video` | Cosmos Predict 2.5 2B | Generate video from text and videos using NVIDIA's 2B Cosmos Post-Trained Model | |
| `fal-ai/depth-anything-video` | Depth Anything Video | Generates depth maps from video using Video Depth Anything (CVPR 2025). Produces per-frame depth estimation with temporal consistency across | |
| `fal-ai/dwpose/video` | DWPose Pose Prediction | Predict poses from videos. | |
| `fal-ai/editto` | Editto | Edit videos using instruction-based prompting using Editto model! | |
| `fal-ai/fast-animatediff/turbo/video-to-video` | AnimateDiff Turbo | Re-animate your videos in lightning speed! | |
| `fal-ai/fast-animatediff/video-to-video` | AnimateDiff | Re-animate your videos! | |
| `fal-ai/ffmpeg-api/compose` | FFmpeg API Compose | Compose videos from multiple media sources using FFmpeg API. | |
| `fal-ai/ffmpeg-api/merge-audio-video` | Ffmpeg Api Merge Audio-Video | Merge videos with standalone audio files or audio from video files. | |
| `fal-ai/ffmpeg-api/merge-videos` | Ffmpeg Api | Use ffmpeg capabilities to merge 2 or more videos. | |
| `fal-ai/film/video` | FILM | Interpolate videos with FILM - Frame Interpolation for Large Motion | |
| `fal-ai/flashvsr/upscale/video` | Flashvsr | Upscale your videos using FlashVSR with the fastest speeds! | |
| `fal-ai/flux-3-action/so101` | Flux 3 Action | FLUX 3 Action turns what the robot sees into what it does next. Give it the scene camera image, the wrist camera image, the current SO-101 j | |
| `fal-ai/heygen/v2/translate/precision` | Heygen | Heygen Translate Model with Extreme Precision | |
| `fal-ai/heygen/v2/translate/speed` | Heygen | Heygen Translate Model with Extreme Speed | |
| `fal-ai/heygen/v3/filler-word-removal` | Heygen | Use Heygen's Latest Model for Filler Word Removal. | |
| `fal-ai/heygen/v3/lipsync/precision` | Heygen Lipsync - Precision | Replace or dub audio on an existing video with high-accuracy avatar-inference lip-sync. | |
| `fal-ai/heygen/v3/lipsync/speed` | Heygen Lipsync - Speed | Replace or dub audio on an existing video with fast audio-only lip-sync. | |
| `fal-ai/hunyuan-video-foley` | Hunyuan Video Foley | Use the capabilities of the hunyuan foley model to bring life to your videos by adding sound effect to them. | |
| `fal-ai/hunyuan-video/video-to-video` | Hunyuan Video (Video-to-Video) | Hunyuan Video is an Open video generation model with high visual quality, motion diversity, text-video alignment, and generation stability. | |
| `fal-ai/id-v2v` | ID-V2V | Restyle a video’s scene, lighting, and visual style from edited keyframes while preserving the source subjects’ identity, expressions, gaze, | |
| `fal-ai/id-v2v/relight` | ID-V2V Relight | Change a video’s lighting using a relit reference frame while preserving the scene, subjects, and original performance. ID-V2V Relight propa | |
| `fal-ai/infinitalk` | Infinitalk | Infinitalk model generates a talking avatar video from an image and audio file. The avatar lip-syncs to the provided audio with natural faci | |
| `fal-ai/infinitalk/video-to-video` | Infinitalk | Infinitalk model generates a talking avatar video from an image and audio file. The avatar lip-syncs to the provided audio with natural faci | |
| `fal-ai/kandinsky6-vsr` | Kandinsky 6.0 VSR | Kandinsky 6.0 VSR is a video super-resolution model that upscales and enhances videos with sharper detail and stable, flicker-free frames. | |
| `fal-ai/kandinsky6-vsr/lite` | Kandinsky 6.0 VSR | Kandinsky 6.0 VSR Lite is a fast, lightweight video super-resolution model for quick, cost-efficient upscaling. | |
| `fal-ai/kling-video/o1/standard/video-to-video/edit` | Kling O1 Edit Video [Standard] | Edit an existing video using natural-language instructions, transforming subjects, settings, and style while retaining the original motion s | |
| `fal-ai/kling-video/o1/standard/video-to-video/reference` | Kling O1 Reference Video to Video [Standard] | Kling O1 Omni generates new shots guided by an input reference video, preserving cinematic language such as motion, and camera style to prod | |
| `fal-ai/kling-video/o1/video-to-video/edit` | Kling O1 Edit Video [Pro] | Edit an existing video using natural-language instructions, transforming subjects, settings, and style while retaining the original motion s | |
| `fal-ai/kling-video/o1/video-to-video/reference` | Kling O1 Reference Video to Video [Pro] | Kling O1 Omni generates new shots guided by an input reference video, preserving cinematic language such as motion, and camera style to prod | |
| `fal-ai/kling-video/o3/4k/video-to-video/edit` | Kling Video 4K Video to Video Edit | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/o3/4k/video-to-video/reference` | Kling Video 4K Video to Video | Kling's Native 4K is a video generation model that directly outputs professional-grade 4K video in one step, eliminating the need for post-p | |
| `fal-ai/kling-video/o3/pro/video-to-video/edit` | Kling O3 Edit Video [Pro] | Edit videos using Kling O3 from Kling Team! | |
| `fal-ai/kling-video/o3/pro/video-to-video/reference` | Kling O3 Reference Video to Video [Pro] | Kling O3 Omni generates new shots guided by an input reference video, preserving cinematic language such as motion, and camera style to prod | |
| `fal-ai/kling-video/o3/standard/video-to-video/edit` | Kling O3 Edit Video [Standard] | Edit videos using Kling O3 from Kling Team! | |
| `fal-ai/kling-video/o3/standard/video-to-video/reference` | Kling O3 Reference Video to Video [Standard] | Kling O3 Omni generates new shots guided by an input reference video, preserving cinematic language such as motion, and camera style to prod | |
| `fal-ai/kling-video/v2.6/pro/motion-control` | Kling Video v2.6 Motion Control [Pro] | Transfer movements from a reference video to any character image. Pro mode delivers higher quality output, ideal for complex dance moves and | |
| `fal-ai/kling-video/v2.6/standard/motion-control` | Kling Video v2.6 Motion Control [Standard] | Transfer movements from a reference video to any character image. Cost-effective mode for motion transfer, perfect for portraits and simple | |
| `fal-ai/kling-video/v3/pro/motion-control` | Kling Video | Transfer movements from a reference video to any character image. Cost-effective mode for motion transfer, perfect for portraits and simple | |
| `fal-ai/kling-video/v3/standard/motion-control` | Kling Video | Transfer movements from a reference video to any character image. Cost-effective mode for motion transfer, perfect for portraits and simple | |
| `fal-ai/krea-wan-14b/video-to-video` | Krea Wan 14B | Superfast video model based on Wan 2.1 14b by Krea, excelling at real-time video-editing. | |
| `fal-ai/latentsync` | LatentSync | LatentSync is a video-to-video model that generates lip sync animations from audio using advanced algorithms for high-quality synchronizatio | |
| `fal-ai/lightx/recamera` | Lightx | Use the capabilities of lightx to relight and recamera your videos. | |
| `fal-ai/lightx/relight` | Lightx | Use tlightx capabilities to relight and recamera your videos. | |
| `fal-ai/ltx-2.3-22b/distilled/reference-video-to-video` | LTX-2.3 22B Distilled | Generate video with audio from reference videos using LTX-2.3 Distilled | |
| `fal-ai/ltx-2.3-22b/distilled/reference-video-to-video/lora` | LTX-2.3 22B Distilled | Generate video with audio from reference videos using LTX-2.3 Distilled and custom LoRA | |
| `fal-ai/ltx-2.3-22b/distilled/video-to-video` | LTX-2.3 22B Distilled | Generate video with audio from videos using LTX-2.3 Distilled | |
| `fal-ai/ltx-2.3-22b/distilled/video-to-video/lora` | LTX-2.3 22B Distilled | Generate video with audio from videos using LTX-2.3 Distilled and custom LoRA | |
| `fal-ai/ltx-2.3-22b/extend-video` | LTX-2.3 22B | Extend video with audio using LTX-2.3 | |
| `fal-ai/ltx-2.3-22b/extend-video/lora` | LTX-2.3 22B | Extend video with audio using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-22b/reference-video-to-video` | LTX-2.3 22B | Generate video with audio from reference video, text and images using LTX-2.3 | |
| `fal-ai/ltx-2.3-22b/reference-video-to-video/lora` | LTX 2.3 22B | Generate video with audio from reference video, text and images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-22b/video-to-video` | LTX-2.3 22B | Generate video with audio from videos using LTX-2.3 | |
| `fal-ai/ltx-2.3-22b/video-to-video/lora` | LTX-2.3 22B | Generate video with audio from videos using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-quality/clean-plate` | Ltx 2.3 Quality | Remove character from your video using Ltx 2.3 | |
| `fal-ai/ltx-2.3-quality/colorization` | Ltx 2.3 Quality | Colorize high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/cross-eyed` | Ltx 2.3 Quality | Cross-eyes for high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/day-to-night` | Ltx 2.3 Quality | Day to Night for high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/deblur` | Ltx 2.3 Quality | Deblur high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/decompression` | Ltx 2.3 Quality | Decompression / Denoise high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/extend-video` | Ltx 2.3 Quality | Extend high-quality video with audio from input video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/extend-video/lora` | Ltx 2.3 Quality | Extend high-quality video with audio from input video using LTX-2.3 with Lora | |
| `fal-ai/ltx-2.3-quality/hdr` | Ltx 2.3 Quality | Generate HDR from reference video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/hdr/lora` | Ltx 2.3 Quality | Generate HDR from reference video using LTX-2.3 with lora | |
| `fal-ai/ltx-2.3-quality/inpaint` | Ltx 2.3 Quality | Inpaint high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/inpaint/lora` | Ltx 2.3 Quality | Inpaint high-quality video using LTX-2.3  with lora | |
| `fal-ai/ltx-2.3-quality/instant-shave` | Ltx 2.3 Quality | Instant shave high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/outpaint` | Ltx 2.3 Quality | Outpaint high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/outpaint/lora` | Ltx 2.3 Quality | Outpaint high-quality video using LTX-2.3 with Lora | |
| `fal-ai/ltx-2.3-quality/reference-video-to-video` | Ltx 2.3 Quality | Generate high-quality video with audio from reference video, text and images using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/reference-video-to-video/lora` | Ltx 2.3 Quality | Generate high-quality video with audio from reference video, text and images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-quality/render-to-real` | Ltx 2.3 Quality | Transform your 3D video render into realistic using first frame with Ltx 2.3 | |
| `fal-ai/ltx-2.3-quality/water-simulation` | Ltx 2.3 Quality | Water Simulation transformation for high-quality video using LTX-2.3 | |
| `fal-ai/ltx-2.3/extend-video` | LTX Video 2.3 Pro | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-2.3/reframe` | Ltx 2.3 | LTX-2.3 Reframe converts your videos to any aspect ratio without destructive cropping. It intelligently recenters the original footage and | |
| `fal-ai/ltx-2.3/retake-video` | LTX Video 2.3 Pro | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/ltx-video-13b-distilled/extend` | LTX Video-0.9.7 13B Distilled | Extend videos using LTX Video-0.9.7 13B Distilled and custom LoRA | |
| `fal-ai/ltx-video-13b-distilled/multiconditioning` | LTX Video-0.9.7 13B Distilled | Generate videos from prompts, images, and videos using LTX Video-0.9.7 13B Distilled and custom LoRA | |
| `fal-ai/ltx-video-v095/extend` | LTX Video-0.9.5 | Generate videos from prompts and videos using LTX Video-0.9.5 | |
| `fal-ai/ltx-video-v095/multiconditioning` | LTX Video-0.9.5 | Generate videos from prompts,images, and videos using LTX Video-0.9.5 | |
| `fal-ai/ltxv-13b-098-distilled/extend` | LTX-Video 13B 0.9.8 Distilled | Extend videos using LTX Video-0.9.8 13B Distilled and custom LoRA | |
| `fal-ai/ltxv-13b-098-distilled/multiconditioning` | LTX-Video 13B 0.9.8 Distilled | Generate long videos from prompts, images, and videos using LTX Video-0.9.8 13B Distilled and custom LoRA | |
| `fal-ai/magi-distilled/extend-video` | MAGI-1 (Distilled) | MAGI-1 distilled extends videos faster with an exceptional understanding of physical interactions and prompts | |
| `fal-ai/mmaudio-v2` | MMAudio V2 | MMAudio generates synchronized audio given video and/or text inputs. It can be combined with video models to get videos with audio. | |
| `fal-ai/one-to-all-animation/1.3b` | One To All Animation | One-to-All Animation is a pose driven video model that animates characters from a single reference image, enabling flexible, alignment-free | |
| `fal-ai/one-to-all-animation/14b` | One To All Animation | One-to-All Animation is a pose driven video model that animates characters from a single reference image, enabling flexible, alignment-free | |
| `fal-ai/pixverse/extend` | PixVerse Extend | PixVerse Extend model is a video extending tool for your videos using with high-quality video extending techniques | |
| `fal-ai/pixverse/extend/fast` | PixVerse Extend Fast | PixVerse Extend model is a video extending tool for your videos using with high-quality video extending techniques | |
| `fal-ai/pixverse/lipsync` | PixVerse Lipsync | Generate realistic lipsync animations from audio using advanced algorithms for high-quality synchronization with PixVerse Lipsync model | |
| `fal-ai/pixverse/sound-effects` | PixVerse Sound Effects | Add immersive sound effects and background music to your videos using PixVerse sound effects  generation | |
| `fal-ai/pixverse/v6/extend` | PixVerse V6 Extend | Pixverse's latest v6 Model. | |
| `fal-ai/rife/video` | RIFE | Interpolate videos with RIFE - Real-Time Intermediate Flow Estimation | |
| `fal-ai/sam-3-1/video` | Sam 3 1 | SAM 3.1 builds comes with Object Multiplex, a shared-memory approach for joint multi-object tracking that delivers faster speeds with larger | |
| `fal-ai/sam-3-1/video-rle` | Sam 3 1 | SAM 3.1 builds comes with Object Multiplex, a shared-memory approach for joint multi-object tracking that delivers faster speeds with larger | |
| `fal-ai/sam-3/video` | Sam 3 | SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text o | |
| `fal-ai/sam-3/video-rle` | Sam 3 | SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text o | |
| `fal-ai/sam2/video` | Segment Anything Model 2 | SAM 2 is a model for segmenting images and videos in real-time. | |
| `fal-ai/scail-2` | Scail 2 | SCAIL-2 is an end-to-end character animation model that drives a reference character from a source video without relying on intermediate pos | |
| `fal-ai/seedvr/upscale/video` | SeedVR2 | Upscale your videos using SeedVR2 with temporal consistency! | |
| `fal-ai/sync-lipsync` | sync.so -- lipsync 1.9.0-beta | Generate realistic lipsync animations from audio using advanced algorithms for high-quality synchronization. | |
| `fal-ai/sync-lipsync/react-1` | Sync React-1 | Use React-1 from SyncLabs to refine human emotions and do realistic lip-sync without losing details! | |
| `fal-ai/sync-lipsync/v2` | Sync Lipsync 2.0 | Generate realistic lipsync animations from audio using advanced algorithms for high-quality synchronization with Sync Lipsync 2.0 model | |
| `fal-ai/sync-lipsync/v2/pro` | Sync Lipsync | Generate high-quality realistic lipsync animations from audio while preserving unique details like natural teeth and unique facial features | |
| `fal-ai/sync-lipsync/v3` | sync-3 Lipsync | sync-3 most powerful lipsync model yet, featuring native visual intelligence for professional-quality video. | |
| `fal-ai/thinksound` | ThinkSound | Generate realistic audio for a video with an optional text prompt and combine | |
| `fal-ai/thinksound/audio` | ThinkSound | Generate realistic audio from a video with an optional text prompt | |
| `fal-ai/veo3.1/extend-video` | Veo 3.1 | Extend Veo-Created Videos up to 30 seconds | |
| `fal-ai/veo3.1/fast/extend-video` | Veo 3.1 Fast | Extend Veo-Created Videos up to 30 seconds | |
| `fal-ai/video-upscaler` | Video Upscaler | The video upscaler endpoint uses RealESRGAN on each frame of the input video to upscale the video to a higher resolution. | |
| `fal-ai/vidu/q2/video-extension/pro` | Vidu | Use the latest Vidu Q2 models which much more better quality and control on your videos. | |
| `fal-ai/void-video-inpainting` | Void Video Inpainting | VOID removes objects from videos along with all interactions they induce on the scene | |
| `fal-ai/wan-22-vace-fun-a14b/depth` | Wan 2.2 VACE Fun A14B | VACE Fun for Wan 2.2 A14B from Alibaba-PAI | |
| `fal-ai/wan-22-vace-fun-a14b/inpainting` | Wan 2.2 VACE Fun A14B | VACE Fun for Wan 2.2 A14B from Alibaba-PAI | |
| `fal-ai/wan-22-vace-fun-a14b/outpainting` | Wan 2.2 VACE Fun A14B | VACE Fun for Wan 2.2 A14B from Alibaba-PAI | |
| `fal-ai/wan-22-vace-fun-a14b/reframe` | Wan 2.2 VACE Fun A14B | VACE Fun for Wan 2.2 A14B from Alibaba-PAI | |
| `fal-ai/wan-motion` | Wan Motion | Wan Motion is a streamlined character animation model that transfers motion from a driving video onto a reference character image. Based on | |
| `fal-ai/wan-vace-14b` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-14b/depth` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-14b/inpainting` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-14b/outpainting` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-14b/pose` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-14b/reframe` | Wan VACE 14B | VACE is a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources. | |
| `fal-ai/wan-vace-apps/long-reframe` | Wan 2.1 VACE Long Reframe | Reframe entire videos scene-by-scene using Wan VACE 2.1 | |
| `fal-ai/wan-vace-apps/video-edit` | Wan VACE Video Edit | Edit videos using plain language and Wan VACE | |
| `fal-ai/wan/v2.2-14b/animate/move` | Wan-2.2 Animate Move | Wan-Animate is a video model that generates high-fidelity character videos by replicating the expressions and movements of characters from r | |
| `fal-ai/wan/v2.2-14b/animate/replace` | Wan-2.2 Animate Replace | Wan-Animate Replace is a model that can integrate animated characters into reference videos, replacing the original character while preservi | |
| `fal-ai/wan/v2.2-a14b/video-to-video` | Wan | Wan-2.2 video-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts a | |
| `fal-ai/wan/v2.7/edit-video` | Wan | Wan 2.7 is the latest generation AI video model, delivering enhanced motion smoothness, superior scene fidelity, and greater visual coherenc | |
| `fal-ai/workflow-utilities/auto-subtitle` | Workflow Utilities Auto Subtitle | Add automatic subtitles to videos | |
| `fal-ai/workflow-utilities/blend-video` | Workflow Utilities Blend Video | FFMPEG Utility for Blending Videos | |
| `fal-ai/workflow-utilities/reverse-video` | Workflow Utilities Reverse Video | FFMPEG Utility to Reverse Videos | |
| `fal-ai/workflow-utilities/scale-video` | Workflow Utilities Scale Video | FFMPEG Utilities to Scale Videos | |
| `fal-ai/workflow-utilities/trim-video` | Workflow Utilities Trim Video | FFMPEG Utility for Trim Video | |
| `google/gemini-omni-flash/edit` | Gemini Omni Flash | Edits generated video across multiple conversational turns while preserving scene coherence. Applies iterative changes through natural-langu | |
| `google/gemini-omni-flash/v1.1/edit` | Gemini Omni Flash 1.1 Edit | Gemini Omni Flash 1.1 is Google's multimodal video model. This endpoint edits video through natural-language instruction, applying the reque | |
| `luma/agent/ray/v3.2/reframe` | Luma Ray 3.2 Reframe | Luma Ray 3.2 reframes an existing video into a new aspect ratio guided by a text prompt, preserving the original footage frame-for-frame whi | |
| `luma/agent/ray/v3.2/video-to-video` | Luma Ray 3.2 Video to Video | Luma Ray 3.2 re-renders an existing video into new cinematic motion guided by a text prompt, preserving the source's look and movement while | |
| `minimax/h3-max-turbo/extend-video` | H3 Max Turbo Extend Video | Extend an existing video with H3 Max Turbo: add 1 to 15 seconds of prompt-guided footage, with optional audio references and output resoluti | |
| `minimax/h3-max/3d-to-video` | H3 Max 3D to Video | Transform Blender renders and 3D previs into photorealistic video. H3 Max uses the source clip to guide scene layout, camera movement, and t | |
| `minimax/h3-max/extend-video` | H3 Max Extend Video | H3 Max Extend Video adds a text-guided continuation to an existing video. It supports prompt expansion, adjustable duration and aspect ratio | |
| `minimax/h3-max/insert-video` | H3 Max | Insert a new scene into an existing video with H3 Max. Guide the scene with a prompt, reference images, or reference videos, then return to | |
| `minimax/h3-max/recast` | H3 Max Recast | Recast the people in a video using reference photos with H3 Max, while preserving the source motion, camera, cuts, and audio. | |
| `minimax/h3/reference-to-video/lora` | MiniMax H3 Reference to Video LoRA | References into video with synchronized audio using MiniMax H3 | |
| `mirelo-ai/sfx-v1.5/video-to-video` | Mirelo SFX V1.5 | Generate synced sounds for any video, and return it with its new sound track (like MMAudio) | |
| `mirelo-ai/sfx-v1/video-to-video` | Mirelo SFX | Generate synced sounds for any video, and return it with its new sound track (like MMAudio) | |
| `mirelo-ai/sfx1.6/video-to-video` | Mirelo SFX1.6 | Generate synced sounds for any video, and return it with its new sound track (like MMAudio). Now up to 60 seconds! | |
| `moonvalley/marey/motion-transfer` | Marey Realism V1.5 | Pull motion from a reference video and apply it to new subjects or scenes. | |
| `moonvalley/marey/pose-transfer` | Marey Realism V1.5 | Ideal for matching human movement. Your input video determines human poses, gestures, and body movements that will appear in the generated v | |
| `pixelcut/video-background-removal` | Pixelcut Video Background Removal | Pixelcut's Video Background Remover is an AI segmentation model that erases backgrounds frame by frame, with seamless temporal consistency. | |
| `sonilo/v1.1/video-to-video-music` | V1.1 Video to Video Music | Generates perfectly synced music for any video. Return a licensed music soundtrack ready for commercial use (optional preservation of the or | |
| `sonilo/v1.1/video-to-video-sound-effects` | V1.1 Video to Video Sound Effects | Adds synchronized, royalty-free, commercial-use-safe sound effects to a video. Returns the finished video with the generated audio mixed in. | |
| `topaz/deblur/video` | Topaz Deblur Video | Professional motion deblur powered by Topaz Labs. Themis 2 restores clarity to fast-moving, motion-blurred footage at source resolution. Bes | |
| `topaz/denoise/video` | Topaz Denoise Video | Professional video denoising powered by Topaz Labs. Nyx models remove noise at source resolution, with Nyx Fast as a lighter, cheaper pass. | |
| `topaz/interpolate/video` | Topaz Interpolate Video | Professional frame interpolation powered by Topaz Labs. Apollo, Chronos and Aion retime footage up to 120 fps, from smooth motion to extreme | |
| `topaz/sdr-to-hdr/video` | Topaz Sdr To Hdr Video | Professional SDR-to-HDR conversion powered by Topaz Labs. Hyperion 2.5 redistributes luminance and color while preserving detail in text, fa | |
| `topaz/upscale/video/creative` | Topaz Upscale Video Creative | Professional creative video upscaling powered by Topaz Labs. Astra 2 reimagines fine detail and typically delivers 4K output. Best for cinem | |
| `topaz/upscale/video/generative` | Topaz Upscale Video Generative | Professional generative video upscaling powered by Topaz Labs. Starlight models rebuild detail that is not in the source, with Fast variants | |
| `topaz/upscale/video/precision` | Topaz Upscale Video Precision | Professional video upscaling powered by Topaz Labs. Precision models (Proteus, Artemis, Iris, Dione, Theia, Gaia, Rhea) enhance footage up t | |
| `veed/lipsync` | Lipsync | Generate realistic lipsync from any audio using VEED's model. | |
| `veed/lipsync/v2` | VEED Lipsync | Generate production-quality lipsync from any audio using VEED's most advanced model yet. | |
| `veed/subtitles` | Subtitles | VEED’s Subtitles API transforms raw footage into polished, publish-ready content with professional burned-in subtitles starting at a base ra | |
| `veed/video-background-removal` | Video Background Removal | Remove background from any video with people and objects. No green screen needed. | |
| `veed/video-background-removal/fast` | Video Background Removal | Remove background from any video with people and objects. No green screen needed. | |
| `veed/video-background-removal/green-screen` | Video Background Removal | Remove background from videos filmed using chromakey, with automatic green spill suppression for clean, professional edges. | |
| `wan/v2.6/reference-to-video` | Wan v2.6 Reference to Video | Wan 2.6 reference-to-video model. | |
| `wan/v2.6/reference-to-video/flash` | V2.6 | Wan 2.6 reference-to-video flash model. | |
| `xai/grok-imagine-video/edit-video` | Grok Imagine Video | Edit videos using xAI's Grok Imagine | |
| `xai/grok-imagine-video/extend-video` | Grok Imagine Extend Video | Extend videos with xAI's Grok Imagine video model | |

## audio-to-video（18）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `argil/avatars/audio-to-video` | Avatars Audio to Video | High-quality avatar videos that feel real, generated from your audio | |
| `fal-ai/echomimic-v3` | EchoMimic V3 | EchoMimic V3 generates a talking avatar model from a picture, audio and text prompt. | |
| `fal-ai/elevenlabs/dubbing` | ElevenLabs Dubbing | Generate dubbed videos or audios using ElevenLabs Dubbing feature! | |
| `fal-ai/flashtalk` | Flashtalk | Audio-driven talking avatar generation powered by the SoulX-FlashTalk 14B model. | |
| `fal-ai/longcat-single-avatar/audio-to-video` | Longcat Single Avatar | LongCat-Video-Avatar is an audio-driven video generation model that can generates super-realistic, lip-synchronized long video generation wi | |
| `fal-ai/longcat-single-avatar/image-audio-to-video` | Longcat Single Avatar | LongCat-Video-Avatar is an audio-driven video generation model that can generates super-realistic, lip-synchronized long video generation wi | |
| `fal-ai/ltx-2.3-22b/audio-to-video` | LTX-2.3 22B | Generate video with audio from audio, text and images using LTX-2 | |
| `fal-ai/ltx-2.3-22b/audio-to-video/lora` | LTX-2.3 22B | Generate video with audio from audio, text and images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3-22b/distilled/audio-to-video` | LTX-2.3 22B Distilled | Generate video with audio from audio, text and images using LTX-2 Distilled | |
| `fal-ai/ltx-2.3-22b/distilled/audio-to-video/lora` | LTX-2.3 22B Distilled | Generate video with audio from audio, text and images using LTX-2.3 Distilled and custom LoRA | |
| `fal-ai/ltx-2.3-quality/audio-to-video` | Ltx 2.3 Quality | Generate high-quality video with audio from audio, text and images using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/audio-to-video/lora` | Ltx 2.3 Quality | Generate high-quality video with audio from audio, text and images using LTX-2.3 and custom LoRA | |
| `fal-ai/ltx-2.3/audio-to-video` | LTX 2.3 Video Pro | LTX-2.3 is a high-quality, fast AI video model available in Pro and Fast variants for text-to-video, image-to-video, and audio-to-video. | |
| `fal-ai/wan/v2.2-14b/speech-to-video` | Wan-2.2 Speech-to-Video 14B | Wan-S2V is a video model that generates high-quality videos from static images and audio, with realistic facial expressions, body movements, | |
| `lightricks/ltx-2.5/audio-to-video/fast` | Ltx 2.5 Audio to Video Fast | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint generates video timed to a supplied audio clip in a speed-optimized mode | |
| `lightricks/ltx-2.5/audio-to-video/pro` | Ltx 2.5 Audio to Video Pro | LTX-2.5 is Lightricks' open-source audio-video model. This endpoint generates video timed to a supplied audio clip in a quality-optimized mo | |
| `pixverse/music-video/vibemv` | PixVerse VibeMV | PixVerse VibeMV generates music videos from audio, with optional character references and lyric subtitles. It supports visual style presets, | |
| `veed/avatars/audio-to-video` | Avatars | Generate high-quality videos with UGC-like avatars from audio | |

## text-to-audio（50）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `bytedance/seed-audio-1.0` | Seed Audio 1.0 | Seed Audio 1.0 is a new audio model from Bytedance that can generate high-quality, natural sounding audio using text, reference audios or an | |
| `cassetteai/music-generator` | music generator | CassetteAI’s model generates a 30-second sample in under 2 seconds and a full 3-minute track in under 10 seconds. At 44.1 kHz stereo audio, | |
| `cassetteai/sound-effects-generator` | Sound Effects Generator | Create stunningly realistic sound effects in seconds - CassetteAI's Sound Effects Model generates high-quality SFX up to 30 seconds long in | |
| `elevenlabs/music/v2` | Elevenlabs Music v2 | Generate high quality, realistic music with fine controls using Elevenlabs Music v2! | |
| `elevenlabs/music/v2.5` | Elevenlabs Music v2.5 | Generate high quality, realistic music with fine controls using Elevenlabs Music v2.5! | |
| `fal-ai/ace-step` | ACE Step | Generate music with lyrics from text using ACE-Step | |
| `fal-ai/ace-step/prompt-to-audio` | ACE Step Prompt To Audio | Generate music from a simple prompt using ACE-Step | |
| `fal-ai/csm-1b` | CSM-1B | CSM (Conversational Speech Model) is a speech generation model from Sesame that generates RVQ audio codes from text and audio inputs. | |
| `fal-ai/diffrhythm` | DiffRhythm: Lyrics to Song | DiffRhythm is a blazing fast model for transforming lyrics into full songs. It boasts the capability to generate full songs in less than 30 | |
| `fal-ai/elevenlabs/music` | Elevenlabs Music | Generate high quality, realistic music with fine controls using Elevenlabs Music! | |
| `fal-ai/elevenlabs/sound-effects/v2` | Elevenlabs Sound Effects V2 | Generate sound effects using ElevenLabs advanced sound effects model. | 已接入|
| `fal-ai/elevenlabs/text-to-dialogue/eleven-v3` | Elevenlabs | Generate realistic audio dialogues using Eleven-v3 from ElevenLabs. | |
| `fal-ai/elevenlabs/tts/eleven-v3` | Elevenlabs Tts Eleven V3 | Generate text-to-speech audio using Eleven-v3 from ElevenLabs. | |
| `fal-ai/elevenlabs/tts/multilingual-v2` | ElevenLabs TTS Multilingual v2 | Generate multilingual text-to-speech audio using ElevenLabs TTS Multilingual v2. | |
| `fal-ai/f5-tts` | F5 TTS | F5 TTS | |
| `fal-ai/gemini-tts` | Gemini TTS | Use Gemini TTS Models to convert your prompts to real audio. | |
| `fal-ai/kokoro/american-english` | Kokoro TTS | Kokoro is a lightweight text-to-speech model that delivers comparable quality to larger models while being significantly faster and more cos | |
| `fal-ai/kokoro/brazilian-portuguese` | Kokoro TTS (Brazilian Portuguese) | A natural and expressive Brazilian Portuguese text-to-speech model optimized for clarity and fluency. | |
| `fal-ai/kokoro/british-english` | Kokoro TTS (British English) | A high-quality British English text-to-speech model offering natural and expressive voice synthesis. | |
| `fal-ai/kokoro/french` | Kokoro TTS (French) | An expressive and natural French text-to-speech model for both European and Canadian French. | |
| `fal-ai/kokoro/hindi` | Kokoro TTS (Hindi) | A fast and expressive Hindi text-to-speech model with clear pronunciation and accurate intonation. | |
| `fal-ai/kokoro/italian` | Kokoro TTS (Italian) | A high-quality Italian text-to-speech model delivering smooth and expressive speech synthesis. | |
| `fal-ai/kokoro/japanese` | Kokoro TTS (Japanese) | A fast and natural-sounding Japanese text-to-speech model optimized for smooth pronunciation. | |
| `fal-ai/kokoro/mandarin-chinese` | Kokoro TTS (Mandarin Chinese) | A highly efficient Mandarin Chinese text-to-speech model that captures natural tones and prosody. | |
| `fal-ai/kokoro/spanish` | Kokoro TTS (Spanish) | A natural-sounding Spanish text-to-speech model optimized for Latin American and European Spanish. | |
| `fal-ai/ltx-2.3-quality/text-to-audio` | Ltx 2.3 Quality | Text to Audio high-quality using LTX-2.3 | |
| `fal-ai/ltx-2.3-quality/text-to-audio/lora` | Ltx 2.3 Quality | Text to Audio high-quality using LTX-2.3 with Lora | |
| `fal-ai/lyria2` | Lyria2 | Lyria 2 is Google's latest music generation model, you can generate any type of music with this model. | |
| `fal-ai/lyria3` | Lyria3 | Lyria 3 is most recent music model from Google | |
| `fal-ai/lyria3/pro` | Lyria 3 Pro | Lyria 3 Pro is the latest music model from Google | |
| `fal-ai/minimax-music` | MiniMax (Hailuo AI) Music | Generate music from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality, diverse musical com | |
| `fal-ai/minimax-music/v1.5` | MiniMax (Hailuo AI) Music v1.5 | Generate music from text prompts using the MiniMax model, which leverages advanced AI techniques to create high-quality, diverse musical com | |
| `fal-ai/minimax-music/v2` | Minimax Music | Generate music from text prompts using the MiniMax Music 2.0 model, which leverages advanced AI techniques to create high-quality, diverse m | |
| `fal-ai/minimax-music/v2.5` | Minimax Music 2.5 | MiniMax Music 2.5 creates complete tracks with singing, backing music, and detailed arrangements from lyrics and a style description. | |
| `fal-ai/minimax-music/v2.6` | Minimax Music 2.6 | MiniMax Music 2.6 creates complete tracks with singing, backing music, and detailed arrangements from lyrics and a style description. | |
| `fal-ai/mmaudio-v2/text-to-audio` | MMAudio V2 Text to Audio | MMAudio generates synchronized audio given text inputs. It can generate sounds described by a prompt. | |
| `fal-ai/stable-audio` | Stable Audio Open | Open source text-to-audio model. | 已接入|
| `fal-ai/stable-audio-25/text-to-audio` | Stable Audio 2.5 | Generate high quality music and sound effects using Stable Audio 2.5 from StabilityAI | |
| `fal-ai/stable-audio-3/medium/base/text-to-audio` | Stable Audio 3 Medium Base Text to Audio | Stable Audio 3 Medium Base is the foundational 1.4 billion parameter text-to-audio checkpoint generating stereo music up to 6 minutes, inten | |
| `fal-ai/stable-audio-3/medium/text-to-audio` | Stable Audio 3 | Stable Audio 3 Medium is a 1.4 billion parameter latent diffusion model that generates high-quality stereo music up to 6 minutes from text p | |
| `fal-ai/stable-audio-3/small/music/base/text-to-audio` | Stable Audio 3 | Stable Audio 3 Small Music Base is the foundational 459 million parameter checkpoint generating full music compositions up to 2 minutes from | |
| `fal-ai/stable-audio-3/small/music/text-to-audio` | Stable Audio 3 Small Music Text to Audio | Stable Audio 3 Small Music is a 459 million parameter latent diffusion model that generates full stereo music compositions up to 2 minutes f | |
| `fal-ai/stable-audio-3/small/sfx/base/text-to-audio` | Stable Audio 3 Small SFX Base Text to Audio | Stable Audio 3 Small SFX Base is the foundational 459 million parameter checkpoint generating sound effects from text prompts, intended as t | |
| `fal-ai/stable-audio-3/small/sfx/text-to-audio` | Stable Audio 3 Small SFX Text to Audio | Stable Audio 3 Small SFX is a 459 million parameter latent diffusion model that generates high-quality sound effects from text prompts, desi | |
| `fal-ai/zonos` | Zonos-Audio-Clone | Clone voice of any person and speak anything in their voice using zonos' voice cloning. | |
| `google/lyria-3.5` | Lyria 3.5 | Lyria 3.5 is Google DeepMind's latest music generation model, and you can generate almost any type of music with it | |
| `minimax/music-3` | MiniMax Music 3 | MiniMax Music 3 is a high-performance music generation model for creating complete songs up to five minutes long | |
| `mirelo-ai/sfx1.6/text-to-audio` | Mirelo SFX1.6 | Generate ambient sounds for any text prompt. Now you can turn any SFX into a natural loop for ambient soundscapes. | |
| `sonilo/v1.1/text-to-music` | Sonilo V1.1 Text to Music | Generates licensed, commercial-use-safe music from a single text prompt, with full control over style, mood, instrumentation, and exact dura | |
| `sonilo/v1.1/text-to-sound-effects` | V1.1 Text to Sound Effects | Generates high-quality, commercial-use-safe sound effects from a text prompt, with full control over type, texture, intensity, and exact dur | |

## audio-to-audio（44）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/ace-step/audio-inpaint` | ACE Step Audio Inpaint | Modify a portion of provided audio with lyrics and/or style using ACE-Step | |
| `fal-ai/ace-step/audio-outpaint` | ACE Step Audio Outpaint | Extend the beginning or end of provided audio with lyrics and/or style using ACE-Step | |
| `fal-ai/ace-step/audio-to-audio` | ACE Step Audio To Audio | Generate music from a lyrics and example audio using ACE-Step | |
| `fal-ai/audio-understanding` | Audio Understanding | A audio understanding model to analyze audio content and answer questions about what's happening in the audio based on user prompts. | |
| `fal-ai/deepfilternet3` | DeepFilterNet 3 | Enhance speech audio by removing background noise and upsampling to 48KHz | |
| `fal-ai/demucs` | Demucs | SOTA stemming model for voice, drums, bass, guitar and more. | |
| `fal-ai/dia-tts/voice-clone` | Dia Tts | Clone dialog voices from a sample audio and generate dialogs from text prompts using the Dia TTS which leverages advanced AI techniques to c | |
| `fal-ai/elevenlabs/audio-isolation` | ElevenLabs Audio Isolation | Isolate audio tracks using ElevenLabs advanced audio isolation technology. | |
| `fal-ai/elevenlabs/voice-changer` | ElevenLabs Voice Changer | Change the voices in your audios with voices in ElevenLabs! | |
| `fal-ai/ffmpeg-api/merge-audios` | FFmpeg API [Merge Audios] | Merge audios into a single audio using FFmpeg API! | |
| `fal-ai/kling-video/create-voice` | Kling Video Create Voice | Create Voices to be used with Kling Models Voice Control | |
| `fal-ai/personaplex` | Personaplex | PersonaPlex is a real-time, full-duplex speech-to-speech conversational model that enables persona control through text-based role prompts a | |
| `fal-ai/personaplex/realtime` | Personaplex | PersonaPlex is a real-time, full-duplex speech-to-speech conversational model that enables persona control through text-based role prompts a | |
| `fal-ai/qwen-3-tts/clone-voice/0.6b` | Qwen 3 TTS - Clone Voice [0.6B] | Clone your voices using Qwen3-TTS Clone-Voice model with zero shot cloning capabilities and use it on text-to-speech models to create speech | |
| `fal-ai/qwen-3-tts/clone-voice/1.7b` | Qwen 3 TTS - Clone Voice [1.7B] | Clone your voices using Qwen3-TTS Clone-Voice model with zero shot cloning capabilities and use it on text-to-speech models to create speech | |
| `fal-ai/sam-audio/separate` | Sam Audio | Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researc | |
| `fal-ai/sam-audio/span-separate` | Sam Audio | Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researc | |
| `fal-ai/stable-audio-25/audio-to-audio` | Stable Audio 2.5 | Generate high quality music and sound effects using Stable Audio 2.5 from StabilityAI | |
| `fal-ai/stable-audio-25/inpaint` | Stable Audio 25 | Generate high quality music and sound effects using Stable Audio 2.5 from StabilityAI | |
| `fal-ai/stable-audio-3/medium/audio-inpainting` | Stable Audio 3 Medium Audio Inpainting | Stable Audio 3 Medium audio inpainting is a 1.4 billion parameter latent diffusion model that fills in or reworks selected segments of a ste | |
| `fal-ai/stable-audio-3/medium/audio-outpainting` | Stable Audio 3 Medium Audio Outpainting | Stable Audio 3 Medium audio outpainting is a 1.4 billion parameter latent diffusion model that extends existing stereo audio beyond its orig | |
| `fal-ai/stable-audio-3/medium/audio-to-audio` | Stable Audio 3 Medium Audio to Audio | Stable Audio 3 Medium audio-to-audio is a 1.4 billion parameter latent diffusion model that transforms an input audio clip into new stereo v | |
| `fal-ai/stable-audio-3/medium/base/audio-inpainting` | Stable Audio 3 Medium Base Audio Inpainting | Stable Audio 3 Medium Base audio inpainting is the foundational 1.4 billion parameter checkpoint for editing or filling selected stereo audi | |
| `fal-ai/stable-audio-3/medium/base/audio-outpainting` | Stable Audio 3 Medium Base Audio Outpainting | Stable Audio 3 Medium Base audio outpainting is the foundational 1.4 billion parameter checkpoint that extends existing stereo audio with ca | |
| `fal-ai/stable-audio-3/medium/base/audio-to-audio` | Stable Audio 3 Medium Base Audio to Audio | Stable Audio 3 Medium Base audio-to-audio is the foundational 1.4 billion parameter checkpoint that transforms input audio into new stereo v | |
| `fal-ai/stable-audio-3/small/music/audio-inpainting` | Stable Audio 3 Small Music Audio Inpainting | Stable Audio 3 Small Music audio inpainting is a 459 million parameter latent diffusion model that fills in or reworks selected segments of | |
| `fal-ai/stable-audio-3/small/music/audio-outpainting` | Stable Audio 3 Small Music Audio Outpainting | Stable Audio 3 Small Music audio outpainting is a 459 million parameter latent diffusion model that extends music compositions beyond their | |
| `fal-ai/stable-audio-3/small/music/audio-to-audio` | Stable Audio 3 | Stable Audio 3 Small Music audio-to-audio is a 459 million parameter latent diffusion model that transforms input music into new variations | |
| `fal-ai/stable-audio-3/small/music/base/audio-inpainting` | Stable Audio 3 Small Music Base Audio Inpainting | Stable Audio 3 Small Music Base audio inpainting is the foundational 459 million parameter checkpoint for editing or filling selected music | |
| `fal-ai/stable-audio-3/small/music/base/audio-outpainting` | Stable Audio 3 Small Music Base Audio Outpainting | Stable Audio 3 Small Music Base audio outpainting is the foundational 459 million parameter checkpoint that extends music tracks via causal | |
| `fal-ai/stable-audio-3/small/music/base/audio-to-audio` | Stable Audio 3 Small Music Base Audio to Audio | Stable Audio 3 Small Music Base audio-to-audio is the foundational 459 million parameter checkpoint that transforms input music into new var | |
| `fal-ai/stable-audio-3/small/sfx/audio-inpainting` | Stable Audio 3 Small SFX Audio Inpainting | Stable Audio 3 Small SFX audio inpainting is a 459 million parameter latent diffusion model that fills in or reworks selected segments of a | |
| `fal-ai/stable-audio-3/small/sfx/audio-outpainting` | Stable Audio 3 Small SFX Audio Outpainting | Stable Audio 3 Small SFX audio outpainting is a 459 million parameter latent diffusion model that extends sound-effect tracks beyond their o | |
| `fal-ai/stable-audio-3/small/sfx/audio-to-audio` | Stable Audio 3 | Stable Audio 3 Small SFX audio-to-audio is a 459 million parameter latent diffusion model that transforms input audio into new sound-effect | |
| `fal-ai/stable-audio-3/small/sfx/base/audio-inpainting` | Stable Audio 3 Small SFX Base Audio Inpainting | Stable Audio 3 Small SFX Base audio inpainting is the foundational 459 million parameter checkpoint for editing or filling selected sound-ef | |
| `fal-ai/stable-audio-3/small/sfx/base/audio-outpainting` | Stable Audio 3 Small SFX Base Audio Outpainting | Stable Audio 3 Small SFX Base audio outpainting is the foundational 459 million parameter checkpoint that extends sound-effect tracks via ca | |
| `fal-ai/stable-audio-3/small/sfx/base/audio-to-audio` | Stable Audio 3 Small SFX Base Audio to Audio | Stable Audio 3 Small SFX Base audio-to-audio is the foundational 459 million parameter checkpoint that transforms input audio into new sound | |
| `fal-ai/tada/1b/text-to-speech` | Tada TTS 1B | A unified speech-language model that synchronizes speech and text into a single, cohesive stream via 1:1 alignment. Lighter 1B variant | |
| `fal-ai/tada/3b/text-to-speech` | Tada | A unified speech-language model that synchronizes speech and text into a single, cohesive stream via 1:1 alignment. | |
| `fal-ai/workflow-utilities/audio-compressor` | Workflow Utilities Audio Compressor | FFMPEG Utility for Audio Compression | |
| `fal-ai/workflow-utilities/impulse-response` | Workflow Utilities Impulse Response | FFMPEG Utility for Impulse Response | |
| `mirelo-ai/sfx1.6/extend-audio` | Mirelo SFX1.6 | Extend any sound effect with seamless, natural tails. | |
| `mirelo-ai/sfx1.6/inpaint-audio` | Mirelo SFX1.6 | Erase and replace any moment in your audio with AI-driven precision. | |
| `veed/clean-audio` | VEED Clean Audio | Studio-quality speech from noisy recordings | |

## text-to-speech（37）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `alibaba/qwen-audio-3-tts` | Qwen Audio 3.0 TTS (Flash) | Generate natural multilingual speech from text with fast voice and language control using Qwen Audio 3.0 TTS Flash. | |
| `elevenlabs/tts/eleven-v4` | Eleven v4 | Generate expressive speech with Eleven v4 from ElevenLabs. Control delivery with audio tags, voice stability, similarity settings, and IPA p | |
| `elevenlabs/tts/eleven-v4-turbo` | Eleven v4 Turbo | Generate speech with Eleven v4 Turbo from ElevenLabs. Choose a voice and control delivery with audio tags, stability, similarity settings, a | |
| `fal-ai/bytedance/seed-speech/tts/v2` | Bytedance Seed Speech Text to Speech | Seed Speech developed by ByteDance, is a family of large-scale text-to-speech models capable of synthesizing speech that is virtually indist | |
| `fal-ai/chatterbox/text-to-speech` | Chatterbox | Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai. | |
| `fal-ai/chatterbox/text-to-speech/multilingual` | Chatterbox | Whether you're working on memes, videos, games, or AI agents, Chatterbox brings your content to life. Use the first tts from resemble ai. | |
| `fal-ai/dia-tts` | Dia | Dia directly generates realistic dialogue from transcripts. Audio conditioning enables emotion control. Produces natural nonverbals like lau | |
| `fal-ai/elevenlabs/tts/turbo-v2.5` | ElevenLabs TTS Turbo v2.5 | Generate high-speed text-to-speech audio using ElevenLabs TTS Turbo v2.5. | |
| `fal-ai/gemini-3.1-flash-tts` | Gemini 3.1 Flash Tts | Newest audio model from Google introduces granular audio tags that give you precise control to direct AI speech for expressive audio generat | |
| `fal-ai/index-tts-2/text-to-speech` | Index TTS 2.0 | Generate natural, clear speeches using Index TTS 2.0 from IndexTeam | |
| `fal-ai/inworld-tts` | Inworld TTS-1.5 Max | Text to Speech Endpoint for Inworld's TTS-1.5 Max. | |
| `fal-ai/kling-video/v1/tts` | Kling TTS | Generate speech from text prompts and different voices using the Kling TTS model, which leverages advanced AI techniques to create high-qual | |
| `fal-ai/maya` | Maya1 | Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise v | |
| `fal-ai/maya/batch` | Maya | Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise v | |
| `fal-ai/maya/stream` | Maya | Maya1 is a state-of-the-art speech model by Maya Research for expressive voice generation, built to capture real human emotion and precise v | |
| `fal-ai/minimax/preview/speech-2.5-hd` | Minimax | Generate speech from text prompts and different voices using the MiniMax Speech-02 HD model, which leverages advanced AI techniques to creat | |
| `fal-ai/minimax/preview/speech-2.5-turbo` | Minimax | Generate fast speech from text prompts and different voices using the MiniMax Speech-02 Turbo model, which leverages advanced AI techniques | |
| `fal-ai/minimax/speech-02-hd` | MiniMax Speech-02 HD | Generate speech from text prompts and different voices using the MiniMax Speech-02 HD model, which leverages advanced AI techniques to creat | |
| `fal-ai/minimax/speech-02-turbo` | MiniMax Speech-02 Turbo | Generate fast speech from text prompts and different voices using the MiniMax Speech-02 Turbo model, which leverages advanced AI techniques | |
| `fal-ai/minimax/speech-2.6-hd` | MiniMax Speech 2.6 [HD] | Generate speech from text prompts and different voices using the MiniMax Speech-2.6 HD model, which leverages advanced AI techniques to crea | |
| `fal-ai/minimax/speech-2.6-turbo` | MiniMax Speech 2.6 [Turbo] | Generate speech from text prompts and different voices using the MiniMax Speech-2.6 HD model, which leverages advanced AI techniques to crea | |
| `fal-ai/minimax/speech-2.8-hd` | MiniMax Speech 2.8 [HD] | Generate speech from text prompts and different voices using the MiniMax Speech-2.8 HD model, which leverages advanced AI techniques to crea | |
| `fal-ai/minimax/speech-2.8-turbo` | MiniMax Speech 2.8 [Turbo] | Generate speech from text prompts and different voices using the MiniMax Speech-2.8 Turbo model, which leverages advanced AI techniques to c | |
| `fal-ai/minimax/voice-clone` | MiniMax Voice Cloning | Clone a voice from a sample audio and generate speech from text prompts using the MiniMax model, which leverages advanced AI techniques to c | |
| `fal-ai/minimax/voice-design` | MiniMax Voice Design | Design a personalized voice from a text description, and generate speech from text prompts using the MiniMax model, which leverages advanced | |
| `fal-ai/orpheus-tts` | Orpheus TTS | Orpheus TTS is a state-of-the-art, Llama-based Speech-LLM designed for high-quality, empathetic text-to-speech generation. This model has be | |
| `fal-ai/qwen-3-tts/text-to-speech/0.6b` | Qwen 3 TTS - Text to Speech [0.6B] | Bring speech to your texts using Qwen3-TTS Custom-Voice model with pre-trained voices or use your custom voice with Qwen3-TTS Clone Voice mo | |
| `fal-ai/qwen-3-tts/text-to-speech/1.7b` | Qwen 3 TTS - Text to Speech [1.7B] | Bring speech to your texts using Qwen3-TTS Custom-Voice model with pre-trained voices or use your custom voice with Qwen3-TTS Clone Voice mo | |
| `fal-ai/qwen-3-tts/voice-design/1.7b` | Qwen 3 TTS - Voice Design [1.7B] | Create custom voices using Qwen3-TTS Voice Design model and later use Clone Voice model to create your own voices! | |
| `fal-ai/vibevoice` | VibeVoice 1.5B | Generate long, expressive multi-voice speech using Microsoft's powerful TTS | |
| `fal-ai/vibevoice/0.5b` | Vibevoice | Generate long speech snippets fast using Microsoft's powerful TTS. | |
| `fal-ai/vibevoice/7b` | VibeVoice 7B | Generate long, expressive multi-voice speech using Microsoft's powerful TTS | |
| `fal-ai/zonos2` | Zonos2 Text to Speech | Zonos2 is a text-to-speech model that clones a voice from a short sample and speaks naturally across many languages. | |
| `google/gemini-3.8-flash-lite-tts` | Gemini 3.8 Flash Lite TTS | Generate expressive speech with Gemini 3.8 Flash Lite TTS. Choose from 30 voices, guide delivery with style instructions, and create single- | |
| `google/gemini-3.8-flash-tts` | Gemini 3.8 Flash TTS | Generate expressive speech with Gemini 3.8 Flash TTS. Choose from 30 voices, direct delivery with style instructions, and create single-spea | |
| `resemble-ai/chatterboxhd/text-to-speech` | Chatterboxhd | Generate expressive, natural speech with Resemble AI's Chatterbox. Features unique emotion control, instant voice cloning from short audio, | |
| `xai/tts/v1` | xAI Text to Speech | Generate speech with expressive and realistic voices from xAI | |

## speech-to-text（10）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/cohere-transcribe` | Cohere Transcribe | Cohere Transcribe turns your business audio into accurate text, ready for search, analytics, and automation | |
| `fal-ai/elevenlabs/speech-to-text` | ElevenLabs Speech to Text | Generate text from speech using ElevenLabs advanced speech-to-text model. | |
| `fal-ai/elevenlabs/speech-to-text/scribe-v2` | ElevenLabs Speech to Text - Scribe V2 | Use Scribe-V2 from ElevenLabs to do blazingly fast speech to text inferences! | |
| `fal-ai/smart-turn` | Pipecat's Smart Turn model | An open source, community-driven and native audio turn detection model by Pipecat AI. | |
| `fal-ai/speech-to-text` | Speech-to-Text | Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription. | |
| `fal-ai/speech-to-text/stream` | Speech-To-text | Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription. | |
| `fal-ai/speech-to-text/turbo` | Speech-to-Text | Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription. | |
| `fal-ai/speech-to-text/turbo/stream` | Speech-to-Text | Leverage the rapid processing capabilities of AI models to enable accurate and efficient real-time speech-to-text transcription. | |
| `fal-ai/wizper` | Wizper (Whisper v3 -- fal.ai edition) | [Experimental] Whisper v3 Large -- but optimized by our inference wizards. Same WER, double the performance! | |
| `nvidia/nemotron-asr-multilingual/asr` | Nemotron Asr Multilingual | Nemotron-ASR-Streaming is a multi lingual, streaming Automatic Speech Recognition (ASR) engineered to deliver high-quality multi lingual tra | |

## audio-to-text（2）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/silero-vad` | Silero VAD | Detect speech presence and timestamps with accuracy and speed using the ultra-lightweight Silero VAD model | |
| `nvidia/nemotron-3-nano-omni/audio` | Nemotron 3 Nano Omni | Audio reasoning variant of NVIDIA's Nemotron 3 Nano Omni. 30B A3B hybrid Transformer-Mamba MoE - accepts audio plus a prompt and returns tex | |

## video-to-audio（6）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/kling-video/video-to-audio` | Kling Video | Generate audio from input videos using Kling | |
| `fal-ai/sam-audio/visual-separate` | Sam Audio | Audio separation with SAM Audio. Isolate any sound using natural language—professional-grade audio editing made simple for creators, researc | |
| `mirelo-ai/sfx-v1.5/video-to-audio` | Mirelo SFX V1.5 | Generate synced sounds for any video, and return the new sound track (like MMAudio) | |
| `mirelo-ai/sfx-v1/video-to-audio` | Mirelo SFX | Generate synced sounds for any video, and return the new sound track (like MMAudio) | |
| `sonilo/v1.1/video-to-music` | V1.1 | Analyzes your video’s pacing, mood, and timing to generate a frame-synced, licensed, commercial-use-safe soundtrack in seconds. | |
| `sonilo/v1.1/video-to-sound-effects` | V1.1 Video to Sound Effects | Analyzes a video and generates synchronized, royalty-free sound effects timed to visible actions. Returns the generated sound-effects audio | |

## image-to-3d（36）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/hunyuan3d/v2` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan3d/v2/mini` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan3d/v2/mini/turbo` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan3d/v2/multi-view` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan3d/v2/multi-view/turbo` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan3d/v2/turbo` | Hunyuan3D | Generate 3D models from your images using Hunyuan 3D. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/hunyuan_world/image-to-world` | Hunyuan World | Hunyuan World 1.0 turns a single image into a panorama or a 3D world. It creates realistic scenes from the image, allowing you to explore an | 已接入|
| `fal-ai/hyper3d/rodin` | Hyper3D Rodin | Rodin by Hyper3D generates realistic and production ready 3D models from text or images. | |
| `fal-ai/hyper3d/rodin/v2` | Hyper3d | Rodin by Hyper3D generates realistic and production ready 3D models from text or images. | |
| `fal-ai/hyper3d/rodin/v2.5` | Hyper3D - Rodin V2.5 - Image to 3D | Rodin V2.5 by Hyper3D generates realistic and production ready 3D models from text or images. | |
| `fal-ai/hyper3d/rodin/v2.5/fast` | Hyper3D - Rodin V2.5 - Image to 3D - Fast | Rodin V2.5 by Hyper3D generates realistic and production ready 3D models from text or images. Do fast prototyping using the fast model. | |
| `fal-ai/meshy/v6-preview/image-to-3d` | Meshy 6 Preview | Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models. | |
| `fal-ai/meshy/v6/image-to-3d` | Meshy 6 | Meshy-6 is the latest model from Meshy. It generates realistic and production ready 3D models. | |
| `fal-ai/pixal3d` | Pixal3d | Pixal3D turns a single image into a high-fidelity 3D model with detailed geometry and realistic textures. | |
| `fal-ai/reconviagen-0.5` | ReconViaGen 0.5 | Generate 3D models from one or more images using ReconViaGen 0.5 | |
| `fal-ai/sam-3/3d-body` | Sam 3 | SAM 3D allows for accurate 3D reconstruction of human body shape and position from a single image. | |
| `fal-ai/sam-3/3d-objects` | Sam 3 | SAM 3D enables precise 3D reconstruction of objects from real images, while accurately reconstructing their geometry and texture. | |
| `fal-ai/trellis` | Trellis | Generate 3D models from your images using Trellis. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/trellis-2` | Trellis 2 | Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/trellis-2-lora` | TRELLIS.2 LoRA Inference | Run inference on LoRA adapters for TRELLIS.2 model | |
| `fal-ai/trellis-2/retexture` | Trellis 2 | Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/trellis/multi` | Trellis | Generate 3D models from multiple images using Trellis. A native 3D generative model enabling versatile and high-quality 3D asset creation. | |
| `fal-ai/triposr` | TripoSR | State of the art Image to 3D Object generation | |
| `hitem3d/hi3d/image-to-3d` | Hi3D Image to 3D | Generate 3D models from a single image with Hi3D. | |
| `hitem3d/hi3d/multi-view-to-3d` | Hi3D Multiview to 3D | Generate 3D models from multiple view images using Hi3D. | |
| `hitem3d/hi3d/v3.0/image-to-3d` | Hi3D Image to 3D | Generate 3D models from a single image with Hi3D V3.0. | |
| `hitem3d/hi3d/v3.0/multi-view-to-3d` | Hi3D Multiview to 3D | Generate 3D models from multiple view images using Hi3D V3.0. | |
| `meshy/v7/image-to-3d` | V7 Image to 3D | Turns a single image into a fully textured, PBR-ready 3D mesh with complete geometry, in game-ready Smart Topology at a target polygon count | |
| `meshy/v7/multi-image-to-3d` | V7 Multi Image to 3D | econstructs a high-fidelity textured 3D model from multiple angle views of one object, with game-ready topology and polygon control | |
| `tripo3d/h3.1/image-to-3d` | Tripo H3.1 Image to 3D | Generate high-quality 3D models from a single image using Tripo H3.1. | |
| `tripo3d/h3.1/multiview-to-3d` | Tripo H3.1 Multiview to 3D | Generate 3D models from multiple view images using Tripo H3.1. | |
| `tripo3d/p1/image-to-3d` | Tripo P1 Image to 3D | Generate 3D models from a single image using Tripo P1. | |
| `tripo3d/p2/image-to-3d` | Tripo P2 Image to 3D | Tripo P2 generates 3D models from a single image, with optional PBR textures, adjustable face counts, and triangle or quad mesh topology. | |
| `tripo3d/tripo/v2.5/image-to-3d` | Tripo3D | State of the art Image to 3D Object generation. Generate 3D model from a single image! | |
| `tripo3d/tripo/v2.5/multiview-to-3d` | Tripo3D | State of the art Multiview to 3D Object generation. Generate 3D models from multiple images! | |
| `tripo3d/triposplat` | Triposplat | TripoSplat is an open-source model from TripoAI / VAST AI Research that converts a single 2D image into high-quality 3D Gaussians using a no | 已接入|

## text-to-3d（10）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/hunyuan-motion` | Hunyuan Motion [1B] | Generate 3D human motions via text-to-generation interface of Hunyuan Motion! | |
| `fal-ai/hunyuan-motion/fast` | Hunyuan Motion [0.46B] | Generate 3D human motions via text-to-generation interface of Hunyuan Motion! | |
| `fal-ai/hyper3d/rodin/v2.5/text-to-3d` | Hyper3D - Rodin V2.5 - Text to 3D | Rodin V2.5 by Hyper3D generates realistic and production ready 3D models from text or images. | |
| `fal-ai/hyper3d/rodin/v2.5/text-to-3d/fast` | Hyper3D - Rodin V2.5 - Text to 3D - Fast | Rodin V2.5 by Hyper3D generates realistic and production ready 3D models from text or images. Do fast prototyping using the fast model. | |
| `fal-ai/meshy/v6-preview/text-to-3d` | Meshy 6 Preview | Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models. | |
| `fal-ai/meshy/v6/text-to-3d` | Meshy 6 | Meshy-6 is the latest model from Meshy. It generates realistic and production ready 3D models. | |
| `meshy/v7/text-to-3d` | V7 Text to 3D | Turns text into a fully textured, PBR-ready 3D mesh with complete geometry, in game-ready Smart Topology at a target polygon count | |
| `tripo3d/h3.1/text-to-3d` | Tripo H3.1 Text to 3D | Generate 3D models from text descriptions using Tripo H3.1. | |
| `tripo3d/p1/text-to-3d` | Tripo P1 Text to 3D | Generate 3D models from text descriptions using Tripo P1. | |
| `tripo3d/p2/text-to-3d` | Tripo P2 Text to 3D | Tripo P2 generates 3D models from a text prompt, with optional PBR textures, adjustable face counts, and triangle or quad mesh topology. | |

## 3d-to-3d（7）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/meshy/rigging` | Meshy Rigging | Rig humanoid 3D models from GLB URLs with Meshy, returning rigged GLB/FBX files plus basic   animations. | |
| `fal-ai/meshy/rigging/multi-animation` | Meshy Rigging Multi Animation | Meshy auto-rigs a humanoid 3D model fitting a skeleton and binding the mesh, then applies several motion presets from its animation library | |
| `fal-ai/sam-3/3d-align` | Sam 3 | SAM 3D enables full scene reconstructions, placing objects and humans in a shared context together. | |
| `hitem3d/hi3d/multicolor` | Hi3D 3D to Multicolor | Convert a textured 3D model into a multicolor model suited for multicolor 3D printing with Hi3D. | |
| `hitem3d/hi3d/split` | Hi3D 3D Part Splitter | Split a 3D model into parts with Hi3D. | |
| `hitem3d/hi3d/texture` | Hi3D Texture | Texture an existing geometry mesh using a reference image with Hi3D. | |
| `meshy/v6-lite/retexture` | Meshy 6 Lite Retexture | Meshy 6 Lite retexture applies new textures to an existing 3D model from a text prompt or a reference image, with optional PBR maps. | |

## vision（32）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/florence-2-large/caption` | Florence 2 Large Caption | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/detailed-caption` | Florence 2 Large Detailed Caption | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/more-detailed-caption` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/ocr` | Florence 2 Large OCR | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/region-to-category` | Florence 2 Large Region To Category | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/florence-2-large/region-to-description` | Florence-2 Large | Florence-2 is an advanced vision foundation model that uses a prompt-based approach to handle a wide range of vision and vision-language tas | |
| `fal-ai/got-ocr/v2` | GOT OCR 2.0 | GOT-OCR2 works on a wide range of tasks, including plain document OCR, scene text OCR, formatted document OCR, and even OCR for tables, char | |
| `fal-ai/imageutils/nsfw` | NSFW Filter | Predict the probability of an image being NSFW. | |
| `fal-ai/llava-next` | LLaVA v1.6 34B | Vision | |
| `fal-ai/marlin` | Marlin | Marlin is a 2B video VLM tuned for the two questions developers actually want to ask of their videos: what is happening, and when? | |
| `fal-ai/marlin/find` | Marlin Find | Marlin is a 2B video VLM tuned for the two questions developers actually want to ask of their videos: what is happening, and when? | |
| `fal-ai/moondream-next` | MoonDreamNext | MoonDreamNext is a multimodal vision-language model for captioning, gaze detection, bbox detection, point detection, and more. | |
| `fal-ai/moondream-next/batch` | MoonDreamNext Batch | MoonDreamNext Batch is a multimodal vision-language model for batch captioning. | |
| `fal-ai/moondream/batched` | Moondream | Answer questions from the images. | |
| `fal-ai/moondream2` | Moondream2 | Moondream2 is a highly efficient open-source vision language model that combines powerful image understanding capabilities with a remarkably | |
| `fal-ai/moondream2/object-detection` | Moondream2 | Moondream2 is a highly efficient open-source vision language model that combines powerful image understanding capabilities with a remarkably | |
| `fal-ai/moondream2/point-object-detection` | Moondream2 | Moondream2 is a highly efficient open-source vision language model that combines powerful image understanding capabilities with a remarkably | |
| `fal-ai/moondream2/visual-query` | Moondream2 | Moondream2 is a highly efficient open-source vision language model that combines powerful image understanding capabilities with a remarkably | |
| `fal-ai/moondream3-preview/caption` | Moondream3 Preview [Caption] | Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilit | |
| `fal-ai/moondream3-preview/detect` | Moondream3 Preview [Detect] | Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilit | |
| `fal-ai/moondream3-preview/point` | Moondream3 Preview [Point] | Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilit | |
| `fal-ai/moondream3-preview/query` | Moondream 3 Preview [Query] | Moondream 3 is a vision language model that brings frontier-level visual reasoning with native object detection, pointing, and OCR capabilit | |
| `fal-ai/nemotron-diffusion-vlm` | Nemotron Diffusion Vlm | Nemotron-Labs-Diffusion-VLM-8B is the vision-language extension of the Nemotron-Labs-Diffusion family. | |
| `fal-ai/sa2va/4b/image` | Sa2VA 4B Image | Sa2VA is an MLLM capable of question answering, visual prompt understanding, and dense object segmentation at both image and video levels | |
| `fal-ai/sa2va/4b/video` | Sa2VA 4B Video | Sa2VA is an MLLM capable of question answering, visual prompt understanding, and dense object segmentation at both image and video levels | |
| `fal-ai/sa2va/8b/image` | Sa2VA 8B Image | Sa2VA is an MLLM capable of question answering, visual prompt understanding, and dense object segmentation at both image and video levels | |
| `fal-ai/sa2va/8b/video` | Sa2VA 8B Video | Sa2VA is an MLLM capable of question answering, visual prompt understanding, and dense object segmentation at both image and video levels | |
| `fal-ai/sam-3/image/embed` | Sam 3 | SAM 3 is a unified foundation model for promptable segmentation in images and videos. It can detect, segment, and track objects using text o | |
| `fal-ai/scene-finder` | Scene Finder | Search any video with a text prompt - Scene Finder locates the matching moments and returns their time segments and extracted frames. | |
| `fal-ai/video-understanding` | Video Understanding | A video understanding model to analyze video content and answer questions about what's happening in the video based on user prompts. | |
| `fal-ai/x-ailab/nsfw` | NSFW Checker | Predict whether an image is NSFW or SFW. | |
| `openrouter/router/vision` | OpenRouter [Vision] | Run any Vision Language Model with fal. Analyze and understand images using Claude (Anthropic), GPT-5 / GPT-4o (OpenAI), Gemini (Google), Gr | |

## image-to-text（1）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `nvidia/nemotron-3-nano-omni/vision` | Nemotron 3 Nano Omni | Vision reasoning variant of NVIDIA's Nemotron 3 Nano Omni. 30B A3B hybrid Transformer-Mamba MoE - accepts an image plus a prompt and returns | |

## video-to-text（2）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `nvidia/nemotron-3-nano-omni/video` | Nemotron 3 Nano Omni | Video reasoning variant of NVIDIA's Nemotron 3 Nano Omni. 30B A3B hybrid Transformer-Mamba MoE - accepts video plus a prompt and returns tex | |
| `openrouter/router/video/enterprise` | OpenRouter [Video][Enterprise] | Run any VLM (Video Language Model) with fal, powered by OpenRouter. | |

## image-to-json（3）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `bria/ad-delayer` | Bria Ad Delayer: Convert Flat Ads into Editable Layers \| fal | Turn any flat ad image into fully editable layers —background, product and logo cutouts, live text with typography, and vector shapes. Comme | |
| `fal-ai/bagel/understand` | Bagel | Bagel is a 7B parameter multimodal model from Bytedance-Seed that can generate both text and images. | |
| `fal-ai/vggt-1b` | VGGT-1B | Turn images or video into a detailed 3D scene with depth, camera poses, and a colored point cloud. | |

## text-to-json（3）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `bria/fibo-edit/edit/structured_instruction` | Fibo Edit [Structured Instruction] | Structured Instructions Generation endpoint for Fibo Edit, Bria's newest editing model. | |
| `bria/fibo-lite/generate/structured_prompt` | Fibo Lite | Convert plain text into Fibo-Lite's transparent JSON-structured prompts - Bria's unique controllability layer that no closed model offers. B | |
| `bria/fibo/generate/structured_prompt` | Fibo | Structured Prompt Generation endpoint for Fibo, Bria's SOTA Open source model. | |

## json（6）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/ffmpeg-api/loudnorm` | Ffmpeg Api | Get EBU R128 loudness normalization from audio files using FFmpeg API. | |
| `fal-ai/ffmpeg-api/metadata` | FFmpeg API Metadata | Get encoding metadata from video and audio files using FFmpeg API. | |
| `fal-ai/ffmpeg-api/waveform` | FFmpeg API Waveform | Get waveform data from audio files using FFmpeg API. | |
| `fal-ai/omnilottie` | Omnilottie | Convert your assets into lottie using Omnilottie. | |
| `fal-ai/omnilottie/image-to-lottie` | Omnilottie | Convert your assets into lottie using Omnilottie. | |
| `fal-ai/omnilottie/video-to-lottie` | Omnilottie | Convert your assets into lottie using Omnilottie. | |

## llm（8）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/bytedance/seed/v2/mini` | Bytedance Seed V2 Mini | Seed 2.0 Mini is a high-performance multimodal model optimized for low latency and high concurrency. It supports text, image, and video inp | |
| `fal-ai/video-prompt-generator` | Video Prompt Generator | Generate video prompts using a variety of techniques including camera direction, style, pacing, special effects and more. | 已接入|
| `nvidia/nemotron-3-nano-omni` | Nemotron 3 Nano Omni | Open, efficient reasoning model from NVIDIA. 30B A3B hybrid Transformer-Mamba MoE, built for enterprise agentic workflows. | |
| `openrouter/router` | OpenRouter | Run any LLM with fal. Access Claude (Anthropic), ChatGPT / GPT-5 / GPT-4o (OpenAI), Gemini (Google), Grok (xAI), DeepSeek, Llama (Meta), Qwe | |
| `openrouter/router/enterprise` | OpenRouter [Enterprise] | Run any LLM (Large Language Model) with fal, powered by OpenRouter. | |
| `openrouter/router/openai/v1/chat/completions` | OpenRouter Chat Completions [OpenAI Compatible] | OpenAI-compatible chat completions API. Drop-in replacement for the OpenAI API — use any OpenAI SDK or client to access Claude, Gemini, Grok | |
| `openrouter/router/openai/v1/embeddings` | OpenRouter Embeddings [OpenAI Compatible] | Generate text embeddings using OpenAI-compatible API. Access embedding models like text-embedding-3-small, text-embedding-3-large (OpenAI), | |
| `openrouter/router/openai/v1/responses` | OpenRouter Responses [OpenAI Compatible] | The OpenRouter Responses API with fal, powered by OpenRouter, provides unified access to a wide range of large language models - including G | |

## training（57）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `fal-ai/flux-2-klein-9b-base-trainer` | FLUX 2 [klein] 9b Base Trainer | Fine-tune FLUX.2 [klein] 9B from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks. | |
| `fal-ai/flux-2-klein-9b-base-trainer/edit` | Flux 2 Klein 9B Base Trainer | Fine-tune FLUX.2 [klein] 9B from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks. | |
| `fal-ai/flux-2-trainer` | FLUX 2 Trainer | Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific styles and domains. | |
| `fal-ai/flux-2-trainer-v2` | FLUX 2 Trainer V2 | Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific styles and domains. | |
| `fal-ai/flux-2-trainer-v2/edit` | FLUX 2 Trainer V2 Edit | Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks. | |
| `fal-ai/flux-2-trainer/edit` | FLUX 2 Trainer Edit | Fine-tune FLUX.2 [dev] from Black Forest Labs with custom datasets. Create specialized LoRA adaptations for specific editing tasks. | |
| `fal-ai/flux-kontext-trainer` | Flux Kontext Trainer | LoRA trainer for FLUX.1 Kontext [dev] | |
| `fal-ai/flux-lora-fast-training` | Train Flux LoRA | Train styles, people and other subjects at blazing speeds. | |
| `fal-ai/flux-lora-portrait-trainer` | Train Flux LoRAs For Portraits | FLUX LoRA training optimized for portrait generation, with bright highlights, excellent prompt following and highly detailed results. | |
| `fal-ai/ideogram/custom-models` | Ideogram | Train Ideogram on your photos, your style, your subject, your look, from a small set of reference images to images that feel consistently yo | |
| `fal-ai/krea-2-trainer` | Krea 2 Trainer | Train a custom LoRA on your own images to teach Krea 2 a new subject, character, or style. Provide a set of training images (and an optional | |
| `fal-ai/ltx23-trainer-v2/a2a` | LTX 2.3 Trainer (V2) - Audio-to-Audio | Train a LoRA that transforms one audio clip into another, learning a reference→target mapping from paired audio examples. | |
| `fal-ai/ltx23-trainer-v2/a2v` | LTX 2.3 Trainer (V2) - Audio-to-Video | Train a LoRA that generates video from a start image plus a conditioning audio track, producing motion that matches the sound. | |
| `fal-ai/ltx23-trainer-v2/audio-extend-prefix` | LTX 2.3 Trainer (V2) - Forward Audio Extension | Train a LoRA that continues an audio clip forward in time, generating the audio that follows a short clean prefix. | |
| `fal-ai/ltx23-trainer-v2/audio-extend-suffix` | LTX 2.3 Trainer (V2) - Backward Audio Extension | Train a LoRA that generates the lead-in to an audio clip, extending audio backward in time from its ending. | |
| `fal-ai/ltx23-trainer-v2/audio-inpaint` | LTX 2.3 Trainer (V2) - Audio Inpainting | Train a LoRA that regenerates masked time spans of an audio clip while keeping the rest unchanged. | |
| `fal-ai/ltx23-trainer-v2/av2av` | LTX 2.3 Trainer (V2) - Audio+Video Reference Transformation | Train a LoRA for a joint audio+video transformation, conditioned on a reference clip (its video and audio) to produce a matching target clip | |
| `fal-ai/ltx23-trainer-v2/av2av-masked` | LTX 2.3 Trainer (V2) - Masked Audio+Video Transformation | Train a LoRA that regenerates a masked video region (guided by kept pixels and a video reference) while jointly generating audio from an aud | |
| `fal-ai/ltx23-trainer-v2/extend-prefix` | LTX 2.3 Trainer (V2) - Forward Video Extension | Train a LoRA that continues a video forward in time — supply an opening clip at inference and the model generates what comes next. | |
| `fal-ai/ltx23-trainer-v2/extend-suffix` | LTX 2.3 Trainer (V2) - Backward Video Extension | Train a LoRA that generates the lead-in to a video, extending a clip backward in time from its ending. | |
| `fal-ai/ltx23-trainer-v2/i2v` | LTX 2.3 Trainer (V2) - Image-to-Video | Fine-tune LTX 2.3 to animate a starting image — supply a still plus a prompt at inference and the model generates a video that begins from t | |
| `fal-ai/ltx23-trainer-v2/ic-lora/a2a` | LTX 2.3 Trainer (V2) - Audio-to-Audio IC-LoRA | Train an IC-LoRA that transforms one audio clip into another, conditioned at inference on a reference audio clip. | |
| `fal-ai/ltx23-trainer-v2/ic-lora/av2av` | LTX 2.3 Trainer (V2) - Audio+Video Reference IC-LoRA | Train an IC-LoRA for a joint audio+video transformation, conditioned on a reference clip's video and audio to produce a matching target. | |
| `fal-ai/ltx23-trainer-v2/ic-lora/av2av-masked` | LTX 2.3 Trainer (V2) - Masked Audio+Video IC-LoRA | Train an IC-LoRA that regenerates a masked video region (guided by kept pixels and a video reference) while jointly generating audio from an | |
| `fal-ai/ltx23-trainer-v2/ic-lora/v2v` | LTX 2.3 Trainer (V2) - Video-to-Video IC-LoRA | Train an IC-LoRA that learns a video-to-video transformation from paired before/after clips, conditioned at inference on a reference (contro | |
| `fal-ai/ltx23-trainer-v2/ic-lora/v2v-masked` | LTX 2.3 Trainer (V2) - Masked Video-to-Video IC-LoRA | Train an IC-LoRA that regenerates only the masked region of a video, guided by the kept pixels and a separate reference/control video. | |
| `fal-ai/ltx23-trainer-v2/inpaint` | LTX 2.3 Trainer (V2) - Video Inpainting | Train a LoRA that regenerates a masked region of a video while keeping the rest unchanged, blending the new content with its surroundings. | |
| `fal-ai/ltx23-trainer-v2/interpolate` | LTX 2.3 Trainer (V2) - Keyframe Interpolation | Train a LoRA that generates the video between keyframes — supply first/last (and optional middle) frames at inference and the model fills th | |
| `fal-ai/ltx23-trainer-v2/outpaint` | LTX 2.3 Trainer (V2) - Spatial Outpainting | Train a LoRA that expands the video frame outward, keeping an inner rectangle fixed and generating the surrounding region. | |
| `fal-ai/ltx23-trainer-v2/t2a` | LTX 2.3 Trainer (V2) - Text-to-Audio | Train a LoRA that generates audio from a text prompt — the audio counterpart of text-to-video — learning a sound or style from your clips. | |
| `fal-ai/ltx23-trainer-v2/t2v` | LTX 2.3 Trainer (V2) - Text-to-Video | Fine-tune LTX 2.3 on your own clips to teach it a new subject, character, object, or visual style, then generate full videos from a text pro | |
| `fal-ai/ltx23-trainer-v2/v2a` | LTX 2.3 Trainer (V2) - Video-to-Audio | Train a LoRA that generates audio (foley / sound design) for a silent video, learning a soundtrack that matches the on-screen action. | |
| `fal-ai/ltx23-trainer-v2/v2v` | LTX 2.3 Trainer (V2) - Video-to-Video | Train a LoRA that learns a video-to-video transformation from paired before/after clips, steered at inference by a reference (control) video | |
| `fal-ai/ltx23-trainer-v2/v2v-masked` | LTX 2.3 Trainer (V2) - Masked Video-to-Video | Train a LoRA that regenerates only the masked region of a video, guided by both the kept pixels and a separate reference/control video. | |
| `fal-ai/ltx23-v2v-trainer` | LTX-2.3 22B Video to Video Trainer | Train LTX-2.3 22B for video transformation or video-conditioned generation. | |
| `fal-ai/ltx23-video-trainer` | LTX-2.3 22B Video Trainer | Train LTX-2.3 22B for custom styles and effects. | |
| `fal-ai/qwen-image-2512-trainer` | Qwen Image 2512 Trainer | Qwen Image 2512 LoRA training | |
| `fal-ai/qwen-image-edit-2509-trainer` | Qwen Image Edit 2509 Trainer | LoRA trainer for Qwen Image Edit 2509 | |
| `fal-ai/recraft/v3/create-style` | Recraft V3 Create Style | Recraft V3 Create Style is capable of creating unique styles for Recraft V3 based on your images. | |
| `fal-ai/stable-audio-3-trainer` | Stable Audio 3 Trainer | Stable Audio 3 LoRA Trainer fine-tunes Stable Audio 3 base models on paired audio-caption datasets, producing compact LoRA weights that adap | |
| `fal-ai/trellis-2-lora-trainer` | TRELLIS.2 Trainer | Train LoRA adapters for TRELLIS.2 model | |
| `fal-ai/turbo-flux-trainer` | Turbo Flux Trainer | A blazing fast FLUX dev LoRA trainer for subjects and styles. | |
| `fal-ai/wan-22-image-trainer` | Wan 2.2 14B Image Trainer | Wan 2.2 text to image LoRA trainer. Fine-tune Wan 2.2 for subjects and styles with unprecedented detail. | |
| `fal-ai/wan-22-trainer/i2v-a14b` | Wan-2.2 LoRA Trainer | Train custom LoRAs for Wan-2.2 T2V/I2V 480P | |
| `fal-ai/wan-22-trainer/t2v-a14b` | Wan-2.2 LoRA Trainer | Train custom LoRAs for Wan-2.2 T2V/I2V 480P | |
| `fal-ai/wan-trainer/i2v-720p` | Wan-2.1 LoRA Trainer | Train custom LoRAs for Wan-2.1 I2V 720P | |
| `fal-ai/wan-trainer/t2v` | Wan-2.1 LoRA Trainer | Train custom LoRAs for Wan-2.1 T2V 1.3B | |
| `fal-ai/wan-trainer/t2v-14b` | Wan-2.1 LoRA Trainer | Train custom LoRAs for Wan-2.1 T2V 14B | |
| `fal-ai/z-image-trainer` | Z Image Trainer | Train LoRAs on Z-Image Turbo, a super fast text-to-image model of 6B parameters developed by Tongyi-MAI. | |
| `fal-ai/z-image-turbo-trainer-v2` | Z Image Turbo Trainer V2 | Fast LoRA trainer for Z-Image-Turbo, a super fast text-to-image model of 6B parameters developed by Tongyi-MAI. | |
| `ideogram/v4/trainer` | Ideogram V4.0q LoRA Trainer | Train custom LoRAs for personalization, styles or other use cases on top of Ideogram V4. | |
| `minimax/h3/flf2v/trainer` | MiniMax H3 First Last Frame LoRA Trainer | Train a MiniMax H3 LoRA on first/last/both keyframe signatures, teaching it to generate video with audio that starts on one image and lands | |
| `minimax/h3/i2v/trainer` | MiniMax H3 Image to Video Audio LoRA Trainer | Train a MiniMax H3 LoRA with first-frame conditioning, so a still image animates into video with audio; captions optional. | |
| `minimax/h3/ref2va/trainer` | MiniMax H3 Reference to Video LoRA Trainer | Train a MiniMax H3 LoRA with reference conditioning, so different modalities animate into video with audio; captions optional. | |
| `minimax/h3/t2v/trainer` | MiniMax H3 Text to Video LoRA Trainer | Train a MiniMax H3 LoRA on your own captioned clips for pure text-to-video generation with matching audio. | |
| `recraft/v4/create-style` | Recraft V4 Styles Create Style | Creates a reusable style from your reference images and returns a style ID you can pass to Recraft V4 Styles image and vector generation. | |
| `recraft/v4/pro/create-style` | Recraft V4 Styles Pro Create Style | Creates a reusable style from your reference images for use with Recraft V4 Styles Pro generation | |

## unknown（1）

| 端点 | 名称 | 说明 | 状态 |
|------|------|------|------|
| `bytedance/seedance-2.5/draft/complete` | Seedance 2.5 | Draft completion endpoint for Seedance 2.5 - submit a draft id to regenerate the task at 1080p. | |
