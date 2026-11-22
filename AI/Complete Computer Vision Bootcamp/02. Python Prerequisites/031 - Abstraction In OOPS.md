---
title: 'Bài 31 — Trừu tượng hóa (abstraction) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 31
status: edited
source: '031 - Abstraction In OOPS.md'
categories:
- AI
tags: []
---

# 🎛️ Abstraction — chỉ lộ nút bấm, giấu cỗ máy bên trong

> Nguồn: `031 - Abstraction In OOPS.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086827)

**Abstraction** là khái niệm ẩn đi chi tiết triển khai phức tạp và chỉ phơi ra những tính năng cần thiết của object. Nhờ đó giảm độ phức tạp khi lập trình và giảm công sức của người dùng code. Đây là một trong những trụ cột cốt lõi của OOP, và ta hiện thực nó bằng **abstract base class**.

### 🧺 Ví dụ đời thường: máy giặt

Chiếc máy giặt có nút **Start**, chỗ đặt quần áo, bộ hẹn giờ, chế độ sấy — đó là những gì bạn *thấy* và *bấm*. Còn bên trong, nước chảy thế nào, lồng quay ra sao, nhiệt độ điều chỉnh thế nào thì hoàn toàn bị giấu. Bạn chỉ cần biết nút nào làm gì.

Điện thoại, điều khiển máy lạnh, laptop, desktop cũng vậy: bấm **Shut Down** là máy tắt, còn việc hệ điều hành thu hồi tiến trình, giải phóng RAM, ghi đĩa — tất cả diễn ra phía sau.

Đó chính là abstraction: **giao diện đơn giản ở ngoài, cỗ máy phức tạp ở trong**.

### 🏗️ Abstract base class với `ABC`

Để tạo abstract class, class phải kế thừa `ABC`:

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def drive(self):
        print("The vehicle is used for driving")

    @abstractmethod
    def start_engine(self):
        pass
```

Điểm khác biệt giữa class thường và abstract class: class này **kế thừa `ABC`** (abstract base class). Bên trong có thể có:

* **Method thường** (`drive`) — đã có triển khai sẵn, class con dùng lại được.
* **Abstract method** (`start_engine`) — thân hàm **rỗng**, chỉ là "hợp đồng" buộc class con phải tự cài đặt.

### 🚗 Class con bắt buộc triển khai abstract method

```python
class Car(Vehicle):
    def start_engine(self):
        return "Car engine started"
```

`Car` kế thừa `Vehicle`; nó phải viết lại `start_engine` theo cách riêng. Nếu không, Python không cho tạo object từ `Car` (báo lỗi vì còn abstract method chưa triển khai).

Điều đáng chú ý: `Car` vẫn dùng được method thường `drive` mà không cần viết lại gì.

### 🔌 Dùng qua giao diện chung

Hàm ngoài class chỉ quan tâm tới "hợp đồng" `start_engine`, không cần biết bên trong là xe gì:

```python
def operate_vehicle(vehicle):
    print(vehicle.start_engine())

car = Car()
operate_vehicle(car)   # Car engine started
```

Cùng lúc, gọi method thường vẫn chạy bình thường:

```python
car.drive()   # The vehicle is used for driving
```

Đây chính là chỗ abstraction phát huy tác dụng: `operate_vehicle` chỉ thấy **một tính năng** (`start_engine`), còn cách xe khởi động máy ra sao là chuyện của từng class con.

### 🧠 Abstraction khác Encapsulation ở đâu?

* **Encapsulation** lo việc *che dữ liệu và kiểm soát truy cập* — ai được đọc/ghi `__name`, `_age`.
* **Abstraction** lo việc *che cách triển khai* — chỉ phơi ra method cần thiết, buộc class con tự lo phần chi tiết.

Hai khái niệm bổ trợ nhau: encapsulation bảo vệ dữ liệu bên trong, abstraction định hình giao diện bên ngoài.

---

Abstract class là cách Python diễn đạt "interface": khai báo cái gì phải có, để mặc class con quyết định làm thế nào. Bài sau mình quay lại nhóm method đặc biệt — **magic methods**, thứ làm cho object của bạn hành xử tự nhiên như kiểu dữ liệu built-in.
