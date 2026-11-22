# STYLE GUIDE — Blog hóa transcript khóa PyTorch for Deep Learning Bootcamp (Udemy — Daniel Bourke / ZTM)

> Dùng file này làm checklist khi chuyển mỗi `NNN - *.md` (nguồn transcript) thành một bài blog.
> Nguồn transcript: `/home/thuyetmt/Downloads/RemoteDesktop/udemy-transcript/transcripts/pytorch-for-deep-learning/`
> Thư mục đích: `AI/PyTorch for Deep Learning/`

---

## 0. GIỌNG VĂN — DANIEL BOURKE

- Năng lượng cao, thân mật, kiểu Úc; hay reo lên hào hứng, hay đặt câu hỏi rồi tự trả lời.
- Xưng **"mình"**, gọi người đọc là **"các bạn"**. Giữ giọng khích lệ của Daniel.
- Đề cao **thực hành**: "code là cách học tốt nhất"; hay nhắc chạy lại, chỉnh thử, phá thử.
- Hay kể trải nghiệm cá nhân (tự học, dự án, sách/khóa của mình) — nếu transcript có; không tự thêm.
- Nhịp câu ngắn, nhiều đoạn ngắn. Có thể dùng câu cảm thán vừa phải.

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

<Đoạn kết ngắn: chốt ý + thử thách bài tập/teaser bài sau>
```

- Chỉ dùng **H1** và **H3**. Không dùng H2.
- Ngăn các mục lớn bằng `---`.
- 3-6 mục H3 tùy độ dài transcript.

## 2. TRÌNH BÀY

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🔥 🧠 🧪 🔍 ⚙️ 📊 ✅ 🚀 |
| Bold | Thuật ngữ, tên hàm/API, con số, shape của tensor |
| Bullet `*` | Liệt kê mềm |
| Số `1. 2. 3.` | Quy trình, các bước |
| Độ dài | 60-150 dòng; bài dài được nhiều mục hơn |
| Kết bài | Chốt ý + bài tập nhỏ hoặc hẹn bài sau |

## 3. NỘI DUNG — FIDELITY

- **Chỉ dùng thông tin có trong transcript.** Không bịa hàm, tham số, kết quả số.
- Giữ đúng thứ tự giải thích và mọi lỗi/khó khăn Daniel nêu (shape error, device mismatch...).
- Được sáng tạo: tiêu đề, đề mục H3, câu chuyển ý.
- Không thêm best-practice ngoài transcript.
- Transcript mơ hồ → giữ mức mơ hồ, ghi rõ khi cần.

## 4. NGÔN NGỮ & THUẬT NGỮ

- Tiếng Việt có dấu đầy đủ. Giữ thuật ngữ tiếng Anh: `tensor`, `shape`, `dtype`, `device`, `autograd`, `loss`, `optimizer`, `epoch`, `batch size`, `transfer learning`, `torch.compile`...
- Lần đầu xuất hiện kèm giải nghĩa ngắn trong ngoặc.
- Lỗi auto-caption về tên hàm (`torch`, `nn`, `DataLoader`, `matplotlib`) → sửa khi chắc chắn, không đoán.

## 5. CODE & HÌNH

- Transcript có code → đưa vào code block `python`/`bash`, giữ nguyên nội dung.
- Tên hàm/biến → inline code.
- Được chèn bảng so sánh hoặc Mermaid đơn giản khi transcript mô tả workflow (data → model → loss → optimizer).

## 6. FRONTMATTER & TÊN FILE

```yaml
---
title: '<Bài NNN — chủ đề>'
date: '2026-11-23'
course: 'pytorch-deep-learning'
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
- Bài hành chính (classroom, newsletter, resources, bonus, "where to go", link tải) → bỏ, ghi lý do vào `MUC_LUC.md`.
- Bài exercise có transcript thật → giữ và biên soạn bình thường.

## 8. KIỂM CHỨNG TÀI LIỆU CHÍNH HÃNG (bắt buộc)

- Trước khi chốt bài, đối chiếu mọi **tên hàm/API, tham số, lệnh, thông số** với tài liệu chính thức: PyTorch (`pytorch.org/docs`), NumPy (`numpy.org/doc`), Matplotlib (`matplotlib.org`), Python (`docs.python.org`), TorchVision.
- Chỉ sửa lỗi auto-caption khi tài liệu chính thức xác nhận; nếu không chắc, giữ nguyên như transcript và ghi rõ "transcript gốc không nêu rõ".
- Không bịa link/trích dẫn docs. Nếu fetch docs thất bại thì không suy đoán, giữ nguyên mức thông tin của transcript.
- Điểm thật sự chưa chắc → ghi cuối bài dạng blockquote `> ⚠️ Cần kiểm chứng: ...`.
