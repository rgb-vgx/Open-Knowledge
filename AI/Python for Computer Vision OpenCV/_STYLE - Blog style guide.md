# STYLE GUIDE — Blog hóa transcript khóa Python for Computer Vision with OpenCV and Deep Learning (Udemy — Jose Portilla)

> Dùng file này làm checklist khi chuyển mỗi `NNN - *.md` (nguồn transcript) thành một bài blog.
> Nguồn transcript: `/home/thuyetmt/Downloads/RemoteDesktop/udemy-transcript/transcripts/python-for-computer-vision-with-opencv-and-deep-learning/`
> Thư mục đích: `AI/Python for Computer Vision OpenCV/`

---

## 0. GIỌNG VĂN — JOSE PORTILLA

- Ấm áp, rõ ràng, có cấu trúc; hay chào "Hello guys, welcome" → chuyển thành câu chào tự nhiên.
- Xưng **"mình"**, gọi người đọc là **"các bạn"**.
- Giải thích theo trình tự: khái niệm → code → kết quả nhìn thấy → tóm tắt.
- Hay nhắc "đừng lo nếu chưa quen, cứ chạy lại" — giữ tinh thần trấn an đó.

## 1. KHUNG XƯƠNG BÀI

```text
# <emoji> <Tiêu đề tiếng Việt, có thể thêm vế phụ>

> Nguồn: `<tên file transcript>` · [Udemy](<URL lấy từ header transcript>)

<Đoạn mở 2-3 câu: nêu mục tiêu bài>

### <emoji> <Mục 1>
...

---

### <emoji> <Mục 2>
...

<Đoạn kết ngắn: tóm tắt + hẹn bài sau>
```

- Chỉ dùng **H1** và **H3**. Không dùng H2.
- Ngăn các mục lớn bằng `---`.
- 3-6 mục H3 tùy độ dài transcript.

## 2. TRÌNH BÀY

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🐍 📷 🖼️ 🎥 🧠 🔍 ✅ 💡 |
| Bold | Thuật ngữ, tên hàm OpenCV, thông số |
| Bullet `*` | Liệt kê mềm |
| Số `1. 2. 3.` | Các bước |
| Độ dài | 50-130 dòng |
| Kết bài | Tóm tắt ý chính + hẹn bài sau |

## 3. NỘI DUNG — FIDELITY

- **Chỉ dùng thông tin trong transcript.** Không bịa hàm, tham số, kết quả ảnh.
- Giữ đúng thứ tự thao tác và mọi mẹo giảng viên nêu.
- Được sáng tạo: tiêu đề, đề mục H3, câu chuyển ý.
- Không thêm kiến thức ngoài bài giảng.

## 4. NGÔN NGỮ & THUẬT NGỮ

- Tiếng Việt có dấu đầy đủ. Giữ tiếng Anh: `NumPy`, `OpenCV`, `cv2`, `image`, `video`, `frame`, `BGR`, `HSV`, `contour`, `object detection`, `object tracking`, `YOLO`, `CNN`...
- Tên hàm OpenCV giữ nguyên inline code: `cv2.imread()`, `cv2.cvtColor()`, `cv2.VideoCapture()`.
- Lỗi auto-caption: sửa khi chắc chắn, không đoán.

## 5. CODE & HÌNH

- Code Python → code block `python`, giữ nguyên nội dung.
- Lệnh terminal/cài đặt → code block `bash`.
- Được chèn bảng so sánh hoặc Mermaid đơn giản khi mô tả pipeline xử lý ảnh.

## 6. FRONTMATTER & TÊN FILE

```yaml
---
title: '<Bài NNN — chủ đề>'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: <NNN>
status: edited
source: '<tên file transcript gốc>'
categories:
- AI
tags: []
---
```

- Tên file đích **giữ nguyên** `NNN - <Title>.md` như nguồn.
- Thư mục section đổi `NN - Tên` → `NN. Tên`.

## 7. LOẠI BỎ

- File có `_Không tìm thấy transcript..._` → bỏ.
- Bài hành chính (FAQ, link tải dữ liệu, bonus/thank you) → bỏ, ghi lý do vào `MUC_LUC.md`.
- Bài exercise/capstone có transcript thật → giữ và biên soạn.

## 8. KIỂM CHỨNG TÀI LIỆU CHÍNH HÃNG (bắt buộc)

- Trước khi chốt bài, đối chiếu mọi **tên hàm/API, tham số, lệnh, thông số** với tài liệu chính thức: OpenCV (`docs.opencv.org`), NumPy (`numpy.org/doc`), Pillow (`pillow.readthedocs.io`), Matplotlib, Python (`docs.python.org`).
- Chỉ sửa lỗi auto-caption khi tài liệu chính thức xác nhận; nếu không chắc, giữ nguyên như transcript và ghi rõ "transcript gốc không nêu rõ".
- Không bịa link/trích dẫn docs. Nếu fetch docs thất bại thì không suy đoán, giữ nguyên mức thông tin của transcript.
- Điểm thật sự chưa chắc → ghi cuối bài dạng blockquote `> ⚠️ Cần kiểm chứng: ...`.
