---
title: 'Định dạng thẻ SD trước khi cài hệ điều hành'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 005
status: edited
source: '005 - Formatting SD Card.md'
categories:
- AI
tags: []
---

# 💾 Định dạng thẻ SD trước khi cài hệ điều hành

> Nguồn: `005 - Formatting SD Card.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39462900)

Chào các bạn, đây là bước đầu tiên để đưa hệ điều hành lên Jetson Nano: chuẩn bị thẻ SD và định dạng lại nó cho sạch. Mình sẽ làm chậm từng bước, các bạn cứ theo đúng thứ tự là được.

### 🧰 Chuẩn bị thẻ SD và đầu đọc thẻ

* Thẻ SD dung lượng **32GB trở lên** là dùng tốt cho board.
* Một **card reader** để kết nối thẻ SD với máy tính.

1. Cắm thẻ SD vào card reader.
2. Cắm card reader vào máy tính.
3. Mở File Explorer, kiểm tra xem máy tính đã đọc được ổ thẻ SD hay chưa.

### 🔧 Tải và cài SD Card Formatter

1. Lên Google, gõ **SD card formatter** rồi Enter.
2. Vào trang web có tên kiểu **SD Memory Card Formatter** mà kết quả trả về.
3. Vào mục **Download**, chọn đúng phiên bản hệ điều hành: **Windows** hoặc **Mac**. Trong bài mình dùng Windows nên tải bản Windows.
4. Đọc và **Accept** user license agreement để bắt đầu tải.
5. File zip tải về xong thì **giải nén**, mở thư mục vừa giải nén.
6. Chạy file **setup**. Trình **InstallShield Wizard** hiện lên, lần lượt bấm **Next**, **Modify**, **Next** rồi **Install**.

### ⚙️ Định dạng nhanh thẻ SD

1. Mở ứng dụng **SD Card Formatter** vừa cài.
2. Ở danh sách ổ đĩa, chọn đúng tên thẻ SD của mình. Trong bài, thẻ nằm ở ổ **D**.
3. Chuyển xuống mục **Formatting Options**, chọn **Quick Format**.
4. Bấm **Format**, rồi xác nhận **Yes**.
5. Khi chương trình báo **"formatting was successfully completed"**, bấm **OK** và đóng ứng dụng.

---

Vậy là thẻ SD đã sạch và sẵn sàng. Bài sau mình sẽ cùng các bạn tải image hệ điều hành của Jetson Nano và ghi nó xuống thẻ này.
