---
title: 'Bài 040 — Intro section function calling'
course: 'langchain'
lesson: 40
status: edited-verified
source: '040 - Intro.md'
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

# Bài 040 — Intro section function calling

> Nguồn: `040 - Intro.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Định vị section mới: đi sâu function calling aka tool calling.
- Hiểu vì sao ReAct prompt dù hay vẫn thiếu reliable cho production.
- Nắm ý tưởng evolution từ ReAct prompt sang function calling.
- Hình dung cách provider trả function call dạng JSON có cấu trúc.
- Chuẩn bị cho Bài 041 lý thuyết chi tiết và các video hands-on sau.

## 1. Bối cảnh sau ReAct prompt

1. Giảng viên (Eden) chào và giới thiệu: section này dive deep vào function calling, aka tool calling, hai terms dùng thay thế nhau.
2. Giả định người học đã quen với react prompt và toàn bộ loop reasoning and acting, thấy nó cool và build được tech rất advanced.
3. Nhưng ReAct prompt không reliable: chỉ cần LLM generate sai một token là toàn bộ response có thể hỏng, vì LangChain phải parse bằng regular expressions.
4. Dù prompt này là basis cho agentic behavior và AI agents, độ reliable thấp là vấn đề lớn.

## 2. Evolution tự nhiên sang production-grade solution

1. Giảng viên gọi function calling / tool calling là natural evolution của ReAct prompt thành production-grade reliable solution.
2. Đây là nội dung sẽ cover trong section: demo và chứng minh kết quả với function calling reliable hơn hẳn ReAct prompt.
3. Best practice hiện nay: dùng function calling khi building AI agents.

## 3. Gist của function calling trong một đoạn

1. Thay vì rely vào ReAct prompt, ta rely vào model provider: Anthropic, Google, OpenAI.
2. Model sẽ output ở một nơi rất đặc biệt (very special place) trong response: function call là JSON đẹp gồm function name và function arguments.
3. Ta hoặc LangChain chỉ cần lấy JSON này parse rất dễ, không cần regular expressions vì bản chất đã là JSON.
4. Chỉ việc access các fields rồi tiếp tục algorithm của AI agent.
5. Kết quả: reliable hơn nhiều so với ReAct prompt.

## 4. Hẹn các video tiếp theo

1. Video này chỉ intro, hands-on và demo chi tiết ở các video sau trong section.
2. Bài tiếp theo (Bài 041) là video lý thuyết strict về khái niệm function calling / tool calling.
3. Mạch học: intro này cho động lực, bài lý thuyết cho định nghĩa, rồi mới tới thực hành so sánh trực diện hai cách.

> Câu chốt: ReAct prompt cho thấy agent có thể làm gì, function calling cho thấy agent có thể làm ổn định ở production.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Function calling = tool calling, dùng thay thế nhau | OpenAI docs dùng chung vocabulary function/tool, definitions trong `tools`, model trả object có name + JSON arguments | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Provider trả function call ở vị trí đặc biệt trong response, JSON gồm name + args, parse không cần regex | OpenAI docs: model trả zero/one/many call objects trong output với type function_call, app chạy code rồi append function_call_output | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| ReAct prompt phải parse bằng regex nên sai một token là hỏng | Trang ReAct gốc: format Thought/Action/Observation xen kẽ, dễ review nhưng đời đầu parse text; function calling là bước fine-tune để trả đúng schema | Vẫn đúng | https://react-lm.github.io/ |
| Best practice hiện nay là dùng function calling cho agents | Docs LangChain Models: flow `@tool` + `bind_tools` là chuẩn cho tool calling agents | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |

### Code cập nhật (nếu có)

Không có code mới. Minh họa luồng theo docs hiện tại:

```python
# 1. gửi prompt + tools
# 2. model trả tool_calls: [{"name": ..., "args": {...}}]
# 3. app execute function
# 4. append observation, hỏi tiếp
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| ReAct prompt | Hay nhưng parse bằng regex, dễ hỏng vì một token sai |
| Function calling | Provider trả JSON name + args ở field riêng, parse dễ |
| Evolution | Từ prompt tự parse sang vendor lo structured output |
| Best practice | Dùng function calling cho agent production |

**Câu chốt: muốn agent từ demo thành production thì phải bỏ parse text tự do, chuyển sang structured function call.**

## Câu hỏi tự kiểm tra

1. Section này học sâu cái gì?
2. Vì sao ReAct prompt thiếu reliable?
3. Function calling rely vào ai thay vì prompt?
4. Function call trả về gồm những gì?
5. Vì sao parse JSON dễ hơn parse ReAct prompt?

<details><summary><b>Xem đáp án</b></summary>

1. Function calling aka tool calling.
2. Vì sai một token là hỏng, LangChain phải parse bằng regular expressions.
3. Model provider như Anthropic, Google, OpenAI.
4. JSON đẹp gồm function name và function arguments ở vị trí riêng trong response.
5. Vì JSON có fields rõ ràng, chỉ cần access fields, không cần regex bắt text tự do.

</details>

## Bước tiếp theo

Sang Bài 041 — lý thuyết function calling cho LLM: định nghĩa, lịch sử OpenAI 2023, ví dụ get weather, ưu nhược điểm và structured output.
