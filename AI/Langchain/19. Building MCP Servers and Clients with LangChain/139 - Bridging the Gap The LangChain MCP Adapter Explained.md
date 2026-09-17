---
title: "Bài 139 - Cầu nối LangChain MCP Adapter: tools"
course: "LangChain"
lesson: "139"
status: "edited-verified"
source: "139 - Bridging the Gap The LangChain MCP Adapter Explained.md"
verified_date: "2026-09-17"
langchain_version: "langchain-mcp-adapters / langchain[mcp]; MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "LangChain", "tools", "toolkit", "bind_tools", "langchain-mcp-adapters", "resources", "prompts"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://docs.langchain.com/oss/python/langchain/agents", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 139 — Cầu nối LangChain MCP Adapter: tools

> Bài học được biên soạn từ transcript "Bridging the Gap The LangChain MCP Adapter Explained".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nêu điểm giống nhau cốt lõi: cả LangChain và MCP đều định nghĩa tools bằng arguments, description, return value.
2. Giải thích vì sao description quan trọng: nó đi vào prompt của LLM để chọn tool.
3. Phân biệt 2 khác biệt: MCP thêm resources/prompts; LangChain bind vào LLM còn MCP bind vào AI application.
4. Nói được giá trị của LangChain MCP adapter: tương thích tools + client nhiều servers.
5. Giữ đúng thuật ngữ Anh: tools, toolkit, bind_tools, description, MCP server/client.

## 2. Kiến thức cốt lõi

### Giống nhau: cùng một ý tưởng tools

- Cả LangChain và MCP đều có notion tools: functions viết ngoài AI system/LLM, do developers viết, có arguments và return values (ví dụ `multiply`).
- Định nghĩa tool nào cũng phải nói: nhận arguments gì, khi nào gọi (nằm trong function description), trả về gì.
- Description rất quan trọng vì nó propagate tới LLM — dù qua LangChain binding tools hay MCP client — giúp model quyết định gọi tool nào.
- LangChain có **toolkit** (collection of prebuilt tools); MCP server cũng là collection of tools. Rất giống nhau.
- Chốt: cả `bind_tools` lẫn MCP đều inject vào prompt của LLM: mô tả tools, khi nào invoke, nhận gì, output gì — interface cho AI models tương tác external tools.

### Khác nhau 1: MCP tổng quát hơn

- MCP không chỉ expose tools mà còn **resources** (documents, PDFs, pictures, API calls) và **prompts**.

### Khác nhau 2: bind vào ai

- LangChain `bind_tools`: bind vào **LLM** trực tiếp.
- MCP: bind vào **AI application** (Cursor, Windsurf, Claude). App có LLM under the hood, client mới là thứ inject instructions vào LLM đó.
- Thêm vài layers: MCP server báo list tools cho MCP client, client inject vào LLM trong app.

### Adapter giải gì

- Open-source của LangChain team: tích hợp seamless MCP tools với LangChain và LangGraph.
- Value proposition: **tool compatibility** — convert MCP tools thành LangChain/LangGraph-compatible tools, dùng servers người khác viết không cần manual adaption.
- Kèm **MCP client** nối nhiều MCP servers, expose hết tools của chúng.
- Video sau sẽ demo dùng client đó.

## 3. Ví dụ và diễn giải

- Ví dụ `multiply`: có args, description nói khi nào gọi, return value nói trả gì.
- Ví dụ toolkit vs MCP server: hai cách gom tools thành collection ở hai thế giới.
- Giữ đúng tên apps: Cursor, Windsurf, Claude.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) xác nhận đúng 2 năng lực: `load_mcp_tools`/convert sang LangChain tools và `MultiServerMCPClient` nối nhiều servers. Kiểm chứng ngày 2026-09-17.
- [LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents) xác nhận tools đưa vào lúc build harness. Kiểm chứng ngày 2026-09-17.
- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận servers expose tools/resources/prompts, clients route vào LLM của host. Kiểm chứng ngày 2026-09-17.
- Trạng thái: so sánh trong transcript **vẫn đúng**.

> **Hộp cập nhật:** repo adapter ghi đã chuyển sang `langchain.mcp` / `langchain[mcp]`. Giữ nguyên tên `langchain_mcp_adapters` trong bài vì đó là lời giảng viên.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Giống | Cùng định nghĩa tools: args, description, return; description nuôi LLM chọn tool |
| Gom nhóm | Toolkit (LangChain) vs MCP server (MCP) |
| Khác 1 | MCP thêm resources + prompts |
| Khác 2 | LangChain bind vào LLM; MCP bind vào app, client inject gián tiếp |
| Adapter | Convert tools + client nhiều servers, khỏi manual adaption |

**Một câu chốt:** Cùng một ý tưởng tools, khác nơi cắm điện — adapter là ổ chuyển để cắm tools MCP vào LangChain.

## 6. Câu hỏi tự kiểm tra

1. Định nghĩa một tool cần những gì?
2. Vì sao description là phần quan trọng nhất?
3. Toolkit và MCP server giống nhau ở điểm nào?
4. `bind_tools` và MCP khác nhau ở "bind vào ai"?
5. Adapter mang lại 2 giá trị gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Arguments nhận gì, khi nào gọi (trong description), trả về return value gì.

**2.** Vì description propagate tới prompt của LLM, giúp model quyết định gọi tool nào — sai description là model chọn sai.

**3.** Cùng là collection of tools: một bên gom prebuilt tools của LangChain, một bên gom tools của một MCP server.

**4.** `bind_tools` bind trực tiếp vào LLM; MCP bind vào AI application, rồi MCP client mới inject instructions vào LLM under the hood.

**5.** Tool compatibility (convert MCP tools thành LangChain/LangGraph tools, khỏi manual adaption) và MCP client nối nhiều servers để expose hết tools.

</details>

## 7. Bước tiếp theo

Bài 143 — *New Important Stop Writing Deprecated Code LangChain's Official MCP Server* — rời section 19 (các files 140–142 rỗng, bỏ qua) sang dùng official docs MCP server để khỏi viết code deprecated.

Nguồn: transcript gốc `139 - Bridging the Gap The LangChain MCP Adapter Explained.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
