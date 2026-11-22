---
title: 'Reproducibility: lấy cái ngẫu nhiên ra khỏi ngẫu nhiên'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 36
status: edited
source: '036 - PyTorch Reproducibility (Taking the Random Out of Random).md'
categories:
- AI
tags: []
---

# 🎰 Reproducibility: lấy cái ngẫu nhiên ra khỏi ngẫu nhiên

> Nguồn: `036 - PyTorch Reproducibility (Taking the Random Out of Random).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668446)

Neural network học bằng cách **bắt đầu với số ngẫu nhiên**, thực hiện phép toán tensor, rồi cập nhật những con số đó để biểu diễn dữ liệu tốt hơn. Lặp đi lặp lại. Nhưng nếu bạn muốn một thí nghiệm **tái lập được** thì sao? Bài này nói về **random seed**.

### 🎲 Vấn đề: mỗi lần chạy lại ra số khác

```python
a = torch.rand(3, 4)
b = torch.rand(3, 4)

print(a)
print(b)
print(f"Equal anywhere? {a == b}")
```

Mỗi lần chạy cell, ta lại được bộ số mới. Nếu bạn gửi notebook cho bạn bè chạy thử, họ sẽ nhận **kết quả khác** — rất khó so sánh, khó gỡ lỗi.

Về bản chất, máy tính là **deterministic** — chạy cùng các bước thì cho cùng kết quả. Cái ta gọi là "random" thực ra là **pseudo-randomness** (giả ngẫu nhiên), được sinh bởi một **pseudo random number generator**.

---

### 🌱 Random seed: "gia vị" cho sự ngẫu nhiên

**Random seed** là một con số khởi tạo bộ sinh số giả ngẫu nhiên. Cùng một seed, cùng một chuỗi số được sinh ra mỗi lần.

Con số hay dùng nhất là **42** — "câu trả lời cho vũ trụ". Nhưng `0`, `1`, `1234`, `77`... đều được; mỗi seed là một "hương vị" ngẫu nhiên khác nhau.

---

### 🧪 Thử ngay

```python
torch.manual_seed(42)

c = torch.rand(3, 4)
d = torch.rand(3, 4)

print(c)
print(d)
print(f"Equal anywhere? {c == d}")
```

Kết quả vẫn khác nhau! Vì sao?

Vì `manual_seed` **chỉ đặt lại trạng thái** của bộ sinh số ngẫu nhiên. Gọi một lần rồi `torch.rand` hai lần, bạn nhận **hai đoạn liên tiếp** của cùng một chuỗi — khác nhau.

Muốn tái lập từng lần, phải **gọi lại seed trước mỗi lần sinh số**:

```python
torch.manual_seed(42)
c = torch.rand(3, 4)

torch.manual_seed(42)
d = torch.rand(3, 4)

print(c)
print(d)
print(f"Equal anywhere? {c == d}")   # giờ c và d giống nhau
```

---

### 📓 Lưu ý khi dùng trong notebook

Với notebook, `torch.manual_seed` thường **chỉ hiệu lực cho một khối code**. Nếu bạn tạo nhiều tensor random liên tiếp, cứ gọi seed trước mỗi lần gọi `torch.rand`.

Còn trong script thường, người ta hay đặt `torch.manual_seed(...)` **một lần ở đầu**, rồi để toàn bộ code chạy tuần tự — khi đó seed quyết định cả chuỗi.

Không có method `torch.rand.seed()` nào cả — seed là hàm riêng **`torch.manual_seed`**.

---

### 🛠️ Khi Colab báo "save failed"

Mình gặp lại lỗi lưu notebook tự động. Cách xử lý quen thuộc:

* Cứ tiếp tục code, Colab thường tự khôi phục.
* Hoặc **File → Download/Save a copy**, rồi upload lại.
* Tải notebook về máy, mở lại như một instance Colab mới.

---

### 📚 Đọc thêm

* Tài liệu chính thức **PyTorch Reproducibility** — bài giảng "extra curriculum" của mục này. Dù chưa hiểu hết code, hãy biết nó tồn tại.
* Trang Wikipedia **Random seed** — khái niệm phổ quát, không riêng PyTorch (NumPy cũng có seed).

---

### 🎯 Chốt lại

* Máy tính không có random thật, chỉ có **pseudo-randomness**.
* **`torch.manual_seed(seed)`** giúp kết quả **tái lập**.
* Trong notebook, nhớ **seed lại trước mỗi lần** sinh số random.

Chúng ta sắp xong phần fundamentals rồi. Còn vài chủ đề nữa thôi — cố lên! Hẹn gặp các bạn ở bài sau.
