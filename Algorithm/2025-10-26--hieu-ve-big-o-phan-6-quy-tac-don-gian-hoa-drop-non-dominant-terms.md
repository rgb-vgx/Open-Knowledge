---
title: 'Hiểu Về Big O (Phần 6): Quy Tắc Đơn Giản Hóa – Drop Non-Dominant Terms'
date: '2025-10-26 01:19:09'
date_gmt: '2025-10-25 18:19:09'
modified: '2025-10-26 15:15:30'
status: publish
slug: hieu-ve-big-o-phan-6-quy-tac-don-gian-hoa-drop-non-dominant-terms
wordpress_id: 412
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-6-quy-tac-don-gian-hoa-drop-non-dominant-terms/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Ở các phần trước, ta đã học:

- **O(n)** – tuyến tính,
- **O(n²)** – bậc hai,
- Và quy tắc đầu tiên **Drop Constants** – loại bỏ hằng số.

Giờ ta đến với **quy tắc thứ hai**:  
👉 **Drop Non-Dominant Terms** – *Bỏ đi các thành phần nhỏ hơn khi n rất lớn.*

---

## **1. Bối cảnh của ví dụ**

Ta sẽ dùng lại ví dụ **vòng lặp lồng nhau (O(n²))**, nhưng lần này **thêm một vòng lặp đơn (O(n))** phía sau.

```
#include <iostream>
using namespace std;

void printItems(int n) {
    // Vòng lặp lồng nhau: O(n²)
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cout << i << " " << j << endl;
        }
    }

    // Vòng lặp đơn: O(n)
    for (int k = 0; k < n; ++k) {
        cout << k << endl;
    }
}

int main() {
    printItems(10);
    return 0;
}
```

Khi chạy với `n = 10`, ta sẽ thấy:

```
0 0
...
9 9
0
1
...
9
```

---

## **2. Phân tích độ phức tạp**

Cùng tính số phép lặp:

- Cặp vòng `i` và `j`: chạy **n × n = n²** lần.
- Vòng `k`: chạy **n** lần.

Tổng cộng: **n² + n** phép lặp.  
Biểu diễn theo Big O:

> **O(n² + n)**

---

## **3. Tại sao chỉ giữ lại O(n²)?**

Khi `n` nhỏ, hai phần `n²` và `n` đều đáng kể.  
Nhưng khi `n` lớn, **n² sẽ vượt trội hoàn toàn**.

Ví dụ:

- Nếu `n = 10` → `n² = 100`, `n = 10`.
- Nếu `n = 100` → `n² = 10.000`, `n = 100`.
- Nếu `n = 1.000` → `n² = 1.000.000`, `n = 1.000`.

Khi `n` càng lớn, giá trị `n²` **thống trị hoàn toàn** phương trình.  
Phần `n` gần như **vô nghĩa** trong tổng thể.

→ Vì vậy, ta **bỏ đi các phần không chi phối (non-dominant terms)** và chỉ giữ lại phần lớn nhất.

Kết quả cuối cùng:

> **O(n² + n) → O(n²)**

---

## **4. Hình dung trực quan**

Trên đồ thị:

- **Đường O(n²)** uốn cong và tăng rất nhanh.
- **Đường O(n)** chỉ là đường thẳng nhỏ ở phía dưới.

Khi `n` lớn, phần `n²` cao vượt xa, nên `n` **gần như phẳng lì** so với nó.  
Đó là lý do tại sao ta chỉ giữ lại phần “chi phối” – dominant term.

---

## **5. Các ví dụ tương tự**

| Biểu thức ban đầu | Sau khi đơn giản hóa | Giải thích |
| --- | --- | --- |
| O(n² + n) | **O(n²)** | `n²` tăng nhanh hơn `n` |
| O(n³ + n² + n) | **O(n³)** | `n³` là dominant term |
| O(n + log n) | **O(n)** | log(n) tăng chậm hơn tuyến tính |
| O(2ⁿ + n²) | **O(2ⁿ)** | tăng theo mũ nhanh hơn nhiều |


---

## **6. Vì sao quy tắc này quan trọng**

Big O không chỉ là “đếm vòng lặp” — mà là **xác định tốc độ tăng trưởng tổng thể** khi dữ liệu đầu vào lớn dần.  
Việc **loại bỏ các phần không chi phối** giúp:

- Dễ nhìn ra bản chất thuật toán (tuyến tính, bậc hai, mũ, …)
- Giảm phức tạp khi so sánh giữa các giải pháp khác nhau
- Giúp phỏng vấn và phân tích hiệu suất rõ ràng, chính xác hơn

---

## **7. Tổng kết**

- Biểu thức Big O có thể gồm nhiều thành phần (n² + n + log n, …)
- Nhưng ta chỉ **giữ lại phần chi phối nhất** khi `n → ∞`
- Các phần nhỏ hơn gọi là **non-dominant terms** – có thể bỏ qua.

💡 **Tóm lại:**

> Khi `n` rất lớn, *chỉ phần tăng nhanh nhất mới thực sự quan trọng.*  
> **O(n² + n) → O(n²)**  
> **O(n³ + n²) → O(n³)**
