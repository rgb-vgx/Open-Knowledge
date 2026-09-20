# 📊 Ước lượng quy mô Notification System: Từ 100 triệu đến 300 triệu thông báo mỗi ngày

> Nguồn: `079-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49819507)

Trước khi chọn công nghệ hay vẽ sơ đồ kiến trúc, chúng ta cần hiểu quy mô bài toán mình đang giải: **kiến trúc tốt luôn được dẫn dắt bởi quy mô dự kiến, chứ không phải phỏng đoán**. Bài này mình và các bạn sẽ ước lượng số lượng thông báo mỗi ngày, hệ số đỉnh cần chịu đựng, và quan trọng hơn — chỉ ra những **điểm nghẽn (bottlenecks)** cần dự đoán trước khi chúng trở thành sự cố production.

---

### 📈 Ước lượng nhanh: 10 triệu người dùng, 100 triệu thông báo

Hãy cùng đặt giả định cho nền tảng của chúng ta:

* Khoảng **10 triệu người dùng hoạt động mỗi ngày**.
* Trung bình mỗi người sinh ra khoảng **5 sự kiện** có khả năng kích hoạt thông báo.
* Lưu ý quan trọng: **một sự kiện không nhất thiết chỉ tạo ra một thông báo** — cùng một sự kiện có thể được gửi qua nhiều kênh, ví dụ vừa email vừa push notification.

Nhân các con số này lại, chúng ta có khoảng **100 triệu thông báo mỗi ngày**. Và đó mới chỉ là lưu lượng trung bình. Hệ thống thực tế còn có những đợt bùng nổ: trong một **flash sale**, một đợt **ra mắt sản phẩm lớn**, hay một **sự cố toàn hệ thống**, lưu lượng có thể tăng gấp nhiều lần chỉ trong vài phút.

Nếu giả định **hệ số đỉnh là 3**, kiến trúc của chúng ta phải xử lý thoải mái lưu lượng tương đương khoảng **300 triệu thông báo mỗi ngày** mà không trở nên bất ổn.

---

### 🔍 Vì sao ước lượng quan trọng hơn độ chính xác

Các con số trên **không cần chính xác tuyệt đối**. Mục đích của ước lượng không phải là dự đoán đúng khối lượng công việc, mà là hiểu **bậc độ lớn (order of magnitude)**. Thiết kế cho vài nghìn thông báo, cho vài triệu, hay cho hàng trăm triệu là ba bài toán hoàn toàn khác nhau — và khác biệt đó ảnh hưởng trực tiếp đến mọi quyết định kiến trúc.

Ước lượng quy mô còn giúp chúng ta **nhận diện điểm nghẽn trước khi chúng thành vấn đề production**. Chúng ta có thể tự hỏi:

* Một service duy nhất có đủ không?
* Các nhà cung cấp bên ngoài có chịu nổi throughput này không?
* Có cần xử lý bất đồng bộ không?
* Queue có thể bắt đầu ùn lên ở đâu trong các đợt cao điểm?

Những câu hỏi này **dễ trả lời hơn nhiều khi hệ thống chưa được xây**, thay vì khi nó đã oằn mình dưới tải.

Ước lượng cũng giúp đưa ra quyết định thực tế về hạ tầng và chi phí: tính toán năng lực compute, nhu cầu lưu trữ, chi phí thuê nhà cung cấp bên thứ ba, rồi thiết kế **load test, monitoring và chính sách auto-scaling** dựa trên kỳ vọng thực tế thay vì giả định.

Một bài học quan trọng của system design: **kiến trúc phải tương xứng với quy mô mà bạn thiết kế**. Ước lượng quá cao, bạn tạo ra độ phức tạp không cần thiết; ước lượng quá thấp, hệ thống sụp đổ khi lưu lượng tăng. Vì vậy ước lượng quy mô luôn là một trong những bước đầu tiên của thiết kế hệ thống production.

---

### ⚠️ Những điểm nghẽn cần dự đoán trước

Các kiến trúc sư giàu kinh nghiệm không chờ điểm nghẽn xuất hiện trong production — họ cố dự đoán chúng ngay trong giai đoạn thiết kế. Với hệ thống thông báo, có năm điểm nghẽn đáng lưu tâm:

1. **Event ingestion (nhận sự kiện):** lúc bình thường, nhận sự kiện rất đơn giản; nhưng trong flash sale hay sự kiện hệ thống quy mô lớn, hàng triệu sự kiện có thể ập đến trong thời gian rất ngắn. Nếu xử lý ngay từng sự kiện, các service phía sau nhanh chóng quá tải. Đó là lý do chúng ta thường đưa vào **buffering và rate control** bằng những công nghệ như **Kafka** hoặc **SQS** để hấp thụ đỉnh lưu lượng và làm phẳng khối lượng công việc.
2. **Template rendering (dựng nội dung từ mẫu):** sinh thông điệp cá nhân hóa không chỉ là thay thế chuỗi đơn giản — nó có thể gồm tải template, chèn giá trị động và chọn đúng ngôn ngữ. Làm tất cả những việc đó một cách đồng bộ cho từng thông báo có thể ngốn CPU đáng kể. Khi lưu lượng tăng, **cache hoặc pre-render các template dùng phổ biến** giúp giảm mạnh chi phí xử lý.
3. **External provider APIs:** dù gửi email qua **SES**, SMS qua **Twilio** hay push qua **Firebase**, các nhà cung cấp này đều nằm ngoài hệ thống của chúng ta. Họ mang đến độ trễ mạng, áp **rate limit**, và đôi khi **throttle** request hoặc gặp sự cố. Vì không kiểm soát được các dịch vụ này, kiến trúc phải được thiết kế để **chịu đựng lỗi của họ**, thay vì giả định họ luôn phản hồi nhanh.
4. **User preference lookup (tra cứu tùy chọn người dùng):** trước khi gửi gần như mọi thông báo, hệ thống phải kiểm tra xem người dùng có thật sự muốn nhận hay không. Ở quy mô ước lượng, đó là một lượng thao tác đọc khổng lồ; liên tục truy vấn database chính sẽ tạo tải không cần thiết — vì vậy loại dữ liệu được truy cập thường xuyên này là ứng viên rất tốt cho **caching** với một giải pháp như **Redis**.
5. **Observability (khả năng quan sát):** thường bị xem nhẹ, nhưng lại thành thách thức ở quy mô lớn. Hàng triệu thông báo sinh ra lượng log, metric và trace khổng lồ; nếu thu thập mọi thứ mà không có chiến lược, hạ tầng monitoring có thể trở thành điểm nghẽn của chính nó. Observability tốt **không phải là thu thập nhiều dữ liệu hơn**, mà là thu thập **đúng dữ liệu** để chẩn đoán sự cố hiệu quả.

Cuối cùng, cần nhớ hệ thống của chúng ta **không vận hành độc lập**: nó phụ thuộc vào cloud service, nhà cung cấp bên ngoài, queue, worker process và load balancer. Mỗi thành phần đều có thể lỗi một cách độc lập, nên kiến trúc tổng thể phải duy trì **tính sẵn sàng cao** kể cả khi từng phụ thuộc đang gặp vấn đề.

---

### 📦 Mỗi kênh một hành vi — chi phí và giới hạn khác nhau

Điều quan trọng không kém là nhận ra **mỗi kênh giao nhận hành xử rất khác nhau**:

| Kênh | Chi phí | Đặc điểm chính | Giới hạn / rủi ro |
|---|---|---|---|
| SMS | Đắt nhất | Chịu quy định nghiêm ngặt và giới hạn từ provider | Mỗi SMS không cần thiết đều tác động trực tiếp đến chi phí |
| Push notification | Tương đối rẻ | Phụ thuộc nền tảng di động như Firebase hoặc APNs | Giao nhận chịu ảnh hưởng của trạng thái thiết bị và cài đặt người dùng |
| In-app | Nhanh nhất | Nằm trong ứng dụng của chúng ta | Chỉ hữu ích khi người dùng đang chủ động dùng ứng dụng |

Cụ thể hơn: **SMS** thường là lựa chọn đắt nhất và chịu quy định nghiêm ngặt cùng giới hạn của nhà cung cấp — nên mỗi tin SMS không cần thiết đều có **tác động tài chính trực tiếp**. **Push notification** tương đối rẻ nhưng phụ thuộc vào các nền tảng di động như **Firebase** hay **APNs**, nghĩa là việc giao nhận thành công chịu ảnh hưởng từ trạng thái thiết bị và thiết lập của người dùng. Còn **in-app notification** thường là nhanh nhất vì ở lại trong ứng dụng của chúng ta — nhưng chỉ hữu ích khi người dùng đang hoạt động trong ứng dụng.

Nhìn tổng thể, bài học then chốt là: ở quy mô này, **thách thức lớn nhất thường không nằm ở business logic**, mà ở những thứ như đỉnh lưu lượng, phụ thuộc bên ngoài, các thao tác đắt đỏ và khả năng quan sát vận hành. Nhận diện sớm những điểm nghẽn này cho phép chúng ta thiết kế một kiến trúc **ổn định, hiệu quả và kiên cường** khi khối lượng công việc tiếp tục tăng.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Với 10 triệu người dùng hoạt động mỗi ngày và trung bình 5 sự kiện mỗi người, hệ thống có bao nhiêu thông báo mỗi ngày?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 100 triệu thông báo mỗi ngày.

Giải thích: Một sự kiện có thể gửi qua nhiều kênh, nên con số này là ước lượng theo bậc độ lớn.

Tham chiếu: Mục Ước lượng nhanh.

</details>

**Câu 2:** Hệ số đỉnh 3 có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kiến trúc phải xử lý được lưu lượng tương đương khoảng 300 triệu thông báo mỗi ngày trong các đợt bùng nổ.

Giải thích: Flash sale, ra mắt sản phẩm hay sự cố toàn hệ thống có thể tăng tải gấp nhiều lần trong vài phút.

Tham chiếu: Mục Ước lượng nhanh.

</details>

**Câu 3:** Vì sao buffering và rate control quan trọng ở event ingestion?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để hấp thụ đỉnh lưu lượng và làm phẳng khối lượng công việc, tránh làm quá tải service phía sau.

Giải thích: Kafka hoặc SQS thường được dùng cho mục đích này.

Tham chiếu: Mục Những điểm nghẽn cần dự đoán trước.

</details>

**Câu 4:** Vì sao tra cứu tùy chọn người dùng nên được cache?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì phải kiểm tra trước gần như mọi thông báo, tạo lượng đọc khổng lồ; cache như Redis giảm tải database chính.

Giải thích: Đây là dữ liệu được truy cập thường xuyên với mẫu truy cập lặp lại.

Tham chiếu: Mục Những điểm nghẽn cần dự đoán trước.

</details>

**Câu 5:** Kênh nào đắt nhất và kênh nào nhanh nhất, và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** SMS đắt nhất do quy định nghiêm ngặt và giới hạn provider; in-app nhanh nhất vì nằm trong ứng dụng.

Giải thích: Push nằm ở giữa — rẻ nhưng phụ thuộc trạng thái thiết bị và cài đặt người dùng.

Tham chiếu: Mục Mỗi kênh một hành vi.

</details>

---

Vậy là chúng ta đã có bức tranh định lượng: khoảng 100 triệu thông báo mỗi ngày, phải chịu được đỉnh gấp 3 lần, cùng năm điểm nghẽn cần dự đoán trước và sự khác biệt chi phí giữa các kênh. Ở bài tiếp theo, chúng ta sẽ bước vào **high-level design** — thiết kế pipeline thông báo từ event ingestor đến orchestrator, template service, các channel worker và dead-letter queue. Hẹn gặp lại các bạn! 🚀
