---
title: 'Bài 120 — Train CNN trên dataset ảnh tự tạo, từ kiến trúc đến inference'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 120
status: edited
source: '120 - CNN Training Using a Custom Dataset.md'
categories:
- AI
tags: []
---

# 🧠 Train CNN tự viết trên bộ ảnh cat/dog/person

> Nguồn: `120 - CNN Training Using a Custom Dataset.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093895)

Chào các bạn! Đây là bài dài và quan trọng nhất của module PyTorch: mình sẽ tự dựng **kiến trúc CNN**, train nó trên custom DataLoader ở bài trước, đánh giá độ chính xác, rồi viết **script inference** để đưa một tấm ảnh vào và nhận về nhãn. Toàn bộ làm trên bộ `classification_dataset_v3` với ba lớp **cat, dog, person**.

### 🔁 Ôn lại custom DataLoader

Mình giữ nguyên bộ khung đã dựng: `ImageDataset` kế thừa `Dataset`, có `__init__`, `__len__`, `__getitem__`; `DataLoader` bọc lại với `batch_size=32` và `shuffle=True`. Điểm khác biệt lần này là transform được bổ sung **`Normalize`**:

```python
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
])
```

`ToTensor()` đưa pixel về **[0, 1]**; `Normalize` với mean=std=0.5 đưa về **[-1, 1]**. Công thức là `(x - mean) / std`. Không normalize model vẫn học được, nhưng normalize giúp **hội tụ nhanh và chính xác hơn**. Các model ImageNet như **ResNet**, **VGG** dùng mean `[0.485, 0.456, 0.406]` và std `[0.229, 0.224, 0.225]` — mình không dùng vì không train trên ImageNet.

---

### 🏗️ Thiết kế kiến trúc CNN

Một khối convolution cơ bản gồm **convolution → batch normalization → ReLU → max pooling**. Mình xếp **4 khối** liên tiếp, số kênh tăng dần: **3 → 32 → 64 → 128 → 256**. Kernel `3×3`, stride 1, padding 1; max pooling `kernel_size=2, stride=2` (giảm một nửa kích thước). Sau đó **flatten** và nối vào các lớp fully connected.

```python
import torch.nn as nn

class CustomCNNModel(nn.Module):
    def __init__(self, input_dim=128, num_classes=3):
        super().__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(128), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(128, 256, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(256), nn.ReLU(), nn.MaxPool2d(2, 2),
        )
        self.linear = None
        self._compute_conv_output(input_dim)
        self.fc_layers = nn.Sequential(
            nn.Linear(self.linear, 512), nn.ReLU(),
            nn.Linear(512, 128), nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def _compute_conv_output(self, input_dim):
        with torch.no_grad():
            dummy = torch.zeros(1, 3, input_dim, input_dim)
            out = self.conv_layers(dummy)
            self.linear = out.view(1, -1).size(1)

    def forward(self, x):
        x = self.conv_layers(x)
        x = x.view(x.size(0), -1)
        return self.fc_layers(x)
```

Mấu chốt là **không biết trước số neuron sau flatten**. Mình truyền một tensor giả `torch.zeros(1, 3, 128, 128)` qua `conv_layers`, rồi `view(1, -1)` và đọc `size(1)` để lấy số đặc trưng — với cấu hình trên ra **16384** neuron. Đây là lý do phải cố định đầu vào `128×128` và dùng batch size (model luôn nhận ảnh theo batch, kể cả batch 1).

---

### ⚙️ Cấu hình device, loss, optimizer

Trước khi train, mình chọn thiết bị:

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = CustomCNNModel(input_dim=128, num_classes=3).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
```

`CrossEntropyLoss` đã tự gắn softmax nên mình không thêm softmax ở output. Dùng **Adam** với `lr=0.001`.

---

### 🔁 Vòng train với running loss

Vòng lặp lồng hai cấp: mỗi epoch duyệt hết các batch, và mỗi batch thực hiện `zero_grad → forward → loss → backward → step`. Mình cộng dồn một biến **`running_loss`** qua các batch rồi chia cho số batch để in loss trung bình mỗi epoch.

```python
num_epochs = 2
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch {epoch+1}/{num_epochs} — loss {running_loss/len(train_loader):.4f}")
```

Với 2 epoch trên **Tesla T4**, loss giảm từ khoảng **0.54** xuống **0.47**, mất hơn một phút. Model train 40 epoch được lưu lại sẵn trong resource.

---

### ✅ Đánh giá và lưu model

Đánh giá trên tập test: `model.eval()`, bọc `torch.no_grad()`, lấy `torch.max(outputs, 1)` để chọn lớp xác suất cao nhất, cộng số dự đoán đúng. Accuracy = `100 * correct / total`.

```python
model.eval()
correct = total = 0
with torch.no_grad():
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()
print(f"Test accuracy: {100 * correct / total:.2f}%")
```

Chỉ 2 epoch đã đạt **74.50%**. Muốn lưu lại thì dùng `torch.save(model.state_dict(), "cnn_model.pt")`.

---

### 🚀 Script inference cho một ảnh

Phần cuối rất thực tế: đóng gói thành class **ImageClassifier** nhận `model_path` và `class_map`. `__init__` dựng lại kiến trúc, `model.load_state_dict(torch.load(path, map_location=device))`, gọi `eval()`, và giữ **transform y hệt lúc train**.

Hàm `predict(image_path)` mở ảnh bằng PIL, `.convert("RGB")`, áp transform, `.unsqueeze(0)` thêm chiều batch, đưa lên device, chạy `torch.no_grad()` và lấy `torch.max(outputs, 1)`. Index trả về được tra qua `self.class_name` để ra nhãn chữ. Cuối cùng dùng OpenCV ghi nhãn lên ảnh:

```python
img = cv2.imread(image_path)
cv2.putText(img, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
cv2.imwrite("output_image.jpg", img)
```

Như vậy mình đã có pipeline đầy đủ từ **dữ liệu → kiến trúc → train → evaluate → inference**. Bài sau mình chuyển sang đóng gói model thành một ứng dụng web có giao diện.
