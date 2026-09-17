---
title: "Bài 154 - Dùng Skills trong Deep Agents CLI"
course: "LangChain"
lesson: "154"
status: "edited-verified"
source: "154 - Level 1 Using Agent Skills in the Deep Agents CLI.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "skills", "CLI", "Remotion", "SKILL.md"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://docs.smith.langchain.com/"]
---

# Bài 154 — Dùng Skills trong Deep Agents CLI (Tầng 1)

> Bài học được biên soạn từ transcript "Level 1 Using Agent Skills in the Deep Agents CLI".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Cài Deep Agents CLI và cấu hình LLM để chạy harness.
2. Cài một skill ngoài như Remotion best practices qua `npx skills`.
3. Kiểm tra skills đã nạp và gọi agent tạo Remotion video.
4. Giữ đúng thuật ngữ Anh: skills, CLI, harness, ANTHROPIC_API_KEY, SKILL.md, progressive disclosure.

## 2. Kiến thức cốt lõi

### Cài và chạy Deep Agents CLI

- Cài dependencies theo docs Deep Agents, transcript dùng `uv`.
- Sau cài có hai executables gồm `deepagents` và `deepagents CLI`.
- `deepagents --help` liệt kê options; chạy trần lần đầu báo thiếu credentials nên phải set LLM, ví dụ `ANTHROPIC_API_KEY` lấy từ Anthropic console.
- Set xong chạy lại, chào `hello` để xác nhận harness sống.

### Cài skill Remotion

- Remotion là package mã nguồn mở tạo video bằng React code.
- Tìm skill Remotion rồi chạy `npx skills`, chọn add Remotion dev skills.
- Chọn nơi lưu universal `.agents/skills` để nhiều agents đọc được; Claude Code cần `.claude/skills`, Open Code có skills directory riêng.
- Transcript chọn global install trong home directory để mọi agent trên máy dùng được.
- Cài xong hỏi agent which skills do you have sẽ thấy Skill Creator mặc định, Find Skills và remotion best practices mới cài.

### Skill chạy ra sao ở tầng user?

- Nhờ tạo Remotion video on agent skills, agent đọc file remotion best practices, nạp context skill rồi scaffold project, chọn portrait, lên plan, viết code, cài deps, build scenes, tự verify và render.
- Model trong demo là Anthropic Claude Sonnet 4.6.
- Điểm mấu chốt quan sát được ngay ở tầng 1 là dynamic disclosure: skill chỉ load khi task cần tới nó.

## 3. Ví dụ và diễn giải

- Flow trong video: tạo API key, export, chạy deepagents, cài skill global, hỏi skills, ra lệnh tạo video, auto approve, nhận MP4 rồi trace thấy agent đọc skill files.
- Risk assessment lúc cài hiện Agent verdict, Socket zero alerts, SNCC video risk; transcript vẫn install để demo.
- Nếu đã có Remotion project cũ, agent hỏi dùng lại hay scaffold mới thay vì ghi đè mù quáng.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangSmith](https://docs.smith.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Lệnh cài, tên executable và đường dẫn `.agents/skills` giữ nguyên theo transcript ở thời điểm quay; version mới có thể đổi.

> **Hộp cập nhật:** khi có mạng, đối chiếu lệnh cài Deep Agents bằng `uv`, biến môi trường LLM, lệnh `npx skills` và đường dẫn skill với docs mới nhất. API key trong transcript đã revoke, không dùng lại.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Chuẩn bị | Cài Deep Agents, set ANTHROPIC_API_KEY, chạy CLI |
| Cài skill | `npx skills`, chọn universal `.agents/skills`, cài global |
| Kiểm tra | Hỏi which skills do you have |
| Dùng | Ra lệnh tạo Remotion video, agent tự load skill khi cần |
| Bài học | Cài skill cho agents khác nhau rất đơn giản nhờ chuẩn thư mục |

**Một câu chốt:** Tầng 1 chỉ cần biết cài skill đúng chỗ, harness sẽ tự nạp đúng lúc.

## 6. Câu hỏi tự kiểm tra

1. Vì sao lần chạy Deep Agents đầu tiên báo lỗi credentials?
2. Vì sao transcript chọn `.agents/skills` thay vì `.claude/skills`?
3. Làm sao biết skill Remotion đã nạp?
4. Dấu hiệu nào cho thấy progressive disclosure đã xảy ra?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì chưa set LLM cho harness; phải tạo Anthropic API key và export `ANTHROPIC_API_KEY` rồi chạy lại.

**2.** Vì đó là cách universal nhiều agents đọc được; `.claude/skills` chỉ riêng Claude Code.

**3.** Hỏi which skills do you have và thấy remotion best practices cùng Skill Creator và Find Skills.

**4.** Agent chỉ đọc file remotion best practices sau khi nhận yêu cầu tạo video, chứ không nạp toàn bộ skill từ đầu.

</details>

## 7. Bước tiếp theo

Bài 155 — *Layer 2: Tracing Skills với LangSmith* — bật trace để thấy metadata skill nằm ở đâu trong system prompt.

Nguồn: transcript gốc `154 - Level 1 Using Agent Skills in the Deep Agents CLI.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
