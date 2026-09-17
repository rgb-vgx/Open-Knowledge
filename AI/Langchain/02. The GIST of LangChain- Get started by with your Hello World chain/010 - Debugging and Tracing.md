# 🐛 Debug & "mổ xẻ" chain: Điều gì thực sự nằm trong một response?

> Nguồn: `010-Debugging-and-Tracing-Our-LangChain-Chain.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/52016039)

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

| Thuộc tính | Chứa gì | Dùng để làm gì |
|---|---|---|
| `content` | Đoạn văn model sinh ra | Đọc câu trả lời thật của LLM |
| `response_metadata` | Model, finish reason, số token | Debug, monitoring và phân tích |
| Các field khác của AIMessage | Tool calling, token, chi phí | Theo dõi agent nhiều bước, tối ưu chi phí |

Ở góc nhìn này, bạn cũng sẽ thấy **type** của message được hiển thị là `ai`.

Toàn bộ những thông tin này có vẻ "nhỏ nhặt" lúc này, nhưng khi ứng dụng của bạn lớn dần — đặc biệt là các agent với nhiều bước gọi model — chúng chính là thứ giúp bạn hiểu chuyện gì đang xảy ra, cũng như tối ưu chi phí và hiệu năng.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Type của biến `response` sau khi chain chạy là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `AIMessage` — một wrapper class đơn giản bao quanh những gì LLM trả về.

Giải thích: Bạn thấy điều này khi đặt breakpoint và kiểm tra biến trong debug mode.

Tham chiếu: Mục Đặt breakpoint và chạy debug.

</details>

**Câu 2:** Câu trả lời thật của model nằm ở field nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Field `content`.

Giải thích: Mở `content` là thấy chính xác đoạn văn model đã sinh ra.

Tham chiếu: Mục Bên trong một AIMessage.

</details>

**Câu 3:** Ngoài `content`, AIMessage còn chứa những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tool calling, số token đã tiêu thụ, chi phí của lần gọi và nhiều thứ hữu ích khác.

Giải thích: Chúng ta chưa cần mổ xẻ hết ngay, nhưng đây là "mỏ vàng" thông tin khi debug.

Tham chiếu: Mục Bên trong một AIMessage.

</details>

**Câu 4:** `response_metadata` chứa những thông tin gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Model đã dùng, finish reason (lý do LLM kết thúc phản hồi), số token đã tiêu thụ và nhiều metadata khác.

Giải thích: Đây là nơi phục vụ debugging, monitoring và phân tích ứng dụng.

Tham chiếu: Mục response_metadata — "mỏ vàng" thông tin.

</details>

**Câu 5:** Vì sao các metadata này càng quan trọng khi lên agent?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì agent có nhiều bước gọi model — metadata giúp hiểu chuyện gì đang xảy ra, cũng như tối ưu chi phí và hiệu năng.

Giải thích: Ở quy mô nhỏ chúng có vẻ "nhỏ nhặt", nhưng khi ứng dụng lớn dần thì cực kỳ giá trị.

Tham chiếu: Mục response_metadata — "mỏ vàng" thông tin.

</details>

Vậy là bạn đã biết cách debug và nhìn thấu bên trong một chain. Ở bài tiếp theo, mình sẽ chỉ bạn cách **đổi từ OpenAI sang một model mã nguồn mở chạy ngay trên máy** — nhẹ, nhanh và miễn phí! Hẹn gặp lại nhé! 🚀

## Nguồn tham khảo

- [Udemy — Debugging and Tracing Our LangChain Chain](https://ua.udemy.com/course/langchain/learn/lecture/52016039)
- [LangChain Docs — Overview](https://docs.langchain.com/oss/python/langchain/overview)
