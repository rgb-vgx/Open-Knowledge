---
title: 'Bài 108 — ToolNode Executing Tools'
course: langchain
lesson: 108
status: edited-verified
source: '108 - ToolNode - Executing Tools.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung langchain-tavily, StructuredTool, ToolNode; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph/tools/
- https://docs.langchain.com/oss/python/integrations/tools/tavily_search
- https://github.com/langchain-ai/langgraph
---

# Bài 108 — ToolNode Executing Tools

> Nguồn: `108 - ToolNode - Executing Tools.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Cài `langchain-tavily`, cấu hình API key (đã revoke sau quay).
2. Viết hàm `run_queries` chạy batch search concurrent.
3. Bọc một hàm thành hai `StructuredTool` khác tên (AnswerQuestion vs ReviseAnswer).
4. Dựng `ToolNode` tự đọc state và thực thi tool calls song song.

## 2. Nội dung chính theo mạch transcript

### 2.1. Setup Tavily

- `poetry add langchain-tavily`, lấy API key bỏ vào `.env` (giảng viên revoke sau quay — đừng dùng lại).
- File mới `tool_executor.py`: `load_dotenv`, import `TavilySearch` tool, `StructuredTool` (biến Python function thành tool có schema cho LLM), `ToolNode` từ LangGraph, hai class schema bài 106–107.

### 2.2. Mẹo hai tool chung một hàm

- Khởi tạo search `max_results=5`.
- Viết `run_queries(search_queries: list[str], **kwargs)` — batch chạy concurrent các queries (kwargs chống lỗi khi LLM truyền thừa field).
- Tạo hai `StructuredTool.from_function`: cùng chạy `run_queries` nhưng khác `name` — một mang tên class `AnswerQuestion` (phase nghiên cứu đầu), một mang tên `ReviseAnswer` (phase sửa). Lý thuyết một tool cũng chạy được; tách tên để debug/eval biết search nào thuộc phase nào.

### 2.3. ToolNode

- `ToolNode([tool1, tool2])`: node đọc `messages` trong state, xem message cuối có tool calls do LLM quyết không, thực thi tương ứng, được cả song song — đỡ hẳn code tự parse thủ công (bản gốc khóa học phải tự làm; transcript giữ bản cũ làm optional).
- Commit lên branch `projects/reflection-agent` (link resources).

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `ToolNode` đọc last message, chạy tool calls song song | Khớp vai trò ToolNode trong docs LangGraph. | https://docs.langchain.com/langgraph/tools/ |
| `TavilySearch` + `max_results` | Khớp integration Tavily của LangChain. | https://docs.langchain.com/oss/python/integrations/tools/tavily_search |
| `StructuredTool.from_function` bọc hàm thành tool | Pattern chuẩn tạo custom tool. | https://docs.langchain.com/langgraph/tools/ |

> Hộp cập nhật: tên import cụ thể (`langchain_tavily`, `ToolNode` từ `langgraph.prebuilt`) đổi theo version; transcript không chốt version ở video này. Khi chạy mới, tra đúng docs theo version đã ghim. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| TavilySearch | Search engine tối ưu cho LLM |
| run_queries | Batch concurrent nhiều queries |
| Hai StructuredTool | Cùng ruột, khác tên phase |
| ToolNode | Thực thi tool calls từ state |

**Một câu chốt:** Đừng tự parse tool call bằng tay — hãy để ToolNode đọc state và chạy search song song, việc của bạn chỉ là đặt tên tool cho rõ phase.

## 5. Câu hỏi tự kiểm tra

1. Vì sao cần `**kwargs` trong `run_queries`?
2. Vì sao một hàm search lại bọc thành hai tool?
3. ToolNode đọc gì trong state để biết phải chạy tool nào?
4. ToolNode chạy nhiều queries kiểu gì?
5. Trước ToolNode, bản gốc khóa học phải làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Phòng khi LLM truyền thừa field ngoài `search_queries` thì hàm không vỡ — nuốt kwargs thừa.

**2.** Cùng logic search nhưng khác phase (initial research vs revision research); tách tên để trace/debug/eval biết search nào do phase nào trigger.

**3.** Đọc key `messages`, xem message cuối có tool calls do LLM quyết không rồi thực thi tool tương ứng.

**4.** Concurrent (batch) — nhiều queries cùng đợt chạy song song.

**5.** Tự parse tool call và tự gọi search thủ công — nhiều boilerplate; ToolNode sinh ra để gánh việc đó.

</details>

## 6. Bước tiếp theo

Bài 109 — *Building Our LangGraph Graph* — ráp draft/tools/revise nodes, conditional edge đếm tool calls, compile và invoke.
