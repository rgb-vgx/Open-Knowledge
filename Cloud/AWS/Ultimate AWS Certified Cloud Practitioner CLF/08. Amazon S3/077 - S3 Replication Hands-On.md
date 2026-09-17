# 🧪 Thực hành S3 Replication: Thiết lập CRR từ EU sang US

> Nguồn: `077-S3-Replication-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20207498)

Bài này chúng ta sẽ thực hành **replication** trên Amazon S3: tạo bucket nguồn, bucket đích, thiết lập replication rule và xem dữ liệu được nhân bản như thế nào. Nhớ kỹ: **versioning là điều kiện tiên quyết**.

---

### 🪣 Bước 1: Tạo bucket nguồn và bucket đích

1. Tạo bucket **origin**: `S3 Stephane bucket origin V2` ở region **EU west 1 (Ireland)** — đây sẽ là bucket nguồn.
2. **Bật versioning** ngay khi tạo — vì replication chỉ hoạt động khi versioning được bật.
3. Tạo bucket **target**: `S3 Stephane bucket replica V2`. Region có thể **giống** (nếu muốn SRR) hoặc **khác hoàn toàn** — mình chọn **US east 1** để replicate từ châu Âu sang Mỹ.
4. **Bật bucket versioning** trên bucket target.

---

### 📤 Bước 2: Upload file và tạo replication rule

Mình upload file **beach.jpeg** vào bucket origin. Lưu ý: **file này chưa được replicate** vì chúng ta chưa thiết lập rule.

Vào bucket origin → tab **Management** → kéo xuống **Replication rules** (đang là 0) → **Create replication rule**:

1. Đặt tên rule: **demo replication rule**, trạng thái **Enabled**.
2. **Source bucket**: giữ nguyên.
3. **Rule scope**: áp dụng cho **tất cả object** trong bucket.
4. **Destination**: chọn bucket **trong account này** → dán tên bucket target vào.
5. Hệ thống nhận diện destination region là **US east 1** — xác nhận đây là **cross-region replication**.
6. **IAM role**: chọn **create a new role** (các setting khác chưa cần quan tâm).
7. **Save**.

Một câu hỏi xuất hiện: *"Do you want to replicate existing objects?"* — Điều quan trọng cần biết:

* Replication **chỉ áp dụng từ thời điểm bạn thiết lập** — tức là các upload **mới**.
* Nếu muốn replicate các object **cũ** từ trước, bạn cần dùng **S3 batch operation** — một tính năng tách biệt với replication.

Trong demo, mình chọn **No — không replicate existing objects**.

---

### ✅ Bước 3: Kiểm tra nhân bản

Bây giờ cùng kiểm chứng:

1. Refresh bucket replica → các object **chưa được replicate** (đúng như dự kiến, vì không replicate existing objects).
2. Upload file mới **coffee.jpeg** vào origin bucket → xem version ID là **GBK**.
3. Quay lại bucket target, refresh — quá trình mất khoảng **5 giây** (lần replication đầu tiên mất khoảng **10 giây**).
4. `coffee.jpeg` đã xuất hiện trong bucket replica, và **version ID giống hệt** bucket origin — version được replicate nguyên vẹn.

Thử với `beach.jpeg`: vì file này đã tồn tại từ trước, mình cần **upload một version mới** của nó:

1. Upload lại `beach.jpeg` → có version mới **DK2**.
2. Refresh bucket target một lúc sau → version **DK2** của file cũng đã được nhân bản.

---

Vậy là các bạn đã hoàn thành một kịch bản **cross-region replication** hoàn chỉnh: từ EU sang US, với version ID được giữ nguyên. *Hãy nhớ hai điều: bật versioning ở cả hai bucket và replication chỉ áp dụng cho object mới — object cũ cần S3 batch operation.*

Ở bài tiếp theo, chúng ta sẽ học các **S3 Storage Classes** — từ Standard đến Glacier. Hẹn gặp lại! 🚀
