---
title: 'Docker Core Architecture: Hiểu Sâu Về Workflow "Build - Ship - Run"'
date: '2026-02-02 00:55:04'
date_gmt: '2026-02-01 17:55:04'
modified: '2026-02-02 00:55:04'
status: publish
slug: docker-core-architecture-hieu-sau-ve-workflow-build-ship-run
wordpress_id: 647
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/02/02/docker-core-architecture-hieu-sau-ve-workflow-build-ship-run/
categories:
- Uncategorized
tags: []
---

Trong thế giới Cloud Native ngày nay, Docker (và hệ sinh thái container nói chung) đã trở thành tiêu chuẩn công nghiệp cho việc quản lý phần mềm. Tuy nhiên, thay vì sa đà vào hàng loạt công cụ mới, chúng ta cần nắm vững nền tảng đã khởi tạo nên cuộc cách mạng này từ năm 2013.

Đó chính là workflow cốt lõi: **Build - Ship - Run**.

Đây không chỉ là slogan của Docker, mà là tư duy nền tảng được áp dụng cho cả Kubernetes, Helm và toàn bộ hệ sinh thái CNCF (Cloud Native Computing Foundation). Bài viết này sẽ phân tích sâu ba trụ cột này dưới góc độ kỹ thuật thực tế.

---

## 1. Build: Docker Image – Đóng Gói Ứng Dụng Vạn Năng

Trước đây, vấn đề lớn nhất của triển khai phần mềm là sự không tương thích về môi trường (dependency hell). Docker giải quyết việc này bằng **Docker Image** (hiện nay đã được chuẩn hóa thành **OCI Image Standard**).

### Cơ chế hoạt động: Layering (Lớp)

Một Docker Image không phải là một file nguyên khối, mà là tập hợp các lớp (layers) chồng lên nhau theo chỉ dẫn trong `Dockerfile`.

Hãy xem xét một `Dockerfile` mẫu cho ứng dụng Python:

Dockerfile

```
# 1. Base Image: Chỉ chứa binaries và libraries cần thiết cho Python
FROM python:3.9-slim

# 2. Dependencies: Cài đặt thư viện
RUN pip install flask

# 3. Metadata: Thiết lập thư mục làm việc
WORKDIR /app

# 4. Source Code: Copy mã nguồn vào image
COPY . .
```

**Phân tích kỹ thuật:**

- **FROM:** Bắt đầu từ một image gốc (Base image). Image này chứa mọi thứ ứng dụng cần (ví dụ: OpenSSL, Python binaries) nhưng *không* chứa Linux Kernel hay Host drivers.
- **Layering:** Mỗi lệnh `RUN`, `COPY`, `ADD` sẽ tạo ra một layer mới. Các layer này được xếp chồng lên nhau như một chiếc bánh.
- **Immutability (Tính bất biến):** Khi image đã được build, các file và quyền hạn (permissions) bên trong là cố định.

### Best Practices: Tối ưu hóa Layer

Trong môi trường production, thứ tự lệnh trong Dockerfile cực kỳ quan trọng để tận dụng Docker Cache.

> **✅ Best Practice:** Luôn copy file định nghĩa dependency (như `requirements.txt` hay `package.json`) và chạy lệnh cài đặt trước khi copy toàn bộ mã nguồn (`COPY . .`).
>
> **Lý do:** Docker cache các layer dựa trên sự thay đổi của file. Mã nguồn thay đổi thường xuyên, còn thư viện thì ít hơn. Việc tách lớp giúp bạn không phải cài lại thư viện mỗi khi sửa một dòng code, tăng tốc độ build đáng kể.

---

## 2. Ship: Docker Registry – Phân Phối Ứng Dụng

Sau khi `docker build` tạo ra image, chúng ta cần cơ chế để di chuyển nó từ máy Dev sang môi trường Test hoặc Production. Đây là vai trò của **Registry**.

### OCI Distribution Spec

Docker Registry hoạt động dựa trên chuẩn phân phối OCI. Dù bạn dùng Docker Hub, AWS ECR, GitLab Registry hay tự host một private registry, cơ chế hoạt động đều giống nhau.

### Quy trình đẩy và kéo (Push & Pull)

1. **Định danh (Hashing):** Mỗi image sau khi build sẽ có một SHA hash duy nhất. Hash này đại diện cho toàn bộ các layer và metadata. Nếu hai server khác nhau có cùng một SHA hash, ta đảm bảo 100% rằng nội dung file và môi trường bên trong là giống hệt nhau.
2. **Phân phối:** Lệnh `docker push` đẩy các layer lên Registry. Lệnh `docker pull` tải chúng về server đích.

### Tính nhất quán (Consistency)

Đây là giá trị lớn nhất của Docker. Nếu bạn build image trên CentOS và chạy nó trên Ubuntu, ứng dụng vẫn hoạt động y hệt.

- **Lý do:** Image mang theo toàn bộ user-space dependencies của nó. Nó không quan tâm distro của máy chủ (Host OS), miễn là máy chủ chạy Linux Kernel tương thích.

> **⚠️ Anti-pattern:** Sử dụng tag `:latest` trong production.
>
> **Hậu quả:** Bạn không thể biết chính xác phiên bản code nào đang chạy. Nếu cần rollback, bạn sẽ gặp rắc rối lớn. **Giải pháp:** Luôn tag image bằng phiên bản cụ thể (ví dụ: `v1.0.1`) hoặc commit SHA (ví dụ: `git-a1b2c3d`).

---

## 3. Run: Docker Container – Môi Trường Thực Thi

Khi đã có Image trên server đích, lệnh `docker run` sẽ khởi tạo **Container**.

### Container thực chất là gì?

Nhiều người lầm tưởng Container là một "máy ảo nhẹ". Thực tế, Container là một process (tiến trình) trên Linux được cô lập bằng công nghệ **Namespaces** và **Cgroups**.

Khi bạn chạy một container:

1. **Filesystem Isolation:** Container nhìn thấy hệ thống file riêng (được tạo ra từ Image), không nhìn thấy file của máy chủ (trừ khi được mount volume).
2. **Network Isolation:** Nó có IP riêng, stack mạng ảo riêng.
3. **Process Isolation:** Tiến trình bên trong container (PID 1) không nhìn thấy các tiến trình khác của hệ điều hành.

### Khả năng mở rộng (Scalability)

Vì Container được sinh ra từ một Image bất biến (Read-only template), bạn có thể chạy hàng trăm container giống hệt nhau song song.

Ví dụ: Bạn có thể chạy 5 container Python giống hệt nhau để chịu tải (Load Balancing). Nếu container số 2 thay đổi một file tạm, container số 1 sẽ không hề biết và không bị ảnh hưởng.

> **✅ Best Practice: Stateless Application** Hãy thiết kế ứng dụng trong container theo mô hình "Stateless" (không lưu trạng thái).
>
> **Lý do:** Container có thể bị tiêu diệt và tạo mới bất cứ lúc nào (đặc biệt trong Kubernetes). Dữ liệu quan trọng phải được lưu ở Database hoặc Persistent Volume bên ngoài, không lưu trong file system của container.

---

## Kết luận

Docker đã trải qua nhiều thay đổi, nhưng nguyên lý **Build - Ship - Run** vẫn là kim chỉ nam cho mọi kỹ sư DevOps:

1. **Build:** Đóng gói ứng dụng và dependency thành một đơn vị duy nhất (Image).
2. **Ship:** Phân phối Image đó thông qua Registry với độ tin cậy tuyệt đối nhờ SHA hash.
3. **Run:** Thực thi ứng dụng trong môi trường cô lập, độc lập với hạ tầng máy chủ.

Hiểu rõ ba bước này là nền tảng bắt buộc trước khi bạn muốn chinh phục các hệ thống phức tạp hơn như Kubernetes.
