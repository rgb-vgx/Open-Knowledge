# 🎨 Hoàn thiện mailer: build message HTML, plain text và inline CSS

> Nguồn: `059-Building-HTML-and-Plain-Text-messages.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32249942)

Hai hàm build message đang nằm đó dưới dạng stub, giờ là lúc "thổi hồn" vào chúng. Nói ngắn gọn: mình render template thành nội dung email, dùng **premailer** để inline CSS cho bản HTML, và làm gọn mọi thứ cho bản plain text. Phần này nhẹ nhàng thôi, các bạn theo kịp trong một hơi.

### 🧱 `buildHTMLMessage` — render template thành HTML

Trước tiên, ghép đường dẫn đầy đủ tới file template bằng `fmt.Sprintf` theo mẫu `./cmd/web/templates/%s.html.gohtml`, rồi dùng package `html/template` chuẩn:

1. `template.New("email-html")` — tên gì cũng được, mình đặt cho dễ đọc — và `ParseFiles(templateToRender)`. Lỗi thì trả về chuỗi rỗng kèm error.
2. Khai báo một `bytes.Buffer`, rồi `t.ExecuteTemplate(&tpl, "body", msg.DataMap)`: render đúng section tên `body` với data map đã chuẩn bị ở bài trước.

```go
var tpl bytes.Buffer
err = t.ExecuteTemplate(&tpl, "body", msg.DataMap)
if err != nil {
    return "", err
}
```

3. Lấy chuỗi ra bằng `tpl.String()` — ta đã có **formatted message**, nhưng chưa xong.
4. Trước khi trả về, gọi `m.inlineCSS(formattedMessage)` và cập nhật lại biến. Bước này rất quan trọng với email HTML.
5. Cuối cùng trả về `formattedMessage` cùng `nil`.

### 💅 `inlineCSS` — "thuần hóa" CSS cho mọi email client

Hàm nhận một chuỗi và trả về chuỗi đã xử lý (kèm error). Đầu tiên là bộ options cho premailer — có rất nhiều lựa chọn, nhưng mình chỉ cần vài cái:

* `RemoveClasses: false` — đừng xóa class, vì một số email client còn dùng chúng.
* `CssToAttributes: false` — không chuyển CSS sang attribute.
* `KeepBangImportant: true` — nếu ai đó đặt `!important` trước một rule CSS thì giữ nguyên, đừng vứt đi.

```go
options := premailer.Options{
    RemoveClasses:     false,
    CssToAttributes:   false,
    KeepBangImportant: true,
}

prem, err := premailer.NewPremailerFromString(s, &options)
if err != nil {
    return "", err
}

html, err := prem.Transform()
if err != nil {
    return "", err
}

return html, nil
```

`Transform()` chính là nơi CSS được đưa vào inline. Chạy xong thì trả `html` và `nil` — hết sức đơn giản.

### 📄 `buildPlainTextMessage` — bản "ai cũng đọc được"

Cách nhanh nhất: copy hàm HTML rồi sửa vài chỗ:

1. Đổi template sang `%s.plain.gohtml`.
2. Đổi tên template thành `email-plain` cho dễ đọc.
3. **Không** inline CSS — bản plain text thì không cần.
4. Đổi tên biến thành `plainMessage` và trả về chính nó.

Vậy là xong cả hai hàm. Khi build HTML thì formatted message được đưa qua `inlineCSS`; bản plain text chỉ đơn giản là render rồi trả về.

### 🐛 Soát lỗi trước khi chạy

Go cứ báo vài cảnh báo, và mình đã phát hiện mình quên gán `msg.Template`/dữ liệu ở những chỗ cần thiết — may mà soi ra, chứ để vậy là code không chạy đúng. Vài cảnh báo kiểu "unused" còn lại chỉ là do **language server trong VS Code** chưa theo kịp mình, chứ biến đó thực tế đã được dùng.

*Các bạn đừng hoang mang khi thấy gợi ý đỏ loe hoe trong editor — hãy đọc kỹ rồi kiểm tra lại bằng cách build thật.*

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao mỗi email lại gửi cả bản HTML lẫn bản plain text?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì plain text đọc được trên mọi email client, còn bản HTML đẹp đẽ phục vụ số đông client còn lại.

Giải thích: Gửi plain text làm phương tiện duy nhất là điều mình không muốn.

Tham chiếu: Mục buildHTMLMessage.

</details>

**Câu 2:** `inlineCSS` dùng package nào và để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng premailer để đưa CSS vào inline, giúp email HTML tương thích với nhiều email client.

Giải thích: Hàm nhận chuỗi, gọi `prem.Transform()` rồi trả về chuỗi đã xử lý.

Tham chiếu: Mục inlineCSS.

</details>

**Câu 3:** Ba options của premailer được đặt như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `RemoveClasses: false`, `CssToAttributes: false`, `KeepBangImportant: true`.

Giải thích: Giữ class cho client còn dùng, không chuyển CSS sang attribute, giữ nguyên `!important`.

Tham chiếu: Mục inlineCSS.

</details>

**Câu 4:** `buildPlainTextMessage` khác `buildHTMLMessage` ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng template `%s.plain.gohtml`, tên template `email-plain`, không inline CSS, biến tên `plainMessage`.

Giải thích: Về cơ bản là copy hàm HTML rồi sửa lại vài chỗ cho phù hợp.

Tham chiếu: Mục buildPlainTextMessage.

</details>

**Câu 5:** Mình đã phát hiện ra lỗi gì khi soát code?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Quên gán `msg.Template`/dữ liệu ở những chỗ cần thiết, nếu để vậy code sẽ không chạy đúng.

Giải thích: Các cảnh báo "unused" còn lại là do language server VS Code chưa cập nhật kịp.

Tham chiếu: Mục Soát lỗi trước khi chạy.

</details>

Mailer đã có thể tạo ra hai phiên bản nội dung hoàn chỉnh. Nhưng khoan — chưa ai kiểm chứng nó gửi thật được cả. Bài sau mình gắn một route test và gửi email đầu tiên theo cách đồng bộ. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [vanng822/go-premailer — GitHub](https://github.com/vanng822/go-premailer)
