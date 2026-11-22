---
title: 'Bài 167 — Fast R-CNN và ý tưởng shared feature map'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 167
status: edited
source: '167 - FAST RCNN.md'
categories:
- AI
tags: []
---
# ⚡ Fast R-CNN: chia sẻ feature map và ROI pooling

> Nguồn: `167 - FAST RCNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49150733)

Chào các bạn! **Fast R-CNN** (2015) cải tiến R-CNN bằng cách chạy CNN **một lần** trên cả ảnh thay vì 2000 lần, rồi dùng **ROI pooling** để lấy feature cho từng vùng. Bài này ta đi qua pipeline mới, lợi ích và những gì còn tồn đọng.

### 🎯 Ý tưởng cốt lõi

Fast R-CNN vừa **detect/classify** object vừa **tinh chỉnh vị trí box** — hai việc diễn ra **đồng thời**. Thay vì mỗi region proposal chạy một forward pass riêng, nó dùng **shared feature map**: CNN chạy một lần trên toàn ảnh, các vùng dùng chung feature map đó.

### 🔄 Pipeline của Fast R-CNN

1. **Xử lý ảnh đầu vào** — ảnh được đưa **trực tiếp vào CNN** (VGG hoặc ResNet) để trích **feature map**, đồng thời đi qua **selective search** để lấy region proposals. Hai nhánh chạy song song từ cùng một ảnh.
2. **Region proposal** — vẫn dùng **selective search** (external). Transcript gọi module này là "RPN", nhưng chính xác thì **RPN** chỉ xuất hiện ở Faster R-CNN; ở Fast R-CNN vẫn là selective search.
3. **ROI pooling** — các region proposal được **chiếu lên feature map**, rồi ROI pooling biến mỗi vùng thành một **feature có kích thước cố định** trước khi phân loại/regression.
4. **Fully connected layer** — feature sau pooling đi qua lớp FC.
5. **Hai nhánh đồng thời** — **classification** và **bounding box regression** cùng xuất kết quả.

Điểm thay đổi lớn ở phần classification: **SVM được thay bằng softmax**, vì softmax hoạt động tốt hơn trong bối cảnh này.

### ✅ Lợi ích

* **Nhanh hơn** R-CNN nhờ bỏ được nút thắt 2000 forward pass riêng lẻ.
* **Train end-to-end** — cả kiến trúc train trong một lần.
* **Chính xác hơn** R-CNN (và tốt hơn cả SPPNet).
* **Tiết kiệm bộ nhớ** — không phải trích và lưu feature cho từng proposal; chỉ cần một forward pass.

### ⚠️ Điểm còn yếu

* **Vẫn dùng selective search** cho region proposal — một kỹ thuật CV cổ điển.
* **Chưa real-time** — inference trên GPU khoảng **20–30 giây/ảnh** (giảm nhiều so với ~50 giây của R-CNN nhưng vẫn chậm).
* **Không học được region proposal** — vì proposal cố định từ selective search, không có learning ở bước này.

---
### ✅ Tóm lại

Fast R-CNN đổi cách làm: CNN chạy một lần, ROI pooling lấy feature cho từng vùng, softmax thay SVM, train end-to-end. Nhưng nút thắt selective search vẫn còn. Bài sau — **Faster R-CNN** — sẽ thay nó bằng **RPN** học được. Hẹn gặp!

> ⚠️ Cần kiểm chứng: Transcript gọi selective search trong Fast R-CNN là "RPN". Theo paper Fast R-CNN (Girshick, 2015), region proposal vẫn là selective search; RPN là đóng góp của Faster R-CNN (Ren et al., 2015).
