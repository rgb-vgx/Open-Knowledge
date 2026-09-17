---
title: 'Bài 034 — Recap Layer 1 và Layer 2'
course: 'langchain'
lesson: 34
status: edited-verified
source: '034 - Recap.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://react-lm.github.io/'
---

# Bài 034 — Recap Layer 1 và Layer 2

> Nguồn: `034 - Recap.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Tóm lại hành trình Layer 1: agent loop bằng LangChain objects.
- Tóm lại Layer 2: cùng agent loop nhưng raw với Ollama SDK.
- Khẳng định function calling không phải magic mà là structured API.
- Hiểu vì sao phải bóc tiếp Layer 3 bằng prompting thuần túy.
- Liên hệ tới cách agent đời đầu triển khai trước khi có function calling.

## 1. Nhắc lại mục tiêu của cả Layer 2

1. Giảng viên mở đầu: chỉ muốn quay lại implementation và reiterate mục tiêu của video và implementation này.
2. Toàn bộ mục tiêu là bắt đầu bóc LangChain abstractions để thấy nó làm gì, vì sao làm, và giải quyết problem nào.
3. Tới giờ đã đi qua Layer 1: học agent loop là gì và tự triển khai bằng LangChain objects.
4. Sau đó thấy rõ LangChain objects làm gì under the hood, implement cái gì, giải quyết problem gì, và vì sao chúng được tạo ra.

## 2. Điểm chung của cả hai implementations: function calling

1. Ở cả implementation 1 (LangChain) và implementation 2 (raw Ollama) đều dùng function calling.
2. Nghĩa là đều rely vào LLM để select relevant tool.
3. Đáp án nhận từ LLM ở dạng rất đẹp (very nice API), structured format: lấy function name và arguments rồi execute trong application.
4. Đây là điểm khiến agent loop gọn: không phải parse text tự do, chỉ cần đọc trường có cấu trúc.

## 3. Function calling không phải magic

1. Giảng viên nhấn mạnh một câu: Function calling is not magic.
2. Layer tiếp theo — cũng là deepest layer khi nói về agents — là hiểu function calling hoạt động under the hood ra sao.
3. Cách học ở video sau: bóc thêm một lớp abstraction của function calling, replicate hành vi function calling từ LLM nhưng chỉ dùng prompting.
4. Toàn bộ sẽ làm bằng prompting, theo giảng viên thì rất cool.

## 4. Hẹn Layer 3: thời agent đời đầu

1. Ngày trước khi agents mới được giới thiệu, mọi thứ làm theo cách prompting này.
2. Đó là first implementations của AI agents.
3. Biết hết các layers of abstractions này sẽ cho hiểu biết rất sâu về chuyện gì xảy ra khi agent chạy.
4. Bài này không có code mới, chỉ chốt mạch Layer 1-2 trước khi xuống sâu nhất.

> Câu chốt: hiểu function calling chỉ là bước giữa — muốn hiểu tới gốc thì phải xem thời chưa có function calling, agent sống bằng prompt ra sao.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Layer 1 = agent loop bằng LangChain objects, Layer 2 = cùng loop raw bằng Ollama SDK | Docs Agents: agent là model gọi tools theo vòng lặp tới khi xong; Docs Models: solo use tự execute + append ToolMessage, embedded use tự động | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| Cả hai bản đều dùng function calling, LLM trả name + args dạng structured để app execute | OpenAI docs: model trả object có name + JSON arguments, app chạy code rồi append function_call_output gắn call_id | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Function calling là evolution từ ReAct prompt để reliable hơn | Trang ReAct gốc: Thought → Action → Observation xen kẽ; function calling là cách vendor fine-tune để trả JSON đúng schema thay vì parse text | Vẫn đúng | https://react-lm.github.io/ |

### Code cập nhật (nếu có)

Không có code mới. Giữ nguyên 2 file đối chiếu:

```python
# Layer 1: llm_with_tools.invoke(messages) -> ai_msg.tool_calls
# Layer 2: ollama_chat(messages) -> response.message.tool_calls
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Layer 1 | Agent loop + LangChain objects |
| Layer 2 | Agent loop + raw SDK + JSON schema tay |
| Function calling | LLM trả structured name + args, app execute |
| Layer 3 sắp tới | Replicate function calling bằng prompting thuần túy |

**Câu chốt: bóc tới đây mới thấy function calling cũng chỉ là một abstraction — bài sau sẽ tháo nốt nó.**

## Câu hỏi tự kiểm tra

1. Mục tiêu của Layer 2 là gì?
2. Điểm chung của 2 implementations đã làm là gì?
3. Vì sao agent loop gọn khi dùng function calling?
4. Layer tiếp theo sẽ làm gì?
5. Vì sao cần học cách agent đời đầu triển khai?

<details><summary><b>Xem đáp án</b></summary>

1. Bóc LangChain abstractions, thấy nó làm gì và giải quyết problem gì.
2. Cùng dùng function calling, rely vào LLM select tool.
3. Vì LLM trả structured name + args, không phải parse text tự do.
4. Bóc function calling, replicate bằng prompting thuần túy.
5. Vì đó là first implementations, hiểu nó mới hiểu gốc của mọi abstraction phía trên.

</details>

## Bước tiếp theo

Các Bài 035, 036, 037, 038, 039, 039a trong thư mục Layer 3 hiện transcript rỗng nên bỏ qua. Sang thẳng Bài 040 — intro section function calling / tool calling, trước Bài 041 lý thuyết chi tiết.
