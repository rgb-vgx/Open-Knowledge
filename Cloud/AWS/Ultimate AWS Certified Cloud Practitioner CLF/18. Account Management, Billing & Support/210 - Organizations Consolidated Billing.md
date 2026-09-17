# 💵 Consolidated Billing: Một hóa đơn cho cả tổ chức, ưu đãi chia sẻ cho mọi tài khoản

> Nguồn: `210-Organizations-Consolidated-Billing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/29102368)

Tiếp nối AWS Organizations, bài này chúng ta đào sâu vào **Consolidated Billing (thanh toán gộp)** — cơ chế mang lại lợi ích tiền bạc rõ rệt nhất khi gom nhiều tài khoản vào một tổ chức. Đây cũng là phần **đề thi rất hay kiểm tra**, đặc biệt là chuyện chia sẻ Reserved Instances.

---

### 🧾 Bật Consolidated Billing, bạn được hai thứ

**1. Combined Usage (tổng hợp mức sử dụng)** — gộp mức sử dụng của **tất cả tài khoản** lại với nhau, để rồi:

* **Chia sẻ volume pricing (giá theo khối lượng)**: ví dụ khi vượt một mốc dung lượng (khoảng **5 terabyte**), phần dung lượng tiếp theo sẽ có giá rẻ hơn. Nếu mỗi tài khoản dùng **1 TB** mà bạn có **6 tài khoản**, thì gộp lại cả nhóm sẽ được hưởng mức giá ưu đãi.
* **Chia sẻ discount của Reserved Instances (RI) hoặc Savings Plans** đang nằm ở một tài khoản cho mọi tài khoản khác — tiếp tục tối đa hóa tiết kiệm.

**2. One Bill (một hóa đơn duy nhất)** — tất cả tài khoản trong tổ chức chỉ nhận **một hóa đơn chung**. Điều này:

* Giúp ích rất nhiều cho **phòng kế toán** của bạn.
* Khiến bạn **không bị giới hạn về số lượng tài khoản** muốn tạo trên AWS.

---

### 🔁 Reserved Instance Sharing — ví dụ "kinh điển" của đề thi

Giả sử tổ chức có hai tài khoản:

* **Account A**: không có Reserved Instance nào.
* **Account B**: có **5 Reserved Instances** cho EC2.

Cả hai tài khoản cùng nằm trong **một AZ** (vì Reserved Instances gắn với cấp AZ), và tổng cộng có **9 EC2 instances**: **3** chạy ở Account B, **6** chạy ở Account A. Khi **Reserved Instance sharing** được bật:

* 3 instance của Account B đương nhiên dùng giá reserved.
* **2 Reserved Instances còn dư** của Account B được **chia cho Account A**, nên 2 instance bên A cũng hưởng giá reserved.

| Tài khoản | EC2 đang chạy | RI sở hữu | Kết quả sau sharing |
|---|---|---|---|
| Account B | 3 | 5 | 3 instance giá reserved, dư 2 RI |
| Account A | 6 | 0 | 2 instance hưởng giá reserved |
| **Tổng** | **9** | **5** | **5 reserved + 4 non-reserved** |

Điểm mấu chốt: dù Account B chỉ chạy **3 trong 5** instance đã reserve, phần RI dư vẫn không bị lãng phí.

---

### ⚠️ Điều quan trọng cần nhớ cho kỳ thi

* Đề sẽ kiểm tra **shared volume pricing (chia sẻ giá theo khối lượng)** và **ý nghĩa của việc chia sẻ Reserved Instances**.
* **Reserved Instance discount sharing có thể bị tắt** cho bất kỳ tài khoản nào trong tổ chức — **bao gồm cả management account**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Consolidated Billing mang lại hai lợi ích chính nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Combined Usage (tổng hợp mức sử dụng) và One Bill (một hóa đơn duy nhất).

Giải thích: Gộp usage để hưởng ưu đãi, gộp hóa đơn để dễ quản lý và không giới hạn số tài khoản.

Tham chiếu: Mục Bật Consolidated Billing.

</details>

**Câu 2:** Reserved Instance sharing chỉ hoạt động trong phạm vi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trong cùng một AZ — vì Reserved Instances gắn với cấp AZ.

Giải thích: Đây là chi tiết quan trọng trong ví dụ chia sẻ RI.

Tham chiếu: Mục Reserved Instance Sharing.

</details>

**Câu 3:** Trong ví dụ, sau khi bật sharing có bao nhiêu instance được hưởng giá reserved?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 5 instance — 3 instance của Account B và 2 instance của Account A.

Giải thích: 5 RI của B dùng hết: 3 cho chính B, 2 chia cho A; còn lại 4 instance giá on-demand.

Tham chiếu: Mục Reserved Instance Sharing.

</details>

**Câu 4:** Có thể tắt Reserved Instance discount sharing cho management account không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — RI discount sharing có thể tắt cho bất kỳ tài khoản nào, kể cả management account.

Giải thích: Đây là một chi tiết đề thi có thể hỏi.

Tham chiếu: Mục Điều quan trọng cần nhớ.

</details>

**Câu 5:** One Bill giúp ích gì cho doanh nghiệp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một hóa đơn chung cho mọi tài khoản — giúp phòng kế toán và không giới hạn số tài khoản có thể tạo.

Giải thích: Thay vì mỗi tài khoản một hóa đơn, tổ chức chỉ nhận một hóa đơn duy nhất.

Tham chiếu: Mục Bật Consolidated Billing.

</details>

---

Consolidated Billing tuy ngắn nhưng là "mỏ điểm" trong đề thi: **combined usage** giúp tận dụng volume pricing và chia sẻ RI/Savings Plans, còn **One Bill** giúp kế toán nhàn hơn và không giới hạn số tài khoản.

Bài sau chúng ta sẽ bước sang **AWS Control Tower** — cách dựng môi trường đa tài khoản chuẩn best practices chỉ trong vài cú click. Hẹn gặp các bạn ở đó! 🚀
