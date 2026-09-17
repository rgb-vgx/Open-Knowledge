---
title: 'Bài 185 — Velocity vs Safety: quán tính mặc định của agentic dev'
course: 'langchain'
lesson: 185
status: edited-verified
source: '185 - Velocity vs Safety Navigating the Default Incentives of Agentic Dev.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [velocity, safety, guardrails, secure-defaults, sdlc]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 185 — Velocity vs Safety: quán tính mặc định của agentic dev

> Nguồn transcript: `185 - Velocity vs Safety Navigating the Default Incentives of Agentic Dev.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (video quan điểm, không có claim API cần kiểm chứng; giữ đúng ví von transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Mô tả trade-off velocity vs security tồn tại nhiều năm qua theo spectrum công ty.
2. Giải thích vì sao coding agent mới nhận về mặc định nghiêng về velocity.
3. Nêu quan điểm giảng viên: muốn dùng agent an toàn thì phải gắn guardrails.
4. Đánh đổi được thừa nhận: chậm ship hơn nhưng confidence cao hơn.
5. Nhớ câu chốt plan twice, cut once.

---

## 1. Trade-off cũ, bối cảnh mới

Trade-off **velocity versus security** đã tồn tại nhiều năm. Mỗi company/enterprise nằm đâu đó trên spectrum, tùy **culture**:

- **AI native startups** nghiêng về đầu **velocity**.
- Công ty **mature** hơn nghiêng về đầu **safety/security**.

Bản chất trade-off: gắn thêm **security guardrails và mechanisms** vào code trong **software development lifecycle** thì đổi lại **velocity/pace ship sản phẩm** của engineering teams chậm đi.

## 2. Coding agent mặc định nghiêng về velocity

Khi introduce coding agent:

- Mới nhận về, nó **không có guardrail nào** → mặc định nghiêng về phía **velocity**.
- Quan điểm giảng viên: muốn produce secure software và dùng coding agent securely thì **phải gắn thêm guardrails và security mechanisms**.
- Thừa nhận thẳng: việc này **có thể hinder pace ship code**, nhưng **confidence vào code sau đó cao hơn nhiều**.

> Câu chốt kiểu mộc: **plan twice, cut once** — đo hai lần, cắt một lần.

---

## 3. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Ghi chú |
|---|---|---|
| Spectrum velocity (startup) ↔ safety (mature company); agent mới nhận không có guardrail | PHÙ HỢP THỰC TẾ | Quan điểm ngành, không phải claim version |
| Gắn guardrails vào SDLC để dùng agent securely | VẪN ĐÚNG | Khớp hướng docs hiện nay: policy enforcement qua middleware/hooks, human review trước sensitive ops — https://docs.langchain.com/oss/python/langchain/agents, https://code.claude.com/docs/en/hooks |

> Hộp cập nhật 2026-09-17: Không có nội dung lỗi thời. Cách gắn guardrails cụ thể (middleware, hooks, settings) là nội dung các bài 182, 187–189, không nhồi vào bài quan điểm này.

---

## 4. Tóm tắt một trang

| Đầu spectrum | Đại diện | Mặc định |
|---|---|---|
| Velocity | AI native startups, coding agent mới nhận | Ship nhanh, không guardrail |
| Safety | Mature companies, agent đã gắn mechanisms | Ship chậm hơn, confidence cao hơn |

**Chốt: agent mặc định chạy về phía velocity — muốn an toàn thì chủ động kéo nó về phía safety bằng guardrails.**

---

## 5. Câu hỏi tự kiểm tra

1. Spectrum velocity–safety phân bố thế nào theo culture công ty?
2. Trade-off cụ thể là giữa cái gì và cái gì?
3. Vì sao coding agent mặc định nghiêng về velocity?
4. Gắn guardrails được gì, mất gì theo giảng viên?
5. Câu chốt của bài là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** AI native startups nghiêng về velocity; mature companies nghiêng về safety/security.

**2.** Giữa gắn guardrails/mechanisms vào SDLC và giữ velocity/pace ship của engineering.

**3.** Vì lúc mới nhận nó không có guardrail nào.

**4.** Mất: có thể chậm ship hơn; được: confidence vào code cao hơn nhiều.

**5.** Plan twice, cut once.

</details>

## 6. Bước tiếp theo

Sang Bài 186 — *Summary: Attack Surfaces Involved* — hai attack surface (harness và code artifact) cộng supply chain attacks.
