# 💻 Cài đặt Visual Studio Code: Bộ vũ khí gọn nhẹ cho Go

> Nguồn: `004-Installing-Visual-Studio-Code.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32032372)

Go đã cài xong, giờ là lúc cài một thứ giúp việc viết Go nhẹ nhàng hơn rất nhiều: một **IDE (môi trường phát triển tích hợp)**. Bạn hoàn toàn có thể viết code Go bằng bất kỳ text editor nào trong terminal, nhưng có IDE vẫn dễ chịu hơn hẳn — và biết đâu bạn đã có sẵn một cái rồi.

### 📥 Tải và cài Visual Studio Code

Mình chọn **Visual Studio Code** của Microsoft vì nó **miễn phí**, chạy được trên Windows, Linux và macOS.

1. Truy cập **code.visualstudio.com/download**.
2. Chọn đúng bản cho máy bạn:
   * macOS chip Intel → bản Intel.
   * macOS Apple Silicon → bản Apple Silicon.
   * Hoặc tải bản **universal**, chạy được trên cả hai loại chip Mac.
3. Chạy trình cài đặt — quá trình rất đơn giản.

### 🧩 Cài extension Go chính thức

Mở VS Code lên, nhìn dải icon bên trái và chọn mục **Extensions**:

1. Gõ `go` vào ô tìm kiếm ở trên cùng.
2. Kết quả đầu tiên là extension **Go** chính thức. Các bạn sẽ thấy hai phiên bản: **Go** và **Go Nightly** — bản Nightly là bản thử nghiệm, nên hãy dùng bản **Go tiêu chuẩn/chính thức**.
3. Bấm **Install** và đợi cài xong.
4. Mở **Command Palette** bằng `Shift + Command + P` (macOS) hoặc `Shift + Control + P` (Windows/Linux).
5. Tìm và chọn lệnh `Go: Install/Update Tools`. (Với mình nó hiện sẵn vì mới dùng, còn bạn cứ gõ `go:` là nó sẽ ra.)
6. Ở cửa sổ hiện ra, tích vào ô chọn ở trên cùng để chọn **tất cả** các mục cần cài, rồi bấm **OK**.
7. Một cửa sổ tiến trình hiện ở dưới cùng; quá trình mất vài phút, sau đó bạn đã sẵn sàng.

### 🎨 Thêm extension cho Go templates

Còn một extension nữa để làm việc với **Go templates** dễ hơn:

* Quay lại mục Extensions, xóa chữ `go` ở ô tìm kiếm, gõ từ khóa `go template` (mình nhấn mạnh: chữ "go template" viết liền, không có khoảng trắng chen giữa theo kiểu từng chữ rời).
* Cài extension **Go Template Syntax** này để có **syntax highlighting (tô màu cú pháp)** khi làm việc với Go templates.

Đó là tất cả những gì bạn cần. Có rất nhiều extension Go khác và các bạn cứ thoải mái khám phá — nhưng với mình, chỉ cần từng này là đủ. Đi tiếp thôi! 🚀

## Nguồn tham khảo

- [Visual Studio Code — Download](https://code.visualstudio.com/download)
