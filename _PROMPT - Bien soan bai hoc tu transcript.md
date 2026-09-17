# Prompt mẫu — Biên soạn bài học từ transcript

Mục đích: biến transcript thô (video Udemy/YouTube...) thành bài học tiếng Việt
đọc như một khóa học hoàn chỉnh.

Lifecycle: transcript là bản `raw` (**không bao giờ sửa**) → bài học là bản `edited`
(file mới, frontmatter `status: edited`). Hai file sống cạnh nhau trong cùng thư mục,
sau này website có thể gắn nhãn "bản thảo / đã biên soạn" dựa trên trường này.

Copy khối "Prompt đầy đủ", thay các placeholder `<...>`.

---

## Prompt đầy đủ

```text
Biên soạn file transcript <ĐƯỜNG_DẪN_TRANSCRIPT> thành một bài học.
Danh sách file trong cùng thư mục (để xác định bài trước/sau): <DANH_SÁCH_FILE>.

NGUYÊN TẮC VÀNG (fidelity)
- Chỉ dùng thông tin có trong transcript. Có thể thêm kiến thức ngoài, không bịa ví dụ,
  không bổ sung code mà bài giảng không nhắc tới.
- Nếu transcript nói mơ hồ thì giữ nguyên mức mơ hồ đó. Chỗ nào cấu trúc bài cần nhắc
  mà transcript không đề cập thì ghi rõ "transcript gốc không đề cập", đừng "đoán cho đủ".
- Giữ lại ví dụ và cách ví von của giảng viên (tên model, tên công cụ, phép so sánh...).
- Ngôn ngữ: tiếng Việt, file UTF-8. Giữ nguyên thuật ngữ tiếng Anh (prompt template,
  vendor lock-in, agentic, chain, retriever...) để đối chiếu được với tài liệu gốc.
- Nếu transcript rỗng hoặc chỉ chứa nội dung hành chính (link tài liệu, cộng đồng,
  chào hỏi, "personal message"...) → KHÔNG tạo file, chỉ trả lời một dòng:
  BỎ QUA: <tên file> — <lý do>.

FRONTMATTER (bắt buộc, đặt đầu file)
---
title: '<Bài NNN — chủ đề>'
date: '<YYYY-MM-DD, ngày biên soạn>'
course: '<tên khóa học, vd: langchain>'
lesson: <số bài, vd: 6>
status: edited
source: '<tên file transcript gốc>'
categories:
- <domain, vd: AI>
tags: []
---

CẤU TRÚC BÀI HỌC
1. `# Bài <số> — <chủ đề>` + một dòng blockquote ghi đúng tên file transcript nguồn.
   `<số>` lấy đúng số thứ tự của transcript để sắp xếp trong thư mục.
2. `## Mục tiêu bài học` — 3–5 gạch đầu dòng "Sau bài này bạn có thể...".
3. Các mục nội dung đánh số, chia theo mạch của transcript. Độ dài tỉ lệ với transcript
   (bài ~6 phút ≈ 150–250 dòng). Ưu tiên:
   - bảng cho phần đối chiếu / phân loại,
   - danh sách đánh số cho quy trình theo bước,
   - blockquote cho câu chốt quan trọng,
   - sơ đồ ASCII khi có luồng dữ liệu.
4. `## Tóm tắt một trang` — một bảng dạng "Vấn đề ↔ Giải pháp" (hoặc "Khái niệm ↔ Vai trò"),
   kết thúc bằng một câu chốt in đậm.
5. `## Câu hỏi tự kiểm tra` — 5 câu hỏi khái niệm (không hỏi mẹo, không hỏi chi tiết vụn).
   Đáp án chi tiết bọc trong khối `<details><summary><b>Xem đáp án</b></summary>`,
   mỗi đáp án nối ngược về đúng phần lý thuyết đã trình bày ở trên.
6. `## Bước tiếp theo` — một dòng dẫn sang bài kế tiếp, tra từ DANH_SÁCH_FILE
   (ghi số + tên transcript kế tiếp). Nếu không có bài kế tiếp thì bỏ mục này.

QUY TẮC FILE
- Tạo file MỚI trong cùng thư mục với transcript, đặt tên: `<số> - Bai hoc - <chủ đề>.md`
  (giữ đúng <số> của transcript, tên file không dấu).
- KHÔNG sửa, không ghi đè file transcript gốc.
- Trước khi xuất, tự kiểm tra: mọi khẳng định kỹ thuật đều truy được về transcript;
  thuật ngữ tiếng Anh được giữ; số bài/tên file khớp nhau; frontmatter đủ 7 trường.
```

---

## Biến thể

**Làm hàng loạt cả section:**

```text
Áp dụng prompt trong file `_PROMPT - Bien soan bai hoc tu transcript.md` cho tất cả
transcript trong thư mục <TÊN_THƯ_MỤC>, theo đúng số thứ tự tăng dần. Mỗi transcript
ra một file bài học riêng; transcript rỗng/hành chính thì bỏ qua theo quy tắc BỎ QUA.
Cuối cùng báo cáo một bảng: file transcript → tạo file nào / bỏ qua vì sao.
Vì xử lý cả thư mục nên mục "Bước tiếp theo" của mỗi bài phải trỏ đúng bài kế tiếp.
```

**Bài có code / dự án thực hành:** thêm vào phần NGUYÊN TẮC VÀNG:

```text
- Với mỗi code snippet xuất hiện trong transcript: trích lại trong code block có ghi ngôn ngữ,
  kèm phần giải thích từng dòng quan trọng. Không "cải tiến" code cho khác bài giảng.
```

**Muốn bản ngắn để ôn nhanh:** thay phần CẤU TRÚC bằng:

```text
Rút gọn thành flashcard: mỗi khái niệm một dòng `**Khái niệm** — định nghĩa một câu`,
tối đa một trang. Bỏ phần mục tiêu và câu hỏi tự kiểm tra. Vẫn giữ frontmatter và quy tắc file.
```

---

## Ghi chú

- Bản mẫu đã áp dụng: `02. The GIST of LangChain.../006 - Bai hoc - LangChain la gi.md`
  (bản mẫu chưa có frontmatter — bài mới làm theo prompt này sẽ có).
- Khối `<details>` sẽ bị markdown linter cảnh báo MD033 (inline HTML) — chỉ là cảnh báo style,
  GitHub và VS Code preview vẫn render bình thường.

## Ghi chú cho maintainer

- File `_PROMPT...md` này, `README.md` gốc và `design-system/` đang lọt vào `docs-index.json`
  thành topic ma ("Tổng quan", "design-system"). Nên thêm vào `EXCLUDE_DIRS` trong
  `website/scripts/build-index.mjs`: `draft`, `trash`, `design-system`, và skip file
  `README.md` ở root + file bắt đầu bằng `_`.
