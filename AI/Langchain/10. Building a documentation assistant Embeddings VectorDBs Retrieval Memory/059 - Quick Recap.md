---
title: 'Bài 059 — Recap pipeline và quy tắc chọn chunk size'
course: 'langchain'
lesson: 59
status: edited-verified
source: '059 - Quick Recap.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/crawl'
---

# Bài 059 — Recap pipeline và quy tắc chọn chunk size

> Nguồn: `059 - Quick Recap.md` — giữ mạch Eden: pause reiterate, hard part là đưa data vào system, quy tắc tính chunk size theo tokens.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nhắc lại đã load LangChain docs thành Documents bằng Tavily Map/Extract.
- Nêu việc còn lại: chunkify, embed thành vector, store vào vector store.
- Hiểu cách LLM tính tokens input + output.
- Tính chunk size theo ví dụ 2000 tokens / 4 contexts.
- Nhớ quy tắc chunk quá nhỏ mất semantic meaning.

## 2. Nội dung theo mạch transcript

### 2.1. Pause đúng lúc

Transcript mở:

- Excellent time to pause và reiterate đã làm gì và còn gì trong RAG ingestion pipeline.
- Luckily đã xong hard part.
- Rất typical cho production-grade RAG: nhiều thời gian chỉ để đưa data vào system.

```
Source (LangChain docs)
 -> Tavily Map + Extract (concurrent, external APIs)
 -> list[Document]
 -> [sap hoc] chunk -> embed -> store
```

- Entire process dùng external APIs, Tavily Map, Tavily Extract.
- Chạy concurrent, nhiều depth và thứ để optimize.

### 2.2. Việc còn lại

Transcript liệt kê:

1. Chuẩn bị để index vào vector store.
2. Chunkify: transform documents gốc, split thành smaller chunks, sắp bàn vì sao cần chunks nhỏ.
3. Lấy smaller chunks, turn mỗi chunk thành vector.
4. Lấy embedding vectors store vào vector store.
5. Xong là RAG ingestion pipeline complete.

> Giữ nguyên thứ tự, không thêm bước.

### 2.3. Quy tắc tokens của LLM

Transcript clarify:

- Token count của LLM tính bằng số tokens LLM nhận ở prompt input cộng số tokens LLM trả ở result.
- Cộng hai lại ra total tokens cho API call đó.
- Phải biết limitation LLM nhận được bao nhiêu.
- Ví dụ lúc làm project dùng GPT-3.5 Turbo, token limit 4K tokens, tương lai sẽ grow.

### 2.4. Ví dụ tính chunk size

Query gửi LLM không chỉ là `what is a LangChain chain`:

- Model không train trên data này, không biết LangChain là gì.
- Phải lấy data ngoài từ vector database.
- Prompt sẽ gồm query cộng additional context là vài chunks text.
- Phải đếm tokens của parts text đó.

Transcript làm đơn giản:

- Giả sử reserve đúng cho context khoảng 2000 tokens.
- Nếu gửi 4 contexts thì 2000 / 4 = 500 tokens mỗi context.
- Đó là chunk size muốn aspire tới.
- Thay đổi tùy case: cần answer ngắn concise thì còn nhiều tokens cho context và query.
- Đây là rule of thumb tính chunk size.

### 2.5. Đừng chunk quá nhỏ

Last rule of thumb giữ nguyên:

- Never reduce chunk size rất rất nhỏ.
- Vì quá nhỏ thì no semantic meanings.
- Phải có semantic meanings mới perform similarity search trong vector database được.

```
Muon chunk size?
 -> Tong tokens LLM - output - query = budget cho context
 -> Budget / so chunks muon gui = chunk size
 -> Nhung dung nho hon nguong co nghia
```

- Xong là đi chunkify Documents và index vào vector store.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Ingestion: load source thành Documents rồi split, embed, store | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Tokens tính input + output, phải biết limit model | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Budget context chia cho số chunks ra chunk size, quá nhỏ mất semantic | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Production RAG tốn nhiều công đưa data vào system, concurrent Map/Extract | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 5 | Ví dụ GPT-3.5 Turbo 4K, reserve 2000, 4 contexts 500 tokens lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

Bài recap không có code, minh họa đúng công thức transcript:

```python
# Cong thuc trong transcript
# total_limit = 4000  # vi du GPT-3.5 Turbo luc quay
# reserved_context = 2000
# num_chunks = 4
# chunk_size_tokens = reserved_context // num_chunks  # ~500
```

Giải thích:

- Chỉ là heuristic, không phải constant production.
- Đổi model limit lớn hơn thì budget đổi, nhưng cách chia vẫn vậy.
- Chunk vẫn phải đủ lớn để similarity search có nghĩa.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Xong | Load docs thành Documents via Tavily |
| Còn lại | Split chunks, embed, store |
| Tokens | input + output = total call |
| Budget | Reserve context, chia cho số chunks |
| Ví dụ | 2000 / 4 = 500 tokens mỗi chunk |
| Ngưỡng dưới | Quá nhỏ mất semantic, search kém |
| Production | Đưa data vào thường là hard part |

**Câu chốt: Tính chunk size từ budget tokens rồi chia đều, nhưng đừng chia nhỏ tới mức mất nghĩa.**

## 5. Câu hỏi ôn tập

**1. Đã xong gì và còn gì trong pipeline?**

<details><summary>Đáp án</summary>

Đã load LangChain docs thành Documents, còn chunkify, embed thành vector và store vào vector store theo docs RAG mới.

</details>

**2. Total tokens một call tính thế nào?**

<details><summary>Đáp án</summary>

Bằng tokens prompt input cộng tokens result output, phải biết limit model.

</details>

**3. Ví dụ 2000/4 ra gì?**

<details><summary>Đáp án</summary>

Reserve 2000 tokens cho context, gửi 4 contexts thì mỗi chunk khoảng 500 tokens.

</details>

**4. Vì sao không chunk quá nhỏ?**

<details><summary>Đáp án</summary>

Vì mất semantic meanings, không perform similarity search hiệu quả.

</details>

**5. Vì sao đưa data vào là hard part?**

<details><summary>Đáp án</summary>

Vì dùng external APIs concurrent, nhiều depth optimize, rất typical production RAG.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `060 - Chunking Text Splitting.md` — `RecursiveCharacterTextSplitter` 4000/200 và vì sao RAG không chết.
