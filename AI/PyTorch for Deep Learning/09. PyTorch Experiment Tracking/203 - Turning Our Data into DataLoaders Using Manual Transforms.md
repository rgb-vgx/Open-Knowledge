---
title: 'Biến dữ liệu thành DataLoader với transform thủ công'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 203
status: edited
source: '203 - Turning Our Data into DataLoaders Using Manual Transforms.md'
categories:
- AI
tags: []
---

# 🖼️ Biến dữ liệu thành DataLoader với transform thủ công

> Nguồn: `203 - Turning Our Data into DataLoaders Using Manual Transforms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33081400)

Bài trước ta đã tải được ảnh pizza, steak, sushi và mình giao thử thách biến chúng thành **DataLoader**. Với torchvision 0.13+, có hai cách làm transform: **thủ công** hoặc **tự động** (theo model weights). Bài này ta đi cách thủ công trước.

### 🎯 Mục tiêu của transform

Mình viết ra một câu quan trọng:

> Mục tiêu của transform là đảm bảo dữ liệu custom của bạn được định dạng **reproducible** và **phù hợp với pretrained model**.

Nếu dùng dữ liệu riêng với một model đã pretrain (thị giác hay NLP đều vậy), phải format dữ liệu **giống cách model được train**. Nếu không, hiệu năng sẽ bị giảm so với kết quả mà model pretrained đáng lẽ đạt được.

---

### 📂 Chuẩn bị đường dẫn train/test

```python
train_dir = image_path / "train"
test_dir  = image_path / "test"
```

`image_path` là đường dẫn ta có được từ hàm `download_data` ở bài trước. Ta dùng lại model transfer learning vì nó chạy tốt ở section trước.

---

### 📐 Vì sao chuẩn hóa theo ImageNet?

Phần lớn model pretrained trong torchvision được train trên **ImageNet**, và tất cả đều kỳ vọng ảnh đầu vào được chuẩn hóa **cùng một cách**. Mình mở tài liệu torchvision (mục *Models and pre-trained weights*), chú ý phiên bản 0.13 trở lên có phần quan trọng về transform. Từ 0.13 còn có cách tự động tạo transform — nhưng ta xem cách thủ công trước để hiểu bản chất.

Cách thủ công linh hoạt hơn, đổi lại có rủi ro transform ảnh **sai** nếu tự làm không chuẩn.

---

### 🔧 Dựng pipeline transform

Copy phần normalize từ tài liệu — nó bảo đảm ảnh có cùng **mean và std** với model pretrained (tức cùng phân phối dữ liệu ImageNet):

```python
from torchvision import transforms

# Thiết lập mức chuẩn hóa ImageNet
normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])

manual_transforms = transforms.Compose([
    transforms.Resize((224, 224)),  # resize về 224x224
    transforms.ToTensor(),          # đưa ảnh về khoảng [0, 1]
    normalize,                      # chuẩn hóa theo ImageNet
])
```

Giải thích cho khớp tài liệu: ảnh cần chiều cao/rộng tối thiểu **224**, đưa pixel về khoảng **0-1**, rồi normalize bằng các giá trị mean/std ImageNet ở trên. In ra `manual_transforms` để xem pipeline. Nếu muốn thêm **data augmentation** thì chèn thêm bước vào đây — đó là lợi thế của việc tự tạo pipeline.

---

### 🔁 Tạo DataLoader bằng code going modular

Đây là sức mạnh của việc tái dùng code: file `data_setup.py` đã có sẵn hàm `create_dataloaders`, dùng `ImageFolder` của `torchvision.datasets` để tạo dataset rồi trả về train/test DataLoader:

```python
from going_modular import data_setup

train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=manual_transforms,
    batch_size=32)
```

Nó áp **cùng một transform** cho cả train và test.

> **Gợi ý cải tiến:** thêm tham số `test_transform` để train/test dùng transform khác nhau (ví dụ test transform là một `transforms.Compose` riêng). Hiện tại dùng chung vẫn ổn.

Kết quả in ra train/test DataLoader và `class_names` — chính là `['pizza', 'steak', 'sushi']`. Đó là pipeline transform thủ công ta vừa tạo.

---

### ✅ Tạm kết

Ta đã so sánh được bản thủ công với bản tự động sẽ làm ngay sau đây. Thử thách cho bạn: vì sắp chạy nhiều experiment với **EfficientNet-B0**, hãy tự tạo **automatic transform** giống hệt cách đã làm ở section 6.2, nhưng cho notebook này. Bài sau mình làm cùng các bạn. Hẹn gặp!
