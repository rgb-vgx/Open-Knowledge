# 🎓 Tổng kết Protocols — chọn đúng giao thức cho đúng bài toán

> Nguồn: `022-Summary-Practical-Applications.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49426859)

Chúng ta đã đi hết section Protocols. Điều đáng chú ý là **mỗi giao thức chúng ta bàn tới đều tồn tại để giải một thách thức giao tiếp cụ thể** — không có giao thức nào sinh ra để "thắng" giao thức khác. Bài tổng kết này sẽ gom lại bức tranh lớn và kết nối chúng với các quyết định kiến trúc thực tế.

---

### 🧭 Nhìn lại hành trình

* **TCP và UDP** giúp chúng ta cân bằng giữa **độ tin cậy và tốc độ** — trade-off nền tảng nhất của tầng transport.
* **HTTP** cung cấp nền móng cho giao tiếp web: chu trình request-response, tính stateless, methods và status codes.
* **REST** mang đến bộ nguyên tắc thiết kế API scalable, resource-oriented, dễ đoán và dễ bảo trì.
* **Các giao thức thời gian thực** giải quyết giới hạn của tương tác request-response truyền thống — từ long polling đến kết nối hai chiều bền vững của WebSocket.
* **gRPC và GraphQL** cho thấy thiết kế API vẫn tiếp tục tiến hóa khi hệ thống lớn dần và phức tạp hơn về quy mô.

---

### 📊 Bảng tổng hợp nhanh

| Giao thức | Giải quyết bài toán gì |
|---|---|
| TCP | Giao tiếp tin cậy, đúng thứ tự — đánh đổi bằng latency và overhead |
| UDP | Tốc độ và độ trễ thấp — đánh đổi bằng đảm bảo phân phối |
| HTTP/HTTPS | Chuẩn giao tiếp web client-server, stateless, có thể mã hóa |
| REST | Nguyên tắc thiết kế API scalable quanh resource |
| Long polling và WebSocket | Cập nhật thời gian thực — từ mô phỏng trên HTTP đến kết nối hai chiều |
| gRPC và GraphQL | Hiệu năng service-to-service và linh hoạt dữ liệu cho client |

---

### 💡 Bài học lớn nhất

**Lựa chọn giao thức chưa bao giờ thuần túy là chuyện kỹ thuật.** Chúng ảnh hưởng trực tiếp tới:

* **Latency** và **scalability** của hệ thống.
* **Developer experience** — trải nghiệm của chính đội ngũ phát triển.
* **Độ phức tạp vận hành** — cái giá phải trả mỗi ngày.
* Và cuối cùng là **trải nghiệm người dùng**.

Một system designer giỏi không chỉ hiểu các giao thức **hoạt động thế nào**, mà hiểu **vì sao trong một ngữ cảnh cụ thể, giao thức này được chọn thay vì giao thức kia**.

*Đây cũng chính là triết lý xuyên suốt khóa học: hiếm khi có thiết kế hoàn hảo — mọi quyết định kiến trúc đều là trade-off.*

---

Vậy là chúng ta đã có nền tảng vững chắc về giao tiếp. Với hành trang đó, chúng ta sẵn sàng bước lên một tầng cao hơn trong kiến trúc. Ở phần tiếp theo, mình và các bạn sẽ khám phá **architectural patterns** — cách các thành phần hệ thống được tổ chức và mở rộng cùng nhau để xây dựng những hệ phân tán **resilient (chịu lỗi tốt), high-performance (hiệu năng cao)**. Hẹn gặp lại các bạn ở đó! 🚀
