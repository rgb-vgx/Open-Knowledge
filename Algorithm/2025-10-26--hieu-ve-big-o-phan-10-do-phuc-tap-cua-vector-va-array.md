---
title: 'Hiểu Về Big O (Phần 10): Độ Phức Tạp Của Vector Và Array'
date: '2025-10-26 01:36:10'
date_gmt: '2025-10-25 18:36:10'
modified: '2025-10-26 15:15:18'
status: publish
slug: hieu-ve-big-o-phan-10-do-phuc-tap-cua-vector-va-array
wordpress_id: 421
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-10-do-phuc-tap-cua-vector-va-array/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Trong các phần trước, ta đã nói nhiều về Big O dưới góc độ lý thuyết:

- O(1): hằng số
- O(log n): logarit
- O(n): tuyến tính
- O(n²): bậc hai

Giờ hãy áp dụng những kiến thức đó vào một cấu trúc dữ liệu quen thuộc trong C++ — **`std::vector`** (hoặc array).

---

## **1. Vector và khái niệm n**

Trước hết, ta cần hiểu rằng trong Big O của vector,

> **n = số lượng phần tử hiện có trong vector.**

Tức là mọi phân tích độ phức tạp đều dựa trên *bao nhiêu phần tử đang có trong container đó*.

---

## **2. Thêm hoặc xóa phần tử ở cuối (push\_back / pop\_back)**

```
vector<int> v = {1, 2, 3};
v.push_back(17); // thêm phần tử 17 vào cuối
v.pop_back();    // xóa phần tử cuối
```

- Khi ta **thêm vào cuối**, ta chỉ cần gán phần tử vào vị trí kế tiếp trong bộ nhớ — không cần chạm vào các phần tử khác.
- Khi **xóa ở cuối**, ta chỉ cần bỏ đi phần tử cuối cùng — không cần dịch chuyển gì cả.

👉 **Không phụ thuộc vào kích thước vector (n)**  
→ **Độ phức tạp: O(1)**

> Đây là lý do vì sao `push_back()` và `pop_back()` được xem là **rất hiệu quả** trong vector.

---

## **3. Thêm hoặc xóa phần tử ở đầu (insert / erase ở begin)**

```
v.erase(v.begin());              // Xóa phần tử đầu tiên
v.insert(v.begin(), 11);         // Thêm phần tử 11 vào đầu
```

Khi bạn xóa phần tử đầu tiên:

- Mọi phần tử phía sau **phải dời về trước** để giữ nguyên thứ tự.

Khi bạn thêm phần tử mới vào đầu:

- Mọi phần tử phía sau **phải dời về sau** để nhường chỗ.

Ví dụ:

```
[11, 22, 33, 44]
→ erase(begin)
→ [22, 33, 44]  ← phải cập nhật toàn bộ chỉ số
```

👉 Phải chạm vào toàn bộ phần tử còn lại.  
→ **Độ phức tạp: O(n)**

---

## **4. Thêm hoặc xóa phần tử ở giữa**

```
v.insert(v.begin() + 2, 99);  // Chèn 99 vào vị trí thứ 2
v.erase(v.begin() + 2);       // Xóa phần tử tại vị trí thứ 2
```

Khi chèn ở giữa, mọi phần tử **sau vị trí đó** đều phải **dời sang phải** để nhường chỗ.  
Khi xóa ở giữa, chúng **dời sang trái** để lấp chỗ trống.

Do đó, dù bạn chỉ chèn “ở giữa” — bạn vẫn phải chạm vào gần **một nửa số phần tử**.  
Nhưng nhớ rằng:

> Big O chỉ đo **worst-case** và **bỏ hằng số**, nên ½n vẫn là **O(n)**.

👉 **Độ phức tạp: O(n)**

---

## **5. Tìm kiếm phần tử theo giá trị**

```
auto it = find(v.begin(), v.end(), 7);
```

Thuật toán `find()` phải **duyệt toàn bộ vector** để so sánh từng phần tử.  
Nếu phần tử ở cuối hoặc không tồn tại, nó sẽ kiểm tra **tất cả n phần tử**.

👉 **Độ phức tạp: O(n)**

---

## **6. Truy cập phần tử theo chỉ số**

```
int x = v[5]; // truy cập phần tử thứ 5
```

Vector (và array) lưu trữ các phần tử **liên tiếp trong bộ nhớ**,  
nên việc truy cập phần tử thứ *i* chỉ cần:

> địa chỉ = địa chỉ\_đầu + (i × kích\_thước\_phần\_tử)

Tức là chỉ **1 phép tính cộng và truy cập**.  
👉 **Không phụ thuộc n**  
→ **Độ phức tạp: O(1)**

---

## **7. Tổng kết các thao tác Big O của Vector**

| Thao tác | Mô tả | Độ phức tạp | Ghi chú |
| --- | --- | --- | --- |
| `push_back()` | Thêm phần tử vào cuối | **O(1)** | Trung bình (amortized) |
| `pop_back()` | Xóa phần tử cuối | **O(1)** | Nhanh nhất |
| `insert(begin)` | Thêm phần tử đầu | **O(n)** | Phải dịch chuyển toàn bộ |
| `erase(begin)` | Xóa phần tử đầu | **O(n)** | Phải cập nhật toàn bộ |
| `insert(mid)` | Chèn ở giữa | **O(n)** | Phải dịch chuyển phần còn lại |
| `erase(mid)` | Xóa ở giữa | **O(n)** | Phải lấp lại khoảng trống |
| `find(value)` | Tìm kiếm theo giá trị | **O(n)** | Phải duyệt toàn bộ |
| `operator[]` | Truy cập theo chỉ số | **O(1)** | Trực tiếp trong bộ nhớ |


---

## **8. Minh họa trực quan**

📊 Trên đồ thị:

- Các thao tác **push\_back, pop\_back, truy cập** → đường nằm ngang (O(1))
- Các thao tác **insert, erase, find** → đường tuyến tính tăng đều (O(n))

Điều này lý giải vì sao `std::vector` cực nhanh khi thao tác ở **cuối**,  
nhưng kém hiệu quả khi thao tác ở **đầu hoặc giữa**.

---

## **9. Bài học thực tế**

- Nếu bạn **thêm/xóa thường xuyên ở đầu hoặc giữa**, hãy cân nhắc dùng **`std::list`** hoặc **`std::deque`** thay vì vector.
- Nếu bạn **chỉ cần truy cập nhanh, thêm cuối ít khi xóa**, vector là lựa chọn tối ưu.

---

💡 **Tóm lại:**

> - Thêm/xóa ở **cuối** → **O(1)**
> - Thêm/xóa ở **đầu hoặc giữa** → **O(n)**
> - Truy cập theo **chỉ số** → **O(1)**
> - Tìm kiếm theo **giá trị** → **O(n)**
