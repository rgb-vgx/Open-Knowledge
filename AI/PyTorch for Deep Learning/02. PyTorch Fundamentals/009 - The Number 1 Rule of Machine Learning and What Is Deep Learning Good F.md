---
title: 'Deep learning giỏi việc gì và không nên dùng khi nào'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 9
status: edited
source: '009 - The Number 1 Rule of Machine Learning and What Is Deep Learning Good F.md'
categories:
- AI
tags: []
---

# ✅ Deep learning giỏi việc gì và không nên dùng khi nào

> Nguồn: `009 - The Number 1 Rule of Machine Learning and What Is Deep Learning Good F.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656582)

Bài trước mình nhắc tới **rule số 1 của machine learning**: nếu không cần thì đừng dùng. Vậy khi nào thì thực sự cần? Bài này mình sẽ chỉ ra những bài toán mà deep learning tỏa sáng, và cả những chỗ các bạn nên cân nhắc rút lui.

### 📋 Rule số 1: "không cần thì đừng dùng"

Với tinh thần đó, câu hỏi trở thành: chúng ta nên tìm đến machine learning hay deep learning trong trường hợp nào?

---

### 🧩 Ba loại bài toán deep learning xử lý tốt

**1. Bài toán có danh sách luật dài.** Cách truyền thống là có data input, viết danh sách luật để biến đổi data, rồi ra output. Nhưng nếu danh sách luật dài hàng trăm, hàng nghìn, thậm chí hàng triệu — như luật lái xe — thì ML/deep learning có thể giúp. Hiện nay, với xe tự lái, đây đang là cách tiếp cận **state of the art**.

**2. Môi trường thay đổi liên tục.** Deep learning có thể tiếp tục học nếu cần, nên nó thích nghi với tình huống mới. Cập nhật data huấn luyện là model có thể điều chỉnh theo loại data mới. Giống như các bạn lái xe quen trong xóm mình, nhưng đến nơi lạ thì vẫn phải dựa trên nền tảng cũ mà thích nghi: chạy bao nhanh, dừng ở đâu, đỗ chỗ nào.

**3. Dataset cực lớn.** Đây là nơi deep learning bùng nổ trong thế giới công nghệ.

Ví dụ mình thích: **Food-101** — bộ ảnh của 101 loại món ăn, các bạn có thể tìm online. Nếu muốn làm app chụp ảnh món ăn và phân biệt 101 loại, danh sách luật sẽ dài đến mức bạn cần một bộ rule riêng cho từng món.

Lấy một món thôi: làm sao viết chương trình nhận ra **quả chuối**? Bạn phải code ra hình dáng quả chuối — nhưng không chỉ quả chuối, mà cả **mọi thứ không phải quả chuối** trông như thế nào. Nghĩ thôi đã thấy bất khả thi.

Tóm lại, deep learning giỏi với: **bài toán nhiều luật**, **môi trường thay đổi liên tục**, và **khám phá insight trong tập dữ liệu lớn**.

---

### 🚫 Khi nào deep learning không phù hợp

Mình sẽ nói "thường là" (typically) vì mọi thứ còn tùy bài toán, và deep learning mạnh lên rất nhanh — biết đâu tương lai sẽ khác. Các bạn cứ giữ đầu óc mở.

* **Khi cần khả năng giải thích (explainability).** Pattern mà model deep learning học được là những con số gọi là **weights và biases**, thường con người không diễn giải được. Model có thể có một triệu, 10 triệu, 100 triệu, một tỷ tham số — có model đang tiến tới hàng nghìn tỷ. Tham số ở đây là các con số/pattern trong data. Nhìn một danh sách một triệu con số đã đủ khó, nói gì đến việc hiểu chúng.
* **Khi cách truyền thống tốt hơn.** Lại là rule số 1 của Google: nếu giải được bằng hệ rule-based đơn giản, có khi bạn không cần ML hay deep learning.
* **Khi sai số là không thể chấp nhận.** Output của model deep learning không phải lúc nào cũng đoán trước được — chúng có tính **probabilistic**, tức mỗi dự đoán là một "cược" xác suất. Với hệ rule-based, bạn biết chắc output mỗi lần. Nếu không thể chấp nhận sai số xác suất, hãy quay về hệ rule-based.
* **Khi không có nhiều dữ liệu.** Model deep learning thường cần khá nhiều data để cho kết quả tốt.

---

### 🩹 Vài lưu ý cho các ngoại lệ

Đúng là có những kỹ thuật giúp kết quả tốt mà không cần data khổng lồ — các bạn có thể tìm hiểu về **deep learning explainability**. Hay khi cần tái lập, có cách làm model **reproducible** để biết chắc output, và chúng ta sẽ làm nhiều bài test để kiểm chứng.

Vì vậy mình mới viết "typically" — mọi thứ còn tùy bài toán.

---

### 🔜 Tiếp theo

Chúng ta đã so sánh machine learning với deep learning. Bài tới mình sẽ điểm qua các không gian bài toán khác nhau, chủ yếu phân theo **loại dữ liệu** các bạn có. Những bức tranh đầy màu sắc đó để dành bài sau, để video này không bị quá dài. Hẹn gặp các bạn!
