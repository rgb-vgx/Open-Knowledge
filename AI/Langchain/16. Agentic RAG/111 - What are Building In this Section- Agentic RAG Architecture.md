---
title: 'Bài 111 — Agentic RAG Architecture'
course: langchain
lesson: 111
status: edited-verified
source: '111 - What are Building In this Section- Agentic RAG Architecture.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://github.com/langchain-ai/langgraph
---

# Bài 111 — Agentic RAG Architecture

> Nguồn: `111 - What are Building In this Section- Agentic RAG Architecture.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được mục tiêu section: workflow RAG nâng cao cho đáp án chất lượng hơn RAG thường.
2. Kể tên ba papers nền: Self RAG, Corrective RAG, Adaptive RAG.
3. Giải thích hai ý tưởng chung: reflection và routing.
4. Nêu cách tổ chức code của khóa học: refactor từ cookbook theo hướng production, mỗi video một branch.

## 2. Nội dung chính theo mạch transcript

### 2.1. Nguồn cảm hứng và cách làm

- Inspired by LangChain + Mistral cookbook (code trong repo khóa học, có video YouTube hay).
- Giảng viên thấy cookbook thiếu góc software engineering nên refactor cho maintainable, readable, testable, dễ extend; xây dần từ zero để thấy tư duy làm phần mềm.
- Mọi code public trên GitHub, mỗi video khớp một branch, cuối video nào cũng có code khớp repo.

### 2.2. Ba papers và ý tưởng chung

- Corrective RAG, Self RAG, Adaptive RAG — gist sẽ dạy dần, nhưng ý chung là thêm reflection vào workflow.
- Reflect on documents: tài liệu retrieve về có thật sự đúng/khả dụng không; curate, bổ sung nếu thiếu.
- Reflect on answer: đáp án có grounded trong documents không, có thật sự trả lời question không.
- Routing: điều câu hỏi tới đúng data store có thông tin trả lời.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

> WebSearch/WebFetch ngày 2026-09-17 bị hạn chế, chỉ lấy được trang tổng quan docs. Giữ nguyên mạch gốc.

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| RAG nâng cao bằng reflection + routing trên LangGraph | Khớp hướng Agentic RAG của LangGraph (graph có grader + conditional edges). | https://docs.langchain.com/langgraph |
| Ba papers Self/Corrective/Adaptive RAG | Là papers có thật, transcript chỉ tóm gist — giữ nguyên mức tóm tắt. | https://github.com/langchain-ai/langgraph |
| Mỗi video một branch GitHub | Quy ước của khóa học, transcript gốc không đề cập docs framework. | https://github.com/langchain-ai/langgraph |

> Ghi nhận: không API cụ thể nên không có nội dung lỗi thời. Chi tiết từng paper đối chiếu ở bài 112, 122–124.

## 4. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| Corrective RAG | Sửa documents retrieve sai/thiếu bằng web search |
| Self RAG | Soi đáp án: grounded + trả lời đúng hỏi chưa |
| Adaptive RAG | Route câu hỏi tới store đúng |
| LangGraph | Khung chạy reflection + routing |
| Branch/video | Tra cứu code từng bước |

**Một câu chốt:** RAG thường retrieve xong sinh luôn, Agentic RAG retrieve xong còn soi lại tài liệu, soi lại đáp án và chọn đường đi đúng — cực hơn nhưng đáp án đáng tin hơn.

## 5. Câu hỏi tự kiểm tra

1. Section này khác RAG thường ở hai bổ sung nào?
2. Reflect on documents nghĩa là gì?
3. Reflect on answer gồm mấy kiểm tra?
4. Routing giải quyết vấn đề gì?
5. Vì sao giảng viên refactor lại cookbook gốc?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thêm reflection (soi documents và đáp án) và routing (chọn data store đúng) — RAG thường chỉ retrieve rồi generate.

**2.** Xem documents retrieve về có relevant/khả dụng không; lọc cái sai, bổ sung cái thiếu trước khi sinh đáp án.

**3.** Hai kiểm tra: đáp án có grounded trong documents không (chống hallucination), và có thật sự answers the question không.

**4.** Không phải câu nào cũng nên đi vector store; routing đưa câu hỏi tới nơi có thông tin (vector store hay web search).

**5.** Vì cookbook gốc viết dạng Jupyter notebook demo; cần bản production-oriented: maintainable, readable, testable, dễ extend.

</details>

## 6. Bước tiếp theo

Bài 112 — *Improving RAG Quality with the Corrective RAG Flow* — luồng corrective RAG: grade documents rồi quyết định search thêm.
