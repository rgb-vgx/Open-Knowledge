# 🧪 Thực hành Amazon S3: Tạo bucket, upload và mở object đầu tiên

> Nguồn: `069-S3-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055910)

Được rồi, giờ là lúc bắt tay vào thực hành! Mình đang ở trong **Amazon S3 console** và chúng ta sẽ cùng tạo bucket đầu tiên, upload object, tạo folder và thử mở object theo nhiều cách khác nhau.

*Đừng lo nếu bạn chưa từng mở S3 console — cứ làm theo mình từng bước.*

---

### 🪣 Bước 1: Tạo bucket đầu tiên

Khi bấm **Create bucket**, các bạn sẽ đi qua các bước sau:

1. **Region** — bucket được tạo trong một region cụ thể. Mình chọn **Europe (Ireland) eu-west-1**; các bạn có thể đổi region selector ở góc trên bên phải.
2. **Bucket type** — có **General purpose** và **Directory**. Directory dành cho use case độ trễ thấp (low-latency) và chúng ta không dùng; hãy chọn **General purpose** — loại bucket phổ biến và được khuyến nghị nhất cho hầu hết access pattern.
3. **Namespace** — trước đây chỉ có **Global**, giờ có thêm **Account Regional namespace**.
4. **Object Ownership** — để **ACL disabled** (mặc định, được khuyến nghị). Đây là security setting, cứ giữ mặc định.
5. **Block all public access** — giữ **enabled** để bucket có mức bảo mật tối đa, chỉ mình bạn upload được file.
6. **Bucket Versioning** — tạm thời **disable**, chúng ta sẽ bật ở bài sau.
7. **Default encryption** — chọn **server-side encryption với Amazon S3 managed key** (lựa chọn đầu tiên), bật **Bucket Key**. *Chuyện encryption sẽ được nói kỹ ở bài sau.*

Về naming: nếu dùng **Global namespace** và đặt tên bucket là `test`, bạn sẽ gặp lỗi **"bucket with the same name already exists"** vì ai đó đã tạo bucket tên đó rồi. Với **Account Regional namespace**, bạn có thể đặt tên thoải mái như `demo` — AWS thêm suffix gồm account number và region, đảm bảo tên luôn khả dụng, và bạn dùng được tên đó ở mọi region, mọi account. Đây là cách được khuyến nghị cho tương lai. Trong demo, mình đặt bucket là `stephane-demo-s3-v12`.

*(Thú vị: ngay cả `stephane-demo-s3-v6` cũng đã bị người khác đặt mất — nên mình phải tăng dần version lên.)*

---

### 📤 Bước 2: Upload object đầu tiên

Bucket sau khi tạo sẽ xuất hiện trong danh sách — S3 hiển thị **bucket từ mọi region**, không chỉ region hiện tại. Bạn có thể dùng ô search để tìm nhanh bucket của mình. Mở bucket và bấm **Upload** → **Add files**:

* Điều hướng vào thư mục code, tìm file **coffee.jpg**.
* Định dạng: **JPEG**, dung lượng **100 KB**.
* Đích đến: `s3://stephane-demo` (bucket của mình).

Bấm **Upload** và object `coffee.jpg` xuất hiện trong mục **Objects**. Click vào object, các bạn sẽ thấy trang chi tiết với **overview** và các **properties**: nơi upload, kích thước, kiểu file, và đặc biệt là **object URL**.

---

### 🔗 Bước 3: Hai cách mở object — Open và public URL

Bấm **Open**, các bạn sẽ thấy ảnh coffee.jpg ngay trên trình duyệt — tức là nó đang **hiện diện trên internet**. Nhưng nếu copy **object URL** trong phần overview rồi dán vào trình duyệt mới, các bạn sẽ nhận **AccessDenied**.

Vì sao cùng là URL mà một cái chạy một cái không? Nhìn kỹ URL từ nút **Open**: phần đầu giống hệt nhau, nhưng phần sau **rất dài và phức tạp** — đó là **S3 pre-signed URL (URL được ký sẵn)**. Lý do:

* URL này chứa **chữ ký (signature)** xác minh rằng chính bạn là người gửi request.
* **Credentials của bạn được mã hóa** trong URL đó.
* Vì vậy S3 nói: "Stephane được phép xem object của chính mình" — và hiển thị ảnh.

**Public URL thì không hoạt động** vì object chưa được public; còn **pre-signed URL chỉ dành riêng cho bạn**. Chúng ta sẽ học cách public object ở bài sau.

---

### 📁 Bước 4: Tạo folder, upload và dọn dẹp

S3 cho phép tạo folder ngay trong bucket:

1. Tạo folder tên **images**.
2. Mở folder **images** → **Upload** → chọn **beach.jpg** → đích đến là `images` trong bucket.
3. Object `beach.jpg` xuất hiện bên trong folder.

Trải nghiệm này rất giống các dịch vụ cloud storage quen thuộc như **Google Drive** hay **Dropbox** — cùng một cách dùng nhưng trên Amazon S3. Và để xóa, bạn chỉ cần chọn folder/object → **Delete** → gõ chữ **permanently delete** để xác nhận, thế là xong (xóa folder sẽ xóa toàn bộ nội dung bên trong).

---

Vậy là chúng ta đã tạo bucket, upload object, mở object theo hai cách, tạo và xóa folder. *Các bạn hãy tự mở console và lặp lại các bước này nhé — học qua thực hành là cách nhớ nhanh nhất.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **S3 Security và Bucket Policy** — công cụ để kiểm soát ai được truy cập bucket của bạn. Hẹn gặp lại! 🚀
