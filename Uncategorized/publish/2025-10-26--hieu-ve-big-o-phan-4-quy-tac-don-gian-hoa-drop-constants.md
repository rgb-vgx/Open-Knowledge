---
title: 'Hiểu Về Big O (Phần 4): Quy Tắc Đơn Giản Hóa – Drop Constants'
date: '2025-10-26 01:09:33'
date_gmt: '2025-10-25 18:09:33'
modified: '2025-10-26 15:15:36'
status: publish
slug: hieu-ve-big-o-phan-4-quy-tac-don-gian-hoa-drop-constants
wordpress_id: 406
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-4-quy-tac-don-gian-hoa-drop-constants/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Ở phần trước, ta đã nói về **O(n)** – độ phức tạp tuyến tính, nơi số lần thực hiện tỉ lệ thuận với kích thước đầu vào.

Giờ đây, ta bắt đầu đi sâu hơn vào cách **đơn giản hóa biểu thức Big O**, giúp việc phân tích dễ hiểu và nhất quán hơn.  
Và quy tắc đầu tiên, cơ bản nhất, chính là:  
👉 **Drop Constants** – *Loại bỏ hằng số.*

---

## **1. Quy tắc “Drop Constants” là gì?**

Hãy cùng xem một ví dụ cụ thể.  
Trong bài trước, chúng ta có hàm `printItems()` chạy vòng lặp `n` lần:

```
void printItems(int n) {
    for (int i = 0; i < n; ++i)
        cout << i << endl;
}
```

Hàm này có độ phức tạp **O(n)**.

Bây giờ, ta thêm **một vòng lặp thứ hai**, cũng chạy `n` lần nữa:

```
void printItemsTwice(int n) {
    for (int i = 0; i < n; ++i)
        cout << i << endl;

    for (int j = 0; j < n; ++j)
        cout << j << endl;
}
```

Khi chạy với `n = 10`, chương trình sẽ in:

```
0 1 2 3 4 5 6 7 8 9
0 1 2 3 4 5 6 7 8 9
```

Tổng cộng in ra **20 dòng** — nghĩa là chương trình thực hiện **2n phép lặp**.

---

## **2. Vậy Big O là O(2n) hay O(n)?**

Theo định nghĩa, nó thực hiện **2n** thao tác.  
Nhưng khi biểu diễn dưới dạng Big O, ta **luôn viết là O(n)**, chứ **không bao giờ là O(2n)**.

Lý do? Chính là **quy tắc “Drop Constants”** – *Loại bỏ hằng số nhân.*

---

## **3. Tại sao lại bỏ hằng số đi?**

Big O không nhằm **đo chính xác số phép toán**, mà chỉ muốn **xác định “tốc độ tăng trưởng” của thuật toán**.

- Nếu thuật toán chạy `n` lần → **tăng tuyến tính**.
- Nếu chạy `2n`, `3n`, hay thậm chí `100n` lần → **vẫn tăng tuyến tính**.

Hệ số nhân (2, 3, 100) **chỉ ảnh hưởng đến tốc độ thực tế**, chứ **không thay đổi bản chất của độ phức tạp**.

Ví dụ:

- `O(2n)` và `O(100n)` đều là **O(n)** – cùng thuộc nhóm tuyến tính.
- Nhưng **O(2ⁿ)** (hàm mũ) thì khác hoàn toàn – tăng nhanh khủng khiếp khi `n` lớn.

👉 Khi `n` trở nên cực kỳ lớn, **yếu tố hằng số gần như không còn ý nghĩa** so với kiểu tăng trưởng.

---

## **4. Hình dung trực quan**

Nếu ta vẽ đồ thị:

- **O(n)**: đường thẳng tăng đều.
- **O(2n)**: cũng là đường thẳng, chỉ **cao hơn một chút**, nhưng cùng độ dốc.
- **O(n²)**: là **đường cong** – tăng nhanh hơn nhiều khi `n` lớn.

Khi `n` = 10 hay 100, khác biệt giữa `n` và `2n` có thể thấy rõ.  
Nhưng khi `n` = 1.000.000, `2n` chỉ khác `n` gấp đôi – **vô cùng nhỏ** so với sự khác biệt giữa tuyến tính và bậc hai.

---

## **5. Tổng kết quy tắc “Drop Constants”**

| Tình huống | Biểu thức gốc | Sau khi đơn giản hóa |
| --- | --- | --- |
| Chạy 2 vòng lặp n lần | O(2n) | **O(n)** |
| Chạy 5 vòng lặp n lần | O(5n) | **O(n)** |
| Chạy 3 vòng lặp log(n) lần | O(3 log n) | **O(log n)** |

💡 **Nguyên tắc:**

> Khi biểu thức Big O có **hệ số nhân cố định**, hãy **bỏ nó đi** – vì ta chỉ quan tâm đến *tốc độ tăng trưởng tổng quát*, không phải con số cụ thể.

---

## **6. Kết luận**

- Big O là **công cụ phân loại** chứ không phải **đo đếm chính xác**.
- **Drop Constants** giúp ta đơn giản hóa biểu thức để dễ nhận biết dạng tăng trưởng.
- Dù chạy `n`, `2n`, hay `100n` lần, thuật toán vẫn được xem là **O(n)** – *tăng tuyến tính.*
