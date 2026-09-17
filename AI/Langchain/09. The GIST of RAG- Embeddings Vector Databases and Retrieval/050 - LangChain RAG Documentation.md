---
title: 'Bài 050 — Đọc docs RAG Agentic RAG và Two Step Chain'
course: 'langchain'
lesson: 50
status: edited-verified
source: '050 - LangChain RAG Documentation.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 050 — Đọc docs RAG: Agentic RAG và Two-Step Chain

> Nguồn: `050 - LangChain RAG Documentation.md` — giữ mạch Ethan: yêu LangChain nhưng chê docs sau 1.0, so sánh cách dạy trong khóa với tutorials chính thức.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nắm tutorials docs: semantic search, build RAG application, RAG agent.
- So sánh ingestion + retrieval đã học với snippets docs.
- Hiểu agentic RAG: ReAct agent + retrieval tool, LLM tự quyết định gọi tool.
- Hiểu two-step chain: luôn retrieve rồi single inference.
- Biết custom RAG agent LangGraph kiểm tra hallucination sẽ học sau.

## 2. Nội dung theo mạch transcript

### 2.1. Lời chê docs sau 1.0

Transcript nói:

- Yêu ecosystem LangChain, LangGraph.
- Nhưng chê cách làm docs, nhất là sau version 1.0 đã xóa tons docs quan trọng.
- Những thứ đó vẫn trong source code, chưa planned deprecated.
- Cách docs làm retrieval documentation theo transcript là wrong, không phải best practice.
- Vì vậy section này dạy hơi khác docs, video này show khác biệt.

> Giữ nguyên quan điểm cá nhân của tác giả, không thêm bớt.

### 2.2. Tutorial semantic search

Trong docs mục tutorials:

- Có tutorial building semantic search engine với LangChain.
- Đây gần như việc đã làm: ingestion + retrieval.
- Concepts: documents, text splitting, embeddings, vector stores, retrievers — đều đã thảo luận.
- Ví dụ load PDF, print page_content.
- Bàn splitting, embedding output, `add_documents` vào vector store.
- Nhưng chỉ snippets, không thấy application hoàn chỉnh.
- Ví dụ retrieval function dùng `similarity_search` rồi wrap làm chain — transcript nói chưa từng thấy syntax này, khá surprising.
- Ví dụ khác dùng retriever rồi batch invoke.

### 2.3. Tutorial build RAG agent

Docs dẫn tới build RAG agent với LangChain:

- Dùng ReAct agent + searching tool similarity search.
- Flow tutorial:
  1. Indexing: splitting documents — đã biết.
  2. Retrieval and generation: viết function `retrieve_context(query)` trả retrieved docs.
  3. Wrap function thành tool có structured output.
  4. Tạo ReAct agent một tool, prompt: `You have access to a tool that retrieves context from a blog post. Use this tool to help answer user queries.`

Transcript không thích approach này:

- Để LLM quyết định có gọi tool hay không.
- Làm với hàng trăm customers chưa từng thấy kiểu này ở production.
- Không muốn agent trả lời ngoài business logic, ví dụ customer support.
- Agent autonomous, dễ bị manipulate làm nonsense.
- Redundant, expensive, tốn tokens, thêm latency.
- Nếu luôn phải query knowledge base (vector store) thì tool calling là overhead.

### 2.4. Trade-offs docs ghi nhận

Transcript khen docs có bàn benefits/drawbacks của agentic RAG:

- Above agentic RAG dùng ReAct + search tool, cho LLM discretion gọi tool.
- Good general purpose nhưng trade-offs:
  - Reduce control: LLM có thể skip search khi cần, hoặc search thừa khi không cần.
  - Hai inference calls khi search: một để generate query, một để final response → thêm latency.
  - Điểm tốt: search only when needed — xử lý greetings, follow-ups không cần search. Transcript phản biện: cũng có thể trả lời non-relevant, bị jailbreak, gây hại công ty.
  - Contextual search: tool có query input nên LLM craft query theo conversational context. Transcript nói semi-true, vì dùng function calling, query embed sẽ đổi theo history. Nhưng implement deterministic bằng expression language cũng được.
  - Multiple searches allowed: một user query có thể trigger nhiều searches. Transcript hẹn real Agentic RAG bằng LangGraph dựa research papers sẽ tốt hơn, deterministic hơn.

### 2.5. Two-step chain trong docs

Docs mô tả common approach khác:

- Always run search, potentially dùng raw user query.
- Incorporate results làm context cho single query.
- Đây đúng thứ đã làm trong khóa.
- Single inference per query → giảm latency, mất flexibility.
- Không gọi model in loop, chỉ single pass.
- Docs implement bằng cách remove tools khỏi agent, nhét retrieval vào middleware via custom prompt.
- Transcript không thích: dùng `create_agent` không tools nhưng bên trong vẫn loop, quá abstracted, update package có thể đổi behavior và break app.
- Muốn production robust phải control mọi thứ explicit.

### 2.6. Custom RAG agent LangGraph

Docs còn section custom RAG agent under LangGraph:

- Transcript khen excellent.
- Architecture dựa papers, proven work well.
- Có check hallucinations, check answers relevant to question.
- Khóa này sẽ cover rất sâu ở graph section sau.
- Chốt video: xin feedback.

```
Docs RAG hien tai:
 semantic search snippets
 agentic RAG (ReAct + tool, flexible nhung kem control)
 two-step chain (luon retrieve, nhanh, don gian)
 custom LangGraph agent (kiem tra chat, se hoc sau)
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Docs có tutorials semantic search: documents, splitting, embeddings, vector stores, retrievers | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Agentic RAG = ReAct agent + retrieval tool, LLM tự quyết gọi tool, tốn 2 inference + latency | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 3 | Two-step chain luôn retrieve rồi single inference, ít latency, kém flexible | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Custom LangGraph RAG có check hallucination, answer relevance | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Nhận xét docs xóa nhiều sau 1.0, syntax wrap similarity_search lạ, create_agent giấu loop | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Kinh nghiệm hàng trăm customers, jailbreak, production nên deterministic | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/agents |

### Code cập nhật (LangChain 1.x)

Transcript không đưa code chạy, chỉ mô tả docs. Minh họa 2 patterns đúng tinh thần, không thêm logic:

```python
# Two-step chain nhu khoa hoc (deterministic)
# context = retriever.invoke(query)
# answer = llm.invoke(f"Question: {query}\nContext: {context}")
```

```python
# Agentic RAG nhu docs (LLM quyet dinh)
# from langchain.agents import create_agent
# agent = create_agent(model=llm, tools=[retrieve_context])
# agent.invoke({"messages": [{"role": "user", "content": query}]})
```

Giải thích:

- Two-step luôn retrieve, single pass, ít latency.
- Agentic flexible nhưng mất control, thêm tool-call overhead.
- Production theo transcript nên explicit, deterministic.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Semantic search tutorial | Snippets load/split/embed/store/retrieve, chưa thành app |
| Agentic RAG | ReAct + retrieval tool, LLM tự quyết, 2 calls, flexible |
| Nhược agentic | Skip/thừa search, latency, jailbreak, overhead |
| Two-step chain | Luôn search raw query, single inference, nhanh |
| Nhược two-step | Cố định, kém flexible hội thoại |
| Custom LangGraph | Check hallucination + relevance, học sau |
| Khuyến nghị transcript | Deterministic explicit cho production |

**Câu chốt: Luôn retrieve thì nhanh và kiểm soát được, để LLM tự quyết thì linh hoạt nhưng tốn kém và rủi ro hơn.**

## 5. Câu hỏi ôn tập

**1. Agentic RAG trong docs làm gì?**

<details><summary>Đáp án</summary>

Tạo ReAct agent một retrieval tool, prompt bảo dùng tool để lấy context blog rồi trả lời theo docs mới.

</details>

**2. Vì sao transcript chê agentic cho customer support?**

<details><summary>Đáp án</summary>

Vì LLM tự quyết có gọi tool không, dễ trả ngoài business logic, dễ jailbreak, thêm tokens và latency không cần thiết.

</details>

**3. Two-step chain khác gì?**

<details><summary>Đáp án</summary>

Luôn chạy search với raw query rồi single inference, giảm latency nhưng mất flexibility xử lý greetings.

</details>

**4. Contextual search lợi gì?**

<details><summary>Đáp án</summary>

Query embed đổi theo history nhờ function calling, nhưng transcript nói làm deterministic bằng expression language cũng được.

</details>

**5. Custom LangGraph RAG có gì hay?**

<details><summary>Đáp án</summary>

Dựa papers, có check hallucinations và answer relevance, sẽ học sâu ở graph section.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: hết section 09, sang `051 - What are we building A lightweight Cursor Feature Feature RAG.md` — documentation helper end-to-end.
