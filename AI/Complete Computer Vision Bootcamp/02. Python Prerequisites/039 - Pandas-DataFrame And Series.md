---
title: 'Bài 039 — pandas: Series và DataFrame'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 39
status: edited
source: '039 - Pandas-DataFrame And Series.md'
categories:
- AI
tags: []
---

# 🐼 pandas — Series và DataFrame

> Nguồn: `039 - Pandas-DataFrame And Series.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086917)

**pandas** là thư viện thao tác dữ liệu mạnh, dùng rộng rãi trong phân tích và làm sạch dữ liệu. Nó có hai cấu trúc chính: **Series** (1 chiều, giống một cột trong bảng) và **DataFrame** (2 chiều, mutable, chứa nhiều kiểu dữ liệu khác nhau, có nhãn hàng/cột). Bài này là bước khởi động trước khi đi sâu vào data manipulation.

### ⚙️ Cài đặt

Thêm `pandas` vào `requirements.txt` rồi chạy:

```bash
pip install -r requirements.txt
```

Hoặc cài trực tiếp:

```bash
pip install pandas
```

Sau đó import:

```python
import pandas as pd
```

---

### 📏 Series từ list

```python
data = [1, 2, 3, 4, 5]
series = pd.Series(data)

print(series)
print(type(series))   # <class 'pandas.core.series.Series'>
```

Kết quả kèm cột index mặc định `0..4` bên trái và giá trị bên phải. Có thể hình dung Series như **một cột duy nhất** của bảng.

---

### 📚 Series từ dictionary

```python
data = {"a": 1, "b": 2, "c": 3}
series_dict = pd.Series(data)
```

Điểm khác biệt: **key của dictionary trở thành index**, value thành giá trị của Series.

---

### 🏷️ Chỉ định index riêng

```python
data = [10, 20, 30]
series_custom = pd.Series(data, index=["a", "b", "c"])
```

Khi đó index là `a, b, c` thay vì `0, 1, 2`. Số index phải khớp số phần tử.

---

### 🗂️ DataFrame từ dictionary of lists

Mỗi key là một **cột**, value là list các giá trị theo hàng:

```python
data = {
    "name": ["Krish", "John", "Jack"],
    "age": [25, 30, 45],
    "city": ["Bangalore", "New York", "Florida"],
}

df = pd.DataFrame(data)
print(df)
```

Kết quả giống một bảng Excel: ba cột `name`, `age`, `city`, ba hàng, index mặc định 0–2. Giảng viên cũng nhắc quan hệ với NumPy: mảng NumPy **1 chiều** có thể chuyển thành **Series**, còn mảng **2 chiều** chuyển thành **DataFrame**.

---

### 📋 DataFrame từ list of dictionaries

Mỗi dictionary là **một hàng**:

```python
data = [
    {"name": "Krish", "age": 32, "city": "Bangalore"},
    {"name": "John", "age": 34, "city": "Bangalore"},
    {"name": "Jack", "age": 32, "city": "Bangalore"},
]

df = pd.DataFrame(data)
```

Cách này tiện khi dữ liệu đến dưới dạng bản ghi JSON.

---

### 📥 Đọc CSV và xem nhanh

```python
df = pd.read_csv("sales_data.csv")

print(df.head())    # 5 dòng đầu
print(df.tail())    # 5 dòng cuối
```

`pd.read_csv` là cửa vào phổ biến nhất với dữ liệu thật. Tương tự còn `pd.read_excel` cho file Excel.

---

### 🎯 Truy cập dữ liệu trong DataFrame

```python
print(df["name"])        # lấy cả cột name → trả về Series
print(df.loc[0])         # lấy hàng theo nhãn index
print(df.iloc[0])        # lấy hàng theo vị trí
print(df.iloc[0, 1])     # hàng 0, cột 1 (vị trí)
print(df.at[1, "age"])   # phần tử hàng index 1, cột age
print(df.iat[2, 2])      # phần tử hàng 2, cột 2 (vị trí)
```

| Cách truy cập | Đặc điểm |
|---|---|
| `df["col"]` | Theo **tên cột**, trả về Series |
| `.loc[...]` | Theo **nhãn** (label) của hàng/cột |
| `.iloc[...]` | Theo **vị trí số** (integer position) |
| `.at[...]` / `.iat[...]` | Truy cập **một phần tử** duy nhất (nhãn / vị trí) |

Lưu ý quan trọng: khi lấy một cột bằng `df["name"]`, kết quả là **Series**, không phải DataFrame.

---

### 🛠️ Thêm, sửa, xóa cột

Thêm cột mới:

```python
df["salary"] = [50000, 60000, 70000]
```

Cập nhật toàn bộ cột (ví dụ mọi người tăng 1 tuổi):

```python
df["age"] = df["age"] + 1
```

Xóa cột — phải chỉ rõ `axis=1` vì mặc định `axis=0` là tìm theo hàng:

```python
df.drop("salary", axis=1, inplace=True)
```

* `axis=1` → thao tác trên **cột**; `axis=0` (mặc định) → trên **hàng**.
* `inplace=True` → thay đổi **trực tiếp** lên DataFrame. Không có nó, `drop` chỉ trả về bản sao tạm, DataFrame gốc vẫn nguyên.

Xóa theo hàng cũng dùng `drop` với index:

```python
df.drop(0, inplace=True)   # xóa hàng index 0
```

---

### 📊 Thống kê mô tả

```python
print(df.describe())
```

`describe()` cho bảng tóm tắt thống kê các cột số: `count`, `mean`, `std`, `min`, các phân vị 25/50/75%, `max`. Đây là bước "nhìn nhanh" dữ liệu trước khi phân tích sâu.

---

Series và DataFrame là hai viên gạch nền của pandas. Hiểu `loc`/`iloc`/`at`/`iat` cùng quy tắc `axis` + `inplace` là tránh được phần lớn lỗi ngớ ngẩn khi thao tác dữ liệu. Bài sau mình đi sâu hơn vào **data manipulation** kết hợp pandas và NumPy.
