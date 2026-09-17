# 🧪 Lambda Hands-On: Tạo, test và giám sát function đầu tiên

> Nguồn: `113-Lambda-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056026)

Đã đến lúc **thực hành Lambda**! Trong bài này, mình sẽ dẫn các bạn đi từ giao diện demo trực quan, tạo function đầu tiên, test, xem log đến chỉnh cấu hình. *Các bạn hãy mở AWS console và làm theo nhé — học qua thực hành luôn là cách nhớ lâu nhất.*

---

### 🧭 Khám phá giao diện demo của Lambda

Khi vào **Lambda console**, các bạn có thể được đưa tới một URL demo (thêm `/begin` vào địa chỉ) — mình rất thích giao diện nhỏ này vì nó trực quan hóa cách Lambda hoạt động.

* Đầu tiên là hình minh họa **Lambda function** với các ngôn ngữ có thể viết: **.NET, Java, Node.js, Python, Ruby**, hoặc **custom runtime** cho ngôn ngữ khác.
* Chọn **Node.js** rồi bấm **Run** → nhận ngay kết quả **"Hello from Lambda"**.
* Tiếp theo bấm **Lambda Responds to Events**: bạn thấy các **nguồn sự kiện (event triggers)** có thể kích hoạt function — ví dụ **streaming analytics** đang gửi dữ liệu vào Lambda.
* Thử bấm vào biểu tượng **điện thoại, camera**... bạn sẽ thấy function **scale lên** — từ 1 cặp bánh răng lên **8-9 cặp**. Đây chính là minh chứng cho khả năng **scale mượt mà** của Lambda mà không cần quản lý server.
* Lambda phản ứng với sự kiện từ nhiều nguồn: streaming analytics, **mobile/IoT backend**, hay **ảnh được thả vào S3 bucket** và Lambda xử lý theo thời gian thực.
* Phần này cũng cho thấy: càng nhiều sự kiện, **invocation càng tăng** — lúc đầu nằm trong **free tier**, nhưng khi lượng event lớn lên thì **chi phí bắt đầu tích lũy**. Lambda rẻ, nhưng bạn cần **ước lượng workload** của mình.

---

### 🛠️ Tạo function HelloWorld từ blueprint

1. Bấm **Create a Function**, chọn dùng **blueprint**.
2. Chọn blueprint **hello world** và ngôn ngữ **Python** (phiên bản Python nào cũng được).
3. Đặt tên function là **HelloWorld**.
4. Phần **execution role**: function cần một role để chạy — **tương tự role bạn gán cho EC2 instance, nhưng lần này dành cho Lambda function**. Mình chọn **tạo role mới với basic Lambda permissions**.
5. Bấm tạo — **function code sẽ được sinh tự động**.

Sau khi tạo xong, bạn sẽ thấy code ngay trên màn hình. Trong code có:

* Phần **handler** — thứ được gọi khi một event được truyền vào, với các giá trị `value1`, `value2`, `value3`...
* Function **trả về key đầu tiên của event**.

*Bạn không cần biết lập trình để hiểu bài này* — chỉ cần biết đây là đoạn code sẽ chạy mỗi khi function được gọi.

---

### ▶️ Test function và đọc kết quả

* Bấm **Test** → function chạy thành công và trả về **value1**.
* Phía dưới là **input JSON** — template hello-world với `key1, value1`, `key2, value2`, `key3, value3` được truyền vào function.
* Function trả về **log** cho thấy nó đã thực thi thành công.
* Thử phá lỗi: **xóa một key** đi rồi test → code sẽ **fail** vì không biết xử lý exception đó. Thêm key trở lại, test lại là chạy bình thường.
* Bạn có thể **lưu test event** (đặt tên HelloWorld) và test lại bao nhiêu lần tùy thích.

---

### 📊 Giám sát với CloudWatch Logs

Lambda có sẵn mục **Monitor**. Tại đây bạn thấy **invocations** từ **CloudWatch** cùng các thống kê — *lưu ý là số liệu cần chút thời gian mới hiển thị, cứ chạy function rồi đợi một lát nhé.*

* Bấm **View CloudWatch Logs** để xem log của function.
* Trong **log stream**, bạn thấy lần chạy thành công (`value1` bằng 1...) và cả **lỗi** đã xảy ra khi mình cố tình trigger thất bại.
* Điều này rất tiện: bạn có thể **debug function trực tiếp từ CloudWatch logs**.

---

### ⚙️ Configuration, permissions và triggers

Phần **Configuration** chứa cấu hình chung của function:

* **Memory** — có thể đặt rất lớn hoặc rất nhỏ.
* **Ephemeral storage (lưu trữ tạm thời)**.
* **Timeout** — thời gian chạy tối đa trước khi bị coi là thất bại.
* **Execution role** — bấm vào bạn sẽ thấy role này cho phép function **truy cập CloudWatch**; quyền của nó xoay quanh **CloudWatch Logs**, cho phép function ghi log. Nếu muốn function tương tác với **Amazon S3**, bạn chỉ cần **sửa IAM role này và thêm quyền**.

Trong tab **Permissions**: bạn thấy **role summary**, rõ ràng **CloudWatch Logs được phép** với 3 action, và có thể xem theo **resource** hoặc theo **action**.

Trong tab **Triggers**: hiện tại chưa có trigger nào. Bấm **Add trigger** để xem **tất cả nguồn sự kiện** có thể kích hoạt Lambda — gồm các dịch vụ **AWS** lẫn **partner events**. **Amazon S3** là một trong những use case chính: bạn chỉ cần chọn bucket và event type. *Phần này hơi nâng cao, chúng ta sẽ khám phá sau.*

---

Vậy là các bạn đã đi hết một vòng hoạt động của Lambda từ đầu đến cuối. Đây là dịch vụ rất đầy đủ tính năng nên còn nhiều thứ để khám phá, nhưng chừng này là đủ cho phần nhập môn. Ở bài tiếp theo, chúng ta sẽ học cách **đưa Lambda ra thế giới bên ngoài bằng API Gateway**. Hẹn gặp các bạn! 🚀
