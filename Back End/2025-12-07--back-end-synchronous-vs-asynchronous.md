---
title: 'Fundamentals of Backend 4: Synchronous vs Asynchronous'
date: '2025-12-07 01:33:25'
date_gmt: '2025-12-06 18:33:25'
modified: '2026-01-21 15:24:14'
status: publish
slug: back-end-synchronous-vs-asynchronous
wordpress_id: 589
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/back-end-synchronous-vs-asynchronous/
categories:
- Back End
tags: []
---

Trong sự nghiệp làm backend, khái niệm **synchronous (đồng bộ)** và **asynchronous (bất đồng bộ)** xuất hiện… ở khắp mọi nơi:

- Trong **request–response**
- Trong **I/O** (network, disk)
- Trong **API client**
- Trong **backend processing** (queue, worker)
- Trong **database** (commit, replication)

Nếu không hiểu rõ sự khác nhau, bạn sẽ:

- Viết code UI bị “đơ” vì chờ I/O
- Tạo ra API bị block lâu, gây time-out
- Thiết kế hệ thống khó scale, khó tối ưu

Bài này sẽ giúp bạn **nhìn xuyên** từ code cấp ứng dụng xuống tới **OS, I/O, database**, qua lăng kính **sync vs async**.

---

## 1. Cốt lõi: “Tôi có làm được việc gì trong lúc đang chờ không?”

Tất cả sự khác nhau giữa synchronous và asynchronous có thể tóm gọn lại trong một câu hỏi:

> **Khi tôi đã gửi một yêu cầu / gọi một hàm / thực hiện một I/O, tôi có thể làm việc khác trong lúc chờ kết quả hay không?**

- Nếu **không làm được gì** cho đến khi nhận xong → **Synchronous**
- Nếu **vẫn làm việc khác được** trong lúc chờ → **Asynchronous**

Ở thời kỳ đầu của lập trình, **mọi thứ hầu như là synchronous**:

- Gọi hàm → chờ hàm xong
- Đọc file → chờ file đọc xong
- Gửi request → chờ server trả về

Điều này đơn giản, dễ hiểu, nhưng **rất phí tài nguyên**, đặc biệt khi:

- I/O chậm (đọc disk, network…)
- UI cần giữ tương tác mượt
- Backend phải xử lý lượng lớn request song song

---

## 2. Hình dung bằng ví dụ “sóng” & nguồn gốc từ thế giới vật lý

Từ “synchronous” vốn xuất phát từ vật lý/điện:

- Hai sóng **cùng pha** → synchronous
- Khi áp vào server–client:
  - Client gọi → chờ → server xử lý → trả về
  - Cả hai “đi cùng nhịp”, chờ nhau → **đồng bộ**

“Asynchronous” thì ngược lại:

- Chúng **không cần cùng nhịp**
- Client làm việc của client, server làm việc của server
- Chỉ khi nào có kết quả, một bên báo lại cho bên kia

Trong lập trình hiện đại, **asynchronous thường là mục tiêu mong muốn**, vì:

- CPU không bị phí thời gian chờ I/O
- UI vẫn mượt khi gọi các tác vụ nặng
- Backend có thể phục vụ nhiều request hơn

---

## 3. Synchronous I/O: Caller bị “đóng băng” khi chờ

### 3.1. Câu chuyện cổ điển: UI bị đơ

Nếu bạn từng làm:

- VB5 / VB6, WinForms thời xưa
- Hoặc các chương trình GUI single-thread

Bạn sẽ nhớ cảnh:

- Chạy một vòng lặp nặng / đọc file lớn / gọi API
- Trong lúc đó:
  - **UI bị treo**
  - Bấm nút không phản hồi
  - Cửa sổ ghi “Not Responding”

Lý do: thread UI đang bị **block** bởi synchronous I/O hoặc computation. Nó **không thể xử lý event** (click, repaint, input) được nữa.

Ngày xưa người ta còn phải dùng trick như `DoEvents` (VB) để “nhả” UI tạm một chút cho responsive.

### 3.2. Synchronous I/O ở cấp hệ điều hành

Mô tả đơn giản:

1. Chương trình gọi `read()` từ file/disk hoặc socket
2. Hệ điều hành (kernel) gửi yêu cầu đến driver, rồi đến hardware (SSD/HDD, NIC…)
3. **Trong lúc chờ** dữ liệu về:
   - Thread đó **bị block**
   - CPU thấy thread này “không làm gì cả” → **context switch** sang thread/process khác
4. Khi I/O hoàn tất:
   - Kernel đánh dấu: “I/O xong rồi”
   - Thread có thể được đưa trở lại CPU để tiếp tục

Việc context switching không phải “siêu nặng”, nhưng:

- Tốn thời gian (microseconds)
- Nếu diễn ra **rất nhiều**, chi phí sẽ cộng lại thành rõ rệt

### Kết luận về synchronous I/O

- Đơn giản, dễ lập trình
- Nhưng:
  - Caller **không làm được việc gì trong lúc chờ**
  - Context switch xảy ra nhiều
  - UI/Backend dễ bị “đơ” nếu xử lý không khéo

---

## 4. Asynchronous I/O: Làm việc khác trong lúc chờ

Mô hình async I/O:

1. Caller gửi yêu cầu I/O (đọc file, đọc socket, gửi request…)
2. Caller **không bị block**:
   - Có thể tiếp tục chạy phần code khác
3. Khi I/O hoàn tất:
   - Hoặc caller **tự đi kiểm tra** (polling)
   - Hoặc **được thông báo** (callback / completion event / future / promise)

Có hai hướng tiếp cận chính:

### 4.1. Polling / Readiness model (select, poll, epoll)

Caller hoặc event loop hỏi hệ điều hành:

- “Cái file descriptor này có sẵn dữ liệu chưa?”
- “Socket này đã ready để read/write chưa?”

Các API tiêu biểu:

- `select`, `poll`, `epoll` (Linux)
- Hệ thống này thường dựa trên **readiness**:
  - OS không đọc dữ liệu sẵn giúp bạn
  - OS chỉ báo: “Giờ đọc không bị block nữa đấy, muốn thì đọc đi.”

### 4.2. Completion model (IOCP, io\_uring)

Ở mô hình này:

- Bạn đăng ký I/O request (đọc từ socket, file…)
- Khi OS **hoàn tất I/O**, nó ghi kết quả vào một **completion queue** hoặc báo qua callback

Ví dụ:

- **Windows**: IO Completion Ports (IOCP)
- **Linux**: `io_uring`

Caller chỉ cần đợi hoặc đọc từ completion queue để biết I/O nào đã hoàn thành.

---

## 5. Async “giả” bằng thread: miễn là main thread không bị block

Nhiều runtime/language không có I/O async “thật” ở mọi nơi, nên dùng trick:

> Nếu operation X là blocking → spawn một thread riêng để nó bị block, còn main thread thì rảnh.

Ví dụ:

- Bạn muốn `readFile()` không block main thread
- Runtime tạo một **worker thread**, để thread đó gọi `read()` blocking
- Còn main thread:
  - Lập tức return
  - Đăng ký callback / promise / future
  - Khi worker xong, nó báo lại main thread

Về phía lập trình viên:

- Cảm giác giống async true
- Thực chất, chi phí context switching vẫn tồn tại, nhưng **được giấu đi**, và main thread không bị block.

---

## 6. Node.js: Event loop, callback, Promise, async/await

Node.js là ví dụ điển hình cho asynchronous execution ở tầng ứng dụng.

### 6.1. Mô hình tổng quát

- Node.js có:
  - **Main thread** (event loop)
  - Một **worker thread pool** (mặc định 4, có thể cấu hình)
- Các I/O như đọc file, network…:
  - Hoặc dùng async I/O của OS (epoll/IOCP)
  - Hoặc chuyển sang worker thread thực hiện

Main thread **không bị block**:

- Nó tiếp tục xử lý:
  - Callback
  - Timer
  - Event khác
  - Request mới

### 6.2. Ví dụ: `readFileSync` vs `readFile`

**Synchronous:**

```
const fs = require('fs');

console.log('1');

const data = fs.readFileSync('test.txt', 'utf8'); // BLOCKING
console.log('File content:', data);

console.log('2');
```

- Thứ tự output sẽ là:
  - `1`
  - `File content: ...`
  - `2`
- Trong lúc đọc file:
  - Event loop bị block
  - Không xử lý được tác vụ khác

**Asynchronous (callback):**

```
const fs = require('fs');

console.log('1');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File content:', data);
});

console.log('2');
```

- Thứ tự output:
  - `1`
  - `2`
  - rồi mới đến `File content: ...`
- `readFile` trả về **ngay lập tức**
- Khi đọc xong, Node.js gọi callback `(err, data)`

**Promise + async/await:**

```
const fs = require('fs/promises');

async function run() {
  console.log('1');

  const data = await fs.readFile('test.txt', 'utf8');
  console.log('File content:', data);

  console.log('2');
}

run();
```

- Code **trông giống synchronous**, nhưng:
  - `await` không block **event loop**
  - Chỉ “tạm dừng” function `run`
  - Event loop vẫn rảnh làm việc khác

**Async/await** chỉ là **syntactic sugar** trên Promise/callback, nhưng cực kỳ giúp code dễ đọc.

---

## 7. Synchronous hay asynchronous là *tính chất phía client*

Trong request–response, khi nói “gọi sync hay async”:

- Thực ra đó là **cách client xử lý**:
  - Client có **chờ** cho đến khi server trả về?
  - Hay client **gửi xong rồi làm việc khác**, khi nào có response thì callback?

Server thì:

- Luôn nhận request → xử lý → trả response
- Tốc độ/cách implement phía server không làm thay đổi:
  - “Khách hàng có chọn chờ hay không”

Ngày nay:

- Hầu hết HTTP client, fetch API, Axios, gRPC client… đều **asynchronous**:
  - Gửi request
  - Trả về Promise / Future
  - Lập trình viên tự quyết định:
    - `await` (giống sync về mặt logic)
    - hay `.then()` / callback / future chaining

---

## 8. Ví dụ đời thường: họp trực tiếp vs email

Một ví dụ rất dễ nhớ:

### Synchronous – hỏi trong cuộc họp

- Bạn quay sang đồng nghiệp trong phòng họp:  
  “Ê, cậu đã gửi pull request chưa?”
- Bạn **đứng đó và chờ câu trả lời**
- Nếu họ im lặng không trả lời → cực kỳ awkward
- Đây là **synchronous communication**:
  - Caller *phải* chờ
  - Hai bên “đi cùng nhịp”

### Asynchronous – gửi email

- Bạn gửi mail:  
  “Bạn cho mình số liệu A, B, C với nhé.”
- Xong, bạn **làm việc khác**, không ngồi đợi trước màn hình mail
- Khi họ reply:
  - Bạn đọc mail, tiếp tục công việc
- Đây là **asynchronous communication**

Chat (Teams, Slack) đôi khi:

- Nếu hai người chat nhanh → cảm giác giống synchronous
- Nhưng về bản chất vẫn là async: bạn không bắt buộc phải trả lời ngay lập tức.

---

## 9. Async backend processing: Queue, Job ID, “Gửi xong rồi tính tiếp”

Giờ quay lại backend.

Giả sử bạn có một API:

- Xử lý video
- Train model
- Generate báo cáo nặng

Thời gian chạy: **vài chục giây đến vài phút**.  
Nếu bạn để client:

- Gửi request
- Chờ đến khi xong mới trả → dễ:
  - Time-out
  - Connection bị drop
  - User nghĩ app “đơ”

### 9.1. Mô hình xử lý đồng bộ (synchronous backend processing)

- Client gửi request
- Backend nhận → xử lý ngay
- Giữ connection mở tới khi xong
- Trả response

Hệ thống:

- Đơn giản, dễ hiểu
- Nhưng rất tệ nếu:
  - Tác vụ chạy lâu
  - Nhiều request đến cùng lúc
  - Scale kém

### 9.2. Mô hình async backend processing với Queue

Giải pháp phổ biến:

1. Client gửi request: “Hãy làm job X cho tôi”
2. Backend **không xử lý ngay** mà:
   - Ghi một record job vào database/queue (RabbitMQ, Kafka, SQS…)
   - Trả về **ngay lập tức** cho client:
     - `job_id`
     - Status ban đầu: `PENDING`
3. Client rảnh → có thể:
   - Chuyển trang khác
   - Show UI “Đang xử lý, bạn có thể làm việc khác”
4. Một hoặc nhiều **worker** backend sẽ:
   - Đọc job từ queue
   - Thực thi job
   - Cập nhật trạng thái: `RUNNING` → `SUCCESS` / `FAILED`
5. Client muốn biết kết quả:
   - Gọi API `GET /jobs/{job_id}` (polling)
   - Hoặc chờ WebSocket / webhook / pub-sub báo kết quả

Toàn bộ quá trình:

- Vẫn là **request–response**, nhưng:
  - Được **tách làm 2 request**:
    - Gửi job
    - Hỏi trạng thái job
- Đây là **asynchronous backend processing** – cực kỳ phổ biến trong microservices, hệ thống lớn.

---

## 10. Async trong database: ví dụ PostgreSQL

PostgreSQL có rất nhiều “async feature”, ví dụ:

### 10.1. Asynchronous commit

Khi bạn `COMMIT`:

- **Synchronous commit**:
  - PostgreSQL:
    - Ghi thay đổi vào **WAL (Write-Ahead Log)**
    - **Flush WAL xuống disk** (bỏ qua cache của OS)
    - Sau khi chắc chắn dữ liệu đã nằm trên ổ đĩa → mới trả `COMMIT OK`
  - An toàn hơn, đảm bảo durability
  - Nhưng tốn thời gian I/O
- **Asynchronous commit**:
  - PostgreSQL:
    - Ghi vào WAL / memory
    - **Trả “COMMIT OK” cho client ngay**, trước khi flush disk
  - Nhanh hơn, nhưng:
    - Nếu crash ngay sau đó, có thể **mất dữ liệu vừa commit**

Đây là một ví dụ khác của:

> “Ta có chấp nhận **không chờ đến khi mọi thứ thực sự xong** rồi mới trả kết quả hay không?”

### 10.2. Synchronous vs asynchronous replication

Với replication (primary–replica):

- **Synchronous replication**:
  - Primary chỉ trả `COMMIT OK` khi:
    - Replica đã nhận và áp dụng xong thay đổi
  - Đảm bảo replica không bị tụt state
  - Nhưng client phải **chờ lâu hơn**
- **Asynchronous replication**:
  - Primary commit và trả kết quả ngay
  - Replica nhận thay đổi **sau đó**
  - Nhanh hơn, nhưng:
    - Nếu primary chết đột ngột, replica có thể chưa nhận kịp → mất dữ liệu mới

---

## 11. OS cache và f\_sync: async ở tầng file system

Một chi tiết thú vị:

- Khi ứng dụng gọi `write()` ghi file:
  - Dữ liệu **thường không lên disk ngay lập tức**
  - Mà vào **file system cache** trong RAM của OS
- OS sẽ:
  - Batch nhiều ghi nhỏ lại
  - Ghi xuống disk thành những lần write lớn hơn
  - Giúp tăng performance và giảm hao mòn SSD

Nhưng:

- Database không thích “mập mờ” như vậy
- Họ cần **chắc chắn dữ liệu đã nằm trên disk** khi commit
- Nên họ dùng:
  - `fsync` hoặc tương đương
  - Yêu cầu OS: “Flush **ngay lập tức** dữ liệu này xuống ổ đĩa”

Một lần nữa, đây cũng là **sync vs async**:

- Cho phép OS ghi async → nhanh hơn, nhưng có risk
- Bắt OS ghi sync → chậm hơn, nhưng an toàn hơn

---

## 12. Tổng kết: Sync vs Async không chỉ là từ khóa – nó là cách bạn thiết kế hệ thống

Qua bài này, bạn có thể rút ra:

1. **Sync**:
   - Caller **chờ** kết quả, không làm việc khác được
   - Dễ hiểu, dễ code
   - Nhưng dễ “đơ”, khó scale
2. **Async**:
   - Caller **không cần chờ**, có thể tiếp tục làm việc khác
   - Phức tạp hơn (callback, promise, event loop, queue…)
   - Nhưng:
     - Tận dụng CPU tốt hơn
     - UI mượt hơn
     - Backend scale tốt hơn
3. **Async xuất hiện ở mọi tầng**:
   - Code (callback, promise, async/await)
   - I/O (epoll, IOCP, io\_uring)
   - Backend processing (queue, worker, job ID)
   - Database (async commit, replication)
   - File system (OS cache, fsync)

Nếu bạn muốn tối ưu backend, đây là mindset quan trọng:

> Luôn tự hỏi: “Ở đây **có cần** chờ cho đến khi mọi thứ hoàn thành không? Hay mình có thể tách công việc ra để phần còn lại chạy bất đồng bộ?”
