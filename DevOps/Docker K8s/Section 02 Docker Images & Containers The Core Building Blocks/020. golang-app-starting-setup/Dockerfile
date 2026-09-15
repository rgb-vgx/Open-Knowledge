# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY server.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /main

# Run stage
FROM alpine:3.21
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /main .
COPY --from=builder /app/public ./public
EXPOSE 80
CMD ["./main"]