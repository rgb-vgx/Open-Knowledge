---
title: 'Bài 041 — Lý thuyết function calling cho LLM'
course: 'langchain'
lesson: 41
status: edited-verified
source: '041 - Theory Understanding Function Calling for LLMs.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://developers.openai.com/api/docs/guides/function-calling'
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://react-lm.github.io/'
---

# Bài 041 — Lý thuyết function calling cho LLM

> Nguồn: `041 - Theory Understanding Function Calling for LLMs.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Định nghĩa function calling aka tool calling: model sinh structured function call thay vì plain text.
- Hiểu lịch sử OpenAI giới thiệu function calling năm 2023 và cách cung cấp function definitions.
- Nắm luồng 5 bước: gửi tools, nhận JSON name + args, app execute, feed observation, hỏi tiếp.
- So sánh ưu nhược điểm với ReAct prompt: reliable, tiết kiệm tokens, nhưng reasoning mờ (opaque).
- Biết thêm capability thứ hai: structured output ra Pydantic object cho downstream.

## 1. Định nghĩa trong một câu

1. Giảng viên (Eden) mở đầu: đây là video strictly theoretical, hands-on sẽ tới rất sớm.
2. Function calling hay tool calling là khả năng của model sinh ra structured function call tới external function kèm arguments.
3. Thay vì chỉ generate plain text, model generate well-structured answer rất dễ parse.
4. Answer này nằm ở vị trí rất đặc biệt (very special place) trong response từ LLM, tách khỏi generation content thông thường.
5. Lưu ý quan trọng: function calling là capability của certain LLMs, không phải LLM nào cũng support.
6. Nhưng ngày nay đây gần như standard của SOTA models, có thể mặc định assume các big vendors như OpenAI, Anthropic, Google khi release SOTA model sẽ support function calling.

## 2. Lịch sử và cách hoạt động

1. Function calling / tool calling được OpenAI giới thiệu năm 2023.
2. Developers chỉ cần cung cấp cho model list of function definitions gồm names, parameters, descriptions.
3. LLM có thể chọn respond bằng JSON object chỉ định function nào cần call và với arguments nào nếu cần.
4. Behind the scenes: đây là model được fine-tuned để detect khi nào nên invoke function dựa trên user request, rồi format response thành valid JSON đúng function schema.
5. Ví dụ trong video: user hỏi what's the weather in Paris cho LLM đã bind function get weather.
6. LLM respond JSON với name là get current weather, arguments là location Paris và unit Fahrenheit hoặc Celsius.
7. Application lấy JSON này parse, thực thi function get current weather đã tồn tại trong app.
8. Lấy response của function plug ngược lại LLM rồi tiếp tục vòng lặp.

## 3. Động lực ra đời: ReAct prompt thiếu reliable

1. Giảng viên đặt câu hỏi: động lực để vendors implement function calling chính là react prompt đã học.
2. ReAct prompt rất cool nhưng không reliable: đôi khi output bad output khó parse, program fails, gặp nhiều problems.
3. Function calling reliable và deterministic hơn: all heavy lifting do LLM vendor làm, trả về JSON object rất dễ làm việc.
4. Giảng viên hẹn các video sau dive sâu hơn vào khác biệt function calling với react prompt.

## 4. Hai capabilities chính

1. Capability 1: connect LLM tới external tools.
2. Capability 2: lấy structured output từ LLM — tận dụng reasoning để extract thông tin vào fields nhất định, trả về organized JSON đúng ý muốn.
3. Từ JSON này có thể convert thành Pydantic object rồi downstream trong application, rất reliable.
4. Giảng viên cho biết cũng đã cover structured output trong khóa học.

## 5. Ưu điểm của function calling

1. Structured và reliable integration:
   - Output là machine-readable JSON với function name và arguments cụ thể, rất dễ parse, ít bị misinterpretation hơn ReAct prompt.
   - Model under the hood đã fine-tuned để adhere function schema strictly, giảm random formatting errors kiểu ReAct prompt.
   - Cách tiếp cận này clean, efficient, cho tool usage mạnh và reliable.
2. Rất easy on tokens:
   - Không output chain-of-thought dài như các sections trước, không có high reasoning-intensive prompting.
   - Model có thể skip verbose explanations, chỉ return function call.
3. Nhờ vendors như OpenAI, Google, Anthropic đã perfected function calling nên có answers reliable hơn nhiều, đủ để build robust AI agents và AI applications.

## 6. Nhược điểm duy nhất: opaque reasoning

1. Giảng viên thấy chỉ một drawback, và nó totally worth it: opaque reasoning process.
2. Khi model quyết call function, nó thường làm vậy mà không expose chain-of-thought.
3. Reasoning nằm internal trong LLM; developers chỉ thấy final function name và arguments, không thấy justification, không hiểu vì sao nó làm vậy.
4. Function calling giống black box decision, không có intermediate rationale expose ra.
5. Điều này khiến debugging và auditing quyết định của model khó hơn vì không thấy vì sao chọn function đó với arguments đó.
6. Dù vậy, de facto function calling giờ là standard, nobody thực sự dùng ReAct prompt gốc nữa, ai cũng dùng function calling features của LLMs.

> Câu chốt: đánh đổi một chút transparency để lấy reliability và structured output — đó là lý do function calling thắng ReAct prompt ở production.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Function calling = tool calling, model sinh structured call thay vì plain text ở field riêng | OpenAI docs: definitions trong `tools` dùng JSON schema, model trả call objects type function_call với name + JSON arguments | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| OpenAI giới thiệu 2023, dev cung cấp names, parameters, descriptions | OpenAI docs hiện tại mở rộng thêm `strict` mode, `tool_choice`, `parallel_tool_calls`, `allowed_tools`, streaming deltas, custom tools, namespace | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Model fine-tuned để detect khi invoke và trả valid JSON đúng schema | OpenAI docs: `strict` mode aims for schema-adherent calls, Responses tries to normalize to strict | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Luồng ví dụ weather Paris: JSON name + location/unit, app execute rồi feed back | OpenAI docs 5 phases: gửi prompt + tools, nhận calls, chạy local code, append function_call_output gắn call_id, hỏi tiếp | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Hai capabilities: nối external tools + structured output ra Pydantic | Docs LangChain Models: `bind_tools` cho tool calling, `response_format` cho validated output trong `create_agent` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Ưu: structured, ít lỗi format, tiết kiệm tokens; Nhược: opaque reasoning khó debug | Trang ReAct gốc vẫn ghi notes giúp review/fix bằng cách edit notes; function calling giấu chain-of-thought nên trade-off này vẫn đúng | Vẫn đúng | https://react-lm.github.io/ |
| Mọi SOTA vendor đều support, có thể assume | Cần check variant cụ thể, ví dụ Ollama chỉ variant gắn cờ capable; model mới như GPT-6 Astra yêu cầu Responses API | Đã đổi | https://docs.langchain.com/oss/python/integrations/chat/ollama |

### Code cập nhật (nếu có)

Không đổi logic. Minh họa control mới theo docs hiện tại:

```python
llm_with_tools = llm.bind_tools(
    [get_weather],
    tool_choice="auto",
    parallel_tool_calls=False,
)
```

Các flags `tool_choice`, `parallel_tool_calls`, `strict` schema là bổ sung mới so với thời điểm quay video, dùng khi cần ép model gọi tool hoặc chặn gọi song song.

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Function calling | Model trả structured name + args ở field riêng |
| Lịch sử | OpenAI 2023, dev cung cấp definitions, model fine-tuned trả JSON đúng schema |
| Luồng | Gửi tools → nhận calls → app execute → append output → hỏi tiếp |
| Ưu điểm | Reliable, dễ parse, tiết kiệm tokens |
| Nhược điểm | Opaque reasoning, khó debug/audit |

**Câu chốt: function calling là chuẩn de facto cho agent production vì biến reasoning thành JSON máy đọc được.**

## Câu hỏi tự kiểm tra

1. Function calling khác plain text generation ở điểm nào?
2. Ai giới thiệu function calling, năm nào, dev cần cung cấp gì?
3. Kể luồng ví dụ get weather Paris.
4. Hai capabilities chính của function calling là gì?
5. Đánh đổi lớn nhất khi dùng function calling là gì?

<details><summary><b>Xem đáp án</b></summary>

1. Sinh structured function call ở field riêng trong response, rất dễ parse, thay vì text tự do.
2. OpenAI, 2023; cung cấp list function definitions gồm names, parameters, descriptions.
3. Hỏi thời tiết Paris → JSON name get current weather + location/unit → app parse, execute, feed kết quả lại LLM.
4. Nối external tools và lấy structured output (ra Pydantic cho downstream).
5. Opaque reasoning: chỉ thấy name + args, không thấy justification nên khó debug/audit, nhưng xứng đáng.

</details>

## Bước tiếp theo

Hết transcript có nội dung trong phạm vi. Các file quiz và Layer 3 rỗng đã liệt kê ở báo cáo cuối. Tiếp tục sang section sau của khóa học (ngoài phạm vi sub-agent này).
