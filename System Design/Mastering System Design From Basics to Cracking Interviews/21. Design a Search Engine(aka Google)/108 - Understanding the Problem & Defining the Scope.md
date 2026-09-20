# 🔎 Thiết kế search engine kiểu Google: Hiểu bài toán & xác định phạm vi

> Nguồn: `108-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49938831)

Chúng ta bắt đầu case study mới: thiết kế một **search engine (máy tìm kiếm) quy mô internet** kiểu Google, và tìm hiểu cách hàng tỷ trang web được **crawl (thu thập)**, **index (đánh chỉ mục)**, **rank (xếp hạng)** và trả về cho người dùng trong vài mili-giây. Như mọi case study, bước đầu tiên là làm rõ **chúng ta đang xây gì và xây cho ai** — vì mọi quyết định kiến trúc phía sau đều phục vụ những mục tiêu được chốt ở đây.

---

### 🎯 Bài toán: tìm kiếm ở quy mô internet

Chúng ta đang thiết kế một search engine có khả năng hoạt động ở **quy mô internet**: crawl hàng tỷ trang web, tổ chức thông tin đó thành một **searchable index (chỉ mục có thể tìm kiếm)** và trả lời các truy vấn dựa trên từ khóa **trong vài mili-giây**.

Nhưng chỉ tìm ra những trang khớp từ khóa là chưa đủ. Người dùng kỳ vọng **những kết quả liên quan nhất xuất hiện đầu tiên**, nên **ranking quan trọng ngang với việc tìm kiếm**. Đồng thời, web luôn thay đổi: trang mới ra đời, trang cũ được cập nhật hoặc gỡ bỏ — search engine phải **định kỳ làm mới index** để kết quả luôn chính xác và cập nhật.

Hệ thống phục vụ hai nhóm người dùng khác nhau:

1. **Người tìm kiếm web (nhóm chính)** — với họ, **tốc độ, độ liên quan và độ tin cậy** là cực kỳ quan trọng.
2. **Đội ngũ analytics nội bộ** — họ truy vấn dữ liệu index để hiểu hành vi tìm kiếm, phân tích xu hướng và liên tục cải thiện search engine.

```mermaid
flowchart LR
    W[Web] --> CR[Crawl]
    CR --> IX[Index]
    IX --> QK[Truy vấn]
    QK --> RK[Ranking]
    RK --> OUT[Kết quả trả về]
```

Xuyên suốt case study, trọng tâm của chúng ta là giải **bốn thách thức cốt lõi**: xử lý khối dữ liệu khổng lồ, trả kết quả nhanh, xếp hạng hiệu quả và giữ index luôn tươi mới khi web tiến hóa. Mọi thứ được thiết kế từ đây trở đi đều phục vụ một hoặc nhiều mục tiêu này.

---

### 🧩 Yêu cầu chức năng & phi chức năng

**Chức năng — hệ thống phải làm gì?** Đây là những năng lực hệ thống **phải** cung cấp để trở nên hữu ích:

1. **Web crawling** — trước khi người dùng có thể tìm kiếm, ta phải **khám phá và tải nội dung các trang web** từ khắp internet. Vì phải xử lý hàng tỷ trang, crawler phải hoạt động **hiệu quả và ở quy mô khổng lồ**.
2. **Indexing** — trang web thô không phù hợp để tìm kiếm nhanh. Ta **trích xuất nội dung quan trọng, chuẩn hóa nó và tổ chức thành cấu trúc tối ưu cho tra cứu tức thì**.
3. **Keyword search** — người dùng gửi truy vấn, hệ thống phải nhanh chóng **xác định các document (tài liệu) khớp với các từ khóa**, kể cả khi tập dữ liệu chứa hàng tỷ trang.
4. **Ranking** — chỉ trả về document khớp là chưa đủ; ta còn phải xác định kết quả nào **liên quan nhất** và trình bày kết quả tốt nhất lên đầu. Chất lượng ranking quyết định phần lớn trải nghiệm người dùng của một search engine.
5. **Re-indexing định kỳ** — vì web liên tục thay đổi, index không thể đứng yên: trang mới phải được phát hiện, nội dung lỗi thời phải được làm mới, và trang đã xóa cũng cần được loại bỏ dần khỏi index.

Năm chức năng này là nền móng của search engine — và khi đi qua phần thiết kế, các bạn sẽ thấy **mỗi thành phần kiến trúc đều tồn tại để hỗ trợ một hoặc nhiều năng lực trên**.

**Phi chức năng — phải làm tốt đến mức nào?** Biết hệ thống phải **làm gì** rồi, câu hỏi tiếp theo là nó phải **làm tốt đến đâu**. Những yêu cầu này ảnh hưởng nặng nề đến các quyết định kiến trúc:

* **Performance (hiệu năng)** — người dùng kỳ vọng kết quả tìm kiếm gần như tức thì, nên mục tiêu là **thời gian phản hồi dưới 200 mili-giây**. Điều đó nghĩa là mọi phần của đường đi request đều phải tối ưu cho độ trễ thấp.
* **Scalability (khả năng mở rộng)** — search engine phải index **hàng tỷ document** trong khi phục vụ khoảng **50.000 truy vấn mỗi giây**. Một máy đơn lẻ rõ ràng là không đủ, nên kiến trúc phải **mở rộng theo chiều ngang** khi cả dữ liệu lẫn traffic tiếp tục tăng.
* **Freshness (độ tươi mới)** — web thay đổi liên tục và người dùng mong tìm được thông tin mới nhất; pipeline indexing nên **cập nhật index trong vòng vài giờ** sau khi nội dung thay đổi, thay vì vài ngày.
* **Fault tolerance (chịu lỗi)** — ở quy mô này, lỗi là điều tất yếu, dù là server sập hay sự cố mạng tạm thời. Hệ thống phải tiếp tục hoạt động **không có điểm hỏng đơn lẻ (single point of failure)**, và các thành phần như crawler phải **tự động retry** những lần tải thất bại.
* **Storage efficiency (hiệu quả lưu trữ)** — lưu hàng tỷ trang web rất tốn kém, nên cần dùng hiệu quả các kỹ thuật như **nén (compression) và loại trùng (deduplication)** mà không đánh đổi hiệu năng tìm kiếm.

Khi thiết kế từng thành phần, chúng ta sẽ liên tục tự hỏi liệu nó có giúp đạt được độ trễ thấp, khả năng mở rộng lớn, kết quả tươi mới, sẵn sàng cao và lưu trữ hiệu quả hay không.

---

### ⚠️ Năm thách thức lớn của bài toán

Trước khi bắt tay vào kiến trúc, hãy nhìn vào những thách thức khiến bài toán này thú vị — mỗi quyết định thiết kế lớn đều là một nỗ lực giải quyết một trong số chúng:

1. **Crawling the web** — internet mênh mông, nhiều trang liên kết chéo hoặc thậm chí trùng lặp. Crawler phải khám phá nội dung hiệu quả, **tránh làm việc dư thừa** và **tôn trọng giới hạn tốc độ** của website.
2. **Indexing** — thu thập trang web chỉ là khởi đầu; ta cần tổ chức hàng tỷ document sao cho kết quả liên quan có thể được tìm thấy trong mili-giây, ngay cả khi index tiếp tục lớn lên.
3. **Relevance (độ liên quan)** — với một truy vấn, hàng trăm đến hàng nghìn trang có thể khớp; thách thức thật sự là **quyết định kết quả nào xứng đáng đứng đầu**, vì chất lượng ranking quyết định chất lượng trải nghiệm tìm kiếm.
4. **Scaling** — khi có thêm document được index và thêm người dùng tìm kiếm, hạ tầng vẫn phải trả kết quả nhanh, mà không trở nên quá đắt đỏ hay quá khó vận hành.
5. **Đánh đổi giữa freshness và cost (độ tươi mới và chi phí)** — crawl lại web thường xuyên giữ index cập nhật nhưng ngốn băng thông, compute và storage đáng kể; crawl ít hơn giảm chi phí nhưng tăng nguy cơ trả kết quả cũ. **Tìm điểm cân bằng chính là một quyết định kiến trúc then chốt.**

Đây chính là những bài toán mà chúng ta sẽ giải xuyên suốt case study; mỗi thành phần được giới thiệu sau này sẽ giúp giải một hoặc nhiều thách thức kể trên.

---

### 📦 Giả định & ràng buộc: ranh giới của thiết kế

Trong system design thực tế, giả định và ràng buộc giúp **thu hẹp không gian giải pháp** và giữ mọi người cùng nhìn về một hướng.

**Giả định:**

* Chỉ tập trung vào **website công khai**; nội dung cần đăng nhập hoặc trang nặng JavaScript phức tạp nằm ngoài phạm vi thiết kế.
* Crawler hoạt động **có trách nhiệm**: tôn trọng **robots.txt** và các **politeness policy (chính sách lịch sự)** tiêu chuẩn.
* Hỗ trợ **truy vấn từ khóa đơn giản**, chưa làm tìm kiếm ngôn ngữ tự nhiên nâng cao.
* Về ranking, bắt đầu với những mô hình liên quan kinh điển như **TF-IDF** và **PageRank** — đủ để hiểu kiến trúc cốt lõi.
* Mục tiêu **phản hồi dưới 200 mili-giây** cho các kết quả hàng đầu.

**Ràng buộc:**

* **Băng thông crawl có giới hạn** — không thể liên tục tải mọi trang trên internet; cần **lập lịch thông minh và loại trùng** để dùng tài nguyên hiệu quả.
* **Storage** — index hàng tỷ trang nghĩa là quản lý dữ liệu ở mức **petabyte**, nên cả lưu trữ lẫn indexing đều phải rất hiệu quả.
* **Indexing theo lô định kỳ (periodic batch-based indexing)** thay vì cập nhật thời gian thực — cách này **đơn giản hóa thiết kế** mà vẫn đủ tươi mới cho hầu hết nhu cầu.
* **Không triển khai cá nhân hóa hay hồ sơ người dùng** trong phiên bản này — mọi người tìm cùng một từ khóa sẽ nhận cùng một kết quả.
* Vì là hệ phân tán, **lỗi là điều được dự liệu trước**, không phải ngoại lệ; kiến trúc phải xử lý node hỏng, retry và mở rộng ngang một cách đáng tin cậy.

Những giả định và ràng buộc này định nghĩa phạm vi thiết kế và là bối cảnh cho mọi quyết định kiến trúc ở phần còn lại của case study.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bốn thách thức cốt lõi mà search engine phải giải là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xử lý khối dữ liệu khổng lồ, trả kết quả nhanh, xếp hạng hiệu quả và giữ index tươi mới.

Giải thích: Mọi thành phần được thiết kế sau này đều phục vụ một hoặc nhiều mục tiêu này.

Tham chiếu: Mục Bài toán: tìm kiếm ở quy mô internet.

</details>

**Câu 2:** Vì sao ranking quan trọng ngang với tìm kiếm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì với một truy vấn, hàng trăm đến hàng nghìn trang có thể khớp; quyết định kết quả nào đứng đầu quyết định chất lượng trải nghiệm tìm kiếm.

Giải thích: Chỉ tìm ra trang khớp từ khóa là chưa đủ.

Tham chiếu: Mục Năm thách thức lớn của bài toán.

</details>

**Câu 3:** Mục tiêu về độ trễ, quy mô truy vấn và độ tươi mới của index là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phản hồi dưới 200ms, phục vụ khoảng 50.000 truy vấn mỗi giây, cập nhật index trong vòng vài giờ sau khi nội dung thay đổi.

Giải thích: Đây là các yêu cầu phi chức năng định hình kiến trúc.

Tham chiếu: Mục Yêu cầu chức năng & phi chức năng.

</details>

**Câu 4:** Vì sao chấp nhận indexing theo lô định kỳ thay vì thời gian thực?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cách này đơn giản hóa thiết kế mà vẫn cho kết quả tươi mới hợp lý cho hầu hết nhu cầu.

Giải thích: Đây là một ràng buộc có chủ đích của phiên bản thiết kế này.

Tham chiếu: Mục Giả định & ràng buộc.

</details>

**Câu 5:** Đánh đổi giữa freshness và cost được thể hiện thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Crawl lại thường xuyên giữ index mới nhưng tốn băng thông, compute, storage; crawl ít hơn rẻ hơn nhưng dễ trả kết quả cũ.

Giải thích: Tìm điểm cân bằng là một quyết định kiến trúc then chốt.

Tham chiếu: Mục Năm thách thức lớn của bài toán.

</details>

---

Vậy là chúng ta đã chốt bài toán, yêu cầu, thách thức và phạm vi cho search engine. Ở bài tiếp theo, mình và các bạn sẽ **ước lượng quy mô** — hàng trăm tỷ trang, hàng petabyte dữ liệu và các mục tiêu cho phiên bản MVP — rồi nhận diện những điểm nghẽn quan trọng nhất. Hẹn gặp lại các bạn! 🚀
