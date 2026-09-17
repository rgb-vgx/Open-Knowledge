---
title: 'Bài 066 — Kiến trúc RAG Two Step Agent và Hybrid'
course: 'langchain'
lesson: 66
status: edited-verified
source: '066 - RAG Architecture.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 066 — Kiến trúc RAG: Two-Step, Agent và Hybrid

> Nguồn: `066 - RAG Architecture.md` — giữ mạch Eden: 2 cách đã thấy trong khóa, hybrid sẽ làm bằng LangGraph, production nên hybrid.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- So sánh two-step RAG bằng LCEL và RAG agent bằng ReAct + retrieval tool.
- Hiểu trade-off control, flexibility và latency.
- Nêu hybrid RAG: query preprocessing, validation, post-generation checks.
- Biết use case QA docs thì agent thường overkill.
- Nhớ khuyến nghị production của transcript: hybrid.

## 2. Nội dung theo mạch transcript

### 2.1. Two-step RAG đã học

Cách 1 trong khóa, làm bằng LangChain Expression Language:

- Retrieval luôn happens before generation, simple và predictable.
- Rất nhiều control về khi nào retrieval xảy ra.
- Không flexible vì luôn retrieve documents.
- Rất fast vì không có LLM quyết định có cần retrieval không.

```
query -> retrieve -> augment -> LLM (1 call)
```

### 2.2. RAG agent đã làm

Cách 2, LangChain gọi agentic RAG, transcript gọi RAG agent:

- Lấy ReAct agent, cho nó một retrieval tool.
- LLM decide when và how to retrieve trong reasoning process.
- Ít control vì không control khi nào retrieval xảy ra.
- Flexible vì LLM quyết định.
- Latency chậm hơn two-step vì có thêm LLM call trước khi retrieve.
- Nếu nhiều LLM calls rồi mới retrieval thì thời gian vary.

```
query -> LLM reason -> [tool retrieve?] -> LLM answer (1-N calls)
```

### 2.3. Hybrid kết hợp cả hai

Kiến trúc thứ ba combine elements từ agentic RAG và two-step RAG:

- Transcript sẽ show ở LangGraph section, implement kiểu này bằng LangGraph.
- Câu hỏi which better? It depends use case.
- Nhưng hybrid combine both worlds.
- Kinh nghiệm production systems và enterprise customers: kiến trúc này usually wins, most commonly used today.

Hybrid thêm intermediate steps:

- Query preprocessing: query enhancement, lấy query gốc làm better cho retrieval.
- Retrieval rồi validation: review documents, validate có answer được question không.
- Post-generation checks: answer validation xem có hallucinations không, answer có trả lời questions không.
- Flexible hơn fixed pipeline nhưng vẫn maintain control over execution.

Sơ đồ transcript chỉ:

```
query -> enhance -> retrieve -> validate docs -> generate -> validate answer
```

- Không cover chi tiết now vì sau này đi rất deep, implement từ grounds up ở LangGraph section.

### 2.4. Khi nào agent là overkill

Transcript chốt:

- Short answer hybrid hiện dùng ở production enterprises, recommend vì captures both worlds.
- RAG agent quá flexible vì cho LLM entire freedom làm gì.
- Nhiều production application không cần vậy.
- Use cases RAG thường là question-answer over documents, documentation, internal documents, knowledge base để grounding answering.
- Agent là overkill cho việc đó.
- RAG agent đã thấy và implement, transcript không nghĩ best solution, definitely not use in production.

> Giữ nguyên quan điểm cá nhân, không làm mềm.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Two-step luôn retrieve rồi single inference, nhanh predictable | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | RAG agent ReAct + tool, LLM quyết định, flexible nhưng chậm và kém control | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 3 | Hybrid thêm query enhancement, docs validation, answer validation | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | QA docs/internal KB thì agent overkill, hybrid phổ biến enterprises | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Sơ đồ hybrid cụ thể và kinh nghiệm customers lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/agents |

### Code cập nhật (LangChain 1.x)

Không có code mới, minh họa đúng 3 patterns transcript:

```python
# Two-step: luon retrieve
# context = retriever.invoke(query)
# answer = llm.invoke(f"{query}\n{context}")

# RAG agent: LLM quyet dinh
# agent.invoke({"messages": [{"role": "user", "content": query}]})

# Hybrid: enhance -> retrieve -> validate -> generate -> validate
# query2 = enhance(query)
# docs = validate(retriever.invoke(query2))
# answer = validate_answer(llm.invoke(f"{query}\n{docs}"))
```

Giải thích:

- Giữ đúng trade-off transcript, không thêm validation logic chi tiết.
- Hybrid sẽ implement bằng LangGraph ở section sau.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Two-step | Luôn retrieve, 1 call, nhanh predictable |
| RAG agent | LLM quyết retrieve, linh hoạt, chậm |
| Hybrid | Enhance + validate docs + validate answer |
| Control | Two-step cao, agent thấp, hybrid giữa |
| Latency | Two-step thấp, agent cao vary |
| QA docs | Agent overkill |
| Production | Hybrid wins theo transcript |

**Câu chốt: Cần nhanh và kiểm soát thì two-step, cần linh hoạt có kiểm soát thì hybrid.**

## 5. Câu hỏi ôn tập

**1. Two-step nhanh vì sao?**

<details><summary>Đáp án</summary>

Vì luôn retrieve trước rồi single inference, không tốn LLM call quyết định theo docs RAG mới.

</details>

**2. RAG agent chậm vì sao?**

<details><summary>Đáp án</summary>

Vì thêm LLM reasoning trước retrieve, có thể nhiều calls, latency vary.

</details>

**3. Hybrid thêm gì?**

<details><summary>Đáp án</summary>

Query enhancement, retrieval validation và post-generation answer checks.

</details>

**4. Vì sao QA docs không cần agent?**

<details><summary>Đáp án</summary>

Vì chỉ cần grounding trên knowledge base, cho LLM full freedom dễ thừa và rủi ro.

</details>

**5. Transcript recommend gì cho production?**

<details><summary>Đáp án</summary>

Hybrid RAG bằng LangGraph vì kết hợp control của two-step và flexibility của agent.

</details>

## 6. Bước tiếp theo

Hết DANH_SÁCH_FILE section 10. Bài tiếp theo ngoài phạm vi: sang LangGraph section học hybrid RAG implement từ grounds up.
