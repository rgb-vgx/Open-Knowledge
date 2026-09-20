# 🔔 Thiết kế Notification System: Gửi đúng thông báo, đúng người, đúng lúc

> Nguồn: `078-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49819505)

Trong case study thứ hai này, mình và các bạn sẽ thiết kế một **notification system (hệ thống thông báo)** ở mức production-ready: hệ thống có khả năng giao **đúng thông điệp đến đúng người dùng, qua đúng kênh, vào đúng thời điểm** — ngay cả ở quy mô khổng lồ. Nghe thì đơn giản, nhưng như các bạn sẽ thấy, đây là một trong những hệ phân tán phức tạp bậc nhất trong thực tế.

---

### 🔔 Notification system là gì và vì sao nó khó?

**Notification system** chịu trách nhiệm giao thông tin quan trọng đến người dùng đúng lúc, qua đúng kênh, theo cách mang lại trải nghiệm tốt.

Điểm mấu chốt: thông báo **không được tạo thủ công** mà được kích hoạt bởi **business events (sự kiện nghiệp vụ)**. Ví dụ:

* Ai đó gửi tin nhắn cho bạn.
* Đơn hàng của bạn được giao cho đơn vị vận chuyển.
* Thanh toán của bạn thành công.
* Mật khẩu của bạn bị thay đổi.

Hệ thống thông báo **lắng nghe những sự kiện này** và biến chúng thành thông điệp mà người dùng thật sự nhận được. Ngay tại đây đã xuất hiện những thách thức lớn đầu tiên:

1. **Người dùng không giao tiếp theo cùng một cách.** Có thông báo gửi qua email, có cái qua SMS, có cái là **push notification (thông báo đẩy)** trên mobile, hoặc chỉ hiển thị trong ứng dụng. Hệ thống phải hỗ trợ **nhiều kênh giao nhận** trong khi giữ cho các ứng dụng nghiệp vụ **không cần biết** chi tiết triển khai của từng kênh.
2. **Tôn trọng sở thích người dùng.** Người dùng có thể muốn tắt email khuyến mãi nhưng vẫn nhận cảnh báo bảo mật ngay lập tức. Một hệ thống tốt luôn tuân thủ những tùy chọn này, thay vì gửi mọi thông báo một cách mù quáng.
3. **Nhất quán và dễ quản lý.** Thay vì mỗi ứng dụng tự sinh thông điệp, chúng ta dùng các **template (mẫu nội dung)** có thể cá nhân hóa với dữ liệu người dùng và dịch sang nhiều ngôn ngữ — giữ thông điệp nhất quán trên toàn nền tảng và giúp hỗ trợ đa khu vực dễ hơn nhiều.
4. **Độ tin cậy.** Các nhà cung cấp bên ngoài như dịch vụ email hay SMS đôi khi lỗi hoặc tạm thời không khả dụng. Hệ thống phải **tự động thử lại (retry)** những lần gửi thất bại và đưa ra **cam kết giao nhận**, để thông báo quan trọng không bị mất im lặng.

Vì vậy, hãy giữ mục tiêu này trong đầu: chúng ta không chỉ xây một service gửi tin nhắn, mà xây một **nền tảng** giao đúng thông báo đến đúng người, qua đúng kênh, đúng thời điểm — trong khi tôn trọng sở thích người dùng và vẫn mở rộng tốt khi số người dùng lẫn sự kiện tiếp tục tăng.

---

### 🧩 Functional requirements — hệ thống phải làm được gì?

Các **functional requirements (yêu cầu chức năng)** của hệ thống gồm:

1. **Nhận sự kiện từ nhiều upstream service.** Trong ứng dụng thực tế, order service có thể phát ra sự kiện "đơn hàng đã gửi", authentication service phát ra sự kiện "mật khẩu đã thay đổi", messaging service phát ra sự kiện "có tin nhắn mới". Nền tảng thông báo phải nhận được sự kiện từ tất cả các nguồn này **mà không bị ghép nối chặt (tightly coupled)** vào bất kỳ ứng dụng nào.
2. **Xác định cần sinh thông báo gì.** Một sự kiện duy nhất có thể dẫn đến **nhiều thông báo**. Ví dụ, một đơn hàng được gửi đi có thể kích hoạt: một email kèm thông tin theo dõi, một push notification trên điện thoại, và một **in-app notification (thông báo trong ứng dụng)** hiển thị cho đến khi người dùng đọc.
3. **Hỗ trợ nhiều kênh giao nhận.** Các kênh phục vụ mục đích khác nhau và người dùng có thể thích kênh này hơn kênh khác. Kiến trúc phải cung cấp cách gửi nhất quán qua **email, SMS, push notification hoặc in-app messaging**, mà không bắt các upstream service hiểu chi tiết triển khai của từng kênh.
4. **Quản lý sở thích người dùng.** Không phải thông báo nào cũng nên đến mọi kênh. Người dùng phải quyết định được **loại thông báo nào** họ muốn nhận và **nhận bằng cách nào**; hệ thống phải lưu các tùy chọn này và **thực thi chúng trước khi gửi**.
5. **Sinh thông điệp bằng template.** Template cho phép cá nhân hóa thông điệp với dữ liệu động, đồng thời hỗ trợ **localization (bản địa hóa)** để cùng một thông báo có thể được gửi bằng nhiều ngôn ngữ khác nhau.
6. **Đảm bảo độ tin cậy.** Hệ thống phải tự động **retry** các lỗi tạm thời; nếu thông điệp vẫn tiếp tục thất bại sau nhiều lần thử, nó phải được chuyển vào **dead-letter queue (hàng đợi thư chết)** để điều tra, thay vì bị mất im lặng.
7. **Cung cấp API.** Với các trường hợp ứng dụng cần gửi thông báo trực tiếp, hoặc để người dùng tự quản lý tùy chọn thông báo của mình — giúp notification service có thể tái sử dụng cho nhiều kịch bản nghiệp vụ khác nhau.

---

### 📊 Non-functional requirements — chất lượng của một hệ thống production

Khi đã biết hệ thống phải làm gì, bước tiếp theo là định nghĩa nó phải làm **tốt đến đâu**. Những yêu cầu phi chức năng này thường có tác động đến kiến trúc **lớn hơn cả yêu cầu chức năng**:

* **Scalability (khả năng mở rộng):** nền tảng có thể phải xử lý hàng triệu thông báo mỗi ngày, và lưu lượng hiếm khi đều đặn. Một sàn thương mại điện tử trong đợt sale lớn, hay một bài viết lan truyền trên mạng xã hội kích hoạt hàng nghìn thông báo trong vài giây — hệ thống vẫn phải hoạt động tốt qua những đỉnh lưu lượng đột ngột.
* **Reliability (độ tin cậy):** thiếu một email đặt lại mật khẩu hay xác nhận thanh toán ảnh hưởng trực tiếp đến trải nghiệm. Vì vậy chúng ta hướng tới **at-least-once delivery (gửi ít nhất một lần)** — mọi thông báo cuối cùng đều được gửi dù có lỗi tạm thời. Đồng thời cần cơ chế **giảm thiểu thông báo trùng lặp**, vì nhận cùng một tin nhiều lần cũng gây khó chịu không kém.
* **Low latency (độ trễ thấp):** phần lớn thông báo chỉ có giá trị khi đến nhanh — tin nhắn mới, **OTP (mật khẩu dùng một lần)**, cập nhật đơn hàng. Người dùng kỳ vọng trong vài giây chứ không phải vài phút, nên kiến trúc phải tối ưu cho **giao nhận gần thời gian thực (near real-time)**.
* **Security (bảo mật):** thông báo thường chứa thông tin nhạy cảm, nên bảo mật không thể là chuyện nghĩ sau. Cần **mã hóa dữ liệu nhạy cảm**, bảo vệ API và đảm bảo chỉ hệ thống/người dùng được phép mới truy cập được các thao tác liên quan.
* **Extensibility (khả năng mở rộng tính năng):** hôm nay hệ thống hỗ trợ email, SMS, push và in-app, nhưng mai này doanh nghiệp có thể muốn thêm kênh mới. Kiến trúc tốt giúp việc bổ sung diễn ra đơn giản, không cần thay đổi lớn.
* **Observability (khả năng quan sát):** khi một thông báo không đến được người dùng, ta phải trả lời được: sự kiện có được nhận không? thông báo có được sinh ra không? đã gửi đến provider chưa? provider có từ chối không? Log, metric và khả năng truy vết toàn diện giúp giám sát, xử lý sự cố và đáp ứng yêu cầu audit.
* **Idempotency (tính bất biến khi lặp):** vì retry là chuyện bình thường trong hệ phân tán, cùng một yêu cầu gửi có thể được xử lý nhiều hơn một lần. Hệ thống phải nhận diện an toàn các lần thử trùng lặp, để retry cải thiện độ tin cậy mà không khiến người dùng nhận thông báo lặp đi lặp lại.

Một quan sát đáng chú ý: phần lớn những yêu cầu này **không thêm tính năng mới** — chúng làm nền tảng trở nên **đáng tin cậy trong môi trường production**. Ở hệ thống quy mô lớn, chính những phẩm chất này quyết định kiến trúc thành công hay thất bại, và chúng sẽ ảnh hưởng mạnh đến mọi quyết định thiết kế phía sau.

---

### ⚠️ Constraints và challenges trong thực tế

Trên giấy, gửi một tin nhắn nghe rất đơn giản. Trong production, đây lại là một trong những hệ phân tán phức tạp hơn — vì nó phụ thuộc vào người dùng, các nhà cung cấp bên ngoài và những mẫu lưu lượng khó lường.

**Thách thức đầu tiên đến từ chính các kênh giao nhận.** Email, SMS, push đều dựa vào **external provider (nhà cung cấp bên ngoài)**, và các provider này có **rate limit (giới hạn tần suất)** riêng, cam kết khả dụng riêng và **SLA (thỏa thuận mức dịch vụ)** riêng. Push notification còn thêm một tầng bất định nữa vì việc giao nhận cuối cùng phụ thuộc vào **thiết bị của người dùng**: app có thể đã bị gỡ, thông báo có thể bị tắt, hoặc thiết bị đơn giản là đang offline. Nghĩa là **kể cả khi hệ thống của chúng ta hoàn hảo, việc giao nhận thành công không phải lúc nào cũng nằm trong tầm kiểm soát của chúng ta**.

**Thách thức tiếp theo là các đỉnh lưu lượng.** Trong điều kiện bình thường, hệ thống xử lý thông báo ở tốc độ ổn định. Nhưng những sự kiện như **flash sale, ra mắt sản phẩm hay thông báo toàn hệ thống** có thể sinh ra hàng triệu thông báo trong khoảng thời gian rất ngắn. Nếu hệ thống không hấp thụ được các đợt bùng nổ này, **queue sẽ phình lên, các service phía sau quá tải, và back pressure (áp lực ngược) có thể lan khắp nền tảng**.

**Sở thích người dùng** thêm một tầng phức tạp khác: mỗi người có thể chọn kênh khác nhau cho từng loại thông báo; có người tắt email marketing nhưng muốn cảnh báo bảo mật đến ngay; người khác lại đặt **quiet hours (giờ yên tĩnh)**, hoặc thuộc phạm vi các quy định khu vực như **GDPR** hay **Do Not Disturb**. Trước khi gửi bất kỳ thông báo nào, hệ thống phải đánh giá chính xác các tùy chọn và quy tắc tuân thủ này.

**Độ trễ cũng là một bài toán cân bằng.** Người dùng kỳ vọng thông báo đến gần như tức thì, nhưng chỉ ưu tiên tốc độ là chưa đủ: một thông báo chậm hơn một chút nhưng **chắc chắn đến** thường tốt hơn nhiều so với một thông báo nhanh nhưng **bị mất**. Ở vai trò kiến trúc sư, chúng ta liên tục cân bằng giữa **độ phản hồi và độ tin cậy**.

**Retry** cũng mang đến thách thức riêng: vì provider đôi khi lỗi, retry là cần thiết; nhưng nếu thiết kế cẩu thả, người dùng có thể nhận cùng một thông báo nhiều lần. Đó là lý do **idempotency** quan trọng đến vậy — nó cho phép thử lại an toàn mà không tạo ra giao nhận trùng lặp. Đồng thời, cần đảm bảo **lỗi ở một provider không chặn phần còn lại của pipeline**.

Cuối cùng, **security và privacy** là yêu cầu nền tảng: hệ thống thông báo xử lý **thông tin định danh cá nhân (PII)** như địa chỉ email và số điện thoại, nên dữ liệu phải được bảo vệ cả khi lưu trữ lẫn khi truyền. Song song đó, cần đủ log và audit để xử lý sự cố mà **không phơi bày thông tin nhạy cảm** trong log.

Những thách thức này giải thích vì sao notification system **không chỉ là một service gửi tin nhắn đơn giản**. Mọi quyết định kiến trúc — từ queue, retry đến quản lý tùy chọn và cô lập kênh — đều xuất phát từ nhu cầu giải quyết những ràng buộc production thực tế, trong khi vẫn giữ hệ thống mở rộng được, đáng tin cậy và thân thiện với người dùng.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao notification system nhận sự kiện thay vì để ứng dụng tự gửi thông báo?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để ứng dụng nghiệp vụ không bị ghép nối chặt vào nền tảng thông báo và không phải biết chi tiết từng kênh giao nhận.

Giải thích: Các service chỉ publish business event; notification system lắng nghe và xử lý.

Tham chiếu: Mục Notification system là gì.

</details>

**Câu 2:** Một sự kiện duy nhất có thể sinh ra bao nhiêu thông báo?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhiều thông báo — ví dụ đơn hàng gửi đi có thể tạo email theo dõi, push notification và in-app notification.

Giải thích: Mỗi kênh phục vụ một mục đích và trải nghiệm khác nhau.

Tham chiếu: Mục Functional requirements.

</details>

**Câu 3:** At-least-once delivery nghĩa là gì và đi kèm rủi ro nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mọi thông báo cuối cùng đều được gửi kể cả khi có lỗi tạm thời; rủi ro là giao nhận trùng lặp, cần cơ chế giảm thiểu.

Giải thích: Idempotency giúp retry an toàn mà không khiến người dùng nhận thông báo lặp.

Tham chiếu: Mục Non-functional requirements.

</details>

**Câu 4:** Vì sao push notification có thêm tầng bất định so với email hay SMS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì giao nhận phụ thuộc vào thiết bị người dùng — app có thể bị gỡ, thông báo bị tắt hoặc thiết bị offline.

Giải thích: Kể cả hệ thống hoàn hảo, giao nhận thành công không luôn nằm trong tầm kiểm soát.

Tham chiếu: Mục Constraints và challenges.

</details>

**Câu 5:** Khi queue phình lên vì lưu lượng tăng vọt, điều gì có thể xảy ra?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Các service phía sau quá tải và back pressure lan rộng khắp nền tảng.

Giải thích: Vì vậy hệ thống cần hấp thụ đỉnh lưu lượng như flash sale hay thông báo toàn hệ thống.

Tham chiếu: Mục Constraints và challenges.

</details>

---

Vậy là chúng ta đã hiểu đầy đủ bài toán: một nền tảng thông báo đa kênh, đa sự kiện, phải nhanh, đáng tin cậy, tôn trọng người dùng và chịu được những cú sốc lưu lượng. Ở bài tiếp theo, chúng ta sẽ **ước lượng quy mô** cụ thể — từ số người dùng hoạt động hằng ngày đến số thông báo mỗi ngày và hệ số đỉnh cần chịu đựng. Hẹn gặp lại các bạn! 🚀
