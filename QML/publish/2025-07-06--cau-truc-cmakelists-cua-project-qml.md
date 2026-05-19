---
title: Cấu trúc CMakeLists của project QML
date: '2025-07-06 21:49:19'
date_gmt: '2025-07-06 14:49:19'
modified: '2025-07-06 21:49:19'
status: publish
slug: cau-truc-cmakelists-cua-project-qml
wordpress_id: 101
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/06/cau-truc-cmakelists-cua-project-qml/
categories:
- QML
tags: []
---

Bạn vừa tạo dự án Qt/QML đầu tiên của mình, mọi thứ đều mới mẻ và thú vị. Bạn nhìn vào cây thư mục và thấy một tệp lạ lẫm mang tên `CMakeLists.txt`. Nó trông có vẻ phức tạp, đầy những dòng lệnh khó hiểu.

Đừng lo! `CMakeLists.txt` không phải là kẻ thù. Hãy coi nó như một "tấm bản đồ" hoặc một "bản thiết kế chi tiết". Nó chính là người chỉ huy, ra lệnh cho máy tính biết cách biến những dòng code C++ và QML của bạn thành một ứng dụng hoàn chỉnh.

Trong bài viết này, chúng ta sẽ cùng nhau "giải mã" tệp `CMakeLists.txt` tiêu chuẩn do Qt Creator tạo ra, để bạn thấy rằng nó thực ra rất logic và là một người trợ lý đắc lực.

#### **1. Câu chuyện bắt đầu: Khai báo 'Danh tính'**

Mọi dự án đều cần một cái tên, một phiên bản. `CMakeLists.txt` bắt đầu bằng việc khai báo những thông tin cơ bản nhất.

CMake

```
cmake_minimum_required(VERSION 3.16)
project(untitled VERSION 0.1 LANGUAGES CXX)
```

- Dòng đầu tiên yêu cầu một phiên bản CMake tối thiểu (ở đây là 3.16) để đảm bảo mọi thứ hoạt động trơn tru.
- Dòng `project` làm nhiệm vụ đặt tên cho dự án là `untitled`, gán cho nó phiên bản `0.1`, và xác định ngôn ngữ lập trình là C++ (`CXX`).

#### **2. Triệu tập 'Biệt đội' Qt**

Dự án của bạn cần sức mạnh từ bộ thư viện Qt. Bước tiếp theo là "triệu tập" những thành phần cần thiết.

CMake

```
find_package(Qt6 REQUIRED COMPONENTS Quick)
qt_standard_project_setup(REQUIRES 6.5)
```

Lệnh `find_package` có vai trò như một cuộc gọi điểm danh: "Này CMake, hãy tìm cho tôi bộ thư viện Qt6. Tôi đặc biệt cần (`REQUIRED`) module `Quick` để xây dựng giao diện QML". Nếu không tìm thấy, quá trình build sẽ dừng lại.

#### **3. Dựng nên 'Ngôi nhà': Tệp thực thi và Giao diện QML**

Đây là phần cốt lõi, nơi chúng ta định hình ứng dụng của mình. Hãy tưởng tượng ứng dụng là một ngôi nhà:

- **Phần khung sườn C++:**

CMake

```
qt_add_executable(appuntitled
    main.cpp
)
```

Lệnh `qt_add_executable` sẽ tạo ra "khung sườn" của ngôi nhà – chính là tệp thực thi (`.exe`) của bạn. Nó được xây dựng từ `main.cpp`, điểm khởi đầu của mọi logic C++. Tên của tệp thực thi sẽ là `appuntitled`.

- **Phần nội thất QML:**

CMake

```
qt_add_qml_module(appuntitled
    URI untitled
    VERSION 1.0
    QML_FILES
        Main.qml
)
```

Nếu C++ là khung sườn, thì QML chính là "nội thất" đẹp đẽ bên trong. Lệnh `qt_add_qml_module` gom tất cả các tệp giao diện của bạn (ở đây là `Main.qml`) vào một gói (module) để ứng dụng có thể sử dụng.

> **Mẹo nhỏ:** Khi bạn thêm các tệp `.cpp` hoặc `.qml` mới vào dự án, đây chính là nơi bạn sẽ khai báo chúng!

#### **4. Kết nối Sức mạnh: Liên kết Thư viện**

Chúng ta đã "triệu tập" module `Quick`, nhưng ứng dụng vẫn chưa biết cách dùng nó. `target_link_libraries` chính là sợi dây kết nối cuối cùng.

CMake

```
target_link_libraries(appuntitled
    PRIVATE Qt6::Quick
)
```

Lệnh này nói rằng: "Hãy kết nối ứng dụng `appuntitled` với thư viện `Qt6::Quick`". Nếu không có bước này, ứng dụng của bạn sẽ báo lỗi vì không tìm thấy các chức năng của QML.

#### **5. Đóng gói 'Hành lý': Chuẩn bị cho các Nền tảng**

Các khối lệnh cuối cùng như `set_target_properties` và `install` đóng vai trò chuẩn bị "hành lý" để ứng dụng của bạn có thể chạy mượt mà trên các "vùng đất" khác nhau như Windows hay macOS, và sẵn sàng cho việc cài đặt sau này.

CMake

```
set_target_properties(appuntitled PROPERTIES
    ...
    MACOSX_BUNDLE TRUE 
    WIN32_EXECUTABLE TRUE 
)
```

Ví dụ,

`MACOSX_BUNDLE TRUE` đảm bảo ứng dụng được đóng gói đúng chuẩn trên macOS, còn `WIN32_EXECUTABLE TRUE` giúp ứng dụng chạy trên Windows mà không hiện ra cửa sổ dòng lệnh màu đen khó chịu.

### Lời kết

Vậy là bạn đã đi hết một vòng "tấm bản đồ" `CMakeLists.txt`. Nó không hề đáng sợ phải không? Từ việc đặt tên, gọi thư viện, xây dựng các thành phần cho đến việc liên kết chúng lại, tất cả đều được sắp xếp một cách logic.

Lần tới khi nhìn vào tệp này, hy vọng bạn sẽ thấy nó như một người trợ lý quen thuộc thay vì một ma trận khó hiểu. Chúc bạn có một hành trình thú vị với Qt!
