---
title: 'Bài 044 — Dựng boilerplate RAG với uv và Pinecone'
course: 'langchain'
lesson: 44
status: edited-verified
source: '044 - Medium Analyzer- Boilerplate Project Setup.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 044 — Dựng boilerplate RAG với uv và Pinecone

> Nguồn: `044 - Medium Analyzer- Boilerplate Project Setup.md` — giữ mạch Eden: clone repo, branch `project/rag-gist`, uv, Cursor, Pinecone index.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Clone repo và checkout đúng branch/commit `project/rag-gist`.
- Hiểu các file boilerplate: `.gitignore`, `.env`, `pyproject.toml`, `ingestion.py`, blog TXT.
- Dựng venv bằng `uv lock` và `uv sync`, chọn interpreter cho IDE.
- Tạo Pinecone index và cấu hình `.env` đúng tên biến.
- Chạy sanity check `ingestion.py` trước khi ingest.

## 2. Nội dung theo mạch transcript

### 2.1. Clone và về đúng commit khởi đầu

Transcript thao tác trên GitHub:

- Vào repo LangChain course, branch `project/rag-gist`.
- Mở commit list, mỗi lesson là một commit.
- Commit đầu tiên thêm loạt files, đó là starting point.

```bash
cd ~/Desktop
git clone <URL-langchain-course>
cd langchain-course
git checkout -b project/rag-gist <hash-initial-commit>
```

Giải thích:

- `git clone` lấy toàn bộ repo.
- `checkout -b` tạo branch mới tại đúng hash initial commit.
- Mở Cursor, sidebar thấy files, tab Git thấy đang ở `initial commit`.

### 2.2. Các file boilerplate

| File | Vai trò trong transcript |
|------|--------------------------|
| `.gitignore` | Không track files không muốn commit, transcript xác nhận `.env` nằm trong đó là tốt |
| `.python-version` | Ghi Python version đang dùng |
| `ingestion.py` | Boilerplate, lúc đầu báo lỗi vì chưa chọn venv |
| `medium-blog.txt` | Bài Medium về vector DB, copy paste text từ Google `what is a vector db medium` |
| `pyproject.toml` | Liệt kê dependencies |
| `uv.lock` | Phiên bản chính xác lúc quay, transcript xóa để tạo lại |

Nội dung `pyproject.toml` theo transcript:

- `black`, `isort` để format.
- `langchain` — transcript nói đừng lo version, lúc quay là `1.2`, khi bạn cài sẽ mới hơn, tác giả hứa refill video nếu cần.
- `langchain-community` — cho DocumentLoader cộng đồng.
- `langchain-openai` — cho embeddings model và LLM, transcript dùng OpenAI.
- `langchain-pinecone` — integration managed vector store dùng trong section này.
- `langchain-hub` — transcript nói thực ra không cần, đừng lo.
- `python-dotenv` — load biến môi trường.
- `uv.lock` — transcript xóa để tạo lại vì hôm quay là `2025-12-15`.

### 2.3. Dựng môi trường bằng uv

Transcript chạy:

```bash
uv lock
uv sync
```

Giải thích:

- `uv lock` đọc TOML, tạo lock file mới với packages mới nhất.
- Transcript kiểm tra thấy `langchain 1.2.0`, gọi là latest lúc đó.
- `uv sync` cài dependencies từ lock vào `.venv`.
- `.venv` untracked nhờ `.gitignore`.
- Mở terminal mới trong Cursor sẽ tự load venv này.

Chọn interpreter cho IDE:

```bash
which python3
```

- Copy path interpreter trong `.venv`.
- `Cmd+Shift+P` → `Select Interpreter` → `Enter interpreter path`.
- Chọn recommended, lỗi đỏ trong `ingestion.py` biến mất.
- Nếu lỗi, paste path đã copy.

Sanity check:

```python
print("ingestion")
```

- Chạy thấy in ra là ổn.

### 2.4. File `.env` và API keys

Tạo `.env`:

```
OPENAI_API_KEY=<key>
LANGSMITH_API_KEY=<key>
LANGSMITH_PROJECT=RAG GIST
LANGSMITH_TRACING=true
PINECONE_API_KEY=<key>
PINECONE_INDEX_NAME=medium-blogs-embeddings-index
```

Transcript nhấn:

- Paste OpenAI key như sessions trước, quay xong sẽ revoke.
- Paste bộ LangSmith để tracing, project tên `RAG GIST`.
- Đừng commit `.env`.

### 2.5. Tạo Pinecone index

Transcript dùng Pinecone vì managed, cloud-based, có free tier đủ cho khóa học. Các video sau sẽ show open-source alternatives.

Thao tác trên `pinecone.io`:

- Login, vào Indexes, lúc đầu trống.
- Create index `medium-bogs-embeddings-index` (transcript đọc, đặt tên tùy ý, sẽ cấu hình trong env).
- Custom settings:
  - Nhập dimension thủ công = độ dài vectors sẽ lưu.
  - Vector type: `Dense` (còn `Sparse`, chọn Dense).
  - Metric: `COSINE` default, còn `Euclidean`, `dotproduct`, hẹn elaborating sau.
- Cách transcript thích: tìm embeddings model đang dùng.
  - `text-embedding-3-small` của OpenAI.
  - Default config hiện `512`, transcript chọn `1536` để giữ nhiều semantic information hơn.
  - Rule of thumb: vector càng dài, càng giữ nhiều semantic meaning.

> Transcript giữ nguyên con số 512/1536 như lúc quay, không sửa.

- Capacity mode: `serverless`, còn dedicated read nodes, hẹn dive sau.
- Cloud provider: transcript không care cho tutorial, nhưng enterprise có compliance/privacy thì chọn giữa 3 providers lớn.
- Region: giữ default, ví dụ Ireland, Oregon. Khi deploy production nên để vector store cùng region với RAG app để tránh egress cost và giảm latency. Hẹn bàn trade-offs ở production section.
- Bấm Create, copy index name vào env `PINECONE_INDEX_NAME`.
- Tạo API key mới tên `rag-gist-video`, copy vào `PINECONE_API_KEY`.

> Tên `PINECONE_API_KEY` quan trọng vì LangChain Pinecone integration sẽ tìm đúng tên biến này.

### 2.6. Kiểm tra load env

```python
import os
print(os.environ["PINECONE_API_KEY"])
```

- Lần đầu lỗi vì chưa save `.env`.
- Save rồi chạy lại, in ra key là xong.
- Transcript chốt: xong phần boring, video sau chạy ingestion pipeline: chunk blog → embed từng piece thành vector → store vào Pinecone.

```
blog TXT -> chunk nho -> embed -> Pinecone
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Cấu trúc RAG ingestion: chunk → embed → store vào Pinecone via `from_documents` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | `langchain-pinecone` là integration managed vector store, dùng `PINECONE_API_KEY` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 3 | Index cần dimension khớp embeddings model, metric cosine, serverless | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 4 | `uv lock` + `uv sync` tạo `.venv`, `python-dotenv` load `.env`, LangSmith tracing vars | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Tên branch/commit, version 1.2.0, ngày 2025-12-15, tên index cụ thể, dimension 512/1536 UI lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 6 | `langchain-hub` không cần cho project này | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

Giữ đúng ý transcript, viết theo package hiện tại:

```python
import os
from dotenv import load_dotenv

load_dotenv()
print(os.environ.get("PINECONE_API_KEY") is not None)
print(os.environ.get("OPENAI_API_KEY") is not None)
```

```python
# Khoi tao PineconeVectorStore theo docs moi (ten bien giu nguyen)
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = PineconeVectorStore(
    index_name=os.environ["PINECONE_INDEX_NAME"],
    embedding=embeddings,
)
```

Giải thích:

- Không đổi tên biến `PINECONE_API_KEY` như transcript dặn.
- `index_name` + `embedding` khớp docs Pinecone hiện tại.
- Model `text-embedding-3-small` giữ như transcript, dimension trên Pinecone phải khớp.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Branch | `project/rag-gist` tại initial commit để bắt đầu |
| Deps | `langchain`, `langchain-community`, `langchain-openai`, `langchain-pinecone`, `python-dotenv` |
| Env tool | `uv lock` tạo lock, `uv sync` cài vào `.venv` |
| IDE | Chọn interpreter trong `.venv` để hết lỗi import |
| Env file | `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`, LangSmith vars, không commit |
| Pinecone | Dense, cosine, serverless, dimension khớp embeddings model |
| Check | `print(os.environ[...])` sau khi save `.env` |

**Câu chốt: Dựng đúng branch, đúng venv và đúng tên biến Pinecone thì pipeline ingestion sau này mới chạy ổn định.**

## 5. Câu hỏi ôn tập

**1. Vì sao phải checkout đúng initial commit?**

<details><summary>Đáp án</summary>

Để bắt đầu từ boilerplate sạch, mỗi lesson sau là một commit, tránh lẫn code các bước sau theo docs RAG mới.

</details>

**2. `uv lock` và `uv sync` khác nhau gì?**

<details><summary>Đáp án</summary>

`uv lock` giải dependencies từ TOML ra lock file, `uv sync` cài từ lock vào `.venv`.

</details>

**3. Vì sao lỗi import trong `ingestion.py` biến mất sau khi chọn interpreter?**

<details><summary>Đáp án</summary>

Vì IDE lúc đầu chưa trỏ vào `.venv` có packages, chọn đúng interpreter thì hết lỗi.

</details>

**4. Vì sao tên `PINECONE_API_KEY` quan trọng?**

<details><summary>Đáp án</summary>

Vì LangChain Pinecone integration tìm đúng tên biến này để xác thực, sai tên sẽ không kết nối theo docs Pinecone mới.

</details>

**5. Khi tạo index cần khớp gì với embeddings model?**

<details><summary>Đáp án</summary>

Dimension (độ dài vector), metric cosine, mode serverless như transcript, kiểm theo docs Pinecone mới.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `046 - Medium Analyzer- Ingestion Implementation.md` — TextLoader, CharacterTextSplitter 1000, OpenAIEmbeddings, `from_documents` vào Pinecone.
