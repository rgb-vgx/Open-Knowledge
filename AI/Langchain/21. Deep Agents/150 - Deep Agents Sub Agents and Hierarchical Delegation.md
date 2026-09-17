---
title: "Bài 150 - Sub-Agents và Hierarchical Delegation"
course: "LangChain"
lesson: "150"
status: "edited-verified"
source: "150 - Deep Agents Sub Agents and Hierarchical Delegation.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "sub-agents", "hierarchical-delegation", "context-isolation"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 150 — Sub-Agents và Hierarchical Delegation

> Bài học được biên soạn từ transcript "Deep Agents Sub Agents and Hierarchical Delegation".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa sub-agents và hierarchical delegation.
2. Giải thích vì sao mỗi sub-agent cần system prompt, description và bộ tools riêng.
3. Nói được lợi ích context isolation và chạy song song.
4. Giữ đúng thuật ngữ Anh: sub-agents, hierarchical delegation, context isolation, system prompt.

## 2. Kiến thức cốt lõi

### Hierarchical delegation là gì?

- Deep agent có thể spawn các instance chuyên biệt của chính nó cho task hẹp.
- Mỗi **sub-agent** mang system prompt khác, description khác, bộ tools khác.
- Giống đời thật: muốn ủy thác phải đảm bảo người nhận có đúng kỹ năng, đúng đồ nghề, và được giải thích đúng việc.

### Context isolation

- Sub-agent chạy vòng ReAct/tool-calling riêng trong context window riêng.
- Main agent không thấy chi tiết trung gian, chỉ nhận final response gọn.
- Nhờ vậy công việc chuyên sâu không pollute attention của main agent.

### Vì sao mạnh?

- Mở rộng quy mô: nhiều việc chuyên môn chạy song song.
- Tăng chất lượng: worker chuyên biệt làm tốt hơn agent đa năng.
- Tiết kiệm context chính, cho phép đi sâu hơn.

## 3. Ví dụ và diễn giải

- Analogy trong transcript: tác giả không biết khoan tường, phải nhờ bố vợ. Ông mang box cutter và thang riêng, có key vào nhà, làm xong báo kết quả; lúc ông làm, tác giả không biết chi tiết, chỉ nhận thành quả hết ồn khi mưa.
- Sub-agent cũng vậy: nhận prompt mô tả task, mang system prompt và tools riêng, làm trong isolation, trả artifact cuối.
- Ví dụ kỹ thuật: Claude Code bật exploration agent đi tìm authentication patterns trong lúc main agent vẫn chạy.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được nội dung mới.
- Bài giữ trung thành transcript; phần implementation chi tiết hẹn ở các video sau, không suy diễn thêm API.

> **Hộp cập nhật:** khi có mạng, đối chiếu cách khai báo sub-agent trong `deepagents` gồm name, description, system prompt và tools với docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Cơ chế | Deep agent spawn sub-agent chuyên biệt |
| Mỗi worker có | system prompt, description, tools riêng |
| Chạy | ReAct loop riêng, isolated context |
| Trả về | Chỉ final response, không lộ trung gian |
| Lợi ích | Context isolation, parallel execution, sâu và hiệu quả hơn |

**Một câu chốt:** Muốn scale mà không bloat context, hãy ủy thác cho worker chuyên biệt chạy cô lập.

## 6. Câu hỏi tự kiểm tra

1. Hierarchical delegation nghĩa là gì?
2. Vì sao sub-agent cần tools riêng?
3. Context isolation giúp gì cho main agent?
4. Sub-agent trả về main agent cái gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Deep agent tạo các sub-agent chuyên biệt theo tầng và ủy thác task hẹp cho chúng.

**2.** Vì mỗi task cần đồ nghề khác nhau; đúng tools mới làm được việc như analogy bố vợ mang box cutter và thang.

**3.** Giữ main context lean, tránh pollution từ chi tiết chuyên sâu, cho phép chạy song song.

**4.** Chỉ final response gọn, không kèm toàn bộ intermediate steps.

</details>

## 7. Bước tiếp theo

Bài 151 — *Sub-Agents Context Flow* — xem luồng context vào ra sub-agent và vì sao main thread giữ được lean.

Nguồn: transcript gốc `150 - Deep Agents Sub Agents and Hierarchical Delegation.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
