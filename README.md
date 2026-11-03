# 方块英语 BlockLingo

[免费使用](https://blocklingo-mc-english.foldedtick2.chatgpt.site) · [GitHub 源码](https://github.com/RAYMEN-BBB/blocklingo)

免费的 MC 场景英语词典与每日练习。无需账号，无运行时依赖，无 API Key，不调用大模型。63 张原创方块风单词图卡、12 个学习主题、全屏翻卡、慢速跟读、Andrew 自然英语配音、每日学习营、旧词复习和打卡、每日五词练习和本机进度。

## 本机运行

需要 Node.js 20+；预览和生成下载包使用 Python 3。

```sh
npm run build
python3 scripts/release.py
npm test
npm run check
npm run dev
```

打开 http://127.0.0.1:4173 。学习进度保存在当前浏览器；发音使用随源码附带的 Andrew 神经合成 MP3，无需设备安装英语声音。

## 自行部署

1. 把 `site.config.json` 的 `url` 改为你的 HTTPS 站点根地址；或在构建时设置 `SITE_URL`。
2. 运行构建和下载包命令，将 `dist/` 部署到 Cloudflare Pages、Netlify、Vercel 静态站或其他静态托管。
3. 使用 GitHub Pages 时，在仓库 Settings → Pages 选择 GitHub Actions；本仓库附带 `deployment/github-actions/pages.yml.txt` 模板，需要由有 workflow 权限的维护者复制为 `.github/workflows/pages.yml` 后启用；默认面向自定义域名或 `用户名.github.io` 根站点。项目子路径部署需先适配根路径链接。
4. 验证 `/words/diamond/`、`/sitemap.xml` 和 `/robots.txt`。向搜索引擎提交站点地图前，先确认站点公开且可索引。

`SITE_URL` 决定 canonical 和 sitemap，必须与最终站点一致。纯静态托管应支持目录 index.html；404 页使用 `dist/404.html`。

## 内容维护

编辑 `src/words.json`，字段依次为：URL 标识、英文名、中文名、分类、美式音标、英文例句、中文译文、英文任务、中文任务、插画标记、学习提示。所有新增内容先核对，再构建；不要为所有搜索排列组合生成页面。

`npm run check` 检查每页标题、描述、canonical、结构化数据、站内链接和 sitemap；`CHECK_URL=https://你的站点 npm run check` 额外检查线上关键路径。`deployment/github-actions/check.yml.txt` 是每日检查模板，需要有 workflow 权限的维护者复制为 `.github/workflows/check.yml` 后启用。启用前不会在 GitHub 自动执行；当前官方站由本机维护任务检查，不能代替人工内容核验。

## 开源与边界

代码 MIT，原创学习文案 CC BY 4.0。无广告或第三方统计脚本，不录音。不是 Minecraft 官方产品，与 Mojang 或 Microsoft 无关联，也未获其认可。未附带任何第三方频道内容或付费 SEO 原文。

## 原创插图

每个词条有独立 SVG 方块插图，由 `scripts/art.mjs` 在构建时生成，离线包含在 `dist/art/`。没有外链图片依赖，没有游戏贴图。新增词条时须在该脚本中加入对应插画；没有插画会停止构建。插画按项目代码 MIT 许可提供。

## 每日学习营

`/learn/` 支持每天 5 或 10 个词、2 句口语与待复习词。只有主动标记练习完成才计入打卡；播放次数不算学会。计划按实际打卡进度向前走，漏学不跳课，同日词组保持固定。学习记录与语速偏好放在 `blocklingo-study-v1` 本机存储中，不上传。旧版每日测验的存储键保持不变。

跟读通过本站 Andrew 音频示范，留出时间让孩子自行朗读；不录音、不自动评分；音频为神经合成，不是真人录音。全屏闪卡支持前后切换、自动播放、关闭即停止及加入复习。

## Andrew 音频

单词和例句全部使用预生成的 `en-US-AndrewNeural` 合成音频，原始生成语速为 -5%，网站可切换正常/舒适/慢速，播放保持音高。音频随源码分发，运行时只向本网站请求 MP3，不需要语音 API Key，不再调用设备 TTS。媒体加载失败时显示重试提示，不切换到随机设备声音。

音频清单为 `src/audio-manifest.json`，文件在 `src/audio/andrew/`。构建会核对词库中的每个单词和例句都有音频。新增/改写内容后使用 `uv run --with edge-tts python scripts/generate-audio.py` 生成音频，可按本机网络配置传 `--proxy`；不把代理地址或凭据写进项目。访客不依赖该生成服务。音频为本站原创词条文本的机器合成素材，不包含参考站文件。

首页点图片或单词直接播放 Andrew 配音，保持当前页面；卡片内“听例句”也直接播放。大图翻卡与每日学习营是可选入口，不作为查词发音的前置步骤。
