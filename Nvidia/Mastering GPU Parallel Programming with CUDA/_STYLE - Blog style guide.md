# STYLE GUIDE — Blog hóa transcript khóa Mastering GPU Parallel Programming with CUDA (Udemy)

> Dùng file này làm checklist khi chuyển mỗi `NNN - *.md` (nguồn transcript) thành một bài blog.
> Nguồn transcript: `/home/thuyetmt/Downloads/RemoteDesktop/udemy-transcript/transcripts/mastering-gpu-parallel-programming-with-cuda/`
> Thư mục đích: `Nvidia/Mastering GPU Parallel Programming with CUDA/`

---

## 0. GIỌNG VĂN — GIẢNG VIÊN KHÓA HỌC

- Trang trọng, phân tích, thiên về phần cứng và số liệu; hay mở "Hello everyone".
- Xưng **"mình"**, gọi người đọc là **"các bạn"**.
- Giải thích từ cơ chế bên dưới (SM, warp, memory hierarchy) rồi mới tới code và kết quả đo.
- Nhấn mạnh "hiểu kiến trúc → viết CUDA nhanh hơn", nhưng không tự thêm ngoài transcript.

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

<Đoạn kết ngắn: chốt ý + hẹn bài sau>
```

- Chỉ dùng **H1** và **H3**. Không dùng H2.
- Ngăn các mục lớn bằng `---`.
- 3-6 mục H3 tùy độ dài transcript.

## 2. TRÌNH BÀY

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: ⚡ 🖥️ 🧵 🧠 📊 🔬 ⚙️ ✅ |
| Bold | Thuật ngữ, thông số, tên API CUDA |
| Bullet `*` | Liệt kê mềm |
| Số `1. 2. 3.` | Quy trình, các bước |
| Độ dài | 60-150 dòng |
| Kết bài | Chốt ý + hẹn bài sau |

## 3. NỘI DUNG — FIDELITY

- **Chỉ dùng thông tin trong transcript.** Không bịa kiến trúc, số SM, băng thông, kết quả benchmark.
- Giữ đúng trình tự và mọi so sánh CPU/GPU, con số đo được mà giảng viên nêu.
- Được sáng tạo: tiêu đề, đề mục H3, câu chuyển ý.
- Không thêm kỹ thuật tối ưu ngoài bài giảng.

## 4. NGÔN NGỮ & THUẬT NGỮ

- Tiếng Việt có dấu đầy đủ. Giữ tiếng Anh: `GPU`, `CPU`, `CUDA`, `SM (Streaming Multiprocessor)`, `warp`, `thread block`, `grid`, `shared memory`, `global memory`, `register`, `occupancy`, `roofline`, `Nsight`...
- Lần đầu xuất hiện kèm giải nghĩa ngắn.
- Lỗi auto-caption về tên hàm CUDA (`cudaMalloc`, `__global__`, `cudaMemcpy`, `blockIdx`, `threadIdx`) → sửa khi chắc chắn.

## 5. CODE & HÌNH

- Code CUDA/C++ → code block `cuda`/`cpp`, giữ nguyên.
- Lệnh build/profiling → code block `bash`.
- Được chèn bảng so sánh hoặc Mermaid đơn giản cho luồng host↔device, memory hierarchy.

## 6. FRONTMATTER & TÊN FILE

```yaml
---
title: '<Bài NNN — chủ đề>'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: <NNN>
status: edited
source: '<tên file transcript gốc>'
categories:
- Nvidia
tags: []
---
```

- Tên file đích **giữ nguyên** `NNN - <Title>.md` như nguồn.
- Thư mục section đổi `NN - Tên` → `NN. Tên`.

## 7. LOẠI BỎ

- File có `_Không tìm thấy transcript..._` → bỏ.
- Bài hành chính (link repo, giới thiệu công cụ không có nội dung) → bỏ, ghi lý do vào `MUC_LUC.md`.
- Bài có transcript thật → giữ và biên soạn.

## 8. KIỂM CHỨNG TÀI LIỆU CHÍNH HÃNG (bắt buộc)

- Trước khi chốt bài, đối chiếu mọi **tên hàm/API, tham số, lệnh build/profiling, thông số kiến trúc** với tài liệu chính thức: NVIDIA CUDA C Programming Guide (`docs.nvidia.com/cuda`), CUDA Toolkit docs, Nsight Compute/Systems docs, NVIDIA GPU architecture whitepapers.
- Chỉ sửa lỗi auto-caption khi tài liệu chính thức xác nhận; nếu không chắc, giữ nguyên như transcript và ghi rõ "transcript gốc không nêu rõ".
- Không bịa link/trích dẫn docs. Nếu fetch docs thất bại thì không suy đoán, giữ nguyên mức thông tin của transcript.
- Điểm thật sự chưa chắc → ghi cuối bài dạng blockquote `> ⚠️ Cần kiểm chứng: ...`.
