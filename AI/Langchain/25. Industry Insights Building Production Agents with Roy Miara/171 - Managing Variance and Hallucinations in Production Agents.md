---
title: "Bài 171 - Variance và Hallucinations"
course: "LangChain"
lesson: "171"
status: "edited-verified"
source: "171 - Managing Variance and Hallucinations in Production Agents.md"
verified_date: "2026-09-17"
langchain_version: "AI agents 2026, temperature và evals, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["variance", "hallucination", "temperature", "comprehensiveness", "security"]
doc_refs: ["https://docs.langchain.com/"]
---

# Bài 171 — Variance và Hallucinations: Creativity hay Exhaustiveness?

> Bài học được biên soạn từ transcript "Managing Variance and Hallucinations in Production Agents".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao chạy lại coding agent nhiều lần ra nhiều đáp án.
2. Nói được yêu cầu comprehensiveness của security product khác coding thường ra sao.
3. Phân tích đánh đổi high temperature creativity và exhaustiveness.
4. Giữ đúng thuật ngữ Anh: variance, hallucination, temperature, comprehensiveness, best practices.

## 2. Kiến thức cốt lõi

### Variance là bình thường, nhưng security không được miss

- Nhờ coding agents nhiều lần cho feature hay bugfix thường ra multiple answers; với code thường thì okay vì nhiều solutions cùng đúng.
- Autonomous hacker là security product nên không được miss existing vulnerabilities; comprehensiveness là complex problem.

### Đánh đổi creativity và exhaustiveness

- Muốn agent creative phải chạy high temperature, mà high temperature nghĩa là more variance.
- Muốn comprehensive thì phải work hard để balance creativity và exhaustiveness.
- Cách nhiều products làm là bake comprehensiveness sẵn, force system comprehensive theo kịch bản; khi ra real world thì không explore được complex areas nên ultimately lower quality.

### Tension giữa program và freedom

- Security researcher muốn program agent theo best practices dạy human.
- Người build muốn cho agent freedom vì khi bấm nút, agent aware về system hơn người.
- Đây là tension hiện tại: program theo cách mình muốn hay để agent tự quyết best way.

## 3. Ví dụ và diễn giải

- Chạy pentest 3 lần ra 3 attack paths khác nhau: coding task thì chọn path đẹp nhất, security task phải hợp nhất để không sót vuln.
- Ép checklist cứng: agent check đủ OWASP top 10 nhưng bỏ qua logic bug lạ chỉ creative exploration mới thấy.
- Thả tự do hoàn toàn: agent mò ra bug độc nhưng sót lỗi cơ bản vì không exhaustiveness.
- Bài toán production là giữ cả hai: đủ khung để comprehensive, đủ freedom để creative.

## 4. Kiểm chứng với docs mới nhất

- Bài là industry insights, không đối chiếu API docs.
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Giữ trung thành transcript; khái niệm temperature và variance hiểu theo LLM chung, không gắn version cụ thể.

> **Hộp cập nhật:** khi có mạng, đối chiếu best practices kiểm soát temperature, evals comprehensiveness và chống hallucination cho security agents.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Hiện tượng | Chạy lại ra đáp án khác là bình thường |
| Yêu cầu | Security không được miss vulns |
| Đánh đổi | High temperature creative nhưng variance cao |
| Sai lầm phổ biến | Bake comprehensiveness cứng làm mất exploration |
| Tension | Program theo best practices hay cho agent freedom |

**Một câu chốt:** Agent bảo mật giỏi phải vừa không sót cái cũ, vừa dám mò cái mới.

## 6. Câu hỏi tự kiểm tra

1. Vì sao multiple answers okay với code mà không okay với security?
2. High temperature liên quan gì tới variance?
3. Vì sao force comprehensive sẵn làm giảm quality?
4. Tension trong bài là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì code có nhiều solutions cùng đúng, còn security miss một vuln là lỗi sản phẩm.

**2.** High temperature cho creativity nhưng cũng tạo more variance nên khó comprehensive nếu không balance.

**3.** Vì agent chỉ đi theo kịch bản có sẵn, không explore complex areas thực tế nên bỏ sót và kém chất lượng.

**4.** Giữa program agent theo best practices của human và cho agent freedom quyết best way vì nó aware system hơn lúc chạy.

</details>

## 7. Bước tiếp theo

Hết phạm vi 21 tới 25. Sang section tiếp theo ngoài phạm vi hoặc ôn lại chuỗi Deep Agents từ bài 147.

Nguồn: transcript gốc `171 - Managing Variance and Hallucinations in Production Agents.md`.
