---
title: 'Hiểu Về Big O (Phần 5): O(n²) – Khi Thuật Toán Trở Nên Chậm Chạp'
date: '2025-10-26 01:16:20'
date_gmt: '2025-10-25 18:16:20'
modified: '2025-10-26 15:15:33'
status: publish
slug: hieu-ve-big-o-phan-5-on%c2%b2-khi-thuat-toan-tro-nen-cham-chap
wordpress_id: 409
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-5-on%c2%b2-khi-thuat-toan-tro-nen-cham-chap/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Ở phần trước, ta đã học về **O(n)** – độ phức tạp tuyến tính – và quy tắc **Drop Constants** (loại bỏ hằng số).  
Giờ ta sẽ chuyển sang một loại độ phức tạp **nặng nề hơn nhiều**:  
👉 **O(n²)**, hay còn gọi là **độ phức tạp bậc hai (quadratic complexity)**.

---

## **1. Từ hai vòng lặp nối tiếp đến hai vòng lặp lồng nhau**

Trong phần trước, chúng ta có hai vòng `for` **chạy tuần tự** – vòng này xong mới đến vòng kia:  
→ chạy **2n lần**, được đơn giản hóa thành **O(n)**.

Nhưng nếu bây giờ ta **lồng vòng lặp này vào trong vòng lặp kia**, chuyện sẽ hoàn toàn khác.

Hãy xem ví dụ dưới đây 👇

```
#include <iostream>
using namespace std;

void printPairs(int n) {
    for (int i = 0; i < n; ++i) {          // Vòng lặp ngoài
        for (int j = 0; j < n; ++j) {      // Vòng lặp trong
            cout << i << " " << j << endl;
        }
    }
}

int main() {
    printPairs(10);
    return 0;
}
```

Khi chạy với `n = 10`, chương trình in ra:

```
0 0
0 1
...
9 8
9 9
```

Tổng cộng **100 dòng** kết quả.

---

## **2. Vì sao lại là O(n²)?**

Hãy cùng đếm số phép lặp:

- Vòng **ngoài** chạy `n` lần.
- Mỗi lần vòng ngoài chạy, vòng **trong** cũng chạy `n` lần.  
  → Tổng cộng: **n × n = n²** phép lặp.

Ví dụ:

- `n = 10` → 10 × 10 = 100 lần.
- `n = 100` → 100 × 100 = 10.000 lần.
- `n = 1.000` → 1.000 × 1.000 = 1.000.000 lần.

Bạn thấy đấy, **O(n²)** tăng rất nhanh khi `n` lớn.

---

## **3. So sánh O(n²) và O(n) trên đồ thị**

Nếu vẽ đồ thị với:

- **Trục X:** kích thước đầu vào `n`.
- **Trục Y:** số phép toán cần thực hiện.

Ta sẽ thấy:

- **O(n)** là **đường thẳng tăng đều**.
- **O(n²)** là **đường cong uốn lên rất nhanh** – khi `n` tăng, số phép toán tăng **theo bình phương**.

> Ví dụ: khi `n` tăng gấp 2, thời gian thực hiện tăng gấp **4 lần**.  
> Khi `n` tăng gấp 10, thời gian tăng gấp **100 lần**.

---

## **4. Khi nào gặp O(n²) trong thực tế**

O(n²) thường xuất hiện khi ta có **hai vòng lặp lồng nhau**, đặc biệt là trong các thuật toán xử lý cặp phần tử:

| Tình huống | Mô tả | Độ phức tạp |
| --- | --- | --- |
| So sánh từng cặp phần tử trong mảng | Duyệt mọi cặp `(i, j)` | **O(n²)** |
| Bubble Sort, Selection Sort | Thuật toán sắp xếp cơ bản | **O(n²)** |
| Kiểm tra trùng lặp bằng hai vòng lặp | Duyệt toàn bộ để đối chiếu | **O(n²)** |

Ví dụ cụ thể – **Bubble Sort**:

```
for (int i = 0; i < n; ++i)
    for (int j = 0; j < n - i - 1; ++j)
        if (arr[j] > arr[j + 1])
            swap(arr[j], arr[j + 1]);
```

Thuật toán này chạy tốt với mảng nhỏ,  
nhưng nếu `n = 10.000`, nó có thể thực hiện đến **100 triệu phép so sánh** — cực kỳ chậm.

---

## **5. Bài học rút ra**

- **O(n²)** là **một cấp độ tăng trưởng cao hơn O(n)** rất nhiều.
- Khi có thể, **tránh vòng lặp lồng nhau** – tìm cách **giảm số lần duyệt**, hoặc **tối ưu bằng cấu trúc dữ liệu** khác.
- Trong phỏng vấn, nếu bạn viết thuật toán O(n²), người phỏng vấn thường sẽ hỏi: “Bạn có thể cải thiện độ phức tạp này không?”

---

## **6. Tổng kết**

| Độ phức tạp | Dạng tăng trưởng | Ví dụ thường gặp | Hiệu suất |
| --- | --- | --- | --- |
| **O(1)** | Hằng số | Truy cập mảng, phép gán | ⚡ Rất nhanh |
| **O(n)** | Tuyến tính | Duyệt danh sách | ✅ Ổn định |
| **O(n²)** | Bậc hai | Vòng lặp lồng nhau, Bubble Sort | 🐢 Chậm khi n lớn |
