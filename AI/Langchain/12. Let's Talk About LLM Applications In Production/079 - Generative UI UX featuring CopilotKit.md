---
title: "Bai 079 - Generative UI UX voi CopilotKit"
course: langchain
lesson: 79
status: edited-verified
source: "079 - Generative UI UX featuring CopilotKit.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; vi du CopilotKit theo thoi diem quay"
categories: [AI]
tags: [generative-UI, UX, CopilotKit, CoAgents, trust]
doc_refs: ["https://docs.copilotkit.ai/", "https://langchain-ai.github.io/langgraph/", "https://docs.langchain.com/langsmith"]
---

# Bài 079 — Generative UI/UX với CopilotKit

> Nguồn transcript: `079 - Generative UI UX featuring CopilotKit.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên nhận định chủ quan và ví dụ docs CopilotKit thời điểm quay).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao backend đúng chưa đủ, cần UI/UX tạo trust.
2. Nêu 3 thứ cần minh bạch: tools, reasoning, sources.
3. Mô tả CopilotKit cung cấp gì cho frontend generative AI.
4. Hiểu vì sao frontend cho LangGraph khó và CoAgents giúp gì.
5. Nhớ giảng viên không affiliation, chỉ giới thiệu topic.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Backend chỉ là một mảnh ghép

Build backend agent/RAG cho output trustworthy mới là một challenge. Muốn app complete phải có UI đẹp và UX tự nhiên để user tin. User biết generative app flaky, không phải lúc nào cũng đúng, nên trust phải đi mà giành lấy.

### 2.2. Minh bạch để tạo trust

- Agent: cho biết có tools nào, đang dùng tool nào, vì sao chọn tool đó, các tính toán trung gian tới đáp án cuối.
- RAG: cho biết đã dùng documents nào để generate, đáp án grounded từ đâu.
- Thấy được cách đáp án được curate thì trust tăng lên.

### 2.3. CopilotKit

Open-source được transcript đánh giá là building blocks tốt nhất hiện tại cho generative UI. Mọi demo trong video lấy từ docs CopilotKit. Repo có starter kits cho frontend của backend generative AI. Cung cấp components và hooks để build generative UI/UX trên app chạy LangChain hay LangGraph mà không cần đi sâu full-stack trong khóa này.

Điểm nhấn: hỗ trợ LangChain/LangGraph qua CoAgents tích hợp seamless với LangGraph backend. Video của Ariel (CopilotKit) demo rất đẹp — transcript sẽ link.

### 2.4. Vì sao frontend LangGraph là ác mộng nếu tự làm

LangGraph app có state đổi liên tục, intermediate results trong state, nodes chạy (có khi parallel), human-in-the-loop dừng graph chờ user input rồi resume. Tự build frontend cho chừng ấy moving parts rất nightmare. CopilotKit làm sẵn components cho tất cả, integrate với LangGraph được đánh giá super easy. Giảng viên nói rõ không affiliation, genuinely tin project làm tốt mảng generative UI.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Cần transparency tools/reasoning/sources | VẪN ĐÚNG | https://docs.langchain.com/langsmith | LangSmith tracing + citations đúng để làm việc này. |
| CopilotKit có components/hooks và CoAgents cho LangGraph | VẪN ĐÚNG về hướng | https://docs.copilotkit.ai/ | Chưa fetch full do giới hạn mạng; API cụ thể đổi theo version, phải đọc docs hiện tại. |
| Đánh giá best building blocks, super easy | GIỮ NGUYÊN ý kiến chủ quan | https://docs.copilotkit.ai/ | Ý kiến thời điểm quay, không phải fact kỹ thuật. |

> Hộp cập nhật 2026-09-17: Giữ nguyên ví dụ và nhận định gốc. Trước khi dùng phải check docs CopilotKit và LangGraph hiện tại vì API frontend/backend đổi nhanh. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Mảnh | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Trust | Transparency | Tool nào, vì sao, nguồn nào |
| Agent UI | State + tool calls hiển thị | Thấy mạch suy luận |
| RAG UI | Citations | Thấy grounding |
| Stack gợi ý | CopilotKit + CoAgents + LangGraph | Đỡ ác mộng frontend |

**Chốt: Muốn user tin app generative thì show ra nó làm gì, dùng gì, dựa vào đâu — CopilotKit là một đường tắt frontend được gợi ý.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao backend đúng vẫn chưa đủ?
2. Với agent cần minh bạch những gì?
3. Với RAG cần minh bạch gì?
4. CopilotKit cung cấp gì?
5. Vì sao frontend LangGraph tự làm là nightmare?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì user biết generative app flaky, muốn app complete phải có UI đẹp và UX tự nhiên để tạo trust.

**2.** Có tools nào, đang dùng tool nào, vì sao chọn, reasoning và tính toán trung gian tới đáp án cuối.

**3.** Đã dùng documents nào để generate để biết grounded từ đâu.

**4.** Open-source components, hooks, starter kits cho generative UI, nổi bật là CoAgents tích hợp LangGraph backend.

**5.** Vì state đổi liên tục, intermediate results, nodes parallel, human-in-the-loop dừng/resume — quá nhiều moving parts.

</details>

## 6. Bước tiếp theo

Bài 080 — *LangChain Academy* — khóa miễn phí đi sâu LangSmith tracing, monitoring, evaluation.
