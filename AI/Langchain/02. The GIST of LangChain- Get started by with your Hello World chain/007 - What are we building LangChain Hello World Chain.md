---
title: 'Bài 007 — Hello World Chain'
course: 'langchain'
lesson: 7
status: edited-verified
source: '007 - What are we building LangChain Hello World Chain.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/overview'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 007 — Hello World Chain

> Biên soạn từ transcript "007 - What are we building LangChain Hello World Chain.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Mô tả chain Hello World của section: tóm tắt thông tin Elon Musk thành fun facts.
- Kể tên các building blocks sẽ học: prompt templates, prompts, chat models, chains, debugging và tracing.
- Giải thích tinh thần "learn by doing" của section này.
- Nêu được lựa chọn LLM cho section: GPT-5 mặc định, có phương án open-weights local.

## 1. Chain Hello World làm gì

Chain rất đơn giản:

```
thông tin về Elon Musk ──> LLM ──> bản tóm tắt + cool facts
```

Input là một đoạn text về Elon Musk. Output là bản summarize kèm các sự thật thú vị do LLM sinh ra. Giảng viên gọi đây là LangChain Hello World — ví dụ nhỏ nhất để thấy dòng chảy prompt → model → response.

## 2. Tinh thần "learn by doing"

Section này không học lý thuyết suông. Mỗi khái niệm được giới thiệu đúng lúc cần dùng trong chain:

| Thứ tự | Concept | Vai trò trong chain |
|---|---|---|
| 1 | prompt templates | Dựng prompt động từ biến `information` |
| 2 | prompts | Text input gửi vào LLM |
| 3 | chat models | Interface gọi LLM (GPT-5, Gemini, Claude...) |
| 4 | chains | Nối các bước thành workflow |
| 5 | debugging và tracing | Soi từng bước chain chạy |

> Học bằng cách build chain thật, khái niệm nào cần thì giảng viên giới thiệu tới đó.

## 3. Lựa chọn model trong section

Giảng viên dùng OpenAI GPT-5 cho section này, nhưng nhấn mạnh bạn có thể dùng bất kỳ first-tier LLM nào như Google Gemini hay Anthropic Claude.

Song song đó section cũng demo chạy open-weights model local: Llama / Gemma 3 của Google chạy trên máy. Đây là minh họa trực tiếp cho khả năng switch models dễ dàng của LangChain đã nói ở Bài 006.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Chain = nối prompt template + LLM thành workflow | Docs overview giữ pattern Agent = Model + Harness; chain dạng `prompt \| model` vẫn là cách compose cơ bản, `create_agent` là scaffold mới cho agents | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| Có thể dùng GPT-5, Gemini, Claude thay thế nhau qua chat models | Docs liệt kê provider labels `openai:gpt-5.5`, `claude-sonnet-4-6`, `google_genai:gemini-2.5-flash-lite` với cùng interface | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Có thể chạy open-weights model local (Llama, Gemma 3) | Connector Ollama qua package `langchain-ollama` riêng, hỗ trợ function calling và structured output | Vẫn đúng | [Ollama integration](https://docs.langchain.com/oss/python/integrations/chat/ollama) |

Code cập nhật (nếu có): không có — bài này không chứa code, chỉ giới thiệu định hướng.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Chưa hình dung chain là gì | Chain nhỏ nhất: text về một người → prompt → LLM → summary + facts |
| Sợ ngợp khái niệm | Học theo mạch build: cần gì học nấy (prompt, chat model, chain, tracing) |
| Sợ bị khóa vào một LLM | Cùng một chain, đổi chat model là đổi vendor (OpenAI, Gemini, Claude, Ollama local) |
| Chưa có máy mạnh | Dùng first-tier API trước, thử open-weights local (Gemma, Llama, gpt-oss) sau |

**Một câu chốt:** Hello World chain là ví dụ nhỏ nhất nhưng chứa đủ mạch prompt → model → response để mang theo suốt section.

## Câu hỏi tự kiểm tra

1. Input và output của Hello World chain là gì?
2. Section này dạy theo phương pháp nào?
3. Liệt kê 5 building blocks sẽ học trong section.
4. Vì sao giảng viên vừa dùng GPT-5 vừa demo Llama/Gemma 3?
5. Chain Hello World liên quan gì tới tuyên bố "switch models like socks" ở Bài 006?

<details><summary><b>Xem đáp án</b></summary>

**1. Input và output là gì?**

Input là đoạn text thông tin về Elon Musk; output là bản tóm tắt kèm cool facts do LLM sinh ra.

**2. Phương pháp dạy?**

Learn by doing: build chain thật, khái niệm nào cần thì giới thiệu tới đó thay vì học lý thuyết trước.

**3. 5 building blocks?**

prompt templates, prompts, chat models, chains, debugging và tracing LLM applications.

**4. Vì sao dùng cả GPT-5 và Llama/Gemma 3?**

GPT-5 là first-tier model mặc định cho chất lượng cao; Llama/Gemma 3 local chứng minh cùng một chain có thể đổi chat model mà interface code giữ nguyên — đúng tinh thần decouple khỏi vendor.

**5. Liên quan gì tới "switch models like socks"?**

Hello World chain là minh chứng thực hành: chỉ cần thay chat model (OpenAI, Gemini, Claude, Ollama) là chain chạy với vendor khác, không phải viết lại logic.

</details>

## Bước tiếp theo

Bài 008 — *Project Setup* — clone repo, dựng môi trường Python bằng UV và cấu hình API keys.
