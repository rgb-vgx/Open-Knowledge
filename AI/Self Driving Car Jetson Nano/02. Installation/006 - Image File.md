---
title: 'Ghi image hệ điều hành Jetson Nano xuống thẻ SD bằng Balena Etcher'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 006
status: edited
source: '006 - Image File.md'
categories:
- AI
tags: []
---

# 💿 Ghi image hệ điều hành Jetson Nano xuống thẻ SD bằng Balena Etcher

> Nguồn: `006 - Image File.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39462938)

Sau khi đã định dạng thẻ SD, việc tiếp theo là lấy image hệ điều hành của Jetson Nano và ghi vào thẻ. Mình sẽ dùng **Balena Etcher** — công cụ ghi image xuống thẻ nhớ, các bạn làm theo từng bước bên dưới.

### 📥 Tải image Jetson Nano từ trang NVIDIA

1. Lên Google, gõ **Jetson Nano getting started** rồi Enter.
2. Mở trang của **developer.nvidia.com**.
3. Tìm mục nói về việc ghi image xuống **microSD card**, rồi vào đó.
4. Trang hướng dẫn yêu cầu tải **Jetson Nano Developer Kit SD card image** và ghi nhớ nơi lưu file trên máy.
5. Bấm vào file image để tải. Trong bài, file này hiển thị màu xanh lá.
6. Đợi tải xong, các bạn sẽ có một file **.zip** của image.

### 🔧 Cài Balena Etcher

1. Lên Google, gõ **Balena etcher** rồi Enter.
2. Vào trang web có tên miền **balena.io**.
3. Bấm **Download for Windows** và đợi tải xong file setup.
4. Chạy file setup, đọc license agreement rồi bấm **Accept this agreement**.

### ⚡ Flash image vào thẻ SD

1. Mở **Balena Etcher**.
2. Bấm **Flash from file**, chọn file image NVIDIA vừa tải. Trong bài, file có tên **jetson-nano-jp46-sd-card-image** (JP46 = JetPack 4.6).
3. Bấm **Open** để xác nhận file nguồn.
4. Bấm **Select target**, chọn đúng ổ thẻ SD — trong bài là ổ **D** — rồi bấm **Select**.
5. Bấm **Flash** và chờ. Etcher sẽ vừa ghi vừa validate dữ liệu.
6. Khi Etcher báo **flashing và validating thành công**, gỡ thẻ micro SD ra khỏi máy.

> 💡 Windows có thể hiện thông báo không đọc được thẻ SD sau khi flash. Cứ bấm **Cancel** rồi rút thẻ ra, đó là chuyện bình thường.

---

Thẻ SD lúc này đã có sẵn hệ điều hành cho Jetson Nano. Bài sau mình sẽ cùng các bạn lắp thẻ và module Wi-Fi vào board.
