---
title: 'Hiểu Về Big O (Phần 2): Omega, Theta và Big O'
date: '2025-10-26 01:03:55'
date_gmt: '2025-10-25 18:03:55'
modified: '2025-10-26 15:15:41'
status: publish
slug: hieu-ve-big-o-phan-2-omega-theta-va-big-o
wordpress_id: 400
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-phan-2-omega-theta-va-big-o/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Ở phần trước, chúng ta đã tìm hiểu **Big O notation** là gì — một cách đo **độ phức tạp thời gian (time complexity)** và **độ phức tạp bộ nhớ (space complexity)** trong lập trình.

Trong bài hôm nay, chúng ta sẽ làm quen với **ba chữ cái Hy Lạp** mà bạn chắc chắn sẽ gặp khi học về Big O:  
👉 **Ω (Omega)**, **Θ (Theta)** và **O (Omicron / Big O)**.

---

## **1. Ba ký hiệu Hy Lạp trong phân tích thuật toán**

Khi đánh giá hiệu suất của một thuật toán, người ta không chỉ quan tâm đến “nó chạy chậm nhất bao nhiêu” mà còn muốn biết “trong điều kiện tốt nhất” hoặc “trung bình” thì sao.  
Ba ký hiệu này lần lượt đại diện cho ba trường hợp đó:

| Ký hiệu | Tên gọi | Ý nghĩa | Tình huống |
| --- | --- | --- | --- |
| **Ω (Omega)** | Omega | Best case – Trường hợp tốt nhất | Khi thuật toán chạy nhanh nhất có thể |
| **Θ (Theta)** | Theta | Average case – Trường hợp trung bình | Hiệu suất điển hình, thường xảy ra nhất |
| **O (Omicron)** – hay gọi là **Big O** | Big O | Worst case – Trường hợp tệ nhất | Khi thuật toán chạy lâu nhất có thể |


---

## **2. Ví dụ: Tìm kiếm trong mảng**

Giả sử bạn có một mảng gồm các số sau:  
`[1, 2, 3, 4, 5, 6, 7]`

Bạn viết một vòng **for loop** để tìm xem một giá trị có nằm trong mảng này không.

```
for (int i = 0; i < 7; ++i) {
    if (arr[i] == target) return true;
}
return false;
```

Bây giờ hãy xem xét ba trường hợp:

- **Best case (Ω):**  
  Nếu bạn tìm số **1**, chương trình sẽ dừng ngay ở lần lặp đầu tiên → chỉ **1 phép so sánh**.  
  ⟹ Độ phức tạp **Ω(1)**.
- **Average case (Θ):**  
  Nếu bạn tìm số **4**, phải duyệt qua **một nửa mảng** trung bình → **khoảng n/2 phép so sánh**.  
  ⟹ Độ phức tạp **Θ(n)**.
- **Worst case (O):**  
  Nếu bạn tìm số **7** (ở cuối mảng), vòng lặp phải duyệt hết toàn bộ mảng → **n phép so sánh**.  
  ⟹ Độ phức tạp **O(n)**.

---

## **3. Vì sao Big O chỉ nói về “worst case”?**

Trong thực tế, bạn sẽ nghe nhiều người nói:

> “Thuật toán này có average Big O là O(n)”  
> hoặc  
> “Best case Big O là O(1)”.

Nhưng **về mặt kỹ thuật, điều đó là sai**.  
Big O **luôn biểu diễn trường hợp xấu nhất** (worst case).

Nếu muốn nói về **best case**, ta dùng **Ω (Omega)**.  
Nếu muốn nói về **average case**, ta dùng **Θ (Theta)**.

Tuy nhiên, trong ngôn ngữ thường ngày của dân lập trình, mọi người **hay gọi tất cả là Big O** cho tiện.  
Ví dụ:

> “Thuật toán này O(n)”  
> thực ra có nghĩa là “độ phức tạp tệ nhất là tuyến tính”.

---

## **4. Kết luận**

Hiểu được ba ký hiệu này giúp bạn **phân tích thuật toán toàn diện hơn**:

- **Ω (Omega):** tốc độ nhanh nhất có thể đạt được.
- **Θ (Theta):** hiệu suất trung bình, thực tế nhất.
- **O (Big O):** độ phức tạp tệ nhất, đảm bảo chương trình vẫn ổn dù trong điều kiện xấu nhất.
