---
title: 'Bài 020 — Agent Suy Nghĩ Thế Nào'
course: 'langchain'
lesson: 20
status: edited-verified
source: '020 - From Query to Answer How a LangChain Agent Thinks.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/tools'
- 'https://docs.langchain.com/langsmith/observability'
---

# Bài 020 — Agent Suy Nghĩ Thế Nào

> Biên soạn từ transcript "020 - From Query to Answer How a LangChain Agent Thinks.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Đọc `result["messages"]`: human input, AI tool-call decision, ToolMessage, AI final answer.
- Giải thích vòng lặp: LLM decide tool → LangChain execute → LLM gọi tiếp kèm tool output.
- Phân biệt ToolMessage với AI message thường.
- So sánh trace GPT-3.5 mặc định và GPT-5 sau khi đổi model.

## 1. Chạy và mở `result` trong debug mode

Mạch transcript:

1. Run file, thấy print từ đầu và print query bên trong search function — query thực gửi là "weather in Tokyo".
2. `result` là dictionary chứa key `messages`, lúc này còn magic — hẹn cuối section sẽ hết magic.
3. Đặt breakpoint, mở `result` trong debug cho nicely:

| Vị trí | Loại message | Nội dung giữ nguyên transcript |
|---|---|---|
| Đầu | human message | Input "what is the weather in Tokyo" |
| Giữa | AI message + tool message | Những gì agent làm để ra đáp án |
| Cuối | AI message | Answer: weather in Tokyo is currently sunny |

## 2. Đọc trace LangSmith — tiêu đề LangGraph

Mở trace của agent execution: title là LangGraph vì underneath the hood internals execute via graph framework — hẹn cover trong khóa học. Mở LLM call đầu (chat openai):

- Input: message "what is the weather in Tokyo".
- LangChain còn gửi kèm information về tools agent has access to và can call — mở model là thấy tool definition đã viết.
- Giảng viên nhấn mạnh terminology: nói "send to LLM list of tools" và "LLM call", không nói agent — vì đang ở granularity của LLM call.

Với query trên, LLM decided invoke search tool với query "weather in Tokyo", kèm tool calling ID. Lưu ý: LM response lúc này không phải invocation mà là which tool to call và with which arguments, thực hiện qua function calling — how works under the hood hẹn section này và sau.

## 3. Vòng lặp reasoning engine + execution runtime

```mermaid
LLM decide tool+args ──> LangChain execute function ──> ToolMessage ──> LLM call tiếp (input + decision + tool output) ──> final answer
```

Chi tiết giữ nguyên transcript:

1. Sau khi LLM decide, LangChain went invoked search tool với query — thấy ngay trong trace, response là static string "Tokyo weather is sunny" đã define.
2. Preview quan trọng: ta có reasoning engine decide which tool với which arguments, và agent execution runtime goes execute tools lấy output.
3. LangChain makes another LLM call, lần này chứa input + LLM decision + answer sau executing tool — nên LLM rất easy generate answer.
4. Tool result structured trong ToolMessage object — data structure represent result of tool execution, ở đây là result of search tool.
5. Final LLM call không choose execute tool nữa mà return answer vì had all information needed.

> Tóm lại theo lời giảng: messages giờ making more sense — input, AI decision, ToolMessage, rồi final answer.

## 4. Đổi sang GPT-5 và đọc trace mới

Đổi model sang GPT-5, run lại — slower hơn GPT-3.5 turbo. Trace mới very similar, difference duy nhất là model name GPT-5. Transcript còn note thú vị: default model lúc quay (7/11/2025) là GPT-3.5 chứ không phải GPT-5. Cuối video giảng viên nói sẽ add more meat cho search agent ở video tiếp.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Agent execution là LangGraph under the hood, title trace là LangGraph | `create_agent` powered bởi underlying graph framework; harness assembly từ model + tools | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| LLM nhận input + tool definitions, trả tool calls qua function calling rồi LangChain execute | Docs: model calling tools in loop; harness "get the model the right context at the right time" | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Tool result nằm trong ToolMessage, LLM call cuối kèm full history ra final answer | Execution giữ message record (human, AI, tool), tiếp tục qua thread + checkpointer | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Trace để đọc input/output, tool execution, tokens | Run logs là records of live behavior cho troubleshooting và quality oversight | Vẫn đúng | [LangSmith observability](https://docs.langchain.com/langsmith/observability) |

Code cập nhật (nếu có): giữ code gốc transcript (Bài 019). Cách đọc kết quả version mới:

```python
result = agent.invoke({"messages": [HumanMessage(content="what is the weather in Tokyo")]})
messages = result["messages"]
# messages[0]: HumanMessage input
# messages[1]: AIMessage với tool_calls
# messages[2]: ToolMessage kết quả tool
# messages[-1]: AIMessage final answer
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Agent trả về trông như magic | Mở `messages`: input → AI decision → ToolMessage → final answer |
| Không biết LLM thấy gì khi decide | Trace LLM call: input + tool definitions, output là which tool + args |
| Ai thực sự chạy function | Agent execution runtime của LangChain, không phải LLM |
| LLM sao trả lời đúng sau tool | LLM call cuối nhận full history nên chỉ việc synthesize answer |

**Một câu chốt:** Agent thinking là vòng lặp decide bằng LLM, execute bằng runtime và lặp lại với full history cho tới khi đủ thông tin trả lời.

## Câu hỏi tự kiểm tra

1. `result["messages"]` gồm những message nào theo thứ tự?
2. Vì sao giảng viên nói "send to LLM" chứ không nói "send to agent" ở bước này?
3. ToolMessage là gì?
4. Vì sao LLM call cuối dễ dàng ra đáp án đúng?
5. Trace GPT-3.5 và GPT-5 khác nhau ở điểm nào?

<details><summary><b>Xem đáp án</b></summary>

**1.** Human message input, AI message chứa decision gọi search tool, ToolMessage chứa "Tokyo weather is sunny", và AI message cuối là final answer.

**2.** Vì đang ở granularity của LLM call — mới equip LLM với tool để nó choose, chưa nói tới cả agent loop.

**3.** Data structure represent result of tool execution — ở đây là output của search tool sau khi runtime chạy function với arguments LLM đã chọn.

**4.** Vì chứa input + decision gọi tool + tool execution result — LLM có mọi information needed nên không cần gọi tool nữa mà return answer.

**5.** Very similar, difference duy nhất là model name; GPT-5 slower hơn GPT-3.5 turbo nhưng trace structure giữ nguyên.

</details>

## Bước tiếp theo

Bài 021 — *Integrating Real-World Search with Tavily and LangChain Tools* — thay tool tĩnh bằng search thật và tool built-in của Tavily.
