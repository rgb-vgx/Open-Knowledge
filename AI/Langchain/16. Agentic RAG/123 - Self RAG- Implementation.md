---
title: 'Bài 123 — Self RAG Implementation'
course: langchain
lesson: 123
status: edited-verified
source: '123 - Self RAG- Implementation.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung with_structured_output boolean; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.langchain.com/langgraph
- https://docs.smith.langchain.com/
---

# Bài 123 — Self RAG Implementation

> Nguồn: `123 - Self RAG- Implementation.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Viết hai grader chains (hallucination + answer) bằng structured output boolean.
2. Viết tests yes/no cho hallucination grader.
3. Viết router `grade_generation_grounded_in_documents_and_question` rẽ ba nhánh.
4. Dùng path map hiển thị nhãn not supported/useful/not useful trên edges.

## 2. Nội dung chính theo mạch transcript

### 2.1. Vì sao conditional edge, không phải node

- Vì sau khi chấm phải chọn bước kế (finish/regenerate/search) — bản chất là routing nên để conditional branching trực quan hơn nhét vào node.

### 2.2. Hallucination grader (chains/hallucination_grader.py)

- `GradeHallucinations`: một field `binary_score: bool`, description "answer is grounded in the facts, yes or no" — LangChain cast đáp án LLM thành boolean.
- System: "You are a grader assessing whether an LLM generation is grounded in/supported by a set of facts. Give binary score yes or no; yes means grounded."
- Template `from_messages([("system", ...), ("human", "Set of facts:\n{documents}\nLLM generation:\n{generation}")])`, chain `prompt | structured_llm`.
- Tests: fix import sau load env (lỗi transcript gặp), test yes (agent memory + docs retrieve + generation chain → grounded true), test no (generation "In order to make pizza, we first need dough..." → false, bỏ biến thừa dòng 62), full suite xanh.

### 2.3. Answer grader (chains/answer_grader.py)

- `GradeAnswer`: `binary_score` description "answer addresses the question, yes or no"; system "assessing whether an answer addresses and resolves the question... yes means resolves"; human gồm `{question}` + `{generation}`; chain tương tự — không kỹ thuật prompt mới.

### 2.4. Conditional edge sau generate (graph.py)

- `grade_generation_grounded_in_documents_and_question(state)`: lấy question/documents/generation → chạy hallucination grader; false → return "not supported" (regenerate bám docs); true → chạy answer grader; true → "useful", false → "not useful" (vector store thiếu → web search).
- `add_conditional_edges("generate", fn, {"not supported": GENERATE, "useful": END, "not useful": WEB_SEARCH})` — map string hiển thị sang node thật; labels hiện trên edges giúp graph explainable.
- Chạy "what is agent memory" happy flow (grounded + answers), trace LangSmith thấy node `grade generation...` gọi 2 LLM grader rồi về END. Code branch `10-self-rag` (transcript đọc "ten frag").

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Structured output boolean chấm grounded/answers | Pattern structured output LangChain. | https://docs.langchain.com/oss/python/langchain/structured-output |
| Conditional edge sau generate rẽ 3 nhánh + path map | API conditional edges LangGraph. | https://docs.langchain.com/langgraph |
| Trace hiện node grading + 2 LLM calls | Khả năng tracing LangSmith. | https://docs.smith.langchain.com/ |

> Hộp cập nhật: boolean ép LLM trả yes/no dễ parse nhưng vẫn stochastic — production nên retry/fallback. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Grader | Chấm gì | Rẽ đi đâu |
|---|---|---|
| Hallucination | Grounded trong docs? | No → regenerate |
| Answer | Answers question? | No → web search |
| Cả hai yes | useful | END trả user |

**Một câu chốt:** Sau generate đừng vội trả — cho hai giám khảo chấm bịa không và lạc đề không, trượt ông nào thì đi đường nấy.

## 5. Câu hỏi tự kiểm tra

1. Vì sao dùng conditional edge thay vì node chấm điểm?
2. Hai grader nhận input nào khác nhau?
3. "not supported" khác "not useful" ở điểm nào?
4. Path map ở đây có tác dụng kép gì?
5. Test hallucination no dùng generation gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì output của bước chấm là lựa chọn đường đi (regenerate/search/finish) — conditional edge thể hiện routing trực tiếp, node chỉ nên làm transform.

**2.** Hallucination grader nhận (documents, generation); answer grader nhận (question, generation).

**3.** not supported = bịa, không grounded → regenerate bám docs; not useful = grounded nhưng lạc đề → vector store thiếu, đi web search.

**4.** Vừa map string hiển thị sang node thật (not supported→generate, useful→END, not useful→web_search), vừa in labels explainable lên diagram.

**5.** Câu làm pizza ("In order to make pizza, we first need dough...") — chắc chắn không grounded trong docs agent memory nên expect false.

</details>

## 6. Bước tiếp theo

Bài 124 — *Adaptive RAG* — thêm question router và conditional entry point rẽ retrieve hay web search ngay từ đầu.
