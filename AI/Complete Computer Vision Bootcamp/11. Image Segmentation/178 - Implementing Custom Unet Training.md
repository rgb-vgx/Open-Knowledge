---
title: 'Bài 178 — Train U-Net bằng PyTorch từ A đến Z'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 178
status: edited
source: '178 - Implementing Custom Unet Training.md'
categories:
- AI
tags: []
---
# 🏋️ Custom U-Net: dataset, kiến trúc và training loop

> Nguồn: `178 - Implementing Custom Unet Training.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49231431)

Chào các bạn! Bài này mình cài đặt **U-Net từ đầu** và train trên dataset segmentation người, gồm custom **Dataset/DataLoader**, kiến trúc **double conv + downsample + upsample**, loss **Dice + BCE**, vòng train và inference. Đây là bài thực hành nặng nhất module.

### 📥 Dataset

Mình dùng bộ **human segmentation** trên GitHub (tác giả Vikram Shenoy) — bài toán **semantic segmentation** một class `person`. Ảnh trong `training_images/` (`.jpg`), mask trong `ground_truth/` (`.png`): người **trắng**, nền **đen**. Mask được tạo bằng API xoá nền nên còn nhiễu. Mình **clone repo** vào Colab (runtime **T4 GPU**) thay vì tải ZIP.

---

### 🗂️ Custom Dataset

```python
class SegmentationDataset(Dataset):
    def __init__(self, image_dir, mask_dir):
        self.image_dir, self.mask_dir = image_dir, mask_dir
        self.transform = transforms.Compose([
            transforms.Resize((512, 512)),
            transforms.ToTensor(),
        ])
        valid_ext = (".jpg", ".jpeg", ".png")
        self.images = [f for f in os.listdir(image_dir)
                       if os.path.splitext(f)[1].lower() in valid_ext]

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        name, _ = os.path.splitext(self.images[idx])
        image = Image.open(os.path.join(self.image_dir, self.images[idx])).convert("RGB")
        mask  = Image.open(os.path.join(self.mask_dir, name + ".png")).convert("L")
        image, mask = self.transform(image), self.transform(mask)
        mask = (mask > 0.5).float()   # nhị phân hoá mask
        return image, mask
```

Điểm cần chú ý:

* Ghép **ảnh ↔ mask theo tên file**: `one.jpg` ứng với `one.png`.
* Mask đọc ở chế độ **`L`** (một channel), không phải RGB.
* Sau `ToTensor`, giá trị về `[0,1]`; dùng **`> 0.5`** để ép về mask nhị phân sạch (tránh đen không thuần).

`DataLoader` bọc dataset, mặc định `batch_size=2`, `shuffle=True`.

---

### 🧱 Kiến trúc U-Net

**DoubleConv** — hai block `Conv2d(3×3, padding=1) + ReLU`:

```python
class DoubleConv(nn.Module):
    def __init__(self, in_c, out_c):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_c, out_c, 3, padding=1), nn.ReLU(inplace=True),
            nn.Conv2d(out_c, out_c, 3, padding=1), nn.ReLU(inplace=True),
        )
    def forward(self, x): return self.conv(x)
```

**DownSample** — DoubleConv + `MaxPool2d(2, stride=2)`, trả về **cả** feature trước pooling (`down`) để lát nữa nối skip, **và** feature sau pooling (`p`).

**UpSample** — `ConvTranspose2d(in_c, in_c//2, kernel_size=2, stride=2)` + DoubleConv; `forward(x1, x2)` upsample `x1`, **`torch.cat`** với `x2` (skip từ encoder), rồi double conv.

**U-Net** ghép các khối theo mẫu channel:

```text
encoder: 3→64 → 64→128 → 128→256 → 256→512
bottleneck: 512→1024
decoder: 1024→512 → 512→256 → 256→128 → 128→64
out: Conv2d(64, num_classes, kernel_size=1)
```

Forward: `down1..down4` giữ lại feature skip; `b = bottleneck(p4)`; rồi `up1(b, down4)`, `up2(up1, down3)`, `up3(up2, down2)`, `up4(up3, down1)`, cuối cùng `out(up4)`.

---

### 🎯 Loss: Dice + BCE

```python
class DiceLoss(nn.Module):
    def __init__(self, smooth=1e-6):
        super().__init__(); self.smooth = smooth
    def forward(self, inputs, targets):
        inputs, targets = inputs.view(-1), targets.view(-1)
        inter = (inputs * targets).sum()
        dice = (2*inter + self.smooth) / (inputs.sum() + targets.sum() + self.smooth)
        return 1 - dice
```

Loss tổng hợp dùng **`BCEWithLogitsLoss`** (ổn định hơn BCE thường vì đã gồm sigmoid) cộng Dice:

```python
return 0.5 * bce_loss + dice_loss
```

Transcript đặt **BCE chỉ bằng nửa Dice** để ưu tiên vùng giao pixel — đúng tinh thần segmentation. Có thể chỉnh trọng số tuỳ bài.

---

### 🔁 Training loop

1. Chọn `device = cuda` nếu có.
2. Nếu có `load_path` và file tồn tại → `model.load_state_dict(torch.load(path, map_location=device))`; nếu không, train từ đầu.
3. `criterion = BCEWithLogitsDiceLoss()`; optimizer **SGD** (có thể dùng **Adam**), `lr=0.001`.
4. Mỗi epoch: `model.train()`, duyệt DataLoader, `optimizer.zero_grad()` → forward → loss → `backward()` → `step()`.
5. In loss trung bình; lưu model mỗi 10 epoch và lưu `model_final.pt` khi xong.

Với batch size 8 trên T4, mỗi epoch mất khoảng **1 phút 15 giây**.

---

### 🔮 Inference

Hàm `predict(model_path, image_path)`: load model, `eval()`, transform ảnh, forward, áp **sigmoid**, rồi **threshold 0.4** để tạo mask trắng/đen, lưu ra file. Model train 2 epoch gần như chưa học gì; model đã train **hơn 80 epoch** cho kết quả tốt, thời gian inference khoảng **0.18 giây/ảnh** (tiền xử lý 0.01s, inference 0.06s, hậu xử lý 0.10s).

---
### ✅ Tóm lại

Pipeline hoàn chỉnh: Dataset đọc ảnh+mask theo tên → U-Net (double conv, down/up với skip concat) → loss Dice + BCE → train loop có checkpoint → inference threshold mask. Chất lượng phụ thuộc số epoch và độ sạch dataset. Hẹn gặp ở bài **Mask R-CNN**!
