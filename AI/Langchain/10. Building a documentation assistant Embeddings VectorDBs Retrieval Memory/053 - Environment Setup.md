---
title: 'Bài 053 — Setup môi trường documentation helper Pinecone'
course: 'langchain'
lesson: 53
status: edited-verified
source: '053 - Environment Setup.md'
verified_date: '2026-09-17'
langchain_version: '0.2x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 053 — Setup môi trường documentation helper với Pinecone

> Nguồn: `053 - Environment Setup.md` — giữ mạch Eden: clone branch `1-start-here`, Pinecone UI mới, `.env`, Pipfile, `logger.py`.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Clone đúng branch `1-start-here` lấy boilerplate.
- Tạo Pinecone index cho LangChain docs embeddings.
- Hiểu dimension 1536, cosine, serverless, cloud/region.
- Tạo `.env` với OpenAI và Pinecone keys, không commit.
- Cài deps bằng Pipenv và tạo `ingestion.py`.

## 2. Nội dung theo mạch transcript

### 2.1. Clone branch khởi đầu

Transcript thao tác:

```bash
git clone <URL> -b 1-start-here
```

- Repo chứa boilerplate code cần cho documentation helper.
- Branch `1-start-here` là điểm bắt đầu.
- Liệt kê working directory project sau clone.

### 2.2. Tạo Pinecone index docs

Vào Pinecone login, create index:

- Tên gợi ý: `long-chain-dash-doc-dash-index` (transcript đọc, giữ nguyên).
- Báo Pinecone embeddings model sẽ dùng: `text-embeddings small` của OpenAI.
- Dimension: `1536`.
- Similarity: `cosine`.

Transcript nhấn đây là new Pinecone UI:

- Nhập index name.
- Chọn embedding model, nhớ chọn `1536` dimension.
- Set configuration serverless.
- Bấm create, vài giây index initialized.

Cloud và region:

- Index transcript deploy trên AWS, hiện region.
- Muốn Google Cloud thì tick logo, sẽ deploy đó.
- AWS customers muốn AWS, GCP customers muốn Google Cloud.
- Giúp latency và commercial agreements.
- Region quan trọng cho GDPR, ví dụ phải deploy ở Europe data center.

### 2.3. Cấp key cho LangChain

- LangChain sẽ request Pinecone hộ ta nên cần API key.
- Copy API key Pinecone, bỏ vào `.env`.
- Mở project lần đầu bằng PyCharm trong video.
- Tạo `.env`, tất nhiên không commit vì secrets.
- Trong `.env` bỏ `PINECONE_API_KEY` đã copy.
- Thêm OpenAI API key hoặc LLM vendor khác đang dùng.

### 2.4. Deps và files boilerplate

Tắt virtualenv automatic, mở `Pipfile`:

- Chứa packages đã pre-prepare.
- Ví dụ `langchain-pinecone`.
- Mở lock file thấy LangChain `0.26` latest lúc quay.
- Nhắc bạn xem khóa sau có thể version khác, tác giả sẽ update code/videos nếu breaking changes.

Files lưu ý:

- `logger.py` mới thêm, bên trái cũng thấy, các videos sau sẽ dùng.
- Thư mục `backend` cứ ignore, các videos sau mới tạo.
- Thư mục `docs` cứ ignore, các videos sau mới download LangChain docs.

Cài đặt:

```bash
pipenv install
```

- Lấy từ Pipfile + lock, cài đúng versions giống máy tác giả.

Tạo file:

- Tạo `ingestion.py` sẽ giữ implementation ingestion: embed LangChain documentation thành vectors rồi store vào Pinecone.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Ingestion docs = embed pages thành vectors rồi store Pinecone | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Index cần dimension khớp model, cosine, serverless | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 3 | Cloud/region ảnh hưởng latency, agreements, GDPR | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 4 | `.env` giữ secrets, không commit, LangChain đọc Pinecone/OpenAI keys | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | `pipenv install` từ Pipfile/lock để đồng bộ version | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Tên branch/index, version 0.26, UI Pinecone lúc quay, PyCharm | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

> Hộp cập nhật: transcript dùng `Pipfile`/`pipenv` và LangChain 0.26. Hiện tại repo mẫu dùng `pyproject.toml`/`uv`, LangChain 1.x. GIỮ gốc + map sang lệnh mới.

```bash
# Cu (transcript)
pipenv install
# Moi tuong duong
uv sync
```

```python
# .env giu nguyen y transcript
# OPENAI_API_KEY=...
# PINECONE_API_KEY=...
```

Giải thích:

- Đổi tooling không đổi logic: vẫn clone branch sạch, tạo index khớp dimension, giữ secrets ngoài repo.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Branch | `1-start-here` lấy boilerplate |
| Index | Tên docs index, 1536, cosine, serverless |
| Cloud | AWS/GCP tùy khách, region cho GDPR/latency |
| Secrets | `.env` OpenAI + Pinecone, không commit |
| Deps cũ | `pipenv install` LangChain 0.26 |
| Deps mới | `uv sync` LangChain 1.x tương đương |
| Files | `logger.py` dùng sau, `backend`/`docs` ignore tạm |
| Next file | `ingestion.py` cho pipeline ingest |

**Câu chốt: Chuẩn bị đúng index và secrets thì ingestion docs sau này chỉ việc chạy.**

## 5. Câu hỏi ôn tập

**1. Vì sao clone branch `1-start-here`?**

<details><summary>Đáp án</summary>

Để lấy boilerplate sạch cho documentation helper thay vì code từ zero theo docs RAG mới.

</details>

**2. Index docs cần cấu hình gì?**

<details><summary>Đáp án</summary>

Tên docs index, model text-embeddings small, dimension 1536, cosine, serverless.

</details>

**3. Vì sao region/cloud quan trọng?**

<details><summary>Đáp án</summary>

Để giảm latency, khớp commercial agreements và tuân thủ GDPR khi cần Europe data center.

</details>

**4. Vì sao không commit `.env`?**

<details><summary>Đáp án</summary>

Vì chứa secrets OpenAI và Pinecone, lộ sẽ bị lạm dụng; LangChain đọc qua env lúc runtime.

</details>

**5. `pipenv install` làm gì?**

<details><summary>Đáp án</summary>

Cài đúng versions từ Pipfile/lock để đồng bộ với máy tác giả; nay tương đương `uv sync`.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `054 - Ingestion Pipeline Intro.md` — chuyển từ FireCrawl sang Tavily, crawl docs rồi chunk/index.
