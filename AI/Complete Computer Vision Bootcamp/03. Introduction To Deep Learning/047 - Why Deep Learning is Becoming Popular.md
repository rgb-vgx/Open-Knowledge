---
title: 'Bài 047 — Vì sao Deep Learning bùng nổ'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 47
status: edited
source: '047 - Why Deep Learning is Becoming Popular.md'
categories:
- AI
tags: []
---

# 🚀 Vì sao Deep Learning lại trở nên phổ biến đến vậy?

> Nguồn: `047 - Why Deep Learning is Becoming Popular.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940433)

Chào các bạn, ta tiếp tục series Deep Learning. Bài này mình sẽ lý giải **vì sao deep learning bùng nổ**. Để hiểu, hãy tua lại về khoảng năm 2005 và đi theo dòng chảy dữ liệu, phần cứng và framework.

### 📅 Bối cảnh: dữ liệu sinh ra theo cấp số nhân

Năm **2005**, **Facebook** ra đời và người người bắt đầu đăng story, ảnh, video. Rồi **YouTube**, **WhatsApp**, **LinkedIn**, **Twitter** lần lượt xuất hiện. Tất cả đều là nền tảng **social media**, và chúng tạo ra một lượng dữ liệu khổng lồ.

Đến giai đoạn **2011–2012**, hầu hết nền tảng social media đã có mặt, và dữ liệu **tăng theo cấp số nhân**. Dữ liệu đó gồm đủ loại: **ảnh**, **text**, **document**, **video**.

Lúc này các công ty chỉ nghĩ tới một câu hỏi: **làm sao lưu trữ dữ liệu thật hiệu quả** để có thể truy cập nhanh. Đó là lúc **big data** trở nên nổi tiếng, với **Hadoop**, **HBase**, **Hive** — lưu trữ được cả **structured** lẫn **unstructured data** (ảnh cũng là dữ liệu phi cấu trúc).

Khoảng năm 2011, khi mình sắp tốt nghiệp kỹ sư, các framework big data đã thành hình qua những công ty như **Cloudera**, **Hortonworks**: họ cung cấp đủ loại Hadoop, Hadoop VM để lưu trữ và truy cập dữ liệu mọi nơi. Ngày nay rất nhiều công ty, ngân hàng đang chuyển sang mô hình big data vì truy cập dữ liệu nhanh và hiệu quả.

Nhưng giữ dữ liệu trong kho thì chưa đủ — các công ty muốn **dùng** nó để làm sản phẩm tốt hơn và kiếm nhiều doanh thu hơn.

---

### ⚙️ Lý do 1: phần cứng, đặc biệt là GPU

Muốn train deep learning model, bạn cần **GPU**. Ngày nay giá GPU giảm dần nhờ **Nvidia** liên tục ra mắt GPU cấu hình cao và tối ưu giá theo nghiên cứu. Bạn còn có thể thuê GPU **trên cloud** với chi phí rẻ, đủ sức train những model ngày càng lớn.

### 📈 Lý do 2: dữ liệu khổng lồ đã có sẵn

Deep learning model vốn **cần rất nhiều dữ liệu**, và khi có nhiều dữ liệu chúng thường **hoạt động tốt hơn**. Dữ liệu đã và đang được sinh ra liên tục, đúng thứ deep learning cần.

### 🎬 Ví dụ Netflix: biến dữ liệu thành doanh thu

**Netflix** khởi đầu là nền tảng stream phim. Mục tiêu không chỉ là có nhiều subscription, mà còn **giữ người dùng gắn bó** — có những người bạn của mình xem Netflix cả tuần, từ sáng đến tối. Phim hay, series chất lượng là một phần, nhưng điểm mấu chốt là **recommendation system**.

Cơ chế rất đơn giản: mình đang xem phim hành động, Netflix có lượng dữ liệu và lượng phim khổng lồ; nếu nó gợi ý một phim hành động khác cũng thú vị, mình có thể xem tiếp. Nhờ vậy mình gắn bó với nền tảng và có thể gia hạn subscription từng tháng. Hệ gợi ý này được xây từ **dữ liệu tương tác** của người dùng được lưu lại. Mục tiêu cuối cùng vẫn là **tăng doanh thu**.

### 📉 Lý do 3: đường cong dữ liệu — hiệu năng

Đây là điểm rất quan trọng. Với **machine learning algorithm** truyền thống, khi dữ liệu tăng thì hiệu năng có tăng, nhưng **đến một mức nào đó sẽ chững lại** — thêm dữ liệu cũng không cải thiện accuracy.

Ngược lại, với **deep learning**, dữ liệu càng nhiều thì hiệu năng (accuracy) **càng tiếp tục tốt lên**. Chính đặc tính này khiến deep learning được dùng ở vô số use case khi dữ liệu ngày càng dồi dào.

```text
Performance
   │        ML: tăng rồi chững
   │      __/
   │    _/
   │  _/           DL: tiếp tục tăng
   │ /          __/
   │/        __/
   └────────────────────────► Data
```

### 🌍 Lý do 4: mặt bằng ứng dụng quá rộng

Deep learning có mặt ở **medical imaging**, **e-commerce**, **retail**, **marketing**… Danh sách không bao giờ hết. Gần như bất kỳ domain nào bạn nghĩ ra đều tìm được use case, vì có đủ loại kỹ thuật deep learning để giải từng loại bài toán. Đó là lý do người ta ngày càng tin tưởng giao những bài toán khó cho deep learning.

---

### 🔧 Lý do 5: framework mã nguồn mở

Điểm quan trọng nhất: sự trỗi dậy của các **open-source framework**. Hai cái tên lớn là **TensorFlow** và **PyTorch**:

* **TensorFlow** — mã nguồn mở từ **Google**, do nhóm **Google Brain** phát triển.
* **PyTorch** — do **Facebook** khởi tạo.

Cả hai đều làm được những việc ấn tượng: **RNN**, **LSTM**, **BERT**, **Transformers**… Vì mã nguồn mở nên **cộng đồng tăng mạnh**; cộng đồng lớn thì **nghiên cứu nhiều hơn**, và mỗi ngày bạn lại thấy điều mới xuất hiện trong deep learning.

Trước đó, khoảng **2004–2005**, các công ty loay hoay tìm cách lưu trữ dữ liệu hiệu quả và tạo ra kiến trúc **Hadoop**, rồi Hive, Flume. Về sau họ nhận ra không thể chỉ cất dữ liệu trong storage, server hay database — mà phải **dùng dữ liệu để làm sản phẩm tốt hơn**, kiếm thêm doanh thu. **Self-driving car**, **Netflix** là những ví dụ: tự động hóa nhiều tác vụ hơn, giải đúng bài toán, tác động tích cực tới sản phẩm.

Đó là những lý do deep learning trở nên phổ biến. Bài sau mình sẽ nói về **perceptron** — đơn vị cơ bản nhất của mạng neural — để các bạn thấy deep learning thực sự vận hành ra sao. Hẹn gặp lại!
