---
title: 'CNN phần 1: tensor, convolution, filter và stride'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 75
status: edited
source: '075 - Convolutional Neural Networks Overview - Part One.md'
categories:
- AI
tags: []
---

# 🧠 CNN phần 1: vì sao cần convolution, filter và stride

> Nguồn: `075 - Convolutional Neural Networks Overview - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12618292)

Mô hình Keras vừa rồi làm việc với feature đã trích xuất sẵn. Khi đưa **ảnh thô** vào, ta gặp hai vấn đề mới: dữ liệu hai chiều và nhiều color channel (red, green, blue). **Convolutional neural network (CNN)** sinh ra để giải quyết đúng hai chuyện đó. Bài này đi từ nguồn gốc sinh học tới cơ chế convolution, filter và stride.

### 🧬 Cảm hứng từ vỏ não thị giác

Giống perceptron mô phỏng neuron, CNN dựa trên nghiên cứu của **David Hubel** và **Torsten Wiesel** về cấu trúc vỏ não thị giác ở động vật có vú — công trình giành giải Nobel Y sinh năm 1981.

Hai phát hiện quan trọng:

* Neuron trong vỏ não thị giác có **local receptive field** nhỏ: mỗi neuron chỉ "nhìn" một vùng nhỏ của toàn ảnh, các vùng này chồng lấp dần để tạo nên thị trường rộng hơn.
* Neuron chỉ **kích hoạt với một số đặc điểm nhất định** — có neuron chỉ phản ứng với đường nằm ngang, có neuron với hình tròn đen...

Ý tưởng "chỉ nhìn một phần ảnh" chính là nền của kiến trúc CNN, được hiện thực hóa nổi tiếng trong paper năm 1998 của **Yann LeCun** với kiến trúc **LeNet-5**, lần đầu dùng để phân loại MNIST.

---

### 🧩 Cấu trúc một CNN

Nhìn sơ đồ CNN thường thấy trong paper, có thể chia làm hai nửa:

* **Feature extraction**: gồm **convolution** và **subsampling/pooling** — phần mới, là trọng tâm bài này.
* **Classification**: fully connected network và **softmax** cho nhiều output — phần ta đã biết.

---

### 🧊 Tensor: scalar, vector, matrix rồi tensor

Tensor chỉ là mảng n chiều, mở rộng dần theo số chiều:

* **Scalar** — một số đơn lẻ.
* **Vector** — mảng một chiều các scalar.
* **Matrix** — danh sách các vector, tức mảng hai chiều.
* **Tensor** — mảng nhiều chiều hơn nữa.

Với ảnh, tensor 4 chiều rất tiện để đưa cả lô ảnh vào model:

```text
(samples, height, width, channels)
```

MNIST là ảnh xám nên chiều cuối bằng `1`; ảnh màu sẽ có `3` channel RGB. Hiểu shape của tensor là điều kiện bắt buộc khi dựng model trong TensorFlow.

---

### ⚖️ Dense layer vs convolutional layer

* **Dense layer**: mỗi neuron nối tới **toàn bộ** neuron của layer sau.
* **Convolutional layer**: mỗi unit chỉ nối tới **một số unit gần nó** ở layer sau — đúng tinh thần local receptive field.

Vì sao không dùng dense cho ảnh?

1. **Bùng nổ tham số.** MNIST chỉ `28 × 28 = 784` pixel. Nhưng ảnh thường cỡ `256 × 256`, tức khoảng 65.000 pixel — nối dense từng ấy input sẽ sinh ra lượng weight khổng lồ, không thể scale lên ảnh lớn hơn.
2. **Mất cấu trúc không gian.** Pixel gần nhau có tương quan mạnh với nhau, điều rất hữu ích cho nhận dạng ảnh; kết nối cục bộ khai thác đúng tính chất này.
3. **Regularization tự nhiên.** Giới hạn kết nối giúp mạng bớt overfit và thu hẹp không gian tìm weight xuống kích thước của convolution.

Mỗi layer convolution nhìn một vùng ngày càng lớn hơn của ảnh khi đi sâu vào mạng.

---

### 🧭 Convolution một chiều: filter và stride

Bắt đầu từ mạng dense một chiều, thay kết nối đầy đủ bằng **kết nối cục bộ**. Tập weight trên các cạnh cục bộ đó chính là một **filter**.

Ví dụ một filter hai weight:

```text
y = w1 * x1 + w2 * x2
```

Chọn `w1 = 1`, `w2 = -1` thì `y = x1 - x2`. Khi nào `y` đạt cực đại? Khi `x1 = 1` và `x2 = 0`. Mà `1` cạnh `0` chính là **một cạnh (edge)**: một pixel tối đứng ngay cạnh một pixel sáng. Vậy filter này hoạt động như một **edge detector**.

Hai khái niệm đi kèm:

* **Filter size** — số weight trong filter, ở đây là `2`.
* **Stride** — bước nhảy khi trượt filter qua input. Stride `2` nghĩa là nhảy hai neuron một lần; stride `1` là dịch từng neuron.

Ta có thể dùng **nhiều filter** cùng lúc: hai filter, bốn filter... Mỗi filter là một bộ weight riêng và **bắt một đặc điểm khác nhau**. Khi số filter nhiều, cách vẽ từng mũi tên trở nên rối, nên người ta biểu diễn bằng **khối**: input `1 × L`, còn layer sau là tensor `(số filter, số unit)`.

Khi filter trượt, các neuron ở mép có thể không có đủ input tương ứng. Cách xử lý: thêm **zero padding** — chèn thêm pixel `0` ở viền để filter trượt đủ.

---

### 🖼️ Convolution hai chiều trên lưới

Với ảnh, input là 2D (height × width) và layer sau là tensor ba chiều `(số filter, width, height)`. Ảnh màu thêm một chiều channel nữa; với ảnh xám channel = 1.

Cách filter chạy trên lưới:

1. Đặt filter `3 × 3` lên một vùng ảnh.
2. Nhân từng pixel với weight tương ứng trong filter.
3. Cộng tất cả lại — đó là **một** giá trị output.
4. Trượt filter theo **stride** (1 hoặc 2 pixel) và lặp lại.

Ví dụ trong bài: input `4 × 4` (giá trị `1` là pixel tối nhất, `-1` là sáng nhất, trông như chữ số 0 viết tay) được **padding** một viền `0` xung quanh, rồi áp filter `3 × 3` — kết quả vùng đầu tiên ra `0`.

Trang **setosa.io** có visualization tương tác cho phần này: một kernel "sharpen" với các weight như `0, -1, 5...` trượt qua ảnh mặt người, mỗi vị trí lấy 9 pixel nhân với weight rồi cộng lại thành một pixel output. Đổi kernel sang "blur" sẽ ra kết quả làm mờ. Đây là cách trực quan nhất để thấy convolution hoạt động.

Sơ đồ CNN kinh điển thường vẽ nhiều filter `3 × 3`, hoặc một convolution `5 × 5` như trong hình mẫu. Còn **subsampling/pooling** — nửa còn lại của phần feature extraction — sẽ là nội dung bài tiếp theo.
