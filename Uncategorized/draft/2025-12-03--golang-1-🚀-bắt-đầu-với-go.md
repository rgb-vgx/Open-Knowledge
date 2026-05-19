---
title: 'Golang 1: 🚀 Bắt đầu với Go:'
date: '2025-12-03 22:08:43'
date_gmt: '0000-00-00 00:00:00'
modified: '2025-12-03 22:08:43'
status: draft
slug: golang-1-🚀-bắt-đầu-với-go
wordpress_id: 575
author: maithuyetedu
original_url: https://com994947723.wordpress.com/?p=575
categories:
- Uncategorized
tags: []
---

---

Bài giảng này hướng dẫn từng bước tạo và chạy chương trình Go đầu tiên, giới thiệu các khái niệm cơ bản như cấu trúc file, khai báo biến và định nghĩa hàm.

### 🛠️ Thiết lập môi trường và Tạo chương trình Go đầu tiên

Để bắt đầu, chúng ta sẽ thiết lập Visual Studio Code (VS Code) và tạo file Go đầu tiên.

1. **Mở Visual Studio Code:**
   - Khởi động VS Code. Nếu có màn hình chào mừng, bạn có thể đóng nó.
2. **Tạo Thư mục dự án:**
   - Nhấp vào biểu tượng Explorer (hai tờ giấy) ở góc trên bên trái để mở bảng điều khiển Explorer.
   - Nhấp vào "Open Folder" (Mở thư mục).
   - Chọn một vị trí để lưu dự án của bạn và tạo một thư mục mới, ví dụ: `learning-go`.
   - Nhấp "Open" (Mở).
   - Khi được hỏi "Do you trust the authors of the files in this folder?", chọn "Yes, I trust the authors" (Có, tôi tin tưởng tác giả) và đánh dấu "Remember my decision for all workspaces" (Ghi nhớ quyết định của tôi cho tất cả các workspace) để tránh bị hỏi lại.
3. **Tạo file Go mới:**
   - Trong bảng điều khiển Explorer, nhấp vào biểu tượng "New File" (Tạo file mới).
   - Đặt tên file là `main.go`.
   - ✅ **Best Practice:** Theo quy ước, điểm vào chính của chương trình Go thường được đặt tên là `main.go`.
4. **Cấu trúc cơ bản của chương trình Go:**
   - Mỗi file Go bắt đầu bằng khai báo `package`.
   - Mỗi chương trình Go phải có ít nhất một hàm tên là `main`.`package main // Khai báo package import "fmt" // Tự động thêm bởi VS Code khi sử dụng fmt func main() { // Định nghĩa hàm main // Mã của bạn ở đây }`
   - **`package main`**: Khai báo rằng đây là một chương trình thực thi (executable program).
   - **`func main()`**: Hàm `main` là điểm bắt đầu thực thi của mọi chương trình Go.
     - Nó không nhận đối số (dấu ngoặc đơn `()` trống).
     - Nó không trả về giá trị nào (không có kiểu dữ liệu sau dấu ngoặc đơn `()`).
     - Mã thực thi nằm trong cặp dấu ngoặc nhọn `{}`.
5. **Viết chương trình "Hello World":**
   - Bên trong hàm `main`, chúng ta sẽ sử dụng package `fmt` để in văn bản ra console.
   - Gõ `Fmt` và VS Code sẽ hiển thị gợi ý. Chọn `fmt` và nhấn Enter. VS Code sẽ tự động thêm dòng `import "fmt"` ở đầu file.
   - Sau `fmt.`, gõ `Print` và chọn `Println` từ danh sách gợi ý.
   - Truyền chuỗi "Hello world." vào hàm `Println`.`package main import "fmt" // Package fmt được import tự động func main() { fmt.Println("Hello world.") // In "Hello world." ra console }`
6. **Chạy chương trình Go:**
   - Mở Terminal trong VS Code: `Terminal` -> `New Terminal`.
   - Terminal sẽ tự động trỏ đến thư mục dự án của bạn.
   - Gõ lệnh sau để chạy chương trình:`go run main.go`
   - Kết quả sẽ là:`Hello world.`

### 📝 Khai báo và sử dụng biến (Variables)

Go là một ngôn ngữ có kiểu dữ liệu mạnh (strongly typed), nghĩa là bạn phải khai báo kiểu dữ liệu cho biến.

1. **Cú pháp khai báo biến:**
   - Sử dụng từ khóa `var`, theo sau là tên biến và kiểu dữ liệu.`var tenBien kieuDuLieu`
2. **Ví dụ với kiểu `string`:**
   - Khai báo biến `whatToSay` kiểu `string`.
   - ✅ **Best Practice:** Trong Go, tên biến thường bắt đầu bằng chữ cái thường và sử dụng `camelCase` (ví dụ: `whatToSay`).`func main() { fmt.Println("Hello world.") var whatToSay string // Khai báo biến whatToSay kiểu string // ... }`
   - ⚠️ **Cảnh báo:** Go compiler rất nghiêm ngặt. Nếu bạn khai báo một biến trong một hàm nhưng không sử dụng nó, bạn sẽ nhận được lỗi (ví dụ: `whatToSay declared but not used`).
3. **Gán giá trị cho biến:**
   - Sử dụng toán tử gán `=`.`whatToSay = "Goodbye cruel world." // Gán giá trị cho biến`
4. **In giá trị của biến:**
   - Sử dụng `fmt.Println()` và truyền tên biến.`fmt.Println(whatToSay) // In giá trị của whatToSay`
   - Chương trình hoàn chỉnh:`package main import "fmt" func main() { fmt.Println("Hello world.") var whatToSay string whatToSay = "Goodbye cruel world." fmt.Println(whatToSay) }`
   - Chạy lại chương trình (`go run main.go`), kết quả:`Hello world. Goodbye cruel world.`
5. **Ví dụ với kiểu `int`:**
   - Khai báo biến `i` kiểu `int`.
   - Kiểu `int` mặc định sẽ là `int64` trên hệ thống 64-bit.
   - ⚠️ **Cảnh báo:** Bạn không thể gán một giá trị kiểu `string` cho một biến kiểu `int`.`func main() { // ... var i int // Khai báo biến i kiểu int i = 7 // Gán giá trị số nguyên cho i // i = "cat" // Lỗi: cannot use "cat" (type string) as type int in assignment fmt.Println("I is set to", i) // In giá trị của i }`
   - Kết quả sau khi chạy:`Hello world. Goodbye cruel world. I is set to 7`
6. **Tự động lưu file (Auto Save):**
   - ✅ **Mẹo:** Trong VS Code, vào `File` -> chọn `Auto Save` để tự động lưu công việc của bạn.

### 🧩 Định nghĩa hàm tùy chỉnh (Custom Functions)

Ngoài hàm `main`, bạn có thể định nghĩa các hàm của riêng mình.

1. **Cú pháp định nghĩa hàm:**
   - Sử dụng từ khóa `func`, theo sau là tên hàm, danh sách tham số (nếu có) và kiểu dữ liệu trả về (nếu có).`func tenHam(thamSo1 kieu1, thamSo2 kieu2) kieuTraVe { // Mã của hàm return giaTri }`
2. **Ví dụ hàm `saySomething()` trả về một `string`:**`// Định nghĩa hàm saySomething trả về một string func saySomething() string { return "Something" // Trả về chuỗi "Something" }`
   - ⚠️ **Cảnh báo:** Nếu bạn khai báo một hàm trả về một giá trị (ví dụ: `string`), bạn phải có câu lệnh `return` trả về đúng kiểu dữ liệu đó.
3. **Gọi hàm và sử dụng giá trị trả về:**
   - Bạn có thể gọi hàm từ `main` hoặc các hàm khác.
   - **Cú pháp rút gọn khai báo và gán biến (`:=`):** Đây là cách phổ biến trong Go để khai báo và khởi tạo biến, kiểu dữ liệu sẽ được suy luận tự động từ giá trị gán.`func main() { // ... (các phần trước) ... // Gọi hàm saySomething và gán giá trị trả về vào biến whatWasSaid whatWasSaid := saySomething() // Cú pháp rút gọn: khai báo và gán biến // whatWasSaid sẽ có kiểu string fmt.Println("The function returned", whatWasSaid) // In giá trị trả về }`
   - Chạy chương trình, kết quả:`Hello world. Goodbye cruel world. I is set to 7 The function returned Something`

### 💡 Các quy tắc quan trọng và tính năng nâng cao

1. **Quy tắc về file Go:**
   - Mỗi file Go phải kết thúc bằng phần mở rộng `.go`.
   - Dòng đầu tiên trong mỗi file Go phải là khai báo `package` (ví dụ: `package main`).
2. **Import Package:**
   - Sử dụng `import "package_name"` để sử dụng các hàm từ package đó.
   - VS Code thường tự động import các package cần thiết (ví dụ `fmt`) khi bạn sử dụng chúng.
3. **Biến cấp độ Package (Package-level Variables):**
   - Biến được khai báo bên ngoài bất kỳ hàm nào (ví dụ: ngay sau `package main`) được gọi là biến cấp độ package.
   - Chúng có thể được khai báo mà không cần sử dụng ngay lập tức, không giống như biến trong hàm.
   - Chúng có thể truy cập được bởi bất kỳ hàm nào trong cùng package.`package main var myName string // Biến cấp độ package, không lỗi nếu chưa dùng func main() { // ... }`
4. **Hàm `main()`:**
   - Chương trình Go phải có **một và chỉ một** hàm tên là `main`.
   - Hàm `main` không nhận đối số và không trả về giá trị nào.
5. **Hàm có thể trả về nhiều giá trị:**
   - Đây là một tính năng mạnh mẽ của Go. Một hàm có thể trả về nhiều hơn một giá trị.
   - Để khai báo, đặt các kiểu trả về trong dấu ngoặc đơn `()`, phân tách bằng dấu phẩy.
   - Để nhận các giá trị trả về, bạn cần cung cấp đủ số lượng biến để gán.`// Hàm saySomething bây giờ trả về hai string func saySomething() (string, string) { return "Something", "false" // Trả về hai chuỗi } func main() { // ... // Nhận cả hai giá trị trả về từ saySomething whatWasSaid, theOtherThingThatWasSaid := saySomething() fmt.Println("The function returned", whatWasSaid) fmt.Println("The other thing that was said was", theOtherThingThatWasSaid) }`
   - Chạy chương trình, kết quả:`Hello world. Goodbye cruel world. I is set to 7 The function returned Something The other thing that was said was false`
   - Tính năng này cực kỳ hữu ích và sẽ được sử dụng rộng rãi trong các bài học sau.

---
