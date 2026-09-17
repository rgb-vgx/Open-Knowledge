---
title: 'Bài 031 — Đổi model và bài học benchmark'
course: 'langchain'
lesson: 31
status: edited-verified
source: '031 - Model Switch.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 031 — Đổi model và bài học benchmark

> Nguồn: `031 - Model Switch.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Chứng minh đổi vendor chỉ bằng một string trong `init_chat_model`.
- So sánh trace Qwen3 local với OpenAI trên LangSmith.
- Hiểu vì sao đổi dễ vẫn chưa đủ cho production.
- Nắm bài học benchmark model trước khi chốt model cho agent.
- Chuẩn bị sang Layer 2 làm raw không LangChain.

## 1. Đổi từ Qwen3 sang OpenAI chỉ bằng một string

1. Giảng viên quay lại code Layer 1, chỗ đang dùng model Qwen3.
2. Tìm tới nơi init LLM bằng `init_chat_model` với ollama.
3. Muốn dùng vendor khác, ví dụ OpenAI, thì viết OpenAI và tên model muốn dùng, ví dụ GPT-5, thế là xong.
4. Chạy lại code, agent vẫn chạy đúng:
   - Iteration 1 chọn đúng tool, lấy tool result.
   - Iteration 2 chọn đúng tool apply discount, ra final answer.
5. Điểm nhấn sư phạm: tất cả những gì cần làm để đổi model là thay string.

## 2. Kiểm chứng trên LangSmith

1. Mở trace mới nhất trên LangSmith.
2. Thấy node gọi `chat_openai` thay vì Ollama như trước.
3. Giảng viên nhắc: chạy được như vậy vì đã cài `langchain_openai` trong virtual environment từ bài setup.
4. Trong trace thấy latency của agent run, số tokens dùng, price (cost) và answer của GPT-5.
5. Đây là minh chứng trực quan cho tính tiện lợi của abstraction.

## 3. Vì sao LangChain cất cánh nhờ abstraction này

1. Giảng viên nhận xét: đây là một trong những lý do LangChain took off.
2. Thực tế đây là một trong những open-source package đầu tiên, nếu không nói là đầu tiên, tạo layer abstractions quanh LLM.
3. Lợi ích single interface này chính là thứ production cần khi model mới ra liên tục.

## 4. Đổi dễ vẫn chưa đủ cho production

1. Giảng viên chuyển giọng: dù switch models chỉ bằng string rất tiện, nhưng thế là chưa đủ cho production-grade applications.
2. Demo phản ví dụ: model đang dùng là GPT-5, tại thời điểm quay video không còn là state-of-the-art, đã có GPT-5.2.
3. Đổi sang GPT-5.2 rồi chạy lại thì nhận insufficient result.
4. Cụ thể agent trả lời lạc đề: hỏi lại nên lookup laptop product nào trong catalog, thay vì tính giá sau discount.
5. Bài học rút ra:
   - Switch models dễ không có nghĩa model mới sẽ capable cho use case của mình.
   - Model SOTA nói chung chưa chắc là model tốt nhất cho agent cụ thể.
   - Trước khi switch phải benchmark, phải examine và xem model có work well với agent run của mình không.
6. Evaluations cho việc này sẽ được cover sau trong khóa học.
7. Giảng viên mở trace LangSmith của lần chạy GPT-5.2 lỗi để cho thấy agent thực sự không perform như muốn, và cho biết sẽ share cả hai traces (bản chạy đúng và bản lỗi) trong resources.

## 5. Quay lại Qwen3 và hẹn Layer 2

1. Cuối video giảng viên revert code về dùng ollama Qwen3 như trước.
2. Hẹn video tiếp theo: triển khai đúng agent loop đó nhưng không dùng LangChain objects, không dùng LangChain chat models hay tool decorators.
3. Mọi thứ làm raw với Ollama SDK.
4. Mục đích: bóc thêm một lớp abstraction — chat model abstraction — để thấy hết heavy lifting mà LangChain đang làm cho developers.

> Câu chốt: đổi model dễ chỉ giải bài toán tích hợp, còn bài toán chất lượng phải giải bằng benchmark và evaluations.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Đổi `init_chat_model("ollama:...")` sang `"openai:..."` là chạy, cần provider package đã cài | Docs Models xác nhận identifier `provider:model` + kwargs, cùng object dùng solo hoặc trong agent | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Trace LangSmith cho thấy node chat model, latency, tokens, cost | Docs LangSmith Observability: onboarding account + key, review workflows thấy runs | Vẫn đúng | https://docs.langchain.com/langsmith/observability |
| GPT-5 / 5.2 là tên model tại thời điểm quay | Tên model thay đổi nhanh theo vendor, cần check model catalog mới nhất, không hardcode theo video | Đã đổi | https://docs.langchain.com/oss/python/langchain/models |
| SOTA nói chung chưa chắc tốt nhất cho agent cụ thể, cần evals | Docs Agents hiện tại nhấn mạnh middleware, retries, human approval, evals cho production | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |

### Code cập nhật (nếu có)

Không đổi logic. Cách viết hiện nay:

```python
llm = init_chat_model("ollama:qwen3:1.7b")
# đổi vendor:
llm = init_chat_model("openai:gpt-5")
```

Tên model cụ thể kiểm tra lại theo provider tại thời điểm dùng, transcript nêu GPT-5/5.2 chỉ còn giá trị lịch sử.

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| `init_chat_model` | Một string đổi được vendor |
| LangSmith trace | Nơi kiểm chứng model mới có chạy đúng không |
| Switch dễ | Giải bài toán tích hợp |
| Benchmark/evals | Giải bài toán chất lượng production |
| SOTA | Chưa chắc hợp nhất cho agent cụ thể |

**Câu chốt: đừng nhầm tiện lợi tích hợp với đảm bảo chất lượng — đổi model xong phải đo lại.**

## Câu hỏi tự kiểm tra

1. Để đổi từ Ollama sang OpenAI cần sửa mấy chỗ?
2. Vì sao code đổi vendor chạy được ngay?
3. Trace LangSmith cho thấy những gì sau khi đổi model?
4. Ví dụ GPT-5.2 lỗi chứng minh điều gì?
5. Trước khi switch model cho production cần làm gì?

<details><summary><b>Xem đáp án</b></summary>

1. Một chỗ: string trong `init_chat_model`.
2. Vì provider package đã cài từ đầu và LangChain cung cấp single interface.
3. Node chat model mới, latency, tokens, cost, answer của model mới.
4. Model SOTA hơn vẫn có thể fail use case cụ thể, đổi dễ không đảm bảo đúng.
5. Benchmark và evaluations trên agent run của mình.

</details>

## Bước tiếp theo

Sang Bài 032 — Layer 2: tự viết JSON schema tay so với `@tool` abstraction, thấy rõ chi phí đổi vendor khi làm raw.
