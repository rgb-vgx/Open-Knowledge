---
title: 'Bài 043 — Động lực RAG và giải pháp chunk retrieval'
course: 'langchain'
lesson: 43
status: edited-verified
source: '043 - Introduction to RAG Implementation.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 043 — Động lực RAG và giải pháp chunk retrieval

> Nguồn: `043 - Introduction to RAG Implementation.md` — giữ mạch Eden: ví dụ Harry Potter, tài liệu tài chính private, 2 solutions.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nêu bài toán hỏi đáp trên tài liệu rất dài và private data.
- Phân tích vì sao nhồi cả sách vào prompt không scale.
- Nêu 4 vấn đề: hard limit, needle in the haystack, cost, latency.
- Hiểu solution 2: chunking + tìm relevant chunk.
- Định nghĩa Retrieval, Augmentation, Generation.

## 2. Nội dung theo mạch transcript

### 2.1. Bài toán: sách dài + private data

Transcript lấy ví dụ:

- Sách `Harry Potter and the Sorcerer's Stone`, hàng trăm trang.
- Muốn hỏi: cách pha một loại potion, đáp án nằm ở một đoạn cụ thể.
- Mở rộng: tài liệu tài chính rất dài, cần tìm một clause cụ thể.
- Điểm khó thêm: private data.
  - LLM không được train trên private data nên không biết.
  - Phải tìm cách cho LLM hỏi đáp hiệu quả trên document này.

> Nguyên văn ý: models are not trained on private data, so they are not aware of it.

### 2.2. Solution 1 ngây thơ: nhồi cả sách

Cách làm:

- Lấy toàn bộ PDF sách.
- Nhét hết vào prompt gửi LLM.
- Chừa placeholder cho user question + placeholder cho toàn bộ sách.

```
prompt = f"{user_question}\n\n{ENTIRE_HARRY_POTTER_BOOK}"
```

Transcript nói: đôi khi chạy được, nhưng không scale.

Bốn vấn đề:

| # | Vấn đề | Diễn giải transcript |
|---|--------|----------------------|
| 1 | Hard limit | Có giới hạn cứng lượng text nhét vào LLM, sách dài sẽ vượt token limits |
| 2 | Needle in the haystack | Prompt càng dài, LLM càng kém hiệu quả, đã chứng minh bằng research |
| 3 | Cost | Prompt lớn tốn nhiều tiền hơn |
| 4 | Latency | Prompt lớn xử lý lâu hơn |

Transcript nhấn mạnh dù LLM 1-2 triệu tokens hiện nay phổ biến, solution này vẫn không lý tưởng.

### 2.3. Solution 2: chunk + relevant chunk

Thêm bước pre-processing:

1. Lấy document gốc dài bao nhiêu cũng được.
2. Split thành smaller chunks.
3. Chunking có thể naive hoặc complex, sẽ bàn trong khóa học.

Luồng query:

```
User query -> tim most relevant chunk -> chi gui chunk do + query vao LLM
```

- Không gửi cả sách, chỉ gửi 1 đoạn hoặc vài paragraphs liên quan nhất.
- LLM được grounding, chỉ cần trả lời dựa trên mẩu liên quan.
- Giải quyết cả 4 vấn đề:
  - Không vượt hard token limit vì context nhỏ.
  - Không gặp needle in the haystack vì chỉ gửi pieces cụ thể.
  - Rẻ hơn vì ít tokens.
  - Nhanh hơn vì xử lý ít tokens.
- Scale được tới tài liệu rất lớn, nhiều documents.

### 2.4. Drawbacks của solution 2

Transcript thành thật nêu nhược điểm:

- Phải chunk documents lớn:
  - Chunk bằng tokens nào?
  - Làm sao mỗi chunk chứa đủ relevant data?
  - Code repo khác document thường, cần chiến lược khác.
  - Nếu content động từ user, không biết trước nội dung thì sao?
- Cần searching mechanism để tìm relevant chunks:
  - Nếu chunks tìm được chưa đủ relevant thì sao?
  - Có cần thêm context để LLM trả lời?

> Transcript hứa: section này sẽ trả lời hết các challenges đó.

### 2.5. Chốt định nghĩa RAG

Solution 2 chính là RAG — Retrieval Augmented Generation.

- Retrieval: retrieve relevant chunks.
- Augmentation: lấy prompt, augment với relevant chunks.
- Generation: gửi tới LLM để query.

> Transcript: what we saw was very high level overview of RAG, tiếp theo học implementation.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | RAG = Retrieval relevant chunks + Augment prompt + Generate, scale cho multi-documents | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Nhồi cả document vào prompt gặp hard token limit, kém hiệu quả khi dài | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Needle in the haystack: prompt dài làm LLM kém hiệu quả dù context lớn | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Cost và latency tăng theo số tokens gửi vào LLM | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Chunking có nhiều chiến lược, khác nhau giữa doc thường và code repo | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Ví dụ Harry Potter, potion, số token 1-2M cụ thể thời điểm quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

Transcript bài này không có code, chỉ sơ đồ ý tưởng. Minh họa đúng ý tưởng, không thêm logic:

```python
# Y tuong solution 2 trong transcript
# chunks = split_document(long_book)  # pre-processing
# relevant = find_most_relevant_chunk(user_query, chunks)
# answer = llm.invoke(f"Question: {user_query}\nContext: {relevant}")
```

Giải thích:

- `split_document` là bước chunking transcript nói.
- `find_most_relevant_chunk` là bước retrieval sẽ học sau.
- Prompt cuối gồm query + context, đúng định nghĩa Augmentation.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Bài toán | Hỏi đáp trên sách dài, tài liệu private LLM chưa biết |
| Solution 1 | Nhồi cả sách vào prompt, đơn giản nhưng không scale |
| Hard limit | Vượt token limit khi document quá dài |
| Needle in haystack | Context dài làm giảm chất lượng trả lời |
| Cost/latency | Tokens nhiều thì đắt và chậm |
| Solution 2 = RAG | Chunk docs, retrieve relevant, augment, generate |
| Trade-off | Thêm pre-processing chunking và search mechanism |

**Câu chốt: Thay vì gửi cả cuốn sách, RAG chỉ gửi đúng đoạn liên quan nhất để LLM trả lời rẻ, nhanh và chính xác hơn.**

## 5. Câu hỏi ôn tập

**1. Vì sao private document là động lực cho RAG?**

<details><summary>Đáp án</summary>

Vì LLM không được train trên private data nên không biết, phải retrieve context ngoài rồi augment vào prompt theo docs RAG mới.

</details>

**2. Kể 4 vấn đề của cách nhồi cả sách vào prompt?**

<details><summary>Đáp án</summary>

Hard token limit, needle in the haystack giảm hiệu quả, tốn cost, tăng latency.

</details>

**3. Solution 2 gồm mấy bước?**

<details><summary>Đáp án</summary>

Chunk document gốc thành smaller chunks, tìm most relevant chunk cho query, chỉ gửi chunk đó + query vào LLM.

</details>

**4. Chunking có gì sâu?**

<details><summary>Đáp án</summary>

Phải chọn tokens để split, đảm bảo mỗi chunk đủ relevant data, khác chiến lược cho code repo và content động.

</details>

**5. Giải thích Retrieval, Augmentation, Generation?**

<details><summary>Đáp án</summary>

Retrieval lấy relevant chunks, Augmentation ghép vào prompt, Generation gọi LLM sinh câu trả lời grounded.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `044 - Medium Analyzer- Boilerplate Project Setup.md` — clone repo, branch `project/rag-gist`, `uv lock`, `uv sync`, tạo Pinecone index.
