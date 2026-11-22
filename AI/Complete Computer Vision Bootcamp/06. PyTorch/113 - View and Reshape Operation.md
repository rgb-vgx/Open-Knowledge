---
title: 'Bài 113 — view và reshape trong PyTorch: khác nhau ở đâu'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 113
status: edited
source: '113 - View and Reshape Operation.md'
categories:
- AI
tags: []
---

# 🔀 view vs reshape: hiểu đúng chuyện "contiguous" trong PyTorch

> Nguồn: `113 - View and Reshape Operation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482251)

Chào các bạn! `view` và `reshape` đều đổi shape của tensor, nhưng chúng cư xử với bộ nhớ khác nhau. Hiểu được **tensor có contiguous hay không** là chìa khóa để biết khi nào dùng cái nào — và bài này mình sẽ làm rõ điều đó bằng cả lý thuyết lẫn code.

### 🎯 Hai cách đổi shape, một khác biệt cốt lõi

Cả `view` và `reshape` đều biến tensor sang shape mới trong khi **giữ nguyên dữ liệu**. Điểm khác nhau nằm ở cách chúng đối xử với cấu trúc bộ nhớ bên dưới:

* **`view`** chỉ hoạt động khi tensor được lưu **liên tục (contiguous)** trong bộ nhớ.
* **`reshape`** xử lý được cả tensor không liên tục, bằng cách tạo một bản sao mới nếu cần.

Vì vậy `reshape` linh hoạt hơn, còn `view` bị ràng buộc vào dữ liệu contiguous — nhưng đổi lại `view` nhanh hơn trên dữ liệu phù hợp.

---

### 📦 Contiguous là gì?

Hãy tưởng tượng một tensor shape **2 × 3** gồm 6 phần tử. PyTorch lưu nó trong bộ nhớ dưới dạng một **mảng phẳng**, đọc từ trái sang phải, từng hàng một — gọi là **row major order**:

```text
Bộ nhớ:  [ 1  2  3  4  5  6 ]
Tensor:  [[1, 2, 3],
          [4, 5, 6]]
```

Tensor được gọi là **contiguous** khi cấu trúc lưới ánh xạ **trực tiếp** sang vùng nhớ phẳng theo thứ tự row major. Mỗi giá trị trong lưới nằm đúng vị trí tuần tự của nó trong bộ nhớ — đọc là ra ngay.

---

### 🔁 Transpose làm mất tính contiguous

Giờ lấy tensor 2 × 3 ở trên và **transpose**. Kết quả là tensor 3 × 2:

```text
[[1, 4],
 [2, 5],
 [3, 6]]
```

Nhìn thì dữ liệu "đổi chỗ", nhưng trong bộ nhớ PyTorch **vẫn lưu `1, 2, 3, 4, 5, 6` theo đúng thứ tự cũ**. Vấn đề là giờ nó phải *diễn giải* dữ liệu theo kiểu khác: để lấy phần tử ở hàng 0, cột 1 (giá trị `4`), nó phải nhảy sang một chỉ số khác trong bộ nhớ thay vì đọc tuần tự.

Định nghĩa gọn lại:

> **Non-contiguous**: dữ liệu trong bộ nhớ vẫn y nguyên, nhưng **cách truy cập (access pattern) đã thay đổi**.

Chính việc phải **đánh chỉ số (indexing)** thêm này khiến thao tác trên tensor non-contiguous **tốn kém hơn** về tính toán.

---

### ⚙️ Khi nào dùng view, khi nào dùng reshape?

| | `view` | `reshape` |
|---|---|---|
| Dữ liệu contiguous | ✅ Chạy, nhanh | ✅ Chạy |
| Dữ liệu non-contiguous | ❌ Báo lỗi | ✅ Tự tạo bản sao contiguous rồi chạy |
| Hiệu năng | Cao (truy cập tuần tự) | Có thể thấp hơn nếu phải copy |
| Mức linh hoạt | Thấp, "strict" | Cao |

* Dùng **`view`** khi bạn **chắc chắn** tensor đang contiguous và cần thao tác hiệu quả.
* Dùng **`reshape`** khi bạn **không chắc** về tính contiguous hoặc cần một lựa chọn bền vững, linh hoạt hơn.

Cơ chế của `reshape` rất rõ: nếu nhận dữ liệu non-contiguous, nó **tạo một bản sao contiguous** rồi mới reshape; nếu dữ liệu vốn đã contiguous thì nó reshape thẳng, không copy.

---

### 🧪 Thực hành trên Colab

Đầu tiên tạo tensor 12 phần tử và thử cả hai cách đổi sang 2 × 6:

```python
import torch

tensor = torch.arange(0, 12)

reshaped_view = tensor.view(2, 6)
reshaped = tensor.reshape(2, 6)

print(reshaped_view)
print(reshaped)
print(reshaped.shape)          # torch.Size([2, 6])
print(tensor.is_contiguous())  # True
```

Kết quả hai cách **giống hệt nhau** — cả hai đều sắp lại dữ liệu thành 2 × 6. Hàm `is_contiguous()` cho biết tensor gốc có liên tục hay không; nếu không, `view` sẽ ném lỗi còn `reshape` sẽ tự copy.

**Dùng `-1` để PyTorch tự suy ra chiều còn thiếu:**

```python
inferred = tensor.view(3, -1)
print(inferred.shape)  # torch.Size([3, 4])
```

Khi bạn nói "tôi muốn 3 hàng nhưng không biết bao nhiêu cột", hãy ghi `-1` — PyTorch tự tính chiều còn lại dựa trên số phần tử.

**Flatten tensor 3D thành vector** (bước rất hay gặp trước khi đưa vào CNN):

```python
tensor_3d = torch.arange(24).reshape(2, 3, 4)
flattened = tensor_3d.view(-1)
print(flattened.shape)          # torch.Size([24])
print(flattened.is_contiguous())  # True
```

**Giờ thử phá tính contiguous bằng transpose:**

```python
tensor_2d = torch.arange(24).reshape(12, 2)
transpose_tensor = tensor_2d.transpose(0, 1)
print(transpose_tensor.is_contiguous())  # False

# view sẽ lỗi: "view size is not compatible with input tensor's size and stride"
reshaped = transpose_tensor.reshape(6, 4)   # reshape thì chạy được
```

Muốn dùng `view` trên dữ liệu non-contiguous, hãy "ép" nó về contiguous trước bằng `.contiguous()`:

```python
contiguous_tensor = transpose_tensor.contiguous()
result = contiguous_tensor.view(6, 4)
```

---

### ✅ Chốt lại

`view` là lựa chọn **nhanh nhưng khắt khe** — chỉ chạy trên dữ liệu contiguous. `reshape` là lựa chọn **linh hoạt** — tự copy khi cần. Còn `.contiguous()` là cây cầu nối hai thế giới đó. Nắm được ba thứ này, các bạn sẽ tránh được những lỗi shape khó hiểu khi làm việc với tensor. Hẹn gặp ở bài tiếp theo, nơi mình bàn về **stack** — ghép nhiều tensor lại với nhau.
