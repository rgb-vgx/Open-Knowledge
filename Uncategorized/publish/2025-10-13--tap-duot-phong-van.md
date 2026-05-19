---
title: Tập dượt phỏng vấn
date: '2025-10-13 02:00:48'
date_gmt: '2025-10-12 19:00:48'
modified: '2025-12-10 13:56:30'
status: publish
slug: tap-duot-phong-van
wordpress_id: 368
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/13/tap-duot-phong-van/
categories:
- Uncategorized
tags: []
---

**Giới thiệu bản thân**  
-> Em là Mai Trần Thuyết, tốt nghiệp ngành Điện tử - Viễn thông của Đại học Bách Khoa Hà Nội. Trong quá trình học, em nghiên cứu về lập trình hệ thống nhúng, cách tích hợp phần cứng, phần mềm trong các thiết bị IoT.  
Ngoài ra, em cũng quan tâm đến AI trên thiết bị nhúng, như việc triển khai các mô hình AI chạy trên các thiết bị nhúng.

**Đồ án tốt nghiệp em làm gì?**  
-> Trước khi quá trình làm đồ án tốt nghiệp diễn ra, em có chủ động tìm hiểu và nghiên cứu trên mạng về các đề tài của những người đi trước. Và em rất hứng thú với đề tài thiết kế smart home. Vì với đề tài này em có thể chủ động hiểu rõ hơn về quy trình phát triển phần mềm nhúng, cách tách thành các module rõ ràng, kiểm thử hệ thống thực tế, nắm được ưu và nhược điểm của sản phẩm mình làm ra so với các sp công nghiệp đang có ngoài thị trường.  
Cụ thể, em thiết kế một server trung tâm chạy trên Raspberry Pi, trong đó:  
- Có giao diện điều khiển UI viết bằng Qt C++, trên UI này sẽ hiển thị các button để điều khiển thiết bị điện, có các dashboard để đo lường chất lượng không khí  
- Và một web app sử dụng Node-RED, được public qua Cloudflare Tunnel để người dùng có thể điều khiển từ xa bằng điện thoại.  
Các thiết bị điện trong nhà được điều khiển qua ESP32, đóng vai trò client, giao tiếp với server bằng MQTT  
Ngoài ra, em còn tích hợp thêm một client Raspberry Pi có chức năng nhận diện khuôn mặt bằng OpenCV Dlib và một chút để tự động mở khoá hoặc bật đèn khi nhận diện được người quen. Em sử dụng thư viện face\_recognition để thực hiện nhận diện khuôn mặt.  
Bên trong thư viện có dùng mô hình ResNet huấn luyện sẵn.  
Input là ảnh RGB từ camera, đầu tiên xác định vị trí khuôn mặt bằng HOG, sau đó dùng ResNet để mã hóa mỗi khuôn mặt thành vector 128 chiều.  
Các vector này được so sánh với database bằng khoảng cách Euclid — nếu khoảng cách nhỏ hơn ngưỡng 0.6 thì xác định là cùng người.  
Toàn bộ kết quả được hiển thị qua OpenCV để người dùng thấy tên và khung nhận diện trên màn hình.

**Trong quá trình làm ở FPT thì em được làm những gì?**  
→ Trong 8 tháng đầu ở FPT thì em được tham gia vào 1 dự án outsource cho Panasonic. Dự án đầu tiên em làm là Dự án 24CY (viết media service cho HMI)  
Mục tiêu: xây media service cho hệ thống audio của HMI (Arin OS – Toyota, nhân Linux; UI phía trên do team khác).  
Đầu vào là các local media như: USB, điện thoại (iOS/Android), HDMI, Bluetooth → đọc/phát nhạc, xử lý playback.

→ Về mặt kỹ thuật, hệ thống được chia thành nhiều tầng, giao tiếp một chiều từ trên xuống dưới.  
→ Tầng trên cùng là UI Layer (các app Flutter), bên dưới là Adapter Layer viết bằng Rust – tầng này đóng vai trò trung gian, gọi API từ Flutter xuống C++ thông qua gRPC, và chuyển các notify ngược lên.  
→ Tiếp theo là Interactor Layer, nơi cung cấp các API logic cho UI,  
rồi đến Application Service Layer, nơi có các service chính như Chef Media Service, Media Service, Playback Service.  
Các service này giao tiếp với nhau bằng Cap’n Proto RPC, và mỗi service là một process độc lập, được systemd quản lý.  
→ Dưới nữa là System Utility Layer, bao gồm các library và service nền của hệ thống như Audio Manager, Arbitration, Setting, HVAC.  
=> Toàn bộ hệ thống vận hành dựa trên hai khái niệm quan trọng là Power State và Availability State để kiểm soát vòng đời service — đảm bảo service khởi tạo, chạy và dừng theo đúng trạng thái nguồn của xe.

**Một số điểm đặc biệt về kiến trúc của hệ thống này:**  
→ Thứ nhất, hệ thống được thiết kế theo hướng phân tầng rõ ràng và giao tiếp một chiều từ trên xuống dưới. Mỗi tầng có vai trò độc lập — ví dụ UI ở Flutter, Adapter ở Rust, Interactor và các Service ở C++ — giúp dễ mở rộng và dễ kiểm soát luồng dữ liệu.  
→ Thứ hai, mỗi Service là một process độc lập được systemd quản lý, và giao tiếp thông qua Cap’n Proto RPC. Điều này giúp hệ thống có khả năng cô lập lỗi, test độc lập, và không bị ảnh hưởng khi một process gặp sự cố.  
→ Thứ ba, 24CY áp dụng mô hình bất đồng bộ hoàn toàn, vì các tác vụ như play nhạc, decode, hoặc truy xuất USB đều mất thời gian. Nhờ sử dụng RPC dạng promise-based, hệ thống vẫn phản hồi mượt mà mà không bị block.  
→ Thứ tư, 24CY có cơ chế quản lý vòng đời rất rõ ràng thông qua Power State và Availability State, đảm bảo từng service chỉ khởi tạo, hoạt động hoặc dừng khi hệ thống ở đúng trạng thái nguồn.

**Ở FPT em rút ra được gì?**Ở FPT, em có cơ hội tham gia các dự án làm việc trực tiếp với khách hàng Nhật, nên quy trình phát triển phần mềm rất bài bản và chặt chẽ. Thực ra FPT làm mảng này khá lâu rồi, cũng từng trải qua nhiều giai đoạn “vấp ngã”, nên hiện tại quy trình đã rất chững và hoàn thiện.  
Điều em ấn tượng nhất là mọi thứ đều rõ ràng và có thể kiểm soát được — từ yêu cầu, tài liệu, coding rule, review cho đến test case. Nếu có thay đổi nhân sự giữa chừng, tiến độ vẫn đảm bảo vì hệ thống tài liệu và quy trình hỗ trợ rất tốt.  
Quy trình phát triển thường đi theo mô hình V-Model: tiếp nhận yêu cầu → phân tích → đặc tả (system/software requirement) → thiết kế kiến trúc → thiết kế chi tiết → coding → unit test → integration test. Ở một số dự án, phía Nhật sẽ phụ trách phần trên (yêu cầu & kiến trúc), còn bên mình tiếp nhận phần dưới (thiết kế chi tiết, coding, testing).  
Nhờ vậy, chất lượng được kiểm soát tốt, có traceability giữa các pha, coding rule rõ ràng, review bắt buộc và test coverage đầy đủ. Em cũng đã quen với phong cách làm việc kiểu Nhật — tỉ mỉ, chỉn chu, trung thực và tôn trọng quy trình.

Khi tìm hiểu về Asilla, em thấy đây cũng là một công ty Nhật, có phong cách làm việc rất gần với những gì em đã quen ở FPT — tôn trọng quy trình, đề cao tính chính xác, sự cẩn thận và tinh thần trách nhiệm trong từng chi tiết. Nhưng điều khiến em thực sự hứng thú là tầm nhìn của Asilla trong việc ứng dụng AI vào nhận dạng hành vi – đây là một hướng đi rất thực tế, vừa mang yếu tố kỹ thuật cao, vừa có giá trị xã hội rõ ràng. Em tin rằng với nền tảng quy trình chuẩn Nhật cùng kinh nghiệm đã tích lũy ở FPT, em có thể hòa nhập rất nhanh vào văn hóa của Asilla, nắm bắt cách làm việc của team, và đóng góp hiệu quả ngay từ giai đoạn đầu. Hơn nữa, em muốn gắn bó lâu dài và phát triển cùng Asilla, không chỉ đơn thuần là hoàn thành công việc được giao, mà còn muốn chủ động học hỏi, tham gia vào việc cải tiến sản phẩm, đóng góp ý tưởng để Asilla phát triển trong tương lai.

Ở dự án hiện tại, em chủ yếu làm các công việc thiên về duy trì hệ thống, kiểm thử đơn vị, review code và chạy Coverity, nên có cảm giác mình đang dừng lại ở mức “operation” nhiều hơn là phát triển sản phẩm. Khi đọc JD của Asilla, em thấy công việc ở đây rất đa dạng — vừa có C++ system, vừa có AI/Computer Vision, Microservice, Cloud, và đặc biệt là được tham gia thiết kế, xây dựng kiến trúc sản phẩm thực tế. Điều đó khiến em rất hứng thú, vì nó đúng với định hướng mà em muốn đi lâu dài: làm kỹ hơn, sâu hơn và có giá trị thực với người dùng.

Em cũng cảm nhận được môi trường ở Asilla là nơi có thể học hỏi, thử nghiệm và sáng tạo, khác với sự an toàn ở công ty cũ. Và em muốn được thử thách bản thân ở môi trường như vậy – nơi mình có thể vừa đóng góp, vừa phát triển năng lực kỹ sư thật sự.
