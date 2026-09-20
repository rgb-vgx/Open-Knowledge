# 🏷️ Gửi HTML thật về trình duyệt — một dòng header "thần kỳ"

> Nguồn: `089-Serving-HTML.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162370)

Chào các bạn! Ứng dụng web của chúng ta hiện vẫn chưa làm được gì thú vị — nó chỉ in chuỗi `Hello World` lên cửa sổ trình duyệt. Hôm nay mình sẽ làm nó "ngon" hơn một chút, và như mọi khi, chúng ta đi **từng bước thật nhỏ**.

### 🧱 HTML đầu tiên nằm trong một biến

Mình tạo một biến mới tên `html`, kiểu string, chứa nội dung `"<strong>Hello World</strong>"`.

Cụm `<strong>` đóng vai trò **thẻ mở (opening tag)**, còn `</strong>` là **thẻ đóng (closing tag)**. Toàn bộ nội dung nằm giữa hai thẻ sẽ chịu tác động của thẻ `strong` — cụ thể là được **in đậm (boldface)**. Nhắc lại một chút: **HTML (hypertext markup language)** là ngôn ngữ dùng để viết web page, và nó rất đơn giản — các bạn chủ yếu bao văn bản bằng các cặp thẻ như vậy.

Sau đó mình thay chuỗi `Hello World` cũ trong lời gọi hàm gửi response bằng biến `html` vừa tạo.

---

### 😅 Lần chạy đầu tiên: cả thẻ HTML hiện nguyên xi trên màn hình

Các bạn sẽ nghĩ: dừng ứng dụng, chạy lại, tải lại trang là thấy Hello World in đậm. Nhưng không — màn hình sẽ hiện **nguyên cả chuỗi `<strong>Hello World</strong>`** cho người dùng xem.

Lý do rất logic: chúng ta **chưa hề nói cho trình duyệt biết nó đang nhận HTML**. Không có thông tin đó, trình duyệt cứ coi chuỗi ấy là văn bản thuần và in ra đúng từng ký tự.

---

### ✅ Một dòng lệnh "thần kỳ": nói cho browser biết đó là HTML

Cách sửa rất gọn. Ngay trước khi gửi nội dung về, mình thêm dòng này:

```go
w.Header().Set("Content-Type", "text/html")
```

Trong đó `w` là response writer. Dòng này gửi kèm một **header** — trình duyệt nhận được header nhưng **không hiển thị cho người dùng** — với nhiệm vụ duy nhất: *"Này trình duyệt, nội dung sắp nhận là HTML đấy nhé!"*

Dừng ứng dụng, chạy lại, tải lại trang — và bây giờ **Hello World hiện đúng dạng in đậm**.

---

### 🔍 Nhìn vào page source để hiểu chuyện gì đang xảy ra

Nếu các bạn nhấp chuột phải lên trang rồi chọn **View Page Source**, sẽ thấy thứ thực sự được gửi tới trình duyệt vẫn là chuỗi `<strong>Hello World</strong>`. Điều khác biệt nằm ở chỗ: trình duyệt **đọc** chuỗi đó theo đúng nghĩa HTML rồi **render** thành văn bản in đậm cho người dùng xem.

Firefox có cảnh báo rằng đây **không phải HTML hợp lệ** — các bạn cứ yên tâm, đừng bận tâm chuyện đó lúc này. Mục tiêu của bài hôm nay chỉ là đưa được nội dung lên cửa sổ trình duyệt; việc xây một trang đúng chuẩn sẽ đến ở bài sau hoặc bài kế tiếp.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Thẻ `strong` có tác dụng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** In đậm (boldface) văn bản nằm giữa thẻ mở và thẻ đóng.
Giải thích: Mọi nội dung giữa `<strong>` và `</strong>` đều chịu tác động của thẻ này.
Tham chiếu: Mục "HTML đầu tiên nằm trong một biến".

</details>

**Câu 2:** Vì sao lần chạy đầu tiên, trình duyệt in nguyên cả thẻ HTML ra màn hình?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chúng ta chưa gửi header cho trình duyệt biết nội dung nhận được là HTML.
Giải thích: Thiếu thông tin đó, trình duyệt coi tất cả là văn bản thuần.
Tham chiếu: Mục "Lần chạy đầu tiên".

</details>

**Câu 3:** Dòng `w.Header().Set("Content-Type", "text/html")` gửi đi thông tin gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một header báo cho trình duyệt rằng nội dung sắp nhận là `text/html`.
Giải thích: Header được trình duyệt tiếp nhận nhưng không hiển thị cho người dùng cuối.
Tham chiếu: Mục "Một dòng lệnh thần kỳ".

</details>

**Câu 4:** Vì sao cách viết HTML trong biến string vẫn phiền?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mỗi lần sửa một chữ trong HTML, bạn phải biên dịch lại toàn bộ chương trình.
Giải thích: Giải pháp là đưa HTML ra file riêng — sẽ làm ở bài sau.
Tham chiếu: Đoạn kết bài.

</details>

**Câu 5:** Cảnh báo "not valid html" của Firefox có đáng lo không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không. Bài này chỉ tập trung đưa nội dung lên trình duyệt; trang đúng chuẩn sẽ được xây ở các bài tiếp theo.
Giải thích: View Page Source cho thấy thứ gửi đi vẫn là chuỗi HTML gốc.
Tham chiếu: Mục "Nhìn vào page source".

</details>

---

Viết HTML dưới dạng biến string trong chương trình Go sẽ rất phiền: mỗi lần muốn sửa một chữ, bạn phải **biên dịch lại toàn bộ chương trình**. Bài tiếp theo, chúng ta sẽ để HTML **nằm trong file riêng** và dạy Go cách đọc file đó để render cho người dùng. Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [pkg.go.dev — net/http Header](https://pkg.go.dev/net/http#Header)
