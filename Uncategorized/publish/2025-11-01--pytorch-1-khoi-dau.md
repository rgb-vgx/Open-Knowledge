---
title: 'PyTorch 1: Khởi đầu'
date: '2025-11-01 00:29:26'
date_gmt: '2025-10-31 17:29:26'
modified: '2025-11-01 00:29:26'
status: publish
slug: pytorch-1-khoi-dau
wordpress_id: 461
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/pytorch-1-khoi-dau/
categories:
- Uncategorized
tags: []
---

## 🤷‍♀️ Deep Learning là gì? (Phiên bản thực hành)

Nếu bạn đã tìm đến khóa học này, có thể bạn đã tự tìm hiểu "deep learning là gì". Nhưng ở đây, chúng ta sẽ chỉ lướt qua nó một cách ngắn gọn, vừa đủ để bạn bắt đầu.

Tại sao ư? Vì khóa học này **tập trung vào thực hành** và nhìn thấy mọi thứ hoạt động, chứ không phải là các định nghĩa suông.

Để hiểu deep learning, trước hết hãy nói về **Machine Learning (Học máy)**, vì deep learning là một tập hợp con của nó.

> **Machine Learning là gì?** Đó là quá trình biến "mọi thứ" (dữ liệu) thành **những con số**.
>
> Dữ liệu có thể là bất cứ thứ gì: hình ảnh, văn bản, bảng số, video, file âm thanh... Và máy tính thì cực kỳ yêu thích các con số.
>
> Sau đó, máy tính sẽ **tìm ra các quy luật (patterns)** bên trong những con số đó.

Làm thế nào máy tính tìm ra quy luật? Đó là công việc của một thuật toán machine learning (hoặc deep learning)—thứ mà chúng ta sẽ xây dựng trong khóa học này. Chúng làm điều đó bằng **Code** và **Toán học**.

### 💻 Khoá học này tập trung vào CODE

Tôi muốn nhấn mạnh điều này: Khóa học này **tập trung vào việc viết code**.

Dĩ nhiên, đằng sau hậu trường, code đó sẽ kích hoạt các phép toán để tìm ra quy luật. Nếu bạn muốn tìm hiểu sâu về phần toán học, tôi sẽ cung cấp các tài liệu bổ sung. Tuy nhiên, trọng tâm của chúng ta là **bắt tay vào viết thật nhiều code** để giải quyết vấn đề.

---

## 🎯 AI vs. ML vs. DL: Chúng liên quan gì đến nhau?

Bạn có thể đã thấy sơ đồ này ở đâu đó trên mạng. Tôi đã vẽ lại nó với màu sắc đẹp hơn cho khóa học của chúng ta.

- Bạn có một bong bóng lớn nhất là **Trí tuệ nhân tạo (Artificial Intelligence - AI)**, một chủ đề rất rộng.
- Bên trong nó, bạn có một tập hợp con là **Học máy (Machine Learning - ML)**.
- Và bên trong ML, bạn có một tập hợp con khác (và là trọng tâm của chúng ta) là **Học sâu (Deep Learning - DL)**.

Chúng ta sẽ tập trung vào Deep Learning bằng cách sử dụng PyTorch. Nhưng thành thật mà nói, cá nhân tôi thường sử dụng hai thuật ngữ ML và DL thay thế cho nhau. Vâng, ML là chủ đề rộng hơn và DL có sắc thái riêng, nhưng khóa học này quan tâm đến **cách chúng hoạt động** hơn là tranh luận về định nghĩa.

---

## 🍗 Lập trình truyền thống vs. Machine Learning

Đây là phần quan trọng để hiểu rõ "tại sao" chúng ta cần machine learning. Hãy xem xét sự khác biệt qua một ví dụ: **món gà quay trứ danh của bà ngoại bạn**.

### 1. Lập trình truyền thống

Giả sử bạn muốn viết một chương trình máy tính để tái tạo món gà đó.

- Bạn có **Đầu vào** (Input): Gà, rau củ, gia vị.
- Bạn tự viết ra các **Quy luật** (Rules) một cách rõ ràng:
  1. Cắt rau củ.
  2. Ướp gà.
  3. Làm nóng lò nướng ở 180°C.
  4. Nướng gà trong 30 phút, sau đó thêm rau củ...
- Kết quả là **Đầu ra** (Output): Món gà quay tuyệt hảo.

Trong lập trình truyền thống, **bạn phải tự tay viết MỌI quy luật**.

> **Công thức:** Đầu vào + Quy luật = Đầu ra

### 2. Machine Learning

Bây giờ, với phương pháp machine learning, mọi thứ đảo ngược lại.

- Bạn có **Đầu vào** (Input): Rất nhiều hình ảnh/dữ liệu về nguyên liệu (gà, rau củ...).
- Bạn có **Đầu ra** (Output) mong muốn: Rất nhiều hình ảnh/dữ liệu về món gà đã hoàn thành.
- Thuật toán Machine Learning sẽ **tự tìm ra các Quy luật (Rules)**, hay còn gọi là các *mô thức (patterns)*, để bắc cầu giữa Đầu vào và Đầu ra.

Trong machine learning, công việc của thuật toán là tìm ra mối quan hệ giữa chúng. Phương pháp này thường được gọi là **Học có giám sát (Supervised Learning)**, trong đó:

- Đầu vào = **Features** (Đặc trưng)
- Đầu ra = **Labels** (Nhãn)

> **Công thức:** Đầu vào + Đầu ra = Quy luật

---

## ❓ Câu hỏi cho bạn

Tạm thời như vậy là đủ về định nghĩa. Chúng ta sẽ sớm bắt tay vào code.

Nhưng trước khi kết thúc, tôi muốn bạn suy nghĩ về điều này: Dựa trên sự khác biệt mà chúng ta vừa thảo luận (ví dụ món gà quay), **tại sao bạn lại muốn sử dụng Machine Learning/Deep Learning thay vì lập trình truyền thống?**

(Gợi ý: Việc mô hình hóa tất cả các quy luật bằng tay có thể trở nên "cồng kềnh" như thế nào?)

Hãy suy nghĩ về điều đó, và chúng ta sẽ thảo luận trong bài viết tiếp theo!
