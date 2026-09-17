---
title: 'Bài 055 — Imports và khởi tạo embeddings vector store'
course: 'langchain'
lesson: 55
status: edited-verified
source: '055 - Imports.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 055 — Imports và khởi tạo embeddings, vector store

> Nguồn: `055 - Imports.md` — giữ mạch Eden: imports ingestion, `logger.py`, env keys, SSL certifi, OpenAI embeddings rate limit, Chroma vs Pinecone.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Liệt kê imports ingestion: asyncio, os, ssl, certifi, dotenv, text splitter, vector stores, Document, Tavily.
- Hiểu `logger.py` với log info/success/error/warning/header.
- Khai báo env: OpenAI, Pinecone, LangSmith, Tavily.
- Khởi tạo OpenAI embeddings với chunk_size và retry_min_seconds.
- Khởi tạo Chroma local hoặc Pinecone cloud đúng dimension.

## 2. Nội dung theo mạch transcript

### 2.1. Boilerplate và logger

Code khởi đầu import asyncio và chạy main coroutine. Chạy sanity check bằng nút play, thấy working.

File `logger.py` đã chuẩn bị sẵn:

- Định nghĩa colors và hàm in đẹp.
- Có `log_info`, `log_success`, `log_error`, `log_warning`, `log_header`.
- Dùng để log từng bước ingestion pipeline cho readable.

### 2.2. Imports hệ thống

```python
import os
import ssl
import asyncio
import certifi
from dotenv import load_dotenv
```

Giải thích:

- `os` để đọc environment variables.
- `ssl` để tạo SSL context và type hinting objects.
- `certifi` để lấy valid certificate, gắn vào HTTP requests gửi đi.
- `dotenv` để load biến từ `.env`, sắp thấy cần values nào.
- Transcript nhấn đây là defensive programming vì sẽ gửi tons requests tới API.

### 2.3. Imports LangChain

```python
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_chroma import Chroma
# from langchain_pinecone import PineconeVectorStore
# from langchain_core.documents import Document
# from langchain_openai import OpenAIEmbeddings
# from langchain_tavily import TavilyCrawl, TavilyMap, TavilyExtract
# from logger import log_info, log_success, log_error, log_header
```

- `RecursiveCharacterTextSplitter`: helper chia documents, có video riêng giải thích vì sao hiệu quả.
- `Chroma`: vector store local nếu muốn index locally.
- `PineconeVectorStore`: cloud vector store, transcript sẽ dùng trong videos.
- `Document`: core abstraction chứa text + metadata để split, embed, index.
- `OpenAIEmbeddings`: transcript dùng, students dùng open-source embeddings cũng fine.
- `TavilyCrawl` driver chính lấy documentation, `TavilyMap`/`TavilyExtract` cho video optional.
- Đẹp của LangChain: một interface cho mọi vector store và embedding model nên code tương tự.

### 2.4. Env vars và SSL

Env trong transcript:

```
OPENAI_API_KEY=...
PINECONE_API_KEY=...
LANGSMITH_API_KEY=...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=documentation-helper
TAVILY_API_KEY=...
```

- Ba biến LangSmith để trace pipeline.
- Tavily key cho Map/Extract/Crawl.
- Không share keys, quay xong revoke.

SSL:

```python
# ssl_context = ssl.create_default_context(cafile=certifi.where())
```

- Cấu hình SSL context với valid certificate.
- Tránh weird SSL errors khi bắn nhiều API calls.
- Nếu dùng corporate computer có VPN vẫn lỗi thì tắt VPN.

### 2.5. Khởi tạo embeddings và rate limit

```python
# embeddings = OpenAIEmbeddings(
#     model="text-embedding-3-small",
#     show_progress_bar=True,
#     chunk_size=50,
#     retry_min_seconds=10,
# )
```

- Model `text-embedding-3-small`.
- `show_progress_bar` disabled default, transcript viết explicit để show tồn tại, tiện thấy progress khi index.
- `chunk_size=50`: giới hạn số text objects (LangChain Documents) embed mỗi request tới OpenAI.
- Vì sao quan trọng: tùy customer tier có tokens-per-minute limit. Số quá lớn ví dụ 1000 dễ rate limited, số quá nhỏ ví dụ 1 thì quá lâu.
- `retry_min_seconds=10`: sau failure đợi 10s mới retry.
- Failure hay gặp là rate limits, payload lỗi. Transcript show lỗi 429 kèm thời gian cần đợi 194ms, 500ms...
- Đặt số này quá lớn ví dụ 60s thì an toàn nhưng processing time dài.
- Rate limiting rất common khi lên production/scale, mỗi vendor tính khác: token bucket, leaky bucket... Generative AI phải handle.

### 2.6. Chroma vs Pinecone

Chroma local (commented):

```python
# vector_store = Chroma(
#     persist_directory="chroma_db",
#     embedding_function=embeddings,
# )
```

- Persist dưới working directory, tạo thư mục `chroma_db`, dùng SQLite.
- Truyền embedding function đã tạo.

Pinecone cloud transcript dùng:

- Index `langchain-docs-2025`, tạo trên Pinecone UI.
- Embeddings model OpenAI text small, dimension `1536`.
- Serverless vì không muốn handle scaling.
- Cloud AWS default, region default.
- Nhắc dimension phải match embedding size.

Khởi tạo Tavily objects lấy URL documentation, chạy thử compile không lỗi init là amazing.

```
imports -> env -> SSL -> embeddings -> vector store -> Tavily -> sanity run
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `RecursiveCharacterTextSplitter` chia Documents, `Document` có text + metadata | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Một interface cho mọi vector store/embeddings, đổi Chroma/Pinecone code tương tự | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 3 | `OpenAIEmbeddings(model, chunk_size, retry_min_seconds, show_progress_bar)` chống 429 | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Pinecone index cần dimension khớp model, serverless, LangSmith trace vars | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 5 | Tên index, version packages, VPN tip, UI lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

```python
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

load_dotenv()
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    chunk_size=50,
    retry_min_seconds=10,
)
vector_store = PineconeVectorStore(
    index_name=os.environ["PINECONE_INDEX_NAME"],
    embedding=embeddings,
)
```

Giải thích:

- Giữ đúng model, chunk_size, retry như transcript.
- `index_name` + `embedding` khớp docs Pinecone mới.
- Chroma thay bằng `vector_store` là chạy tương tự.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Logger | `log_header/info/success/error` cho pipeline |
| Sys imports | `os/ssl/certifi/dotenv/asyncio` defensive |
| Splitter | `RecursiveCharacterTextSplitter` |
| Doc | `Document` text + metadata |
| Embeddings | `text-embedding-3-small`, batch 50, retry 10s |
| Chroma | Local `chroma_db`, SQLite |
| Pinecone | Cloud 1536, serverless |
| Crawl | Tavily Crawl/Map/Extract |

**Câu chốt: Khởi tạo đúng embeddings và store thì ingestion sau chỉ việc gọi add documents.**

## 5. Câu hỏi ôn tập

**1. `chunk_size=50` để làm gì?**

<details><summary>Đáp án</summary>

Giới hạn 50 Documents mỗi request embed để tránh tokens-per-minute limit, quá lớn dễ 429, quá nhỏ thì chậm.

</details>

**2. `retry_min_seconds=10` để làm gì?**

<details><summary>Đáp án</summary>

Đợi ít nhất 10s sau failure do rate limit/payload rồi retry, trade-off giữa pass rate và tổng thời gian.

</details>

**3. Vì sao dùng certifi + SSL context?**

<details><summary>Đáp án</summary>

Để mọi request tới Tavily/OpenAI có valid certificate, tránh lỗi SSL khi bắn concurrent theo docs mới.

</details>

**4. Chroma và Pinecone khác gì trong code?**

<details><summary>Đáp án</summary>

Chroma persist local `chroma_db`, Pinecone cần index cloud khớp dimension; cùng nhận embeddings object nên code tương tự.

</details>

**5. Vì sao LangSmith vars cần thiết?**

<details><summary>Đáp án</summary>

Để trace pipeline ingestion với project `documentation-helper` và debug rate limit theo docs mới.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `056 - Tavily Crawling.md` — dùng Tavily Crawl max_depth, instructions, biến results thành Documents.
