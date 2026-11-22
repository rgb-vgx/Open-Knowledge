# STYLE GUIDE — Blog hóa transcript khóa Complete Computer Vision Bootcamp With PyTorch & TensorFlow (Udemy)

> Dùng file này làm checklist khi chuyển mỗi `NNN - *.md` (nguồn transcript) thành một bài blog.
> Nguồn transcript: `/home/thuyetmt/Downloads/RemoteDesktop/udemy-transcript/transcripts/complete-computer-vision-bootcamp-with-pytoch-tensorflow/`
> Thư mục đích: `AI/Complete Computer Vision Bootcamp/`

---

## 0. GIỌNG VĂN — GIẢNG VIÊN KHÓA HỌC

- Hào hứng, thực hành, giải thích trực quan; hay mở "Hello guys" → chuyển thành câu chào tự nhiên.
- Xưng **"mình"**, gọi người đọc là **"các bạn"**.
- Nhấn mạnh "học bằng cách làm": mỗi khái niệm gắn với code/thí nghiệm nhìn thấy được.
- Có thể dùng câu khích lệ ngắn, nhưng không tự thêm kinh nghiệm ngoài transcript.

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

<Đoạn kết ngắn: chốt ý + teaser/bài tập>
```

- Chỉ dùng **H1** và **H3**. Không dùng H2.
- Ngăn các mục lớn bằng `---`.
- 3-6 mục H3 tùy độ dài transcript.

## 2. TRÌNH BÀY

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 👁️ 🧠 📷 🧪 ⚙️ 📊 ✅ 🚀 |
| Bold | Thuật ngữ, tên lớp/hàm, con số, kiến trúc |
| Bullet `*` | Liệt kê mềm |
| Số `1. 2. 3.` | Quy trình, các bước |
| Độ dài | 60-150 dòng |
| Kết bài | Chốt ý + hẹn bài sau |

## 3. NỘI DUNG — FIDELITY

- **Chỉ dùng thông tin trong transcript.** Không bịa kiến trúc, hyperparameter, kết quả.
- Giữ trình tự và mọi ví dụ/so sánh giảng viên dùng.
- Được sáng tạo: tiêu đề, đề mục H3, câu chuyển ý.
- Không thêm kỹ thuật ngoài bài giảng.
- Transcript mơ hồ → giữ mức mơ hồ.

## 4. NGÔN NGỮ & THUẬT NGỮ

- Tiếng Việt có dấu đầy đủ. Giữ tiếng Anh: `CNN`, `ANN`, `OpenCV`, `PyTorch`, `TensorFlow`, `convolution`, `pooling`, `dropout`, `object detection`, `segmentation`, `YOLO`, `Streamlit`...
- Lần đầu xuất hiện kèm giải nghĩa ngắn.
- Lỗi auto-caption: sửa khi chắc chắn, không đoán.

## 5. CODE & HÌNH

- Code Python/OpenCV/PyTorch → code block đúng ngôn ngữ, giữ nguyên.
- Tên hàm/biến → inline code.
- Được chèn bảng so sánh hoặc Mermaid đơn giản cho pipeline (data → model → train → evaluate).

## 6. FRONTMATTER & TÊN FILE

```yaml
---
title: '<Bài NNN — chủ đề>'
date: '2026-11-23'
course: 'complete-computer-vision'
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
- Bài hành chính (welcome, materials, setup không có nội dung, bonus) → bỏ, ghi lý do vào `MUC_LUC.md`.
- Bài exercise có transcript thật → giữ và biên soạn.

## 8. KIỂM CHỨNG TÀI LIỆU CHÍNH HÃNG (bắt buộc)

- Trước khi chốt bài, đối chiếu mọi **tên hàm/API, tham số, lệnh, kiến trúc, thông số** với tài liệu chính thức: PyTorch (`pytorch.org/docs`), TensorFlow/Keras (`tensorflow.org/api_docs`), OpenCV (`docs.opencv.org`), NumPy, Matplotlib, Streamlit, Ultralytics YOLO.
- Chỉ sửa lỗi auto-caption khi tài liệu chính thức xác nhận; nếu không chắc, giữ nguyên như transcript và ghi rõ "transcript gốc không nêu rõ".
- Không bịa link/trích dẫn docs. Nếu fetch docs thất bại thì không suy đoán, giữ nguyên mức thông tin của transcript.
- Điểm thật sự chưa chắc → ghi cuối bài dạng blockquote `> ⚠️ Cần kiểm chứng: ...`.
