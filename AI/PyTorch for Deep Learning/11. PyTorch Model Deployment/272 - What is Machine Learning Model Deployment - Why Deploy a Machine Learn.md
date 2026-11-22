---
title: 'Bài 272 — Machine Learning Model Deployment là gì và vì sao phải deploy?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 272
status: edited
source: '272 - What is Machine Learning Model Deployment - Why Deploy a Machine Learn.md'
categories:
- AI
tags: []
---

# 🚀 Machine Learning Model Deployment: đưa model ra khỏi notebook

> Nguồn: `272 - What is Machine Learning Model Deployment - Why Deploy a Machine Learn.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055214)

Chào mừng các bạn đến với phần model deployment — và đây là **Milestone Project 3**, lúc mình gom tất cả những gì đã học lại với nhau. Chúng ta sẽ không chỉ train model nữa, mà đưa nó ra để người khác hoặc chương trình khác dùng được. Trước khi code, hãy cùng trả lời hai câu hỏi nền tảng: deployment là gì, và tại sao phải làm?

### 🧠 Deployment là gì?

Mình định nghĩa **machine learning model deployment** đơn giản là **làm cho model của bạn trở nên sẵn dùng với một ai đó hoặc một thứ gì đó khác**.

Các bạn hình dung luồng cơ bản: có dữ liệu đầu vào (hàng và cột, hoặc ảnh), đưa qua model, nhận ra kết quả — rồi kết quả đó đến tay **someone else** hoặc **something else**. Hai trường hợp này có thể trộn lẫn vào nhau.

* **Someone else** — ví dụ **Food Vision Mini**, model phân loại ảnh món ăn thành pizza, steak, sushi. Người dùng cầm điện thoại chụp món ăn và nhận kết quả ngay trên máy.
* **Something else** — ví dụ model phát hiện giao dịch gian lận bằng XGBoost, chạy phía sau hệ thống thanh toán: quẹt thẻ, model quyết định cho giao dịch đi qua hay chặn lại.
* Hai trường hợp có thể hoán đổi: khi giao dịch bị chặn, chính *bạn* cũng cảm nhận được; còn model Food Vision có thể được một chương trình khác dùng để ghi lại những ảnh model dự đoán sai (ví dụ đoán sushi thay vì steak) và cập nhật lại dataset.

Tóm lại: deployment là đưa model đến tay người dùng hoặc một app/program khác.

### ❓ Nếu model không rời notebook, nó có tồn tại?

Đây là một trong những câu hỏi triết học quan trọng nhất của machine learning, và cũng là lý do số một để deploy: **vì nó vui**.

Từ đầu khóa đến giờ, model của chúng ta chỉ nằm trong notebook và chỉ mình ta truy cập được. Nếu train xong rồi cất đó, không ai dùng, thì model có thực sự tồn tại?

Nhớ lại khái niệm **ba tập dữ liệu** — training set, validation set, test set — đều nằm trong notebook, máy local hoặc Google Colab. Giờ mình giới thiệu **tập dữ liệu thứ tư**: **real world**. Chỉ khi deploy, các bạn mới thực sự kiểm tra được model ngoài đời thật.

### 🔄 Thêm bước deploy vào PyTorch workflow

Chúng ta đã đi qua workflow quen thuộc: chuẩn bị dữ liệu → chọn hoặc xây model pretrained → dựng training loop → chọn loss function và optimizer → fit model → đánh giá → cải thiện qua thực nghiệm → lưu và load lại model.

Giờ thêm một bước nữa — mình gọi là **step X** (X là số bất kỳ, các bạn thay gì cũng được): **deploy và monitor**.

1. Train ra một model đủ tốt.
2. **Deploy** nó để chạy thật.
3. **Monitor** — đánh giá hiệu năng ngoài thế giới thật.
4. Nếu phát hiện vấn đề chưa gặp trong training/test set, thu thập thêm dữ liệu, cập nhật dataset hoặc model.
5. Quay lại đầu workflow và lặp lại — tạo thành một vòng lặp.

Các bước train/evaluate ở trên thường được gọi là **machine learning** hay **data science**. Còn từ lúc deploy và monitor trở đi, người ta gọi là **MLOps** (ML operations) hay **machine learning engineering**.

### ⚙️ MLOps và hạ tầng quanh model

Wikipedia định nghĩa **MLOps** là tập hợp các thực hành nhằm **deploy và duy trì** machine learning model trong **production** — nghĩa là model sẵn dùng cho ai đó/thứ gì đó một cách **đáng tin cậy và hiệu quả**.

Nối tiếp ý của George Hotz (founder Comma.ai): muốn thành machine learning engineer thì hãy tải một paper, implement nó, và lặp lại đến khi đủ kỹ năng. Mình thêm bước thứ tư: **machine learning engineering bao gồm cả việc xây hạ tầng** — phần code bao quanh model và các bước tiền xử lý dữ liệu. Một trong những phần hạ tầng đó chính là **code để deploy model**.

Nếu muốn đào sâu, transcript gợi ý tìm "What is MLOps", "MLOps 101" cùng các sách/khóa học trong mục **PyTorch Extra Resources**, nơi có phần tài nguyên riêng cho machine learning / deep learning engineering.

---

Vậy là đã rõ deployment là gì và vì sao nên làm. Câu hỏi tiếp theo — **có những kiểu deployment nào?** — mình để dành làm cliffhanger cho bài sau. Trong lúc chờ, các bạn thử nghĩ xem model gần nhất của mình sẽ phục vụ *ai* hoặc *cái gì*, và nếu đưa ra thế giới thật thì nó cần chạy ở đâu.
