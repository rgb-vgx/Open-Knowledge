---
title: 'Hiểu Về Big O (Phần 8): O(log n) – Khi Thuật Toán Trở Nên Thông Minh'
date: '2025-10-26 01:24:20'
date_gmt: '2025-10-25 18:24:20'
modified: '2025-10-26 15:15:24'
status: publish
slug: hieu-ve-big-o-phan-8-olog-n-khi-thuat-toan-tro-nen-thong-minh
wordpress_id: 416
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-8-olog-n-khi-thuat-toan-tro-nen-thong-minh/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Sau khi đã tìm hiểu **O(1)** – nhanh nhất, **O(n)** – tuyến tính, và **O(n²)** – chậm chạp,  
giờ ta đến với một cấp độ “cao siêu” hơn: **O(log n)**, hay còn gọi là **độ phức tạp logarit**.

Đây là nền tảng của các thuật toán tối ưu như **Binary Search**, **Merge Sort**, hay **Quick Sort**.

---

## **1. Hãy bắt đầu với ví dụ đơn giản: tìm số trong danh sách**

Giả sử ta có danh sách đã được sắp xếp:

```
[1, 2, 3, 4, 5, 6, 7, 8]
```

Ta cần tìm số **1** trong danh sách này.

Nếu ta tìm tuần tự (linear search), ta sẽ phải kiểm tra từng phần tử: 1, 2, 3…  
→ **O(n)** bước.

Nhưng có cách **thông minh hơn**:  
👉 **Chia đôi danh sách mỗi lần tìm** — *đó chính là Binary Search.*

---

## **2. Cách hoạt động của Binary Search**

1️⃣ **Bước 1:** Chia danh sách làm đôi  
→ `[1, 2, 3, 4]` và `[5, 6, 7, 8]`  
Số 1 nằm ở nửa đầu, nên ta bỏ nửa sau.

2️⃣ **Bước 2:** Lại chia đôi `[1, 2, 3, 4]`  
→ `[1, 2]` và `[3, 4]`  
Số 1 vẫn nằm ở nửa đầu, bỏ nửa sau.

3️⃣ **Bước 3:** Chia `[1, 2]` → `[1]` và `[2]`  
Tìm thấy số 1! ✅

Chúng ta chỉ cần **3 bước** để tìm ra số 1 trong danh sách **8 phần tử**.

---

## **3. Vì sao lại là “log n”?**

Ta thấy rằng:

- Bước 1: còn 8 phần tử
- Bước 2: còn 4 phần tử
- Bước 3: còn 2 phần tử
- Bước 4: còn 1 phần tử

Mỗi lần, ta **chia đôi** số phần tử còn lại.  
Câu hỏi là: cần chia bao nhiêu lần để từ `n` về `1`?

Đó chính là **log₂(n)** (log cơ số 2).

Ví dụ:

- `2³ = 8` → `log₂(8) = 3`
- `2¹⁰ = 1024` → `log₂(1024) = 10`

Nói cách khác:

> log₂(n) = số lần cần chia đôi n để còn lại 1 phần tử.

---

## **4. Sức mạnh của log n khi n rất lớn**

Giả sử bạn có **1 tỷ phần tử (1.000.000.000)**  
Nếu tìm tuyến tính (**O(n)**) → bạn cần **1 tỷ phép so sánh**.  
Nếu tìm bằng **Binary Search (O(log n))** → chỉ cần **31 phép so sánh!**

> 2³¹ ≈ 2.147.483.648  
> ⇒ log₂(1.000.000.000) ≈ 31

Chỉ **31 bước** để tìm trong **1 tỷ phần tử** – thật ấn tượng! 🚀

---

## **5. Hình dung trên đồ thị**

- **O(1)** → đường nằm ngang (không đổi).
- **O(log n)** → đường cong *rất phẳng*, tăng rất chậm.
- **O(n)** → đường thẳng dốc lên đều.
- **O(n²)** → đường cong tăng nhanh.

O(log n) nằm **giữa O(1)** và **O(n)**,  
là biểu tượng của **hiệu suất thông minh** – không cần quá mạnh, chỉ cần khéo léo chia nhỏ vấn đề.

---

## **6. Một biến thể quan trọng: O(n log n)**

Một số thuật toán sắp xếp thông minh (như **Merge Sort**, **Quick Sort**) có độ phức tạp:

> **O(n log n)**

Lý do:

- Cần xử lý `n` phần tử (→ O(n))
- Và mỗi lần xử lý lại **chia đôi dữ liệu** (→ O(log n))

Kết hợp hai yếu tố đó → **O(n log n)** – *mức tối ưu nhất cho các thuật toán sắp xếp tổng quát.*

---

## **7. Khi nào gặp O(log n) trong thực tế**

| Tình huống | Mô tả | Độ phức tạp |
| --- | --- | --- |
| **Binary Search** | Tìm phần tử trong mảng đã sắp xếp | **O(log n)** |
| **Cây nhị phân cân bằng (AVL, Red-Black)** | Tìm kiếm, chèn, xóa phần tử | **O(log n)** |
| **Heap (Priority Queue)** | Thêm hoặc xóa phần tử | **O(log n)** |
| **Thuật toán chia để trị (Divide & Conquer)** | Chia nhỏ bài toán mỗi bước | **O(log n)** |


---

## **8. Tổng kết**

| Độ phức tạp | Tăng trưởng | Ví dụ tiêu biểu | Hiệu suất |
| --- | --- | --- | --- |
| **O(1)** | Hằng số | Truy cập mảng | ⚡ Cực nhanh |
| **O(log n)** | Logarit | Binary Search | 🚀 Rất nhanh |
| **O(n)** | Tuyến tính | Duyệt mảng | ✅ Ổn định |
| **O(n²)** | Bậc hai | Bubble Sort | 🐢 Chậm khi n lớn |
| **O(n log n)** | Tuyến tính–logarit | Merge/Quick Sort | ⚙️ Cực kỳ tối ưu cho sắp xếp |
