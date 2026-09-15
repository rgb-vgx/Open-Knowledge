# Dựng Project Kafka-Java Từ Con Số 0: Gradle, JDK 11 Và Dependency Đầu Tiên

Chưa có project chạy được thì mọi bài Producer/Consumer sau đều vô nghĩa. Bài này dựng từ con số 0 một project `kafka-beginners-course` với module `kafka-basics`, khai báo đúng 3 dependency (`kafka-clients`, `slf4j-api`, `slf4j-simple`) và chạy thử `Hello World` để xác nhận môi trường sạch trước khi đụng vào Kafka.

---

## 1. Concept: Vì Sao Setup Này Quan Trọng?

Ba quyết định môi trường bạn cần chốt ngay từ đầu:

* **JDK 11.** Khóa này dùng Amazon Corretto 11 (JDK 11 của AWS). Oracle JDK 11 hay JDK 17 cũng thường chạy được, nhưng 11 là version đã được kiểm chứng — dùng đúng để khỏi mất thời gian debug version.
* **Gradle thay vì Maven.** Code Java sau này giống hệt nhau, chỉ khác file khai báo dependency. Gradle được chọn vì ngắn gọn, ít sai syntax hơn cho người mới.
* **IntelliJ IDEA Community.** Dùng VS Code hay Eclipse vẫn được, nhưng mọi thao tác demo (New Module, reload Gradle, allow multiple instances cho consumer group) đều làm trên IntelliJ — dùng đúng IDE để follow 1:1.

Nguyên tắc tổ chức: project cha `kafka-beginners-course` (GroupId `io.conduktor.demos`, version `1.0-SNAPSHOT`) chứa module con `kafka-basics`. Code học tập nằm hết trong module con, không dùng thư mục `src/main` của project cha.

## 2. Code Từng Bước

### Bước 1 — Tạo project Gradle + module con

1. Mở IntelliJ IDEA, chọn New Project, phía trái chọn **Gradle**, language **Java**, Project SDK chọn **Corretto 11** (hoặc JDK 11 bạn đã cài).
2. Đặt tên `kafka-beginners-course`, GroupId `io.conduktor.demos`, ArtifactId `kafka-beginners-course`, Version `1.0-SNAPSHOT`.
3. Đợi Gradle sync xong, xóa thư mục `src/main` + `src/test` ở project cha (chỉ dùng cho demo tổ chức, không code ở đó).
4. Right-click project cha, New rồi Module, lại chọn Gradle + Java 11, đặt tên module là `kafka-basics` (GroupId giữ nguyên, ArtifactId `kafka-basics`).
5. Từ giờ chỉ sửa file `build.gradle` **nằm trong thư mục `kafka-basics`**, đừng nhầm với file của project cha.

### Bước 2 — Khai báo 3 dependency bắt buộc

Mở `kafka-basics/build.gradle`, trong block `dependencies` thêm đúng 3 dòng (lấy từ Maven Central, search `kafka-clients`, `slf4j-api`, `slf4j-simple`):

```gradle
dependencies {
    implementation 'org.apache.kafka:kafka-clients:3.1.0'
    implementation 'org.slf4j:slf4j-api:1.7.36'
    implementation 'org.slf4j:slf4j-simple:1.7.36'
}
```

Lưu ý hai điểm transcript nhấn mạnh:

* Xóa các dòng `testImplementation` mẫu (JUnit) nếu bạn chưa cần test.
* Nếu copy từ trang Maven Central mà nó ghi `testImplementation`, sửa thành `implementation` cho cả 3 dòng trên.

Xong thì bấm **Load Gradle Changes** (hoặc nút refresh trong tab Gradle bên phải) để pull dependency về. Kiểm tra: mục **External Libraries** bên trái phải xuất hiện `kafka-clients`, `slf4j-api`, `slf4j-simple`. Không thấy nghĩa là chưa reload.

### Bước 3 — Class đầu tiên để xác nhận môi trường

Tạo class `io.conduktor.demos.kafka.ProducerDemo` dưới `kafka-basics/src/main/java` (New rồi Java Class, gõ full tên này để IntelliJ tự tạo package):

```java
package io.conduktor.demos.kafka;

public class ProducerDemo {

    public static void main(String[] args) {
        System.out.println("Hello world");
    }
}
```

### Bước 4 — Chỉnh Build and Run dùng IntelliJ IDEA

Vào Settings (Preferences trên Mac), Build, Execution, Deployment rồi Build Tools rồi Gradle:

* **Build and run using:** chọn `IntelliJ IDEA` (kinh nghiệm của tác giả: chạy consumer/producer đa instance ổn định hơn).
* **Run tests using:** giữ `Gradle` là được.

Apply rồi bấm Run `ProducerDemo.main()`. Thấy `Hello world` trong cửa sổ Run là môi trường đã sạch.

## 3. Chạy Và Kiểm Tra

* Run thành công: console hiện `Hello world`, không báo `ClassNotFoundException` cho `KafkaProducer` hay `LoggerFactory`.
* Mở External Libraries: thấy `Gradle: org.apache.kafka:kafka-clients:3.1.0`, `slf4j-api-1.7.36`, `slf4j-simple-1.7.36`.
* Chạy lần 2 vẫn ra kết quả trong cửa sổ Run dạng IntelliJ (không phải Gradle task output dài dòng).

Nếu thiếu log `Hello world` mà báo lỗi slf4j, 99% là bạn quên sửa `testImplementation` thành `implementation` hoặc chưa bấm reload Gradle.

## 4. Pitfalls

* **Sửa nhầm `build.gradle` của project cha.** Triệu chứng: reload xong vẫn `cannot resolve KafkaProducer`. Luôn kiểm tra đường dẫn file có `kafka-basics/` ở đầu.
* **Quên reload Gradle sau khi paste dependency.** IntelliJ không tự pull — phải bấm Load Gradle Changes.
* **Dùng JDK 17+ rồi lỗi lạ.** Thử về Corretto 11 trước khi nghi ngờ code.
* **Để Build and run using Gradle mặc định.** Vẫn chạy được bài đơn, nhưng tới bài consumer group chạy 2-3 instance song song sẽ khó `Allow multiple instances` và log rối hơn.

## Kết Luận

Tóm lại: **project cha + module `kafka-basics` + 3 dependency `implementation` + Run bằng IntelliJ = nền móng xong.** Từ đây mọi bài sau chỉ việc duplicate class và thêm code Kafka, không đụng tới setup nữa.

Bài tiếp theo chúng ta sẽ viết `ProducerDemo` thật sự: set `bootstrap.servers`, `key.serializer`/`value.serializer`, tạo `KafkaProducer<String, String>`, gửi một `ProducerRecord` vào topic `demo_java` rồi verify bằng console consumer.
