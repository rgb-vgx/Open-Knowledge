---
title: 'Livelock và "Dining Philosophers": Khi Sự Lịch Sự Trở Thành Vô Dụng'
date: '2025-07-26 01:39:58'
date_gmt: '2025-07-25 18:39:58'
modified: '2025-07-26 17:38:04'
status: publish
slug: livelock-va-dining-philosophers-khi-su-lich-su-tro-thanh-vo-dung
wordpress_id: 232
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/livelock-va-dining-philosophers-khi-su-lich-su-tro-thanh-vo-dung/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã định nghĩa Livelock là tình trạng các thread vẫn hoạt động nhưng không tạo ra tiến triển hữu ích. Bây giờ, hãy quay lại bàn ăn của các triết gia để xem Livelock diễn ra trong thực tế như thế nào.

Chúng ta đã bỏ lại các triết gia trong một deadlock, nơi tất cả đều cứng nhắc giữ chiếc nĩa bên trái và chờ đợi vĩnh viễn. Một giải pháp "lịch sự" có vẻ hợp lý được đề ra: nếu một triết gia không thể nhặt được chiếc nĩa bên phải, họ nên đặt chiếc nĩa bên trái xuống để người khác có cơ hội, rồi thử lại sau.

Liệu sự "lịch sự" này có cứu được các triết gia khỏi chết đói không?

---

### Phần 1: Nỗ Lực Sửa Lỗi Deadlock Một Cách "Lịch Sự"

Ý tưởng trên có vẻ rất hợp lý. Chúng ta sẽ sửa lại logic của mỗi triết gia bằng cách sử dụng `try_lock` trong một vòng lặp.

**Logic mới:**

1. Khóa chiếc nĩa bên trái (`left_fork.lock()`).
2. Cố gắng khóa chiếc nĩa bên phải (`right_fork.try_lock()`).
3. **Nếu thành công:** Tuyệt vời! Bắt đầu ăn, sau đó đặt cả hai nĩa xuống và kết thúc.
4. **Nếu thất bại:** Hãy "lịch sự". **Mở khóa ngay chiếc nĩa bên trái** (`left_fork.unlock()`), chờ một chút, rồi quay lại bước 1 để thử lại từ đầu.

C++

```
void philosopher_task_livelock(int id, const std::string& name) {
    int left_fork = id;
    int right_fork = (id + 1) % NUM_PHILOSOPHERS;

    while (true) {
        forks[left_fork].lock();
        std::cout << name << " da nhat duoc nia trai.\n";

        if (forks[right_fork].try_lock()) {
            std::cout << name << " da nhat duoc nia phai va BAT DAU AN.\n";
            // ... ăn ...
            forks[right_fork].unlock();
            forks[left_fork].unlock();
            break; // Ăn xong, thoát khỏi vòng lặp
        } else {
            std::cout << name << " khong nhat duoc nia phai, dat nia trai xuong.\n";
            forks[left_fork].unlock();
            std::this_thread::sleep_for(std::chrono::milliseconds(10)); // Chờ và thử lại
        }
    }
}
```

---

### Phần 2: Kết Quả: Bận Rộn Nhưng Không Ai Được Ăn 🍝

Khi chạy chương trình với logic mới này, bạn sẽ thấy một màn kịch diễn ra trên console của mình. Sẽ có một loạt các hành động diễn ra liên tục:

```
Aristotle da nhat duoc nia trai.
Bacon da nhat duoc nia trai.
...
Aristotle khong nhat duoc nia phai, dat nia trai xuong.
Bacon khong nhat duoc nia phai, dat nia trai xuong.
...
(chờ một chút)
Aristotle da nhat duoc nia trai.
Bacon da nhat duoc nia trai.
...
```

Các triết gia của chúng ta rất "bận rộn": liên tục nhặt nĩa, rồi lại đặt nĩa xuống. Rất nhiều hoạt động, rất nhiều CPU được sử dụng, nhưng dòng chữ quan trọng nhất—**"BAT DAU AN"**—thì không bao giờ xuất hiện.

**Phân tích Livelock:** Thảm họa xảy ra do sự đối xứng hoàn hảo trong hành vi của các triết gia:

1. **Cùng lúc**, tất cả 5 người đều nhặt thành công chiếc nĩa bên trái.
2. **Cùng lúc**, tất cả 5 người đều `try_lock` chiếc nĩa bên phải và thất bại (vì nó đang bị người hàng xóm giữ).
3. **Cùng lúc**, tất cả 5 người đều thực thi logic "lịch sự", đặt chiếc nĩa bên trái xuống.
4. **Cùng lúc**, tất cả 5 người đều chờ một khoảng thời gian như nhau.
5. Và rồi, **cùng lúc**, tất cả lại bắt đầu lại từ bước 1.

Các thread bị **livelocked**. Chúng vẫn đang chạy, vẫn hoạt động, nhưng bị kẹt trong một vòng lặp vô tận của những hành động vô ích, không bao giờ đạt được mục tiêu cuối cùng là được ăn.

---

### Phần 3: Làm Thế Nào Để Các Triết Gia Thực Sự Được Ăn?

Livelock, cũng giống như deadlock, thường bắt nguồn từ sự đối xứng trong hành vi tranh chấp tài nguyên. Do đó, các giải pháp chống deadlock hiệu quả cũng thường giải quyết được livelock.

- **`std::scoped_lock` / `std::lock` (Giải pháp tốt nhất):** Như đã thảo luận ở bài trước, việc yêu cầu các triết gia phải nhặt cả hai nĩa trong một thao tác "all-or-nothing" sẽ loại bỏ hoàn toàn kịch bản "giữ một nĩa, thất bại với nĩa kia". Đây là giải pháp triệt để nhất.
- **Khóa theo thứ tự (Hierarchical Locking):** Việc yêu cầu các triết gia phải luôn nhặt nĩa có chỉ số thấp hơn trước cũng phá vỡ sự đối xứng trong hành vi và giải quyết được vấn đề.
- **Thêm yếu tố ngẫu nhiên:** Thay vì cho tất cả các triết gia cùng chờ một khoảng thời gian cố định, hãy để họ chờ một khoảng thời gian ngẫu nhiên. Điều này phá vỡ sự đồng bộ hoàn hảo và làm cho khả năng xảy ra livelock kéo dài giảm đi đáng kể (nhưng không triệt tiêu hoàn toàn).

---

Livelock là một minh chứng cho thấy việc cố gắng "sửa lỗi" deadlock một cách ngây thơ có thể dẫn đến một vấn đề khác cũng nan giải không kém. Bài học quan trọng rút ra là hãy ưu tiên sử dụng các thuật toán và công cụ chống deadlock đã được chứng minh và chuẩn hóa, như `std::scoped_lock`, thay vì tự mình phát minh lại bánh xe.

*Until then, keep coding!*
