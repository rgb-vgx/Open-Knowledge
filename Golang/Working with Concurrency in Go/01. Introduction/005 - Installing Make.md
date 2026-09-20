# 🛠️ Cài đặt Make: Chiếc build tool nhỏ mà có võ

> Nguồn: `005-Installing-Make.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32190408)

Trong khóa học này, mình sẽ dùng **Make** — một **build tool (công cụ build)** rất tốt và cực kỳ phổ biến. Mình sẽ cung cấp các **make script** (hay còn gọi là **make recipe**) xuyên suốt khóa học, nên cài Make sẽ giúp các bạn chạy code thuận tiện hơn hẳn.

### 🧰 Make là gì và vì sao nên cài

Nghe tới đây các bạn đừng căng thẳng: **việc cài Make là hoàn toàn tùy chọn**. Nếu không muốn, bạn cứ chạy phần mềm theo cách thường ngày của mình.

*Tuy nhiên, mình vẫn khuyến khích các bạn cài*, vì Make là công cụ build rất phổ biến, và mình sẽ gửi kèm các make recipe để bạn dùng trong suốt khóa học. Tài liệu chính thức của Make mình đã để trong **course resources** của bài này.

### 🍺 Trên macOS: dùng Homebrew

Nếu bạn dùng Mac, cách dễ nhất "far and away" (vượt trội hẳn) là dùng **Homebrew**:

1. Copy link cài Homebrew (nằm trong tài liệu mình để ở phần resources) và dán vào cửa sổ terminal.
2. Sau khi cài xong Homebrew, mở terminal và gõ:

```bash
brew install make
```

Vậy là xong — bạn có thể chạy lệnh `make` ngay từ command line.

### 🍫 Trên Windows: dùng Chocolatey

Windows hơi khác một chút. Hầu hết mọi người hiện dùng Windows 10, một số đã lên Windows 11 — và "bản Homebrew của Windows" có tên là **Chocolatey**.

1. Cài Chocolatey theo hướng dẫn (link cũng nằm trong course resources, các bước rất đơn giản).
2. Mở terminal và gõ:

```bash
choco install make
```

Vậy là bạn đã có một bản Make phù hợp cho khóa học. *Cài xong thì mình đi tiếp nhé!* 🚀
