---
title: 'Bài 040 — Thao tác dữ liệu với pandas và NumPy'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 40
status: edited
source: '040 - Data Manipulation With Pandas And Numpy.md'
categories:
- AI
tags: []
---

# 🧹 Data manipulation — làm sạch, biến đổi và gộp dữ liệu

> Nguồn: `040 - Data Manipulation With Pandas And Numpy.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086927)

pandas là công cụ chính cho **exploratory data analysis (EDA)** và **feature engineering**. Bài này đi qua một bộ dữ liệu CSV mẫu có cả giá trị thiếu, và mình xử lý nó từ đầu: xem dữ liệu, xử lý missing value, đổi tên cột, đổi kiểu dữ liệu, áp hàm, nhóm dữ liệu, rồi merge các DataFrame lại.

### 📥 Đọc dữ liệu và xem tổng quan

```python
import pandas as pd

df = pd.read_csv("data.csv")
```

```python
print(df.head(5))    # 5 dòng đầu
print(df.tail())     # 5 dòng cuối
print(df.describe()) # thống kê mô tả các cột số
print(df.dtypes)     # kiểu dữ liệu từng cột
```

`describe()` chỉ tính cho các cột số (`value`, `sales`); cột văn bản bị bỏ qua. `dtypes` cho bạn thấy:

* `object` = chuỗi (cột `date`, `category`, `product`, `region`)
* `float64` = số thực (cột `value`, `sales`)

---

### ❓ Phát hiện giá trị thiếu

```python
print(df.isnull())              # True ở vị trí thiếu
print(df.isnull().sum())        # đếm số giá trị thiếu mỗi cột
```

`isnull()` trả về DataFrame boolean kích thước bằng dữ liệu gốc — nhìn bằng mắt rất khó. Kết hợp `.sum()` để có **số lượng missing value trên từng cột**: ví dụ `value` có 3, `sales` có 4.

Có thể dùng `.any(axis=1)` để biết các **hàng** nào có ít nhất một giá trị thiếu.

---

### 🩹 Xử lý giá trị thiếu bằng `fillna`

Cách đơn giản nhất — thay tất cả bằng 0:

```python
df_filled = df.fillna(0)
```

Nhưng như giảng viên lưu ý: **không nên** thay 0 bừa bãi cho cột số, vì nó bóp méo phân phối. Cách hợp lý hơn là thay bằng **mean** của cột, và tạo cột mới để giữ dữ liệu gốc:

```python
df["sales_fill"] = df["sales"].fillna(df["sales"].mean())
```

Kết quả: cột `sales_fill` giữ nguyên giá trị cũ ở các hàng có dữ liệu, còn các vị trí `NaN` được lấp bằng mean của `sales`. `NaN` nghĩa là "Not a Number".

---

### ✏️ Đổi tên cột

`rename` nhận một dictionary dạng `{tên_cũ: tên_mới}`:

```python
df.rename(columns={"date": "sales_date"}, inplace=True)
```

Phải dùng dạng key–value vì tham số `columns` là dictionary. Gán lại vài lần có thể đổi tiếp `sales_date` thành `sales_data`.

---

### 🔢 Đổi kiểu dữ liệu bằng `astype`

```python
df["value_new"] = df["value"].fillna(df["value"].mean()).astype(int)
```

Cột `value` đang là `float64`, nhưng có `NaN` nên **không thể** ép thẳng sang `int`. Phải `fillna(mean)` trước đã, rồi mới `.astype(int)`.

---

### 🧮 Áp hàm với `apply` và lambda

```python
df["double_value"] = df["value"].apply(lambda x: x * 2)
```

Ví dụ `value` = 28 sẽ thành 56. `apply` nhận cả hàm có sẵn lẫn hàm tự định nghĩa (khi đó truyền đúng tham số theo chữ ký hàm).

---

### 📊 Group by và aggregate

Tính mean của `value` theo từng `product`:

```python
grouped_mean = df.groupby("product")["value"].mean()
```

Kết quả với các sản phẩm: product 1 ≈ 46.21, product 2 ≈ 52.8, product 3 ≈ 55.16.

Group theo **nhiều cột** — truyền list tên cột:

```python
grouped_sum = df.groupby(["product", "region"])["value"].sum()
```

Ra bảng chéo: mỗi `product` theo từng `region`, tổng `value` tương ứng (ví dụ product 1 ở East = 292, North = 9, South = 100, West = 246).

Áp **nhiều hàm tổng hợp** cùng lúc bằng `agg`:

```python
grouped_agg = df.groupby("region")["value"].agg(["mean", "sum", "count"])
```

Kết quả là bảng nhiều cột — mỗi vùng một dòng, gồm mean, sum, count.

---

### 🔗 Merge và join DataFrame

Tạo hai DataFrame có cột khóa chung `key`:

```python
df1 = pd.DataFrame({"key": ["A", "B", "C"], "value1": [1, 2, 3]})
df2 = pd.DataFrame({"key": ["A", "B", "D"], "value2": [4, 5, 6]})
```

Merge cơ bản với `on` và `how`:

```python
merged_inner = pd.merge(df1, df2, on="key", how="inner")
```

Bốn kiểu join:

| `how` | Kết quả |
|---|---|
| `inner` | Chỉ các key xuất hiện ở **cả hai** (A, B) |
| `outer` | Tất cả key của **cả hai**, chỗ thiếu điền `NaN` (C và D xuất hiện với `NaN`) |
| `left` | Ưu tiên key của **DataFrame trái** (C có mặt, value2 = `NaN`) |
| `right` | Ưu tiên key của **DataFrame phải** (D có mặt, value1 = `NaN`) |

* `on="key"` chỉ định cột dùng để nối — phải cùng tên ở hai bảng.
* `how="inner"` là mặc định kiểu join phổ biến: chỉ giữ bản ghi khớp ở cả hai bên.

Các phép này tương đương với `JOIN` trong SQL — gần như mọi thao tác SQL đều làm được trong pandas.

---

Bộ kỹ năng ở bài này là "đồ nghề" EDA: đọc dữ liệu, dọn missing value, biến đổi cột, gộp nhóm, nối bảng. Càng làm nhiều bài toán thật, bạn càng thuần tay. Bài sau mình xem cách đọc dữ liệu từ **nhiều nguồn khác nhau** bằng pandas.

> ⚠️ Cần kiểm chứng: transcript tại thời điểm quay khóa (pandas 1.x) hiển thị cột chuỗi là `object`. Từ pandas 3.0 (phát hành 01/2026), cột chuỗi mặc định dùng **`StringDtype`** (hiển thị `str`) thay vì `object` theo PDEP-14; cách xử lý dữ liệu trong bài không đổi, nhưng kết quả `df.dtypes` trên máy bạn có thể khác.
