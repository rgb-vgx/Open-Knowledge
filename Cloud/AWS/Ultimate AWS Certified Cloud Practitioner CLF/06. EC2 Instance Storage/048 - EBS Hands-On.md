# 🧪 Thực hành EBS: tạo, attach và xóa volume trong vài giây

> Nguồn: `048-EBS-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055776)

Được rồi, lý thuyết đã đủ — giờ là lúc mở AWS console và làm việc trực tiếp với **EBS volume**. Chúng ta sẽ xem volume đang gắn với instance, tạo volume mới, attach nó, rồi tự tay chứng minh ràng buộc Availability Zone. *Cứ làm theo từng bước, không cần vội nhé!*

---

### 🔍 Bước 1: Xem EBS volume đang gắn với instance

1. Vào **EC2 → Instances**, click vào instance của bạn.
2. Mở tab **Storage** — bạn sẽ thấy **root device** cùng một **block device**: một volume **8 GB** đang gắn vào instance.
3. Click vào volume đó để mở giao diện **Volumes** của AWS: volume tồn tại, trạng thái **in use**, gắn với đúng instance của bạn.
4. Lần sau, để mở nhanh danh sách volume, chỉ cần vào menu bên trái và chọn **Volumes**.

---

### 🆕 Bước 2: Tạo volume thứ hai đúng Availability Zone

1. Bấm **Create volume** — bạn có nhiều loại để chọn như **GP2, GP3**... Ở đây mình chọn **GP2, dung lượng 2 GB**.
2. Về **Availability Zone**, bắt buộc phải chọn đúng nơi instance đang chạy. Mình vào instance, mở phần **Networking** và thấy nó đang ở **eu-west-1b**.
3. Vậy volume mới cũng phải tạo ở **eu-west-1b** — vì **EBS volume bị ràng buộc theo AZ**.
4. Bấm **Create volume**. Volume lúc này ở trạng thái **available** và chưa được attach.

---

### 🔗 Bước 3: Attach volume vào instance

1. Chọn volume vừa tạo → **Actions → Attach volume**.
2. Chọn instance đang chạy → bấm **Attach volume**.
3. Refresh lại trang: vào tab **Storage** của instance, phần **Block devices** giờ đã có **2 block devices** — một volume 8 GB và một volume 2 GB.

*Lưu ý nhỏ: để dùng được block device mới còn cần format và mount — việc này nằm ngoài phạm vi khóa học. Nếu cần, các bạn cứ tìm tài liệu AWS hướng dẫn make an Amazon EBS volume available to use on Linux nhé.*

---

### 🗺️ Bước 4: Tự tay chứng minh EBS khóa theo AZ

1. Tạo thêm một volume **2 GB GP2**, nhưng lần này chọn AZ **eu-west-1a** — khác với instance đang ở **eu-west-1b**.
2. Vào **Actions → Attach volume**: bạn sẽ **không thể chọn instance của mình**, vì instance nằm ở AZ khác.
3. Đây chính là bằng chứng sống động: **EBS volume bị bound bởi một Availability Zone duy nhất**.
4. Thử **Actions → Delete volume** cho volume này — nó biến mất ngay lập tức. Đó chính là sức mạnh của cloud: tạo và xóa volume chỉ trong vài giây.

---

### ⚠️ Bước 5: Terminate instance — volume nào còn, volume nào mất?

Trong tab **Storage → Block devices**, kéo bảng sang phải để xem cột **delete on termination**:

| Volume | Dung lượng | Delete on Termination | Sau khi terminate |
|---|---|---|---|
| Root volume | 8 GB | Yes (mặc định) | Bị xóa |
| Volume gắn thêm | 2 GB | No (mặc định) | Được giữ lại |

Khi launch instance, ở phần storage → **advanced**, bạn cũng thấy root volume 8 GB với delete on termination mặc định là **yes**, và có thể đổi thành **no** nếu muốn giữ lại.

Giờ thì terminate instance: trạng thái báo **successfully terminated**. Refresh danh sách **Volumes** — volume 8 GB chuyển sang available rồi **biến mất**, chỉ còn volume 2 GB. Bên EC2 console, instance đầu tiên đã ở trạng thái terminated.

---

Vậy là các bạn đã thực hành xong những thao tác EBS cơ bản nhất: xem, tạo, attach và xóa volume. *Điểm cần nhớ: volume chỉ gắn được đúng AZ của nó, và root volume mặc định bị xóa khi terminate.*

Ở bài tiếp theo, chúng ta sẽ học cách **backup dữ liệu với EBS Snapshots**. Hẹn gặp các bạn ở đó! 🚀
