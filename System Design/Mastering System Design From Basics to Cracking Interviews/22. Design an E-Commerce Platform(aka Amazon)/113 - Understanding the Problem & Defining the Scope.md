# 🛒 Thiết kế E-Commerce Platform kiểu Amazon: Hiểu bài toán & chốt scope

> Nguồn: `113-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49955301)

Mình và các bạn bắt đầu một case study mới: thiết kế **sàn thương mại điện tử đa nhà bán (multi-vendor e-commerce platform)** kiểu Amazon, nơi nhiều người bán cùng đăng sản phẩm còn người mua thì tìm kiếm, đặt hàng và thanh toán trên một nền tảng duy nhất. Đây là bài đầu tiên trong chuỗi 5 bài, và như mọi bài system design khác, chúng ta phải hiểu thật rõ mình đang xây gì trước khi nghĩ đến kiến trúc.

*Nếu các bạn chưa từng thiết kế hệ thống thương mại điện tử, đừng lo — cứ đi từng bước một.*

---

### 🎯 Chúng ta đang xây gì?

Mục tiêu là một **nền tảng đa nhà bán**, nơi nhiều người bán độc lập có thể đăng bán và quản lý sản phẩm, còn người mua có thể duyệt, mua và nhận hàng qua một marketplace chung.

* **Góc nhìn người mua:** hành trình bắt đầu từ khám phá sản phẩm — duyệt danh mục, tìm kiếm, so sánh lựa chọn, thêm vào giỏ hàng và hoàn tất **checkout (thanh toán)** an toàn, mượt mà.
* **Góc nhìn người bán:** tạo và quản lý listing sản phẩm, cập nhật **inventory (tồn kho)**, điều chỉnh giá và giữ thông tin kho luôn chính xác.
* Vì nhiều người bán chia sẻ cùng một nền tảng, **quản lý dữ liệu hiệu quả** trở thành yêu cầu nền tảng — chứ không phải chi tiết phụ.
* **Thanh toán** là phần then chốt nhất của toàn bộ workflow: phải xử lý an toàn, đồng thời bảo vệ cả người mua lẫn người bán khỏi giao dịch gian lận.

---

### 📋 Functional requirements — nền tảng phải làm được gì?

Functional requirements (yêu cầu chức năng) là những năng lực cốt lõi nhìn từ góc độ nghiệp vụ, và mỗi thành phần trong kiến trúc sau này sẽ phục vụ một hoặc nhiều yêu cầu dưới đây.

1. **Đăng ký và đăng nhập an toàn** cho cả người mua và người bán. Người mua dùng tài khoản để mua sắm và theo dõi đơn; người bán dùng để quản lý sản phẩm, tồn kho và hoạt động kinh doanh.
2. **Product catalog (danh mục sản phẩm)** là trái tim của nền tảng: người bán tạo/cập nhật listing, người mua duyệt và tìm kiếm nhanh giữa số lượng lớn sản phẩm. Catalog thay đổi liên tục, nên hệ thống phải xử lý cập nhật thường xuyên mà không ảnh hưởng trải nghiệm mua sắm.
3. **Inventory consistency (tính nhất quán tồn kho) khi checkout** — yêu cầu quan trọng bậc nhất. Hãy tưởng tượng chỉ còn **một chiếc laptop** mà hai khách cùng mua một lúc: nền tảng phải đảm bảo **chỉ một đơn thành công**, chống **overselling (bán vượt tồn kho)** và giữ con số tồn kho chính xác.
4. **Giỏ hàng và quản lý đơn hàng:** thêm sản phẩm, sửa số lượng, checkout, rồi theo dõi đơn qua các trạng thái cho tới khi giao hàng. Phía sau, hệ thống phải phối hợp cập nhật tồn kho, tạo đơn và theo dõi trạng thái.
5. **Thanh toán an toàn** cho mọi giao dịch, bảo vệ thông tin tài chính nhạy cảm; kèm **fraud detection (phát hiện gian lận) cơ bản** để nhận diện giao dịch đáng ngờ và tạo cảnh báo cho người kiểm duyệt.
6. **Seller dashboard:** người bán cần giao diện riêng để quản lý sản phẩm, theo dõi doanh số, đơn hàng và **payouts (khoản tiền được chi trả)** — đây là công cụ chính để họ vận hành việc kinh doanh trên nền tảng.
7. **Admin:** kiểm duyệt nội dung, giám sát sức khỏe nền tảng và xử lý tranh chấp giữa người mua và người bán.

Điểm đáng chú ý: mỗi nhóm người dùng có một bộ trách nhiệm khác nhau, và chính những trách nhiệm này sẽ được "dịch" thành các service và thành phần khác nhau trong kiến trúc.

---

### ⚙️ Non-functional requirements — làm tốt đến đâu?

Nếu functional requirements nói hệ thống **làm gì**, thì **non-functional requirements (yêu cầu phi chức năng)** nói hệ thống phải **làm tốt đến mức nào**. Đây là nhóm yêu cầu ảnh hưởng lớn nhất đến kiến trúc.

* **Performance (hiệu năng):** tìm kiếm và duyệt sản phẩm phải gần như tức thì — mục tiêu **dưới 300ms** cho các truy vấn phổ biến, vì trong thương mại điện tử chỉ một chút độ trễ cũng làm giảm tương tác và doanh số.
* **Scalability (khả năng mở rộng):** mục tiêu ban đầu là **10.000 người dùng đồng thời (concurrent users)**, nhưng thiết kế phải sẵn sàng cho tăng trưởng — scale linh hoạt khi traffic tăng mà không cần đập đi làm lại.
* **Availability (tính sẵn sàng):** marketplace chỉ sinh doanh thu khi còn hoạt động, nên mục tiêu là **99,9% uptime**. Các năng lực cốt lõi như catalog, cart, checkout phải **fault-tolerant (chịu lỗi)** — một điểm lỗi đơn lẻ không được làm sập cả nền tảng.
* **Security (bảo mật):** xác thực an toàn, xử lý thanh toán theo chuẩn tốt nhất của ngành để bảo vệ thông tin tài chính nhạy cảm. *Xây dựng niềm tin quan trọng không kém gì xây tính năng.*
* **Consistency (nhất quán):** đặc biệt quan trọng khi checkout — cập nhật tồn kho cần **strong consistency (nhất quán mạnh)** để cùng một sản phẩm không bị bán cho nhiều người khi chỉ còn một món.
* **Maintainability (khả năng bảo trì):** giữ hệ thống **modular (mô-đun hóa)**, tách rõ các service như catalog và payment, để có thể thêm tính năng, tiếp nhận thêm người bán mà không ảnh hưởng toàn bộ ứng dụng.

Một điều các bạn sẽ thấy xuyên suốt case study: **non-functional requirements dẫn dắt quyết định kiến trúc**. Mỗi khi chọn công nghệ hay design pattern, gần như luôn là để thỏa mãn một hoặc vài yêu cầu trong nhóm này — đó là lý do các kiến trúc sư kinh nghiệm dành nhiều thời gian để hiểu chúng trước khi thiết kế.

---

### 🧩 Năm thách thức lớn cần giải

Đây là những bài toán khiến thiết kế e-commerce phức tạp hơn nhiều so với một web app đơn giản.

1. **Độ chính xác của tồn kho:** hàng nghìn khách cùng mua một sản phẩm hot trong **flash sale (mua nhanh giảm giá)** — hệ thống phải chống overselling ngay cả dưới tải đồng thời cực lớn.
2. **Tính sẵn sàng cao:** người mua muốn mua bất cứ lúc nào, người bán muốn vận hành không gián đoạn; mỗi phút downtime đều ảnh hưởng trực tiếp đến doanh thu.
3. **Thanh toán an toàn:** mọi giao dịch liên quan thông tin tài chính nhạy cảm, phải vừa bảo vệ dữ liệu vừa nhận diện hoạt động gian lận. *Bảo mật không phải tính năng tùy chọn — đó là yêu cầu cốt lõi.*
4. **Khả năng mở rộng:** marketplace thành công hiếm khi giữ quy mô nhỏ; khi người mua, người bán và sản phẩm tăng lên, kiến trúc phải lớn theo mà không suy giảm hiệu năng.
5. **Tìm kiếm sản phẩm hiệu quả:** người dùng chờ kết quả gần như tức thì, kể cả khi catalog có hàng triệu sản phẩm.

Giữ những thách thức này trong đầu sẽ giúp các bạn hiểu không chỉ kiến trúc **trông như thế nào**, mà cả **vì sao nó được thiết kế như vậy**.

---

### 📌 Giả định và ràng buộc — ranh giới của bài toán

Trước khi thiết kế bất kỳ hệ thống lớn nào, ta phải chốt **assumptions (giả định)** và **constraints (ràng buộc)** — những đường biên mà kiến trúc phải vận hành bên trong. Trong dự án thực tế, chúng thường được thống nhất trước cả khi thiết kế kỹ thuật bắt đầu.

**Giả định:**

* Người dùng có kết nối internet ổn định — không cần thiết kế cho offline hay đồng bộ dữ liệu.
* Thanh toán do **external payment gateway (cổng thanh toán bên ngoài)** xử lý — ta tập trung vào tích hợp thay vì tự xây hệ thống thanh toán từ đầu.
* Người bán tự lo kho bãi và vận chuyển; phiên bản đầu của nền tảng quản lý đơn hàng và thanh toán, **không** làm logistics.
* Catalog khởi điểm khoảng **500.000 sản phẩm** — đủ lớn để cần tìm kiếm hiệu quả, nhưng chưa đòi hỏi giải pháp scale cực đoan.
* Fraud detection sẽ ở dạng **rule-based (dựa trên luật)**, giữ triển khai đơn giản và để dư địa nâng cấp sau này.

**Ràng buộc:**

* **Thời gian** là ràng buộc lớn nhất: cần ra **MVP (sản phẩm khả dụng tối thiểu) trong 3–4 tháng**, nên tập trung vào chức năng cốt lõi thay vì xây mọi tính năng.
* **Ngân sách:** ưu tiên **managed cloud services (dịch vụ đám mây được quản lý)** thay vì tự vận hành hạ tầng phức tạp — giảm công sức vận hành và dễ scale.
* **Đội ngũ DevOps/SRE tối thiểu** đồng nghĩa **đơn giản trong vận hành** là mục tiêu thiết kế: dễ deploy, dễ monitor, dễ bảo trì.
* Tìm kiếm giai đoạn đầu chỉ **keyword-based (theo từ khóa)**, chưa có gợi ý cá nhân hóa.
* Dù là MVP, **không được thỏa hiệp về regulatory compliance (tuân thủ quy định)**: thanh toán và dữ liệu người dùng vẫn phải đạt các chuẩn bảo mật và quyền riêng tư bắt buộc.

Bài học quan trọng cho phỏng vấn system design: **giả định và ràng buộc không phải thông tin nền — chúng ảnh hưởng trực tiếp đến kiến trúc**. Hai hệ thống giải cùng một bài toán nghiệp vụ có thể trông hoàn toàn khác nhau chỉ vì giả định, thời hạn, ngân sách hay ràng buộc vận hành khác nhau.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Yêu cầu nhất quán nào đặc biệt quan trọng khi checkout, và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Strong consistency cho cập nhật tồn kho.

Giải thích: Nếu chỉ còn một sản phẩm mà nhiều khách cùng mua, hệ thống phải để chỉ một đơn thành công, tránh overselling.

Tham chiếu: Mục Non-functional requirements.

</details>

**Câu 2:** Mục tiêu thời gian phản hồi cho các truy vấn phổ biến là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dưới 300ms.

Giải thích: Trong thương mại điện tử, chỉ một chút độ trễ cũng làm giảm tương tác và ảnh hưởng doanh số.

Tham chiếu: Mục Non-functional requirements.

</details>

**Câu 3:** Vì sao nền tảng không tự xây hệ thống thanh toán từ đầu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì giả định thanh toán được xử lý bởi một external payment gateway.

Giải thích: Điều này cho phép tập trung vào việc tích hợp thay vì xây dựng hệ thống thanh toán từ con số không.

Tham chiếu: Mục Giả định và ràng buộc.

</details>

**Câu 4:** Ràng buộc nào dẫn đến việc ưu tiên managed cloud services và đơn giản trong vận hành?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ngân sách hạn chế và đội ngũ DevOps/SRE tối thiểu.

Giải thích: Managed services giảm công sức vận hành; kiến trúc phải dễ deploy, monitor và bảo trì mà không cần đội vận hành lớn.

Tham chiếu: Mục Giả định và ràng buộc.

</details>

**Câu 5:** Vì sao nói giả định và ràng buộc ảnh hưởng trực tiếp đến kiến trúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hai hệ thống cùng giải một bài toán nghiệp vụ có thể có kiến trúc khác nhau hoàn toàn do giả định, thời hạn, ngân sách và ràng buộc vận hành khác nhau.

Giải thích: Chúng định nghĩa ranh giới mà kiến trúc phải vận hành bên trong, và thường được thống nhất trước khi thiết kế kỹ thuật bắt đầu.

Tham chiếu: Mục Giả định và ràng buộc.

</details>

---

Vậy là chúng ta đã hiểu bài toán, chốt requirements, thách thức, giả định và ràng buộc — tấm bản đồ cho toàn bộ case study. Ở bài tiếp theo, chúng ta sẽ **ước lượng scale** với những con số cụ thể và tìm ra các **điểm nghẽn** đáng lo nhất. Hẹn gặp lại các bạn! 🚀
