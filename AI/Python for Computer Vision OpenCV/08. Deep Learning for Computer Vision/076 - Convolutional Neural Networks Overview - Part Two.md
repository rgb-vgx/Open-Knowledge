---
title: 'CNN phần 2: pooling, dropout và các kiến trúc nổi tiếng'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 76
status: edited
source: '076 - Convolutional Neural Networks Overview - Part Two.md'
categories:
- AI
tags: []
---

# 🧹 CNN phần 2: pooling, dropout và các kiến trúc nổi tiếng

> Nguồn: `076 - Convolutional Neural Networks Overview - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12618392)

Nối tiếp phần trước, bài này hoàn thiện nửa "feature extraction" của CNN bằng **pooling**, điểm lại **dropout**, và điểm danh những kiến trúc đã làm nên tên tuổi của convolutional network.

### 🔻 Pooling: subsample để giảm tải

Pooling layer lấy mẫu thưa (subsample) ảnh đầu vào. Mục đích: giảm bộ nhớ, giảm tải tính toán và giảm số tham số.

Cách hoạt động với **max pooling**:

1. Chọn một **kernel** — ví dụ `2 × 2` pixel (đây là lựa chọn phổ biến, nhưng có thể dùng kích thước khác tùy dữ liệu).
2. Trong kernel đó, tìm **giá trị lớn nhất** trong các pixel.
3. Chỉ giá trị max đó được đưa sang layer sau, đại diện cho cả vùng kernel.
4. Trượt kernel theo **stride** — với ví dụ trong bài là `stride = 2` — và lặp lại.

Input minh họa là ảnh `6 × 6`, mỗi ô là một giá trị "độ tối" (0 đến 1, hoặc -1 đến 1 tùy cách chuẩn hóa).

Đánh đổi: pooling **loại bỏ rất nhiều thông tin**. Một kernel `2 × 2` với stride `2` vứt đi tới **75%** dữ liệu đầu vào. Nhưng đây là bước gần như bắt buộc: lượng dữ liệu ảnh quá lớn, không pooling thì tính toán quá đắt.

---

### 🎲 Dropout

Dropout là một dạng **regularization** chống overfit. Trong lúc training, các unit bị **bỏ ngẫu nhiên** cùng các kết nối của chúng.

Tác dụng: ngăn các unit "học vẹt" lẫn nhau (co-adapt) quá mức vào một tập training cụ thể — không unit nào dám dựa dẫm vào một unit khác, buộc mỗi unit phải học được đặc trưng hữu ích riêng.

---

### 🏆 Các kiến trúc CNN nổi tiếng

Ngoài **LeNet-5** của Yann LeCun, những cái tên quen thuộc khác là **AlexNet**, **GoogLeNet** (GoogleNet), **ResNet**. Mỗi kiến trúc thực chất chỉ là **một cách xếp layer**: convolution với stride nào, pooling ở đâu, thêm convolution, v.v.

AlexNet là ví dụ rõ cho việc "đi sâu thì trừu tượng tăng":

* Convolution đầu tiên bắt **edge** và các mảng sáng tối (blobs).
* Convolution thứ ba bắt đầu mô tả **texture**.
* Càng lên cao càng trừu tượng: nhận ra **bộ phận của vật thể**, rồi tới **lớp vật thể** — phân biệt bàn ăn, đồng hồ, con tàu...

Về quy mô, AlexNet tốn tài nguyên tới mức phải **chạy phân tán trên nhiều GPU**: trong sơ đồ kinh điển, một nửa ảnh đi vào GPU này, nửa kia đi vào GPU khác.

---

### 🧱 Ghép lại thành một CNN hoàn chỉnh

Đến đây bức tranh đã đủ:

```text
input (ảnh)
  → convolution
  → subsampling / pooling
  → (lặp lại nhiều lần)
  → dense (fully connected)
  → softmax (nếu cần output nhiều lớp)
```

Convolution tìm đặc trưng cục bộ, pooling nén thông tin, các layer cuối đưa ra quyết định phân loại. Bài tiếp theo bắt tay vào code: dựng CNN bằng **Keras** và huấn luyện trên MNIST.
