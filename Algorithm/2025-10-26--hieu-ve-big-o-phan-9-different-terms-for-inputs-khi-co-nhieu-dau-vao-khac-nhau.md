---
title: 'Hiểu Về Big O (Phần 9): Different Terms for Inputs – Khi Có Nhiều Đầu Vào
  Khác Nhau'
date: '2025-10-26 01:33:06'
date_gmt: '2025-10-25 18:33:06'
modified: '2025-10-26 15:15:21'
status: publish
slug: hieu-ve-big-o-phan-9-different-terms-for-inputs-khi-co-nhieu-dau-vao-khac-nhau
wordpress_id: 419
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-9-different-terms-for-inputs-khi-co-nhieu-dau-vao-khac-nhau/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Trong các phần trước, ta thường thấy hàm có **một đầu vào duy nhất**, ví dụ `n`, và ta nói thuật toán đó có độ phức tạp như **O(n)** hay **O(n²)**.

Nhưng trong thực tế, nhiều hàm **nhận nhiều tham số đầu vào khác nhau**, chẳng hạn như `a` và `b`.  
Lúc này, ta không thể “gom hết về một biến n” như trước được.

Đây là lúc cần hiểu rõ **cách biểu diễn Big O khi có nhiều đầu vào độc lập**.

---

## **1. Bắt đầu với ví dụ quen thuộc**

Trước đây, ta có hàm chạy hai vòng lặp liên tiếp:

```
void printItems(int n) {
    for (int i = 0; i < n; ++i)
        cout << i << endl;

    for (int j = 0; j < n; ++j)
        cout << j << endl;
}
```

Hai vòng lặp này chạy tổng cộng **2n lần**.  
→ Biểu diễn: **O(2n)**  
→ Đơn giản hóa: **O(n)** (theo quy tắc *Drop Constants*).

---

## **2. Bây giờ thêm hai biến đầu vào khác nhau**

Giờ ta thay đổi hàm để nhận **hai tham số** `a` và `b`:

```
void printItems(int a, int b) {
    for (int i = 0; i < a; ++i)
        cout << i << endl;

    for (int j = 0; j < b; ++j)
        cout << j << endl;
}
```

- Vòng lặp đầu tiên chạy **a** lần.
- Vòng lặp thứ hai chạy **b** lần.

Tổng số thao tác: **a + b**.  
→ Biểu diễn Big O: **O(a + b)** ✅

---

## **3. Sai lầm phổ biến**

Rất nhiều người sẽ nhìn vào đoạn code trên và nghĩ:

> “Hai vòng lặp → O(2n) → rút gọn thành O(n).”

❌ Sai hoàn toàn!

Vì trong trường hợp này, `a` và `b` **không nhất thiết bằng nhau**.

- Có thể `a = 10`, `b = 1000`.
- Hoặc `a` là số phần tử trong danh sách khách hàng, còn `b` là số sản phẩm trong kho.

Hai biến này **độc lập**, không thể “gom lại thành n” được.

---

## **4. Quy tắc tổng quát**

- Khi bạn có **nhiều đầu vào độc lập**, hãy giữ chúng tách biệt.  
  → `O(a + b)`  
  → `O(a × b)`

Ví dụ:

| Cấu trúc code | Phân tích | Biểu thức Big O |
| --- | --- | --- |
| Hai vòng lặp tuần tự | `for (a)` rồi `for (b)` | **O(a + b)** |
| Hai vòng lặp lồng nhau | `for (a)` bên ngoài, `for (b)` bên trong | **O(a × b)** |
| Một vòng chạy a, trong đó mỗi bước duyệt b phần tử | Mỗi phần tử của A quét qua B | **O(a × b)** |


---

## **5. Ví dụ thực tế**

Hãy tưởng tượng bạn viết chương trình **so khớp khách hàng với sản phẩm**:

```
void matchCustomersToProducts(vector<Customer> customers, vector<Product> products) {
    for (auto& c : customers) {        // a lần
        for (auto& p : products) {     // b lần
            if (c.needs(p))
                link(c, p);
        }
    }
}
```

- Nếu có 1.000 khách hàng và 500 sản phẩm, chương trình sẽ duyệt **1.000 × 500 = 500.000** lần.  
  → Độ phức tạp: **O(a × b)**

Không thể viết là **O(n²)**, vì **“n” không đại diện cho cả hai biến độc lập này.**

---

## **6. Vì sao điều này quan trọng**

Hiểu sai về *different terms for inputs* là lỗi cực kỳ phổ biến trong phỏng vấn.  
Nếu bạn nói “O(n²)” cho một bài có hai mảng đầu vào khác nhau, bạn đang ngầm giả định **cả hai mảng có cùng kích thước**, trong khi điều đó **không được nêu ra**.

Cách trả lời chuẩn sẽ là:

> “Thuật toán này có độ phức tạp O(a × b), trong đó *a* là số phần tử của danh sách A, *b* là số phần tử của danh sách B.”

Câu trả lời này cho thấy bạn **hiểu bản chất toán học của Big O**, không chỉ “đếm vòng lặp” theo cảm tính.

---

## **7. Tổng kết**

| Trường hợp | Biểu thức Big O | Giải thích |
| --- | --- | --- |
| Hai vòng lặp tuần tự | **O(a + b)** | Mỗi vòng chạy độc lập |
| Hai vòng lặp lồng nhau | **O(a × b)** | Mỗi phần tử của A duyệt qua toàn bộ B |
| Hai đầu vào phụ thuộc nhau (`a = b = n`) | **O(n²)** | Khi có quan hệ ràng buộc |
