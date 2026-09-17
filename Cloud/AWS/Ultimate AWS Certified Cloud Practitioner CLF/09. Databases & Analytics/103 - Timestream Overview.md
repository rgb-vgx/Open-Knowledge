# ⏱️ Amazon Timestream: Cơ sở dữ liệu chuỗi thời gian nhanh gấp 1000 lần

> Nguồn: `103-Timestream-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/41562770)

Như tên gọi đã gợi ý, bài này chúng ta nói về **time series (chuỗi thời gian)** — và dịch vụ tương ứng của AWS là **Amazon Timestream**. Cùng xem time series data là gì và Timestream mạnh tới mức nào nhé!

---

### 🎯 Timestream là gì?

**Amazon Timestream** là database **fully managed**, **nhanh**, **scalable** và **serverless** dành cho **time series data (dữ liệu chuỗi thời gian)**.

* Tên dịch vụ đã "bật mí": **Timestream = time series**.
* *Đây là từ khóa gần như chắc chắn xuất hiện ở dạng câu hỏi nhận diện trong đề thi.*

---

### 📈 Time series data là gì?

Time series data là **dữ liệu biến đổi theo thời gian (data evolving over time)**.

Hình dung một biểu đồ đơn giản:

* Trục tung (vertical axis) là một **con số**.
* Trục hoành (horizontal axis) là **năm (year)**, chạy từ mốc thời gian cũ đến mốc mới hơn.

Vì mốc thời gian luôn tiến về phía trước, tập dữ liệu này được gọi là **time series dataset**. Timestream sinh ra chính là để phục vụ kiểu dữ liệu đó.

---

### ⚡ Sức mạnh của Timestream

* **Tự động scale up và scale down** dựa trên **capacity (dung lượng)** và **nhu cầu compute (tính toán)**.
* Có thể **lưu trữ và phân tích hàng nghìn tỷ (trillions) sự kiện mỗi ngày** ở dạng time series.
* **Nhanh hơn khoảng 1.000 lần** và chỉ tốn **1/10 chi phí** so với relational database.
* Nếu muốn phân tích time series data **theo thời gian thực (real time)**, bạn có các **time series analytics function (hàm phân tích chuỗi thời gian)** để **tìm pattern (mẫu hình)** trong database.

*Mẹo thi:* thấy **time series data** → nghĩ ngay đến **Amazon Timestream**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Timestream được thiết kế cho loại dữ liệu nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Time series data — dữ liệu chuỗi thời gian.

Giải thích: Tên dịch vụ đã gợi ý rõ: Timestream = time series.

Tham chiếu: Mục Timestream là gì.

</details>

**Câu 2:** Time series data được định nghĩa như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là dữ liệu biến đổi theo thời gian (data evolving over time).

Giải thích: Ví dụ trục tung là con số, trục hoành là năm chạy từ cũ đến mới.

Tham chiếu: Mục Time series data là gì.

</details>

**Câu 3:** Timestream vận hành và mở rộng ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Fully managed, fast, scalable, serverless; tự động scale up/down theo capacity và nhu cầu compute.

Giải thích: Bạn không phải quản lý hạ tầng cho database này.

Tham chiếu: Mục Timestream là gì và Sức mạnh của Timestream.

</details>

**Câu 4:** Hai con số ấn tượng của Timestream là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhanh hơn khoảng 1.000 lần và chỉ tốn 1/10 chi phí so với relational database.

Giải thích: Timestream còn lưu và phân tích được hàng nghìn tỷ sự kiện mỗi ngày.

Tham chiếu: Mục Sức mạnh của Timestream.

</details>

**Câu 5:** Muốn phân tích time series data theo thời gian thực, bạn dùng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Các time series analytics function để tìm pattern trong database.

Giải thích: Đề thi thấy time series data thì đáp án là Amazon Timestream.

Tham chiếu: Mục Sức mạnh của Timestream.

</details>

---

Vậy là bạn đã nắm được **Amazon Timestream**: *serverless, fully managed, nhanh gấp ~1.000 lần, chi phí 1/10 so với relational database*. Từ khóa "time series" giờ đã có đáp án!

Ở bài tiếp theo, chúng ta sẽ điểm qua **Amazon Managed Blockchain**. Hẹn gặp các bạn ở đó! 🚀
