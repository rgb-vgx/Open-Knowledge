# 🔢 Semantic Versioning: Vì sao bạn không cần quá lo về version của LangChain

> Nguồn: `013-Semantic-Versioning-in-LangChain.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/43182340)

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

| Thành phần | Vị trí trong x.y.z | Khi nào tăng | Ảnh hưởng code cũ |
|---|---|---|---|
| Major | x | Có breaking change | Có thể làm hỏng code |
| Minor | y | Thêm tính năng tương thích ngược | An toàn |
| Patch | z | Sửa lỗi | An toàn |

Đó chính là tinh thần của **semantic versioning** — cơ chế đánh số phiên bản cho chúng ta biết thay đổi nào an toàn và thay đổi nào có thể gây ảnh hưởng.

---

### 🤝 Nếu có breaking change thì sao?

Sẽ có lúc LangChain ra thay đổi lớn (breaking change). Khi đó, mình **cập nhật khóa học để khớp với phiên bản mới**.

Vì vậy, nếu bạn gặp bất kỳ **incompatibility** nào, hãy **ping mình trong Discord channel** — mình rất sẵn lòng xử lý.

Nhìn chung, những gì bạn thấy trong video sẽ **khớp với phiên bản mới nhất của LangChain**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khóa học được xây dựng tương thích với phiên bản LangChain nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phiên bản 1.0.2 — bản mới nhất ở thời điểm quay.

Giải thích: Tùy thời điểm bạn học, bạn có thể đang dùng phiên bản khác.

Tham chiếu: Mục Khóa học này dùng phiên bản nào.

</details>

**Câu 2:** Làm sao kiểm tra phiên bản LangChain bạn đang cài?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mở UV lock file (`uv.lock`) của project — file này ghi lại chính xác phiên bản đang cài.

Giải thích: File lock của khóa học cũng được đính kèm trong repo.

Tham chiếu: Mục Khóa học này dùng phiên bản nào.

</details>

**Câu 3:** Minor change và patch change có làm hỏng code cũ không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không. Chúng chỉ chứa sửa lỗi hoặc thêm tính năng tương thích ngược.

Giải thích: Đó là lý do các bản nâng cấp nhỏ không đáng lo.

Tham chiếu: Mục Semantic versioning — "giao kèo" giữa các phiên bản.

</details>

**Câu 4:** Vì sao từ 1.0.2 lên 1.0.7 vẫn an toàn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chỉ các patch được thêm vào — sửa lỗi và thay đổi nhỏ, không phá vỡ tương thích.

Giải thích: Chỉ khi phần major thay đổi mới có breaking change đáng lo.

Tham chiếu: Mục Semantic versioning — "giao kèo" giữa các phiên bản.

</details>

**Câu 5:** Nếu có breaking change hoặc incompatibility thì nên làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Eden sẽ cập nhật khóa học cho khớp phiên bản mới; học viên gặp lỗi hãy ping mình trong Discord channel.

Giải thích: Mục tiêu là nội dung video luôn khớp với phiên bản mới nhất của LangChain.

Tham chiếu: Mục Nếu có breaking change thì sao.

</details>

Vậy nên cứ yên tâm mà học — mình luôn cập nhật để khóa học bám sát LangChain hiện tại. Hẹn gặp bạn ở bài tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Semantic Versioning in LangChain](https://ua.udemy.com/course/langchain/learn/lecture/43182340)
- [Semantic Versioning 2.0.0 — semver.org](https://semver.org)
