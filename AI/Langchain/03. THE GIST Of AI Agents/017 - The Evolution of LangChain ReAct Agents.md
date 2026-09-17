---
title: 'Bài 017 — Sự Tiến Hóa Của ReAct Agents'
course: 'langchain'
lesson: 17
status: edited-verified
source: '017 - The Evolution of LangChain ReAct Agents.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/overview'
---

# Bài 017 — Sự Tiến Hóa Của ReAct Agents

> Biên soạn từ transcript "017 - The Evolution of LangChain ReAct Agents.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Kể 4 nấc tiến hóa agent: ReAct prompting → tool calling → LangGraph ReAct → `create_agent` v1.0.
- Giải thích vì sao chuyển từ prompting sang function calling.
- Nêu lợi ích LangGraph mang lại: durable execution, persistence, fine-grained control.
- Mô tả lộ trình học của khóa học: từ `create_agent` mới nhất quay ngược về OG ReAct rồi build lên.

## 1. Nấc 1 — ReAct prompting thuần (11/2022)

Transcript nêu: LangChain ReAct agent ban đầu rely purely on ReAct prompting — model reason về actions và observations ở text-based format. Đây là stepping stone của implementing agents, đúng tinh thần reasoning + acting ở Bài 015.

Hạn chế ngầm hiểu: mọi thứ qua text nên kém reliable, khó parse — lý do phải tiến lên nấc sau.

## 2. Nấc 2 — Tool calling agents

Khi LLM landscape evolve với native function calling capabilities, architecture transitioned sang tool calling agents — leverage structured function calling thay vì prompt-based tool selection. Kết quả: tool execution more reliable và more efficient.

> Giữ nguyên cách giảng viên ví von: đây là bước chuyển từ "chọn tool bằng prompt" sang "gọi hàm có cấu trúc".

## 3. Nấc 3 — ReAct agent trên LangGraph

Next major leap: giữ function calling nhưng rebuilt agent on top of LangGraph low-level orchestration framework. Được thêm:

| Khả năng | Ý nghĩa giữ nguyên lời giảng |
|---|---|
| durable execution | Chạy bền, không mất giữa chừng |
| persistence ability | Lưu state qua các bước |
| fine-grained control | Điều khiển chi tiết từng node |

Đây là nền cho production-grade applications.

## 4. Nấc 4 — `create_agent` trong LangChain 1.0

Transcript: trong LangChain version 1.0, LangChain introduced `create_agent` function — clean, high-level interface nhưng powered với battle-tested LangGraph ReAct agent under the hood.

```
ReAct prompting (2022) ──> tool calling ──> LangGraph ReAct ──> create_agent (v1.0)
```

## 5. Lộ trình học hands-on của khóa học

Giảng viên chốt phương pháp:

1. Start từ latest and greatest `create_agent` — section này chỉ học interface, how to create và get started really quick.
2. Đi ngược về original OG ReAct implementation.
3. Progressively build up tới modern V1 agent architecture.

Mục tiêu: hiểu not just how to use mà how they work underneath the hood, mỗi iteration improved gì — cho strong intuition khi implementing production-grade agents. Giảng viên thừa nhận đã nhắc tool calling và LangGraph khi chưa dạy — hẹn diving very deep từng topic, chỉ cần nhớ một điều: sẽ iterate qua implementations tới final robust production-ready agent.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `create_agent` là high-level interface powered bởi LangGraph ReAct under the hood | `create_agent` là small adaptable scaffold từ model, tools, prompt, middleware; overview ghi powered bởi underlying graph framework | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Tiến hóa từ ReAct prompting sang tool calling (structured function calling) reliable hơn | Docs định nghĩa agent là model calling tools in loop; `@tool` với type hints mandatory cho input schema | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |
| LangGraph cho durable execution, persistence, fine-grained control production-grade | Execution giữ message record, tiếp tục qua thread + checkpointer, middleware cho memory, retries, human review | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): không có — bài này không chứa code, chỉ road map kiến trúc.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| ReAct text-based thiếu reliable | Chuyển sang tool calling với structured function calling |
| Agent thiếu bền vững khi chạy dài | Rebuild trên LangGraph: durable execution + persistence + control chi tiết |
| API cồng kềnh, khó bắt đầu nhanh | `create_agent` — interface sạch trên nền LangGraph battle-tested |
| Học vẹt API mà không hiểu gốc | Đi từ mới nhất ngược về OG ReAct rồi build lên V1 |

**Một câu chốt:** Mọi agent hiện đại đều là ReAct khoác thêm function calling và LangGraph — `create_agent` chỉ là cửa vào sạch nhất của stack đó.

## Câu hỏi tự kiểm tra

1. 4 nấc tiến hóa agent là gì?
2. Vì sao tool calling reliable hơn ReAct prompting thuần?
3. LangGraph bổ sung 3 khả năng nào?
4. `create_agent` trong v1.0 là gì?
5. Lộ trình học của khóa học đi theo thứ tự nào và vì sao?

<details><summary><b>Xem đáp án</b></summary>

**1.** ReAct prompting (11/2022, text-based) → tool calling agents (structured function calling) → ReAct trên LangGraph (durable, persistence, control) → `create_agent` v1.0 (high-level interface trên LangGraph ReAct).

**2.** Vì dùng native structured function calling thay vì prompt-based tool selection nên execution more reliable và efficient — model trả function cần invoke thay vì text phải parse.

**3.** Durable execution, persistence ability và fine-grained control — nền cho production-grade applications.

**4.** Clean high-level interface nhưng powered bởi battle-tested LangGraph ReAct under the hood; cách start nhanh nhất, section này chỉ học interface của nó.

**5.** Từ `create_agent` mới nhất quay ngược về OG ReAct rồi build dần lên V1 — để hiểu không chỉ how to use mà how they work, mỗi iteration improved gì.

</details>

## Bước tiếp theo

Bài 018 — *Setting Up the Environment for a LangChain Search Agent* — cài `langchain-tavily` và lấy `TAVILY_API_KEY`.
