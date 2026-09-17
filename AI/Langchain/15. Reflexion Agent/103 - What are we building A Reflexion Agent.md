---
title: 'Bài 103 — Reflexion Agent là gì'
course: langchain
lesson: 103
status: edited-verified
source: '103 - What are we building A Reflexion Agent.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung GPT-4 turbo + Tavily; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://github.com/langchain-ai/langgraph
- https://arxiv.org/abs/2303.11366
---

# Bài 103 — Reflexion Agent là gì

> Nguồn: `103 - What are we building A Reflexion Agent.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Phân biệt Reflexion với Reflection (thêm tool search thời gian thực).
2. Mô tả kiến trúc responder → execute tools → revisor lặp lại.
3. Giải thích output của responder: response + critique + search queries.
4. Nêu stack: GPT-4 turbo (function calling), Tavily, LangSmith.

## 2. Nội dung chính theo mạch transcript

### 2.1. Nguồn gốc và động lực

- Mở rộng reflection agent section 14, thêm tool (search online lấy real-time data).
- Ý tưởng từ paper Reflexion (Northeastern, MIT, Princeton); course refactor lại implementation từ blog của LangChain team (Lance) vì bản gốc khó hiểu — link trong resources.
- Thách thức thật sự không phải tạo critique mà là khiến LLM tiêu hóa critique và cải thiện dần qua các vòng — section này dạy mẹo prompt engineering cho việc đó.

### 2.2. Mục tiêu sản phẩm

- Viết bài article chi tiết 250 từ về chủ đề cho trước, tự fetch thông tin web, có citations, kèm vòng critique chất lượng.
- Ví dụ xuyên suốt: "AI-powered SOC / autonomous SOC problem domain, startups that raised capital" — lĩnh vực đang bùng nổ (tự động triage ticket tier-1, giảm việc cho SOC analyst).

### 2.3. Kiến trúc

1. Responder node: viết draft đầu + tự critique + đề xuất search queries (để ground output với sự kiện hiện tại).
2. Execute tools node: chạy Tavily search engine (tối ưu cho LLM app) trên các queries, chạy song song.
3. Revisor node: nhận response cũ + critique + kết quả search, viết lại bài, kèm critique mới + search queries mới + citations của đợt search vừa rồi.
4. Lặp cho tới điều kiện dừng. Khung giống reflection agent, chỉ thêm search engine.
- Model GPT-4 turbo (cần reasoning + function calling), Tavily search, LangSmith tracing vì kiến trúc phức tạp.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

> Kiểm chứng mạng ngày 2026-09-17 bị hạn chế; đối chiếu khái niệm, giữ nguyên mạch gốc.

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Paper Reflexion (verbal reinforcement) | Paper Shinn et al. 2023, Northeastern/MIT/Princeton — khớp. | https://arxiv.org/abs/2303.11366 |
| LangGraph triển khai responder/tools/revisor | Khớp mẫu agent có ToolNode + conditional edge của LangGraph. | https://docs.langchain.com/langgraph |
| Tavily tối ưu cho LLM | Giữ nguyên theo transcript; transcript gốc không đề cập docs Tavily chi tiết. | https://github.com/langchain-ai/langgraph |

Không phát hiện nội dung lỗi thời ở mức ý tưởng. Chi tiết API (ToolNode, function calling) sẽ đối chiếu ở bài 106–109.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| Responder (actor) | Draft + critique + search queries |
| Execute tools (Tavily) | Lấy dữ liệu web thời gian thực |
| Revisor | Viết lại + critique mới + citations |
| Vòng lặp | Lặp tới điều kiện dừng |
| GPT-4 turbo + LangSmith | Reasoning/function calling + tracing |

**Một câu chốt:** Reflexion = Reflection có thêm "mắt" nhìn ra internet — viết, tự chê, đi tìm bằng chứng, sửa lại, lặp tới khi bài đủ căn cứ.

## 5. Câu hỏi tự kiểm tra

1. Reflexion khác Reflection ở điểm nào?
2. Responder trả về mấy phần và mỗi phần dùng ở đâu?
3. Revisor khác responder ở đầu vào nào?
4. Vì sao cần citations trong bài revisor?
5. Vì sao transcript chọn GPT-4 turbo thay vì model yếu hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thêm tool search: ngoài vòng chê-sửa còn fetch dữ liệu web thời gian thực để ground câu trả lời.

**2.** Ba phần: draft (bản nháp), critique (điểm yếu), search queries (câu cần tra). Draft để sửa tiếp, critique để revisor biết sửa gì, queries để tool node chạy search.

**3.** Revisor nhận thêm kết quả search (external data) bên cạnh response cũ và critique — nên bài mới vừa sửa theo góp ý vừa bổ sung chứng cứ.

**4.** Vì thông tin lấy từ web cần trích nguồn URL để kiểm chứng được, đồng thời phần references không tính vào giới hạn 250 từ (chi tiết bài 107).

**5.** Cần model đủ mạnh để viết bài + viết critique có reasoning tốt, và hỗ trợ function calling — nền tảng của structured output ở bài 106–107.

</details>

## 6. Bước tiếp theo

Bài 104 — *Project Setup* — dựng project Reflexion, Poetry, `.env` (OpenAI, Tavily, LangSmith) và file main.
