# 🤝 PrivateLink: Kết nối riêng tư tới dịch vụ của bên thứ ba

> Nguồn: `172-PrivateLink.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/33532722)

Tiếp nối chủ đề **VPC Endpoint Services**, hôm nay chúng ta nói về **AWS PrivateLink**. Đây là giải pháp cho tình huống: bạn muốn **chia sẻ một service** cho khách hàng ở hàng nghìn VPC khác nhau — nhưng vẫn đảm bảo kết nối hoàn toàn riêng tư.

*Nghe có vẻ "cao siêu", nhưng luồng hoạt động khá đơn giản — mình vẽ sơ đồ để các bạn dễ hình dung nhé.*

---

### 🎯 Bài toán: chia sẻ service cho hàng nghìn khách hàng

Hãy tưởng tượng bạn chạy một service trong AWS, hoặc bạn là **vendor trên AWS Marketplace** và chạy service trên **tài khoản riêng, VPC riêng** của mình. Bạn muốn **expose service đó cho khách hàng AWS** — tức là hàng nghìn VPC cần truy cập **riêng tư** vào service của bạn.

Bạn có thể nghĩ tới **VPC peering**, nhưng cách này **không mở rộng được (doesn't scale)** và **không thực sự an toàn**. Thứ bạn cần chính là **PrivateLink**.

---

### 🔍 PrivateLink hoạt động thế nào?

**PrivateLink** cho phép kết nối một service đang chạy trong VPC của bạn tới **các VPC khác một cách trực tiếp và riêng tư**. Điểm hay là nó **không cần**:

* VPC peering
* Internet Gateway
* NAT
* Route tables

Vì toàn bộ kết nối đi qua **private network**.

Cách thiết lập gồm hai phía:

1. **Phía vendor (nhà cung cấp):** tạo một **Network Load Balancer (NLB)** để expose service của mình.
2. **Phía khách hàng (consumer):** tạo một **Elastic Network Interface (ENI)**.
3. Hai bên thiết lập **Private Link** với nhau → khách hàng truy cập riêng tư vào NLB và service của vendor.

```mermaid
flowchart LR
    A[Ứng dụng consumer trong VPC của bạn] --> B[Elastic Network Interface]
    B -->|Private Link| C[Network Load Balancer]
    C --> D[Service của vendor trong VPC riêng]
```

Toàn bộ traffic **không đi qua public internet** mà đi qua mạng riêng — nên mọi liên lạc luôn được giữ kín.

---

### 📈 Vì sao PrivateLink mở rộng tốt?

Mỗi khi có **một khách hàng mới**, phía vendor chỉ cần tạo thêm **một Private Link** cho khách hàng đó. Việc này **rất dễ quản lý** và **scalable (mở rộng) hơn nhiều** so với VPC peering.

*Đây chính là lý do các nhà cung cấp dịch vụ trên Marketplace ưa chuộng PrivateLink.*

---

### 🧠 Ghi nhớ nhanh cho đề thi

* PrivateLink thuộc họ **VPC Endpoint Services**.
* Dùng khi cần **kết nối riêng tư tới service của bên thứ ba** (vendor, third-party VPC).
* Không cần peering, không cần internet gateway, không cần NAT hay route tables.
* Vendor tạo **NLB**, consumer tạo **ENI**, kết nối bằng **Private Link**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** PrivateLink thuộc họ dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** VPC Endpoint Services.

Giải thích: Đây là cách kết nối riêng tư tới service nằm ngoài VPC của bạn.

Tham chiếu: Mục Ghi nhớ nhanh cho đề thi.

</details>

**Câu 2:** Vì sao không dùng VPC peering để chia sẻ service cho hàng nghìn VPC?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì peering không mở rộng được và không thực sự an toàn.

Giải thích: PrivateLink dễ quản lý và scalable hơn nhiều.

Tham chiếu: Mục Bài toán chia sẻ service.

</details>

**Câu 3:** Phía vendor tạo gì để expose service?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Network Load Balancer (NLB).

Giải thích: NLB là điểm tiếp nhận kết nối Private Link từ khách hàng.

Tham chiếu: Mục PrivateLink hoạt động thế nào.

</details>

**Câu 4:** Phía khách hàng tạo gì để kết nối?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Elastic Network Interface (ENI).

Giải thích: ENI là điểm kết nối phía consumer tới NLB của vendor.

Tham chiếu: Mục PrivateLink hoạt động thế nào.

</details>

**Câu 5:** Traffic của PrivateLink đi qua đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Qua mạng riêng, không qua public internet.

Giải thích: Không cần peering, internet gateway, NAT hay route tables.

Tham chiếu: Mục PrivateLink hoạt động thế nào.

</details>

---

Vậy là các bạn đã hiểu cách PrivateLink kết nối riêng tư giữa các VPC mà không cần peering. *Đây là mảnh ghép rất hay được hỏi khi đề nói về "third-party service" hoặc "vendor trên Marketplace".*

Ở bài tiếp theo, chúng ta sẽ bước vào **hybrid cloud** với **Direct Connect & Site-to-Site VPN**. Hẹn gặp các bạn! 🚀
