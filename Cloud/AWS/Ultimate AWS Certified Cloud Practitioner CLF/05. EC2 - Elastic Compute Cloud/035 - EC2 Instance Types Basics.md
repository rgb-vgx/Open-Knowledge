# 🧩 Các loại EC2 Instance Type: Chọn cấu hình nào cho đúng nhu cầu?

> Nguồn: `035-EC2-Instance-Types-Basics.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682438)

Sau khi đã tạo instance đầu tiên, câu hỏi tiếp theo là: **nên chọn loại instance nào?** AWS có **7 loại (type) EC2 instance** khác nhau, mỗi loại tối ưu cho một nhóm nhu cầu riêng. Trong bài này, mình sẽ điểm qua cách đặt tên, 4 nhóm chính cần nhớ cho đề thi, và công cụ so sánh instance.

---

### 🗂️ Cách AWS đặt tên instance — nhìn là hiểu

AWS dùng một quy ước đặt tên rất logic, ví dụ **m5.2xlarge**:

1. **m** = **instance class** — ở đây là dòng **general purpose**.
2. **5** = **generation (thế hệ)**. Khi AWS nâng cấp phần cứng, dòng m sẽ lên **m6**...
3. **2xlarge** = **size (kích thước)** trong class: bắt đầu từ `small` → `large` → `2xlarge` → `4xlarge`... Size càng lớn thì **memory và CPU càng nhiều**.

*Các bạn không cần thuộc tên từng instance — chỉ cần hiểu quy ước này và cách tra cứu.*

---

### 🎯 General purpose — cân bằng mọi thứ

Đây là nhóm **đa dụng nhất**, phù hợp với **nhiều loại workload khác nhau**: web servers, code repositories... Nhóm này có sự **cân bằng tốt giữa compute, memory và networking**.

Trong khóa học, chúng ta sẽ dùng instance **general purpose t2.micro** — lựa chọn free tier. Trang web của AWS sẽ liệt kê đầy đủ các instance general purpose, và danh sách này **thay đổi theo thời gian**, nên hãy luôn tra lại trang AWS cho cập nhật.

---

### ⚡ Compute optimized — khi CPU là vua

Nhóm này tối ưu cho các **tác vụ compute intensive (ngốn CPU)**:

* **Batch processing** dữ liệu.
* **Media transcoding** (chuyển mã video/âm thanh).
* **High performance web servers**.
* **High Performance Computing (HPC)**.
* **Machine learning**.
* **Dedicated gaming server**.

Các instance compute optimized hiện đều mang tên **họ C** — như **C5**, **C6**...

---

### 🧠 Memory optimized — khi RAM là vua

Nhóm này cho hiệu năng cực nhanh với các workload **xử lý lượng lớn dữ liệu trong bộ nhớ (RAM)**. Use case tiêu biểu:

* **Cơ sở dữ liệu quan hệ và phi quan hệ** chạy chủ yếu **trong bộ nhớ**.
* **Distributed web scale cache store** — ví dụ cho **ElastiCache**.
* **In-memory databases** phục vụ **Business Intelligence (BI)**.
* Ứng dụng **xử lý real-time big unstructured data**.

Tên gọi thuộc **họ R** (R = **RAM**), ngoài ra còn có **X1 High Memory** và **Z1**.

---

### 💾 Storage optimized — khi ổ đĩa là vua

Nhóm cuối phù hợp khi bạn **truy cập lượng lớn dữ liệu trên local storage**. Use case gồm:

* **High frequency OLTP** — hệ thống xử lý giao dịch trực tuyến tần suất cao.
* **Cơ sở dữ liệu quan hệ và NoSQL** (sẽ học kỹ ở phần database).
* **Cache cho in-memory database** — ví dụ **Redis**.
* **Data warehousing**, **distributed file systems**.

Tên gọi bắt đầu bằng **I**, **D** hoặc **H1**.

Bảng điểm nhanh 4 nhóm:

| Loại | Đặc điểm | Use case tiêu biểu | Họ tên |
|---|---|---|---|
| General purpose | Cân bằng compute, memory, networking | Web server, code repository | T, M |
| Compute optimized | CPU mạnh | Batch, transcoding, HPC, ML, gaming | C |
| Memory optimized | RAM lớn, xử lý trong bộ nhớ | In-memory DB, cache, BI, real-time data | R, X, Z |
| Storage optimized | Truy cập nhiều dữ liệu local | OLTP, SQL/NoSQL, Redis, data warehouse | I, D, H1 |

---

### 📊 So sánh và tra cứu instance

Nhìn vài ví dụ để thấy sự khác biệt về cấu hình:

| Instance | vCPU | Memory |
|---|---|---|
| t2.micro | 1 | 1 GB |
| c5.4xlarge | 16 | 32 GB |
| r5.16xlarge | 16 | 512 GB |

Rõ ràng **r5.16xlarge** dồn rất nhiều vào **memory**, còn **c5.4xlarge** ít memory hơn nhưng mạnh về **CPU**, kèm **network performance** và **EBS bandwidth** khác nhau.

Để tra cứu tất cả instance cùng lúc, mình rất thích website **ec2instances.info**: danh sách toàn bộ instance của AWS, kèm **giá Linux On Demand**, **Linux Reserved**, **memory**, **số vCPU**; có thể tìm kiếm và sắp xếp theo tên. Khi làm việc thật với AWS, các bạn cũng sẽ dùng website này thường xuyên.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Trong tên `m5.2xlarge`, chữ **m** và số **5** có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** m = instance class (general purpose), 5 = generation (thế hệ).

Giải thích: Phần `2xlarge` là size trong class; size càng lớn càng nhiều memory/CPU.

Tham chiếu: Mục Cách AWS đặt tên instance.

</details>

**Câu 2:** Loại instance nào phù hợp cho media transcoding, HPC và machine learning?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Compute optimized (họ C — C5, C6...).

Giải thích: Đây là các tác vụ compute intensive cần CPU mạnh.

Tham chiếu: Mục Compute optimized.

</details>

**Câu 3:** Họ R đại diện cho nhóm instance nào và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Memory optimized — R stands for RAM.

Giải thích: Dùng cho in-memory database, cache, BI, real-time data.

Tham chiếu: Mục Memory optimized.

</details>

**Câu 4:** Instance general purpose trong khóa học được dùng là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** t2.micro — lựa chọn free tier.

Giải thích: General purpose cân bằng compute, memory, networking.

Tham chiếu: Mục General purpose.

</details>

**Câu 5:** Website nào giúp so sánh toàn bộ EC2 instance và giá?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** ec2instances.info.

Giải thích: Trang này liệt kê instance, giá On Demand/Reserved, memory, vCPU.

Tham chiếu: Mục So sánh và tra cứu instance.

</details>

---

Vậy là các bạn đã phân biệt được **4 nhóm instance chính** và biết cách tra cứu khi cần. Ở bài tiếp theo, chúng ta sẽ tìm hiểu **security group** — tường lửa bảo vệ EC2, cùng các **port kinh điển** chắc chắn có trong đề thi. Hẹn gặp các bạn! 🚀
