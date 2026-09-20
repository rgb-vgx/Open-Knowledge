# 🧪 Section cuối cùng: Viết test cho dự án Subscription Service

> Nguồn: `078-What-well-cover-in-this-section.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252732)

Chào các bạn, chúng ta đã tới **section cuối cùng** của khóa học rồi! Sau bao nhiêu bài về goroutine, Mutex, channel, rồi Dining Philosophers, Sleeping Barber và cả dự án Subscription Service, giờ là lúc làm một việc mà mình luôn nhắc là cực kỳ quan trọng: **viết test cho chính đoạn code mình đã viết**. Các bạn cứ thong thả, đây sẽ là một chặng nhẹ nhàng nhưng cực kỳ "đáng đồng tiền bát gạo".

### 🎯 Vì sao testing lại quan trọng?

**Testing là việc thật sự quan trọng** — mình không nói quá đâu. Bình thường, khi viết code cho chính mình chứ không phải cho khóa học, mình **viết test song song với lúc viết code**: viết một hàm, viết test cho hàm đó, rồi mới đi tiếp. Cách làm đó giúp mình bắt lỗi ngay tại chỗ, thay vì để nó "ẩn" trong code rồi vài tuần sau mới lộ ra — mà như các bạn biết ở các bài trước, lỗi concurrency thì đúng kiểu "có lỗi ẩn hàng tháng trời mới lộ".

---

### 🗺️ Lộ trình của section này

Trong section này, mình sẽ viết test cho đúng những gì đã xây ở các section trước:

1. **Sửa `data` package và các model** để chúng dễ test hơn — hiện tại, cách viết như cũ khiến việc test rất khó, nên đây là việc phải làm trước tiên và cũng khá đơn giản.
2. **Test việc đăng ký route** — làm sao chắc chắn mọi route cần thiết đều thật sự tồn tại trong ứng dụng.
3. **Test render trang** — kiểm tra các trang HTML có thật sự render ra được hay không.
4. **Test các handler** — và đặc biệt nhất: **handler sử dụng concurrency nhiều nhất**, vì đó suy cho cùng chính là linh hồn của cả khóa học này.

---

### 🧰 Không cần test mọi ngóc ngách

Mình nói trước cho các bạn yên tâm: chúng ta **không** viết test cho từng chi tiết nhỏ của toàn bộ ứng dụng. Thay vào đó, mình sẽ viết **một số test tiêu biểu**, đủ để trang bị cho các bạn bộ công cụ cần thiết — để sau này các bạn có thể tự viết test cho dự án của chính mình.

*Đừng lo nếu các bạn thấy rối khi lần đầu đụng tới test — cứ gõ theo mình, chạy lại vài lần là quen ngay. Sai cũng không sao cả!*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bình thường, khi viết code cho dự án của chính mình, mình viết test vào lúc nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Viết test song song với lúc viết code.

Giải thích: Viết hàm nào thì test hàm đó luôn, để bắt lỗi ngay tại chỗ.

Tham chiếu: Mục Vì sao testing lại quan trọng.

</details>

**Câu 2:** Section này có viết test cho mọi ngóc ngách của ứng dụng không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không. Mình viết một số test tiêu biểu, đủ để các bạn có công cụ tự viết test cho dự án của mình.

Giải thích: Mục tiêu là trao "đồ nghề", không phải phủ hết từng dòng code.

Tham chiếu: Mục Không cần test mọi ngóc ngách.

</details>

**Câu 3:** Việc đầu tiên phải làm với `data` package và các model là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Sửa chúng để dễ test hơn — vì cách viết hiện tại khiến việc test rất khó.

Giải thích: Đây là thay đổi khá đơn giản nhưng mở đường cho toàn bộ các test phía sau.

Tham chiếu: Mục Lộ trình của section này.

</details>

**Câu 4:** Những nhóm nào sẽ được viết test trong section này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Route, render trang và các handler — đặc biệt là handler dùng concurrency nhiều nhất.

Giải thích: Handler dùng concurrency là phần được ưu tiên vì đó là trọng tâm của khóa học.

Tham chiếu: Mục Lộ trình của section này.

</details>

**Câu 5:** Mục tiêu cuối cùng của section testing này là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trang bị đủ công cụ để bạn tự viết test cho dự án của chính mình.

Giải thích: Các test trong khóa học chỉ mang tính đại diện, không tham vọng test hết ứng dụng.

Tham chiếu: Mục Không cần test mọi ngóc ngách.

</details>

Lý thuyết đã đủ rồi — giờ là lúc bắt tay vào việc. Bài tiếp theo, mình sẽ dựng **môi trường test** cho dự án web bằng `setup_test.go` và hàm `TestMain`. Hẹn gặp lại các bạn! 🚀
