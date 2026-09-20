# ⚙️ Chọn công nghệ cho nền tảng video: Kiến trúc dẫn đường, công nghệ theo sau

> Nguồn: `106-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49891417)

Kiến trúc đã có, giờ là lúc bàn về **công nghệ và hạ tầng** có thể dùng để hiện thực hóa nó. Nhưng trước khi đi vào từng lựa chọn, mình muốn nhấn mạnh: **system design được dẫn dắt bởi nguyên lý kiến trúc, không phải bởi công nghệ cụ thể**. Những công nghệ trong bài là ví dụ đại diện — không phải đáp án đúng duy nhất.

---

### 🧱 Front-end và back-end

* **Front-end:** các framework như **React** hoặc **Vue** là lựa chọn tốt vì giúp xây giao diện **responsive, dựa trên component**, xử lý hiệu quả một ứng dụng động như nền tảng video.
* **Back-end:** **Node.js với Express** rất phù hợp để xử lý số lượng lớn request API đồng thời, đặc biệt khi nhiều thao tác liên quan đến **asynchronous I/O (vào ra bất đồng bộ)** như upload, lấy metadata và tương tác người dùng.

---

### 💾 Dữ liệu và lưu trữ: mỗi loại một kho phù hợp

* **Dữ liệu có cấu trúc** như người dùng, video, metadata → **relational database** như **Postgres** hoặc **MySQL**: nhất quán mạnh, truy vấn hiệu quả và khả năng đánh index trưởng thành.
* **Dữ liệu linh hoạt** như tùy chọn người dùng hay thông tin liên quan recommendation → **NoSQL** như **MongoDB**, nơi schema có thể tiến hóa tự nhiên hơn.
* **Video files** rất khác metadata → lưu trong **object storage** như **AWS S3** hoặc **Google Cloud Storage**, được thiết kế để lưu media khối lượng lớn một cách đáng tin cậy và tiết kiệm chi phí.
* **Phân phối nội dung** độ trễ thấp toàn cầu → đặt **CDN** như **Cloudflare** hoặc **CloudFront** trước tầng lưu trữ.

---

### 🔐 Xác thực, xử lý nền và hạ tầng

* **Xác thực:** **OAuth2** và **JWT** cung cấp cách tiếp cận **dựa trên token**, cho phép client xác thực một lần rồi truy cập các API được bảo vệ mà không phải gửi lại thông tin đăng nhập nhiều lần.
* **Xử lý nền:** **Kafka** hoặc **Amazon SQS** giúp **tách rời (decouple)** các tác vụ chạy lâu như encode video và xử lý tương tác khỏi request hướng người dùng — nhờ đó hệ thống mở rộng và chịu lỗi tốt hơn.
* **Hạ tầng:** toàn bộ nền tảng có thể chạy trên cloud như **AWS** hoặc **Google Cloud**, còn **Kubernetes** giúp điều phối và mở rộng từng service độc lập khi nhu cầu thay đổi.

| Hạng mục | Lựa chọn tiêu biểu | Vì sao phù hợp |
|---|---|---|
| Front-end | React, Vue | Giao diện responsive, component-based |
| Back-end | Node.js + Express | Nhiều request đồng thời, async I/O |
| Dữ liệu có cấu trúc | Postgres, MySQL | Nhất quán, truy vấn, index trưởng thành |
| Dữ liệu linh hoạt | MongoDB | Schema tiến hóa tự nhiên |
| Video files | AWS S3, Google Cloud Storage | Media lớn, tin cậy, chi phí tốt |
| Phân phối | Cloudflare, CloudFront | CDN đưa nội dung đến gần người dùng |
| Xác thực | OAuth2, JWT | Token-based, xác thực một lần |
| Tác vụ nền | Kafka, Amazon SQS | Decouple tác vụ chạy lâu |
| Hạ tầng | AWS, Google Cloud, Kubernetes | Điều phối và scale độc lập |

---

### 💡 Bài học: công nghệ phục vụ yêu cầu, không phải ngược lại

Điều quan trọng nhất của bước này **không nằm ở từng công nghệ cụ thể** — mỗi lựa chọn kể trên đều có phương án thay thế khả thi. Điều đáng quan tâm là **chọn công nghệ có thế mạnh khớp với các yêu cầu kiến trúc đã xác định**: scalability, reliability, performance và sự đơn giản trong vận hành.

*Thiết kế hệ thống tốt là đưa ra những đánh đổi có hiểu biết, chứ không phải học thuộc một technology stack.* Ở bài tiếp theo — cũng là bài cuối của case study — chúng ta sẽ ghép mọi thứ lại thành **kiến trúc hoàn chỉnh** của nền tảng chia sẻ video. Hẹn gặp lại các bạn! 🚀
