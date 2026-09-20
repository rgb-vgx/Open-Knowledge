# 📊 Ước lượng quy mô dịch vụ lưu trữ đám mây: 5 tỷ file & 10 petabyte

> Nguồn: `099-Estimating-Scale-Identifying-Bottlenecks.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49872213)

Sang bước 2 của case study, chúng ta sẽ **ước lượng quy mô** của dịch vụ lưu trữ đám mây. Trước khi chọn database, hệ thống lưu trữ hay mẫu giao tiếp, mình muốn các bạn cùng nhìn vào những con số — không cần chính xác tuyệt đối, nhưng đủ để hiểu **bậc độ lớn** mà ta đang thiết kế.

---

### 📊 Ước lượng quy mô: từ người dùng đến petabyte

Giả sử nền tảng có khoảng **10 triệu người dùng hoạt động**. Nếu mỗi người lưu trung bình **500 file**, hệ thống phải quản lý khoảng **5 tỷ file**. Dù mỗi file khá nhỏ, với kích thước trung bình **2 MB**, tổng dung lượng rơi vào khoảng **10 petabytes**.

| Hạng mục | Ước lượng |
|---|---|
| Người dùng hoạt động | khoảng **10 triệu** |
| File mỗi người dùng | trung bình **500** |
| Tổng số file | khoảng **5 tỷ** |
| Kích thước file trung bình | **2 MB** |
| Tổng dung lượng lưu trữ | khoảng **10 petabytes** |
| Upload lúc cao điểm | khoảng **2.000 file mỗi giây** |
| Sự kiện đồng bộ | khoảng **10.000 sự kiện mỗi giây** |

Storage chỉ là một phần của bức tranh. Vì người dùng truy cập file từ nhiều thiết bị, nền tảng còn phải xử lý khoảng **10.000 sự kiện đồng bộ mỗi giây** khi các thay đổi lan truyền giữa các client.

Những ước lượng này ảnh hưởng ngay đến lựa chọn kiến trúc:

* **Lưu hàng petabyte dữ liệu khiến object storage trở thành lựa chọn tự nhiên** — vì nó được thiết kế cho độ bền cao và lưu trữ tiết kiệm chi phí ở quy mô khổng lồ.
* **Lưu hàng tỷ bản ghi file đồng nghĩa một metadata database duy nhất là không đủ.** Ta cần một **metadata service phân tán**, có thể scale theo chiều ngang khi số file tiếp tục tăng.
* **Traffic đồng bộ cao hơn hẳn traffic upload.** Điều đó nói rằng **sync và notification pipeline** cũng phải scale theo chiều ngang để không trở thành điểm nghẽn.

Đó chính là lý do ước lượng dung lượng là bước quan trọng trong system design: thay vì chọn công nghệ trước, ta ước lượng quy mô, hiểu workload, rồi để những con số dẫn đường cho kiến trúc.

---

### ✍️ Đường ghi: upload, sync và versioning

Hãy nhìn vào các mẫu truy cập (access pattern). Mỗi loại thao tác đặt lên hệ thống một kiểu tải khác nhau, và nhận diện chúng giúp ta tối ưu đúng chỗ.

* **Upload file vốn write-heavy** vì ta đang truyền một lượng dữ liệu lớn. Vì file có thể nặng vài gigabyte, upload cần diễn ra theo **chunk (khối nhỏ)** thay vì một request duy nhất.
* Mỗi lần upload còn sinh ra **metadata** phải được ghi nhận và theo dõi.
* **Đồng bộ cộng thêm hoạt động ghi**: mỗi khi file thay đổi, hệ thống phải ghi nhận cập nhật đó để các thiết bị khác bắt kịp.
* **Versioning khiến một hành động của người dùng có thể tạo ra nhiều lượt ghi**, vì hệ thống phải lưu lại các phiên bản trước của file.

---

### 📖 Đường đọc: metadata, duyệt thư mục & link chia sẻ

Ở phía đọc, người dùng thường xuyên tải file xuống từ nhiều thiết bị, duyệt thư mục và điều hướng nội dung. Những thao tác này tạo ra **lượng lớn metadata reads** — ngay cả khi nội dung file thật không hề được tải về.

**Shared links** còn tạo thêm traffic đọc, vì preview và thông tin file cần được truy xuất rất nhanh.

Bài học chính: ta cần tối ưu **cả hai đường**, nhưng vì lý do khác nhau.

* **Đường ghi** phải xử lý hiệu quả upload theo chunk lớn, theo dõi phiên upload (session tracking) và quản lý phiên bản.
* **Đường đọc** phải cho truy cập metadata và thông tin file nhanh, độ trễ thấp.

Đây chính là lúc những kỹ thuật như **indexing hiệu quả** và **caching** trở nên đặc biệt giá trị. Nhận diện access pattern sớm giúp ta tránh thiết kế một giải pháp "một cỡ cho tất cả", để thay vào đó tối ưu từng workload riêng và xây hệ thống chạy tốt dưới cách dùng thực tế.

---

### ⚠️ Điểm nghẽn & thách thức

Kiến trúc tốt thường được thiết kế để **loại bỏ điểm nghẽn tương lai**, chứ không chỉ giải bài toán hôm nay. Với dịch vụ lưu trữ đám mây, có năm khu vực dễ trở thành điểm nghẽn:

1. **Metadata database** — mọi thao tác upload, download, liệt kê thư mục, kiểm tra quyền và tìm kiếm đều phụ thuộc metadata. Nếu tất cả dồn vào một database duy nhất, nó nhanh chóng thành **hotspot** khi người dùng và số file tăng lên.
2. **Upload file lớn** — tải file nhiều gigabyte tốn thời gian, và mất kết nối mạng là điều khó tránh. Không có cơ chế upload chịu lỗi, người dùng sẽ phải bắt đầu lại từ đầu sau mỗi lần thất bại — trải nghiệm rất tệ.
3. **Đồng bộ thời gian thực** — cùng một file có thể được cập nhật từ nhiều thiết bị trong thời gian ngắn, khiến việc giữ mọi client đồng bộ trở nên rất khó. Không phối hợp cẩn thận, thiết bị có thể hiển thị thông tin cũ hoặc gặp **race condition (tranh chấp đồng thời)** khi cập nhật song song.
4. **Kiểm tra quyền (permission checks)** — mỗi lần truy cập file hay thư mục, hệ thống phải xác minh thao tác có được phép không. Khi quan hệ chia sẻ trở nên phức tạp, các bước kiểm tra ủy quyền này có thể gây ra độ trễ đáng chú ý nếu không được thiết kế hiệu quả.
5. **Link công khai và link chia sẻ** — tạo ra một loại traffic khác: nhiều request đến từ người **chưa xác thực (unauthenticated)** nhưng vẫn kỳ vọng truy cập nhanh. Hệ thống phải phục vụ nội dung này hiệu quả mà không đánh đổi bảo mật hay kiểm soát truy cập.

Những điểm nghẽn này tự nhiên chỉ ra các quyết định kiến trúc:

| Thách thức | Hướng giải quyết |
|---|---|
| Metadata database thành hotspot | Metadata service được phân vùng (partitioned) |
| Upload file lớn, mạng chập chờn | Chunked & resumable upload |
| Đồng bộ thời gian thực khó giữ nhất quán | Cơ chế publish-subscribe |
| Kiểm tra quyền và phục vụ nội dung chia sẻ | Caching |

Và đây đúng là cách kiến trúc sư suy nghĩ trong thực tế: thay vì thêm công nghệ trước, họ xác định nơi hệ thống dễ gặp khó khăn nhất, rồi để chính những thách thức đó dẫn dắt quyết định thiết kế. Như vậy, chúng ta khép lại bước 2 của case study.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Quy mô dữ liệu của hệ thống được ước lượng như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 10 triệu người dùng × 500 file ≈ 5 tỷ file; với trung bình 2 MB mỗi file → khoảng 10 petabytes.

Giải thích: Object storage là lựa chọn tự nhiên cho quy mô này nhờ độ bền và chi phí.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 2:** Vì sao nói traffic đồng bộ đáng lo hơn traffic upload?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì sync sinh khoảng 10.000 sự kiện mỗi giây, cao hơn hẳn mức 2.000 upload mỗi giây lúc cao điểm.

Giải thích: Sync và notification pipeline cũng phải scale ngang để không thành điểm nghẽn.

Tham chiếu: Mục Ước lượng quy mô.

</details>

**Câu 3:** Vì sao versioning làm tăng hoạt động ghi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì một hành động của người dùng có thể tạo ra nhiều lượt ghi khi hệ thống lưu lại các phiên bản trước của file.

Giải thích: Điều này khiến đường ghi cần được thiết kế kỹ.

Tham chiếu: Mục Đường ghi.

</details>

**Câu 4:** Vì sao metadata database dễ trở thành điểm nghẽn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mọi thao tác upload, download, liệt kê thư mục, kiểm tra quyền và tìm kiếm đều phụ thuộc metadata — dồn vào một database sẽ thành hotspot.

Giải thích: Giải pháp là metadata service được phân vùng, scale ngang.

Tham chiếu: Mục Điểm nghẽn & thách thức.

</details>

**Câu 5:** Link chia sẻ công khai đặt ra thách thức gì đặc biệt?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhiều request đến từ người chưa xác thực nhưng vẫn cần được phục vụ nhanh, không đánh đổi bảo mật hay kiểm soát truy cập.

Giải thích: Caching là hướng giải quyết cho loại traffic này.

Tham chiếu: Mục Điểm nghẽn & thách thức.

</details>

---

Chúng ta đã có bức tranh quy mô và những điểm nghẽn cần xử lý. Ở bài tiếp theo, mình và các bạn sẽ bước vào **high-level design**: chia hệ thống thành các service chuyên trách, thiết kế API, chọn mẫu giao tiếp, rồi đi sâu vào chunking, versioning, lưu trữ và caching. Hẹn gặp lại các bạn! 🚀
