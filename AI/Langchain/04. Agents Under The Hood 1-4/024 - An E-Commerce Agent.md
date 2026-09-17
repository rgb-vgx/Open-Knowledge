# 🛒 Chúng ta sẽ xây gì? Một E-Commerce Agent tính giá sau giảm

Chào các bạn, Eden đây! Section "Agents Under The Hood" sẽ xoay quanh một bài toán rất đời: **một agent cho cửa hàng thương mại điện tử**.

Nghe đơn giản, nhưng đây là ví dụ hoàn hảo để mổ xẻ kiến trúc agent — vì nó có đủ "đất" cho agent suy luận qua nhiều bước. Cùng xem đề bài nhé.

---

### 🏪 Bối cảnh: cửa hàng bán đồ công nghệ

Cửa hàng của chúng ta bán **hardware (phần cứng)**:

* **Tai nghe (headphones)**
* **Bàn phím (keyboards)**
* **Laptop**

Cửa hàng đang chạy **chương trình khuyến mãi, giảm giá** với các hạng khách hàng:

* **Bronze discount** — hạng đồng.
* **Silver discount** — hạng bạc.
* **Gold discount** — hạng vàng.

Mỗi hạng tương ứng với **một mức giảm giá khác nhau**. Ví dụ: hạng **bronze** được giảm **15%**.

---

### 🎯 Yêu cầu: agent trả về giá sau giảm

Chúng ta cần một agent có thể **nhận câu hỏi từ người dùng** và **trả về giá của món hàng sau khi áp dụng giảm giá**.

Ví dụ: *"Giá của một chiếc laptop với hạng giảm giá gold là bao nhiêu?"*

Để làm được điều đó, agent sẽ dùng **hai tool**:

1. **Lấy giá của sản phẩm** — ví dụ giá của laptop (hay máy tính).
2. **Lấy số tiền giảm giá** tương ứng với hạng thành viên (bronze, silver, gold).

Chỉ hai tool thôi — nhưng đủ để agent phải **lý luận theo nhiều bước**: lấy giá trước, rồi mới áp giảm giá.

---

### 🧰 Cách "chuẩn LangChain" và cách chúng ta sẽ làm

Nếu dùng abstraction của **LangChain**, bài này gọn gàng trong vài dòng: gọi **`create_agent`**, đưa **LLM**, đưa **danh sách tools** (lấy giá + lấy giảm giá). Đúng ra thì chúng ta sẽ làm như vậy.

Nhưng trong section này, chúng ta sẽ không đi đường tắt. Thay vào đó, mình sẽ **hiện thực một phiên bản tinh gọn (lean version)** của agent loop — để bạn thấy rõ **từng bước bên trong**: LLM quyết định gọi tool nào, ta thực thi ra sao, và kết quả quay ngược trở lại prompt như thế nào.

Sơ đồ trong video mô tả chính xác những gì chúng ta sắp cài đặt. Cùng bắt đầu thôi — hẹn gặp các bạn ở bài tiếp theo! 🚀
