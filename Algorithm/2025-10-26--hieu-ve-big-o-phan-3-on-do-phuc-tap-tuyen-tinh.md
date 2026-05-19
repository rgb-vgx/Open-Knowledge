---
title: 'Hiểu Về Big O (Phần 3): O(n) – Độ Phức Tạp Tuyến Tính'
date: '2025-10-26 01:06:33'
date_gmt: '2025-10-25 18:06:33'
modified: '2025-10-26 15:15:39'
status: publish
slug: hieu-ve-big-o-phan-3-on-do-phuc-tap-tuyen-tinh
wordpress_id: 403
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-3-on-do-phuc-tap-tuyen-tinh/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Sau khi đã nắm được ba ký hiệu **Ω (Omega)**, **Θ (Theta)** và **O (Big O)**, giờ là lúc chúng ta tìm hiểu **loại độ phức tạp đầu tiên và phổ biến nhất:**  
👉 **O(n)** — hay còn gọi là **độ phức tạp tuyến tính (Linear Time Complexity)**.

---

## **1. Vì sao bắt đầu với O(n)?**

Chúng ta không bắt đầu với loại nhanh nhất hay chậm nhất, mà là loại **dễ hiểu nhất**.  
O(n) xuất hiện gần như ở khắp nơi trong lập trình — từ duyệt mảng, tìm kiếm, cho đến xử lý danh sách.

---

## **2. Ví dụ minh họa: Hàm in các phần tử**

Giả sử bạn có một hàm đơn giản:

```
#include <iostream>
using namespace std;

void printItems(int n) {
    for (int i = 0; i < n; ++i) {
        cout << i << endl;
    }
}

int main() {
    printItems(10);
    return 0;
}
```

Khi chạy chương trình, kết quả in ra:

```
0
1
2
3
4
5
6
7
8
9
```

Hàm `printItems()` nhận giá trị **n = 10**, và vòng `for` chạy **10 lần**.  
Nếu bạn truyền vào `n = 100`, nó sẽ chạy **100 lần**.

→ **Số lần thực hiện tỉ lệ thuận với giá trị đầu vào n**.  
Đây chính là **đặc trưng của O(n)**.

---

## **3. Hiểu bản chất: “Tuyến tính” nghĩa là gì?**

Độ phức tạp **O(n)** nghĩa là:

> Khi **đầu vào tăng gấp đôi**, thì **số phép tính cũng tăng gấp đôi**.

Ta có thể hình dung nó bằng đồ thị:

- **Trục X (ngang):** Kích thước đầu vào `n`.
- **Trục Y (dọc):** Số phép toán được thực hiện.

Đồ thị của O(n) là **một đường thẳng dốc lên đều đặn** – biểu thị mối quan hệ *tuyến tính* giữa đầu vào và thời gian xử lý.

Nếu `n = 1000`, thuật toán thực hiện 1000 bước.  
Nếu `n = 1.000.000`, nó sẽ thực hiện 1.000.000 bước.

Không nhanh, không chậm — **vừa đủ ổn định và dễ dự đoán**.

---

## **4. Khi nào gặp O(n) trong thực tế**

O(n) là độ phức tạp thường gặp nhất trong các thao tác xử lý dữ liệu:

| Tình huống | Mô tả | Độ phức tạp |
| --- | --- | --- |
| Duyệt qua mảng hoặc danh sách | Duyệt từng phần tử một | **O(n)** |
| Tìm kiếm tuyến tính (Linear Search) | Tìm giá trị trong mảng chưa sắp xếp | **O(n)** |
| Tính tổng, đếm, hoặc kiểm tra điều kiện trong mảng | Mỗi phần tử được xử lý một lần | **O(n)** |


---

## **5. Ưu và nhược điểm**

| Ưu điểm | Nhược điểm |
| --- | --- |
| Dễ hiểu, dễ cài đặt | Không tối ưu cho dữ liệu lớn |
| Dự đoán được thời gian chạy | Không tận dụng cấu trúc dữ liệu đặc biệt |
| Ổn định – không bị biến động lớn | Khi n quá lớn, thời gian xử lý tăng đáng kể |


---

## **6. Tổng kết**

- **O(n)** còn được gọi là **độ phức tạp tuyến tính**, nghĩa là thời gian chạy **tăng theo tỉ lệ với đầu vào**.
- Đây là loại độ phức tạp “chuẩn mực” – không tệ nhưng cũng không tối ưu.
- Hiểu rõ O(n) là bước đầu để phân biệt với những dạng nhanh hơn như **O(log n)** hay **O(1)** mà ta sẽ học ở các phần sau.
