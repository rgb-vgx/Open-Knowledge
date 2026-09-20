# 🎓 Tổng kết Architectural Patterns — chọn đúng kiến trúc, không chọn "hay nhất"

> Nguồn: `028-Summary-Practical-Applications.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49456813)

Vậy là chúng ta đã đi hết chuyên đề **Architectural Patterns**. Đây là lúc mình và các bạn cùng lùi lại một bước, nhìn bức tranh lớn: các pattern không chỉ là những thiết kế kỹ thuật, mà là **những cách tiếp cận đã được chứng minh** để giải các bài toán scalability, maintainability và vận hành khác nhau. Hãy cùng chốt lại những gì quan trọng nhất.

---

### 🗺️ Nhìn lại chặng đường — ba mẫu kiến trúc chủ đạo

Chúng ta đã đi qua ba mẫu kiến trúc lớn, mỗi mẫu giải một nhóm bài toán riêng:

* **Multi-tier architecture** — mang lại **cấu trúc và separation of concern (tách biệt mối quan tâm)**, giúp ứng dụng dễ quản lý và dễ tiến hóa.
* **Microservices** — phân rã hệ thống thành **các service độc lập** để tăng scalability, flexibility và **team autonomy (quyền tự chủ của đội ngũ)**, đồng thời mang theo những thực tế của **độ phức tạp hệ phân tán**.
* **Event-driven architecture** — đón nhận **giao tiếp bất đồng bộ** để xây hệ thống scale tốt, loosely coupled và phản hồi nhanh.

| Kiến trúc | Mang lại | Cái giá phải cân nhắc |
|---|---|---|
| Multi-tier | Cấu trúc rõ ràng, dễ bảo trì và tiến hóa | Thêm tầng, thêm độ phức tạp vận hành khi mở rộng |
| Microservices | Scale và triển khai độc lập, tự chủ cho đội ngũ | Độ phức tạp hệ phân tán, vận hành nặng |
| Event-driven | Loose coupling, scalability, phản hồi nhanh | Consistency, ordering, reliability, observability |

*Nhìn vào bảng này, các bạn sẽ thấy một điều quen thuộc: mỗi pattern đều có hai mặt, và không có pattern nào miễn nhiễm trade-off.*

---

### 🎯 Bài học cốt lõi — không có kiến trúc đúng cho mọi bài toán

**Bài học lớn nhất của chuyên đề: không tồn tại một kiến trúc đúng cho mọi trường hợp.** Mọi pattern đều gắn với trade-off, và vai trò của kiến trúc sư là **chọn cách tiếp cận khớp nhất** với:

1. **Business goals (mục tiêu kinh doanh)** — hệ thống này tồn tại để phục vụ điều gì.
2. **System requirements (yêu cầu hệ thống)** — traffic, dữ liệu, hiệu năng, độ tin cậy cần đạt.
3. **Team capabilities (năng lực đội ngũ)** — đội ngũ có đủ trưởng thành để vận hành kiến trúc đó không.
4. **Future growth expectations (kỳ vọng tăng trưởng)** — hệ thống sẽ lớn lên ra sao trong tương lai.

*Chính việc hiểu và cân đo những trade-off này là điều biến kiến trúc từ **một bộ sưu tập sơ đồ** thành **một kỷ luật ra quyết định kỹ thuật**. Và trong phỏng vấn system design, đây cũng là dấu hiệu rõ nhất cho thấy các bạn là một kỹ sư trưởng thành.*

---

### 🌐 Tiếp theo — Web concepts trong system design

Chặng tiếp theo của hành trình sẽ chuyển hướng sang **web concepts trong system design**. Chúng ta sẽ khám phá những công nghệ và nguyên lý nền tảng đang vận hành các ứng dụng web hiện đại, bao gồm:

* **State management (quản lý trạng thái)**.
* **Data serialization (tuần tự hóa dữ liệu)**.
* Các cơ chế bảo mật như **CORS**.
* Những cân nhắc thiết kế thực tế để xây **hệ thống web scale tốt**.

Đây chính là **cây cầu nối giữa thiết kế kiến trúc và phát triển ứng dụng thực tế** — những kiến thức mà bất kỳ system designer nào cũng nên nắm.

---

Vậy là chúng ta đã khép lại chuyên đề Architectural Patterns với một tư duy rõ ràng: hiểu pattern để **chọn đúng**, chứ không phải để chạy theo pattern "hay nhất". Hãy cùng bước tiếp vào phần web fundamentals — nơi những nguyên lý vừa học gặp gỡ thực tế ứng dụng. Hẹn gặp lại các bạn ở bài sau! 🚀
