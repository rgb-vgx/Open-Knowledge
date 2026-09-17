# 🐛 Debug & "mổ xẻ" chain: Điều gì thực sự nằm trong một response?

Chào các bạn, Eden đây! Chain đầu tiên đã chạy ngon lành, nhưng để thật sự hiểu LangChain, ta cần nhìn vào **những object ẩn bên trong**. Video này, chúng ta sẽ bật chế độ debug và "mổ xẻ" từng thứ một.

*Đừng lo, không có phép thuật nào ở đây cả — mọi thứ đều minh bạch.*

---

### 🔍 Đặt breakpoint và chạy debug

Mình đặt một **breakpoint** và chạy chương trình ở **debug mode**, tua nhanh tới lúc chạm điểm dừng.

Kiểm tra biến `response` — bạn sẽ thấy nó có type là **`AIMessage`** (AI message). Vậy bên trong nó có gì?

---

### 📨 Bên trong một AIMessage

**`AIMessage` là một wrapper class đơn giản bao quanh những gì LLM trả về**, và câu trả lời thật sự nằm ở field **`content`**. Mở `content`, ta thấy chính xác đoạn văn mà model đã sinh ra.

Nhưng `AIMessage` còn chứa **rất nhiều thông tin khác**:

* **Tool calling** — dấu vết các tool mà model đã gọi.
* **Số token đã tiêu thụ** trong lần gọi đó.
* **Chi phí** của lần gọi đó.
* Và nhiều thứ hữu ích khác nữa.

*Chúng ta chưa cần mổ xẻ hết mọi thứ ngay bây giờ* — nếu tò mò, bạn có thể xem video về các loại message trong LangChain mà mình đã làm riêng.

---

### 🔎 response_metadata — "mỏ vàng" thông tin

Thêm một điểm đáng chú ý: bạn còn có thể kiểm tra **`response_metadata`** — nơi chứa cực nhiều thông tin giá trị:

* **Model nào đã được dùng** cho lần gọi này.
* **Finish reason** — lý do LLM kết thúc phản hồi (mình sẽ nói rất kỹ về nó khi chúng ta bàn về **agents**).
* **Số token đã tiêu thụ**.
* Rất nhiều metadata khác phục vụ **debugging, monitoring và phân tích** ứng dụng.

Ở góc nhìn này, bạn cũng sẽ thấy **type** của message được hiển thị là `ai`.

Toàn bộ những thông tin này có vẻ "nhỏ nhặt" lúc này, nhưng khi ứng dụng của bạn lớn dần — đặc biệt là các agent với nhiều bước gọi model — chúng chính là thứ giúp bạn hiểu chuyện gì đang xảy ra, cũng như tối ưu chi phí và hiệu năng.

---

Vậy là bạn đã biết cách debug và nhìn thấu bên trong một chain. Ở bài tiếp theo, mình sẽ chỉ bạn cách **đổi từ OpenAI sang một model mã nguồn mở chạy ngay trên máy** — nhẹ, nhanh và miễn phí! Hẹn gặp lại nhé! 🚀
