---
title: 'Bài 061 — Batch indexing async và xử lý rate limit'
course: 'langchain'
lesson: 61
status: edited-verified
source: '061 - Batch Indexing.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 061 — Batch indexing async và xử lý rate limit

> Nguồn: `061 - Batch Indexing.md` — giữ mạch Eden: `index_documents_async`, batch 500, demo bỏ retry thì 429, Chroma local.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Viết coroutine `index_documents_async(docs, batch_size)` chia batches.
- Viết `add_batch` gọi `vector_store.aadd_documents` kèm logging.
- Chạy concurrent bằng `asyncio.gather` và đếm success.
- Hiểu batch 500 trade-off giữa embeddings limit và vector store limit.
- Demo lỗi 429 khi bỏ `retry_min_seconds` và thử Chroma local.

## 2. Nội dung theo mạch transcript

### 2.1. Hàm index async

```python
# async def index_documents_async(documents, batch_size=500):
#     log_header("vector storage phase")
#     batches = [documents[i:i+batch_size] for i in range(0, len(documents), batch_size)]
```

- Input list LangChain Documents + batch size int.
- Lấy all documents, batch index vào vector store.
- Log là vector storage phase và số documents sẽ index.
- Tạo `batches` là list chứa lists documents bằng slicing.
- Log số batches có.

### 2.2. Coroutine add_batch

```python
# async def add_batch(batch, batch_no):
#     await vector_store.aadd_documents(batch)
#     return True
```

- Nhận batch là list documents + batch number để logging.
- Batch number để khi batch nào fail biết đúng batch và issue, có thể do non-valid documents.
- Lấy vector store, transcript dùng Pinecone, gọi `aadd_documents` với batch.
- LangChain sẽ dùng embeddings model transform mỗi document thành vector rồi index.
- Không exception thì log success, exception thì log và return False, success return True.

### 2.3. Gather concurrent

```python
# tasks = [add_batch(b, n) for n, b in enumerate(batches)]
# results = await asyncio.gather(*tasks)
# successful = sum(1 for r in results if r is True)
```

- Enumerate batches để có number mỗi batch.
- Mỗi batch tạo một coroutine, tasks giữ list coroutines cần index.
- `await asyncio.gather` fire tất cả concurrent, chạy độc lập, optimize runtime.
- Results là list booleans, hy vọng toàn True.
- Đếm successful batches, bằng tổng batches thì log success, không thì log warning.

Gọi từ main:

```python
# await index_documents_async(splits, batch_size=500)
```

- Batch size 500 không phải magic number, phải tìm sweet spot.
- Đủ lớn nhưng không quá lớn để khỏi rate limited.
- Rate limited từ embeddings model: tokens per minute/second.
- Vector store cloud cũng có limit per minute/second nhưng thường không chạm, main limitation là embeddings model.
- Thêm logs cuối pipeline: scrape bao nhiêu docs, bao nhiêu URLs, index bao nhiêu chunks.

### 2.4. Chạy live và xem Pinecone

- Mở Pinecone xem live documents indexed.
- Lúc đầu vector store trống.
- Dùng code optional video manual Map/Extract nên lấy full documentation.
- Flow: map, extract, chunking, rồi splits thành batches, mỗi batch một call.
- Index xong batch 1, refresh vài giây mới thấy vectors vì sync.
- Mỗi record có content, source, vector ID, original text.
- Phải lưu original text vì embeddings là one-way function, không có invert từ vector về text. Transcript geek out nhớ math university.
- Khi retrieval, vector store trả text về chứ không chỉ vector.
- Demo index 6506 documents, số Pinecone phải match, lệch là do batches failed hoặc chưa sync xong.

### 2.5. Demo bỏ retry thì 429

- Nhắc `retry_min_seconds`, transcript xóa args khỏi embeddings object để show.
- Chạy lại, tới lúc index/embed thì fail.
- Vì default retry thấp hơn, concurrent batch requests nhiều nên rate limited.
- Lỗi 429 từ `text-embedding-3-small`, mỗi error code cho biết phải đợi bao lâu.
- Mang retry về thì pass.

### 2.6. Thử Chroma local

- Đổi biến Pinecone sang Chroma `vector_store`, mọi thứ chạy same.
- Chạy là tạo thư mục `chroma_db` bên trái, dùng SQLite DB.
- Vẫn rate limited nếu chưa đợi đủ thời gian giữa runs.
- Index vào Chroma thay Pinecone, persistent vì lưu thư mục.
- Transcript note đang dùng index Pinecone khác `langchain-docs-2025`, các videos sau dùng index khác, heads up.
- Next step là retrieval.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Chia Documents thành batches, `aadd_documents` embed rồi index, gather concurrent | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Pinecone init index + embedding, `add_documents`/`delete`, query `as_retriever` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 3 | Batch 500 trade-off embeddings tokens limit, vector store limit ít chạm | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Bỏ retry thì 429 từ text-embedding-3-small, embeddings one-way phải lưu text | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Chroma local persist `chroma_db` SQLite, code tương tự Pinecone | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 6 | Con số 6506 docs, tên index 2025, UI lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

```python
import asyncio

async def add_batch(vector_store, batch, batch_no):
    try:
        await vector_store.aadd_documents(batch)
        return True
    except Exception:
        return False

async def index_documents_async(vector_store, documents, batch_size=500):
    batches = [documents[i:i+batch_size] for i in range(0, len(documents), batch_size)]
    tasks = [add_batch(vector_store, b, n) for n, b in enumerate(batches)]
    results = await asyncio.gather(*tasks)
    return sum(1 for r in results if r is True)
```

Giải thích:

- Giữ đúng batch 500 và gather như transcript.
- `aadd_documents` là API async hiện tại theo docs mới.
- Trả số batches success để log warning nếu thiếu.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Chia | Slicing documents thành batches 500 |
| Add | `aadd_documents(batch)` embed + index |
| Concurrent | `asyncio.gather` tasks theo batch_no |
| Check | Đếm True, thiếu thì warning |
| Limit | Embeddings tokens là chính |
| Retry | Bỏ retry dễ 429, mang về thì pass |
| Local | Chroma `chroma_db` SQLite persistent |
| Lưu ý | Lưu text vì embeddings one-way |

**Câu chốt: Batch 500 cộng gather async thì 6500 chunks index xong trong vài phút thay vì vài giờ.**

## 5. Câu hỏi ôn tập

**1. `index_documents_async` làm gì?**

<details><summary>Đáp án</summary>

Chia Documents thành batches rồi gather `aadd_documents` concurrent, đếm success theo docs mới.

</details>

**2. Vì sao cần batch_no?**

<details><summary>Đáp án</summary>

Để logging observability, khi batch fail biết đúng batch và issue như non-valid docs.

</details>

**3. Vì sao batch 500 không phải magic?**

<details><summary>Đáp án</summary>

Vì phải khớp embeddings tokens limit và vector store limit, quá lớn dễ 429, quá nhỏ thì chậm.

</details>

**4. Vì sao phải lưu original text?**

<details><summary>Đáp án</summary>

Vì embeddings là one-way function không invert được, retrieval cần trả text chứ không chỉ vector.

</details>

**5. Chroma khác Pinecone ở điểm nào trong bài?**

<details><summary>Đáp án</summary>

Chroma persist local `chroma_db` SQLite, Pinecone cloud index; cùng nhận embeddings nên code tương tự.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `062 - Retrieval Agent Implementation.md` — `retrieve_context` tool `content_and_artifact`, `create_agent`, `init_chat_model`.
