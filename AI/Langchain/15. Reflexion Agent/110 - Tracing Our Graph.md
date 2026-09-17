---
title: 'Bài 110 — Tracing Our Graph'
course: langchain
lesson: 110
status: edited-verified
source: '110 - Tracing Our Graph.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.smith.langchain.com/
- https://docs.langchain.com/langgraph
---

# Bài 110 — Tracing Our Graph

> Nguồn: `110 - Tracing Our Graph.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Đọc trace LangSmith (~50s, 35K tokens) ánh xạ đúng kiến trúc draft → tools → revise.
2. Chỉ ra các tool calls song song qua start time trùng nhau.
3. Giải thích bug đếm vòng lặp: đặt MAX=2 mà chạy 3 iterations.
4. Nêu hướng fix ở section sau: LLM-as-judge thay đếm máy móc.

## 2. Nội dung chính theo mạch transcript

### 2.1. Toàn cảnh trace

- Thu gọn nodes: responder (draft: answer + critique missing/superfluous + search queries) → execute_tools (3 queries: AI-powered SOC funding 2025, market sizing/use cases, comparative platforms — start time trùng nhau vì concurrent) → reviser (nhận full history + tool results, trả revised answer + critique + citations mới) → event_loop → tools đợt 2 (ROI case studies, market size 2025, adoption — khác đợt 1) → revise → ... END.

### 2.2. Bug đếm iteration

- Lần event_loop thứ hai: reviser node chưa finish nên state chưa update, tool count vẫn dưới ngưỡng → graph đi tiếp execute_tools thay vì dừng.
- Kết quả: MAX_ITERATIONS=2 nhưng thực tế 3 iterations — giảng viên nhận lỗi của mình.
- Bài học: đếm state trong conditional edge phải tính độ trễ update; đếm máy móc không đơn giản như tưởng.

### 2.3. Hẹn section sau

- Section Agentic RAG sẽ dùng LLM-as-judge quyết định dừng thay vì magic number; docs trỏ tới LangGraph Agentic RAG.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Trace hiện từng node + LLM call + tool concurrency | Khớp khả năng tracing LangSmith. | https://docs.smith.langchain.com/ |
| Conditional edge + state update timing | Khớp semantics LangGraph (state commit sau node). | https://docs.langchain.com/langgraph |

> Ghi nhận: không nội dung lỗi thời; bug là của code demo, đã được transcript thừa nhận. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Quan sát trace | Ý nghĩa |
|---|---|
| 50s / 35K tokens | Nhiều vòng LLM + search nối tiếp |
| Start time trùng | Tools chạy concurrent |
| Queries đợt 2 khác đợt 1 | Revisor gợi ý hướng tìm mới |
| MAX=2 chạy 3 vòng | State chưa update khi check điều kiện |

**Một câu chốt:** Trace không chỉ để ngắm — nó tố đúng chỗ đếm vòng lặp bị lệch một nhịp, và đó là lý do section sau phải nhờ LLM làm giám khảo.

## 5. Câu hỏi tự kiểm tra

1. Vì sao ba search cùng đợt có start time trùng nhau?
2. Queries đợt 2 khác đợt 1 nói lên điều gì về revisor?
3. Vì sao event_loop lần hai không dừng dù sắp đủ ngưỡng?
4. Đặt MAX=2 mà chạy 3 vòng thì sai ở đâu?
5. Hướng fix transcript hẹn là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì ToolNode chạy batch concurrent — ba tool cùng start một lúc.

**2.** Revisor không chỉ sửa văn mà còn đề xuất hướng tìm mới (ROI, market size, adoption) dựa trên bài vừa sửa.

**3.** Vì reviser node chưa finish nên state chưa commit tool call mới; event_loop đọc count cũ vẫn dưới ngưỡng nên cho đi tiếp.

**4.** Sai ở logic đếm: đếm tool calls trong state tại thời điểm check, nhưng state chỉ update sau khi node finish — lệch một nhịp.

**5.** Dùng LLM-as-judge đánh giá chất lượng để quyết định dừng, triển khai ở section Agentic RAG (thay magic number).

</details>

## 6. Bước tiếp theo

Bài 111 — *What are Building: Agentic RAG Architecture* — sang section 16, RAG có reflection và routing.
