---
title: 'Xem loạt experiment trong TensorBoard'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 218
status: edited
source: '218 - Viewing Our Modelling Experiments in TensorBoard.md'
categories:
- AI
tags: []
---

# 📈 Xem loạt experiment trong TensorBoard

> Nguồn: `218 - Viewing Our Modelling Experiments in TensorBoard.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33132622)

Ta đã chạy xong loạt experiment, có model lưu trong `models/` và các run file. Trong `runs/` (mình chạy ngày 28/6/2022) có đủ `data_10_percent`, `data_20_percent`, effnetb2/b0, 5 và 10 epoch. Giờ là lúc **visualize, visualize, visualize** — ta đã *experiment, experiment, experiment*, giờ đến lượt xem.

### 🪄 Mở TensorBoard

```python
%load_ext tensorboard
%tensorboard --logdir runs
```

(`%load_ext` chỉ cần chạy một lần; nếu đã có instance TensorBoard ở trên thì có thể bỏ qua.) TensorBoard có sẵn trong Colab. Nếu dùng **VS Code** thì tra cách chạy TensorBoard trong VS Code. Cách khác là upload lên **TensorBoard.dev** để công khai.

---

### 📊 Tab Scalars: mọi experiment tự load

Mở ra, ta thấy tất cả modeling experiment **tự động** hiện lên, đủ accuracy và loss. Tắt smoothing (hoặc để mức 0.5) — mình không thích smoothing lắm, thích xem giá trị **tuyệt đối**.

Kéo ngang thấy rất nhiều experiment, có cả một cái "extra" ta không cần — chỉ giữ các run có prefix ngày hôm nay (28/6). Mỗi run có cột cho biết nó chạy bao lâu: cái **lâu nhất khoảng 1 phút** (dùng nhiều dữ liệu nhất).

---

### 🏆 Best model về accuracy

Xem **test accuracy** ở cuối: chấm màu xanh đậm (thứ hai từ dưới) là **`data_20_percent / effnetb2 / 10_epochs`**, kết thúc gần **95% test accuracy**. Train mất khoảng **1 phút**. Chúc mừng — ta có model tốt nhất mới!

Model khác không kém mấy: chấm xanh lá ở dưới cùng train **nửa thời gian** nhưng chỉ thấp hơn khoảng **1 điểm phần trăm**. Đó là **trade-off giữa performance và speed** — lý do ta thử nhiều model size/dữ liệu/thời gian.

---

### 📉 Xem loss

Chuyển sang **test loss**, zoom ra: có 8 giá trị cho 8 model. Model **loss thấp nhất** lại là **EffNetB0, 10 epoch** (~2.2856 loss), train khoảng 51 giây. Loss thấp nhì là chấm xám — `data_20_percent / effnetb2 / 10_epochs`.

---

### ⚖️ Chọn model nào?

EffNetB2 (20%, 10 epoch) có **loss thấp nhì** nhưng **accuracy cao nhất**. Ta chọn nó vì trade-off tốt hơn: nếu lấy model loss thấp nhất thì accuracy lại giảm chút. Vậy **best model = EffNetB2, data 20%, 10 epoch** — experiment có nhiều biến nhất (nhiều dữ liệu nhất, model to nhất, nhiều epoch nhất).

Xu hướng chung: **nhiều dữ liệu hơn + model to hơn + train lâu hơn → kết quả tốt hơn** (thường là vậy, không phải lúc nào cũng tuyệt đối).

---

### ➡️ Tiếp theo nên chạy gì?

Vì best model là B2 trên 20% dữ liệu, 10 epoch, có thể scale tiếp: lên **B4**, dùng **40-50%** dữ liệu, hoặc train **50 epoch**. Bạn thử bao nhiêu tùy thích.

---

### ☁️ Chia sẻ qua TensorBoard.dev

Muốn chia sẻ experiment với bạn bè/đồng nghiệp, dùng **TensorBoard.dev** (miễn phí, tích hợp trong TensorBoard). Trong sách online có cell mẫu:

```bash
tensorboard dev upload --logdir runs \
  --name "PyTorch experiment tracking Food Vision Mini results" \
  --description "So sánh model size, lượng dữ liệu và training time"
```

Lần đầu sẽ yêu cầu **authorization code**: mở URL, dán code. Sau đó nó upload mọi kết quả trong `runs/` (~260 scalar) và trả về link công khai.

> ⚠️ **Cảnh báo:** kết quả upload lên TensorBoard.dev là **công khai**. Đừng upload dữ liệu nhạy cảm.

---

### ✅ Tạm kết

Một lưu ý: đừng lo nếu số của bạn hơi khác — tính ngẫu nhiên của deep learning khiến sai lệch nhỏ. Quan trọng là **xu hướng**. Ta đã chọn được best model. Video sau: load model đó và dự đoán trên ảnh test. Hẹn gặp!
