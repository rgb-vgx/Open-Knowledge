---
title: 'Bài 033 — Agent loop bằng raw Ollama SDK'
course: 'langchain'
lesson: 33
status: edited-verified
source: '033 - Building a ReAct Agent Loop with the Raw Ollama SDK.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://developers.openai.com/api/docs/guides/function-calling'
---

# Bài 033 — Agent loop bằng raw Ollama SDK

> Nguồn: `033 - Building a ReAct Agent Loop with the Raw Ollama SDK.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Thay `init_chat_model` bằng Ollama chat model raw kèm tracing thủ công.
- Dựng `tools_dict` thủ công thay vì dùng thuộc tính name của LangChain tool.
- Chuyển messages sang dict `role/content` đúng convention Ollama.
- Đọc `tool_calls` từ Ollama chat response dạng object `function.name/arguments`.
- Giữ nguyên vòng lặp ReAct: chạy đúng 3 iterations ra giá cuối 1099 như bản LangChain.

## 1. Thay chat model LangChain bằng Ollama raw có tracing

1. Không dùng `init_chat_model` nữa, chuyển sang Ollama chat model.
2. Vì không còn là LangChain chat model nên mất auto tracing, phải tạo auxiliary function bọc lại để trace.
3. Dùng `@traceable` từ LangSmith đặt tên `ollama chat`, runtime là LLM.
4. Function này nhận list messages, gọi Ollama chat client với model Qwen3, kèm `tools` là JSON scheme đã viết ở Bài 032, và messages cần LLM digest.
5. Giảng viên nhấn mạnh: nếu dùng LangChain thì không cần làm bước này vì có out of the box tracing với LangSmith.

## 2. Dựng `tools_dict` thủ công

1. Ở bản LangChain, dict này dựng bằng cách duyệt tools và đọc thuộc tính name của LangChain tool.
2. Với Ollama raw không có thuộc tính đó nên phải viết tay: `get_product_price` map tới function `get_product_price`, `apply_discount` map tới function `apply_discount`.
3. Phần bind tools với LLM của LangChain không cần nữa vì đã có traced function Ollama chat ở trên.
4. Bài học: mỗi vendor một convention, đổi vendor khi làm raw là viết lại.

## 3. Chuyển messages sang dict đúng convention Ollama

1. Messages không còn là HumanMessage/SystemMessage objects nữa, phải đổi formatting.
2. Thay human message bằng dict `role: user`, `content: question`.
3. Giảng viên lưu ý: ở Ollama role của user gọi là user, nhưng ở một số vendors gọi là human; khi dùng LangChain HumanMessage thì conversion này được lo giúp.
4. Thay toàn bộ system message bằng dict `role: system`, content giữ nguyên prompt defensive từ Bài 029.
5. Nhắc lại: mọi thứ đang làm chỉ đúng cho Ollama; sang Anthropic sẽ là conventions, namings khác; đây chính là lý do cost chuyển vendor khi không dùng LangChain khá cao.

## 4. Thought step kiểu Ollama trong agent loop

1. Tới phần agent loop, thay đoạn thought step cũ bằng kiểu Ollama.
2. Gọi traced function Ollama chat với messages, tức gọi trực tiếp Ollama SDK.
3. Response nhận về là Ollama response, không phải LangChain AI message object.
4. Response có field `message`, giảng viên đặt tên `ai_message`; message này có attribute `tool_calls`, gán vào biến `tool_calls` để chuẩn hóa với implementation cũ.
5. Dừng lại đặt breakpoint chạy debug xem nhận được gì.

## 5. Đọc debug: cấu trúc response khác LangChain

1. Debug cho thấy response là chat response của Ollama, có field messages.
2. Trong message, role là assistant — giảng viên lưu ý ở vendors khác role này có thể gọi là AI.
3. Message có content và `tool_calls`; trong đó là tool calls mà LLM trả về với đầy đủ thông tin như bản LangChain.
4. Nhưng bên trong là Ollama tool call object, cấu trúc khác LangChain tool call object.
5. Đó chính là phần code tiếp theo phải sửa: lấy tên tool và arguments từ response Ollama.
6. Điểm khác lớn: ở Ollama không có tool call id.
7. Ba dòng trích name/args/id cũ được thay bằng hai dòng:
   - Truy cập biến tool call dạng object, đọc attribute `function`.
   - Function có attribute `name` (ví dụ `get_product_price`) và `arguments` (dict ví dụ `product=laptop`).
8. Dòng print tool được chọn giữ nguyên.

## 6. Chạy tool và lan truyền observation kiểu raw

1. Lấy Python function từ dict theo tên — đoạn này không đổi.
2. Muốn run tool lấy observation: không còn runnable interface `invoke` của LangChain nên gọi trực tiếp function với dict arguments.
3. Muốn propagate observation về cho LLM (lan truyền vào ReAct loop): không append LangChain ToolMessage nữa mà append dict `role: tool`, content là observation.
4. Dừng debug, chạy lại toàn bộ với query giá laptop sau gold discount:
   - Thought đầu chọn `get_product_price(product=laptop)`, execute tool.
   - Propagate response (observation) về LLM.
   - Iteration 2 LLM chọn `apply_discount` với arguments đúng, chạy ra đáp án.
   - Iteration 3 không còn tool calls thì finish.
5. Sang LangSmith thấy trace đang tên `LangChain Agent Loop` do quên đổi tên traceable, giảng viên sửa thành `Ollama Agent Loop`, chạy lại, refresh.
6. Trace mới gọi `Ollama Chat` raw SDK, không phải chat Ollama của LangChain; final answer 1099 là đáp án đúng; chạy đúng `get_product_price` rồi `apply_discount`; trace này cũng sẽ share trong resources.
7. Chốt: mọi thứ work như expected.

> Câu chốt: cùng một ReAct loop, bản raw phải tự lo tracing, convention role, cấu trúc tool call và cách append observation — toàn việc LangChain từng làm hộ.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Gọi Ollama chat client với model + messages + tools JSON schema, nhận response có message.tool_calls | Docs Ollama: variant capable mới dùng được, chuẩn OpenAI-compatible, `bind_tools` rồi invoke, response có `tool_calls` gồm id, name, args | Vẫn đúng | https://docs.langchain.com/oss/python/integrations/chat/ollama |
| Role Ollama là user/system/assistant/tool; vendor khác naming khác, LangChain lo conversion | Docs Models duy trì roles system/human/ai/tool và single interface cho mọi model | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Ollama response không có tool call id như LangChain | OpenAI docs hiện tại gắn observation với `call_id` cụ thể; Ollama raw SDK có thể không expose id như LangChain wrapper | Đã đổi | https://developers.openai.com/api/docs/guides/function-calling |
| Không còn `tool.invoke`, phải gọi function trực tiếp với dict args | Docs Models: solo use tự execute functions; embedded use qua LangChain mới có `invoke` interface | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Phải tự bọc `@traceable` vì mất auto tracing của LangChain | Docs LangSmith Observability: onboarding account + key, review runs; bọc thủ công để nest trace | Vẫn đúng | https://docs.langchain.com/langsmith/observability |

### Code cập nhật (nếu có)

Không đổi logic. Dạng raw trong video viết gọn:

```python
response = ollama_chat(messages)  # bọc @traceable, run_type="llm"
tool_calls = response.message.tool_calls
if not tool_calls:
    return response.message.content
tc = tool_calls[0]
name = tc.function.name
args = tc.function.arguments
observation = tools_dict[name](**args)
messages.append({"role": "tool", "content": str(observation)})
```

Cách hiện nay với LangChain (khuyên dùng):

```python
ai_msg = llm_with_tools.invoke(messages)
if not ai_msg.tool_calls:
    return ai_msg.content
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Ollama chat raw | Tự bọc `@traceable` vì mất auto tracing |
| `tools_dict` tay | Map tên string tới function Python |
| Dict messages | `role: system/user/tool` đúng convention Ollama |
| Tool call object | Đọc `function.name` + `function.arguments`, không có id |
| Observation | Append dict `role: tool` thay vì ToolMessage |

**Câu chốt: bản raw chạy đúng nhưng mỗi dòng code đều dính chặt vào một vendor — đó là cái giá của việc bỏ abstraction.**

## Câu hỏi tự kiểm tra

1. Vì sao phải bọc Ollama chat trong `@traceable`?
2. `tools_dict` bản raw khác bản LangChain ở điểm nào?
3. Role user ở Ollama gọi là gì, vì sao cần lưu ý?
4. Tool call Ollama thiếu gì so với LangChain?
5. Observation bản raw được append dưới dạng nào?

<details><summary><b>Xem đáp án</b></summary>

1. Vì không còn auto tracing của LangChain chat model.
2. Phải viết tay từng mapping, không đọc từ thuộc tính name của tool.
3. Là user; vendor khác có thể gọi là human, LangChain từng lo conversion.
4. Thiếu tool call id.
5. Dict `role: tool`, content là observation.

</details>

## Bước tiếp theo

Sang Bài 034 — recap Layer 1 và 2, chốt function calling không phải magic và hẹn Layer 3 bóc tiếp bằng ReAct prompt.
