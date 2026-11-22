---
title: 'Tải helper function và vẽ decision boundary để soi model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 80
status: edited
source: '080 - Writing Code to Download a Helper Function to Visualize Our Models Pre.md'
categories:
- AI
tags: []
---

# 📊 Tải helper function và vẽ decision boundary để soi model

> Nguồn: `080 - Writing Code to Download a Helper Function to Visualize Our Models Pre.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32822682)

Training loop chạy **ngay lần đầu**, không một lỗi! Nhưng kết quả chẳng vui chút nào: **loss đứng quanh 0.69**, không giảm, còn **accuracy loanh quanh 50%**, thậm chí tụt dần. Model dường như chẳng học được gì. Trước khi sửa, phải hiểu vì sao.

### 🤔 Nhìn con số để đoán bệnh

* **Accuracy lý tưởng** là **100%**.
* **Loss lý tưởng** là **0**, vì loss càng thấp càng tốt.

Loss kẹt ở ~0.69 và accuracy ~50% là dấu hiệu model chỉ **đoán bừa**. Kiểm tra phân bố lớp:

```python
circles["label"].value_counts()
# 1    500
# 0    500
```

Dataset **cân bằng** — 500 đỏ, 500 xanh. Chia 80/20 thì train có 400 mỗi lớp, test có 100 mỗi lớp. Với dữ liệu cân bằng hai lớp, đoán bừa kiểu **tung đồng xu** cũng ra ~50% accuracy. Vậy model của mình đang đoán bừa. Train code đã đúng (đã dùng được ở phần trước), nên vấn đề nằm ở **model** hoặc **dữ liệu**.

### 📥 Tải `helper_functions.py` bằng code

Mình có sẵn hàm `plot_decision_boundary` viết từ trước (lấy cảm hứng từ Goku Mohandas, tác giả *Made With ML* — tài liệu mình rất khuyến khích). Thay vì copy-paste, mình tải thẳng từ repo khóa học:

```python
import requests
from pathlib import Path

# Download helper functions from Learn PyTorch repo (if not already downloaded)
if Path("helper_functions.py").is_file():
    print("helper_functions.py already exists, skipping download")
else:
    print("Downloading helper_functions.py")
    request = requests.get("https://raw.githubusercontent.com/mrdbourke/pytorch-deep-learning/main/helper_functions.py")
    with open("helper_functions.py", "wb") as f:
        f.write(request.content)
```

Đoạn code làm ba việc:

1. `Path("helper_functions.py").is_file()` — nếu file đã có thì in thông báo, không tải lại.
2. Nếu chưa, `requests.get(...)` lấy nội dung file qua URL **raw** từ GitHub.
3. Mở file `helper_functions.py` ở chế độ ghi nhị phân (`"wb"`) và ghi `request.content` vào.

Nếu chạy được, `from helper_functions import plot_predictions, plot_decision_boundary` sẽ thành công, và các bạn mở được cả nội dung file trên Colab. Toàn là Python thuần, chẳng có gì bí hiểm — các bạn hoàn toàn đọc và hiểu được.

### 🗺️ Vẽ decision boundary

```python
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.title("Train")
plot_decision_boundary(model_0, X_train, y_train)
plt.subplot(1, 2, 2)
plt.title("Test")
plot_decision_boundary(model_0, X_test, y_test)
```

Hàm nhận ba tham số: **model** (`torch.nn.Module`), **X** và **y** (tensor). Mình vẽ hai subplot: một cho train, một cho test (`1, 2, 1` và `1, 2, 2` là số hàng, số cột, vị trí).

Bức hình nói lên tất cả: model đang cố vẽ **một đường thẳng** xuyên qua dữ liệu. Không ngạc nhiên khi accuracy ~50% — dữ liệu là **vòng tròn**, mà đường thẳng thì cắt ngang hai vòng không ổn.

### 🧠 Vì sao lại là đường thẳng?

Nhìn lại model: nó ghép hai lớp `nn.Linear` — mà **linear** nghĩa là **đường thẳng**. Chồng hai lớp tuyến tính lên nhau vẫn chỉ ra được một biểu diễn tuyến tính, tức vẫn là đường thẳng. Mà dữ liệu vòng tròn thì **không thể tách bằng đường thẳng** (trừ khi uốn lượn — nhưng phép toán tuyến tính không làm được điều đó).

### 🎯 Thử thách trước bài sau

Cho model train **1000 epoch** thay vì 100. Kết quả có khá hơn không? Nếu không, tại sao? Nghĩ về câu trả lời đó trước khi xem bài tiếp theo — vì bài tới mình bàn cách cải thiện model, rồi sẽ đụng đúng vào thứ còn thiếu: **non-linearity**.
