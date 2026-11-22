---
title: 'Dự đoán trên dữ liệu mới (phần 5): gộp tất cả vào một hàm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 169
status: edited
source: '169 - Predicting on Custom Data (Part 5)- Putting It All Together.md'
categories:
- AI
tags: []
---

# 🚀 Dự đoán trên dữ liệu mới (phần 5): gộp tất cả vào một hàm

> Nguồn: `169 - Predicting on Custom Data (Part 5)- Putting It All Together.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775618)

Đây là lời giải cho thử thách: gộp cả chục cell rải rác thành một hàm duy nhất **`pred_and_plot_image`**. Chỉ cần truyền đường dẫn ảnh, hàm sẽ đọc, xử lý, dự đoán và vẽ ảnh kèm nhãn — viết một lần, dùng cho mọi ảnh về sau.

### 🔥 Hàm `pred_and_plot_image`

```python
def pred_and_plot_image(model, image_path, class_names=None,
                        transform=None, device=device):
    """Makes a prediction on a target image with a trained model and plots the image and prediction."""
    # 1. Load ảnh, đổi sang float32
    target_image = torchvision.io.read_image(str(image_path)).type(torch.float32)

    # 2. Chuẩn hóa pixel về khoảng [0, 1]
    target_image = target_image / 255.0

    # 3. Transform nếu có
    if transform:
        target_image = transform(target_image)

    # 4. Đưa model lên đúng device
    model.to(device)

    model.eval()
    with torch.inference_mode():
        # Thêm chiều batch
        target_image = target_image.unsqueeze(dim=0)

        # Dự đoán (ra logit thô)
        target_image_pred = model(target_image.to(device))

    # 5. Logit -> probs -> label
    target_image_pred_probs = torch.softmax(target_image_pred, dim=1)
    target_image_pred_label = torch.argmax(target_image_pred_probs, dim=1)

    # 6. Vẽ ảnh
    plt.imshow(target_image.squeeze().permute(1, 2, 0).cpu())
    if class_names:
        title = f"Pred: {class_names[target_image_pred_label.cpu()]} | Prob: {target_image_pred_probs.max().cpu():.3f}"
    else:
        title = f"Pred: {target_image_pred_label} | Prob: {target_image_pred_probs.max().cpu():.3f}"
    plt.title(title)
    plt.axis(False)
```

---

### 🔍 Giải thích các bước

* **`read_image(str(image_path)).type(torch.float32)`** — đọc ảnh, ép dtype `float32`.
* **`/ 255.0`** — `read_image` trả pixel **0–255**, model cần **0–1**.
* **`if transform`** — transform tùy chọn (ở đây resize 64×64).
* **`unsqueeze(dim=0)`** — thêm **chiều batch** để thành `[1, 3, 64, 64]`.
* **`torch.softmax(...)`** rồi **`torch.argmax(...)`** — logit → xác suất → nhãn.
* **`.squeeze().permute(1, 2, 0).cpu()`** — bỏ batch, đổi channels-last, **đưa về CPU** để Matplotlib vẽ.
* **`.cpu()` trong title** — bắt buộc, vì Matplotlib **không** xử lý được tensor trên GPU. Đây chính là chỗ mình gặp lỗi "has no attribute CPU" do đặt sai ngoặc.

---

### 🍕 Chạy thử trên ảnh "Pizza Dad"

```python
pred_and_plot_image(
    model=model_1,
    image_path=custom_image_path,
    class_names=class_names,
    transform=custom_image_transform,
    device=device,
)
```

Kết quả: Model 1 dự đoán đúng **pizza** trên ảnh này. Nhưng như mình đã nói, model hiện tại chưa tốt nên đây có phần **may mắn**. Chạy thử với model khác (Model 0) trên cùng ảnh thì lại ra **steak** — sai, với xác suất chỉ `0.368`. Vậy là dù Model 1 kém hơn về mặt định lượng, nó lại đoán đúng hơn ở trường hợp định tính này.

Bài học: kết quả định lượng (accuracy) và **định tính** (nhìn ảnh thực tế) có thể khác nhau — lại là lý do phải *visualize*.

---

### ✅ Tạm kết

Vậy là ta đã đi trọn: từ ảnh thô → dự đoán → hiển thị. Hãy thử với **ảnh của chính mình**! Đến đây là đủ cho chủ đề custom dataset. Bài sau mình sẽ **tổng kết** và đưa ra bài tập cùng tài liệu mở rộng. Hẹn các bạn ở bài cuối section.
