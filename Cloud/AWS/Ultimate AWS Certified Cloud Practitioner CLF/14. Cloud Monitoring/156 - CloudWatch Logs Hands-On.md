# 🧪 Hands-on: Đọc log và bắt lỗi với CloudWatch Logs

> Nguồn: `156-CloudWatch-Logs-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056194)

Trong bài hands-on này, chúng ta sẽ mở **CloudWatch Logs** để xem log thực tế của một **Lambda function**, rồi tự tay thêm log line và thậm chí tạo ra một **exception** để xem CloudWatch bắt lỗi như thế nào. *Các bạn cứ mở console và làm theo mình nhé.*

---

### 🗂️ Log group và log stream có sẵn

Trên menu bên trái của CloudWatch, vào **Log groups**. Các bạn sẽ thấy có sẵn một log group tên **AWS lambda demo-lambda** — đó là kết quả từ **Lambda function** chúng ta đã tạo và chạy trước đó; Lambda tự động ghi log vào CloudWatch Logs.

Bấm vào log group này:

* Bên trong có một hoặc nhiều **log stream** — luồng log của từng lần chạy.
* Trong log stream là **toàn bộ log line** mà Lambda function đã ghi: **request ID**, dòng loading function, các giá trị (value one, value two...), rồi end of request ID và end of reports.

*Mọi dòng log mà Lambda ghi ra đều sẽ xuất hiện ở đây.*

---

### ✏️ Thêm log line mới và deploy

Để thấy log cập nhật theo thời gian thực, mình sửa Lambda function:

1. Mở Lambda function, thêm một dòng **print** để in thêm log line.
2. **Deploy** thay đổi.
3. Chạy **Test** với test event có sẵn: tạo event demo rồi **Create** để test.

Sau khi function chạy xong, quay lại **CloudWatch Logs → Log groups → log group của Lambda**, các bạn sẽ thấy một **log stream mới** chứa dòng **extra log line**. Hoạt động tốt!

---

### 🐞 Bắt exception trong log

Điều thú vị hơn là khi ứng dụng gặp lỗi. Mình sẽ làm hỏng function một cách có chủ đích:

1. Thêm dấu **#** vào đầu một dòng để **comment** dòng đó lại.
2. Bỏ dấu **#** ở **dòng 13** để dòng `raise exception, something went wrong` được thực thi.
3. **Deploy** thay đổi và chạy **Test** lại.

Lần này function báo lỗi. Quay lại Lambda, mở **log stream mới** — các bạn sẽ thấy **exception** nằm ngay trong log, từ đó biết được **vì sao function chạy sai**.

*Mẹo: đây chính là cách bạn debug nhanh mọi ứng dụng khi đã có log tập trung.*

---

### 💡 Vì sao CloudWatch Logs quan trọng?

Mọi lần **Lambda function chạy, log đều xuất hiện trong CloudWatch Logs** — và điều này đúng với **mọi loại log** bạn muốn đưa vào, không chỉ Lambda. Nhờ vậy, các bạn có thể:

* **Troubleshoot** lỗi của chương trình, ứng dụng chỉ bằng cách đọc log line.
* Làm **log analytics (phân tích log)** và **monitoring (giám sát)**.
* Hiểu rõ hệ thống của mình hơn — điều mà bất kỳ **DevOps** nào trong doanh nghiệp cũng cần đào sâu.

Vậy là các bạn đã biết cách đọc log, thêm log và tìm lỗi trên CloudWatch Logs. Ở bài tiếp theo, chúng ta chuyển sang một dịch vụ cực kỳ thú vị: **Amazon EventBridge**. Hẹn gặp các bạn! 🚀
