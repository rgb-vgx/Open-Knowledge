---
title: 'Bài 2: Thực Hành NVIDIA NeMo Agent Toolkit: Chạy Và Triển Khai Agent Đầu Tiên
  Của Bạn'
date: '2026-05-11 15:14:29'
date_gmt: '2026-05-11 08:14:29'
modified: '2026-05-11 15:14:29'
status: publish
slug: bai-2-thuc-hanh-nvidia-nemo-agent-toolkit-chay-va-trien-khai-agent-dau-tien-cua-ban
wordpress_id: 705
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/bai-2-thuc-hanh-nvidia-nemo-agent-toolkit-chay-va-trien-khai-agent-dau-tien-cua-ban/
categories:
- Nvidia NeMo Agent Toolkit
tags: []
---

Trong phần trước, chúng ta đã tìm hiểu lý do tại sao **NVIDIA NeMo Agent Toolkit (NAT)** là "cứu tinh" cho các hệ thống AI Agent khi bước ra môi trường thực tế (Production). Hôm nay, chúng ta sẽ xắn tay áo lên để trực tiếp xây dựng một workflow tối giản, chạy thử và biến nó thành một REST API thực thụ.

Mục tiêu của bài thực hành này là tạo ra một **Trợ lý Khoa học Khí hậu (Climate Science Assistant)**. Dù rất đơn giản, nó sẽ cho bạn thấy cách NAT mang lại tiêu chuẩn doanh nghiệp (production capabilities) ngay từ những bước đầu tiên.

### 1. Trái Tim Của Hệ Thống: Cấu Hình YAML

Như đã đề cập, NeMo Agent Toolkit hoạt động dựa trên cấu hình (config-driven). Mọi thứ agent cần để hoạt động đều nằm trong một file YAML rõ ràng, giúp bạn tách bạch hoàn toàn phần logic thiết lập khỏi mã nguồn Python.

Một file cấu hình NAT tiêu chuẩn bao gồm hai thành phần cấp cao nhất:

- **LLMs:** Định nghĩa cách hệ thống kết nối với các mô hình ngôn ngữ lớn. Bạn có thể khai báo nhiều LLM khác nhau. Trong ví dụ này, chúng ta định nghĩa một LLM tên là `climate_llm`, sử dụng loại (type) là `nim` (NVIDIA inference container) chạy mô hình `meta/llama-3.1-70b-instruct`. Tại đây, bạn cũng dễ dàng cài đặt các tham số như `temperature` (ví dụ: 0.7) hay `max_tokens` (2048).
- **Workflow:** Định nghĩa chính xác những gì agent sẽ làm. Với bài toán này, loại workflow được chọn là `chat_completion` (một luồng xử lý đầu vào - đầu ra cơ bản). Workflow này sẽ gọi `climate_llm` ở trên và được gán một `system_prompt` với nội dung: *"Bạn là một trợ lý khoa học khí hậu am hiểu."*

Khi khởi chạy, NAT sẽ tự động đọc file này, khởi tạo kết nối với Llama 3.1, nạp system prompt và sẵn sàng nhận câu hỏi.

### 2. Sức Mạnh Của Bộ Lệnh NAT CLI

Để tương tác với file cấu hình, NeMo Agent Toolkit cung cấp một công cụ dòng lệnh (CLI) cực kỳ mạnh mẽ. Dưới đây là các lệnh bạn sẽ sử dụng thường xuyên:

- **`nat validate`**: Kiểm tra xem file cấu hình YAML của bạn có đúng cú pháp và hợp lệ hay không trước khi chạy.
- **`nat run`**: Khởi chạy workflow trực tiếp trên terminal với một đầu vào (input) đơn giản để kiểm tra nhanh.
- **`nat serve`**: Triển khai agent thành một API Server độc lập, sẵn sàng phục vụ các ứng dụng khác.
- **`nat eval`**: Chạy các bài kiểm tra đánh giá (evaluation), rất hữu ích khi tích hợp vào CI/CD pipeline.
- **`nat optimize`**: Tự động tinh chỉnh và tối ưu hóa workflow để đạt hiệu năng tốt nhất.

### 3. Khởi Chạy Và Thử Nghiệm Nhanh

Sau khi tạo file cấu hình, bạn có thể kiểm tra agent ngay lập tức bằng lệnh `nat run` kèm theo file YAML và câu hỏi đầu vào.

Ví dụ, khi bạn hỏi: *"Sự khác biệt giữa thời tiết và khí hậu là gì?"*, CLI sẽ hiển thị chi tiết quá trình hệ thống tải cấu hình (nhận diện 1 LLM) và trả về câu trả lời trực tiếp trên màn hình.

**Tuy nhiên, có một điểm yếu cần lưu ý:** Vì đây là một workflow `chat_completion` cơ bản, agent hiện chỉ đang dựa vào kiến thức nội tại của LLM (trọng số mô hình). Khi bạn hỏi một câu đòi hỏi dữ liệu phân tích thực tế sâu sắc, agent sẽ cố gắng trả lời dựa trên những gì nó được huấn luyện, dẫn đến rủi ro trích dẫn nguồn cũ hoặc bị "ảo giác" (hallucination).

### 4. Biến Agent Thành API Chuẩn Production (OpenAI-Compatible)

Một đoạn script chạy cục bộ (local script) không mang lại nhiều giá trị cho các hệ thống phần mềm khác. Bạn cần biến nó thành một dịch vụ.

Chỉ bằng cách chạy lệnh **`nat serve <tên-file-config.yaml>`**, NeMo Agent Toolkit sẽ lập tức dựng lên một REST API server (thường chạy ở `localhost:8000`).

Tuyệt vời hơn, API này **tương thích hoàn toàn với chuẩn OpenAI**. Điều này có nghĩa là bạn có thể sử dụng thư viện `requests` mặc định của Python hoặc bất kỳ OpenAI Client nào để gọi agent của mình thông qua endpoint `/v1/chat/completions`. Bạn chỉ cần gửi một chuỗi định dạng JSON chứa lịch sử tin nhắn (messages) và nhận về kết quả chuẩn mực.

### 5. Giao Diện Người Dùng (UI) Tích Hợp Sẵn

Bên cạnh việc hỗ trợ API cho các ứng dụng lập trình, NeMo Agent Toolkit còn đi kèm với một giao diện Chat UI (Giao diện người dùng) sẵn sàng cho môi trường thực tế.

UI này cho phép bạn:

- Tạo mới và tìm kiếm các phiên trò chuyện (chats).
- Kết nối với các máy chủ MCP (Model Context Protocol).
- Nhập/Xuất dữ liệu linh hoạt.

Chỉ cần kết nối UI này với API server vừa dựng, bạn đã có ngay một giao diện tương tác hiện đại không thua kém gì ChatGPT để nói chuyện với "Trợ lý Khí hậu" của riêng mình.

### 🎯 Tổng kết và Bước tiếp theo

Trong phần này, chúng ta đã xây dựng thành công một trợ lý ảo cơ bản, đóng gói nó thành API chuẩn và giao tiếp thông qua UI. Mặc dù vẫn còn hạn chế (chưa có quyền truy cập vào dữ liệu thực), nhưng bộ khung hạ tầng (infrastructure) vững chắc đã được thiết lập.

Ở bài viết tiếp theo, chúng ta sẽ bắt đầu "nâng cấp" agent này bằng cách trang bị thêm các **Công cụ (Tools)**, cho phép nó tự động kéo và phân tích dữ liệu thực tế từ cơ sở dữ liệu để đưa ra những báo cáo chính xác, chấm dứt hoàn toàn tình trạng "ảo giác".
