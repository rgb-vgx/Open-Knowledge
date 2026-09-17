---
title: 'Bài 182 — Use case của Middleware: Security và Reliability'
course: 'langchain'
lesson: 182
status: edited-verified
source: '182 - Middleware Usecases Security and Reliability.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [middleware, harness, context-engineering, reliability, security, pii, authorization, cost-control]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 182 — Use case của Middleware: Security và Reliability

> Nguồn transcript: `182 - Middleware Usecases Security and Reliability.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (đã đối chiếu một phần qua WebFetch; không bịa thêm ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 4 nhóm use case middleware: context engineering, reliability, cost control, security/governance.
2. Giải thích middleware thay đổi thứ model thấy ở mỗi call ra sao.
3. Nêu các kỹ thuật reliability: retry, exponential backoff, fallback model, format lỗi tool.
4. Mô tả PII middleware và tool authorization đặt sát protected action.
5. Nhớ ý chốt: phần lớn công việc harness là xây đúng middleware/hooks.

---

## 1. Context engineering: đổi thứ model thấy ở mỗi call

Use case đầu tiên: **context engineering** — middleware thay đổi **what the model can see for every call**.

Các việc liệt kê trong transcript:

1. Thêm **user-specific instructions**.
2. **Chọn model** theo độ phức tạp task.
3. **Expose đúng tools** relevant với user.
4. **Summarize old messages** (ví dụ Claude Code có middleware/hook tóm tắt và compact conversation trong implementation nội bộ).
5. Inject thêm **application logic**.

Tất cả diễn ra tại **mọi lifecycle event quan trọng** của agent run/agent loop — những nơi ta có thể edit và control context.

## 2. Reliability: retry, backoff, fallback, làm đẹp lỗi

Middleware chứa code tăng **reliability** của application:

- **Retry** model failures tạm thời; retry khi **rate limited (429)**; retry khi tool failing.
- **Exponential backoff**.
- **Fallback sang model khác**.
- Biến **raw tool call exception** thành message gọn gàng hơn.

> Middleware reliability = lớp đệm giữa sự cố thoáng qua và trải nghiệm người dùng.

## 3. Cost control: đếm và dừng

Trong agent application và harness engineering, **cost là major concern**. Middleware có thể:

- Track agent đã chạy bao lâu, bao nhiêu tool calls.
- Khi chạm ngưỡng (ví dụ gọi model **100 lần** trong một run mà chưa có answer) → **stop execution**.

## 4. Security và governance: safe zone của giảng viên

Giảng viên tự nhận đây là **safe zone** (vùng yêu thích). **Middleware là natural policy enforcement point**, công cụ tăng **security posture** của agent.

Hai ví dụ trọng tâm:

**PII middleware** — inspect **user input, model output, cả tool result**; theo policy thì **block, redact, hoặc pass through** thông tin nhạy cảm.

**Tool authorization middleware** — trước khi execute sensitive tool, kiểm tra:

1. User này có được dùng tool không?
2. Operation này có permitted không?
3. Arguments cho tool có safe không?
4. Action này có cần **human approval** không?

> Nguyên tắc placement: security check đặt **càng gần protected action càng tốt** (as close as possible to the protected action).

Giảng viên cho biết ông đi rất sâu chủ đề AI agent security trong **agent security course** riêng, và mọi solution ở đó đều implement qua **LangChain middleware**.

---

## 5. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại |
|---|---|---|
| Middleware đổi context mỗi model call (instructions, model selection, tools, summarize) | VẪN ĐÚNG | Docs Agents mô tả harness cung cấp background đúng lúc qua extensions/middleware — https://docs.langchain.com/oss/python/langchain/agents |
| Claude Code có hook summarize/compact conversation | VẪN ĐÚNG | Docs Hooks có PreCompact/PostCompact events cho compaction lifecycle — https://code.claude.com/docs/en/hooks |
| Retry 429, backoff, fallback model, format tool exception | VẪN ĐÚNG | Docs Agents liệt kê nhóm middleware automatic retries cho transient model/function failures — https://docs.langchain.com/oss/python/langchain/agents |
| PII middleware block/redact/pass; authorization check sát protected action, cần human approval | VẪN ĐÚNG | Docs Agents liệt kê nhóm policy screening (email masking) và pauses for human review trước sensitive ops — https://docs.langchain.com/oss/python/langchain/agents |

> Hộp cập nhật 2026-09-17: Tên nhóm middleware trong docs 1.x có thể khác transcript (workspace, compression, parallel helpers, retries, policy, human review), nhưng 4 nhóm use case trong transcript vẫn bao phủ đủ. Transcript không có code nên không có code cập nhật.

---

## 6. Tóm tắt một trang

| Nhóm use case | Middleware làm gì |
|---|---|
| Context engineering | Instructions, chọn model, expose tools, summarize, inject logic |
| Reliability | Retry, 429 backoff, fallback model, format lỗi |
| Cost control | Đếm calls, chạm ngưỡng thì dừng |
| Security | PII block/redact/pass; authorization + human approval sát action |

**Chốt: phần lớn công việc xây harness là xây đúng middleware/hooks — context đúng, chạy bền, tốn ít, và an toàn.**

---

## 7. Câu hỏi tự kiểm tra

1. Middleware thay đổi gì trong context engineering?
2. Kể 4 kỹ thuật reliability trong bài.
3. Middleware kiểm soát cost bằng cách nào? Ví dụ số trong transcript?
4. PII middleware inspect những gì và ra quyết định gì?
5. Tool authorization check 4 câu hỏi nào, và đặt ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thứ model thấy ở mỗi call: user-specific instructions, chọn model theo task, expose tools relevant, summarize old messages, inject application logic — tại mọi lifecycle event quan trọng.

**2.** Retry model failures tạm thời/429/tool failing; exponential backoff; fallback model khác; format raw tool exception thành message gọn.

**3.** Track thời gian/số tool calls, chạm ngưỡng thì stop execution; ví dụ gọi model 100 lần chưa có answer thì dừng.

**4.** Inspect user input, model output, tool result; theo policy thì block, redact hoặc pass through.

**5.** User được dùng tool? Operation permitted? Arguments safe? Cần human approval? Đặt càng gần protected action càng tốt.

</details>

## 8. Bước tiếp theo

Sang Section 30 — *Agent Security Foundations*, Bài 183 — thay đổi của software engineering và bối cảnh cho mọi lo ngại security.
