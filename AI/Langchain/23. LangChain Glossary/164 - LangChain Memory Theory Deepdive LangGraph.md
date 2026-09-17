---
title: "Bài 164 - Memory Deep Dive với LangGraph"
course: "LangChain"
lesson: "164"
status: "edited-verified"
source: "164 - LangChain Memory Theory Deepdive LangGraph.md"
verified_date: "2026-09-17"
langchain_version: "langchain + LangGraph checkpointer, trim_messages, summarization, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["memory", "LangGraph", "checkpointer", "trim-messages", "summarization"]
doc_refs: ["https://langchain-ai.github.io/langgraph/", "https://docs.langchain.com/oss/python/langchain/memory"]
---

# Bài 164 — Memory Deep Dive với LangGraph

> Bài học được biên soạn từ transcript "LangChain Memory Theory Deepdive LangGraph".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 3 chiến lược xử lý messages: stuff all, trim old, summarize.
2. Giải thích checkpointer của LangGraph persist messages ở đâu.
3. Mô tả cách trim_messages và summarization prompt tiết kiệm tokens.
4. Giữ đúng thuật ngữ Anh: memory, checkpointer, trim_messages, MessagesPlaceholder, garbage in garbage out.

## 2. Kiến thức cốt lõi

### Ba chiến lược what to save

1. **Stuff everything:** nhét mọi messages vào LLM call. Dễ nhất, hợp short chats, nhưng dễ vượt token limit, đắt, chậm và garbage in garbage out vì gửi cả rác LLM không cần.
2. **Trim old messages:** bỏ messages đầu ít liên quan theo heuristic. Tiết kiệm nhưng không phải lúc nào cũ cũng vô dụng.
3. **Summarize:** xử lý messages thành một summary cộng vài messages gần nhất. Precise context, tiết kiệm tokens nhất.

### Where to save: checkpointer của LangGraph

- Mọi message user và AI đều được LangGraph persist vào DB qua checkpointer.
- Ví dụ: MemorySaver chỉ lưu in-memory không persistent; PostgreSQL, MySQL, Redis, MongoDB saver lưu persistent, càng ngày càng nhiều integrations.
- Cách dùng: tạo checkpoint object rồi pass vào LangGraph graph; checkpoint lo DB queries, không cần hiểu graph sâu ở bài này.

### How to send và how to process

- Gửi history bằng chat prompt template `from_messages` gồm system message và `MessagesPlaceholder(variable_name="messages")`; khi invoke truyền dict messages chứa Human rồi AI rồi Human để inject động.
- **Trim:** tạo trimmer bằng `trim_messages` với strategy, max tokens, token counter, trim theo tokens hay số messages; gọi `invoke` trên list messages rồi gửi trimmed messages cho LLM. Thuật ngữ gợi nhớ text splitter.
- **Summarize:** summary prompt nhận all history, tóm thành một summary lưu vào persistent storage, xóa raw messages không cần, mỗi lần summarize là một lần biến đổi trước checkpointing.

## 3. Ví dụ và diễn giải

- Chat ngắn hỏi đáp 2 turn: stuff all là đủ, khỏi bày vẽ.
- Chat dài hỗ trợ khách hàng: trim bỏ lời chào 50 turns trước, giữ 10 turns gần nhất.
- Chat siêu dài cần nhớ ý chính: summarize 100 turns thành 5 dòng ai thích gì, cấm gì, rồi chỉ gửi summary cộng 3 turns cuối.
- Production phải tách where và what: checkpointer lo where, trim hay summarize lo what; tự cắt chuỗi thủ công là reinvent the wheel.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangGraph](https://langchain-ai.github.io/langgraph/), [LangChain memory](https://docs.langchain.com/oss/python/langchain/memory).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Tên checkpointer, `trim_messages` và `MessagesPlaceholder` giữ nguyên theo transcript ở thời điểm quay; docs mới có thể đổi package hay signature.

> **Hộp cập nhật:** khi có mạng, đối chiếu `trim_messages`, summarization helpers và danh sách checkpointer gồm MemorySaver, Postgres, Mongo, Redis trong docs LangGraph mới nhất. Ví dụ Gemini 1.5 Pro 1M tokens trong transcript đã cũ về con số nhưng nguyên lý đắt chậm và rác vẫn đúng.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| What | Stuff all, trim old, summarize |
| Where | LangGraph checkpointer vào DB |
| Gửi | MessagesPlaceholder inject history động |
| Trim | `trim_messages` theo tokens hay count |
| Summarize | Prompt tóm history, lưu summary, xóa raw |

**Một câu chốt:** Memory tốt là biết giữ gì, bỏ gì và cất ở đâu, chứ không phải nhét tất cả.

## 6. Câu hỏi tự kiểm tra

1. Vì sao stuff all vẫn có chỗ đứng?
2. Trim theo heuristic nào và rủi ro gì?
3. Summarization tiết kiệm tokens bằng cách nào?
4. Checkpointer làm gì và không làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì đơn giản nhất và đủ cho short chats, không cần xử lý thêm.

**2.** Bỏ messages đầu cho là ít liên quan để tiết kiệm tokens, latency và cost; rủi ro là cũ chưa chắc vô dụng.

**3.** Tóm all history thành một summary, lưu summary, xóa raw messages nên lần sau chỉ gửi gọn.

**4.** Làm persistence history vào DB qua DB queries; không quyết định giữ gì, việc đó thuộc trim hay summarize trước checkpointing.

</details>

## 7. Bước tiếp theo

Bài 165 — *Core Architecture của Production AI* — sang Industry Insights: observability, AI gateway, memory và RAG.

Nguồn: transcript gốc `164 - LangChain Memory Theory Deepdive LangGraph.md`; [LangGraph](https://langchain-ai.github.io/langgraph/).
