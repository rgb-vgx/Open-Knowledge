---
title: 'Bài 117 — Retrieve Node'
course: langchain
lesson: 117
status: edited-verified
source: '117 - Fetching Context for LLMs The LangGraph Retrieve Node.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://docs.langchain.com/oss/python/langchain/retrieval
---

# Bài 117 — Retrieve Node

> Nguồn: `117 - Fetching Context for LLMs The LangGraph Retrieve Node.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Tạo file `graph/nodes/retrieve.py` đúng quy ước bài 114.
2. Viết hàm `retrieve(state: GraphState) -> dict` chạy `retriever.invoke(question)`.
3. Cập nhật key documents (và giữ question) trong state.
4. Tra code mẫu ở branch `5-retrieve-node`.

## 2. Nội dung chính theo mạch transcript

### 2.1. Imports

- `typing.Any/Dict` cho type hint, `GraphState` (input/output contract), `retriever` từ file ingestion (trỏ vector store local đã index).

### 2.2. Thân node

1. `print` debug "retrieving".
2. `question = state["question"]`, `docs = retriever.invoke(question)` — semantic search lấy documents relevant.
3. Return dict update `{"documents": docs, "question": question}` — ghi question lại chỉ để chắc chắn (transcript thừa nhận không bắt buộc).
- Đây là entry node của graph CRAG (bài 121 sẽ `set_entry_point` vào đây).

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Node nhận state, trả dict update | Semantics node LangGraph chuẩn. | https://docs.langchain.com/langgraph |
| `retriever.invoke(question)` semantic search | API retriever LangChain. | https://docs.langchain.com/oss/python/langchain/retrieval |

> Ghi nhận: không nội dung lỗi thời. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Bước | Việc |
|---|---|
| 1 | Lấy question từ state |
| 2 | retriever.invoke(question) |
| 3 | Ghi documents (+ question) vào state |

**Một câu chốt:** Retrieve node chỉ làm một việc duy nhất nhưng làm cho chắc: hỏi gì thì vét vector store lấy đúng nấy rồi đặt lên tờ giấy state.

## 5. Câu hỏi tự kiểm tra

1. Vì sao node import GraphState?
2. Retriever ở đây trỏ đi đâu?
3. Vì sao transcript ghi lại question dù không bắt buộc?
4. Return dict của node được LangGraph dùng thế nào?
5. Node này đứng đầu luồng CRAG có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Để type hint input là state chuẩn và明确 dict trả về khớp keys — đúng contract bài 114/116.

**2.** Vector store local (Chroma) đã index ở ingestion — transcript giả định embeddings có sẵn.

**3.** Để chắc chắn (cautious): giữ câu gốc nguyên vẹn cho các node sau, phòng khi state bị ghi đè đâu đó.

**4.** LangGraph merge dict vào state hiện tại — key documents mới thay cũ, các key khác giữ nguyên.

**5.** Mọi nhánh sau (grade, search, generate) đều phụ thuộc documents retrieve được — đây là nguồn context đầu vào.

</details>

## 6. Bước tiếp theo

Bài 118 — *Relevance Filter with Structured Output* — viết retrieval grader chain + node grade_documents + tests.
