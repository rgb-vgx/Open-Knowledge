---
title: 'Bài 105 — Làm quen PyTorch: cài đặt và kiểm tra GPU'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 105
status: edited
source: '105 - Introduction PyTorch.md'
categories:
- AI
tags: []
---

# 🧠 Làm quen PyTorch: cài đặt và kiểm tra GPU

> Nguồn: `105 - Introduction PyTorch.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481899)

Chào các bạn! Bài này mình sẽ đưa PyTorch lên máy để dùng thật: cài đặt, kiểm tra xem máy có GPU hay không, và nếu không muốn đụng vào máy local thì chuyển sang **Google Colab**. Đây là bước đệm trước khi đi vào các thành phần cốt lõi của PyTorch.

### ⚙️ Cài PyTorch trên máy local

Mình đang ở trong môi trường làm việc của mình. Việc đầu tiên là `import torch`. Sau khi import thành công, các bạn kiểm tra khả năng truy cập GPU bằng:

```python
import torch

print(torch.cuda.is_available())
```

Nếu máy tìm thấy GPU thì lệnh in ra `True`, nghĩa là PyTorch truy cập được GPU trong hệ thống. Nếu đang chạy trên CPU thì không cần chạy dòng này — PyTorch vẫn chạy bình thường, không lỗi gì. Chỉ cần đoạn code trên thực thi trơn tru là việc cài đặt đã ổn.

---

### ☁️ Chuyển sang Google Colab

Nếu không muốn làm việc trên máy local, các bạn lên **Google Colab**: tìm "Google Colab", vào link đầu tiên và đăng ký. Sau khi đăng nhập, giao diện sẽ hiện các notebook gần đây và hướng dẫn tạo notebook. Mình chỉ cần bấm **New notebook** để mở một notebook mới.

Việc đầu tiên trong notebook là bấm **Connect** — giống như kết nối tới kernel. Lưu ý phải đăng ký tài khoản thì trang mới mở, vì nó gắn với tài khoản Google của các bạn. Khi các chấm cam chuyển hết sang xanh là đã kết nối thành công.

---

### 🚀 Bật GPU trên Colab

Google Colab có cho dùng GPU miễn phí. Các bạn có thể xem tài nguyên qua **View resources**: bản miễn phí không có compute unit, nhưng vẫn thấy được khoảng **12 GB RAM** và **107 GB disk**.

Muốn kiểm tra quyền truy cập GPU, bấm **Change runtime type**. Ở đó có **Tesla T4 GPU** (bản miễn phí). Trước khi chuyển, mình thử xem torch có sẵn ở chế độ CPU không:

```python
import torch
print(torch.cuda.is_available())
```

Torch có sẵn mặc định trong Colab, nên `import torch` chạy được ngay mà không cần cài. Nhưng `torch.cuda.is_available()` in ra `False` vì đang ở môi trường CPU.

Khi đổi runtime sang **Tesla T4 GPU**, mọi thứ sẽ được khởi tạo lại: code không mất, nhưng phiên máy bị refresh. Sau khi kết nối lại, RAM vẫn khoảng **12.7 GB**, nhưng giờ có thêm **15 GB VRAM** trên GPU Tesla T4, disk khoảng **112 GB**.

---

### ✅ Kiểm tra lại sau khi bật GPU

Chạy lại toàn bộ cell trong notebook, rồi chạy lại:

```python
import torch
print(torch.cuda.is_available())
```

Lần này kết quả là `True` — PyTorch đã truy cập được GPU, và bản torch cài trong Colab cũng là bản CUDA/GPU. Vậy là mình đã biết cả cách cài PyTorch trên máy local lẫn cách dùng trên cloud.

Bài này khép lại phần giới thiệu PyTorch: mình đã xem PyTorch là gì và vì sao nó được dùng rộng rãi. Bài tiếp theo, chúng ta sẽ đi sâu vào các **building block** của PyTorch. Hẹn gặp các bạn ở bài sau!
