# 📏 Right Sizing: Chọn đúng kích cỡ để tối ưu chi phí trên AWS

> Nguồn: `263-Right-Sizing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/29102306)

Bài này hơi "lạ" một chút, nhưng là chủ đề **có thể xuất hiện trong đề thi**: **right sizing (chọn đúng kích cỡ tài nguyên)**. Mình sẽ nói ngắn gọn, rõ ràng để các bạn nắm chắc.

---

### 🎯 Right sizing là gì?

Trên cloud có **rất nhiều instance type** để chọn, nhưng chọn chiếc mạnh nhất **không phải là lựa chọn tốt nhất** — vì cloud có tính **elastic (đàn hồi)** và bạn có thể đổi instance type bất cứ lúc nào.

**Right sizing** là quá trình:

* Khớp **instance type và size** với **nhu cầu hiệu năng (performance)** và **dung lượng (capacity)** của workload.
* Tìm ra kích cỡ **đúng** với **chi phí thấp nhất có thể**.
* Liên tục xem xét mọi instance đang chạy và nhìn vào **metrics** để tìm cơ hội **loại bỏ (eliminate)** hoặc **thu nhỏ (downsize)** — mà không ảnh hưởng chất lượng, dung lượng, hiệu năng.
* Kết quả cuối cùng: **chi phí thấp hơn**.

Vì cloud rất dễ **scale up**, lời khuyên vàng là: **hãy bắt đầu từ nhỏ (start small) để tìm ra kích cỡ đúng**.

---

### ⏰ Hai thời điểm vàng để right size

1. **Trước khi migrate lên cloud:** sai lầm rất phổ biến là doanh nghiệp cứ thế migrate lên cloud, đặt mọi thứ với instance size **lớn nhất** rồi... quên luôn. *Đừng làm vậy — hãy right size trước khi migration.*
2. **Sau khi migrate, làm liên tục:** có thể **mỗi tháng một lần**, vì nhu cầu thay đổi theo thời gian. Khi đó bạn cần xem nên **right-size up** hay **right-size down**.

---

### 🧰 Công cụ hỗ trợ right sizing

Một số công cụ giúp bạn right size hiệu quả:

* **CloudWatch** — xem metrics của instance.
* **Cost Explorer** — phân tích chi phí.
* **Trusted Advisor** — nhận khuyến nghị tối ưu.
* Các **công cụ bên thứ ba (third-party tools)** khác.

*Nhớ hai điều cốt lõi: luôn bắt đầu từ nhỏ, và right size cả trước migration lẫn liên tục trong lúc vận hành.*

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Right sizing là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là quá trình khớp instance type và size với nhu cầu performance/capacity của workload ở mức chi phí thấp nhất.
Giải thích: Nói ngắn gọn là "chọn cho đúng cỡ".

</details>

**Câu 2:** Vì sao không nên chọn instance type mạnh nhất?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cloud có tính elastic — bạn có thể đổi instance type bất cứ lúc nào.
Giải thích: Chọn mạnh nhất không phải là lựa chọn tốt nhất, hãy bắt đầu từ nhỏ.

</details>

**Câu 3:** Hai thời điểm quan trọng cần right size là khi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trước khi cloud migration và liên tục sau đó.
Giải thích: Sau migration có thể làm mỗi tháng một lần.

</details>

**Câu 4:** Vì sao phải right size liên tục?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nhu cầu thay đổi theo thời gian — có thể cần right-size up hoặc right-size down.
Giải thích: Nhìn metrics của instance đang chạy để tìm cơ hội thu nhỏ hoặc loại bỏ.

</details>

**Câu 5:** Những công cụ nào hỗ trợ right sizing?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CloudWatch, Cost Explorer, Trusted Advisor và các công cụ bên thứ ba.
Giải thích: Phân tích metrics và chi phí giúp bạn chọn đúng kích cỡ.

</details>

---

Vậy là xong một bài nhỏ nhưng rất thực dụng. *Chỉ cần nhớ: start small, right size trước migration và right size liên tục là bạn đã nắm trọn ý của bài này.*

Ở bài tiếp theo, chúng ta sẽ khám phá **AWS Ecosystem** — hệ sinh thái tài nguyên, hỗ trợ và đối tác xung quanh AWS. Hẹn gặp các bạn ở đó! 🚀
