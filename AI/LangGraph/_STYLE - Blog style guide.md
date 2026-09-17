# STYLE GUIDE — Blog hóa transcript khóa LangGraph (Udemy - Eden Marco)

> Chuẩn tham chiếu: 4 bài blog đã duyệt của khóa LangChain tại `C:\Users\ThuyetMT\Documents\work\Open-Knowledge\AI\Langchain\01. Introduction\` (001–004).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md` trong khóa LangGraph.

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
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 👥 ⚠️ ⚙️ 🗺️ 💬 ⏰ 💡 📬 🤝 📚 🧩 🔧 |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: tài nguyên, lựa chọn, kênh liên hệ |
| Số `1. 2. 3.` | Liệt kê cứng: prerequisite, các bước quy trình |
| Nhãn số | Dạng `**1. Học theo thứ tự:**` hoặc `1. **Ngôn ngữ Python:**` đều chấp nhận |
| Italic | Câu trấn an, bình luận riêng: `*Đừng lo lắng nếu...*` |
| Code | Chỉ chèn code block `python` khi transcript THỰC SỰ đọc code. Giữ nguyên như transcript, không cải tiến, không thêm code ngoài transcript |
| Độ dài | 40–90 dòng/bài |
| Kết bài | Động viên + hẹn bài sau, thường kết 🚀 hoặc 😉 |

## 3. Quy luật nội dung

- **Ngôi thứ nhất Eden**: "mình", gọi người đọc là "các bạn". Giọng ấm áp, truyền cảm hứng, kể chuyện — không giảng bài khô khan.
- **Bám sát transcript**: mọi chi tiết gốc phải được truyền tải (con số, quy tắc, lời khuyên, ví dụ, tên công cụ). Nếu transcript liệt kê danh sách thì giữ đủ mục.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, emoji.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên tool/API không có trong transcript, đổi logic lời khuyên của giảng viên.
- Được gộp các câu ngắn rời rạc thành đoạn văn liền mạch; giữ đúng mạch bài giảng.

## 4. Quy luật ngôn ngữ

- Tiếng Việt CÓ DẤU đầy đủ là chính. Thuật ngữ Anh giữ kèm giải nghĩa trong ngoặc khi cần:
  * `flow engineering (kỹ thuật thiết kế luồng)`
  * `state (trạng thái)`, `node (nút)`, `edge (cạnh)`
  * `checkpoint (điểm lưu trạng thái)`, `thread (luồng hội thoại)`
  * `persistence (lưu trữ bền vững)`, `human-in-the-loop (con người can thiệp giữa vòng chạy)`
- Không dịch cứng thuật ngữ kỹ thuật.
- Lỗi auto-caption: chuẩn hóa khi chắc chắn (Landgraf → LangGraph, link chain → LangChain, "Ethan here" → Eden...). Không chắc thì viết trung tính, không đoán.

## 5. TUYỆT ĐỐI KHÔNG có

- ~~Quiz / câu hỏi tự kiểm tra~~
- ~~Bảng biểu~~
- ~~Mermaid / ASCII diagram~~
- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Mục `Nguồn tham khảo`~~
- ~~Dòng nguồn/URL Udemy đầu bài~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~

## 6. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, rút gọn tự nhiên.
- Số `NNN` lấy đúng theo prefix của file `.txt` (khớp dòng `# N.` trong transcript UA). **Không** đối chiếu lại số HTML.
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 7. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Đoạn mở xưng "mình"/"các bạn"
- [ ] 2–4 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi chi tiết trong transcript đều được truyền tải
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Không có quiz, bảng, diagram, marker, nguồn tham khảo
- [ ] Kết bài động viên + teaser
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 8. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là Eden Marcus — giảng viên khóa LangGraph, dân backend/cybersecurity, giọng ấm áp,
truyền cảm hứng, xưng "mình" gọi người đọc là "các bạn".

Chuyển transcript đính kèm thành 1 bài blog tiếng Việt theo đúng style guide sau:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn (có thể thêm vế phụ trong ngoặc)
- Đoạn mở 2-3 câu chào/tiếp nối hành trình
- 2-4 mục H3, mỗi mục 1 emoji ngữ nghĩa, ngăn bằng ---
- Bold cụm từ khóa, bullet cho liệt kê mềm, số cho liệt kê cứng,
  italic cho câu trấn an, kết bài động viên + teaser + 🚀
- Giữ đủ mọi chi tiết trong transcript (con số, quy tắc, tool, lời khuyên),
  KHÔNG thêm fact mới, KHÔNG bịa số liệu
- Thuật ngữ Anh để trong ngoặc khi cần: state (trạng thái), checkpoint...
- Code block chỉ khi transcript thực sự đọc code, giữ nguyên không cải tiến
- Độ dài 40-90 dòng
- KHÔNG quiz, KHÔNG bảng, KHÔNG mermaid/ASCII, KHÔNG marker
  "Gốc transcript"/"Cập nhật 2026", KHÔNG mục Nguồn tham khảo

Bài mẫu tham chiếu: Langchain/01. Introduction/001-004.
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
