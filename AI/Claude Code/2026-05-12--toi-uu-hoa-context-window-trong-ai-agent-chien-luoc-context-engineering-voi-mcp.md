---
title: 'Tối Ưu Hóa Context Window Trong AI Agent: Chiến Lược Context Engineering Với
  MCP'
date: '2026-05-12 14:50:52'
date_gmt: '2026-05-12 07:50:52'
modified: '2026-05-12 14:50:52'
status: publish
slug: toi-uu-hoa-context-window-trong-ai-agent-chien-luoc-context-engineering-voi-mcp
wordpress_id: 741
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/toi-uu-hoa-context-window-trong-ai-agent-chien-luoc-context-engineering-voi-mcp/
categories:
- Claude Code
tags: []
---

Bài học này tập trung vào khái niệm **Context Engineering** (Kỹ thuật quản lý ngữ cảnh) – một khía cạnh sống còn khi vận hành AI Agentic Systems. Cụ thể, nó chỉ ra "kẻ giết người thầm lặng" làm suy giảm hiệu suất của Agent: việc cấu hình MCP (Model Context Protocol) quá lạm dụng, dẫn đến tràn bộ nhớ ngữ cảnh. Đồng thời, bài học cung cấp 2 giải pháp kỹ thuật thông qua CLI của Claude Code để kiểm soát chính xác những công cụ nào được phép tải vào bộ nhớ.

## Vấn đề thực tế (Pain Point)

Trong các hệ thống AI, **Context Window (Cửa sổ ngữ cảnh)** là tài nguyên đắt đỏ và hữu hạn nhất.

Khi bạn tích hợp MCP vào Claude Code bằng một file `.mcp.json` chung ở cấp độ dự án (project-level), theo mặc định, hệ thống sẽ tải **toàn bộ** cấu hình: từ công cụ tìm kiếm web (Tavily), điều khiển trình duyệt (Playwright), tài liệu (Context7), cho đến các công cụ nội bộ (như ví dụ Server thực hiện các phép toán dài dòng).

Vấn đề là:

1. **Context Bloat (Phình to ngữ cảnh):** LLM cần hiểu cách dùng tool, nên toàn bộ "Description" và "JSON Schema" của hàng chục tools này sẽ bị nhét thẳng vào System Prompt.
2. **Degraded Performance:** Dù bạn chưa gõ câu prompt nào, hệ thống đã ngốn mất 20% đến 50% dung lượng ngữ cảnh chỉ để chứa hướng dẫn sử dụng tools. Context càng nhiễu, Agent suy luận càng kém (độ tập trung giảm).
3. **Lãng phí chi phí & tăng độ trễ:** Gửi đi một lượng lớn token vô ích trong mỗi request (HTTP/API call).

## Khái niệm cốt lõi

- **Context Engineering:** *(Bổ sung từ tài liệu chính thức)* Kỹ thuật thiết kế, lựa chọn và tối ưu hóa luồng dữ liệu/công cụ được đưa vào LLM. Thay vì nhồi nhét mọi thứ (Shotgun approach), ta chỉ cung cấp lượng thông tin vừa đủ (Just-in-time context) để hoàn thành task hiện tại.
- **MCP Tool Schema Bloat:** Hiện tượng lãng phí token do các định nghĩa công cụ (descriptions, parameters) quá dài và không cần thiết cho context hiện tại.
- **Configuration Hierarchy (Hệ thống phân cấp cấu hình):** Claude Code tự động merge (gộp) các cấu hình MCP từ cấp độ User (toàn cục) và cấp độ Project (thư mục cục bộ). Điều này tiện lợi nhưng dễ gây ra mất kiểm soát context.

## Claude Code hoạt động như thế nào? (Workflow Nội Bộ)

1. **Khởi động (Bootstrapping):** Khi chạy lệnh `claude`, Agent quét qua thư mục gốc của User và thư mục Project hiện tại để tìm các file config (`.mcp.json` hoặc `settings.json`).
2. **Dependency Injection:** Nó gọi đến các MCP Servers đã đăng ký, yêu cầu trả về danh sách Tools hỗ trợ.
3. **Prompt Assembling:** Claude Code tổng hợp System Prompt mặc định của Anthropic + Danh sách Tools (kèm mô tả) -> Tạo thành một Context Block khổng lồ ở backend.
4. **Diagnostic Tooling:** Claude Code cung cấp lệnh nội bộ `/context` để developer chụp X-quang (profile) xem token đang bị tiêu tốn vào phần nào (System tools, MCP tools, Memory, hay Messages).

## Demo / Flow trong bài học

1. **Thiết lập môi trường lỗi:** Instructor khởi chạy một Local MCP Server viết bằng Python/FastMCP (chứa rất nhiều tools toán học vô dụng nhưng có description cực kỳ chi tiết).
2. **Tạo Context Bloat:** Tạo file `.mcp.json` chứa 4 servers (Verbose Math, Context7, Tavily, Playwright).
3. **Phân tích Context:** Khởi chạy Claude, gõ lệnh `/context`. Kết quả cho thấy: MCP Tools chiếm gần 20% tổng số token, tổng context bị chiếm dụng lên tới ~50% dù chưa làm gì.
4. **Cách khắc phục 1 (Hard Config bằng CLI Flags):**
   - Xóa file `.mcp.json` chung. Tạo file riêng (vd: `tavily.mcp.json`).
   - Chạy `claude --mcp-config tavily.mcp.json --strict-mcp-config`.
   - *(Bổ sung từ tài liệu chính thức):* Flag `--strict-mcp-config` ép Claude Code bỏ qua các config ở User-level, đảm bảo sự cô lập hoàn toàn. Dung lượng tool tụt xuống còn 2.4%.
5. **Cách khắc phục 2 (Soft Config bằng CLI Menu):**
   - Vẫn dùng file chung `.mcp.json`.
   - Khởi chạy Claude, gõ `/mcp`.
   - Dùng UI của Terminal chọn trực tiếp server (như Verbose hoặc Playwright) và nhấn phím tắt để `Disable` (vô hiệu hóa) nó trong phiên làm việc hiện tại. Dung lượng tool tụt xuống 3.2%.

## Phân tích kỹ thuật

### 1. Context Handling & Prompt Engineering

Định nghĩa của một Tool MCP bản chất là các chuỗi JSON Schema. Càng nhiều Tool, JSON Schema càng phình to.

Việc ép Agent mang theo 20 tools vào một task chỉ cần 1 tool không khác gì bắt một người thợ sửa ống nước mang theo cả máy xúc và cần cẩu đi làm. Context Engineering giúp tăng "Signal-to-Noise Ratio" (tỷ lệ Tín hiệu / Nhiễu), giúp LLM không bị phân tâm bởi các công cụ không liên quan.

### 2. Execution Flow & CLI Arguments

Kiến trúc của Claude Code cung cấp các "Escape Hatches" (cửa thoát hiểm) cho developer:

- `--mcp-config <path>`: Overwrite đường dẫn đọc config. Phù hợp để làm các profile riêng (ví dụ: `research_profile.json`, `coding_profile.json`).
- `--strict-mcp-config`: Cắt đứt tính năng Merge Config (kế thừa) mặc định. Đây là pattern thiết kế ranh giới hệ thống (Boundary Control) xuất sắc.

### 3. Agent Loop State

Trạng thái (State) của Tools không tĩnh. Lệnh `/mcp` cho phép mutate (thay đổi) state của context ngay lúc runtime (enable/disable tool) mà không cần phải tắt Agent hay sửa file vật lý.

## Ví dụ thực tế

Giả sử bạn làm việc trong một Monorepo lớn chứa cả Frontend (React) và Backend (Go).

- **Trường hợp xấu:** Bạn có một `.mcp.json` chứa công cụ phân tích bundle size của React và công cụ query Database của Go. Khi bạn nhờ Agent viết SQL, nó phải đọc cả hướng dẫn về bundle size, làm giảm độ thông minh của câu SQL được sinh ra.
- **Thực chiến:** Bạn viết script bash wrap lại Claude Code:
  - Khi gõ `agent-fe`: Script chạy `claude --mcp-config fe-tools.json --strict-mcp-config`
  - Khi gõ `agent-be`: Script chạy `claude --mcp-config be-tools.json --strict-mcp-config`Điều này tối ưu token và giữ cho Agent có tư duy sắc bén nhất cho từng domain chuyên biệt.

## Ưu điểm / Hạn chế

| **Phương pháp** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Dùng Flag CLI (Hard Config)** | Kiểm soát tuyệt đối 100%. Cách ly hoàn toàn khỏi các dự án khác. Tối ưu token tối đa. Rất tốt cho tự động hóa. | Phải tạo và quản lý nhiều file config. Trải nghiệm dev (DX) kém hơn nếu phải đổi context liên tục. |
| **Dùng `/mcp` vô hiệu hóa (Soft Config)** | Linh hoạt, tiện lợi ngay trong lúc đang chat. Không cần thoát session. | Tốn công thao tác tay mỗi khi bắt đầu một session mới nếu thiết lập mặc định có quá nhiều tools. |

## So sánh với công cụ khác

- **Cursor:** Cách tiếp cận của Cursor thường là "ẩn" context này đi phía sau hạ tầng của họ. Bạn ít khi kiểm soát được chính xác từng token cho công cụ nội bộ.
- **OpenHands / Aider:** Thường load toàn bộ hệ thống tools (như FileEditor, Shell, Browser) cùng lúc.
- Claude Code đưa khái niệm `/context` ra ánh sáng, buộc kỹ sư phải có tư duy **Resource Management** (quản lý tài nguyên) rõ ràng như việc tối ưu RAM.

## Những điều quan trọng cần nhớ

- **Bad context = Bad performance.** Không phải cứ cung cấp nhiều công cụ là Agent sẽ thông minh hơn.
- Sử dụng lệnh `/context` thường xuyên như một thói quen (giống như dùng Profiler khi debug code) để kiểm tra xem "ngân sách" token đang bị rò rỉ ở đâu.
- Flag `--strict-mcp-config` là vũ khí lợi hại để ngăn chặn việc Agent tự ý load các công cụ thừa thãi từ cấu hình Global/User.
- Có thể Enable/Disable MCP Server linh hoạt ngay lúc Runtime (trong lúc chat) thông qua lệnh `/mcp`.

## Góc nhìn dành cho Backend Developer

Hãy nhìn Context Window của LLM giống như **L1 Cache / RAM** trong System Design, còn các MCP Tools chính là các **Kernel Modules**.

Nếu bạn load quá nhiều modules vào RAM lúc khởi động, không gian trống cho User Space (ở đây là các Message và File code cần phân tích) sẽ bị thu hẹp lại (Gây ra OOM - Out of Memory, hoặc ở LLM là Max Tokens Exceeded).

Việc chia nhỏ `.mcp.json` thành các file cấu hình theo domain và tải chúng theo yêu cầu (`--mcp-config`) hoàn toàn tuân thủ nguyên lý **Separation of Concerns (SoC)** và **Least Privilege** trong kiến trúc phần mềm, đảm bảo hệ thống Orchestration hoạt động tinh gọn và ít tốn tài nguyên nhất.

## Từ khóa / Thuật ngữ (Glossary)

- **Context Window (Cửa sổ ngữ cảnh):** Giới hạn tối đa về lượng văn bản (tính bằng token) mà một model AI có thể ghi nhớ và xử lý trong một lần tương tác.
- **Context Engineering:** Quá trình tối ưu hóa dữ liệu đưa vào LLM để đạt hiệu suất cao nhất với chi phí token thấp nhất.
- **Context Bloat:** Tình trạng cửa sổ ngữ cảnh bị lấp đầy bởi các thông tin rác, cấu hình dư thừa, làm giảm khả năng tập trung (reasoning) của AI.
- **Dependency Injection (ở bối cảnh LLM):** Việc tiêm (inject) động các khả năng/công cụ vào System Prompt của Agent trước khi nó bắt đầu phân tích yêu cầu của người dùng.
- **Strict MCP Config:** Cơ chế ngăn chặn sự kế thừa cấu hình từ các tầng cao hơn (Global/User), bắt buộc Agent chỉ sử dụng danh sách tools được định nghĩa tường minh.
