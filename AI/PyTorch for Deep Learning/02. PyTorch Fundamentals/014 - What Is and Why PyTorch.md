---
title: 'PyTorch là gì và vì sao nên chọn PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 14
status: edited
source: '014 - What Is and Why PyTorch.md'
categories:
- AI
tags: []
---

# 🔥 PyTorch là gì và vì sao nên chọn PyTorch?

> Nguồn: `014 - What Is and Why PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656594)

"Little boy torch" — chào các bạn! Bài này mình sẽ trả lời câu hỏi **PyTorch là gì** và đưa ra một loạt lý do khiến nó đáng học. Trước khi bắt đầu, mình muốn nhấn mạnh một điều: khóa học này **không thay thế** trang chủ của PyTorch.

### 🌐 pitorch.org là "ground truth" của bạn

Trang **pytorch.org** là nơi các bạn nên ghé thăm nhiều nhất trong suốt khóa học. Ở đó có:

* Hướng dẫn **get started**.
* Toàn bộ **ecosystem** của PyTorch.
* Cách cài đặt trên máy local.
* **Resources**, tài liệu **docs**, **GitHub**, tìm kiếm, **blog**...

Mỗi khi viết code PyTorch, hãy quay lại đây đọc tài liệu và xem ví dụ.

---

### 🧰 PyTorch là gì?

PyTorch là **framework deep learning phổ biến nhất cho nghiên cứu**, cho phép các bạn viết code deep learning nhanh bằng **Python**. Nếu đã biết Python — một ngôn ngữ rất thân thiện — các bạn có thể viết code deep learning tân tiến, được **tăng tốc bằng GPU**, ngay bằng Python.

Những gì PyTorch mang lại:

* Truy cập nhiều **prebuilt model** từ **Torch Hub** — nơi tập hợp rất nhiều model có sẵn.
* **Torchvision models** — hữu ích cho **transfer learning**, tức dùng model của người khác để làm nền cho model của mình.
* Một **ecosystem** trọn bộ cho cả pipeline machine learning: tiền xử lý dữ liệu, đưa dữ liệu vào **tensor**, xây model như neural network, rồi thậm chí **deploy** model vào ứng dụng hoặc cloud.

PyTorch ban đầu được thiết kế và dùng nội bộ bởi **Facebook/Meta**. Giờ nó là **open source** và được dùng bởi Tesla, Microsoft, OpenAI...

---

### 📊 Bằng chứng: 58% paper dùng PyTorch

Đừng chỉ nghe mình nói. Hãy xem **paperswithcode.com/trends** — trang theo dõi các paper machine learning mới nhất và xem chúng có kèm code hay không.

Trên trang này, các framework khác như **TensorFlow**, **JAX**, **PaddlePaddle**, **Torch** gốc đều xuất hiện. Còn PyTorch, tính đến thời điểm tháng 12/2021, chiếm **58%**.

Con số này đáng kinh ngạc: trong khoảng **65.000 paper có code** mà trang theo dõi, 58% được triển khai bằng PyTorch. Đó là framework phổ biến nhất để viết code cho các thuật toán machine learning tân tiến nhất.

Papers with Code là một trong những tài nguyên mình thích nhất để cập nhật xu hướng ngành — nó bao phủ semantic segmentation, image classification, object detection, image generation, computer vision, NLP, y tế... Các bạn cứ tự khám phá nhé.

---

### 🚀 Vì sao PyTorch?

Ngoài chuyện là "con cưng" của giới nghiên cứu, còn vài lý do rất thực tế:

* **Tesla** dùng PyTorch cho các model computer vision của Autopilot. Andrej Karpathy, khi đó là Director of AI tại Tesla, đã có những buổi nói chuyện về việc này — trong video, xe nhận diện được những gì đang diễn ra trong cảnh.
* **OpenAI** đã chuẩn hóa trên PyTorch (theo blog tháng 1/2020), và dùng nó cho các model đứng sau API của họ.
* **Nông nghiệp**: robot nông nghiệp dùng PyTorch với **object detection** để nhận diện loại cỏ dại cần phun thuốc.
* **Meta** dùng PyTorch nội bộ cho mọi ứng dụng machine learning.
* **Microsoft** cũng tham gia rất mạnh.

Nếu chừng đó vẫn chưa đủ, có lẽ các bạn đang ở sai khóa học rồi (mình đùa thôi!).

---

### ⚡ GPU, CUDA và TPU

Lý do cuối: PyTorch giúp chạy code machine learning **tăng tốc trên GPU**.

**GPU (graphics processing unit)** là chip cực nhanh trong việc "nhai" số. Ban đầu nó được thiết kế cho video game — game hiện đại cần rất nhiều phép tính số học để render đồ họa.

PyTorch tận dụng GPU thông qua interface tên là **CUDA**. CUDA là một **parallel computing platform** và **API** cho phép phần mềm dùng một số loại GPU để tính toán đa dụng. Nhờ đó, PyTorch chạy code của bạn trên **GPU của Nvidia**.

Ngoài GPU còn có **TPU (tensor processing unit)**. PyTorch cũng chạy được trên TPU, nhưng GPU phổ biến hơn nhiều trong thực tế — nên khóa này tập trung vào GPU.

Và này, tại sao lại gọi là **tensor** processing unit? Vì machine learning và deep learning làm việc rất nhiều với **tensor**. Vậy tensor là gì? Bài sau chúng ta sẽ trả lời — nhưng trước đó, mình muốn các bạn tự Google "what is a tensor" đã. Hẹn gặp lại!
