---
title: 'Bài 079 — Phép convolution trong CNN'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 79
status: edited
source: '079 - Convolution Operatuin In CNN.md'
categories:
- AI
tags: []
---

# 🔲 Convolution: filter biến ảnh thành đặc trưng

> Nguồn: `079 - Convolution Operatuin In CNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979371)

Chào các bạn! Đây là phép toán đầu tiên của CNN: **convolution operation**. Ta đưa một **filter** trượt qua ảnh, nhân từng ô rồi cộng lại — kết quả là một ảnh mới đã "trích" ra thông tin như **cạnh** hay **đường**. Mình sẽ làm từng bước với ảnh grayscale 6×6.

### 🖼️ Chuẩn bị: ảnh và bước normalize

Lấy ảnh **6×6 grayscale** → kích thước `6 × 6 × 1`. Giả sử chỉ có hai giá trị: **0** (đen) và **255** (trắng), tạo thành một **cạnh dọc** ở giữa.

**Bước bắt buộc đầu tiên: normalize** — chia mọi pixel cho **255** để đưa về khoảng `0..1`. Việc này giúp các bước tiền xử lý sau nhanh và hiệu quả hơn.

```text
255 / 255 = 1        0 / 255 = 0
```

Sau normalize, ảnh chỉ còn `0` và `1`.

---

### 🧮 Convolution hoạt động thế nào

Dùng **filter 3×3**. Filter trượt qua ảnh, tại mỗi vị trí **nhân từng ô của filter với ô ảnh tương ứng rồi cộng tất cả** — ra một số, ghi vào output.

Ví dụ filter **vertical edge**:

```text
[-1,  0,  1]
[-2,  0,  2]
[-1,  0,  1]
```

Đặt filter lên góc trên-trái, nhân và cộng → `0`. **Stride = 1** nghĩa là mỗi lần dịch **1 ô sang phải**; hết hàng thì xuống hàng dưới, tiếp tục tới khi phủ hết ảnh.

Với ảnh ví dụ, output thu được có dạng:

```text
 0  -4  -4   0
 0  -4  -4   0
 0  -4  -4   0
 0  -4  -4   0
```

---

### 🔎 Đọc kết quả: filter đã làm gì

Nếu "denormalize" output về thang gốc để dễ hình dung: `0` (lớn nhất) thành trắng `255`, `-4` (nhỏ nhất) thành đen `0`. Kết quả là một ảnh có **dải đen dọc** đúng chỗ có **cạnh dọc** của ảnh gốc.

Vậy filter này **tìm ra cạnh dọc** — nên gọi là **vertical edge filter**. Đây chính là vai trò mà lớp **V1** trong visual cortex đảm nhận (bắt cạnh và hướng).

```text
Ảnh gốc (có cạnh dọc)  ──filter dọc──►  ảnh làm nổi cạnh dọc
```

---

### 🧰 Nhiều filter, nhiều thông tin

* **Horizontal edge filter** bắt cạnh ngang — chỉ cần đổi bố cục giá trị filter.
* Filter khác bắt **cạnh tròn**, pattern,… Mỗi filter trích một loại thông tin; **càng nhiều filter càng nhiều output**.
* Kích thước filter không nhất thiết 3×3 — có thể **5×5, 7×7**.

Lưu ý quan trọng: các giá trị filter ở đây chỉ để minh họa. Trong CNN thực tế, **filter không được đặt tay** mà **khởi tạo ngẫu nhiên**, rồi **cập nhật qua forward và backward propagation** — mạng tự học ra filter phù hợp.

---

### 📏 Kích thước output

Với ảnh `n×n`, filter `f×f`, stride 1:

```text
output = n - f + 1
```

Ví dụ `6 - 3 + 1 = 4` → output **4×4**. Vì output nhỏ hơn input nên ta **mất một phần thông tin** — và đó là lý do cần **padding**, chủ đề bài sau. Hẹn gặp lại!
