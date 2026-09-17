---
title: "Bài 165 - Kiến trúc Production-Grade AI"
course: "LangChain"
lesson: "165"
status: "edited-verified"
source: "165 - The Core Architecture of Production-Grade AI.md"
verified_date: "2026-09-17"
langchain_version: "AI 2026, LangSmith observability, AI gateway, memory, RAG, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["production", "observability", "AI-gateway", "memory", "RAG", "Tavily"]
doc_refs: ["https://docs.smith.langchain.com/", "https://docs.langchain.com/"]
---

# Bài 165 — Kiến trúc Production-Grade AI cùng Assaf Elovic

> Bài học được biên soạn từ transcript "The Core Architecture of Production-Grade AI". Khách mời: Assaf Elovic, co-founder Tavily, creator GPT Researcher, ex Head of AI monday.com.

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 4 trụ cột production-grade AI: observability, AI gateway, memory và semantic search ranking.
2. Giải thích vì sao observability cho agents khác observability sản phẩm cho người.
3. Nói được AI gateway làm guardrails, permissions, model routing và uptime.
4. Giữ đúng thuật ngữ Anh: observability, AI gateway, guardrails, memory, RAG, semantic search ranking.

## 2. Kiến thức cốt lõi

### Observability cho agents

- Bắt buộc phải có observability, nhưng observability cho agents khác hẳn monitoring cho người bấm buttons trên UI.
- Cần stack trace xem agents định làm gì, đạt gì, xuyên suốt các agents trong production; LangSmith làm tốt việc này.
- Input thường là natural language nên phải hiểu user muốn gì qua ngôn ngữ, agent định làm gì và có succeed không; cả workflow này cần monitoring riêng cho AI agents.

### AI gateway

- Là gateway định nghĩa guardrails, permissions, models, model types, prompt security.
- Đảm bảo uptime khi model bị rate limited hay down bằng smart router biết leverage nhiều models và route theo scale và use case.

### Memory và data context

- Memory là critical: observe, object và monitor memory, cộng cross-company data context.
- Không chỉ lưu hội thoại mà còn ngữ cảnh dữ liệu xuyên công ty để agent hành động đúng.

### RAG đổi tên nhưng việc còn đó

- Semantic search ranking là critical; cái từng gọi là RAG nay đang changing nhưng nhu cầu xếp hạng ngữ nghĩa vẫn nguyên.
- Kiến trúc AI cụ thể custom theo use case từng công ty, transcript chỉ chốt top things phải có.

## 3. Ví dụ và diễn giải

- User gõ tôi muốn refund đơn hôm qua bằng natural language: observability phải map câu đó thành intent, steps agent chạy và success hay fail, chứ không đơn thuần đếm clicks.
- Một model down giữa peak: AI gateway route sang model khác theo scale, user không thấy gián đoạn.
- Agent quên policy công ty vì thiếu cross-company context: lỗi memory và data context, không phải lỗi prompt đơn lẻ.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangSmith](https://docs.smith.langchain.com/), [docs.langchain.com](https://docs.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài là industry insights 2026, giữ trung thành quan điểm khách mời, không chuẩn hóa thành docs kỹ thuật.

> **Hộp cập nhật:** khi có mạng, đối chiếu khái niệm AI gateway, LangSmith observability cho agents và semantic search hiện tại.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Observability | Stack trace agents, hiểu natural language intent và success |
| AI gateway | Guardrails, permissions, models, prompt security, smart routing |
| Memory | Observe và monitor memory, cross-company data context |
| Retrieval | Semantic search ranking, RAG đổi hình nhưng việc còn |
| Tinh thần | Kiến trúc custom theo use case, nhưng 4 trụ cột phải có |

**Một câu chốt:** Production AI đứng được nhờ thấy rõ agent làm gì, chặn đúng chỗ và nhớ đúng context.

## 6. Câu hỏi tự kiểm tra

1. Vì sao observability agents khác monitoring UI thường?
2. AI gateway gồm những gì?
3. Vì sao smart router quan trọng?
4. RAG changing nghĩa là gì trong bài?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì input là natural language và cần stack trace xuyên agents gồm intent, steps và success, chứ không chỉ clicks.

**2.** Guardrails, permissions, models, model types, prompt security và uptime routing.

**3.** Vì models có thể rate limited hay down; router chuyển tải theo scale và use case để giữ uptime.

**4.** Tên gọi thay đổi nhưng semantic search ranking vẫn critical cho production.

</details>

## 7. Bước tiếp theo

Bài 166 — *FAIR: Làm User Trust Agents* — xem explainability, transparency, feedback loops và evals.

Nguồn: transcript gốc `165 - The Core Architecture of Production-Grade AI.md`; [LangSmith](https://docs.smith.langchain.com/).
