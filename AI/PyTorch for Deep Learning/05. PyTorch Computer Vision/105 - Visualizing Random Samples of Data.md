---
title: 'Bài 105 — Trực quan hóa các mẫu dữ liệu ngẫu nhiên'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 105
status: edited
source: '105 - Visualizing Random Samples of Data.md'
categories:
- AI
tags: []
---

# 🖼️ Trực quan hóa các mẫu dữ liệu ngẫu nhiên

> Nguồn: `105 - Visualizing Random Samples of Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920314)

Nhìn 60.000 tensor thì không hiểu gì đâu. Khẩu hiệu của dân khám phá dữ liệu là **visualize, visualize, visualize**, nên bài này mình sẽ vẽ ra một lưới ảnh ngẫu nhiên từ dataset — và quan trọng hơn, rút ra vài nhận xét về chính dữ liệu.

### 🎲 Lấy index ngẫu nhiên

```python
import torch

torch.manual_seed(42)
random_idx = torch.randint(0, len(train_data), size=[1]).item()
print(random_idx)
```

`torch.randint(low, high, size)` trả về số nguyên ngẫu nhiên trong khoảng `[0, len(train_data))`. Vì `manual_seed` đã set, chạy lại sẽ ra cùng một dãy index (ví dụ `37542`, `37542`) — tiện để tái lập kết quả. Bỏ seed đi thì mỗi lần mỗi khác.

Đây là pattern dùng được cho mọi loại dữ liệu: ảnh, text, audio… miễn là có index để lấy mẫu.

---

### 🧱 Dựng lưới ảnh

Mình đặt số hàng/cột trước, rồi lặp để vẽ từng ảnh:

```python
rows, cols = 4, 4

fig = plt.figure(figsize=(9, 9))
for i in range(1, rows * cols + 1):
    random_idx = torch.randint(0, len(train_data), size=[1]).item()
    image, label = train_data[random_idx]

    fig.add_subplot(rows, cols, i)
    plt.imshow(image.squeeze(), cmap="gray")
    plt.title(class_names[label])
    plt.axis(False)
```

Ba chi tiết đáng nói:

* **`.squeeze()`** bỏ chiều color channel cỡ 1 (`[1, 28, 28]` → `[28, 28]`). Không bỏ thì `imshow` sẽ lỗi/clutter — một trong những lỗi shape quen thuộc.
* **`cmap="gray"`** để ảnh xám hiển thị đúng tông xám.
* **`plt.axis(False)`** tắt trục tọa độ cho gọn hình.

Lần đầu thường phải chỉnh qua chỉnh lại mới ra hình ưng ý — chuyện bình thường.

---

### 👗 Nhìn ảnh thì thấy gì?

Lần chạy đầu tiên ra ankle boot, shirt, bag, ankle boot, sandal, shirt, pullover… và có hai điều đáng chú ý ngay:

* **Pullover và shirt** trông khá giống nhau.
* Có tới **ba lớp na ná nhau**: `T-shirt/top`, `Shirt`, và nhìn có ảnh còn giống dress.

Khi bỏ seed và lấy mẫu mới, mình tiếp tục thấy sandal, ankle boot, coat, t-shirt/top, shirt. Câu hỏi đặt ra: *t-shirt với shirt khác nhau chỗ nào?* Người như mình nhìn còn lúng túng thì model rất dễ lúng túng theo.

Một ảnh bag trông chỉ là hình chữ nhật méo mó; có ảnh gần như chẳng có chi tiết gì.

---

### 🧠 Bài học rút ra

Nếu **bạn** nhầm giữa các mẫu và nhãn của chúng, **model của bạn** cũng sẽ nhầm. Những quan sát này sẽ được kiểm chứng bằng confusion matrix ở cuối section.

Câu hỏi khác: có viết được chương trình rule-based để phân loại không? Kiểu "nếu là hình chữ nhật có cái khóa ở giữa thì là bag"? Có thể, sau một hồi vật lộn. Nhưng mình thích viết machine learning algorithm để nó tự tìm pattern hơn.

---

### ✅ Tạm kết

Đã thấy dữ liệu thật sự trông thế nào, và đã có linh cảm về những lớp dễ gây nhầm lẫn. Bước tiếp theo: chuẩn bị dữ liệu để nạp vào model — bắt đầu bằng khái niệm **DataLoader** và **mini-batch**. Hẹn các bạn ở bài sau.
