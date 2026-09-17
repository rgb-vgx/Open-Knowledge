---
title: "Bài 136 - Viết 2 MCP servers: math stdio và weather SSE"
course: "LangChain"
lesson: "136"
status: "edited-verified"
source: "136 - Servers.md"
verified_date: "2026-09-17"
langchain_version: "MCP Python SDK + langchain-mcp-adapters examples; MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-server", "stdio", "SSE", "UV", "Cursor"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://modelcontextprotocol.io/docs/learn/architecture", "https://modelcontextprotocol.io/docs/tools/inspector"]
---

# Bài 136 — Viết 2 MCP servers: math stdio và weather SSE

> Bài học được biên soạn từ transcript "Servers".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Tạo package `servers` và 2 files: math server (stdio) và weather server (SSE).
2. Nói được math server expose tools gì, weather server trả về gì.
3. Chạy thử 2 servers bằng UV và phân biệt biểu hiện stdio với SSE (port 8000).
4. Tránh bẫy đặt tên file `math.py` trùng built-in package.
5. Giữ đúng thuật ngữ Anh: MCP server, stdio, SSE, transport, HTTP POST.

## 2. Kiến thức cốt lõi

### Kế hoạch

- Trước khi viết MCP clients, viết MCP servers trước để có cái mà nối.
- Hai servers rất đơn giản: một expose mathematic tools (add, multiply) giao tiếp via **stdio**; một là weather server dumbed down luôn báo trời rất nóng, giao tiếp via **SSE** (lần đầu giới thiệu, spoiler: rất dễ).

### Math server qua stdio

1. Tạo directory `servers`, thêm empty `__init__.py` thành package.
2. Tạo `math_server.py` — transcript dặn đặt tên này, đừng đặt `math.py` vì collide với built-in math package của Python (giảng viên mất thời gian debug, paste lỗi vào Cursor mới ra).
3. Implementation copy từ LangChain adapters repository, skim nhanh; điểm cần nhớ là transport layer **stdio**.
4. Chạy `uv run servers/math_server.py` → thấy blinking square là chạy thành công.

### Weather server qua SSE

1. Tạo `weather_server.py` trong cùng package, copy dummy server trong LangChain MCP repo: expose Get weather tool luôn trả cùng một static string; sửa thành "hot as hell" cho vui.
2. Transport ở đây là **SSE**: client-server không nói qua stdio mà qua HTTP; client gửi HTTP POST, nhưng ta không tự handle — MCP SDK cho sẵn, chỉ cần specify transport là SSE (một flag khi run server).
3. Chạy terminal mới: `uv run servers/weather_server.py` → server chạy ở `localhost:8000`; muốn đổi port thì báo cho MCP SDK.

### Commit

- Chỉ directory `servers` đổi → add, dùng Cursor auto-generate commit message, commit, push. Lên repo thấy commit thứ hai sau commit boilerplate.

## 3. Ví dụ và diễn giải

- Math: add và multiply numbers — ví dụ tối giản cho tools có arguments và return values.
- Weather: "always hot as hell", đùa là chỉ đúng cho Dubai (kèm clip giảng viên ở Dubai).
- Giữ đúng chi tiết transcript: copy từ adapters repo, không "cải tiến" implementation.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) có examples cho cả stdio và SSE/HTTP servers — khớp việc copy mẫu trong transcript. Kiểm chứng ngày 2026-09-17.
- Docs chính: [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận local dùng stdio, remote dùng Streamable HTTP; spec 2026-07-28 không còn liệt kê SSE như transport chuẩn. Kiểm chứng ngày 2026-09-17.
- Trạng thái: bài thực hành **vẫn đúng** ở mức khái niệm; chỉ tên transport remote đã đổi.

> **Hộp cập nhật:** transcript gọi weather server là "SSE / server sent event / SSH" — theo ngữ cảnh đều là SSE. Khi viết server mới, dùng stdio cho local và Streamable HTTP cho remote theo spec 2026-07-28. Giữ nguyên lời giảng viên trong bài.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Math server | Tools add/multiply, transport stdio, chạy blinking square |
| Weather server | Tool Get weather trả static string, transport SSE, port 8000 |
| Bẫy tên file | `math_server.py`, không phải `math.py` |
| SDK lo gì | Framing HTTP/POST cho SSE, chỉ cần flag transport |
| Xong | Commit riêng directory `servers` |

**Một câu chốt:** Có 2 servers chạy được thì mới có cái để client nối vào ở bài sau.

## 6. Câu hỏi tự kiểm tra

1. Vì sao viết servers trước clients?
2. Hai servers khác nhau ở tools và transport ra sao?
3. Vì sao không đặt tên file là `math.py`?
4. SSE khác stdio ở điểm nào theo transcript?
5. Đổi port cho weather server bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì cần có servers chạy được rồi mới nối clients vào test end-to-end.

**2.** Math expose add/multiply qua stdio (local process); weather expose Get weather trả static string qua SSE (HTTP POST).

**3.** Vì collide với built-in math package của Python, gây lỗi khó debug.

**4.** stdio nói qua standard input/output local; SSE nói qua HTTP, client gửi HTTP POST tới server.

**5.** Specify cho MCP SDK khi run server — transcript nói hoàn toàn làm được, không cần tự handle HTTP.

</details>

## 7. Bước tiếp theo

Bài 137 — *What are we MCBuilding* — nhìn lại toàn chặng: servers nào, client nào, nối ra sao.

Nguồn: transcript gốc `136 - Servers.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
