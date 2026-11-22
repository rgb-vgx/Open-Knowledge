---
title: 'Bài 077 — Não người và CNN: V1 đến V5'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 77
status: edited
source: '077 - Human Brain V CNN.md'
categories:
- AI
tags: []
---

# 🧠 V1–V5: bộ não xử lý ảnh thế nào, CNN bắt chước ra sao

> Nguồn: `077 - Human Brain V CNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979351)

Chào các bạn! Bài trước đã điểm qua **cerebral cortex** và **occipital lobe**. Bài này ta đi vào chi tiết hơn: **visual cortex** chia làm các lớp **V1 đến V5**, mỗi lớp xử lý một loại thông tin. Đây chính là bản thiết kế mà **CNN** mô phỏng bằng các **filter**.

### 🔭 Visual cortex nằm ở đâu, làm gì

Tín hiệu từ mắt đi tới **cerebral cortex** (phụ trách eye movement và orientation), rồi được chuyển sang **visual cortex**. **Visual cortex nằm trong occipital lobe** — vùng chẩm ở phía sau não.

Chức năng: **tiếp nhận, tích hợp và xử lý thông tin thị giác** được chuyển từ **retina** (võng mạc trong mắt). Nó chia thành **5 lớp: V1 đến V5**.

### 🔍 Từng lớp xử lý gì

**V1 — primary visual cortex**
Xử lý **orientation của edges và lines** (hướng của cạnh và đường). Nhìn một con mèo hay con chó, ở V1 ta bắt đầu xác định được các **cạnh** và **đường** của vật thể.

**V2**
Xử lý **khác biệt màu sắc** (đỏ, hồng, xanh…), **pattern phức tạp** và **object orientation**. Pattern phức tạp nghĩa là vật tròn, vuông hay hình dạng phức tạp. V2 nhận tín hiệu đã được V1 xử lý và "hiểu" thêm một tầng.

**V3, V4, V5**
Các thao tác phức tạp như **object detection**, **object recognition** diễn ra ở đây.

### 🔁 Luồng tín hiệu có phản hồi

Điều đáng chú ý: **V2 gửi tín hiệu ngược lại V1**, đồng thời chuyển tiếp tới **V3, V4, V5**. Tức các lớp không chỉ chạy một chiều mà có **phản hồi qua lại**.

```text
Retina → V1 (edges, lines)
       → V2 (màu, pattern, orientation)  ⇄ ngược lại V1
       → V3/V4/V5 (object detection, recognition)
       → Occipital lobe: hình dung ảnh
```

Sau khi qua hết V3, V4, V5, ta **nhận diện và hình dung** được ảnh — vật thể bỗng "có nghĩa" với con người.

### 🔗 Liên hệ với CNN

Các nhà nghiên cứu **sao chép lại cơ chế này** trong CNN: mỗi lớp mạng xử lý và **tiền xử lý** một loại thông tin, giống mỗi lớp V1–V5 trích một mức hiểu biết.

Điểm nối cụ thể: trong **convolution layer**, việc tìm **edges và lines** được làm bằng các **filter**. Một filter có thể bắt **đường thẳng**, filter khác bắt **đường tròn**, filter khác bắt **đường ngang**… — đúng tinh thần "V1 bắt cạnh/hướng".

```text
Não:  V1 → V2 → V3/V4/V5  (mỗi lớp hiểu thêm)
CNN:  conv + filter qua từng lớp (mỗi lớp trích đặc trưng)
```

Đây chỉ là góc nhìn 100 feet, không đi sâu như y khoa — mục tiêu là hiểu **vì sao CNN có nhiều lớp và filter**. Bài sau ta sẽ xem cụ thể **các lớp trong CNN** và phép toán của chúng. Hẹn gặp lại!
