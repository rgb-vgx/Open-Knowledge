---
title: "Bài 134 - Lộ trình tự build MCP servers và clients"
course: "LangChain"
lesson: "134"
status: "edited-verified"
source: "134 - Intro.md"
verified_date: "2026-09-17"
langchain_version: "langchain-mcp-adapters / langchain[mcp]; MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-server", "MCP-client", "LangChain", "langchain-mcp-adapters", "roadmap"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 134 — Lộ trình tự build MCP servers và clients

> Bài học được biên soạn từ transcript "Intro".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được chặng tiếp theo: implement MCP servers trước, MCP client sau, rồi nối chúng với nhau.
2. Nêu được client sẽ viết bằng LangChain MCP adapter package, servers convert thành LangChain tools.
3. Giữ đúng thuật ngữ Anh: MCP server, MCP client, LangChain MCP adapter.

## 2. Kiến thức cốt lõi

### Đã xong dùng đồ có sẵn, giờ đi một layer sâu hơn

Transcript của Ethan định vị đúng một đoạn ngắn:

- Chặng trước: tích hợp pre-built MCP server với pre-built MCP client.
- Chặng này: dive một layer deeper — vài videos đầu implement **MCP servers**, sau đó implement **MCP client**, rồi integrate servers tự build với client tự build.

### Client bằng LangChain MCP adapter

- MCP client sẽ implement bằng **LangChain MCP adapter package**.
- Servers tự build sẽ được convert thành **LangChain tools** bằng chính package đó.

## 3. Ví dụ và diễn giải

- Transcript không nêu code hay tên server cụ thể ở bài này, chỉ vẽ thứ tự: servers → client → integration.
- Giữ nguyên mức khái quát đó, chi tiết tên servers và transports nằm ở các bài 135–139 sau.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) xác nhận đúng 2 năng lực: convert MCP tools thành LangChain/LangGraph tools và client nối nhiều MCP servers (`MultiServerMCPClient`). Kiểm chứng ngày 2026-09-17.
- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận roles host/client/server mà lộ trình này dựa vào. Kiểm chứng ngày 2026-09-17.
- Trạng thái: định hướng **vẫn đúng**. Lưu ý repo adapter ghi đã chuyển sang namespace `langchain.mcp` / gói `langchain[mcp]`.

> **Hộp cập nhật:** khi code mới, kiểm tra import theo namespace hiện hành (`langchain.mcp` hoặc `langchain[mcp]`) thay vì chép nguyên `langchain_mcp_adapters` trong video cũ. Giữ nguyên tên package trong bài vì đó là lời giảng viên.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Bước 1 | Implement MCP servers |
| Bước 2 | Implement MCP client bằng LangChain adapter |
| Bước 3 | Nối servers tự build vào client tự build |
| Cầu nối | Adapter convert MCP servers thành LangChain tools |

**Một câu chốt:** Hiểu protocol bằng cách tự build cả hai đầu rồi cho chúng nói chuyện với nhau.

## 6. Câu hỏi tự kiểm tra

1. Thứ tự 3 bước của chặng này là gì?
2. Client sẽ viết bằng gì?
3. Servers tự build sẽ thành gì trong thế giới LangChain?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Implement MCP servers trước, rồi implement MCP client, rồi integrate hai phía với nhau.

**2.** Bằng LangChain MCP adapter package.

**3.** Được convert thành LangChain tools bằng chính adapter package đó.

</details>

## 7. Bước tiếp theo

Bài 135 — *Boilerplate* — dựng project UV, venv, dependencies và async main.

Nguồn: transcript gốc `134 - Intro.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
