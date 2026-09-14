# Open-Knowledge Website

Web tra cứu cho toàn bộ repo [Open-Knowledge](../README.md), built bằng
[Docusaurus v3](https://docusaurus.io/) (docs-only mode, tiếng Việt).

Design system: xem [design-system/open-knowledge/MASTER.md](./design-system/open-knowledge/MASTER.md)
(Minimalism & Swiss Style, pattern FAQ/Documentation Landing, font Inter).

## Content từ đâu?

**Không viết bài trực tiếp trong `website/docs/`.** Thư mục `docs/` được
tạo tự động bởi script sync từ các file `.md` ở repo root:

```bash
npm run sync   # quét ../*.md -> website/docs (+ normalize frontmatter, sanitize MDX)
```

Quy ước sync (`scripts/sync-content.mjs`) — web chỉ show **bài học**,
bỏ phần **blog WordPress**:

| Nguồn | Đích (URL) |
|---|---|
| Khóa Kafka `.../01. X/blog/y.md` | `/kafka/01-x/y` (bỏ `blog/`) |
| Docker K8s `Section 01 .../001. X.md` | `/devops/docker-k8s/section-01-.../x` (bỏ số đầu tên file) |
| LangChain/LangGraph `NN. X/*.md` | `/ai/langchain/...`, `/ai/langgraph/...` |
| File có `wordpress_id` / `original_url` wordpress.com | **bỏ qua** (file gốc giữ nguyên) |
| File meta `_PROMPT...md`, `README.md` ở root | **bỏ qua** (`README.md` thành `/intro`) |
| Transcript thô (không frontmatter) | giữ lại, gắn banner + tag `transcript` |

Script cũng tự escape `{...}`/`<...` ngoài code block (tránh sập MDX),
tạo `_category_.json` cho sidebar, slug tường minh `/ai`, `/devops`,
`/kafka` cho category cấp 1, và sinh `src/data/categories.json`
để homepage render cards khóa học động theo đúng số bài còn lại.

## Phát triển

```bash
npm install
npm run start    # tự sync rồi chạy dev server (http://localhost:3000)
```

## Build & deploy

```bash
npm run build   # = sync + docusaurus build -> thư mục build/
npm run serve   # chạy thử bản production locally
```

Deploy: connect repo lên **Vercel**, set **Root Directory = `website`**
(`vercel.json` đã config sẵn build command/output).

## Kiểm tra sau khi sửa nội dung gốc

1. Sửa `.md` ở repo root như bình thường.
2. Chạy `npm run sync && npm run build` trong `website/` — build phải
   pass **không WARNING** (broken link/MDX đều đã được xử lý ở tầng sync).
