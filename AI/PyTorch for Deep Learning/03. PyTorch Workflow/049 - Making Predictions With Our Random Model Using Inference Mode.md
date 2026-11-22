---
title: 'Bài 49 — Dự đoán với model ngẫu nhiên bằng inference mode'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 49
status: edited
source: '049 - Making Predictions With Our Random Model Using Inference Mode.md'
categories:
- AI
tags: []
---

# 🎯 Dự đoán với model ngẫu nhiên bằng inference mode

> Nguồn: `049 - Making Predictions With Our Random Model Using Inference Mode.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699344)

Model đã có tham số ngẫu nhiên. Trước khi cải thiện chúng, hãy xem sức mạnh dự đoán hiện tại ra sao. Dự đoán là đưa feature vào, lấy label gần đúng ra — và PyTorch gọi việc này là **inference**.

### 🔥 Đưa test data qua model

```python
with torch.inference_mode():
    y_preds = model_0(X_test)
```

Khi gọi `model_0(X_test)`, PyTorch chạy dữ liệu qua **`forward`** mà mình đã định nghĩa. Model lý tưởng sẽ nhận `X_test` và trả về đúng `y_test`. Model hiện tại thì mới có tham số ngẫu nhiên, nên kết quả sẽ rất tệ — cứ xem đã.

---

### 🐛 Lỗi "not implemented" và chuyện thụt lề

Lần đầu chạy có thể gặp lỗi `NotImplementedError`. Với mình đây là lỗi gặp khá thường xuyên trong Colab khi viết model. Nguyên nhân: hàm `forward` bị **thụt lề lệch** so với ngoặc của class — nhìn bằng mắt rất dễ bỏ qua.

Cách sửa: bật line numbers và indent guides trong `Tools → Settings → Editor`, bôi đen đoạn lỗi, bấm `Shift + Tab` để đưa về đúng hàng. Điều oái oăm là lúc sửa xong, cell không đổi output, nhưng khi chạy cell dưới thì lại hoạt động. Đây là một trong những lỗi phổ biến nhất khi viết PyTorch trong Colab.

---

### 📉 Kết quả: dự đoán "như ngẫu nhiên"

```python
y_preds
```

Các giá trị `y_preds` khác xa `y_test`. Vẽ lên bằng hàm `plot_predictions` (truyền `predictions=y_preds`), chấm đỏ nằm lệch hẳn về một phía so với chấm xanh lá. Đúng như dự đoán: model khởi tạo ngẫu nhiên thì dự đoán cũng gần như ngẫu nhiên. Mục tiêu tiếp theo là viết code đẩy chấm đỏ về phía chấm xanh lá.

---

### 🧠 `torch.inference_mode()` là gì?

Đây là **context manager** dùng khi suy luận. Thử bỏ nó đi và so sánh:

```python
y_preds = model_0(X_test)
```

Bạn sẽ thấy thuộc tính `.grad_fn` xuất hiện trên tensor kết quả. Vì sao? Vì khi `requires_grad=True`, PyTorch theo dõi gradient để phục vụ gradient descent/backpropagation.

`torch.inference_mode()` **tắt việc theo dõi gradient**. Khi inference, mình không train nên không cần biết cách cập nhật model. Lợi ích: PyTorch lưu ít dữ liệu hơn, dự đoán nhanh hơn — với dataset nhỏ chưa rõ, nhưng với dữ liệu lớn thì khác biệt đáng kể.

---

### ⚙️ `torch.no_grad()` — cách cũ

Mã PyTorch cũ thường dùng `torch.no_grad()`:

```python
with torch.no_grad():
    y_preds = model_0(X_test)
```

Nó làm việc tương tự, nhưng theo tài liệu và cả thread giới thiệu của PyTorch, **`inference_mode()` là cách được ưu tiên hiện nay** cho inference.

---

### ✅ Tạm kết

Nhớ quy tắc: khi dự đoán, dùng context manager `torch.inference_mode()`. Hiện tại model dự đoán tệ vì tham số còn ngẫu nhiên, nhưng chấm đỏ chưa đến mức tán loạn khắp nơi. Bài sau mình bắt đầu viết code training để kéo các giá trị đó lại gần chấm xanh lá.
