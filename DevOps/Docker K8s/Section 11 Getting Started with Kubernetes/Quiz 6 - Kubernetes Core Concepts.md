# Quiz 6: Kiến Thức Cốt Lõi Kubernetes — Ôn Tập Tổng Hợp

## Giới Thiệu

Đây là bài quiz ôn tập toàn bộ kiến thức cốt lõi về Kubernetes từ Section 11. Hãy kiểm tra bạn đã nắm vững các khái niệm chưa trước khi chuyển sang phần thực hành.

---

## Câu Hỏi Ôn Tập

### Phần 1: Tổng Quan

**1. Kubernetes là gì?**
- A) Một cloud provider như AWS
- B) Hệ thống mã nguồn mở để quản lý container
- C) Một phần mềm ảo hóa máy
- D) Công cụ build Docker image

**2. Tại sao chúng ta cần Kubernetes khi đã có Docker?**
- A) Docker không chạy được trên production
- B) Docker không tự động scaling và phục hồi
- C) Docker quá chậm
- D) Docker không miễn phí

### Phần 2: Kiến Trúc

**3. Pod trong Kubernetes là gì?**
- A) Một server vật lý
- B) Đơn vị nhỏ nhất chứa container
- C) Một phần mềm quản lý
- D) Network proxy

**4. Worker Node bao gồm những thành phần nào?**
- A) Chỉ có container runtime
- B) kubelet, kube-proxy, container runtime
- C) API server và etcd
- D) Scheduler và controller

**5. Control Plane bao gồm những thành phần nào?**
- A) kubelet và kube-proxy
- B) API server, scheduler, controller manager, etcd
- C) Container runtime và Docker
- D) Pod và Service

### Phần 3: Khái Niệm

**6. Service trong Kubernetes dùng để làm gì?**
- A) Lưu trữ dữ liệu
- B) Tiếp cận nhóm Pod với IP cố định
- C) Quản lý image Docker
- D) Xây dựng application

**7. kubelet có chức năng gì?**
- A) Load balancing traffic
- B) Agent liên lạc với Master Node và quản lý Pod
- C) Lưu trữ dữ liệu cluster
- D) Triển khai container lên cloud

**8. Kubernetes không làm việc với cloud nào?**
- A) AWS
- B) Azure
- C) Google Cloud
- D) Không có đáp án đúng (Kubernetes hoạt động với mọi cloud)

### Phần 4: Ứng Dụng

**9. Khi container bị crash, Kubernetes sẽ làm gì?**
- A) Tắt toàn bộ cluster
- B) Tự động restart container
- C) Gửi email thông báo
- D) Xóa Pod vĩnh viễn

**10. autoscaling trong Kubernetes giúp ích gì?**
- A) Tăng RAM cho server
- B) Tự động thay đổi số lượng Pod theo traffic
- C) Nén dữ liệu
- D) Backup dữ liệu

---

## Đáp Án

1. **B** — Kubernetes là hệ thống mã nguồn mở để quản lý container
2. **B** — Docker không tự động scaling và phục hồi
3. **B** — Pod là đơn vị nhỏ nhất chứa container
4. **B** — kubelet, kube-proxy, container runtime
5. **B** — API server, scheduler, controller manager, etcd
6. **B** — Tiếp cận nhóm Pod với IP cố định
7. **B** — Agent liên lạc với Master Node và quản lý Pod
8. **D** — Kubernetes hoạt động với mọi cloud provider
9. **B** — Tự động restart container
10. **B** — Tự động thay đổi số lượng Pod theo traffic

---

## Tóm Tắt Kiến Thức

- **Kubernetes**: Hệ thống orchestration container mã nguồn mở
- **Pod**: Đơn vị nhỏ nhất, chứa container
- **Worker Node**: Máy chạy Pod với kubelet, kube-proxy, container runtime
- **Master Node**: Control Plane với API server, scheduler, controllers
- **Service**: Tiếp cận nhóm Pod với IP cố định
- **Self-healing**: Tự động restart container khi lỗi
- **Auto-scaling**: Tự động thay đổi số lượng Pod

> **Chúc mừng bạn đã hoàn thành Section 11! Hãy sẵn sàng cho phần thực hành trong Section tiếp theo.**
