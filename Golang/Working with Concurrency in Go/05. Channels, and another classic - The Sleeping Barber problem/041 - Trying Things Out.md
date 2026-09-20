# 🧪 Trying Things Out: Frank quá tải và màn "tăng quân" ngoạn mục

> Nguồn: `041-Trying-things-out.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32164038)

Đây rồi, giây phút quan trọng nhất: chạy chương trình và xem thành quả. Chúng ta có một barber, mười ghế trong phòng chờ, và khách đến khá đều tay. Liệu Frank có phải ở lại sau giờ đóng cửa? Cùng xem kết quả, rồi thử vài kịch bản để tiệm chạy hiệu quả hơn nhé.

### 🏃 Kịch bản 1: một barber, mười ghế — Frank quá tải

Chạy `go run .`, các bạn sẽ thấy rất nhiều khách bị **từ chối** — họ ra về vì phòng chờ hết ghế. Và đây là anh Frank tội nghiệp: sau khi tiệm đóng cửa, anh vẫn phải bắt đầu phục vụ từ **Client 11** trở đi, lần lượt cắt cho hết những người còn đang chờ trong phòng.

*Hy vọng Frank được trả lương theo đầu tóc chứ không phải theo giờ — hoặc là cả hai. Anh chàng phải ở lại muộn thật là muộn.*

### 📉 Kịch bản 2: thu nhỏ phòng chờ còn 2 ghế

Muốn tiệm hiệu quả hơn và bớt người phải ra về? Chỉ cần sửa `seatingCapacity` ở đầu `main.go` từ 10 xuống 2, không thay đổi gì khác. Chạy lại:

* Khách vẫn ra về khá nhiều vì phòng chờ quá nhỏ.
* Nhưng Frank **không phải ở lại lâu như trước** — lượng khách "tồn" sau giờ đóng cửa giảm hẳn, anh chỉ còn phải làm thêm vài mái tóc nữa là xong.

### 💪 Kịch bản 3: sáu barber "tăng quân"

Đưa `seatingCapacity` về lại 10, rồi thêm người. *Frank thì bảo là ai cũng có thể tên Frank, nhưng rồi anh em được đặt tên hẳn hoi:* **Girard, Milton, Susan, Kelly và Pat** — tổng cộng sáu barber. Chạy lại và so sánh:

* **Gần như không còn khách phải ra về** — chỉ lác đác vài dòng đỏ.
* Mọi người hoàn thành nhanh hơn nhiều, và dòng cuối cùng vang lên: **tiệm đã đóng cửa, tất cả mọi người đã về nhà.**

Các bạn có thể tự nghịch thêm: phòng chờ to hơn hoặc nhỏ hơn, giảm `arrivalRate` để khách đến thưa hơn, thêm bớt barber... Tất cả chỉ nằm trong vài con số ở đầu chương trình.

| Kịch bản | Cấu hình | Kết quả quan sát |
|---|---|---|
| 1 | 1 barber, 10 ghế | Rất nhiều khách ra về, Frank phải làm thêm rất lâu sau giờ đóng cửa |
| 2 | 1 barber, 2 ghế | Vẫn nhiều khách ra về, nhưng Frank đỡ phải làm thêm hơn hẳn |
| 3 | 6 barber, 10 ghế | Gần như không còn khách ra về, mọi người xong việc và về nhà sớm |

### 🏁 Bài học cuối: chỉ cần buffered channel và triết lý của Go

Trước khi kết thúc, hãy tạo thói quen quan trọng: chạy thêm

```bash
go run -race .
```

để kiểm tra xem chương trình có race condition không. Kết quả: **không có cảnh báo nào** — mọi thứ diễn ra đúng kế hoạch.

Nhìn lại nào: chúng ta vừa giải một bài toán khá phức tạp, và công cụ duy nhất là **buffered channel**. Không có "thuế" mới nào cả, không `WaitGroup`, mọi thứ chạy nhanh gọn. Đây là ví dụ rõ ràng nhất cho triết lý của Go: **"Don't communicate by sharing memory. Share memory by communicating."** — đừng giao tiếp bằng cách chia sẻ bộ nhớ, hãy chia sẻ bộ nhớ bằng cách giao tiếp.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao nhiều khách phải ra về trong kịch bản đầu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì phòng chờ hết ghế — buffer của `clientChan` đã đầy nên `default` trong `select` khiến khách rời đi.

Giải thích: Đây là luật của bài toán: hết ghế thì khách bỏ đi.

Tham chiếu: Mục Kịch bản 1.

</details>

**Câu 2:** Vì sao Frank phải ở lại sau giờ đóng cửa?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì luật quy định barber phải phục vụ hết những khách đang chờ, kể cả sau khi tiệm đã đóng.

Giải thích: `CloseShopForDay` chỉ ngừng nhận khách mới chứ không đuổi khách đang chờ.

Tham chiếu: Mục Kịch bản 1.

</details>

**Câu 3:** Thu nhỏ phòng chờ xuống 2 ghế có tác dụng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Frank đỡ phải làm thêm sau giờ đóng cửa hơn, dù vẫn có nhiều khách ra về.

Giải thích: Phòng chờ nhỏ khiến ít khách tồn đọng lại vào cuối ngày.

Tham chiếu: Mục Kịch bản 2.

</details>

**Câu 4:** Thêm barber giúp ích như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tiệm phục vụ được nhiều khách hơn, gần như không còn khách phải ra về, và mọi người xong việc sớm hơn.

Giải thích: Với sáu barber, chỉ còn lác đác vài khách phải rời đi.

Tham chiếu: Mục Kịch bản 3.

</details>

**Câu 5:** Lệnh nào dùng để kiểm tra race condition cho chương trình?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `go run -race .`

Giải thích: Chạy kèm cờ `-race` để bật data race detector — kết quả ở đây không có cảnh báo nào.

Tham chiếu: Mục Bài học cuối.

</details>

Vậy là chúng ta đã hoàn thành Sleeping Barber — bài toán phức tạp nhưng chỉ cần buffered channel là đủ. Section tiếp theo sẽ mang đến một bài toán **thực tế hơn**, kiểu bài mà các bạn có thể gặp ngoài đời khi làm việc với concurrency, và chúng ta sẽ khép lại khóa học bằng chính nó. Hẹn gặp các bạn ở đó! 🚀

## Nguồn tham khảo

- [Go — Data Race Detector](https://go.dev/doc/articles/race_detector)
