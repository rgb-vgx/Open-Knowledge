---
title: 'Bài 030 — Vòng lặp ReAct agent bằng LangChain'
course: 'langchain'
lesson: 30
status: edited-verified
source: '030 - Understanding the ReAct Agent Loop in Langchain.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/langsmith/observability'
---

# Bài 030 — Vòng lặp ReAct agent bằng LangChain

> Nguồn: `030 - Understanding the ReAct Agent Loop in Langchain.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Cài vòng lặp agent từ iteration 1 tới max iterations với thought — action — observation.
- Biết cách đọc `tool_calls` từ AI message và nhận biết final answer.
- Xử lý defensive khi LLM trả nhiều tool calls cùng lúc.
- Append AI message + ToolMessage để giữ history cho vòng sau.
- Đọc trace LangSmith để đối chiếu code với sơ đồ ReAct.

## 1. Khung vòng lặp từ 1 tới max iterations

1. Giảng viên triển khai agent loop bằng cách iterate từ 1 tới `max_iterations + 1`.
2. Bắt đầu từ 1 thay vì 0 chỉ để khi đếm iteration cho dễ đọc, không có ý nghĩa thuật toán.
3. Mỗi iteration gửi messages hiện tại cho LLM — đây là thought process.
4. LLM quyết định có cần execute tool hay không.
5. Nếu cần thì execute tool, lấy result gửi ngược lại LLM, tiếp tục iterations.
6. Vòng lặp chỉ dừng khi LLM không còn tool call, tức đã có answer.
7. Trước mỗi vòng có print số iteration; demo chạy với 10 iterations.

## 2. Thought step: gọi LLM đã bind tools

1. Gọi LLM with tools bằng cách invoke với toàn bộ messages, nhận về AI message.
2. AI message chứa một trong hai thứ: quyết định tool call, hoặc content là answer khi không muốn execute tools.
3. Trích trường `tool_calls` từ AI message ra biến riêng.
4. Nếu `tool_calls` rỗng thì LLM cho rằng không cần execute tool.
5. Khi đó print final answer, print content của AI message, return content khỏi hàm.
6. Giảng viên debug breakpoint ở iteration 1: messages gồm system message + user input; AI message có content là thought process và có `tool_calls`.

## 3. Trích tool call đầu tiên và defensive programming

1. Debug cho thấy LLM chọn `get_product_price` với `product=laptop`.
2. Vì `tool_calls` không rỗng nên không vào nhánh return, chuyển sang xử lý tool call.
3. Giảng viên làm defensive programming: LLM ngày nay có thể trả nhiều tool calls cùng lúc, nhưng vì đơn giản chỉ lấy phần tử đầu tiên của list.
4. Từ tool call đầu tiên trích 3 thứ: tên tool cần execute, arguments dict, tool call id để tracing.
5. Print tool được chọn kèm arguments để có visibility.
6. Bảng trích xuất:

| Trường | Ví dụ trong video |
|---|---|
| name | `get_product_price` |
| args | `{product: laptop}` |
| id | tool call id để map với ToolMessage sau |

## 4. Execute tool và tạo observation

1. Lấy tên tool tra vào tools dictionary đã dựng ở Bài 029 để lấy function object.
2. Biến này là Python LangChain tool, có thể chạy bằng method `invoke`.
3. Nếu tra không thấy thì raise error vì đây là debug, có gì sai phải lộ ra.
4. Nếu có thì invoke tool với arguments vừa trích, kết quả gọi là observation.
5. Print observation là tool result.
6. Debug breakpoint ở iteration 1 cho thấy: LLM chọn đúng tool, function chạy thành công, biến observation giữ giá trị laptop (ví dụ 1299).
7. Tới đây đã dùng LLM như reasoning agent, lấy output của nó chạy tool cần chạy.

## 5. Append history để LLM nhớ kết quả

1. Muốn LLM nhớ kết quả thì mỗi iteration phải append cả reasoning của agent lẫn result của tool vào messages.
2. Append AI message chứa tool call, ví dụ quyết định gọi `get_product_price`.
3. Append tiếp tool result dưới dạng ToolMessage kèm observation và tool call id để tracing.
4. Khi feed back toàn bộ steps, mỗi lần agent xử lý input đều thấy quá khứ mình đã làm gì — đây chính là thứ tạo nên agentic capability.
5. Vòng lặp kỳ vọng LLM sẽ finish ở điểm nào đó và không còn tool call, đó là tín hiệu có final answer.

## 6. Nhánh max iterations và trace chạy thật

1. Nếu LLM không bao giờ dừng thì list messages phình to dần, chạy đủ 10 lần rồi dừng.
2. Khi đó print error maxed out on iterations và return nothing.
3. Chạy toàn bộ và xem trace trong logs với câu hỏi giá laptop sau gold discount:
   - Iteration 1: tool call `get_product_price(product=laptop)`, execute được 1299.
   - Iteration 2: có thêm result vòng trước, agent chọn `apply_discount` với tier gold và price vừa nhận, execute ra đáp án.
   - Iteration 3: không còn tool call, return answer là giá sau discount.
4. Giảng viên gọi đây chính là react loop.

## 7. Đọc lại trace trên LangSmith

1. Refresh LangSmith, mở trace cuối cùng.
2. Thấy lần đầu gọi Ollama với tools `get_product_price`, `apply_discount`; input có system prompt + user input; response chọn `get_product_price`.
3. Application execute tool với `product=laptop`, có trace riêng vì dùng LangChain `@tool` decorator nên tự động trace function — đây là cái tiện của LangChain.
4. Lần gọi LLM thứ hai thấy input gồm system message, human message cũ, AI message chứa thought + tool call trước, và ToolMessage chứa observation.
5. Tool call id ở ToolMessage khớp với id ở AI message — quan trọng cho tracing khi có lỗi.
6. Response LLM chứa reasoning và tool calls mới gọi `apply_discount` với id mới và arguments.
7. Execute tool, rồi gọi LLM lần ba kèm result, lần này không có tool call nên là final answer.
8. Toàn bộ nest dưới một trace, latency 11 giây, tốn 2.4k tokens.
9. Bài tập giảng viên giao: lấy diagram react loop đối chiếu từng đoạn code — đâu là thought, đâu là tool invocation, khi nào LLM quyết có final answer, implementation cho từng nhánh state machine là gì.
10. Chốt Layer 1: những gì `create_agent` làm cũng là logic tương tự vòng lặp lean này; khác biệt là ta dùng LangChain objects (tools, chat model, Human/System/ToolMessage) nên trực quan và dễ làm; video sau sẽ làm raw không LangChain để thấy LangChain giải quyết vấn đề gì.

> Câu chốt: append đúng AI message + ToolMessage kèm id thì LLM mới thấy quá khứ; sai khâu này là agent mất trí nhớ.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Gọi `llm_with_tools.invoke(messages)` nhận AI message có `tool_calls`, rỗng thì là final answer | Docs Models: `bind_tools` xong output mang requested calls; solo use tự execute rồi append ToolMessage cho inference tiếp | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Chỉ lấy tool call đầu tiên vì đơn giản, thực tế có thể nhiều calls | OpenAI docs: model có thể trả zero, one, or many call objects; control bằng `parallel_tool_calls`, `tool_choice` | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Tra dict `name -> tool` rồi `tool.invoke(args)` | Docs Models: helpers gắn `@tool` rồi `bind_tools`, solo use tự execute functions và append results | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Append AI message + ToolMessage kèm tool_call_id để giữ history và tracing | Docs Agents: agent là model gọi tools theo vòng lặp tới khi xong; OpenAI docs gắn observation với `call_id` cụ thể | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| `@tool` decorator tự trace trên LangSmith, nest dưới `@traceable` thấy tokens/runtime | Docs LangSmith Observability: onboarding account + key, review workflows; nesting giúp cộng dồn cost | Vẫn đúng | https://docs.langchain.com/langsmith/observability |

### Code cập nhật (nếu có)

Không đổi logic. Dạng gọn theo docs hiện tại:

```python
for i in range(1, MAX_ITERATIONS + 1):
    ai_msg = llm_with_tools.invoke(messages)
    tool_calls = ai_msg.tool_calls
    if not tool_calls:
        return ai_msg.content
    tc = tool_calls[0]
    tool_to_use = tools_dict[tc["name"]]
    observation = tool_to_use.invoke(tc["args"])
    messages.extend([ai_msg, ToolMessage(str(observation), tool_call_id=tc["id"])])
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Thought | `invoke(messages)` lấy AI message + `tool_calls` |
| Rỗng `tool_calls` | Tín hiệu final answer, return content |
| Action | Tra dict theo name, `invoke(args)` lấy observation |
| Memory | Append AI message + ToolMessage kèm id cho vòng sau |
| Guard | Max iterations chống vòng lặp vô hạn |

**Câu chốt: vòng lặp ReAct với LangChain chỉ là invoke, kiểm tra `tool_calls`, chạy tool, append history, lặp lại.**

## Câu hỏi tự kiểm tra

1. Vì sao vòng lặp bắt đầu từ 1 thay vì 0?
2. Khi nào hàm return final answer?
3. Vì sao chỉ lấy tool call đầu tiên?
4. Cần append những gì vào messages sau mỗi tool execution?
5. Tool call id dùng để làm gì?

<details><summary><b>Xem đáp án</b></summary>

1. Chỉ để đếm iteration cho dễ đọc, không ảnh hưởng logic.
2. Khi `tool_calls` rỗng, content của AI message là answer.
3. Để ví dụ đơn giản, dễ tiêu hóa; thực tế LLM có thể trả nhiều calls.
4. AI message chứa tool call + ToolMessage chứa observation và tool call id.
5. Map observation với đúng tool call đã sinh ra nó, phục vụ tracing và debug.

</details>

## Bước tiếp theo

Sang Bài 031 — đổi model từ Qwen3 sang OpenAI chỉ bằng một string và bài học vì sao đổi dễ vẫn cần benchmark.
