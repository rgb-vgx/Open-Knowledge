# 📜 IAM Policies — Hiểu sâu cấu trúc policy chuẩn AWS

> Nguồn: `015-IAM-Policies.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/26623452)

Ở bài trước chúng ta đã tạo policy qua giao diện; bài này mình sẽ giúp các bạn hiểu **policy được gắn ở đâu, kế thừa ra sao và cấu trúc bên trong gồm những gì**. Đây là kiến thức "ăn điểm" trong đề thi, nên các bạn chú ý nhé.

---

### 👥 Policy gắn ở cấp group, user hay cả hai?

Quay lại ví dụ nhóm **developers** gồm Alice, Bob, Charles:

* Khi gắn policy ở **cấp group**, policy áp dụng cho **mọi thành viên** — cả Alice, Bob lẫn Charles đều **kế thừa (inherit)** policy này.
* Group **operations** với policy khác sẽ khiến David và Edward có bộ quyền khác nhóm developers.
* **Fred** có thể **không thuộc group nào**, và ta có thể tạo **inline policy** — policy **chỉ gắn riêng cho một user** (user đó có thể có hoặc không thuộc group).
* Nếu **Charles và David** cùng ở nhóm **audit** và audit cũng có policy, họ sẽ **kế thừa thêm**.

Kết quả: **Charles** có policy từ developers + audit; **David** có policy từ operations + audit. Một user **có thể nhận nhiều policy từ nhiều nguồn** — phần hands-on sẽ làm rõ điều này.

---

### 🧱 Cấu trúc một IAM policy

Policy là một **JSON document**, và cấu trúc của nó gồm:

| Thành phần | Bắt buộc | Ý nghĩa |
|---|---|---|
| **Version** | Có | Phiên bản ngôn ngữ policy, thường là `2012-10-17` |
| **Id** | Không | Định danh cho policy |
| **Statement** | Có | Một hoặc nhiều statement |
| **Sid** | Không | Định danh cho từng statement |
| **Effect** | Có | `Allow` hoặc `Deny` truy cập API |
| **Principal** | Có | Account, user hoặc role mà policy áp dụng |
| **Action** | Có | Danh sách API call được allow hoặc deny |
| **Resource** | Có | Danh sách tài nguyên mà action áp dụng lên |
| **Condition** | Không | Điều kiện để statement được áp dụng |

Ví dụ, **Principal** trong bài được áp cho **root account** của AWS account; **Resource** có thể là một **bucket** — nhưng thực tế có thể là rất nhiều loại tài nguyên khác. **Condition** là tùy chọn nên không phải policy nào cũng có.

---

### 🎯 Trọng tâm cho kỳ thi

Khi vào phòng thi, các bạn cần **thật chắc 4 thành phần**: **Effect**, **Principal**, **Action** và **Resource**. *Đừng lo — bạn sẽ gặp lại chúng nhiều lần trong khóa học*, đến cuối khóa sẽ hoàn toàn tự tin.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Policy gắn ở cấp group sẽ áp dụng cho ai?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mọi thành viên của group đó. Giải thích: Alice, Bob, Charles đều kế thừa policy gắn cho group developers. Tham chiếu: Mục Policy gắn ở cấp group.
</details>

**Câu 2:** Inline policy là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Policy chỉ gắn riêng cho một user. Giải thích: User đó có thể thuộc hoặc không thuộc group nào. Tham chiếu: Mục Policy gắn ở cấp group.
</details>

**Câu 3:** Version của policy thường mang giá trị nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `2012-10-17`. Giải thích: Đây là phiên bản ngôn ngữ policy. Tham chiếu: Mục Cấu trúc một IAM policy.
</details>

**Câu 4:** Effect có thể nhận những giá trị nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `Allow` hoặc `Deny`. Giải thích: Effect quyết định cho phép hay từ chối truy cập API. Tham chiếu: Mục Cấu trúc một IAM policy.
</details>

**Câu 5:** Bốn thành phần policy cần nắm chắc cho kỳ thi là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Effect, Principal, Action, Resource. Giải thích: Đây là các phần được nhấn mạnh cho phần thi. Tham chiếu: Mục Trọng tâm cho kỳ thi.
</details>

---

Hiểu cấu trúc policy là bạn đã nắm được "linh hồn" của IAM. Ở bài tiếp theo, chúng ta sẽ vào console **thực hành gỡ quyền, gắn quyền và tự tạo policy**. Hẹn gặp các bạn! 🚀
