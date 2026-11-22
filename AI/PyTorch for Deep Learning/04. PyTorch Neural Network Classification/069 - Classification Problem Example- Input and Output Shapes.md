---
title: 'Input và output của bài toán phân loại: từ pixel đến xác suất dự đoán'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 69
status: edited
source: '069 - Classification Problem Example- Input and Output Shapes.md'
categories:
- AI
tags: []
---

# 📐 Input và output của bài toán phân loại trông như thế nào?

> Nguồn: `069 - Classification Problem Example- Input and Output Shapes.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775604)

Bài trước mình mới điểm qua classification là gì. Giờ mình muốn đi sâu hơn: **input** và **output** thực sự trông ra sao. Mình lấy ví dụ một app gọi là **Food Vision** — đưa ảnh vào, nó nói cho biết đây là sushi, steak hay pizza. Đây là dạng **single-label multiclass classification** (mỗi ảnh đúng một nhãn trong nhiều lớp).

### 🖼️ Input: biến ảnh thành con số

Một pipeline classification gọn lại chỉ có ba khúc: **input → machine learning algorithm → output**.

Với ảnh, input là một **numerical encoding**. Giả sử app tự resize mọi ảnh về hình vuông **224 × 224**. Mỗi ảnh khi đó được biểu diễn bằng **width**, **height** và **colour channels** — ba kênh đỏ, xanh lá, xanh dương. Mỗi pixel mang một giá trị cho từng kênh, gộp lại thành màu các bạn nhìn thấy.

Các bạn không cần tự nghĩ ra thuật toán — thường nó đã tồn tại sẵn (mình sẽ gặp lại chuyện này ở phần **transfer learning**). Nếu chưa có cho bài toán của mình thì… chính là lúc dùng PyTorch để xây.

### 🎯 Output: xác suất dự đoán, không phải nhãn cứng

Đầu ra của model **không bao giờ là kết luận dứt khoát** kiểu "chắc chắn là pizza". Nó nhả ra **prediction probabilities** trong khoảng 0 đến 1:

* Càng gần **1** → model càng tự tin đó là lớp này.
* Càng gần **0** → model cho rằng không phải lớp này.

Ví dụ một ảnh sushi có thể ra `[0.9, 0.05, 0.05]` cho sushi / steak / pizza. Nếu model đoán sai, đó cũng là chuyện bình thường — thêm dữ liệu, chỉnh thuật toán, train lại, dự đoán sẽ tốt lên. Đó chính là tinh thần của machine learning.

Sau đó mình viết code chuyển các xác suất này thành **nhãn** cho người dùng đọc, chứ không ai muốn nhìn một màn hình toàn số.

### 🔢 Shape của tensor: batch size, channels, width, height

Đây là phần dễ rối nhất, nhưng cứ nhớ: **shape thay đổi theo bài toán**. Với ảnh, tensor input thường có dạng:

```text
[batch_size, colour_channels, width, height]
```

* **`batch_size`** — có thể để **`None`**, nghĩa là "để trống". Khi train, code PyTorch sẽ tự điền vào sau lưng các bạn.
* **`colour_channels`** — bằng **3** với ảnh RGB.
* **`width`**, **`height`** — ví dụ **224** và **224**.

Có tranh luận trong giới về **thứ tự** các chiều. Có người xếp height, width rồi mới tới channels; có người để channels lên đầu hoặc xuống cuối. Mặc định của PyTorch hiện tại là **channels, width, height** — và vì tensor rất linh hoạt, các bạn hoàn toàn viết code đổi thứ tự được.

Shape thực tế có thể là `[32, 3, 224, 224]`, vì **32** là batch size rất phổ biến.

### 🍞 Vì sao batch size lại là 32?

Có một tweet nổi tiếng đại ý: "Training với mini-batch lớn có hại cho sức khỏe — và quan trọng hơn, có hại cho test error. Bạn bè không để bạn bè dùng mini-batch lớn hơn 32." Tweet này cũ từ lâu nhưng vẫn đúng đến thời điểm mình quay video (2022): có những batch size lớn hơn nhiều, nhưng **32 vẫn chạy tốt với rất nhiều bài toán**.

Batch size 32 nghĩa là mỗi lần thuật toán "nhìn" 32 ảnh cùng lúc. Lý do không nhìn cả nghìn ảnh một lượt: máy tính không có vô hạn compute. Dùng bội số của **8** thì khá hiệu quả về mặt tính toán.

### 🏁 Shape output: số lớp quyết định

Output shape bằng **3** vì có ba lớp: sushi, steak, pizza — tức **một prediction probability cho mỗi lớp**.

Nhưng nhớ: shape output thay đổi theo bài toán.

* Phân biệt chó hay mèo → output shape là **2**, vì chỉ có hai lớp.
* Với **binary classification**, đôi khi shape chỉ là **1** cũng được, chuyện này mình sẽ thấy khi làm tay.

Nguyên tắc bất biến: **input luôn được mã hóa thành số**, còn **output thường là xác suất dự đoán** theo các lớp của bài toán. Bài sau mình sẽ vẽ ra kiến trúc tổng quát của một model classification — nhớ nhé, "architecture" ở đây giống như bản sơ đồ của neural network.
