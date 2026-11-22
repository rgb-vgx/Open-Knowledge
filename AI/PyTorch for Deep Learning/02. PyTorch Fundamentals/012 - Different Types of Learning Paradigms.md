---
title: 'Các paradigm học: supervised, unsupervised và transfer learning'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 12
status: edited
source: '012 - Different Types of Learning Paradigms.md'
categories:
- AI
tags: []
---

# 🧭 Các paradigm học trong deep learning

> Nguồn: `012 - Different Types of Learning Paradigms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656590)

Chúng ta đã điểm qua giải phẫu của một mạng neural. Giờ là lúc nói về **các paradigm học** — tức những cách khác nhau để một mô hình học từ dữ liệu. Mình sẽ đi qua bốn kiểu: **supervised**, **unsupervised/self-supervised**, **transfer learning**, và nhắc thêm **reinforcement learning**.

### 🏷️ Supervised learning: có dữ liệu và nhãn

Đây là kiểu quen thuộc nhất. Các bạn có **data** và **labels**.

Ví dụ quay lại món gà nướng của bà Sicily: input là nguyên liệu — rau củ, gà — kèm thật nhiều ví dụ về thành phẩm lý tưởng.

Hoặc bài toán phân biệt **mèo và chó**: các bạn có một nghìn ảnh mèo và một nghìn ảnh chó, và biết rõ ảnh nào là gì. Đưa data kèm nhãn cho thuật toán, nó sẽ học cách phân biệt.

Nói ngắn: **supervised learning = data + labels**.

### 🧩 Unsupervised và self-supervised: chỉ có dữ liệu

Ở đây các bạn chỉ có **data**, không có **label**. Vẫn là ảnh mèo chó, nhưng chỉ có ảnh, không biết ảnh nào là mèo, ảnh nào là chó.

Với **self-supervised learning**, thuật toán có thể học ra một **representation nội tại** — pattern trong các con số, còn gọi là weights, features. Nó tìm ra những pattern cơ bản giữa ảnh chó và ảnh mèo, nhưng **không nhất thiết biết** đâu là chó, đâu là mèo.

Sau đó, chính các bạn có thể bước vào: "Cho tôi xem những pattern bạn đã học." Nó đưa ra một loạt cụm, và các bạn gán nhãn: cụm trông thế này là chó, cụm trông thế kia là mèo.

Tóm lại: **unsupervised và self-supervised chỉ học từ chính dữ liệu**.

### 🔁 Transfer learning: học từ mô hình khác

Đây là paradigm **cực kỳ quan trọng** trong deep learning.

Ý tưởng: lấy những pattern mà một model đã học trên một bộ dữ liệu, rồi **chuyển** sang một model khác.

Ví dụ, để xây thuật toán supervised phân biệt ảnh mèo chó, các bạn có thể bắt đầu từ một model **đã học pattern trên ảnh** rồi, chuyển những pattern nền tảng đó sang model của mình. Model mới có một khởi đầu thuận lợi — như được "chạy trước" một đoạn.

Transfer learning là kỹ thuật rất, rất mạnh. Trong khóa này, chúng ta sẽ viết code tập trung vào hai paradigm phổ biến nhất: **supervised learning** và **transfer learning**. Tuy vậy, cách viết code đó có thể thích ứng sang các paradigm khác.

### 🎮 Reinforcement learning: một góc riêng

Có một kiểu mình chưa nhắc, nằm ở "ngăn" riêng: **reinforcement learning** (học tăng cường). Mình để nó như phần mở rộng cho các bạn tự tìm hiểu.

Ý tưởng chính: có một **environment** (môi trường) và một **agent** (tác nhân) thực hiện **actions** trong môi trường đó; hệ thống trả lại **rewards** và **observations** cho agent.

Ví dụ đời thường: dạy chó đi vệ sinh ngoài trời. Bạn thưởng khi nó đi đúng chỗ, và có thể không thưởng khi nó "giải quyết" trên ghế sofa.

### 🎯 Chốt lại

Bốn paradigm, bốn cách tiếp cận. Trong khóa này chúng ta tập trung vào **supervised** và **transfer learning** — hai kiểu phổ biến nhất trong machine learning và deep learning — và viết bằng PyTorch.

Trước khi sang bài sau, mình giao các bạn một thử thách nhỏ: **tự tìm hiểu xem deep learning đang được dùng cho những việc gì**, và nghĩ ra vài ý tưởng của riêng mình. Hẹn gặp lại!
