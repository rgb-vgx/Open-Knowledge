---
title: 'Bài 118 — Relevance Filter Structured Output'
course: langchain
lesson: 118
status: edited-verified
source: '118 - Building a Relevance Filter for RAG using LangChain Structured Output.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung with_structured_output, GPT-3.5 default; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.pytest.org/
- https://docs.langchain.com/langgraph
---

# Bài 118 — Relevance Filter bằng Structured Output

> Nguồn: `118 - Building a Relevance Filter for RAG using LangChain's Structured Output.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Viết `GradeDocuments` schema (binary_score yes/no) và retrieval grader chain.
2. Giải thích `with_structured_output` ép LLM trả đúng Pydantic object.
3. Viết hai test yes/no (agent memory vs how to make pizza) và chạy pytest.
4. Viết node `grade_documents` lọc + bật cờ web_search.

## 2. Nội dung chính theo mạch transcript

### 2.1. Chain (chains/retrieval_grader.py)

- Imports: `ChatPromptTemplate`, Pydantic `BaseModel`/`Field`, `ChatOpenAI` (default, temperature=0; transcript nhắc default GPT-3.5).
- `class GradeDocuments`: một field `binary_score: str` (yes/no), description "documents are relevant to the question, yes or no" — LLM đọc description để chấm.
- `llm.with_structured_output(GradeDocuments)` — dưới hood là function calling; yêu cầu model hỗ trợ function calling; nên đọc source hàm này để hiểu LangChain làm gì.
- Prompt: system "You are a grader assessing relevance of a retrieved document to a user question. If the document contains keywords or semantic meaning related to the question... binary score yes or no"; human message gồm `{document}` + `{question}`.
- `retrieval_grader = prompt | structured_llm`.

### 2.2. Triết lý test LLM app

- Ba khó khăn: LLM stochastic (non-idempotent), third-party availability/rate limit, tốn token/money (có thể dùng model rẻ hoặc open-source nhưng phải lo ops).
- Model top-tier ngày càng tốt/rẻ/nhanh, có công ty đã đưa vào CI/CD + cách mitigate — ngoài scope khóa học. Dù vậy test thủ công vẫn hơn không: sanity check.
- Test 1 `test_retrieval_grader_answer_yes`: retriever với "agent memory" lấy doc đầu (index 0/1 đều relevant vì DB toàn bài agent memory), invoke grader, assert binary_score == yes; đảo assert để check test đỏ rồi trả lại.
- Test 2 `test_retrieval_grader_answer_no`: vẫn retrieve bằng "agent memory" nhưng chấm với question "how to make pizza" → expect no. Chạy `pytest . -s -v` xanh hết.

### 2.3. Node (nodes/grade_documents.py)

- Duyệt documents trong state, mỗi doc gọi grader với (question, page_content); giữ doc yes vào `filtered_docs`, gặp no thì bật `web_search=true` (heuristic: chỉ cần một doc hỏng là đi search thêm).
- Return `{"documents": filtered_docs, "question": question, "web_search": flag}`.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `with_structured_output` + Pydantic ép schema | API structured output chuẩn LangChain. | https://docs.langchain.com/oss/python/langchain/structured-output |
| Yêu cầu model hỗ trợ function calling | Đúng cho đời transcript; model mới hỗ trợ rộng hơn. | https://docs.langchain.com/oss/python/langchain/structured-output |
| Test pytest yes/no | Quy ước pytest; nội dung test theo khóa học. | https://docs.pytest.org/ |
| Node lọc + cờ web_search | Logic CRAG của khóa học trên LangGraph. | https://docs.langchain.com/langgraph |

> Hộp cập nhật: ghim model explicit thay vì trông chờ default GPT-3.5; temperature=0 giảm nhưng không triệt tiêu stochastic. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| GradeDocuments | binary_score yes/no |
| retrieval_grader | prompt + structured LLM, chấm từng doc |
| Tests yes/no | agent memory relevant, pizza không |
| grade_documents node | Lọc docs + bật web_search khi có doc hỏng |

**Một câu chốt:** Chấm từng tờ tài liệu trước khi tin — tờ nào lạc đề thì vứt và cắm cờ đi tìm nguồn tươi.

## 5. Câu hỏi tự kiểm tra

1. Vì sao description của field binary_score quan trọng?
2. `with_structured_output` làm gì dưới hood?
3. Vì sao test no vẫn retrieve bằng "agent memory"?
4. Heuristic bật web_search là gì?
5. Ba khó khăn khi test LLM app theo transcript?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì LLM đọc description để biết tiêu chí chấm (relevant = yes/no) — description cũng là một dạng prompt ép schema.

**2.** Bind Pydantic class dưới dạng function calling; mỗi lần gọi LLM, LangChain parse response thành object GradeDocuments.

**3.** Để có document chắc chắn về agent memory, rồi chấm nó với câu lạc đề "how to make pizza" — đúng ra phải no, kiểm tra grader biết từ chối.

**4.** Chỉ cần ít nhất một document không relevant là bật web_search=true — thiếu một tờ cũng phải đi tìm bù.

**5.** Stochastic non-idempotent (mỗi lần gọi đáp khác), phụ thuộc third-party (rate limit, downtime), tốn tiền token mỗi lần invoke.

</details>

## 6. Bước tiếp theo

Bài 119 — *Web Search Node with Tavily API* — viết node web_search gộp kết quả thành Document.
