# 🗺️ Checkpoint học tập: Bạn đã sẵn sàng cho kỳ thi CLF-C02 chưa?

> Nguồn: `269-State-of-Learning-Checkpoint---AWS-Certified-Cloud-Practitio.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20053356)

Chúng ta đã đi đến một điểm dừng rất đáng nhớ của khóa học — lúc **nhìn lại xem mình đã tiến được bao xa** trên hành trình học tập. Trong bài này, mình sẽ cùng các bạn ghé thăm **trang chứng chỉ AWS Certified Cloud Practitioner**, đọc **exam guide (hướng dẫn thi) CLF-C02** và tìm hiểu các bộ câu hỏi luyện chính thức.

*Nếu bạn đã theo khóa học đến tận đây, mình tin chắc bạn đang ở trạng thái rất tốt để bước vào phòng thi — kể cả khi bạn chưa thấy mình "khớp" hoàn toàn với exam guide.*

---

### 🎯 Exam guide nói gì về bạn?

**Exam guide** cho biết kỳ thi mong đợi gì ở bạn. Cụ thể, bạn cần có khả năng:

* Giải thích **giá trị của cloud**.
* Hiểu **các best practice về bảo mật**, bao gồm **Shared Responsibility Model (Mô hình trách nhiệm chung)**.
* Nắm **các khái niệm cloud**, **dịch vụ cốt lõi** và **kinh tế học của AWS Cloud**.

Exam guide ghi rằng ứng viên nên có **tối đa khoảng 6 tháng tiếp xúc với thiết kế AWS Cloud** — nhưng khóa học này sẽ trang bị cho các bạn mọi kiến thức cần thiết. Điều quan trọng là bạn đã đi hết khóa học: lúc đó bạn hoàn toàn sẵn sàng đi thi.

---

### 📝 Hai dạng câu hỏi và "luật chơi" của đề

Kỳ thi có **2 dạng câu hỏi**:

1. **Multiple choice (chọn một đáp án):** 1 đáp án đúng và 3 đáp án sai — các đáp án sai được gọi là **distractor (đáp án gây nhiễu)**.
2. **Multiple response (chọn nhiều đáp án):** từ **2 đáp án đúng trở lên** trong **5 lựa chọn trở lên**; đề sẽ nói rõ bạn cần chọn bao nhiêu đáp án.

Hai điều các bạn phải nhớ:

* **Không trả lời = tính là sai.**
* **Đoán không bị trừ điểm.** Vì vậy, hãy trả lời **mọi câu hỏi**, không bỏ trống câu nào.

Về cấu trúc đề: có **50 câu tính điểm** và **15 câu không tính điểm**. Những câu không tính điểm giúp AWS thu thập dữ liệu để biết một câu hỏi có "tốt" hay không.

---

### 📊 Bản đồ domain trong đề thi

Điểm thi nằm trong khoảng **100–1000**, và **điểm đạt là 700**. Đề thi phân bổ theo các domain sau:

| Domain | Trọng số |
|---|---|
| Cloud concepts (khái niệm cloud) | 24% |
| Security and compliance (bảo mật và tuân thủ) | 30% |
| Cloud technology and services (công nghệ và dịch vụ cloud) | 34% |
| Billing, pricing and support (thanh toán, giá và hỗ trợ) | 12% |

Exam guide còn có phần **appendix (phụ lục) về technologies and concepts** — danh sách mọi dịch vụ có thể xuất hiện trong đề. Một số dịch vụ không được dạy trong khóa là **cố ý** (chúng chỉ nên đóng vai trò distractor); nếu một dịch vụ ngoài khóa lại là đáp án đúng, học viên thường báo cho mình và mình sẽ **cập nhật khóa học**. Vì vậy các bạn có thể tin rằng khóa học bao quát trọn vẹn exam guide.

---

### 🧪 Kiểm tra trình độ với AWS Skill Builder

Để tự đánh giá mức độ sẵn sàng, các bạn có thể dùng **official prep question set (bộ câu hỏi luyện chính thức)** trên nền tảng **AWS Skill Builder**:

1. Truy cập website AWS Skill Builder và **đăng ký — hoàn toàn miễn phí**.
2. Làm **20 câu hỏi** để hiểu kỳ thi được cấu trúc như thế nào.
3. Tự đánh giá xem mình còn cần ôn thêm phần nào.

*Hãy thử sức với bộ câu hỏi này nhé — biết mình đang ở đâu luôn là bước đầu tiên để tiến bộ.*

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Có bao nhiêu câu hỏi tính điểm và bao nhiêu câu không tính điểm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 50 câu tính điểm và 15 câu không tính điểm.

Giải thích: Câu không tính điểm giúp AWS đánh giá chất lượng câu hỏi.

Tham chiếu: Mục Hai dạng câu hỏi và luật chơi của đề.

</details>

**Câu 2:** Điểm đạt của kỳ thi CLF-C02 là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 700, trong thang điểm 100–1000.

Giải thích: Đây là ngưỡng đỗ chính thức của kỳ thi.

Tham chiếu: Mục Bản đồ domain trong đề thi.

</details>

**Câu 3:** Dạng multiple response yêu cầu bạn chọn bao nhiêu đáp án?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Từ 2 đáp án đúng trở lên trong 5 lựa chọn trở lên, theo số lượng đề nêu rõ.

Giải thích: Đề luôn cho biết bạn cần chọn bao nhiêu đáp án cho mỗi câu.

Tham chiếu: Mục Hai dạng câu hỏi và luật chơi của đề.

</details>

**Câu 4:** Domain nào chiếm trọng số lớn nhất trong đề?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cloud technology and services — 34%.

Giải thích: Tiếp theo là security and compliance 30%, cloud concepts 24% và billing, pricing and support 12%.

Tham chiếu: Mục Bản đồ domain trong đề thi.

</details>

**Câu 5:** Bộ câu hỏi luyện chính thức miễn phí có bao nhiêu câu, nằm ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 20 câu, trên nền tảng AWS Skill Builder.

Giải thích: Đăng ký miễn phí và làm thử để hiểu cấu trúc đề thi.

Tham chiếu: Mục Kiểm tra trình độ với AWS Skill Builder.

</details>

---

Vậy là các bạn đã nắm được bản đồ kỳ thi từ exam guide đến trọng số từng domain. *Nếu bạn đã học tới đây, mình tin bạn đang sẵn sàng hơn mình tưởng.*

Ở bài tiếp theo, chúng ta sẽ cùng "mổ xẻ" một vài câu hỏi mẫu để hiểu cách tư duy khi làm bài. Hẹn gặp các bạn ở đó! 🚀
