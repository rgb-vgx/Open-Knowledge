---
title: "Bài 130 - Kế hoạch dùng pre-built server mcpdoc"
course: "LangChain"
lesson: "130"
status: "edited-verified"
source: "130 - What are we building MCP Doc.md"
verified_date: "2026-09-17"
langchain_version: "mcpdoc (langchain-ai/mcpdoc); MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "mcpdoc", "pre-built-server", "Cursor", "Claude-Desktop", "LangChain-docs"]
doc_refs: ["https://github.com/langchain-ai/mcpdoc", "https://modelcontextprotocol.io/docs/getting-started/intro", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 130 — Kế hoạch dùng pre-built server mcpdoc

> Bài học được biên soạn từ transcript "What are we building MCP Doc".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được lộ trình của section: tích hợp pre-built MCP server vào pre-built MCP clients trước khi tự build.
2. Giải thích vì sao chọn mcpdoc: docs LangChain đổi nhanh, cần nguồn fresh tự động.
3. Kể được 2 clients sẽ dùng: Cursor rồi Claude Desktop, cùng nói chuyện qua MCP protocol.
4. Giữ đúng thuật ngữ Anh: pre-built MCP server, MCP client, mcpdoc.

## 2. Kiến thức cốt lõi

### Đi từ dễ tới khó

Transcript mở đầu bằng định hướng của Eden:

- Muốn hiểu thấu model context protocol thì đi theo một journey.
- Cách tốt nhất là bắt đầu bằng việc tích hợp một pre-built MCP server vào một pre-built MCP client.
- Xong chặng này mới đi sâu tự implement servers rồi clients ở section sau.

### Server: mcpdoc của LangChain

- Tên trong transcript nói là "MCP dock", chính là **mcpdoc** do LangChain release.
- Nhiệm vụ: cho ta truy cập docs LangChain mới nhất, vì những thứ này change fast.
- Thay vì chase updates thủ công, mcpdoc giữ ta plugged vào freshest docs một cách tự động.

### Clients: Cursor rồi Claude Desktop

- Phía client đầu tiên là **Cursor**, vốn đã có MCP client built in.
- Sau đó làm lại đúng việc đó với **Claude Desktop**.
- Hết chặng này ta đã nối một pre-built MCP server vào pre-built MCP clients, hai bên giao tiếp qua Model Context Protocol.

## 3. Ví dụ và diễn giải

- Transcript không demo code ở bài này, chỉ vẽ bản đồ: server một đằng (mcpdoc + LangChain docs), clients một đằng (Cursor, Claude Desktop).
- Giữ đúng tên gọi trong transcript: mcpdoc, Cursor, Claude Desktop.
- Tinh thần: học dùng đồ có sẵn trước, hiểu luồng protocol, rồi mới build đồ của mình.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-ai/mcpdoc](https://github.com/langchain-ai/mcpdoc) là MCP server mã nguồn mở đưa tài liệu `llms.txt` vào Cursor, Windsurf, Claude Code/Desktop qua 2 tools `list_doc_sources` và `fetch_docs`. Kiểm chứng ngày 2026-09-17.
- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận đúng mô hình bài này: host (Cursor, Claude Desktop) tạo MCP client nối tới MCP server. Kiểm chứng ngày 2026-09-17.
- Trạng thái: định hướng trong transcript **vẫn đúng**, không có gì lỗi thời.

> **Hộp cập nhật:** transcript phát âm "MCP dock" — tên repo chuẩn là **mcpdoc**. Khi tìm tài liệu hãy tìm `langchain-ai/mcpdoc`, không phải "mcp dock".

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Thứ tự học | Dùng pre-built trước, tự build sau |
| Server | mcpdoc của LangChain, nguồn docs tươi tự động |
| Client 1 | Cursor (có sẵn MCP client) |
| Client 2 | Claude Desktop |
| Ngôn ngữ chung | Model Context Protocol |

**Một câu chốt:** Dùng đồ có sẵn để thấy protocol chạy end-to-end trước khi tự viết server và client.

## 6. Câu hỏi tự kiểm tra

1. Vì sao section bắt đầu bằng pre-built thay vì tự build ngay?
2. mcpdoc giải quyết nỗi đau nào về docs?
3. Hai clients nào sẽ được dùng trong chặng này?
4. Server và clients trong bài giao tiếp bằng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì muốn thấy protocol chạy end-to-end với đồ có sẵn trước, hiểu luồng rồi mới đi sâu implement servers và clients ở section sau.

**2.** Docs LangChain đổi rất nhanh, chase thủ công không kịp. mcpdoc giữ kết nối tới freshest docs một cách tự động.

**3.** Cursor trước (đã có MCP client built in), sau đó là Claude Desktop với cùng một MCP server.

**4.** Bằng Model Context Protocol — cả hai components đều nói cùng một ngôn ngữ này.

</details>

## 7. Bước tiếp theo

Bài 131 — *MCP Inspector* — công cụ debug và trace MCP server trước khi cắm vào clients.

Nguồn: transcript gốc `130 - What are we building MCP Doc.md`; [mcpdoc repo](https://github.com/langchain-ai/mcpdoc); [architecture](https://modelcontextprotocol.io/docs/learn/architecture).
