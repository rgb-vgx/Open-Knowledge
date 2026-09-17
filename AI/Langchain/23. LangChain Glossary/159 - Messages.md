---
title: "Bài 159 - Messages"
course: "LangChain"
lesson: "159"
status: "edited-verified"
source: "159 - Messages.md"
verified_date: "2026-09-17"
langchain_version: "langchain >= 1.0, langchain-core Messages, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["Messages", "ChatModels", "HumanMessage", "AIMessage", "ToolMessage"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/messages", "https://github.com/langchain-ai/langchain"]
---

# Bài 159 — Messages

> Bài học được biên soạn từ transcript "Messages".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được Message gồm role và content, là đơn vị giao tiếp với LLM.
2. Phân biệt System, Human, AI và Tool Message.
3. Mô tả flow hội thoại chuẩn và flow khi có tool calling.
4. Giữ đúng thuật ngữ Anh: Messages, ChatModels, HumanMessage, AIMessage, ToolMessage.

## 2. Kiến thức cốt lõi

### Message là gì?

- Mọi input gửi tới ChatModels và output nhận về đều là Messages.
- Mỗi Message có hai phần: **role** cho biết ai gửi, **content** chứa thông tin, thường là text nhưng có thể là images, videos hay multimodal data.
- LangChain chuẩn hóa Messages để cùng một interface dùng được nhiều provider.

### Bốn roles chính

1. **System:** thiết lập behavior hay context ban đầu, ví dụ act as helpful assistant. Không phải model nào cũng hỗ trợ giống nhau: có model dùng param riêng, có model gộp vào history, có model không hỗ trợ; LangChain bọc lại thành một interface.
2. **Human/User:** input từ người, dùng class HumanMessage. Gọi model bằng string thuần cũng tự coi là HumanMessage.
3. **Assistant/AI:** response của model, dùng AIMessage. Ngoài content còn có metadata, tool calls, token usage, IDs để debug.
4. **Tool:** kết quả thực thi tool, dùng ToolMessage để báo cho AI. Ví dụ tool thời tiết trả về thì bọc vào ToolMessage rồi AI mới chốt final answer.

### Thứ tự Messages

- Chuẩn không tools: Human, AI, Human, AI xen kẽ.
- Có tools: Human, AI kèm tool call, ToolMessage chứa tool result, AI dùng kết quả đó, lặp tiếp.

## 3. Ví dụ và diễn giải

- Hỏi thời tiết: Human hỏi, AI ra tool call get_weather, ToolMessage trả 32 độ, AI tổng hợp câu trả lời cuối.
- System đặt giọng: summarise concisely thì mọi AI Message sau đều ngắn gọn, vì role system đã định khung từ đầu.
- Đổi provider OpenAI sang Anthropic không đổi code Messages vì LangChain đã abstract format riêng của từng hãng.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain Messages](https://docs.langchain.com/oss/python/langchain/messages), repo [langchain](https://github.com/langchain-ai/langchain).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; tên class HumanMessage, AIMessage, ToolMessage giữ nguyên.

> **Hộp cập nhật:** khi có mạng, đối chiếu tên class Messages trong `langchain-core`, cách truyền multimodal content blocks và xử lý system message theo từng provider.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Cấu trúc | role + content |
| System | Setup behavior, mỗi provider hỗ trợ khác nhau |
| Human | Input người, string thuần tự thành HumanMessage |
| AI | Output model, kèm metadata và tool calls |
| Tool | Kết quả tool để AI chốt đáp án |
| Flow | Human-AI xen kẽ, có tools thì chèn AI tool call và ToolMessage |

**Một câu chốt:** Messages là ngôn ngữ chung để mọi ChatModel hiểu cùng một cuộc hội thoại.

## 6. Câu hỏi tự kiểm tra

1. Message gồm mấy phần?
2. Vì sao System Message cần abstraction riêng?
3. ToolMessage dùng khi nào?
4. Flow có tool calling khác flow thường ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Hai phần: role cho biết ai gửi, content chứa thông tin text hay multimodal.

**2.** Vì mỗi model xử lý khác nhau: dedicated param, gộp vào history hay không hỗ trợ; LangChain gom thành một interface.

**3.** Khi đã execute tool, bọc kết quả vào ToolMessage để báo cho AI trước khi sinh final answer.

**4.** Thêm cặp AI tool call rồi ToolMessage trước AI cuối, thay vì chỉ Human-AI xen kẽ.

</details>

## 7. Bước tiếp theo

Bài 160 — *RecursiveCharacterTextSplitter* — xem chia chunk tôn trọng cấu trúc văn bản ra sao.

Nguồn: transcript gốc `159 - Messages.md`; [LangChain Messages](https://docs.langchain.com/oss/python/langchain/messages).
