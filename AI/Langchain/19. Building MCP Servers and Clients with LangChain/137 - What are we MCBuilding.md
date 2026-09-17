---
title: "Bài 137 - Nhìn lại chặng build MCP: servers và client"
course: "LangChain"
lesson: "137"
status: "edited-verified"
source: "137 - What are we MCBuilding.md"
verified_date: "2026-09-17"
langchain_version: "langchain-mcp-adapters; MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-server", "MCP-client", "SSE", "stdio", "roadmap"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 137 — Nhìn lại chặng build MCP: servers và client

> Bài học được biên soạn từ transcript "What are we MCBuilding".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể lại đã có gì: weather SSE server, sắp có gì: LangChain multi-MCP-server client.
2. Giải thích vì sao SSE servers hợp deploy cloud/enterprise.
3. Nói được phần auth còn thiếu và thái độ của transcript với nó.
4. Giữ đúng thuật ngữ Anh: SSE MCP server, multi-MCP server client, authentication, authorization, RBAC.

## 2. Kiến thức cốt lõi

### Vị trí của bài

- Đã implement weather MCP server với transport SSE ở bài trước.
- Bài này: integrate nó với **LangChain multi-MCP server client** mà LangChain làm sẵn.
- Client này giúp nhiều vì connect được **multiple MCP servers all at once**.

### Vì sao SSE hợp deploy xa

- SSE servers deploy ở đâu cũng được; usage pattern thường thấy là deploy lên cloud.
- Đẩy xa hơn tới enterprise: deploy trong enterprise cloud, mọi người trong org đều call được.
- Transcript giữ đúng mức này, chưa demo deploy thật.

### Auth: biết thiếu, hẹn sau

- Chưa nói về authentication và authorization.
- Deploy cloud mà ai cũng access được là không được: phải giới hạn logged-in users, có thể role-based access control, kiểm soát ai access tool nào.
- Đây là thứ sẽ được thêm vào, chưa implement fully trong MCP protocol; khi nào có, giảng viên sẽ cover.

## 3. Ví dụ và diễn giải

- Transcript ngắn, không code, chỉ định vị: server đã có → client sắp có → enterprise pattern.
- Giữ đúng từ vựng: SSE, cloud, enterprise cloud, logged-in users, RBAC.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) xác nhận `MultiServerMCPClient` nhận dict nhiều servers, hỗ trợ stdio/SSE/HTTP và headers lúc runtime. Kiểm chứng ngày 2026-09-17.
- Docs chính: [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận remote dùng Streamable HTTP kèm HTTP auth (bearer, API keys, custom headers), khuyến nghị OAuth. Kiểm chứng ngày 2026-09-17.
- Trạng thái: định hướng **vẫn đúng**; phần auth nay đã có hình hài rõ hơn trong docs.

> **Hộp cập nhật:** transcript nói auth "not yet implemented fully". Docs 2026-07-28 đã mô tả Streamable HTTP + OAuth/bearer/API keys. Giữ nguyên lời giảng viên; khi deploy thật hãy đọc docs auth hiện hành.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Đã có | Weather SSE server |
| Sắp có | LangChain multi-server client nối nhiều servers một lúc |
| Vì sao SSE | Deploy cloud/enterprise, gọi từ xa |
| Còn thiếu | Auth, RBAC, giới hạn user/tool |

**Một câu chốt:** Server chạy xa thì client phải gom được nhiều servers, và auth phải khóa đúng người đúng tool.

## 6. Câu hỏi tự kiểm tra

1. Bài này nối cái gì vào cái gì?
2. Vì sao SSE hợp deploy cloud?
3. Enterprise cần thêm gì ngoài việc server chạy được?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Nối weather SSE server đã implement vào LangChain multi-MCP server client, vốn connect được nhiều MCP servers cùng lúc.

**2.** Vì deploy ở đâu cũng được, mọi người gọi từ xa qua HTTP thay vì phải cùng máy.

**3.** Authentication/authorization: giới hạn logged-in users, RBAC, kiểm soát ai access tool nào — thứ protocol lúc đó chưa có đầy đủ.

</details>

## 7. Bước tiếp theo

Bài 138 — *Simple MCP Server* — tạo LangChain client file và boilerplate nối cả 2 servers.

Nguồn: transcript gốc `137 - What are we MCBuilding.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
