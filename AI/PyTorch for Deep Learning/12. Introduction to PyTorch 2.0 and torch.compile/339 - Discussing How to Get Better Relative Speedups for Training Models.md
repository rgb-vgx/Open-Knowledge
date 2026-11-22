---
title: 'Bài 339 — Cách lấy tăng tốc tương đối cao hơn khi train'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 339
status: edited
source: '339 - Discussing How to Get Better Relative Speedups for Training Models.md'
categories:
- AI
tags: []
---

# 📈 Muốn thấy torch.compile tăng tốc? Dùng GPU nhiều hơn

> Nguồn: `339 - Discussing How to Get Better Relative Speedups for Training Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745228)

Video trước ta có hàm `create_model` trả về ResNet50 và transforms. Giờ mình đào sâu một câu đã nhắc: **tăng tốc tương đối của PyTorch 2.0 rõ nhất khi ta dùng càng nhiều GPU càng tốt**. Vì sao, và làm thế nào?

> Nếu các bạn nghe tiếng quạ kêu trong video — đó là một trong những âm thanh đặc trưng của nước Úc. Một đàn quạ đang hót trên cây ngay ngoài cửa sổ mình. Cứ thưởng thức cùng mình.

### 💡 Nhắc lại: bandwidth là chi phí lớn

Một trong những chi phí chính của thời gian train là **bandwidth** — chuyển dữ liệu từ bộ nhớ sang GPU. Ta muốn giảm nó tối đa. Hai cách: **operator fusion** (giảm chuyển dữ liệu) và **graph capture** (ghi nhớ trước các phép toán model cần làm, khỏi tra cứu lúc chạy).

### 🔑 Nguyên tắc: dùng nhiều GPU nhất có thể

GPU hiện đại rất nhanh khi thực hiện phép toán (thao tác tensor, nhân ma trận), nên phần lớn **tăng tốc tương đối** xuất hiện khi **càng nhiều dữ liệu nằm trên GPU càng tốt**. Lưu ý chữ "tương đối": không phải lúc nào cũng tăng tốc cùng tỉ lệ, mà là tương đối so với khi dùng ít GPU.

Đừng để bộ nhớ và sức tính của GPU bị lãng phí. Cụ thể:

1. **Tăng batch size.** Suốt khóa ta dùng `batch_size=32`. Với GPU nhiều bộ nhớ, hãy dùng lớn nhất có thể — **128, 256, 512**... Bội số của **8** thường là thực hành tốt.
2. **Tăng data size.** Thay vì ảnh **32×32**, dùng **224×224** hoặc thậm chí **336×336**. Cũng có thể tăng embedding size cho dữ liệu.
3. **Tăng model size.** Thay vì model 1 triệu tham số, dùng 10 triệu — mà ngày nay 10 triệu có khi còn bị coi là nhỏ.
4. **Giảm data transfer.** Đây là thứ **duy nhất** cần giảm: chuyển dữ liệu làm chậm GPU, vì GPU muốn tính mà không có data thì không tính được. Dùng CPU đẩy càng nhiều data lên GPU càng tốt, tránh chuyển thừa — đó chính là việc fusion làm sau hậu trường.

Xu hướng chung: **tăng, tăng, tăng** mọi thứ nhét được lên GPU.

### 📉 Tăng gấp bốn nhưng thời gian không gấp bốn

Nhờ những điều trên, tăng tốc tương đối sẽ tốt hơn. **Tổng thời gian train có thể dài hơn, nhưng không tuyến tính.** Batch size tăng gấp 4 không có nghĩa thời gian train tăng gấp 4; data size, model size cũng vậy.

Ví dụ trực quan trên slide: A100 với một "ô" dữ liệu, train mất **10 phút**. Lên thực nghiệm lớn hơn, **6× dữ liệu trên 2 GPU**, chỉ mất **2× thời gian train** — nhờ tận dụng tính song song của GPU. (Số liệu chỉ để minh họa.)

### 📚 Tài nguyên đọc thêm

Mình gợi ý bài của **Sebastian Raschka** — một trong những nhà nghiên cứu ML mình đánh giá cao — về cách **Plain PyTorch 2.0** đi từ **21.3 phút xuống 1.8 phút**. Một mức tăng rất đẹp, các bạn nên đọc.

Tóm lại: muốn tăng tốc tương đối, hãy tăng data size, tăng model size, hoặc giảm lượng data phải chuyển — tức làm **càng nhiều phép tính trên GPU càng tốt**.

---

Nói đến tăng batch size: video sau ta sẽ viết code kiểm tra **giới hạn bộ nhớ GPU** — qua `nvidia-smi` hoặc programmatically — để tự động chọn batch size phù hợp với GPU đang có.
