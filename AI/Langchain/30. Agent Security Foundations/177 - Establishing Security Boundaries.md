# 🛡️ Dựng ranh giới an ninh (security boundaries) để chặn đứng skill độc hại

Sau khi đã thấy một skill "ngây thơ" có thể moi secrets ghê gớm thế nào, câu hỏi tiếp theo là: **làm sao để ngăn chặn?** Trong bài này, mình sẽ chia sẻ các nguyên tắc thiết lập ranh giới an ninh cho máy của bạn.

---

### ☁️ Nguyên tắc 1: Đừng chạy Claude Code trên máy của bạn

Mình biết việc chạy Claude Code ngay trên máy mình **rất hấp dẫn và cực kỳ tiện** — mình cũng từng như vậy. Nhưng chúng ta có lựa chọn tốt hơn: chạy nó trên một **máy từ xa (remote machine)**, trong một **workspace environment trên cloud**.

Điểm hay là bạn **vẫn tận hưởng đầy đủ sức mạnh của Claude Code**, không mất đi tính năng nào.

Và kể cả khi bạn muốn chạy ở **YOLO mode** — nếu bạn thật sự can đảm — thì khi nó làm sập thứ gì đó hoặc rò rỉ dữ liệu, thiệt hại cũng chỉ đến từ một **máy phát triển chuyên dụng trên cloud**, nơi đã có sẵn các **security boundary (ranh giới an ninh)**.

Thay vì mất trắng toàn bộ máy tính cá nhân, bạn chỉ "mất" một môi trường được thiết kế để có thể mất. Đó chính là ranh giới an ninh đầu tiên và quan trọng nhất.

---

### 🔍 Nguyên tắc 2: Kiểm tra nội dung trước khi thực thi

Cách tiếp cận thứ hai là **soi xét và kiểm tra nội dung file trước khi chạy** — và có thể để chính Claude hoặc một công cụ bảo mật khác làm việc này.

Nếu sắp chạy một **file Python**, một **shell script** hay bất kỳ **executable** nào, ta có thể tận dụng **AI, LLM, coding agent** để kiểm tra nội dung và đảm bảo nó không nguy hiểm. Điều này áp dụng cả với **skills**:

* Trước khi chạy một skill, dùng công cụ kiểm tra xem skill có "lành" không.
* Phân tích **từ mô tả skill đến từng script** mà nó sẽ thực thi.
* Quan trọng nhất: việc kiểm tra diễn ra **lúc runtime, không phải lúc tải về (download time)**.

Bạn có thể làm điều này nhờ **hạ tầng hooks mà Claude cung cấp**.

*Điều này sẽ làm thời gian chạy tăng lên một chút*, nhưng đổi lại bạn có **độ tự tin cao hơn hẳn** và không còn phải sợ skills làm những trò "mờ ám" trên máy mình hoặc cả trên máy cloud.

---

### 🏢 Nguyên tắc 3: Dành cho tổ chức — kiểm soát từ gốc

Hai cách trên phù hợp cho **nhà phát triển độc lập (solo developer)** lẫn tổ chức. Nhưng nếu bạn ở trong một tổ chức, còn có cách tốt hơn:

1. Dùng các file **.settings của Claude** với **cấu hình đặt trước**, chỉ cho phép một số **skill và MCP đã được admin thẩm định (vetted)**.
2. Xây dựng **quy trình vet skill hoàn chỉnh**: skill nào được dùng, skill nào không.
3. Thậm chí có thể lấy chính **hooks** đã viết và **enforce cho toàn bộ developer** đang dùng Claude Code thông qua các **cơ chế enterprise**.

Nhờ vậy, chúng ta nắm **quyền kiểm soát** thay vì để mọi người tải thoải mái mọi skill rồi làm gì thì làm trên môi trường phát triển của công ty.

Và khi hooks đã được enforce ở cấp tổ chức, **cả công ty sẽ được căn chỉnh (aligned) theo cùng một chuẩn bảo mật** — không còn chuyện mỗi người một kiểu.

Trong video tiếp theo, mình sẽ demo cách giải pháp này vận hành. Hẹn gặp các bạn! 🚀
