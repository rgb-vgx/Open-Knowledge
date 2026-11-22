---
title: 'Toán tử số học, gán và so sánh trong Python'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 021
status: edited
source: '021 - Operators -1.md'
categories:
- AI
tags: []
---

# ➗ Toán tử số học, gán và so sánh trong Python

> Nguồn: `021 - Operators -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39517390)

Chào các bạn, bài này mình học về **toán tử** (operators) trong Python. Đây là nhóm cấu trúc cho phép thực hiện các phép toán số học, logic và so sánh; khóa học sẽ dùng rất thường xuyên, nên các bạn chưa có nền thì nên xem kỹ phần này.

### 💡 Toán tử là gì

Toán tử trong Python là những ký hiệu đặc biệt dùng để thao tác trên giá trị hoặc biến: tính toán, so sánh, gán dữ liệu, v.v. Python có rất nhiều toán tử, nhưng trong bài này mình tập trung vào ba nhóm:

* **Arithmetic operators** — thực hiện phép toán.
* **Assignment operators** — gán dữ liệu cho biến.
* **Comparison operators** — so sánh hai dữ liệu.

---

### ➕ Toán tử số học

Giả sử `x = 5`, `y = 7`. Khi cộng hai biến ta được `12`, khi nhân được `35`. Các phép cộng, trừ, nhân, chia dùng những toán tử tương ứng.

Điểm cần chú ý là phép chia:

* Một dấu `/` cho kết quả **floating point**. Ví dụ `35 / 7` ra `5.0`.
* Hai dấu `//` cho kết quả **nguyên**. Ví dụ `35 // 7` ra `5`.

Ngoài ra còn có **modulus** (lấy phần dư sau phép chia) và **exponentiation** (lũy thừa).

Ví dụ với `a = 35`, `p = 5`:

```python
a + p    # 40
a - p    # 30
a / p    # 7.0
a // p   # 7
a % p    # 0
```

Với `i = 2`:

```python
a * i    # 70
i ** 3   # 8
```

---

### 📥 Toán tử gán

Toán tử gán dùng để gán giá trị. Ví dụ `x = 5`. Muốn cộng thêm vào chính biến đó, mình dùng ký hiệu **add and assign**:

```python
x += 2   # x = 7
x %= 2   # x = 1
```

Sau `x += 2`, biến `x` thành `7`. Sau `x %= 2`, `x` thành `1`.

---

### ⚖️ Toán tử so sánh

Toán tử so sánh kiểm tra quan hệ giữa hai dữ liệu và trả về `True` hoặc `False`.

* `5 == 5` → `True`.
* So sánh `mass` với `Mass`: kết quả `False`, vì chữ đầu bên trái viết thường, bên phải viết hoa.
* `10 > 8` → `True`.
* `10 <= 2` → `False`.

---

Vậy là mình đã đi qua ba nhóm toán tử nền tảng: số học, gán và so sánh. Bài sau mình tiếp tục với các toán tử còn lại.
