---
title: "Bài 127 - Kiến trúc MCP: Host, Client, Server"
course: "LangChain"
lesson: "127"
status: "edited-verified"
source: "127 - Theory MCP Architecture.md"
verified_date: "2026-09-17"
langchain_version: "MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-host", "MCP-client", "MCP-server", "architecture", "tools", "resources", "prompts"]
doc_refs: ["https://modelcontextprotocol.io/docs/learn/architecture", "https://modelcontextprotocol.io/docs/getting-started/intro"]
---

# Bài 127 — Kiến trúc MCP: Host, Client, Server

> Bài học được biên soạn từ transcript "Theory MCP Architecture".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được mục tiêu của MCP: chuẩn hóa cách applications cung cấp context cho LLMs.
2. Kể tên 3 thành phần: MCP host, MCP client, MCP server và quan hệ 1-1 giữa client và server.
3. Giải thích vì sao viết một lần trên MCP server thì cắm được vào nhiều hosts.
4. Giữ đúng thuật ngữ Anh: MCP host, MCP client, MCP server, tools, resources, prompts.

## 2. Kiến thức cốt lõi

### Context là gì

Transcript định nghĩa rộng:

- Context cho LLM có thể rất mỏng: thêm thông tin vào prompt.
- Context có thể là thông tin gọi tool nào.
- Context thậm chí có thể là chính prompt.
- Câu cuối nghe buồn cười, nhưng giảng viên hẹn ví dụ ở video sau.

Khi một chuẩn trở nên phổ biến, người ta bắt đầu build những thứ "insane" trên nó.

### Bên trái: MCP host

- Ví dụ: Claude Desktop, IDE như Cursor, Windsurf, hoặc bất kỳ specialized AI application/agent nào hỗ trợ MCP protocol.
- Đây là applications ta sẽ augment: cho thêm external tools chưa có, nối thêm data source chưa có, hoặc prompts đặc thù.

### Bên phải: thứ ta augment bằng

- Truy cập external tools: gọi API, lấy thời tiết.
- Search trong database.
- Knowledge và information: PDFs, text dài.
- Danh sách còn rất dài.

### MCP servers: cửa ngõ ở giữa

- Servers là component expose resources, tools, prompts.
- Chúng là proxy/gateway cho functionality đó.
- Muốn expose được thì phải implement đúng methods/functions của protocol, ví dụ `list_prompts`, `get_prompt`, `list_tools`, `call_tool`, `list_resource_templates`, progress notification.
- Viết một MCP server xong thì cắm được vào bất kỳ MCP host nào hỗ trợ protocol. Viết một lần, dùng nhiều nơi. Đó là điểm game-changing.

### MCP clients: cầu nối nằm trong host

- Muốn nối weather MCP server vào Claude Desktop thì cần MCP client.
- MCP client nằm bên trong MCP host, nói chuyện với MCP servers bằng MCP protocol.
- Quan hệ 1-1: một MCP client chỉ nói với một MCP server. Muốn host nối nhiều servers thì cần nhiều clients bên trong.

## 3. Ví dụ và diễn giải

- Ví dụ mở đầu: MCP server của Eric Dickerson cho Cursor để order đồ ăn. Prompt "I want fika, where can I get..." → server nối Uber Eats account → tools tìm menu, filter, rồi invoke Order Food tool. Kết quả là một món pastry.
- Vì MCP như USB-C và MCP server như external device, rút ra cắm sang Claude Desktop hay Windsurf đều chạy.
- Giảng viên nhấn mạnh: nói Claude Desktop chứ không phải model 3.7, vì application dùng models của Anthropic under the hood. App của chính bạn cũng được, miễn implement đúng protocol.
- Ưu điểm liệt kê: kho integrations/tools/data sources plug-and-play khổng lồ; không bị couple vào LLM vendor hay AI application builder nào; viết tools một lần, migrate qua vendors khác nhau. LangChain cũng làm điều này theo cách riêng — hẹn video so sánh LangChain và MCP.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận đúng 3 roles: MCP Host điều phối nhiều MCP clients, mỗi client giữ dedicated connection tới một server; local dùng stdio, remote dùng Streamable HTTP. Kiểm chứng ngày 2026-09-17.
- [What is MCP](https://modelcontextprotocol.io/docs/getting-started/intro) xác nhận ví USB-C và 3 loại: data sources, tools, workflows/prompts.
- Primitives trong docs mới: servers expose tools, resources, prompts; clients expose elicitation (sampling đã deprecated từ 2026-07-28). Transcript kể sampling sau này — xem Bài 129.
- Trạng thái: nội dung kiến trúc **vẫn đúng**. Chỉ khác từ vựng: transcript nói SSE/SSH cho remote, docs mới chuẩn hóa thành Streamable HTTP.

> **Hộp cập nhật:** transcript nói remote "via server sent events or SSH" và nhắc "SSH" nhiều lần — theo ngữ cảnh đó là SSE (Server-Sent Events), và docs 2026-07-28 đã thay SSE cũ bằng Streamable HTTP. Giữ nguyên lời giảng viên, khi implement mới hãy dùng stdio cho local và Streamable HTTP cho remote.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Mục tiêu MCP | Chuẩn hóa cách apps cung cấp context cho LLMs |
| MCP host | App được augment: Cursor, Claude Desktop, Windsurf, agent... |
| MCP server | Proxy expose tools, resources, prompts |
| MCP client | Nằm trong host, nói protocol với server, quan hệ 1-1 |
| Viết một lần | Cắm được vào mọi host hỗ trợ protocol |
| Plug-and-play | Enrich apps bằng data sources và tools ngoài |

**Một câu chốt:** Host là nơi cần context, server là nơi có context, client là tiếng nói chung giữa hai bên.

## 6. Câu hỏi tự kiểm tra

1. Context cho LLM gồm những dạng nào theo transcript?
2. MCP host là gì? Kể 3 ví dụ.
3. MCP server expose những gì?
4. Vì sao quan hệ client-server là 1-1, và host muốn nối N servers thì làm sao?
5. Viết một lần, dùng nhiều nơi nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thông tin thêm vào prompt, thông tin gọi tool nào, thậm chí chính prompt. Định nghĩa cố tình rộng để chứa tools, resources, prompts.

**2.** AI application điều phối clients: Claude Desktop, Cursor, Windsurf hoặc agent hỗ trợ protocol. Đây là phía được augment thêm tools/data/prompts.

**3.** Tools, resources, prompts thông qua các methods như list/get/call và notifications. Server là proxy/gateway cho functionality.

**4.** Mỗi MCP client chỉ giữ dedicated connection tới một server. Host muốn nối N servers thì tạo N clients bên trong, mỗi client một kết nối.

**5.** Implement MCP server một lần đúng protocol thì cắm được vào bất kỳ host nào hỗ trợ — ví dụ server order đồ ăn viết cho Cursor thì mang sang Claude Desktop hay Windsurf đều chạy.

</details>

## 7. Bước tiếp theo

Bài 128 — *Theory The GIST of the Protocol with Tool Calling* — đi theo một request từ user tới LM, qua client-server, rồi quay về.

Nguồn: transcript gốc `127 - Theory MCP Architecture.md`; [architecture](https://modelcontextprotocol.io/docs/learn/architecture); [intro](https://modelcontextprotocol.io/docs/getting-started/intro).
