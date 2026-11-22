---
title: 'Bài 104 — Tải dataset computer vision và xem shape đầu vào/đầu ra'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 104
status: edited
source: '104 - Getting a Computer Vision Dataset and Checking Out Its- Input and Outp.md'
categories:
- AI
tags: []
---

# 🗃️ Tải dataset computer vision và xem shape đầu vào/đầu ra

> Nguồn: `104 - Getting a Computer Vision Dataset and Checking Out Its- Input and Outp.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920312)

Mọi project ML đều bắt đầu từ dữ liệu. Mình sẽ dùng **FashionMNIST** — một dataset kinh điển — tải về chỉ bằng vài dòng qua `torchvision.datasets`, rồi soi input/output shape của nó. Đây cũng là lúc các bạn thấy `ToTensor()` thực sự làm gì.

### 👕 FashionMNIST và "hello world" MNIST

**FashionMNIST** là biến thể của **MNIST** (Modified National Institute of Standards and Technology database) — dataset ảnh xám chữ số viết tay, thường được gọi là "hello world" của ML và computer vision. MNIST ra đời từ khoảng 1998, gắn với thời kỳ CNN bắt đầu chứng minh sức mạnh; sau này nó trở nên quá dễ nên FashionMNIST xuất hiện như một thử thách khó hơn.

FashionMNIST (từ Zalando Research) gồm ảnh xám các món quần áo. Bài toán: biến ảnh thành số, train model nhận ra từng loại quần áo.

### 📥 Lấy dataset qua `torchvision.datasets`

Trong docs của `torchvision.datasets` có danh sách dataset tích hợp: Caltech101, CIFAR100 (100 lớp), CIFAR10 (10 lớp), MNIST, FashionMNIST, ImageNet... ImageNet là chuẩn vàng để đánh giá computer vision, với hàng triệu ảnh.

Hàm `torchvision.datasets.FashionMNIST` nhận các tham số:

* `root` — tải dữ liệu về đâu
* `train` — lấy bản train hay bản test
* `download` — có tải về hay không
* `transform` — biến đổi ảnh thế nào (ta cần `ToTensor()`)
* `target_transform` — biến đổi nhãn thế nào

Mình code luôn cho bản train:

```python
from torchvision import datasets
from torchvision.transforms import ToTensor

train_data = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor(),
    target_transform=None,
)
```

Bản test chỉ khác đúng một dòng: `train=False`.

### 📁 Chạy thử thì được gì

Sau khi chạy, `torchvision` tự tải và giải nén vào thư mục `data/FashionMNIST/`, chia sẵn thành `train_images`, `train_labels`, `test_images`, `test_labels`. Đây là điểm hay: dataset phổ biến đã được format sẵn cho PyTorch — khác với dataset tự làm sau này.

Số lượng mẫu:

* **60.000** mẫu train
* **10.000** mẫu test

Nhiệm vụ: model học pattern trên 60.000 ảnh train rồi dự đoán trên 10.000 ảnh test.

### 🔎 Xem một mẫu

```python
image, label = train_data[0]
print(image.shape)
print(label)
```

Kết quả `image.shape` là `torch.Size([1, 28, 28])` — tức **1 color channel** (ảnh xám), cao 28, rộng 28. `label` là một số nguyên, nên nó không có `.shape`.

Đây chính là dấu vết của `ToTensor()`: PIL Image/NumPy array `(H, W, C)` → `torch.FloatTensor` shape `(C, H, W)`, giá trị 0–1. PyTorch mặc định **channels first**; thư viện khác có thể thích channels last.

### 🏷️ Tên lớp và ánh xạ ngược

```python
print(train_data.classes)
print(train_data.class_to_idx)
```

* `classes` — danh sách tên 10 lớp (T-shirt/top, Trouser, Pullover, Dress, Coat, Sandal, Shirt, Sneaker, Bag, Ankle boot).
* `class_to_idx` — dictionary ánh xạ tên lớp sang index.

Ví dụ nhãn `9` tương ứng **Ankle boot**. Ngoài ra dataset còn có `.data` (toàn bộ ảnh) và `.targets` (toàn bộ nhãn, một tensor dài).

### 🖤 Vì sao chỉ có 1 channel?

Vì ảnh xám. Pixel đen = 0, trắng = giá trị cao (gần 1 sau khi scale), còn 0.001 là một pixel trắng mờ. Ảnh màu có 3 channel cho đỏ/xanh lá/xanh dương, ảnh xám chỉ 1.

### ✅ Tạm kết

Chỉ vài dòng là có 60.000 ảnh train, 10.000 ảnh test, đã ở dạng tensor `[1, 28, 28]` với nhãn nguyên. Nhưng nhìn số thì khô khan — bài sau mình sẽ biến chúng thành **hình ảnh** thật sự để "làm một với dữ liệu".
