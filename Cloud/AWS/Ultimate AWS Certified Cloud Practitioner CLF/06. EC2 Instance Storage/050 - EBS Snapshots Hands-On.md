# 🧪 Thực hành EBS Snapshots: backup, nhân bản và Recycle Bin

> Nguồn: `050-EBS-Snapshots-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055802)

Chúng ta đang có một **EBS volume 2 GB loại GP2** ở trạng thái available — hoàn hảo để thực hành **snapshot**. Mình sẽ cùng các bạn tạo backup, copy sang region khác, dựng volume mới từ snapshot và thử luôn **Recycle Bin**. *Làm theo từng bước là các bạn nắm ngay!*

---

### 📸 Bước 1: Tạo snapshot từ volume

1. Chọn volume → **Actions → Create snapshot**.
2. Thêm **Description**, ví dụ "DemoSnapshots", rồi bấm **Create snapshot**.
3. Vào menu bên trái, chọn **Snapshots** để xem danh sách: snapshot của bạn đã ở đó với trạng thái **Completed, 100% Available**.

---

### 🌍 Bước 2: Copy snapshot sang region khác

* Right-click snapshot → **Copy snapshot**.
* Chọn bất kỳ **destination region** mà bạn muốn.
* Tính năng này cực hữu ích cho **Disaster Recovery Strategy (chiến lược khôi phục thảm họa)** — đảm bảo dữ liệu được backup ở một region khác của AWS. Mình không thực hiện luôn trong demo, nhưng các bạn đã nắm được ý tưởng.

---

### 💾 Bước 3: Tạo volume mới từ snapshot

1. Chọn snapshot → **Actions → Create volume from snapshot**.
2. Chọn volume **2 GB GP2**.
3. Điểm hay nhất: **AZ đích không nhất thiết phải là eu-west-1a** — bạn có thể chọn **eu-west-1b**, tức là đã "copy" volume xuyên Availability Zone.
4. Bạn cũng có thể **encrypt** volume và thêm **Tags** nếu muốn.
5. Bấm **Create volume** → quay lại **Volumes**: giờ có **2 volumes**, một trong số đó là bản restore từ snapshot, nằm ở **eu-west-1b**.

---

### ♻️ Bước 4: Recycle Bin và Retention Rule

**Recycle Bin** bảo vệ EBS Snapshots (và cả **Amazon Machine Images**) khỏi việc xóa nhầm:

1. Mở **Recycle Bin** → **Create Retention Rule**, đặt tên "DemoRetentionRule".
2. Chọn **EBS Snapshots**.
3. **Apply to all resources**, giữ lại trong **1 ngày**.
4. **Rule Lock Setting**: để **unlocked** để còn có thể xóa rule khi muốn.
5. Bấm **Create Retention Rule** — sau đó có thể xem **Resources** đang nằm trong bin.

---

### 🗄️ Bước 5: Storage Tiers và khôi phục snapshot

* Snapshot hiện đang ở **Standard Storage Tier**; bạn có thể **Archive snapshot** để chuyển sang **pricing level khác** — đổi lại, muốn restore sẽ phải chờ **24 đến 72 giờ**.
* Giờ thử xóa snapshot: nó biến mất khỏi danh sách. Trước đây là mất vĩnh viễn, **nhưng nhờ Recycle Bin**, refresh **Resources** là bạn thấy snapshot đã nằm trong bin.
* Click vào snapshot → **Recover Resources** → nó quay trở lại danh sách Snapshots trong EC2 console. *Khá ấn tượng phải không nào?*

---

Vậy là các bạn đã biết tạo snapshot, copy xuyên region, restore thành volume ở AZ khác và tự bảo vệ mình bằng Recycle Bin. *Nhớ nhé: snapshot là backup — nhưng còn là "cầu nối" di chuyển volume giữa các vùng.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **AMI (Amazon Machine Image)** — khuôn mẫu để khởi tạo EC2 instance. Hẹn gặp các bạn ở đó! 🚀
