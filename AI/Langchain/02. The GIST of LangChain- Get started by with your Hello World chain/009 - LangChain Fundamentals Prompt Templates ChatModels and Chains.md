---
title: 'Bài 009 — Prompt Templates Chat Models Chains'
course: 'langchain'
lesson: 9
status: edited-verified
source: '009 - LangChain Fundamentals Prompt Templates ChatModels and Chains.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/tools'
- 'https://docs.langchain.com/oss/python/integrations/chat/openai'
---

# Bài 009 — Prompt Templates Chat Models Chains

> Biên soạn từ transcript "009 - LangChain Fundamentals Prompt Templates ChatModels and Chains.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Giải thích prompt và prompt template khác nhau ở điểm nào.
- Mô tả chat model như primary interface để nói chuyện với LLM.
- Định nghĩa chain và runnable theo LangChain Expression Language (LCEL).
- Biết thói quen đọc source code framework bằng cách click vào tên class.

## 1. Prompt templates — wrapper có tham số quanh prompt

LLM nhận input gọi là prompt — đơn giản là text input đưa vào, LLM xử lý và trả output. Định nghĩa formal có nhiều elements, giảng viên chỉ video lý thuyết riêng.

Khi gọi LLM bằng code, ta muốn một prompt có parameters: lúc thì product là cat food, lúc là piano. Mỗi input khác cho output khác. Abstraction đầu tiên LangChain giới thiệu là prompt template — wrapper class quanh prompt, thêm khả năng nhận input và format thành strings gửi tới LLM.

> Gist: prompt template giúp format things into strings, chạy cùng prompt nhiều lần với inputs khác nhau, và còn nhiều functionality sẽ khám phá dần.

## 2. Chat models — interface chính để gọi LLM

`ChatOpenAI` là chat model, wrapper over OpenAI API. Giảng viên nhấn mạnh đây thường là primary interface để tương tác với LLM — standard way LangChain giúp ta nói chuyện với GPT-4, Anthropic Claude, Google Gemini, thậm chí open-source Llama via Ollama.

Điểm phân biệt lịch sử:

- LLM đời cũ: nhận một string, trả một string.
- Modern LLM cho conversation: nhận list of structured messages (system instruction, user questions, AI responses), trả về một AI message.

Ngoài sinh text giống người, chat model objects còn nhiều capabilities khác — giảng viên hẹn video glossary và thực hành xuyên suốt khóa học, không cần lo ngay.

## 3. Thói quen đọc source code

Giảng viên dặn thói quen tốt nhất của developer là look inside actual source code của framework đang dùng. Cách làm: click command vào tên class (ví dụ `PromptTemplate`, `ChatOpenAI`) để xem implementation và documentation hardcoded trong source. Video này chỉ overview high-level, chưa dive vào implementation.

## 4. Chain — output bước này thành input bước kế tiếp

Định nghĩa giữ nguyên lời giảng:

> Chain là workflow nối nhiều components của LangChain lại với nhau in a sequence, nơi output của một step trở thành input của step tiếp theo.

Mỗi step có thể là LLM call, prompt, data transformation, tool call, thậm chí another chain. Chain cho phép vượt khỏi một LLM call đơn lẻ. Ví dụ composition: format user query thành structured prompt → gửi tới LLM → parse output thành structured data → gọi external API → feed response vào another LLM prompt. Chính ý tưởng composition này khiến LangChain popular — lần đầu cho phép build những thứ phức tạp như agents trên nền LLM.

```
user query ──> structured prompt ──> LLM ──> parse ──> API call ──> LLM ──> final answer
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Chat model là interface chuẩn gọi LLM mọi vendor (`ChatOpenAI` wrapper over OpenAI API) | Setup `from langchain_openai import ChatOpenAI`, model như `gpt-5-nano`, `temperature=0`, auth qua `OPENAI_API_KEY` | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |
| Chat model nhận list messages, trả AI message | Pattern agent hiện nay invoke bằng `{"messages": [...]}` với human/AI messages, kết quả đọc message blocks cuối | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Chain nối components, output bước trước thành input bước sau, compose qua LCEL pipe | Docs 1.x giữ builder `create_agent(model, tools, prompt)` assembly từ model + tools; chain pipe vẫn là cách compose cơ bản | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| `@tool` biến Python function thành tool nhờ docstring + type hints | Import từ `langchain.tools`; docstring là model-facing explanation, type annotations mandatory, tên lowercase underscore | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |

Code cập nhật (nếu có): không có code runnable mới trong bài này — toàn bộ là định nghĩa khái niệm, code chi tiết nằm ở Bài 010.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Prompt cứng, muốn chạy lại với input khác | Prompt template: wrapper có tham số, format thành strings |
| Mỗi vendor gọi LLM một kiểu | Chat models: primary interface chung, input là messages, output là AI message |
| Một LLM call đơn lẻ không đủ | Chain: workflow nối steps, output trước thành input sau |
| Sợ framework là magic | Đọc source trực tiếp bằng cách click vào class name |

**Một câu chốt:** Prompt template lo input động, chat model lo gọi LLM thống nhất và chain lo nối mọi bước thành workflow có thể invoke được.

## Câu hỏi tự kiểm tra

1. Prompt và prompt template khác nhau thế nào?
2. Vì sao modern LLM cần chat model interface thay vì string-in string-out?
3. Chain là gì và mỗi step có thể là những gì?
4. Ví dụ một composition nhiều bước mà chain cho phép?
5. Vì sao giảng viên khuyên đọc source code framework?

<details><summary><b>Xem đáp án</b></summary>

**1.** Prompt là text input gửi LLM; prompt template là wrapper class quanh prompt, thêm khả năng nhận input parameters để format thành strings khác nhau mỗi lần chạy.

**2.** Vì modern LLM thiết kế cho conversation: input tốt nhất là list of structured messages (system, user, AI history), output là AI message — interface string đơn không biểu diễn được hội thoại.

**3.** Chain là workflow nối components in a sequence, output step này thành input step kế tiếp; mỗi step có thể là LLM call, prompt, data transformation, tool call, hoặc another chain.

**4.** Format query thành structured prompt → gửi LLM → parse output thành structured data → gọi external API → feed API response vào another LLM prompt.

**5.** Vì exploring implementations trực tiếp là cách hiểu rõ behind the scenes, hết "magic" — đúng tinh thần khóa học dive vào LangChain source code.

</details>

## Bước tiếp theo

Bài 010 — *Building a LangChain Chain to Summarize Text* — dựng template tóm tắt Elon Musk và nối thành chain bằng LCEL.
