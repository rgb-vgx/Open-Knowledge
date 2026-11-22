---
title: 'Bài 304 — Hugging Face Spaces: nơi host demo ML lâu dài'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 304
status: edited
source: '304 - Getting Ready to Deploy Our App Hugging Face Spaces Overview.md'
categories:
- AI
tags: []
---

# 🌍 Hugging Face Spaces: GitHub của thế giới machine learning

> Nguồn: `304 - Getting Ready to Deploy Our App Hugging Face Spaces Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34093858)

Chào các bạn. Video trước mình đã có một Gradio demo chạy ngon lành, nhưng mở lại link cũ thì chỉ thấy "No interface is running right now" — đúng như dự đoán, link `share=True` hết hạn sau **72 giờ**. Giờ mình tìm chỗ host vĩnh viễn.

### ⏳ Vấn đề của link tạm

Link do `launch(share=True)` tạo ra có hạn 72 giờ. Quá hạn là chết. Với demo cá nhân thì tạm được, nhưng để làm portfolio, trình bày ở hội nghị hay gửi cho stakeholder thì không ổn.

### 🤗 Hugging Face Spaces là gì?

Hugging Face Spaces cho phép host **ML demo app** ngay trên profile cá nhân hoặc profile của tổ chức. Vài điểm chính:

* Xây dựng **portfolio ML**, khoe dự án với hội nghị, stakeholder.
* Cộng tác với người khác trong cộng đồng ML.
* Hỗ trợ tốt hai framework Python phổ biến là **Gradio** và **Streamlit**. Mình đang dùng Gradio nên đi tiếp với nó.
* Có sẵn một kho demo của cộng đồng tại `huggingface.co/spaces` — ví dụ Stable Diffusion cũng chạy ở đó.

### 🐙 Vì sao nói "GitHub của ML"?

Mình hay ví Hugging Face là **GitHub của machine learning**. GitHub là nơi khoe kỹ năng code; Hugging Face Spaces là nơi khoe kỹ năng ML qua các demo đã build. Dưới nắp, mỗi Space là một **git repository**, nên quy trình làm việc rất giống GitHub: thêm file, commit, push.

Nếu các bạn chưa quen Git, có rất nhiều khóa miễn phí (ví dụ của freeCodeCamp). Ở đây mình chỉ dùng những lệnh cơ bản nhất.

### 🎯 Mục tiêu của section này

Mình sẽ biến Gradio demo trong Colab thành một thư mục app hoàn chỉnh:

1. Gom code demo vào một **thư mục** duy nhất.
2. Tải thư mục đó từ Colab về máy.
3. Đưa các file lên **Hugging Face Spaces** để host vĩnh viễn.

Kết quả cuối cùng là một link ổn định, ai cũng mở được, giống trang Food Vision Mini mình đã chuẩn bị sẵn.

---

Trước khi đụng vào file, bài sau mình xem **cấu trúc thư mục** mà một Space mong đợi — để biết cần tạo những file nào.
