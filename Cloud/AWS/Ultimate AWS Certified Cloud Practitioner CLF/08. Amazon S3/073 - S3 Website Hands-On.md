# 🧪 Thực hành: Host static website trên Amazon S3

> Nguồn: `073-S3-Website-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055926)

Được rồi, chúng ta cùng bật tính năng website cho bucket và mở website đầu tiên trên S3. Vì bucket đã được public từ bài trước, mọi thứ sẽ diễn ra rất nhanh.

---

### 📤 Bước 1: Upload thêm file

Trước tiên, mình upload thêm file **beach.jpg** vào bucket. Bây giờ bucket đã có **2 file** sẵn sàng cho website.

---

### ⚙️ Bước 2: Bật static website hosting

1. Vào bucket → tab **Properties** → kéo xuống tận cùng, tìm mục **Static website hosting**.
2. Bấm **Edit** → **Enable** static website hosting.
3. Chỉ định **index document**: `index.html` — đây là **trang mặc định (homepage)** của website, và chúng ta sẽ phải upload file này.

Ngay tại đây, AWS hiển thị một **cảnh báo nhỏ**: nếu muốn dùng làm **website endpoint**, bạn phải để **toàn bộ nội dung được publicly readable**. *Tin tốt: chúng ta đã làm việc này ở bài trước rồi.*

Bấm **Save** để lưu.

---

### 🚀 Bước 3: Upload index.html và mở website

Bây giờ quay lại **Objects** — thứ còn thiếu duy nhất là file **index.html**:

1. Bấm **Upload** → **Add files** → chọn `index.html` → **Upload**.
2. Quay lại **Properties**, kéo xuống **Static website hosting** — lúc này đã có **bucket website endpoint**.
3. Copy URL này, dán vào trình duyệt.

Kết quả hiện ra: dòng chữ **"I love coffee. Hello world!"** cùng ảnh **coffee.jpg**. Website đã hoạt động!

Thử thêm vài thao tác:

* Right-click vào ảnh → **Open image in new tab** → đây chính là **public URL của coffee.jpg** — hoạt động tốt.
* Đổi từ coffee sang beach: mở `beach.jpg`, ảnh beach cũng hiển thị bình thường.

Vậy là mọi thứ đều chạy: bucket đã được bật **static website hosting**, và nhờ **S3 bucket policy public** từ bài trước, tất cả các file đều truy cập được.

---

Vậy là các bạn đã tự tay dựng một website tĩnh trên Amazon S3. *Đây là một use case rất thực tế — nhiều website thật ngoài kia cũng chạy theo cách này.*

Ở bài tiếp theo, chúng ta sẽ học **S3 Versioning** — cách cập nhật website an toàn mà không sợ mất dữ liệu. Hẹn gặp lại! 🚀
