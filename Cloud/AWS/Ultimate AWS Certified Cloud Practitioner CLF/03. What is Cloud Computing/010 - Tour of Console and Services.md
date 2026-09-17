# 🖥️ Tour AWS Console: Chọn region, tìm dịch vụ và global vs regional

> Nguồn: `010-Tour-of-the-Console-Services-in-AWS.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20054462)

Chào mừng các bạn đến với **AWS Console Home**! Trong bài này, chúng ta sẽ đi một vòng tham quan nhanh: cách chọn region, cách tìm dịch vụ, và phân biệt **global service** với **region-scoped service**. *Cứ thong thả, mình sẽ chỉ từng chỗ.*

---

### 🌍 Region selector — chọn nơi gần bạn nhất

Ở **góc trên bên phải màn hình** là **region selector (bộ chọn vùng)**:

* Mặc định mình đang ở **Northern Virginia — US east 1**.
* Lời khuyên cho khóa học: hãy chọn region **gần bạn về mặt địa lý** để có **độ trễ (latency) thấp nhất**.
* Ví dụ: mình ở châu Âu, gần **Ireland** → mình chọn **EU west 1**. Nếu bạn ở châu Phi gần **Cape Town**, chọn Cape Town.
* **Bạn không cần ở đúng nơi đó mới dùng được region** — cứ chọn nơi phù hợp với bạn.

Bên dưới console:

* Danh sách **recently visited services (dịch vụ vừa truy cập)** — với người mới sẽ trống.
* Thông tin về AWS: **health issues (sự cố dịch vụ)**, **cost and usage (chi phí và mức dùng)** của tài khoản, cùng các **tutorial** xây dựng giải pháp.

*Lưu ý: trang này thay đổi khá nhiều qua thời gian, nên nếu giao diện của bạn khác một chút thì cũng bình thường nhé.*

---

### 🔍 Tìm dịch vụ: menu Services và thanh Search

Có **2 cách** để tìm dịch vụ:

1. **Menu Services ở góc trên bên trái** — duyệt theo **bảng chữ cái** (AWS có rất nhiều dịch vụ) hoặc theo **category (nhóm)** như compute. *Không sao nếu bạn chưa thuộc hết — rồi chúng ta sẽ học dần.*
2. **Thanh tìm kiếm** — gõ một dịch vụ, ví dụ **Route 53**:
   * Kết quả trả về **4 dịch vụ** khớp truy vấn.
   * Có **13 feature** khớp, cho phép nhảy thẳng vào phần **domain names** của Route 53.
   * Ngoài ra còn có **blogs, knowledge articles, documentation** — rất tiện.

---

### 🌐 Global services vs region-scoped services

Mở **Route 53**, các bạn sẽ thấy góc trên bên phải ghi **"global"**:

* Nghĩa là console này **không cần chọn region** — bạn ở đâu cũng thấy cùng một view.
* Đây là **ngoại lệ nhiều hơn là quy luật**, nhưng một số dịch vụ AWS là **global service**.

Chuyển sang **EC2**:

* Góc trên bên phải ghi **Ireland** — region mình đã chọn.
* Nếu chạy console ở region khác (ví dụ Canada), **tài nguyên nhìn thấy sẽ khác**.
* Vì vậy, hãy **giữ nguyên một region trong suốt khóa học** để tránh nhầm lẫn.

---

### 🗺️ Kiểm tra dịch vụ có sẵn theo từng region

* Trên Google, tra **AWS global infrastructure** để xem thông tin về hạ tầng và dịch vụ.
* Một trang rất quan trọng: **AWS regional services** — bảng liệt kê **dịch vụ theo từng region**.
* Nếu bài học có dịch vụ không xuất hiện ở region của bạn, hãy tra bảng này (ví dụ xem **Cape Town** có gì) rồi **chuyển region** nếu cần.
* Lý do: **không phải dịch vụ nào của AWS cũng có mặt ở mọi region**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Nên chọn region nào khi học khóa này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Region gần bạn nhất về mặt địa lý, để có độ trễ thấp nhất.

Giải thích: Bạn không cần ở đúng nơi đó mới dùng được region.

Tham chiếu: Mục Region selector.

</details>

**Câu 2:** Có mấy cách tìm dịch vụ trên AWS Console?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 2 cách — menu Services ở góc trên bên trái (duyệt theo chữ cái hoặc category) và thanh tìm kiếm.

Giải thích: Thanh tìm kiếm còn trả về features, blogs, knowledge articles và documentation.

Tham chiếu: Mục Tìm dịch vụ.

</details>

**Câu 3:** Route 53 là global service hay region-scoped service?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Global service — console ghi "global" và không cần chọn region.

Giải thích: Bạn ở đâu cũng thấy cùng một view, nhưng đây là ngoại lệ nhiều hơn là quy luật.

Tham chiếu: Mục Global services vs region-scoped services.

</details>

**Câu 4:** Vì sao cần giữ nguyên một region trong suốt khóa học?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì tài nguyên hiển thị theo region; đổi region sẽ thấy view và tài nguyên khác đi.

Giải thích: EC2 khi chọn Ireland sẽ khác với khi chạy ở Canada.

Tham chiếu: Mục Global services vs region-scoped services.

</details>

**Câu 5:** Nếu một dịch vụ không có ở region của bạn thì nên làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tra bảng AWS regional services để xem dịch vụ có ở region nào, rồi chuyển region nếu cần.

Giải thích: Không phải dịch vụ nào của AWS cũng có mặt ở mọi region.

Tham chiếu: Mục Kiểm tra dịch vụ có sẵn theo từng region.

</details>

---

Vậy là các bạn đã biết đường đi nước bước trong AWS Console: chọn region, tìm dịch vụ, và phân biệt dịch vụ global với regional. *Hãy tự mở console và bấm thử theo — học qua thực hành là cách nhớ nhanh nhất!*

Hẹn gặp các bạn ở bài tiếp theo! 🚀
