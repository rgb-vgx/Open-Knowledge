---
title: 'Đỉnh Cao Của Custom Commands Trong Claude Code: Bảo Mật, Bash Script Và Tư
  Duy RAG'
date: '2026-05-11 17:10:06'
date_gmt: '2026-05-11 10:10:06'
modified: '2026-05-11 17:10:06'
status: publish
slug: dinh-cao-cua-custom-commands-trong-claude-code-bao-mat-bash-script-va-tu-duy-rag
wordpress_id: 719
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/dinh-cao-cua-custom-commands-trong-claude-code-bao-mat-bash-script-va-tu-duy-rag/
categories:
- Claude Code
tags: []
---

Xin chào các bạn! Ở bài viết trước, chúng ta đã cùng nhau tạo một lệnh `/commit-code` cơ bản để thấy được sự linh hoạt của Custom Commands. Tuy nhiên, nếu bạn thực sự muốn trở thành một chuyên gia về Context Engineering, chúng ta cần phải nhìn xa hơn thế.

Hôm nay, tôi muốn chia sẻ với các bạn một ví dụ mẫu mực hơn cho việc tạo Git Commit tự động – một ví dụ được lấy trực tiếp từ hệ thống tài liệu chính thức của Claude Code (tại trang `[code.claude.com/docs](https://code.claude.com/docs)`). Phiên bản này mạnh mẽ hơn, an toàn hơn và sở hữu nhiều tính năng cao cấp hơn rất nhiều. Hãy cùng "mổ xẻ" nó!

## 1. Vượt Qua Giới Hạn Văn Bản Với Shell/Bash Script

Điểm đột phá đầu tiên cần phải nhắc đến: Các lệnh Slash Command tùy chỉnh trong Claude Code không chỉ đơn thuần là gửi đi các câu lệnh văn bản tĩnh. **Bạn hoàn toàn có thể nhúng và thực thi các tập lệnh Shell hoặc Bash scripts ngay bên trong chúng!**

Điều này có nghĩa là Agent của bạn có thể trực tiếp chạy mã code. Cánh cửa tiềm năng được mở toang: không có ranh giới nào cả. Bạn muốn Agent gửi một HTTP request? Chạy một container Docker? Hay tự động gọi một API bên thứ ba để lấy dữ liệu trước khi viết code? Tất cả đều có thể thực hiện được thông qua sự sáng tạo vô hạn của lập trình viên.

## 2. Bảo Mật Lên Ngôi Cùng Nguyên Tắc "Đặc Quyền Tối Thiểu" (Least Privilege)

Trong phiên bản `/commit-code` đầu tiên của chúng ta, chúng ta đã bỏ ngỏ quyền hạn của Claude. Nó có quyền truy cập vào *tất cả* các công cụ (tools) đang có sẵn trong hệ thống. Điều này tiềm ẩn rủi ro lớn.

Hãy tưởng tượng một kịch bản xấu: Khi bạn làm việc với một file mã nguồn mở bị cài mã độc, một hacker có thể sử dụng kỹ thuật "đầu độc ngữ cảnh" (Context Poisoning). Nếu Agent của bạn không bị giới hạn, nó có thể vô tình thực thi các lệnh phá hoại hệ thống.

Trong tài liệu cấu hình nâng cao của Claude Code, chúng ta có một giải pháp tuyệt vời: **`allowedTools` (hoặc giới hạn danh sách công cụ)**.

Tính năng này tuân thủ chặt chẽ **Nguyên tắc Đặc quyền tối thiểu (Least Privilege Principle)** – một tiêu chuẩn vàng trong thiết kế hệ thống AI Agent. Nguyên lý rất đơn giản: Chỉ cung cấp cho Agent những công cụ vừa đủ để hoàn thành nhiệm vụ.

- Để tạo một commit message, Claude chỉ cần sử dụng các lệnh: `git add`, `git status`, `git diff` và `git commit`.
- Bằng cách khai báo cụ thể danh sách công cụ được phép, chúng ta giới hạn phạm vi hoạt động của Agent, biến lệnh Custom Command trở nên cực kỳ an toàn và đáng tin cậy trong môi trường doanh nghiệp.

## 3. Nghệ Thuật Kỹ Thuật Câu Lệnh (Prompt Engineering) Và Tư Duy RAG

Khi quan sát ví dụ nâng cao từ tài liệu, bạn sẽ thấy sự khác biệt rõ rệt trong kỹ thuật Prompt Engineering. Ngữ cảnh (Context) được định nghĩa cực kỳ chặt chẽ trước khi AI bắt tay vào viết.

Nó yêu cầu Agent chạy một loạt các lệnh Git theo trình tự: `git status`, `git diff`, `git branch`, `git log`. Nhưng đằng sau chuỗi lệnh này là gì?

Nếu nhìn nhận dưới góc độ kiến trúc AI hiện đại, **đây chính xác là một hệ thống RAG (Retrieval-Augmented Generation) thu nhỏ!**

- **Retrieval (Truy xuất):** Quá trình Agent tự động chạy các lệnh bash (`git status`, `git diff`...) chính là bước đi tìm kiếm và thu thập thông tin về trạng thái hiện tại của mã nguồn. Nó kéo các dữ liệu thô này vào cửa sổ ngữ cảnh.
- **Generation (Sinh văn bản):** Sau khi đã có đầy đủ bộ dữ liệu động (ngữ cảnh phong phú và chuẩn xác nhất), LLM mới tiến hành phân tích và sinh ra một dòng Commit Message hoàn hảo.

Sự kết hợp mượt mà giữa việc truy xuất dữ liệu động và sinh văn bản tự động chính là điểm khiến tính năng này trở nên cực kỳ ấn tượng.

---

Tổng kết lại, Custom Commands trong Claude Code không chỉ là những phím tắt (shortcuts) vui vẻ. Khi kết hợp với việc giới hạn bảo mật, chạy bash script và tư duy RAG, nó mở ra vô vàn khả năng để bạn định hình lại toàn bộ quy trình phát triển phần mềm của mình.

Hy vọng bài viết này đã mang lại cho các bạn những góc nhìn kỹ thuật sâu sắc. Hẹn gặp lại các bạn trong những chủ đề thú vị tiếp theo của chuỗi Context Engineering!
