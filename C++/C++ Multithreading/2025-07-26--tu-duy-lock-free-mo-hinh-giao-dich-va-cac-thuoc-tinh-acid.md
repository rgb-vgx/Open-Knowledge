---
title: 'Tư Duy Lock-Free: Mô Hình Giao Dịch và Các Thuộc Tính ACID'
date: '2025-07-26 16:03:55'
date_gmt: '2025-07-26 09:03:55'
modified: '2025-07-26 17:36:36'
status: publish
slug: tu-duy-lock-free-mo-hinh-giao-dich-va-cac-thuoc-tinh-acid
wordpress_id: 265
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/tu-duy-lock-free-mo-hinh-giao-dich-va-cac-thuoc-tinh-acid/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã giới thiệu Lập trình Lock-Free như một con đường hiệu năng cao nhưng đầy chông gai. Nhưng để thực sự hiểu được sự phức tạp của nó, chúng ta cần phải thay đổi một cách cơ bản tư duy lập trình của mình.

Thế giới multi-thread dựa trên lock cho phép chúng ta giữ lại một vài giả định an toàn. Nhưng khi bước vào thế giới lock-free, chúng ta phải vứt bỏ tất cả những điều đó.

---

### Phần 1: Tạm Biệt Các Giả Định An Toàn 👋

Khi làm việc với code được bảo vệ bởi `mutex`, chúng ta có thể giữ cho mình tỉnh táo bằng cách tin vào những điều sau:

- **Trạng thái toàn cục nhất quán**: Mọi thay đổi bạn thực hiện bên trong một critical section là "riêng tư". Chúng chỉ được "công bố" ra cho các thread khác khi bạn unlock mutex.
- **Logic nhất quán**: Giá trị của một biến mà bạn vừa kiểm tra trong câu lệnh `if` sẽ không bị thay đổi một cách bất ngờ trước khi bạn đi vào thân của `if`.
- **Thứ tự thực thi có vẻ tuần tự**: Mặc dù compiler và CPU có thể sắp xếp lại các chỉ thị, chúng phải đảm bảo hành vi của chương trình không thay đổi so với những gì bạn viết.

Khi lập trình lock-free, **tất cả những giả định trên đều không còn đúng nữa**. Chào mừng bạn đến với thế giới "Alice ở xứ sở thần tiên", nơi:

- Shared memory có thể có các giá trị khác nhau trên các thread khác nhau tại cùng một thời điểm.
- Giá trị của một biến có thể thay đổi bất ngờ ngay giữa lúc bạn đang kiểm tra nó.
- Thứ tự thực thi của các lệnh có thể khác xa so với thứ tự bạn viết trong code.

---

### Phần 2: Mô Hình Giao Dịch (Transactional Model)

Để lập trình trong thế giới "kỳ lạ" này, chúng ta cần một mô hình tư duy mới: **mô hình giao dịch (transactional model)**, một khái niệm quen thuộc trong lĩnh vực cơ sở dữ liệu.

Ví dụ kinh điển là việc chuyển tiền giữa hai tài khoản ngân hàng. Giao dịch này bao gồm hai bước: trừ tiền ở tài khoản A và cộng tiền vào tài khoản B. Một người quan sát từ bên ngoài không bao giờ được phép thấy trạng thái "nửa vời" khi tiền đã bị trừ ở A nhưng chưa được cộng vào B. Họ chỉ được phép thấy một trong hai trạng thái: hoặc là **trước khi** giao dịch xảy ra, hoặc là **sau khi** giao dịch đã hoàn tất.

---

### Phần 3: Bốn Trụ Cột - Thuộc Tính ACID

Một giao dịch đúng đắn phải tuân thủ 4 thuộc tính, được biết đến qua từ viết tắt **ACID**:

1. **A - Atomic (Nguyên tử)**
   - Có nghĩa là "tất cả hoặc không có gì". Một giao dịch hoặc là thành công trọn vẹn (commit), hoặc là thất bại hoàn toàn và hệ thống phải được trả về trạng thái như trước khi giao dịch bắt đầu (rollback). Không có trạng thái "làm được một nửa".
2. **C - Consistent (Nhất quán)**
   - Giao dịch phải luôn đưa hệ thống từ một trạng thái hợp lệ này sang một trạng thái hợp lệ khác. Nó không bao giờ được để lại hệ thống trong một tình trạng lỗi hay không nhất quán.
3. **I - Isolated (Cô lập)**
   - Các giao dịch diễn ra đồng thời không được can thiệp vào nhau. Kết quả cuối cùng của hệ thống phải giống như thể các giao dịch đó được thực hiện một cách tuần tự.
4. **D - Durable (Bền vững)**
   - Một khi giao dịch đã được commit, kết quả của nó là vĩnh viễn và không bị mất đi, ngay cả khi hệ thống gặp sự cố sau đó.

---

### Phần 4: Atomic Instructions - Những "Giao Dịch" Cấp Thấp

Trong C++ hiện đại, chúng ta không có "Transactional Memory" như một tính năng được chuẩn hóa. Thay vào đó, đơn vị cơ bản để xây dựng các thuật toán lock-free chính là các **atomic instructions** (được cung cấp qua `std::atomic`).

Một chỉ thị atomic đơn lẻ tự nó đã mang trong mình các thuộc tính ACID ở mức độ vi mô:

- Nó là **Atomic**: không thể bị xen ngang.
- Nó là **Consistent**: chuyển một biến từ giá trị A sang giá trị B một cách nhất quán.
- Nó là **Isolated**: không có hai chỉ thị atomic nào có thể thao tác trên cùng một dữ liệu tại cùng một thời điểm.
- Nó là **Durable**: một khi đã hoàn thành, kết quả của nó sẽ được "công bố" và không bị mất.

Thách thức của lập trình lock-free chính là: làm thế nào để xây dựng một thuật toán phức tạp, đúng đắn từ những viên gạch "giao dịch" siêu nhỏ này, trong khi phải tự mình tính toán tất cả các khả năng xen kẽ có thể xảy ra giữa mỗi chỉ thị.

---

Lập trình lock-free đòi hỏi một sự thay đổi hoàn toàn trong tư duy. Chúng ta không còn có thể suy nghĩ theo luồng tuần tự bên trong một cái khóa an toàn nữa. Thay vào đó, chúng ta phải suy nghĩ về mỗi thao tác như một giao dịch nhỏ và phải lường trước mọi kịch bản mà các thread khác có thể xen vào giữa các "giao dịch" đó. Đây là một công việc cực kỳ khó khăn và đòi hỏi sự cẩn trọng cao độ.

*Until then, keep coding!*
