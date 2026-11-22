---
title: 'Tổng kết, bài tập và extra curriculum'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 221
status: edited
source: '221 - Main Takeaways, Exercises and Extra- Curriculum.md'
categories:
- AI
tags: []
---

# ✅ Tổng kết, bài tập và extra curriculum

> Nguồn: `221 - Main Takeaways, Exercises and Extra- Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33132632)

Ta khép lại **Milestone Project 1: PyTorch Experiment Tracking**. Trong sách online có phần tóm tắt các main takeaway. Điều đẹp nhất: ta đã đi **một vòng tròn đầy đủ** — trở về đúng **PyTorch workflow** ở đầu khóa.

### 🔄 Nhìn lại workflow

Workflow quen thuộc:

1. **Get data ready** — biến dữ liệu thành tensor (làm cả chục lần rồi).
2. **Pick/build a pretrained model** phù hợp bài toán.
3. **Tạo loss function và optimizer.**
4. **Build training loop** — phần lớn đã gói vào `engine.py` của going modular.
5. **Fit model với data** rồi **make prediction**.
6. **Evaluate** cả định lượng (quantitative) lẫn định tính (qualitative).
7. Cải thiện qua **experimentation** — chính là chủ đề section này.
8. **Save và reload** model đã train.

Ta vừa làm đủ cả: track experiment programmatic, theo motto *experiment, experiment, experiment*, save/reload model, và dự đoán trên dữ liệu custom. Trọn vòng tròn — vỗ vai mình một cái, không phải chuyện nhỏ đâu!

---

### 💡 Main takeaways

* **Experiment, experiment, experiment** — cứ thử nhiều.
* **Giữ experiment nhỏ để làm nhanh.** Vài experiment đầu không nên quá vài giây tới vài phút. Ta đã chạy **8 model trong ~5 phút** (có thể còn nhanh hơn).
* **Càng nhiều experiment, càng nhanh biết cái gì không hiệu quả → cái gì hiệu quả.** Đó là bản chất của khoa học.
* **Khi tìm ra cái hiệu quả, scale up.** Best model là **EffNetB2** — thử scale lên toàn bộ Food 101. Mình khuyên đừng nhảy thẳng vào toàn bộ dataset: hãy thử **đủ 101 lớp nhưng chỉ 10% ảnh** trước.
* **Track experiment programmatic** tốn vài bước setup (tạo writer, TensorBoard...) nhưng về lâu dài rất đáng: xem được nhiều experiment cùng lúc.

---

### 🛠️ Các công cụ tracking khác

Ta dùng **TensorBoard** vì gắn sẵn trong PyTorch. Ngoài ra còn:

* **Weights & Biases** — một trong những công cụ mình thích nhất.
* **MLflow** — thư viện open source mạnh cho vòng đời MLOps.

---

### 🏋️ Bài tập

Cuối sách có ba bài tập:

1. **Chọn model lớn hơn** — thử kiến trúc to hơn.
2. **Thử data augmentation.**
3. **Scale up** — nếu thực sự muốn, đẩy lên dataset lớn hơn.

Ngoài ra có **extra curriculum** để bạn tự khám phá.

---

### 📓 Template và solution

Có **exercise template notebook** (số 7) và **solutions notebook** (số 7) trên GitHub, kèm link trong sách. Bạn thử template trước rồi đối chiếu solution sau.

---

### 🎉 Tạm kết

Chúc mừng bạn đã hoàn thành **Milestone Project 1 — PyTorch Experiment Tracking**! Ta đã đi từ tải dữ liệu, track một model, dựng và chạy tám experiment trong 5 phút, đến dự đoán bằng model tốt nhất trên ảnh custom. Còn section tiếp theo — mình sẽ để nó làm bất ngờ. Hẹn gặp ở đó!
