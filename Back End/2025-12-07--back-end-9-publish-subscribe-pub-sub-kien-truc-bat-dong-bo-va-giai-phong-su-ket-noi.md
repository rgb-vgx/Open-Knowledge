---
title: Fundamentals of Backend 9: Publish/Subscribe (Pub/Sub) - Kiến trúc Bất đồng
  bộ và Giải phóng Sự kết nối
date: '2025-12-07 17:12:35'
date_gmt: '2025-12-07 10:12:35'
modified: '2026-01-21 15:24:03'
status: publish
slug: back-end-9-publish-subscribe-pub-sub-kien-truc-bat-dong-bo-va-giai-phong-su-ket-noi
wordpress_id: 607
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/back-end-9-publish-subscribe-pub-sub-kien-truc-bat-dong-bo-va-giai-phong-su-ket-noi/
categories:
- Back End
tags: []
---

**Publish/Subscribe (Pub/Sub)** là một mẫu thiết kế định tuyến thông điệp bất đồng bộ (asynchronous message routing) nơi người gửi thông điệp (Publisher) và người nhận thông điệp (Subscriber) **không giao tiếp trực tiếp với nhau**. Thay vào đó, cả hai giao tiếp thông qua một trung gian được gọi là **Broker** (hay Message Queue, Message Bus, Topic).

Mục đích chính của Pub/Sub là **giảm sự kết nối (decoupling)** giữa các thành phần trong hệ thống, đặc biệt quan trọng trong kiến trúc Microservices.

## 1. Vấn đề của Giao tiếp Đồng bộ (Chaining)

Hãy tưởng tượng một kiến trúc Microservices điển hình (ví dụ: Tải lên Video YouTube) nếu sử dụng mô hình Request/Response truyền thống:

1. **Service Upload** nhận video.
2. Sau khi xong, **Upload Service** phải biết và gọi trực tiếp **Compression Service**.
3. Sau khi xong, **Compression Service** phải biết và gọi trực tiếp **Formatting Service**.
4. ... và đồng thời gọi **Copyright Service** và **Notification Service**.

### Nhược điểm của Mô hình Chaining Request:

- **Kết nối chặt chẽ (High Coupling):** Nếu Upload Service thay đổi logic hoặc API của Compression Service thay đổi, toàn bộ chuỗi có thể bị lỗi.
- **Điểm hỏng đơn lẻ (Single Point of Failure):** Nếu bất kỳ service nào trong chuỗi bị sập, toàn bộ quy trình sẽ bị gián đoạn và không thể khôi phục dễ dàng.
- **Khó mở rộng (Scalability Issue):** Thêm một service mới cần nhận dữ liệu (ví dụ: AI Analysis Service) yêu cầu phải sửa đổi code của service nguồn (Upload Service hoặc Compression Service) để biết và gọi service mới đó.

## 2. Cơ chế Publish/Subscribe (Pub/Sub)

Mô hình Pub/Sub giải quyết vấn đề trên bằng cách đưa một **Broker** vào giữa.

### Thành phần chính:

| **Thành phần** | **Vai trò** | **Ví dụ** |
| --- | --- | --- |
| **Publisher** (Người xuất bản) | Tạo thông điệp và gửi tới **Broker**. Không cần biết ai sẽ nhận. | Upload Service |
| **Subscriber** (Người đăng ký) | Đăng ký nhận thông điệp từ một **Topic/Queue** cụ thể. | Compression Service, Notification Service |
| **Broker** (Trung gian) | Tiếp nhận, lưu trữ thông điệp và phân phối cho các Subscriber quan tâm. | **Kafka, RabbitMQ, Google Pub/Sub** |
| **Topic/Queue** (Chủ đề/Hàng đợi) | Kênh giao tiếp logic mà Publisher gửi đến và Subscriber nhận từ. | `raw_mp4_videos`, `video_compressed` |

### Quy trình:

1. **Publish:** Upload Service hoàn thành tải lên video và gửi thông báo (thông điệp) tới Topic `raw_mp4_videos` trên Broker. **Upload Service xong nhiệm vụ.**
2. **Subscribe & Consume:**
   - **Compression Service** đã đăng ký Topic `raw_mp4_videos`. Nó tự động lấy thông điệp video mới để bắt đầu nén.
   - **Copyright Service** cũng đăng ký Topic `raw_mp4_videos` và bắt đầu kiểm tra vi phạm bản quyền.
3. **Chain/Flow:** Sau khi nén xong, Compression Service lại đóng vai trò là Publisher, gửi thông báo tới Topic `video_compressed`.
   - **Formatting Service** (Subscriber) lấy từ `video_compressed` và bắt đầu tạo các phiên bản 480p, 720p, 1080p.
   - **Notification Service** (Subscriber) có thể đăng ký Topic `video_ready_4k` và chỉ gửi thông báo khi phiên bản chất lượng cao nhất đã xong.

## 3. Ưu và Nhược điểm của Pub/Sub

Pub/Sub là nền tảng của các kiến trúc Microservices hiện đại vì những lợi ích sau:

| **Ưu điểm (Pros)** | **Nhược điểm (Cons)** |
| --- | --- |
| **Giảm kết nối (Low Coupling):** Các service không cần biết về nhau. Dễ dàng thêm Service mới mà không cần chỉnh sửa Service cũ. | **Phức tạp hơn:** Cần thêm một thành phần Broker trung gian, đòi hỏi việc cài đặt, quản lý và bảo trì (ví dụ: đảm bảo Broker luôn hoạt động). |
| **Khả năng mở rộng:** Dễ dàng có **nhiều Subscriber** lấy dữ liệu từ một Publisher duy nhất (One-to-Many). | **Vấn đề phân phối thông điệp:** Khó khăn trong việc đảm bảo **Chỉ nhận một lần (Exactly-Once Delivery)**. Broker phải xử lý việc Subscriber có nhận được thông điệp chưa (Acknowledgement) và xử lý khi thông điệp bị trùng lặp. |
| **Xử lý Bất đồng bộ:** Publisher có thể di chuyển (move on) ngay lập tức, không cần chờ đợi Subscriber xử lý xong. | **Độ trễ (Latency):** Thông điệp phải đi qua Broker trước khi đến Subscriber, có thể tăng độ trễ tổng thể so với giao tiếp HTTP trực tiếp. |

## 4. Demo với RabbitMQ (AMQP)

**RabbitMQ** là một Broker phổ biến, triển khai **Advanced Message Queuing Protocol (AMQP)**. Nó sử dụng mô hình **Queue** và **Exchange** để phân phối thông điệp.

### Node.js Publisher (Người xuất bản)

Đoạn code sau mô phỏng việc Publisher gửi một thông điệp (Job: 107) tới một **Queue** tên là `Jobs` trên RabbitMQ.

JavaScript

```
// Thiết lập kết nối RabbitMQ (AMQP)
const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://user:pass@host:port/'; // Thay bằng URL RabbitMQ của bạn

async function publish(jobInput) {
    let connection;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'Jobs';
        
        // Đảm bảo Queue tồn tại
        await channel.assertQueue(queue, { durable: false }); 
        
        const message = JSON.stringify({ input: jobInput });
        channel.sendToQueue(queue, Buffer.from(message));
        
        console.log(`[Publisher] Đã gửi thông điệp: ${message} vào Queue: ${queue}`);

        await channel.close();
    } catch (error) {
        console.error("Lỗi khi kết nối hoặc publish:", error);
    } finally {
        if (connection) await connection.close();
    }
}

publish(107); // Chạy Publisher để gửi Job: 107
```

### Node.js Consumer (Người tiêu thụ/Subscriber)

Consumer kết nối tới Broker, tìm Queue `Jobs` và bắt đầu lắng nghe thông điệp.

JavaScript

```
// Thiết lập kết nối RabbitMQ (AMQP)
const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://user:pass@host:port/'; // Thay bằng URL RabbitMQ của bạn

async function consume() {
    let connection;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'Jobs';
        
        await channel.assertQueue(queue, { durable: false });
        console.log(" [*] Đang chờ thông điệp trong Queue Jobs. Để thoát, nhấn CTRL+C");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                const jobData = JSON.parse(content);
                
                console.log(`[Consumer] Đã nhận Job với input: ${jobData.input}`);
                
                // *** QUAN TRỌNG: ACKNOWLEDGEMENT ***
                // Sau khi xử lý xong, Consumer phải gửi tín hiệu Ack (Acknowledge)
                // để báo cho Broker xóa thông điệp khỏi Queue.
                // Nếu không có Ack, Broker sẽ giữ thông điệp và gửi lại cho Consumer khác nếu Consumer này chết.
                channel.ack(msg); 
            }
        });
    } catch (error) {
        console.error("Lỗi khi kết nối hoặc consume:", error);
        if (connection) await connection.close();
    }
}

consume(); // Chạy Consumer và giữ kết nối mở để lắng nghe
```

### Mô phỏng Lỗi và Khôi phục (Re-delivery)

Như bạn thấy trong demo, nếu Consumer nhận thông điệp (Job 107) nhưng chết (Kill) trước khi gửi **Acknowledgement (Ack)**, RabbitMQ sẽ hiểu rằng Job 107 chưa được xử lý thành công. Ngay lập tức, RabbitMQ sẽ **gửi lại (re-deliver)** thông điệp đó cho Consumer đang hoạt động khác (hoặc Consumer vừa khởi động lại).

Đây chính là cơ chế cơ bản giúp Pub/Sub đảm bảo tính ổn định và khả năng phục hồi của hệ thống.

Tuyệt vời! Tôi sẽ bổ sung ví dụ chi tiết cho mô hình **Publish/Subscribe (Pub/Sub)** bằng Golang và Java, sử dụng **RabbitMQ** (AMQP) làm Broker.

## 5. Ví dụ Chi tiết cho Pub/Sub (RabbitMQ/AMQP)

Để chạy các ví dụ này, bạn cần có một Broker RabbitMQ đang hoạt động (có thể cài đặt cục bộ hoặc sử dụng dịch vụ Cloud AMQP).

### 5.1. Golang (Consumer & Publisher)

Golang rất phù hợp cho các ứng dụng Pub/Sub nhờ vào khả năng xử lý concurrency và I/O hiệu quả của **goroutines**. Chúng ta sẽ sử dụng thư viện `streadway/amqp`.

#### Publisher (Go)

Go

```
package main

import (
	"log"
	"os"
	"github.com/streadway/amqp"
	"time"
)

// Thay bằng URL RabbitMQ của bạn
const RABBITMQ_URL = "amqp://guest:guest@localhost:5672/" 

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("Usage: go run publisher.go [message]")
	}
	messageBody := os.Args[1]
	
	conn, err := amqp.Dial(RABBITMQ_URL)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"jobs_queue_go", // Tên Queue
		false,           // durable (Không lưu trữ vĩnh viễn)
		false,           // delete when unused (Xóa khi không dùng)
		false,           // exclusive (Độc quyền)
		false,           // no-wait
		nil,             // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

	body := time.Now().Format("15:04:05") + ": " + messageBody
	
	err = ch.Publish(
		"",    // exchange (Gửi trực tiếp vào Queue)
		q.Name, // routing key (Tên Queue)
		false, // mandatory
		false, // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}
	log.Printf(" [Publisher] Đã gửi thông điệp: %s", body)
}
```

#### Consumer (Go)

Go

```
package main

import (
	"log"
	"time"
	"github.com/streadway/amqp"
)

// Thay bằng URL RabbitMQ của bạn
const RABBITMQ_URL = "amqp://guest:guest@localhost:5672/" 

func main() {
	conn, err := amqp.Dial(RABBITMQ_URL)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"jobs_queue_go", // Cùng tên Queue với Publisher
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack: Đặt là false để Consumer tự tay xác nhận (quan trọng!)
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %v", err)
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf(" [Consumer] Đã nhận thông điệp: %s", d.Body)
			
			// Giả lập xử lý nặng
			time.Sleep(2 * time.Second) 
			
			// Gửi tín hiệu ACK: Báo cho RabbitMQ rằng thông điệp đã được xử lý thành công
			d.Ack(false) 
			log.Println(" [Consumer] Đã xử lý và gửi ACK.")
		}
	}()

	log.Printf(" [*] Đang chờ thông điệp. Để thoát, nhấn CTRL+C")
	<-forever
}
```

---

### 5.2. Java (Consumer & Publisher - Dùng Spring Boot & AMQP)

Trong môi trường Java hiện đại, **Spring Boot** với thư viện **Spring AMQP** là cách tiêu chuẩn để làm việc với RabbitMQ.

#### Dependency (pom.xml)

Bạn cần thêm `spring-boot-starter-amqp` vào project Spring Boot của mình.

XML

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</groupId>
```

#### Publisher (Java - Spring Component)

Đây là một service đơn giản sử dụng `RabbitTemplate` của Spring để gửi thông điệp.

Java

```
package com.example.pubsubdemo;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitPublisher {

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private Queue jobsQueue;

    public void publishJob(String jobData) {
        System.out.println("[Publisher] Đang gửi thông điệp: " + jobData);
        // Gửi thông điệp trực tiếp vào queue đã khai báo
        this.template.convertAndSend(jobsQueue.getName(), jobData); 
        System.out.println("[Publisher] Gửi thành công.");
    }
}
```

#### Consumer (Java - Spring Component)

Consumer sử dụng Annotation `@RabbitListener` để tự động lắng nghe và tiêu thụ thông điệp từ Queue.

```
package com.example.pubsubdemo;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitConsumer {

    @RabbitListener(queues = "jobs-queue-java")
    public void receiveJob(String message) {
        System.out.println(" [Consumer] Đã nhận thông điệp: '" + message + "'");
        
        try {
            // Giả lập xử lý nặng
            Thread.sleep(3000); 
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Spring AMQP sẽ tự động gửi ACK sau khi phương thức này chạy xong
        // Trừ khi có Exception xảy ra (khi đó nó sẽ NACK - Not Acknowledge)
        System.out.println(" [Consumer] Xử lý xong thông điệp: '" + message + "'");
    }
}
```

#### Config (Java - Khai báo Queue)

Trong một lớp cấu hình bất kỳ, bạn cần khai báo Queue để Spring và RabbitMQ hiểu.

Java

```
package com.example.pubsubdemo;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public Queue jobsQueue() {
        // Khai báo Queue, tên phải khớp với Consumer
        return new Queue("jobs-queue-java"); 
    }
    
    // Đảm bảo cấu hình kết nối RabbitMQ trong application.properties
    // spring.rabbitmq.host=localhost
    // spring.rabbitmq.port=5672
    // ...
}
```

### So sánh trong Pub/Sub

| **Đặc điểm** | **Golang (streadway/amqp)** | **Java (Spring AMQP)** |
| --- | --- | --- |
| **Tính bất đồng bộ** | Dễ dàng quản lý với **Goroutines** và `select/channels`. | Sử dụng **Executor** hoặc **`@Async`** trong cấu hình của Spring. |
| **Acknowledgement** | Phải gọi `d.Ack(false)` thủ công sau khi xử lý. | **Tự động** (Automatic) theo mặc định, dựa trên việc phương thức `receiveJob` có ném Exception hay không. |
| **Cấu hình** | Code trực tiếp (Low-level AMQP) | Dùng **Annotations** và **Beans** (High-level Spring Abstraction). |

Việc lựa chọn ngôn ngữ sẽ phụ thuộc vào ưu tiên về **hiệu năng** (Golang) hay **tốc độ phát triển/hệ sinh thái** (Java/Spring).
