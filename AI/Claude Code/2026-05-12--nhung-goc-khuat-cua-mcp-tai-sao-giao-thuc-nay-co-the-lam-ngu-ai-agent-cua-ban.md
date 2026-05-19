---
title: 'Những Góc Khuất Của MCP: Tại Sao Giao Thức Này Có Thể Làm "Ngu" AI Agent Của
  Bạn?'
date: '2026-05-12 15:12:10'
date_gmt: '2026-05-12 08:12:10'
modified: '2026-05-12 15:12:10'
status: publish
slug: nhung-goc-khuat-cua-mcp-tai-sao-giao-thuc-nay-co-the-lam-ngu-ai-agent-cua-ban
wordpress_id: 749
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/nhung-goc-khuat-cua-mcp-tai-sao-giao-thuc-nay-co-the-lam-ngu-ai-agent-cua-ban/
categories:
- Claude Code
tags: []
---

## Bài học này nói về gì?

Dù Model Context Protocol (MCP) là một tiêu chuẩn đột phá giúp AI Agent kết nối với thế giới bên ngoài, bài học này lật ngược vấn đề để nhìn vào **những điểm yếu chí mạng (drawbacks)** của nó. Khác với các bài hướng dẫn cài đặt thông thường, chúng ta sẽ mổ xẻ các lỗi về mặt kiến trúc của MCP dẫn đến việc hệ thống AI trở nên chậm chạp, ngốn chi phí và suy giảm khả năng suy luận (reasoning).

## Vấn đề thực tế (Pain Point)

MCP được sinh ra để giải quyết bài toán "chuẩn hóa kết nối", nhưng nó lại đẻ ra một vấn đề mới về **quản lý tài nguyên**.

Khi một kỹ sư ghép nối quá nhiều MCP Servers (GitHub, Slack, Database, Jira...) vào một Agent duy nhất với hy vọng tạo ra một "siêu AI" làm được mọi thứ, kết quả thu được lại trái ngược:

Agent phản hồi rất chậm, thường xuyên bị lỗi "Max Tokens", bịa ra các hàm không tồn tại (hallucinations), và vòng lặp thực thi (execution loop) trở nên cực kỳ kém hiệu quả.

## Khái niệm cốt lõi

- **Context Pollution (Ô nhiễm ngữ cảnh):** Hiện tượng Cửa sổ ngữ cảnh (Context Window) bị lấp đầy bởi các định nghĩa công cụ (Tool schemas) không cần thiết, đẩy các thông tin quan trọng (như yêu cầu thực sự của user) ra rìa.
- **Ping-Pong Interaction (Tương tác bóng bàn):** Luồng thực thi đặc trưng của Tool Calling. LLM nói "Tôi muốn dùng tool A" -> Server chạy tool A trả kết quả -> LLM đọc kết quả và nói "Tôi muốn dùng tool B". Quá trình này đòi hỏi nhiều vòng lặp (round-trips) qua mạng.
- **Native Tongue Problem (Vấn đề ngôn ngữ bản địa):** Sự lệch pha (Impedance Mismatch) giữa cách Large Language Models (LLMs) được huấn luyện (đọc text và code) và định dạng chúng buộc phải sử dụng khi gọi MCP (cấu trúc JSON Schemas khô khan).

## Claude Code hoạt động như thế nào? (Bản chất Abstraction)

*(Bổ sung từ tài liệu chính thức về cơ chế Tool Calling của Anthropic/Claude Code)*:

Khi bạn kết nối MCP, Claude Code không "dạy" LLM cách dùng tool một lần rồi thôi. LLM là **stateless (phi trạng thái)**.

1. **Pre-loading (Nạp trước):** Với mỗi request bạn gửi đi, Claude Code ngầm định biên dịch toàn bộ cấu hình MCP thành một mảng JSON Schema khổng lồ nằm trong mảng `tools` của payload API gửi lên Anthropic.
2. **Intermediate History (Lịch sử trung gian):** Khi LLM gọi tool, Claude Code tạo ra một block `tool_use`. Nhận kết quả xong, nó tạo một block `tool_result`. Cả hai block này bị ép vĩnh viễn vào Message History và gửi lại lên LLM trong các lượt chat tiếp theo, khiến dung lượng token phình to theo cấp số nhân sau mỗi bước thực thi.

## Demo / Flow trong bài học

Bài học không tập trung vào code mà phân tích một case-study lý thuyết (nhưng rất phổ biến):

1. **Setup:** Cấu hình một môi trường chứa 58 tools từ nhiều MCP Servers khác nhau (GitHub, Slack, DB...).
2. **Kết quả Context:** Ngay giây phút khởi động, trước khi user nói câu lệnh đầu tiên, hệ thống đã ngốn **55,000 tokens** chỉ để lưu trữ mô tả của 58 tools này.
3. **Phân tích độ nhiễu:** Khi user yêu cầu "Sửa nút bấm ở giao diện Frontend", LLM vẫn phải mang vác theo định nghĩa của "Tool đọc PDF" hay "Tool truy vấn Database" trong não bộ của nó. Điều này làm LLM bị nhiễu thông tin (Needle in the haystack problem).
4. **Phân tích luồng thực thi:** Instructor vạch ra sự tốn kém của mô hình Ping-pong. Thay vì AI tự viết một script code giải quyết từ A-Z, nó phải liên tục "xin phép" chạy từng tool nhỏ lẻ, sinh ra hàng loạt chuỗi hội thoại trung gian vô nghĩa.

## Phân tích kỹ thuật

### 1. Architecture & Tool Calling: "The Ping-Pong Problem"

Kiến trúc của MCP là **Synchronous & Chatty (Đồng bộ và Dài dòng)**.

Nếu để giải bài toán: "Lấy top 5 users, tìm email của họ, và gửi Slack message".

- *Cách lý tưởng:* Agent viết 1 đoạn script Python/Bash (Code execution), chạy 1 lần và trả kết quả.
- *Cách MCP bắt buộc:*
  1. LLM -> Gọi `get_users`
  2. MCP -> Trả mảng JSON 5 users.
  3. LLM -> Nhận mảng, suy luận, gọi `get_emails(user1)`, rồi `get_emails(user2)`...
  4. Cứ thế lặp lại.Mỗi mũi tên (->) là một lần full inference (tính toán lại toàn bộ Context Window). Độ trễ (Latency) và Chi phí (Cost) tăng phi mã.

### 2. Context Handling: Ô nhiễm bộ nhớ trung gian (Intermediate State)

Trong Agent Loop, các kết quả trung gian (`tool_result`) được giữ lại trong lịch sử chat để LLM biết "mình đã làm gì". Nhưng MCP hiện tại không có cơ chế Garbage Collection (Dọn rác ngữ cảnh). Những dòng log debug dài ngoằng của bước 1 sẽ nằm mãi trong context cho đến khi kết thúc session, "ăn cắp" token quý giá của bước 10.

### 3. Prompt Engineering: JSON vs Code

LLM là những "bậc thầy" về ngôn ngữ tự nhiên (Text) và ngôn ngữ lập trình (Code) vì kho dữ liệu huấn luyện của chúng là Internet và GitHub.

Nhưng MCP lại bắt ép chúng giao tiếp qua **JSON Schema**.

JSON Schema chỉ định nghĩa được *Cấu trúc (Syntax)* (ví dụ: hàm `send_email` cần param `address` kiểu string). Nó KHÔNG định nghĩa được *Mẫu sử dụng (Usage Pattern/Semantics)* (khi nào nên gửi, khi nào không nên, bối cảnh nghiệp vụ là gì). Việc ép LLM "nói tiếng ngoại ngữ" (JSON) thay vì "tiếng mẹ đẻ" (Code) làm giảm chất lượng suy luận.

## Ví dụ thực tế (Workflow Engineering)

Giả sử bạn build một **DevOps Triage Agent** dùng để điều tra lỗi hệ thống:

- **Thiết kế Tồi (Lạm dụng MCP):** Bạn nạp 100 tools (AWS EC2, K8s logs, Datadog metrics, PagerDuty, Jira, GitHub) vào chung 1 Agent. Agent sẽ ngáo, thường gọi nhầm tool lấy log K8s cho một lỗi xảy ra ở máy chủ Bare-metal vì nó bị rối bởi quá nhiều Schema.
- **Thiết kế Tốt (Context Engineering):** Bạn áp dụng **Mixture-of-Agents (Hoặc Semantic Routing)**. Xây dựng 1 Router Agent cực nhẹ (chỉ nhận diện Intent). Nếu lỗi ở K8s, nó điều phối request sang một `K8s-Agent` (chỉ được nạp duy nhất 5 tools liên quan K8s). Context sạch, inference nhanh, độ chính xác cao.

## Ưu điểm / Hạn chế của MCP (Tóm tắt Trade-offs)

| **Khía cạnh** | **Điểm mạnh của MCP** | **Điểm yếu của MCP** |
| --- | --- | --- |
| **Tích hợp** | Chuẩn hóa cao, dễ plug-and-play. Viết server 1 lần dùng cho nhiều client. | **Context Pollution:** Bắt buộc nạp toàn bộ Schema lên Client/LLM, gây lãng phí token khủng khiếp. |
| **Thực thi** | Rõ ràng, dễ theo dõi (Traceability) từng bước Agent làm gì. | **Ping-pong Execution:** Rất tốn kém (Network I/O & Token) do phải Round-trip cho từng action nhỏ. |
| **Giao thức** | JSON Schema là chuẩn công nghiệp, dễ sinh tự động từ code (OpenAPI). | **Native Tongue Mismatch:** LLM giỏi hiểu Code/Text hơn là xử lý các ràng buộc khắt khe của JSON Schema. |

## So sánh với công cụ khác (Code-Interpreter vs JSON Tool Calling)

Thay vì dùng kiến trúc Tool Calling JSON như MCP, một số framework tiên tiến như **OpenHands** hay công cụ nội bộ của OpenAI (Code Interpreter) sử dụng **Code-based Actions**.

- **MCP (JSON):** LLM sinh ra JSON `{"name": "math_add", "args": {"a": 1, "b": 2}}`. Framework parse JSON và chạy hàm.
- **Code Interpreter:** LLM sinh ra một file script (Python/Bash) thực thi toàn bộ logic (kể cả vòng lặp for, if/else gọi API liên tiếp) rồi chạy file đó trong Sandbox. Kiến trúc Code-based giải quyết triệt để vấn đề "Ping-pong" và thuận theo "tiếng mẹ đẻ" của LLM.

## Những điều quan trọng cần nhớ

- **Context is the new Gold:** Ngữ cảnh là tài nguyên đắt đỏ và hữu hạn nhất. Đừng ném mọi thứ vào đó.
- Hơn 50 công cụ trong một Agent là dấu hiệu của một thiết kế tồi (System Design smell).
- MCP hiện tại thiếu cơ chế dọn dẹp kết quả trung gian, dẫn đến rò rỉ token (Token leakage) trong các phiên chat dài.
- Tool Schema (JSON) chỉ dạy LLM *CÁCH* gọi hàm, không dạy LLM *BỐI CẢNH (When/Why)* gọi hàm.

## Góc nhìn dành cho Backend Developer

Nếu bạn là một BE/System Engineer, hãy nhìn kiến trúc của MCP Tool Calling giống hệt như bài toán **N+1 Query Problem** kết hợp với **Over-fetching** trong GraphQL/REST.

- **Over-fetching (Context Pollution):** Thay vì chỉ load metadata cần thiết cho route hiện tại, hệ thống bắt bạn load toàn bộ Swagger Docs của toàn bộ Microservices vào bộ nhớ RAM (Context Window) ở mọi request.
- **N+1 Problem (Ping-pong Execution):** Thay vì cho phép viết một Store Procedure hoặc Aggregation Query xử lý data tại tầng DB (Tương đương với Code Interpreter), kiến trúc hiện tại bắt Client (LLM) kéo từng Row về, xử lý, rồi tạo request mới để kéo Row tiếp theo.Để tối ưu Agent Workflow trong môi trường Enterprise, bạn bắt buộc phải xây dựng các lớp **Middleware/Routing** đứng giữa User và LLM để linh hoạt cắt tỉa (prune) các MCP tools thừa thãi trước khi đẩy payload lên mô hình AI.

## Từ khóa / Thuật ngữ (Glossary)

- **Context Pollution:** Hiện tượng rác ngữ cảnh, nơi bộ nhớ giới hạn của AI bị chiếm dụng bởi các hướng dẫn sử dụng công cụ thay vì thông tin nghiệp vụ.
- **Ping-pong Interaction:** Luồng giao tiếp qua lại nhiều vòng giữa Client (LLM) và Server (Tools) gây lãng phí thời gian và chi phí.
- **Intermediate Results / State:** Các kết quả trả về tạm thời từ công cụ, thường gây phình to bộ nhớ nếu không được dọn dẹp.
- **Native Tongue (Ngôn ngữ bản địa):** Thuật ngữ ẩn dụ chỉ loại dữ liệu mà AI được tối ưu hóa để hiểu nhất (Text và Source Code), trái ngược với định dạng cấu trúc cứng nhắc (JSON).
- **Needle in a haystack:** Thành ngữ "mò kim đáy biển", chỉ việc LLM bị giảm khả năng tìm thông tin quan trọng khi ngữ cảnh quá dài và nhiễu.
