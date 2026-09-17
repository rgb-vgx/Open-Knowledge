# 🪟 Đăng nhập nhiều tài khoản AWS cùng lúc trên một trình duyệt

> Nguồn: `014-AWS-Console-Simultaneous-Sign-in.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/51960267)

Bạn đã bao giờ ước có thể mở hai tài khoản AWS trong **cùng một trình duyệt**? Trong bài ngắn này, mình sẽ demo **multi-session support (hỗ trợ đa phiên)** — một tính năng mình đánh giá là "cuộc cách mạng nhỏ" cho những ai dùng AWS hằng ngày.

---

### 🔄 Bật multi-session và thêm phiên mới

Cách dùng rất đơn giản:

1. Bấm vào **multi-session support** để bật tính năng.
2. Bấm **Add session** để thêm một phiên mới.
3. Đăng nhập bằng **account ID hoặc root** của tài khoản khác, rồi bấm **Go**.

Lúc này, trên **cùng một trình duyệt**, bạn đã có hai danh tính (role hoặc account) hoạt động song song — không cần mở trình duyệt thứ hai.

---

### 🧪 Thử nghiệm nhanh với EBS volume

Để chứng minh hai phiên hoàn toàn độc lập, mình vào **EC2 console → Volumes** và tạo thử một **EBS volume 1 GB** ở tài khoản này. Volume tạo thành công.

Sau đó mình chuyển sang cửa sổ tài khoản kia, cũng vào **EC2 → EBS**: **không thấy volume nào cả**, vì đây là tài khoản khác. *Các bạn không cần biết EBS là gì lúc này* — mình chỉ muốn cho thấy bạn có thể mở **hai tài khoản trong hai cửa sổ của cùng một trình duyệt**.

---

### 💡 Vì sao tính năng này quan trọng?

* Trước đây, muốn dùng nhiều tài khoản bạn phải mở nhiều trình duyệt hoặc dùng cửa sổ ẩn danh.
* Giờ đây **hai phiên chạy song song trong cùng một trình duyệt**, rất tiện khi làm việc với AWS ở quy mô lớn.
* Với mình — người đã dùng AWS hơn **10 năm** — đây là một bổ sung cực kỳ đáng giá.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Multi-session support cho phép bạn làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đăng nhập nhiều danh tính (role hoặc account) trong cùng một trình duyệt. Giải thích: Bấm bật tính năng rồi thêm phiên bằng Add session. Tham chiếu: Mục Bật multi-session.
</details>

**Câu 2:** Sau khi bật, bạn thêm một phiên mới bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bấm **Add session**, đăng nhập bằng account ID hoặc root của tài khoản khác rồi bấm **Go**. Tham chiếu: Mục Bật multi-session.
</details>

**Câu 3:** Mình demo hai phiên độc lập bằng thao tác gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tạo một **EBS volume 1 GB** ở tài khoản này rồi kiểm tra ở tài khoản kia. Tham chiếu: Mục Thử nghiệm nhanh.
</details>

**Câu 4:** Vì sao EBS volume không xuất hiện ở cửa sổ còn lại?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hai cửa sổ đang dùng **hai tài khoản AWS khác nhau**. Tham chiếu: Mục Thử nghiệm nhanh.
</details>

**Câu 5:** Trước khi có tính năng này, muốn dùng nhiều tài khoản bạn phải làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mở nhiều trình duyệt hoặc dùng cửa sổ ẩn danh. Tham chiếu: Mục Vì sao tính năng này quan trọng.
</details>

---

Bạn **không cần tạo EBS volume** theo mình đâu, chỉ cần nhớ rằng hoàn toàn có thể mở nhiều tài khoản AWS cùng lúc. Ở bài tiếp theo, chúng ta sẽ mổ xẻ chi tiết **IAM policies** — nhớ đón xem nhé! 🚀
