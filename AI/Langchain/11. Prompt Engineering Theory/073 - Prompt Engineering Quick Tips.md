---
title: "Bai 073 - Prompt Engineering Quick Tips"
course: langchain
lesson: 73
status: edited-verified
source: "073 - Prompt Engineering Quick Tips.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; tips on dinh"
categories: [AI]
tags: [prompt, context, task-definition, iteration]
doc_refs: ["https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", "https://docs.langchain.com/oss/python/langchain/prompt-templates"]
---

# Bài 073 — Prompt Engineering Quick Tips

> Nguồn transcript: `073 - Prompt Engineering Quick Tips.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Thêm contextual relevance để model khỏi phải đoán bối cảnh.
2. Viết task rõ ràng, không ambiguous, kèm mục tiêu đo được.
3. Áp dụng specificity và iteration để mài prompt tới lúc ưng ý.
4. Hiểu vì sao đầu tư thời gian viết prompt lại tiết kiệm thời gian chung.

---

## 2. Nội dung chính theo mạch transcript

Các tips này là low-hanging fruit: siêu dễ gắn vào mà cải thiện rõ rệt.

### 2.1. Tip 1 — Cho context

Context cho prompt tính contextual relevance để sinh câu trả lời coherent và accurate. Không cho context là khoán cho LLM tự bịa context, dễ off-topic, irrelevant, inconsistent.

Ví dụ: yêu cầu model break down prompt `generate a list of technical interview questions for a senior DevOps engineer position in a tech startup in a fast-paced culture working in the cloud`. Model đủ thông minh để label đâu là task, đâu là context. Câu hỏi mẫu `how would you handle a sudden spike in traffic...` đủ sâu để nói nửa tiếng đến 2 tiếng — giảng viên xác nhận từng dùng khi phỏng vấn DevOps. Kết luận: càng nhiều contextual relevance, kết quả càng tốt.

### 2.2. Tip 2 — Task rõ ràng, không mơ hồ

Task definition phải đặt goal cụ thể cho LLM, nếu không model tự chọn giùm.

Ví von đi chợ mua táo: vợ bảo mua táo mà không nói táo xanh hay đỏ, to hay nhỏ thì chồng mua về kiểu gì cũng bị chê. Prompt engineer giỏi cũng như giao tiếp giỏi — với người và với LLM đều cần concise, clear, non-ambiguous.

Ví dụ xấu: `improve the user experience of this e-commerce website` — không nói cải khía cạnh nào, cải bằng cách nào, đo thành công ra sao, diễn giải kiểu gì cũng được.

Bản sửa: `identify and address specific pain points in the user experience of the e-commerce website to increase customer satisfaction and sales conversion rates` — rõ việc (identify + address pain points), rõ mục tiêu (satisfaction, conversion) làm metric đánh giá. Specificity càng cao, response càng targeted và accurate.

### 2.3. Tip 3 — Iteration

Iteration là lặp đi lặp lại, mỗi vòng chỉnh một chút cho tốt hơn — thực hành chuẩn trong software và sách The Lean Startup. Với prompt: refine, test, đánh giá output, lấy output vòng trước làm đầu vào vòng sau, đến khi có perfect prompt cho perfect result.

Takeaway đóng video: đừng vội gõ nhanh rồi enter. Đầu tư thời gian engineer prompt — refine task, thêm context, cụ thể, bớt ambiguous, iterate liên tục — kết quả tốt hơn nhiều và tổng thể tiết kiệm thời gian.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Thêm context cải thiện relevance | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Mọi guide prompt engineering đều khuyên cho context. |
| Task phải clear, specific, có metric | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Chưa fetch full do giới hạn mạng; giữ mạch gốc. |
| Iteration refine-test-evaluate | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/prompt-templates | Khớp vòng đời prompt management trong LangSmith/Pezzo ở bài sau. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Tip | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Context | Cho bối cảnh | Đừng để model đoán |
| Clear task | Goal + metric | Đừng để model tự chọn |
| Iteration | Refine theo output | Mài tới lúc ưng |

**Chốt: Prompt ngon không do gõ nhanh mà do cho đủ context, task rõ không mơ hồ, và iterate tới cùng.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao thiếu context khiến response off-topic?
2. Ví dụ DevOps trong transcript chứng minh điều gì?
3. Prompt improve UX mơ hồ ở những điểm nào?
4. Bản sửa prompt UX đã thêm những gì để đo được?
5. Iteration trong prompt engineering vận hành thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì model phải tự đoán context thay bạn, dễ đoán lệch goal nên trả lời irrelevant hoặc inconsistent.

**2.** Chỉ cần thêm bối cảnh senior DevOps, startup, fast-paced, cloud là model sinh câu hỏi spike traffic đủ sâu để phỏng vấn cả tiếng — context càng giàu, kết quả càng tốt.

**3.** Không nói cải khía cạnh UX nào, cải bằng cách nào, không guideline hay metric đánh giá, diễn giải kiểu gì cũng được.

**4.** Rõ việc identify + address specific pain points, rõ mục tiêu increase satisfaction và conversion rates làm metric cụ thể.

**5.** Lặp lại refine-test-evaluate: mỗi vòng dựa vào output vòng trước để sửa prompt, tới khi có prompt tối ưu đúng ý.

</details>

## 6. Bước tiếp theo

Bài 074 — *Context Engineering* — từ prompt tĩnh sang hệ thống động cấp context đúng cho agent.
