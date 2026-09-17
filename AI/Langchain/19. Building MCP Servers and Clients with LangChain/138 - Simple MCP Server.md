---
title: "Bài 138 - Client LangChain nối 2 MCP servers"
course: "LangChain"
lesson: "138"
status: "edited-verified"
source: "138 - Simple MCP Server.md"
verified_date: "2026-09-17"
langchain_version: "langchain-mcp-adapters (MultiServerMCPClient) + langgraph create_react_agent; MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MultiServerMCPClient", "LangChain", "LangGraph", "create_react_agent", "stdio", "SSE", "ChatOpenAI"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://docs.langchain.com/oss/python/langchain/agents", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 138 — Client LangChain nối 2 MCP servers

> Bài học được biên soạn từ transcript "Simple MCP Server".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Chạy lại 2 servers (SSE weather port 8000, stdio math) để chuẩn bị nối client.
2. Tạo file `langchain_client.py` và import đúng 4 nhóm: adapter, LangGraph, LLM, dotenv.
3. Giải thích vì sao 1-1 client-server vẫn đúng dù dùng multi-server client.
4. Chạy sanity check async cho client.
5. Giữ đúng thuật ngữ Anh: MultiServerMCPClient, create_react_agent, ChatOpenAI, asyncio.

## 2. Kiến thức cốt lõi

### Chuẩn bị 2 servers

1. Chạy SSE server: `uv run servers/weather_server.py` → port 8000.
2. Mở terminal khác chạy stdio math server: `uv run servers/math.py` (theo lời transcript; tên file ở Bài 136 là `math_server.py` — giữ nguyên cả hai cách gọi như nguồn).
3. Cả hai đều running mới làm tiếp.

### Tạo LangChain multi-server client

1. Tạo file mới `langchain_client.py` — tên này vì sắp implement LangChain multi-server client.
2. Đây là client LangChain viết sẵn, connect được **multiple MCP servers**.
3. Nhắc lại quan hệ 1-1 giữa client và MCP server **vẫn đúng**: LangChain abstract giúp ta, bên trong nó chứa nhiều MCP clients, nhưng ta không phải viết tay từng client cho từng server.

### Imports và LLM

1. `from langchain_mcp_adapters.client import MultiServerMCPClient`.
2. `from langgraph.prebuilt import create_react_agent` như trước.
3. `ChatOpenAI` từ OpenAI integration như trước.
4. `load_dotenv` từ `dotenv`, init LLM như trước.
5. Viết async `main` in `"hello langchain mcp"`, import `asyncio`, chạy bằng `asyncio`, sanity check `uv run langchain_client.py` chạy thành công.

## 3. Ví dụ và diễn giải

- Giữ đúng flow transcript: chạy 2 servers ở 2 terminals → tạo file → imports → async main → run.
- Chưa tới đoạn khai báo dict servers và `get_tools` — transcript dừng ở boilerplate, hẹn video sau.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) xác nhận `MultiServerMCPClient` + `get_tools`/`session`, hỗ trợ stdio/SSE/HTTP, bên trong quản lý nhiều sessions 1-1. Kiểm chứng ngày 2026-09-17.
- [LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents) xác nhận `create_agent` (harness mới) cùng họ với `create_react_agent` trong transcript. Kiểm chứng ngày 2026-09-17.
- Trạng thái: boilerplate **vẫn đúng**; namespace adapter nay có thể là `langchain.mcp` / `langchain[mcp]`.

> **Hộp cập nhật:** transcript import từ `langchain_mcp_adapters.client`. Khi code mới, kiểm tra namespace hiện hành. Tên file math server trong 2 bài ghi khác nhau (`math_server.py` vs `math.py`) — giữ nguyên lời nguồn, khi chạy hãy dùng tên file thực tế trong repo của bạn.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Servers | SSE weather 8000 + stdio math cùng chạy |
| File mới | `langchain_client.py` |
| Imports | MultiServerMCPClient, create_react_agent, ChatOpenAI, dotenv, asyncio |
| 1-1 | Vẫn đúng, adapter bọc nhiều clients bên trong |
| Check | async main in hello, `uv run` thành công |

**Một câu chốt:** Multi-server client chỉ là lớp bọc tiện tay trên nhiều kết nối 1-1.

## 6. Câu hỏi tự kiểm tra

1. Trước khi viết client phải làm gì với 2 servers?
2. Vì sao gọi file là `langchain_client.py`?
3. Quan hệ 1-1 còn đúng không khi dùng multi-server client?
4. Bốn nhóm import trong file là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Chạy cả hai: SSE weather ở port 8000 và stdio math ở terminal khác, cả hai đều running.

**2.** Vì file sẽ implement LangChain multi MCP servers client, nối nhiều MCP servers cùng lúc.

**3.** Còn đúng. LangChain abstract bên trong thành nhiều MCP clients, ta chỉ khỏi viết tay từng cái.

**4.** `MultiServerMCPClient` từ adapter; `create_react_agent` từ langgraph.prebuilt; `ChatOpenAI`; `load_dotenv` + `asyncio` cho env và async main.

</details>

## 7. Bước tiếp theo

Bài 139 — *Bridging the Gap The LangChain MCP Adapter Explained* — hiểu tools 2 bên giống/khác gì trước khi nối thật.

Nguồn: transcript gốc `138 - Simple MCP Server.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
