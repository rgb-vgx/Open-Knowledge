---
title: 'Bài 161 — Các độ đo trong Object Detection'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 161
status: edited
source: '161 - Object Detection Metrics.md'
categories:
- AI
tags: []
---
# 📊 Đo lường Object Detection: IoU, Precision, Recall và AP

> Nguồn: `161 - Object Detection Metrics.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49111967)

Chào các bạn! Bài này mình đi qua các độ đo (metrics) dùng nhiều nhất trong object detection, dựa trên một GitHub repo tổng hợp rất tốt về chủ đề này. Ta sẽ lần lượt nắm **IoU**, bộ **TP/FP/FN**, **precision/recall**, rồi cách tính **average precision (AP)** bằng hai phương pháp interpolation.

### 🏁 Bối cảnh: định dạng nhãn và các cuộc thi

Annotation có thể ở nhiều định dạng: **XML**, **JSON** hay **TXT** — mình đã gặp ở bài trước. Các benchmark lớn của object detection gồm:

* **Pascal VOC** — bộ dữ liệu lâu đời, có hai phiên bản **VOC 2007** và **VOC 2012**, từng rất phổ biến để so sánh model.
* **COCO** — hiện rất nổi tiếng, khoảng **80 class**, và phần lớn model object detection được **pre-train trên COCO**.
* **Google Open Images**.
* **ImageNet Localization Challenge**.

---

### 🎯 IoU — Intersection over Union

**IoU** là độ đo dựa trên **Jaccard index**, đánh giá mức chồng lấn giữa **hai bounding box**:

* **ground truth box** (ký hiệu `B_gt`) — box thật, gốc,
* **predicted box** — box do model dự đoán.

Công thức:

```text
IoU = diện tích phần giao (intersection) / diện tích phần hợp (union)
```

Nhờ IoU ta quyết định một detection là **true positive** hay **false positive**.

---

### ✅ TP, FP, FN và vì sao không có TN

* **True Positive (TP)** — detection đúng, tức **IoU lớn hơn ngưỡng**.
* **False Positive (FP)** — detection sai, IoU **nhỏ hơn ngưỡng**.
* **False Negative (FN)** — có ground truth nhưng model **không phát hiện**.
* **True Negative (TN)** — **không áp dụng** trong object detection. Lý do: trong một ảnh có vô số box "không nên phát hiện", nên khái niệm "box đúng là không phát hiện" không có ý nghĩa thống kê.

**Ngưỡng IoU** là một **hyperparameter**. Transcript nêu các mức thường gặp như **0.50**, **0.75**, **0.95**. Ngưỡng cao hay thấp tuỳ use case: ví dụ trong y tế, nơi sai sót có thể ảnh hưởng tính mạng, người ta dùng ngưỡng cao hơn; các bài toán thông thường có thể dùng ngưỡng thấp hơn.

---

### 📐 Precision và Recall

**Precision** — khả năng model chỉ nhận ra các object liên quan; tỉ lệ dự đoán positive đúng trên toàn bộ detection:

```text
Precision = TP / (TP + FP)
```

Vì `TP + FP` chính là **tất cả detection**.

**Recall** — khả năng model tìm ra hết các object liên quan; tỉ lệ ground truth được phát hiện đúng:

```text
Recall = TP / (TP + FN) = TP / (tổng số ground truth)
```

---

### 📈 PR Curve và Average Precision

Đường **precision-recall (PR curve)** được dùng trong **Pascal VOC 2012**, nhưng ngày nay ít dùng hơn; metric chính là **average precision (AP)**. Có hai cách tính AP:

1. **11-point interpolation** — lấy trung bình precision tại **11 mức recall cách đều** (bước 0.1), tóm tắt hình dạng PR curve.
2. **Interpolating all points** — lấy toàn bộ các điểm, tính **diện tích dưới đường cong (AUC)**.

Ví dụ minh hoạ trong repo: **7 ảnh**, **15 ground truth** (box xanh lá) và **24 detection** (box đỏ), mỗi detection gắn ký hiệu `a`–`y` cùng confidence. Với ngưỡng IoU **0.30**, detection nào chồng lấn đủ lớn được ghi **TP**, còn lại **FP**.

Bảng kết quả được sắp **confidence giảm dần**, thêm cột TP/FP dạng `1/0`, rồi cộng dồn thành **actual TP** và **actual FP**. Từ đó tính precision và recall cho từng dòng. Ví dụ dòng của ảnh 7 với confidence 95%:

```text
precision = TP / (TP + FP) = 1 / (1 + 1) = 0.5
recall    = TP / 15         = 1 / 15 ≈ 0.0667
```

Vẽ các cặp (recall, precision) ra ta có PR curve.

---

### 🧮 Hai cách ra con số AP

Với **11-point interpolation**, cộng các giá trị precision tại 11 mức recall và chia 11, kết quả ví dụ ra khoảng **26.84**.

Với **interpolating all points**, chia vùng dưới curve thành bốn phần **A1, A2, A3, A4**, rồi:

```text
AP = A1 + A2 + A3 + A4
```

Mỗi phần là một hình chữ nhật: lấy chênh lệch recall nhân với chiều cao precision tương ứng. Kết quả ví dụ ra khoảng **24.56**.

Hai phương pháp cho kết quả hơi khác nhau — điều này bình thường. Phương pháp **interpolating all points** hiện được dùng nhiều hơn, còn **11-point** là kiểu cũ hơn.

---
### ✅ Tóm lại

IoU quyết định TP/FP; precision và recall đo hai mặt "đúng" và "đủ"; AP gói chúng thành một con số. Khi tính AP cho từng ảnh/class rồi lấy trung bình, ta có **mean average precision (mAP)** — sẽ bàn kỹ sau. Các bạn nên đọc trọn repo ví dụ để thấy từng phép cộng dồn được làm ra sao. Hẹn gặp ở bài tiếp theo!
