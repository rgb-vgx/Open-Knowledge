---
title: Fundamentals of Backend 8: Server-Sent Events (SSE) - Giao tiếp một chiều trên
  HTTP
date: '2025-12-07 16:26:18'
date_gmt: '2025-12-07 09:26:18'
modified: '2026-01-21 15:24:05'
status: publish
slug: back-end-8-server-sent-events-sse-giao-tiep-mot-chieu-tren-http
wordpress_id: 601
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/back-end-8-server-sent-events-sse-giao-tiep-mot-chieu-tren-http/
categories:
- Back End
tags: []
---

**Server-Sent Events (SSE)** là một công nghệ cho phép Server chủ động gửi các luồng dữ liệu (stream) xuống Client thông qua một kết nối HTTP duy nhất và kéo dài.

Điều đặc biệt là, SSE hoàn toàn dựa trên giao thức HTTP truyền thống, nhưng lại mô phỏng được hành vi "đẩy" (Push) của Server. Người thiết kế SSE đã tìm ra một cách rất tinh tế để chuyển đổi HTTP từ mô hình Request/Response có giới hạn thành mô hình **phản hồi không có kết thúc (Unending Response)**.

## 1. SSE là gì?

SSE là một tiêu chuẩn cho phép Server truyền dữ liệu từ Server tới Client qua một kết nối HTTP duy nhất được giữ mở.

### Cơ chế hoạt động

SSE khai thác cơ chế **Chunked Transfer Encoding** của HTTP.

1. **Client Request:** Client gửi một request HTTP GET bình thường đến Server.
2. **Server Response:** Server phản hồi lại với một Header đặc biệt: `Content-Type: text/event-stream`.
3. **Unending Stream:** Sau khi gửi Header, Server không bao giờ đóng kết nối. Thay vào đó, Server liên tục gửi các "thông điệp nhỏ" (events/mini-responses) xuống Client.
4. **Client Parsing:** Client (thường là trình duyệt qua đối tượng `EventSource`) nhận luồng dữ liệu này và tự động phân tích cú pháp để trích xuất các thông điệp rời rạc.

Mỗi thông điệp được gửi đi phải tuân theo một định dạng đơn giản, bắt đầu bằng từ khóa `data:` và kết thúc bằng hai dòng xuống dòng (double newlines).

### Ưu và Nhược điểm

SSE là một lựa chọn tuyệt vời nhưng không phải là giải pháp cho mọi vấn đề:

| **Ưu điểm (Pros)** | **Nhược điểm (Cons)** |
| --- | --- |
| **Real-time, Server Push:** Dữ liệu được gửi ngay lập tức khi có event trên Server. | **Uni-directional (Một chiều):** Client chỉ có thể gửi request ban đầu, không thể gửi dữ liệu trở lại Server trên cùng một kênh. |
| **Dựa trên HTTP:** Tương thích với bất kỳ HTTP Server hoặc cơ sở hạ tầng mạng nào (như Proxy, Load Balancer) mà không cần cấu hình phức tạp. | **Client phải Online:** Giống như Push Model, nếu Client mất kết nối, nó sẽ không nhận được event. |
| **Tự động Reconnect:** Đối tượng `EventSource` trong trình duyệt tự động cố gắng kết nối lại nếu kết nối bị ngắt. | **Giới hạn số lượng kết nối:** Đây là vấn đề lớn nhất với HTTP/1.1. Các trình duyệt (như Chrome) giới hạn chỉ **6 kết nối TCP** đồng thời tới cùng một tên miền. Nếu 6 kết nối này bị chiếm bởi SSE, các request HTTP khác (tải CSS, JS, ảnh) sẽ bị **đói (starve)**. |

> **Lưu ý về Giới hạn 6 Kết nối:** Hạn chế này chủ yếu áp dụng cho HTTP/1.1. Với **HTTP/2**, vấn đề này được khắc phục nhờ khả năng ghép kênh (multiplexing), cho phép nhiều luồng (streams) sự kiện chạy trên một kết nối TCP duy nhất.

## 2. Thực hành: Xây dựng Server-Sent Event Feed

Chúng ta sẽ xây dựng một Server gửi thời gian hoặc số đếm mỗi giây và một Client đơn giản để lắng nghe.

### Kịch bản

1. Client kết nối tới `/stream`.
2. Server liên tục gửi số đếm tăng dần xuống Client.

### 2.1. Node.js (Express)

Node.js xử lý I/O không đồng bộ hiệu quả nên rất phù hợp để giữ nhiều kết nối SSE mở.

```
const express = require('express');
const app = express();
const PORT = 8888;

// Endpoint để xử lý luồng sự kiện (SSE)
app.get('/stream', (req, res) => {
    // 1. Thiết lập Header đặc biệt cho SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    let counter = 0;
    
    // 2. Hàm gửi sự kiện
    const sendEvent = () => {
        counter++;
        const data = `data: Hello from server, count: ${counter}\n\n`; // Phải kết thúc bằng \n\n
        res.write(data);
        
        // Dùng res.flush() để đảm bảo dữ liệu được gửi ngay lập tức (nếu cần)
        // Nếu không, Node.js có thể đợi buffer đầy
    };

    // 3. Lặp lại việc gửi sự kiện mỗi giây
    const intervalId = setInterval(sendEvent, 1000);

    // Xử lý khi client ngắt kết nối
    req.on('close', () => {
        console.log(`Client disconnected. Stopping stream for count: ${counter}`);
        clearInterval(intervalId); // Rất quan trọng để tránh memory leak
        res.end();
    });
});

app.listen(PORT, () => console.log(`Server-Sent Events running on port ${PORT}`));
```

### 2.2. Java (Conceptual Spring WebFlux/Servlet Asynchronous)

Trong Java, SSE được hỗ trợ thông qua đối tượng `SseEmitter` trong Spring Web hoặc bằng cách viết thủ công với Servlet Asynchronous.

```
/* Spring Boot Code Snippet (Conceptual) */
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.io.IOException;

@RestController
public class SseController {

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    @GetMapping("/stream")
    public SseEmitter streamEvents() {
        // Khởi tạo SseEmitter với timeout 1 giờ
        SseEmitter emitter = new SseEmitter(3600000L);
        
        scheduler.scheduleAtFixedRate(() -> {
            try {
                // Gửi sự kiện. Spring/SseEmitter sẽ tự định dạng `data: ...\n\n`
                emitter.send(SseEmitter.event()
                    .name("message") // Tên sự kiện (optional)
                    .data("Current time is " + System.currentTimeMillis()));
            } catch (IOException e) {
                // Đóng Emitter nếu xảy ra lỗi (ví dụ: client ngắt kết nối)
                emitter.completeWithError(e);
            }
        }, 0, 1, TimeUnit.SECONDS);

        // Xử lý khi client ngắt kết nối hoặc timeout
        emitter.onCompletion(() -> System.out.println("SSE session completed."));
        emitter.onTimeout(() -> emitter.complete());
        
        return emitter; // Trả về emitter, giữ kết nối mở
    }
}
```

### 2.3. Go (Golang)

Go, với khả năng xử lý I/O không chặn (non-blocking I/O) và Goroutines, rất mạnh mẽ trong việc triển khai SSE.

Go

```
package main

import (
	"fmt"
	"net/http"
	"time"
)

func streamHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Thiết lập Header đặc biệt
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Sử dụng Flusher để đảm bảo dữ liệu được gửi ngay lập tức
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}

	// Lấy channel thông báo ngắt kết nối
	notify := r.Context().Done()
	
	counter := 0
	
	for {
		select {
		case <-notify:
			// Client đã ngắt kết nối
			fmt.Println("Client disconnected.")
			return
		case <-time.After(1 * time.Second):
			// Gửi sự kiện mới mỗi giây
			counter++
			fmt.Fprintf(w, "data: Hello from Go server, count: %d\n\n", counter)
			flusher.Flush() // Quan trọng: Đẩy dữ liệu ra ngoài ngay lập tức
		}
	}
}

func main() {
	http.HandleFunc("/stream", streamHandler)
	fmt.Println("SSE Server running on :8888")
	http.ListenAndServe(":8888", nil)
}
```

## 3. Tổng kết

SSE là một lựa chọn tuyệt vời nếu bạn cần:

1. **Real-time, Server Push.**
2. **Giao tiếp một chiều (Server -> Client).**
3. **Tránh sự phức tạp của WebSocket** (xử lý handshake, frame, message hai chiều).

Tuy nhiên, nếu bạn cần **giao tiếp hai chiều** (ví dụ: Chat app, game), **WebSocket** là lựa chọn phù hợp hơn. Nếu bạn cần xử lý các tác vụ dài và không cần Real-time tuyệt đối, hãy cân nhắc **Long Polling** hoặc **Short Polling**.

---

*Như vậy, chúng ta đã đi qua 4 mô hình giao tiếp Backend quan trọng: Push (WebSocket), Short Polling, Long Polling và Server-Sent Events. Hy vọng kiến thức này sẽ giúp bạn đưa ra những quyết định kiến trúc chính xác cho ứng dụng của mình!*
