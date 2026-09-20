# 📊 Taxi Hailing App: Ước lượng scale & điểm nghẽn

> Nguồn: `119-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49971989)

Bước 2 của case study Taxi Hailing — trước khi chọn database hay thiết kế service, mình và các bạn cần **ước lượng quy mô dự kiến** của hệ thống. Những con số này không cần chính xác tuyệt đối; mục đích là giúp chúng ta ra quyết định kiến trúc có căn cứ thay vì đoán mò.

---

### 👥 Quy mô giả định của nền tảng

Với case study này, chúng ta giả định nền tảng ra mắt ở **một đô thị lớn (single metro city)**:

| Hạng mục | Con số ước lượng |
|---|---|
| Người dùng đã đăng ký | ~10 triệu |
| Người dùng hoạt động hằng ngày (daily active users) | ~1 triệu |
| Tài xế hoạt động mỗi ngày | ~200.000 |
| Rider + tài xế kết nối đồng thời giờ cao điểm | ~150.000 |

Chỉ riêng những con số này đã cho thấy chúng ta đang thiết kế cho một hệ thống có **mức đồng thời rất cao**, chứ không phải một web application đơn giản.

---

### 📈 Ước lượng workload

Giờ hãy đi vào từng loại tải chính của hệ thống:

1. **Ride requests:** khoảng **500.000 yêu cầu chuyến mỗi ngày** ≈ **6 yêu cầu/giây** trung bình. Nghe có vẻ không cao, nhưng hãy nhớ rằng mỗi yêu cầu chuyến kích hoạt nhiều thao tác: tìm tài xế gần, kiểm tra availability, gửi thông báo và cập nhật trạng thái chuyến.
2. **Location updates (cập nhật vị trí):** sinh ra traffic lớn hơn hẳn — khoảng **3 lần** khối lượng ride request, tức khoảng **18 location updates mỗi giây**. Khác với ride request, loại traffic này **liên tục** và tồn tại suốt thời gian diễn ra mỗi chuyến.
3. **Map interactions (tương tác bản đồ):** nếu người dùng tạo ra khoảng **1 triệu lượt xem map tile mỗi giờ**, thì đó là khoảng **280 requests mỗi giây**. Phần lớn được phục vụ bởi hạ tầng bản đồ, nhưng vẫn đóng góp vào khối lượng công việc tổng thể của hệ thống.
4. **Payments:** giả định khoảng **100.000 giao dịch thanh toán mỗi ngày** ≈ **hơn 1 giao dịch/giây**. Khối lượng không đặc biệt cao, nhưng xử lý thanh toán đòi hỏi độ tin cậy và chính xác vì mỗi giao dịch là tiền thật.

Một quan sát quan trọng: **không phải mọi workload đều như nhau**. Ride requests xảy ra thưa thớt, payments chỉ xuất hiện khi chuyến kết thúc, nhưng location updates thì liên tục và dài hạn. Vì vậy, khi thiết kế kiến trúc, chúng ta sẽ chú ý nhiều hơn đến những workload **duy trì liên tục theo thời gian** thay vì chỉ nhìn vào con số trung bình requests/giây.

Các ước lượng này cho chúng ta baseline cho phần còn lại của thiết kế: từ chia service, chọn database đến pattern giao tiếp — mọi thứ phải đáp ứng thoải mái mức scale dự kiến và vẫn dư địa cho tăng trưởng tương lai.

---

### ⚠️ Điểm nghẽn và thách thức scale

Câu hỏi tiếp theo là: **hệ thống sẽ bắt đầu đuối ở đâu** khi traffic tăng? Nhận diện sớm giúp ta thiết kế xoay quanh những bài toán khó nhất thay vì tối ưu cho phần dễ.

* **Real-time location và ride matching:** tài xế liên tục gửi cập nhật vị trí, tạo ra khối workload đòi hỏi độ trễ rất thấp. Hệ thống phải ingest các cập nhật, xử lý nhanh và đưa vị trí mới nhất cho matching. Khi số tài xế sẵn sàng tăng lên, việc tìm trong pool tài xế lớn hơn mà vẫn phản hồi trong vài giây đòi hỏi thiết kế hiệu quả — nếu không, thời gian chờ của rider sẽ tăng dần khi nền tảng scale.
* **Đẩy cập nhật tức thời:** sau khi chuyến được gán, công việc chưa kết thúc. Mọi thay đổi vị trí và trạng thái chuyến phải được đẩy đến **cả rider lẫn tài xế** gần như ngay lập tức. Duy trì trải nghiệm real-time ở quy mô lớn là một trong những thách thức kỹ thuật lớn nhất của hệ thống này.
* **Third-party dependencies:** nền tảng phụ thuộc dịch vụ bản đồ bên ngoài cho routing và geolocation. Những dịch vụ này có thể gây độ trễ, áp rate limit và phát sinh chi phí đáng kể khi lượng request tăng. Vì không kiểm soát được chúng, kiến trúc phải được thiết kế với những giới hạn đó trong đầu. Payment provider cũng mang thách thức tương tự: timeout, retry và các bước xác minh bổ sung đều có thể làm tăng thời gian phản hồi — dù thanh toán được xử lý bên ngoài, nền tảng vẫn phải mang lại trải nghiệm mượt mà và đáng tin cậy.
* **Thách thức scale toàn nền tảng:** gửi thông báo đến một lượng lớn rider và tài xế sẽ trở thành khối lượng công việc đáng kể, đặc biệt trong giai đoạn cao điểm khi nhiều yêu cầu chuyến diễn ra đồng thời. Một thách thức khác là giữ nhiều service đồng bộ với nhau — các phần khác nhau của hệ thống không phải lúc nào cũng cập nhật cùng thời điểm, nên kiến trúc cần chấp nhận **eventual consistency** trong khi vẫn mang lại trải nghiệm mạch lạc cho người dùng. Và xuyên suốt tất cả là sự cân bằng giữa **hiệu năng và chi phí**: thêm server, thêm storage, thêm lời gọi API bên thứ ba có thể cải thiện độ nhạy bén nhưng cũng làm tăng chi phí vận hành. *Một kiến trúc tốt không chỉ scale được — nó scale hiệu quả.*

Điểm mấu chốt: những điểm nghẽn lớn nhất thường **không đến từ một service đơn lẻ**. Chúng xuất phát từ các workload real-time liên tục, sự phụ thuộc vào hệ thống bên ngoài và những thách thức vận hành của một nền tảng phân tán ở quy mô lớn. Đó chính là những khu vực chúng ta sẽ tập trung giải quyết khi xây kiến trúc.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao location updates là workload đáng lo hơn ride requests dù cùng nguồn traffic?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì location updates liên tục và kéo dài suốt mỗi chuyến, với khối lượng khoảng 3 lần ride requests (~18 updates/giây).

Giải thích: Cần chú ý đến workload duy trì liên tục thay vì chỉ nhìn con số trung bình.

Tham chiếu: Mục Ước lượng workload.

</details>

**Câu 2:** Ước lượng số tài xế hoạt động mỗi ngày và số kết nối đồng thời giờ cao điểm là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** ~200.000 tài xế hoạt động mỗi ngày; ~150.000 rider và tài xế kết nối đồng thời giờ cao điểm.

Giải thích: Đây là lý do hệ thống cần được coi là có mức đồng thời rất cao.

Tham chiếu: Mục Quy mô giả định của nền tảng.

</details>

**Câu 3:** Vì sao payment provider lại là một điểm nghẽn dù thanh toán xử lý bên ngoài?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì timeout, retry và các bước xác minh bổ sung có thể làm tăng thời gian phản hồi.

Giải thích: Nền tảng vẫn phải đảm bảo trải nghiệm mượt mà và đáng tin cậy cho người dùng.

Tham chiếu: Mục Điểm nghẽn và thách thức scale.

</details>

**Câu 4:** "Scale hiệu quả" khác gì "scale được"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Scale hiệu quả là cân bằng giữa hiệu năng và chi phí vận hành.

Giải thích: Thêm server, storage và lời gọi API bên thứ ba cải thiện độ nhạy bén nhưng cũng tăng chi phí.

Tham chiếu: Mục Điểm nghẽn và thách thức scale.

</details>

**Câu 5:** Vì sao các service cần chấp nhận eventual consistency?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì các phần khác nhau của hệ thống không cập nhật cùng thời điểm.

Giải thích: Kiến trúc cần chấp nhận nhất quán sau cùng nhưng vẫn mang lại trải nghiệm mạch lạc cho người dùng.

Tham chiếu: Mục Điểm nghẽn và thách thức scale.

</details>

---

Vậy là chúng ta đã có bức tranh định lượng về quy mô cùng danh sách điểm nghẽn cần ưu tiên. Ở bài tiếp theo, chúng ta bắt đầu **high-level design**: chia nền tảng thành các microservice, thiết kế API gateway và chọn cách giao tiếp phù hợp. Hẹn gặp lại các bạn! 🚀
