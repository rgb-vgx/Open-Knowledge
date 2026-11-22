---
title: 'Section này sẽ làm gì: replicate ViT cho Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 225
status: edited
source: '225 - What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 🗺️ Section này sẽ làm gì: replicate ViT cho Food Vision Mini

> Nguồn: `225 - What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975298)

Đây là bài bản đồ cho cả section. Mục tiêu lớn: lấy một kiến trúc **state of the art** do Google Brain Research Team công bố, rồi áp vào bài toán của mình — **Food Vision Mini**. Nói vui thì đây đúng kiểu task được giao ở công ty: "Kiến trúc computer vision mới ra tuần trước, implement cho bài Food Vision đi."

### 🧩 Kiến trúc ViT áp vào bài toán của mình

Mạng neural rất tùy biến, nên mình sẽ thay kiến trúc gốc bằng **Vision Transformer**. Với Food Vision Mini, luồng xử lý trông như sau:

1. Có một ảnh pizza.
2. Cắt ảnh thành các **patch**.
3. **Embed** các patch đó (phần này sẽ làm rõ sau).
4. Đưa chuỗi embedding qua **transformer encoder layer**, lặp lại vài lần.
5. Đưa output qua **MLP head**.

**MLP** là **Multi-Layer Perceptron** — một lớp mạng fully connected, thuộc họ feedforward neural network, đúng kiểu mạng mình vẫn dựng từ đầu khóa. Thuật ngữ này hơi mơ hồ: có khi người ta dùng nó để chỉ bất kỳ feedforward network nào; trong paper ViT, MLP là layer có **hai lớp với non-linearity GELU**.

Gặp từ lạ như "GELU non-linearity" thì cứ tra tiếp — kiểu lần theo dấu vết. Không cần hiểu hết ngay, cứ tách nhỏ từng bước là hiểu được.

---

### 🛠️ Các bước của section

1. **Setup** — không viết lại code cũ. Mình đã có cả đống code tái sử dụng ở các section trước, chỉ cần import và chạy.
2. **Giới thiệu paper replicating với PyTorch** — từ tổng quan chuyển sang viết code thật.
3. **Replicate ViT** cho bài toán Food Vision Mini — tự tay dựng lại kiến trúc state of the art.
4. **Train ViT tự dựng** trên data của mình.
5. **So sánh**: ViT train from scratch bằng data riêng liệu có tốt bằng **feature extraction** với một ViT **pretrained** không? Đây chính là **transfer learning** đã học ở section 6.

---

### 👨‍🍳 Tinh thần của section

Mình hay ví: machine learning engineer giống đầu bếp. Đầu bếp cầm công thức nấu ra món ăn; còn mình cầm một research paper đẹp đẽ và biến nó thành **code chạy được**. Section này sẽ nấu khá nhiều code, nhưng từng bước một.

---

### ✅ Chốt lại

Chuẩn bị tinh thần: section này khá sâu, có nhiều thứ mới. Nếu kẹt, cứ bình tĩnh — mọi thứ đều nằm trong chương 8 của giáo trình. Bài sau mình vào Google Colab và bắt đầu setup.
