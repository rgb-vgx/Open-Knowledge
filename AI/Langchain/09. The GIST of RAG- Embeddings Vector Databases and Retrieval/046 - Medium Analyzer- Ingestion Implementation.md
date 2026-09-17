---
title: 'Bài 046 — Ingestion TextLoader TextSplitter Embeddings Pinecone'
course: 'langchain'
lesson: 46
status: edited-verified
source: '046 - Medium Analyzer- Ingestion Implementation.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/document-loaders/text-loader'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 046 — Ingestion: TextLoader, TextSplitter, Embeddings, Pinecone

> Nguồn: `046 - Medium Analyzer- Ingestion Implementation.md` — giữ mạch Ethan: video cũ dùng PyCharm/Pipfile, code đã patch, Medium blog TXT, debug objects.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Load file TXT thành `Document` bằng TextLoader.
- Xử lý lỗi unicode bằng `encoding="utf-8"` hoặc `autodetect_encoding`.
- Hiểu `page_content` và `metadata.source` để grounding.
- Chia chunks bằng CharacterTextSplitter 1000/0.
- Ingest bằng OpenAIEmbeddings + `PineconeVectorStore.from_documents`.

## 2. Nội dung theo mạch transcript

### 2.1. Lưu ý bản quay cũ

Transcript mở đầu:

- Video này quay từ phiên bản cũ, dùng PyCharm, có `Pipfile` và `pipfile.lock`.
- Tác giả đã rerecord gần hết khóa cho LangChain mới, riêng lesson này code ít đổi nên chỉ patch.
- Nếu khó chịu vì khác IDE, cứ comment, tác giả sẽ rerecord sau.
- Ưu tiên nội dung ảnh hưởng học tập.

> Giữ nguyên như transcript, không suy diễn thêm.

### 2.2. Load file Medium blog

File ingest là `medium-blog.txt`:

- Lên Google tìm `what is a vector db medium`.
- Mở blog Medium, copy toàn bộ text, paste thành TXT.
- Transcript hứa link trong video resources.

```python
# Tu duy trong transcript (duong dan tu sua theo may ban)
# from langchain_community.document_loaders import TextLoader
# loader = TextLoader("medium-blog.txt")
# documents = loader.load()
```

Giải thích:

- Muốn load toàn bộ file thành một Document nên dùng chunking strategy cơ bản, max characters khoảng một triệu.
- Gọi `loader.load()` là xong.
- Điểm đẹp của abstraction: đổi sang WhatsApp, Notion, Google Drive thì interface vẫn vậy.
- Chỉ cần tạo loader đúng third-party rồi gọi `.load()`.

Hệ sinh thái loaders:

- Docs LangChain mục document loaders có loaders cho file generic: CSV, HTML, JSON, PDF.
- Mục integrations thuộc `langchain-community`: cộng đồng đóng góp, có tons loaders.
- Ví dụ YouTube transcripts: tạo loader rồi `.load()`.
- Ví dụ Slack messages: Slack loader rồi `.load()`.

### 2.3. Lỗi encoding và cách fix

Transcript dặn tùy OS/encoder có thể gặp:

- `UnicodeError`, `codec can't decode bytes`.

Hai cách fix giữ nguyên transcript:

```python
# loader = TextLoader("medium-blog.txt", encoding="utf-8")
# hoac
# loader = TextLoader("medium-blog.txt", autodetect_encoding=True)
```

- Một trong hai flags thường fix được.
- Đa số không cần, như máy tác giả trong video.

### 2.4. Khám Document trong debug

Sau `loader.load()`:

- Trả về list chỉ có một `Document`.
- Mỗi `Document` có:
  - `page_content`: toàn bộ content đã load.
  - `metadata`: mặc định giữ `source` là file path.
- `source` dùng khi RAG để nói grounding lấy từ đâu.
- Có thể thêm bất kỳ key/value nào vào metadata để filter, segregate data sau này.
- Rất hữu ích khi deploy production và làm advanced RAG.

### 2.5. Split thành chunks

Tạo CharacterTextSplitter:

```python
# from langchain_text_splitters import CharacterTextSplitter
# splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
# chunks = splitter.split_documents(documents)
```

Transcript giải thích:

- Class này có thể rất phức tạp: regex, length function đếm tokens, nhiều customizations.
- Ở đây chỉ demo nguyên lý nên truyền 2 args.
- `chunk_size=1000` giới hạn 1000 characters.
- Vì sao 1000? Heuristic, rule of thumb:
  - Đủ nhỏ để fit context window, vì context sẽ chứa vài chunks retrieve được.
  - Đủ lớn để con người đọc vẫn hiểu, có semantic meaning.
  - Quá nhỏ thì vô nghĩa, không giúp LLM trả lời.
- `chunk_overlap=0` nghĩa là chunks không overlap.
  - Overlap hữu ích khi không muốn mất context giữa chunks.
  - Ví dụ đơn giản nên để 0.

Quy tắc garbage in, garbage out:

- Dù Gemini ingest được 1 triệu tokens, chunking vẫn quan trọng.
- Gửi LLM nhiều thông tin không liên quan thì:
  - Tốn tiền vì càng nhiều tokens càng đắt.
  - Kết quả tệ hơn, đã được chứng minh.
- Chỉ dùng relevant context, relevant chunks thì LLM trả lời tốt hơn.

Khám objects trong debug:

- TextSplitter có `chunk_size`, `chunk_overlap`, `separator`.
- `chunks` vẫn là list `Document`, nhưng `page_content` ngắn hơn, khoảng 1000 chars.
- Vẫn giữ `metadata.source`.
- Rule of thumb: đọc content chunk phải hiểu được, có semantic value.
- LangChain báo vài chunks vượt 1000 chars vì split theo separator, không phải exact science.
- Với context window 32K/100K/1M hiện nay thì chênh lệch này ít quan trọng như xưa.
- Kết quả ví dụ: 20 chunks.

### 2.6. Embed và lưu Pinecone

Khởi tạo embeddings:

```python
# import os
# from langchain_openai import OpenAIEmbeddings
# embeddings = OpenAIEmbeddings(api_key=os.environ["OPENAI_API_KEY"])
```

- Default OpenAI là ADA002, có thể đổi multimodal hay embeddings khác.
- Object này tạo OpenAI client, gọi API để embed documents.

Ingest:

```python
# from langchain_pinecone import PineconeVectorStore
# PineconeVectorStore.from_documents(
#     documents=chunks,
#     embedding=embeddings,
#     index_name=os.environ["PINECONE_INDEX_NAME"],
# )
```

- Không chỉ Pinecone, mọi LangChain vector store đều có `from_documents`.
- Nhận list documents, embeddings object, index name.
- LangChain iterate từng chunk, embed, store vào vector store.
- Tự viết được, logic không phức tạp: iterate, create embeddings, upsert.
- Nhưng dùng LangChain để:
  - Dễ switch embeddings model và vector store, một interface duy nhất.
  - Có threading, AsyncIO, concurrent, handle rate limits, boilerplate production.
- Transcript show source: iterate text, create embeddings, upsert, hỗ trợ batch + async, mọi vector store đều vậy.

Chạy và kiểm tra:

- Thêm `print` trước/sau ingest.
- Index Pinecone lúc đầu empty.
- Chạy `ingestion.py`, xong refresh UI thấy 20 vectors.
- Mỗi record có:
  - `text`: page_content của chunk.
  - `source`: path chunk, làm proof grounding.
  - `vector`: list số.

### 2.7. Tóm mạch RAG 2 phần

- Ingestion: load documents → split chunks → embed → store vector DB.
- Retrieval (video sau): embed user question → tìm relevant vectors/documents → augment prompt → gửi LLM lấy answer grounded.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `TextLoader(...).load()` trả `list[Document]`, đổi loader khác vẫn `.load()` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/document-loaders/text-loader |
| 2 | `Document` có `page_content` + `metadata.source`, thêm keys để filter | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Fix unicode bằng `encoding="utf-8"` hoặc `autodetect_encoding=True` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/document-loaders/text-loader |
| 4 | `CharacterTextSplitter(chunk_size=1000, chunk_overlap=0).split_documents(docs)` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Chunk nhỏ vừa context window, đủ lớn để có semantic meaning, garbage in garbage out | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | `OpenAIEmbeddings` default ADA002, `PineconeVectorStore.from_documents` embed + upsert, hỗ trợ batch/async | ĐỔI | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 7 | Tên file, số chunks 20, PyCharm/Pipfile, UI Pinecone lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

> Hộp cập nhật: transcript nói default ADA002. Docs mới nhất mặc định OpenAI embeddings là `text-embedding-3-small`/`large`, ADA002 cũ. GIỮ gốc + dùng model mới khi chạy.

```python
import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

loader = TextLoader("medium-blog.txt", encoding="utf-8")
documents = loader.load()

splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
chunks = splitter.split_documents(documents)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
PineconeVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    index_name=os.environ["PINECONE_INDEX_NAME"],
)
```

Giải thích:

- Giữ đúng 1000/0 như transcript, không cải tiến.
- Chỉ đổi model embeddings sang tên hiện tại để chạy được.
- `from_documents` vẫn là entry chuẩn theo docs Pinecone mới.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Loader | `TextLoader(path, encoding).load()` → 1 Document |
| Document | `page_content` + `metadata.source`, thêm keys để filter |
| Encoding | `utf-8` trước, không được thì `autodetect_encoding` |
| Splitter | `CharacterTextSplitter(1000, 0)`, đọc chunk phải hiểu được |
| Embeddings | OpenAI mới `text-embedding-3-small`, cũ ADA002 |
| Ingest | `from_documents(chunks, embedding, index_name)` |
| Pinecone record | `text` + `source` + `vector`, ví dụ 20 vectors |
| Nguyên tắc | Garbage in garbage out, chỉ gửi relevant chunks |

**Câu chốt: Ingestion là load thành Document, chia chunks có nghĩa, embed rồi upsert — LangChain lo phần nặng nhọc.**

## 5. Câu hỏi ôn tập

**1. Vì sao đổi loader mà code vẫn giống nhau?**

<details><summary>Đáp án</summary>

Vì mọi loader đều trả `list[Document]` qua `.load()`, chỉ khác constructor cho từng nguồn theo docs mới.

</details>

**2. Fix lỗi unicode thế nào?**

<details><summary>Đáp án</summary>

Thêm `encoding="utf-8"`, không được thì `autodetect_encoding=True`.

</details>

**3. Vì sao chọn chunk_size 1000?**

<details><summary>Đáp án</summary>

Heuristic: đủ nhỏ để nhét vài chunks vào context window, đủ lớn để con người đọc hiểu và có semantic meaning.

</details>

**4. `chunk_overlap=0` nghĩa là gì?**

<details><summary>Đáp án</summary>

Các chunks không overlap dữ liệu, giữ đơn giản; overlap hữu ích khi cần giữ context giữa chunks.

</details>

**5. Vì sao dùng `from_documents` thay vì tự viết vòng lặp?**

<details><summary>Đáp án</summary>

Một interface cho mọi store/model, dễ switch, có sẵn threading/async/batch và xử lý rate limit cho production.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `048 - Medium Analyzer- Naive Retrieval Implementation Implementation.md` — `as_retriever(k=3)`, `format_docs`, so sánh có/không RAG.
