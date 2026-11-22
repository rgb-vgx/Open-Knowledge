---
title: 'Chốt danh sách experiment sẽ chạy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 212
status: edited
source: '212 - Discussing the Experiments We Are Going to Try.md'
categories:
- AI
tags: []
---

# 🎯 Chốt danh sách experiment sẽ chạy

> Nguồn: `212 - Discussing the Experiments We Are Going to Try.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33120478)

Ta đã bàn nên chạy loại experiment nào. Giờ hãy vạch ra đúng những cái ta sẽ thử. Có cả đống thứ để test, nhưng ta giữ đơn giản: hãy tưởng tượng mỗi setting trong experiment như một **núm vặn (dial)**. Ta sẽ vặn **ba núm**.

### 🎛️ Ba núm vặn

1. **Model size** — EfficientNet-B0 vs EfficientNet-B2.
2. **Dataset size** — 10% vs 20% ảnh pizza/steak/sushi.
3. **Training time** — 5 epoch vs 10 epoch.

Dĩ nhiên không giới hạn ở đây, nhưng theo kinh nghiệm của mình, ba yếu tố này thường ảnh hưởng lớn nhất tới kết quả.

---

### 📈 "To hơn thường tốt hơn" — nhưng có giới hạn

* **Model size** — tính theo số tham số.
* **Dataset size** — nói chung **nhiều dữ liệu = kết quả tốt hơn**.
* **Training time** — **train lâu hơn = tốt hơn, tới một mức nào đó**.

Cái caveat quan trọng: bạn thắc mắc sao không train 10.000 epoch? Ví dụ train 10 epoch được kết quả, 20 epoch có thể tốt hơn, nhưng 100 epoch có thể bắt đầu **giảm**. Chỉ tốt "tới một điểm" thôi. Và để bắt đầu, ta vẫn giữ mọi thứ nhỏ để **chạy nhanh** — không ai muốn ngồi chờ cả ngày. Nhanh để biết cái gì không hiệu quả còn kịp xoay.

---

### 🧐 Vì sao chọn B0 vs B2?

Trong tài liệu torchvision có rất nhiều model để so. Mình chọn nằm trong họ EfficientNet, và chọn **B0 vs B2** vì B2 có kích thước **xấp xỉ gấp đôi** B0 (không đúng gấp đôi nhưng gần). Có thể chọn B3, B4, B5... nhưng nhớ mục tiêu **Food Vision Mini**: model không quá lớn để chạy được trên **website hoặc mobile**. Người ta chụp ảnh đồ ăn bằng điện thoại, nên model không được có số tham số "khủng". Ví dụ một model lớn cỡ 600 triệu tham số sẽ khó nhét vừa điện thoại, so với **~5 triệu** của B0 và **~9 triệu** của B2.

---

### 📋 Bảng tám experiment

Điểm cần lưu ý: **dùng cùng một test set cho mọi experiment** — để so sánh "táo với táo". Nếu mỗi experiment một test set khác thì khó biết cái nào thật sự tốt hơn.

| # | Model | Training data | Epochs |
|---|---|---|---|
| 1 | EffNetB0 | 10% | 5 |
| 2 | EffNetB2 | 10% | 5 |
| 3 | EffNetB0 | 10% | 10 |
| 4 | EffNetB2 | 10% | 10 |
| 5 | EffNetB0 | 20% | 5 |
| 6 | EffNetB2 | 20% | 5 |
| 7 | EffNetB0 | 20% | 10 |
| 8 | EffNetB2 | 20% | 10 |

Ta bắt đầu từ experiment đã chạy (B0, 10%, 5 epoch), rồi tăng dần: đổi model, đổi số epoch, rồi tới experiment 8 là **gấp đôi dữ liệu, gấp đôi model size, gấp đôi epoch** so với experiment 1. Cứ thế scale lên từng bước.

---

### 🤔 Bạn đoán cái nào thắng?

Nếu phải đặt cược, bạn nghĩ experiment nào cho kết quả tốt nhất: model nhỏ train lâu, hay model to hơn + nhiều dữ liệu hơn + train lâu nhất? Cứ suy nghĩ nhé. Video sau ta chuẩn bị dữ liệu: bộ 10% và 20%. Hẹn gặp!
