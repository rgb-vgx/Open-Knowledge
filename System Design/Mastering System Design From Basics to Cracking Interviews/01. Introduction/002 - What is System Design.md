# 🏗️ System Design là gì? Bản thiết kế của hệ thống trước khi viết code

> Nguồn: `002-What-is-System-Design.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49243887)

Khi nghe cụm từ **system design**, nhiều bạn nghĩ ngay đến các sơ đồ kiến trúc, database, server hay những mẫu thiết kế (architectural patterns). Những thứ đó đúng là một phần của nó — nhưng chưa phải toàn bộ câu chuyện. Trong bài này, mình sẽ cùng các bạn làm rõ system design thực sự là gì, và vì sao nó quan trọng đến vậy.

---

### 🎯 System design thực sự là gì?

Ở tầng sâu nhất, **system design là việc giải quyết các bài toán kinh doanh (business problems) bằng công nghệ**. Hãy hình dung nó như việc tạo ra một **blueprint (bản thiết kế)** cho hệ phần mềm trước khi hệ thống đó được xây dựng.

* Giống như một **kiến trúc sư vẽ bản thiết kế trước khi công trình được thi công**, các kiến trúc sư phần mềm và kỹ sư thiết kế cách các thành phần phối hợp với nhau **trước khi viết những dòng code lớn**.
* Bản thiết kế này giúp chuyển hóa **yêu cầu kinh doanh** thành **kiến trúc kỹ thuật** — không chỉ chạy tốt hôm nay, mà còn đứng vững khi hệ thống lớn lên và thay đổi trong tương lai.

```mermaid
flowchart LR
    A[Yêu cầu kinh doanh] --> B[System Design]
    B --> C[Kiến trúc kỹ thuật]
    C --> D[Chạy tốt hôm nay]
    C --> E[Vẫn ổn khi mở rộng]
```

---

### 🧩 Cốt lõi là ra quyết định

Điểm mình muốn các bạn ghi nhớ: **system design, ở bản chất, là một chuỗi quyết định**. Người thiết kế hệ thống phải liên tục trả lời những câu hỏi như:

1. **Người dùng sẽ tương tác với hệ thống như thế nào?**
2. **Dữ liệu nên được lưu ở đâu?**
3. **Các thành phần sẽ giao tiếp với nhau ra sao?**
4. **Điều gì xảy ra khi lượng truy cập tăng gấp 10 lần?**
5. **Điều gì xảy ra khi một thành phần gặp sự cố?**

Không có quyết định nào là miễn phí: chọn một giải pháp thường đồng nghĩa với việc **chấp nhận một giới hạn hay một cái giá ở chỗ khác**. Đó là lý do vì sao trong suốt khóa học, mình sẽ luôn nhấn mạnh việc **nhìn thẳng vào trade-off (sự đánh đổi)** — thay vì đi tìm một thiết kế hoàn hảo.

---

### ⚙️ Một hệ thống tốt không chỉ "chạy được"

Một hệ thống được thiết kế tốt **không chỉ tập trung vào tính năng (functionality)**. Nó còn phải đạt được những phẩm chất sau:

* **Scalable** — khả năng mở rộng khi người dùng và dữ liệu tăng lên.
* **Reliable** — độ tin cậy: vận hành đúng ngay cả khi có thành phần gặp sự cố.
* **Performant** — hiệu năng tốt, phản hồi nhanh.
* **Maintainable** — dễ bảo trì và tiến hóa theo thời gian.

Khi hệ thống còn nhỏ, các tính năng thường là thứ được chú ý nhất. Nhưng **khi hệ thống lớn dần, những phẩm chất trên thường trở nên quan trọng hơn chính các tính năng**. Một sản phẩm thật nhiều feature nhưng sập dưới tải thực tế thì khó lòng được xem là thành công.

---

### 🗺️ Ranh giới rõ ràng — khía cạnh ít được nói tới

Một phần rất quan trọng khác của system design là **định nghĩa ranh giới (boundaries) rõ ràng**:

* Quyết định **trách nhiệm thuộc về đâu**.
* **Các service tương tác với nhau thế nào**.
* **Dữ liệu chảy qua hệ thống theo đường nào**.

Ranh giới tốt giúp **giảm độ phức tạp** và khiến hệ thống **dễ tiến hóa theo thời gian**. Ranh giới mờ nhạt thì ngược lại — mọi thứ dần dính chặt vào nhau và ngày càng khó thay đổi.

*Đừng lo nếu các bạn chưa từng thiết kế hệ thống lớn bao giờ — hãy nắm thật chắc những nguyên lý nền tảng trước, mọi thứ phía sau sẽ trở nên logic và dễ theo hơn rất nhiều.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Theo bài, system design thực sự xoay quanh việc gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giải quyết các bài toán kinh doanh bằng công nghệ, thông qua việc ra quyết định.

Giải thích: Sơ đồ, database, server chỉ là một phần; bản chất là chuyển yêu cầu kinh doanh thành kiến trúc kỹ thuật.

Tham chiếu: Mục System design thực sự là gì.

</details>

**Câu 2:** Vì sao nói system design giống như việc vẽ bản thiết kế trước khi xây dựng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hệ thống được thiết kế trước khi viết lượng code lớn — giống kiến trúc sư vẽ bản thiết kế trước khi thi công.

Giải thích: Thiết kế giúp các thành phần phối hợp đúng ngay từ đầu, thay vì sửa chữa tốn kém về sau.

Tham chiếu: Mục System design thực sự là gì.

</details>

**Câu 3:** Kể tên bốn phẩm chất của một hệ thống được thiết kế tốt.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Scalable, reliable, performant và maintainable.

Giải thích: Hệ thống tốt không chỉ có tính năng, mà còn phải đạt các phẩm chất này.

Tham chiếu: Mục Một hệ thống tốt không chỉ "chạy được".

</details>

**Câu 4:** Điều gì thường trở nên quan trọng hơn các tính năng khi hệ thống lớn lên?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Các phẩm chất như khả năng mở rộng, độ tin cậy, hiệu năng và khả năng bảo trì.

Giải thích: Khi quy mô tăng, hệ thống phải tiếp tục chạy đúng thay vì chỉ có thật nhiều feature.

Tham chiếu: Mục Một hệ thống tốt không chỉ "chạy được".

</details>

**Câu 5:** Ranh giới rõ ràng mang lại lợi ích gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giảm độ phức tạp và giúp hệ thống dễ tiến hóa theo thời gian.

Giải thích: Ranh giới xác định rõ trách nhiệm, cách service tương tác và đường đi của dữ liệu.

Tham chiếu: Mục Ranh giới rõ ràng.

</details>

---

Vậy là các bạn đã có định nghĩa nền tảng: system design là **bản thiết kế của hệ thống**, với cốt lõi là **ra quyết định và đánh đổi**. Ở bài tiếp theo, chúng ta sẽ trả lời câu hỏi: **vì sao system design lại quan trọng — không chỉ cho phỏng vấn, mà cho cả sự nghiệp kỹ sư của các bạn?** Hẹn gặp lại! 🚀
