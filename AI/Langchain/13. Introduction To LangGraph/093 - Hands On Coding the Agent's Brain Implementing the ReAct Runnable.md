---
title: "Bai 093 - Coding the Agent Brain voi Function Calling"
course: langchain
lesson: 93
status: edited-verified
source: "093 - Hands On Coding the Agent's Brain Implementing the ReAct Runnable.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; ten import co the doi"
categories: [AI]
tags: [function-calling, tool-calling, bind-tools, Tavily, triple-tool]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/tools", "https://python.langchain.com/docs/integrations/tools/tavily_search/", "https://platform.openai.com/docs/guides/function-calling"]
---

# Bài 093 — Coding the Agent Brain với Function Calling

> Nguồn transcript: `093 - Hands On Coding the Agent's Brain Implementing the ReAct Runnable.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên mạch code kể miệng; không bịa code đầy đủ).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Tạo triple tool bằng `@tool` và viết description cho LLM.
2. Ghép search (Tavily, max_results=1) với triple thành list tools.
3. Giải thích function calling khác ReAct prompt cũ ở đâu.
4. Bind tools vào ChatOpenAI để vendor lo parse.
5. Chạy thử file không lỗi và commit.

---

## 2. Nội dung chính theo mạch transcript

File `react.py` giữ reasoning logic. TL;DR: dùng function calling làm reasoning engine quyết gọi tool nào.

Imports kể miệng: `load_dotenv`, `@tool` từ langchain-core, `ChatOpenAI` từ langchain-openai, search tool từ langchain-tavily. Load env xong viết tools.

Triple tool: hàm nhận int/float trả về triple, giảng viên để Cursor autocomplete rồi xóa code thừa. Description của hàm sẽ propagate tới LLM để nó quyết có dùng không. Gắn `@tool` là thành LangChain tool plug được.

List `tools` gồm search prebuilt (khởi tạo max_results=1, description đã có sẵn từ maintainers) và triple vừa viết.

Vì sao không dùng ReAct prompt: xưa dùng fancy prompt phái sinh từ ReAct paper để leverage reasoning; nay có cách tốt hơn là function calling — feature của hầu hết modern LLM: lúc init gửi kèm definitions/descriptions tools, LLM trả về có cần gọi hàm nào với args nào không. Implementation mỗi vendor một kiểu, có lẽ là system prompt đặc biệt kiểu ReAct + parse gọn, đặt function call vào key riêng trong response. Đừng lo chi tiết, chỉ cần nhớ đây là modern way: offload chọn tool cho vendor, khỏi parse tay, performance cải thiện vì vendor có engineers chuyên trị.

Triển khai: init ChatOpenAI rồi `.bind_tools(tools)` — LangChain gửi tool descriptions mỗi request, LLM trả về tool_calling field với hàm cần gọi, khỏi parse vì vendor lo. Chạy thử script không chạy gì mà không lỗi là đạt, commit `function-calling-reasoning`, push, video sau làm nodes.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| `@tool` biến function thành tool | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/tools | Quy ước hiện tại, tên import check docs mới. |
| `.bind_tools` gửi descriptions, nhận tool calls | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/tools | Hiện gọi là tool calling chuẩn hóa đa vendor. |
| Function calling do vendor parse giùm | VẪN ĐÚNG | https://platform.openai.com/docs/guides/function-calling | Mỗi vendor một format, LangChain unify lại. |

> Hộp cập nhật 2026-09-17: Giữ nguyên mạch kể miệng, không dựng code đầy đủ vì transcript không cho code text. Khi code thật check tên package Tavily và signature `bind_tools` hiện tại.

---

## 4. Tóm tắt

| Mảnh | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Triple | `@tool` + description | Dạy LLM khi nào dùng |
| Search | Prebuilt, max 1 | Đủ demo, thiếu thì tăng |
| Reasoning | `.bind_tools` | Vendor parse giùm |
| ReAct cũ | Parse tay | Giờ bỏ |

**Chốt: Muốn agent chọn tool chuẩn thì mô tả tool tử tế rồi bind cho vendor lo — đừng parse prompt tay nữa.**

---

## 5. Câu hỏi tự kiểm tra

1. Triple tool nhận gì trả gì?
2. Description của tool đi đâu?
3. Search tool trong bài cấu hình gì?
4. Function calling khác ReAct prompt cũ thế nào?
5. `.bind_tools` làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Nhận int/float, trả về triple của nó.

**2.** Propagate tới LLM để nó quyết có dùng tool không.

**3.** Prebuilt Tavily search, max_results=1, description có sẵn từ maintainers.

**4.** ReAct cũ parse output prompt tay; function calling gửi definitions cho vendor, vendor trả function cần gọi trong key riêng.

**5.** Gắn tool descriptions vào ChatOpenAI, mỗi request gửi cho LLM để nó trả về tool_calling field chuẩn.

</details>

## 6. Bước tiếp theo

Bài 095 — *Nối Nodes thành Graph* — entry point, conditional edges và vẽ flow (bài 094 trống, bỏ qua).

> Ghi chú: Bài 094 `Hands On Building Blocks Defining Your Agent's Nodes` file transcript 0 byte nên bỏ qua, không tạo bài học.
