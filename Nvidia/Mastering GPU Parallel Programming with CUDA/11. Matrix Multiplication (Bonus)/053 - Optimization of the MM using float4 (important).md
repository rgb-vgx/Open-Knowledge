---
title: 'Matrix multiplication: nạp float4 và loop unrolling'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 53
status: edited
source: '053 - Optimization of the MM using float4 (important).md'
categories:
- Nvidia
tags: []
---

# 📦 float4: một lệnh, bốn phần tử

> Nguồn: `053 - Optimization of the MM using float4 (important).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46549301)

Naive bị chặn ở cả hai phía — compute và memory — theo roofline. Tối ưu này đánh **cả hai cùng lúc**: giảm số instruction bằng **loop unrolling**, và giảm số lần truy cập bộ nhớ bằng **`float4`**. Kernel từ 250 µs xuống **148 µs**.

### 🔁 Loop unrolling — giảm instruction thừa

Vòng lặp tích lũy có 2 phép toán mỗi vòng: một nhân, một cộng. Nhưng bản thân vòng lặp cũng tốn instruction: tăng biến đếm, so sánh điều kiện, nhảy. Unrolling gộp nhiều phần tử vào một vòng để giảm phần overhead đó.

Ở bản `float4`, mỗi thread phụ trách **bốn** phần tử C liên tiếp thay vì một. Thay cho một biến `sum`, dùng bốn biến `sum[0..3]`: mỗi vòng lặp `k` sinh ra **bốn** phép nhân-cộng độc lập thay vì một, tương đương **unroll mức 4** (code đầy đủ ở mục *Tính toán với bốn sum* bên dưới). Bốn `sum[i]` độc lập nhau nên **phá được dependency chain** — phép nhân sau không phải chờ phép cộng trước hoàn tất, các pipeline có việc làm song song. Đây là lý do dùng **bốn biến sum** thay vì một.

---

### 🧱 Vì sao phải là `float4`

Unrolling giảm instruction tính toán, nhưng không giảm số lần đọc bộ nhớ — mỗi phần tử vẫn là một lệnh load. Muốn giảm cả hai phải gộp load.

`float4` là kiểu dựng sẵn của CUDA: một struct **16 byte** chứa bốn `float`, truy cập qua `.x`, `.y`, `.z`, `.w`. Load một `float4` là **một instruction** lấy **bốn** phần tử — nếu địa chỉ **căn 16 byte** và bốn phần tử **liền nhau trong bộ nhớ**.

Điều kiện "liền nhau" phụ thuộc cách lưu ma trận: CUDA lưu **row-major** — cả hàng nằm liên tiếp, hàng sau nối tiếp hàng trước. Vậy chỉ có thể gộp bốn phần tử **cùng hàng, khác cột**. Không thể gộp bốn phần tử khác hàng, vì chúng cách nhau đúng `N` phần tử.

Hệ quả trực tiếp: **vector hóa theo trục x (cột), không theo trục y (hàng)**.

---

### 🧵 Cấu hình thread mới

Tile vẫn 16×16, nhưng mỗi thread phụ trách **bốn** phần tử C thay vì một:

* **Trục y**: vẫn cần **16 thread**, mỗi thread một hàng của tile.
* **Trục x**: chỉ cần **4 thread** — 4 thread × 4 phần tử = 16 cột.

Block từ **16×16 = 256 thread** giảm còn **4×16 = 64 thread**, khối lượng việc mỗi thread tăng gấp bốn.

---

### 💾 Đoạn code nạp

```cuda
// mỗi thread nạp 4 float liền nhau từ global vào shared
*reinterpret_cast<float4*>(&sA[ty][tx * 4]) =
    *reinterpret_cast<const float4*>(&A[row * N + t * TILE + tx * 4]);
```

* `row * N` nhảy sang hàng cần lấy; `t * TILE` là điểm bắt đầu của tile thứ `t` trong chiều K; `tx * 4` là offset bên trong tile.
* `tx * 4` chứ không `tx`: thread 0 lấy cột 0–3, thread 1 lấy cột 4–7… nếu dùng `tx` thì các thread sẽ chồng lên nhau.
* `reinterpret_cast<float4*>` chỉ đổi **cách nhìn** vùng nhớ thành bốn `float` liền nhau, không copy dữ liệu. Dấu `*` phía trước là **dereference** — lấy giá trị bốn phần tử, không phải lấy địa chỉ. Không có cast này compiler cảnh báo vì kiểu con trỏ không khớp.

Phần B làm y hệt, vì với row-major thì bốn cột liên tiếp trong B cũng nằm liền nhau.

---

### ➗ Tính toán với bốn sum

```cuda
float sum[4] = {0.0f, 0.0f, 0.0f, 0.0f};
...
for (int k = 0; k < TILE; k++) {
    float4 b4 = *reinterpret_cast<float4*>(&sB[k][tx * 4]);
    sum[0] += sA[ty][k] * b4.x;
    sum[1] += sA[ty][k] * b4.y;
    sum[2] += sA[ty][k] * b4.z;
    sum[3] += sA[ty][k] * b4.w;
}
```

Một giá trị `sA[ty][k]` nhân với **bốn** phần tử liên tiếp của B, cộng vào bốn sum độc lập. Cuối cùng ghi bốn kết quả ra C — bốn phần tử C liền nhau trong bộ nhớ.

Vì mỗi `sum[i]` ứng với một phần tử C **khác nhau**, bốn sum không liên quan tới nhau về mặt dữ liệu — đó chính là điều giúp phá dependency.

---

### 📊 Kết quả

| Phiên bản | N = 512 |
|---|---|
| Naive | 360 µs |
| Tiling + shared memory | 250 µs |
| **Tiling + shared + float4/unroll** | **148 µs** |

Nhanh hơn naive **hơn 2 lần** và hơn bản shared memory khoảng **40%**. Kiểm chứng CPU/GPU vẫn cho kết quả đúng.

Trên roofline, giảng viên kỳ vọng phiên bản này đẩy điểm gần transition point hơn hai bản trước, nhờ tối ưu đồng thời cả compute lẫn memory — dù theo ông mức cải thiện vẫn chưa nhiều như mong đợi.

Còn một hướng nữa cho phần cứng chuyên dụng: tensor core, sẽ học ở các bài sau.
