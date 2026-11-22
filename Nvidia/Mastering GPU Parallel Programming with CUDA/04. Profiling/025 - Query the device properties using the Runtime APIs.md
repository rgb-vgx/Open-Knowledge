---
title: 'Truy vấn thuộc tính GPU bằng CUDA Runtime API'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 25
status: edited
source: '025 - Query the device properties using the Runtime APIs.md'
categories:
- Nvidia
tags: []
---

# 🔎 Truy vấn thuộc tính GPU bằng CUDA Runtime API

> Nguồn: `025 - Query the device properties using the Runtime APIs.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33805766)

Thay vì lật whitepaper để tìm giới hạn phần cứng, các bạn có thể hỏi thẳng GPU thông qua **CUDA Runtime API**. Bài này viết một chương trình nhỏ chỉ để đọc thuộc tính thiết bị, và quan trọng hơn là hiểu cách các hàm runtime trả kết quả.

### 🧰 Runtime API là gì

**CUDA Runtime API** cung cấp giao diện bậc cao cho CUDA: quản lý thiết bị, cấp phát bộ nhớ và chạy kernel song song. Nó cho phép lập trình viên khai thác GPU NVIDIA mà không phải đọc hết tài liệu chi tiết.

Ví dụ, thay vì tra whitepaper xem **số thread tối đa mỗi block** là bao nhiêu, chỉ cần gọi một hàm để GPU tự trả lời. Đây là cách tiết kiệm thời gian so với đọc tài liệu.

Toàn bộ danh sách hàm nằm trên trang CUDA Runtime API của NVIDIA, chia theo nhóm: quản lý thiết bị, xử lý bộ nhớ, tính toán bất đồng bộ.

---

### 🖥️ cudaGetDeviceCount và cudaGetDeviceProperties

Hàm phổ biến nhất là **`cudaGetDeviceProperties`**, đọc thuộc tính và khả năng của GPU. Nó cho biết tên GPU, tổng **global memory**, số thread tối đa mỗi block, **compute capability** và nhiều chỉ số khác.

Chương trình mẫu không có kernel nào, vì mục đích chỉ là truy vấn:

```cuda
#include <stdio.h>

int main() {
    int nDevice;
    cudaGetDeviceCount(&nDevice);          // tổng số GPU NVIDIA trong máy

    for (int i = 0; i < nDevice; i++) {
        cudaDeviceProp prop;
        cudaGetDeviceProperties(&prop, i); // đọc thuộc tính GPU thứ i

        printf("Device %d: %s\n", i, prop.name);
        printf("Memory clock rate: %d kHz\n", prop.memoryClockRate);
        printf("Memory bus width: %d bit\n", prop.memoryBusWidth);
        printf("Total global memory: %zu bytes\n", prop.totalGlobalMem);
        printf("SM count: %d\n", prop.multiProcessorCount);
        printf("Max threads per block: %d\n", prop.maxThreadsPerBlock);
        printf("Max threads dim: %d %d %d\n",
               prop.maxThreadsDim[0], prop.maxThreadsDim[1], prop.maxThreadsDim[2]);
        printf("Max grid size: %d %d %d\n",
               prop.maxGridSize[0], prop.maxGridSize[1], prop.maxGridSize[2]);
    }
    return 0;
}
```

Biên dịch và chạy bằng **nvcc**:

```bash
nvcc -o runtime_api "section04_runtime_api.cu"
./runtime_api
```

---

### 📊 Đọc các thông số quan trọng

Kết quả trên máy của giảng viên (**GeForce RTX 3090**) đối chiếu với techpowerup:

* **Tên GPU**: GeForce RTX 3090.
* **Memory clock rate**: một số rất lớn, đơn vị kHz.
* **Memory bus width**: **384 bit** — khớp thông số công bố.
* **Peak memory bandwidth**: giảng viên in giá trị **đỉnh** (không phải giá trị thực đo, vì chương trình không tính toán gì). Đây là chỉ số rất quan trọng khi so sánh hiệu năng các ứng dụng sau này.
* **Tổng global memory**: chia lần lượt cho 1024 ba lần được khoảng **24 GB** — đúng.
* **Compute capability**: **8.6**, thuộc nhóm cao nhất trên thị trường.
* **Số SM**: **82**.
* **Max threads/block**: **1024**.
* **Max threads theo chiều**: x = **1024**, y = **1024**, z = **64**. Riêng z chỉ chứa được **2 warp**.
* **Max grid size**: rất lớn ở x, nhỏ hơn ở y, và z bằng y.

Từ `maxThreadsPerBlock = 1024` suy ra **số warp tối đa mỗi block** = 1024 / 32 = **32 warp**. Cần phân biệt **block** (phần mềm) với **SM** (phần cứng): mỗi block chạy trên một SM.

---

### ⚙️ Ba điểm cần nhớ về Runtime API

1. Các hàm này **không trả kết quả qua giá trị return**. Kết quả được ghi vào một tham số con trỏ truyền vào, ví dụ `cudaGetDeviceCount(&nDevice)` ghi số GPU vào `nDevice`.
2. Giá trị return là **trạng thái thực thi**: thành công hoặc một mã lỗi. Mã lỗi có thể lưu lại và phân tích để biết vì sao hàm thất bại.
3. Dùng Runtime API **tiết kiệm nhiều thời gian** so với đọc whitepaper, nhất là khi cần nhiều chỉ số mà bảng trong whitepaper không liệt kê đủ.

---

### ✅ Chốt lại

`cudaGetDeviceProperties` biến whitepaper thành một lời gọi hàm: tên GPU, bộ nhớ, số SM, giới hạn thread/grid đều lấy được trực tiếp. Nhớ hai quy ước: kết quả nằm ở tham số, còn return là mã lỗi. Các giá trị này sẽ được dùng lại liên tục khi phân tích hiệu năng ở các bài sau.
