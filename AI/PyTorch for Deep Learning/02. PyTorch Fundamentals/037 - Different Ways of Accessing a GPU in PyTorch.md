---
title: 'Các cách truy cập GPU trong PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 37
status: edited
source: '037 - Different Ways of Accessing a GPU in PyTorch.md'
categories:
- AI
tags: []
---

# ⚡ Các cách truy cập GPU trong PyTorch

> Nguồn: `037 - Different Ways of Accessing a GPU in PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668448)

GPU giúp tính toán nhanh hơn nhờ **CUDA + phần cứng Nvidia + PyTorch** phối hợp phía sau. Nhưng làm sao để có GPU? Và làm sao để PyTorch biết dùng nó? Bài này chúng ta sẽ trả lời.

### 🖥️ Ba cách có GPU

**1. Google Colab (miễn phí).** Cách dễ nhất — đúng cái chúng ta đang dùng. Có thêm các bản trả phí:

* **Colab Pro** — GPU nhanh hơn, nhiều RAM hơn, thời gian chạy lâu hơn. Mình dùng bản này vì dùng gần như mỗi ngày.
* **Colab Pro+** — cấp cao hơn nữa. Mình chưa cần tới.

Hoàn toàn có thể học hết khóa bằng bản miễn phí.

**2. Tự mua GPU và dựng máy.** Cần đầu tư tiền và công setup. Có nhiều bài blog hướng dẫn chọn GPU cho deep learning (mình có để link) — nhưng giá và model thay đổi theo thời gian, đừng lấy làm chuẩn cố định.

**3. Thuê máy trên cloud.** Các nền tảng lớn: **GCP** (Google Cloud Platform), **AWS** (Amazon Web Services), **Azure** (Microsoft). Có thể thuê máy có GPU.

Workflow của mình: chạy thí nghiệm nhỏ và học kiến thức mới trên **Colab**; khi cần chạy thí nghiệm lớn thì dùng **PC deep learning riêng** hoặc **cloud**. Khóa này thì cứ Colab là đủ.

> Nếu setup GPU local hoặc cloud: xem hướng dẫn **PyTorch Get Started → Start Locally** (chọn OS/CUDA, nó sinh lệnh cài, ví dụ qua Conda) hoặc mục **Cloud Partners**.

---

### 🚀 Bật GPU trên Colab

Vào **Runtime → Change runtime type → Hardware accelerator → GPU → Save**. Colab sẽ khởi động lại runtime và kết nối bạn tới một instance có GPU.

Kiểm tra bằng shell:

```bash
nvidia-smi
```

Máy mình (Colab Pro) có **Tesla P100** — khá mạnh. Bản miễn phí có thể là **Tesla K80**, yếu hơn nhưng vẫn nhanh hơn CPU.

---

### 🔌 Kiểm tra PyTorch có thấy GPU không

```python
import torch
torch.cuda.is_available()
```

Trả về `True` nghĩa là PyTorch dùng được GPU. Nhớ lại: **CUDA** là interface lập trình của Nvidia để dùng GPU cho tính toán số.

Một lợi thế lớn của Colab: mọi kết nối giữa PyTorch và GPU Nvidia được setup sẵn. Khi tự dựng máy hoặc cloud, bạn phải tự làm bước này — khóa học không đi sâu, hãy theo hướng dẫn setup chính thức.

---

### 🧭 Device-agnostic code

Đây là khái niệm quan trọng: code của bạn nên **chạy được ở nơi không có GPU**, nhưng **tự dùng GPU nếu có**.

Cách phổ biến — đặt biến `device`:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
device    # 'cuda' nếu có GPU, ngược lại 'cpu'
```

Tên biến không bắt buộc là `device`, nhưng đây là quy ước bạn sẽ thấy rất nhiều.

Đếm số GPU:

```python
torch.cuda.device_count()    # ví dụ: 1
```

Với thí nghiệm lớn, bạn có thể có nhiều GPU và muốn chia model/dữ liệu ra từng cái — nên việc đếm device hữu ích.

---

### 📚 Best practices

Tài liệu PyTorch có mục **CUDA semantics → Best Practices**, chủ yếu nói về việc set up **device-agnostic code**. Có cả cách đọc tham số từ command line (dùng `argparse`) khi chạy script:

```python
device = torch.device("cuda" if args.device == "cuda" else "cpu")
```

Trong notebook thì ta dùng cách đơn giản ở trên. Chưa hiểu hết cũng không sao — sẽ gặp lại xuyên suốt khóa.

---

### 🎯 Chốt lại

* Có GPU bằng Colab, GPU riêng, hoặc cloud.
* Kiểm tra bằng **`torch.cuda.is_available()`**.
* Viết **device-agnostic code**: `"cuda" if torch.cuda.is_available() else "cpu"`.

Bài sau chúng ta sẽ thực sự **đưa tensor lên/xuống GPU**. Hẹn gặp các bạn!
