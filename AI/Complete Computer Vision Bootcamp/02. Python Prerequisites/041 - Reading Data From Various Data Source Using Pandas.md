---
title: 'Bài 041 — Đọc dữ liệu từ nhiều nguồn với pandas'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 41
status: edited
source: '041 - Reading Data From Various Data Source Using Pandas.md'
categories:
- AI
tags: []
---

# 📡 Đọc dữ liệu từ JSON, URL, HTML, Excel và pickle

> Nguồn: `041 - Reading Data From Various Data Source Using Pandas.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086941)

Dữ liệu thật không chỉ nằm trong CSV. pandas có sẵn một bộ hàm `read_*` đọc được từ JSON, URL, bảng HTML, Excel cho tới pickle. Bài này mình đi qua từng nguồn, kèm cả những lỗi cài đặt thường gặp.

### 🧾 JSON từ chuỗi trong code

Dùng `StringIO` để biến chuỗi JSON thành file-like object:

```python
import pandas as pd
from io import StringIO

json_data = """
[
  {"employee_name": "James", "email": "james@gmail.com", "job_profile": "Senior Developer"},
  {"employee_name": "Ann", "email": "ann@gmail.com", "job_profile": "Developer"}
]
"""

df = pd.read_json(StringIO(json_data))
print(df)
```

`pd.read_json` đọc được cả JSON dạng list các object lẫn key–value, và trả về DataFrame với cột theo key.

---

### 🔁 Chuyển DataFrame ngược lại JSON bằng `to_json`

```python
print(df.to_json())                    # orient mặc định = "columns"
print(df.to_json(orient="records"))    # mỗi hàng thành một object
```

Tham số **`orient`** quyết định bố cục:

* `orient="columns"` (mặc định với DataFrame): key ngoài cùng là **tên cột**, value là dict `{index: giá_trị}`.
* `orient="index"`: key ngoài cùng là **index (nhãn hàng)**, value là dict `{tên_cột: giá_trị}`.
* `orient="records"`: mỗi phần tử là một **bản ghi** — đúng dạng JSON ban đầu, dễ đọc và phổ biến khi trao đổi dữ liệu.

pandas còn nhiều giá trị `orient` khác (`columns`, `values`, `split`...); xem thêm trong tài liệu `DataFrame.to_json`.

---

### 🌐 Đọc CSV trực tiếp từ URL

```python
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/wine/wine.data"
df = pd.read_csv(url, header=None)
print(df.head())
```

* `pd.read_csv` nhận URL, không cần tải file về trước.
* `header=None` vì file không có dòng tiêu đề → pandas tự đánh số cột `0, 1, 2...`.

Ghi ngược ra CSV:

```python
df.to_csv("wine.csv")
```

File `wine.csv` được tạo ngay trong thư mục hiện tại.

---

### 🕸️ Đọc bảng HTML bằng `read_html`

```python
url = "https://en.wikipedia.org/wiki/List_of_country_calling_codes"
tables = pd.read_html(url, match="country", header=0)

df = tables[0]
```

* `pd.read_html` trả về **list** các DataFrame — một trang có thể có nhiều bảng, nên phải chọn `tables[0]`.
* `match="country"` lọc chỉ những bảng có chứa chuỗi khớp.
* `header=0` dùng hàng đầu tiên làm tên cột.

Điều kiện: pandas cần thêm thư viện phụ. Nếu gặp lỗi thiếu dependency, cài lần lượt:

```bash
pip install lxml
pip install html5lib
pip install beautifulsoup4
```

Giảng viên gặp đúng chuỗi lỗi này khi đọc trang danh sách ngân hàng thất bại (FDIC failed bank list) — cứ đọc thông báo lỗi và cài thư viện còn thiếu là được.

---

### 📗 Đọc Excel

```python
df = pd.read_excel("data.xlsx", sheet_name=0)
```

* `sheet_name=0` lấy sheet đầu tiên; có thể truyền tên sheet hoặc list tên sheet.
* pandas cần engine đọc `.xlsx` (thường là **openpyxl**). Thiếu engine sẽ báo lỗi "No module named..." — cài bằng `pip install openpyxl`.

---

### 🥒 Pickle — lưu DataFrame dạng nhị phân

**Pickle** là quá trình chuyển object Python thành byte stream để lưu file/database, giữ trạng thái giữa các phiên hoặc truyền qua network.

```python
df.to_pickle("data.pkl")     # serialize
df2 = pd.read_pickle("data.pkl")  # deserialize
```

File `.pkl` là nhị phân, mở bằng editor thường sẽ ra ký tự lộn xộn — đó là bình thường. Pickle rất tiện khi lưu **model đã train** trong dự án machine learning để load lại sau.

> ⚠️ Cần kiểm chứng: transcript đọc tên hàm không rõ ("two underscore pickle", "read underscore pickle file"). Theo tài liệu pandas, API chính xác là **`DataFrame.to_pickle(path)`** và **`pd.read_pickle(path)`**.

---

### 🗺️ Bản đồ các hàm `read_*`

Ngoài những hàm trên, pandas còn `read_parquet`, `read_sql`, `read_sql_query`, `read_table`, `read_xml`... Tùy nguồn dữ liệu mà chọn hàm tương ứng; hầu hết đều trả về DataFrame và nhận tham số tương tự (`header`, `usecols`, `dtype`...).

---

Biết đọc đúng nguồn dữ liệu giúp bỏ qua bước "tải về, đổi định dạng" thủ công. Bài sau mình chuyển sang **logging** — kỹ năng bắt buộc để theo dõi chương trình chạy thật.
