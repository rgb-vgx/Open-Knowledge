# ☁️ AWS CloudShell: Terminal miễn phí ngay trên trình duyệt

> Nguồn: `024-AWS-CloudShell.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682432)

Có một cách khác để gõ lệnh AWS mà không cần cài đặt gì trên máy: **AWS CloudShell**. Đây là một **terminal chạy ngay trong cloud của AWS**, miễn phí, và cực kỳ tiện cho các bạn thực hành theo bài giảng.

---

### 🧭 CloudShell nằm ở đâu?

Các bạn tìm **biểu tượng CloudShell ở góc trên bên phải màn hình console**. Nếu không thấy, hãy kiểm tra danh sách **region hỗ trợ CloudShell** — vì dịch vụ này **không có mặt ở mọi region**.

Lưu ý: nếu muốn thực hành theo mình, các bạn nên chọn một region có CloudShell. Còn nếu **không dùng được CloudShell thì hoàn toàn không sao** — terminal đã cấu hình từ trước vẫn chạy tốt, các bạn vẫn theo khóa học bình thường.

---

### ⚡ Chạy lệnh AWS tức thì

CloudShell mở ra, mất một phút để khởi tạo môi trường, nhưng bên trong **AWS CLI đã được cài sẵn** — ở thời điểm ghi hình là phiên bản **2.1**. Các bạn có thể kiểm tra bằng `aws --version`.

Điểm hay là: khi chạy lệnh như **`aws iam list-users`**, CloudShell sẽ gọi API bằng chính **credentials của tài khoản đang đăng nhập** — đó là lý do các lệnh chạy được mà không cần cấu hình access key.

*Về region, các bạn có thể chỉ định bằng tham số `--region`; còn mặc định CloudShell sẽ dùng chính region mà bạn đang đăng nhập.*

---

### 💾 File của bạn được giữ lại

CloudShell có **home directory đầy đủ**. Ví dụ mình tạo file:

```bash
echo "tests" > demo.txt
```

File `demo.txt` chứa dòng chữ "tests" sẽ **tồn tại qua các lần restart CloudShell** — mọi file các bạn tạo trong môi trường này đều được giữ nguyên.

---

### 🎨 Tùy biến và làm việc đa nhiệm

Mình rất thích các tùy chọn của CloudShell:

* **Font size:** small, medium, large.
* **Theme:** light hoặc dark.
* **Download/Upload file:** ví dụ mình copy đường dẫn file `demo.txt`, chọn **Actions → Download file** là tải về máy; ngược lại cũng có thể upload file của bạn lên CloudShell.
* **New tab / split thành nhiều cột:** bạn có thể mở **2 terminal cùng lúc** trong CloudShell.

*Với mình, đây là những tính năng "cứu cánh" khi thao tác trên cloud.*

---

### 🎯 Chốt lại

1. CloudShell chỉ có ở **một số region** — nếu muốn dùng, hãy chọn region có hỗ trợ.
2. Không dùng CloudShell cũng **hoàn toàn ổn**, terminal của bạn vẫn hoạt động.
3. Đừng quên thử tính năng **upload/download** — mình thấy nó cực kỳ hữu ích.

Vậy là bạn đã có thêm một công cụ mạnh để thực hành AWS CLI. Hẹn gặp các bạn ở bài tiếp theo! 🚀
