# Prompt mẫu — Biên soạn bài học từ transcript

Copy đoạn dưới, thay `<ĐƯỜNG_DẪN_FILE>` bằng file transcript muốn xử lý.

---

## Prompt đầy đủ

```text
Chuyển file transcript <ĐƯỜNG_DẪN_FILE> thành một bài học cho tôi.

YÊU CẦU NỘI DUNG
- Chỉ dùng thông tin có trong transcript. Không thêm kiến thức ngoài, không bịa ví dụ,
  không bổ sung code mà bài giảng không nhắc tới. Nếu transcript nói mơ hồ thì giữ nguyên
  mức mơ hồ đó, đừng "đoán cho đủ".
- Giữ lại các ví dụ và cách ví von của giảng viên (tên model, tên công cụ, phép so sánh...).
- Ngôn ngữ: tiếng Việt. Giữ nguyên thuật ngữ tiếng Anh (prompt template, vendor lock-in,
  agentic, chain, retriever...) để tôi đối chiếu được với tài liệu gốc.

CẤU TRÚC BÀI HỌC
1. Tiêu đề: `# Bài <số> — <chủ đề>` + một dòng blockquote ghi nguồn transcript.
2. `## Mục tiêu bài học` — 3–5 gạch đầu dòng "Sau bài này bạn có thể...".
3. Các mục nội dung được đánh số, chia theo mạch của transcript. Ưu tiên:
   - bảng cho phần đối chiếu / phân loại,
   - danh sách đánh số cho quy trình theo bước,
   - blockquote cho câu chốt quan trọng,
   - sơ đồ ASCII khi có luồng dữ liệu.
4. `## Tóm tắt một trang` — một bảng dạng "Vấn đề ↔ Giải pháp" (hoặc "Khái niệm ↔ Vai trò"),
   kết thúc bằng một câu chốt in đậm.
5. `## Câu hỏi tự kiểm tra` — 5 câu hỏi khái niệm (không phải hỏi mẹo, không hỏi chi tiết vụn).
   Kèm đáp án chi tiết bọc trong khối `<details><summary><b>Xem đáp án</b></summary>`,
   mỗi đáp án nối ngược về đúng phần lý thuyết đã trình bày ở trên.
6. `## Bước tiếp theo` — một dòng dẫn sang bài kế tiếp trong cùng thư mục.

QUY TẮC FILE
- Tạo file MỚI trong cùng thư mục với transcript, đặt tên: `<số bài> - Bai hoc - <chủ đề>.md`
  (tên file không dấu).
- KHÔNG sửa, không ghi đè file transcript gốc.
```

---

## Biến thể

**Làm hàng loạt cả section:**

```text
Áp dụng prompt trong file `_PROMPT - Bien soan bai hoc tu transcript.md` cho tất cả
transcript trong thư mục <TÊN_THƯ_MỤC>. Mỗi transcript ra một file bài học riêng.
```

**Bài có code (từ section 08 trở đi):** thêm vào phần YÊU CẦU NỘI DUNG:

```text
- Với mỗi code snippet xuất hiện trong transcript: trích lại trong code block có ghi ngôn ngữ,
  kèm phần giải thích từng dòng quan trọng. Không "cải tiến" code cho khác bài giảng.
```

**Muốn bản ngắn để ôn nhanh:** thay phần CẤU TRÚC bằng:

```text
Rút gọn thành flashcard: mỗi khái niệm một dòng `**Khái niệm** — định nghĩa một câu`,
tối đa một trang. Bỏ phần mục tiêu và câu hỏi tự kiểm tra.
```

---

## Ghi chú

- Bản mẫu đã áp dụng: `02. The GIST of LangChain.../006 - Bai hoc - LangChain la gi.md`.
- Khối `<details>` sẽ bị markdown linter cảnh báo MD033 (inline HTML) — chỉ là cảnh báo style,
  GitHub và VS Code preview vẫn render bình thường.
