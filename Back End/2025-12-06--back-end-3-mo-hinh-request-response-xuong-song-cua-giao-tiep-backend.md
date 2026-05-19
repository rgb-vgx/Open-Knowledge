---
title: 'Fundamentals of Backend 3: Mô hình Request–Response – “Xương sống” của giao
  tiếp Backend'
date: '2025-12-06 02:22:10'
date_gmt: '2025-12-05 19:22:10'
modified: '2026-01-21 15:24:16'
status: publish
slug: back-end-3-mo-hinh-request-response-xuong-song-cua-giao-tiep-backend
wordpress_id: 583
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/06/back-end-3-mo-hinh-request-response-xuong-song-cua-giao-tiep-backend/
categories:
- Back End
tags: []
---

Trong thế giới backend, nếu chỉ được chọn **một** mẫu thiết kế giao tiếp để học thật kỹ, thì đó chính là **request–response**.

Đơn giản, cổ điển, thanh lịch – và xuất hiện gần như ở mọi nơi: từ HTTP, DNS, SQL cho tới RPC, REST, SOAP, GraphQL…

Trong bài này, chúng ta sẽ đi từ trực giác đến chi tiết kỹ thuật bên trong mô hình request–response:  
request là gì, response là gì, parse ở đâu, serialization nằm chỗ nào, chi phí ở đâu, và vì sao nó vừa mạnh mẽ vừa có những giới hạn rất rõ ràng.

---

## 1. Request–Response: mô hình giao tiếp kinh điển

Ý tưởng cơ bản cực kỳ đơn giản:

- **Client gửi một request**
- **Server nhận, hiểu, xử lý request**
- **Server gửi lại một response**
- **Client nhận, parse và sử dụng response**

Vẽ thành hai mũi tên thì nhìn rất “hiền”:

> Client ──(Request)──▶ Server  
> Client ◀─(Response)── Server

Nhưng bên dưới hai mũi tên này là cả một loạt chi phí:

- Ghi request ra mạng
- Truyền qua TCP/IP (chia gói, reorder, retransmit…)
- Parse request để tách ranh giới
- Deserialize payload (JSON/XML/Protobuf/…)
- Xử lý business logic
- Serialize response
- Truyền trả lại client
- Client parse + deserialize + hiển thị / xử lý tiếp

Muốn làm backend giỏi, bạn phải **thấy** được tất cả các lớp này, chứ không chỉ là “gọi API xong trả JSON”.

---

## 2. “Request” thực ra là gì?

Trong code, ta hay nói: “client gửi request” – nhưng ở tầng mạng, mọi thứ **không** đơn giản như gửi một “bức thư” nguyên khối.

Trong TCP, dữ liệu là **một stream liên tục** các bytes:

- Server **không tự nhiên biết** đâu là **bắt đầu** một request
- Server cũng **không tự nhiên biết** đâu là **kết thúc** request
- Client có thể gửi **3 request liên tiếp** trên cùng một kết nối
- Server phải dựa vào **protocol + message format** để tách stream thành từng request hoàn chỉnh

Vì vậy mô hình sẽ luôn gồm:

1. **Client định nghĩa request**
   - Gửi theo một định dạng cụ thể (HTTP, DNS, SQL, Protobuf RPC, custom binary…)
2. **Server phải hiểu được request**
   - Biết cách tách stream TCP thành từng request
   - Biết cấu trúc từng request: header, body, độ dài, mã hóa…

### Parsing vs Processing

Quan trọng: **parsing** và **processing** là hai chuyện khác nhau:

- **Parsing request**
  - Tìm ranh giới: request bắt đầu / kết thúc ở đâu?
  - Đọc protocol, header, body thô
- **Processing request**
  - Hiểu semantics: đây là `GET /users/1`, hay `POST /upload`, hay câu lệnh `SELECT ...`
  - Chạy query DB, gọi service khác, đọc file, xử lý logic

Sau đó lại tiếp tục:

- **Serialization / Deserialization**
  - JSON/XML/Protobuf… không phải dùng trực tiếp được
  - Server phải **deserialize** thành object/struct trong ngôn ngữ lập trình
  - Khi trả về, lại **serialize** object thành bytes gửi trả client

Và tất cả những bước này đều có **chi phí**.

---

## 3. Chi phí parsing & serialization: JSON, XML, Protobuf…

Tại sao người ta từ SOAP/XML chuyển dần sang REST/JSON, rồi sau đó nhiều nơi lại chuyển tiếp sang Protobuf/gRPC?

Lý do lớn:

- **XML**: giàu cấu trúc, nhưng **parse rất đắt**
- **JSON**: nhẹ hơn XML, nhưng với payload lớn, parse JSON vẫn chậm đáng kể
- **Protobuf / Binary format**:
  - Ít “human-readable”
  - Bù lại **nhỏ hơn**, **nhanh hơn** khi parse

Ví dụ với **C++**:

- Bạn nhận về một chuỗi JSON từ network
- Dùng một thư viện JSON parser (nlohmann/json, RapidJSON, …)
- Parser phải:
  - Đọc từng ký tự
  - Xây cây cấu trúc (object, array, string, number…)
  - Map sang struct/class C++ mà bạn định nghĩa

Với JSON lớn, parser có thể mất **tới vài giây**, đủ để “giết chết” performance nếu bạn không đo đạc và tối ưu.

---

## 4. Vòng đời đầy đủ của một request–response

Hãy hình dung một request với trục thời gian đơn giản:

1. **Client serialize & ghi request**
   - Biến object thành JSON/XML/Protobuf
   - Ghi vào socket, flush ra mạng
   - Việc “ghi request” này **cũng tốn thời gian**
2. **Request đi qua mạng**
   - Bị chia thành các TCP segment
   - Chạy qua nhiều router, có thể bị reorder
   - Server phải nhận đủ và ráp lại
3. **Server parse request**
   - Tách header/body
   - Xác định: đây là request gì? GET? POST? Query gì?
4. **Server xử lý (processing)**
   - Chạy logic, truy vấn DB, đọc file, gọi service khác…
5. **Server serialize response & gửi lại**
   - Biến kết quả thành JSON/XML/Protobuf/binary
   - Ghi ra mạng, truyền ngược về client
6. **Client nhận, parse & sử dụng response**
   - Reassemble packet → message
   - Deserialize → object
   - Render ra UI, hoặc tiếp tục gọi request khác

Chỉ khi nhìn đủ cả vòng đời này, bạn mới **thật sự hiểu** chuyện gì xảy ra mỗi khi mình “gọi API”.

---

## 5. Request–Response được dùng ở đâu?

Gần như… ở khắp nơi.

### 5.1. Web / HTTP

- Trình duyệt gửi `GET /path HTTP/1.1`
- Server trả về `HTTP/1.1 200 OK` + header + body
- Mọi request của bạn đến Google, Facebook, API backend… đều là request–response

### 5.2. DNS

- Client gửi: “IP của `google.com` là gì?” – trong một UDP datagram
- Server trả về: “Đây là IP của nó” kèm theo **query ID**
- Query ID giúp client biết **response nào thuộc về request nào**, vì client có thể gửi hàng trăm request song song

👉 Bài học: **Không được tin vào thứ tự** (order) trong backend.  
Không thể dựa vào “cái nào đến trước là của request trước đó”. Luôn cần ID, correlation ID, hoặc một mechanism tương tự.

### 5.3. Lệnh shell, RPC, SQL

- `ls` → gửi request đến server (trong trường hợp có file server) → trả về danh sách
- **RPC (Remote Procedure Call)**:
  - Gọi hàm như local, nhưng thực ra **chạy trên máy khác**
  - Ví dụ: gRPC, Thrift, XML-RPC…
  - Abstraction khiến lập trình viên không phân biệt được local vs remote → dễ dính “leaky abstraction”
- **SQL**
  - Bạn gửi query `SELECT ...` đến database
  - DB parse SQL, xây execution plan, chọn index, scan bảng, join…
  - Thực thi → build kết quả → trả về
  - Tất cả cũng chỉ là **request–response**

### 5.4. REST, SOAP, GraphQL

- **REST**: Request–response theo tài nguyên (`/users`, `/posts`, …)
- **SOAP**: XML-based, vẫn là request–response, dùng trong nhiều hệ thống enterprise cũ
- **GraphQL**:
  - Cho phép **gộp nhiều nhu cầu dữ liệu** vào **một request**
  - Giảm “chattiness” giữa client và backend
  - Thay vì client gọi 3–4 REST API, GraphQL cho phép gửi **1 request**, backend tự lo truy vấn nhiều nguồn rồi ghép lại

Về bản chất, GraphQL vẫn là **request–response**, chỉ là:

> Nó di chuyển “sự phức tạp” từ phía client sang phía backend.

---

## 6. Cấu trúc request & response

Client và server phải **thống nhất** với nhau về:

- Protocol: HTTP, DNS, custom TCP, gRPC…
- Message format: text, JSON, XML, Protobuf, binary custom…

Ví dụ với HTTP:

```
GET /path HTTP/1.1\r\n
Host: example.com\r\n
User-Agent: curl/8.0\r\n
Accept: */*\r\n
\r\n
[Body nếu có]
```

- Server HTTP library sẽ:
  - Đọc từ socket
  - Tách dòng đầu (request line)
  - Parse header
  - Dựa vào `Content-Length` / `Transfer-Encoding` để biết body dài bao nhiêu
- Sau đó chuyển cho code backend của bạn **dưới dạng object đã parse sẵn**  
  → Lập trình viên thường không “thấy” phần nặng nhất: parsing & boundary handling.

---

## 7. Ví dụ: Service upload ảnh bằng request–response

Giả sử bạn xây một backend để **upload ảnh**.

![](https://com994947723.wordpress.com/wp-content/uploads/2025/12/image.png?w=606)

### Cách 1: Gửi nguyên file trong một request

- Client đọc file ảnh → gửi **nguyên file** trong body một request
- Server nhận đủ → ghi ra đĩa / object storage

Ưu điểm:

- Đơn giản

Nhược điểm:

- File rất lớn (vài GB) sẽ dễ:
  - Timeout
  - Mất kết nối giữa chừng
- Nếu client rớt mạng giữa chừng:
  - Server chỉ có “nửa file” → thường bỏ hết, không dùng được
  - Không “resume” được

![](https://com994947723.wordpress.com/wp-content/uploads/2025/12/image-1.png?w=603)

### Cách 2: Chunked upload (chia nhỏ file)

- Chia file thành nhiều **chunk** nhỏ
- Mỗi chunk gửi trong **một request riêng**
- Mỗi request kèm:
  - ID file
  - Số thứ tự chunk
  - Tổng số chunk (hoặc meta khác)

Lúc này:

- Server có thể lưu trạng thái:
  - Đã nhận chunk 1,2,3,…
- Nếu client crash:
  - Lần sau quay lại, hỏi server: “Ông đã có chunk nào rồi?”
  - Client chỉ gửi tiếp phần còn thiếu

Về mặt kiến trúc, đây vẫn là **request–response**,  
nhưng **pattern thực thi (execution style)** đã thay đổi: từ “một phát ăn ngay” sang “từng phần có thể resume”.

---

## 8. Khi request–response bắt đầu… đuối

Có những bài toán mà request–response **không còn phù hợp**.

### 8.1. Notification service, chat app

Ví dụ bạn muốn xây một **notification service**:

- Khi có ai đó:
  - Login
  - Comment
  - Upload video  
    → Hệ thống cần **chủ động push** thông báo đến client

Nếu dùng request–response kiểu:

> Client hỏi liên tục: “Có notification không? Có chưa? Có chưa?”

Đó chính là **polling** – chúng ta sẽ bàn kỹ ở phần khác.

Vấn đề:

- Latency cao (vì phải chờ lần poll tiếp theo)
- Spam mạng với hàng đống request rỗng
- Gây áp lực không cần thiết lên backend

Chat app mà dùng polling kiểu “có tin nhắn chưa?” liên tục thì:

- Hoặc là trễ
- Hoặc là rất tốn tài nguyên

Lúc này, ta cần các mô hình khác: long-polling, WebSocket, push-based… (sẽ bàn ở những bài sau).

### 8.2. Long-running request

Nếu một request **chạy rất lâu**:

- Client ngồi chờ mỏi mòn
- Nếu:
  - Client đóng trình duyệt / mất mạng
  - Hoặc backend mất kết nối với client
- Khi client quay lại:
  - Không biết job kia đã xong chưa
  - Retry cũng không chắc nên làm gì

Đây là lúc ta cần những pattern như:

- Asynchronous processing
- Job queue, worker
- Polling trạng thái job
- Webhook…

Nhưng tất cả đều bắt đầu từ việc **hiểu rõ giới hạn của request–response**.

---

## 9. Nhìn tận mắt: dùng `curl` để thấy full request–response HTTP

Một cách rất hay để “mổ bụng” HTTP là dùng `curl` ở chế độ verbose/trace.

Ví dụ:

```
curl -v --trace out.txt http://google.com
```

Bạn sẽ thấy:

1. Curl thực hiện **DNS lookup** để tìm IP của `google.com`
2. Thiết lập **TCP connection** tới port 80
3. Gửi request: `GET / HTTP/1.1 Host: google.com User-Agent: curl/... Accept: */*`
4. Nhận response: `HTTP/1.1 301 Moved Permanently Location: http://www.google.com/ Content-Length: ... ... [HTML body]`
5. Bạn sẽ thấy rõ:
   - Request đi hướng **→**
   - Response đi hướng **←**
   - Header luôn đến trước body
   - Server có thể trả redirect (301) và yêu cầu client sang `www.google.com`

Nhìn logfile như vậy là cách tuyệt vời để **hiểu request–response ở tầng HTTP** mà không cần viết một dòng server nào.

---

## 10. Kết

Mô hình **request–response**:

- Là mẫu giao tiếp **căn bản nhất** của backend
- Xuất hiện trong:
  - HTTP, DNS, SQL, REST, SOAP, GraphQL, RPC…
- Ẩn bên dưới là:
  - Parsing
  - Serialization/Deserialization
  - Chi phí mạng
  - Execution time trên server
  - Cách xác định ranh giới message (boundary)

Hiểu sâu mô hình này là bước đầu để:

- Thiết kế API hiệu quả
- Tránh bottleneck ở parsing / serialization
- Biết khi nào cần chuyển sang mô hình khác (polling, push, pub/sub, async…)
