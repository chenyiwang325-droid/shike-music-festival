# 此刻有声｜网页源码

**[推荐体验](https://shike-music-festival.pages.dev)** · [备用体验](https://chenyiwang325-droid.github.io/shike-music-festival/) · [GitHub 仓库](https://github.com/chenyiwang325-droid/shike-music-festival)

## 运行

- 直接打开 `离线体验.html`。
- 或运行 `python3 serve.py`，访问 `http://localhost:8765/`。macOS 可双击 `启动预览.command`。
- 修改源码后，运行 `python3 build_offline.py` 更新离线文件。
- 运行 `node test.cjs` 检查测评、输入校验和队列规则。

## 文件

| 文件 | 用途 |
|---|---|
| `dist/index.html`、`dist/style.css` | 页面结构与样式 |
| `dist/app.js` | 问答、生成、保存、分享、领券与上屏交互 |
| `dist/core.js` | 测评计分、输入校验、领取链接和队列规则 |
| `dist/renderer.js` | 海报排版及 PNG 输出 |
| `dist/assets/` | 海报素材与二维码工具 |

## 实现范围

- 音乐人格由四道问答产生；完成后选择风格、留言并填写昵称。
- 三种人格 × 三种风格 × 三句留言，共 27 张独立场景。人格决定人物状态与互动，留言决定场景，风格决定色彩与材质；昵称仅作署名。
- 保存当前海报为 PNG；提供二维码领取、分享卡片和系统图片分享，不支持系统分享时可保存图片自行发送。
- 个人创作不限时。公共展示须勾选授权，每张 12 秒、最多排队 5 张、等待 10 分钟过期，支持撤回、暂停和紧急下屏。
- 领取链接在页面中校验 24 小时有效期。离线二维码为示例，手机领取请使用在线网页。
- 未接入实时生图、真实核销和服务端审核。公共队列使用同源浏览器本地存储，不支持跨设备同步。

第三方二维码工具许可见 `THIRD_PARTY.md`。
