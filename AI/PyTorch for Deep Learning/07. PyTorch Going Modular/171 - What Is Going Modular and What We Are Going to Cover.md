---
title: 'Going modular là gì và những gì chúng ta sẽ làm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 171
status: edited
source: '171 - What Is Going Modular and What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 🧩 Going modular là gì và những gì chúng ta sẽ làm

> Nguồn: `171 - What Is Going Modular and What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32778648)

Chào các bạn, chào mừng tới section mới — **going modular** với PyTorch. Đây là một section rất thú vị, nhưng trước khi bắt đầu, mình vẫn mở đầu theo cách quen thuộc: "Where can you get help?" — bốn bước khi bị kẹt.

### 🆘 Bốn bước khi gặp khó

1. **Follow along with the code** — làm theo code, chạy code. Mọi tài nguyên nằm trên GitHub, kẹt thì tham khảo.
2. **Try it for yourself** — tự viết, tự chạy, xem kết quả ra sao. Bấm `shift + command + space` để đọc docstring.
3. **Search** — tra Stack Overflow hoặc tài liệu PyTorch, thứ mà chúng ta đã luyện rất nhiều.
4. **Ask** — đặt câu hỏi trên trang discussions của khóa, mở "New discussion", chọn category **Q&A** và ghi số video.

Mình nhắc lại câu thần chú: **if in doubt, run the code**.

### 🤔 Vậy going modular nghĩa là gì?

Các bạn đã viết được nhiều code hay trong notebook. Câu hỏi đặt ra: *có thể tái sử dụng nó ở nơi khác không?* Câu trả lời là có — và đó chính là toàn bộ tiền đề của section này: **tái sử dụng những đoạn code hữu ích nhất từ notebook trước vào các Python script**.

Nhìn lại **Food Vision Mini** mà chúng ta làm ở section trước:

* Load dữ liệu ảnh pizza, steak, sushi bằng PyTorch.
* Xây và train một model nhận diện món ăn.
* Dự đoán thử — kết quả chưa tốt như hình minh họa, sai khá nhiều, nhưng không sao.

Việc cần làm bây giờ là biến toàn bộ code load dữ liệu, build model, train model đó thành một chuỗi Python script.

### 📁 Cấu trúc thư mục sẽ hướng tới

Sau section này, ta sẽ có cấu trúc kiểu:

* Thư mục cấp cao nhất tên **going_modular**.
* Bên trong là một thư mục con cũng tên **going_modular**, chứa các script:
  * một script chuẩn bị dữ liệu,
  * một script build model PyTorch,
  * một script train/test — gọi là **engine.py**,
  * **train.py**,
  * **utils.py**,
  * và cuối cùng là thư mục **models** chứa các model đã train.

Dữ liệu vẫn giữ **standard image classification format** như mấy section qua. Các bạn hoàn toàn có thể tùy biến cấu trúc này theo bài toán của mình — nhưng đây là kiểu cấu trúc bạn thường gặp khi đọc code PyTorch "ngoài đời".

### 🎯 Train model bằng một dòng lệnh

Mục tiêu lớn: **train một PyTorch model chỉ với một dòng code**, và truyền được các hyperparameter như:

1. Train model nào.
2. Batch size bao nhiêu.
3. Learning rate bao nhiêu.
4. Train bao nhiêu epoch.

Ví dụ trên command line:

```bash
python train.py --model tiny_vgg --batch_size 32 --learning_rate 0.001 --num_epochs 10
```

Mấy flag kiểu `--model`, `--batch_size` được gọi là **argument flags**. Bạn có thể thêm bao nhiêu hyperparameter cũng được — 10 hay 20 cái đều ok, nó vô cùng linh hoạt. Dòng lệnh trên nghĩa là: train tiny VGG, batch size 32, learning rate 0.001, trong 10 epoch.

### 🌍 Đây là cách code PyTorch ngoài đời được tổ chức

Mình không nói đây là chân lý duy nhất, chỉ là một trong nhiều cách. Nhưng hãy nhìn các dự án thật:

* **Detectron2** — thư viện computer vision của Meta/Facebook dùng PyTorch: có `train_net.py` train trên 8 GPU với một config file, đổi flag là chuyển sang 1 GPU.
* **TorchVision references** — thư mục `references/detection` có `train.py`, `utils.py`, `engine.py`.
* **PyTorch blog** — bài train state-of-the-art model dùng `torchrun`.
* Các paper mới như **ConvNeXt** cũng chạy `python main_finetune.py`.

Điểm chung: **notebook để thí nghiệm, Python script để tái sử dụng và chạy thật**.

### 🔁 Workflow của mình

Mình bắt đầu với **Jupyter/Google Colab notebook** vì chúng tuyệt vời cho việc thí nghiệm và visualize. Khi đã có đoạn code hữu ích, mình chuyển sang Python script. Ví dụ file `data_setup.py`:

```python
import os
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
```

Hàm bên trong sẽ trả về **train dataloader**, **test dataloader** và **class names**. Đó là kiểu "move the most useful code to Python scripts".

### 📒 Hai notebook: cell mode và script mode

Section này có hai phần:

1. **Cell mode** (`05_part_1_cell_mode`) — chạy y như notebook bình thường, từ trên xuống dưới, chỉ execute code trong cell.
2. **Script mode** — dùng **Jupyter Magic command** để biến code hữu ích thành Python script.

Magic command bắt đầu bằng **hai dấu phần trăm** `%%`, khác với line magic chỉ một dấu `%`. Cụ thể là `%%writefile`: ghi nội dung cell ra file.

```python
%%writefile going_modular/model_builder.py
# nội dung cell này sẽ được ghi vào going_modular/model_builder.py
```

Mỗi mục nhỏ trong notebook đều có thể tách thành một script riêng: một cái chuẩn bị dữ liệu, một cái build model, một cái train, một cái evaluate, một cái save...

### ✅ Chốt lại

Trong section này chúng ta sẽ: biến đổi dữ liệu cho model, load custom data bằng hàm dựng sẵn, build Food Vision Mini phân loại pizza/steak/sushi, và quan trọng nhất — **chuyển code notebook thành Python script, rồi train model từ command line**.

Đây kiểu như một "machine learning cooking show" — chúng ta sẽ nấu rất nhiều code. Bắt tay vào thôi, hẹn các bạn trong Colab!
