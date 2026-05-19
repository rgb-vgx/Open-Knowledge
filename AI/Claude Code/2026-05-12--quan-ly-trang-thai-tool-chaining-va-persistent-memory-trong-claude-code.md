---
title: Quản Lý Trạng Thái, Tool Chaining và Persistent Memory trong Claude Code
date: '2026-05-12 14:43:36'
date_gmt: '2026-05-12 07:43:36'
modified: '2026-05-12 14:43:36'
status: publish
slug: quan-ly-trang-thai-tool-chaining-va-persistent-memory-trong-claude-code
wordpress_id: 738
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/quan-ly-trang-thai-tool-chaining-va-persistent-memory-trong-claude-code/
categories:
- Claude Code
tags: []
---

---

## Bài học này nói về gì?

Tiếp nối phần tích hợp Remote MCP, bài học này đi sâu vào cách Claude Code thực sự "sử dụng" các công cụ đã được cấp. Chúng ta khám phá quy trình Tool Chaining (gọi chuỗi công cụ), cơ chế lưu trữ ngữ cảnh vĩnh viễn (Persistent Memory) qua file cấu hình, và cách đưa toàn bộ setup này vào luồng quản lý mã nguồn (Git).

## Vấn đề thực tế

1. **Rời rạc trong thao tác:** Agent không thể trả lời một câu hỏi phức tạp nếu chỉ dùng 1 tool. Nó cần biết cách kết hợp nhiều tool với nhau (ví dụ: tìm ID của thư viện -> sau đó dùng ID đó để kéo docs).
2. **Hội chứng "Cá vàng" của LLM:** Mỗi khi khởi động lại session hoặc mở một terminal mới, AI quên hết các quy tắc bạn đã dặn dò trước đó (ví dụ: "luôn dùng docs mới nhất khi code LangGraph"). Việc phải nhắc đi nhắc lại (prompting lại từ đầu) làm gãy luồng làm việc.

## Khái niệm cốt lõi

- **Tool Chaining:** Khả năng Agent tự động nhận diện dependencies giữa các bước và gọi liên tiếp nhiều tools để đạt được mục tiêu cuối cùng.
- **Persistent Memory (`CLAUDE.md`):** *(Bổ sung từ tài liệu chính thức: Transcript ghi nhầm là `cloud.md`, tên file chuẩn xác của hệ thống là `CLAUDE.md`)*. Đây là file lưu trữ System Prompt cục bộ cho từng thư mục (project-specific instructions). Claude Code sẽ luôn đọc file này và nhồi vào đầu Context Window mỗi khi khởi động session tại thư mục đó.
- **Granular Consent (Cấp quyền chi tiết):** Cơ chế bảo mật yêu cầu người dùng xác nhận (`Yes/No/Always`) đối với từng API call cụ thể mà Agent định thực hiện, ngăn chặn các hành động ngoài ý muốn.

## Claude Code hoạt động như thế nào?

1. **Tool Discovery:** Khi chạy lệnh xem danh sách MCP, Claude Code parse file schema từ server để nhận diện hai tools: `resolve_library_id` (tìm ID gói) và `get_library_docs` (lấy tài liệu bằng ID).
2. **Execution Loop:**
   - User hỏi: "Latest version của LangGraph là gì?"
   - Claude suy luận (Planning): "Mình không biết. Mình cần gọi Context7. Nhưng Context7 cần ID. Vậy trước tiên mình gọi `resolve_library_id("langgraph")`."
   - Claude xin quyền (Consent) -> User `Yes`.
   - Claude có ID, tiếp tục suy luận: "Giờ mình dùng ID này gọi `get_library_docs(id)`."
   - Claude xin quyền -> User `Yes`.
   - Claude nhận data (0.5.3), đối chiếu nội bộ hoặc trả thẳng kết quả cho user.
3. **Memory Injection:** Khi user yêu cầu "Hãy nhớ quy tắc này", Claude tự động sinh ra hoặc update file `CLAUDE.md`. Lần mở sau, Agent đọc file này ngay từ giây số 0 để set định hướng hành vi (Behavioral bias).

## Demo / Flow trong bài học

1. **Khám phá Tool:** Instructor kiểm tra chi tiết Context7 MCP và thấy 2 tools.
2. **Thực thi truy vấn:** Yêu cầu lấy thông tin về thư viện LangGraph.
3. **Approve Workflow:** Instructor phê duyệt 2 lần (1 cho việc tìm ID, 1 cho việc kéo Docs). Quyền này được update vào `settings.local.json`.
4. **Phát hiện giới hạn:** Nhận ra dữ liệu từ MCP bị delay (0.5.3 so với bản thực tế 0.6.0 mới ra mắt hôm qua).
5. **Ghi đè Memory:** Dùng lệnh (hoặc chat) để yêu cầu Claude: "Từ giờ hễ nói tới LangGraph là phải gọi Context7 MCP". Claude tự động tạo file `CLAUDE.md`.
6. **Kiểm chứng:** Khởi động lại Claude Code, hỏi về LangGraph. Lần này Agent tự động áp dụng quy tắc trong `CLAUDE.md` và tự gọi Tool mà không cần nhắc lại.
7. **Git Commit:** Đưa các file cấu hình (`.mcp.json`, `CLAUDE.md`) vào Git để đồng bộ cho toàn team.

## Phân tích kỹ thuật

### Architecture & Agent Loop

Kiến trúc ở đây tuân thủ vòng lặp **ReAct (Reasoning and Acting)**:

- **Thought:** LLM phân tích prompt và quyết định cần thông tin gì.
- **Action:** Quyết định gọi tool `A` với tham số `X`. Claude Code chặn lại để kiểm tra Policy (Consent).
- **Observation:** Nhận kết quả từ tool `A`. Nếu thiếu, vòng lặp lặp lại với tool `B`.

### Prompt Engineering & Memory / State

Thay vì phải nhồi nhét System Prompt vào từng file source code hay gõ tay, cấu trúc state được phân tách cực kỳ rõ ràng:

- **`.mcp.json`:** Định nghĩa CƠ SỞ HẠ TẦNG (Tầng Infrastructure - Agent có đồ chơi gì?). Có thể commit.
- **`CLAUDE.md`:** Định nghĩa LUỒNG LOGIC/QUY TẮC (Tầng Application Logic - Agent nên cư xử thế nào?). Có thể commit.
- **`settings.local.json`:** Định nghĩa BẢO MẬT/TRẠNG THÁI (Tầng Security/Session - Agent được phép làm gì tự động?). **Không** commit.

### Execution Flow & Tool Calling

Cấu trúc *Two-step execution* (`resolve` -> `get`) là một design pattern kinh điển trong thiết kế MCP. Nó tránh việc bắt LLM đoán bừa ID thư viện (dễ sinh ra ảo giác - hallucination), thay vào đó, bắt LLM search ID trước (exact match) rồi mới query data.

## Ví dụ thực tế

Hãy tưởng tượng bạn đang quản lý hạ tầng Kubernetes. Bạn kết nối một `Kubernetes MCP`.

Bạn thêm vào `CLAUDE.md`: *"Khi tôi yêu cầu debug lỗi API backend viết bằng Go, hãy luôn tự động dùng k8s-mcp để fetch logs của 10 phút gần nhất từ các pod có label `app=backend` trước khi đề xuất sửa code."*

Khi bạn chat: "Check lỗi panic của backend", Claude Code sẽ tự động thực thi chuỗi: Tìm Pod ID -> Fetch Logs -> Phân tích stacktrace Go -> Đề xuất fix. Toàn bộ tự động vì đã có Project Memory định hướng.

## Ưu điểm / Hạn chế

| **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- |
| **Automation:** Tự động hóa được quy trình thu thập context dài dòng nhờ Tool Chaining. | **Data Freshness:** Như demo cho thấy, dữ liệu từ Remote MCP (Context7) phụ thuộc vào tốc độ crawl của server thứ 3 (bị miss bản 0.6.0). |
| **Team Sync:** Push `CLAUDE.md` lên Git giúp toàn bộ developer trong team có chung một chuẩn coding style hoặc quy trình debug khi dùng chung Claude Code. | **Token Cost:** Gọi nhiều tools đồng nghĩa với việc đẩy qua đẩy lại nhiều JSON Schema và Result text, làm tốn token và tăng độ trễ (latency). |
| **Bảo mật:** Consent layer đảm bảo Agent không tự ý chạy các tác vụ phá hoại (như tự ý xóa file, gửi request bừa bãi). | **Context Overflow:** Quá lạm dụng `CLAUDE.md` (viết file quá dài) sẽ chiếm mất bộ nhớ Context Window giới hạn của LLM. |

## Những điều quan trọng cần nhớ

- **Tool Chaining là sức mạnh:** Agent giỏi không phải là Agent trả lời ngay, mà là Agent biết cách tự gọi chuỗi các API để ráp nối dữ liệu trước khi trả lời.
- `CLAUDE.md` là "System Prompt" ở cấp độ Project. Dùng nó để chuẩn hóa workflow cho cả repository.
- Nắm rõ sự khác biệt giữa các file config: `.mcp.json` (Tools), `CLAUDE.md` (Instructions), và file settings local (Permissions).
- Đừng mù quáng tin tưởng tuyệt đối vào kết quả của MCP. Server index chậm sẽ dẫn tới outdated data.

## Góc nhìn dành cho BE Developer

Khi thiết kế một hệ thống LLM orchestration hay một lớp Routing trung gian (như Semantic Router bằng Go để điều phối request giữa các models), bài toán hóc búa nhất là làm sao quản lý được State và cấp quyền truy cập công cụ cho từng luồng.

Claude Code giải bài toán này bằng cách áp dụng **Declarative Configuration** (Cấu hình khai báo) rất giống tư duy hạ tầng.

- `.mcp.json` giống như khai báo một gRPC Client trong hệ thống phân tán.
- `CLAUDE.md` đóng vai trò như một bộ routing rules hoặc middleware policies: nó chặn đầu (intercept) mọi request của user, ép thêm bối cảnh định tuyến (routing context) vào trước khi đẩy xuống LLM để xử lý.
- Việc tách bạch State (Git-tracked) và Secrets/Permissions (Local) là tiêu chuẩn bắt buộc khi build các Agentic System chạy độc lập trên môi trường Production (như trong các hệ thống giám sát KPI hay xử lý log tự động).

## Từ khóa / Thuật ngữ (Glossary)

- **Tool Chaining:** Quá trình một AI Agent tự động gọi liên tiếp nhiều hàm/công cụ, đầu ra của hàm này làm đầu vào cho hàm kia để giải quyết bài toán lớn.
- **Persistent Memory:** Bộ nhớ vĩnh viễn lưu trữ dưới dạng file vật lý (ở đây là `CLAUDE.md`), giúp duy trì bối cảnh giữa các phiên làm việc (sessions) khác nhau.
- **ReAct Loop (Reasoning and Acting):** Vòng lặp nhận thức của AI, nơi nó luân phiên giữa việc "suy nghĩ" (mình cần làm gì tiếp) và "hành động" (gọi tool/chạy lệnh).
- **Declarative Configuration:** Phương pháp khai báo trạng thái mong muốn của hệ thống (bằng file config JSON/MD) thay vì viết code thực thi từng bước. Dễ dàng đưa vào quản lý phiên bản (Version Control - Git).
