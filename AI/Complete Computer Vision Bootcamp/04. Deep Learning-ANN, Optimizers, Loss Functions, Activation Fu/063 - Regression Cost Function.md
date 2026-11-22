---
title: 'Bài 063 — Các loss function cho bài toán regression'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 63
status: edited
source: '063 - Regression Cost Function.md'
categories:
- AI
tags: []
---

# 📐 MSE, MAE, Huber, RMSE: chọn loss cho regression

> Nguồn: `063 - Regression Cost Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957847)

Chào các bạn! ANN giải được cả **regression** lẫn **classification**. Bài này mình đi qua nhóm **loss function cho regression**: **MSE**, **MAE**, **Huber loss** và **RMSE** — kèm ưu nhược điểm để biết chọn cái nào.

### 1️⃣ Mean Squared Error (MSE)

Dạng **loss** (một điểm) và **cost** (gộp `n` điểm):

```text
loss = (y - y_hat)²
cost = (1/n) * Σ (y_i - y_hat_i)²
```

Vì bình phương nên hàm có dạng **bậc hai (parabol)**. Khi vẽ loss theo weight, ta được một đường parabol với **một global minima** ở đáy — đúng dạng **gradient descent** lý tưởng. Với nhiều weight (`W1, W2, W3`) thì đó là mặt parabol trong không gian 3D, và ta cần trượt về đáy.

**Ưu điểm:**

* **Khả vi (differentiable)** ở mọi điểm → tính được đạo hàm cho công thức cập nhật weight.
* **Chỉ một local/global minima** → không lo kẹt ở cực tiểu cục bộ (khác với hàm không bậc hai có thể có nhiều local minima, nơi slope cũng bằng 0 khiến không tiến được).
* **Hội tụ nhanh** nhờ gradient trơn.

**Nhược điểm: nhạy cảm với outlier.** Vì bình phương sai số, một điểm ngoại lai lớn sẽ **phóng đại** cost, kéo **best fit line** lệch mạnh. Ta đang "phạt" cost theo bình phương lỗi nên chỉ một outlier cũng đủ làm line nhảy.

---

### 2️⃣ Mean Absolute Error (MAE)

```text
loss = |y - y_hat|
cost = (1/n) * Σ |y_i - y_hat_i|
```

Không bình phương mà dùng **trị tuyệt đối**, nên giá trị âm cũng thành dương.

**Ưu điểm: robust với outlier.** Không phóng đại sai số, nên khi có ngoại lai thì line chỉ dịch **một chút** thay vì nhảy mạnh. Nếu dữ liệu có outlier, nên chọn MAE.

**Nhược điểm:** đồ thị không phải parabol mà có điểm gãy (góc) tại `0`. Không dùng gradient descent trực tiếp được — phải dùng **subgradient** (lấy từng đoạn để tính slope), nên **hội tụ chậm hơn**.

---

### 3️⃣ Huber loss

Lai giữa MSE và MAE, dùng một **threshold** (hyperparameter):

```text
nếu |y - y_hat| <= δ :  (1/2) * (y - y_hat)²          (không có outlier → như MSE)
ngược lại            :  δ * |y - y_hat| - (1/2) * δ²   (có outlier → như MAE)
```

Nếu sai số nhỏ hơn ngưỡng (không phải outlier) thì hành xử như **MSE**; nếu lớn hơn (outlier) thì chuyển sang dạng **MAE**. Nhờ vậy vừa trơn vừa bền với outlier.

---

### 4️⃣ Root Mean Squared Error (RMSE)

```text
RMSE = sqrt( (1/n) * Σ (y_i - y_hat_i)² )
```

Chính là **căn bậc hai của MSE**. Ưu nhược điểm của nó mình để lại như **bài tập** — các bạn thử tự phân tích xem root áp lên MSE thì được gì, mất gì.

---

### 🧭 Chọn loss nào?

| Loss | Ưu | Nhược |
|---|---|---|
| **MSE** | Khả vi, một global minima, hội tụ nhanh | Nhạy outlier |
| **MAE** | Bền outlier | Subgradient, hội tụ chậm |
| **Huber** | Cân bằng cả hai | Cần chọn threshold |
| **RMSE** | (tự phân tích) | (tự phân tích) |

Quy tắc nhanh: **có outlier → MAE** (hoặc Huber); **không có outlier → MSE**. Bạn cũng có thể xóa outlier rồi dùng MSE, nhưng sẽ mất một phần dữ liệu.

Bài sau ta chuyển sang **loss function cho classification** — cross entropy và các biến thể. Hẹn gặp lại!
