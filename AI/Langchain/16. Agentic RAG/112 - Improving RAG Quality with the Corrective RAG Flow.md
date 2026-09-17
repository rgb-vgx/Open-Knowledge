---
title: 'Bài 112 — Corrective RAG Flow'
course: langchain
lesson: 112
status: edited-verified
source: '112 - Improving RAG Quality with the Corrective RAG Flow.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://arxiv.org/abs/2401.15884
---

# Bài 112 — Corrective RAG Flow

> Nguồn: `112 - Improving RAG Quality with the Corrective RAG Flow.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Mô tả luồng Corrective RAG (CRAG) theo paper.
2. Phân biệt happy flow (documents relevant) và flow phải search thêm.
3. Giải thích bước self-reflect/critique documents.
4. Nêu kết quả kỳ vọng: prompt được augment bằng thông tin thời gian thực khi cần.

## 2. Nội dung chính theo mạch transcript

### 2.1. Luồng 4 bước

1. Query → vector/semantic search, retrieve documents từ vector store.
2. Self-reflect: critique từng document, xem có relevant với query gốc không.
3. Happy flow: tất cả relevant → augment prompt như RAG thường, gửi LLM.
4. Có document không relevant: filter bỏ, chạy external web search lấy thêm thông tin, augment prompt bằng cả hai nguồn rồi mới gửi LLM — cho đáp án chất lượng hơn.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| CRAG theo paper Corrective Retrieval Augmented Generation | Khớp paper Yan et al. 2024 (transcript ghi "correct rank/Seerat" do lỗi nghe máy). | https://arxiv.org/abs/2401.15884 |
| Retrieve → grade → (web search nếu cần) → generate | Khớp kiến trúc CRAG trên LangGraph. | https://docs.langchain.com/langgraph |

> Ghi nhận: transcript ngắn, lỗi chính tả do transcript máy ("Seerat", "Chirag", "LN") — bài học chuẩn hóa thành Corrective RAG/LLM, giữ nguyên logic.

## 4. Tóm tắt một trang

| Trường hợp | Xử lý |
|---|---|
| Tất cả documents relevant | Augment + generate luôn |
| Có document không relevant | Filter + web search + augment cả hai rồi generate |

**Một câu chốt:** Đừng tin mù quáng kết quả vector search — hãy chấm điểm từng document, cái nào hỏng thì đi tìm bằng chứng tươi trên web bù vào.

## 5. Câu hỏi tự kiểm tra

1. Bước nào phân biệt CRAG với RAG thường?
2. Happy flow là gì?
3. Document không relevant bị xử lý thế nào?
4. Vì sao phải filter trước khi augment?
5. Web search trong CRAG lấy gì bù vào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Bước self-reflect/critique: chấm từng retrieved document có relevant với query không trước khi sinh đáp án.

**2.** Mọi document đều relevant → augment prompt và gửi LLM như RAG thường, không cần search thêm.

**3.** Bị filter bỏ, đồng thời trigger external web search để lấy thông tin bù.

**4.** Vì nhét document sai vào prompt sẽ kéo LLM trả lời lệch; lọc giữ prompt sạch.

**5.** Thông tin thời gian thực từ internet bù cho phần vector store thiếu/sai.

</details>

## 6. Bước tiếp theo

Bài 113 — *Boilerplate Setup for an Agentic RAG Agent* — dựng project langgraph-course, cài dependencies và `.env`.
