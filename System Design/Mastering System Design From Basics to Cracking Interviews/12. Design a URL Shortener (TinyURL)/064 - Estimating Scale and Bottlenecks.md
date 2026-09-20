# 📏 Thiết kế TinyURL (phần 2) — ước lượng scale và tìm điểm nghẽn

> Nguồn: `064-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49737247)

Sau khi đã hiểu bài toán, chúng ta bước sang **bước 2 của blueprint**: ước lượng scale và xác định điểm nghẽn. Đây là việc mà **mọi kiến trúc sư giàu kinh nghiệm đều làm trước khi vẽ sơ đồ kiến trúc**. Những con số không cần chính xác tuyệt đối — mục đích của chúng là giúp ta **ra quyết định kiến trúc có căn cứ**: liệu giải pháp đơn giản đã đủ, hay cần thiết kế phân tán hơn?

---

### 📏 Vì sao phải ước lượng scale trước khi thiết kế

Hiểu yêu cầu là chưa đủ. Nếu không nắm được **traffic dự kiến và khối lượng dữ liệu**, rất khó biết hệ thống cần đến mức độ phân tán nào. Ước lượng thô cũng đủ để:

* Nhận diện **bản chất workload** — hệ thống thiên về đọc hay ghi?
* Phát hiện **điểm nghẽn tiềm năng** trước khi chúng thành sự cố production.
* Chọn đúng nơi đầu tư công sức: caching, database, hạ tầng mạng hay khả năng co giãn.

*Các con số dưới đây là giả định để suy luận, không phải dự báo chính xác — quan trọng là chúng dẫn ta tới những kết luận thiết kế nào.*

---

### 📊 Lưu lượng — bài toán read-heavy điển hình

Giả định hệ thống có **khoảng 10 triệu daily active users (DAU — người dùng hoạt động hằng ngày)** và **khoảng 300 triệu monthly active users (MAU — người dùng hoạt động hằng tháng)**. Từ đó:

1. Nếu chỉ **1% người dùng hằng ngày tạo một short URL**, ta có khoảng **100.000 URL mới mỗi ngày**. Đây là phía "write" của hệ thống.
2. Nếu trung bình mỗi người dùng **click khoảng 5 link ngắn mỗi ngày**, hệ thống nhận khoảng **50 triệu redirect request mỗi ngày**. Đây là phía "read".

Con số thứ hai gấp **500 lần** con số thứ nhất, và nó nói ngay một điều quan trọng: **TinyURL là hệ thống read-heavy (nặng đọc)**. Tạo URL diễn ra tương đối ít, nhưng tra cứu URL xảy ra thường xuyên hơn rất nhiều. *Quan sát này sẽ ảnh hưởng đến nhiều quyết định kiến trúc về sau, đặc biệt là caching và tối ưu database.*

---

### 🧮 Cache, network và storage — những con số biết nói

Tiếp theo, hãy ước lượng **kích thước cache**. Vì phần lớn traffic thường tập trung vào **một số ít link phổ biến**, rất hợp lý khi giữ các mapping được truy cập thường xuyên trong bộ nhớ:

* Giả sử cache **top 1 triệu URL**, mỗi mapping tốn khoảng **500 bytes** → cần khoảng **500 MB bộ nhớ** — kích thước hoàn toàn dễ quản lý, mà lại **giảm mạnh số lần truy vấn database** và giữ redirect latency cực thấp.
* Về **network traffic** của redirect: **50 triệu request mỗi ngày** × khoảng **700 bytes mỗi request** ≈ **35 GB traffic mỗi ngày**. Trung bình chỉ khoảng **0.4 MB/giây** — nhưng trung bình rất dễ gây nhầm lẫn, vì hệ thống thực tế luôn có **traffic spike**. Vì vậy ta nên thiết kế cho **peak throughput khoảng 5 MB/giây** thay vì mức trung bình.
* Về **storage**: **100.000 URL mới mỗi ngày** × khoảng **500 bytes mỗi mapping** ≈ **50 MB dữ liệu mới mỗi ngày**. Qua một năm là khoảng **18 GB dữ liệu thô**; khi tính thêm **index, transaction log, backup và overhead vận hành**, mức dự trù thực tế khoảng **50 GB mỗi năm**.

| Hạng mục | Giả định | Kết quả |
|---|---|---|
| URL tạo mới | 1% của 10 triệu DAU | ~100.000 URL/ngày |
| Redirect | 10 triệu người × 5 click | ~50 triệu request/ngày |
| Cache | Top 1 triệu URL × 500 bytes | ~500 MB |
| Network traffic | 50 triệu × 700 bytes | ~35 GB/ngày, trung bình ~0.4 MB/s, thiết kế cho peak ~5 MB/s |
| Storage | 100.000 × 500 bytes | ~50 MB/ngày, ~18 GB/năm dữ liệu thô, dự trù ~50 GB/năm |

Nhìn vào bảng này, bức tranh hiện ra rất rõ: **redirect chi phối workload, đọc nhanh là ưu tiên số một, link phổ biến là ứng viên lý tưởng cho cache**; dung lượng lưu trữ tăng đều và dễ dự đoán, còn network phải được thiết kế theo **đỉnh nhu cầu** chứ không phải mức trung bình. Đây chính là lý do bước ước lượng scale quan trọng đến vậy.

---

### ⚠️ Bốn điểm nghẽn và hướng xử lý

Mọi hệ thống quy mô lớn đều có điểm nghẽn. Mục tiêu **không phải loại bỏ chúng hoàn toàn**, mà là **xác định sớm và thiết kế kiến trúc để xử lý chúng**:

* **Khối lượng đọc cao** — điểm nghẽn rõ ràng nhất. Redirect nhiều hơn hẳn tạo mới, và mỗi redirect đều cần tra cứu nhanh URL gốc theo short key. Nếu mọi request đều đập thẳng vào database, **database sẽ nhanh chóng thành nút thắt**. Vì vậy kiến trúc phải **đặt trọng tâm vào caching và đọc database nhanh** — càng nhiều request phục vụ từ bộ nhớ, latency càng thấp và áp lực lên database càng nhỏ.
* **Write throughput (thông lượng ghi)** — dù tạo URL ít hơn nhiều so với redirect, đây vẫn là thao tác quan trọng: mọi short URL mới phải được **lưu đúng**, và mapping giữa link ngắn với URL gốc phải **luôn chính xác**. Khi hệ thống lớn lên, **ghi phải giữ được tính nhất quán** để người dùng luôn nhận link hợp lệ, đáng tin.
* **Latency (độ trễ)** — dịch vụ chỉ làm một phép tra cứu đơn giản, nhưng người dùng kỳ vọng nó xảy ra **gần như tức thời**. Mỗi mili-giây cộng thêm đều làm chậm cảm nhận trước khi trang đích bắt đầu tải — nghĩa là **hạ tầng, mạng, cache và database đều phải được tối ưu cho thời gian phản hồi rất nhanh**.
* **Burst traffic (lưu lượng bùng nổ)** — hầu hết link chỉ nhận lượng traffic vừa phải, nhưng **đôi khi một link "viral" đột ngột hút hàng triệu người trong thời gian rất ngắn**. Kiến trúc phải **hấp thụ được những cú tăng vọt** này mà không suy giảm hiệu năng. Vì vậy chúng ta sẽ dựa vào **autoscaling (tự động co giãn)** để thêm năng lực khi nhu cầu cao, và **CDN (Content Delivery Network — mạng phân phối nội dung)** để phục vụ request từ những vị trí gần người dùng hơn trên toàn cầu.

Điểm đáng chú ý: **các điểm nghẽn này không độc lập với nhau**. Đọc nhiều dẫn ta tới caching, yêu cầu latency ảnh hưởng đến lựa chọn hạ tầng, burst traffic đẩy ta về phía co giãn đàn hồi. Thay vì thiết kế từng thành phần rời rạc, chúng ta sẽ **thiết kế cả hệ thống xoay quanh những điểm nghẽn đã nhận diện**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao cần ước lượng scale trước khi vẽ kiến trúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để biết giải pháp đơn giản đã đủ hay cần thiết kế phân tán hơn, đồng thời nhận diện bản chất workload và điểm nghẽn sớm.

Giải thích: Con số không cần chính xác tuyệt đối — chúng dùng để ra quyết định kiến trúc có căn cứ.

Tham chiếu: Mục Vì sao phải ước lượng scale trước khi thiết kế.

</details>

**Câu 2:** Từ 10 triệu DAU, hệ thống có bao nhiêu URL tạo mới và bao nhiêu redirect mỗi ngày?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 100.000 URL mới mỗi ngày (1% người dùng tạo) và khoảng 50 triệu redirect mỗi ngày (5 click/người).

Giải thích: Tỷ lệ này cho thấy TinyURL là hệ thống read-heavy điển hình.

Tham chiếu: Mục Lưu lượng — bài toán read-heavy điển hình.

</details>

**Câu 3:** Vì sao phải thiết kế cho peak 5 MB/giây thay vì mức trung bình 0.4 MB/giây?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hệ thống thực tế luôn có traffic spike — trung bình có thể gây nhầm lẫn, còn hạ tầng phải chịu được lúc cao điểm.

Giải thích: Redirect tạo ra khoảng 35 GB traffic/ngày, nhưng phân bố không đều.

Tham chiếu: Mục Cache, network và storage.

</details>

**Câu 4:** Vì sao cache top 1 triệu URL là hợp lý?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì traffic thường tập trung vào một số ít link phổ biến; 1 triệu mapping × 500 bytes chỉ tốn khoảng 500 MB bộ nhớ nhưng giảm mạnh truy vấn database.

Giải thích: Cache giữ redirect latency cực thấp cho phần lớn lượt click.

Tham chiếu: Mục Cache, network và storage.

</details>

**Câu 5:** Hệ thống xử lý burst traffic bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng autoscaling để thêm năng lực khi nhu cầu cao và CDN để phục vụ request từ vị trí gần người dùng hơn.

Giải thích: Một link viral có thể hút hàng triệu người trong thời gian rất ngắn mà không được phép làm suy giảm hiệu năng.

Tham chiếu: Mục Bốn điểm nghẽn và hướng xử lý.

</details>

---

Vậy là bước 2 đã hoàn tất: chúng ta biết hệ thống **read-heavy với ~50 triệu redirect/ngày**, cache vừa vặn trong **~500 MB**, storage tăng **~50 GB/năm** và bốn điểm nghẽn cần thiết kế xoay quanh: **đọc nhiều, ghi nhất quán, latency thấp và burst traffic**. *Những con số thô này sẽ là la bàn cho mọi quyết định kiến trúc phía sau.*

Ở bài tiếp theo (bước 3), chúng ta sẽ làm **high-level design**: service, API và cách các thành phần giao tiếp. Hẹn gặp lại các bạn! 🚀
