---
title: 'Bài 098 — Reflection Agent là gì'
course: langchain
lesson: 98
status: edited-verified
source: '098 - What are we building A Reflection Agent.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript de cap langgraph 0.x; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://langchain-ai.github.io/langgraph/
- https://github.com/langchain-ai/langgraph
---

# Bài 098 — Reflection Agent là gì

> Nguồn: `098 - What are we building A Reflection Agent.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được reflection agent là gì: LLM tự phê bình (reflect) rồi sửa lại output.
2. Mô tả vòng lặp generate → critique → revise lặp đi lặp lại cho tới khi đạt.
3. Nêu được ví dụ xuyên suốt section: sửa tweet về LinkedIn cho hay dần, mục tiêu "viral".
4. Giải thích vì sao code ngắn (dưới 100 dòng): LangGraph gánh phần điều phối luồng.

## 2. Nội dung chính theo mạch transcript

### 2.1. Ý tưởng reflection

- Reflection agent là kỹ thuật nâng chất lượng và tỉ lệ thành công của hệ AI.
- Cách làm: yêu cầu LLM nhìn lại hành động/output trước đó của chính nó, học và cải thiện dần.
- Transcript nhấn mạnh đây là "fascinating world" nhưng bản chất rất thực dụng: thêm bước tự soi lỗi.

### 2.2. Dự án của section: sửa tweet

1. Lấy tweet gốc (ví dụ tweet về LinkedIn).
2. Chạy bước reflection: LLM chê, góp ý, gợi ý cải thiện.
3. Đưa feedback đó trở lại LLM để revise → revision 1.
4. Lặp lại nhiều vòng cho tới khi có tweet "decent, hopefully viral".

### 2.3. Vì sao dưới 100 dòng code

- Giảng viên khẳng định toàn bộ agent chưa tới 100 dòng vì LangGraph lo phần nặng (nodes, edges, state, vòng lặp).

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

> Kiểm chứng ngày 2026-09-17: WebSearch không trả kết quả, WebFetch docs.langchain.com chỉ lấy được trang tổng quan. Các dòng dưới là đối chiếu khái niệm, không khẳng định version mới.

| Khái niệm trong transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Reflection = generate → critique → revise lặp lại | Khớp với mẫu Reflection Agent của LangGraph (hai node generate/reflect + conditional edge). | https://docs.langchain.com/langgraph |
| LangGraph điều phối vòng lặp | LangGraph là framework điều phối agent có trạng thái (stateful), biên dịch graph rồi invoke. | https://langchain-ai.github.io/langgraph/ |
| "Dưới 100 dòng" | Hợp lý: graph khai báo nodes/edges ngắn gọn, không tự viết vòng lặp thủ công. | https://github.com/langchain-ai/langgraph |

Không phát hiện nội dung lỗi thời trong bài này (bài giới thiệu ý tưởng, không dính API cụ thể). Giữ nguyên mạch gốc, không thêm code.

## 4. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| Reflection | LLM tự phê bình output trước đó |
| Critique (reflection step) | Feedback để sửa tweet |
| Revise (generation step) | Viết lại tweet dựa trên critique |
| Vòng lặp | Lặp generate → reflect tới khi đạt |
| LangGraph | Gánh điều phối, code còn < 100 dòng |

**Một câu chốt:** Reflection agent không viết một lần là xong mà viết rồi tự chê rồi tự sửa, lặp tới khi hay — LangGraph chỉ là bộ khung chạy vòng lặp đó cho gọn.

## 5. Câu hỏi tự kiểm tra

1. Reflection agent khác gì một lần gọi LLM thông thường?
2. Đầu vào và đầu ra của bước reflection (critique) là gì?
3. Đầu vào và đầu ra của bước revise là gì?
4. Vì sao phải lặp nhiều vòng thay vì sửa một lần?
5. LangGraph giúp gì mà code chỉ còn dưới 100 dòng?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Gọi LLM thường là một chiều: prompt vào, text ra. Reflection agent thêm vòng lặp: output được đưa trở lại để LLM tự phê bình rồi sửa, lặp nhiều lần.

**2.** Vào là tweet hiện tại (kèm lịch sử), ra là critique: chê chỗ nào kém, gợi ý cải thiện (độ dài, virality, style — chi tiết ở bài 100).

**3.** Vào là tweet cũ + critique, ra là revision mới — bản tweet đã sửa theo feedback.

**4.** Vì một lần sửa hiếm khi đủ hay; mỗi vòng critique soi thêm lỗi, revision kế tiếp có thêm ngữ cảnh để tốt dần lên (mục tiêu bài này là tweet "viral").

**5.** LangGraph lo khai báo nodes (generate/reflect), state chung, edges thường + edges có điều kiện và biên dịch thành luồng chạy được, nên không phải tự viết vòng lặp, quản lý lịch sử thủ công.

</details>

## 6. Bước tiếp theo

Bài 099 — *Project Setup* — dựng thư mục dự án, môi trường Poetry, file `.env` và file main chạy thử.
