---
title: 'Data augmentation với torchvision.transforms: TrivialAugmentWide'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 151
status: edited
source: '151 - Exploring State of the Art Data Augmentation With Torchvision Transfor.md'
categories:
- AI
tags: []
---

# 🎨 Data augmentation với torchvision.transforms: `TrivialAugmentWide`

> Nguồn: `151 - Exploring State of the Art Data Augmentation With Torchvision Transfor.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32731656)

Một trong những bước quan trọng nhất khi nạp custom dataset là **transform dữ liệu**, và một dạng transform đặc biệt là **data augmentation**. Bài này mình giới thiệu khái niệm này, rồi đi sâu vào `TrivialAugmentWide` — kỹ thuật mà đội PyTorch dùng để huấn luyện các model vision đạt **state of the art (SOTA)**.

### 🧪 Data augmentation là gì?

Theo Wikipedia: *"Data augmentation in data analysis are techniques used to increase the amount of data by adding slightly modified copies of already existing data or newly created synthetic data."* Nói gọn: **data augmentation là quá trình thêm độ đa dạng một cách nhân tạo vào dữ liệu train**. Với ảnh, ta áp các phép biến đổi lên ảnh train như xoay, dịch, zoom, đổi màu...

Mục đích: nhìn cùng một ảnh từ **nhiều góc độ khác nhau**, để model học được pattern **tổng quát hóa** tốt hơn, áp dụng được cho dữ liệu chưa từng thấy.

### 📚 "State of the art" nghĩa là gì?

SOTA = "best in the business" — tốt nhất hiện có. Trong blog **How to Train State of the Art Models Using TorchVision's latest primitives** của đội PyTorch, họ liệt kê một loạt cải tiến cho ResNet-50: learning rate optimization, train lâu hơn, **random erasing**, **label smoothing**, **mixup**, **cutmix**, weight decay tuning, EMA, inference resize tuning... Tổng cộng có thể tăng độ chính xác từ khoảng **76 lên gần 81** (gần **+5%**). Trong đó có **TrivialAugment** — thứ ta sẽ thử.

### 🔥 Dựng transform với `TrivialAugmentWide`

```python
from torchvision import transforms

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.TrivialAugmentWide(num_magnitude_bins=31),
    transforms.ToTensor(),
])
```

Giải thích:

* **`Resize((224, 224))`** — kích thước phổ biến cho image classification.
* **`TrivialAugmentWide(num_magnitude_bins=31)`** — chọn **ngẫu nhiên** các phép augmentation và áp ở **cường độ ngẫu nhiên**. `num_magnitude_bins` là thang cường độ từ **0 đến 31**; `31` là mạnh nhất, `5` thì nhẹ hơn nhiều.
* **`ToTensor()`** — chuyển sang tensor.

Test transform giữ nguyên cấu trúc cũ (Resize + ToTensor, không augmentation).

### 👀 Visualize kết quả

Mình dùng lại hàm `plot_transformed_images` để xem vài ảnh qua `TrivialAugmentWide`:

```python
plot_transformed_images(image_paths=image_path_list, transform=train_transform, n=3, seed=None)
```

Kết quả: cùng một ảnh pizza/steak nhưng mỗi lần ra một kiểu — có ảnh bị **tối đi**, ảnh bị **đổi màu**, ảnh bị **cắt lệch (shift)**. Có ảnh bị biến đổi mạnh nhưng **vẫn là steak** — và đó chính là điều ta muốn model học được: nhận ra món ăn dù ảnh đã bị làm nhiễu.

### 🤔 Dùng augmentation nào cho dữ liệu của mình?

Câu hỏi "nên dùng transform nào" cũng khó như "nên dùng model nào" — không có một đáp án duy nhất. Lời khuyên của mình: **thử vài cái, xem cái nào người khác dùng thành công** (như `TrivialAugmentWide` đội PyTorch dùng), thử trên bài toán của mình; hiệu quả thì giữ, không thì lập thí nghiệm khác. Mình cũng khuyên các bạn mở **illustration of transforms** và thử thay `TrivialAugmentWide` bằng một augmentation khác.

### ✅ Tạm kết

Data augmentation là cách "nhân bản" độ đa dạng dữ liệu một cách khéo léo, dựa rất nhiều vào randomness. Đã đủ lý thuyết và dữ liệu — giờ là lúc **build model đầu tiên** cho section này. Hẹn các bạn ở bài sau.
