---
title: 'Bài 122 — Deployment là gì và vì sao cần đưa app lên online'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 122
status: edited
source: '122 - What is Deployment.md'
categories:
- AI
tags: []
---

# 🌐 Deployment: biến code local thành app ai cũng dùng được

> Nguồn: `122 - What is Deployment.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094069)

Chào các bạn! Bài ngắn này trả lời một câu đơn giản nhưng quan trọng: **deployment là gì**, và tại sao không thể chỉ chạy code trên máy mình rồi bảo người khác "cứ clone về mà dùng".

### 📦 Vấn đề khi chỉ chạy local

**Deployment** nghĩa là làm cho ứng dụng **truy cập được qua internet**, để người dùng tương tác mà không cần chạy code trên máy họ.

Hãy nhìn cách làm thông thường: bạn có một **GitHub repo** chứa code Python, file YAML cấu hình, nhiều module, tất cả trong một thư mục. Repo đó tạo ra cả **front end lẫn back end**. Nhưng để chạy thử, mỗi người dùng phải:

1. **Clone hoặc fork** repo.
2. **Cài requirements**.
3. **Chạy ứng dụng**.

Và kể cả khi làm xong ba bước đó, ứng dụng vẫn chỉ chạy **local** trên máy họ. Nếu bạn chạy nó trong một **container** trên máy mình, người khác ở nơi khác hoàn toàn không truy cập được.

---

### ☁️ Đưa app lên cloud để lấy một URL

Thay vì vậy, bạn **deploy một lần** lên một nền tảng cloud. Các lựa chọn quen thuộc:

* **AWS** — nhiều dịch vụ cho từ máy ảo tới serverless.
* **GCP** (Google Cloud).
* **Azure** (Microsoft).
* **Hugging Face Spaces** — miễn phí, quen với demo model.
* **Streamlit Cloud** — miễn phí, dành cho app Streamlit.

Sau khi deploy, nền tảng trả cho bạn một **URL**, ví dụ `https://myapp.run`.

Từ đó, bạn chỉ cần **chia sẻ URL** này cho bất kỳ ai trên thế giới. Họ mở bằng trình duyệt và dùng được ứng dụng — không cài dependency, không setup gì cả, chỉ cần có internet. Cloud lo phần chạy app, còn người dùng chỉ cần một cái link.

Hãy so sánh: trước đây mỗi người dùng (user 1, user 2, …, user n) đều phải tự clone, cài đặt và chạy — và kết quả vẫn chỉ nằm trên máy họ. Sau khi deploy, không ai cần làm gì ngoài mở link. Với một demo phân loại ảnh, đây chính là bước biến "code chạy được trên máy tôi" thành "sản phẩm ai cũng chạm tới được".

---

### 🪜 Ba bước của deployment

Quy trình deployment gói gọn trong ba bước:

1. **Develop the model** — cần "AI engine" có khả năng nhận tensor và dự đoán output.
2. **Create an interface** — giao diện nối với pre-processing và post-processing (chính là back end).
3. **Host the app online** — đưa model + interface lên nền tảng hosting.

Ba bước này xếp theo đúng thứ tự phụ thuộc: chưa có model thì không có gì để giao diện gọi; chưa có interface thì host cũng không ai dùng được. Khi làm dự án thật, mình thường hoàn thành bước 1 và 2 ở local trước, kiểm tra kỹ, rồi mới lên bước 3.

Bài sau mình sẽ bàn kỹ các **công cụ tạo demo tương tác**; trong dự án này mình chọn **Hugging Face Spaces** để host.
