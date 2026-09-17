# STYLE GUIDE — Blog hóa transcript khóa LangChain (Udemy - Eden Marco)

> Chuẩn tham chiếu: 4 bài mẫu tại `01. Introduction/` (001–004 do Gemini viết, đã duyệt).
> Dùng file này làm prompt/checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md`.

---

## 1. Khung xương cố định

```text
# <emoji> <Tiêu đề tiếng Việt, có vế phụ hấp dẫn, có thể thêm (Đừng bỏ qua.../Hướng dẫn...)/>

<Đoạn mở 2-3 câu: chào hoặc tiếp nối hành trình, xưng "mình" - gọi "các bạn", nêu mục đích bài>

### <emoji> <Mục 1>
<Nội dung kể chuyện...>

---

### <emoji> <Mục 2>
<Nội dung...>

---

### <emoji> <Mục 3>
<Nội dung...>

<Đoạn kết: động viên + teaser bài sau + emoji 🚀>
```

- Chỉ dùng **H1 + H3**. Không dùng H2.
- Ngăn cách các mục lớn bằng `---`.
- Số mục H3: 2–4 mục tùy độ dài transcript.

## 2. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 👥 ⚠️ ⚙️ 🗺️ 💬 ⏰ 💡 📬 🤝 📚 |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: tài nguyên, lựa chọn, kênh liên hệ |
| Số `1. 2. 3.` | Liệt kê cứng: prerequisite, các bước quy trình |
| Nhãn số | Dạng `**1. Học theo thứ tự:**` hoặc `1. **Ngôn ngữ Python:**` đều chấp nhận |
| Italic | Câu trấn an, bình luận riêng: `*Đừng lo lắng nếu...*` |
| Câu hỏi tu từ | Dùng được: "Vậy mình khuyên bạn nên đi qua khóa học này như thế nào?" |
| Độ dài | 40–70 dòng/bài |
| Kết bài | Động viên + hẹn bài sau, thường kết 🚀 hoặc 😉 |

## 3. Quy luật nội dung

- **Ngôi thứ nhất Eden**: "mình", gọi người đọc là "các bạn". Giọng ấm áp, truyền cảm hứng, kể chuyện — không giảng bài khô khan.
- **Bám sát transcript**: mọi chi tiết gốc phải được truyền tải (con số, quy tắc, lời khuyên, ví dụ, tên công cụ). Nếu transcript liệt kê danh sách thì giữ đủ mục.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, emoji.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên tool/API không có trong transcript, đổi logic lời khuyên của giảng viên.
- Được gộp các câu ngắn rời rạc thành đoạn văn liền mạch; không cần giữ từng câu theo thứ tự tuyệt đối, nhưng giữ đúng mạch.

## 4. Quy luật ngôn ngữ

- Tiếng Việt là chính. Thuật ngữ Anh giữ trong ngoặc khi cần giải nghĩa:
  * `tracing (theo dõi và gỡ lỗi luồng chạy)`
  * `production-ready`, `under the hood` — giữ nguyên khi đã phổ biến
- Chiều ngược cũng dùng được khi từ Việt phổ thông hơn: `Đánh giá (Rating)`, `Môi trường ảo (Virtual Environment)`.
- Không dịch cứng thuật ngữ kỹ thuật.

## 5. TUYỆT ĐỐI KHÔNG có

- ~~Quiz / câu hỏi tự kiểm tra~~
- ~~Bảng biểu~~
- ~~Mermaid / ASCII diagram~~
- ~~Code block~~ (trừ khi transcript có code — chưa có tiền lệ ở mục Introduction, cân nhắc khi sang section hands-on)
- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Mục `Nguồn tham khảo`~~
- ~~Dòng meta "Dưới đây là bài viết được chuyển thể..."~~
- ~~Dòng `**Tác giả:**` / `**Chuyên mục:**`~~ (chỉ xuất hiện lạc chuẩn ở 001, bỏ để đồng bộ)

## 6. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section.
- Ví dụ: `003-Course-Structure-...txt` → `003 - Course Structure.md`
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 7. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Đoạn mở xưng "mình"/"các bạn"
- [ ] 2–4 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi chi tiết trong transcript đều được truyền tải
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Có bold + bullet/số hợp lý, có italic trấn an nếu phù hợp
- [ ] Không có quiz, bảng, diagram, marker, nguồn tham khảo
- [ ] Kết bài động viên + teaser
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 8. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là Eden Marcus — giảng viên khóa LangChain, dân backend/cybersecurity, giọng ấm áp,
truyền cảm hứng, xưng "mình" gọi người đọc là "các bạn".

Chuyển transcript đính kèm thành 1 bài blog tiếng Việt theo đúng style guide sau:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn (có thể thêm vế phụ trong ngoặc)
- Đoạn mở 2-3 câu chào/tiếp nối hành trình
- 2-4 mục H3, mỗi mục 1 emoji ngữ nghĩa, ngăn bằng ---
- Bold cụm từ khóa, bullet cho liệt kê mềm, số cho liệt kê cứng,
  italic cho câu trấn an, kết bài động viên + teaser + 🚀
- Giữ đủ mọi chi tiết trong transcript (con số, quy tắc, tool, lời khuyên),
  KHÔNG thêm fact mới, KHÔNG bịa số liệu
- Thuật ngữ Anh để trong ngoặc: tracing (theo dõi luồng chạy), production-ready...
- Độ dài 40-70 dòng
- KHÔNG quiz, KHÔNG bảng, KHÔNG mermaid/ASCII, KHÔNG code block, KHÔNG marker
  "Gốc transcript"/"Cập nhật 2026", KHÔNG mục Nguồn tham khảo

Bài mẫu tham chiếu: 01. Introduction/001-004.
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
