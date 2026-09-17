---
title: 'Bài 026 — Lý thuyết tổng quan agent loop ReAct'
course: 'langchain'
lesson: 26
status: edited-verified
source: '026 - Theory The Gist of ReACT.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://react-lm.github.io/'
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://developers.openai.com/api/docs/guides/function-calling'
---

# Bài 026 — Lý thuyết tổng quan agent loop ReAct

> Nguồn: `026 - Theory The Gist of ReACT.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Nắm vòng lặp agent (agent loop) còn gọi là ReAct loop / ReAct algorithm.
- Hiểu 3 bước Thought, Action, Observation qua ví dụ laptop + gold discount.
- Hiểu vì sao prompt gửi cho LLM phải kèm mô tả tools và lịch sử (scratchpad).
- Biết điều kiện dừng vòng lặp: LLM quyết không gọi tool nữa thì trả đáp án.
- Liên hệ tới agent hiện đại như Claude Code, Gemini CLI, Codex, Devin.

## 1. Agent loop là gì, vì sao quan trọng

1. Giảng viên mở đầu: agent loop còn được gọi là ReAct loop hay ReAct algorithm, dùng thay thế cho nhau.
2. Đây là thuật toán nền tảng cho các agent hiện đại nhất: Claude Code, Gemini CLI, Codex, Devin.
3. Thuật toán khá đơn giản nhưng rất mạnh.
4. Lịch sử: xuất phát từ paper ReAct — Synergizing Reasoning and Acting in Language Models, hợp tác giữa Princeton University và Google research engineers, công bố 2023.
5. Paper này đặt nền móng cho mọi modern agent ngày nay; giảng viên cũng đã cover paper này ở phần prompt engineering theory.

## 2. Khung cảnh ví dụ: giá laptop sau gold discount

1. Sơ đồ trong video mô tả đầy đủ agent algorithm; mọi thứ trong hộp gọi là agent loop.
2. Bắt đầu từ user query, kết thúc khi trả answer.
3. Ví dụ: user hỏi giá laptop sau khi áp gold discount, agent phải trả đúng giá cuối.
4. Để làm được, agent cần chọn đúng 2 tools: tool lấy giá, rồi tool áp discount lên giá đó.
5. Đây là mạch ví dụ sẽ lặp lại suốt section.

## 3. Bước 1 — Thought: LLM quyết định gọi tool hay trả lời

1. Bước đầu của agent loop gọi là thought: lấy user query, quyết định gọi tool nào, hoặc trả answer nếu đã đủ thông tin.
2. Thực hiện bằng năng lực của large language models: gửi một prompt tới LLM.
3. Prompt gồm system message (thông tin chung về agent) và phần quan trọng nhất: thông tin về toàn bộ tools mà LLM được phép dùng.
4. LLM xử lý và output là việc tiếp theo cần thực thi: hoặc một tool call, hoặc câu trả lời.
5. Đường nét đứt tới output trong sơ đồ chỉ xảy ra khi LLM thấy không cần gọi tool nào.
6. Cách LLM quyết định gọi tool nào: nhờ tính năng function calling của LLM, ngày nay rất giỏi việc này; chi tiết under the hood sẽ học ở các lớp sau.

## 4. Bước 2 — Action: application thực thi tool

1. Output của LLM cho biết tool nào cần chạy — còn gọi là action.
2. Việc chạy tool diễn ra trong application của ta, không phải trong LLM.
3. LLM chỉ trả về string: tên function + arguments, ví dụ `get_product_price(product=laptop)`.
4. Application lấy quyết định đó và thực thi code thật.
5. Trong ví dụ: agent quyết định gọi tool lấy giá laptop, application chạy và thu kết quả.

## 5. Bước 3 — Observation: kết quả tool trở thành lịch sử

1. Kết quả của tool thường gọi là observation.
2. Sau khi có observation, ta feed mọi thứ trở lại cho LLM, bao gồm toàn bộ history — transcript gọi là trackpad (nghe là scratchpad trong tài liệu ReAct gốc).
3. Iteration 2: prompt gửi cho LLM gồm câu hỏi gốc + giá sản phẩm vừa tra được.
4. Nhờ đó LLM quyết định gọi tiếp `apply_discount` với observation từ vòng trước.
5. Application chạy tool discount, thu observation mới là giá cuối.
6. Iteration 3: gửi toàn bộ hội thoại + lịch sử tool đã chạy cho LLM; lúc này LLM thấy đã đủ thông tin nên không gọi tool nữa mà trả final answer.

```
User query --> [Thought: LLM + tools + history] --> Action (chạy tool trong app)
     ^                                                        |
     |________________ Observation feed back ________________|
     |-- hết tool cần gọi --> trả Answer
```

> Câu chốt của giảng viên: toàn bộ cấu trúc chỉ là vòng `while` hỏi LLM, lấy reasoning (tool call hoặc answer), chạy tool trong app, lặp lại tới khi LLM tự quyết dừng.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| ReAct paper 2023 Princeton + Google, Thought-Action-Observation xen kẽ | Trang ReAct gốc: interleaved reasoning traces + task-specific actions, Thought → Action → Observation, prompt 1-2 demo, thử nghiệm HotpotQA/FEVER, ALFWorld +34, WebShop +10 | Vẫn đúng | https://react-lm.github.io/ |
| Agent = vòng while prompt LLM, LLM trả tool call hoặc answer | Docs LangChain hiện tại: agent là model gọi tools theo vòng lặp tới khi task xong; Agent = Model + Harness | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| LLM chỉ trả tên hàm + args, app thực thi, kết quả là observation feed back | OpenAI function calling docs: model trả object có name + JSON arguments; app chạy code, append function_call_output gắn call_id rồi hỏi tiếp | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Thought dùng function calling, chi tiết under the hood học sau | Docs LangChain Models + Ollama: `bind_tools`, response chứa `tool_calls`, solo use phải tự execute rồi append ToolMessage | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |

### Code cập nhật (nếu có)

Không có code mới. Sơ đồ vòng lặp viết gọn theo docs hiện tại:

```python
messages = [system, user]
for _ in range(max_iterations):
    ai_msg = llm_with_tools.invoke(messages)
    if not ai_msg.tool_calls:
        return ai_msg.content
    messages.append(ai_msg)
    for tc in ai_msg.tool_calls:
        observation = tools[tc["name"]].invoke(tc["args"])
        messages.append(ToolMessage(observation, tool_call_id=tc["id"]))
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| ReAct loop | Thought → Action → Observation, lặp tới khi đủ thông tin |
| Thought | Prompt LLM kèm mô tả tools + history để quyết định |
| Action | App thực thi tool theo name + args mà LLM trả về |
| Observation | Kết quả tool, feed back thành history cho vòng sau |
| Điều kiện dừng | LLM không còn tool_calls thì trả final answer |

**Câu chốt: agent hiện đại nào cũng chỉ là vòng lặp reasoning + acting này, khác nhau ở harness và model.**

## Câu hỏi tự kiểm tra

1. Agent loop còn có tên gọi nào khác?
2. Paper ReAct của ai, năm nào?
3. Prompt ở bước Thought gồm những gì?
4. Ai thực thi tool, LLM hay application?
5. Khi nào vòng lặp dừng?

<details><summary><b>Xem đáp án</b></summary>

1. ReAct loop / ReAct algorithm.
2. Princeton + Google, 2023, Synergizing Reasoning and Acting in Language Models.
3. System message + mô tả toàn bộ tools + lịch sử các vòng trước.
4. Application thực thi; LLM chỉ trả tên hàm + arguments.
5. Khi LLM quyết không cần gọi tool nào nữa thì trả answer.

</details>

## Bước tiếp theo

Sang Bài 027 — setup môi trường: uv, langchain, langchain-ollama, langchain-openai, python-dotenv, Ollama + Qwen3 1.7B, LangSmith tracing.
