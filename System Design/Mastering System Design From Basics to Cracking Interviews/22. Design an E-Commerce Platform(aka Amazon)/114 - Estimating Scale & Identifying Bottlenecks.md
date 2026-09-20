# 📊 E-Commerce Platform: Ước lượng scale & nhận diện điểm nghẽn

> Nguồn: `114-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49955303)

Sang bước 2 của case study E-Commerce, trước khi quyết định database, cache hay chiến lược deploy, mình và các bạn cần **ước lượng quy mô hệ thống**. Những con số này không cần chính xác tuyệt đối — mục đích của chúng là tạo một **baseline** để ra quyết định kiến trúc có căn cứ, thay vì phỏng đoán.

---

### 📏 Ước lượng quy mô khi ra mắt

Ở thời điểm launch, chúng ta giả định các con số như sau:

| Hạng mục | Con số ước lượng |
|---|---|
| Người dùng đã đăng ký | ~1 triệu |
| Người dùng hoạt động hằng ngày (daily active users) | ~10.000 |
| Traffic đỉnh điểm | ~100 requests/giây |
| Sản phẩm trong catalog | ~500.000 |
| Đơn hàng mỗi ngày | ~1.000 |
| Người bán đang hoạt động | ~5.000 |

Điều đáng chú ý là các con số này kể một câu chuyện rất rõ ràng về tải thực tế của hệ thống:

* **1 triệu người dùng đăng ký nhưng chỉ khoảng 10.000 người hoạt động mỗi ngày** — nghĩa là không phải ai cũng online cùng lúc, giúp ta ước lượng đúng tải thật đặt lên hệ thống.
* **Đỉnh khoảng 100 requests/giây** — không phải quy mô internet, nhưng đủ cao để phải nghĩ vượt ra khỏi một server đơn lẻ và thiết kế **horizontal scalability (mở rộng ngang)** ngay từ đầu.
* **Catalog khoảng 500.000 sản phẩm** — tìm kiếm và duyệt sản phẩm phải luôn hiệu quả kể cả khi catalog tiếp tục lớn lên theo thời gian.
* **Khoảng 1.000 đơn hàng/ngày** — con số tuyệt đối không lớn, nhưng mỗi đơn là một giao dịch nghiệp vụ quan trọng: **accuracy (độ chính xác) và reliability (độ tin cậy) quan trọng hơn việc tối đa hóa throughput (thông lượng)**.
* **Khoảng 5.000 người bán đang hoạt động** — hỗ trợ nhiều nhà bán độc lập tạo thêm độ phức tạp so với ứng dụng thương mại điện tử một nhà bán.

---

### 💡 Tư duy đằng sau các con số

Những ước lượng trên được cố tình đặt hơi bảo thủ. Mục tiêu không phải tối ưu cho hàng triệu request ngay ngày đầu, mà là xây một kiến trúc xử lý thoải mái khối lượng hiện tại, đồng thời cho phép scale mượt mà khi doanh nghiệp tăng trưởng.

Đó chính là mindset của những kiến trúc sư kinh nghiệm: **thiết kế cho nhu cầu hiện tại nhưng có sẵn con đường rõ ràng cho tương lai** — thay vì over-engineering (làm phức tạp hóa) ngay từ đầu.

Các ước lượng này sẽ là nền tảng cho phần còn lại của thiết kế: từ chia service, chọn database đến các pattern giao tiếp — tất cả đều phải đáp ứng thoải mái mức scale dự kiến và vẫn dư địa cho tăng trưởng.

---

### ⚠️ Những điểm nghẽn nghiêm trọng

Khi tiến gần hơn tới kiến trúc, việc xác định trước hệ thống sẽ **đuối sức ở đâu** là rất hữu ích. Đây là những khu vực cần được chú ý nhất vì chúng ảnh hưởng lớn nhất đến trải nghiệm người dùng và hoạt động kinh doanh.

1. **Độ trễ tìm kiếm và duyệt sản phẩm:** product discovery là tính năng được dùng nhiều nhất, nên chỉ một độ trễ nhỏ cũng làm người dùng khó chịu và giảm **conversion (tỷ lệ chuyển đổi)**. Khi catalog lớn lên, giữ kết quả tìm kiếm nhanh ngày càng khó.
2. **Inventory consistency:** trong flash sale hoặc sự kiện nhu cầu cao, rất nhiều khách cùng mua một sản phẩm. Hệ thống phải giữ tồn kho chính xác và chống overselling ngay cả dưới tải đồng thời nặng.
3. **Checkout và payment:** đây là nơi nền tảng thực sự tạo ra doanh thu, nên toàn bộ luồng phải đáng tin cậy kể cả khi traffic tăng vọt. Checkout thất bại hay lỗi thanh toán đồng nghĩa mất sale trực tiếp và giảm niềm tin khách hàng.
4. **Database hotspots (điểm nóng dữ liệu):** sản phẩm phổ biến đương nhiên thu hút nhiều traffic hơn, dẫn tới đọc/ghi tập trung vào một số record cụ thể. Nếu không xử lý đúng, các hotspot này trở thành điểm nghẽn hiệu năng cho cả hệ thống.
5. **Gian lận và lỗi thanh toán:** không phải mọi giao dịch lỗi hay đáng ngờ đều là gian lận, nhưng nền tảng cần nhanh chóng nhận diện hoạt động bất thường để điều tra, mà không làm gián đoạn những khách hàng hợp lệ.

---

### 🧭 Cách nhìn đúng về điểm nghẽn

Một cách tư duy rất hữu ích: **các điểm nghẽn này chính là phần rủi ro cao nhất của hệ thống**. Vai trò của kiến trúc sư là thiết kế giải pháp để **loại bỏ hoặc giảm thiểu tác động** của chúng.

Các bạn sẽ thấy trong những bước tiếp theo, rất nhiều quyết định kiến trúc của chúng ta sẽ nhắm trực tiếp vào một hoặc nhiều thách thức kể trên. Đó không phải ngẫu nhiên — mà là cách thiết kế có chủ đích.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Traffic đỉnh điểm ước lượng là bao nhiêu, và nó dẫn tới quyết định thiết kế gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 100 requests/giây — đủ để phải thiết kế horizontal scalability ngay từ đầu.

Giải thích: Mức này vượt khỏi khả năng của một server đơn lẻ, dù chưa phải quy mô internet.

Tham chiếu: Mục Ước lượng quy mô khi ra mắt.

</details>

**Câu 2:** Vì sao với đơn hàng, accuracy và reliability lại quan trọng hơn throughput?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mỗi đơn hàng là một giao dịch nghiệp vụ quan trọng.

Giải thích: Chỉ khoảng 1.000 đơn/ngày — con số tuyệt đối không lớn — nhưng tính chính xác và độ tin cậy của từng đơn mới là điều quan trọng nhất.

Tham chiếu: Mục Ước lượng quy mô khi ra mắt.

</details>

**Câu 3:** Database hotspot là gì và nó hình thành thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là việc đọc/ghi tập trung vào một số record cụ thể, thường do các sản phẩm phổ biến thu hút nhiều traffic hơn.

Giải thích: Nếu không xử lý đúng, hotspot có thể trở thành điểm nghẽn hiệu năng cho toàn hệ thống.

Tham chiếu: Mục Những điểm nghẽn nghiêm trọng.

</details>

**Câu 4:** Vì sao các ước lượng được cố tình đặt hơi bảo thủ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để tránh over-engineering, trong khi vẫn có con đường rõ ràng để scale khi tăng trưởng.

Giải thích: Kiến trúc sư kinh nghiệm thiết kế cho nhu cầu hiện tại, không tối ưu cho hàng triệu request ngay ngày đầu.

Tham chiếu: Mục Tư duy đằng sau các con số.

</details>

**Câu 5:** Vì sao độ trễ tìm kiếm được xem là điểm nghẽn quan trọng bậc nhất?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì product discovery là tính năng được dùng nhiều nhất; chậm một chút cũng giảm conversion.

Giải thích: Khi catalog lớn dần, việc giữ kết quả tìm kiếm nhanh trở nên khó hơn — cần được thiết kế ngay từ đầu.

Tham chiếu: Mục Những điểm nghẽn nghiêm trọng.

</details>

---

Vậy là chúng ta đã có baseline về scale và danh sách các điểm nghẽn cần ưu tiên giải quyết. Ở bài tiếp theo, chúng ta bắt đầu **high-level design**: chia hệ thống thành các service cốt lõi, thiết kế API và chọn cách chúng giao tiếp với nhau. Hẹn gặp lại các bạn! 🚀
