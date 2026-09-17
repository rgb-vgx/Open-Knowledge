# 📉 Savings Plan: Cam kết chi tiêu theo giờ để tiết kiệm tới 72%

> Nguồn: `216-Savings-Plan-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24696160)

Sau khi đã biết các mô hình định giá, chúng ta cùng tìm hiểu **Savings Plan** — một cách tiết kiệm chi phí mới, **đơn giản hơn hẳn** so với việc đặt trước từng loại tài nguyên. Đây là chủ đề ngắn gọn nhưng rất dễ xuất hiện trong đề thi.

---

### 🎯 Savings Plan là gì?

Thay vì reserve (đặt trước) instance cụ thể, với **Savings Plan** bạn chỉ cần **cam kết chi một khoản tiền cố định mỗi giờ** trong **1 hoặc 3 năm** tới. Điểm hay là bạn **suy nghĩ bằng đô-la**, chứ không phải bằng tài nguyên, loại instance hay cấu hình chi tiết.

*Ví dụ dễ hiểu: thay vì nói "tôi cam kết dùng 5 instance C5 trong 3 năm", bạn chỉ cần nói "tôi cam kết chi 10 USD mỗi giờ trong 3 năm tới".*

---

### 🏷️ Ba loại Savings Plan

| Loại | Phạm vi | Mức linh hoạt | Giảm giá |
|---|---|---|---|
| **EC2 Savings Plan** | Một **instance family** trong một **region** | Tùy chọn AZ, size (C5.xl hay C5.4xl), OS (Linux/Windows), tenancy (shared hoặc dedicated host) | Tới **72%** so với On-Demand |
| **Compute Savings Plan** | **EC2, Fargate và Lambda** | **Linh hoạt nhất**: không phụ thuộc family, region, size, OS, tenancy hay compute option | Tới **66%** so với On-Demand |
| **Machine Learning Savings Plan** | Các dịch vụ như **SageMaker** | Dành riêng cho workload machine learning | Tiết kiệm **28%** trong ví dụ ml.t3.large notebook |

Vài điểm cần nhớ:

* Với **EC2 Savings Plan**, nếu bạn cam kết **10 USD/giờ trong 3 năm** cho dòng **C5**, thì việc bạn chạy instance **C5.xl hay C5.4xl**, ở AZ nào, dùng Linux hay Windows, tenancy shared hay dedicated host — **đều không quan trọng**.
* Với **Compute Savings Plan**, bạn gần như không cần bận tâm nó áp dụng cho cái gì: cứ cam kết một số tiền mỗi giờ và nhận discount — áp dụng cho **EC2 instance, container Fargate và cả Lambda function**.
* Cả ba loại đều có tùy chọn trả **toàn bộ trước (all upfront), một phần (partial upfront) hoặc không trả trước (no upfront)** — trả trước càng nhiều, discount càng lớn.

---

### 🧭 Ước tính Savings Plan trước khi cam kết

AWS cho bạn công cụ để tính toán trước khi xuống tiền:

* Vào **AWS Cost Explorer console** — hệ thống sẽ **gợi ý loại Savings Plan phù hợp** với hạ tầng hiện tại của bạn.
* Trên trang **Savings Plan**, bạn chọn giữa nhóm **Compute** và **Machine Learning**, rồi tinh chỉnh **region, term length (1 hoặc 3 năm), kiểu trả trước**, và nhận về **danh sách instance khả dụng kèm mức tiết kiệm**.
* Ví dụ: với instance **a1.large**, Savings Plan cho mức giảm khoảng **31%** so với On-Demand.
* Với máy học: **SageMaker Savings Plan** có thể cho mức tiết kiệm khoảng **28%** cho **ml.t3.large notebook** chạy dài hạn.

---

### 🛒 Mua Savings Plan trên console

Khi gõ "savings plan" vào thanh tìm kiếm dịch vụ, bạn sẽ được đưa vào mục **Cost Explorer**, và từ đó có thể **purchase**:

* **Compute Savings Plan** — cho Fargate, Lambda và EC2.
* **EC2 Instance Savings Plan** — chỉ cho EC2 instance.
* **SageMaker Savings Plan** — chính là Machine Learning Savings Plan.

Quy trình mua gồm các lựa chọn:

1. **Loại Savings Plan** muốn mua.
2. **Term commitment** — 1 đến 3 năm.
3. **Purchase commitment** — ví dụ cam kết chi phí **500 USD/giờ**.
4. **Payment options** — ví dụ **Partial Upfront**, với số tiền trả trước có thể lên tới **6 triệu USD** trong ví dụ minh họa.

Sau đó màn hình sẽ hiển thị **chi phí trả trước, thanh toán hàng tháng và tổng chi phí**. Hài lòng rồi thì bạn chỉ cần **add to cart** là xong — thế là bạn đã có Savings Plan cho hạ tầng của mình.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Savings Plan khác Reserved Instance ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Savings Plan cam kết **một khoản tiền mỗi giờ** trong 1 hoặc 3 năm, thay vì cam kết về một tài nguyên cụ thể.

Giải thích: Bạn chỉ cần suy nghĩ bằng đô-la, không cần quan tâm loại instance.

Tham chiếu: Mục Savings Plan là gì.

</details>

**Câu 2:** EC2 Savings Plan cho mức giảm tối đa bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tới 72% so với On-Demand, khi cam kết một instance family trong một region.

Giải thích: Ví dụ cam kết 10 USD/giờ trong 3 năm cho dòng C5.

Tham chiếu: Mục Ba loại Savings Plan.

</details>

**Câu 3:** Compute Savings Plan áp dụng cho những dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** EC2 instances, Fargate containers và Lambda functions.

Giải thích: Đây là loại linh hoạt nhất, không phụ thuộc family, region, size, OS hay tenancy.

Tham chiếu: Mục Ba loại Savings Plan.

</details>

**Câu 4:** Các tùy chọn thanh toán của Savings Plan là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** All upfront, partial upfront hoặc no upfront — trả trước càng nhiều, discount càng lớn.

Giải thích: Cơ chế giống Reserved Instances.

Tham chiếu: Mục Ba loại Savings Plan.

</details>

**Câu 5:** Machine Learning Savings Plan dành cho dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon SageMaker.

Giải thích: Ví dụ ml.t3.large notebook có thể tiết kiệm khoảng 28% so với On-Demand.

Tham chiếu: Mục Ước tính Savings Plan trước khi cam kết.

</details>

---

Tóm gọn: **Savings Plan = cam kết chi tiêu theo giờ, linh hoạt hơn Reserved Instance**. EC2 Savings Plan giảm tới **72%**, Compute Savings Plan giảm tới **66%** và bao luôn Fargate + Lambda, còn Machine Learning Savings Plan phục vụ SageMaker. Đây là kiến thức "gọn nhưng có điểm" — nhớ con số và phạm vi áp dụng là đủ.

Bài tiếp theo chúng ta sẽ làm quen **AWS Compute Optimizer** — dịch vụ phân tích và gợi ý tài nguyên tối ưu cho workload của bạn. Hẹn gặp các bạn ở đó! 🚀
