---
title: 'Bài 090 — Resize, scale ảnh và các phép interpolation trong OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 90
status: edited
source: '090 - image Resizing, Scaling and interpolation.md'
categories:
- AI
tags: []
---

# 📐 Resize, scale ảnh và interpolation trong OpenCV

> Nguồn: `090 - image Resizing, Scaling and interpolation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48421065)

Chào các bạn! Bài này mình học cách **resize** và **scale** ảnh bằng OpenCV, đồng thời hiểu **interpolation** — thứ quyết định pixel mới được tính ra sao khi đổi kích thước. Cuối bài, các bạn sẽ biết chọn phương pháp interpolation nào cho từng tình huống.

### 🔎 Resizing và scaling khác nhau ở đâu?

**Image resizing** là chỉnh kích thước ảnh về một **width × height** cụ thể, *không* quan tâm aspect ratio. Ví dụ từ chuẩn **640×480** (tỉ lệ 4:3) kéo thành **1280×720** (tỉ lệ 16:9) — hình bị méo, các feature bị co giãn cho vừa khung mới.

**Image scaling** cũng đổi kích thước nhưng **giữ nguyên aspect ratio**. Ví dụ từ **HD 1280×720** lên **Full HD 1920×1080**, cả hai đều 16:9 nên ảnh trông vẫn đúng tỉ lệ, chỉ to ra.

Ta còn phân biệt hướng:

* **Upscaling** — từ nhỏ lên lớn.
* **Downscaling** — từ lớn xuống nhỏ.

Scaling được dùng để giảm dung lượng lưu trữ/truyền tải, để **normalize** kích thước input cho model machine learning, hoặc chuẩn bị ảnh cho thumbnail/poster.

---

### 🧠 Interpolation giải quyết chuyện gì?

**Interpolation** quyết định cách tính pixel khi phóng to hoặc thu nhỏ. Hình dung ảnh **2×2** gồm `a, b, c, d`, ta upscale gấp đôi thành **4×4**. Các pixel gốc được map vào, nhưng còn nhiều ô trống — lấp bằng giá trị gì? Đó là việc của interpolation.

Khi **downscale** thì ngược lại: có quá nhiều pixel, cần bỏ bớt mà vẫn giữ feature quan trọng. Thuật toán cũng do interpolation quyết định.

OpenCV cung cấp nhiều phương pháp, mình tập trung vào 5 cái phổ biến:

| Phương pháp | Cách tính |
|---|---|
| `cv2.INTER_NEAREST` | Lấy giá trị pixel **gần nhất** trong ảnh gốc |
| `cv2.INTER_LINEAR` | Lấy **trung bình** của các pixel lân cận |
| `cv2.INTER_CUBIC` | Dùng **16 pixel** gần nhất, cho kết quả mượt hơn |
| `cv2.INTER_AREA` | Trung bình pixel trong vùng ánh xạ sang pixel mới |
| `cv2.INTER_LANCZOS4` | Dùng **Lanczos kernel** trên vùng 8×8 lân cận, chất lượng cao nhưng tốn tính toán |

`INTER_NEAREST` là đơn giản nhất, cho kết quả **bị pixelate** vì chỉ copy giá trị gần nhất. `INTER_LINEAR` lấy trung bình nên tạo hiệu ứng **làm mượt** — trung bình nhiều giá trị sáng/tối sẽ ra một giá trị ở giữa. `INTER_CUBIC` mượt hơn linear, còn `INTER_LANCZOS4` cho chất lượng cao nhất nhưng chậm nhất.

---

### 🦒 So sánh trực quan trên ảnh hươu cao cổ

Mình thu nhỏ ảnh hươu thật bé rồi resize lại lên **600×600** bằng từng phương pháp:

* **Nearest** — thấy rõ các khối vuông, pixelate nặng.
* **Linear** — mượt hơn, ít răng cưa hơn.
* **Cubic** — nhiều màu gần giống thật hơn, mịn hơn linear.
* **Area** — gần giống nearest (cùng họ thuật toán).
* **Lanczos** — ít cạnh răng cưa nhất, đẹp nhất theo cảm nhận của mình.

Kết luận thực dụng: nếu có thời gian và sức tính toán, dùng **Lanczos** hoặc **Cubic**; nếu cần nhanh và đơn giản, dùng **Nearest**/`INTER_AREA`.

---

### 💻 Code resize và scale

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread("../giraffe-kenya.png")
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Resize: ép về đúng 400x400, không giữ aspect ratio
resized_image = cv2.resize(image_rgb, (400, 400))
```

Lưu ý thứ tự: tuple là **(width, height)**, còn `image.shape` trả về **(height, width, channels)**.

Với scaling, tự tính kích thước theo phần trăm để giữ tỉ lệ:

```python
scale_percent = 50
new_width = int(image_rgb.shape[1] * scale_percent / 100)
new_height = int(image_rgb.shape[0] * scale_percent / 100)

scaled_image = cv2.resize(
    image_rgb,
    (new_width, new_height),
    interpolation=cv2.INTER_AREA
)
```

`shape[1]` là width, `shape[0]` là height. Mình dùng `INTER_AREA` cho downscale vì nó phù hợp khi thu nhỏ.

---

### 🔁 Quét qua mọi interpolation

Để so sánh, gom các phương pháp vào một dictionary rồi lặp:

```python
methods = {
    "nearest": cv2.INTER_NEAREST,
    "linear": cv2.INTER_LINEAR,
    "cubic": cv2.INTER_CUBIC,
    "area": cv2.INTER_AREA,
    "lanczos": cv2.INTER_LANCZOS4,
}

resized_images = {}
for name, method in methods.items():
    resized_images[name] = cv2.resize(
        image_rgb, (600, 600), interpolation=method
    )
    cv2.imwrite(f"./{name}.jpg", resized_images[name])
```

Rồi vẽ **2 hàng × 3 cột**: ô đầu là ảnh gốc, 5 ô còn lại là từng phương pháp, mỗi ảnh có `title` và `axis("off")`, kết thúc bằng `plt.tight_layout()` và `plt.show()`.

---

### ✅ Chốt bài

Ta đã nắm **resize** (đổi kích thước tự do), **scale** (giữ aspect ratio), và 5 phương pháp **interpolation** cùng đánh đổi chất lượng/tốc độ của chúng. Một điểm đáng nhớ: khi **upscale**, thuật toán dễ "bịa" pixel hơn nên mất chi tiết rõ hơn so với downscale — đó cũng là lý do các mô hình generative như **GAN** ra đời để sinh pixel mới thay vì nội suy.

> Ghi chú: transcript gốc đọc `INTER_LANCZOS4` thành "inter links four / lankos"; tên hàm chính thức là `cv2.INTER_LANCZOS4`.
