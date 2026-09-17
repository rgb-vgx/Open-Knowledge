---
title: "Bài 147 - Giới thiệu Deep Agents"
course: "LangChain"
lesson: "147"
status: "edited-verified"
source: "147 - Introduction to Deep Agents Section.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "long-horizon-tasks", "coding-agents", "harness"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 147 — Giới thiệu Deep Agents

> Bài học được biên soạn từ transcript "Introduction to Deep Agents Section".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được deep agents khác agents thông thường ở điểm nào: giải được long-horizon tasks.
2. Kể được lộ trình của section: taxonomy, đặc điểm, harness của LangChain Deep Agents.
3. Giải thích vì sao cần mổ code harness mã nguồn mở để hiểu các coding agents như Claude Code.
4. Giữ đúng thuật ngữ Anh: deep agents, sub-agents, middleware, harness, long-horizon tasks.

## 2. Kiến thức cốt lõi

### Deep agents là gì?

Transcript định nghĩa trực tiếp:

- Agents nói chung đều hữu ích, nhưng **deep agents** đặc biệt giải được **long-horizon tasks** — nhiệm vụ dài, nhiều bước, cần hành động liên tục.
- Ví dụ: các coding agents như **Claude Code**, **Cursor CLI**, và **LangChain deep agents**.

### Lộ trình 3 chặng trong section

1. **Taxonomy:** phân loại deep agents là gì.
2. **Đặc điểm tổng quan:** điều gì làm một agent trở thành deep agent.
3. **LangChain deep agents harness:** vừa dùng như user, vừa mổ code để hiểu under the hood.

### Vì sao mổ code LangChain Deep Agents?

- Claude Code, Cursor CLI, Gemini CLI, Manus... đều **closed source**, không xem được implementation.
- LangChain Deep Agents là **open-source agent harness**, triển khai nhiều ý tưởng hay.
- Hiểu harness này tương đương có một ô cửa nhìn vào cách các coding agents cấp state-of-the-art vận hành.

## 3. Ví dụ và diễn giải

- Task ngắn như "book me a flight": ReAct agent thông thường làm được.
- Task dài như implement một feature, refactor một repo, deep research một chủ đề: cần deep agent chạy nhiều phút tới nhiều giờ, đôi khi nhận input giữa chừng rồi resume.
- Tinh thần của section: không chỉ gọi LLM, mà học cách harness điều phối planning, sub-agents, file system và system prompt để đi đường dài.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Trạng thái ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do môi trường không truy cập mạng để fetch nội dung mới (WebSearch/WebFetch không trả về nội dung).
- Nội dung bài giữ trung thành với transcript. Nếu docs mới đổi API của harness, giữ bản gốc và bổ sung hộp cập nhật, không sửa lịch sử transcript.

> **Hộp cập nhật:** khi có mạng, cần đối chiếu tên package `deepagents`, cách khởi tạo `create_deep_agent` và danh sách middleware mặc định với docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Định nghĩa | Deep agents = agents giải long-horizon tasks |
| Ví dụ | Claude Code, Cursor CLI, LangChain deep agents |
| Lộ trình | Taxonomy -> đặc điểm -> mổ harness |
| Vì sao mã nguồn mở quan trọng | Để thấy under the hood mà closed source giữ kín |
| Kết quả mong đợi | Hiểu cách các coding agents hiện đại được cài đặt |

**Một câu chốt:** Muốn hiểu các coding agents đỉnh cao, hãy học từ harness mở của LangChain Deep Agents.

## 6. Câu hỏi tự kiểm tra

1. Deep agents khác agents thông thường ở điểm nào?
2. Kể tên 3 ví dụ deep/coding agents trong transcript.
3. Vì sao section chọn LangChain Deep Agents để mổ?
4. Ba bước của section là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Giải được long-horizon tasks — nhiệm vụ dài, nhiều bước, cần hành động liên tục, thay vì chỉ trả lời một lượt.

**2.** Claude Code, Cursor CLI, LangChain deep agents (các bài sau bổ sung thêm Gemini CLI, Manus).

**3.** Vì nó open-source, xem được code và hiểu implementation; các coding agents thương mại đều closed source.

**4.** Phân loại deep agents (taxonomy), đặc điểm tổng quan, review và dissect LangChain deep agents harness từ góc user tới source code.

</details>

## 7. Bước tiếp theo

Bài 148 — *Taxonomy: Shallow Agents, Deep Agents, Coding Agents* — bắt đầu phân loại thế giới agents.

Nguồn: transcript gốc `147 - Introduction to Deep Agents Section.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
