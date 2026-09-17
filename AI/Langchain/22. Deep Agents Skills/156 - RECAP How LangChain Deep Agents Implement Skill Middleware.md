---
title: "Bài 156 - RECAP Skill Middleware"
course: "LangChain"
lesson: "156"
status: "edited-verified"
source: "156 - RECAP How LangChain Deep Agents Implement Skill Middleware.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["deep-agents", "skills", "middleware", "agent-loop"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://docs.smith.langchain.com/"]
---

# Bài 156 — RECAP: Skill Middleware Làm Gì?

> Bài học được biên soạn từ transcript "RECAP How LangChain Deep Agents Implement Skill Middleware".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ lại agent loop chuẩn và chỗ skills chen vào.
2. Nói được hai middleware: before agent discovery và before LLM call injection.
3. Giải thích vì sao quyết định dùng skill hay tool thuộc về agent.
4. Giữ đúng thuật ngữ Anh: agent loop, middleware, before agent, system prompt, state.

## 2. Kiến thức cốt lõi

### Agent loop chuẩn

- Bắt đầu bằng LLM call với câu hỏi, LLM quyết định gọi tool hay không.
- Nếu gọi thì execute tool rồi quay lại reason xem trả lời hay gọi tiếp.
- Đây là vòng lặp quen thuộc của mọi agent.

### Hai việc LangChain Deep Agents thêm vào

1. **Khi session load:** load mọi available skills vào memory, tức agent state. Đây là skill discovery gồm tên và vị trí, chạy ở before agent middleware.
2. **Trước mỗi LLM call:** append skill systems appendix vào system prompt gồm danh sách skills, vị trí và hướng dẫn progressive disclosure. Agent mang nó trong mỗi request nên tự quyết định dùng skill hay dùng tool có sẵn.

### Hành vi đã thấy trong trace

- Đúng như hai bài trước: lúc mở agent đã discovery, trước mỗi call đã injection, còn load file nào là do LLM.
- Hiểu recap này rồi mới nên sang đọc code ở bài sau.

## 3. Ví dụ và diễn giải

- Hãy tưởng tượng thực đơn dán trước cửa quán: before agent là lúc ghi thực đơn gồm món gì và ở trang nào.
- Trước mỗi lần gọi món, phục vụ nhắc lại thực đơn và cách gọi thêm chi tiết; khách tức LLM quyết định gọi món nào, có mở trang chi tiết không.
- Code không làm thay quyết định, chỉ chuẩn bị metadata đầy đủ.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangSmith](https://docs.smith.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được nội dung mới.
- Bài recap ngắn nên giữ trung thành transcript, không suy diễn tên hàm ngoài những gì trace đã hiện.

> **Hộp cập nhật:** khi có mạng, đối chiếu tên middleware skills trong `deepagents` hiện tại với hai vai trò discovery và injection mô tả ở đây.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Loop | Hỏi, quyết định tool, execute, reason tiếp |
| Middleware 1 | Before agent: discovery skills vào state |
| Middleware 2 | Trước LLM call: inject skill appendix vào system prompt |
| Quyết định | Thuộc về agent theo từng request |
| Mục đích recap | Chốt kiến thức trước khi đọc `skills.py` |

**Một câu chốt:** Harness chỉ dọn sẵn metadata, còn ăn món nào là việc của LLM.

## 6. Câu hỏi tự kiểm tra

1. Agent loop chuẩn gồm mấy bước?
2. Before agent middleware lưu gì vào đâu?
3. Middleware thứ hai chạy khi nào và làm gì?
4. Vì sao cần recap trước khi đọc code?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** LLM call với câu hỏi, quyết định có gọi tool không, execute nếu cần, quay lại reason cho tới khi trả lời.

**2.** Lưu skill discovery gồm names và locations vào agent state memory lúc session load.

**3.** Chạy trước mỗi LLM call, append skill systems appendix vào system prompt để agent quyết định.

**4.** Vì đã thấy hành vi trong trace, đọc code sẽ hiểu ngay chỗ nào sinh ra hành vi đó.

</details>

## 7. Bước tiếp theo

Bài 157 — *Inside skills.py: Progressive Disclosure* — đọc code discovery, injection và SKILLS_SYSTEM_PROMPT.

Nguồn: transcript gốc `156 - RECAP How LangChain Deep Agents Implement Skill Middleware.md`; [deepagents repo](https://github.com/langchain-ai/deepagents).
