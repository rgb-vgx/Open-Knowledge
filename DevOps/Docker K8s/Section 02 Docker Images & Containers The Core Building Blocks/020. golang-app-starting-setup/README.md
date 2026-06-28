# Thực Hành Docker với Golang: Ứng Dụng Goal Tracker

Tài liệu thực hành này là phiên bản Golang tương ứng của dự án Node.js ở phần trên, giúp bạn hiểu rõ hơn về cách Docker hóa một ứng dụng backend viết bằng Go.

---

## 1. Giải Phẫu Dự Án Golang

Cấu trúc thư mục dự án:

* **`server.go`**: File chính chứa logic HTTP Web Server, tương đương với `server.js` trong Node.js phiên bản. Server lắng nghe ở cổng 80, xử lý route `GET /` và `POST /store-goal`.
* **Thư mục `public/`**: Chứa file `styles.css` cho giao diện tĩnh.
* **`go.mod`**: File khai báo module và phiên bản Go, tương đương với `package.json` trong Node.js (nhưng đơn giản hơn vì Go không cần dependencies bên ngoài cho trường hợp này).

---

## 2. Chạy Thử Local (Không Dùng Docker)

Nếu muốn chạy trực tiếp trên máy:

1. Mở terminal tại thư mục dự án
2. Chạy lệnh: `go mod tidy` (nếu cần thiết khai dependencies)
3. Chạy lệnh: `go run server.go`

Truy cập `http://localhost` để xem ứng dụng.

---

## 3. Chú Ý Khi Docker Hóa Golang

Khác với Node.js cần `npm install` để tải dependencies, Go biên dịch thành binary cho nên:

* **Ưu điểm**: Binary tĩnh, không phụ thuộc môi trường runtime
* **Cách tiếp cận Dockerfile**: Sử dụng multi-stage build
  * Stage 1: Dùng `golang:alpine` để build binary
  * Stage 2: Copy binary vào `scratch` hoặc `alpine` để chạy

---

## 4. Ví Dụ Dockerfile (Multi-stage)

```dockerfile
# Build stage
FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY server.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /main

# Run stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /main .
COPY --from=builder /app/public ./public
CMD ["./main"]
```

---

## 5. Kết Nối Với Nội Dung Node.js

| Node.js | Golang |
|---------|--------|
| `server.js` | `server.go` |
| `package.json` | `go.mod` |
| `npm install` | `go mod tidy` |
| `node server.js` | `go run server.go` hoặc binary |
| Dependencies nhiều | Standard library hoặc ít dependencies |