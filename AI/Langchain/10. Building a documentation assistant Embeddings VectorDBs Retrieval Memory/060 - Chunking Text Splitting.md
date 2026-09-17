---
title: 'Bài 060 — Chunking với RecursiveCharacterTextSplitter'
course: 'langchain'
lesson: 60
status: edited-verified
source: '060 - Chunking Text Splitting.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/crawl'
---

# Bài 060 — Chunking với RecursiveCharacterTextSplitter

> Nguồn: `060 - Chunking Text Splitting.md` — giữ mạch Eden: snippet chunking, 4000/200, chunk đệ quy theo paragraphs, RAG không chết vì context lớn.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nêu bước chunking docs thành chunks nhỏ để làm context cho LLM.
- Dùng `RecursiveCharacterTextSplitter` 4000/200 và `split_documents`.
- Hiểu chunk đệ quy: paragraphs rồi newline để giữ ngữ nghĩa.
- Biết chunking không có silver bullet: small-to-big, semantic chunking.
- Giải thích vì sao context 1-2M tokens không giết RAG.

## 2. Nội dung theo mạch transcript

### 2.1. Vị trí trong pipeline

Transcript mở:

- Couple videos tới sẽ chunking docs thành smaller chunks.
- Để provide làm context cho LLMs.
- Rồi embed thành vectors và index vào vector store.

```
all_docs (Tavily) -> split -> chunks -> embed -> Pinecone
```

- Bắt đầu bằng logging mọi thứ.
- Entire chunking process dùng recursive character text filter từ LangChain.
- Truyền chunk size 4000, chunk overlap 200.
- Nó sẽ recursively chunk up documents.

### 2.2. Code chunking

```python
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# splitter = RecursiveCharacterTextSplitter(
#     chunk_size=4000,
#     chunk_overlap=200,
# )
# splits = splitter.split_documents(all_docs)
```

Giải thích:

- Transcript có video riêng elaborate splitter này hoạt động thế nào và vì sao hiệu quả.
- Overall idea: semantically chunk up documents.
- Đầu tiên chunk theo paragraphs, rồi theo newline.
- Giới hạn chunk sizes 4000 và overlap 200, đơn vị characters.
- Có object splitter rồi gọi built-in `split_documents` với LangChain documents.
- Xong nhận lại larger list documents nhưng đã chunked up, rồi log everything.
- Entire step rất simple, LangChain làm heavy lifting.

### 2.3. Không có silver bullet

Transcript dặn hai điều:

1. Đây không phải silver bullet chunking method.
   - Có many chunking methods, deep topic.
   - Muốn explore có small-to-big, semantic chunking và nhiều cool optimizations ở phase này.
2. LLMs nay có larger token limits:
   - 2025 lên 1 triệu tokens như Anthropic.
   - Gemini 2.5 với 2 triệu input tokens.
   - Chunking ở đây important nhưng không phải thứ nên focused on.

> Giữ nguyên con số 1M/2M như transcript lúc quay.

### 2.4. RAG is dead? Không, RAG evolving

Transcript tranh luận nhiều người nói RAG dead vì larger context windows:

- Quan điểm: RAG is not dead, it's evolving.
- Even with huge context windows, vẫn important, long context models complementary, support RAG bằng richer prompt sequences.
- TLDR: larger context windows don't kill RAG, amplify và magnify strengths.

Ba lý do:

| Lý do | Diễn giải transcript |
|-------|----------------------|
| Cost efficiency | Feed triệu tokens vào LLM chậm và đắt hơn retrieve relevant snippet với RAG |
| Precision, noise reduction | RAG filter chỉ most relevant chunks, giảm hallucinations và positional biases của long context, retrieval với intelligent reordering cải thiện answer quality mà ít tokens hơn, đã proven |
| User-facing features | Thấy source của pieces trong answer, trace back origins, tạo trust, critical ở regulated environments |

```
Long context + RAG = richer prompts + fewer tokens + cited answers
```

- Xong là lấy chunks, turn thành vectors, index vào vector store.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `RecursiveCharacterTextSplitter(4000, 200).split_documents(docs)` chunk đệ quy | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Chunk theo paragraphs/newline giữ ngữ nghĩa, log pipeline | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Nhiều chiến lược small-to-big, semantic chunking để optimize | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | RAG rẻ/nhanh/chính xác hơn feed full context, giảm hallucination, cite sources | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Con số 4000/200 chars, 1M Anthropic, 2M Gemini 2.5 lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Tavily docs thành Documents trước khi split | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |

### Code cập nhật (LangChain 1.x)

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=4000,
    chunk_overlap=200,
)
splits = splitter.split_documents(all_docs)
print(f"docs: {len(all_docs)} -> splits: {len(splits)}")
```

Giải thích:

- Giữ đúng 4000/200 characters như transcript, không cải tiến.
- `all_docs` là Documents từ Tavily Map/Extract bài trước.
- Output larger list nhưng mỗi chunk nhỏ, sẵn sàng embed.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Input | `all_docs` từ Tavily Crawl/Map/Extract |
| Splitter | `RecursiveCharacterTextSplitter` đệ quy |
| Params | 4000 chars, overlap 200 chars |
| Cách chia | Paragraphs trước, newline sau |
| Output | Larger list Documents đã chunked |
| Optimize | Small-to-big, semantic chunking |
| Long context | 1-2M tokens bổ trợ, không thay RAG |
| Lợi RAG | Rẻ, ít noise, cite sources, trust |

**Câu chốt: Chia 4000/200 để mỗi chunk vừa đủ nghĩa, RAG càng mạnh hơn khi context window lớn.**

## 5. Câu hỏi ôn tập

**1. Splitter trong bài nhận gì trả gì?**

<details><summary>Đáp án</summary>

Nhận LangChain documents gốc, gọi `split_documents` trả larger list documents đã chunked theo docs mới.

</details>

**2. Đệ quy ở đây nghĩa là gì?**

<details><summary>Đáp án</summary>

Thử chia theo paragraphs trước rồi newline để giữ ngữ nghĩa, giới hạn 4000 overlap 200.

</details>

**3. Vì sao không gọi là silver bullet?**

<details><summary>Đáp án</summary>

Vì còn small-to-big, semantic chunking và nhiều optimizations khác tùy use case.

</details>

**4. Vì sao context lớn không giết RAG?**

<details><summary>Đáp án</summary>

Vì feed full context đắt/chậm/noise, RAG filter relevant chunks cho rẻ, chính xác và cite được.

</details>

**5. Lợi user-facing của RAG là gì?**

<details><summary>Đáp án</summary>

Trace answer về sources gốc, tạo trust, critical ở regulated environments.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `061 - Batch Indexing.md` — `index_documents_async`, batch 500, demo rate limit 429 và Chroma local.
