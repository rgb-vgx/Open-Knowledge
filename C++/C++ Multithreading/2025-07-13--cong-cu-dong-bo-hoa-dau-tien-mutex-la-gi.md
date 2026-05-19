---
title: 'C++ Multithreading #15: Công Cụ Đồng Bộ Hóa Đầu Tiên: Mutex Là Gì?'
date: '2025-07-13 01:22:12'
date_gmt: '2025-07-12 18:22:12'
modified: '2025-07-26 17:38:56'
status: publish
slug: cong-cu-dong-bo-hoa-dau-tien-mutex-la-gi
wordpress_id: 169
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/13/cong-cu-dong-bo-hoa-dau-tien-mutex-la-gi/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã xác định được "kẻ thù" là **Data Race** và "chiến trường" là **Critical Section**. Chúng ta cũng đã biết rằng để chiến thắng, chúng ta cần một "giao thức khóa" (locking protocol).

Bài viết này sẽ giới thiệu bạn với "vũ khí" đầu tiên, cơ bản và phổ biến nhất để xây dựng nên giao thức đó: **Mutex**.

#### **Phần 1: Mutex - Người "Gác Cổng" Của Critical Section**

**Mutex** là từ viết tắt của **Mutual Exclusion** (Loại Trừ Lẫn Nhau). Đúng như tên gọi, mục đích của nó là để đảm bảo rằng các thread phải "loại trừ" nhau ra, không được cùng lúc thực thi một đoạn code nhạy cảm.

Hãy tưởng tượng Mutex như một người "gác cổng" hay một "viên cảnh sát" đứng trước cửa của một Critical Section. Tất cả các thread đều phải "tôn trọng" và tuân theo hiệu lệnh của người gác cổng này.

Một Mutex chỉ có hai trạng thái vô cùng đơn giản:

- **Locked** (Đã khóa)
- **Unlocked** (Đã mở khóa)

#### **Phần 2: Quy Tắc "Lock-Unlock"**

Nguyên tắc làm việc với Mutex cũng đơn giản như trạng thái của nó. Khi một thread muốn đi vào Critical Section, nó phải tuân thủ quy tắc sau:

1. **Xin phép vào:** Thread sẽ cố gắng **`lock()`** cái Mutex đang bảo vệ Critical Section đó.
2. **Phân tích tình huống:**
   - Nếu Mutex đang ở trạng thái **Unlocked**, thread sẽ `lock()` thành công. Mutex ngay lập tức chuyển sang trạng thái **Locked**. Thread được phép tiến vào Critical Section.
   - Nếu Mutex đang ở trạng thái **Locked** (vì một thread khác đã vào trong), thread này sẽ bị **chặn lại (blocked)**. Nó sẽ phải đứng ngoài chờ cho đến khi Mutex được mở khóa.
3. **Rời khỏi:** Sau khi thực thi xong toàn bộ code bên trong Critical Section, thread phải có trách nhiệm **`unlock()`** cái Mutex. Thao tác này sẽ đưa Mutex trở lại trạng thái **Unlocked**.
4. **Đến lượt người tiếp theo:** Ngay khi Mutex được mở khóa, một trong số các thread đang chờ đợi sẽ được hệ điều hành "đánh thức" và có cơ hội để `lock()` Mutex và tiến vào.

Quy trình này đảm bảo một cách nghiêm ngặt rằng **tại một thời điểm, chỉ có duy nhất một thread được thực thi bên trong Critical Section**. Điều này đồng nghĩa với việc: **Data Race bị loại bỏ hoàn toàn.**

#### **Phần 3: Memory Synchronization**

Việc ngăn chặn thực thi đồng thời chỉ là một nửa câu chuyện. Mutex còn giải quyết một vấn đề sâu xa hơn mà chúng ta đã tìm hiểu ở bài học về kiến trúc máy tính: **vấn đề về sự hiển thị của bộ nhớ (memory visibility)**.

Do sự tồn tại của cache và store buffer trên mỗi core, một thay đổi về dữ liệu của thread này không ngay lập tức được thread khác nhìn thấy. Mutex giải quyết vấn đề này thông qua một cơ chế gọi là **Acquire-Release Semantics**.

- **`lock()` là một "Acquire" Operation:** Khi một thread `lock()` thành công một Mutex, nó không chỉ giành được quyền truy cập. Thao tác này còn buộc phần cứng phải đảm bảo rằng thread này sẽ "nhìn thấy" tất cả các thay đổi bộ nhớ đã được thực hiện bởi thread cuối cùng đã `unlock()` cái Mutex đó. Nó giống như việc "làm mới" (refresh) toàn bộ góc nhìn của thread về **shared memory**.
- **`unlock()` là một "Release" Operation:** Khi một thread `unlock()` một Mutex, thao tác này buộc phần cứng phải "công bố" (publish) tất cả các thay đổi về bộ nhớ mà thread này đã thực hiện bên trong Critical Section ra cho toàn bộ hệ thống. Các thay đổi này sẽ được đẩy từ store buffer/cache riêng của core ra bộ nhớ chung.

Nhờ có cơ chế này, Mutex không chỉ đảm bảo thứ tự thực thi logic mà còn đảm bảo sự nhất quán và chính xác của dữ liệu ở cấp độ phần cứng.

### **Lời Kết**

Một Mutex thực hiện hai nhiệm vụ tối quan trọng:

1. **Mutual Exclusion:** Đảm bảo tính tuần tự khi truy cập tài nguyên chia sẻ, loại bỏ Data Race.
2. **Memory Synchronization:** Đảm bảo tính nhất quán và hiển thị của dữ liệu giữa các thread.

Với mô hình khái niệm vững chắc về Mutex, chúng ta đã hoàn toàn sẵn sàng để đưa nó vào thực tế. Trong bài viết tiếp theo, chúng ta sẽ học cách sử dụng lớp `std::mutex` trong C++ để bảo vệ đoạn code chứa `std::cout` và sửa lỗi Data Race mà chúng ta đã tạo ra trước đó.

*Until then, keep coding!*
