---
title: "Bài 128 - GIST giao thức MCP với tool calling"
course: "LangChain"
lesson: 128
status: "edited-verified"
source: "128 - Theory The GIST of the Protocol with Tool Calling.md"
verified_date: "2026-09-17"
langchain_version: "MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "tool-calling", "MCP-client", "MCP-server", "MCP-host", "LangChain", "decoupling"]
doc_refs: ["https://modelcontextprotocol.io/docs/learn/architecture", "https://modelcontextprotocol.io/docs/getting-started/intro"]
---

# Bài 128 — GIST giao thức MCP với tool calling

> Bài học được biên soạn từ transcript "Theory The GIST of the Protocol with Tool Calling".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ được luồng end-to-end: user → app/host+client → LM → MCP server → trả về user.
2. Giải thích bước init connection xảy ra trước cả khi user hỏi.
3. Phân biệt thực thi tool trong MCP (chạy ở server) với ReAct agent thuần LangChain (chạy ở app).
4. Nói được 3 lợi ích của decoupling: scale, deploy/monitor độc lập, dynamic tool updates.
5. Giữ đúng thuật ngữ Anh: MCP host, MCP client, MCP server, tool calling, stdio, SSE.

## 2. Kiến thức cốt lõi

### Các nhân vật trong sơ đồ

- Bên trái: user gửi query vào application (Cursor, Windsurf, Claude Desktop, hoặc agent tự viết).
- Giữa: LM mà application gọi tới.
- Bên phải: MCP server tích hợp vào application.
- Client ở đâu? Client nằm bên trong application. App vừa đóng vai host, vừa chứa client. Một app có thể chứa nhiều clients, mỗi client nối tới một MCP server khác nhau.

### Giai đoạn 1: khởi động app (chưa có user)

1. Mở Cursor/Claude Desktop/agent lên.
2. Client bên trong host dùng MCP protocol để init connection, gửi messages qua lại; server acknowledge.
3. Khi init, server báo cho client biết nó expose những gì: tools, resources, prompts (transcript lấy tools làm ví dụ: weather server có alert tool và forecast tool).
4. Host gom danh sách đó lại. Xong setup, app mới sẵn sàng nhận query.

### Giai đoạn 2: user hỏi → LM → tool → server → LM → user

1. User gửi query. App lấy user query + danh sách tools MCP server đã trả về, augment lại với nhau (chính là "special prompt" ở Bài 126) rồi gửi cho LM.
2. LM trả về một trong hai: câu trả lời cuối, hoặc một tool call (tên tool + arguments). Nhắc lại: MCP chỉ làm việc với tool calling LMs.
3. Điểm khác biệt cốt lõi với LangChain: trong LangChain thuần, app tự execute tool ngay tại application layer. Trong MCP, app gửi tool call sang MCP server (qua stdio hoặc SSE), server mới là nơi chạy tool.
4. Server chạy xong (ví dụ forecast cho California) gửi kết quả về qua MCP client.
5. App gọi LM lần nữa với user query + tool result. LM quyết định finish hay gọi tiếp. Nếu finish, app trả final answer cho user.

### Vì sao decouple tool execution ra server lại hay

- Tách runtime của server khỏi agent: muốn scale out, deploy lên Kubernetes hay serverless, monitor bằng hệ thống riêng đều dễ.
- Tách orchestration khỏi execution: agent lo khi nào gọi tool, có gọi tiếp không, có hỏi user không; server lo chạy.
- Dynamic tools: client không chỉ init một lần mà có thể init lại định kỳ, nhận tools mới mà không cần redeploy agent.

## 3. Ví dụ và diễn giải

- Ví dụ weather MCP server: tools `alert` và `forecast`. User hỏi thời tiết → LM ra tool call `forecast` → server chạy → trả về → LM chốt đáp án.
- So sánh transcript nêu: LangChain ReAct agent vanilla chạy tools trong app/agent của mình; cắm MCP vào thì tools chạy ở MCP server.
- Giảng viên thừa nhận có thể giả lập bằng "dummy tools" trong graph gọi sang service khác, nhưng MCP chuẩn hóa thành một interface duy nhất — đó mới là cái hay.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận host tạo một client cho mỗi server, discovery qua `server/discover`, rồi `tools/list` và `tools/call` bằng JSON-RPC 2.0; tool chạy ở server, client chỉ route request/response. Kiểm chứng ngày 2026-09-17.
- Docs cũng xác nhận notifications cho tool list changes — khớp ý "init lại định kỳ, nhận tools động" trong transcript.
- Trạng thái: luồng khái niệm **vẫn đúng**. Khác từ vựng transport: transcript nói stdio/SSE, docs 2026-07-28 dùng stdio và Streamable HTTP.

> **Hộp cập nhật:** transcript gọi remote transport là "Stdio or SSE". Khi implement mới, dùng stdio cho local và Streamable HTTP cho remote theo spec 2026-07-28. Giữ nguyên lời giảng viên ở phần kiến thức.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Init | Client trong host nối server trước khi user hỏi, lấy danh sách tools/resources/prompts |
| Query | App augment user query với tools rồi gửi LM |
| Tool call | LM ra tên tool + arguments |
| Execute | MCP server chạy tool, không phải app |
| Finish | App gọi LM lần hai với kết quả, trả user |
| Khác LangChain | LangChain thuần chạy tool ở app; MCP decouple ra server để scale, monitor, update động |

**Một câu chốt:** MCP tách orchestration (agent quyết định gọi gì) khỏi execution (server chạy tool đó).

## 6. Câu hỏi tự kiểm tra

1. Client nằm ở đâu trong kiến trúc?
2. Init connection xảy ra khi nào và server trả về gì?
3. App gửi gì cho LM ở lượt gọi đầu tiên?
4. Ai thực thi tool trong luồng MCP?
5. Kể 2 lợi ích của việc decouple tools ra server.

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Client nằm bên trong application (host). Một app có thể có nhiều clients, mỗi client nối một MCP server.

**2.** Khi app vừa load (mở Cursor/Claude Desktop/agent), trước cả user query. Server acknowledge và báo tools/resources/prompts nó expose.

**3.** User query gốc cộng danh sách tools (augment thành special prompt), để LM hoặc trả lời hoặc sinh tool call.

**4.** MCP server. App chỉ gửi tên tool + arguments qua stdio/SSE; server chạy và trả kết quả về qua client.

**5.** Dễ scale/deploy/monitor độc lập (Kubernetes, serverless); và dynamic tool calling — client init lại định kỳ để nhận tools mới mà không redeploy agent.

</details>

## 7. Bước tiếp theo

Bài 129 — *Theory MCP Servers* — mổ sâu 3 interfaces server expose: tools, resources, prompts.

Nguồn: transcript gốc `128 - Theory The GIST of the Protocol with Tool Calling.md`; [architecture](https://modelcontextprotocol.io/docs/learn/architecture).
