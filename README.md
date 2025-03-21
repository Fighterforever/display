# 微服务架构根因分析方法

本项目是一个展示微服务架构中不同根因分析方法的现代化网站，采用响应式设计，适合在各种设备上浏览。

## 项目特点

- 现代化UI设计，响应式布局
- 分类展示各种根因分析方法：
  - 统计方法
  - 图理论方法
  - 机器学习方法
  - 深度学习方法
  - LLM方法
- 详细的方法说明、流程图及技术亮点分析
- 基于GitHub Pages部署，便于访问和分享

## 本地开发

### 前提条件

- Node.js (v14+)
- npm

### 安装依赖

```bash
npm install
```

### 生成网站页面

```bash
npm run generate
```

### 本地预览

可以使用任何静态网站服务器预览，例如：

```bash
npx serve
```

然后在浏览器中访问 `http://localhost:5000`

## 部署到GitHub Pages

1. 创建一个GitHub仓库
2. 将项目代码推送到仓库

```bash
git init
git add .
git commit -m "初始提交"
git remote add origin <你的GitHub仓库URL>
git push -u origin main
```

3. 部署到GitHub Pages

```bash
npm run deploy
```

4. 在GitHub仓库设置中启用GitHub Pages，选择gh-pages分支作为源

## 项目结构

```
├── index.html              # 网站主页
├── styles.css              # 全局样式表
├── template.html           # 页面模板
├── generate-pages.js       # 页面生成脚本
├── package.json            # 项目配置
├── README.md               # 项目说明
├── 统计方法/                # 统计方法分类
│   ├── 概率统计模型/        # 概率统计模型方法
│   ├── 时间序列分析/        # 时间序列分析方法
│   └── 直接相关性分析/      # 直接相关性分析方法
├── 图理论方法/              # 图理论方法分类
├── 机器学习方法/            # 机器学习方法分类
├── 深度学习方法/            # 深度学习方法分类
└── LLM方法/                # LLM方法分类
```

## 自定义与扩展

1. 修改 `styles.css` 自定义网站样式
2. 编辑 `template.html` 更改页面结构
3. 在对应目录下添加新的方法，包含MD文件和PNG图片
4. 运行 `npm run generate` 重新生成页面

## 许可证

MIT 