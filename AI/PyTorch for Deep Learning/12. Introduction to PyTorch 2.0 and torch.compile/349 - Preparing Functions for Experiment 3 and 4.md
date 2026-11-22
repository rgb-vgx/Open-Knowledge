---
title: 'Bài 349 — Ba hàm chuẩn bị cho Experiment 3 và 4'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 349
status: edited
source: '349 - Preparing Functions for Experiment 3 and 4.md'
categories:
- AI
tags: []
---

# 🧰 Compile một lần, train nhiều lần

> Nguồn: `349 - Preparing Functions for Experiment 3 and 4.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745250)

Đã lưu xong kết quả single run. Giờ chuẩn bị cho **Experiment 3 và 4** (multi-run). Trước khi chạy, mình gói code thành **ba hàm**. Lý do quan trọng nhất: với model compile, ta chỉ muốn **compile một lần** rồi train nhiều lần.

### 💡 Vì sao chỉ compile một lần?

Như đã thấy ở single run: phần lớn thời gian của model compile nằm ở **epoch đầu**, khi PyTorch tối ưu (graph capture, fusion) sau hậu trường. Ví dụ trong lần chạy minh họa: epoch đầu **118 giây**, epoch sau chỉ khoảng **60 giây** — giảm còn một nửa.

Nếu compile lại cho mỗi run, ta trả lại cái phí đó mỗi lần. Thực hành tốt: **compile một lần ở đầu**, dùng lại cho nhiều lần train — và cả khi deploy (compile trước, chạy vài mẫu để model "warm up").

### 1️⃣ `create_and_train_non_compiled_model`

Gói trọn Experiment 1 vào một hàm. Nó:

* Gọi `create_model` (không cần transforms).
* Đưa model lên `device`.
* `loss_fn = torch.nn.CrossEntropyLoss()`, `optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)`.
* Gọi hàm `train` với train/test dataloader, loss, optimizer, `epochs`, `device`, `disable_progress_bar`.
* Trả về kết quả.

```python
def create_and_train_non_compiled_model(epochs=num_epochs, disable_progress_bar=False):
    model, _ = create_model()
    model = model.to(device)
    loss_fn = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

    results = train(
        model=model,
        train_dataloader=train_dataloader,
        test_dataloader=test_dataloader,
        loss_fn=loss_fn,
        optimizer=optimizer,
        epochs=epochs,
        device=device,
        disable_progress_bar=disable_progress_bar,
    )
    return results
```

`disable_progress_bar` mặc định `False`, nhưng ta sẽ bật khi chạy multi-run để khỏi quá rối màn hình.

### 2️⃣ `create_compiled_model`

Chỉ tạo và compile model, **không train** — để tái dùng cho nhiều run:

```python
import time

def create_compiled_model():
    """Tạo một PyTorch model đã compile (tính năng mới của PyTorch 2.0)."""
    model, _ = create_model()
    model = model.to(device)

    compile_start_time = time.time()
    compiled_model = torch.compile(model)
    compile_end_time = time.time()
    compile_time = compile_end_time - compile_start_time
    print(f"Model compile time: {compile_time:.3f}s")
    return compiled_model
```

> Lần này nhất định viết đúng `compiled_model` — bài học một chữ cái vẫn còn đó.

### 3️⃣ `train_compiled_model`

Nhận vào **một compiled model có sẵn** và train một lần (rồi ta đem hàm này bỏ vào vòng lặp):

```python
def train_compiled_model(model, epochs=num_epochs, disable_progress_bar=False):
    loss_fn = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

    results = train(
        model=model,
        train_dataloader=train_dataloader,
        test_dataloader=test_dataloader,
        loss_fn=loss_fn,
        optimizer=optimizer,
        epochs=epochs,
        device=device,
        disable_progress_bar=disable_progress_bar,
    )
    return results
```

**Lưu ý lớn**: hàm này **không** tạo compiled model. Model đã được compile từ trước — ta chỉ train. Mỗi giây PyTorch dành cho việc tối ưu, nếu chỉ phải trả **một lần** thay vì nhiều lần, là đã "lời" rồi.

### 🍲 Vài chuyện bên lề

* "Gravy" chỉ là tiếng lóng kiểu Úc của mình, nghĩa là "tốt, ngon".
* "If in doubt, write the code. If in doubt, run the code" — câu cửa miệng của mình.

### 🔜 Ghép vào vòng lặp

Có ba hàm + baseline + slide multi-run rồi, các bạn đã có thể bỏ chúng vào một `for` loop và lưu kết quả từng run vào list. Nếu làm được thì cứ chạy Experiment 3 và 4 trước — video sau ta làm cùng.
