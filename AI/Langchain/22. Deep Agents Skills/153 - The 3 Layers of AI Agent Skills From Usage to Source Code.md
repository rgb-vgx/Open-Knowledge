---
title: "Bài 153 - Ba Tang Hieu Agent Skills"
course: "LangChain"
lesson: "153"
status: "edited-verified"
source: "153 - The 3 Layers of AI Agent Skills From Usage to Source Code.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "skills", "progressive-disclosure", "CLI", "LangSmith"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://docs.smith.langchain.com/"]
---

# Bài 153 — Ba Tầng Hiểu Agent Skills

> Bài học được biên soạn từ transcript "The 3 Layers of AI Agent Skills From Usage to Source Code".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể tên 3 tầng hiểu skills: dùng, trace, đọc source.
2. Giải thích vì sao LangChain Deep Agents là harness mở lý tưởng để học.
3. Nói được progressive disclosure là gì ở mức trực giác.
4. Giữ đúng thuật ngữ Anh: skills, harness, CLI, trace, progressive disclosure, middleware.

## 2. Kiến thức cốt lõi

### Vì sao học skills qua Deep Agents?

- Claude Code, Cursor CLI, Gemini CLI, Manus đều closed source, không thấy implementation.
- LangChain Deep Agents là open-source agent harness, triển khai nhiều ý tưởng đẹp về skills.
- Mổ harness này cho ta cách các coding agents thương mại vận hành.

### Ba tầng abstraction

1. **Tầng 1 dùng như user:** cài Deep Agents CLI, thêm skills, dùng trực tiếp.
2. **Tầng 2 trace thực thi:** xem LLM calls qua LangSmith Observability, hiểu flow khi agent chạy skill.
3. **Tầng 3 đọc source:** xem code triển khai progressive disclosure, đủ sức tự implement lại.

### Kết quả mong đợi

- Biết dùng, biết agent làm gì, biết code làm gì.
- Đây là kiến thức sâu nhất về agent skills theo transcript.

## 3. Ví dụ và diễn giải

- Tầng 1 giống lái xe: biết cài skill Remotion rồi nhờ agent làm video.
- Tầng 2 giống mở nắp capo khi xe chạy: thấy lúc nào metadata skill được nạp, lúc nào file skill được đọc.
- Tầng 3 giống đọc bản vẽ động cơ: thấy `skills.py`, before-agent và wrap-model-call làm gì.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangSmith](https://docs.smith.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; tên lệnh CLI và đường dẫn source có thể đổi theo version mới.

> **Hộp cập nhật:** khi có mạng, đối chiếu cách cài Deep Agents CLI, vị trí file `skills.py` trong `libs/deepagents/deepagents/middleware` và docs skills mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Tầng 1 | Dùng skills qua Deep Agents CLI như user |
| Tầng 2 | Trace qua LangSmith để thấy LLM calls và flow |
| Tầng 3 | Đọc source `skills.py` hiểu progressive disclosure |
| Vì sao Deep Agents | Open-source, thấy được thứ closed source giấu |
| Đích | Biết dùng, biết chạy, biết tự làm |

**Một câu chốt:** Muốn hiểu sâu skills, hãy đi đủ ba tầng từ dùng tới đọc code.

## 6. Câu hỏi tự kiểm tra

1. Ba tầng hiểu skills là gì?
2. Vì sao không mổ Claude Code mà mổ Deep Agents?
3. Tầng 2 dùng công cụ nào?
4. Progressive disclosure nằm ở tầng nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Dùng skills qua CLI, trace thực thi qua LangSmith, đọc source triển khai progressive disclosure.

**2.** Vì Claude Code và các coding agents lớn closed source; Deep Agents open-source nên xem được code.

**3.** LangSmith Observability platform để xem LLM calls và flow khi agent chạy skill.

**4.** Tầng 3, trong code `skills.py`, nhưng đã thấy biểu hiện ở tầng 2 qua trace.

</details>

## 7. Bước tiếp theo

Bài 154 — *Level 1: Dùng Skills trong Deep Agents CLI* — cài skill Remotion và làm video bằng code.

Nguồn: transcript gốc `153 - The 3 Layers of AI Agent Skills From Usage to Source Code.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
