# 方块英语 BlockLingo

[免费使用](https://blocklingo-mc-english.foldedtick2.chatgpt.site) · [GitHub 源码](https://github.com/RAYMEN-BBB/blocklingo)

免费的 MC 场景英语词典与每日练习。无需账号，无运行时依赖，无 API Key，不调用大模型。36 张原创方块风单词图卡、6 个主题分类、卡片直接发音、图文详情、看图每日练习与浏览器发音、每日五词练习和本机进度。

## 本机运行

需要 Node.js 20+；预览和生成下载包使用 Python 3。

```sh
npm run build
python3 scripts/release.py
npm test
npm run check
npm run dev
```

打开 http://127.0.0.1:4173 。学习进度保存在当前浏览器；发音可用性取决于浏览器和设备的英语语音服务。

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
