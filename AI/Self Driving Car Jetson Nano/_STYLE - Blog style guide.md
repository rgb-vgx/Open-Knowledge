# STYLE GUIDE — Blog hóa transcript khóa Self Driving Car with Jetson Nano (Udemy — Yilmaz Alija)

> Dùng file này làm checklist khi chuyển mỗi `NNN - *.md` (nguồn transcript) thành một bài blog.
> Nguồn transcript: `/home/thuyetmt/Downloads/RemoteDesktop/udemy-transcript/transcripts/self-driving-car-with-jetson-nano-lane-tracking-opencv/`
> Thư mục đích: `AI/Self Driving Car Jetson Nano/`

---

## 0. GIỌNG VĂN — YILMAZ ALIJA

- Kỹ sư điện — điện tử, điềm tĩnh, thực hành, giải thích chậm từng bước như đang cầm tay chỉ việc.
- Xưng **"mình"**, gọi người đọc là **"các bạn"**. Không dùng "tôi", không dùng "chúng ta" quá nhiều.
- Hay mở bằng "Hello everyone" → chuyển thành câu chào tự nhiên tiếng Việt.
- Nhấn mạnh tính thực hành: làm được ngay, kiểm tra từng bước, an toàn phần cứng (điện, động cơ, mạch).
- Có thể dùng câu trấn an ngắn khi bài có nhiều bước.

## 1. KHUNG XƯƠNG BÀI

```text
# <emoji> <Tiêu đề tiếng Việt, có thể thêm vế phụ>

> Nguồn: `<tên file transcript>` · [Udemy](<URL lấy từ header transcript>)

<Đoạn mở 2-3 câu: nêu mục tiêu bài, xưng "mình", gọi "các bạn">

### <emoji> <Mục 1>
...

---

### <emoji> <Mục 2>
...

<Đoạn kết ngắn: chốt ý + gợi ý bài sau>
```

- Chỉ dùng **H1** và **H3**. Không dùng H2.
- Ngăn các mục lớn bằng `---`.
- 3-6 mục H3 tùy độ dài transcript.

## 2. TRÌNH BÀY

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🚗 🔧 🐍 📷 ⚙️ 🔌 🧠 💡 ✅ |
| Bold | Thuật ngữ, tên hàm, linh kiện, thông số quan trọng |
| Bullet `*` | Liệt kê mềm |
| Số `1. 2. 3.` | Các bước thao tác, quy trình lắp đặt/cài đặt |
| Độ dài | 50-120 dòng, ưu tiên đủ ý hơn ngắn |
| Kết bài | Chốt ý + hẹn bài sau |

## 3. NỘI DUNG — FIDELITY

- **Chỉ dùng thông tin có trong transcript.** Không bịa lệnh, thông số, chân cắm, tên linh kiện.
- Giữ đúng trình tự các bước và mọi cảnh báo an toàn giảng viên nêu.
- Được sáng tạo: tiêu đề, đề mục H3, câu chuyển ý.
- Không đổi quan điểm, không thêm kinh nghiệm ngoài transcript.
- Transcript mơ hồ → giữ mức mơ hồ, ghi rõ "transcript gốc không nêu rõ" nếu cần.

## 4. NGÔN NGỮ & THUẬT NGỮ

- Tiếng Việt có dấu đầy đủ. Giữ thuật ngữ tiếng Anh: `lane tracking`, `Jetson Nano`, `OpenCV`, `GPIO`, `PWM`, `H-bridge`, `CSI camera`, `I2C`...
- Lần đầu xuất hiện có thể kèm giải nghĩa ngắn trong ngoặc.
- Lỗi auto-caption: chỉ sửa khi ngữ cảnh xác nhận, không đoán.

## 5. CODE & HÌNH

- Nếu transcript có code Python/C++ hoặc lệnh terminal → đưa vào code block đúng ngôn ngữ, giữ nguyên nội dung.
- Nếu chỉ nhắc tên hàm/lệnh → dùng inline code.
- Được chèn Mermaid khi có flow xử lý ảnh/điều khiển đáng mô tả, nhưng phải đơn giản và đúng transcript.

## 6. FRONTMATTER & TÊN FILE

Mỗi bài bắt đầu bằng frontmatter:

```yaml
---
title: '<Bài NNN — chủ đề>'
date: '2026-11-23'
course: 'self-driving-car'
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
- Bài hành chính (giới thiệu khóa, vật liệu, link tải, cảm ơn, bonus) → bỏ, ghi lý do vào `MUC_LUC.md`.
- Bài exercise có transcript thật → giữ và biên soạn bình thường.

## 8. KIỂM CHỨNG TÀI LIỆU CHÍNH HÃNG (bắt buộc)

- Trước khi chốt bài, đối chiếu mọi **tên hàm/API, tham số, lệnh, tên linh kiện, thông số** với tài liệu chính thức: OpenCV (`docs.opencv.org`), NumPy (`numpy.org/doc`), Pillow (`pillow.readthedocs.io`), Python (`docs.python.org`), NVIDIA Jetson (`developer.nvidia.com`), balena (`docs.balena.io`).
- Chỉ sửa lỗi auto-caption khi tài liệu chính thức xác nhận; nếu không chắc, giữ nguyên như transcript và ghi rõ "transcript gốc không nêu rõ".
- Không bịa link/trích dẫn docs. Nếu fetch docs thất bại thì không suy đoán, giữ nguyên mức thông tin của transcript.
- Điểm thật sự chưa chắc → ghi cuối bài dạng blockquote `> ⚠️ Cần kiểm chứng: ...`.
