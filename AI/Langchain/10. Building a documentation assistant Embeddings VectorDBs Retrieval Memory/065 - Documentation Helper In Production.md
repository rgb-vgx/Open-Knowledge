---
title: 'Bài 065 — Documentation helper ở production với Agentic RAG'
course: 'langchain'
lesson: 65
status: edited-verified
source: '065 - Documentation Helper In Production.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 065 — Documentation helper ở production với Agentic RAG

> Nguồn: `065 - Documentation Helper In Production.md` — giữ mạch Eden: từ prototype docs helper tới Chat LangChain open-source, Agentic RAG đa subqueries.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- So sánh prototype docs helper trong khóa với Chat LangChain production.
- Hiểu Agentic RAG: sinh subqueries, retrieve từng cái, lọc/rerank, augment rồi answer.
- Hiểu coreference resolution qua ví dụ `who created it`.
- Biết repo open-source dùng LangChain, LangGraph, Next.js.
- Biết prompts router và generate queries trên LangSmith Hub.

## 2. Nội dung theo mạch transcript

### 2.1. Từ prototype tới production

Transcript mở:

- Muốn nói RAG applications in production.
- Lấy ví dụ Documentation Helper trong khóa: ingest LangChain docs, tạo RAG system trên đó.
- Show project Chat LangChain, đưa prototype lên next level.
- Vì implement paradigm Agentic RAG bằng LangChain, LangGraph.
- Có elaborate system curating query và generating optimized output rất usable.
- Thích UI/UX app này, good example.
- Cool vì open source, show code, deploy được cho use case của ta.

```
Prototype khoa hoc: 1 query -> retrieve -> answer
Chat LangChain: 1 query -> N subqueries -> retrieve N lan -> loc -> answer + sources
```

### 2.2. Demo chat.langchain.com

App LangChain build, giống docs helper: chat với LangChain documentation nhưng advanced architecture.

Demo hỏi `what is LangChain?`:

1. System generate bunch questions liên quan query gốc.
   - Ví dụ: review documentation, gather comprehensive definition.
2. Mỗi subquery retrieve docs về query đó bằng semantic search.
3. Làm tương tự cho 2 queries nữa.
4. Heuristic này retrieve better documents, more relevant.
5. Gộp selected context, probably filtered/rerank by relevance.
6. Augment query rồi produce answer.
7. Output kèm sources.
8. Bất cứ lúc nào cũng xem relevant context, retrieved documents, hiểu system làm gì, no magic.
9. Tạo trust giữa user và system, rất important cho Generative AI app.
10. Field này gọi là Generative UI: art tạo UX mượt cho generative applications, sẽ nói ở production section.

Test coreference resolution:

- Hỏi tiếp `who created it`.
- System ra subqueries hiểu `it` là LangChain.
- App còn ability search online nhưng query này không search online.
- Answer: LangChain created by Harrison Chase, kèm documentation link.
- Coreference resolution working.

### 2.3. Repo open-source và stack

Search Google `chat LangChain GitHub` ra repo:

- Stack LangChain, LangGraph và Next.js cho frontend.
- Check code được.

Vào backend, thư mục retrieval graph:

- `prompts.py` chứa prompts comprising application.
- Là multi-agent system.
- Prompts download từ LangSmith Hub như đã làm trước.
- Có router prompt, transcript nói đã explain router concept trong khóa.
- Có generate queries prompt, từ query gốc sinh sub queries để search.
- Còn bunch prompts nữa, recommend check vì good examples proper prompt engineering.

### 2.4. Graph logic

Mở retrieval graph `graph.py`:

- Actual usage của những prompts trên.
- Ví dụ multi-agent system implement bằng LangGraph.
- Transcript dặn đừng worry chưa biết LangGraph hay multi-agent systems vì khóa có cover introduction, essentials.
- Đi sâu essentials ở LangGraph course build trên khóa này.
- Điểm muốn show: advanced logic optimize results.
- Đây là cách LangChain team đưa idea implementation helper lên production-ready, high quality results.

> Không đi sâu code graph, chỉ giữ ý transcript: prompts + multi-agent + LangGraph.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Agentic RAG sinh subqueries, retrieve từng cái, rerank, augment rồi answer kèm sources | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Multi-agent retrieval bằng LangGraph, prompts trên Hub như router, generate queries | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 3 | Generative UI hiện relevant context tạo trust, coreference qua subqueries | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Chat LangChain open-source LangChain + LangGraph + Next.js | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 5 | Câu hỏi/answer demo, tên file prompts/graph lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

Bài này không có code chạy, minh họa đúng heuristic transcript:

```python
# Heuristic Agentic RAG trong transcript
# subqueries = generate_queries(user_query)  # router + generate prompts
# all_docs = []
# for q in subqueries:
#     all_docs += retriever.invoke(q)
# answer = llm.invoke(f"Question: {user_query}\nContext: {rerank(all_docs)}")
```

Giải thích:

- Không thay prototype 1 query 1 retrieve, chỉ thêm bước sinh subqueries.
- Mỗi subquery semantic search riêng rồi gộp/rerank.
- Prompts lấy từ Hub như transcript nêu.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Prototype | 1 query retrieve answer |
| Production | N subqueries retrieve lọc answer |
| Sinh | Router + generate queries prompts |
| Retrieve | Semantic search từng subquery |
| Lọc | Filter/rerank relevance |
| UI | Relevant context + sources, Generative UI |
| Coref | `it` hiểu là LangChain qua subqueries |
| Stack | LangChain + LangGraph + Next.js |

**Câu chốt: Production RAG thắng nhờ sinh nhiều subqueries tốt rồi mới retrieve thay vì retrieve một lần.**

## 5. Câu hỏi ôn tập

**1. Agentic RAG ở Chat LangChain làm gì?**

<details><summary>Đáp án</summary>

Sinh subqueries từ query gốc, retrieve từng cái, gộp lọc rồi augment answer kèm sources theo docs RAG mới.

</details>

**2. Vì sao subqueries tốt hơn?**

<details><summary>Đáp án</summary>

Vì heuristic retrieve được documents relevant hơn cho từng góc hỏi thay vì một query chung.

</details>

**3. Coreference resolution demo thế nào?**

<details><summary>Đáp án</summary>

Hỏi `who created it` sau `what is LangChain`, subqueries hiểu `it` là LangChain rồi trả Harrison Chase.

</details>

**4. Prompts quan trọng nào trong repo?**

<details><summary>Đáp án</summary>

Router prompt và generate queries prompt trên Hub, ví dụ tốt về prompt engineering.

</details>

**5. Generative UI là gì?**

<details><summary>Đáp án</summary>

Art tạo UI/UX mượt cho generative app, hiện relevant context và sources để tạo trust.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `066 - RAG Architecture.md` — so sánh two-step RAG, RAG agent và hybrid RAG.
