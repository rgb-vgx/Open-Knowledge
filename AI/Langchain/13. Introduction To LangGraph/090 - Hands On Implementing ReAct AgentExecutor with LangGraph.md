---
title: "Bai 090 - ReAct AgentExecutor voi LangGraph"
course: langchain
lesson: 90
status: edited-verified
source: "090 - Hands On Implementing ReAct AgentExecutor with LangGraph.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; bai gioi thieu du an"
categories: [AI]
tags: [LangGraph, ReAct, ToolNode, function-calling]
doc_refs: ["https://docs.langchain.com/langgraph", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 090 — ReAct AgentExecutor với LangGraph

> Nguồn transcript: `090 - Hands On Implementing ReAct AgentExecutor with LangGraph.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ weather x3 và update quay lại sau 1 năm như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được sẽ build gì: ReAct agent executor bằng LangGraph.
2. Giải thích vì sao chọn project này: graph diễn đạt ReAct khó thành dễ.
3. Kể stack tools: search + custom tool, câu hỏi weather x3.
4. Hiểu update mới: ToolNode + function calling cho robust.
5. Biết cần nắm ReAct prompt cũ để hiểu evolution.

---

## 2. Nội dung chính theo mạch transcript

Sẽ implement ReAct agent executor nhưng bằng LangGraph. Lý do chọn: nhấn mạnh graph diễn đạt agent flows dễ thế nào, nhất là ReAct vốn khó hiểu thì qua graph thành super easy. Cũng đào sâu graph state và custom state. Cuối video có working agent executor dùng ReAct loop, cấp tools (search + custom tự viết), agent chạy graph có loop, tự quyết dùng tools hay không rồi trả lời.

Câu hỏi demo: what's the weather in San Francisco, please multiply it by three — hello world của agents nhưng chạy trong LangGraph.

Update quay lại sau 1 năm (ít tóc hơn, tăng cân): LangChain đang lean về LangGraph cho agents. Toàn section được quay lại theo versions mới nhất, dùng ToolNode và function calling cho robust và trustworthy hơn.

Side note GenAI: mọi thứ chồng lên nhau, hiểu ReAct algorithm với ReAct prompt old way cực quan trọng. Biết basics và nguồn gốc thì mọi thứ sau mới make sense; ai đã implement ReAct executor section trước thì giờ dễ hơn vì nắm concepts và evolution.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| ReAct qua graph dễ hiểu hơn | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | Đúng tinh thần docs hiện tại. |
| ToolNode + function calling robust hơn ReAct prompt cũ | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Hướng triển khai chuẩn hiện tại; tên API check docs mới. |
| LangChain lean về LangGraph cho agents | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Tới v1.0 càng rõ qua `create_agent`. |

> Hộp cập nhật 2026-09-17: Giữ nguyên giới thiệu dự án. Chi tiết code ở các bài 092-096, bài này không thêm code.

---

## 4. Tóm tắt

| Mảnh | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Mục tiêu | ReAct executor trên graph | Loop + tools |
| Tools | Search + custom | Weather x3 |
| Cách mới | ToolNode + function calling | Thay parse prompt cũ |
| Nền | ReAct prompt cũ | Hiểu gốc mới hiểu ngọn |

**Chốt: Học ReAct bằng graph thì vòng lặp khó nhằn thành hình vẽ dễ nhìn — đó là toàn bộ section hands-on này.**

---

## 5. Câu hỏi tự kiểm tra

1. Section này build gì?
2. Vì sao chọn ReAct để demo graph?
3. Tools và câu hỏi demo là gì?
4. Update sau 1 năm đổi gì?
5. Vì sao phải hiểu ReAct prompt old way?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** ReAct agent executor nhưng implement bằng LangGraph, có custom state và loop.

**2.** Vì ReAct vốn khó hiểu, qua graph thành super easy, nhấn mạnh sức mạnh diễn đạt agent flows.

**3.** Search tool + custom tool tự viết; câu hỏi weather San Francisco rồi multiply by three.

**4.** Quay lại theo LangGraph mới nhất, dùng ToolNode và function calling cho robust/trustworthy hơn.

**5.** Vì mọi thứ GenAI chồng lên nhau, hiểu basics và evolution thì mọi thứ sau mới make sense.

</details>

## 6. Bước tiếp theo

Bài 092 — *Setup project ReAct agent* — poetry, dependencies, env và main.py (bài 091 trống, bỏ qua).
