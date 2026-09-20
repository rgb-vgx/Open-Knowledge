# ⚙️ Makefile: build, run, stop — mỗi việc một lệnh `make`

> Nguồn: `046-Setting-up-a-Makefile.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32191588)

Bài này chúng ta dựng **Makefile** để cuộc sống nhẹ nhàng hơn: thay vì gõ một chuỗi lệnh dài mỗi lần chạy ứng dụng, mình chỉ gõ `make start`. Nghe hấp dẫn rồi đúng không? Bắt đầu thôi.

### 📦 Tải Makefile đúng bản, đặt đúng chỗ

Vào **course resources** của bài này, các bạn sẽ thấy hai file:

* `Makefile.zip` — dành cho **Mac hoặc Linux**.
* `Makefile-windows.zip` — dành cho **Windows**.

Tải bản phù hợp với hệ điều hành của bạn, giải nén rồi đặt ở **root project**. Lưu ý quan trọng: file phải tên là **`Makefile`** — chữ **M viết hoa** và **không có phần mở rộng**.

### 🐞 Sửa hai lỗi typ từ bài trước

Trước khi xem Makefile, mình phải "thú tội": bài trước mình có hai lỗi typ, dù màu đỏ chót trong file `main.go` đáng lẽ phải nhắc mình... nhưng có vẻ hôm đó mình không được minh mẫn cho lắm.

1. Trong hàm `DB()` ở dòng 34, mình **quên `return con`**.
2. Trong vòng lặp `for`, mình có biến `count` nhưng **quên `count++`** — nên nó cứ thử mãi không chịu dừng.

Cả hai đều đã được sửa **trước khi mình upload source code** cho bài trước, các bạn yên tâm.

### 🧩 Bên trong Makefile có gì?

File này rất đơn giản. Ở đầu file có **ba biến** và chúng được "nội suy" (substitute) ở bên dưới. Ví dụ biến `binary_name` được đặt là `myapp`, và mỗi mục bên dưới là một **lệnh bạn gõ sau từ khóa `make`**:

* `make build` — build binary, trong đó `CGO_ENABLED=0` là thói quen tốt khi build.
* `make run` — chạy ứng dụng.
* `make clean` — xóa binary và chạy `go clean`.
* `make start` — **alias của `run`** cho tiện.
* `make stop` — dừng mọi thứ.
* `make restart` — chạy `stop` rồi `start`.
* `make test` — chạy test (sẽ dùng tới sau này).

**Một điều cực kỳ quan trọng:** các dòng lệnh trong Makefile **phải thụt lề bằng TAB**, không được dùng dấu cách. Nếu tải về mà các tab bị chuyển thành spaces (chuyện này từng xảy ra rồi, mình cũng không hiểu vì sao), chỉ cần đổi hết lại thành tab là xong.

### 🪟 Bản Windows có gì khác?

Bản Windows gần như giống hệt, chỉ khác vài lệnh — ví dụ dòng 12. Vì Windows không "hiểu" màu sắc trong editor nên các bạn sẽ không thấy màu, đừng hoảng nhé.

* Bản này đã có sẵn biến **`DSN`** — chuỗi kết nối tới Postgres, thứ chúng ta đang cần nhất lúc này.
* Tên binary được thêm đuôi **`.exe`** để Windows biết đó là file chạy được.

### ✅ Chạy thử `make start`

Mình mở terminal ngay tại root project nơi có Makefile, kiểm tra file nằm đúng chỗ rồi gõ:

```bash
make start
```

Kết quả: ứng dụng được build và **kết nối tới database thành công**. Rồi nó **tự kết thúc** — vì trong `main.go` hiện tại chúng ta chỉ kết nối, ping database rồi... hết việc. Nhưng ít nhất mình biết chắc kết nối database không gặp trở ngại nào.

Bài sau chúng ta bắt đầu với **sessions**. Hẹn gặp lại các bạn! 🚀
