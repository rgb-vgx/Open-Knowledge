# 📄 Tự sinh PDF manual: gofpdf, importer và chiêu đính kèm file với tên tùy biến

> Nguồn: `076-Generating-a-manual.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252804)

Hóa đơn đã bay đi, giờ tới phần thú vị hơn: **sinh user manual (sách hướng dẫn) dạng PDF**. Mình sẽ mở một PDF có sẵn, viết thêm thông tin lên đó rồi gửi cho người dùng — tất nhiên là trong một goroutine riêng, để nó chạy song song với việc sinh hóa đơn. Nghe có vẻ phức tạp hơn bài trước một chút, nhưng cứ đi theo mình, không khó đâu.

### 📦 Hai thư viện PDF và file `manual.pdf` mẫu

Go có nhiều cách để làm việc với PDF, và mình chọn một thư viện quen tay. Đứng ở thư mục gốc của project, mình cài hai package:

```bash
go get github.com/phpdave11/gofpdf
go get github.com/phpdave11/gofpdf/contrib/gofpdi
```

* **`gofpdf`** — thư viện tạo PDF.
* **`gofpdf/contrib/gofpdi`** — phần mở rộng cho phép **mở một PDF có sẵn và dùng nó làm template**.

File mẫu có sẵn trong **course resources** của bài này: các bạn tải `manual.pdf` về và đặt vào thư mục `pdf` ở gốc project, tức là `pdf/manual.pdf`. File chẳng có gì đặc sắc, nhưng nó là "tờ giấy" để mình viết lên.

*Một chuyện nhỏ mình kể để các bạn tránh mất thời gian: lúc đọc code, Go có thể tự import nhầm sang package gofpdf khác nếu máy bạn cài nhiều bản — mình từng bị vì dùng thư viện này quá lâu. Các bạn cứ kiểm tra kỹ dòng import, chắc là máy bạn sẽ không gặp cảnh đó đâu.*

### 🧱 Goroutine thứ hai và hàm `generateManual`

Ngay sau goroutine gửi hóa đơn, mình viết thêm một goroutine nữa — vẫn đúng điệu cũ: `app.Wait.Add(1)`, `defer app.Wait.Done()`, rồi gọi một hàm mới tên `app.generateManual(user, plan)`.

Có một chi tiết mình muốn nói rõ: mình **cố tình không** gom logic của goroutine hóa đơn vào một hàm riêng, mà giữ nguyên trong goroutine. Lý do rất đơn giản — `getInvoice` sẽ còn lớn lên với đủ loại logic, còn phần gửi email là chuyện của nó. Với manual mình cũng làm y hệt như vậy.

Hàm `generateManual` nhận **user** và **con trỏ tới plan**, trả về con trỏ tới `gofpdf.Fpdf` kèm error. Bên trong, từng bước một:

```go
pdf := gofpdf.New("P", "mm", "Letter", "")
pdf.SetMargins(10, 13, 10)
importer := gofpdi.NewImporter()
time.Sleep(5 * time.Second)
t := importer.ImportPage(pdf, "./pdf/manual.pdf", 1, "MediaBox")
pdf.AddPage()
importer.UseImportedTemplate(pdf, t, 0, 0, 215.9, 0)
```

* `gofpdf.New` tạo PDF khổ **portrait**, đơn vị **mm**, giấy **Letter**; tham số cuối để trống, không quan trọng với mình. Margin đặt `10, 13, 10` mm.
* `gofpdi.NewImporter()` tạo đối tượng import. Mình cố tình cho **`time.Sleep(5 * time.Second)`** — giả lập một PDF phức tạp mất vài giây để tạo, sau này các bạn sẽ thấy concurrency đáng giá thế nào.
* `ImportPage` mở trang 1 của `./pdf/manual.pdf` với box tên **`MediaBox`** (nhớ viết hoa chữ M và chữ B — PDF có logic riêng của nó).
* `AddPage` thêm trang mới, rồi `UseImportedTemplate` vẽ template lên với tọa độ `0, 0` và chiều rộng `215.9` để canh cho ngay ngắn.

Giờ mới tới phần "viết lên giấy": mình `pdf.SetXY(75, 150)` để đặt vị trí (mình phải đo bằng… thước kẻ chứ không có gì bí ẩn ở đây cả), `pdf.SetFont("Arial", "", 12)` chọn font Arial thường, cỡ 12. Tiếp đó là `MultiCell` với width `0`, giãn dòng `4`, căn giữa (`C`), không tô nền, để in **họ tên người dùng** bằng `fmt.Sprintf`. Xong mình gọi `pdf.Ln(5)` xuống dòng, rồi một `MultiCell` nữa với chuỗi format `"%s User Guide"` cho dòng tên tài liệu. Cuối cùng trả `pdf` về cho người gọi.

### 📝 Ghi PDF ra thư mục `temp` — vì sao tên file có user ID

PDF đã dựng xong, mình ghi nó xuống đĩa:

```go
err := pdf.OutputFileAndClose(fmt.Sprintf("./temp/%d_manual.pdf", user.ID))
```

Chỗ này có một mẹo nhỏ rất đáng nhớ: tên file được ghép theo dạng **`<user ID>_manual.pdf`** trong thư mục `temp` ở gốc ứng dụng. Nhờ vậy, hai người dùng cùng lúc sinh manual sẽ không bao giờ ghi đè file của nhau. Nếu có lỗi thì mình gửi thẳng vào `app.ErrorChan` rồi `return` — không đi tiếp nữa. À, và các bạn nhớ tạo thư mục `temp` nhé, mình sẽ tạo ngay sau đây.

### 📧 Nâng cấp mailer: `AttachmentsMap` và màn "dọn dẹp" code cũ

File tên `1_manual.pdf` thì tốt cho mình, nhưng người dùng mở mail mà thấy cái tên đó thì… kỳ lắm. Mình muốn đính kèm nó với tên đẹp hơn: `manual.pdf`. Thay vì cắt chuỗi quanh dấu gạch dưới rồi cầu mong mọi thứ suôn sẻ, mình nâng cấp `Message` thêm một trường:

```go
AttachmentsMap map[string]string
```

Trong `sendMail`, nếu map này khác rỗng, mình `range` qua từng cặp key–value để thêm đính kèm: **value là đường dẫn file thật**, còn **key là tên hiển thị** mà mình muốn người nhận thấy. Nếu map là `nil`, mình khởi tạo `make(map[string]string)` trước cho chắc.

Nhân tiện, mình sửa luôn một lỗi cũ khá… xấu hổ trong `sendMail`: trước đây mình tạo một map mới tinh rồi gán đè lên `msg.DataMap`, khiến dữ liệu ai đã đặt trước đó bay sạch. Cách làm đúng nên là:

```go
if len(msg.DataMap) == 0 {
	msg.DataMap = make(map[string]any)
}
msg.DataMap["message"] = msg.Data
```

Tức là chỉ tạo map khi chưa có, rồi **thêm từng key** thay vì thay cả map — như vậy template có thể nhận nhiều thông tin cùng lúc. Đúng kiểu code hơi cẩu thả của mình từ lâu lắm rồi. *Mình là người thích đeo cả dây lưng lẫn dây đeo quần (suspenders), nên cứ khởi tạo map đầy đủ cho chắc ăn.*

Quay lại handler, mình tạo `msg` với `To`, `Subject` là `"Your manual"`, `Data` là dòng chữ "Your user manual is attached", và đặt `AttachmentsMap`:

```go
msg.AttachmentsMap = map[string]string{
	"manual.pdf": fmt.Sprintf("./temp/%d_manual.pdf", user.ID),
}
```

### 🧪 Gửi email kèm PDF, test error channel và chuẩn bị chạy thử

Xong message, mình gọi `app.sendEmail(msg)`. Và để chắc chắn "tổng đài" bắt lỗi ở bài trước vẫn hoạt động, mình gửi thử một lỗi "đồ chơi" vào channel bằng `app.ErrorChan <- errors.New("some custom error")` — dòng này chỉ để thử, các bạn thấy nó "hiện hình" trong log nghĩa là mọi thứ ổn.

Cuối cùng, mình đặt flash message `"Subscribed"` và redirect về `/members/plans` với `http.StatusSeeOther`. *Ừ, mình biết là "Subscribed" lúc này chưa đúng sự thật — mình chưa đăng ký gói thật cho người dùng, chỉ muốn xem PDF và email có hoạt động không thôi.* Còn một việc bắt buộc nữa: tạo thư mục `temp` ở gốc ứng dụng, nếu không thì phần ghi PDF sẽ lỗi ngay.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hai thư viện PDF được cài có nhiệm vụ khác nhau thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `gofpdf` dùng để tạo PDF, còn `contrib/gofpdi` mở PDF có sẵn và dùng nó làm template.

Giải thích: Mình cần cả hai vì vừa tạo trang mới, vừa phải import trang từ `manual.pdf`.

Tham chiếu: Mục Hai thư viện PDF và file manual.pdf mẫu.

</details>

**Câu 2:** Vì sao trong `generateManual` lại có `time.Sleep(5 * time.Second)`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để giả lập một tác vụ nặng — PDF phức tạp có thể mất vài giây mới tạo xong.

Giải thích: Nhờ vậy các bạn thấy rõ lợi ích của việc cho manual và hóa đơn chạy song song.

Tham chiếu: Mục Goroutine thứ hai và hàm generateManual.

</details>

**Câu 3:** Vì sao tên file PDF tạm có kèm user ID?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để hai người dùng không bao giờ ghi đè file manual của nhau.

Giải thích: File được ghi thành `temp/<user ID>_manual.pdf`, đảm bảo mỗi người một file riêng.

Tham chiếu: Mục Ghi PDF ra thư mục temp.

</details>

**Câu 4:** `AttachmentsMap` giải quyết chuyện gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cho phép đính kèm file với **tên hiển thị tùy biến**: value là đường dẫn file thật, key là tên mình muốn người nhận thấy.

Giải thích: Nhờ đó file `1_manual.pdf` khi gửi đi thành `manual.pdf` cho đẹp.

Tham chiếu: Mục Nâng cấp mailer.

</details>

**Câu 5:** Lỗi cũ trong `sendMail` là gì và được sửa ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Code cũ tạo map mới và gán đè `msg.DataMap`, làm mất dữ liệu đã có. Sửa lại: chỉ tạo map khi nó rỗng, rồi thêm từng key bằng `msg.DataMap["message"] = msg.Data`.

Giải thích: Cách mới cho phép truyền nhiều thông tin cùng lúc vào template thay vì ghi đè tất cả.

Tham chiếu: Mục Nâng cấp mailer.

</details>

Chúng ta đã viết khá nhiều code từ lần chạy thử gần nhất, nên mình **cam đoan là sẽ có lỗi ở đâu đó** — chuyện thường ngày mà. Bài sau chúng ta sẽ bật ứng dụng lên và cùng truy tìm những chỗ sai ấy. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [gofpdf — PDF document generator for Go](https://github.com/phpdave11/gofpdf)
- [gofpdi — import existing PDFs as templates](https://pkg.go.dev/github.com/phpdave11/gofpdf/contrib/gofpdi)
