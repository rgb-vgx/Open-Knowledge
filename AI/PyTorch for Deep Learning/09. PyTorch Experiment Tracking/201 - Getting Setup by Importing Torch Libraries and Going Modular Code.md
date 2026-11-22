---
title: 'Chuẩn bị môi trường: import thư viện và tái sử dụng code going modular'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 201
status: edited
source: '201 - Getting Setup by Importing Torch Libraries and Going Modular Code.md'
categories:
- AI
tags: []
---

# ⚙️ Chuẩn bị môi trường: import thư viện và tái sử dụng code going modular

> Nguồn: `201 - Getting Setup by Importing Torch Libraries and Going Modular Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33022832)

All right, let's code! Bài này mình dựng môi trường cho notebook **07 PyTorch experiment tracking**: mở Colab, bật GPU, cài đúng phiên bản PyTorch/torchvision, rồi import lại code đã viết ở phần "going modular" để khỏi viết lại từ đầu.

### 📝 Tạo notebook và dán ghi chú mở đầu

Mình mở **colab.research.google.com**, tạo notebook mới, đặt tên `PyTorch experiment tracking` kèm tag video ở cuối — để khi xem trên GitHub là biết nó ra từ video. Tiêu đề heading **07 PyTorch experiment tracking**, kèm ghi chú nhỏ:

> Machine learning rất "experimental". Ta đã chạy nhiều modeling experiment. Để biết experiment nào đáng theo đuổi thì cần **experiment tracking** — nó giúp bạn tìm ra cái **không** hiệu quả, vì đó là bản chất của khoa học: hiểu cái sai để tìm ra cái đúng.

Mình cũng dán sẵn vài link: bản eBook/sách của notebook, trang Discussions trên GitHub để đặt câu hỏi, và link **extra curriculum** từ Made With ML.

---

### 🖥️ Bật GPU trước đã

Việc đầu tiên: chắc chắn đang dùng **GPU**, vì bật cái này có thể khởi động lại runtime. Bấm **Connect**, kiểm tra backend — thấy **GPU** là ngon. Làm sớm để khỏi phải restart runtime về sau.

---

### 📦 Cài đúng phiên bản PyTorch và torchvision

Section này dùng API mới của PyTorch và torchvision, mà lúc ghi hình Colab chưa có sẵn (thậm chí PyTorch còn chưa release). Cần tối thiểu:

* **PyTorch 1.12+**
* **torchvision 0.13+**

Trong notebook mình in ra phiên bản hiện tại để kiểm tra. Colab của mình lúc đó chưa đủ. Sách online có sẵn một block code "getting set up" làm hai việc: kiểm tra phiên bản, và nếu thiếu thì chạy lệnh cài **nightly** (lấy từ trang *Get Started → Start Locally* của PyTorch, chọn Linux + pip + CUDA vì Colab chạy Linux).

```bash
# ý tưởng của block: nếu thiếu version thì cài nightly
pip install --pre torch torchvision --extra-index-url https://download.pytorch.org/whl/nightly/cu113
```

Chạy mất khoảng **3-4 phút**. Xong nó in ra "torch/torchvision versions not as required" (nếu vừa cài), rồi ta **Restart runtime** để nạp phiên bản mới. Restart xong nhớ kiểm tra lại GPU. Lần này mình có `torch 1.13.0.dev...` — đủ mức tối thiểu để chạy notebook.

---

### 🔁 Import lại code cũ thay vì viết lại

Đây là phần hay: tái sử dụng **going modular**. Mình import các import quen thuộc (`torch`, `torchvision`, `matplotlib`, kiểm tra `torchinfo`), rồi lấy các script modular từ repo khóa học.

* Nếu chưa có **torchinfo** thì cài để in model summary — mất khoảng **18 giây**.
* Sau đó có ngay `engine.py` và toàn bộ hàm đã viết ở section trước.

Spoiler nhỏ: ta sẽ **sửa `train` function** để track experiment bằng TensorBoard — đó là lý do cần import lại code này. Hàm `save_model` trong `utils.py` cũng sẽ được tái dùng để lưu từng model ra file.

---

### 🎲 Device-agnostic code và set seed

Cuối cùng là dọn dẹp hai thứ quen thuộc:

1. **Device-agnostic code** — đặt `device = "cuda" if torch.cuda.is_available() else "cpu"` để chạy được cả GPU lẫn CPU.
2. **Hàm set seed** — gói lại thành helper cho gọn:

```python
def set_seeds(seed: int = 42):
    """Sets random sets for torch operations."""
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
```

Mình dùng **42** — con số yêu thích, thực ra dùng số nào cũng được. Seed giúp "gia vị" cho randomness, cố gắng làm kết quả **reproducible** (tái lập được). Từ giờ trong các cell sau chỉ cần gọi `set_seeds()` là xong.

---

### ⚠️ Lưu ý khi quay lại notebook

Nếu bạn nghỉ giữa chừng rồi quay lại, **phải chạy lại các cell setup ở trên** — đảm bảo đúng phiên bản torch/torchvision, nếu không code (nhất là phần torchvision) có thể vỡ về sau.

---

### ✅ Tạm kết

Môi trường đã sẵn sàng: GPU bật, phiên bản đúng, code cũ import xong, seed đã set. Bài sau ta bắt tay vào bước quan trọng tiếp theo — **lấy dữ liệu** pizza, steak, sushi. Hẹn gặp lại!
