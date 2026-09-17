---
title: 'Bài 116 — GraphState'
course: langchain
lesson: 116
status: edited-verified
source: '116 - Managing Information Flow in LangGraph The GraphState.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://github.com/langchain-ai/langgraph
---

# Bài 116 — GraphState quản lý luồng thông tin

> Nguồn: `116 - Managing Information Flow in LangGraph The GraphState.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa class `GraphState(TypedDict)` cho CRAG.
2. Kể tên 4 field: question, documents, web_search, generation.
3. Giải thích vì sao cần giữ question xuyên suốt execution.
4. Tra code mẫu ở branch `4-state`.

## 2. Nội dung chính theo mạch transcript

### 2.1. Imports và khai báo

- File `graph/state.py`: `from typing import List` (transcript đọc "list and TypeDict") + `TypedDict`.
- `class GraphState(TypedDict)` chứa toàn bộ state truyền tay giữa các nodes.

### 2.2. Bốn field

1. `question: str` — câu hỏi gốc, luôn cần để grade documents có relevant không và để search online đúng truy vấn.
2. `documents: List[str]` — nội dung documents: retrieved từ vector store hoặc gộp thêm web search.
3. `web_search: bool` — cờ báo có cần search online bổ sung không.
4. `generation: str` — đáp án sinh ra cuối cùng.
- Video ngắn vì straightforward; code chi tiết xem branch `4-state` (`graph/state.py`).

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `TypedDict` làm state schema | Pattern chuẩn LangGraph StateGraph. | https://docs.langchain.com/langgraph |
| State truyền giữa nodes, mỗi node update một phần | Semantics state của LangGraph. | https://github.com/langchain-ai/langgraph |

> Ghi nhận: không API mới, không nội dung lỗi thời. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Field | Vai trò |
|---|---|
| question | Neo ngữ cảnh chấm điểm + search |
| documents | Context cho LLM |
| web_search | Cờ rẽ nhánh |
| generation | Output cuối |

**Một câu chốt:** State là tờ giấy chạy chuyền tay — câu hỏi, bằng chứng, cờ hiệu và đáp án đều ghi lên đó để node nào cũng đọc được.

## 5. Câu hỏi tự kiểm tra

1. Vì sao question phải nằm trong state thay vì biến cục bộ?
2. documents chứa gì ở đầu và cuối luồng CRAG?
3. Cờ web_search do node nào bật?
4. generation được ghi ở node nào?
5. Vì sao dùng TypedDict thay vì dict thường?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì nhiều node sau (grade documents, web search, generate) đều cần đối chiếu câu gốc; để trong state thì node nào cũng đọc được.

**2.** Đầu là documents retrieve từ vector store; cuối là list đã lọc relevant + có thể gộp thêm document từ web search.

**3.** Node grade_documents (bài 118): phát hiện ít nhất một document không relevant thì bật true.

**4.** Node generate (bài 120) chạy generation chain rồi ghi vào key generation.

**5.** Để có schema type hints rõ ràng cho keys — LangGraph yêu cầu typed state để biết dữ liệu nào chảy qua graph (ý đã dạy bài 101).

</details>

## 6. Bước tiếp theo

Bài 117 — *The LangGraph Retrieve Node* — viết node retrieve chạy semantic search và update documents.
