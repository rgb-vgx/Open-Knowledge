---
title: 'Bài 088 — Khám phá không gian màu trong OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 88
status: edited
source: '088 - Exploring Color Space.md'
categories:
- AI
tags: []
---

# 🎨 Không gian màu (color space) và cách chuyển đổi bằng OpenCV

> Nguồn: `088 - Exploring Color Space.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48420929)

Chào các bạn! Cách biểu diễn màu của từng pixel ảnh hưởng trực tiếp tới cách ta xử lý và phân tích ảnh. Bài này mình sẽ đi qua các **color space** phổ biến trong OpenCV — **RGB**, **grayscale**, **HSV**, **Lab**, **BGR** — và thực hành chuyển đổi giữa chúng, kèm một "cái bẫy" thú vị về BGR mà rất nhiều người mới hay vấp.

### 🔄 Vì sao cần chuyển đổi không gian màu?

Hãy tưởng tượng một camera xuất ảnh theo **RGB**, nhưng chiếc TV lại chờ tín hiệu **BGR**. Hai bên không khớp nhau, nên cần chuyển đổi từ RGB sang BGR. Đây chính là chỗ OpenCV phát huy tác dụng: nó cung cấp nhiều cách chuyển giữa các không gian màu, giúp các hệ thống khác nhau "nói chuyện" được với nhau.

### 🔴 RGB — mô hình cộng màu

**RGB** = Red, Green, Blue — ba màu gốc để biểu diễn ảnh màu. Đây là **mô hình cộng (additive)**: kênh 1 luôn là đỏ, kênh 2 là xanh lá, kênh 3 là xanh dương, mỗi kênh chạy từ **0 đến 255**.

* Đỏ thuần: `(255, 0, 0)`
* Xanh lá thuần: `(0, 255, 0)`
* Xanh dương thuần: `(0, 0, 255)`
* Trắng: cộng cực đại cả ba → `(255, 255, 255)`

RGB gần với cách con người cảm nhận màu và là mô hình mà màn hình, thiết bị số dùng để hiển thị ảnh màu.

### ⚫ Grayscale — một kênh, nhẹ và nhanh

**Grayscale** biểu diễn màu bằng các sắc xám, chỉ **một kênh** giá trị **0–255**: `0` là đen tuyền, `255` là trắng tuyền, ở giữa là các mức xám.

Vì sao cần grayscale?

* **Hiệu quả tính toán**: một kênh thay vì ba, nhẹ hơn về bộ nhớ và xử lý.
* **Đơn giản hóa**: khi không cần thông tin màu — ví dụ chỉ tìm ô tô bất kể màu gì — grayscale là đủ.
* **Tiết kiệm dung lượng**: ảnh RGB 3 MB thì bản grayscale có thể chỉ khoảng 1 MB nhưng vẫn giữ chi tiết.

### 🌈 HSV — tách màu khỏi độ sáng

**HSV** có ba kênh:

* **H (Hue)** — loại màu, chạy theo vòng tròn **0–360 độ**. Ví dụ khoảng 240 độ là xanh dương, 270 độ ngả hồng, 0–60 độ là đỏ/hồng ấm, 60–120 độ là xanh lá.
* **S (Saturation)** — độ tinh khiết của màu, từ **0 đến 100%**. Saturation cao cho màu nguyên chất; giảm về 0 sẽ thành trắng.
* **V (Value)** — độ sáng, **0–100%**. Giảm value thì cùng một màu sẽ tối dần.

HSV rất tiện cho **phân đoạn theo màu (color segmentation)** hay theo dõi vật thể, vì nó tách màu khỏi cường độ sáng, giúp định nghĩa dải màu dễ hơn. Ví dụ muốn tách phông xanh (green screen) để thay nền: chọn hue quanh 120 độ, chỉnh saturation và hạ value xuống khoảng 30–40% để bắt đúng sắc xanh, rồi bảo OpenCV loại bỏ vùng màu đó.

### 🟣 Lab — gần với cách người nhìn

**Lab** gồm ba kênh:

* **L** — độ sáng, tương quan với trắng/đen (kiểu grayscale).
* **a** — trục **xanh lá ↔ đỏ**: dương thì đỏ hơn, âm thì xanh lá hơn.
* **b** — trục **xanh dương ↔ vàng**: dương thì vàng hơn, âm thì xanh dương hơn.

Khác với HSV chỉ có phần trên của hình nón mang màu, Lab là một **khối cầu 3D**, mỗi pixel là tổ hợp của cả ba trục. Lab được thiết kế bám sát cách con người cảm nhận màu, hữu ích cho **chỉnh màu (color correction)** và tinh chỉnh. Cá nhân mình thấy với HSV dễ kiểm soát hơn khi muốn nhắm một màu cụ thể, vì Lab khó tách riêng một sắc mà chỉ có trục sáng và hai trục màu đối lập.

### 🅱️ BGR — mặc định "kỳ lạ" của OpenCV

**BGR** giống hệt RGB nhưng **đảo kênh đỏ và xanh dương**: mỗi pixel là `(Blue, Green, Red)`. Nghe lạ, nhưng đây là **không gian màu mặc định của OpenCV**. Lý do là lịch sử: OpenCV ra đời rất lâu, thời đó các nhà sản xuất và phần mềm dùng BGR, nên OpenCV giữ BGR để tương thích.

Hệ quả quan trọng: khi đọc ảnh, OpenCV **tự chuyển sang BGR**; các hàm như `cv2.imshow` và `cv2.imwrite` cũng **mặc định nhận BGR** rồi hiển thị/ghi ra RGB.

### 🧪 Thực hành chuyển đổi

Đọc ảnh (OpenCV trả về BGR) rồi chuyển bằng `cv2.cvtColor`:

```python
import cv2

bgr_image = cv2.imread('mountain.jpg')

gray_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)
hsv_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2HSV)
lab_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2LAB)

cv2.imwrite('gray_image.jpg', gray_image)
cv2.imwrite('hsv_image.jpg', hsv_image)
cv2.imwrite('lab_image.jpg', lab_image)
```

Mở kết quả: ảnh grayscale trông bình thường; còn ảnh HSV và Lab trông **rất lạ** (mảng màu hồng, xanh lộn xộn). Đó là bình thường — HSV và Lab **không dành để hiển thị** mà dùng cho tính toán, threshold màu. Ta chỉ vẽ ra để quan sát cho vui.

### ⚠️ Cái bẫy BGR ↔ RGB

Giờ tới phần dễ sai nhất. Ta đọc ảnh BGR rồi chuyển sang RGB bằng `cv2.COLOR_BGR2RGB`, lưu lại — và ảnh ra lại **ngả xanh** thay vì đúng màu:

```python
rgb_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2RGB)
cv2.imwrite('rgb_image.jpg', rgb_image)   # trông ngả xanh!
```

Lý do: `cv2.cvtColor` với `COLOR_BGR2RGB` (hay `COLOR_RGB2BGR`) chỉ làm đúng **một việc là hoán đổi kênh 0 và kênh 2**, bất kể đầu vào thực sự là gì. Trong khi đó `cv2.imwrite` lại **mặc định chờ BGR** rồi ghi ra RGB. Ta đã hoán đổi kênh trước, đưa vào `imwrite` một ảnh RGB trong khi nó tưởng là BGR, nên kênh đỏ và xanh bị đảo lần nữa → ảnh ngả xanh.

Nói cách khác: nếu cứ để BGR như OpenCV đọc, `cv2.imwrite` ghi ra đúng; nhưng khi tự tay đổi BGR→RGB rồi mới ghi, bạn đã đổi kênh hai lần. Hiểu luồng này sẽ giúp các bạn tránh được cảnh "ảnh sao màu sai" khi thao tác màu về sau.
