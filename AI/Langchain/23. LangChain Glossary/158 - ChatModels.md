---
title: "Bài 158 - ChatModels"
course: "LangChain"
lesson: "158"
status: "edited-verified"
source: "158 - ChatModels.md"
verified_date: "2026-09-17"
langchain_version: "langchain >= 1.0, langchain-openai / anthropic / google-genai, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["ChatModels", "Messages", "tool-calling", "structured-output", "multimodality"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/models", "https://github.com/langchain-ai/langchain"]
---

# Bài 158 — ChatModels

> Bài học được biên soạn từ transcript "ChatModels".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được ChatModels là interface chính để gọi LLM hội thoại.
2. Phân biệt input list Messages với output AI Message.
3. Kể tên 3 năng lực mở rộng: tool calling, structured output, multimodality.
4. Gọi được các method `invoke`, `stream`, `batch`, `bind_tools`, `with_structured_output` và cấu hình tham số cơ bản.
5. Giữ đúng thuật ngữ Anh: ChatModels, Messages, Document, tool calling, structured output.

## 2. Kiến thức cốt lõi

### Interface hội thoại chuẩn

- LLM đời cũ nhận một string, trả một string.
- LLM hiện đại làm việc hội thoại: input là list Messages gồm system instruction, user questions, responses; output là một AI Message.
- ChatModels của LangChain chuẩn hóa việc này cho GPT-4, Anthropic Claude, Google Gemini lẫn open-source như Llama.

### Ba năng lực mở rộng

1. **Tool calling:** LLM chọn và thực thi math tool, gửi email, query database, gọi external API thay vì hallucinate đáp án. LangChain cho `bind_tools` chuẩn để build agents.
2. **Structured output:** ép output về JSON hay Pydantic object qua `with_structured_output`, tiện cho downstream xử lý. Ví dụ tách name, email, phone từ câu tự do.
3. **Multimodality:** ngoài text còn gửi ảnh, video trong content blocks để describe hay analyze image.

### Method và tham số

- `invoke`: nhận list Messages, trả một response Message.
- `stream`: yield output chunks token by token cho chat realtime.
- `batch`: gửi nhiều prompts theo nhóm hiệu quả.
- `bind_tools`: gắn external tools để bật tool calling.
- `with_structured_output`: wrapper lấy structured format trực tiếp.
- Tham số chuẩn: model name, temperature (0.0 deterministic, 1.0 creative), max tokens, stop sequences, timeout, max retries, API key, base URL. Model có param riêng thì đọc docs integration đó, ví dụ Gemini.

## 3. Ví dụ và diễn giải

- Tính toán không tool: LLM đoán mò. Có tool: LLM gọi math tool rồi trả đáp án đúng.
- Không structured output: downstream phải parse text tự do. Có structured output: nhận ngay Pydantic object có name, email, phone.
- Đổi provider: không viết lại code OpenAI rồi Anthropic rồi Google riêng, chỉ đổi class ChatModel vì interface chung. Đây cũng là chống vendor lock-in đã học ở bài 006.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain models](https://docs.langchain.com/oss/python/langchain/models), repo [langchain](https://github.com/langchain-ai/langchain).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; tên package integration như `langchain-openai`, `langchain-anthropic` giữ theo transcript ở thời điểm quay.

> **Hộp cập nhật:** khi có mạng, đối chiếu tên package provider, method `bind_tools` / `with_structured_output` và tham số model mới nhất. Transcript nói "Llama by Facebook via llama" nên hiểu là họ Llama/open-weights, chi tiết provider đọc docs mới.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Input | List Messages có role system / human / assistant |
| Output | AI Message kèm metadata, tool calls, token usage |
| Mở rộng | tool calling, structured output, multimodality |
| Methods | invoke, stream, batch, bind_tools, with_structured_output |
| Lợi ích | Một interface cho mọi provider, async, streaming, LangSmith tracing |

**Một câu chốt:** ChatModels biến mọi LLM hội thoại thành một interface duy nhất cộng tools và structured output.

## 6. Câu hỏi tự kiểm tra

1. Input và output của ChatModel là gì?
2. Tool calling giải quyết vấn đề nào của bài toán tính toán?
3. Structured output khác free-form text ở điểm nào?
4. Kể 3 tham số init quan trọng và ý nghĩa?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Input là list structured Messages, output là một AI Message của LLM.

**2.** Thay vì hallucinate đáp án, LLM chọn và execute math tool để tính đúng.

**3.** Structured output trả JSON/Pydantic theo schema cho trước để app xử lý tiếp, thay vì parse text tự do.

**4.** model name chọn model; temperature điều creativity 0.0 tới 1.0; max tokens giới hạn độ dài để kiểm soát cost; thêm stop, timeout, max retries cho robustness.

</details>

## 7. Bước tiếp theo

Bài 159 — *Messages* — đi sâu hai mảnh role và content của mọi hội thoại.

Nguồn: transcript gốc `158 - ChatModels.md`; [LangChain models](https://docs.langchain.com/oss/python/langchain/models).
