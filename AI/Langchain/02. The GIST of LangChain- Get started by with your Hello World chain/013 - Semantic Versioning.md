# 🔢 Semantic Versioning: Vì sao bạn không cần quá lo về version của LangChain

Chào các bạn, Eden đây! Một câu hỏi mình nhận được khá nhiều: "Nếu LangChain ra bản mới thì code trong khóa học có hỏng không?" Bài này chúng ta sẽ nói về **version** và khái niệm **semantic versioning** để bạn hoàn toàn yên tâm.

*Câu trả lời ngắn gọn là: phần lớn trường hợp sẽ chẳng có vấn đề gì cả!*

---

### 📌 Khóa học này dùng phiên bản nào?

Khóa học được xây dựng tương thích với **phiên bản 1.0.2** — bản mới nhất ở thời điểm quay.

Tùy vào thời điểm bạn học, bạn có thể đang dùng một phiên bản khác. Cách kiểm tra rất đơn giản: mở **UV lock file** (`uv.lock`) của project. File này ghi lại chính xác phiên bản LangChain bạn đang cài.

File lock của mình cũng được **đính kèm trong repo khóa học**, và bạn có thể thấy version ghi là **1.0.2**. Khi chúng ta chạy `uv add langchain`, hệ thống đã tự động cài phiên bản LangChain mới nhất có sẵn tại thời điểm đó.

---

### 🔢 Semantic versioning — "giao kèo" giữa các phiên bản

Với hầu hết các **minor change (thay đổi nhỏ)**, chúng ta sẽ **không gặp vấn đề tương thích**. Những phiên bản đó chỉ chứa **sửa lỗi (bug fixes)**, có thể thêm chút **tính năng mới**, nhưng **không có gì làm hỏng code viết trên các phiên bản trước**.

Ví dụ dễ hiểu: giả sử bạn học khóa này **một tháng sau**, lúc đó LangChain có thể đã ở phiên bản **1.0.7**. Mọi thứ vẫn ổn, vì chỉ có các **patch** được thêm vào mà thôi.

Nói một cách đơn giản, một số phiên bản như `1.0.2` gồm ba phần: **major**, **minor** và **patch**. Khi chỉ phần **minor** (số giữa) hoặc **patch** (số cuối) thay đổi, code viết trên bản cũ vẫn chạy bình thường — đó là lý do các bản nâng cấp nhỏ không đáng lo.

Đó chính là tinh thần của **semantic versioning** — cơ chế đánh số phiên bản cho chúng ta biết thay đổi nào an toàn và thay đổi nào có thể gây ảnh hưởng.

---

### 🤝 Nếu có breaking change thì sao?

Sẽ có lúc LangChain ra thay đổi lớn (breaking change). Khi đó, mình **cập nhật khóa học để khớp với phiên bản mới**.

Vì vậy, nếu bạn gặp bất kỳ **incompatibility** nào, hãy **ping mình trong Discord channel** — mình rất sẵn lòng xử lý.

Nhìn chung, những gì bạn thấy trong video sẽ **khớp với phiên bản mới nhất của LangChain**.

---

Vậy nên cứ yên tâm mà học — mình luôn cập nhật để khóa học bám sát LangChain hiện tại. Hẹn gặp bạn ở bài tiếp theo! 🚀
