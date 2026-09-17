---
title: "Bài 148 - Shallow Agents, Deep Agents, Coding Agents"
course: "LangChain"
lesson: "148"
status: "edited-verified"
source: "148 - Deep Agents Taxonomy of Agents Shallow Agents Deep Agents Coding Agents.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["shallow-agents", "deep-agents", "coding-agents", "ReAct", "context-rot", "context-engineering"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 148 — Shallow Agents, Deep Agents, Coding Agents

> Bài học được biên soạn từ transcript "Deep Agents Taxonomy of Agents Shallow Agents Deep Agents Coding Agents".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Phân biệt shallow agents (ReAct), deep agents và coding agents.
2. Giải thích vì sao ReAct bị giới hạn bởi context bloat và context rot.
3. Kể tên 4 đặc điểm chung của deep agents.
4. Lý giải vì sao application layer đang dẫn dắt đổi mới nhanh hơn model.

## 2. Kiến thức cốt lõi

### Shallow agents chính là ReAct agent

- LLM quyết định có gọi tool không bằng function calling, thực thi tool, nhận observation, lặp lại cho tới khi trả lời.
- Mỗi vòng lặp đều nối kết quả vào cùng context. Task càng dài, context càng phình: context confusion, context contradiction, context pollution — gọi chung là context rot.
- Hệ quả: tốn token hơn, chậm hơn, đắt hơn, dễ off rails.
- Phù hợp task nông, ít bước. Nhiều hệ thống production hiện nay chỉ cần mức này là đủ.

### Deep agents giải long-horizon tasks

- Chạy lâu (phút, giờ, thậm chí ngày), có thể dừng giữa chừng để nhận user input rồi resume.
- Ví dụ deep research agents: Perplexity, ChatGPT research, Claude research, GPT Researcher mã nguồn mở.
- Ví dụ coding agents: Claude Code, Devin, Cursor, Gemini CLI. Đây là subset của deep agents, chuyên cho code: viết code, chạy test, mở browser, chụp screenshot như engineer thật.
- Transcript nhấn mạnh Claude Code là coding agent hàng đầu ở thời điểm quay.

### Bốn đặc điểm làm nên deep agent

1. **Planning tool:** to-do list động, trạng thái pending / in progress / completed, liên tục review.
2. **Sub-agents:** spawn worker chuyên biệt, chạy isolated context, làm song song mà không bloat context chính.
3. **File system:** ghi kết quả trung gian ra đĩa, chia sẻ state giữa các agents.
4. **System prompt khổng lồ:** đóng gói kỷ luật vận hành.

Tất cả quy về **context engineering** và smart context management.

### Vì sao application layer quan trọng?

- LLM vẫn tốt dần lên nhưng theo kiểu gradual, không còn bước nhảy指数 hàm mũ về reasoning theo từng model mới.
- Bước nhảy hiện nay nằm ở abstraction chồng abstraction trên application layer: biết harness LLM đúng cách thì tự động hóa được khối việc reasoning nặng mà 5 năm trước tưởng không thể.

## 3. Ví dụ và diễn giải

- Research nông với Search + Wiki + Tavily: ReAct đủ dùng.
- Research sâu hoặc implement feature: ReAct rot context, cần deep agent có plan, sub-agents và file system.
- Tư duy thiết kế: đừng cố nhét mọi observation vào một context duy nhất; hãy lập kế hoạch, ủy thác cho worker cô lập, và persist kết quả trung gian ra file.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; giữ nguyên thuật ngữ Anh: shallow agents, deep agents, coding agents, sub-agents, context rot, function calling.

> **Hộp cập nhật:** khi có mạng, cần đối chiếu định nghĩa deep agents, API `create_deep_agent` và planning middleware trong docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Shallow | ReAct + function calling, tốt cho task ít bước |
| Giới hạn | Context bloat thành context rot: kém chất lượng, chậm, đắt |
| Deep | Long-horizon, long-running, pause/resume được |
| Ví dụ deep | Deep research, Claude Code, Cursor, Devin |
| Bí quyết | Planning tool + sub-agents + file system + system prompt + context engineering |

**Một câu chốt:** ReAct là nền móng, nhưng muốn đi sâu phải quản trị context bằng planning, sub-agents và file system.

## 6. Câu hỏi tự kiểm tra

1. Vì sao ReAct được gọi là shallow agent?
2. Context rot gồm những hiện tượng nào?
3. Kể 4 đặc điểm của deep agents.
4. Vì sao application layer đang quan trọng hơn model đơn lẻ?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì mỗi vòng tool-call đều nối observation vào cùng context window hữu hạn; task càng dài càng bloat nên không đi sâu được.

**2.** Context confusion, contradiction, pollution dẫn tới degrade chất lượng, off rails, chậm và đắt.

**3.** Planning tool (to-do list động), sub-agents (isolated context), file system (persistent intermediate results), system prompt lớn.

**4.** Vì LLM tiến bộ dần (gradual), trong khi abstraction ở application layer biết dùng LLM đúng cách tạo ra cỗ máy tự động hóa việc khó trước đây tưởng không thể.

</details>

## 7. Bước tiếp theo

Bài 149 — *Planning Tool: Dynamic To-Do Lists* — xem ý tưởng plan hiện hình trong Claude Code.

Nguồn: transcript gốc `148 - Deep Agents Taxonomy of Agents Shallow Agents Deep Agents Coding Agents.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
