---
title: 'Tích Hợp Remote MCP Vào Claude Code: Giải Quyết Bài Toán Context Động Cho
  AI Agent'
date: '2026-05-12 14:39:18'
date_gmt: '2026-05-12 07:39:18'
modified: '2026-05-12 14:39:18'
status: publish
slug: tich-hop-remote-mcp-vao-claude-code-giai-quyet-bai-toan-context-dong-cho-ai-agent
wordpress_id: 735
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/tich-hop-remote-mcp-vao-claude-code-giai-quyet-bai-toan-context-dong-cho-ai-agent/
categories:
- Claude Code
tags: []
---

## Bài học này nói về gì?

Bài học này hướng dẫn cách mở rộng khả năng của Claude Code thông qua việc tích hợp một external server bằng giao thức **MCP (Model Context Protocol)**. Cụ thể, chúng ta đi qua quá trình sử dụng CLI của Claude Code để kết nối một Remote HTTP MCP Server (cung cấp tài liệu API up-to-date), cách cấu hình scope (phạm vi hoạt động), và cơ chế phân quyền (consent model) trong hệ sinh thái của Claude.

## Vấn đề thực tế (Pain Point)

Các LLM (như Claude 3.5 Sonnet) thường gặp phải một giới hạn vật lý: **Knowledge Cutoff** (ngưỡng thời gian huấn luyện).

Trong thế giới phần mềm, đặc biệt là hệ sinh thái AI tooling, các SDK và thư viện được cập nhật liên tục hàng tuần. Nếu yêu cầu AI viết code sử dụng một phiên bản package vừa ra mắt hôm qua, nó sẽ bị "mù" thông tin (blind spot) hoặc tệ hơn là hallucinate (bịa ra API không tồn tại).

*Cách giải quyết truyền thống:* Developer phải copy-paste docs vào prompt. Điều này làm rác Context Window, tốn thời gian và không scale được.

*Cách giải quyết của Claude Code:* Uỷ quyền việc lấy dữ liệu (fetching) cho một **MCP Server** chuyên dụng.

## Khái niệm cốt lõi

- **MCP (Model Context Protocol):***(Bổ sung từ tài liệu chính thức)* Đây là một giao thức mã nguồn mở (open standard) do Anthropic khởi xướng. Nó chuẩn hóa cách các AI model kết nối với các nguồn dữ liệu (Data) và công cụ (Tools) bên ngoài.
  - *Analogy:* Nếu coi LLM là CPU, thì MCP chính là cổng cắm "USB Type-C". Bạn có thể cắm ổ cứng (Database), cắm bàn phím (Input), hoặc cắm mạng (API) mà không cần thay đổi kiến trúc của CPU.
- **Remote vs Local MCP Server:**
  - **Local (stdio):** Process chạy trực tiếp trên máy của bạn (ví dụ: chạy một script Python/NodeJS).
  - **Remote (HTTP/SSE):** Server nằm ở nơi khác. Client (Claude Code) giao tiếp qua HTTP Requests và Server-Sent Events (SSE).
- **Configuration Scope:** Mức độ ảnh hưởng của cấu hình.
  - `Global/User`: Áp dụng cho mọi project trên máy.
  - `Project`: Chỉ áp dụng cho thư mục hiện tại (tạo ra file `.mcp.json`).

## Claude Code hoạt động như thế nào? (Dưới góc độ Abstraction)

*(Bổ sung từ tài liệu chính thức)*

Claude Code abstract đi sự phức tạp của việc cấu hình tool calling. Thay vì bạn phải tự viết code định nghĩa schema (JSON Schema) cho từng function để pass vào API của Anthropic, workflow diễn ra như sau:

1. **Discovery:** Khi khởi động, Agent Loop của Claude Code đọc file `.mcp.json`.
2. **Handshake:** Nó thiết lập kết nối (ví dụ qua HTTP/SSE) tới MCP Server.
3. **Schema Sync:** MCP Server sẽ trả về danh sách các "Tools" và "Resources" mà nó hỗ trợ kèm theo schema chuẩn.
4. **Injection:** Claude Code tự động map các tools này vào System Prompt của LLM.
5. **Execution (Tool Calling):** Khi bạn hỏi một câu cần docs mới, LLM quyết định gọi tool `fetch_doc` của MCP. Claude Code đứng ra làm proxy, gửi request HTTP tới Server, lấy kết quả và nhét ngược lại vào Context Window để LLM sinh câu trả lời cuối cùng.

## Demo / Flow trong bài học

Instructor đã thực hiện các bước sau để tích hợp MCP chứa tài liệu (được gọi là "Context" - chứa index của ~30,000 packages):

1. **Check trạng thái:** Chạy lệnh để kiểm tra danh sách MCP hiện tại (đang trống).
2. **Sử dụng CLI:** Thay vì tạo file JSON thủ công, dùng lệnh `claude mcp add` (lưu ý: transcript nhầm lẫn "cloud" thay vì "claude"). CLI giúp tránh lỗi format và tự động cập nhật schema mới nhất.
3. **Cấu hình Remote MCP:** Khai báo loại transport là `HTTP`, tên MCP, và URL endpoint của server.
4. **Define Scope:** Gắn flag `--scope project` để cấu hình chỉ áp dụng cho dự án hiện tại (tạo ra file `.mcp.json`).
5. **Cấp quyền (Consent):** Khởi động lại Claude Code. Nó phát hiện file cấu hình mới và prompt yêu cầu user xác nhận quyền truy cập, sau đó lưu vào file `settings.json` cục bộ.

## Phân tích kỹ thuật

### 1. Architecture

Kiến trúc ở đây là **Decoupled Architecture**. Claude Code (Client) không hề biết MCP Server lưu trữ tài liệu thế nào hay database ra sao. Nó chỉ giao tiếp qua một Interface Contract duy nhất. Điều này cho phép phía Server (ví dụ Context.ai) scale độc lập để phục vụ hàng ngàn người dùng cùng lúc.

### 2. Context Handling & Prompt Engineering

Bằng cách dùng MCP, thay vì hardcode thông tin vào prompt, ta đang áp dụng mô hình **RAG-on-demand** (Retrieval-Augmented Generation theo yêu cầu). Agent chỉ lấy context khi thực sự cần (ví dụ LLM tự nhận thức được nó không biết package `X` phiên bản mới nhất, nó sẽ trigger tool calling gọi đến MCP).

### 3. Execution Flow & Memory State

1. **Config State:** Lưu ở `.mcp.json` (để commit vào Git chia sẻ cho team).
2. **Security State:** Lưu ở `settings.json` trong máy cá nhân (không commit). Đây là cơ chế bảo mật (User Consent Model) cốt lõi của Agent workflow, tránh việc AI tự ý gọi API độc hại mà user không biết.

Bash

```
# Phân tích lệnh CLI cấu hình
claude mcp add context7 \
  --transport http \
  --url https://api.context.server/mcp \
  --scope project
```

- `--transport http`: Chuyển đổi cơ chế IPC (Inter-process communication) sang network call.
- `--scope project`: Giới hạn blast radius của cấu hình, tuân thủ nguyên tắc Least Privilege.

## Ví dụ thực tế (Workflow Engineering)

Ngoài việc fetch docs như trong video, bạn có thể thiết lập các Remote MCP để xử lý workflow CI/CD:

- **MCP kết nối JIRA:** Khi bạn nhờ Claude Code "Fix bug này", nó tự gọi MCP Server của team bạn, lấy thông tin JIRA ticket, tự động lấy context của bug, sửa code, và gọi lại MCP để đổi status JIRA thành "In Review".
- **MCP kết nối AWS/GCP (Infra-as-Code):** Cung cấp các tool để Claude Code query cấu hình hạ tầng hiện tại trực tiếp từ Cloud Provider để viết Terraform chính xác.

## Ưu điểm / Hạn chế (Trade-offs)

| **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- |
| **Decoupling:** Tách biệt logic lấy data ra khỏi logic của AI Agent. Dễ dàng update tool mà không cần update hệ thống AI. | **Latency:** Giao tiếp HTTP (Remote MCP) chậm hơn Local (stdio), ảnh hưởng đến tốc độ phản hồi của Agent. |
| **Scalability:** Remote MCP có thể tận dụng cache, rate limiting, và phục vụ nhiều client cùng lúc. | **Security Risk:** Gửi dữ liệu ra khỏi máy (qua internet tới Remote Server) tiềm ẩn rủi ro lộ mã nguồn/context nhạy cảm. |
| **Tính chuẩn hóa (Standardization):** Viết MCP 1 lần, dùng được cho Claude Code, Cursor, và các IDE hỗ trợ MCP khác. | **Dependency:** Phụ thuộc vào uptime của Remote MCP Server. Server sập = Agent mất tính năng. |

## So sánh với công cụ khác

- **Cursor / Aider:** Thường sử dụng các internal tools hoặc require bạn phải paste URL docs trực tiếp (như tính năng `@Docs` của Cursor). MCP của Claude Code mang tính "hệ sinh thái" hơn, cho phép cộng đồng tự build server cấp data mà không phụ thuộc vào vendor IDE.
- **LangChain / LlamaIndex:** Đây là các framework cấp code. Bạn phải tự viết code orchestration. Claude Code + MCP là giải pháp out-of-the-box (chỉ cần CLI) để mang RAG và Tool calling vào thẳng IDE/Terminal của bạn.

## Những điều quan trọng cần nhớ

- Luôn dùng **CLI** (`claude mcp add`) để cấu hình thay vì viết file thủ công để đảm bảo tính hợp lệ của schema.
- **Remote MCP (HTTP)** dùng cho các service public/chia sẻ, trong khi **Local MCP (stdio)** dùng cho các công cụ chạm trực tiếp vào file system máy bạn.
- Mô hình bảo mật của Agent yêu cầu **User Consent** rõ ràng mỗi khi kết nối một Server mới (lưu trong `settings.json`).
- Quản lý **Scope** hợp lý: Cấu hình dùng chung cho dự án thì để ở project level (commit được), thông tin cá nhân thì để local.

## Góc nhìn dành cho Backend Developer

Nếu bạn là BE Dev, hãy nhìn MCP như một kiến trúc **Microservices dành cho LLM**.

Trong hệ thống truyền thống, bạn có API Gateway routing đến các services. Trong Agent Workflow, Claude (LLM) là bộ não (Orchestrator), và các MCP Server chính là các Microservices cung cấp capabilities (đọc DB, gọi 3rd party API, search vector).

Việc hiểu chuẩn MCP sẽ giúp bạn tự tay build được các "Agentic API" – biến các hệ thống backend legacy của công ty thành các endpoints mà AI có thể tự động hiểu và sử dụng.

## Từ khóa / Thuật ngữ (Glossary)

- **AI Agent / Agentic Loop:** Một hệ thống AI có khả năng lập kế hoạch (planning), quyết định sử dụng công cụ nào (tool calling), và lặp lại quá trình này (loop) cho đến khi hoàn thành nhiệm vụ.
- **Tool Calling / Function Calling:** Khả năng của LLM trả về một format JSON có cấu trúc để yêu cầu thực thi một hàm cụ thể, thay vì chỉ trả về text thuần túy.
- **MCP (Model Context Protocol):** Giao thức chuẩn hóa việc kết nối AI với các nguồn dữ liệu/công cụ bên ngoài.
- **Transport (HTTP vs Stdio):** Lớp mạng truyền tải dữ liệu. Stdio là giao tiếp qua luồng dữ liệu tiêu chuẩn (cục bộ), HTTP là qua giao thức mạng (từ xa).
- **Consent Model:** Cơ chế buộc người dùng phải cấp quyền rõ ràng (explicit approval) trước khi Agent được phép thực thi một hành động có rủi ro.
- **Knowledge Cutoff:** Điểm dừng cập nhật dữ liệu huấn luyện của một model AI (VD: model chỉ biết thông tin đến tháng 10/2023). Dùng MCP fetch docs là cách bypass giới hạn này.
