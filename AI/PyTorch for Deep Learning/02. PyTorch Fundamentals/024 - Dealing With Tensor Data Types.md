---
title: 'Data type của tensor: float32, float16 và độ chính xác'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 24
status: edited
source: '024 - Dealing With Tensor Data Types.md'
categories:
- AI
tags: []
---

# 🏷️ Data type của tensor: float32, float16 và độ chính xác

> Nguồn: `024 - Dealing With Tensor Data Types.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656962)

Data type là một trong ba lỗi lớn nhất các bạn sẽ gặp khi làm PyTorch, nên mình dành hẳn bài này để nói kỹ. Cùng với đó là hai tham số quan trọng không kém khi tạo tensor: **`device`** và **`requires_grad`**.

### 🧾 Ba tham số quan trọng khi tạo tensor

```python
float_32_tensor = torch.tensor([3.0, 6.0, 9.0],
                               dtype=None,
                               device=None,
                               requires_grad=False)
```

* **`dtype`** — kiểu dữ liệu, ví dụ `torch.float32` hay `torch.float16`.
* **`device`** — tensor nằm trên thiết bị nào (CPU hay GPU).
* **`requires_grad`** — có để PyTorch theo dõi **gradient** của tensor qua các phép toán hay không.

Để `dtype=None` thì PyTorch vẫn cho ra **`torch.float32`**, vì đó là kiểu mặc định.

---

### 📊 Các data type phổ biến

Trong tài liệu `torch.tensor`, mục data types đứng ngay đầu — vì nó quan trọng:

| Data type | Ý nghĩa |
|---|---|
| `torch.float32` | 32-bit floating point (**single precision**) |
| `torch.float16` | 16-bit floating point (**half precision**) |
| `torch.float64` | 64-bit floating point |
| complex types | số phức 32/64/128-bit |

Thực tế các bạn chủ yếu gặp **float32** và **float16**.

---

### 🔬 "Precision" nghĩa là gì?

Trong khoa học máy tính, **precision** của một số là **mức độ chi tiết** mà số đó được biểu diễn, thường tính bằng **bit**.

* **float32** = 32 bit trong bộ nhớ → độ chính xác đơn (single precision).
* **float16** = 16 bit → độ chính xác nửa (half precision).
* **float64** = 64 bit → chính xác hơn nữa.

Vì sao không luôn dùng mặc định? Vì đôi khi bạn sẵn sàng **hy sinh độ chi tiết** để đổi lấy tốc độ: số ít bit hơn chiếm ít bộ nhớ hơn, nên tính toán nhanh hơn. Ngược lại, nếu cần chính xác hơn, có thể lên float64.

---

### 🚨 Ba lỗi lớn của PyTorch

Hãy nhớ ba cái này, các bạn sẽ gặp lại:

1. **Tensor sai data type** — ví dụ tính toán giữa tensor `float16` và `float32`.
2. **Tensor sai shape** — sẽ gặp rõ khi học matrix multiplication, nếu shape không khớp sẽ lỗi.
3. **Tensor sai device** — một tensor nằm trên GPU, một cái trên CPU mà đem tính với nhau thì PyTorch báo lỗi.

---

### 🔄 Đổi data type

Có hai cách tương đương:

```python
float_16_tensor = float_32_tensor.type(torch.float16)
float_16_tensor = float_32_tensor.half()
```

Kiểm tra lại:

```python
float_16_tensor.dtype
```

Kết quả: `torch.float16`. Vậy là đã sửa được lỗi "sai data type".

---

### 🖥️ `device` và `requires_grad`

* **`device`** mặc định là CPU. Trong Colab có thể chuyển tensor sang GPU bằng `"cuda"` — cách viết **device-agnostic code** sẽ học sau. Nguyên tắc: hai tensor phải **cùng device** mới tính toán được với nhau.
* **`requires_grad`** quyết định PyTorch có **theo dõi gradient** của tensor qua các phép tính hay không. Mặc định là `False`; phần autograd sẽ giải thích kỹ sau.

---

### 🎯 Bài tập

Hãy tạo vài tensor với data type khác nhau, rồi thử **nhân** một tensor `float16` với một tensor `float32` xem chuyện gì xảy ra. Đó là cách tốt nhất để ghi nhớ lỗi "sai data type".

Hẹn gặp các bạn ở bài sau!
