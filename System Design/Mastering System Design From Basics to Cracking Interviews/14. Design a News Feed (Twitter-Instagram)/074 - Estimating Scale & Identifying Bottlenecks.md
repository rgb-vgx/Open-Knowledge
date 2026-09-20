# 📊 Ước lượng quy mô News Feed: Những con số định hình mọi quyết định kiến trúc

> Nguồn: `074-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49775843)

Trước khi vẽ bất kỳ sơ đồ kiến trúc nào, chúng ta cần trả lời một câu hỏi nền tảng: **hệ thống này sẽ phải phục vụ khối lượng lớn đến mức nào?** Trong system design, kiến trúc của các bạn chỉ tốt ngang với những giả định đằng sau nó — và bước **ước lượng quy mô** chính là cách chúng ta biến những giả định đó thành con số, đồng thời phát hiện sớm những **điểm nghẽn (bottlenecks)** thật sự.

---

### 📈 Ước lượng quy mô: chúng ta đang thiết kế cho khối lượng nào?

Hãy cùng đặt ra các giả định cho nền tảng mạng xã hội của chúng ta:

* Khoảng **500 triệu người dùng đã đăng ký**, trong đó **200 triệu người dùng hoạt động hằng ngày (daily active users)**.
* Mỗi ngày, người dùng tạo ra khoảng **1 tỷ tweet**, **hàng trăm triệu media upload** (ảnh, video) và **hàng tỷ sự kiện tương tác** như like, reply, retweet.

Đó là một khối lượng hoạt động liên tục khổng lồ. Giờ hãy nhìn sang phía đọc: nếu mỗi người dùng hoạt động mở feed khoảng **10 lần mỗi ngày**, chúng ta đang nói đến **hơn 2 tỷ feed request mỗi ngày**.

| Hạng mục | Quy mô mỗi ngày |
|---|---|
| Người dùng đăng ký | ~500 triệu |
| Người dùng hoạt động hằng ngày | ~200 triệu |
| Tweet mới | ~1 tỷ |
| Media upload | Hàng trăm triệu file |
| Sự kiện tương tác | Hàng tỷ |
| Feed request | Hơn 2 tỷ |
| Dữ liệu media mới | Hàng trăm TB |

Điểm mấu chốt của những con số này **không phải là ghi nhớ chúng**, mà là nhận ra tư duy kỹ thuật mà chúng tạo ra: đây là một hệ thống **read-heavy (đọc nhiều hơn ghi)** ở quy mô cực lớn, với yêu cầu lưu trữ và băng thông khổng lồ. Những đặc điểm đó sẽ ảnh hưởng trực tiếp đến mọi quyết định kiến trúc trong phần còn lại của thiết kế.

---

### 🔍 Read-heavy — tín hiệu quan trọng nhất từ con số

Hãy chú ý đến mô hình lưu lượng: **lượt đọc nhiều hơn hẳn lượt ghi**. Phần lớn người dùng dành nhiều thời gian tiêu thụ nội dung hơn là tạo ra nội dung. Quan sát này cực kỳ quan trọng vì nó cho chúng ta biết nên tối ưu ở đâu.

Nếu gần **80% khối lượng công việc** là đọc timeline, thì **giảm độ trễ khi đọc trở thành ưu tiên kiến trúc cao nhất**. Đây chính là lý do các hệ thống news feed đầu tư rất mạnh vào **caching (bộ đệm)** và tối ưu phía đọc.

Media cũng mang đến một thách thức mở rộng riêng: hàng trăm triệu ảnh và video upload mỗi ngày tương đương **hàng trăm terabyte dữ liệu mới**. Lưu trực tiếp những file này trong database truyền thống là không thực tế. Thay vào đó, chúng ta cần:

1. Một **upload API chuyên dụng** để nhận file.
2. **Object storage (lưu trữ đối tượng)** có khả năng mở rộng cho chính file media.
3. Cơ chế **liên kết hiệu quả giữa tweet và media** đi kèm.
4. Một **CDN (mạng phân phối nội dung)** để giao nội dung nhanh, giúp người dùng nhận ảnh và video nhanh hơn.

---

### ⚠️ Điểm nghẽn thứ nhất: timeline fan-out và bài toán hot users

Khi đã có con số, bước tiếp theo là xác định nơi hệ thống dễ gặp khó khăn nhất. **Điểm nghẽn đầu tiên là timeline fan-out**: mỗi khi ai đó đăng tweet, nội dung không nằm yên một chỗ — nó cần đến với mọi người theo dõi họ.

Với người dùng trung bình, việc này khá đơn giản. Nhưng với người có **hàng triệu follower**, một bài đăng đơn lẻ lập tức trở thành bài toán phân phối khổng lồ. Điều này đưa chúng ta trở lại hai mô hình fan-out đã bàn ở bài trước:

* **Fan-out on write:** pre-compute timeline của follower ngay khi tweet được tạo. Đọc về sau cực nhanh vì việc đã xong — nhưng đăng bài trở nên đắt, nhất là với tài khoản được theo dõi nhiều.
* **Fan-out on read:** trì hoãn công việc đến khi người dùng thật sự mở timeline. Đăng bài nhẹ đi, nhưng mỗi lượt đọc phải gom và lắp ghép nội dung từ nhiều người khác nhau, làm tăng độ trễ đọc.

Trường hợp đặc biệt khó là **hot users** — người nổi tiếng, influencer hay thương hiệu lớn với hàng triệu follower. Bài đăng của họ có thể tạo ra những **đợt bùng nổ hoạt động đột ngột gọi là write-storm (bão ghi)**, khiến đây trở thành một trong những bài toán khả năng mở rộng khó nhất của hệ thống mạng xã hội.

---

### 🔁 Điểm nghẽn thứ hai: read và write amplification

Trong hệ phân tán, **một hành động của người dùng hiếm khi tương ứng với chỉ một thao tác backend**. Đây là hiện tượng **amplification (khuếch đại)**:

* Đăng một tweet có thể kích hoạt thao tác lưu trữ, cập nhật timeline, gửi notification và cập nhật metadata.
* Like, reply, retweet không chỉ cập nhật một bản ghi — chúng có thể ảnh hưởng đến bộ đếm tương tác và cách nội dung được trình bày trên toàn nền tảng.
* Media upload thậm chí còn thêm việc: vừa lưu file, vừa quản lý metadata.

Phía đọc cũng phức tạp không kém. Mở timeline đòi hỏi hệ thống thu thập bài từ nhiều người được theo dõi, sắp xếp đúng thứ tự rồi chuẩn bị feed hoàn chỉnh. Ngay cả xem một tweet cũng có thể cần thêm request cho media, reply, like, retweet. Khi người dùng cuộn feed, hệ thống còn phải **pagination (phân trang)**, tra cache và **lazy loading (tải dần)** để giữ trải nghiệm mượt mà.

Bài học quan trọng nhất: **hành động của người dùng trông có vẻ đơn giản một cách đánh lừa**. Một cú nhấp nút có thể kích hoạt hàng chục lượt đọc và ghi trên nhiều service. Nhận diện được sự khuếch đại này là điều thiết yếu, vì thiết kế hệ phân tán thường không nằm ở việc xử lý từng request đơn lẻ, mà ở việc **quản lý chuỗi phản ứng mà mỗi request tạo ra**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao ước lượng quy mô là bước quan trọng trước khi thiết kế kiến trúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì kiến trúc chỉ tốt ngang với các giả định đằng sau nó; ước lượng giúp nhận diện điểm nghẽn thật sự.

Giải thích: Con số không cần chính xác tuyệt đối, nhưng phải đúng về bậc độ lớn.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 2:** Với giả định trong bài, mỗi ngày hệ thống có bao nhiêu feed request?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hơn 2 tỷ feed request mỗi ngày (200 triệu người dùng hoạt động, mỗi người mở feed khoảng 10 lần).

Giải thích: Đây là lý do phía đọc cần được tối ưu mạnh.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 3:** Vì sao hệ thống news feed được gọi là read-heavy và điều đó dẫn đến ưu tiên gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì gần 80% khối lượng là đọc timeline; ưu tiên cao nhất là giảm độ trễ đọc, đầu tư vào caching và tối ưu phía đọc.

Giải thích: Người dùng dành nhiều thời gian tiêu thụ nội dung hơn là tạo nội dung.

Tham chiếu: Mục Read-heavy.

</details>

**Câu 4:** Vì sao media không nên lưu trực tiếp trong database truyền thống?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hàng trăm triệu ảnh, video mỗi ngày tạo ra hàng trăm TB dữ liệu — cần upload API chuyên dụng, object storage và CDN.

Giải thích: File media lớn hơn nhiều so với dữ liệu có cấu trúc.

Tham chiếu: Mục Read-heavy.

</details>

**Câu 5:** Write-storm là gì và nó gắn với trường hợp nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là đợt bùng nổ hoạt động ghi đột ngột khi hot users như người nổi tiếng, influencer, thương hiệu lớn đăng bài cho hàng triệu follower.

Giải thích: Đây là một trong những bài toán khả năng mở rộng khó nhất của mạng xã hội.

Tham chiếu: Mục Điểm nghẽn thứ nhất.

</details>

---

Vậy là chúng ta đã có bức tranh định lượng: một hệ thống read-heavy, hơn 2 tỷ lượt đọc feed mỗi ngày, hàng trăm TB media, cùng hai điểm nghẽn lớn là timeline fan-out và sự khuếch đại đọc/ghi. Ở bài tiếp theo, chúng ta sẽ bắt tay vào **high-level design** — chia hệ thống thành các service chuyên trách, định nghĩa API và chọn chiến lược sinh timeline. Hẹn gặp lại các bạn! 🚀
