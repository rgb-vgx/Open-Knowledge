# 🗃️ CodeCommit: Kho lưu trữ Git riêng tư trong tài khoản AWS

> Nguồn: `125-CodeCommit-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682558)

Bây giờ chúng ta bước vào nhóm **code-related tools** — các công cụ liên quan tới code trong AWS, bắt đầu từ nơi lưu trữ code: **CodeCommit**. *Bài này ngắn thôi nhưng là nền tảng cho cả bộ công cụ CI/CD về sau.*

---

### 🎯 Trước khi deploy code, hãy lưu code ở đâu đó

Trước khi đẩy **application code** lên server, bạn cần **lưu code ở một nơi nào đó**. Developer thường chọn một **code repository (kho chứa code)**, và gần như luôn được xây trên công nghệ **Git**.

Một sản phẩm public rất nổi tiếng là **GitHub**. Nhưng AWS có một sản phẩm cạnh tranh: **CodeCommit**.

---

### 🔐 CodeCommit là gì?

CodeCommit là cách để bạn **lưu code ngay trong AWS**, dưới dạng một **version control repository (kho quản lý phiên bản)**. Đây là repository **dựa trên Git**.

Khi đã có repository Git, mọi thứ trở nên dễ dàng hơn rất nhiều:

* Developer **cộng tác với nhau** trên cùng codebase trở nên cực kỳ đơn giản.
* Các thay đổi code được **tự động đánh phiên bản (versioned)** và **có thể rollback (khôi phục)** khi cần.

---

### 💡 Lợi ích nổi bật

* **Fully-managed code repository** — kho chứa code được quản lý hoàn toàn bởi AWS.
* **Scalable** — mở rộng tốt.
* **Highly available** — tính sẵn sàng cao.
* **Nằm trong chính tài khoản AWS của bạn** — nhờ vậy code **riêng tư (private)** và **bảo mật (secure)**.
* **Tích hợp với mọi dịch vụ AWS** — thuận tiện khi ghép vào quy trình CI/CD.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** CodeCommit là sản phẩm gì của AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dịch vụ lưu trữ code (code repository) dựa trên Git, cạnh tranh với GitHub.

Giải thích: Đây là nơi lưu code trước khi deploy lên server.

Tham chiếu: Mục Trước khi deploy code.

</details>

**Câu 2:** CodeCommit dựa trên công nghệ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Git.

Giải thích: Đây là version control repository dựa trên Git.

Tham chiếu: Mục CodeCommit là gì.

</details>

**Câu 3:** Lợi ích nào giúp developer cộng tác trên code dễ dàng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Repository Git giúp cộng tác dễ dàng; thay đổi được tự động versioned và có thể rollback.

Giải thích: Đây là lợi ích cốt lõi của version control.

Tham chiếu: Mục CodeCommit là gì.

</details>

**Câu 4:** Vì sao code trên CodeCommit được xem là riêng tư và bảo mật?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì repository nằm trong chính tài khoản AWS của bạn.

Giải thích: Code không nằm ở nền tảng public bên ngoài.

Tham chiếu: Mục Lợi ích nổi bật.

</details>

**Câu 5:** Ba tính chất của CodeCommit với tư cách managed service là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Fully-managed, scalable và highly available.

Giải thích: AWS quản lý hoàn toàn, dịch vụ mở rộng tốt và có tính sẵn sàng cao.

Tham chiếu: Mục Lợi ích nổi bật.

</details>

---

Vậy là bạn đã biết CodeCommit là "nhà kho" Git riêng tư của bạn trên AWS. Ở các bài tiếp theo, chúng ta sẽ đi sâu hơn vào bộ công cụ CI/CD của AWS để xây dựng quy trình deploy hoàn chỉnh.

Hẹn gặp các bạn ở bài sau! 🚀
