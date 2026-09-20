# 📊 Ước lượng quy mô Collaborative Document Editor: 10 triệu người dùng, 10 tỷ sự kiện mỗi ngày

> Nguồn: `124-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49990477)

Trước khi vẽ kiến trúc, chúng ta cần ước lượng xem hệ thống thực sự lớn đến mức nào: **những con số không cần chính xác tuyệt đối, nhưng phải đủ để hiểu bậc độ lớn (order of magnitude) mà mình đang thiết kế**. Và quan trọng không kém, bước này giúp chúng ta nhìn ra trước những **điểm nghẽn (bottlenecks)** — nơi hệ thống có khả năng gãy nhất khi tải tăng.

---

### 👥 Ước lượng quy mô: người dùng, tài liệu và dòng sự kiện

Hãy bắt đầu từ người dùng. Chúng ta giả định nền tảng có **hơn 10 triệu daily active users (người dùng hoạt động mỗi ngày)**, mỗi người sở hữu khoảng **100 tài liệu**. Vào giờ cao điểm, có thể có **hơn 200.000 người cùng chỉnh sửa tài liệu tại một thời điểm**.

Con số đó nói ngay một điều: đây là hệ thống **có tính đồng thời cực cao**, hoàn toàn khác một ứng dụng CRUD đơn giản.

Tiếp theo là lưu lượng thời gian thực. Mỗi cú gõ phím, mỗi lần xóa hay đổi định dạng đều tạo ra một sự kiện trên nền tảng — cộng dồn lại khoảng **10 tỷ synchronization events (sự kiện đồng bộ) mỗi ngày**. Cụ thể hơn:

* Một người dùng đang hoạt động có thể tạo **1–2 sự kiện mỗi giây**.
* Một tài liệu "đông đúc" với nhiều cộng tác viên có thể dễ dàng đạt **5–20 thao tác mỗi giây**.

Về lưu trữ, tuy một tài liệu trung bình chỉ khoảng **100 KB**, **version history (lịch sử phiên bản)** làm nhu cầu lưu trữ tăng mạnh vì phải giữ lại cả các trạng thái trước đó. Kết quả: dung lượng có thể phình lên **gấp 2–5 lần kích thước tài liệu gốc**. Chúng ta cũng cần chia tầng lưu trữ:

* **Hot storage** cho tài liệu đang được sửa thường xuyên — cần truy cập nhanh.
* **Cold storage** cho phiên bản cũ và tài liệu lưu trữ — tối ưu cho dung lượng thay vì tốc độ.

Ở quy mô này, mỗi ngày hệ thống sinh ra **vài terabytes dữ liệu hot**, và **hàng trăm terabytes** tích lũy trong kho lưu trữ dài hạn.

| Hạng mục | Con số | Hệ quả cho thiết kế |
|---|---|---|
| Người dùng hoạt động mỗi ngày | Hơn 10 triệu | Bài toán quy mô toàn cầu |
| Tài liệu mỗi người sở hữu | Khoảng 100 | Lượng tài liệu khổng lồ cần quản lý |
| Người sửa đồng thời giờ cao điểm | Hơn 200.000 | Hệ thống có tính đồng thời cao, không phải CRUD đơn giản |
| Sự kiện đồng bộ mỗi ngày | Khoảng 10 tỷ | Định hình thiết kế messaging và đồng bộ |
| Sự kiện mỗi người dùng active | 1–2 mỗi giây | Yêu cầu xử lý dòng cập nhật liên tục |
| Thao tác mỗi tài liệu đông người | 5–20 mỗi giây | Cần broadcast hiệu quả tới nhiều client |
| Kích thước tài liệu trung bình | Khoảng 100 KB | Nhỏ, nhưng số lượng bù lại |
| Dung lượng lưu trữ so với tài liệu gốc | 2–5 lần | Do phải giữ version history |
| Dữ liệu hot mỗi ngày | Vài terabytes | Cần tách hot và cold storage |
| Lưu trữ dài hạn | Hàng trăm terabytes | Chiến lược lưu trữ và archive rõ ràng |

Điểm mấu chốt: những ước lượng này **định hình gần như mọi quyết định kiến trúc về sau** — tính đồng thời cao dẫn dắt chiến lược giao tiếp thời gian thực, lượng sự kiện khổng lồ ảnh hưởng thiết kế messaging và đồng bộ, còn khối lượng lưu trữ quyết định cách tổ chức dữ liệu. Đó là lý do capacity estimation luôn là bước quan trọng của system design.

---

### 🌊 Traffic patterns — điều thực sự định hình kiến trúc

Hiểu mẫu lưu lượng quan trọng không kém ước lượng quy mô: **hai hệ thống cùng số người dùng vẫn có thể cần kiến trúc rất khác nhau, tùy cách người dùng hành xử**. Có ba quan sát đáng chú ý:

1. **Lưu lượng không rải đều trong ngày.** Sử dụng thường tăng vọt vào giờ làm việc khi các đội nhóm cộng tác tích cực. Hệ thống phải hấp thụ được các đỉnh tải này mà không làm ảnh hưởng trải nghiệm chỉnh sửa thực tế.
2. **Tồn tại các hotspot document (tài liệu điểm nóng).** Hầu hết tài liệu chỉ được sửa lẻ tẻ, nhưng một vài tài liệu như **biên bản họp, kế hoạch dự án hay template chia sẻ** có thể thu hút rất nhiều người cùng sửa. Những tài liệu này tạo ra lưu lượng **không cân xứng** và thường trở thành **điểm nghẽn mở rộng đầu tiên** nếu kiến trúc không được thiết kế cẩn thận.
3. **Đặc điểm workload rất riêng.** Chỉnh sửa cộng tác sinh ra **rất nhiều ghi nhỏ** — mỗi cú gõ hay xóa là một cập nhật mới. Ngược lại, **đọc ít thường xuyên hơn nhưng khối lượng lớn hơn**, ví dụ khi mở tài liệu hoặc tải lịch sử phiên bản. Kiến trúc phải xử lý tốt cả hai, thay vì tối ưu cho mỗi một loại.

Thêm một chi tiết: mỗi request không chỉ là đọc/ghi dữ liệu — hệ thống còn phải **xác thực người dùng và kiểm tra quyền** trước khi cho truy cập. Các bước kiểm tra bảo mật này là thiết yếu, nhưng dưới tải nặng, chúng có thể góp phần làm tăng độ trễ nếu không được thiết kế hiệu quả.

Bài học then chốt: **kiến trúc phải được dẫn dắt bởi hành vi lưu lượng thực tế, chứ không chỉ bởi số người dùng.** Biết lưu lượng tăng vọt khi nào, tài liệu nào thành hotspot, và người dùng tương tác ra sao sẽ giúp nhận diện điểm nghẽn sớm và xây giải pháp vẫn chạy tốt khi mức sử dụng tăng lên.

---

### ⚠️ Năm điểm nghẽn tiềm năng

Hiểu traffic patterns rồi, bước tiếp theo là xác định **nơi hệ thống dễ gặp khó khăn nhất** — những khu vực cần được chú ý kiến trúc nhiều nhất:

1. **Collaboration engine (động cơ cộng tác).** Dù dùng operational transformation hay CRDT, hệ thống phải liên tục **xử lý, sắp thứ tự và hợp nhất** chỉnh sửa từ nhiều người dùng. Đây là thao tác **ngốn CPU (CPU-intensive)** nên phải cực kỳ hiệu quả để giữ việc chỉnh sửa luôn nhạy bén.
2. **WebSocket scaling.** Cộng tác thời gian thực dựa trên **kết nối dài hạn**, và mọi cập nhật phải đến được tất cả người tham gia với độ trễ rất thấp. Quản lý **hàng trăm nghìn kết nối thường trực** và broadcast cập nhật hiệu quả khó hơn nhiều so với xử lý request HTTP truyền thống.
3. **Storage.** Mỗi chỉnh sửa, mỗi autosave, mỗi cập nhật phiên bản đều sinh thao tác ghi. Khác với nhiều ứng dụng thiên về đọc, collaborative editor tạo ra **dòng ghi liên tục**, nên tầng lưu trữ phải chịu được **write throughput cao** mà không trở thành nút thắt.
4. **Conflict resolution (giải quyết xung đột).** Hệ thống phải giải quyết chỉnh sửa đồng thời **đủ nhanh để người dùng không cảm nhận được độ trễ**. Nếu việc này chặn dòng chỉnh sửa, ứng dụng mất ngay trải nghiệm thời gian thực.
5. **Synchronization (đồng bộ).** Sau khi một chỉnh sửa được chấp nhận, nó phải được lan truyền tới mọi client đang kết nối **trong vài milliseconds**, đồng thời đảm bảo tất cả cuối cùng hội tụ về cùng trạng thái tài liệu. Càng nhiều cộng tác viên, việc giữ mọi client đồng bộ càng khó.

Bài học quan trọng: **các điểm nghẽn không tồn tại độc lập** — cải thiện chỗ này có thể làm lộ ra chỗ khác. Vì vậy thiết kế hệ thống tốt là nhận diện sớm điểm nghẽn khả dĩ nhất, và xây kiến trúc có thể **mở rộng độc lập từng đường tới hạn (critical path)**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vào giờ cao điểm, có bao nhiêu người dùng có thể cùng chỉnh sửa tài liệu tại một thời điểm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hơn 200.000 người.

**Giải thích:** Con số này cho thấy đây là hệ thống có tính đồng thời cực cao, không phải CRUD đơn giản.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 2:** Mỗi ngày nền tảng sinh ra khoảng bao nhiêu sự kiện đồng bộ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 10 tỷ sự kiện.

**Giải thích:** Mỗi cú gõ, xóa hay đổi định dạng đều tạo một sự kiện; người dùng active tạo 1–2 sự kiện mỗi giây.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 3:** Vì sao nhu cầu lưu trữ có thể lớn gấp 2–5 lần kích thước tài liệu gốc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì version history — hệ thống phải giữ lại cả những trạng thái trước đó của tài liệu.

**Giải thích:** Tài liệu trung bình chỉ khoảng 100 KB, nhưng lịch sử phiên bản làm dung lượng phình lên.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 4:** Hotspot document là gì và vì sao nó nguy hiểm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là tài liệu thu hút nhiều người cùng sửa như biên bản họp, kế hoạch dự án hay template chia sẻ — tạo lưu lượng không cân xứng và thường thành điểm nghẽn đầu tiên.

**Giải thích:** Hầu hết tài liệu chỉ được sửa lẻ tẻ, nhưng một vài tài liệu điểm nóng có thể quá tải nếu kiến trúc không tính trước.

Tham chiếu: Mục Traffic patterns.

</details>

**Câu 5:** Vì sao nói các điểm nghẽn không tồn tại độc lập?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cải thiện một khu vực có thể làm lộ ra điểm nghẽn khác — nên cần mở rộng độc lập từng đường tới hạn.

**Giải thích:** Đó là lý do phải nhận diện sớm điểm nghẽn khả dĩ nhất và thiết kế để scale từng critical path riêng.

Tham chiếu: Mục Năm điểm nghẽn tiềm năng.

</details>

---

Vậy là chúng ta đã có bức tranh định lượng: hơn 10 triệu người dùng hằng ngày, hơn 200.000 người sửa đồng thời lúc cao điểm, khoảng 10 tỷ sự kiện đồng bộ mỗi ngày, cùng năm điểm nghẽn cần dự đoán trước. Ở bài tiếp theo, chúng ta bước vào **high-level design** — thiết kế document model, luồng đồng bộ thời gian thực và các API cốt lõi. Hẹn gặp lại các bạn! 🚀
