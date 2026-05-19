---
title: 'Network Programming #1: Học Lập trình Mạng từ A - Z với C Language'
date: '2025-11-09 17:48:20'
date_gmt: '2025-11-09 10:48:20'
modified: '2025-11-10 02:27:36'
status: publish
slug: network-programming-1-hoc-lap-trinh-mang-tu-a-z-voi-c-language
wordpress_id: 541
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/09/network-programming-1-hoc-lap-trinh-mang-tu-a-z-voi-c-language/
categories:
- Concept
tags: []
---

Khóa học này được thiết kế để bao gồm các khái niệm mạng quan trọng và chi tiết triển khai của chúng. Nội dung được chọn lọc dựa trên các câu hỏi thường gặp trong phỏng vấn xin việc nâng cao.

### Mục tiêu khóa học

Sau khi hoàn thành khóa học, bạn sẽ có thể:

- Thiết kế các ứng dụng hoặc dự án mạng một cách tốt hơn.
- Tự tin trong các buổi phỏng vấn kỹ thuật về mạng.
- Sẵn sàng cho các công việc phát triển mạng và Linux trên thị trường.
- Xây dựng sự tự tin và kỹ năng lập trình.
- Xây dựng portfolio GitHub với hai dự án mạng lớn để tăng khả năng được tuyển dụng.

### Đối tượng tham gia

- **Sinh viên Khoa học Máy tính**: Đã hoàn thành ít nhất năm thứ ba đại học.
- **Chuyên gia đang làm việc**: Những người đang làm trong lĩnh vực kiểm thử (testing) mạng và muốn chuyển sang các công việc phát triển, vốn ổn định và có mức lương cao hơn.
- **Sinh viên muốn xây dựng sự nghiệp**: Mong muốn làm việc tại các công ty sản phẩm (product-based companies) có mức lương cao, không giới hạn trong các agency về mạng.

### Kiến thức và công cụ cần thiết (Prerequisites)

- **Kiến thức C cơ bản**: Nắm vững kiến thức cơ bản về ngôn ngữ C và cách làm việc với con trỏ.
- **Hệ điều hành Linux**: Tất cả các bài tập sẽ được thực hiện trên Linux.
  - **Yêu cầu**: Cài đặt Linux bằng phần mềm ảo hóa như VirtualBox hoặc VMware.
  - **Hỗ trợ**: Nếu bạn là người mới bắt đầu với Linux, khóa học sẽ có chương 0 hướng dẫn chi tiết cách thiết lập môi trường phát triển Linux trên máy tính của bạn.
- **Kiến thức mạng**: Không yêu cầu kiến thức mạng trước đó. Khóa học sẽ bắt đầu từ những khái niệm cơ bản nhất.

### Thị trường việc làm ngành Mạng

- **Lĩnh vực lâu đời và ổn định**: Mạng là một trong những lĩnh vực lâu đời và ổn định nhất trong ngành IT.
- **Cơ hội phát triển**: Với sự ra đời của các công nghệ mới như hệ thống đám mây (cloud system on chips), bộ xử lý mạng (network processors), Internet of Things (IoT), mạng đang là một công nghệ phát triển nhanh chóng.
- **Nhu cầu tăng cao**: Hàng triệu người dùng và thiết bị mới kết nối Internet mỗi năm, tạo áp lực lớn lên ngành công nghiệp mạng, dẫn đến nhu cầu việc làm ổn định và bảo mật cao.
- **Công ty sản phẩm**: Nhiều công ty mạng là công ty sản phẩm, sản xuất thiết bị chuyển mạch (switches), bộ định tuyến (routers), hub. Công việc tại đây thường ổn định, ít áp lực và có mức lương tốt.
- **Tính linh hoạt nghề nghiệp**: Chuyên gia mạng có thể chuyển sang các lĩnh vực khác như điện toán đám mây, hệ thống nhúng (embedded systems), kỹ thuật nền tảng/phần cứng (platform/hardware engineering), phát triển trình điều khiển thiết bị (device driver development).

### Cấu trúc khóa học và Nội dung chi tiết

Khóa học bao gồm 12 chương/module và 2 dự án lớn.

#### ⚙️ Chương 0: Thiết lập môi trường phát triển Linux

- Dành cho người mới bắt đầu hoàn toàn với môi trường phát triển Linux.
- Hướng dẫn từng bước thiết lập môi trường Linux trên máy cục bộ.
- Người dùng đã quen thuộc với Linux có thể bỏ qua phần này.

#### 📚 Module 1: Giới thiệu mô hình OSI

- Giới thiệu cơ bản về mô hình OSI.
- Module hoàn toàn lý thuyết.

#### 💻 Module 2: Thiết lập môi trường đa nút (Multi-node Environment)

- Hướng dẫn thiết lập môi trường đa nút trên máy cục bộ.
- Cần thiết để thực hành định tuyến giữa các nút khác nhau trong mạng.

#### 🔢 Module 3: Chia mạng con (Subnetting) và Toán học địa chỉ IP

- Tìm hiểu về cách chia mạng con và các phép toán liên quan đến địa chỉ IP.

#### 🌐 Module 4: Khái niệm mạng lớp 2

- Tìm hiểu về các khái niệm mạng ở tầng liên kết dữ liệu (Layer 2).

#### 🛣️ Module 5: Khái niệm mạng lớp 3

- Tìm hiểu về các khái niệm mạng ở tầng mạng (Layer 3), bao gồm định tuyến (routing) và chuyển mạch (switching).

#### 🛠️ Module 6: Giao diện Loopback và Công cụ khắc phục sự cố

- Tìm hiểu về giao diện loopback và ý nghĩa của chúng.
- Sử dụng các công cụ khắc phục sự cố như `Tcpdump` và `Ping`.

#### 📦 Module 7: Khái niệm tầng giao vận (Transport Layer)

- Tìm hiểu về các khái niệm ở tầng giao vận.

#### 🚀 Module 8: Tầng ứng dụng (Application Layer) và triển khai HTTP Server

- Tìm hiểu về tầng ứng dụng.
- Thực hiện triển khai máy chủ HTTP từ đầu (from scratch).
- Các module 1-8 đã bao gồm hầu hết các tầng của mô hình OSI.

#### 🔌 Module 9: Lập trình Socket hoàn chỉnh với C

- Học lập trình socket hoàn chỉnh bằng ngôn ngữ C.

#### 🛡️ Module 10: Đóng gói (Encapsulation) trong mạng

- Tìm hiểu cách đóng gói được thực hiện trong mạng.
- Khám phá các vấn đề mà đóng gói IP-in-IP giải quyết.

#### ⏰ Module 11: Wheel Timers

- Tìm hiểu về cấu trúc dữ liệu `wheel timer`.
- `Wheel timer` được sử dụng rộng rãi trong mạng để gửi gói tin định kỳ đến các máy khác.

#### 🏷️ Module 12: TLVs (Type-Length-Value)

- Tìm hiểu về khái niệm TLV (Type-Length-Value).
- TLVs giúp định dạng và đóng gói dữ liệu một cách dễ dàng và linh hoạt.
- Sử dụng TLVs để thực hiện tuần tự hóa (serialization) và giải tuần tự hóa (deserialization) dữ liệu.

### 📝 Các dự án lập trình

Khóa học được hỗ trợ bởi hai dự án lập trình lớn:

- **Dự án 1: Triển khai khái niệm bộ nhớ trong suốt phân tán (Distributed Transparent Memory)**
  - Đây là một bộ nhớ được phân tán trên nhiều máy.
  - Đối với người dùng cuối, bộ nhớ này xuất hiện như một bộ nhớ logic duy nhất.
- **Dự án 2: Triển khai cơ chế gửi gói tin định kỳ (Packet Dispatching) bằng Wheel Timer**
  - Sử dụng cấu trúc dữ liệu `wheel timer` để gửi gói tin định kỳ.

### Phương pháp học tập và tài nguyên

- **Tiến trình học**: Bắt đầu từ cấp độ rất cơ bản và tiến tới các khái niệm nâng cao.
- **Thực hành**: Mỗi giai đoạn, khái niệm sẽ được minh họa thông qua nhiều bài tập.
- **Tài nguyên hỗ trợ**: Cung cấp các liên kết, tài liệu, sách điện tử (ebooks) để hỗ trợ các chủ đề cần thiết trong suốt khóa học.
- **Lời khuyên**:
  - Không nên quá tải bản thân với nhiều sách dày về mạng.
  - Chỉ cần bám sát các kiến thức cơ bản trong khóa học là đủ cho các buổi phỏng vấn và công việc thực tế.
  - Không phải mọi thứ trong sách đều là chủ đề phỏng vấn hoặc có thể sử dụng trong mạng.
