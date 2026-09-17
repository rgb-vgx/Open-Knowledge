---
title: 'Bài 122 — Self RAG Intro'
course: langchain
lesson: 122
status: edited-verified
source: '122 - Self RAG- Intro.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://arxiv.org/abs/2310.11511
---

# Bài 122 — Self RAG Intro

> Nguồn: `122 - Self RAG- Intro.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được Self RAG là gì: reflect lên generation, không chỉ documents.
2. Kể hai kiểm tra: grounded trong documents chưa, answers question chưa.
3. Mô tả ba nhánh xử lý: useful → trả, not useful → web search, not supported → regenerate.
4. Nêu việc sẽ làm bài 123: chains, tests, nodes, conditional edges.

## 2. Nội dung chính theo mạch transcript

### 2.1. Hai bước reflect đáp án

1. Grounded check: generation có được documents hỗ trợ không (chống hallucination). Grounded thì sang bước 2.
2. Answer check: đáp án có trả lời đúng câu user hỏi không. Yes cả hai thì trả user.

### 2.2. Ba nhánh

- Hallucinated (not grounded) → regenerate, ép bám documents.
- Grounded nhưng không answers question → vector store thiếu info → web search.
- Grounded + answers → xong.
- Triển khai end-to-end bài 123: viết chains, tests, nodes, conditional branches.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Self-RAG reflect generation (grounded + answers) | Khớp paper Self-RAG (Asai et al. 2023). | https://arxiv.org/abs/2310.11511 |
| Thêm conditional branching sau generate | Khớp pattern grader + router LangGraph. | https://docs.langchain.com/langgraph |

> Ghi nhận: bài intro ngắn, không API; giữ nguyên. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Kiểm tra | Rẽ đi đâu |
|---|---|
| Not grounded | Regenerate bám documents |
| Grounded nhưng không answers | Web search |
| Grounded + answers | Trả user |

**Một câu chốt:** CRAG soi tài liệu đầu vào, Self RAG soi tiếp đáp án đầu ra — soi hai đầu thì hallucination khó lọt.

## 5. Câu hỏi tự kiểm tra

1. Self RAG khác CRAG ở đối tượng soi nào?
2. Grounded nghĩa là gì?
3. Vì sao grounded rồi mà vẫn phải check answers question?
4. Not useful suy ra điều gì về vector store?
5. Bài 123 sẽ thêm gì vào graph?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** CRAG soi documents retrieve về; Self RAG soi tiếp generation sinh ra.

**2.** Đáp án được facts trong documents hỗ trợ, không bịa ngoài.

**3.** Vì đáp án có thể đúng facts nhưng lạc đề — bám tài liệu mà không trả lời câu hỏi thì vẫn vô dụng.

**4.** Vector store không đủ info trả lời — phải ra web search tìm thêm.

**5.** Hai grader chains (hallucination + answer), tests, và conditional edge sau generate rẽ ba nhánh.

</details>

## 6. Bước tiếp theo

Bài 123 — *Self RAG Implementation* — viết hallucination/answer grader và conditional edge sau generate.
