---
title: 'Code Mode: Giải Pháp Thay Thế Tool Calling Của Cloudflare Để Khắc Phục Điểm
  Yếu Của MCP'
date: '2026-05-12 15:17:05'
date_gmt: '2026-05-12 08:17:05'
modified: '2026-05-12 15:17:05'
status: publish
slug: code-mode-giai-phap-thay-the-tool-calling-cua-cloudflare-de-khac-phuc-diem-yeu-cua-mcp
wordpress_id: 752
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/code-mode-giai-phap-thay-the-tool-calling-cua-cloudflare-de-khac-phuc-diem-yeu-cua-mcp/
categories:
- Claude Code
tags: []
---

Bài học này phân tích một bài blog đột phá từ Cloudflare giới thiệu khái niệm **"Code Mode"**. Đây là một mô hình kiến trúc (architectural paradigm) đề xuất việc từ bỏ cơ chế "Tool Calling" (gọi hàm bằng JSON) truyền thống của MCP. Thay vào đó, nó chuyển đổi toàn bộ định nghĩa công cụ thành một bộ API bằng ngôn ngữ TypeScript, và yêu cầu AI tự viết một đoạn script hoàn chỉnh để thực thi nhiệm vụ trong một môi trường cô lập (Sandbox).

## Vấn đề thực tế (Pain Point)

Như đã thảo luận ở bài trước, kiến trúc MCP hiện tại gặp ba vấn đề lớn:

1. **Context Bloat:** Lãng phí token cho việc định nghĩa JSON Schema của hàng chục tools.
2. **Ping-Pong Latency:** Mạng lưới giao tiếp (Round-trips) tốn thời gian giữa Client và LLM qua mỗi bước gọi tool nhỏ lẻ.
3. **Synthetic Training Data:** LLM bị ép phải sử dụng các cấu trúc JSON gọi hàm mà chúng ít được huấn luyện tự nhiên.*Cloudflare nhận định: Việc bắt một LLM (vốn đọc hàng triệu dòng code GitHub) phải giao tiếp bằng JSON Schema giống như việc "bắt Shakespeare đi học tiếng Quan Thoại 1 tháng rồi bắt ông viết kịch bằng ngôn ngữ đó".*

## Khái niệm cốt lõi

- **Code Mode:** Phương pháp thay thế Tool Calling (JSON) bằng Code Generation (TypeScript). Thay vì cấp cho AI một danh sách các "công cụ" rời rạc, ta cấp cho nó một "bộ thư viện" (SDK) và yêu cầu nó viết một kịch bản (script) sử dụng thư viện đó.
- **TypeScript API Generation:** Quá trình tự động dịch ngược (transpile) các JSON Schema của MCP thành định nghĩa Interface/Type của TypeScript (kèm theo JSDoc comments).
- **Secure Sandbox Execution:** Môi trường thực thi mã nguồn bị cô lập hoàn toàn (không có internet, không có quyền truy cập hệ thống trực tiếp). Mã do LLM sinh ra chỉ được phép gọi ra ngoài thông qua các RPC Bindings đã được định nghĩa sẵn trỏ tới MCP Server.

## Code Mode hoạt động như thế nào? (Kiến trúc & Workflow)

Sự khác biệt cốt lõi nằm ở bước số 2 và 3 trong sơ đồ giao tiếp:

**1. Khởi tạo (Handshake):**

- *Cách cũ:* Lấy JSON Schema từ MCP.
- *Code Mode:* Lấy JSON Schema từ MCP -> Dịch sang TypeScript Interfaces -> Nhồi TypeScript này vào System Prompt.

**2. Suy luận (Inference):**

- *Cách cũ:* LLM suy nghĩ và trả về 1 block JSON để yêu cầu gọi tool đầu tiên (VD: Tìm ID user).
- *Code Mode:* LLM đọc yêu cầu, và sinh ra NGAY LẬP TỨC một đoạn script TypeScript hoàn chỉnh chứa toàn bộ logic (tìm ID -> gán vào biến -> dùng biến đó gọi hàm gửi email -> in kết quả ra console).

**3. Thực thi (Execution):**

- *Cách cũ:* Trình Orchestrator nhận tool, gọi mạng tới MCP server, lấy kết quả, gửi ngược lại LLM để LLM quyết định bước tiếp theo. (Ping-pong).
- *Code Mode:* Trình Orchestrator gói đoạn script TypeScript do LLM vừa viết -> Ném vào một V8 Sandbox (ví dụ: Cloudflare Workers). Mã TypeScript chạy đồng bộ/bất đồng bộ nội bộ, tự động xử lý logic if/else, vòng lặp. Kết quả cuối cùng (`console.log`) được thu thập và trả về cho LLM (chỉ tốn **1 lần** round-trip với LLM).

## Phân tích kỹ thuật

### 1. Prompt Engineering & Native Tongue

Code Mode giải quyết trực tiếp vấn đề "Ngôn ngữ bản địa". Khối lượng dữ liệu huấn luyện (Training corpus) của các LLM top-tier (Claude 3.5 Sonnet, GPT-4o) chứa hàng terabytes mã nguồn TypeScript từ các kho lưu trữ mã nguồn mở. Chúng cực kỳ xuất sắc trong việc hiểu các Interface, đọc JSDoc và viết logic xoay quanh các API phức tạp. Thay vì cố gắng huấn luyện chúng "nói" JSON giỏi hơn, ta đổi phương thức giao tiếp về thứ chúng giỏi nhất.

### 2. Execution Flow: Giảm thiểu Round-Trips

Lợi ích lớn nhất về mặt hệ thống là **Latency Optimization**. Nếu một nghiệp vụ cần gọi 5 hàm API:

- Tool Calling truyền thống sẽ cần: $5 \text{ LLM Inferences} + 5 \text{ Network Calls}$.
- Code Mode chỉ cần: $1 \text{ LLM Inference} + \text{1 Sandbox Execution (chứa 5 Network Calls nội bộ)}$.Điều này tiết kiệm tài nguyên tính toán (GPU compute) khổng lồ.

### 3. State Management

Trong mô hình cũ, state (trạng thái trung gian) như `user_id`, mảng danh sách được lưu trữ trên bộ nhớ của LLM Context Window.

Trong mô hình Code Mode, state được lưu giữ trong các biến cục bộ (local variables) của đoạn mã chạy trong Sandbox. Điều này giữ cho Context Window của LLM sạch sẽ và tập trung vào mục tiêu cuối cùng.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm (Code Mode)** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Hiệu năng & Độ trễ** | Giảm thiểu số vòng lặp (round-trips) lên LLM. Thực thi nhanh hơn đáng kể với các task phức tạp cần nhiều bước. | **Vẫn còn Context Bloat:** Ban đầu vẫn phải nhồi toàn bộ TypeScript Interface vào Prompt. Dù định dạng TS gọn hơn JSON, tổng số token vẫn lớn nếu Server có quá nhiều tools. |
| **Logic & Suy luận** | Tận dụng khả năng suy luận code tự nhiên của LLM. LLM dễ dàng tạo ra vòng lặp `for`, lệnh `if/else` mà JSON Tool Calling không làm được. | **Rủi ro thực thi (Execution Risk):** LLM có thể sinh ra code lỗi (syntax error, logic sai). Nếu code lỗi ở bước 4 trong kịch bản 5 bước, việc rollback hoặc retry sẽ phức tạp hơn. |
| **Bảo mật** | Sử dụng Sandbox để chặn kết nối internet tự do. | **Kiến trúc phức tạp:** Yêu cầu phải duy trì một hạ tầng Sandbox an toàn (như V8 Isolates/Cloudflare Workers) bên cạnh Agent Loop. (Instructor có thắc mắc: Tại sao không nạp thẳng code MCP vào Sandbox chạy luôn cho nhanh? - Trả lời: Vì MCP Server có thể chứa logic gọi Database nội bộ, không thể bê nguyên DB vào Sandbox được). |

## Những điều quan trọng cần nhớ

- **Llms are natively good at code:** Đừng cố "dumb down" (đơn giản hóa) API để LLM dễ dùng. Hãy dịch API đó ra ngôn ngữ lập trình.
- **Execution in Sandbox:** Bắt buộc phải có môi trường cô lập khi thực thi code do AI sinh ra. Tuyệt đối không chạy hàm `eval()` trên máy chủ thật.
- Code Mode biến Agent từ một "người điều phối gọi điện thoại (Dispatcher)" thành một "lập trình viên viết kịch bản (Script Writer)".
- Bản thân JSON Schema của MCP là một tiêu chuẩn trung lập. Chúng ta có thể render nó thành Tool Calling truyền thống, hoặc render nó thành TypeScript SDK tùy thuộc vào engine sử dụng.

## Góc nhìn dành cho Backend Developer

Từ góc độ của một System Engineer, "Code Mode" là một mô hình ứng dụng triệt để nguyên lý **RPC (Remote Procedure Call)** kết hợp với **Serverless Edge Computing**.

Thực chất, Cloudflare đang dùng bài toán này để "khoe khéo" khả năng của hạ tầng **Cloudflare Workers**.

- Việc tách rời Agent (LLM Router) và Execution Environment (Sandbox) là một thiết kế Microservices kinh điển.
- Việc sử dụng TypeScript Interface làm hợp đồng giao tiếp (Contract) giúp đảm bảo tính Strongly-Typed (Kiểu dữ liệu chặt chẽ) khi gọi từ Sandbox sang các MCP Server thực tế, giảm thiểu lỗi Runtime (như truyền nhầm chuỗi thay vì số) vốn rất hay xảy ra trong Tool Calling thuần JSON.

## Từ khóa / Thuật ngữ (Glossary)

- **Transpile / Code Generation:** Quá trình chuyển đổi tự động từ một định dạng này sang một định dạng khác (VD: Từ JSON Schema sang TypeScript Interfaces).
- **Sandbox / V8 Isolate:** Môi trường thực thi mã nguồn được cách ly với hệ thống máy chủ thật, không có quyền truy cập file, bộ nhớ, hoặc mạng trái phép.
- **RPC (Remote Procedure Call):** Cơ chế cho phép một chương trình (trong trường hợp này là Sandbox) thực thi một hàm (procedure) nằm ở một máy tính/tiến trình khác (MCP Server) một cách trong suốt.
- **Code Mode:** Mẫu thiết kế (Design Pattern) sử dụng khả năng sinh code của AI để thao tác với hệ thống thay vì dùng cấu trúc Tool Calling mặc định.
- **Round-Trip Time (RTT):** Thời gian tính từ lúc Client gửi yêu cầu đi cho đến lúc nhận được phản hồi. Giảm RTT là mục tiêu tối thượng trong tối ưu hóa mạng.
