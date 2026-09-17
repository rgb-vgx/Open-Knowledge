# 👥 Tạo IAM User & Group đầu tiên trên AWS Console

> Nguồn: `013-IAM-Users-Groups-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20281863)

Lý thuyết đã xong — giờ là lúc **thực hành**. Trong bài này, mình sẽ cùng các bạn mở **IAM console**, tạo **IAM user** đầu tiên, gom user vào **group**, rồi đăng nhập bằng tài khoản mới. Các bạn hãy mở AWS console và làm theo mình nhé.

---

### 🖥️ IAM console — dấu hiệu cho thấy đây là dịch vụ toàn cầu

Trên thanh tìm kiếm, mình gõ **IAM** để vào console. Ở **IAM Dashboard** có vài **security recommendations (khuyến nghị bảo mật)** — bài này chưa cần quan tâm.

Điều đáng chú ý: nhìn **góc trên bên phải**, vùng chọn **region bị mờ, không active**. Đó là vì **IAM là dịch vụ global** — không có region để chọn. Khi bạn tạo user trong IAM, user đó **có mặt ở mọi nơi**, trong khi nhiều console khác trong khóa học sẽ **theo region**.

---

### 👤 Tạo IAM user đầu tiên

Mục **Users** chính là nơi tạo người dùng. Đầu tiên hãy để ý: nếu bấm vào góc phải trên cùng, bạn chỉ thấy **account ID** — nghĩa là bạn đang dùng **root account**, và **dùng root không phải best practice**. Vì vậy ta tạo users, ví dụ một **admin user**, để dùng tài khoản an toàn hơn.

Các bước tạo user:

1. Đặt **username**, ví dụ **Stephane**.
2. Chọn cấp quyền truy cập **Management Console**. AWS gợi ý dùng **Identity Center**, nhưng mình chọn **IAM user** vì đơn giản hơn và **đây là lựa chọn các bạn cần biết cho kỳ thi** — điều này không ảnh hưởng gì đến khóa học.
3. Đặt **password**: nếu tạo user cho người khác, hãy để **auto-generated password** và bật yêu cầu **đổi mật khẩu ở lần đăng nhập kế tiếp**; vì đây là chính mình nên mình đặt **custom password** và bỏ tick yêu cầu đó.

---

### 👥 Gán quyền qua group admin

Sang bước permissions, ta có thể gán trực tiếp hoặc **tạo group**:

1. Tạo group tên **admin**, gắn policy **AdministratorAccess**.
2. Thêm user **Stephane** vào group admin.
3. Review lại username, quyền theo group, và **tags**.

**Tags** xuất hiện khắp AWS, là tùy chọn nhưng cho phép gắn **metadata** vào tài nguyên — ví dụ **department = engineering** cho user Stephane. Mình chỉ demo một lần để các bạn biết cách thêm tag.

User tạo thành công, ta có thể **gửi hướng dẫn đăng nhập qua email** hoặc **tải file CSV**.

---

### 🔍 Kiểm tra quyền thừa hưởng từ group

Quay lại danh sách user và mở mục **User groups**, ta thấy group **admins** có **1 user tên Stephane** và có policy **AdministratorAccess** gắn ở cấp group.

Mở user Stephane, phần **permission policies** cũng hiện quyền administrative — nhưng nó **không gắn trực tiếp**, mà **kế thừa từ group admin**. Đây chính là lý do ta đưa user vào group: **quản lý quyền đơn giản hơn nhiều**.

---

### 🔗 Account alias và đăng nhập song song

Mỗi tài khoản có **account ID** và **Sign-in URL**. Bạn có thể **tùy chỉnh URL đăng nhập** bằng **account alias (bí danh tài khoản)** — ví dụ `aws-stephane-v3` (alias phải **duy nhất**, ví dụ `v5` còn trống).

Để đăng nhập bằng user IAM, ta có thể mở **cửa sổ ẩn danh (private window)** — Chrome, Firefox, Safari đều có. Nhờ vậy ta giữ được **2 phiên AWS cùng lúc**: root ở cửa sổ thường, IAM user ở cửa sổ ẩn danh. Nếu đăng nhập cùng một cửa sổ thường, phiên trước sẽ bị ngắt.

Ở trang đăng nhập, chọn **IAM user**, nhập account ID hoặc alias, username **Stephane** cùng password. Góc phải trên cùng sẽ hiển thị **account ID + IAM user** — khác với root account chỉ hiện account ID.

⚠️ **Tuyệt đối đừng để mất thông tin đăng nhập root và admin** — nếu mất, bạn sẽ gặp rắc rối lớn và phải liên hệ AWS support, việc này mình không giúp được.

Mình khuyên các bạn **dùng IAM user thay vì root user**; đôi khi trong khóa học các bạn sẽ thấy mình dùng root, và mình sẽ nói rõ khi cần dùng loại nào. Hãy giữ **2 cửa sổ này mở** trong suốt phần tiếp theo nhé.

---

Vậy là các bạn đã tự tay tạo user, group và biết cách đăng nhập an toàn. Ở bài tiếp theo, chúng ta sẽ khám phá một tính năng mới cho phép **đăng nhập nhiều tài khoản cùng lúc trên một trình duyệt**. Hẹn gặp các bạn! 🚀
