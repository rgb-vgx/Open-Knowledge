# 🧱 IaaS, PaaS hay SaaS? Phân biệt các loại Cloud Computing

> Nguồn: `007-The-Different-Types-of-Cloud-Computing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20263106)

Trong bài này, chúng ta cùng phân biệt **các loại cloud computing** khác nhau — IaaS, PaaS và SaaS. Đây là kiến thức rất dễ gặp trong đề thi **CLF-C02**, nên mục tiêu của các bạn là **nhận diện được chúng** khi đọc câu hỏi.

---

### 🧱 IaaS — Infrastructure as a Service

IaaS cung cấp **những viên gạch nền tảng (building blocks) cho cloud IT**:

* Bạn nhận **networking, computers và data storage space** ở dạng **nguyên bản (raw form)**.
* Từ những viên gạch này — *giống như chơi LEGO* — bạn có **độ linh hoạt rất cao** và dễ dàng hình dung cách **migrate (di chuyển)** từ traditional on-premises IT lên cloud.

Ví dụ: **Amazon EC2** trên AWS. Ngoài AWS có **Google Cloud, Azure, Rackspace, Digital Ocean và Linode**.

---

### ⚙️ PaaS — Platform as a Service

Với PaaS, bạn **loại bỏ nhu cầu quản lý hạ tầng bên dưới** — không cần đụng tới underlying infrastructure — mà chỉ tập trung vào việc **triển khai (deployment) và quản lý ứng dụng** của mình.

Ví dụ: **Elastic Beanstalk** trên AWS. Ngoài AWS có **Heroku, Google App Engine và Windows Azure**.

---

### 📦 SaaS — Software as a Service

SaaS là một **sản phẩm hoàn chỉnh (completed product)** được **nhà cung cấp dịch vụ chạy và quản lý (run and managed)**.

Ví dụ: trên AWS có **Rekognition** — dịch vụ bạn dùng khi muốn làm **machine learning (học máy)**. Trong thế giới thực, chúng ta đã quen với **Google Apps như Gmail**, **Dropbox** và **Zoom** cho các cuộc họp.

---

### 📊 Ai quản lý cái gì? Bảng đối chiếu

| Mô hình | Bạn quản lý | Nhà cung cấp quản lý |
|---|---|---|
| On-premises | Tất cả: ứng dụng, data, runtime, middleware, OS, virtualization, servers, storage, networking | Không ai cả |
| IaaS | Ứng dụng, data, runtime, middleware, OS | Virtualization, servers, storage, networking |
| PaaS | Chỉ ứng dụng và data | Runtime, middleware, OS, virtualization, servers, storage, networking |
| SaaS | Không quản lý gì | Tất cả |

*Càng đi từ on-premises → IaaS → PaaS → SaaS, bạn càng quản lý ít hơn và càng tập trung vào giá trị cốt lõi của mình. Đó là "hương vị" khác nhau của cloud.*

---

### 💰 Ba trụ cột pricing của AWS

Cloud có nhiều loại, nhưng điểm chung là **cách tính giá rất khác** so với truyền thống. AWS có **3 nguyên tắc định giá (pricing fundamentals)** theo mô hình pay-as-you-go:

1. **Compute** — trả cho đúng **thời gian compute** đã dùng.
2. **Storage** — trả cho đúng **lượng dữ liệu lưu trữ** trên cloud.
3. **Networking** — chỉ trả khi **dữ liệu rời khỏi cloud (data leaves the cloud)**; mọi dữ liệu đi **vào cloud đều miễn phí**.

Điều này giải quyết vấn đề "đắt đỏ" của traditional IT: bạn chỉ trả đúng thứ mình cần, và khoản tiết kiệm phía trước là rất lớn.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** IaaS cung cấp những gì cho người dùng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Các building blocks của cloud IT: networking, computers và data storage space ở dạng raw form.

Giải thích: Độ linh hoạt rất cao, giống như lắp LEGO — rất phù hợp để hình dung việc migrate từ on-premises lên cloud.

Tham chiếu: Mục IaaS — Infrastructure as a Service.

</details>

**Câu 2:** Điểm khác biệt cốt lõi của PaaS là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bạn không cần quản lý underlying infrastructure, chỉ tập trung vào deployment và quản lý ứng dụng.

Giải thích: Hạ tầng bên dưới đã do nhà cung cấp lo, bạn chỉ còn ứng dụng và data.

Tham chiếu: Mục PaaS — Platform as a Service.

</details>

**Câu 3:** SaaS là gì? Cho ví dụ.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là sản phẩm hoàn chỉnh được nhà cung cấp run and managed. Ví dụ: Rekognition trên AWS; Gmail, Dropbox, Zoom trong thực tế.

Giải thích: Người dùng chỉ việc sử dụng, mọi thứ đã được quản lý sẵn.

Tham chiếu: Mục SaaS — Software as a Service.

</details>

**Câu 4:** Khi dùng PaaS, bạn chỉ cần quan tâm tới những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ application và data của mình.

Giải thích: Mọi thứ từ runtime đến networking đều do AWS quản lý.

Tham chiếu: Mục Ai quản lý cái gì.

</details>

**Câu 5:** Khi nào bạn phải trả tiền cho networking trên AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ khi dữ liệu rời khỏi cloud (data leaves the cloud); dữ liệu đi vào cloud miễn phí.

Giải thích: Đây là một trong 3 pricing fundamentals của AWS.

Tham chiếu: Mục Ba trụ cột pricing của AWS.

</details>

---

Vậy là các bạn đã phân biệt được IaaS, PaaS, SaaS — kèm luôn 3 nguyên tắc tính tiền của AWS. *Nếu còn lẫn lộn, hãy nhớ mẹo: càng về phía SaaS, bạn càng "nhàn" hơn.*

Ở bài tiếp theo, chúng ta sẽ có một **chuyến đi sâu hơn vào AWS**. Hẹn gặp các bạn ở đó! 🚀
