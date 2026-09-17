---
title: 'Bài 181 — Agent Middleware là gì'
course: 'langchain'
lesson: 181
status: edited-verified
source: '181 - What is Agent Middleware.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [middleware, agent-loop, harness, fastapi, tool-call]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 181 — Agent Middleware là gì

> Nguồn transcript: `181 - What is Agent Middleware.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (đã đối chiếu một phần qua WebFetch; không bịa thêm ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích middleware trong web (FastAPI/Express) bằng ví dụ authentication, rate limiting, logging.
2. Nêu điểm khác cốt lõi giữa request web (đường thẳng) và agent loop (vòng lặp).
3. Kể tên các checkpoint mà agent middleware có thể chèn vào.
4. Định nghĩa middleware theo cách giảng viên chốt: hành vi chạy nhất quán, tách khỏi business logic lõi.

---

## 1. Middleware trong web: bài học từ FastAPI/Express

Ai từng làm web với **FastAPI** hay **Express** đều đã gặp middleware. Bài toán gốc:

- Muốn log mọi request, authenticate mọi user, rate limit mọi endpoint.
- Cách ngây thơ: nhét logic này vào từng endpoint → **duplicate code**, sau này sửa rất cực, không phải best practice.
- Best practice: dùng **middleware** — mọi request đều đi xuyên qua middleware trước khi tới application.

Middleware có thể **inspect, modify, reject, hoặc cho request đi tiếp**. Khi application sinh response, response cũng đi qua middleware rồi mới trả về client.

Ví dụ luồng trong transcript:

```
Request --> Auth middleware (đã login chưa?)
        --> Rate-limiting middleware (quá nhiều request?)
        --> Logging middleware (ghi log)
        --> Endpoint
```

> Ý chốt: middleware xử lý các **concern áp dụng cho toàn bộ application**, thứ mà mọi endpoint đều cần, không riêng endpoint nào.

## 2. Agent không đi đường thẳng: agent loop

Middleware trong LangChain lấy cảm hứng mạnh (heavily inspired) từ ý tưởng trên, nhưng có một khác biệt:

- **Web request:** đường thẳng đơn giản — request vào, endpoint chạy, response ra.
- **AI agent:** chạy trong **agent loop**. User gửi request → agent gọi LLM → LLM quyết định gọi tool nào → agent execute tool → kết quả trả về model → model xem có cần tool nữa không → lặp tới khi ra final answer.

Hệ quả: **một user request có thể sinh ra rất nhiều model calls và tool calls**. Vì vậy agent middleware cần **nhiều hơn một checkpoint**:

1. Chạy **trước khi toàn bộ agent bắt đầu**.
2. Chạy **trước mỗi lần gọi model**.
3. Chạy **sau mỗi model response**.
4. **Wrap mọi tool call** — chèn logic trước và sau tool call.
5. Chạy **khi agent kết thúc**.

> Middleware cho ta quyền kiểm soát điều gì xảy ra ở **mọi stage quan trọng của agent loop**, và LangChain cho đúng sự linh hoạt đó.

## 3. Định nghĩa chốt của giảng viên

> Middleware là cơ chế đặt **hành vi phải chạy nhất quán** ở khắp nơi, **mà không nhúng nó vào business logic lõi của agent**.

Bài này dừng ở định nghĩa + use cases khái quát; ví dụ cụ thể (context, reliability, cost, security) nằm ở Bài 182.

---

## 4. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại |
|---|---|---|
| Middleware web: inspect/modify/reject request, xử lý concern toàn cục (auth, rate limit, logging) | VẪN ĐÚNG | Quy ước chung của FastAPI/Express; transcript chỉ dùng làm analogy |
| Agent loop: user → LLM → tool → LLM... tới final answer; một request sinh nhiều model/tool calls | VẪN ĐÚNG | Docs Agents mô tả Agent = Model + Harness, model dùng tools lặp tới khi xong việc — https://docs.langchain.com/oss/python/langchain/agents |
| Checkpoint: trước agent, trước/sau mỗi model call, wrap tool call, sau agent | VẪN ĐÚNG | Docs Claude Code liệt kê hooks tương ứng: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop... — https://code.claude.com/docs/en/hooks |

> Hộp cập nhật 2026-09-17: Docs LangChain 1.x và Claude Code đặt tên checkpoint khác nhau (middleware vs hooks/events) nhưng tập checkpoint khớp với transcript. Transcript không nêu tên API/hàm cụ thể nên không có code cập nhật.

---

## 5. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| Middleware web | Logic chung cho mọi request (auth, rate limit, log) |
| Agent loop | Vòng lặp LLM ↔ tool tới final answer |
| Checkpoint agent | Trước agent, trước/sau model call, quanh tool call, sau agent |
| Định nghĩa chốt | Hành vi nhất quán, tách khỏi business logic lõi |

**Chốt: web là đường thẳng một checkpoint, agent là vòng lặp nhiều checkpoint — middleware bao hết các checkpoint đó.**

---

## 6. Câu hỏi tự kiểm tra

1. Vì sao nhét auth/rate limit vào từng endpoint là bad practice?
2. Middleware web có thể làm gì với request và response?
3. Agent loop khác web request ở điểm nào?
4. Kể 5 checkpoint của agent middleware theo transcript.
5. Định nghĩa middleware theo câu chốt của giảng viên?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Gây duplicate code ở mọi endpoint, khó bảo trì, không phải best practice; middleware gom một chỗ.

**2.** Inspect, modify, reject hoặc cho đi tiếp (request); response cũng đi qua middleware trước khi trả client.

**3.** Web là đường thẳng (request → endpoint → response); agent là vòng lặp (LLM ↔ tool nhiều vòng tới final answer), một request sinh nhiều model/tool calls.

**4.** Trước cả agent; trước mỗi model call; sau mỗi model response; wrap mỗi tool call (trước + sau); sau khi agent xong.

**5.** Cơ chế đặt hành vi phải chạy nhất quán mà không nhúng vào core business logic của agent.

</details>

## 7. Bước tiếp theo

Sang Bài 182 — *Middleware Usecases: Security and Reliability* — các use case khiến middleware làm harness tốt hơn.
