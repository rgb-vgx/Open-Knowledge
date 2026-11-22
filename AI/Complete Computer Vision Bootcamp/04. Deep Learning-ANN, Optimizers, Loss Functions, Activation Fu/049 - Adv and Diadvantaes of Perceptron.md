---
title: 'Bài 049 — Ưu điểm và hạn chế của Perceptron một lớp'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 49
status: edited
source: '049 - Adv and Diadvantaes of Perceptron.md'
categories:
- AI
tags: []
---

# ⚖️ Perceptron một lớp: được gì, mất gì

> Nguồn: `049 - Adv and Diadvantaes of Perceptron.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940479)

Chào các bạn! Ta tiếp tục với **perceptron**. Thực ra perceptron có hai dạng: **single-layer** và **multi-layer**. Toàn bộ bài trước là **single-layer perceptron model**. Bài này mình sẽ chỉ ra nó mạnh ở đâu, yếu ở đâu, và vì sao phải đi tới **multi-layer perceptron** — tức **artificial neural network** hay **multi-layered neural network**.

### 🔍 Nhắc lại cơ chế

Perceptron nhận input, gán **weights** (ban đầu có thể ngẫu nhiên), rồi làm hai bước: **tính tổng input nhân weight**, **cộng bias**, **áp activation function**. Sau đó so với ngưỡng để ra `1` hoặc `0`.

Quá trình đi từ trái sang phải — bước một rồi bước hai — chính là **feed forward neural network**.

### 🔁 Cập nhật weight kiểu "mò": không hiệu quả

Giả sử nhãn thật `Y = 1`, nhưng sau feed forward ta ra `Y_hat = 0` (dưới ngưỡng). Rõ ràng có **error**. Cách xử lý của perceptron một lớp: **thay đổi weights rồi chạy lại feed forward**, lặp mãi cho tới khi ra giá trị khớp.

Cách này **không hiệu quả**: nó chỉ thay weights một cách ngẫu nhiên, không có cơ chế dẫn đường cho việc cập nhật. Trong mạng nhiều lớp, người ta dùng **loss function** và **backpropagation** để việc cập nhật weight diễn ra trơn tru — và backpropagation là một trong những phát minh lớn nhất của deep learning.

### ✅ Ưu điểm: bài toán linearly separable

Perceptron một lớp giải tốt các bài toán **linearly separable** (tách tuyến tính). Với hai cụm điểm dữ liệu phân biệt, nó kẻ được **best fit line** chia hai cụm — nên mới gọi là **binary classifier**.

### ❌ Hạn chế: dữ liệu không tách tuyến tính

Nhưng nếu dữ liệu **non-linear separable** — các điểm đan xen, không đường thẳng nào tách nổi — thì perceptron một lớp bó tay. Lúc đó bắt buộc phải dùng **multi-layered neural network**, vì mạng một lớp **không giải được bài toán phức tạp**.

```text
Linearly separable        Non-linear separable
   ● ● | ○ ○                  ● ○ ●
   ● ● | ○ ○                  ○ ● ○
   ● ● | ○ ○                  ● ○ ●
   (một đường thẳng)          (không đường thẳng nào)
```

---

### 🚀 Sang mạng nhiều lớp học gì

Khi chuyển sang **multi-layer perceptron model** (artificial neural network), ta sẽ học những mảng cốt lõi sau:

1. **Forward propagation** — lan truyền xuôi qua các lớp.
2. **Backward propagation** — lan truyền ngược để cập nhật weights.
3. **Loss function** — đo sai số.
4. **Các loại activation function** và khi nào dùng loại nào.
5. **Optimizers** — cơ chế cập nhật weight bài bản thay vì mò ngẫu nhiên.

Nhờ backpropagation và optimizers, việc cập nhật weights mới hiệu quả, và ta mới xây được **deep neural network** — mạng nhiều lớp giải được bài toán phức tạp hơn nhiều.

Mình sẽ dành vài video lý thuyết nữa rồi mới chuyển sang thực hành. Hẹn gặp các bạn ở bài tiếp theo!
