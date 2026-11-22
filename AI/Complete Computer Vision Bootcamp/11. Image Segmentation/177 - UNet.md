---
title: 'Bài 177 — U-Net và vì sao vượt FCN'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 177
status: edited
source: '177 - UNet.md'
categories:
- AI
tags: []
---
# 🩺 U-Net: kiến trúc chữ U cho segmentation

> Nguồn: `177 - UNet.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214095)

Chào các bạn! **U-Net** là FCN nổi tiếng với kiến trúc **hình chữ U**, ban đầu dành cho **biomedical image segmentation**. Nó vẫn chạy tốt ở nhiều lĩnh vực khác và đặc biệt hợp với **dataset nhỏ**. Bài này ta xem cấu tạo và lý do U-Net vượt FCN.

### 🧩 Cấu tạo

U-Net là một **FCN** gồm hai nửa:

* **Contracting path (encoder)** — phần bên trái, **nén** dữ liệu, giảm dần độ phân giải.
* **Expanding path (decoder)** — phần bên phải, **giải nén**, tăng dần độ phân giải.

Nối hai nửa là các **skip connection** (mũi tên xám trong sơ đồ): đặc trưng từ tầng encoder được đưa sang tầng decoder **cùng mức**. Nhờ đó U-Net có thể segment với **rất ít mẫu train**.

### 🆚 U-Net hơn FCN ở đâu?

**1. Kết nối encoder → decoder trực tiếp.**
FCN lấy skip từ pool3, pool4, pool5 rồi gộp vào output. U-Net **nối trực tiếp** từng tầng encoder với tầng decoder tương ứng, truyền **fine detail bị mất khi encode** ở **nhiều độ phân giải**.

**2. Thiết kế đối xứng hình chữ U.**
Decoder **mô phỏng lại** (mirror) contracting path, không chỉ đơn thuần upsample. Nhờ vậy việc giải nén tái tạo thông tin tốt hơn.

**3. Xử lý object nhỏ tốt hơn.**
FCN với downsampling mạnh dễ mất chi tiết object nhỏ. U-Net giữ **fine-grained detail** nhờ skip connection cùng mức.

**4. Refine sau upsampling.**
FCN chủ yếu dùng transposed convolution để upsample. U-Net dùng thêm **convolution** sau upsampling để tinh chỉnh feature → **localization tốt hơn**.

**5. Dataset nhỏ.**
FCN cần nhiều dữ liệu; U-Net học hiệu quả với **ít ảnh** (kể cả nhờ data augmentation nội bộ).

### 📄 Kiến trúc trong paper (2015)

Paper U-Net công bố năm **2015** trên arXiv. Quy ước ký hiệu:

* **Mũi tên xanh** — convolution **3×3** kèm **ReLU**.
* **Mũi tên xám** — **copy and crop** rồi nối sang decoder.
* **Mũi tên đỏ** — **maxpool 2×2** (giảm chiều).
* **Upsampling 2×2** ở nhánh decoder.
* **Conv 1×1** ở cuối để giảm channel về **số label**.

Paper dùng input **572×572** cho output **388×388** (do dùng valid convolution nên kích thước co lại). Segmentation output **không nhất thiết** cùng kích thước input, miễn là ảnh phân loại pixel.

### 🔁 Mẫu lặp lại

Kiến trúc rất đơn giản vì lặp đi lặp lại một pattern: **hai conv 3×3** ở mỗi mức, số channel **tăng gấp đôi** dần:

```text
64 → 128 → 256 → 512 → 1024 (bottleneck)
```

Ở nhánh decoder, mỗi bước **upsample 2×2**, **concatenate** feature cùng mức từ encoder, rồi **hai conv 3×3**; channel giảm dần:

```text
1024 → 512 → 256 → 128 → 64
```

Cuối cùng là **một conv 1×1** duy nhất để ra mask với số channel = số class. Ví dụ kích thước điển hình: 64×64 → 32×32 sau pooling, rồi decoder đưa ngược lên.

---
### ✅ Tóm lại

U-Net = encoder nén + decoder giải nén + skip connection cùng mức. Nó giữ chi tiết tốt hơn FCN, xử lý object nhỏ tốt hơn, và học được với dataset nhỏ — lý do nó là lựa chọn hàng đầu cho segmentation cần độ chính xác không gian cao, đặc biệt ảnh y sinh (tế bào, khối u đều nhỏ). Bài sau ta **cài đặt và train U-Net bằng PyTorch**. Hẹn gặp!
