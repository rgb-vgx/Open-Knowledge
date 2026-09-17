---
title: "Bai 085 - LangGraph la gi"
course: langchain
lesson: 85
status: edited-verified
source: "085 - What is LangGraph.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem LangGraph on dinh"
categories: [AI]
tags: [LangGraph, agents, cycles, LCEL]
doc_refs: ["https://docs.langchain.com/langgraph", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 085 — LangGraph là gì

> Nguồn transcript: `085 - What is LangGraph.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 đối chiếu một phần qua WebFetch).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao LangChain cần thêm LangGraph.
2. Mô tả giới hạn acyclic của LCEL và vòng while ad-hoc của ReAct.
3. Định nghĩa LangGraph: language agents as graphs có cycles.
4. Hiểu khái niệm flow engineering: dev định flow, LLM chọn nhánh.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. LangChain đã đi xa nhưng thiếu cycles

LangChain một năm tuổi, amazing cho RAG và agents, ngày càng secure, flexible, readable, usable — nhất là nhờ LangChain Expression Language với composability. Nhưng agents trong LangChain có limitation, minh họa bằng diagram lúc launch LangGraph.

Thang tự do: code tuần tự deterministic ta kiểm soát hết → LLM call đơn (LLM quyết output, ta quyết trước/sau, ví dụ nhờ giải thích alert cybersecurity) → chains nối nhiều LLM calls vẫn kiểm soát trước/sau → router chains/agents dùng LLM quyết gọi nhánh nào, làm dễ bằng LCEL.

Nhưng LCEL chỉ làm acyclic graphs: flow viết trước, một chiều, không iterate quay lại node cũ. Muốn lặp phải chế ad-hoc như ReAct algorithm với while loop đúng nghĩa trong source code.

### 2.2. LangGraph thêm chiều cycles

LangGraph cho thêm dimension tự do và complexity: implement cycles rất elegant và dễ. Agent phức tạp có thêm tự do nhưng vẫn trong khuôn. Liên quan khái niệm flow engineering: dev định flow chương trình, LLM giúp chọn đi flow A hay B, finish hay quay lại điểm bắt đầu.

Docs định nghĩa: building language agents as graphs — toàn bộ logic/flow agent diễn đạt thành graph có cycles. Nhờ đó build được advanced systems mà khóa này sẽ demo.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| LCEL chỉ acyclic, ReAct phải while-loop ad-hoc | VẪN ĐÚNG lịch sử | https://docs.langchain.com/langgraph | Đúng thời điểm launch; hiện tại LangGraph là đường chính cho agents. |
| LangGraph = agents as graphs có cycles | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch 2026-09-17 xác nhận StateGraph, START/END, compile/run. |
| Flow engineering dev định flow, LLM chọn nhánh | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | Khớp durable execution + conditional branching hiện tại. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời về khái niệm. Triển khai API cụ thể đổi theo version, phải đọc docs hiện tại khi code. Không thêm code vì transcript lý thuyết.

---

## 4. Tóm tắt

| Khái niệm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| LangChain chains | Acyclic | Một chiều |
| ReAct cũ | While-loop ad-hoc | Chạy được nhưng khó kiểm soát |
| LangGraph | Graph có cycles | Lặp, rẽ nhánh, quay lại |

**Chốt: Muốn agent lặp và rẽ nhánh đàng hoàng thì diễn đạt nó thành graph — đó là LangGraph.**

---

## 5. Câu hỏi tự kiểm tra

1. LCEL thiếu gì mà phải cần LangGraph?
2. Ví dụ LLM call đơn trong transcript là gì?
3. Router chain làm gì?
4. Vì sao ReAct cũ bị gọi là ad-hoc?
5. Flow engineering phân vai dev và LLM thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Chỉ làm acyclic graphs, không có cycles để iterate quay lại node cũ.

**2.** Công ty cybersecurity nhờ LLM giải thích alert — LLM quyết output, dev quyết steps trước/sau.

**3.** Dùng LLM quyết gọi nhánh nào/bước nào, vẫn trong flow một chiều định trước.

**4.** Vì lặp bằng while loop nhúng trong source, không phải cấu trúc graph tường minh, khó kiểm soát và mở rộng.

**5.** Dev định flow, LLM giúp chọn đi nhánh nào, finish hay quay lại — cycles cho tự do có kiểm soát.

</details>

## 6. Bước tiếp theo

Bài 086 — *Why LangGraph* — phổ autonomy từ deterministic tới autonomous và chỗ LangGraph lấp vào.
