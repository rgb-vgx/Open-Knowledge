---
title: 'Bài 054 — Tổng quan ingestion pipeline với Tavily'
course: 'langchain'
lesson: 54
status: edited-verified
source: '054 - Ingestion Pipeline Intro.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/crawl'
---

# Bài 054 — Tổng quan ingestion pipeline với Tavily

> Nguồn: `054 - Ingestion Pipeline Intro.md` — giữ mạch Eden: history 2022 làm tay cực khổ, 2025 có Tavily Crawl, bỏ FireCrawl vì kém maintain và scale.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nêu bước đầu RAG pipeline: ingest docs mới nhất vào vector store.
- Hiểu vì sao bỏ crawl tay và FireCrawl, chọn Tavily.
- Nắm 4 chặng sắp học: Tavily Map, Extract, chunk, index.
- Hiểu phân công: Tavily crawl/scrape, LangChain chunk/metadata/index.
- Biết Tavily free tier đủ cho khóa học.

## 2. Nội dung theo mạch transcript

### 2.1. Ingest docs mới nhất

Transcript mở:

- First part của RAG pipeline là ingest documentation.
- Lấy latest up to date documentation.
- Ingest và index vào vector store.
- Dùng Tavily để làm task tedious là downloading documentation.

```
Latest docs -> Tavily crawl -> LangChain docs -> chunk -> embed -> Pinecone
```

### 2.2. History: 2022 làm tay, 2025 có tool

Eden kể:

- Early 2022 làm process này manually, viết nhiều scripts.
- Cumbersome, broke, nhiều issues.
- Năm 2025 things changed, có tools như Tavily giúp chỉ vài API calls, double click là xong.
- Từng dùng FireCrawl để tracking capability.
- Nhưng FireCrawl package không well maintained với LangChain ecosystem, có scaling issues.
- Vì vậy migrate từ FireCrawl sang Tavily.

> Giữ nguyên nhận xét cá nhân về maintain/scale, không thêm đánh giá ngoài transcript.

### 2.3. Lộ trình vài videos tới

Transcript hứa:

1. Walkthrough API Tavily: hiểu Tavily Map, Tavily Extract để crawl.
2. Tích hợp vào chain RAG ingestion pipeline:
   - Map all URLs của LangChain docs.
   - Concurrently scrape những URLs đó.
   - Add metadata.
   - Index vào vector store.
3. Toàn process nhìn nhiều nhưng thực ra không nhiều code.
4. Heavy lifting do LangChain và Tavily làm:
   - Tavily: crawling và scraping documentation.
   - LangChain: chunk, update metadata, index seamlessly.

### 2.4. Giá Tavily

Transcript trấn an:

- Đừng worry pricing.
- Tavily cho free tier rất generous.
- More than enough cho course và task này.

> Không nêu số credits cụ thể vì transcript không nêu.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Ingestion RAG: gather docs, split, embed, store rồi mới retrieve | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Tavily Crawl map site + scrape, hỗ trợ max_depth, instructions, extract_depth | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 3 | LangChain chunk/metadata/index sau khi có Documents | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | FireCrawl kém maintain/scale nên đổi sang Tavily | chưa kiểm chứng được | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 5 | Free tier Tavily đủ cho course | chưa kiểm chứng được | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |

### Code cập nhật (LangChain 1.x)

Bài intro chưa có code chạy, minh họa đúng phân công:

```python
# Phan cong trong transcript
# tavily_docs = tavily_crawl("https://python.langchain.com")  # Tavily
# chunks = splitter.split_documents(tavily_docs)               # LangChain
# vector_store.add_documents(chunks)                           # LangChain
```

Giải thích:

- Tavily chỉ lo crawl/scrape ra LangChain Documents.
- LangChain lo chunk, metadata, index.
- Không đổi phân công khi lên 1.x.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Input | LangChain docs mới nhất |
| Crawl cũ | Scripts tay 2022, dễ break |
| Crawl trung gian | FireCrawl, kém maintain theo transcript |
| Crawl nay | Tavily Crawl vài calls |
| LangChain | Chunk, metadata, index |
| Pipeline | Map URLs, scrape concurrent, index |
| Cost | Free tier đủ học |

**Câu chốt: Để Tavily lo crawl khó nhằn, LangChain lo chunk và index — ingestion gọn vài calls.**

## 5. Câu hỏi ôn tập

**1. Ingestion pipeline gồm gì?**

<details><summary>Đáp án</summary>

Map URLs, scrape concurrent, tạo Documents kèm metadata, chunk, embed, index vào vector store theo docs RAG mới.

</details>

**2. Vì sao bỏ crawl tay?**

<details><summary>Đáp án</summary>

Vì viết scripts tay cumbersome, dễ break, nhiều issues trên nhiều máy.

</details>

**3. Vì sao chuyển từ FireCrawl sang Tavily theo transcript?**

<details><summary>Đáp án</summary>

Vì package FireCrawl kém maintain với LangChain và có scaling issues.

</details>

**4. Phân công Tavily và LangChain?**

<details><summary>Đáp án</summary>

Tavily crawl/scrape docs, LangChain chunk, update metadata và index seamlessly.

</details>

**5. Có lo giá Tavily không?**

<details><summary>Đáp án</summary>

Không, transcript nói free tier generous, đủ cho course.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `055 - Imports.md` — imports `RecursiveCharacterTextSplitter`, Chroma/Pinecone, `Document`, Tavily Crawl/Map/Extract, OpenAI embeddings rate limit.
