---
title: 'Bộ công cụ profiling của NVIDIA: chọn công cụ nào?'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 31
status: edited
source: '031 - All profiling tools from NVidia (Nsight systems - compute - nvprof.md'
categories:
- Nvidia
tags: []
---

# 🧰 Bộ công cụ profiling của NVIDIA: chọn công cụ nào?

> Nguồn: `031 - All profiling tools from NVidia (Nsight systems - compute - nvprof.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42255650)

NVIDIA cung cấp nhiều công cụ profiling và phân tích ứng dụng CUDA. Bài này điểm qua bảy công cụ, nói rõ **nvprof đã bị khai tử**, và giải thích khi nào dùng **Nsight Systems**, khi nào dùng **Nsight Compute**.

### 🚫 nvprof đã bị deprecate

**nvprof** từng được dùng trong rất nhiều tutorial nhưng nay **đã bị deprecate**. Giảng viên khuyên không dùng và không đưa vào khóa học.

---

### 🔍 Nhóm công cụ kiểm tra và debug

* **CUDA-MEMCHECK**: phát hiện và chẩn đoán lỗi bộ nhớ trong ứng dụng CUDA, gồm truy cập ngoài biên và truy cập không căn lề (misaligned). Đảm bảo tính đúng đắn, từ đó ảnh hưởng tới hiệu năng.
* **cuda-gdb**: debug chương trình CUDA.
* **NVIDIA Visual Profiler** (`nvvp`): công cụ profiling đa nền tảng, cung cấp thông tin timing chi tiết và hardware counter cho CUDA, OpenCL, DirectX 3D và OpenGL. Đúng như tên "visual", nó hiển thị timeline và achieved occupancy bằng đồ thị, giúp nhận ra bottleneck trong kernel và memory transfer.

---

### 🏔️ Bộ ba Nsight

Sơ đồ quan hệ: **Nsight Systems** là công cụ cha, bao quát hai công cụ còn lại.

* **Nsight Systems**: phân tích **toàn hệ thống**. Phù hợp xem ứng dụng như một tổng thể thay vì từng kernel, vì một ứng dụng có thể chứa nhiều kernel. Nó trực quan hóa tương tác **CPU ↔ GPU**, mức dùng và hiệu năng của **CUDA Runtime API**, và phân tích workload đa node. Vì vậy có thể xem đây là công cụ profiling phía **server**, không phải client.
* **Nsight Compute**: phân tích **từng kernel** chi tiết. Đây là công cụ đã dùng để profile vector addition ở các bài trước. Nó cung cấp metric cho global memory, cache, SM, thậm chí từng đơn vị trong SM, với **hơn 100 000 metric**.
* **Nsight Graphics**: chuyên cho ứng dụng đồ họa, đo frame và rendering.

---

### 🗺️ Chọn công cụ theo câu hỏi

| Câu hỏi | Công cụ |
|---|---|
| Chương trình có lỗi bộ nhớ không? | CUDA-MEMCHECK |
| Cần debug từng bước trên GPU? | cuda-gdb |
| Timeline tổng thể, CPU chờ GPU ở đâu? | Nsight Systems |
| Kernel nào chậm, vì sao chậm? | Nsight Compute |
| Frame/rendering của ứng dụng đồ họa? | Nsight Graphics |

Cách nhớ nhanh: **Systems** nhìn từ trên xuống (toàn ứng dụng, nhiều kernel, đa node), **Compute** nhìn từ trong ra (một kernel, từng đơn vị trong SM). Một ứng dụng thực tế thường cần cả hai: Systems để biết chỗ nào đáng đào, Compute để đào sâu chỗ đó.

---

### 🎯 Trọng tâm của khóa học

Xuyên suốt khóa, profiling tập trung vào **Nsight Compute**, và có thể dùng thêm **Nsight Systems**. Nsight Graphics và nhóm debug không đi sâu. Lý do chọn Compute: các bài học xoay quanh kernel và những chỉ số như occupancy, hit rate, throughput — đúng thế mạnh của công cụ này.

---

### ✅ Chốt lại

Bỏ qua `nvprof`; dùng **Nsight Systems** khi cần nhìn toàn cảnh CPU–GPU, dùng **Nsight Compute** khi cần mổ xẻ từng kernel. Hiểu vai trò từng công cụ giúp chọn đúng thay vì chạy mọi thứ rồi loay hoay với đống số liệu.
