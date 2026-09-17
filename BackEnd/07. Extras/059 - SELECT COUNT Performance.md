# 📊 SELECT COUNT(*) — Thao tác tưởng vô hại nhưng có thể bóp nghẹt backend của bạn

Các bạn có bao giờ để ý rằng một câu `SELECT COUNT(*)` trên bảng vài chục triệu dòng có thể làm cả API đứng im không? Mình thì gặp chuyện này suốt: người ta đếm số likes, số followers, số bản ghi... như thể database đếm là chuyện nhỏ, trong khi đằng sau nó là một đống việc nặng.

Trong bài này mình sẽ mổ xẻ chuyện **count chậm tại sao**, `COUNT(*)` có thật sự phải đọc từng field không, rồi chỉ các bạn cách lấy **ước lượng (estimate)** khi không cần con số chính xác — kèm demo thực tế hơn 2 phút so với 300 mili giây.

---

### 🔍 Count trên bảng lớn: chuyện gì diễn ra bên dưới

Aggregate một lượng lớn bản ghi để đếm là **rất nhiều việc** với database. Nó phải lục qua số lượng record khổng lồ, dù là trong index hay trong bảng heap thô. Làm việc này quá thường xuyên sẽ ảnh hưởng hiệu năng của cả database lẫn application.

Mình dùng bảng student grades quen thuộc: cột `g` là điểm, cột `id` là mã học sinh, khoảng **60 triệu dòng**. Câu query thử nghiệm:

* `SELECT COUNT(g) FROM grades WHERE id BETWEEN 1000 AND 4000` — đáng lẽ khoảng 3000, nhưng chỉ trả về **2900**.

Lý do rất tinh tế: `COUNT(g)` chỉ đếm các giá trị **không null**, mà trong khoảng đó có vài dòng `g` bị null. Khi chạy `EXPLAIN ANALYZE`, Postgres cho thấy nó dùng **index scan** trên cột `id` và trả về **3001 entry từ index**. Nhưng vì mình yêu cầu đếm giá trị `g`, database phải **quay lại bảng (heap)** để xem từng dòng `g` có null hay không — đây không phải **index only scan (quét chỉ bằng index)**, mà là index scan thường.

---

### ⚡ COUNT(*) và cạm bẫy heap fetches

Rất nhiều người tưởng `COUNT(*)` là database phải fetch hết mọi field rồi đếm — **không đúng nữa**. Gần như không database nào làm vậy. `COUNT(*)` chỉ đơn giản là "đếm xem có bao nhiêu entry", và nếu đang quét index thì nó bao gồm cả các dòng null.

Khi thử `SELECT COUNT(*)` cho cùng khoảng dữ liệu, kết quả cao hơn hẳn, và plan lần này là **index only scan** — thứ *luôn* tốt hơn index scan thường vì không cần quay lại bảng. Vậy là xong? Chưa đâu, mình vừa "phá" nó bằng một câu `UPDATE grades SET g = 20 WHERE id BETWEEN 1000 AND 4000`.

Sau khi update, count lại, mọi thứ trông vẫn ổn: vẫn báo index only scan. Nhưng nhìn kỹ sẽ thấy **heap fetches: 6002 lần**. Nghĩa là index đã được quét, nhưng database vẫn phải quay lại bảng hàng nghìn lần. Vì sao?

* **Visibility map** báo cho index scanner rằng những dòng này "có thể đã bị update hoặc delete", nên phải quay lại heap để kiểm tra độ khả kiến thật sự.
* Trong Postgres, xóa không đánh dấu index bị xóa ngay lập tức — nó thêm record mới và giữ lại tuple cũ vì lý do **MVCC (multi-version concurrency control — điều khiển đa phiên bản)**, để transaction khác vẫn thấy được dữ liệu cũ.
* Cách xử lý cực đơn giản: **vacuum bảng**. Vacuum cập nhật visibility map, báo rằng các dòng cũ không còn ai đọc nữa → heap fetches về 0.

Và nhớ rằng count **tăng tuyến tính theo dữ liệu**: 3000 dòng thì nhanh, nhưng tăng số dòng lên là 1,5 giây rồi 6 giây; lúc đó Postgres chuyển sang dùng nhiều worker song song để quét index cho kịp. Càng nhiều dòng, bạn càng "cảm nhận" được độ trễ. Count không hề rẻ.

---

### 🧠 Khi bạn không cần con số chính xác: sống nhờ statistics

Đây là phần mình tâm đắc nhất: nếu bạn **không cần đúng đến từng đơn vị**, hãy để database ước lượng. Chỉ cần `EXPLAIN` — không kèm `ANALYZE` — câu query **không thực thi**, nó chỉ trả về plan kèm số dòng dự kiến. Ví dụ với cùng khoảng dữ liệu, planner ước **2868 dòng** trong khi thực tế lệch khoảng vài trăm — quá đủ dùng.

Cơ sở của con số đó là **statistics (thống kê) của bảng**:

1. Database liên tục lưu thống kê nội bộ về bảng — ước lượng được khoảng bao nhiêu dòng sẽ trả về mà không cần nhìn toàn bộ dữ liệu.
2. `ANALYZE` cập nhật lại thống kê này; bạn có thể chạy tay, hoặc database tự chạy định kỳ.
3. Statistics cũng chính là thứ planner dựa vào để chọn plan — ví dụ `EXPLAIN SELECT * FROM grades` sẽ cho bạn thấy nó định **sequential scan (full table scan — quét toàn bảng)** với số dòng ước lượng.

Nếu bạn đang xây Instagram, đếm likes hay followers, thì 3,1 triệu so với 3,11 triệu — hoặc 3,5 triệu so với 3,2 triệu — có ai quan tâm đâu? Không ai ngồi đếm chính xác cả. Đánh đổi độ chính xác để lấy hiệu năng là hoàn toàn hợp lý.

---

### 📉 Demo thực tế: hơn 2 phút so với 300 mili giây

Mình có một bảng khổng lồ khoảng **300 triệu dòng**. Chạy count toàn bảng mất **2 phút**. Application của bạn không thể bắt người dùng chờ 2 phút cho một con số — tưởng tượng đếm view của một bức ảnh có 2,8 triệu lượt xem mà hiển thị sau 1 đến 2 phút thì chẳng ai đợi.

Ứng dụng Express mình dựng có hai nút: **actual count** và **estimate count**, đếm số học sinh theo từng khung điểm (0–10, 10–20, 20–30, 30–40...):

* **Actual count** dùng `SELECT COUNT(*)`: 10 query chạy song song nhờ connection pooling, không hề có hàng đợi — vẫn mất **hơn 2 phút**.
* **Estimate count** dùng `EXPLAIN`: toàn bộ chỉ **300 mili giây**. Query lần thứ hai còn nhanh hơn nữa, vì chi phí còn lại chủ yếu là HTTP chứ bản thân query cực nhanh.
* So sánh kết quả: có khung điểm lệch khoảng **800.000**, có khung lệch cả triệu, thậm chí có khung lệch tới **2 triệu**. Nghe to, nhưng nếu bạn thấy chấp nhận được thì đây là món hời.

Cách này mình học từ một blog, và nó thực sự hiệu quả: lấy plan cùng thống kê của bảng thay vì bắt database cày xới để ra con số thật.

---

### 🔧 Code bên dưới và bài học

Backend dùng Postgres + Express: tạo pool kết nối, trả về `index.html`, và có hai endpoint — một cho estimate, một cho actual. Endpoint actual gọi `SELECT COUNT(*)` giữa hai mốc điểm; endpoint estimate chạy `EXPLAIN` với `(FORMAT JSON)` để JavaScript "xử" JSON cho dễ.

Frontend thì "xịn xò" đến mức mình đùa là dùng đủ Tailwind, Bootstrap, React, Vue lẫn Angular — thực ra chỉ là một cái bảng HTML với hai nút và chút cell padding kiểu "boomer" 1999. Mình gọi 10 endpoint song song bằng `Promise.all`; điều mình muốn mà chưa làm được là **cập nhật từng label ngay khi mỗi request xong** thay vì đợi tất cả — nếu bạn biết cách "chain hai event trên cùng một promise" thì mách mình nhé.

*Còn về thực hành: nếu bảng còn ít dòng, cứ count thật thoải mái. Nhưng nếu bảng sẽ phình to, hãy tránh `SELECT COUNT(*)` và để planner ước lượng cho bạn.*

Count là một ví dụ kinh điển cho triết lý của mình: hiểu thứ xảy ra bên dưới đường truyền, hiểu cái plan, hiểu visibility map — thì bạn mới debug được hiệu năng. Hẹn gặp các bạn ở bài tiếp theo! 🚀
