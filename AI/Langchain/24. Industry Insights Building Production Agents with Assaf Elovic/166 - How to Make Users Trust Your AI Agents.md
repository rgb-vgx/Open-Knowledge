---
title: "Bài 166 - FAIR và Niềm tin vào Agents"
course: "LangChain"
lesson: "166"
status: "edited-verified"
source: "166 - How to Make Users Trust Your AI Agents.md"
verified_date: "2026-09-17"
langchain_version: "FAIR score, LangChain 2026, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["FAIR", "trust", "explainability", "transparency", "feedback-loops", "evals"]
doc_refs: ["https://docs.smith.langchain.com/", "https://docs.langchain.com/"]
---

# Bài 166 — FAIR: Làm User Trust Agents

> Bài học được biên soạn từ transcript "How to Make Users Trust Your AI Agents". Khách mời: Assaf Elovic, đồng coin scoring FAIR cùng Harrison, CEO LangChain.

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Phân biệt reliable kỹ thuật với reliable trong cảm nhận user.
2. Kể 4 chữ FAIR: explainability, transparency, feedback loops, evals.
3. Giải thích vì sao feedback loop là underrated critical factor.
4. Giữ đúng thuật ngữ Anh: FAIR, explainability, transparency, feedback loops, evals, black box.

## 2. Kiến thức cốt lõi

### Reliability có hai mặt

- Nhiều tài liệu dạy làm agent stable về kỹ thuật, nhưng ít nói làm sao user feel reliable.
- FAIR là scoring mechanism Assaf coin cùng Harrison để đo cảm nhận trust này.

### Bốn trụ FAIR

1. **Explainability:** user biết giải thích agent đi tới task hay action đó bằng cách nào. Agents là black box; sai mà không hiểu vì sao thì mất trust.
2. **Transparency:** show đang dùng gì behind the scenes để ra action đó.
3. **Feedback loops:** cho feedback ngược lại agent để lần sau tốt hơn. Biết vì sao sai mà không có đường feedback thì không thể reliable over time; giống cách làm việc với con người. Đây là underrated critical factor.
4. **Evals:** phía developer và company có bộ evals riêng, test liên tục mỗi lần deploy version mới cho core critical cases.

## 3. Ví dụ và diễn giải

- Agent book nhầm vé: có explainability thì user thấy nó hiểu sai ngày nào; có transparency thì thấy nó dùng calendar nào; có feedback loop thì sửa một câu lần sau nhớ; có evals thì case book vé không bao giờ regress.
- Thiếu feedback loop giống sếp chỉ chê mà không cho nhân viên sửa quy trình: lỗi lặp lại.
- Thiếu evals giống release không test: core cases đổ lúc nào không biết.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangSmith evals](https://docs.smith.langchain.com/), [docs.langchain.com](https://docs.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- FAIR là framework quan điểm của khách mời, giữ trung thành transcript, không biến thành chuẩn docs.

> **Hộp cập nhật:** khi có mạng, tìm công bố FAIR scoring của Assaf và Harrison để bổ sung định nghĩa chính thức.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vấn đề | Reliable kỹ thuật chưa đủ, cần user feel reliable |
| FAIR | Explainability, transparency, feedback loops, evals |
| Underrated | Feedback loops để cải thiện over time |
| Phía dev | Evals cho core cases mỗi deploy |
| Analogy | Đối xử với agent như với con người |

**Một câu chốt:** User tin agent khi hiểu nó, thấy nó và dạy được nó.

## 6. Câu hỏi tự kiểm tra

1. FAIR gồm những chữ nào?
2. Vì sao black box làm mất trust?
3. Vì sao feedback loop underrated mà critical?
4. Evals phục vụ ai?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Explainability, transparency, feedback loops và evals.

**2.** Vì user không hiểu vì sao agent ra action sai nên không thể tha thứ hay sửa.

**3.** Vì hiểu sai mà không có đường feedback thì agent không thể tốt dần theo thời gian.

**4.** Developer và company để test core critical cases mỗi lần deploy version mới.

</details>

## 7. Bước tiếp theo

Bài 167 — *Lean AI Feedback Loop* — xem vòng feedback một ngày việc bằng Markdown files và middleware.

Nguồn: transcript gốc `166 - How to Make Users Trust Your AI Agents.md`; [LangSmith](https://docs.smith.langchain.com/).
