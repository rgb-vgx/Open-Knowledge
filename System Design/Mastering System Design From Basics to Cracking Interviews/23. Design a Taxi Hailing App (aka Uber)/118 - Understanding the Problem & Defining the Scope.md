# 🚕 Thiết kế Taxi Hailing App kiểu Uber: Hiểu bài toán & chốt scope

> Nguồn: `118-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49971987)

Chúng ta bước sang một case study mới: thiết kế **taxi hailing app (ứng dụng gọi xe)** kiểu Uber. Thoạt nhìn, đây có vẻ chỉ là một ứng dụng đặt xe đơn giản, nhưng thực chất đây là một **hệ phân tán thời gian thực (real-time distributed system)** nơi hàng nghìn — thậm chí hàng triệu — người dùng và tài xế tương tác đồng thời. Và như mọi bài system design, bước đầu tiên luôn là hiểu thật rõ bài toán trước khi nghĩ đến giải pháp.

---

### 🎯 Bốn năng lực cốt lõi của nền tảng

1. **Real-time user-driver matching (ghép người đi xe với tài xế theo thời gian thực):** ngay khi rider yêu cầu chuyến, nền tảng phải nhanh chóng xác định các tài xế gần đó và chọn ra match phù hợp. Quyết định này phải diễn ra **trong vài giây** vì người dùng chờ phản hồi tức thì.
2. **Geo-location tracking (theo dõi vị trí địa lý):** cả rider lẫn tài xế đều liên tục di chuyển, nên hệ thống phải nhận và xử lý cập nhật vị trí không ngừng. Những cập nhật này cung cấp các tính năng như phát hiện tài xế gần đó, theo dõi chuyến đi trực tiếp, và thông tin điểm đón/điểm đến chính xác.
3. **Payment processing (xử lý thanh toán):** khi chuyến kết thúc, nền tảng tính cước và xử lý thanh toán an toàn. Dù diễn ra sau chuyến, thanh toán vẫn quan trọng không kém vì ảnh hưởng trực tiếp đến niềm tin khách hàng và thu nhập tài xế.
4. **High concurrency (đồng thời cao):** giờ cao điểm, hàng nghìn rider có thể yêu cầu chuyến cùng lúc trong khi hàng nghìn tài xế cập nhật vị trí vài giây một lần. Hệ thống phải tiếp tục hoạt động tin cậy dưới khối lượng khổng lồ đó.

Vậy vì sao thiết kế hệ thống như vậy lại khó? Lý do lớn nhất là người dùng kỳ vọng **cả độ trễ thấp lẫn tính sẵn sàng cao** — ghép chuyến không thể mất vài giây, và dịch vụ không thể "chết" chỉ vì nhu cầu tăng đột biến. Thêm nữa, đây không chỉ là bài toán backend: nền tảng gọi xe kết nối nhiều thành phần đang chuyển động — ứng dụng di động của rider và tài xế, backend services, dịch vụ vị trí, nhà cung cấp thanh toán và các tích hợp bên ngoài khác. Kiến trúc phải phối hợp tất cả một cách đáng tin cậy, kể cả khi có lỗi và độ trễ mạng.

---

### 📋 Functional requirements cho MVP

Functional requirements mô tả hệ thống phải làm gì từ góc nhìn người dùng. Vì đang thiết kế MVP, chúng ta chỉ tập trung vào những năng lực cốt lõi để nền tảng dùng được.

**Phía rider:**

* Đăng ký, đăng nhập.
* Yêu cầu chuyến đi bằng cách cung cấp điểm đón và điểm đến.
* Theo dõi tài xế được gán theo thời gian thực.
* Xem **ETA (thời gian dự kiến đến)** và tiến trình chuyến đi.
* Hoàn tất thanh toán ngay trong ứng dụng.

**Phía tài xế:**

* Đăng ký, đăng nhập.
* Chủ động kiểm soát trạng thái của mình bằng việc bật/tắt **online/offline**.
* Khi online, nhận yêu cầu chuyến và có quyền chấp nhận hoặc từ chối.
* Sau khi nhận chuyến, được điều hướng đến điểm đón và sau đó đến điểm đến của rider.

**Phía backend (những gì người dùng không nhìn thấy nhưng khiến cả nền tảng hoạt động):**

1. Tìm tài xế gần phù hợp mỗi khi rider yêu cầu chuyến.
2. Liên tục xử lý cập nhật vị trí từ cả rider và tài xế để mọi người thấy thông tin chính xác theo thời gian thực.
3. Giữ **ride state (trạng thái chuyến đi)** đồng bộ qua các giai đoạn: **assigned** (đã gán tài xế), **enroute** (đang đến), **in progress** (đang di chuyển) và **completed** (hoàn thành).
4. Khi chuyến kết thúc, tính cước và xử lý thanh toán.

Chính những năng lực hệ thống này kết nối trải nghiệm rider và tài xế. Không có matching đáng tin cậy, cập nhật vị trí thời gian thực, quản lý trạng thái chuyến và xử lý thanh toán thì ứng dụng đơn giản là không thể vận hành.

---

### ⚙️ Non-functional requirements

Nếu phần trên nói hệ thống **làm gì**, thì non-functional requirements nói hệ thống phải **làm tốt đến đâu**. Trong các hệ thống quy mô lớn, nhóm yêu cầu này thường ảnh hưởng đến kiến trúc nhiều hơn cả các tính năng chức năng.

* **Scalability (khả năng mở rộng):** nền tảng phải hoạt động tốt từ vài nghìn người dùng đến hàng triệu người dùng hằng ngày, và scale được mà không phải thiết kế lại từ đầu.
* **Availability (tính sẵn sàng):** người ta đặt xe mọi giờ, nhu cầu tăng vọt vào giờ cao điểm, cuối tuần hoặc sự kiện đặc biệt. Dịch vụ phải luôn sẵn sàng vì nếu sập, rider không đặt được chuyến còn tài xế không kiếm được thu nhập.
* **Low latency (độ trễ thấp):** yêu cầu chuyến phải được ghép gần như tức thì, và cập nhật vị trí hai chiều phải "live". *Một hệ thống đúng về mặt kỹ thuật nhưng phản hồi chậm vẫn là trải nghiệm tệ.*
* **Data consistency (nhất quán dữ liệu):** không phải dữ liệu nào cũng cần đồng bộ tuyệt đối mọi lúc. Ví dụ, cập nhật vị trí liên tục thay đổi, nên **eventual consistency (nhất quán sau cùng)** là chấp nhận được — vị trí hiển thị của tài xế trễ vài phần giây tốt hơn nhiều so với việc trì hoãn cập nhật để giữ nhất quán nghiêm ngặt.
* **Security (bảo mật):** nền tảng lưu thông tin cá nhân và xử lý giao dịch tài chính, nên bảo vệ dữ liệu người dùng và thanh toán là yêu cầu nền tảng, không phải tính năng tùy chọn.

Các yêu cầu phi chức năng này sẽ ảnh hưởng trực tiếp tới gần như mọi quyết định kiến trúc phía sau: công nghệ, pattern giao tiếp, database và chiến lược scale đều được dẫn dắt bởi những phẩm chất này, chứ không chỉ bởi tính năng.

---

### 📌 Giả định và ràng buộc

**Giả định:**

* Cả rider và tài xế dùng **smartphone có GPS**, vì theo dõi vị trí là nền tảng của matching và điều hướng.
* Các dịch vụ bên ngoài như **mapping và payment provider** luôn sẵn sàng và đáng tin cậy; chúng ta tích hợp thay vì tự xây.
* MVP ra mắt ở **một thành phố hoặc khu vực duy nhất** — giữ kiến trúc ban đầu đơn giản hơn, vẫn cho phép mở rộng địa lý trong tương lai.
* Mọi thanh toán diễn ra **kỹ thuật số qua ứng dụng**, tránh thêm độ phức tạp của tiền mặt ở phiên bản đầu.
* Real-time communication khả dụng qua các công nghệ như **WebSockets hoặc MQTT**, cho phép rider và tài xế nhận cập nhật vị trí, chuyến đi với độ trễ tối thiểu.

**Ràng buộc:**

* **Third-party services không nằm trong tầm kiểm soát:** mapping và payment provider có thể gây độ trễ, lỗi tạm thời hoặc **rate limit (giới hạn tần suất gọi)** — hệ thống phải kiên cường (resilient) kể cả khi dependency bên ngoài không hoàn hảo.
* **Kết nối di động khó lường:** tài xế có thể đi qua hầm hoặc vùng sóng yếu, nên ứng dụng không thể giả định internet ổn định mọi lúc.
* **Tài xế có thể đột ngột offline hoặc đổi vị trí bất ngờ** — hệ thống matching phải phản ứng với những thay đổi này mà không làm trải nghiệm rider tệ đi.
* **Thiết bị di động giới hạn CPU, pin và dung lượng** — ứng dụng phải nhẹ và hiệu quả, không dồn công việc thừa lên client.
* **Kỳ vọng người dùng rất cao:** phản hồi nhanh và dịch vụ luôn sẵn sàng, kể cả trong giờ cao điểm.

Định nghĩa giả định và ràng buộc ngay từ đầu cho chúng ta ranh giới rõ ràng, giúp đưa ra quyết định kiến trúc thực tế thay vì thiết kế cho một thế giới lý tưởng không tồn tại.

---

### 🧩 Những thách thức kỹ thuật lớn nhất

Đây là những bài toán sẽ định hình gần như mọi quyết định kiến trúc trong phần còn lại của case study.

**1. Độ phức tạp của hệ thời gian thực:** khi rider yêu cầu chuyến, nền tảng chỉ có vài giây để tìm tài xế phù hợp — phải tìm tài xế gần, kiểm tra availability và hoàn tất gán chuyến đủ nhanh để trải nghiệm "tức thì". Cùng lúc đó, mọi rider và tài xế đang hoạt động liên tục gửi cập nhật vị trí, thường vài giây một lần; khi số chuyến tăng, nền tảng xử lý một luồng dữ liệu vị trí khổng lồ mà vẫn phải giữ giao diện nhạy bén. Chưa hết, hệ thống phải duy trì **hàng triệu kết nối đồng thời** để trạng thái chuyến và thay đổi vị trí được gửi theo thời gian thực. *Vận hành tốt dưới khối lượng liên tục này rất khác với xử lý traffic request-response thông thường.*

**2. Maps và geolocation:** ứng dụng cần hiển thị vị trí trực tiếp và cập nhật tuyến đường suốt chuyến — mọi cập nhật vị trí phải được xử lý và phản ánh lên bản đồ với độ trễ tối thiểu. Việc tìm tài xế gần không thể dùng tìm kiếm database đơn thuần vì ta đang tìm theo **geo proximity (lân cận địa lý)**; khi số tài xế tăng, định vị hiệu quả ứng viên gần trở thành bài toán scalability quan trọng. Ngoài ra còn dữ liệu không hoàn hảo: GPS không phải lúc nào cũng chính xác, đặc biệt ở đô thị dày đặc hoặc trong hầm; dịch vụ bản đồ bên ngoài có thể áp rate limit hoặc tăng độ trễ.

**3. Edge cases (tình huống biên) cấp hệ thống:** hãy tưởng tượng hai rider cùng yêu cầu chuyến trong khi chỉ có một tài xế — nền tảng phải đảm bảo tài xế chỉ được gán cho duy nhất một rider. Ngăn chặn những **race condition (điều kiện tranh chấp)** như vậy là thiết yếu để giữ tính đúng đắn của hệ thống. Chúng ta cũng cần xử lý uyển chuyển các cập nhật vị trí cũ hoặc bị mất — sự cố mạng tạm thời không được phá vỡ trải nghiệm hay gây rối cho quá trình matching. Và vì phụ thuộc dịch vụ bên ngoài cho bản đồ và thanh toán, hệ thống production phải được thiết kế với **fallback (phương án dự phòng)** để lỗi tạm thời của bên thứ ba không làm tê liệt toàn nền tảng.

Điểm mấu chốt: xây một nền tảng gọi xe không khó vì bất kỳ tính năng đơn lẻ nào, mà khó vì phải giải quyết **đồng thời** các thách thức real-time, geospatial và hệ phân tán — trong khi vẫn mang lại trải nghiệm nhanh và đáng tin cậy. Đó cũng chính là lý do đây là một case study system design tuyệt vời.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bốn năng lực cốt lõi định hình kiến trúc của nền tảng gọi xe là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Real-time user-driver matching, geo-location tracking, payment processing và high concurrency.

Giải thích: Cả bốn đều đòi hỏi độ trễ thấp và vận hành tin cậy dưới tải lớn.

Tham chiếu: Mục Bốn năng lực cốt lõi của nền tảng.

</details>

**Câu 2:** Vì sao dữ liệu vị trí có thể chấp nhận eventual consistency?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì vị trí thay đổi liên tục; hiển thị trễ vài phần giây tốt hơn việc trì hoãn cập nhật để giữ nhất quán nghiêm ngặt.

Giải thích: Không phải dữ liệu nào cũng cần đồng bộ tuyệt đối mọi thời điểm.

Tham chiếu: Mục Non-functional requirements.

</details>

**Câu 3:** Vì sao tìm tài xế gần không thể dùng tìm kiếm database đơn thuần?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì phải tìm theo geo proximity (lân cận địa lý), và khi số tài xế tăng thì đây là bài toán scalability quan trọng.

Giải thích: Tìm kiếm theo khoảng cách địa lý đòi hỏi cách tiếp cận chuyên biệt cho geospatial.

Tham chiếu: Mục Những thách thức kỹ thuật lớn nhất.

</details>

**Câu 4:** Race condition "hai rider, một tài xế" được xử lý thế nào về mặt nguyên tắc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hệ thống phải đảm bảo tài xế chỉ được gán cho duy nhất một rider.

Giải thích: Ngăn chặn race condition là thiết yếu để giữ tính đúng đắn của hệ thống.

Tham chiếu: Mục Những thách thức kỹ thuật lớn nhất.

</details>

**Câu 5:** Ràng buộc nào khiến hệ thống phải có fallback cho dịch vụ bên thứ ba?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Third-party services không nằm trong tầm kiểm soát — có thể gây độ trễ, lỗi tạm thời hoặc rate limit.

Giải thích: Lỗi tạm thời của mapping hay payment provider không được làm tê liệt toàn nền tảng.

Tham chiếu: Mục Giả định và ràng buộc.

</details>

---

Vậy là chúng ta đã hiểu bài toán gọi xe, từ requirements, ràng buộc đến những thách thức real-time và geospatial. Ở bài tiếp theo, chúng ta sẽ **ước lượng scale** cho một đô thị lớn và tìm ra các điểm nghẽn đáng lo nhất. Hẹn gặp lại các bạn! 🚀
