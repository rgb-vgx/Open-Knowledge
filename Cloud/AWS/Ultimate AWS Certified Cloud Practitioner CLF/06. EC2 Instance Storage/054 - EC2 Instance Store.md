# 💽 EC2 Instance Store: Ổ đĩa phần cứng tốc độ cao cho EC2

> Nguồn: `054-EC2-Instance-Store.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055816)

Chúng ta đã biết cách gắn **EBS (Elastic Block Store — ổ đĩa mạng)** vào EC2 Instance, nhưng ổ đĩa mạng vẫn có giới hạn về hiệu năng. Vậy nếu các bạn cần tốc độ cao hơn nữa thì sao? Câu trả lời chính là **EC2 Instance Store** — ổ đĩa phần cứng gắn trực tiếp vào server vật lý.

Cùng mình tìm hiểu xem nó là gì, dùng khi nào và cạm bẫy nào cần tránh nhé!

---

### 🔍 EC2 Instance Store là gì?

EC2 Instance tuy là **máy chủ ảo (virtual machine)**, nhưng nó vẫn chạy trên một **server vật lý thật**. Một số server này có sẵn dung lượng đĩa được kết nối **vật lý** trực tiếp vào máy.

Một số dòng EC2 Instance đặc biệt có thể tận dụng ổ đĩa đó — tên gọi của nó là **EC2 Instance Store**: ổ cứng phần cứng gắn trực tiếp vào server vật lý.

* Dùng để có **hiệu năng I/O tốt hơn** (I/O — thao tác đọc/ghi dữ liệu).
* **Throughput (thông lượng)** cao.
* Là lựa chọn tuyệt vời khi các bạn cần **hiệu năng đĩa cực cao**.

---

### ⚠️ Điểm đánh đổi: dữ liệu sẽ MẤT

Điều quan trọng nhất các bạn cần ghi nhớ:

* Nếu **stop** hoặc **terminate** EC2 Instance có Instance Store → **toàn bộ dữ liệu trên đó sẽ mất sạch**.
* Vì vậy nó được gọi là **ephemeral storage (lưu trữ tạm thời)** — không thể dùng làm nơi lưu dữ liệu lâu dài, bền vững.

Ngoài ra, nếu **server vật lý** đang chạy instance gặp sự cố, ổ đĩa phần cứng gắn vào nó cũng hỏng theo, và các bạn có nguy cơ mất dữ liệu.

*Vì thế, nếu quyết định dùng Instance Store, việc sao lưu (backup) và nhân bản (replicate) dữ liệu là trách nhiệm hoàn toàn của các bạn.*

---

### ✅ Khi nào nên dùng Instance Store?

Instance Store phát huy tác dụng với:

* **Buffer (bộ đệm)** và **cache**
* **Scratch data (dữ liệu tạm để xử lý)**
* **Temporary content (nội dung tạm thời)**

Còn với **lưu trữ dài hạn**, **EBS** mới là lựa chọn hợp lý hơn.

| Tiêu chí | EC2 Instance Store | EBS |
|---|---|---|
| Bản chất | Ổ cứng phần cứng gắn vào server | Ổ đĩa mạng |
| Hiệu năng | Cực cao | Cao nhưng có giới hạn |
| Dữ liệu khi stop/terminate | Mất sạch | Vẫn còn |
| Phù hợp | Cache, buffer, dữ liệu tạm | Lưu trữ dài hạn |

---

### 📊 Ví dụ về hiệu năng (chỉ để minh họa)

Mình lấy ví dụ để các bạn hình dung rõ hơn nhé — *những con số này không cần học thuộc đâu*:

* Các instance dòng **I3** có gắn Instance Store; **Read IOPS** và **Write IOPS** (số thao tác đọc/ghi mỗi giây) có thể đạt tới **3,3 triệu** và **1,4 triệu** ở dòng mạnh nhất.
* So sánh với EBS loại **gp2** — chỉ đạt khoảng **32.000 IOPS**.

Sự chênh lệch này cho thấy vì sao Instance Store được xem là lựa chọn "khủng" về hiệu năng phần cứng.

---

### 🎯 Mẹo thi cực quan trọng

Trong đề thi, **bất cứ khi nào bạn thấy cụm "very high performance hardware attached volume" dành cho EC2 Instance** → hãy nghĩ ngay đến **EC2 Instance Store** nhé!

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** EC2 Instance Store thực chất là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là ổ cứng phần cứng gắn trực tiếp vào server vật lý đang chạy EC2 Instance.

Giải thích: EC2 là máy ảo, nhưng vẫn nằm trên server thật; một số dòng instance tận dụng được ổ đĩa gắn vật lý này.

Tham chiếu: Mục EC2 Instance Store là gì.

</details>

**Câu 2:** Dữ liệu trên Instance Store sẽ ra sao khi bạn stop hoặc terminate instance?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dữ liệu sẽ bị mất.

Giải thích: Vì thế nó được gọi là ephemeral storage — lưu trữ tạm thời, không bền vững.

Tham chiếu: Mục Điểm đánh đổi.

</details>

**Câu 3:** Use case nào phù hợp nhất với Instance Store?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Buffer, cache và scratch data — dữ liệu tạm thời.

Giải thích: Không dùng cho lưu trữ dài hạn; lưu trữ dài hạn nên dùng EBS.

Tham chiếu: Mục Khi nào nên dùng Instance Store.

</details>

**Câu 4:** Trong ví dụ minh họa, EBS gp2 đạt khoảng bao nhiêu IOPS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 32.000 IOPS.

Giải thích: Các instance I3 với Instance Store có thể đạt tới 3,3 triệu Read IOPS và 1,4 triệu Write IOPS — con số chỉ mang tính minh họa, không cần học thuộc.

Tham chiếu: Mục Ví dụ về hiệu năng.

</details>

**Câu 5:** Khi dùng Instance Store, ai chịu trách nhiệm backup và replicate dữ liệu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chính bạn — khách hàng.

Giải thích: Vì dữ liệu có thể mất khi phần cứng hỏng hoặc instance bị stop/terminate.

Tham chiếu: Mục Điểm đánh đổi.

</details>

---

Vậy là các bạn đã nắm được **EC2 Instance Store** — ông vua hiệu năng phần cứng nhưng "chóng nở chóng tàn". Ghi nhớ cặp đánh đổi *tốc độ cực cao nhưng dữ liệu không bền vững* là các bạn tự tin xử lý mọi câu hỏi trong đề.

Ở bài tiếp theo, chúng ta sẽ tìm hiểu một kiểu lưu trữ hoàn toàn khác: **EFS — hệ thống file mạng dùng chung**. Hẹn gặp các bạn ở đó! 🚀
