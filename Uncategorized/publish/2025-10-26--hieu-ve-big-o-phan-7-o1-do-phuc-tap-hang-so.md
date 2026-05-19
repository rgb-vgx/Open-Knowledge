---
title: 'Hiểu Về Big O (Phần 7): O(1) – Độ Phức Tạp Hằng Số'
date: '2025-10-26 01:20:33'
date_gmt: '2025-10-25 18:20:33'
modified: '2025-10-26 15:15:27'
status: publish
slug: hieu-ve-big-o-phan-7-o1-do-phuc-tap-hang-so
wordpress_id: 414
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-7-o1-do-phuc-tap-hang-so/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Khi nói đến hiệu suất, ta luôn mong muốn một thuật toán **càng nhanh càng tốt**.  
Và trong thế giới của Big O, không gì nhanh hơn **O(1)** – *Constant Time Complexity*.

---

## **1. Bắt đầu với một ví dụ đơn giản**

Hãy xem hàm `addItems()` dưới đây:

```
int addItems(int n) {
    return n + n;
}
```

Hàm này chỉ thực hiện **một phép cộng** rồi trả về kết quả.

Nếu bạn truyền `n = 1`, chương trình thực hiện 1 phép tính.  
Nếu bạn truyền `n = 1.000.000`, chương trình **vẫn chỉ thực hiện đúng 1 phép tính**.

→ **Số lần thao tác không thay đổi dù n lớn đến đâu.**  
Đây chính là đặc điểm của **O(1)**.

---

## **2. Thế nào là O(1)?**

O(1) có nghĩa là **thời gian thực hiện không phụ thuộc vào kích thước đầu vào**.

- Dù bạn nhập 1 phần tử hay 1 tỷ phần tử, số bước thực hiện **vẫn giữ nguyên**.
- Chương trình luôn chạy trong một khoảng thời gian *cố định* (hằng số).

Ví dụ:

```
arr[5];        // Truy cập phần tử thứ 5 trong mảng – O(1)
x = a + b;     // Phép cộng đơn giản – O(1)
bool isEmpty = stack.empty(); // Kiểm tra ngăn xếp rỗng – O(1)
```

---

## **3. “O(2)” có tồn tại không?**

Giả sử bạn viết:

```
int addThree(int n) {
    return n + n + n;
}
```

Ở đây có **hai phép cộng**, nên có thể nghĩ là “O(2)” – nhưng trong Big O, ta **bỏ hằng số đi** (theo quy tắc *Drop Constants* đã học).  
Vì vậy, **O(2)** vẫn được viết là **O(1)**.

Ta không quan tâm đến việc có 1, 2 hay 10 phép tính – chỉ cần biết **tất cả đều không tăng theo n**.

---

## **4. Hình dung trên đồ thị**

Trên đồ thị Big O:

- **Trục X:** kích thước đầu vào (n)
- **Trục Y:** số lượng thao tác

Đường **O(1)** là **một đường thẳng nằm ngang** ở gần đáy đồ thị.  
Dù `n` tăng lên bao nhiêu, đường này **vẫn không đi lên** – thể hiện rằng chi phí xử lý *không đổi*.

---

## **5. Khi nào gặp O(1) trong thực tế**

| Tình huống | Mô tả | Độ phức tạp |
| --- | --- | --- |
| Truy cập phần tử trong mảng | Dựa trên chỉ số cố định | **O(1)** |
| Gán giá trị cho biến | Phép toán đơn giản | **O(1)** |
| Truy cập phần tử trong Hash Table (trung bình) | Nhờ hàm băm | **O(1)** |
| Kiểm tra trạng thái (true/false, rỗng/không rỗng) | Không duyệt dữ liệu | **O(1)** |

Trong thực tế, **O(1)** thường xuất hiện ở các thao tác *đọc hoặc ghi trực tiếp*, không cần duyệt qua dữ liệu.

---

## **6. O(1) không có nghĩa là “chạy tức thì”**

Điều quan trọng là:

> **O(1) không đồng nghĩa với “thời gian = 0”**, mà là *“thời gian không đổi theo n”*.

Một phép truy cập bộ nhớ mất vài nanosecond, vẫn là **O(1)**.  
Một hàm kiểm tra điều kiện với 5 bước cũng vẫn là **O(1)**,  
miễn là số bước đó **không tăng** khi dữ liệu đầu vào tăng.

---

## **7. Tổng kết**

| Độ phức tạp | Đặc điểm | Ví dụ thường gặp | Hiệu suất |
| --- | --- | --- | --- |
| **O(1)** | Thời gian không đổi | Truy cập mảng, phép toán đơn | ⚡ Cực nhanh |
| **O(log n)** | Tăng chậm dần | Tìm kiếm nhị phân | 🚀 Rất nhanh |
| **O(n)** | Tăng tuyến tính | Duyệt danh sách | ✅ Ổn định |
| **O(n²)** | Tăng theo bình phương | Vòng lặp lồng nhau | 🐢 Chậm khi n lớn |
