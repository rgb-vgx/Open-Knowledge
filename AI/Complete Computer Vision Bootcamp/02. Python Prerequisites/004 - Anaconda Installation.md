---
title: 'Bài 004 — Cài đặt Anaconda và VS Code'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 4
status: edited
source: '004 - Anaconda Installation.md'
categories:
- AI
tags: []

---

# 🐍 Cài đặt Anaconda và VS Code

> Nguồn: `004 - Anaconda Installation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49087203)

Chào các bạn! Trước khi viết những dòng Python đầu tiên, bài này lo hai việc nền: cài **Anaconda** để quản lý môi trường và package, rồi cài **VS Code** làm IDE. Mình sẽ đi đúng từng bước trên màn hình, kèm lý do vì sao một ô checkbox nhỏ lại quyết định việc lệnh `conda` có chạy được hay không.

### 🧰 Vì sao cần Anaconda?

Anaconda là một công cụ **open source**, cung cấp hệ sinh thái mã nguồn mở để tìm nguồn, xây dựng và triển khai các dự án **data science** và **AI**. Với mình, lợi ích lớn nhất nằm ở hai chữ: **môi trường** và **package**.

* Các bạn có thể tạo nhiều môi trường, cài nhiều package khác nhau cho từng dự án.
* Cần chạy nhiều phiên bản Python? Tạo môi trường riêng cho từng phiên bản.
* Việc quản lý package và môi trường diễn ra dễ dàng hơn nhiều so với tự xoay xở.

Vì vậy Anaconda là lựa chọn tốt để bắt đầu với Python, đặc biệt khi các bạn sẽ dùng rất nhiều thư viện về sau.

---

### ⬇️ Tải và chạy bộ cài Anaconda

Mình đi theo đúng trình tự sau:

1. Vào **anaconda.com**, bấm **Free download**.
2. Kéo xuống, nhập địa chỉ email rồi bấm **Submit**. Sau đó nút **Download Now** sẽ hiện ra.
3. Chọn phiên bản theo hệ điều hành: **Windows**, **Mac** hoặc **Linux**. Với Windows, trang tự gợi ý bộ cài **64-bit graphical installer**.
4. Bấm link tải, đợi file `.exe` về máy rồi nhấp đúp để chạy.
5. Bộ cài hướng dẫn từng bước: bấm **Next**, đọc **license agreement** rồi chọn **I agree**.
6. Nếu máy dùng chung cho nhiều người, chọn **All Users**; nếu chỉ mình dùng thì chọn **Just Me**. Mình chọn **Just Me** rồi bấm **Next**.
7. Chọn **destination folder**. Mặc định là thư mục `anaconda3` trên ổ C; các bạn có thể đổi sang ổ khác, ví dụ ổ E, miễn tên thư mục vẫn là `anaconda3`.

Sau bước chọn thư mục, bộ cài đưa ra vài tùy chọn. Trong đó có một tùy chọn mình muốn nói kỹ ở mục dưới.

---

### ⚙️ Tích ô PATH — bước quan trọng nhất

Trong danh sách tùy chọn có dòng **Add Anaconda3 to my PATH environment variable**, kèm ghi chú *not recommended*. Giảng viên vẫn khuyên các bạn **tích vào**, và mình đồng ý vì lý do rất thực tế:

* Khi tích ô này, đường dẫn của Anaconda được thêm tự động vào **environment variable**.
* Nhờ đó các lệnh `conda` chạy được ngay trong Command Prompt.
* Không có đường dẫn đó, mọi lệnh `conda` sẽ thất bại — kể cả việc tạo môi trường mới hay cài package.

Cụ thể, biến môi trường sẽ có các đường dẫn tới thư mục cài `anaconda3`, thư mục `Library\bin` và `Scripts`. Các bạn kiểm tra lại sau khi cài để chắc rằng chúng đã xuất hiện.
Hai tùy chọn còn lại là **create start menu shortcuts** và **clear the package cache upon completion**; giảng viên nhắc đến chúng trong quá trình cài. Xong xuôi, bấm **Install** và đợi. Thời gian cài tùy máy; Anaconda sẽ được đặt đúng vào thư mục các bạn đã chọn.

---

### 🧭 Mở Anaconda Navigator

Cài xong, mình mở hộp tìm kiếm của Windows, gõ **Anaconda** và chọn **Anaconda Navigator**. Cửa sổ Navigator mất một chút để khởi tạo, sau đó các bạn sẽ thấy:

* **Jupyter Notebook** — bấm **Launch** là notebook mở ra ngay.
* Nhiều IDE khác như **PyCharm**, **Datalore**, **Watson Studio**, **PyCharm Professional**.
* Danh sách các **environment** đã tạo trên máy.

Đây cũng là nơi giảng viên giới thiệu VS Code: trong Navigator có link **VS Code download** để tải tiếp.

---

### 💻 Cài VS Code và mở đúng thư mục

VS Code là IDE **open source**, có link tải ngay trong Navigator và có bản cho Windows hoặc Mac. Các bạn tải về rồi cài theo kiểu **Next, Next, Next**. VS Code chạy được cả file `.ipynb` lẫn `.py`, nên rất hợp cho khóa học này.
Điểm mình thích là cách mở VS Code ngay tại thư mục làm việc:

1. Tạo thư mục dự án, ví dụ `Data Analyst Boot Camp` rồi bên trong là `Python`.
2. Mở **Command Prompt** tại thư mục đó, hoặc dùng `cd` để đi tới ổ và đường dẫn tương ứng.
3. Gõ `code .` — VS Code sẽ mở đúng thư mục hiện tại.
4. Nếu đã cài VS Code, các bạn cũng có thể chuột phải trong thư mục và chọn **Open with Code**; lần đầu cài có thể chưa thấy mục này.
5. Trong VS Code, tạo file `test.ipynb` và bắt đầu code.

Nếu vì lý do nào đó vẫn chưa chạy được, giảng viên gợi ý dùng **Google Colab** thay thế, hoặc viết câu hỏi vào **discussion forum** của khóa.

Vậy là xong hai việc nền: có Anaconda để quản lý môi trường, có VS Code để viết và chạy code. Bài sau mình sẽ tạo môi trường bằng `conda`, chạy file Python đầu tiên và mở Jupyter Notebook ngay trong VS Code.
