---
title: 'Bài 011 — Debugging Và Tracing Chain'
course: 'langchain'
lesson: 11
status: edited-verified
source: '011 - Debugging and Tracing Our LangChain Chain.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/langsmith/observability'
---

# Bài 011 — Debugging Và Tracing Chain

> Biên soạn từ transcript "011 - Debugging and Tracing Our LangChain Chain.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Đặt breakpoint và chạy debug để soi object `response` của chain.
- Giải thích `AIMessage` và field `content` chứa câu trả lời LLM.
- Đọc `type` và `response_metadata`: model đã dùng, finish reason, tokens tiêu thụ.
- Biết metadata này phục vụ debugging, monitoring và analyzing.

## 1. Đặt breakpoint và chạy debug mode

Mạch transcript rất ngắn, đúng một thao tác:

1. Đặt breakpoint tại dòng sau `chain.invoke`.
2. Run ở debug mode, fast forward tới breakpoint.
3. Mở object `response` để examine.

Giảng viên không giới thiệu tool debug mới — dùng ngay debugger của IDE (đã nói ở Bài 008: chỉ cần chạy và debug code). Mục đích: get a better understanding bằng cách poke around objects thật thay vì đoán.

## 2. `response` là AIMessage, đáp án nằm ở `content`

Kết quả kiểm tra:

- `response` có type là message, cụ thể là AIMessage — simple wrapper class quanh những gì LLM trả về.
- Đáp án LLM generate nằm ở field `content`. Mở field này ra là thấy câu trả lời (bản summary Elon Musk từ Bài 010).

> Muốn lấy text cuối cùng thì đọc `response.content` — quy ước đã dùng khi `print(response.content)` ở Bài 010.

## 3. AIMessage chứa nhiều hơn text

Giảng viên liệt kê những gì AIMessage còn mang theo:

| Field / thông tin | Ý nghĩa giữ nguyên lời giảng |
|---|---|
| tool calling | Thông tin gọi tools (sẽ dùng nhiều khi học agents) |
| tokens consumed | Đã tiêu thụ bao nhiêu tokens |
| cost | Request tốn bao nhiêu (suy từ tokens) |
| `type` | Ở đây là AI — phân biệt với human/system messages |
| `response_metadata` | Model nào đã dùng, finish reason của LLM, số tokens, nhiều metadata khác |

Video này không review hết features — hẹn video messages riêng elaborately discuss mọi message types trong LangChain. Thông điệp giữ nguyên mức mơ hồ của transcript: chỉ cần biết AIMessage chứa answer + metadata, chi tiết sẽ học dần.

## 4. Vì sao metadata quan trọng

Giảng viên chốt hai công dụng:

- **debugging**: biết model nào chạy, vì sao dừng (finish reason), tốn bao nhiêu tokens.
- **monitoring và analyzing**: cùng metadata đó dùng khi vận hành, phân tích chi phí và chất lượng.

Đây chính là cầu nối sang Bài 013 (LangSmith): những gì đang soi thủ công trong debugger, sau này sẽ được trace tự động trên platform.

```
chain.invoke ──> AIMessage ──┬──> content (đáp án)
                             ├──> type = ai
                             └──> response_metadata (model, finish_reason, tokens)
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `invoke` trả về AI message, text nằm ở `content` | Connector Ollama: pass list turns vào `invoke`, nhận về AI message holding text plus details như model name, timing, token counts | Vẫn đúng | [Ollama integration](https://docs.langchain.com/oss/python/integrations/chat/ollama) |
| `response_metadata` có model, finish reason, tokens cho debugging/monitoring | Agent run expose message blocks cuối kèm structured payload; observability suite inspect traces, tool activity, latency | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Metadata dùng cho debugging, monitoring, analyzing | Run logs là records of live agent behavior dùng cho troubleshooting, quality oversight | Vẫn đúng | [LangSmith observability](https://docs.langchain.com/langsmith/observability) |

Code cập nhật (nếu có): giữ code gốc transcript — không có code mới, chỉ thao tác debugger. Cách đọc kết quả trên version mới không đổi:

```python
response = chain.invoke({"information": information})
print(type(response))            # AIMessage
print(response.content)          # đáp án text
print(response.response_metadata)  # model, finish_reason, tokens
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Không biết chain trả về object gì | Debug và mở `response`: đó là AIMessage |
| Chỉ cần text cuối cùng | Đọc field `content` |
| Muốn biết chạy model nào, tốn bao nhiêu | Đọc `type` và `response_metadata` (model, finish reason, tokens) |
| Muốn theo dõi khi lên production | Đưa cùng metadata này lên LangSmith traces |

**Một câu chốt:** Mọi chain đều trả về AIMessage — `content` là đáp án, `response_metadata` là hồ sơ debug và monitoring của request đó.

## Câu hỏi tự kiểm tra

1. Vì sao giảng viên đặt breakpoint thay vì chỉ `print` kết quả?
2. `response.content` chứa gì?
3. Ngoài text, AIMessage còn chứa những gì?
4. `response_metadata` cho biết những gì?
5. Metadata này liên hệ thế nào tới LangSmith ở bài sau?

<details><summary><b>Xem đáp án</b></summary>

**1.** Để examine objects và get better understanding — poke around `response` trực tiếp thay vì chỉ thấy text in ra.

**2.** Chứa answer mà LLM generate — ở đây là short summary về Elon Musk, tức final string gửi tới `print`.

**3.** Còn tool calling info, tokens consumed, cost, `type` (ở đây là AI) và `response_metadata` — video hẹn chi tiết ở messages video riêng.

**4.** Model đã dùng, finish reason của LLM, số tokens tiêu thụ và nhiều metadata hữu ích cho debugging, monitoring, analyzing.

**5.** Những gì đang soi thủ công trong debugger (content, model, tokens, latency) chính là dữ liệu LangSmith sẽ trace tự động out of the box cho mỗi chain run.

</details>

## Bước tiếp theo

Bài 012 — *Using Local Open-Weights Models with LangChain and Ollama* — đổi một dòng code để chạy Gemma 3 local thay vì GPT-5.
