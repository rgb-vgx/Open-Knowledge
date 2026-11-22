---
title: 'Custom dataset là gì và chúng ta sẽ học gì trong section này'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 134
status: edited
source: '134 - What Is a Custom Dataset and What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 🍕 Custom dataset là gì và chúng ta sẽ học gì

> Nguồn: `134 - What Is a Custom Dataset and What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708234)

Chào các bạn, chào mừng đến với section về **custom dataset** với PyTorch. Đến đây các bạn đã dựng vài neural network trên những dataset có sẵn như FashionMNIST, nhưng chắc hẳn trong đầu đang có câu hỏi lớn: "Mình có dữ liệu riêng, có tự build model được không?" Câu trả lời là có — chỉ cần đi qua vài bước tiền xử lý để dữ liệu tương thích với PyTorch. Bài này mình sẽ vừa điểm lại bí kíp tự cứu mình, vừa vẽ ra bức tranh tổng thể của cả section.

### 🆘 Bí kíp khi bị kẹt

Trước khi vào nội dung, mình nhắc lại quy trình tự cứu mình — vì nó quan trọng và sẽ theo các bạn suốt khóa:

1. **Follow along với code** — cố gắng gõ theo, chạy thử. Khẩu hiệu: *if in doubt, run the code*.
2. **Đọc docstring** — trên Google Colab bấm **Shift + Command + Space** (Windows thì dùng **Control**).
3. **Search** — copy nguyên thông báo lỗi, dán vào Google. Hai nguồn hay gặp là Stack Overflow và tài liệu chính thức của PyTorch.
4. **Thử lại** — quay lại đọc code một lượt nữa.
5. Cuối cùng mới **đặt câu hỏi** trên trang Discussions của repo GitHub khóa học. Chọn mục **Q&A**, ghi số video (ví dụ 99), mô tả lỗi và dán code.

Transcript lưu ý: URL discussions trên slide chỉ vào trang `mrdbourke/pytorch-deep-learning` — nơi có cả notebook "ground truth" cho section này.

### 📚 Tài nguyên của section

Mình nhấn mạnh lại: tài nguyên nằm ở trang sách online **Learn PyTorch**, phần của section này. Các bạn có thể dùng nó như tài liệu tham khảo khi bí. Còn trên GitHub có sẵn notebook **PyTorch custom datasets** — đây là **ground truth notebook**, cứ kẹt thì mở ra đối chiếu.

### 🧩 Custom dataset là gì?

Ta đã build khá nhiều neural network trên các dataset có sẵn. Nhưng câu hỏi là: nếu mình có **dataset riêng** hoặc đang giải bài toán riêng của mình, liệu có build model PyTorch để dự đoán trên đó được không? Được. Chỉ là phải qua vài bước tiền xử lý để dữ liệu tương thích với PyTorch — và đó chính là nội dung của section.

### 🧠 Các thư viện domain của PyTorch

Điểm cần nắm: PyTorch có các **domain library** chuyên cho từng loại dữ liệu:

* **`torchvision`** — dữ liệu thị giác (vision), ví dụ phân loại ảnh pizza/steak/sushi.
* **`torchtext`** — dữ liệu văn bản (text), ví dụ review tích cực hay tiêu cực.
* **`torchaudio`** — dữ liệu âm thanh (audio), ví dụ phân loại bài hát đang phát (kiểu Shazam).
* **`torchrec`** — hệ gợi ý (recommendation system), ví dụ trang chủ cập nhật gợi ý cho người dùng.

Mỗi thư viện đều có module `datasets` với hàm nạp dữ liệu cho domain tương ứng: có dataset dựng sẵn, và có cả hàm để nạp dataset của riêng các bạn. Ngoài ra còn **`torchdata`** — chứa nhiều helper nạp dữ liệu, ở thời điểm ghi hình (tháng 4/2022) vẫn đang **beta** và sẽ còn cập nhật.

### 🍔 Mục tiêu: Food Vision Mini

Cả section sẽ cùng hướng tới build **Food Vision Mini**: nạp ảnh pizza, sushi, steak từ dataset Food 101, build một model phân loại ảnh (kiểu model đứng sau app nhận diện ảnh món ăn), rồi xem nó có phân loại đúng pizza là pizza, sushi là sushi, steak là steak không. Mình cũng khoe luôn dự án cá nhân đang làm — **NutriFact App**, một app nhận diện ảnh món ăn kèm thông tin dinh dưỡng — vẫn đang hoàn thiện, và Food Vision Mini sẽ là phiên bản gần giống vậy.

### 🗺️ Lộ trình của section

Toàn bộ vẫn xoay quanh **PyTorch workflow** quen thuộc. Cụ thể:

* Nạp dataset **của riêng mình** thay vì dataset có sẵn.
* "Become one with the data" — tức là chuẩn bị và visualize dữ liệu.
* **Transform** dữ liệu để dùng được với model.
* Nạp custom data bằng hàm dựng sẵn **và** hàm tự viết.
* Build model phân loại đa lớp (multiclass) Food Vision Mini.
* So sánh model **có** và **không có** data augmentation.
* Dự đoán trên **custom data** — dữ liệu nằm ngoài tập train/test.

### ✅ Tạm kết

Mình muốn coi machine learning như một môn nghệ thuật hơn là hóa học, nên cả section sẽ là "nấu" thật nhiều code. Việc đầu tiên cần làm là có dữ liệu đã — hẹn các bạn ở bài sau, mình vào Colab và bắt đầu code.
