# MDEdit — Online Markdown Editor

> A feature-rich online Markdown editor with a built-in AI assistant, real-time preview, multi-format import/export, dark mode, and more.  
> No installation required — just open it in your browser.

MDEdit is a browser-based Markdown editor that works out of the box by simply opening an HTML file. It features a built-in AI assistant that supports intelligent document creation, content continuation, polishing, translation, summary and outline generation, and is compatible with mainstream model APIs including OpenAI, DeepSeek, and Claude, with streaming output for real-time AI responses. The editor uses a dual-pane layout — write Markdown source on the left, see the live-rendered preview on the right — with draggable panel widths, double-click to reset, and the ability to swap panel positions. A complete formatting toolbar supports one-click insertion of headings, bold, italic, links, images, tables, code blocks, task lists, and more; pressing Enter in lists auto-continues the format with auto-incrementing numbers for ordered lists. Import from PDF, Word `.docx`, Excel, and PPT and convert to Markdown, or export documents as HTML, DOC Word-compatible files, PDF, or copy rich text directly for pasting into WPS/Office. The editor offers dark/light mode switching with code highlight themes that follow automatically; the outline panel generates a hierarchical table of contents from headings with click-to-navigate. Documents auto-save drafts every 5 seconds and auto-restore on next open; all opened files are stored in a local document library with full-text search. The status bar displays word count, line count, estimated reading time, and cursor position in real time. Supports drag-and-drop for files, images, and folders where the browser allows folder expansion, with automatic local image path matching. The entire editor is a single HTML file with dependencies loaded via CDN — lightweight and portable, ideal for writing, note-taking, and document editing.

---

## Table of Contents

- [MDEdit — Online Markdown Editor](#mdedit--online-markdown-editor)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [AI Assistant](#ai-assistant)
    - [Configure API](#configure-api)
    - [Quick Actions](#quick-actions)
    - [Free Chat](#free-chat)
    - [Floating Natural Language Commands](#floating-natural-language-commands)
    - [Intelligent Memory System](#intelligent-memory-system)
    - [Result Actions](#result-actions)
  - [Interface Layout](#interface-layout)
    - [Panel Operations](#panel-operations)
  - [File Operations](#file-operations)
    - [Open File](#open-file)
    - [Save File](#save-file)
    - [Leave Prompt](#leave-prompt)
  - [Editing Features](#editing-features)
    - [Formatting Toolbar](#formatting-toolbar)
    - [List Auto-Continuation](#list-auto-continuation)
    - [Tab Indentation](#tab-indentation)
  - [Preview Features](#preview-features)
    - [Live Preview](#live-preview)
    - [Copy Rich Text (WeChat / WPS Friendly)](#copy-rich-text-wechat--wps-friendly)
    - [Code Block Copy](#code-block-copy)
    - [Scroll Sync](#scroll-sync)
  - [Import Features](#import-features)
    - [Import Modes](#import-modes)
  - [Export Features](#export-features)
  - [Document Search](#document-search)
  - [Outline Navigation](#outline-navigation)
  - [Dark Mode](#dark-mode)
  - [Image Management](#image-management)
    - [Load Local Images](#load-local-images)
    - [Drag and Drop](#drag-and-drop)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Status Bar](#status-bar)
  - [Auto-Save and Draft Recovery](#auto-save-and-draft-recovery)
  - [Version History](#version-history)
  - [Library](#library)
  - [FAQ](#faq)
    - [Q: Images not displaying?](#q-images-not-displaying)
    - [Q: Exported file has formatting issues in WPS?](#q-exported-file-has-formatting-issues-in-wps)
    - [Q: Browser says storage is full?](#q-browser-says-storage-is-full)
    - [Q: Can I use it offline?](#q-can-i-use-it-offline)
  - [Technical Information](#technical-information)

---

## Quick Start

1. Open `MDEdit.html` in a browser (Chrome / Edge recommended)
2. Type Markdown content in the left editor pane; see the live preview on the right
3. You can also **drag and drop** `.md` files onto the page to open them

---

## AI Assistant

MDEdit includes a built-in AI assistant that supports intelligent document creation and editing via OpenAI-compatible APIs.

### Configure API

1. Click the **"AI"** button in the toolbar to open the AI panel
2. On first use, the settings dialog will appear automatically. Fill in the following:

| Setting | Description |
|---------|-------------|
| **Model Preset** | Optional preset for common OpenAI-compatible providers; fills endpoint, model, output length, context limit, and thinking mode without overwriting your API key |
| **API Endpoint** | An OpenAI-compatible API endpoint, e.g. `https://api.openai.com/v1/chat/completions` |
| **API Key** | Your API key, stored only in the browser's local storage |
| **Model Name** | Model identifier, e.g. `gpt-4o-mini`, `deepseek-chat`, `claude-opus-4-6`, etc. |
| **Max Output Length** | Maximum tokens per AI response, recommended 2048–8192 |
| **Temperature** | Higher values = more creative, lower values = more precise, range 0–2 |
| **Context Token Limit** | Total token limit for history + current message sent to the AI, recommended 60%–80% of the model's context window, default 8000 |
| **Context Sending Controls** | Toggle whether free chat sends the current editor content, AI summary memory, related archived history, and recent conversation context |
| **Thinking Mode** | Optional. When enabled, MDEdit requests and displays reasoning/thinking chunks returned by compatible models; when disabled, thinking content is not requested or shown |
| **CORS Proxy** | Optional proxy address for APIs that do not allow browser-side cross-origin requests |

> Compatible with any OpenAI-compatible API, including OpenAI, DeepSeek, Qwen, Claude, Moonshot, etc.  
> When entering a base_url (e.g. `https://api.openai.com` or `https://api.openai.com/v1`), it will auto-complete to the full chat completions endpoint.

AI replies are streamed in real time. After filling in the settings, click **"Test Connection"** to verify the endpoint, API key, model, and optional thinking mode before saving.

Privacy note: the API key is stored only in your browser. When using AI features, the current request, relevant context, and selected Markdown content may be sent to the API endpoint you configure.

### Quick Actions

The AI panel provides 10 one-click action buttons at the top:

| Action | Description |
|--------|-------------|
| 📝 **Create Document** | Generate a complete Markdown document from a description |
| ✍️ **Continue Writing** | Continue writing based on current editor content, maintaining style |
| ✨ **Polish & Improve** | Improve expression, fix errors, enhance readability |
| 📋 **Generate Summary** | Create a concise summary of the current document |
| 🌐 **Translate to English** | Translate the document to English, preserving Markdown format |
| 🌐 **Translate to Chinese** | Translate the document to Chinese, preserving Markdown format |
| 🔧 **Fix Grammar** | Auto-fix typos, grammar errors, and punctuation issues |
| 📖 **Expand Content** | Expand and enrich the document content |
| 🗂️ **Generate Outline** | Generate a document outline structure from a topic description |
| 📊 **Generate Chart** | Generate SVG charts (flowcharts, bar charts, pie charts, mind maps, etc.) from a description |

When text is selected in the editor, editor-based quick actions such as polishing, translation, grammar fixing, summary, and expansion will process only the selected Markdown content. If nothing is selected, the full editor content is used.

### Free Chat

In addition to quick actions, you can type any request directly in the input box. The AI automatically retrieves the current editor content as context and uses the intelligent memory system to retrieve relevant chat history.

### Floating Natural Language Commands

MDEdit provides a floating **Command** button for natural language operations. After AI is configured, you can type requests such as "export PDF", "preview only", "open library", "insert table", or "open SVG editor" instead of selecting toolbar menus manually.

- **Floating UI**: click the floating command button to open a compact command window.
- **AI writing actions**: the floating window also includes the original AI panel actions: create, continue, polish, summary, translate, fix grammar, expand, outline, and chart.
- **Memory controls**: start a new chat, view memory status, or clear AI memory directly from the floating window.
- **Safe whitelist**: commands are mapped only to built-in, predefined actions; AI cannot execute arbitrary JavaScript.
- **Confirmation**: file creation, saving, exporting, copying, inserting, and file-picker actions require explicit confirmation.
- **Local fallback**: common commands are recognized locally first; if not matched, the configured AI is used to classify the intent as JSON.
- **Result actions**: AI replies generated in the floating window can be inserted at the cursor, replace the editor, appended to the editor, or copied.
- **Stop generation**: while the floating window is generating AI content, the send button becomes a stop button and can interrupt the current stream.

Supported first-batch actions include saving, saving as, opening files, import/export, PDF export, rich-text/WeChat copy, view switching, panel swapping, dark mode, library, outline, version history, search, current-document find, AI settings, table insertion, SVG file insertion, SVG folding, and opening the SVG editor.

### Intelligent Memory System

The AI assistant uses a three-tier memory architecture to intelligently manage conversation context:

| Memory Tier | Description |
|-------------|-------------|
| **Working Memory** | Recent conversation turns, always included in context |
| **Summary Memory** | AI-generated conversation history summary (≤300 words), extremely token-efficient |
| **Archive Memory** | All historical messages stored in IndexedDB, retrieved by keyword relevance |

- **Storage**: Uses browser IndexedDB (hundreds of MB capacity), not limited by localStorage's 5MB cap
- **Retrieval**: Keywords are automatically extracted from each message to retrieve relevant archived history
- **Summary**: Every 10 messages, the AI automatically compresses history into a concise summary
- **Token Control**: Intelligently trims context to stay within the model's input window
- **New Chat**: Click "New Chat" to clear working memory; archived memory is preserved and searchable
- **Clear Memory**: Click "Clear Memory" to completely erase all history and summaries

### Result Actions

Four action buttons appear below each AI response:

- **Insert at Cursor** — Insert the AI-generated Markdown at the current editor cursor position
- **Replace Editor** — Replace all editor content with the AI-generated content
- **Append to Editor** — Append the AI-generated content to the end of the editor
- **Copy Content** — Copy the raw Markdown content of the AI response to clipboard

> AI responses support streaming output (typewriter effect); you can click the stop button at any time during generation.

---

## Interface Layout

```
┌──────────────────────────────────────────────────────┐
│  Toolbar: In | Out | Manage | SVG Edit | View | Theme │
├────────────────────┬─┬───────────────────────────────┤
│                    │ │                               │
│   Editor Panel     │↔│     Preview Panel             │
│  (Markdown Source) │ │  (Live Rendered Output)       │
│                    │ │                               │
├────────────────────┴─┴───────────────────────────────┤
│  Status Bar: Chars | Words | Lines | Read Time | Cursor │
└──────────────────────────────────────────────────────┘
```

### Panel Operations

| Action | Description |
|--------|-------------|
| **Toolbar Dropdowns** | The top toolbar uses **In**, **Out**, and **Manage** dropdown menus for clearer navigation |
| **SVG Edit** | Opens `https://svgedit.all8ai.top/` in a new window to process SVG files |
| **Drag Divider** | Drag the center divider to freely adjust the editor/preview width ratio |
| **Double-click Divider** | Double-click the divider to reset panel widths to 50:50 |
| **Toggle Button** | The "Toggle" button in the toolbar swaps editor and preview positions |
| **View Mode** | Choose between "Dual Pane", "Editor", or "Preview" modes on the right side of the toolbar |

---

## File Operations

### Open File

- Click the **"Open"** button in the toolbar and select a `.md` file
- Or **drag and drop** a `.md` file directly onto the page
- In supported browsers, dragging folders can expose files for automatic MD/image detection
- In HTTP mode, `?file=xxx.md` can automatically load a Markdown file from the same site or an allowed URL

### Save File

- Click the **"Save"** button in the toolbar
- Click **"Save As"** to download the current document with a new `.md` filename
- Shortcut: `⌘/Ctrl + S`
- The file will be downloaded locally in `.md` format

### Leave Prompt

- When there are unsaved changes in the editor, closing or refreshing the page will show a confirmation prompt
- Prevents accidental content loss

---

## Editing Features

### Formatting Toolbar

The editor provides quick formatting buttons above:

| Button | Function | Markdown Syntax |
|--------|----------|-----------------|
| **H** | Heading | `# Heading` |
| **B** | Bold | `**Bold**` |
| *I* | Italic | `*Italic*` |
| ~~S~~ | Strikethrough | `~~Strikethrough~~` |
| `</>` | Inline Code | `` `code` `` |
| `{ }` | Code Block | ` ``` ` |
| 🔗 | Link | `[Text](URL)` |
| 🖼 | Image | `![Alt](Path)` |
| SVG | Insert SVG File | Select a `.svg` file and insert it as a `svg` code block at the current cursor position |
| • | Unordered List | `- List item` |
| 1. | Ordered List | `1. List item` |
| > | Blockquote | `> Quote` |
| 📊 | Table | Insert Markdown table template |
| — | Horizontal Rule | `---` |
| ☑ | Task List | `- [ ] Task` |

The toolbar also provides an SVG/image folding button. Long SVG charts and base64 images can be folded into short placeholders in the editor and unfolded before saving or exporting.

### List Auto-Continuation

When editing lists and pressing **Enter**:
- Automatically continues the list format (`- `, `* `, `1. `, `- [ ] `)
- Ordered list numbers auto-increment
- Task lists auto-reset to unchecked state
- Pressing Enter on an empty list item cancels the list format

### Tab Indentation

- **Tab** — Indent selected text (insert 4 spaces)
- **Shift + Tab** — Unindent (remove leading spaces)

---

## Preview Features

### Live Preview

- Markdown content entered in the editor is rendered to formatted HTML in real time
- Supports all common Markdown syntax: headings, lists, tables, code blocks, blockquotes, images, links, etc.
- Code blocks have automatic syntax highlighting
- Mermaid diagrams are rendered from fenced code blocks such as <code>```mermaid</code>
- Math formulas are rendered with KaTeX using `$...$` for inline math and `$$...$$` for block math
- Right-click SVG diagrams in the preview area to export them as `.svg` files or `.jpg` images

### Copy Rich Text (WeChat / WPS Friendly)

- There is a **"Copy"** button on the right side of the preview panel title bar
- Clicking it converts the preview content to **rich text with inline styles** and copies it to the clipboard
- **Can be pasted directly into WeChat Official Account editor, WPS, Word, etc., with full formatting preserved**
- All styles are inlined (no dependency on `<style>` tags), so formatting is not lost in WeChat
- Images are automatically embedded as base64 (load the image directory first for local images)
- The preview also provides a WeChat-oriented copy mode that replaces SVG charts with file-name placeholders, making it easier to upload images manually in the WeChat editor
- Supports all formats: headings, bold, italic, lists, tables, code blocks, blockquotes, horizontal rules, etc.

### Code Block Copy

- A **"Copy"** button appears in the top-right corner of code blocks in the preview area
- Click to copy the content of that specific code block

### Scroll Sync

- Scroll positions between the editor and preview area are automatically synchronized

---

## Import Features

Click the **"Import"** button in the toolbar to convert the following formats to Markdown:

| Format | Description |
|--------|-------------|
| **PDF** | Extract text content and convert to Markdown |
| **Word (.docx)** | Preserve headings, lists, and document structure. Legacy `.doc` files should be saved as `.docx` first |
| **Excel (.xlsx / .xls / .csv)** | Convert table data to Markdown tables |
| **PPT (.pptx)** | Extract slide text page by page |

### Import Modes

- **Replace Current Content** — Clear the editor before importing
- **Append to End** — Keep existing content and append imported content at the end

> You can also drag and drop PDF / Word `.docx` / Excel / PPT files onto the page for automatic detection and import. Dragged image files are inserted as base64 Markdown images and folded automatically to keep the editor readable.

---

## Export Features

When the editor has content, click the **"Export"** button in the toolbar to choose:

| Format | Description |
|--------|-------------|
| **HTML** | Full formatting and styles preserved, can be opened directly in WPS |
| **DOC** | Word-compatible HTML document, can be opened and edited in WPS / Office |
| **PDF** | Opens a dedicated print page, saves as PDF via the browser's print dialog, and closes the print page after printing |
| **Copy Rich Text** | Copy to clipboard, paste directly into WPS / Word with formatting preserved |

---

## Document Search

- Click the **"Find"** button in the toolbar or use `⌘/Ctrl + F` to search within the current document
- Supports next/previous match navigation, case-sensitive search, replace current match, and replace all
- Click **"Library Search"** or use `⌘/Ctrl + Shift + F` to search all locally stored documents
- Results show document names and content snippets with keyword highlighting
- You can directly open or delete documents from search results

> All opened file contents are automatically saved to browser local storage for easy searching and reopening.

---

## Outline Navigation

- Click the **"Outline"** button in the toolbar to open the outline panel on the right
- Automatically extracts H1–H6 headings from the document to generate a hierarchical table of contents
- Click any item to smoothly scroll to the corresponding position
- Copy the generated outline as Markdown or insert it into the editor at the cursor position
- Updates in real time as you edit the document

---

## Dark Mode

- Click the **moon/sun icon** on the right side of the toolbar to toggle dark/light mode
- In dark mode, the editor, preview, toolbar, dialogs, and more are all adapted
- Code highlight themes automatically switch accordingly
- Preferences are saved automatically and persist on next visit

---

## Image Management

### Load Local Images

When the opened Markdown file references local images:

1. Click the **"Image Directory"** button in the toolbar
2. Select the folder where the images are located
3. The editor will automatically match image paths and display them

### Drag and Drop

- Drag and drop an entire folder containing `.md` files and images onto the page
- Automatically loads the MD files and all images inside

---

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `⌘/Ctrl + S` | Save file |
| `⌘/Ctrl + B` | Bold |
| `⌘/Ctrl + I` | Italic |
| `⌘/Ctrl + F` | Find/replace in current document |
| `⌘/Ctrl + Shift + F` | Search document library |
| `Tab` | Indent |
| `Shift + Tab` | Unindent |
| `Enter` (in list) | Auto-continue list |

---

## Status Bar

The status bar at the bottom of the page displays:

| Item | Description |
|------|-------------|
| **Characters** | Total character count in the editor |
| **Words** | Chinese character count + English word count |
| **Lines** | Total line count |
| **Read Time** | Estimated reading time (~300 words/min) |
| **Cursor Position** | Current line and column number of the cursor |

---

## Auto-Save and Draft Recovery

- Editor content is auto-saved as a draft to browser local storage every **5 seconds**
- Also auto-saves when closing the page
- On next visit, if an unsaved draft is detected, a recovery prompt will appear
- Drafts are valid for **7 days**

---

## Version History

- Click the **"Version"** button in the toolbar to view version history for the current document
- Versions are stored in IndexedDB and generated when opening, saving, importing, restoring, or writing documents into the library
- Keeps the latest **20** versions per document and automatically removes older records
- You can restore a version, copy its content, delete one version, or clear all versions of the current document
- Before restoring, the current editor content is automatically backed up as a version

---

## Library

- Click the **"Library"** button in the toolbar to manage all your documents
- View all documents saved in the IndexedDB document store
- Supports sorting by processing time (newest/oldest) and filename (A-Z/Z-A)
- One-click to reopen any document or permanently delete them
- Rename documents, duplicate documents, or clear the whole library after confirmation
- Star important documents, add tags, assign a folder/category, and filter by filename, tags, folder, or starred status
- Select visible documents for batch JSON export or batch deletion after confirmation
- Export the entire library as a JSON backup file
- Import a JSON backup to restore documents; documents with the same name will be overwritten after confirmation
- Backup files preserve document metadata including stars, tags, and folders

---

## FAQ

### Q: Images not displaying?

**A:** When the Markdown references local path images, you need to click the "Image Directory" button to select the folder containing the images. You can also drag and drop the entire folder containing images onto the page.

### Q: Exported file has formatting issues in WPS?

**A:** It is recommended to use "Export as HTML" or "Copy Rich Text" — these two methods preserve formatting most completely.

### Q: Browser says storage is full?

**A:** MDEdit uses IndexedDB as its core local storage, which usually provides much more capacity than the 5MB `localStorage` limit and is more suitable for large documents or content containing base64 images.

### Q: Can I use it offline?

**A:** The first load requires a network connection (to load third-party libraries from CDN). Once loaded, the browser caches these resources, and you can use it offline in most cases afterwards.

---

## Technical Information

- **AI Assistant**: OpenAI-compatible API (streaming SSE)
- **Markdown Parsing**: marked.js
- **Code Highlighting**: highlight.js
- **HTML Sanitization**: DOMPurify
- **Diagrams**: Mermaid
- **Math Rendering**: KaTeX
- **PDF Parsing**: pdf.js
- **Word Parsing**: mammoth.js
- **Excel Parsing**: xlsx.js (SheetJS)
- **PPT Parsing**: jszip + custom XML parsing

---

*MDEdit — A Clean and Efficient Markdown Editor*

---
---

<p align="center">
  <a href="#mdedit--online-markdown-editor">English</a> | <a href="#mdedit--在线-markdown-编辑器">中文</a>
</p>

---

# MDEdit — 在线 Markdown 编辑器

> 一款功能丰富的在线 Markdown 编辑器，内置 AI 助手，支持实时预览、多格式导入导出、暗色模式等特性。  
> 无需安装，浏览器打开即用。

MDEdit 是一款基于浏览器的 Markdown 编辑器，无需安装，打开 HTML 文件即可使用。编辑器内置 AI 助手，支持智能创建文档、续写内容、润色优化、翻译、生成摘要和大纲，兼容 OpenAI、DeepSeek、Claude 等主流模型 API，通过流式输出实时显示 AI 回复。编辑器采用双栏布局，左侧编写 Markdown 源码，右侧实时预览渲染效果，面板宽度可拖拽调整，双击分割条一键重置，还能切换左右位置。内置完整的格式工具栏，支持标题、粗体、斜体、链接、图片、表格、代码块、任务列表等常用格式一键插入；列表编辑时按回车自动续行，有序列表序号自动递增。支持从 PDF、Word `.docx`、Excel、PPT 导入并转换为 Markdown，也可将文档导出为 HTML、DOC Word 兼容格式、PDF 或直接复制富文本粘贴到 WPS/Office 中。编辑器提供暗色/亮色模式切换，代码高亮主题自动跟随；大纲面板可从标题自动生成层级目录，点击即可定位。文档每 5 秒自动保存草稿，下次打开自动恢复；所有打开过的文件存入本地文档库，支持全文搜索。状态栏实时显示字数、行数、预估阅读时间和光标位置。支持拖放文件、图片，以及在浏览器允许展开目录时拖放文件夹，自动匹配本地图片路径。整个编辑器为单个 HTML 文件，依赖通过 CDN 加载，轻量便携，适合写作、笔记和文档编辑场景。

---

## 目录

- [MDEdit — 在线 Markdown 编辑器](#mdedit--在线-markdown-编辑器)
  - [目录](#目录)
  - [快速开始](#快速开始)
  - [AI 助手](#ai-助手)
    - [配置 API](#配置-api)
    - [快捷操作](#快捷操作)
    - [自由对话](#自由对话)
    - [悬浮自然语言指令](#悬浮自然语言指令)
    - [智能记忆系统](#智能记忆系统)
    - [结果操作](#结果操作)
  - [界面布局](#界面布局)
    - [面板操作](#面板操作)
  - [文件操作](#文件操作)
    - [打开文件](#打开文件)
    - [保存文件](#保存文件)
    - [离开提示](#离开提示)
  - [编辑功能](#编辑功能)
    - [格式工具栏](#格式工具栏)
    - [列表自动续行](#列表自动续行)
    - [Tab 缩进](#tab-缩进)
  - [预览功能](#预览功能)
    - [实时预览](#实时预览)
    - [复制富文本（公众号 / WPS 友好）](#复制富文本公众号--wps-友好)
    - [代码块复制](#代码块复制)
    - [滚动联动](#滚动联动)
  - [导入功能](#导入功能)
    - [导入模式](#导入模式)
  - [导出功能](#导出功能)
  - [文档搜索](#文档搜索)
  - [大纲导航](#大纲导航)
  - [暗色模式](#暗色模式)
  - [图片管理](#图片管理)
    - [加载本地图片](#加载本地图片)
    - [拖放加载](#拖放加载)
  - [快捷键一览](#快捷键一览)
  - [状态栏说明](#状态栏说明)
  - [自动保存与草稿恢复](#自动保存与草稿恢复)
  - [版本历史](#版本历史)
  - [资料库](#资料库)
  - [常见问题](#常见问题)
    - [Q: 图片无法显示？](#q-图片无法显示)
    - [Q: 导出的文件在 WPS 中格式不对？](#q-导出的文件在-wps-中格式不对)
    - [Q: 浏览器提示存储空间不足？](#q-浏览器提示存储空间不足)
    - [Q: 可以离线使用吗？](#q-可以离线使用吗)
  - [技术信息](#技术信息)

---

## 快速开始

1. 用浏览器（推荐 Chrome / Edge）打开 `MDEdit.html`
2. 在左侧编辑器中输入 Markdown 内容，右侧实时预览
3. 也可直接 **拖放** `.md` 文件到页面中打开

---

## AI 助手

MDEdit 内置 AI 助手，支持通过 OpenAI 兼容 API 进行智能文档创建和编辑。

### 配置 API

1. 点击工具栏 **「AI」** 按钮打开 AI 面板
2. 首次使用时会自动弹出设置界面，填写以下信息：

| 设置项 | 说明 |
|--------|------|
| **模型配置预设** | 可选的常用 OpenAI 兼容服务预设，会自动填充 API 地址、模型名称、输出长度、上下文上限和 Thinking 模式，不会覆盖 API Key |
| **API 地址** | OpenAI 兼容的 API Endpoint，如 `https://api.openai.com/v1/chat/completions` |
| **API Key** | 你的 API 密钥，仅保存在浏览器本地 |
| **模型名称** | 模型标识，如 `gpt-4o-mini`、`deepseek-chat`、`claude-opus-4-6` 等 |
| **最大输出长度** | AI 单次回复的最大 token 数量，建议 2048-8192 |
| **温度** | 值越高回复越有创意，值越低越精准，范围 0-2 |
| **上下文 token 上限** | 发送给 AI 的历史对话 + 当前消息的总 token 数上限，建议设为模型上下文窗口的 60%-80%，默认 8000 |
| **上下文发送控制** | 可分别控制自由对话是否发送当前编辑器全文、AI 摘要记忆、相关历史归档和最近对话上下文 |
| **Thinking 模式** | 可选。开启后会请求并显示兼容模型返回的推理/思考片段；关闭时不请求、不显示 thinking 内容 |
| **CORS 代理** | 可选代理地址，用于处理部分 API 不允许浏览器跨域直连的情况 |

> 支持任何 OpenAI 兼容的 API，包括 OpenAI、DeepSeek、通义千问、Claude、Moonshot 等。  
> 输入 base_url（如 `https://api.openai.com` 或 `https://api.openai.com/v1`）时会自动补全为完整的 chat completions 地址。

AI 回复默认使用流式输出。填写完成后，可点击 **「测试连接」** 验证 API 地址、API Key、模型名称以及可选 Thinking 模式是否可用，再保存设置。

隐私提示：API Key 仅保存在浏览器本地。使用 AI 功能时，当前请求、相关上下文以及选中的 Markdown 内容可能会发送到你配置的 API 地址。

### 快捷操作

AI 面板顶部提供 10 个一键操作按钮：

| 操作 | 说明 |
|------|------|
| 📝 **创建文档** | 根据描述从零生成完整的 Markdown 文档 |
| ✍️ **续写内容** | 基于编辑器当前内容，保持风格继续写作 |
| ✨ **润色优化** | 改善表达、修正错误、提升可读性 |
| 📋 **生成摘要** | 为当前文档生成简洁摘要 |
| 🌐 **翻译为英文** | 将文档翻译为英文，保持 Markdown 格式 |
| 🌐 **翻译为中文** | 将文档翻译为中文，保持 Markdown 格式 |
| 🔧 **修正语法** | 自动修正错别字、语法错误和标点问题 |
| 📖 **扩展内容** | 对文档内容进行扩展和丰富 |
| 🗂️ **生成大纲** | 根据主题描述生成文档大纲结构 |
| 📊 **生成图表** | 根据描述生成 SVG 图表（流程图、柱状图、饼图、思维导图等） |

当编辑器中存在选中文本时，润色、翻译、修正语法、摘要、扩展等基于编辑器内容的快捷操作会优先只处理选中的 Markdown 内容；没有选中文本时才处理全文。

### 自由对话

除了快捷操作，还可以在输入框中直接描述任意需求。AI 会自动获取编辑器中的当前内容作为上下文，并通过智能记忆系统自动检索相关历史对话。

### 悬浮自然语言指令

MDEdit 提供悬浮 **指令** 按钮，用于通过自然语言操作编辑器。AI 配置完成后，可以输入「导出 PDF」「只看预览」「打开资料库」「插入表格」「打开 SVG 编辑器」等请求，减少手动选择菜单。

- **悬浮 UI**：点击右下角悬浮指令按钮，打开紧凑悬浮窗。
- **AI 写作操作**：悬浮窗同时包含原 AI 面板的创建、续写、润色、摘要、翻译、修正、扩展、大纲和图表操作。
- **记忆管理**：可直接在悬浮窗中新建对话、查看记忆状态或清除 AI 记忆。
- **安全白名单**：指令只会映射到内置预定义动作，AI 不能执行任意 JavaScript。
- **执行确认**：新建、保存、导出、复制、插入、文件选择器等动作会先确认。
- **本地兜底**：常用指令优先本地识别；未匹配时才调用已配置 AI 返回 JSON 意图。
- **结果操作**：悬浮窗内生成的 AI 回复也可以插入到光标、替换编辑器、追加到编辑器或复制。
- **中断生成**：悬浮窗生成 AI 内容时，发送按钮会切换为停止按钮，可中断当前流式生成。

首批支持动作包括保存、另存为、打开文件、导入导出、PDF 导出、富文本/公众号复制、视图切换、左右切换、深浅色模式、资料库、大纲、版本历史、文库搜索、当前文档查找、AI 设置、插入表格、插入 SVG 文件、折叠 SVG，以及打开 SVG 编辑器。

### 智能记忆系统

AI 助手采用三层记忆架构，智能管理对话上下文：

| 记忆层 | 说明 |
|--------|------|
| **工作记忆** | 最近几轮对话，始终包含在上下文中 |
| **摘要记忆** | AI 自动生成的对话历史摘要（≤300字），极省 token |
| **归档记忆** | 所有历史消息存储在 IndexedDB，按关键词相关性检索 |

- **存储**：使用浏览器 IndexedDB（容量数百 MB），不受 localStorage 5MB 限制
- **检索**：每次发送消息时，自动提取关键词并从归档中检索相关历史消息
- **摘要**：每 10 条消息自动调用 AI 压缩历史为简洁摘要
- **Token 控制**：智能裁剪上下文，确保不超过模型输入窗口
- **新对话**：点击「新对话」清空工作记忆，归档记忆保留可被检索
- **清记忆**：点击「清记忆」彻底清除所有历史对话和摘要

### 结果操作

每条 AI 回复下方提供四个操作按钮：

- **插入到光标** — 将 AI 生成的 Markdown 插入到当前编辑器光标位置
- **替换编辑器** — 用 AI 生成的内容替换编辑器中的全部内容
- **追加到编辑器** — 将 AI 生成的内容追加到编辑器末尾
- **复制内容** — 复制 AI 生成的原始 Markdown 内容到剪贴板

> AI 回复支持流式输出（打字效果），生成过程中可随时点击停止按钮中止。

---

## 界面布局

```
┌──────────────────────────────────────────────────┐
│  工具栏：输入 | 输出 | 管理 | SVG编辑 | 视图 | 主题 │
├────────────────────┬─┬───────────────────────────┤
│                    │ │                           │
│     编辑器面板      │↔│     预览面板              │
│  (Markdown 源码)   │ │  (实时渲染效果)            │
│                    │ │                           │
├────────────────────┴─┴───────────────────────────┤
│  状态栏：字符 | 字数 | 行数 | 阅读时间 | 光标位置     │
└──────────────────────────────────────────────────┘
```

### 面板操作

| 操作 | 说明 |
|------|------|
| **工具栏下拉菜单** | 顶部工具栏使用 **输入**、**输出**、**管理** 下拉菜单，入口更清晰 |
| **SVG编辑** | 在新窗口打开 `https://svgedit.all8ai.top/`，用于处理 SVG 文件 |
| **拖拽分割条** | 拖动中间分割线可自由调整编辑器和预览的宽度比例 |
| **双击分割条** | 双击分割线可将面板宽度重置为 50:50 |
| **切换按钮** | 工具栏「切换」按钮可交换编辑器和预览的左右位置 |
| **视图模式** | 工具栏右侧可选择「双栏」「编辑」「预览」三种视图 |

---

## 文件操作

### 打开文件

- 点击工具栏 **「打开」** 按钮，选择 `.md` 文件
- 或直接将 `.md` 文件 **拖放** 到页面中
- 在支持的浏览器中，拖放文件夹可以暴露文件并自动识别其中的 MD 文件和图片
- 在 HTTP 模式下，可通过 `?file=xxx.md` 自动加载同站点或允许访问的 Markdown 文件

### 保存文件

- 点击工具栏 **「保存」** 按钮
- 点击 **「另存为」** 可用新的 `.md` 文件名下载当前文档
- 快捷键：`⌘/Ctrl + S`
- 文件将以 `.md` 格式下载到本地

### 离开提示

- 当编辑器中有未保存的修改时，关闭或刷新页面会弹出确认提示
- 防止误操作导致内容丢失

---

## 编辑功能

### 格式工具栏

编辑器上方提供快捷格式按钮：

| 按钮 | 功能 | Markdown 语法 |
|------|------|---------------|
| **H** | 标题 | `# 标题` |
| **B** | 粗体 | `**粗体**` |
| *I* | 斜体 | `*斜体*` |
| ~~S~~ | 删除线 | `~~删除线~~` |
| `</>` | 行内代码 | `` `代码` `` |
| `{ }` | 代码块 | ` ``` ` |
| 🔗 | 链接 | `[文本](URL)` |
| 🖼 | 图片 | `![描述](路径)` |
| SVG | 插入 SVG 文件 | 选择 `.svg` 文件，并以 `svg` 代码块形式插入到当前光标处 |
| • | 无序列表 | `- 列表项` |
| 1. | 有序列表 | `1. 列表项` |
| > | 引用 | `> 引用内容` |
| 📊 | 表格 | 插入 Markdown 表格模板 |
| — | 分割线 | `---` |
| ☑ | 任务列表 | `- [ ] 任务` |

格式工具栏还提供 SVG/图片折叠按钮。较长的 SVG 图表和 base64 图片可以折叠为编辑器中的短占位符，并在保存或导出前自动还原。

### 列表自动续行

编辑列表时按 **Enter** 键：
- 自动延续列表格式（`- `、`* `、`1. `、`- [ ] `）
- 有序列表序号自动递增
- 任务列表自动重置为未勾选状态
- 在空列表项上按 Enter 会取消列表格式

### Tab 缩进

- **Tab** — 缩进选中文本（插入 4 个空格）
- **Shift + Tab** — 反缩进（移除前导空格）

---

## 预览功能

### 实时预览

- 编辑器中输入的 Markdown 内容会实时渲染为格式化的 HTML
- 支持标题、列表、表格、代码块、引用、图片、链接等所有常用 Markdown 语法
- 代码块自动语法高亮
- 支持通过 <code>```mermaid</code> 代码块渲染 Mermaid 图表
- 支持使用 KaTeX 渲染数学公式：`$...$` 表示行内公式，`$$...$$` 表示块级公式
- 在预览区右键点击 SVG 图，可导出为 `.svg` 文件或 `.jpg` 图片

### 复制富文本（公众号 / WPS 友好）

- 预览面板标题栏右侧有 **「复制」** 按钮
- 点击后自动将预览内容转为 **带内联样式的富文本** 复制到剪贴板
- **可直接粘贴到微信公众号编辑器、WPS、Word 等应用中，保留完整格式**
- 所有样式以内联方式写入（不依赖 `<style>` 标签），公众号不会丢失排版
- 图片自动嵌入为 base64（如有本地图片需先加载图片目录）
- 预览区还提供公众号专用复制模式，可将 SVG 图表替换为按文件名编号的占位文案，便于在公众号编辑器中手动上传配图
- 支持标题、粗体、斜体、列表、表格、代码块、引用、分割线等全部格式

### 代码块复制

- 预览区的代码块右上角显示 **「复制」** 按钮
- 点击可单独复制该代码块的内容

### 滚动联动

- 编辑器和预览区的滚动位置会自动同步

---

## 导入功能

点击工具栏 **「导入」** 按钮，支持将以下格式转换为 Markdown：

| 格式 | 说明 |
|------|------|
| **PDF** | 提取文本内容，转为 Markdown |
| **Word (.docx)** | 保留标题、列表等文档结构。旧版 `.doc` 请先另存为 `.docx` |
| **Excel (.xlsx / .xls / .csv)** | 表格数据转为 Markdown 表格 |
| **PPT (.pptx)** | 按页提取幻灯片文本 |

### 导入模式

- **替换当前内容** — 清空编辑器后导入
- **追加到末尾** — 保留现有内容，将导入内容附加到末尾

> 也可直接拖放 PDF / Word `.docx` / Excel / PPT 文件到页面中，自动识别并导入。拖放图片文件会自动转为 base64 Markdown 图片，并默认折叠以保持编辑器可读性。

---

## 导出功能

编辑器有内容后，点击工具栏 **「导出」** 按钮，可选择：

| 格式 | 说明 |
|------|------|
| **HTML** | 保留完整排版和样式，WPS 可直接打开 |
| **DOC** | Word 兼容 HTML 文档，WPS / Office 可打开编辑 |
| **PDF** | 打开专用打印页面，通过浏览器打印对话框另存为 PDF，并在打印结束后自动关闭打印页 |
| **复制富文本** | 复制到剪贴板，可直接粘贴到 WPS / Word 中，保留格式 |

---

## 文档搜索

- 点击工具栏 **「查找」** 按钮或使用 `⌘/Ctrl + F` 可在当前文档中查找
- 支持上一个/下一个匹配、区分大小写、替换当前匹配和全部替换
- 点击 **「文库搜索」** 或使用 `⌘/Ctrl + Shift + F` 可搜索本地存储的所有文档
- 搜索结果显示文档名称和内容片段，支持关键词高亮
- 可直接打开或删除搜索到的文档

> 所有打开过的文件内容会自动保存到浏览器本地存储，方便随时搜索和打开。

---

## 大纲导航

- 点击工具栏 **「大纲」** 按钮，打开右侧大纲面板
- 自动从文档中提取 H1 ~ H6 标题，生成层级目录
- 点击目录项可平滑滚动到对应位置
- 可将生成的目录复制为 Markdown，或插入到编辑器当前光标位置
- 随文档编辑实时更新

---

## 暗色模式

- 点击工具栏右侧的 **月亮/太阳图标** 切换暗色 / 亮色模式
- 暗色模式下编辑器、预览、工具栏、弹窗等全部适配
- 代码高亮主题自动跟随切换
- 偏好设置自动保存，下次打开时保持

---

## 图片管理

### 加载本地图片

当打开的 Markdown 文件引用了本地图片时：

1. 点击工具栏 **「图片目录」** 按钮
2. 选择图片所在的文件夹
3. 编辑器会自动匹配图片路径并显示

### 拖放加载

- 拖放包含 `.md` 文件和图片的整个文件夹到页面中
- 自动加载其中的 MD 文件和所有图片

---

## 快捷键一览

| 快捷键 | 功能 |
|--------|------|
| `⌘/Ctrl + S` | 保存文件 |
| `⌘/Ctrl + B` | 加粗 |
| `⌘/Ctrl + I` | 斜体 |
| `⌘/Ctrl + F` | 当前文档查找/替换 |
| `⌘/Ctrl + Shift + F` | 搜索文档库 |
| `Tab` | 缩进 |
| `Shift + Tab` | 反缩进 |
| `Enter`（列表中） | 自动续行 |

---

## 状态栏说明

页面底部状态栏显示以下信息：

| 项目 | 说明 |
|------|------|
| **字符** | 编辑器中的总字符数 |
| **字数** | 中文字数 + 英文单词数 |
| **行数** | 总行数 |
| **阅读时间** | 预估阅读时间（按 ~300 字/分钟计算） |
| **光标位置** | 当前光标所在的行号和列号 |

---

## 自动保存与草稿恢复

- 编辑器内容每 **5 秒** 自动保存草稿到浏览器本地存储
- 关闭页面时也会自动保存
- 下次打开时，如果检测到未保存的草稿，会弹出恢复提示
- 草稿有效期为 **7 天**

---

## 版本历史

- 点击工具栏 **「版本」** 按钮可以查看当前文档的版本历史
- 版本记录保存在 IndexedDB 中，会在打开、保存、导入、恢复、写入资料库等场景自动生成
- 每篇文档最多保留最近 **20** 个版本，超出后自动清理旧版本
- 支持恢复版本、复制版本内容、删除单个版本，以及清空当前文档全部版本
- 恢复版本前会自动把当前编辑器内容备份为一个版本

---

## 资料库

- 点击工具栏 **「资料库」** 按钮可以一键管理本地存储的所有文档
- 支持 **4 种排序方式**：按处理时间 (由近到远/由远到近) 和按文件名 (A-Z/Z-A)
- 一览无余地查阅所有的文章状态（容量大小与修改时间）
- 支持随时打开并在主编辑器中恢复任何文章，也可以从本地资料库中彻底删除以释放空间
- 支持重命名文档、复制副本，以及二次确认后清空整个资料库
- 支持星标重要文档、添加标签、设置分类/文件夹，并按文件名、标签、分类或星标状态筛选
- 支持选择当前筛选结果中的文档，进行批量 JSON 导出或二次确认后的批量删除
- 支持将整个资料库导出为 JSON 备份文件
- 支持导入 JSON 备份恢复文档，同名文档会在确认后被备份内容覆盖
- 备份文件会保留星标、标签和分类等文档元数据

---

## 常见问题

### Q: 图片无法显示？

**A:** Markdown 引用的是本地路径图片时，需要点击「图片目录」按钮选择图片所在文件夹。也可以拖放整个包含图片的文件夹到页面中。

### Q: 导出的文件在 WPS 中格式不对？

**A:** 推荐使用「导出为 HTML」或「复制富文本」方式，这两种方式格式保留最完整。

### Q: 浏览器提示存储空间不足？

**A:** MDEdit 已使用 IndexedDB 作为核心本地存储，容量通常远高于 `localStorage` 的 5MB 限制，更适合保存较大的文档和包含 base64 图片的内容。

### Q: 可以离线使用吗？

**A:** 首次加载需要网络（用于加载 CDN 上的第三方库）。加载完成后，浏览器会缓存这些资源，后续可以在大部分情况下离线使用。

---

## 技术信息

- **AI 助手**：OpenAI 兼容 API（流式 SSE）
- **Markdown 解析**：marked.js
- **代码高亮**：highlight.js
- **HTML 安全**：DOMPurify
- **图表渲染**：Mermaid
- **数学公式**：KaTeX
- **PDF 解析**：pdf.js
- **Word 解析**：mammoth.js
- **Excel 解析**：xlsx.js (SheetJS)
- **PPT 解析**：jszip + 自定义 XML 解析

---

*MDEdit — 简洁高效的 Markdown 编辑器*
