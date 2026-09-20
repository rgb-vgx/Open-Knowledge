# 🧩 Microservices: Lợi ích vượt trội và những cái bẫy phải biết

> Nguồn: `002-Microservices-Architecture---Benefits-and-Challenges.txt` · [Udemy](https://ua.udemy.com/course/the-complete-microservices-event-driven-architecture/learn/lecture/38289930)

Chào mừng các bạn trở lại. Bài trước chúng ta đã có động lực để tìm hiểu microservices; bài này mình sẽ đi sâu hơn: **microservices architecture thực chất là gì**, nó giải quyết bài toán scalability của monolith ra sao, và — quan trọng không kém — những **thách thức, overhead** đi kèm mà chúng ta sẽ học cách xử lý xuyên suốt khóa học.

---

### 🎯 Microservices Architecture là gì?

Khác với kiến trúc ba tầng nơi toàn bộ business logic tập trung trong một application, microservices architecture tổ chức business logic thành một **tập hợp các service loosely coupled (tách rời) và independently deployed (triển khai độc lập)**.

Điểm cốt lõi: **mỗi service được sở hữu bởi một team nhỏ và có phạm vi trách nhiệm hẹp**. Chính sự phân tách cả về logic lẫn vật lý ở mức mịn hơn này mang lại những lợi ích dưới đây.

---

### 📈 Lợi ích 1: organizational scalability (khả năng mở rộng tổ chức) tăng vọt

Vì mỗi service chỉ chứa một phần nhỏ của toàn bộ chức năng, **codebase của mỗi service nhỏ hơn hẳn**, kéo theo một chuỗi lợi ích:

* **Load codebase trong IDE nhanh hơn** cho từng developer.
* **Build nhanh hơn** nhờ kích thước binary giảm mạnh.
* **Test và reasoning** dễ hơn nhiều vì có ít logic hơn để hiểu, chạy và kiểm thử.
* **Onboarding thành viên mới nhanh hơn** — công ty lớn nhanh mà vẫn giữ được sự hiệu quả.

Tất cả cộng lại làm tăng **development velocity (tốc độ phát triển)** của từng team: giao nhiều feature hơn và giành lợi thế trước đối thủ.

---

### ⚙️ Lợi ích 2: system scalability, công nghệ và độ ổn định

Với monolith, mỗi instance phải chạy **toàn bộ codebase**, đòi hỏi phần cứng mạnh và đắt tiền. Khi tách thành microservices, mỗi service nhỏ hơn nên mỗi instance **tốn ít memory và CPU hơn** — có thể chạy trên **commodity hardware (phần cứng phổ thông) rẻ và sẵn có**.

Hai lợi ích đi kèm cũng rất đáng giá:

* **Tự do công nghệ:** mỗi team tự đánh giá công nghệ nào mang lại lợi ích tốt nhất cho service của mình.
* **Phản ứng nhanh với thay đổi công nghệ:** refactor codebase vốn đã nhỏ, hoặc thậm chí **viết lại toàn bộ service** nếu cần.

Cuối cùng là **stability (độ ổn định) cao hơn**: vì mỗi microservice là một **runtime unit riêng**, blast radius (bán kính ảnh hưởng) của một bug, memory leak hay vấn đề performance **nhỏ hơn rất nhiều**. Phần lớn trường hợp, lỗi trong một service chỉ ảnh hưởng chính nó hoặc các service phụ thuộc — **phần còn lại của hệ thống vẫn chạy bình thường**.

Bảng so sánh nhanh hai phong cách kiến trúc:

| Tiêu chí | Monolith | Microservices |
|---|---|---|
| Codebase mỗi instance | Toàn bộ business logic | Chỉ một phần chức năng |
| Phần cứng | Mạnh, đắt tiền | Phổ thông, rẻ |
| Công nghệ | Một stack chung cho tất cả | Mỗi service tự chọn |
| Khi có bug | Ảnh hưởng toàn hệ thống | Ảnh hưởng một service và các service phụ thuộc |
| Sở hữu | Một codebase chung | Mỗi service một team nhỏ |

Mình rất thích hình ảnh của giảng viên: hãy nghĩ về hai phong cách này như **hai "số" của một chiếc xe đạp leo núi** (hay xe số sàn). Số thấp là monolithic — giúp công ty khởi động từ con số 0 và tăng trưởng tới một ngưỡng nhất định. Muốn leo tiếp, chúng ta phải **sang số** và migrate lên microservices.

Nhưng có một caveat lớn: nếu mọi thứ đơn giản đến vậy thì khóa học đã kết thúc ở đây.

---

### ⚠️ Thách thức 1: hệ phân tán, network, testing và troubleshooting

Đi kèm mọi lợi ích, microservices mang theo **rất nhiều thách thức và overhead**. Vấn đề lớn đầu tiên: chúng ta biến một hệ **centralized (tập trung)** thành một hệ **highly distributed (phân tán cao độ)**.

* Những **method call** trước đây có hành vi, tỷ lệ thành công và latency rất dễ đoán nay trở thành **network call** giữa hai application có thể chạy trên hai máy khác nhau.
* Request đi qua **network không đáng tin cậy**: packet có thể bị mất hoặc trễ, gây **latency khó lường và cả lỗi**.
* Bản chất hệ phân tán: **mỗi component đều inherently unreliable (không đáng tin cậy vốn dĩ)** — một service instance có thể đã crash vì lỗi hardware/software, hoặc đang được restart như một phần của bảo trì định kỳ.

Về testing, chúng ta gặp một nghịch lý:

* Test từng service **độc lập** thì nhanh và dễ hơn.
* Nhưng **không có gì đảm bảo** sau khi deploy, tất cả service sẽ phối hợp đúng như một tổng thể.
* Khi thay đổi một service, ta **kém tự tin hơn** rằng version mới sẽ không phá hỏng service khác.
* Hệ quả: các **integration test (kiểm thử tích hợp)** rất phức tạp và chậm, làm giảm năng suất; và vì mỗi service thuộc một team khác nhau, **rất khó xác định ai sở hữu những integration test đó**.

Troubleshooting cũng khó hơn hẳn. Một request đi qua chuỗi microservices rồi người dùng nhận thông tin sai, nhận lỗi, hoặc nhận đúng nhưng chậm:

```mermaid
flowchart LR
    U[Người dùng] --> S1[Service A]
    S1 --> S2[Service B]
    S2 --> S3[Service C]
    S3 --> R[Lỗi hoặc phản hồi chậm]
```

Làm sao biết **service nào chịu trách nhiệm** cho bug hay vấn đề performance này? Đó là câu hỏi khó mà chúng ta sẽ học cách trả lời bằng các kỹ thuật observability ở phần sau của khóa học.

---

### 🏢 Thách thức 2: organizational scalability và cái bẫy "distributed monolith"

Microservices còn đặt ra thách thức về tổ chức. Câu hỏi lớn nhất: **đặt phạm vi trách nhiệm giữa các service thế nào?**

* Nếu đặt ranh giới sai, chúng ta có thể nhận **nhiều organizational overhead hơn là lợi ích**.
* Ví dụ, nếu **mỗi thay đổi trong hệ thống đều cần phối hợp cẩn thận giữa các team**, thì chúng ta chẳng khá hơn gì so với monolith.
* Tương tự, nếu **mỗi team dùng một tech stack, tool và best practice hoàn toàn khác nhau**, sẽ có nhiều nỗ lực trùng lặp và confusion khi đọc codebase của team khác.

Nếu không cẩn thận, rất dễ xảy ra tình huống **sau khi migrate còn tệ hơn cả khi ở lại với monolith**. Tình trạng đó có tên gọi chính thức là **distributed monolith (monolith phân tán)**, hay cách nói dân dã là **big ball of mud (mớ bùn lớn)**.

Tin tốt: nhiều công ty đã trải qua hết những "cơn đau tăng trưởng" này. Sau nhiều năm chia sẻ kiến thức, câu chuyện thành công lẫn sai lầm, ngành đã đúc kết được **một bộ nguyên tắc và best practices** cho microservices thành công.

*Nếu tuân theo các nguyên tắc đã được kiểm chứng trong công nghiệp, lợi ích từ microservices sẽ vượt xa overhead và độ phức tạp của nó.* Đó chính là hành trình của khóa học này.

---

**Câu 1:** Microservices architecture tổ chức business logic như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thành một tập hợp các service loosely coupled, independently deployed, mỗi service do một team nhỏ sở hữu với phạm vi trách nhiệm hẹp.

Giải thích: Khác với ba tầng tập trung một application, microservices phân tách cả logic lẫn vật lý ở mức mịn hơn.

Tham chiếu: Mục Microservices Architecture là gì.

</details>

**Câu 2:** Lợi ích organizational scalability đến từ đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Từ codebase nhỏ hơn của mỗi service — load IDE nhanh hơn, build nhanh hơn, test/reasoning dễ hơn, onboarding nhanh hơn, nhờ đó tăng development velocity.

Giải thích: Mỗi service chỉ chứa một phần nhỏ chức năng nên mọi hoạt động phát triển đều nhẹ và nhanh hơn.

Tham chiếu: Mục Lợi ích 1.

</details>

**Câu 3:** Vì sao microservices giúp chạy trên phần cứng rẻ hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mỗi service nhỏ hơn nên instance tiêu thụ ít memory và CPU hơn, chạy được trên commodity hardware.

Giải thích: Monolith phải chạy toàn bộ codebase trong mỗi instance nên cần phần cứng mạnh, đắt tiền.

Tham chiếu: Mục Lợi ích 2.

</details>

**Câu 4:** Nghịch lý nào xuất hiện khi test microservices?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Test từng service độc lập thì dễ hơn, nhưng không đảm bảo các service phối hợp đúng khi ghép lại; integration test trở nên phức tạp, chậm và khó xác định team nào sở hữu.

Giải thích: Thay đổi một service khiến ta kém tự tin rằng nó không phá hỏng service khác.

Tham chiếu: Mục Thách thức 1.

</details>

**Câu 5:** "Distributed monolith" là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tình trạng migrate sang microservices nhưng còn tệ hơn monolith — thường do đặt ranh giới sai khiến mọi thay đổi cần phối hợp giữa các team.

Giải thích: Khi đó overhead tổ chức còn lớn hơn lợi ích, đúng kiểu "big ball of mud".

Tham chiếu: Mục Thách thức 2.

</details>

---

Tóm lại, microservices tách hệ thống thành các service nhỏ, độc lập, mỗi service một team — đổi lại chúng ta phải đối mặt với network không đáng tin, bài toán integration test, troubleshooting phân tán và ranh giới tổ chức. Hãy nhớ hình ảnh chiếc xe đạp leo núi: **monolith là số thấp để khởi động, microservices là số cao để leo tiếp** — chỉ sang số khi thật sự cần. Ở bài tiếp theo, mình sẽ giới thiệu **workbook tương tác** của khóa học để các bạn có đầy đủ công cụ học tập. Hẹn gặp lại các bạn! 🚀
