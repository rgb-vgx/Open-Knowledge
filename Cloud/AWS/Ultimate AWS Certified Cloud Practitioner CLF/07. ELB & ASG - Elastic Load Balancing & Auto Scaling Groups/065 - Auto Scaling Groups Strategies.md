# 🧠 Bốn chiến lược scaling của ASG mà đề thi rất thích hỏi

> Nguồn: `065-Auto-Scaling-Groups-ASG-Strategies.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/26623486)

Chúng ta đã biết ASG hoạt động thế nào, giờ hãy xem **các chiến lược scaling (scaling strategy)** khác nhau. Đây là nhóm kiến thức gọn gàng nhưng rất dễ vào đề — đặc biệt là **Predictive Scaling**, giảng viên khẳng định chắc chắn sẽ xuất hiện trong đề thi. Cùng điểm qua từng chiến lược nhé.

---

### 🖐️ Manual Scaling — tự tay điều chỉnh

Đơn giản nhất: **bạn cập nhật kích thước ASG bằng tay**, ví dụ đổi capacity từ 1 lên 2, hoặc từ 2 về 1.

---

### 🔔 Dynamic Scaling — phản ứng theo nhu cầu

Trong Dynamic Scaling có hai kiểu policy là **Simple Scaling** và **Step Scaling**. Ý tưởng: mỗi khi một **CloudWatch alarm** kích hoạt, bạn thêm/bớt một số unit capacity.

* Khi **CPU utilization trung bình của tất cả EC2 instance vượt 70% trong 5 phút** → thêm **2 unit** capacity vào ASG.
* Khi **CPU utilization dưới 30% trong 10 phút** → bớt **1 unit** capacity trong ASG.

Cách này gọi là simple/step vì **bạn định nghĩa trigger, rồi định nghĩa số unit thêm/bớt**.

---

### 🎯 Target Tracking Scaling — giữ metric quanh mục tiêu

Cách dễ nhất để định nghĩa scaling policy: bạn chỉ cần nói "mình muốn **CPU trung bình của tất cả EC2 instance trong ASG luôn quanh mức 40%**", và ASG sẽ tự scale để giữ đúng mục tiêu đó.

---

### ⏰ Scheduled Scaling — biết trước tương lai

Khi thay đổi tải **đã biết trước theo pattern người dùng**, bạn lên lịch scaling. Ví dụ: "5 giờ chiều thứ Sáu người ta chuẩn bị cá cược thể thao trước trận bóng đá, hãy **tăng minimum capacity lên 10 EC2 instance vào 5 giờ chiều thứ Sáu**".

---

### 🤖 Predictive Scaling — Machine Learning dự báo tải

Đây là chiến lược **dùng Machine Learning (học máy) dự đoán traffic tương lai**: các thuật toán sẽ nhìn vào pattern traffic trong quá khứ để dự báo điều gì sắp xảy ra. Ví dụ tải của bạn mỗi ngày đều đạt đỉnh trong **3 giờ** — Predictive Scaling sẽ nhận diện và **tự provision đúng số EC2 instance từ trước** để khớp với giai đoạn dự báo.

Rất hợp khi bạn có **time-based pattern** và muốn scaling **không cần can thiệp**, vận hành tự động nhờ Machine Learning. *Đây là chiến lược chắc chắn có trong đề thi, các bạn nhớ kỹ nhé.*

| Chiến lược | Cách hoạt động | Ví dụ |
|---|---|---|
| Manual | Tự cập nhật kích thước | Đổi capacity 1 → 2 |
| Dynamic — Simple/Step | Theo CloudWatch alarm | CPU > 70% trong 5 phút → +2 unit |
| Target Tracking | Giữ metric quanh mục tiêu | CPU trung bình ~40% |
| Scheduled | Theo lịch đã biết trước | 5 giờ chiều thứ Sáu → min 10 instance |
| Predictive | Machine Learning dự đoán | Tải đỉnh 3 giờ mỗi ngày |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Manual Scaling là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tự tay cập nhật kích thước ASG, ví dụ đổi capacity từ 1 lên 2 hoặc ngược lại.

Giải thích: Không có tự động hóa, bạn chủ động đổi con số.

Tham chiếu: Mục Manual Scaling.

</details>

**Câu 2:** Simple/Step Scaling dựa trên cơ chế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dựa trên CloudWatch alarm — bạn định nghĩa trigger và số unit capacity thêm/bớt.

Giải thích: Ví dụ CPU > 70% trong 5 phút thì thêm 2 unit.

Tham chiếu: Mục Dynamic Scaling.

</details>

**Câu 3:** Target Tracking Scaling yêu cầu bạn cấu hình điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một giá trị mục tiêu cho metric, ví dụ giữ CPU trung bình quanh 40%.

Giải thích: ASG tự scale để giữ metric quanh mục tiêu đã đặt.

Tham chiếu: Mục Target Tracking Scaling.

</details>

**Câu 4:** Khi nào nên dùng Scheduled Scaling?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi biết trước thay đổi tải theo pattern người dùng, ví dụ tăng min capacity lên 10 vào 5 giờ chiều thứ Sáu.

Giải thích: Scaling dựa trên lịch đã dự đoán trước.

Tham chiếu: Mục Scheduled Scaling.

</details>

**Câu 5:** Predictive Scaling khác gì các chiến lược còn lại?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó dùng Machine Learning dựa trên traffic quá khứ để dự báo và provision instance trước khi tải tăng.

Giải thích: Phù hợp với time-based pattern, scaling không cần can thiệp. Chiến lược này chắc chắn có trong đề thi.

Tham chiếu: Mục Predictive Scaling.

</details>

---

Vậy là các bạn đã nắm đủ năm cách scaling của ASG, từ tự tay đến Machine Learning. *Học thuộc bảng so sánh phía trên là các bạn tự tin xử lý mọi câu hỏi về ASG scaling.*

Hẹn gặp các bạn ở bài tiếp theo, nơi chúng ta dọn dẹp tài nguyên của section này cho an toàn. 🚀
