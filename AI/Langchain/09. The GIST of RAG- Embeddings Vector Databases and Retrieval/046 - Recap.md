# 🔁 Recap: Data Indexing đã xong — chính thức bước sang chương Retrieval

Chào các bạn, Eden đây! Vậy là chúng ta đã chính thức **hoàn thành phần data indexing** — nạp tài liệu, chia chunk, tạo embedding và đánh chỉ mục toàn bộ vào vector database. Trong vài video tiếp theo, mình và các bạn sẽ cùng **đi thật sâu vào phần retrieval (truy hồi)** — chặng thứ hai của RAG pipeline.

### 🎯 Data indexing xong, còn gì phía trước?

Nhìn lại một chút: chúng ta đã có dữ liệu nằm gọn trong **vector store**, sẵn sàng cho truy vấn. Nhưng dữ liệu "nằm đó" thì chưa giúp ích gì cho người dùng — điều còn thiếu chính là **cơ chế tìm ra đúng phần thông tin liên quan** mỗi khi có câu hỏi mới.

*Chính vì vậy mà phần tiếp theo là retrieval* — và mình hứa đây sẽ là những bài rất thú vị, vì các bạn sẽ thấy toàn bộ pipeline RAG "sống dậy" và trả lời được những câu hỏi mà LLM không thể tự trả lời chính xác.

---

### 🔍 Retrieval sẽ hoạt động như thế nào?

Nói ngắn gọn, phần retrieval sẽ diễn ra theo trình tự:

1. Lấy **câu hỏi (query)** của người dùng.
2. **Embed** câu hỏi đó thành một **vector**.
3. Yêu cầu vector database trả về **top k chunk** có độ tương đồng cao nhất với vector câu hỏi.

Sau đó, những **chunk liên quan** này sẽ được ghép cùng **query gốc của người dùng** — và đó chính là thứ được gửi đến **LLM**. Nhờ vậy, câu trả lời sinh ra sẽ được **ground (neo) vào đúng thông tin mà chúng ta muốn**, thay vì để model tự do "bịa" ra.

*Nếu các bạn còn nhớ phần ingestion*, chính các **chunk** cùng **metadata source** mà chúng ta đã lưu chính là "nguyên liệu" cho bước này — giờ thì chúng ta chỉ còn thiếu phần "chọn lọc và truy vấn" mà thôi.

---

### 🔄 Vì sao các video sắp tới được quay lại?

Trước khi đi tiếp, mình có một **heads-up** nho nhỏ: **LangChain đã thay đổi rất nhiều** kể từ khi mình làm khóa học này. Vì vậy, vài video sắp tới đã được **quay lại**: mình xóa các bản ghi cũ và ghi mới hoàn toàn để bám sát phiên bản mới nhất.

Điều này dẫn đến hai thay đổi nhỏ trong phần thực hành:

* **IDE:** giờ mình dùng **Cursor** thay vì PyCharm.
* **Package manager:** giờ mình dùng **UV** thay vì **Pipenv**.

*Các bạn cứ yên tâm nhé:* toàn bộ code chúng ta đã viết ở phần ingestion vẫn là **best practice** với phiên bản LangChain mới nhất — nó không thay đổi chút nào. Phần thay đổi đáng kể là **retrieval**, và đó chính là lý do mình quay lại những video này.

---

### 🤝 Lời hứa giữ khóa học luôn cập nhật

Mình cũng dự định **ghi lại cả các video đầu tiên** với **Cursor** và **UV** để mọi thứ đồng bộ và mượt mà hơn. *Mong các bạn thông cảm cho chút bất tiện nhỏ này nhé* — mình đang cố gắng hết sức để khóa học luôn đi kịp với những thay đổi của LangChain.

Vậy là bức tranh đã rõ: indexing xong, retrieval đang chờ. Cùng mình bước vào bài tiếp theo để bắt đầu viết những dòng code đầu tiên của phần truy hồi nhé! 🚀
