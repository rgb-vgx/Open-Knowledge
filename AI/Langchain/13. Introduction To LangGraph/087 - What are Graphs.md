---
title: "Bai 087 - Graphs la gi"
course: langchain
lesson: 87
status: edited-verified
source: "087 - What are Graphs.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; bai ly thuyet nen tang"
categories: [AI]
tags: [graphs, state-machine, nodes, edges]
doc_refs: ["https://docs.langchain.com/langgraph", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 087 — Graphs là gì

> Nguồn transcript: `087 - What are Graphs.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ graph DB và định nghĩa toán như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa graph: nodes/vertices + edges.
2. Kể ứng dụng graphs: social networks, maps, graph DB.
3. Định nghĩa state machine: states + transitions.
4. Thấy state machine vẽ được thành graph.
5. Hiểu LangGraph dùng nodes/edges để mô tả flows agentic.

---

## 2. Nội dung chính theo mạch transcript

Graph là mathematical object diễn đạt relationships, gồm nodes (vertices) và edges nối chúng. Versatile cho social networks, transportation maps roads/routes, và computer science có cả kho research/algorithms/property extraction.

Side note: giảng viên từng làm graph databases cho cybersecurity — mô tả attack vectors của cloud assets AWS/GCP/Azure, hỏi web server có internet-facing và nối vào database không (cloud security posture management). Có để link talk ở Minsk Python Meetup trong resources.

Geek out một chút: G = (V, E), V là set vertices, E là set edges dạng cặp (X, Y) với X, Y thuộc V. Đây là lần cuối thấy math trong khóa này.

State machine là model of computation gồm states và transitions; định nghĩa states + rules chuyển đổi thì quản được complex conditions/sequences. State machines vẽ được thành graphs: states là nodes, transitions là edges — visualization giúp hiểu flow và quản complexity.

LangGraph là library trên LangChain dùng đúng nodes/edges này để mô tả flows, build được sophisticated agentic apps mà code vẫn dễ viết, dễ chạy. Khóa này sẽ demo agents advanced viết rất gọn trong LangGraph.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Graph = V + E | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Định nghĩa toán bất biến. |
| State machine vẽ thành graph | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | LangGraph docs dùng đúng mapping states→nodes, transitions→edges. |
| LangGraph trên LangChain dùng nodes/edges | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch xác nhận StateGraph, START/END, compile/run. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời. Không thêm code vì transcript lý thuyết.

---

## 4. Tóm tắt

| Khái niệm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Graph | Nodes + edges | Diễn đạt quan hệ |
| State machine | States + transitions | Quản flow phức tạp |
| LangGraph | Flow = graph | Node chạy, edge chuyển |

**Chốt: Nắm graph và state machine thì LangGraph chỉ là cách viết flows agentic bằng nodes và edges.**

---

## 5. Câu hỏi tự kiểm tra

1. Graph gồm những gì?
2. Kể 3 ứng dụng graphs trong transcript.
3. State machine là gì?
4. Vì sao state machine vẽ được thành graph?
5. LangGraph dùng hai khái niệm trên thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Nodes (vertices) và edges nối chúng, G = (V, E) với edges là cặp (X, Y).

**2.** Social networks, transportation maps, graph DB cho attack vectors/cloud assets.

**3.** Model of computation gồm states và transitions, định nghĩa states + rules để quản conditions/sequences phức tạp.

**4.** Vì states map thành nodes, transitions map thành edges nên visualization giúp hiểu và quản flow.

**5.** Dùng nodes/edges mô tả flows, build agentic apps sophisticated mà vẫn dễ viết và chạy.

</details>

## 6. Bước tiếp theo

Bài 088 — *LangGraph và Flow Engineering* — dev viết states, LLM chọn flow trong khuôn đã định.
