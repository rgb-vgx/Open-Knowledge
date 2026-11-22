---
title: 'Sửa train function để theo dõi nhiều experiment'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 210
status: edited
source: '210 - Adapting Our Train Function to Be Able to Track Multiple Experiments.md'
categories:
- AI
tags: []
---

# ⚙️ Sửa train function để theo dõi nhiều experiment

> Nguồn: `210 - Adapting Our Train Function to Be Able to Track Multiple Experiments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33111818)

How'd you go? Bạn đã sửa `train` function để dùng `create_writer` chưa? Có một điểm dễ nhầm: `train` **không nhất thiết phải gọi trực tiếp** `create_writer` — nó chỉ cần **có quyền dùng** writer được truyền vào. Cùng xem nhé.

### ✍️ Thêm tham số `writer`

Ta đang import `train_step`, `test_step` từ `engine.py` và copy nguyên `train` function vào notebook để sửa. Phần tracking hiện tại ghi scalar loss/accuracy, ghi model graph rồi `close()`. Chỉ cần chỉnh nhẹ: thêm tham số `writer`.

```python
def train(model, train_dataloader, test_dataloader,
          optimizer, loss_fn, epochs, device,
          writer: torch.utils.tensorboard.writer.SummaryWriter):
    ...
```

Mỗi lần gọi `train`, ta truyền vào một writer — có thể là writer được tạo programmatic từ `create_writer`.

---

### 🔀 Bọc phần tracking trong `if writer`

Phần ghi scalar và graph chỉ nên chạy **khi có writer**:

```python
if writer:
    writer.add_scalars(main_tag="Loss",
                       tag_scalar_dict={"train_loss": train_loss,
                                        "test_loss": test_loss},
                       global_step=epoch)
    writer.add_scalars(main_tag="Accuracy",
                       tag_scalar_dict={"train_acc": train_acc,
                                        "test_acc": test_acc},
                       global_step=epoch)
    writer.close()
else:
    pass
```

Nhớ thụt lề cho đúng (mình phải tab lại cho thẳng hàng). Nếu có writer thì track rồi đóng; nếu không thì bỏ qua, training vẫn chạy bình thường.

---

### 🎯 Ta đã "prime" cho loạt experiment

Giờ ta có thể truyền vào tham số `writer` một kết quả từ `create_writer` — tức đã sẵn sàng dựng một **series of modelling experiments**. Mỗi experiment một writer riêng.

---

### 🧪 Thử thách nhỏ

Nếu muốn nhảy trước, hãy thử **hai** experiment với EfficientNet-B0, cùng dữ liệu pizza/steak/sushi:

* Model 1: train **5 epoch**.
* Model 2: train **10 epoch**.

Gợi ý: tạo một list các giá trị epoch rồi for-loop gọi `train` hai lần. Đây chỉ là bài khởi động — video sau ta sẽ dựng hẳn một loạt experiment. Hẹn gặp!
