---
title: 'Fundamentals of Backend 5: Mô hình Push'
date: '2025-12-07 01:56:52'
date_gmt: '2025-12-06 18:56:52'
modified: '2026-01-21 15:24:11'
status: publish
slug: back-end-5-hieu-ro-ve-mo-hinh-push-trong-phat-trien-back-end
wordpress_id: 592
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/back-end-5-hieu-ro-ve-mo-hinh-push-trong-phat-trien-back-end/
categories:
- Back End
tags: []
---

Trong thiết kế Backend truyền thống, chúng ta thường quá quen thuộc với mô hình **Request/Response**. Tuy nhiên, khi xây dựng các ứng dụng yêu cầu tính thời gian thực (Real-time) như Chat app, thông báo (Notification), hay cập nhật giá chứng khoán, mô hình cũ bắt đầu bộc lộ điểm yếu.

Hôm nay, chúng ta sẽ không nói về một Design Pattern cao siêu nào, mà sẽ nói về một cơ chế thực thi ở Backend rất phổ biến: **Push Model (Cơ chế đẩy).**

## 1. Tại sao Request/Response không còn đủ tốt?

Hãy tưởng tượng bạn đang xây dựng tính năng thông báo (notification).

- Khi một người dùng vừa đăng nhập.
- Khi một YouTuber bạn theo dõi vừa upload video mới.
- Khi có một tin nhắn mới được gửi đến.

Làm sao Client (trình duyệt hoặc mobile app) biết được sự kiện này vừa xảy ra? Vấn đề nằm ở chỗ: **Client không có kiến thức về sự kiện đó, chỉ có Server biết.**

Nếu dùng Request/Response, Client sẽ phải liên tục hỏi Server:

> *"Có tin mới chưa? Có tin mới chưa? Có tin mới chưa?..."*

Đây gọi là kỹ thuật **Polling**. Nó không tối ưu (scale) tốt và lãng phí tài nguyên mạng cũng như khả năng xử lý của Server cho những câu trả lời "Không có gì".

## 2. Push Model là gì?

Push Model giải quyết bài toán trên bằng cách đảo ngược sự chủ động.

- **Cơ chế:** Client thiết lập một kết nối (connection) đến Server. Server giữ kết nối này. Ngay khi có dữ liệu mới (event), Server sẽ **chủ động "đẩy" (push)** dữ liệu đó xuống Client thông qua kết nối đã thiết lập.
- **Đặc điểm:** Client không cần gửi request để lấy dữ liệu. Dữ liệu đến ngay lập tức (Real-time).

Ví dụ điển hình nhất chính là giao thức **WebSocket**. Nó sử dụng kết nối TCP bên dưới để tạo ra một đường ống song song (bidirectional), cho phép Server gửi tin xuống bất cứ lúc nào.

### Ưu và Nhược điểm của Push

| **Ưu điểm (Pros)** | **Nhược điểm (Cons)** |
| --- | --- |
| **Real-time:** Dữ liệu được gửi đi ngay khi sự kiện xảy ra. | **Client phải Online:** Bạn không thể "push" cho một client đang offline. |
| **Tiết kiệm Request:** Client không cần polling liên tục. | **Backpressure (Áp lực ngược):** Server đẩy dữ liệu liên tục mà không biết Client có xử lý kịp hay không. Nếu Client yếu, app có thể bị crash. |
| **Trải nghiệm mượt mà:** Phù hợp cho Chat, Game, Live trading. | **Tốn tài nguyên Server:** Server phải duy trì kết nối (stateful) với hàng triệu user (Vấn đề C10K/C10M). |


---

## 3. Implement Push Model (Ví dụ Chat App)

Dưới đây là ví dụ triển khai một Chat Server đơn giản: Client kết nối, gửi tin nhắn, và Server sẽ **Push** tin nhắn đó tới tất cả các Client khác đang kết nối.

### 3.1. Node.js (Sử dụng thư viện `ws`)

Đây là ngôn ngữ được dùng trong bài giảng gốc vì tính đơn giản của Event Loop.

JavaScript

```
// Cài đặt: npm install ws

const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected');
});

const wss = new WebSocket.Server({ server });

// Mảng lưu trữ các kết nối
let connections = [];

wss.on('connection', (ws, req) => {
    // Sử dụng port của client làm ID tạm
    const clientId = req.socket.remotePort;
    console.log(`User ${clientId} vừa kết nối.`);
    
    // Thêm kết nối mới vào danh sách
    connections.push(ws);

    // Xử lý khi nhận tin nhắn từ client này
    ws.on('message', (message) => {
        console.log(`Nhận tin từ ${clientId}: ${message}`);
        
        // PUSH: Duyệt qua tất cả connections và gửi tin nhắn đi
        connections.forEach(client => {
            // Kiểm tra xem socket còn mở không trước khi gửi
            if (client.readyState === WebSocket.OPEN) {
                client.send(`User ${clientId} says: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log(`User ${clientId} đã thoát.`);
        // Thực tế nên xóa connection khỏi mảng connections tại đây
    });
});

server.listen(8080, () => {
    console.log('Server đang chạy tại port 8080');
});
```

### 3.2. Java (Sử dụng `Java-WebSocket`)

Java xử lý đa luồng rất tốt, phù hợp cho các hệ thống chat lớn. Ví dụ sử dụng thư viện `Java-WebSocket` cho gọn nhẹ (thay vì setup cả Spring Boot).

Java

```
/*
 * Dependencies (Maven):
 * <dependency>
 * <groupId>org.java-websocket</groupId>
 * <artifactId>Java-WebSocket</artifactId>
 * <version>1.5.3</version>
 * </dependency>
 */

import org.java_websocket.server.WebSocketServer;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import java.net.InetSocketAddress;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatServer extends WebSocketServer {

    // Set lưu trữ các kết nối (Thread-safe)
    private Set<WebSocket> conns = Collections.synchronizedSet(new HashSet<>());

    public ChatServer(int port) {
        super(new InetSocketAddress(port));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        conns.add(conn);
        System.out.println("Kết nối mới từ: " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        conns.remove(conn);
        System.out.println("Đã đóng kết nối: " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        System.out.println("Nhận tin nhắn: " + message);
        // PUSH logic: Broadcast tới tất cả client
        broadcast(message); 
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
    }

    @Override
    public void onStart() {
        System.out.println("Server đã khởi động!");
    }

    public static void main(String[] args) {
        new ChatServer(8887).start();
    }
}
```

### 3.3. Go (Golang)

Go cực kỳ mạnh mẽ cho Push model nhờ Goroutines (rất nhẹ). Chúng ta sẽ dùng `gorilla/websocket` (hoặc thư viện chuẩn `net/http` với `golang.org/x/net/websocket`).

Go

```
package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Map để lưu connections và Mutex để đảm bảo an toàn (thread-safe)
var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message) // Channel để đưa tin nhắn vào hàng đợi
var mutex = &sync.Mutex{}

type Message struct {
	Content string
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	mutex.Lock()
	clients[ws] = true
	mutex.Unlock()
    fmt.Println("Client mới kết nối")

	for {
		var msg Message
		// Đọc tin nhắn từ client (JSON object {"content": "..."})
		err := ws.ReadJSON(&msg)
		if err != nil {
			mutex.Lock()
			delete(clients, ws)
			mutex.Unlock()
			break
		}
		// Đẩy tin nhắn vào channel broadcast
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		// Lấy tin nhắn từ channel
		msg := <-broadcast
		
		// PUSH: Gửi cho tất cả clients
		mutex.Lock()
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				client.Close()
				delete(clients, client)
			}
		}
		mutex.Unlock()
	}
}

func main() {
	http.HandleFunc("/ws", handleConnections)
	go handleMessages() // Chạy goroutine để lắng nghe và push tin nhắn

	log.Println("Server bắt đầu tại :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```

## 4. Tổng kết

Push Model là chìa khóa cho các ứng dụng hiện đại cần tính tương tác cao. Thay vì để Client hỏi vất vả (Pull), Server hãy chủ động thông báo (Push).

Tuy nhiên, "Sức mạnh lớn đi kèm trách nhiệm lớn". Khi sử dụng Push, bạn phải chú ý quản lý kết nối (connection management) và lưu lượng (flow control) để tránh làm sập Client hoặc quá tải Server.
