# 飞书登录配置

本 fork 使用「飞书企业自建应用 + OAuth 2.0 + 桌面设备确认」。登录由 ArtCraft 桌面端发起，在系统浏览器或手机飞书中授权，Proxy 换取用户身份并向桌面端签发自己的会话。无需配置机器人、事件订阅或消息回调。

## 1. 创建飞书应用

1. 打开 [飞书开发者后台](https://open.feishu.cn/app)，创建企业自建应用，例如 `ArtCraft`。
2. 在「凭证与基础信息」中取得 **App ID** 和 **App Secret**。
3. 如果后台要求添加应用能力，启用「网页应用」。本项目从桌面端发起授权；工作台主页不是 OAuth 回调，不需要为登录单独实现工作台免登。
4. 在「安全设置」的「重定向 URL」中添加下面的完整回调地址。
5. 在「版本管理与发布」中发布应用，设置可用范围，确保测试账号在范围内；如需管理员审批，等待审批生效。

本实现仅调用登录用户信息接口，使用 `open_id`、`tenant_key`、`name`。不读取通讯录列表、邮箱、手机号，也不申请 `offline_access`；不需要刷新飞书 access token。若后台提示需要用户基本信息权限，按该接口的当前权限提示开启并重新发布。

## 2. 配置回调 URL

本地同机浏览器调试：

```text
http://localhost:12345/auth/feishu/callback
```

部署环境，例如 Proxy 域名为 `https://artcraft-api.example.com`：

```text
https://artcraft-api.example.com/auth/feishu/callback
```

重定向 URL 必须与 `PROXY_PUBLIC_URL` 加 `/auth/feishu/callback` 一致：协议、主机、端口、路径都要匹配，不要添加末尾 `/`。`PROXY_PUBLIC_URL` 本身只填 origin，不带路径。

**手机扫码不能使用 localhost。** 手机的 localhost 指向手机本身。扫码联调请先将 Proxy 部署到可访问的 HTTPS 域名，或使用你管理的 HTTPS 开发隧道，并同步更新飞书回调白名单、`PROXY_PUBLIC_URL` 和桌面端 `ARTCRAFT_PROXY_URL`。若飞书后台不接受 HTTP/localhost，同样使用 HTTPS 域名。

## 3. 配置并启动 Proxy

需要 Node.js 24 或更新版本。Proxy 没有第三方 npm 依赖。

在仓库根目录执行：

```bash
cd proxy
cp .env.example .env
```

编辑 `proxy/.env`：

```dotenv
HOST=127.0.0.1
PORT=12345
PROXY_PUBLIC_URL=http://localhost:12345
DATA_DIR=./data
FEISHU_APP_ID=cli_你的应用ID
FEISHU_APP_SECRET=你的应用Secret
FAL_KEY=你的fal密钥
FEISHU_ALLOWED_TENANTS=
MAX_ACTIVE_JOBS_PER_USER=5
```

`FEISHU_APP_SECRET`、`FAL_KEY` 只保存在 Proxy 服务端；不要放进前端 `VITE_*` 变量、桌面安装包或 Git。`.env` 已加入忽略规则。

`FEISHU_ALLOWED_TENANTS` 可以填写允许的飞书 `tenant_key`，多个值用逗号分隔。留空时允许飞书应用可用范围内的用户登录。若你只允许一个企业使用，请填写该企业的 tenant key；不要将 App ID 当成 tenant key。

```bash
npm start
```

检查服务：

```bash
curl http://localhost:12345/healthz
```

应返回 `{"ok":true}`。健康检查不验证飞书密钥和 fal 余额。

## 4. 配置桌面端并登录

桌面端默认连接 `http://localhost:12345`。连接部署服务时，在启动开发版桌面进程的同一终端设置：

```bash
export ARTCRAFT_PROXY_URL=https://artcraft-api.example.com
```

在仓库根目录运行 `./script/artcraft/unix_dev.sh` 启动源码开发版（需要 Rust、Tauri CLI 2、平台依赖及前端依赖）。此变量由 Rust 进程读取，不是 Vite 配置。普通浏览器打开 Vite 页面不能代替 Tauri 桌面登录桥。

1. 在桌面端点击「使用飞书登录」。
2. 系统浏览器打开 Proxy 登录页，点击「继续使用飞书」。
3. 在飞书完成授权。
4. Proxy 显示登录用户名称及确认码。与桌面端的确认码核对一致后，点击「确认登录此设备」。
5. 返回 ArtCraft，最多等待一个轮询周期（约 5 秒）完成登录。

登录请求有效期为 10 分钟；应用会话有效期为 7 天。Proxy 使用独立随机会话，飞书 access token 不会传到桌面端。退出登录会撤销该会话。

## 5. 部署示例

将 Proxy 放在 HTTPS 反向代理后，转发到 `127.0.0.1:12345`。服务端设置：

```dotenv
PROXY_PUBLIC_URL=https://artcraft-api.example.com
HOST=127.0.0.1
PORT=12345
DATA_DIR=/var/lib/artcraft-proxy
```

持久化并保护 `DATA_DIR`：其中包括 SQLite 会话、生成任务和上传素材。当前实现使用单进程 SQLite；不要让多个实例共同写同一数据库。配置服务日志时，不记录 OAuth 查询参数、Cookie、请求正文或完整登录链接。

也可从仓库根目录构建容器：

```bash
docker build -t artcraft-fal-proxy ./proxy
docker run --rm --name artcraft-proxy \
  --env-file proxy/.env -e HOST=0.0.0.0 \
  -p 127.0.0.1:12345:12345 \
  -v artcraft-proxy-data:/app/data \
  artcraft-fal-proxy
```

容器内 `DATA_DIR` 使用默认 `/app/data`；若 `.env` 设置了其他目录，请保持卷挂载路径一致。桌面客户端 `ARTCRAFT_PROXY_URL` 和飞书回调地址都应使用外部 HTTPS 域名。

## 6. 常见问题

| 现象                         | 检查方法                                                             |
|------------------------------|----------------------------------------------------------------------|
| 提示重定向地址非法           | 检查飞书安全设置中的完整回调 URL，以及修改是否已发布                   |
| 应用不可用或用户不在范围内   | 检查应用发布状态、可用范围、测试账号和管理员审批                       |
| Proxy 尚未配置飞书应用       | 检查 `.env` 的 App ID/Secret；修改后重启 Proxy                         |
| `Invalid OAuth state`        | 重新从桌面发起登录；同一浏览器完成授权，允许 Cookie，勿复用旧回调 URL   |
| 此飞书租户未获授权           | 检查 `FEISHU_ALLOWED_TENANTS`，确认登录的是预期企业账号                 |
| 手机扫码打不开              | 不要使用 localhost；使用手机能访问的 HTTPS Proxy 地址                 |
| 浏览器成功但桌面一直等待     | 两端须连接同一个 Proxy；检查确认码是否已确认、请求是否超过 10 分钟     |
| 登录成功但生成失败           | 飞书登录和 fal 计费独立；检查服务端 `FAL_KEY`、fal 余额及模型访问权限   |

## 官方参考

- [飞书网页扫码登录流程](https://open.feishu.cn/document/qr-code-scanning-login-for-web-app/introduction)
- [获取 user_access_token（OAuth v2）](https://open.feishu.cn/document/authentication-management/access-token/get-user-access-token)
- [获取登录用户信息](https://open.feishu.cn/document/server-docs/authentication-management/login-state-management/get)
- [飞书登录 Web 应用配置示例](https://open.feishu.cn/community/articles/7317091221654224898)

当前代码使用授权地址 `https://accounts.feishu.cn/open-apis/authen/v1/authorize`、换 token 接口 `https://open.feishu.cn/open-apis/authen/v2/oauth/token`，以及用户信息接口 `https://open.feishu.cn/open-apis/authen/v1/user_info`。
