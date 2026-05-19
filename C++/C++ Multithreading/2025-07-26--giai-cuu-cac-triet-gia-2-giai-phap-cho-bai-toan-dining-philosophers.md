---
title: 'Giải Cứu Các Triết Gia: 2 Giải Pháp Cho Bài Toán "Dining Philosophers"'
date: '2025-07-26 01:32:45'
date_gmt: '2025-07-25 18:32:45'
modified: '2025-07-26 17:38:12'
status: publish
slug: giai-cuu-cac-triet-gia-2-giai-phap-cho-bai-toan-dining-philosophers
wordpress_id: 228
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/giai-cuu-cac-triet-gia-2-giai-phap-cho-bai-toan-dining-philosophers/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã bỏ lại 5 nhà triết học trong một tình trạng deadlock "hoàn hảo"—mỗi người cầm một chiếc nĩa bên trái và chờ đợi vĩnh viễn chiếc nĩa bên phải từ người hàng xóm. Toàn bộ hệ thống bị treo.

Làm thế nào để chúng ta phá vỡ "cái ôm chết chóc" này và để các triết gia được ăn? Bài viết này sẽ áp dụng các kỹ thuật chống deadlock mà chúng ta đã học để giải quyết bài toán theo hai cách hiệu quả.

---

### Tóm Tắt Vấn Đề: Vòng Tròn Chờ Đợi

Nguyên nhân của deadlock là do một vòng tròn chờ đợi (circular wait) được hình thành:

- Triết gia 0 giữ Nĩa 0, chờ Nĩa 1.
- Triết gia 1 giữ Nĩa 1, chờ Nĩa 2.
- ...
- Triết gia 4 giữ Nĩa 4, chờ Nĩa 0.

Để giải quyết deadlock, chúng ta phải phá vỡ được vòng tròn này.

---

### Giải Pháp 1: "All-or-Nothing" - Nhặt Cả Hai Nĩa Cùng Lúc (`std::lock`) ✅

**Ý tưởng:** Thay đổi luật chơi một chút. Thay vì nhặt từng chiếc nĩa một, một triết gia phải nhặt được **cả hai chiếc nĩa cùng lúc** trong một thao tác duy nhất. Nếu họ không thể lấy được cả hai, họ sẽ không lấy được chiếc nào cả và phải chờ, để lại cả hai chiếc nĩa cho người khác sử dụng.

**Công cụ:** Đây là kịch bản hoàn hảo để sử dụng `std::lock` hoặc `std::scoped_lock` (C++17) mà chúng ta đã học. Các công cụ này đảm bảo việc khóa nhiều mutex diễn ra như một thao tác "all-or-nothing", tránh được deadlock.

**Code đã sửa đổi:**

C++

```
#include <mutex>
#include <thread>
// ... các include khác

void philosopher_task_scoped_lock(int id) {
    int left_fork = id;
    int right_fork = (id + 1) % NUM_PHILOSOPHERS;

    // ...
    // Sử dụng scoped_lock để khóa cả hai mutex một cách an toàn
    std::scoped_lock lock(forks[left_fork], forks[right_fork]);

    // Nếu code chạy đến đây, có nghĩa là đã khóa thành công cả hai nĩa
    // ... bắt đầu ăn ...

} // Destructor của 'lock' tự động unlock cả hai mutex
```

**Phân tích:** Giải pháp này phá vỡ điều kiện "giữ và chờ" (hold and wait) của deadlock. Một triết gia không bao giờ rơi vào trạng thái "giữ một nĩa và chờ nĩa còn lại". Do đó, vòng tròn chờ đợi không thể hình thành. Chương trình sẽ luôn có tiến triển vì sẽ luôn có ít nhất một triết gia có thể khóa thành công cả hai chiếc nĩa của mình và ăn.

---

### Giải Pháp 2: Phá Vỡ Vòng Tròn - Khóa Theo Thứ Tự 🔢

**Ý tưởng:** Chúng ta giữ nguyên luật "nhặt từng nĩa một", nhưng áp dụng quy tắc chống deadlock kinh điển: **luôn khóa các mutex theo một thứ tự nhất quán**. Chúng ta sẽ đánh số các chiếc nĩa từ 0 đến 4. Quy tắc mới là:

> **Một triết gia phải luôn nhặt chiếc nĩa có chỉ số nhỏ hơn trước.**

**"Aha!" Moment:**

- Hầu hết các triết gia (0, 1, 2, 3) đều có `left_fork < right_fork`, nên họ vẫn sẽ nhặt nĩa trái trước.
- **NHƯNG**, triết gia cuối cùng (số 4) có Nĩa trái là 4 và Nĩa phải là 0. Theo quy tắc mới, ông ta phải nhặt **Nĩa 0 (chỉ số nhỏ hơn) trước**.

**Phân tích:** Chính sự thay đổi nhỏ ở triết gia cuối cùng này đã **phá vỡ vòng tròn chờ đợi**. Trong khi 4 triết gia đầu tiên đang cạnh tranh để nhặt nĩa trái, triết gia cuối cùng lại đang cạnh tranh Nĩa 0 với triết gia đầu tiên. Ông ta không hề giữ Nĩa 4, do đó Nĩa 4 được tự do cho triết gia số 3. Vòng tròn bị phá vỡ!

**Code đã sửa đổi:**

C++

```
void philosopher_task_hierarchical(int id) {
    int left_fork = id;
    int right_fork = (id + 1) % NUM_PHILOSOPHERS;

    // ...
    // Xác định nĩa có chỉ số nhỏ hơn để khóa trước
    int first_fork_to_lock = std::min(left_fork, right_fork);
    int second_fork_to_lock = std::max(left_fork, right_fork);

    forks[first_fork_to_lock].lock();
    forks[second_fork_to_lock].lock();

    // ... ăn ...

    forks[second_fork_to_lock].unlock();
    forks[first_fork_to_lock].unlock();
}
```

Giải pháp này cũng giải quyết được deadlock một cách hiệu quả.

---

Bài toán "Dining Philosophers" là một mô hình tuyệt vời để hiểu rõ các vấn-đề về tranh chấp tài nguyên và deadlock. Hai giải pháp trên cho thấy hai chiến lược mạnh mẽ để giải quyết chúng:

1. **`std::lock` / `std::scoped_lock`**: Lấy tất cả tài nguyên cần thiết trong một thao tác nguyên tử.
2. **Hierarchical Locking**: Áp đặt một thứ tự toàn cục cho việc lấy tài nguyên.

Chúng ta đã tránh được deadlock - tình trạng các thread bị treo cứng. Nhưng điều gì sẽ xảy ra nếu các triết gia liên tục cố gắng nhặt nĩa, thất bại, đặt xuống, rồi lại thử ngay lập tức... tạo ra một chuỗi hành động vô ích mà không ai thực sự ăn được? Tình trạng này được gọi là **livelock**, và chúng ta sẽ khám phá nó trong bài học tiếp theo.

*Until then, keep coding!*
