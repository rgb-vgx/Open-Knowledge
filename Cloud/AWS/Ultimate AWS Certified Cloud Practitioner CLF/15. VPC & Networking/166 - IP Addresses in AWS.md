# 🌐 Địa chỉ IP trong AWS: IPv4, IPv6 và Elastic IP

> Nguồn: `166-IP-Addresses-in-AWS.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/36566084)

Trước khi bước vào VPC, mình muốn các bạn nắm thật chắc một viên gạch nền: **địa chỉ IP trong AWS**. Bài này nghe có vẻ nhỏ, nhưng đây là kiến thức cực kỳ thực dụng và rất dễ gặp trong đề — nào là public IPv4, private IPv4, Elastic IP, giá tiền, và vì sao AWS đang muốn bạn chuyển sang IPv6.

---

### 🌍 Public IPv4 — địa chỉ để ra internet

Giao thức quen thuộc nhất với các bạn là **IPv4**, với tổng cộng **4.3 tỷ địa chỉ**. **Public IPv4** là địa chỉ dùng được trên internet và cho phép bất cứ thứ gì gắn địa chỉ đó **được truy cập công khai từ mọi nơi**.

Chúng ta đã thấy điều này trong khóa học: khi tạo một **EC2 instance**, nó được cấp một public IPv4. Nhưng có một hành vi quan trọng cần nhớ:

* Nếu bạn **stop instance**, public IPv4 đó **bị thu hồi (released)**.
* Khi **start lại**, instance nhận một **public IP mới** tại thời điểm khởi tạo (launch).

```mermaid
flowchart LR
    Launch[Khoi tao EC2] --> PublicIP[Public IPv4 duoc cap]
    PublicIP --> Stop[Stop instance]
    Stop --> Release[IPv4 bi thu hoi]
    Release --> Start[Start lai instance]
    Start --> NewIP[Public IPv4 moi]
```

---

### 🏠 Private IPv4 — địa chỉ chỉ dùng nội bộ

**Private IPv4** có dạng như `192.168.1.1`, chỉ dùng được trong **mạng riêng** — ví dụ như **VPC nội bộ của bạn trên AWS**. Địa chỉ này **không thể truy cập công khai**; nếu bạn gõ nó lên trình duyệt web, bạn chỉ vào được các IP trong chính mạng của mình mà thôi.

Điểm hay của private IPv4: nó **giữ nguyên trong suốt vòng đời của EC2 instance**, kể cả khi bạn stop rồi start lại máy.

---

### 📌 Elastic IP — public IPv4 cố định

Nếu bạn cần một **public IPv4 cố định** gắn vào EC2 instance, AWS có **Elastic IP**. Nghĩa là dù bạn stop rồi start instance, nó vẫn giữ **đúng public IPv4 cũ** — điều này rất hữu ích trong nhiều tình huống.

Nhưng lưu ý: nếu bạn để instance **stop quá lâu**, thì Elastic IP đó đang bị giữ mà **không dùng vào việc gì** cả.

---

### 💰 Giá của public IPv4: 0.005 USD mỗi giờ

Về giá cả, **mọi public IPv4 trên AWS đều bị tính phí 0.005 USD/giờ** — bao gồm cả **Elastic IP** lẫn public IPv4 thông thường.

Con số này cho thấy AWS đang muốn hướng các bạn sang thứ khác: **IPv6**.

---

### 🚀 IPv6 — nhiều địa chỉ hơn và miễn phí

**IPv6** là phiên bản giao thức internet mới hơn, với **3.4 × 10^38 địa chỉ** (tức là 38 số 0 — nhiều hơn hẳn IPv4).

Hai điểm quan trọng cần nhớ:

* Mọi địa chỉ IPv6 trên AWS **đều là public** — **không có dải private** cho IPv6.
* IPv6 **miễn phí** trên AWS.

Vì vậy, nếu bạn muốn **phơi dịch vụ ra internet mà không tốn tiền từ góc độ địa chỉ IP**, IPv6 là lựa chọn dành cho bạn.

| Tiêu chí | IPv4 | IPv6 |
|---|---|---|
| Số lượng địa chỉ | Khoảng 4.3 tỷ | 3.4 × 10^38 |
| Dải private | Có | Không, mọi IP đều public |
| Chi phí | 0.005 USD/giờ cho mỗi public IPv4 | Miễn phí |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Giao thức IPv4 có bao nhiêu địa chỉ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 4.3 tỷ địa chỉ.

Giải thích: Đây là con số giới hạn khiến IPv6 ra đời.

Tham chiếu: Mục Public IPv4 — địa chỉ để ra internet.

</details>

**Câu 2:** Khi bạn stop rồi start lại một EC2 instance, public IPv4 thay đổi thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Public IPv4 bị thu hồi khi stop, và instance nhận IP mới khi start lại.

Giải thích: Đây là hành vi đã gặp xuyên suốt khóa học.

Tham chiếu: Mục Public IPv4 — địa chỉ để ra internet.

</details>

**Câu 3:** Private IPv4 thay đổi ra sao trong vòng đời của instance?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giữ nguyên suốt vòng đời, kể cả khi stop và restart.

Giải thích: Private IPv4 chỉ dùng trong mạng riêng như VPC.

Tham chiếu: Mục Private IPv4 — địa chỉ chỉ dùng nội bộ.

</details>

**Câu 4:** Elastic IP là gì và tốn bao nhiêu tiền?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là public IPv4 cố định gắn với EC2 instance; bị tính phí 0.005 USD/giờ như mọi public IPv4.

Giải thích: Instance stop rồi start vẫn giữ nguyên địa chỉ — nhưng để stop lâu thì IP bị lãng phí.

Tham chiếu: Mục Elastic IP — public IPv4 cố định.

</details>

**Câu 5:** IPv6 trên AWS có dải private không và có mất phí không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không có dải private — mọi IPv6 đều public; và IPv6 miễn phí trên AWS.

Giải thích: Muốn phơi dịch vụ miễn phí từ góc độ IP, hãy dùng IPv6.

Tham chiếu: Mục IPv6 — nhiều địa chỉ hơn và miễn phí.

</details>

---

Tóm lại, chỉ cần khắc cốt: **public IPv4 đổi mỗi lần stop/start và tốn 0.005 USD/giờ**, còn **private IPv4 ổn định suốt vòng đời instance**. Muốn địa chỉ cố định thì dùng **Elastic IP**, và muốn miễn phí thì nhớ tới **IPv6**.

Bài tiếp theo, chúng ta sẽ chính thức bước vào VPC với **Subnet, Internet Gateway và NAT Gateway**. Hẹn gặp các bạn! 🚀
