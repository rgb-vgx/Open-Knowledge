# 🍎 Hướng dẫn cài AWS CLI trên Mac

> Nguồn: `021-AWS-CLI-Setup-on-Mac.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20395727)

Tiếp nối bài trước, giờ là lượt của các bạn dùng **Mac**. Quy trình cũng rất gọn: tải **pkg file**, chạy installer đồ họa, mở terminal và kiểm tra **phiên bản AWS CLI**.

---

### 📥 Bước 1 — Tải bộ cài AWS CLI v2 cho macOS

Lên Google và chọn link hướng dẫn **installing the AWS CLI version 2 on macOS**, sau đó kéo xuống phần hướng dẫn cài đặt. Cách đơn giản nhất là **tải file pkg** — đây là **graphical installer (trình cài đặt đồ họa)**.

---

### ⚙️ Bước 2 — Chạy installer

1. Mở **pkg file** vừa tải.
2. Bấm **Continue → Continue → Continue** và **đồng ý** điều khoản.
3. Chọn **Install for all users on this computer**, bấm **Continue**.
4. Bấm **Install** và chờ các file được ghi vào máy.
5. Cài đặt thành công — bạn có thể **kéo installer vào Trash** để dọn dẹp.

---

### ✅ Bước 3 — Kiểm tra trên Terminal

Mở **Terminal** trên Mac (mình dùng **iTerm** — một terminal miễn phí, nhưng Terminal mặc định cũng chạy tốt) và gõ:

```bash
aws --version
```

Nếu mọi thứ suôn sẻ, lệnh sẽ trả về **phiên bản của AWS executable** — trong video của mình là **AWS CLI 2.0.10**, nghĩa là **cài đặt đã thành công**.

---

### 💡 Nếu gặp trục trặc?

Nếu có vấn đề trong quá trình cài, hãy **xem lại trang hướng dẫn cài đặt chính thức của AWS** mà bạn đã mở ở Bước 1 — câu trả lời cho hầu hết các lỗi thường gặp đều nằm ở đó.

---

Vậy là các bạn dùng Mac cũng đã có AWS CLI trong tay. *Dù bạn dùng hệ điều hành nào, công cụ đã sẵn sàng — giờ là lúc luyện tập.* Ở bài tiếp theo, chúng ta sẽ tiếp tục thiết lập CLI trên các hệ điều hành khác và bắt đầu chạy những câu lệnh AWS đầu tiên. Hẹn gặp các bạn! 🚀
