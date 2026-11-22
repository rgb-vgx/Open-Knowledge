---
title: 'Theo dõi một experiment với TensorBoard và SummaryWriter'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 206
status: edited
source: '206 - Setting Up a Way to Track a Single Model Experiment with TensorBoard.md'
categories:
- AI
tags: []
---

# 📊 Theo dõi một experiment với TensorBoard và SummaryWriter

> Nguồn: `206 - Setting Up a Way to Track a Single Model Experiment with TensorBoard.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33111086)

Chào mừng trở lại. Ta đã có EfficientNet-B0 feature extractor với base layer frozen. Giờ train phần còn trainable — nhưng lần này làm khác mọi khi: lưu kết quả ra file. Trước khi track *nhiều* experiment, hãy xem track *một* cái trông thế nào.

### 🎯 Loss function và optimizer

Như thường lệ:

```python
loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model.parameters(), lr=0.001)
```

Dùng cross entropy vì là phân loại đa lớp, Adam với learning rate `0.001` cho nhất quán.

---

### 🖊️ SummaryWriter là gì?

Nếu bạn đã thử thách bài trước, bạn sẽ thấy ta dùng được một **SummaryWriter**. Có thể hình dung nó như "ghi lại bản tóm tắt" những tham số bạn truyền vào.

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter()
```

Khởi tạo xong không in gì cả. Mở tài liệu `SummaryWriter` ra thì rõ: mọi chi tiết về TensorBoard nằm ở **tensorflow.org/tensorboard**. Đây là website của TensorFlow — một framework deep learning khác, khá giống PyTorch — và TensorBoard là **visualization toolkit** của nó.

---

### 🔍 TensorBoard làm được gì?

Theo tài liệu: TensorBoard cung cấp khả năng visualize và tooling cho thí nghiệm machine learning, gồm:

* Track và visualize metrics như **loss** và **accuracy**.
* Visualize model graph, ops (operations) và layers.
* Xem histogram của weights, biases, tensor khác theo thời gian.
* Project embeddings, hiển thị **ảnh, text, audio**.
* Profiling chương trình, và nhiều thứ khác nữa.

Điểm quan trọng: tất cả đều **có tài liệu chính thức**, ta chỉ đang thực hành bằng code.

---

### 📁 SummaryWriter ghi đi đâu?

Tài liệu nói: *SummaryWriter ghi các entry trực tiếp vào **event file** trong `log_dir` để TensorBoard đọc.* Tức writer giúp ta lưu metric ra file để TensorBoard dùng. Mặc định nó lưu vào thư mục dạng `runs/current_date_time_hostname` (hostname là tên máy). Sau này có thể đổi bằng `log_dir=...`, nhưng giờ để mặc định.

---

### 🔧 Rút `train` function ra để sửa

Kết quả train hiện được in từ dictionary trong `engine.py`. Nếu build 10 model thì quản lý từng dictionary rất mệt. Ta muốn track **programmatic**, lưu ra file. Vì vậy mình copy nguyên `train` function vào notebook, đồng thời import `train_step`, `test_step` và các dependency mà nó cần.

Thêm phần tracking vào cuối mỗi epoch:

```python
writer.add_scalars(main_tag="Loss",
                   tag_scalar_dict={"train_loss": train_loss,
                                    "test_loss": test_loss},
                   global_step=epoch)

writer.add_scalars(main_tag="Accuracy",
                   tag_scalar_dict={"train_acc": train_acc,
                                    "test_acc": test_acc},
                   global_step=epoch)
```

`add_scalars` để ghi **nhiều scalar** một lúc (scalar = một con số đơn lẻ) — đúng với loss/accuracy. Writer còn có `add_histogram`, `add_image`, `add_images`... nhưng ta tập trung scalar. `global_step=epoch` để giá trị được ghi theo từng epoch.

---

### 🕸️ Ghi cả model graph

```python
writer.add_graph(model=model,
                 input_to_model=torch.randn(32, 3, 224, 224).to(device))
writer.close()
```

`add_graph` chạy một forward pass với tensor random để ta xem được luồng tính toán qua model. Cuối cùng `writer.close()` báo writer không track gì nữa.

---

### ✅ Tạm kết

Ta đã hiểu TensorBoard là gì, cách PyTorch giao tiếp với nó qua `SummaryWriter`, cách tạo writer (mặc định ghi vào `runs/`), và đã thêm tracking loss/accuracy + graph vào `train` function. Bạn thử chạy `train` đã sửa và xem có gì xuất hiện trong thư mục `runs` nhé. Video sau ta chạy thật và xem kết quả.
