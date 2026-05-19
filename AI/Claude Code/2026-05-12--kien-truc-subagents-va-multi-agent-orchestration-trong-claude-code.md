---
title: Kiến Trúc Subagents Và Multi-Agent Orchestration Trong Claude Code
date: '2026-05-12 16:03:56'
date_gmt: '2026-05-12 09:03:56'
modified: '2026-05-12 16:03:56'
status: publish
slug: kien-truc-subagents-va-multi-agent-orchestration-trong-claude-code
wordpress_id: 772
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/kien-truc-subagents-va-multi-agent-orchestration-trong-claude-code/
categories:
- Claude Code
tags: []
---

Bài học này là phần nền tảng lý thuyết (high-level theory) giải thích một trong những tính năng mạnh mẽ nhất của Claude Code: **Subagents (Đặc vụ con)**. Thay vì bắt một con AI làm mọi thứ, chúng ta học cách thiết kế một mạng lưới các AI chuyên biệt. Chúng ta sẽ khám phá cách cấu hình chúng bằng Markdown, cách chúng quản lý bộ nhớ độc lập, và lý do tại sao kiến trúc này lại giống hệt thiết kế Microservices trong lập trình Backend.

## Vấn đề thực tế (Pain Point)

1. **Hội chứng "Jack of all trades, master of none":** Nếu bạn nhồi nhét quá nhiều trách nhiệm (viết code, test, review bảo mật, query DB) vào một System Prompt duy nhất, LLM sẽ bị "pha loãng" sự tập trung. Nó làm mọi thứ ở mức trung bình và rất dễ mắc sai lầm logic.
2. **Context Pollution (Ô nhiễm ngữ cảnh):** Khi một Agent sửa UI xong, rồi quay sang viết API Backend, bộ nhớ của nó chứa đầy các thẻ HTML và CSS. Những thông tin rác này làm mờ đi ngữ cảnh Backend, gây ra ảo giác (Hallucination).
3. **Security Risk (Rủi ro bảo mật):** Nếu bạn cấp quyền chạy lệnh `bash` (Terminal) cho một Agent, và dùng chính Agent đó để đọc dữ liệu từ Internet (Tavily search), bạn đang mở ra lỗ hổng Prompt Injection (kẻ xấu trên mạng có thể lừa Agent chạy lệnh xóa ổ cứng).

*Giải pháp của Claude Code:* **Subagents**. Chia nhỏ vấn đề, cấp quyền tối thiểu, và cô lập ngữ cảnh.

## Khái niệm cốt lõi

- **Subagent (Đặc vụ con):** Một nhân cách AI (personality) được cấu hình sẵn với một nhiệm vụ cực kỳ hẹp, bộ công cụ (tools) giới hạn, và một System Prompt chuyên sâu.
- **Context Isolation (Cô lập ngữ cảnh):** Mỗi Subagent chạy trong một "bong bóng" bộ nhớ (Context Window) hoàn toàn trống rỗng và độc lập với phiên chat chính. Nó không biết trước đó bạn và Main Agent đã chat gì, nó chỉ nhận đầu vào là Task hiện tại.
- **Principle of Least Privilege (Nguyên tắc Quyền hạn tối thiểu):** Chỉ cấp cho Subagent những công cụ (Tools/MCP) vừa đủ để làm việc. (Ví dụ: Agent Review Code chỉ có quyền đọc file, không có quyền ghi).
- **Deep Agent (Đặc vụ sâu):** Thuật ngữ chỉ những Agent có khả năng nhận một mục tiêu lớn, tự suy luận, tự gọi tool nhiều lần trong một vòng lặp dài (long-running tasks) để hoàn thành công việc từ A-Z, trái ngược với các Agent chỉ trả lời hỏi-đáp 1 lần.
- **ReAct (Reasoning and Acting):** Framework cơ sở của Agentic AI, nơi mô hình liên tục đan xen giữa việc "Suy luận" (mình cần làm gì tiếp theo) và "Hành động" (gọi tool).

## Claude Code hoạt động như thế nào? (Abstractions & Mental Model)

Đây là điểm cốt lõi nhất cần hiểu: **Đối với Main Agent (Claude Code chính), một Subagent thực chất chỉ là một TOOL (Công cụ).**

*(Bổ sung từ tài liệu chính thức)*:

1. **Định nghĩa Declarative:** Bạn không cần viết code Python/TypeScript để tạo Subagent. Bạn chỉ cần viết một file Markdown (`.md`) đặt trong thư mục `.claude/agents/` (cấp Project) hoặc `~/.claude/agents/` (cấp Global).
2. **Tool Injection:** Khi khởi động, Claude Code đọc các file `.md` này. Nó lấy trường `Name` và `Description` biến thành định nghĩa JSON Schema của một Tool, rồi nhồi vào System Prompt của Agent chính.
3. **Orchestration (Điều phối):**
   - Bạn gõ lệnh: *"Hãy tạo một tính năng mới"*.
   - Agent chính suy nghĩ: *"Ah, mình có một tool tên là `frontend_agent`. Mô tả của nó là 'Dùng để viết React component'. Mình sẽ gọi tool này"*.
   - Claude Code SDK đứng giữa (Middleware), chặn lệnh gọi tool này lại, spin-up (khởi chạy) một phiên bản LLM mới tinh, nạp System Prompt của Subagent vào, giao task cho nó, chờ nó chạy xong vòng lặp ReAct, lấy kết quả cuối cùng và trả về cho Agent chính như một `tool_output`.

## Demo / Flow trong bài học

Bài học là lý thuyết phân tích cấu trúc file Markdown định nghĩa Subagent:

1. **Name (Tên):** Định danh duy nhất (VD: `security_reviewer`).
2. **Description (Mô tả):** Cực kỳ quan trọng. Đây không phải mô tả cho bạn đọc, mà là **Prompt dành cho Agent chính** để nó biết *khi nào* thì nên gọi Subagent này.
3. **Tools (Công cụ):** Khai báo danh sách các lệnh được phép dùng (VD: `read_file`, `mcp_github`). Nếu để trống, mặc định cấp full tools (rất nguy hiểm). Có thể cấp thêm các MCP Servers.
4. **System Prompt:** Chỉ thị chi tiết cho Subagent. (VD: *"Ngươi là chuyên gia bảo mật. Không được viết code. Chỉ tìm lỗi và báo cáo..."*).

## Phân tích kỹ thuật

### 1. Architecture: Router - Worker Pattern

Claude Code Subagents triển khai mô hình **Router - Worker**.

- **Router (Main Agent):** Giao tiếp với User, hiểu Context rộng, chia nhỏ bài toán (Planning).
- **Worker (Subagents):** Không giao tiếp với User, ngữ cảnh hẹp, tập trung thực thi chuyên sâu (Execution).

### 2. Prompt Engineering: Meta-Prompting

Với kiến trúc này, bạn đang làm **Meta-prompting** (Viết prompt để hướng dẫn LLM cách dùng một LLM khác).

Trường `Description` trong file `.md` chính là Meta-prompt. Nếu mô tả mơ hồ: *"Dùng để xử lý code"*, Main Agent sẽ không biết khi nào nên gọi nó. Phải viết rõ: *"Chỉ sử dụng Agent này khi cần tối ưu hóa các câu lệnh SQL trong thư mục /repository"*.

### 3. State Management & Memory

Việc cô lập Context Window giải quyết bài toán lãng phí Token (Token leakage). Thay vì nhồi 100,000 tokens lịch sử chat vào mọi request, Subagent khởi động với 0 token lịch sử. Điều này giúp inference (tốc độ phản hồi) của Subagent cực nhanh và độ chính xác logic đạt mức tối đa do không bị "nhiễu" (noise) từ các câu chat linh tinh trước đó của User.

## Ví dụ thực tế (Workflow Engineering)

Giả sử bạn cần xây dựng quy trình CI/CD **Auto-Triage Bug**:

Bạn tạo một command là `/fix_bug` điều phối 3 Subagents:

1. **`investigator.md` (Worker 1):** Được cấp tool `read_file`, `grep`, `mcp_datadog_logs`. Nhiệm vụ: Đọc stacktrace lỗi, mò tìm file gây lỗi. Trả kết quả file lỗi cho Main Agent.
2. **`coder.md` (Worker 2):** Được cấp tool `read_file`, `edit_file`. Nhiệm vụ: Nhận file lỗi từ Main Agent, viết code sửa.
3. **`qa_auditor.md` (Worker 3):** Được cấp tool `bash` (chạy lệnh test). Nhiệm vụ: Chạy `npm test`. Nếu fail, trả lỗi về cho Main Agent để nó gọi lại `coder.md`.

Chỉ với 1 lệnh `/fix_bug`, bạn đã vận hành một "công ty phần mềm thu nhỏ" chạy tự động trong Terminal.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Chất lượng code** | Độ chính xác cao do Agent được tập trung cao độ vào một chuyên môn hẹp (Separation of Concerns). | **Độ trễ (Latency):** Việc luân chuyển task giữa Main Agent và Subagent tốn nhiều vòng lặp HTTP call, làm tăng thời gian chờ. |
| **Bảo mật** | Phân quyền công cụ (Least Privilege) giúp giới hạn rủi ro phá hoại hệ thống. | **Chi phí Token:** Main Agent tốn token để đọc kết quả do Subagent trả về (dù ngữ cảnh của Subagent đã được làm sạch). |
| **Khả năng tái sử dụng** | Subagents là các file `.md`, dễ dàng commit lên Git, chia sẻ qua Marketplace hoặc dùng cho các dự án khác. | **Infinite Loops:** Nếu Subagent A fail, Main Agent bắt nó làm lại, nó lại fail... Quá trình này có thể tạo ra vòng lặp vô hạn đốt cháy "ví tiền" API của bạn nếu không cấu hình giới hạn (max steps). |

## So sánh với công cụ khác

- **LangGraph / AutoGen / CrewAI:** Các framework này cực kỳ mạnh mẽ để xây dựng Multi-Agent, nhưng bạn phải tự viết code Python/TypeScript để nối các Agent, quản lý state graph, xử lý lỗi.
- **Claude Code Subagents:** Abstract toàn bộ sự phức tạp đó thành **Markdown-as-Code**. Bạn chỉ cần khai báo file `.md`, Claude Code tự lo phần Orchestration và Tool Calling ở dưới backend. Triết lý này ưu tiên Developer Experience (DX) hơn là sự tùy biến cực đoan.

## Những điều quan trọng cần nhớ

- Subagent bản chất là một LLM prompt được đóng gói lại thành một Tool.
- **Bắt buộc** phải cấp phát danh sách Tools rõ ràng (whitelist) cho từng Subagent để đảm bảo an toàn. Không để trống phần Tools.
- Trường `Description` của Subagent quyết định sự thành bại của hệ thống điều phối. Viết mô tả càng chi tiết (When and Why to use), Agent chính càng gọi chính xác.
- Context Isolation là chìa khóa để Agent "giữ được sự tỉnh táo" trong các task code phức tạp kéo dài.

## Góc nhìn dành cho BE Developer

Trong Software Engineering, quy tắc vàng là **Single Responsibility Principle (Nguyên lý Đơn trách nhiệm)**.

Nếu bạn nhìn Main Claude Code Agent như một khối **Monolith Backend**, thì việc đập nó ra thành các Subagents chính là quá trình chuyển đổi sang kiến trúc **Microservices**.

- Mỗi Subagent là một Microservice độc lập.
- Main Agent đóng vai trò là **API Gateway / Orchestrator (BFF)**.
- Mô tả trong file `.md` chính là **Service Discovery**.Thay vì dùng HTTP/gRPC để các service nói chuyện với nhau, các Agent "giao tiếp" bằng Natural Language (Ngôn ngữ tự nhiên) thông qua các Tool Outputs. Việc áp dụng tư duy thiết kế hệ thống phân tán (Distributed System Design) vào việc viết Prompt cho Subagents sẽ giúp bạn tạo ra những Workflow AI vô cùng bền bỉ và mạnh mẽ.

## Từ khóa / Thuật ngữ (Glossary)

- **Subagent (Đặc vụ con):** Một phiên bản AI chuyên biệt, có prompt và công cụ riêng, hoạt động dưới sự điều phối của một AI cấp cao hơn.
- **Context Isolation (Cô lập ngữ cảnh):** Cơ chế chạy một luồng xử lý mới với một bộ nhớ hoàn toàn trống rỗng, không kế thừa dữ liệu rác từ phiên làm việc trước đó.
- **Least Privilege (Quyền hạn tối thiểu):** Nguyên lý bảo mật cốt lõi: chỉ cấp cho một thực thể (user, process, agent) những quyền truy cập vừa đủ để nó hoàn thành nhiệm vụ được giao.
- **Orchestrator (Trình điều phối):** Trong hệ thống Multi-agent, đây là thành phần đóng vai trò như một người quản lý, lập kế hoạch, phân chia công việc cho các agent cấp dưới và tổng hợp kết quả.
- **ReAct (Reasoning and Acting):** Phương pháp luận (Prompting Framework) yêu cầu LLM phải in ra các bước suy luận trước khi quyết định gọi công cụ hành động.
