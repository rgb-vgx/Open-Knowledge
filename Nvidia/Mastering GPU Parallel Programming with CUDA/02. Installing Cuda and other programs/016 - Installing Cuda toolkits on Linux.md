---
title: 'Cài CUDA toolkit trên Linux'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 16
status: edited
source: '016 - Installing Cuda toolkits on Linux.md'
categories:
- Nvidia
tags: []
---

# 🐧 Cài CUDA toolkit trên Linux

> Nguồn: `016 - Installing Cuda toolkits on Linux.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/28825540)

Bài này cài CUDA toolkit bên trong Ubuntu (WSL). Cách nhanh nhất trong video không phải tải installer từ trang chủ mà là một lệnh **apt** duy nhất, sau đó kiểm tra bằng `nvcc --version`. Mình cũng ghi lại lưu ý về việc nên bắt đầu từ cách đơn giản này.

### 🖥️ Mở Linux từ Windows

Từ Start menu, mở **Command Prompt**, rồi gõ:

```bash
wsl
```

Sau vài giây, Ubuntu sẽ mở lên. Đây là môi trường Linux để cài và chạy CUDA.

---

### 🔍 Kiểm tra nvcc trước khi cài

Trong Ubuntu, chạy:

```bash
nvcc --version
```

Kết quả trong video là **command not found** — nghĩa là compiler CUDA chưa có. Cần cài **CUDA toolkit**, vì `nvcc` nằm trong toolkit cùng nhiều công cụ khác đã nói ở bài đầu section.

---

### 📥 Hai cách cài

**Cách 1 — theo trang tải chính thức:** mở trang CUDA toolkit download, chọn hệ điều hành, kiến trúc và distribution. Với WSL 2 có ba lựa chọn: hai lựa chọn tải file về (local), một lựa chọn cài qua mạng.

**Cách 2 — dùng apt (được khuyên dùng trong video):**

```bash
sudo apt install nvidia-cuda-toolkit
```

Nhập password, trả lời **Yes** khi được hỏi, rồi chờ. Quá trình có thể mất **30–40 phút**, cần kiên nhẫn.

---

### ✅ Kiểm tra sau khi cài

Chạy lại:

```bash
nvcc --version
```

Kết quả hiển thị dòng **nvcc: NVIDIA (R) Cuda compiler driver** và **release 11.5** — toolkit đã cài thành công, kèm toàn bộ tính năng đã giới thiệu ở bài 013.

---

### 💡 Lưu ý

Làm đúng theo hướng dẫn trên trang chủ đôi khi gặp trục trặc. Vì vậy giảng viên khuyên **bắt đầu bằng lệnh apt đơn giản** ở trên. Khi đã quen, muốn **cập nhật** toolkit thì mới vào trang tải CUDA, chọn bản mong muốn và cài theo hướng dẫn chính thức.

---

### ✅ Chốt lại

Trên Linux/WSL: mở bằng `wsl`, kiểm tra `nvcc --version`, cài bằng `sudo apt install nvidia-cuda-toolkit`, rồi xác nhận phiên bản. Vậy là môi trường đã sẵn sàng; bài tiếp theo mình bắt đầu viết chương trình CUDA đầu tiên và ánh xạ phần mềm xuống phần cứng.
