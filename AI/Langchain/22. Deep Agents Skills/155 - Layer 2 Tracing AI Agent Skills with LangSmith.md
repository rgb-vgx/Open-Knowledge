---
title: "Bài 155 - Tracing Skills với LangSmith"
course: "LangChain"
lesson: "155"
status: "edited-verified"
source: "155 - Layer 2 Tracing AI Agent Skills with LangSmith.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở + LangSmith, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["deep-agents", "skills", "LangSmith", "tracing", "middleware", "progressive-disclosure"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://docs.smith.langchain.com/"]
---

# Bài 155 — Tracing Skills với LangSmith (Tầng 2)

> Bài học được biên soạn từ transcript "Layer 2 Tracing AI Agent Skills with LangSmith".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Bật LangSmith tracing cho Deep Agents CLI và kiểm tra bằng `/trace`.
2. Đọc trace để thấy skill metadata chỉ nạp tên, mô tả và vị trí, chưa nạp full files.
3. Phân biệt before-agent discovery với wrap-model-call injection.
4. Giữ đúng thuật ngữ Anh: tracing, system prompt, middleware, before agent, wrap model call, SKILL.md.

## 2. Kiến thức cốt lõi

### Bật tracing

- Theo docs cần export `LANGCHAIN_TRACING`, `LANGCHAIN_API_KEY` và project deep agents LangSmith.
- Thực tế trong video `/trace` vẫn báo not configured vì thiếu `LANGSMITH_TRACING=true` và `LANGSMITH_API_KEY`; phải export đúng hai biến này rồi mở lại deepagents mới hiện tracing enabled.
- Chạy `hello`, sang LangSmith refresh project sẽ thấy run, input hello và output chào lại.

### Lúc chào hello agent thấy gì?

- LLM call có tools của deep agent và system prompt chứa Available skills gồm remotion skills.
- Chỉ có metadata gồm name, when to use và location; không load toàn bộ skill vì sẽ bloat context.
- System prompt dạy LLM progressive disclosure gồm recognize khi skill applies, read full instructions khi cần, follow instructions, access supported files.
- Đoạn này do skills middleware before agent nạp lúc mở session qua CLI, cập nhật agent state trường skill metadata list gồm skill creator, find skills và remotion best practices ở `~/.agents/skills`.

### Khi nhờ tạo GIF bằng Remotion thì gì xảy ra?

- Input mới gồm history hello cộng yêu cầu tạo GIF; middleware wrap model call inject skill system vào system prompt trước mỗi LLM call.
- Nhờ injection này LLM quyết định đọc `SKILL.md` của remotion best practices bằng read tool.
- LLM call tiếp theo đã có nội dung `SKILL.md`, rồi tự chọn đọc tiếp animations.md, compositions.md, timings.md; điều thú vị là nó không chọn gif.md, việc chọn file hoàn toàn do LLM.
- Sau đó agent đọc thêm text animations, sequencing rules, kiểm tra Remotion project cũ hay scaffold mới, rồi render MP4 và GIF.

## 3. Ví dụ và diễn giải

- Cấu trúc skill trên disk trong demo gồm `SKILL.md` có front matter và description, thư mục `rules` chứa gif.md và các markdown khác, thư mục `assets` chứa TypeScript để execute hoặc tham khảo.
- Hai vai trò tách bạch: before agent chỉ discovery skills khả dụng, còn injection vào context xảy ra ở skill middleware wrap model call trước mỗi request.
- Cùng pattern này lặp lại ở Claude Code, Gemini CLI, Manus hay bất kỳ agent hỗ trợ skill system nào.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), [LangSmith](https://docs.smith.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được nội dung mới; tên biến môi trường LangSmith giữ nguyên theo thao tác thành công trong transcript.
- Docs trong video cũng được tác giả nhận xét cần update, nên khi làm theo docs mới phải ưu tiên kiểm tra lệnh `/trace`.

> **Hộp cập nhật:** khi có mạng, đối chiếu `LANGSMITH_TRACING`, `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT` và UI trace mới nhất của LangSmith.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Bật trace | Export đúng biến LangSmith, kiểm tra bằng `/trace` |
| Khi hello | Chỉ metadata skills trong system prompt, chưa disclose full |
| Khi cần skill | Wrap model call inject skill system, LLM tự đọc SKILL.md |
| Sau đó | LLM tự chọn files liên quan, đọc dần, rồi hành động |
| Phân biệt | Before agent discovery, wrap model call injection |

**Một câu chốt:** Trace cho thấy skill không nhồi sẵn mà được tiết lộ dần theo quyết định của LLM.

## 6. Câu hỏi tự kiểm tra

1. Vì sao biến theo docs cũ không bật được trace?
2. Khi chào hello, LLM thấy gì về Remotion?
3. Ai quyết định đọc file nào trong skill?
4. Phân biệt hai middleware trong bài?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì thiếu `LANGSMITH_TRACING=true` và `LANGSMITH_API_KEY`; phải export đúng rồi mở lại CLI và kiểm tra `/trace`.

**2.** Chỉ metadata gồm name, description, location trong Available skills, kèm hướng dẫn progressive disclosure, chưa có full content.

**3.** LLM, dựa trên metadata và skill system được inject; ví dụ nó đọc animations, compositions, timings mà bỏ qua gif.md.

**4.** Before agent làm discovery và lưu metadata vào state lúc mở session; wrap model call inject skill system vào system prompt trước mỗi LLM call.

</details>

## 7. Bước tiếp theo

Bài 156 — *RECAP: Skill Middleware* — tóm lại vòng agent loop cộng hai middleware skills trước khi đọc code.

Nguồn: transcript gốc `155 - Layer 2 Tracing AI Agent Skills with LangSmith.md`; [LangSmith](https://docs.smith.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
