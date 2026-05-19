---
title: 'Fundamentals of Backend 6: Short Polling - "Xong chưa? Xong chưa? Xong chưa?"'
date: '2025-12-07 02:08:53'
date_gmt: '2025-12-06 19:08:53'
modified: '2026-01-21 15:24:09'
status: publish
slug: back-end-6-short-polling-xong-chua-xong-chua-xong-chua
wordpress_id: 597
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/back-end-6-short-polling-xong-chua-xong-chua-xong-chua/
categories:
- Back End
tags: []
---

Trong bài trước, chúng ta đã nói về việc Server chủ động "đẩy" (Push) dữ liệu xuống Client. Tuy nhiên, không phải lúc nào hạ tầng cũng hỗ trợ WebSocket hoặc kết nối hai chiều (Bidirectional). Đôi khi, chúng ta phải quay về với HTTP truyền thống.

Nhưng vấn đề nảy sinh: Làm gì khi một Request tốn quá nhiều thời gian để xử lý?

Ví dụ: Upload một video 4K lên YouTube, export một báo cáo tài chính nặng 5GB, hay resize hàng nghìn tấm ảnh.

Nếu Client gửi request và cứ treo kết nối chờ đợi (Synchronous), khả năng cao là sẽ bị **Timeout** hoặc trải nghiệm người dùng cực tệ (đơ màn hình). Đây là lúc **Short Polling** tỏa sáng.

## 1. Short Polling là gì?

**Short Polling** (hay thường gọi tắt là Polling) là kỹ thuật mà Client liên tục gửi các request ngắn đến Server để kiểm tra trạng thái của một tác vụ đang chạy nền.

Hãy tưởng tượng bạn ngồi trên xe taxi và liên tục hỏi tài xế:

- *Bạn: "Tới nơi chưa anh?"*
- *Tài xế: "Chưa."*
- *(5 giây sau)*
- *Bạn: "Tới nơi chưa anh?"*
- *Tài xế: "Chưa."*
- *(5 giây sau)*
- *Bạn: "Tới nơi chưa anh?"*
- *Tài xế: "Rồi!"*

### Cơ chế hoạt động

Thay vì giữ kết nối mở cho đến khi xong việc (như Long Polling hay Sync Request), quy trình Short Polling diễn ra như sau:

1. **Submit:** Client gửi request để bắt đầu công việc (ví dụ: upload video).
2. **Immediate Response:** Server nhận việc, **trả về ngay lập tức** một cái "vé" (Job ID, Task ID) và bắt đầu xử lý ngầm (Asynchronous).
3. **Poll:** Client dùng Job ID đó, định kỳ gửi request hỏi: *"Job ID này xong chưa?"*.
4. **Check:**
   - Nếu chưa xong: Server trả về trạng thái "Processing" hoặc tiến độ (%).
   - Nếu xong: Server trả về kết quả "Completed" kèm dữ liệu.

## 2. Ưu và Nhược điểm

Mọi thiết kế đều có sự đánh đổi (Trade-off).

| **Ưu điểm (Pros)** | **Nhược điểm (Cons)** |
| --- | --- |
| **Dễ triển khai:** Cả Client và Server đều rất đơn giản, chỉ là các HTTP request cơ bản, không cần protocol phức tạp như WebSocket. | **Rất "Chatty" (Nhiều lời):** Client gửi quá nhiều request dư thừa chỉ để nhận câu trả lời "Chưa xong". |
| **Hỗ trợ Long-running task:** Client có thể tắt máy, đi ngủ, hôm sau mở lên dùng Job ID check lại vẫn được (nếu Server có lưu Job ID vào Database). | **Tốn băng thông mạng:** Mỗi request đều tốn header, handshake... gây lãng phí tài nguyên mạng. |
| **Server kiểm soát được:** Server có thể xử lý tác vụ bất đồng bộ (async) mà không lo giữ kết nối quá lâu gây nghẽn port. | **Lãng phí tài nguyên Server:** Server phải tốn CPU để parse request, query DB chỉ để trả về "Chưa xong". |


---

## 3. Thực hành: Xây dựng hệ thống Job Progress

Chúng ta sẽ xây dựng một ví dụ giả lập việc xử lý một tác vụ nặng (cập nhật tiến độ 10% mỗi 3 giây).

### Kịch bản

1. **POST /submit**: Tạo job mới, trả về `jobId`.
2. **GET /check?jobId=...**: Trả về tiến độ hiện tại.

### 3.1. Node.js (Express)

Node.js rất mạnh về xử lý bất đồng bộ, cực kỳ phù hợp để demo pattern này.1

JavaScript

```
const express = require('express');
const app = express();
const PORT = 8080;

// Bộ nhớ tạm lưu trữ các jobs
const jobs = {};

// Hàm giả lập update tiến độ
function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    console.log(`Job ${jobId} updated to ${prg}%`);
    
    if (prg < 100) {
        setTimeout(() => {
            updateJob(jobId, prg + 10);
        }, 3000); // Tăng 10% mỗi 3 giây
    }
}

// 1. Endpoint gửi yêu cầu xử lý
app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0; // Khởi tạo 0%
    
    // Bắt đầu xử lý background (không block request hiện tại)
    updateJob(jobId, 0); 
    
    // Trả về ngay lập tức
    res.json({ jobId: jobId, status: "Job created" });
});

// 2. Endpoint để Client Short Poll
app.get('/checkstatus', (req, res) => {
    const jobId = req.query.jobId;
    
    if (jobs[jobId] === undefined) {
        return res.status(404).json({ error: "Job not found" });
    }

    const progress = jobs[jobId];
    res.json({ 
        jobId: jobId, 
        progress: progress,
        status: progress >= 100 ? "Completed" : "Processing"
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 3.2. Java (Spring Boot Style)

Trong Java, chúng ta sẽ dùng một luồng riêng (`Thread` hoặc `CompletableFuture`) để xử lý tác vụ nền để không chặn luồng chính của Web Server.2

Java

```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import java.util.UUID;

@SpringBootApplication
@RestController
public class PollingApp {

    // Sử dụng ConcurrentHashMap để thread-safe
    private Map<String, Integer> jobs = new ConcurrentHashMap<>();

    public static void main(String[] args) {
        SpringApplication.run(PollingApp.class, args);
    }

    @PostMapping("/submit")
    public Map<String, String> submitJob() {
        String jobId = UUID.randomUUID().toString();
        jobs.put(jobId, 0);

        // Chạy tác vụ trong một Thread riêng biệt (Background processing)
        new Thread(() -> {
            try {
                for (int i = 0; i <= 100; i += 10) {
                    jobs.put(jobId, i);
                    Thread.sleep(3000); // Giả lập xử lý nặng
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        return Map.of("jobId", jobId, "status", "Job Started");
    }

    @GetMapping("/checkstatus")
    public Map<String, Object> checkStatus(@RequestParam String jobId) {
        if (!jobs.containsKey(jobId)) {
            return Map.of("error", "Job not found");
        }

        int progress = jobs.get(jobId);
        return Map.of(
            "jobId", jobId,
            "progress", progress,
            "status", progress >= 100 ? "Completed" : "Processing"
        );
    }
}
```

### 3.3. Go (Golang)

Go sử dụng **Goroutines** để xử lý background task cực kỳ nhẹ nhàng và hiệu quả.

Go

```
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"
)

// Map lưu jobs và Mutex để tránh race condition
var jobs = make(map[string]int)
var mu sync.Mutex

func submitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	jobID := fmt.Sprintf("job-%d", time.Now().UnixNano())
	
	mu.Lock()
	jobs[jobID] = 0
	mu.Unlock()

	// Goroutine: Chạy ngầm xử lý công việc
	go func(id string) {
		for i := 0; i <= 100; i += 10 {
			mu.Lock()
			jobs[id] = i
			mu.Unlock()
			
			// Giả lập tốn thời gian
			time.Sleep(3 * time.Second)
		}
	}(jobID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"jobId": jobID, 
		"status": "Job Created",
	})
}

func checkStatusHandler(w http.ResponseWriter, r *http.Request) {
	jobID := r.URL.Query().Get("jobId")

	mu.Lock()
	progress, exists := jobs[jobID]
	mu.Unlock()

	if !exists {
		http.Error(w, "Job not found", http.StatusNotFound)
		return
	}

	status := "Processing"
	if progress >= 100 {
		status = "Completed"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"jobId":    jobID,
		"progress": progress,
		"status":   status,
	})
}

func main() {
	http.HandleFunc("/submit", submitHandler)
	http.HandleFunc("/checkstatus", checkStatusHandler)

	fmt.Println("Server running on :8080")
	http.ListenAndServe(":8080", nil)
}
```

## 4. Khi nào nên dùng Short Polling?

Đừng lạm dụng nó. Hãy dùng khi:

1. **Task kéo dài:** Thời gian xử lý lâu hơn timeout của HTTP request thông thường.
2. **Client đơn giản:** Bạn không muốn hoặc không thể thiết lập WebSocket (ví dụ: client là các thiết bị IoT đời cũ, hoặc bị chặn bởi tường lửa doanh nghiệp khắt khe).
3. **Tần suất thấp:** Số lượng người dùng không quá lớn để làm nghẽn server bởi các request polling.

## 5. Lời kết

Short Polling giống như việc bạn F5 trang web liên tục. Nó đơn giản, hiệu quả cho nhiều bài toán, nhưng "đắt đỏ" về tài nguyên mạng.

Trong bài học tiếp theo, chúng ta sẽ tìm hiểu về người anh em thông minh hơn của nó: **Long Polling** (được sử dụng bởi Kafka và nhiều hệ thống chat thời kỳ đầu) để khắc phục nhược điểm "spam request" của Short Polling.
