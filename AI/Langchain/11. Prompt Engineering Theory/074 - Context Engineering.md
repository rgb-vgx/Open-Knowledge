---
title: "Bai 074 - Context Engineering"
course: langchain
lesson: 74
status: edited-verified
source: "074 - Context Engineering.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem context engineering on dinh"
categories: [AI]
tags: [context-engineering, agents, prompt-evolution, tools]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/agents", "https://langchain-ai.github.io/langgraph/", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"]
---

# Bài 074 — Context Engineering

> Nguồn transcript: `074 - Context Engineering.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích context engineering là gì và vì sao là evolution của prompt engineering.
2. Kể các nguồn context đổ vào LLM.
3. Mô tả 3 bệnh của agent chạy dài: poisoning, confusion, clash.
4. Hiểu vì sao cả developer lẫn user đều cần biết context engineering.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Từ wrapper đến engineering thật

Giảng viên (Eden) nói mọi app như Cursor, Claude Code rốt cuộc cũng là một prompt gửi tới LLM cộng rất nhiều engineering xung quanh. Gọi chúng là wrapper cũng có phần đúng, nhưng làm wrapper ngon đòi deep knowledge vì mỗi call kèm context từ nhiều nguồn.

Context có thể đến từ developer viết app, từ user, từ interaction trước đó, từ tool calls và external data. Số nguồn tăng mỗi ngày. Gửi đúng và relevant context không đơn giản như thời đầu tưởng chỉ cần viết prompt fancy là xong.

### 2.2. Prompt tĩnh vs context động

Prompt là tĩnh, nhưng các mảnh context cực kỳ dynamic. Muốn ráp đúng contents phải có dynamic system, không thể chỉ một prompt tĩnh. Đó là realm của context engineering — evolution tự nhiên của prompt engineering nhưng sâu hơn nhiều.

Nguyên tắc garbage in, garbage out: agent fail phần lớn vì không được cấp đúng context. LLM không đọc được suy nghĩ, phải đưa đúng thông tin, đôi khi còn phải đưa đúng tools để nó tự fetch thông tin và hành động.

### 2.3. Bệnh khi task dài

LLM reason ngày càng giỏi, có tool calling, chạy loop gọi tool lấy output tới khi xong task. Nhưng task dài và phức tạp thì feedback tool calls tích lũy, context window phình to, dễ vượt giới hạn, tăng cost, tăng latency, cuối cùng degrade performance.

Ba kiểu degrade transcript nêu:

- **Context poisoning:** một tool call đưa hallucination vào context rồi làm hỏng cả hệ thống.
- **Context confusion:** context thừa không cần cho task nhưng vẫn ảnh hưởng response.
- **Context clash:** các phần context mâu thuẫn nhau.

### 2.4. Ai cần học

Một số kỹ thuật nằm phía developer app (như Claude Code implement), một số nằm phía user — user Claude Code ảnh hưởng lớn tới context cuối cùng gửi tới LLM. Nghĩa là non-developer cũng cần hiểu nguyên tắc này mới có đáp án tốt hơn. Video sau sẽ đi vào techniques cụ thể, lấy coding agents làm ví dụ trung tâm.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| App agent = prompt + context động từ nhiều nguồn | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | LangGraph docs mô tả state/messages/tool outputs cùng đổ vào context. |
| Context dài gây cost/latency/degrade | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents | Chưa fetch full do giới hạn mạng; giữ mạch gốc. |
| Poisoning/confusion/clash | VẪN ĐÚNG về bản chất | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Tên gọi là quy ước sư phạm của khóa học, hiện tượng được docs nhiều vendor thừa nhận. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Khái niệm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Prompt engineering | Tĩnh | Viết prompt hay |
| Context engineering | Động | Ráp đúng context đúng lúc |
| Bệnh context | Poisoning/confusion/clash | Thừa, bẩn, mâu thuẫn đều hại |
| Đối tượng | Dev + user | Ai cũng ảnh hưởng output |

**Chốt: Agent ngon hay dở quyết định ở chỗ có đưa đúng context cho LLM hay không — đó là context engineering.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao gọi Cursor/Claude Code là wrapper mà vẫn khó làm?
2. Kể 4 nguồn context trong transcript.
3. Vì sao prompt tĩnh không đủ?
4. Ba bệnh context là gì?
5. Vì sao non-developer cũng cần học context engineering?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì lõi vẫn là prompt gửi tới LLM, nhưng làm wrapper ngon cần deep knowledge ráp đúng context động từ nhiều nguồn — không đơn giản.

**2.** Developer của app, user, interaction trước đó, tool calls và external data khác.

**3.** Vì context cực kỳ dynamic, muốn ráp đúng contents phải có dynamic system, không thể một prompt tĩnh bao hết.

**4.** Poisoning (hallucination lọt vào làm hỏng hệ thống), confusion (context thừa gây nhiễu), clash (các phần mâu thuẫn nhau).

**5.** Vì user ảnh hưởng lớn tới context cuối cùng gửi tới LLM, hiểu nguyên tắc thì mới có response tốt hơn.

</details>

## 6. Bước tiếp theo

Bài 075 — *Context Engineering a System Prompt* — xem system prompt 200-400 dòng của Claude Code, Cursor, Devin và vùng Goldilocks.
