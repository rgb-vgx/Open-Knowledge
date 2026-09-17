# 🗺️ Kiến trúc ứng dụng toàn cầu: Từ single AZ đến active-active

> Nguồn: `143-Global-Applications-Architecture.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/29102360)

Chúng ta đã đi qua các dịch vụ toàn cầu — giờ là lúc **ráp chúng thành kiến trúc**. Bài này mình sẽ dẫn các bạn qua 4 kiểu kiến trúc từ đơn giản đến phức tạp, kèm mức độ sẵn sàng và độ trễ toàn cầu của từng kiểu. *Nắm chắc 4 khái niệm dưới đây là bạn đã sẵn sàng cho câu hỏi về global architecture trong đề thi.*

---

### 1️⃣ Single region, single AZ

Kiến trúc đơn giản nhất: một **EC2 instance** trong **một AZ duy nhất** thuộc **một region**.

* **Không** có high availability (tính sẵn sàng cao).
* **Không** có độ trễ toàn cầu tốt — người dùng ở xa sẽ bị latency cao.
* Bù lại, cách này **cực kỳ dễ thiết lập** — độ khó rất thấp.

---

### 2️⃣ Single region, multi AZ

Ở đây ta có **hai AZ trong cùng một region**.

* Có **high availability**.
* Nhưng **không cải thiện được độ trễ toàn cầu**, vì các AZ nằm gần nhau — người dùng ở xa vẫn bị latency cao.
* Độ khó tăng lên một chút, nhưng không đáng kể.

---

### 🌐 Multi-region active-passive

Kiến trúc này gồm **hai region**, mỗi region có một hoặc nhiều AZ:

* Một region là **active** — ứng dụng/EC2 ở đây nhận **cả reads lẫn writes** từ người dùng toàn cầu.
* Region còn lại là **passive** — có **data replication** từ region active sang, người dùng **có thể read** từ passive nhưng **không thể write** vào đây.

Kết quả: **read latency toàn cầu được cải thiện** nhờ dữ liệu được replicate ra khắp thế giới, nhưng **mọi writes vẫn phải đi về region trung tâm** — nên write latency ở phạm vi toàn cầu vẫn cao. Độ khó tăng vì giờ bạn phải quản lý nhiều region.

```mermaid
flowchart LR
    U[Người dùng toàn cầu] -->|reads và writes| A[Region active]
    A -->|replication dữ liệu| P[Region passive]
    U -->|chỉ reads| P
```

---

### ⚡ Multi-region active-active

Ở kiến trúc này, **mỗi EC2 instance đều nhận được cả writes lẫn reads**, và vẫn có **replication** giữa các instance với nhau.

* Cải thiện **cả read latency lẫn write latency** ở phạm vi toàn cầu.
* Độ khó cao hơn hẳn, vì ứng dụng của bạn phải xử lý rất nhiều thứ ở **mọi region**.
* Ví dụ điển hình cho database active-active là **DynamoDB global tables**.

| Kiến trúc | High availability | Độ trễ toàn cầu | Độ khó |
|---|---|---|---|
| Single region, single AZ | Không | Kém | Rất thấp |
| Single region, multi AZ | Có | Không cải thiện | Thấp |
| Multi-region active-passive | Có | Reads tốt, writes kém | Tăng |
| Multi-region active-active | Có | Reads và writes đều tốt | Cao |

*Nếu chỉ nhớ được 4 từ khóa — single region, multi-region, active-passive, active-active — bạn đã đủ tự tin trả lời câu hỏi về kiến trúc toàn cầu trong đề thi.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Kiến trúc nào KHÔNG có high availability?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Single region, single AZ.

Giải thích: Chỉ một AZ duy nhất nên không có tính sẵn sàng cao.

Tham chiếu: Mục Single region, single AZ.

</details>

**Câu 2:** Single region, multi AZ cải thiện được gì và chưa cải thiện được gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có high availability, nhưng chưa cải thiện được độ trễ toàn cầu vì các AZ ở gần nhau.

Tham chiếu: Mục Single region, multi AZ.

</details>

**Câu 3:** Trong active-passive, writes đi đâu và hệ quả là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mọi writes vẫn phải đi về region active trung tâm, nên write latency toàn cầu vẫn cao; reads có thể lấy từ region passive.

Tham chiếu: Mục Multi-region active-passive.

</details>

**Câu 4:** Active-active khác active-passive ở điểm cốt lõi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mỗi instance đều nhận cả reads lẫn writes và có replication, nên cải thiện cả read lẫn write latency — đổi lại độ khó cao hơn.

Tham chiếu: Mục Multi-region active-active.

</details>

**Câu 5:** Ví dụ database theo mô hình active-active mà mình đã nhắc là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** DynamoDB global tables.

Tham chiếu: Mục Multi-region active-active.

</details>

---

Vậy là các bạn đã có bản đồ 4 kiểu kiến trúc toàn cầu: càng nhiều region, độ sẵn sàng và độ trễ càng tốt — nhưng độ phức tạp cũng tăng theo. *Hãy chọn kiến trúc phù hợp với yêu cầu, đừng chọn "mạnh nhất" một cách mặc định.*

Ở bài tiếp theo, chúng ta sẽ **tổng kết toàn bộ section hạ tầng toàn cầu** — một bài ôn tập cực kỳ giá trị trước khi bước sang phần mới. Hẹn gặp các bạn ở đó! 🚀
