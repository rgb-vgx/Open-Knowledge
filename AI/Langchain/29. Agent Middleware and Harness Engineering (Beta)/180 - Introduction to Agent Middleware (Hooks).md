---
title: 'Bài 180 — Giới thiệu Agent Middleware và Hooks'
course: 'langchain'
lesson: 180
status: edited-verified
source: '180 - Introduction to Agent Middleware (Hooks).md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [middleware, harness, hooks, agent-engineering, claude-code]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 180 — Giới thiệu Agent Middleware và Hooks

> Nguồn transcript: `180 - Introduction to Agent Middleware (Hooks).md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (đã đối chiếu một phần qua WebFetch; không bịa thêm ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được agent middleware là gì ở mức giới thiệu và vì sao nó quan trọng.
2. Giải thích mối quan hệ giữa middleware, harness engineering và agent engineering.
3. Phân biệt cách gọi tên middleware trong LangChain và hooks trong Claude Code.
4. Nêu được kỳ vọng của cả section: hiểu sâu agent harness qua middleware.

---

## 1. Middleware là building block của harness engineering

Giảng viên (Eden) mở đầu section bằng định vị rất rõ:

- Trong vài video tới, chủ đề là **agent middleware**.
- **Middleware là building block rất quan trọng** trong **harness engineering** và **agent engineering**.
- Học middleware giúp có **in-depth understanding** về các **agent harness** như **Claude Code**.

> Ý chốt: muốn hiểu harness (bộ khung vận hành agent) thì phải hiểu middleware, vì phần lớn hành vi của harness nằm ở đó.

Thuật ngữ cần giữ:

| Thuật ngữ | Hiểu nhanh theo transcript |
|---|---|
| **middleware** | Logic chạy xuyên suốt vòng đời agent, không nằm trong business logic lõi |
| **harness** | Bộ khung điều phối agent: gọi model, chạy tool, quản lý context, retry, dừng |
| **agent engineering** | Thiết kế hành vi agent |
| **harness engineering** | Xây harness chạy agent đó ổn định, an toàn, tiết kiệm |

## 2. Middleware và hooks là một ý tưởng

Điểm gây nhầm lẫn nhất được gỡ ngay từ video giới thiệu:

- Trong **Claude Code**, middleware được gọi là **hooks**.
- **Middleware và hooks diễn đạt cùng một ý tưởng** (portray the same idea).
- Khác nhau chỉ là tên gọi theo hệ sinh thái; bản chất đều là điểm chèn logic vào lifecycle của agent.

Section này sẽ đi sâu (diving deep) vào ý tưởng chung đó, thay vì bám vào một API cụ thể.

## 3. Lộ trình section

Transcript gốc không liệt kê code, chỉ nêu cam kết nội dung:

1. Làm rõ middleware là gì (Bài 181).
2. Nêu use cases khiến middleware làm harness tốt hơn: context, reliability, cost, security (Bài 182).
3. Từ đó có nền để hiểu implementation bên trong các harness như Claude Code.

> Transcript gốc không đề cập code, API hay tên hàm cụ thể trong bài này.

---

## 4. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại |
|---|---|---|
| Middleware là building block quan trọng của harness/agent engineering | VẪN ĐÚNG | Docs Agents định nghĩa Agent = Model + Harness, harness lo context đúng lúc qua middleware/extensions — https://docs.langchain.com/oss/python/langchain/agents |
| Claude Code gọi middleware là hooks, cùng một ý tưởng | VẪN ĐÚNG | Docs Claude Code định nghĩa Hooks là handlers chạy tự động tại các điểm trong lifecycle, gồm per session / per turn / every tool call — https://code.claude.com/docs/en/hooks |

> Hộp cập nhật 2026-09-17: Docs LangChain 1.x diễn đạt harness qua các nhóm middleware (workspace, memory/compression, parallel helpers, retries, policy screening, human review), còn Claude Code liệt kê đầy đủ event hooks (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop...). Cách gọi khác nhau nhưng khớp với khẳng định trong transcript: khác tên, cùng ý tưởng. Không thêm code vì transcript không có code.

---

## 5. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| Middleware | Logic chung chèn vào lifecycle agent |
| Harness engineering | Xây bộ khung chạy agent ổn định |
| Hooks (Claude Code) | Tên gọi khác của middleware |
| Section này | Hiểu harness qua middleware |

**Chốt: middleware/hooks là lăng kính để hiểu mọi agent harness như Claude Code.**

---

## 6. Câu hỏi tự kiểm tra

1. Vì sao middleware được gọi là building block quan trọng?
2. Harness engineering khác agent engineering thế nào theo bài này?
3. Hooks trong Claude Code quan hệ gì với middleware?
4. Học middleware giúp hiểu gì về Claude Code?
5. Bài này có đưa ra code hay API cụ thể nào không?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì phần lớn hành vi của harness/agent nằm ở middleware; nắm middleware là nắm cách harness vận hành.

**2.** Agent engineering thiết kế hành vi agent; harness engineering xây khung vận hành agent đó (gọi model, tool, context, retry, dừng).

**3.** Chỉ khác tên gọi, cùng một ý tưởng: chèn logic vào lifecycle.

**4.** Hiểu in-depth cách harness như Claude Code điều phối agent, thay vì coi nó là hộp đen.

**5.** Không. Đây là video định hướng, transcript gốc không đề cập code hay API cụ thể.

</details>

## 7. Bước tiếp theo

Sang Bài 181 — *What is Agent Middleware* — định nghĩa middleware từ web (FastAPI/Express) tới agent loop và các checkpoint.
