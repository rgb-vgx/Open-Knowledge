---
title: 'Demo Sức Mạnh MCP: Cách Claude Code Và Cursor Cùng Chia Sẻ Một "Siêu Năng
  Lực"'
date: '2026-05-12 01:17:55'
date_gmt: '2026-05-11 18:17:55'
modified: '2026-05-12 01:17:55'
status: publish
slug: demo-suc-manh-mcp-cach-claude-code-va-cursor-cung-chia-se-mot-sieu-nang-luc
wordpress_id: 732
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/demo-suc-manh-mcp-cach-claude-code-va-cursor-cung-chia-se-mot-sieu-nang-luc/
categories:
- Claude Code
tags: []
---

Xin chào các bạn! Sau những lý thuyết nền tảng về Model Context Protocol (MCP) ở bài trước, hôm nay là lúc chúng ta thực sự chứng kiến "phép thuật" này hoạt động trong thực tế.

Mục tiêu của bài viết này là một bản demo trực quan: Chúng ta sẽ trang bị cho Claude khả năng xem thời tiết thực tế bằng cách kết nối nó với một MCP Server. Sau đó, điều kỳ diệu nhất là chúng ta sẽ "bưng" nguyên MCP Server đó sang Cursor và xem nó hoạt động mượt mà ra sao mà không cần phải viết lại logic.

*(Lưu ý: Trong bài này, tôi chỉ tập trung vào kết quả cuối cùng để bạn thấy bức tranh toàn cảnh. Ở các bài tiếp theo, tôi sẽ hướng dẫn từng bước cách lập trình và cấu hình chi tiết).*

## 1. Màn Khởi Động: Khi Claude Chưa Có MCP

Đầu tiên, hãy mở Claude lên và xem điều gì xảy ra khi chúng ta chưa trang bị bất kỳ MCP Server nào.

Tôi sẽ hỏi một câu đơn giản: *"Thời tiết ở San Francisco lúc này thế nào?"*

Kết quả không có gì bất ngờ: Mô hình ngôn ngữ (như Claude 3.7 Sonnet) trả lời rằng nó **không có quyền truy cập vào thông tin thời tiết theo thời gian thực (real-time)** và không thể cung cấp câu trả lời.

Đó chính là giới hạn cốt lõi của LLM: Chúng chỉ là những "bộ não" được huấn luyện trên dữ liệu trong quá khứ, bị đóng kín với thế giới bên ngoài.

## 2. Kích Hoạt MCP: Claude Đã Có Thể "Nhìn" Thấy Thế Giới

Bây giờ, tôi đã cấu hình ngầm một **Weather MCP Server** (Máy chủ MCP Thời tiết) vào hệ thống. Nếu truy cập vào phần `Settings -> Developer`, chúng ta sẽ thấy MCP này đang chạy ổn định.

Hãy hỏi lại câu hỏi cũ: *"Thời tiết ở San Francisco lúc này thế nào?"*

Lần này, một loạt các phản ứng dây chuyền vô cùng thú vị (và chuẩn mực theo tài liệu của Anthropic) đã diễn ra:

1. **Cơ Chế Bảo Mật (Permission Prompt):** Ngay lập tức, Claude hiện lên một thông báo hỏi quyền: *"Cho phép công cụ weather chạy cục bộ (run locally) chứ?"*. Theo chuẩn bảo mật từ tài liệu chính thức của Claude, vì các công cụ MCP có thể thực thi mã hoặc gọi API, hệ thống luôn yêu cầu sự xác nhận của người dùng để tránh các rủi ro chạy mã độc. Tôi bấm **Allow** (Cho phép).
2. **Khả Năng Suy Luận Của LLM:** Trong MCP Server của tôi, có một hàm tên là `get_forecast` (lấy dự báo). Điều thú vị là hàm này không nhận đầu vào là "Tên thành phố", mà nó yêu cầu hai tham số: `latitude` (vĩ độ) và `longitude` (kinh độ).
3. **Tool Calling (Gọi công cụ):** LLM (Claude 3.7) đã tự động **suy luận** ra tọa độ kinh/vĩ độ của San Francisco. Sau đó, nó tạo một lệnh gọi qua giao thức MCP đến hàm `get_forecast` kèm theo hai tọa độ đó.
4. **Tổng hợp câu trả lời:** MCP Server chạy lệnh, lấy dữ liệu thời tiết thực tế trả về cho Claude. Cuối cùng, Claude đọc dữ liệu đó và xuất ra câu trả lời ngôn ngữ tự nhiên hoàn hảo cho chúng ta.

*Sự kiện này tuy nhỏ, nhưng ý nghĩa lại vô cùng lớn: Bằng việc tạo ra một MCP Server với các logic tự định nghĩa, chúng ta đã phá vỡ mọi rào cản của AI Agent. Bạn muốn AI query database, kiểm tra log server hay check lỗi CI/CD? Tất cả đều có thể!*

## 3. Quyền Năng "Viết Một Lần, Chạy Khắp Nơi": Mang MCP Sang Cursor

Bây giờ mới là phần ăn tiền nhất của Model Context Protocol.

Tôi sẽ sử dụng **CHÍNH** cái Weather MCP Server vừa viết (được chạy bằng Node.js) và tích hợp nó vào IDE **Cursor** – một ứng dụng AI khác hoàn toàn.

Trong Cursor, tôi mở mục `Settings -> MCP` và thêm server này vào. Ngay lập tức, Cursor nhận diện ra MCP Server và tự động liệt kê chi tiết các công cụ (Tools) mà máy chủ này sở hữu:

- `get_forecast` (Lấy dự báo thời tiết)
- `get_alerts` (Lấy cảnh báo thời tiết khẩn cấp)

### Thử Nghiệm Với Cursor Agent

Tiếp theo, tôi mở Cursor Chat (chọn chế độ Agent) và gõ lại đúng câu hỏi: *"Thời tiết ở San Francisco lúc này thế nào?"*

*(Lưu ý: Lần này tôi đang để Cursor ở chế độ YOLO Mode – tự động duyệt mọi Tool Call mà không cần hỏi quyền. Tuy YOLO mode hơi thiếu an toàn về mặt lý thuyết, nhưng lại cực kỳ tiện lợi cho luồng làm việc cá nhân).*

**Và đây là những gì Cursor Agent đã làm:**

1. Nó tự động gọi tool `get_forecast` (giống hệt Claude).
2. Nhưng bất ngờ thay, nó tự động quyết định gọi **THÊM** tool thứ hai là `get_alerts` để kiểm tra xem San Francisco có đang có cảnh báo bão hay thảm họa thời tiết nào không!
3. Cuối cùng, nó tổng hợp kết quả của cả 2 lần gọi tool và in ra màn hình.

## Tóm Lại

Qua bài demo ngắn này, chúng ta đã chứng minh được hai sức mạnh tuyệt đối của MCP:

1. **Sự Linh Hoạt Của Model:** Các LLM hiện đại đủ thông minh để tự đọc định nghĩa công cụ (Tool Definitions) qua MCP và tự quyết định xem nên dùng công cụ nào, khi nào cần dùng một, khi nào cần kết hợp nhiều công cụ cùng lúc (như Cursor đã gọi cả Forecast và Alerts).
2. **Sự Tương Thích Hoàn Hảo (Interoperability):** Chúng ta viết logic lấy API thời tiết **đúng một lần duy nhất** trong MCP Server. Sau đó, cả Claude Code và Cursor đều có thể "cắm vào và xài ngay lập tức" mà không cần viết lại bất cứ dòng code tích hợp (integration) nào.

Nếu bạn thấy điều này "ảo diệu", hãy chuẩn bị sẵn sàng trình soạn thảo code nhé! Trong các video và bài viết tiếp theo, chúng ta sẽ bắt tay vào tự code và tự cấu hình những MCP Server đầu tiên của riêng mình. Hẹn gặp lại các bạn!
