---
title: 'Vì sao nên dùng machine learning thay vì viết luật tay'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 8
status: edited
source: '008 - Why Use Machine Learning or Deep Learning.md'
categories:
- AI
tags: []
---

# 🤔 Vì sao nên dùng machine learning thay vì viết luật tay?

> Nguồn: `008 - Why Use Machine Learning or Deep Learning.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656580)

Bài trước mình đã nói qua sự khác biệt giữa lập trình truyền thống và machine learning, và để lại một câu hỏi: **vì sao lại muốn dùng machine learning?** Hôm nay chúng ta trả lời câu hỏi đó bằng một ví dụ rất đời.

### 🍗 Viết tay mọi luật thì quá cồng kềnh

Nếu lúc nào cũng phải tự viết từng bước để tái tạo món gà nướng của bà ngoại, các bạn sẽ thấy ngay là rất mệt. Và đó mới chỉ là một món ăn đơn giản.

Vậy với một bài toán phức tạp thì sao?

---

### 🚗 Bài toán tự lái xe

Hãy tưởng tượng các bạn phải viết **mọi luật để lái xe**. Khi học lái, các bạn mất có thể 20 giờ, 100 giờ. Nhưng giờ hãy thử liệt kê từng luật một:

* Làm sao lùi xe ra khỏi sân nhà?
* Làm sao rẽ trái rồi chạy xuống phố?
* Làm sao đỗ xe, lùi chuồng?
* Làm sao dừng ở ngã tư?
* Làm sao biết chạy bao nhanh?

Mới đó đã nửa tá luật, các bạn có thể kể thêm rất nhiều, có khi lên tới hàng nghìn. Với một bài toán phức tạp như lái xe, liệu các bạn có thể nghĩ ra **hết** các luật không? Chắc là không.

Đó chính là lúc machine learning và deep learning phát huy tác dụng.

---

### 💬 "ML dùng được cho mọi thứ miễn là biến nó thành số"

Mình hay chia sẻ một bình luận hay trên video **2020 Machine Learning Roadmap** của mình. Đại ý: bạn có thể dùng ML cho **bất cứ thứ gì**, miễn là bạn chuyển được nó thành con số.

Đúng như mình nói ở bài trước: machine learning là biến thứ gì đó thành số để máy đọc được, rồi lập trình để tìm pattern. Khác một chỗ — với thuật toán ML, **chúng ta viết thuật toán, còn nó tự tìm pattern**, không phải chúng ta. Về lý thuyết, đó có thể là bất kỳ input hay output nào trong vũ trụ. Nghe khá đã, đúng không?

---

### 📏 Nhưng có phải lúc nào cũng nên dùng?

Không hẳn. Đây là lúc mình giới thiệu **rule số 1 của Google về machine learning**.

Nếu các bạn có thể xây một **hệ thống dựa trên luật đơn giản** — ví dụ năm bước nối nguyên liệu thành món gà của bà Sicily — và nó chạy đúng mọi lần, thì **nên làm cách đó**.

Nói cách khác: nếu giải được bài toán bằng một hệ rule-based đơn giản mà không cần machine learning, hãy làm vậy.

Đây là lời khuyên từ **Google's Machine Learning Handbook** (mình rất khuyến khích các bạn đọc). Các bạn có thể Google để tìm, link cũng sẽ có trong phần tài nguyên của khóa.

---

### 🎯 Chốt lại

Machine learning rất mạnh, rất vui và rất thú vị — nhưng điều đó không có nghĩa là lúc nào cũng nên dùng nó. Mình biết nói câu này ở đầu một khóa deep learning nghe hơi lạ, nhưng mình muốn các bạn nhớ: **hệ thống rule-based đơn giản vẫn tốt**. Machine learning không phải thuốc chữa bách bệnh.

Còn deep learning thực sự giỏi ở đâu? Mình để dành sang bài sau — hẹn gặp các bạn.
