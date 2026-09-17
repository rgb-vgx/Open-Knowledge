# 🧪 Thực hành Bucket Policy: Đưa object S3 ra public đúng cách

> Nguồn: `071-S3-Security-Bucket-Policy-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055920)

Trong bài này, chúng ta sẽ thực hành điều đã học: **gắn bucket policy để public file coffee.jpg** và truy cập nó từ public URL. Đây là thao tác cần thận trọng — mình sẽ chỉ rõ lúc nào thì được phép làm.

---

### ⚠️ Bước 1: Tắt Block Public Access

Vào bucket → tab **Permissions**. Việc đầu tiên là **allow public access từ bucket setting**, vì hiện tại mọi thứ đang bị chặn:

1. Bấm **Edit** ở phần Block public access.
2. Bỏ tick chặn public access.
3. Xác nhận **Yes** — vì đây là hành động **nguy hiểm**.

*Chỉ tắt setting này khi và chỉ khi bạn biết mình muốn gắn bucket policy public.* Nếu bucket đang chứa dữ liệu thật của công ty mà bạn public nhầm, hậu quả là **rò rỉ dữ liệu** — không bao giờ là điều tốt.

Sau bước này, ở **Permissions overview**, bạn sẽ thấy trạng thái cho biết **objects can be public**.

---

### 🧾 Bước 2: Tạo bucket policy bằng Policy Generator

Kéo xuống phần **Bucket policy** — hiện tại chưa có policy nào. Các bạn có thể tham khảo **policies example** (tài liệu AWS) vốn liệt kê nhiều use case kèm policy tương ứng. Nhưng trong bài này, chúng ta dùng **AWS Policy Generator**.

Các bước tạo policy:

1. Chọn loại policy: **S3 Bucket Policy**.
2. **Effect**: **Allow**.
3. **Principal**: `*` — cho phép **bất kỳ ai** trên dịch vụ Amazon S3.
4. **Action**: **GetObject** — vì chúng ta muốn đọc object trong bucket.
5. **Amazon Resource Name (ARN)**: lấy **bucket ARN** trong S3 (copy từ trang bucket) rồi thêm **dấu slash** và **dấu `*`**.

Vì sao phải thêm `/*`? Vì action `GetObject` áp dụng cho **các object bên trong bucket** — object nằm sau dấu slash, và dấu `*` đại diện cho mọi object.

6. Bấm **Add statement** → **Generate policy** → copy JSON sinh ra → dán vào ô bucket policy → **Save changes**. *(Lưu ý nhỏ: nhớ xóa khoảng trắng thừa nếu có trước khi lưu.)*

Vậy là policy đã được áp dụng thành công. Ý nghĩa của nó: **GetObject được phép cho mọi người, trên mọi object của bucket này**.

---

### ✅ Bước 3: Kiểm tra object đã public

Quay lại object **coffee.jpg**, copy **object URL** và dán vào trình duyệt. Bây giờ ảnh coffee đã **hiển thị đầy đủ** — nó đã public, và mọi object khác trong bucket cũng vậy. Public URL đã hoạt động.

---

Vậy là chúng ta đã tắt Block Public Access, tạo bucket policy bằng Policy Generator và khiến object trở nên public. *Nhớ kỹ nhé: chỉ làm điều này với dữ liệu bạn thực sự muốn công khai.*

Ở bài tiếp theo, chúng ta sẽ dùng S3 để **host một static website**. Hẹn gặp lại! 🚀
