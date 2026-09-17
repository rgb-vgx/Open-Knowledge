# 🗝️ Amazon Cognito: Danh tính cho hàng triệu người dùng web và mobile

> Nguồn: `229-Cognito-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20587288)

Nếu các bạn đang xây một **ứng dụng web hoặc mobile** và cần một cách quản lý người dùng trên AWS, thì **Amazon Cognito** chính là câu trả lời. Bài này khá ngắn nhưng đây là kiến thức "ăn điểm" rất dễ nhớ trong đề thi.

---

### 🎯 Vì sao cần Cognito?

**Amazon Cognito** là cách để các bạn cung cấp **identity (danh tính)** cho **người dùng của ứng dụng web và mobile**.

* Ứng dụng của bạn có thể có **hàng triệu user** đang sử dụng.
* Những user này cần đăng nhập, nhưng **bạn không nên tạo IAM user cho họ**.
* Thay vào đó, bạn tạo user cho ứng dụng web/mobile **trong Cognito**.

---

### ⚠️ IAM user không dành cho người dùng ứng dụng

Đây là phân biệt cực kỳ quan trọng mà đề thi rất hay khai thác:

* **IAM user** chỉ dành cho **người thuộc công ty bạn**, những người cần **dùng AWS trực tiếp**.
* **Cognito user** dành cho **khách hàng/người dùng cuối** của ứng dụng web và mobile.

*Nếu từng băn khoăn "khi nào dùng IAM, khi nào dùng Cognito" thì đây chính là câu trả lời: đừng bao giờ biến hàng triệu khách hàng thành IAM user.*

---

### 🗄️ Cognito hoạt động như thế nào?

Ở phiên bản đơn giản hóa, luồng hoạt động như sau:

* **Amazon Cognito** có **database user riêng bên trong** — có thể chứa **hàng triệu user**.
* Ứng dụng mobile và web **tích hợp login** trực tiếp vào Amazon Cognito.
* Khi user đăng nhập thành công, họ sử dụng được ứng dụng của bạn.

```mermaid
flowchart LR
    A[Người dùng cuối] --> B[Ứng dụng Web hoặc Mobile]
    B --> C[Amazon Cognito]
    C --> D[Database user của Cognito]
```

---

### 🔗 Đăng nhập bằng Facebook, Google, Twitter

Cognito cũng chính là thứ đứng sau các nút **"login with Facebook / Google / Twitter"** mà các bạn thấy trên nhiều website.

* User bấm nút đăng nhập mạng xã hội.
* Họ được **redirect (chuyển hướng) sang Google hoặc Facebook** để xác thực.
* Sau đó quay lại ứng dụng — tất cả đều được Cognito xử lý.

Vì vậy, nếu bạn đang nghĩ tới việc xây ứng dụng web/mobile và muốn **quản lý user trên AWS**, hãy chọn **Cognito** — đó là dịch vụ dành cho bạn.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Cognito dùng để cung cấp danh tính cho đối tượng nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Người dùng của ứng dụng web và mobile — có thể lên tới hàng triệu user.
Giải thích: Cognito không dành cho nhân viên nội bộ dùng AWS trực tiếp.
Tham chiếu: Mục Vì sao cần Cognito.

</details>

**Câu 2:** Vì sao không nên tạo IAM user cho người dùng ứng dụng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì IAM user chỉ dành cho người thuộc công ty bạn và cần dùng AWS trực tiếp.
Giải thích: Khách hàng của ứng dụng nên được quản lý trong Cognito.
Tham chiếu: Mục IAM user không dành cho người dùng ứng dụng.

</details>

**Câu 3:** Dữ liệu user của Cognito được lưu ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trong database user nội bộ của Amazon Cognito.
Giải thích: Cơ sở dữ liệu này có thể chứa hàng triệu user.
Tham chiếu: Mục Cognito hoạt động như thế nào.

</details>

**Câu 4:** Cognito hỗ trợ đăng nhập qua những mạng xã hội nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Facebook, Google và Twitter.
Giải thích: User được redirect sang các nền tảng này để xác thực rồi quay lại ứng dụng.
Tham chiếu: Mục Đăng nhập bằng Facebook, Google, Twitter.

</details>

**Câu 5:** Bạn muốn xây ứng dụng web/mobile và quản lý hàng triệu user trên AWS — chọn dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Cognito.
Giải thích: Đây là từ khóa nhận diện nhanh trong đề thi.
Tham chiếu: Mục Vì sao cần Cognito.

</details>

---

Vậy là xong **Amazon Cognito** — dịch vụ quản lý danh tính cho người dùng ứng dụng của bạn, chứ không phải cho nhân viên công ty. *Chỉ cần phân biệt rõ IAM user và Cognito user là các bạn đã nắm được điểm thi này.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **AWS Directory Services** và cách đưa **Microsoft Active Directory** lên AWS. Hẹn gặp các bạn! 🚀
