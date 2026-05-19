---
title: 'C++ Multithreading #11: Làm Việc Với Nhiều Thread và Hiểm Họa "Data Race"'
date: '2025-07-12 00:31:38'
date_gmt: '2025-07-11 17:31:38'
modified: '2025-07-24 01:45:26'
status: publish
slug: lam-viec-voi-nhieu-thread-va-hiem-hoa-data-race
wordpress_id: 153
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/lam-viec-voi-nhieu-thread-va-hiem-hoa-data-race/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã làm quen với việc tạo và quản lý một thread đơn lẻ. Nhưng sức mạnh thực sự của lập trình multi-thread chỉ được bộc lộ khi chúng ta làm việc với nhiều thread cùng một lúc.

Bài viết này sẽ hướng dẫn bạn cách khởi tạo và quản lý một nhóm thread, và quan trọng hơn, sẽ giới thiệu bạn với "kẻ thù số một" của lập trình viên multi-thread: **Data Race**. Hiểu rõ và biết cách phòng tránh nó là kỹ năng sống còn để viết được các chương trình an toàn và đúng đắn.

#### **Phần 1: Khởi Tạo Một Nhóm Thread**

Việc khởi tạo nhiều thread cũng đơn giản như khởi tạo một thread: bạn chỉ cần tạo nhiều đối tượng `std::thread`.

Hãy xem một ví dụ khởi tạo 3 thread, mỗi thread sẽ "ngủ" một khoảng thời gian khác nhau trước khi in ra thông báo.

C++

```
#include <iostream>
#include <thread>
#include <chrono>
#include <string>
#include <vector>

using namespace std::chrono_literals;

void task(int id) {
    std::this_thread::sleep_for(std::chrono::seconds(id));
    std::cout << "Hello from thread " << id << std::endl;
}

int main() {
    std::cout << "Starting multiple threads from main..." << std::endl;

    // Một cách thực tế để quản lý nhiều thread là dùng vector
    std::vector<std::thread> threads;

    for (int i = 1; i <= 3; ++i) {
        // Tạo thread và move nó vào trong vector
        threads.emplace_back(task, i);
    }

    // Quan trọng: Phải join() tất cả các thread
    for (auto& t : threads) {
        t.join();
    }

    std::cout << "All threads have completed." << std::endl;
    return 0;
}
```

Trong ví dụ trên, việc `sleep` có chủ đích làm cho các thread kết thúc tuần tự. Nhưng trong thực tế, hệ điều hành có thể bắt đầu và thực thi các thread theo một thứ tự hoàn toàn khó đoán, không nhất thiết phải theo thứ tự chúng được tạo ra trong code.

#### **Phần 2: Vấn Đề Cốt Lõi - Khi Các Thread Chia Sẻ Dữ Liệu**

Sức mạnh và cũng là sự nguy hiểm của các thread nằm ở chỗ chúng **chia sẻ cùng một không gian bộ nhớ**. Điều này cho phép chúng giao tiếp dễ dàng, nhưng cũng mở ra cánh cửa cho các lỗi nghiêm trọng.

**Làm thế nào để các thread chia sẻ dữ liệu?**

- Sử dụng biến toàn cục (global) hoặc biến `static`.
- Với lambda, capture một biến cục bộ bằng **tham chiếu (`[&]`)**. Nếu capture bằng giá trị (`[=]`), mỗi thread sẽ có một bản sao riêng và không thể thấy sự thay đổi của nhau.

Khi nhiều thread cùng truy cập vào một vùng dữ liệu chung, và ít nhất một trong số chúng thay đổi dữ liệu đó, một hiểm họa sẽ xuất hiện.

#### **Phần 3: Hiểm Họa "Data Race"**

Đây là khái niệm quan trọng nhất bạn cần phải nắm vững.

> **Định nghĩa Data Race:** Một **Data Race** xảy ra khi có **hai hoặc nhiều thread** truy cập vào **cùng một vị trí bộ nhớ (memory location)** một cách đồng thời, và **ít nhất một** trong các truy cập đó là một thao tác **ghi (write)**, và các truy cập này **không được đồng bộ hóa (synchronized)**.

- **Hậu quả:** Một Data Race gây ra **Undefined Behavior (Hành Vi Không Xác Định)**. Đây là loại lỗi tồi tệ nhất trong C++. Chương trình của bạn có thể:
  - Chạy đúng trong 1000 lần thử và crash ở lần 1001.
  - Cho ra kết quả sai một cách âm thầm.
  - Hoạt động tốt trên máy của bạn nhưng lại crash trên máy của khách hàng.
  - Gây hỏng dữ liệu (data corruption).

**Data Race vs. Race Condition**

Nhiều người nhầm lẫn hai khái niệm này.

- **Race Condition:** Là một thuật ngữ rộng hơn, chỉ tình huống mà kết quả của chương trình phụ thuộc vào thứ tự thực thi hoặc thời gian không thể đoán trước của các sự kiện. Ví dụ: trong một hệ thống ngân hàng, một thao tác "gửi tiền" và "tính lãi" xảy ra gần như cùng lúc. Kết quả cuối cùng sẽ phụ thuộc vào thao tác nào được thực hiện trước.
- **Data Race:** Là một loại Race Condition cụ thể và nguy hiểm ở cấp độ truy cập bộ nhớ. **Mọi Data Race đều là Race Condition, nhưng không phải mọi Race Condition đều là Data Race.**

Mục tiêu của chúng ta là **loại bỏ hoàn toàn Data Race** khỏi chương trình.

#### **Phần 4: Đồng Bộ Hóa - Giải Pháp Cho Data Race**

Để tránh Data Race, chúng ta phải sử dụng các cơ chế **đồng bộ hóa (synchronization)**. Mục tiêu của đồng bộ hóa là để đảm bảo rằng tại một thời điểm, **chỉ có một thread duy nhất** được phép truy cập vào vùng dữ liệu được chia sẻ.

Hãy tưởng tượng một căn phòng (dữ liệu chia sẻ) và nhiều người (các thread) muốn vào. Đồng bộ hóa giống như việc đặt một cái khóa trên cửa và chỉ phát một chiếc chìa khóa. Ai có chìa khóa thì được vào. Người khác muốn vào phải đứng ngoài chờ cho đến khi người bên trong ra và trả lại chìa khóa.

Bằng cách này, chúng ta ép các thread phải truy cập vào dữ liệu chia sẻ một cách **tuần tự**, trong khi vẫn có thể thực thi song song các phần còn lại trong tác vụ của chúng. Các công cụ C++ cung cấp để làm việc này bao gồm **mutex**, **atomic**, và nhiều cơ chế khác mà chúng ta sẽ tìm hiểu sâu trong các bài tiếp theo.

### **Lời Kết**

Việc khởi tạo nhiều thread rất đơn giản, nhưng ngay khi các thread này bắt đầu chia sẻ dữ liệu, độ phức tạp sẽ tăng lên theo cấp số nhân. **Data Race** là một hiểm họa luôn rình rập, có thể phá hủy sự đúng đắn của chương trình bạn.

Luôn ghi nhớ định nghĩa về Data Race và hiểu rằng giải pháp duy nhất là phải sử dụng các kỹ thuật đồng bộ hóa. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về công cụ đồng bộ hóa đầu tiên và cơ bản nhất: `std::mutex`.

*Until then, keep coding!*
