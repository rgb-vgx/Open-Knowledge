---
title: 'Bài 125 — Setup môi trường và chạy Gradio app đầu tiên ở local'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 125
status: edited
source: '125 - Setting up gradio app in local space.md'
categories:
- AI
tags: []
---

# 🎛️ Gradio app đầu tiên: từ conda tới trình duyệt

> Nguồn: `125 - Setting up gradio app in local space.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094235)

Chào các bạn! Lý thuyết đủ rồi, giờ mình bắt tay dựng môi trường và chạy một **Gradio app** đầu tiên ở local. Bài này chưa liên quan tới model — mục tiêu là hiểu Gradio sinh UI từ một hàm Python như thế nào.

### 🐍 Tạo conda environment với Python 3.11

Mình dùng **VSCode** làm editor và **Anaconda** cho Python. Mở terminal (bài gốc dùng terminal Windows), tạo môi trường:

```bash
conda create -n gradio_app_temp1 python=3.11
conda activate gradio_app_temp1
```

Tác giả chọn **Python 3.11** vì thấy đây là bản ổn định nhất; bạn có thể dùng 3.10 hoặc 3.12 tùy nhu cầu.

### 📄 Cài Gradio qua requirements.txt

Tạo thư mục dự án `gradio_app_one`, bên trong tạo `requirements.txt`:

```text
gradio
```

Rồi cài:

```bash
pip install -r requirements.txt
```

Khi cài, bạn sẽ thấy Gradio kéo theo rất nhiều thư viện phụ thuộc. Đáng chú ý: **Gradio dùng FastAPI bên dưới** (trong khi Dash dùng Flask). Kiểm tra nhanh:

```bash
python -c "import gradio"
```

Không lỗi là môi trường ổn.

### 📝 Hàm predict và gr.Interface

Tạo file `app.py` trong thư mục dự án. Đây là một hàm **giả lập** nhận `class_index` và trả về nhãn:

```python
import gradio as gr

def predict(class_index):
    class_index = int(class_index)
    if class_index == 0:
        return "cat"
    elif class_index == 1:
        return "dog"
    elif class_index == 2:
        return "person"
    return "no class label found"

demo = gr.Interface(
    fn=predict,
    inputs=gr.Textbox(label="class index"),
    outputs=gr.Textbox(label="output"),
)

if __name__ == "__main__":
    demo.launch()
```

`gr.Interface` nhận **hàm xử lý** (`fn`), **input component** và **output component**. Ở đây cả hai đều là **text box**. Hàm nhận chuỗi từ textbox nên mình `int(class_index)` để so sánh với số.

### ▶️ Chạy và thử trên trình duyệt

```bash
python app.py
```

Gradio in ra một **local URL**; bấm vào sẽ mở app trên trình duyệt. Nhập `0` → hiện `cat`; nhập `2` → `person`; nhập `4078` → `no class label found`. UI này được Gradio **tự sinh** — mình không viết một dòng HTML/CSS/JS/React nào.

Khi deploy lên cloud, giao diện sẽ trông y hệt bản chạy local. Hiện mình chưa deploy.

Bài sau mình sẽ **thay hàm predict giả lập** bằng backend thật: một class nhận ảnh, chạy qua CNN đã train, và trả về nhãn cat/dog/person.
