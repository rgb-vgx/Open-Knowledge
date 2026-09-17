---
title: "Bài 129 - MCP Servers: tools, resources, prompts"
course: "LangChain"
lesson: "129"
status: "edited-verified"
source: "129 - Theory MCP Servers.md"
verified_date: "2026-09-17"
langchain_version: "MCP spec 2026-07-28, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "MCP-server", "tools", "resources", "prompts", "sampling", "stdio", "SSE"]
doc_refs: ["https://modelcontextprotocol.io/docs/learn/architecture", "https://modelcontextprotocol.io/docs/getting-started/intro"]
---

# Bài 129 — MCP Servers: tools, resources, prompts

> Bài học được biên soạn từ transcript "Theory MCP Servers".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể được 3 interfaces MCP server expose: tools, resources, prompts và ai điều khiển mỗi loại.
2. Nêu được 4 cách có MCP server: tự viết, AI sinh, cộng đồng, official integrations.
3. Giải thích nguyên tắc "do not reinvent the wheel" với ví dụ Stripe.
4. Nói được các cách chạy server: local stdio, remote, Docker; cùng sampling và composability.
5. Giữ đúng thuật ngữ Anh: MCP server, tools, resources, prompts, sampling, stdio, SSE, registry.

## 2. Kiến thức cốt lõi

### MCP server là gì

Transcript định nghĩa trực tiếp:

- MCP servers là wrappers/interfaces gom quyền truy cập nhiều systems và tools, mở cho AI applications theo cách chuẩn hóa.
- Cách mở là qua 3 interfaces chính.

### Ba interfaces

1. **Tools** — model-controlled functions AI gọi khi cần. Ví dụ weather: get weather, get forecast, get alerts. Trong tools ta có toàn quyền: đọc/ghi dữ liệu, gọi hệ khác. AI quyết định khi nào dùng dựa trên context.
2. **Resources** — application-controlled data mở cho AI. Có thể static (PDF, text, images, JSON) hoặc dynamic (chỉ cách lấy động). Transcript hẹn ví dụ static/dynamic ở video sau.
3. **Prompts** — user-controlled templates cho interactions chung, chuẩn hóa các tương tác phức tạp. Transcript thừa nhận phần này còn trừu tượng, hẹn ví dụ sau sẽ intuitive.

### Có server bằng 4 cách

1. Tự viết thủ công: vài trăm dòng Python hoặc Node.js.
2. Dùng AI sinh: Cursor, MCP generator; khóa học sẽ demo.
3. Dùng community servers: hàng nghìn servers mã nguồn mở, clone và sửa được (ví dụ weather server).
4. Dùng official integrations: Cloudflare, Stripe tự maintain server của họ — giống LangChain nơi mỗi vendor maintain package riêng (langchain-openai, langchain-anthropic, langchain-pinecone...). Động lực: càng nhiều người dùng qua MCP, sản phẩm họ càng được dùng.

### Không reinvent the wheel

- Cần tích hợp third-party thì kiểm tra trước họ đã có MCP server chưa. Hầu hết đã có.
- Ví dụ Stripe: không tự viết Stripe integration, dùng pre-built của team Stripe. Thiếu feature thì liên hệ họ hỏi roadmap hoặc đặt hàng custom thay vì chui vào rabbit hole.

### Chạy ở đâu, mở rộng ra sao

- Local qua standard input/output — như đã chạy weather server.
- Remote qua server-sent events hoặc SSH (theo lời transcript), hẹn ví dụ sau; chạy Docker containers cũng được.
- **Sampling**: server yêu cầu host AI (Cursor, Claude Desktop) sinh completion cho một prompt. Rất mạnh, mở nhiều chức năng, nhưng có implications về security/privacy — hẹn đào sâu sau.
- **Composability**: một app/agent vừa là MCP client vừa là server, xếp thành multi-layered agentic applications với agents chuyên biệt.

### Tương lai

- Registry/discovery tập trung: list server mình viết cho người khác dùng.
- Verification official servers: chống supply chain attack (kẻ xấu giả mạo "stripe MCP server" để trộm data/chạy mã độc).
- Self-evolving agents tự phát hiện capabilities lúc runtime.
- Websites expose capabilities như robots.txt: well-known endpoints/JSON cho MCP clients discover.
- Auth: OAuth 2.0, session tokens để bảo mật truy cập hệ ngoài.

## 3. Ví dụ và diễn giải

- Weather tools: get weather, get forecast, get alerts — cùng một pattern function có arguments và return values.
- So sánh LangChain packages: mỗi vector store/vendor maintain package riêng; MCP servers đi theo con đường đó.
- Supply chain attack: ai cũng upload server lên GitHub được nên verification là bắt buộc.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận servers expose đúng 3 primitives tools, resources, prompts; clients expose elicitation; sampling đã deprecated từ 2026-07-28. Kiểm chứng ngày 2026-09-17.
- [What is MCP](https://modelcontextprotocol.io/docs/getting-started/intro) xác nhận ví USB-C và clients/hosts rộng (Claude, ChatGPT, VS Code, Cursor...).
- Transport: docs mới chỉ còn stdio (local) và Streamable HTTP (remote). Transcript nói SSE/SSH/Docker — giữ gốc, hiểu SSE là tên cũ của remote streaming.
- Trạng thái: khái niệm **vẫn đúng**, chỉ từ vựng transport và sampling đã cũ.

> **Hộp cập nhật:** transcript giới thiệu sampling như tính năng tương lai đầy hứa hẹn. Theo spec 2026-07-28, `sampling/createMessage` đã deprecated; new implementations nên gọi trực tiếp LLM provider APIs, logging chuyển sang stderr/OpenTelemetry. Giữ nguyên bài giảng, khi code mới đừng thiết kế quanh sampling.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Server là gì | Wrapper chuẩn hóa cho tools/systems ngoài |
| Tools | Model-controlled functions |
| Resources | Application-controlled data, static hoặc dynamic |
| Prompts | User-controlled templates |
| Lấy ở đâu | Tự viết, AI sinh, cộng đồng, official |
| Nguyên tắc | Đừng reinvent the wheel, check third-party trước |
| Chạy | Local stdio, remote, Docker |
| Tương lai | Registry, verification, auth OAuth 2.0 |

**Một câu chốt:** Muốn mở gì cho AI thì gói thành MCP server; cần gì có sẵn thì tìm server chính chủ trước khi tự viết.

## 6. Câu hỏi tự kiểm tra

1. Ba interfaces của MCP server khác nhau ở "ai điều khiển" ra sao?
2. Kể 4 cách có được MCP server.
3. Vì sao không nên tự viết Stripe integration?
4. Sampling là gì và rủi ro của nó?
5. Vì sao cần verification cho official servers?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Tools do model quyết định gọi khi nào; resources do application quản lý và mở data cho AI; prompts do user invoke theo templates định sẵn.

**2.** Viết thủ công vài trăm dòng Python/Node; dùng AI (Cursor, generator); clone community servers; dùng official integrations do công ty maintain.

**3.** Vì team Stripe đã làm pre-built MCP server. Tự viết lại là reinvent the wheel, rơi vào rabbit hole; thiếu gì thì hỏi roadmap hoặc đặt custom.

**4.** Server yêu cầu host AI sinh completion cho một prompt. Mạnh nhưng có security/privacy implications; spec mới đã deprecated, nên gọi trực tiếp LLM API.

**5.** Vì ai cũng upload server giả mạo được (ví dụ mạo danh Stripe) để trộm data hoặc chạy mã độc — supply chain attack. Verification giúp phân biệt official.

</details>

## 7. Bước tiếp theo

Bài 130 — *What are we building MCP Doc* — rời lý thuyết sang dùng pre-built server mcpdoc với clients có sẵn (file 129a là quiz rỗng, bỏ qua).

Nguồn: transcript gốc `129 - Theory MCP Servers.md`; [architecture](https://modelcontextprotocol.io/docs/learn/architecture).
