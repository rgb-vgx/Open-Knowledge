# 🐘 Amazon EMR: Hadoop cluster trên AWS cho bài toán big data

> Nguồn: `098-EMR-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056006)

Dịch vụ tiếp theo chúng ta tìm hiểu là **Amazon EMR** — viết tắt của **Elastic MapReduce**. Nói cho chính xác thì EMR **không hẳn là một database**, mà là cách để bạn tạo **Hadoop cluster** khi làm **big data** trên AWS. Cùng khám phá nhé!

---

### 🗺️ EMR và Hadoop cluster

* **EMR = Elastic MapReduce**, dùng để tạo **Hadoop cluster** phục vụ big data trên AWS.
* Hadoop cluster dùng để **phân tích và xử lý lượng dữ liệu khổng lồ**.
* **Hadoop là công nghệ open source**: nhiều server trong một cluster phối hợp cùng nhau phân tích dữ liệu.
* Với EMR, bạn có thể tạo cluster gồm **hàng trăm EC2 instance** cùng hợp tác để phân tích dữ liệu của mình.

*Mẹo thi:* bất cứ khi nào thấy **Hadoop cluster**, đừng nghĩ ngợi gì thêm — đáp án là **Amazon EMR**.

---

### 🧰 Hệ sinh thái big data trên EMR

EMR nằm trong **hệ sinh thái Hadoop / Big Data**, nơi bạn sẽ gặp các project như:

* **Apache Spark**
* **HBase**
* **Presto**
* **Flink**

Tất cả những công cụ này đều chạy **trên Hadoop cluster** của bạn.

Vậy EMR làm gì? EMR **provision toàn bộ các EC2 instance** và **cấu hình chúng** để chúng làm việc cùng nhau, phân tích dữ liệu theo hướng big data.

---

### ⚙️ EMR còn có gì?

* **Auto-scaling** — tự động mở rộng/thu hẹp cluster.
* Tích hợp với **Spot instance** — giúp tiết kiệm chi phí đáng kể.
* Use case tiêu biểu: **data processing (xử lý dữ liệu)**, **machine learning**, **web indexing**, và **big data nói chung**.

---

Vậy là các bạn đã nắm được bức tranh về **Amazon EMR**: *Hadoop cluster + big data + tự động provision và cấu hình EC2*. Một dịch vụ gọn gàng nhưng rất dễ xuất hiện trong đề thi!

Ở bài tiếp theo, chúng ta sẽ tiếp tục hành trình với **Athena** và các dịch vụ analytics khác của AWS. Hẹn gặp các bạn ở đó! 🚀
