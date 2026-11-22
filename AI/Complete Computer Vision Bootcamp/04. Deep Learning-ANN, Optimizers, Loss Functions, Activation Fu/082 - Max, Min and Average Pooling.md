---
title: 'Bài 082 — Max, Min và Average Pooling'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 82
status: edited
source: '082 - Max, Min and Average Pooling.md'
categories:
- AI
tags: []
---

# 🏊 Pooling: giữ đặc trưng, bỏ chi tiết thừa

> Nguồn: `082 - Max, Min and Average Pooling.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979415)

Chào các bạn! Trước khi vào pooling, mình bổ sung một điểm đã bỏ sót: **một convolution layer** gồm **convolution + ReLU** gộp lại. Sau lớp đó, ta thường thêm **pooling** — và đó là chủ đề bài này: **max pooling**, **min pooling**, **average pooling**.

### 🧱 Định nghĩa lại một convolution layer

Một **convolution layer** = **phép convolution** (ảnh × filter) **+ ReLU** trên output. Bạn có thể xếp **bao nhiêu convolution layer tùy ý**, mỗi lớp với filter khác nhau, kích thước khác nhau.

Ví dụ: ảnh `4×4`, không padding, stride `1`, filter `2×2` → output `3×3` (`4 - 2 + 1 = 3`), rồi áp ReLU. Toàn bộ thao tác đó là **một convolution layer**. ReLU cần thiết để **lấy được đạo hàm** khi backpropagate và cập nhật giá trị filter.

### 🎯 Max pooling làm gì

Sau convolution layer, ta áp một **pooling** **riêng** (không thuộc convolution layer). Với **max pooling 2×2, stride 2**:

Giả sử output sau ReLU là ma trận `3×3`:

```text
 1  2  3
 4  3  6
 2  8  4
```

Max pooling quét các ô `2×2`, **lấy giá trị lớn nhất**:

* Ô `[1,2;4,3]` → max = `4`
* Dịch sang phải (stride 2) → `[3,6]` phần còn → max = `6`
* Xuống dưới → `[2,8]` → max = `8`
* Ô cuối → `4`

Kết quả: `4, 6, 8, 4` — **khuếch đại** pixel có cường độ mạnh nhất (đặc trưng nổi bật) và **giảm kích thước**.

### 🧭 Vì sao max pooling: location invariance

**Location invariance** nghĩa là: dù đặc trưng nằm ở **đâu trong ảnh**, max pooling vẫn **bắt được nó**.

Ví dụ minh họa:

* Có nhiều ảnh mèo, filter phát hiện **mặt mèo**; max pooling **tập trung vào vùng mặt** dù nó nằm chỗ nào.
* Ảnh nhiều ô tô, filter bắt **bánh xe tròn**; max pooling vẫn **trích được bánh xe** bất kể vị trí.

Nó "cô đọng" những thông tin quan trọng nhất từ output của mỗi filter.

### 🔀 Các loại pooling khác

* **Max pooling** — lấy **lớn nhất** (đặc trưng mạnh nhất).
* **Min pooling** — lấy **nhỏ nhất**; dùng khi muốn tập trung vào **pixel cường độ thấp** thay vì nổi bật.
* **Average pooling** — lấy **trung bình** các giá trị trong ô.

```text
Max     : max(ô)      → đặc trưng mạnh nhất
Min     : min(ô)      → pixel cường độ thấp
Average : mean(ô)     → giá trị trung bình
```

Chọn loại nào **tùy use case**. Trong phần lớn kiến trúc, ta thấy **convolution layer + max pooling** xếp chồng nhiều lần để trích ngày càng nhiều thông tin; pooling áp cho **mọi output** của mọi filter.

### 🔜 Tiếp theo

Sau nhiều cặp **conv + pooling**, ta cần "trải phẳng" dữ liệu để đưa vào **fully connected layer** — chính là **flattening**, bài sau. Hẹn gặp lại!

> ⚠️ Cần kiểm chứng: transcript gốc ghi ví dụ `4×4` + padding `1` + filter `2×2` cho output `3×3`; theo công thức `(n + 2p - f)/s + 1`, cấu hình đó cho `5×5`, nên bài đã sửa thành không padding để giữ ví dụ `3×3`.
