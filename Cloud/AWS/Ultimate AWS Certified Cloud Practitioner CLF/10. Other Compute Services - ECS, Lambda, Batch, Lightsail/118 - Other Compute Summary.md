# 🎯 Tổng kết Other Compute: ECS, Lambda, Batch và Lightsail

> Nguồn: `118-Other-Compute---Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260646)

Chúng ta vừa đi hết một loạt dịch vụ compute mới. Bài này mình sẽ **tóm tắt tất cả** để bạn có một bức tranh gọn gàng trước khi bước sang section tiếp theo. Đây là bài ôn cực kỳ đáng giá cho kỳ thi!

---

### 🐳 Docker, ECS, Fargate và ECR

* **Docker** là công nghệ **container** cho phép bạn chạy ứng dụng.
* **ECS** cho phép chạy Docker container **trên EC2 instance — nhưng bạn phải provision instance từ trước**.
* **Fargate** cũng chạy Docker container, nhưng **không cần provision hạ tầng** — mọi thứ diễn ra trong suốt với bạn. Đây là một **offering serverless** vì bạn không quản lý EC2 instance nào.
* **ECR** là **Private Docker Images Repository** — nơi lưu Docker image của bạn trên AWS.

---

### 🐑 Lambda — function as a service

**Lambda** là dịch vụ **serverless** mang đến khả năng **Function as a Service** với **khả năng scale liền mạch**: từ **1 invocation đến hàng nghìn invocation mỗi giây**, và **hoàn toàn reactive (phản ứng theo sự kiện)**.

* **Pricing của Lambda** gồm hai thành phần: **thời gian chạy × lượng memory được cấp** cho function, cộng với **số lần function được gọi**.
* **Ngôn ngữ**: hỗ trợ rất nhiều ngôn ngữ lập trình khác nhau.
* **Container image**: Lambda có hỗ trợ, nhưng bạn phải implement một **runtime API** cụ thể. Nói cách khác, Lambda **không hỗ trợ Docker image tùy tiện** — muốn chạy Docker image, hãy dùng **ECS và Fargate**. Chỉ khi Docker image của bạn implement đúng **Lambda container Runtime API** thì mới chạy được trên Lambda, *nhưng đây không phải trường hợp tiêu chuẩn*.
* **Thời gian invocation tối đa: 15 phút**.
* **Use case**: tạo **thumbnail cho ảnh upload lên Amazon S3**, hoặc chạy **serverless cron job**.

---

### 📦 Batch và 🧭 Lightsail

* **Batch** cho phép chạy **batch job trên AWS** thông qua một tập hợp **EC2 instance được quản lý**. Đặc biệt: **Batch chạy trên nền dịch vụ ECS**.
* **Lightsail** là dịch vụ dành cho các **ứng dụng đơn giản với giá dễ đoán, giá thấp** cùng công nghệ database đơn giản. Nó **rất có thể chỉ là distractor trong đề thi** — nhưng nhờ bài hands-on, bạn đã biết chính xác dịch vụ này hoạt động ra sao.

---

### 🚪 API Gateway — cánh cửa ra thế giới

Muốn **expose Lambda function thành API**, ta dùng thêm một dịch vụ serverless nữa: **API Gateway**. Dịch vụ này cho phép biến function thành **HTTP API**, đồng thời cung cấp các khả năng về **security (bảo mật), throttling (giới hạn tần suất gọi), API keys**...

---

### 📊 Bảng tổng hợp nhanh

| Dịch vụ | Vai trò chính |
|---|---|
| ECS | Chạy Docker container trên EC2 instance do bạn tự tạo |
| Fargate | Chạy Docker container không cần quản lý hạ tầng, serverless |
| ECR | Kho lưu Docker image riêng tư trên AWS |
| Batch | Chạy batch job trên các EC2 instance được quản lý, chạy trên nền ECS |
| Lightsail | Ứng dụng đơn giản, giá thấp dễ đoán, thường là distractor |
| Lambda | Function as a Service, serverless, scale mượt, reactive |
| API Gateway | Expose Lambda thành HTTP API serverless |

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Muốn chạy Docker container mà không phải quản lý EC2 instance, bạn chọn gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Fargate.

Giải thích: Fargate là offering serverless, không cần provision hạ tầng.

Tham chiếu: Mục Docker, ECS, Fargate và ECR.

</details>

**Câu 2:** Docker image riêng tư của bạn được lưu ở đâu trên AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon ECR — Private Docker Images Repository.

Giải thích: ECR là nơi ECS/Fargate đọc image để chạy container.

Tham chiếu: Mục Docker, ECS, Fargate và ECR.

</details>

**Câu 3:** Pricing của Lambda dựa trên những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Số lần gọi (calls) và thời gian chạy (duration) × lượng memory.

Giải thích: Đây là hai thành phần cấu thành chi phí Lambda.

Tham chiếu: Mục Lambda — function as a service.

</details>

**Câu 4:** Batch chạy trên nền dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** ECS.

Giải thích: Batch chạy batch job trên tập hợp EC2 instance được quản lý, nền tảng là ECS.

Tham chiếu: Mục Batch và Lightsail.

</details>

**Câu 5:** Dịch vụ nào giúp expose Lambda thành HTTP API?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** API Gateway.

Giải thích: API Gateway cung cấp HTTP API, kèm security, throttling, API keys.

Tham chiếu: Mục API Gateway — cánh cửa ra thế giới.

</details>

---

Vậy là xong section **Other Compute Services**! Bạn đã nắm trong tay ECS, Fargate, ECR, EKS, Lambda, API Gateway, Batch và Lightsail — một bộ công cụ compute cực kỳ mạnh mẽ. Hãy dành chút thời gian ôn lại bảng tổng hợp phía trên trước khi bước sang section tiếp theo. *Cứ từng bước một, mình tin các bạn sẽ đi hết chặng đường này!* Hẹn gặp các bạn ở section sau! 🚀
