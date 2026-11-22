---
title: 'Baseline model (phần 3): forward pass để kiểm tra shape'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 154
status: edited
source: '154 - Building a Baseline Model (Part 3)-Doing a Forward Pass to Test Our Mo.md'
categories:
- AI
tags: []
---

# ✅ Baseline model (phần 3): forward pass để kiểm tra shape

> Nguồn: `154 - Building a Baseline Model (Part 3)-Doing a Forward Pass to Test Our Mo.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32741770)

Một trong những cách mình thích nhất để kiểm tra model: đẩy một batch **dummy data** qua `forward` và xem shape. Bài này ta sẽ gặp **hai** lỗi liên tiếp — device mismatch rồi shape mismatch — sửa từng cái, và cuối cùng làm cho TinyVGG khớp đúng với CNN Explainer.

### 🖼️ Lấy một batch ảnh

```python
image_batch, label_batch = next(iter(train_dataloader_simple))
image_batch.shape, label_batch.shape
```

Batch có shape kiểu `[32, 3, 64, 64]`, label `[32]`.

### ⚠️ Lỗi 1: device mismatch

```python
model_0(image_batch)
```

Báo lỗi kiểu **"Input type torch.FloatTensor and weight type torch.cuda.FloatTensor should be the same device"**. Nghĩa là `image_batch` đang ở **CPU**, còn model ở **CUDA**. Sửa bằng cách đưa batch lên đúng device:

```python
model_0(image_batch.to(device))
```

### ⚠️ Lỗi 2: shape mismatch ở lớp Linear

Lần chạy tiếp theo báo **"mat1 and mat2 shapes cannot be multiplied (32x2560 and 10x3)"**. Đọc kỹ: lớp Linear đang nhận **2560** feature nhưng `in_features` lại khai báo **10** (số hidden units). Ta cần hai số khớp nhau.

Mẹo của mình: **nhìn layer trước**. Output của `conv_block_2` in ra shape `[32, 10, 16, 16]`. Vậy sau `Flatten`, vector có kích thước `10 × 16 × 16 = 2560`. Sửa `in_features`:

```python
nn.Linear(in_features=2560, out_features=output_shape)
# viết dưới dạng: hidden_units * 16 * 16
```

Chạy lại: model không còn lỗi, output shape `[32, 3]` — 32 mẫu, mỗi mẫu **3 điểm số** khớp 3 lớp. Vì chưa train nên các con số chỉ là **ngẫu nhiên**.

### 🎯 Khớp đúng với CNN Explainer

CNN Explainer cho output của block 1 là `30×30×10`, còn ta đang ra `32×32×10`. Nguyên nhân: **padding**. Bản CNN Explainer **không** dùng padding. Đổi `padding` từ `1` về `0` ở các lớp conv:

* Output block 1 → `30×30×10` (khớp).
* Output block 2 → `13×13×10` (khớp).

Đổi padding kéo theo shape thay đổi, nên lại có shape error — phải cập nhật `in_features`:

```python
nn.Linear(in_features=10 * 13 * 13,  # = 1690
          out_features=output_shape)
```

Chạy lại là chạy được. Vậy ta đã **chính thức tái tạo** TinyVGG của CNN Explainer.

### 💡 Bài học về shape

Có thể tính shape bằng công thức conv/pool, nhưng mình thích **để lỗi tự chỉ đường** — cứ để `in_features` sai, đọc shape ở output các block, nhân lại rồi sửa. Shape error xuất hiện **liên tục** khi làm model, kể cả người có kinh nghiệm.

### ✅ Tạm kết

Model đã chạy được một forward pass — dữ liệu chảy qua đúng. Để xem gọn hơn input/output từng lớp, có một package tên **`torchinfo`** (dùng `torchinfo.summary`) in ra bảng tóm tắt rất đẹp. Mình để các bạn thử cài và chạy trước; bài sau làm cùng.
