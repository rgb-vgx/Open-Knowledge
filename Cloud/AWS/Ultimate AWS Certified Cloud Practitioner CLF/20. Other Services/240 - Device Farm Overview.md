# 📱 AWS Device Farm — test ứng dụng trên thiết bị thật

> Nguồn: `240-Device-Farm-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/26623550)

Tiếp theo, chúng ta tìm hiểu **AWS Device Farm** — dịch vụ giúp test ứng dụng web và mobile **trên thiết bị thật**, thay vì chỉ mô phỏng. Với lập trình viên mobile, đây là một trợ thủ cực kỳ đáng giá.

---

### 🎯 Device Farm là gì?

AWS Device Farm là dịch vụ **fully managed (được quản lý hoàn toàn)** dùng để test ứng dụng **web và mobile** của bạn trên:

* **Desktop browser thật**
* **Mobile device thật**
* **Tablet thật**

Các bạn có thể chạy test **đồng thời (concurrently) trên nhiều thiết bị**, giúp **tăng tốc đáng kể** quá trình thực thi toàn bộ bài test.

---

### 🎛️ Cấu hình thiết bị theo ý bạn

Không chỉ chạy test, các bạn còn **cấu hình được thiết bị** theo nhu cầu, ví dụ:

* **GPS**
* **Language setting (thiết lập ngôn ngữ)**
* **WiFi**
* **Bluetooth**
* ...và nhiều thứ khác.

*Đây là điểm rất thực tế: mỗi thị trường có ngôn ngữ và điều kiện mạng khác nhau, nên cấu hình linh hoạt giúp bài test sát với thực tế hơn.*

---

### 🐞 Vì sao lập trình viên mobile cần Device Farm?

Hãy tưởng tượng bạn là lập trình viên **Android** hoặc **iOS**: bạn cần chắc chắn ứng dụng của mình chạy tốt trên **hàng nghìn thiết bị khác nhau** — mỗi chiếc có kích thước màn hình và cấu hình khác nhau.

Device Farm chính là một **"nông trại" thiết bị thật** đặt trong hạ tầng cloud của AWS. Bạn test ứng dụng tại đây để **bắt bug thật sớm (catch bugs very early)**. Bạn thậm chí có thể **tương tác trực tiếp với thiết bị**, và Device Farm sẽ gửi cho bạn **reports (báo cáo), logs (nhật ký) và screenshots (ảnh chụp màn hình)** — giúp xử lý bug trước khi phát hành, dựa trên từng loại thiết bị mà bạn chạy thử.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** AWS Device Farm test ứng dụng trên loại thiết bị nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thiết bị thật — desktop browser thật, mobile device thật và tablet thật.

Giải thích: Đây là điểm khác biệt so với việc chỉ test trên trình giả lập.

Tham chiếu: Mục Device Farm là gì.

</details>

**Câu 2:** Lợi ích của việc chạy test đồng thời trên nhiều thiết bị là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tăng tốc độ thực thi toàn bộ bài test.

Giải thích: Tests chạy concurrently trên nhiều device cùng lúc.

Tham chiếu: Mục Device Farm là gì.

</details>

**Câu 3:** Bạn có thể cấu hình những gì trên thiết bị test?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ví dụ GPS, language setting, WiFi, Bluetooth...

Giải thích: Cấu hình linh hoạt giúp bài test sát thực tế hơn.

Tham chiếu: Mục Cấu hình thiết bị theo ý bạn.

</details>

**Câu 4:** Device Farm gửi lại cho lập trình viên những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Reports, logs và screenshots.

Giải thích: Nhờ đó bạn xử lý bug trước khi phát hành, theo từng loại thiết bị.

Tham chiếu: Mục Vì sao lập trình viên mobile cần Device Farm.

</details>

**Câu 5:** Tình huống nào phù hợp nhất để dùng Device Farm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lập trình viên Android/iOS cần test app trên nhiều thiết bị khác nhau và phát hiện bug sớm.

Giải thích: Thiết bị đa dạng về kích thước màn hình, cấu hình... nên test thật rất quan trọng.

Tham chiếu: Mục Vì sao lập trình viên mobile cần Device Farm.

</details>

---

Vậy là các bạn đã nắm Device Farm: test web/mobile trên thiết bị thật, chạy song song để nhanh hơn, cấu hình được từng thiết bị và nhận báo cáo chi tiết. Ở bài tiếp theo, chúng ta tìm hiểu **AWS Backup**. Hẹn gặp lại! 🚀
