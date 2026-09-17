---
title: 'Bài 102 — LangSmith Tracing'
course: langchain
lesson: 102
status: edited-verified
source: '102 - LangSmith Tracing.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.smith.langchain.com/
- https://docs.langchain.com/langgraph
---

# Bài 102 — LangSmith Tracing

> Nguồn: `102 - LangSmith Tracing.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Invoke graph với input "make this tweet better" + tweet mẫu về tool calling.
2. Mở trace LangSmith của project reflection agent và nhận ra các node trong trace.
3. Đọc final prompt để thấy toàn bộ lịch sử generate → reflect.
4. Giải thích vì sao chạy mất ~20s: nhiều lần gọi LLM nối tiếp.

## 2. Nội dung chính theo mạch transcript

### 2.1. Input mẫu

- Content: "make this tweet better" + tweet cũ về tính năng tool calling của LangChain — một interface thống nhất cho function calling, trước đó chỉ OpenAI function được hỗ trợ, nay dùng được Gemini, Anthropic Claude và mọi model hỗ trợ function calling.
- Chạy `graph.invoke(...)` và chờ thực thi.

### 2.2. Đọc trace

- Sang LangSmith, project reflection agent, mở trace đang chạy; toàn bộ mất gần 20s vì nhiều API call tới LLM.
- Final prompt chứa system message (Twitter influencer), user input, rồi các vòng: generate revision → reflection feedback (bị gắn nhãn human) → generate lại... tới tweet cuối.
- Cột trái LangSmith hiện đủ object LangGraph: `should_continue`, reflection nodes... — traceability built-in.

### 2.3. Chốt của giảng viên

- Đây là bản slim của critiquing algorithm; làm bằng LangChain thuần cũng được nhưng LangGraph gọn hơn nhiều.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `graph.invoke` với dict input | API invoke graph cơ bản của LangGraph. | https://docs.langchain.com/langgraph |
| Trace LangSmith hiện từng node/edge | LangSmith hỗ trợ tracing LangGraph objects. | https://docs.smith.langchain.com/ |

> Ghi nhận: transcript không đi sâu cấu hình LangSmith ngoài bài 099; không phát hiện nội dung lỗi thời. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế nên không khẳng định version mới.

## 4. Tóm tắt một trang

| Quan sát | Ý nghĩa |
|---|---|
| Input tweet về tool calling | Ngữ cảnh demo |
| ~20s chạy | Nhiều vòng gọi LLM nối tiếp |
| Final prompt | Chứa toàn bộ lịch sử hội thoại |
| Trace hiện nodes | Debug được từng bước graph |

**Một câu chốt:** Muốn hiểu agent đã làm gì, đừng chỉ đọc tweet cuối — hãy mở trace và đọc final prompt, nơi toàn bộ quá trình tự chê-tự sửa hiện ra.

## 5. Câu hỏi tự kiểm tra

1. Input invoke gồm mấy phần?
2. Vì sao trace mất ~20s?
3. Final prompt chứa gì mà các prompt giữa chừng không có?
4. Feedback reflection hiện nhãn gì trong lịch sử và vì sao (nhắc lại bài 101)?
5. LangSmith cho thấy những object LangGraph nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Hai phần: chỉ dẫn "make this tweet better" và nội dung tweet gốc về tool calling.

**2.** Vì mỗi vòng lặp gọi LLM ít nhất hai lần (generate + reflect), nhiều vòng nối tiếp nên cộng dồn latency.

**3.** Toàn bộ lịch sử: system message, user input, mọi bản tweet trung gian và mọi critique — là bức tranh đầy đủ nhất của quá trình.

**4.** Nhãn human (dù do AI sinh) — heuristic bài 101 để bản revise sau "nghe lời" feedback hơn.

**5.** Các node generate/reflect và hàm router `should_continue` — đúng các object đã khai báo trong graph.

</details>

## 6. Bước tiếp theo

Bài 103 — *What are we building: A Reflexion Agent* — mở rộng reflection với tool search, actor/revisor và paper Reflexion.
