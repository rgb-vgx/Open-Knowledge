---
title: 'Cân bằng giữa overfitting và underfitting, và cách xử lý'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 160
status: edited
source: '160 - The Balance Between Overfitting and Underfitting and How to Deal With.md'
categories:
- AI
tags: []
---

# ⚖️ Cân bằng giữa overfitting và underfitting, và cách xử lý

> Nguồn: `160 - The Balance Between Overfitting and Underfitting and How to Deal With.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32753044)

Loss curve là một trong những cách hữu ích nhất để **troubleshoot model**. Bài này mình đi qua **ba dạng loss curve** chính — underfitting, overfitting và "just right" — rồi liệt kê cách xử lý từng trường hợp. Đây là kiến thức nền mà các bạn sẽ dùng suốt sự nghiệp ML.

### 📉 Ba dạng loss curve

* **Underfitting** — loss trên **cả train lẫn test** đều có thể **thấp hơn nữa**. Model chưa học đủ (chưa fit tốt dữ liệu).
* **Overfitting** — **train loss thấp hơn test loss** rõ rệt. Model học **quá khớp** tập train đến mức chỉ "thuộc bài" mà không **tổng quát hóa**.
* **Just right** (Goldilocks zone) — train loss và test loss **giảm với tốc độ tương tự**, thường test loss hơi cao hơn train một chút (vì model chưa từng thấy dữ liệu test).

Mình ví von: overfitting giống học sinh **học thuộc lòng** tài liệu (train set) đến mức gặp đề thi (test set) câu hỏi mới là bí — không chuyển hóa được kiến thức.

Với Model 0 của ta, đường loss còn cao → có dấu hiệu **underfitting**.

### 🔧 Cách giảm overfitting

Tất cả đều kèm "caveat" — **không phải lúc nào cũng hiệu quả**:

* **Lấy thêm dữ liệu** — model có nhiều ví dụ hơn để học pattern tổng quát.
* **Data augmentation** — làm tập train khó học hơn (như `TrivialAugmentWide`).
* **Dữ liệu chất lượng hơn** — không chỉ nhiều mà còn tốt hơn.
* **Transfer learning** — lấy pattern đã học của model khác (đã train trên ImageNet trong `torchvision.models`) rồi tinh chỉnh cho bài toán mình.
* **Đơn giản hóa model** — bớt layer, bớt hidden units (ví dụ 10 layer → 5, 100 units → 50), buộc model dùng ít tài nguyên hơn mà vẫn phải tổng quát hóa.
* **Learning rate decay / scheduling** — giảm learning rate theo thời gian. Ví dụ: lúc đầu bước lớn, càng gần đích bước càng nhỏ để không "vượt" mất điểm tối ưu (như thò tay nhặt đồng xu sau đệm ghế — gần đến nơi thì bước nhỏ kẻo làm rơi).
* **Early stopping** — theo dõi test error; khi nó bắt đầu **tăng** liên tục (ví dụ 10 bước), dừng train và **lưu lại trọng số ở điểm test loss thấp nhất**.

### 🔧 Cách giảm underfitting

* **Thêm layer / units** — tăng khả năng học của model.
* **Chỉnh learning rate** — có thể LR đang quá cao khiến model học kém.
* **Train lâu hơn** — thêm epoch, cho model xem dữ liệu nhiều lần.
* **Transfer learning** — giúp cả overfitting lẫn underfitting.
* **Bớt regularization** — regularization "ghì" model lại để chống overfit; làm quá tay sẽ gây underfit.

### 🎯 Bài toán cân bằng

Đây là "điệu nhảy" khó nhất của ML: giảm underfit quá tay → overfit, và ngược lại. Mục tiêu là tiến gần **"just right"**, dù hiếm khi đạt hoàn hảo. Đây cũng là hướng nghiên cứu phổ biến nhất.

### 🤔 Câu hỏi cho bạn

Model 0 đang underfitting, vậy theo các bạn nên làm gì để **tăng khả năng học**: train lâu hơn, thêm layer, hay thêm hidden units? Suy nghĩ rồi bài sau ta cùng build thêm model.

### ✅ Tạm kết

Đã nắm ba dạng loss curve và bộ công cụ xử lý. Bài sau mình thử một phương pháp — dùng **data augmentation** — dù với tình trạng underfitting hiện tại thì đó chưa hẳn là lựa chọn tối ưu. Hẹn các bạn ở đó.
