---
title: "Bài 131 - MCP Inspector để debug MCP server"
course: "LangChain"
lesson: "131"
status: "edited-verified"
source: "131 - MCP Inspector.md"
verified_date: "2026-09-17"
langchain_version: "MCP Inspector (@modelcontextprotocol/inspector); MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-Inspector", "debugging", "tools", "resources", "prompts", "NPX"]
doc_refs: ["https://modelcontextprotocol.io/docs/tools/inspector", "https://github.com/langchain-ai/mcpdoc", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 131 — MCP Inspector để debug MCP server

> Bài học được biên soạn từ transcript "MCP Inspector".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được MCP Inspector là gì và vì sao không thể thiếu khi build MCP servers.
2. Chạy Inspector từ NPX mà không cần cài đặt, nối vào server local.
3. Kể được 4 khu vực: Resources, Prompts, Tools, Notifications và mỗi nơi xem gì.
4. Giữ đúng thuật ngữ Anh: MCP Inspector, resources, prompts, tools, notifications, SSE.

## 2. Kiến thức cốt lõi

### Inspector là gì

- Open source project của Anthropic team — team nghĩ ra Model Context Protocol.
- Nhiệm vụ: troubleshoot, debug, trace, xem chuyện gì thực sự xảy ra trong MCP server.
- Transcript nhấn mạnh: super important tool khi building MCP servers, makes life a lot easier. Bài này chỉ là quick overview, các tính năng hữu ích sẽ gặp dần trong khóa học.

### Chạy không cần cài đặt

- Interactive dev tool để test và debug MCP servers.
- Chạy local từ **NPX**, inspect và tương tác với MCP server mà không cần installation.

### Bốn khu vực trong app

1. **Resources tab** — liệt kê available resources, show metadata, cho inspect content.
2. **Prompts tab** — hiển thị prompt templates, prompt arguments, cho test với custom inputs.
3. **Tools tab** — liệt kê available tools và schemas, cho test tools với custom inputs.
4. **Notifications pane** — logs và notifications từ server.

## 3. Ví dụ và diễn giải

- Demo trong transcript: nối vào một server đang chạy ở localhost, dùng SSE server chứ không phải stdio.
- Bấm Connect → List tools → thấy 2 tools của một documentation MCP server: `list document sources` và `fetch docs`.
- Chạy thử `list document sources` xem output; paste dynamic input vào `fetch docs` rồi xem kết quả execute.
- Giảng viên dặn đừng lo server đó làm gì cụ thể (fetch docs mới nhất của packages nổi tiếng), trọng tâm là thấy playground debug tools tiện ra sao.
- Kết luận: playground rất useful để verify MCP server chạy đúng trước khi cắm vào app thật.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) xác nhận đây là reference dev tool để test/debug MCP servers, chạy trực tiếp qua `npx @modelcontextprotocol/inspector`, không cần cài; có 3 clients Web/CLI/TUI, nối được stdio local lẫn remote HTTP. Kiểm chứng ngày 2026-09-17.
- Repo [mcpdoc](https://github.com/langchain-ai/mcpdoc) cũng dùng Inspector để verify `list_doc_sources` và `fetch_docs` — khớp demo trong transcript.
- Trạng thái: nội dung transcript **vẫn đúng**. Docs mới bổ sung thêm CLI/TUI và protocol eras, nhưng luồng Web + tabs mô tả trong bài không đổi.

> **Hộp cập nhật:** transcript demo với SSE server. Docs 2026-07-28 chuẩn hóa remote thành Streamable HTTP. Khi nối Inspector vào server mới, chọn transport stdio cho local và HTTP cho remote.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Là gì | Dev tool tương tác để test/debug MCP servers của Anthropic team |
| Chạy | NPX, không cần cài đặt |
| Resources | List, metadata, inspect content |
| Prompts | Templates, arguments, test custom inputs |
| Tools | List, schemas, test custom inputs |
| Notifications | Logs từ server |
| Khi nào dùng | Trước khi cắm server vào app thật |

**Một câu chốt:** Chưa chạy qua Inspector thì chưa tin MCP server của mình chạy đúng.

## 6. Câu hỏi tự kiểm tra

1. Ai làm ra MCP Inspector và để làm gì?
2. Chạy Inspector có cần cài đặt không?
3. Tab Tools cho xem và làm gì?
4. Tab Prompts khác tab Resources ở điểm nào?
5. Vì sao nên debug bằng Inspector trước khi tích hợp?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Anthropic team — team nghĩ ra protocol. Dùng để troubleshoot, debug, trace, xem chuyện gì xảy ra trong MCP server khi build servers.

**2.** Không. Chạy local từ NPX là inspect và tương tác được ngay.

**3.** Liệt kê available tools và schemas, còn cho execute thử với custom inputs để xem output.

**4.** Prompts hiển thị prompt templates và arguments kèm test custom inputs; Resources liệt kê data sources kèm metadata và inspect content.

**5.** Vì playground cho chạy thử tools/resources/prompts và đọc logs/notifications ngay, verify server đúng trước khi cắm vào Cursor hay Claude Desktop.

</details>

## 7. Bước tiếp theo

Bài 132 — *LLM.txt* — chuẩn file giúp LLMs đọc website hiệu quả, nền tảng của mcpdoc.

Nguồn: transcript gốc `131 - MCP Inspector.md`; [Inspector docs](https://modelcontextprotocol.io/docs/tools/inspector).
