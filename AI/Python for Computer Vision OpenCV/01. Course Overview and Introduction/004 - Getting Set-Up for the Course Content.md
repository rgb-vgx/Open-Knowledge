---
title: 'Chuẩn bị môi trường học: Anaconda, virtual environment và Jupyter Lab'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 4
status: edited
source: '004 - Getting Set-Up for the Course Content.md'
categories:
- AI
tags: []
---

# ⚙️ Chuẩn bị môi trường học với Anaconda và Jupyter Lab

> Nguồn: `004 - Getting Set-Up for the Course Content.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257458)

Bài này khép lại phần giới thiệu bằng việc cài đặt đầy đủ mọi thứ để các bạn chạy được notebook của khóa học. Các bước gồm: cài **Anaconda**, tạo **virtual environment** từ file `.yml`, mở **Jupyter Lab**, rồi làm quen với cả notebook lẫn script `.py`.

Nếu đã quen Python, các bạn thoải mái dùng IDE mình thích — khóa học chọn **Jupyter Lab** và **Jupyter Notebook** chủ yếu vì tiện cho việc screencast: vừa viết ghi chú, vừa giải thích và hiển thị mọi thứ trong một file. Còn nếu mới làm quen, hãy dùng đúng môi trường và công cụ khóa học gợi ý để tránh rắc rối.

### 🐍 Cài đặt Anaconda

Nếu các bạn đã cài Anaconda cho khóa khác hoặc cho môi trường riêng thì có thể bỏ qua bước này. Nếu chưa, hãy vào `www.anaconda.com/download` (hoặc Google "Anaconda download", "Anaconda Python").

Trang tải có link cho ba hệ điều hành: **Windows**, **macOS**, **Linux**. Chọn đúng hệ điều hành của mình:

* Với **Windows**, trang sẽ có hai phiên bản Python 3.7 và Python 2.7 — hãy chọn **Python 3.7**.
* Cũng trên Windows thường có bản **64-bit** và **32-bit**; máy hiện đại gần như chắc chắn là 64-bit.
* Trên **macOS**, mình khuyên dùng **graphical installer** để được dẫn qua từng bước; trên **Linux**, chọn installer mà trang cung cấp.

Sau khi tải, mở file cài đặt và đi theo hướng dẫn: **Next** → đồng ý license → chọn **Just Me** → giữ mặc định → **Next**.

Ở bước **Advanced Installation Options**, có tùy chọn **"Add Anaconda to my PATH environment variable"**. Mặc định nó ghi là không khuyến nghị, nhưng nếu các bạn từng cài Python từ python.org thì **nên tick** — nếu không, máy sẽ lẫn lộn giữa Python cũ và Python của Anaconda. Nếu đây là lần đầu cài Anaconda và Python thì không cần tick. Xong thì bấm **Install**.

---

### 💻 Tạo virtual environment từ file .yml

Anaconda cài kèm công cụ dòng lệnh **Anaconda Prompt**. Trước khi dùng, hãy tải file `.yml` phù hợp với hệ điều hành trong phần resource của bài giảng (khóa học cung cấp file riêng cho Windows, macOS, Linux). Nhớ **ghi lại đường dẫn** tới file — nên để ở Desktop hoặc thư mục Downloads.

Mở **Anaconda Prompt** (trên macOS/Linux có thể dùng terminal), rồi `cd` tới thư mục chứa file:

```bash
cd Downloads
```

Tiếp theo tạo môi trường từ file `.yml`. Tên file tùy hệ điều hành: `cvcourse_windows.yml`, `cvcourse_macos.yml` hoặc `cvcourse_linux.yml`:

```bash
conda env create -f cvcourse_windows.yml
```

Mẹo: gõ được vài ký tự rồi nhấn **Tab** để tự động hoàn thành tên file. Nếu Tab không hoạt động, nghĩa là file `.yml` không nằm trong thư mục hiện tại.

Nếu gõ sai tên file, các bạn sẽ gặp lỗi:

```text
SpecNotFound: Can't process without a name
```

Lỗi này nghĩa là file `.yml` không tồn tại ở thư mục đang đứng, hoặc bị gõ sai tên — hãy `cd` lại cho đúng.

Quá trình tạo môi trường sẽ tải về một loạt thư viện và mất chút thời gian. Khi được hỏi, bấm **Y** để đồng ý. Xong xuôi, màn hình sẽ in ra hướng dẫn kích hoạt, ví dụ:

```bash
conda activate python_cvcourse
```

Trên macOS/Linux có thể là `source activate` / `source deactivate` — cứ làm theo đúng dòng lệnh mà công cụ in ra. Khi kích hoạt thành công, tên môi trường `python_cvcourse` sẽ hiện trong dấu ngoặc đơn ở đầu prompt, xác nhận các bạn đang có đủ thư viện cần thiết. Muốn thoát môi trường, dùng `conda deactivate` (trên macOS/Linux có thể là `source deactivate`).

---

### 📒 Mở Jupyter Lab

Vẫn trong môi trường đã kích hoạt, chạy:

```bash
jupyter-lab
```

Trình duyệt sẽ tự mở, hoặc các bạn copy URL mà terminal in ra (dạng `localhost:8888/lab`) dán vào trình duyệt. Lưu ý: **đừng bấm Ctrl + C** trong terminal, vì thao tác đó sẽ tắt server.

Trong Jupyter Lab, nhấn vào biểu tượng thư mục để xem vị trí hiện tại — đây cũng là nơi các bạn nên lưu và giải nén file zip chứa notebook của từng section.

---

### 📝 Chạy notebook và script .py

**Tạo notebook:** bấm **Notebook → Python 3**, một file `.ipynb` sẽ mở ra. File `.ipynb` chỉ mở được bằng Jupyter Lab hoặc Jupyter Notebook. Gõ thử:

```python
print("hello world")
```

rồi nhấn **Shift + Enter** để chạy cell và thấy kết quả ngay bên dưới.

**Chạy script Python:** bấm nút **+** (new launcher) → chọn **Text File** → đổi tên file thành `myscript.py` (chuột phải → Rename) → gõ nội dung:

```python
print("I am running a script")
```

Nhấn **Ctrl + S** để lưu. Muốn chạy, bấm **+** rồi chọn **Terminal**, sau đó:

```bash
python myscript.py
```

Tên file cũng có thể Tab để tự động hoàn thành.

---

### ✅ Tóm lại

Các bạn đã cài **Anaconda**, tạo và kích hoạt **virtual environment** `python_cvcourse` từ file `.yml`, mở **Jupyter Lab**, và biết chạy cả notebook lẫn script `.py`. Đó là toàn bộ công cụ cần cho khóa học. Bài tiếp theo chúng ta bắt đầu phần kỹ thuật đầu tiên: **NumPy** và array.

> ⚠️ Cần kiểm chứng: tại thời điểm quay khóa, transcript gắn lỗi `SpecNotFound: Can't process without a name` với việc file `.yml` không tồn tại hoặc gõ sai tên; hành vi lỗi có thể khác nhau giữa các phiên bản conda, nên cần thử lại trên môi trường thực tế.
