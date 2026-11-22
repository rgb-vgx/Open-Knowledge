---
title: 'Phác thảo các bước dự đoán trên ảnh test'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 195
status: edited
source: '195 - Outlining the Steps to Make Predictions on the Test Images.md'
categories:
- AI
tags: []
---

# 🧭 Phác thảo các bước dự đoán trên ảnh test

> Nguồn: `195 - Outlining the Steps to Make Predictions on the Test Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33016304)

Chào các bạn! Ta đã đánh giá model **định lượng** qua loss curve và test accuracy. Giờ tới phần vui nhất: **dự đoán trên ảnh test và cả ảnh custom**.

### 🔍 Bốn điều phải nhớ khi inference

Khi dự đoán trên test data hay custom data, lỗi thường đến từ **formatting**. Cần đảm bảo:

1. **Same shape** — ảnh cùng shape với lúc model train (ở đây 224×224). Có thể đổi, nhưng muốn hiệu năng tương đương thì giữ nguyên.
2. **Same dtype** — cùng kiểu dữ liệu.
3. **Same device** — dữ liệu và model phải **cùng device** (CPU/GPU).
4. **Same transform** — transform test/custom data giống lúc train.

Ta đã gặp đủ loại lỗi này: shape error, dtype error, device error.

Mấy điều này không bắt buộc tuyệt đối, nhưng để **tránh lỗi và giữ hiệu năng**, nên làm đủ.

### 🎯 Ý tưởng: gói tất cả vào một hàm

Ta sẽ viết hàm **`pred_and_plot_image`**, tự động làm hết các bước trên. Ta đã từng viết hàm tương tự ở section 04 (mục "putting custom image prediction together"). Lần này làm lại với vài điều chỉnh để luyện tập.

### 📝 Mười bước của hàm

1. **Đầu vào**: model đã train, danh sách `class_names`, đường dẫn ảnh, `image_size`, `transform`, `device`.
2. **Mở ảnh** bằng **PIL** (`Image.open`).
3. **Tạo transform** nếu chưa có — mặc định phải có transform.
4. **Đưa model lên target device**.
5. **`model.eval()`** — tắt dropout và các layer chỉ dùng khi train, chuẩn bị inference.
6. **Transform ảnh** và **thêm batch dimension** — vì model cần batch size, dù chỉ một ảnh. Dùng `unsqueeze` (hoặc `squeeze` tùy chiều) để có shape `(1, 3, H, W)`.
7. **Forward pass** — đưa ảnh (đã ở đúng device) qua model.
8. **Chuyển logit thành xác suất** bằng **`torch.softmax`**.
9. **Lấy nhãn dự đoán** bằng **`torch.argmax`** trên xác suất.
10. **Vẽ ảnh bằng matplotlib**, tiêu đề là nhãn dự đoán (bước 9) và xác suất (bước 8).

### 💡 Vì sao `torch.softmax` rồi `torch.argmax`?

Model xuất ra **logit** — số thô, chưa phải xác suất. `softmax` biến chúng thành phân phối xác suất (tổng bằng 1). `argmax` lấy **index có xác suất cao nhất** — chính là class dự đoán.

### 🎨 Vì sao phải vẽ ảnh gốc, không phải ảnh đã transform?

Matplotlib sẽ lỗi nếu bạn đưa ảnh đã qua transform (shape/kiểu khác). Hãy vẽ **ảnh PIL gốc** đã mở ở bước 2.

### 🧩 Bài tập

Trước khi xem lời giải ở video sau, các bạn thử **tự viết hàm** theo mười bước trên. Nếu cần tham khảo, xem hàm tương tự ở section 04, mục 11.3.

### ✅ Chốt lại

Ta đã có bản thiết kế đầy đủ cho hàm dự đoán. Video sau ta code cùng nhau — và chắc chắn sẽ có ít nhất một lỗi để sửa. Hẹn gặp!
