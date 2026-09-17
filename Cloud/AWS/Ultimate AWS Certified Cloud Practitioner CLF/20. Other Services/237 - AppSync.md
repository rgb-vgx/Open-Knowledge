# ⚡ AWS AppSync — backend GraphQL thời gian thực cho mobile và web

> Nguồn: `237-AppSync.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/33532792)

Trong bài này, chúng ta cùng tìm hiểu **AWS AppSync** — dịch vụ giúp xây dựng backend cho ứng dụng mobile và web, với khả năng lưu trữ và **đồng bộ dữ liệu theo thời gian thực**. Đây cũng là một "mẹo đề thi" cực đáng nhớ: **thấy GraphQL là nghĩ tới AppSync**.

---

### 🎯 AppSync là gì?

Ý tưởng của AppSync là **xây dựng backend cho ứng dụng mobile và web**, giúp **lưu trữ và đồng bộ dữ liệu trong thời gian thực (real time)**.

AppSync tận dụng một công nghệ do **Facebook** phát triển tên là **GraphQL**. Trong đề thi, nếu các bạn thấy **GraphQL** xuất hiện, đó là gợi ý rất mạnh để chọn **AWS AppSync**.

---

### 🔗 GraphQL mang lại điều gì?

Nhờ GraphQL, AppSync cho các bạn những lợi ích rất thực tế:

* **Client code cho API được sinh tự động** — không phải viết tay.
* **Real-time subscription (đăng ký thời gian thực)** — nhận cập nhật dữ liệu cho ứng dụng web và mobile ngay lập tức.
* **Offline data synchronization (đồng bộ dữ liệu ngoại tuyến)** — hỗ trợ khi người dùng cần làm việc mà không có kết nối.
* **Built-in security (bảo mật tích hợp sẵn)**.

---

### ⚙️ Tích hợp với DynamoDB, Lambda và Amplify

Để xây dựng backend GraphQL này, AppSync tích hợp với các dịch vụ quen thuộc:

* **DynamoDB** — lưu trữ dữ liệu.
* **Lambda** — xử lý logic.

Và trong bài tiếp theo, chúng ta sẽ gặp framework **AWS Amplify** — công cụ có thể **tận dụng AppSync ở hậu trường** nếu các bạn muốn xây backend GraphQL với Amplify.

*Nhớ giúp mình: AppSync = lưu trữ và đồng bộ dữ liệu cho mobile/web bằng GraphQL. Chỉ cần vậy là đủ cho kỳ thi.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** AWS AppSync xây dựng backend dựa trên công nghệ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** GraphQL — công nghệ do Facebook phát triển.

Giải thích: AppSync dùng GraphQL để lưu trữ và đồng bộ dữ liệu trong thời gian thực.

Tham chiếu: Mục AppSync là gì.

</details>

**Câu 2:** Trong đề thi, thấy từ khóa GraphQL thì nên nghĩ tới dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS AppSync.

Giải thích: GraphQL là gợi ý rất mạnh cho AppSync trong đề.

Tham chiếu: Mục AppSync là gì.

</details>

**Câu 3:** Nhờ GraphQL, client code cho API của bạn như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Được sinh tự động (generated automatically).

Giải thích: Đây là một trong những lợi ích chính mà GraphQL mang lại.

Tham chiếu: Mục GraphQL mang lại điều gì.

</details>

**Câu 4:** AppSync tích hợp với hai dịch vụ AWS nào để xây backend GraphQL?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** DynamoDB và Lambda.

Giải thích: DynamoDB lưu trữ dữ liệu, Lambda xử lý logic.

Tham chiếu: Mục Tích hợp với DynamoDB, Lambda và Amplify.

</details>

**Câu 5:** Hai tính năng nổi bật mà GraphQL đem lại cho ứng dụng web/mobile là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Real-time subscription và offline data synchronization.

Giải thích: Kèm theo đó là built-in security.

Tham chiếu: Mục GraphQL mang lại điều gì.

</details>

---

Vậy là các bạn đã nắm AppSync: backend GraphQL cho mobile/web, đồng bộ real time và offline, tích hợp DynamoDB/Lambda. Ở bài tiếp theo, chúng ta sẽ gặp **AWS Amplify** — bộ công cụ full-stack có thể dùng AppSync ở hậu trường. Hẹn gặp lại! 🚀
