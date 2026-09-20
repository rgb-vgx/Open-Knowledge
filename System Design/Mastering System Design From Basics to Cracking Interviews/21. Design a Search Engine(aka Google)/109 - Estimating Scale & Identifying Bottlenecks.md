# 📐 Ước lượng quy mô search engine: 100 triệu trang, ngân sách 1 petabyte

> Nguồn: `109-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49938833)

Trước khi thiết kế kiến trúc, chúng ta cần ước lượng **quy mô bài toán**. Những con số này không cần chính xác tuyệt đối, nhưng chúng giúp đưa ra quyết định có căn cứ về storage, networking và hạ tầng. Và với search engine, câu chuyện quy mô bắt đầu từ một con số khổng lồ: internet.

---

### 🌍 Từ quy mô internet đến mục tiêu MVP

Ở quy mô internet, một search engine có thể index **hơn 100 tỷ trang web**. Với giả định kích thước trang trung bình khoảng **100KB**, chúng ta đang nhìn vào khoảng **10 petabyte dữ liệu thô**.

May mắn là ta không cần lưu mọi thứ ở dạng nguyên bản. Bằng cách **nén nội dung, loại bỏ trùng lặp và chỉ giữ dữ liệu cần thiết cho indexing và search**, dung lượng lưu trữ có thể giảm xuống còn khoảng **2 đến 3 petabyte**. Lượng truy vấn cũng tương xứng: các search engine lớn xử lý **hàng tỷ lượt tìm kiếm mỗi ngày**, tạo ra traffic khổng lồ phải được phục vụ với độ trễ thấp ổn định.

Tuy nhiên, khi thiết kế hệ thống, thường thực tế hơn là **bắt đầu với một MVP** thay vì nhắm ngay quy mô lớn nhất có thể. Với bài toán của chúng ta:

* Index khoảng **100 triệu trang web**.
* Năng lực phục vụ lên tới **1 triệu truy vấn mỗi giây**.
* Ngân sách lưu trữ khoảng **1 petabyte**.

Đi kèm là mục tiêu crawling: **crawl 100 triệu trang trong 7 ngày**. Bóc tách con số này:

1. Khoảng **14.3 triệu trang mỗi ngày**.
2. Tương đương **600.000 trang mỗi giờ**.
3. Hay khoảng **170 trang mỗi giây**.

Thoạt nghe có vẻ quá lớn, nhưng điểm mấu chốt là **crawling là workload song song hóa cao**. Thay vì phụ thuộc một crawler duy nhất, ta phân tán công việc cho nhiều worker. Ví dụ với **500 crawler worker**, mỗi worker chỉ cần tải khoảng **0.34 trang mỗi giây** — tức khoảng **1 trang mỗi 3 giây** — một tốc độ hoàn toàn hợp lý cho từng worker.

Tất nhiên, throughput thô không phải là tất cả: crawler còn phải **tôn trọng robots.txt, tuân thủ politeness policy và back off** khi website trở nên chậm hoặc bắt đầu giới hạn tốc độ. Thách thức không nằm ở việc crawl nhanh nhất có thể, mà ở việc **crawl hiệu quả và có trách nhiệm**.

---

### 🚦 Traffic, truy vấn & ngân sách độ trễ: thiết kế cho giờ cao điểm

Giả sử search engine có khoảng **10 triệu người dùng hoạt động**. Nếu mỗi người thực hiện khoảng **5 lượt tìm kiếm mỗi ngày**, ta có khoảng **50 triệu truy vấn mỗi ngày**.

Nhưng traffic **không phân bố đều trong ngày** — người dùng thường tìm kiếm vào giờ cao điểm. Vì vậy, thay vì thiết kế cho tải trung bình, ta thiết kế cho giai đoạn bận rộn nhất. Với MVP này, mục tiêu là **năng lực đỉnh khoảng 1.000 đến 2.000 truy vấn mỗi giây**, đồng thời để dư chỗ hấp thụ các đợt bùng nổ traffic đột ngột.

Một quan sát quan trọng khác là **read-write ratio (tỷ lệ đọc-ghi)**: search engine **đọc áp đảo** — khoảng **95% request là truy vấn tìm kiếm**, chỉ một phần nhỏ liên quan đến crawl trang mới hay cập nhật index. Điều này tác động mạnh đến kiến trúc: vì đọc chiếm ưu thế, ta **tối ưu cho truy vấn tìm kiếm độ trễ thấp**, còn cập nhật index được xử lý hiệu quả ở nền mà không ảnh hưởng trải nghiệm tìm kiếm.

Một khía cạnh then chốt khác của tải truy vấn là **ngân sách độ trễ** — một trong những lý do search engine cảm giác rất nhanh là **mọi giai đoạn của request đều có ngân sách hiệu năng nghiêm ngặt**. Mục tiêu tổng thể là **dưới 200 mili-giây end-to-end**, và ta chia ngân sách đó cho từng bước xử lý:

1. **Query parsing (phân tích truy vấn)** — hiểu từ khóa người dùng nhập; nhẹ nên ngân sách **dưới 5ms**.
2. **Index lookup (tra chỉ mục)** — tìm trong inverted index các document chứa từ khóa; cần hoàn tất **dưới 20ms**.
3. **Ranking và scoring** — xếp hạng, chấm điểm ứng viên theo độ liên quan; đây thường là bước tính toán nặng nhất nên dành ngân sách cao hơn, khoảng **50ms**.
4. **Formatting** — định dạng kết quả được chọn trước khi trả về; thao tác nhẹ, **dưới 10ms**.

Các ngân sách này cộng lại **ít hơn nhiều so với SLA 200ms** — và đó là chủ ý. Phần thời gian còn lại đóng vai trò **vùng đệm cho độ trễ mạng, phối hợp giữa các service và các chi phí phát sinh không tránh khỏi** trong hệ phân tán. **Bài học:** đạt mục tiêu độ trễ tổng thể **không phải là tối ưu một thành phần duy nhất**; mọi giai đoạn cần có ngân sách hiệu năng rõ ràng để cả hệ thống đều đặn mang lại trải nghiệm nhanh.

Những ước lượng traffic này sẽ dẫn dắt nhiều quyết định phía sau — từ caching, indexing đến phân vùng dữ liệu và hoạch định năng lực.

---

### 💾 Index & storage: nhiều cấu trúc chuyên dụng

Capacity planning giúp chọn đúng kiến trúc lưu trữ trước khi bắt tay thiết kế. Với MVP 100 triệu trang:

| Thành phần | Dung lượng ước tính |
|---|---|
| Raw HTML | ~10TB |
| Nội dung đã xử lý | ~3 đến 5TB |
| Inverted index | ~500 đến 800GB |
| Forward index | ~5TB |
| Metadata trang | ~100 đến 200GB |

Diễn giải:

* **Raw HTML:** 100 triệu trang × trung bình 100KB ≈ **10TB** chỉ để lưu nội dung gốc.
* **Nội dung đã xử lý:** trong quá trình indexing, ta trích xuất văn bản hữu ích, **tokenize (tách từ), chuẩn hóa** và loại bỏ thông tin không cần cho tìm kiếm — nội dung xử lý vì thế nhỏ hơn nhiều, chỉ khoảng **3 đến 5TB**.
* **Inverted index (chỉ mục nghịch đảo):** cấu trúc dữ liệu quan trọng nhất của search engine. Thay vì lưu document để tìm kiếm, nó **ánh xạ mỗi term (từ) tới danh sách các document chứa từ đó**. Nhờ tối ưu cao, nó chỉ chiếm khoảng **500 đến 800GB** mà vẫn cho phép tra cứu từ khóa cực nhanh.
* **Forward index (chỉ mục xuôi):** ánh xạ **document ID trở lại nội dung đã xử lý** của nó — hữu ích khi cần lấy thông tin document sau giai đoạn tìm kiếm; chiếm khoảng **5TB**.
* **Metadata:** title trang, hyperlink và thông tin ranking; so với dữ liệu document thì khá nhỏ, thêm khoảng **100 đến 200GB**.

Bài học quan trọng: **search engine lưu nhiều hơn là chỉ các trang web** — nó duy trì nhiều cấu trúc dữ liệu chuyên dụng, mỗi cấu trúc tối ưu cho một mục đích. Ước lượng sớm các yêu cầu lưu trữ giúp đảm bảo kiến trúc mở rộng được khi số trang được index tiếp tục tăng.

---

### 🧱 Điểm nghẽn & các quyết định do quy mô dẫn dắt

Trong system design, **điểm nghẽn thường định hình kiến trúc mạnh hơn cả luồng thuận lợi (happy path)**. Hệ thống của chúng ta có năm điểm nghẽn chính, mỗi điểm cần một cách xử lý riêng:

* **Tầng crawling** — bị giới hạn bởi băng thông khả dụng, rate limit của website và nguy cơ tải trùng nội dung. Cách xử lý: phân tán workload cho nhiều worker, **loại trùng**, lập lịch crawl thông minh và luôn tôn trọng robots.txt.
* **Indexing** — xử lý hàng triệu document ngốn nhiều bộ nhớ và disk I/O. Cách xử lý: thay vì một index khổng lồ, tạo **các index segment nhỏ hơn** và dùng **nén** để giảm dung lượng, tăng hiệu quả xử lý.
* **Tầng truy vấn** — khi lượng truy vấn tăng, độ trễ có thể leo nhanh, nhất là nếu mỗi request phải quét quá nhiều index. Cách xử lý: **shard (phân mảnh) inverted index** trên nhiều máy, **cache các truy vấn phổ biến** và giữ dữ liệu truy cập thường xuyên trong bộ nhớ.
* **Storage** — ngay ở quy mô MVP đã là hàng terabyte, và cuối cùng sẽ thành petabyte. Cách xử lý: **hệ thống lưu trữ phân tán** kết hợp **định dạng lưu trữ hiệu quả** và **tách dữ liệu nóng/lạnh**, giúp mở rộng mà không đánh đổi hiệu năng hay chi phí.
* **Freshness** — crawl lại mọi thứ với cùng tần suất sẽ lãng phí tài nguyên. Cách xử lý: **ưu tiên website thay đổi thường xuyên**, điều chỉnh khoảng cách crawl linh hoạt và **phát hiện thay đổi nội dung** để chỉ xử lý trang thực sự được cập nhật.

Từ các điểm nghẽn đó, những **quyết định kiến trúc đầu tiên** được hình thành — và không quyết định nào là tùy tiện, tất cả đều do quy mô dẫn dắt:

1. **Shard inverted index** — một máy không thể lưu hay tìm hiệu quả hàng tỷ document; phân vùng index trên nhiều server giúp phân tán cả dữ liệu lẫn truy vấn và mở rộng ngang khi hệ thống lớn lên.
2. **Duy trì cả forward và inverted index** — inverted index giúp nhanh chóng tìm document khớp truy vấn, forward index giúp lấy thông tin document cần cho ranking và hiển thị kết quả; kết hợp cả hai mang lại tìm kiếm nhanh và truy xuất document hiệu quả.
3. **Phân vùng công việc crawl theo domain hash** — đảm bảo request cho cùng một website luôn do cùng một crawler xử lý, giúp thực thi politeness policy dễ dàng và cân bằng workload.
4. **Replication (nhân bản) dữ liệu quan trọng** — trong hệ phân tán, node hỏng là điều tất yếu; replication giữ search engine luôn sẵn sàng ngay cả khi một số node trở nên không khả dụng.
5. **Cache cho các truy vấn phổ biến** — workload tìm kiếm thường **lệch (skewed)**: một số truy vấn được thực hiện lặp lại; phục vụ chúng từ cache giảm đáng kể độ trễ và giảm tải hạ tầng indexing.

**Bài học lớn: kiến trúc tốt theo sau yêu cầu một cách tự nhiên.** Khi quy mô tăng, ta **partition, replicate và cache** — không phải vì đó là những kỹ thuật phổ biến, mà vì chúng giải đúng những thách thức mà hệ tìm kiếm quy mô lớn đặt ra.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao chọn mục tiêu MVP thay vì thiết kế ngay cho quy mô internet đầy đủ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì thiết kế cho quy mô lớn nhất ngay từ ngày đầu thường không thực tế; MVP (100 triệu trang, ngân sách ~1PB) dễ bắt đầu và vẫn cho thấy rõ các bài toán cần giải.

Giải thích: Các con số MVP vẫn ảnh hưởng đến phân vùng dữ liệu, storage và indexing.

Tham chiếu: Mục Từ quy mô internet đến mục tiêu MVP.

</details>

**Câu 2:** Vì sao thiết kế cho giờ cao điểm thay vì tải trung bình?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì traffic không phân bố đều trong ngày; người dùng tập trung tìm kiếm vào giờ cao điểm nên mục tiêu là 1.000 đến 2.000 truy vấn mỗi giây ở đỉnh.

Giải thích: Cần thêm dư địa để hấp thụ các đợt bùng nổ đột ngột.

Tham chiếu: Mục Traffic, truy vấn & ngân sách độ trễ.

</details>

**Câu 3:** Vì sao search engine duy trì cả forward index lẫn inverted index?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Inverted index giúp tìm nhanh document khớp truy vấn; forward index giúp lấy nội dung document phục vụ ranking và hiển thị kết quả.

Giải thích: Hai cấu trúc phục vụ hai mục đích khác nhau trong cùng pipeline tìm kiếm.

Tham chiếu: Mục Index & storage.

</details>

**Câu 4:** Ngân sách độ trễ cho index lookup và ranking là bao nhiêu, và vì sao tổng các ngân sách nhỏ hơn SLA?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Index lookup dưới 20ms, ranking khoảng 50ms; tổng các ngân sách nhỏ hơn 200ms để dành vùng đệm cho độ trễ mạng và phối hợp giữa các service.

Giải thích: Đây là chủ ý thiết kế nhằm giữ trải nghiệm ổn định trong hệ phân tán.

Tham chiếu: Mục Traffic, truy vấn & ngân sách độ trễ.

</details>

**Câu 5:** Vì sao phân vùng công việc crawl theo domain hash?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để request cho cùng một website luôn do cùng một crawler xử lý, giúp thực thi politeness policy và cân bằng workload hiệu quả.

Giải thích: Đây là một trong các quyết định do quy mô dẫn dắt trong bài.

Tham chiếu: Mục Điểm nghẽn & các quyết định do quy mô dẫn dắt.

</details>

---

Vậy là chúng ta đã có bức tranh quy mô của search engine: 100 triệu trang cho MVP, ngân sách 1 petabyte, đỉnh 1.000–2.000 truy vấn mỗi giây và ngân sách độ trễ được chia nhỏ cho từng giai đoạn. *Đừng lo nếu các con số này trông nhiều — cứ đi từng bước, đây không phải cuộc đua.* Ở bài tiếp theo, chúng ta sẽ bước vào **high-level design**: crawler, indexer, query service và cách chúng giao tiếp với nhau. Hẹn gặp lại các bạn! 🚀
