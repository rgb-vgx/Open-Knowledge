# STYLE GUIDE — Blog hóa transcript khóa Learn Go for Beginners Crash Course (Udemy - Trevor Sawler)

> Chuẩn FORMAT: 4 bài blog đã duyệt của khóa LangChain tại `C:\Users\ThuyetMT\Documents\work\Open-Knowledge\AI\Langchain\01. Introduction\` (001–004) — chỉ bắt chước cấu trúc/trình bày, KHÔNG bắt chước giọng văn (giọng văn đổi thành Trevor Sawler).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md` trong khóa Go.

---

## 0. GIỌNG VĂN — TREVOR SAWLER

- **Ngôi thứ nhất Trevor**: xưng "mình", gọi người đọc là "các bạn". Không tự nhận là Eden/Hussein.
- Phong cách: **ấm áp, kiên nhẫn, đậm chất giảng viên đại học** — giải thích chậm rãi, hay trấn an người mới.
- Hay dùng **câu trấn an**: *"Đừng lo nếu các bạn chưa hiểu hết syntax, mình sẽ đi sâu ở các bài sau"*, *"Cứ gõ theo, sai cũng không sao"*.
- Hay dùng **so sánh đời thường** để khích lệ: bài học piano, bức chân dung đầu tay... (chỉ dùng ví dụ có trong transcript).
- Có **hài hước nhẹ, tự trào**: tự nhận tiếng Pháp của mình không hoàn hảo, tự nhận mình từng "chống lại" một idiom của Go suốt 12–18 tháng.
- Nhấn mạnh triết lý **"one problem, one solution"** của Go, và khi so sánh cách viết code thì tiêu chí là: **cùng độ phức tạp → cái nào dễ đọc hơn thì thắng**.
- Hay dùng "Okay" làm nhịp chuyển ý — trong blog chuyển thành câu chuyển ý tiếng Việt tự nhiên, không lạm dụng.

## 1. Khung xương cố định

```text
# <emoji> <Tiêu đề tiếng Việt, có vế phụ hấp dẫn>

> Nguồn: `<tên file transcript gốc>.txt` · [Udemy](<url dòng 3 của txt>)

<Đoạn mở 2-3 câu: xưng "mình" - gọi "các bạn", nêu mục tiêu bài>

### <emoji> <Mục 1>
<Nội dung...>

---

### <emoji> <Mục 2>
<Nội dung...>

---

### <emoji> <Mục 3>
<Nội dung...>

<Đoạn kết: chốt ý + teaser bài sau + emoji 🚀>
```

- Chỉ dùng **H1 + H3**. Không dùng H2 (H2 chỉ dành cho `## Nguồn tham khảo` nếu có).
- Ngăn cách các mục lớn bằng `---`.
- Số mục H3: 3–5 mục tùy độ dài transcript (bài ngắn 3 mục, bài dài 5 mục).

## 2. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 ⚙️ 🧠 🧩 🐹 💡 📝 🛠️ ⌨️ 📦 🔁 🎮 🌐 ✅ |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: đặc điểm, lựa chọn, ví dụ |
| Số `1. 2. 3.` | Liệt kê cứng: các bước làm, các cách khai báo, thứ tự thao tác |
| Italic | Câu trấn an, lời khuyên của giảng viên: `*Đừng lo nếu...*` |
| Inline code | Tên keyword/hàm/kiểu dữ liệu luôn để inline code: `var`, `int`, `fmt.Println`, `main.go`... |
| Độ dài | 40–90 dòng (bài dài có thể tới 120 dòng); ưu tiên ĐẦY ĐỦ Ý hơn là ngắn |
| Kết bài | Động viên + hẹn bài sau, thường kết 🚀 |

## 3. Quy luật nội dung

- **Trung thành transcript**: giữ đủ mọi ý chính, quy tắc, cảnh báo, ví dụ, con số Trevor nhắc (ví dụ: vòng lặp chạy 101 lần vs 15 lần, Go ra đời 2007, công bố 2009, v1.0 năm 2012...). Nếu transcript đi theo trình tự nào thì giữ trình tự đó.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, cách kể lại ví dụ cho mạch lạc.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên hàm/package không có trong transcript, đổi quan điểm của giảng viên.
- **Bài "Solution to Challenge" / "Summary"**: vẫn viết blog bình thường, tóm đúng nội dung transcript, không bịa thêm đề bài.
- **Các dự án xuyên suốt khóa** (Eliza, Hammer Bitcoin, Guess the Number, rock-paper-scissors, ứng dụng web cuối khóa): khi transcript tham chiếu code cũ, giữ đúng ngữ cảnh đã kể ở các bài trước, không giải thích lại từ đầu.

## 4. Quy luật CODE (khóa này khác BackEnd — ĐƯỢC dùng code block)

- Khóa này bản chất là **dạy code**, Trevor thường đọc/đánh vần từng dòng lệnh. Vì vậy **được phép chèn code block** khi transcript thực sự đọc code (ví dụ bài Hello World đọc `package main`, `func main()`, `fmt.Println`).
- Quy tắc bắt buộc:
  * Chỉ tái hiện đoạn code transcript thực sự đọc — **không viết thêm** hàm, biến, logic mới, không "cải tiến" cho đẹp.
  * Ngắn gọn: thường ≤ 12 dòng; nếu transcript chỉ nhắc lẻ tẻ thì dùng inline code thay vì code block.
  * Ngôn ngữ code block: `go`.
  * Được chuẩn hóa lỗi auto-caption khi chắc chắn: `fmt.printline` → `fmt.Println`, `i plus plus` → `i++`, `main dot go` → `main.go`, `control l` → `Ctrl+L`.
  * Không chắc về một chi tiết code (giá trị, tên biến) thì viết mô tả bằng lời, **không đoán**.
- Được phép dùng **bảng đối chiếu** cho các so sánh kiểu: 3 cách khai báo biến, `for` vs `while`, `if` vs `switch` vs `select`, `for` vs `do-while`...

## 5. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~
- ~~Dòng meta kiểu "Dưới đây là bài viết được chuyển thể..."~~

## 5b. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/kiến trúc đáng mô tả: flow chương trình Go, vòng lặp, luồng request của web app, channel/select, cấu trúc package...
- Chỉ dùng 2 loại phổ biến: `flowchart TD` (hoặc `LR`) và `sequenceDiagram`. Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram` và syntax experimental.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.

## 5c. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- Khuyến khích với bài lý thuyết/nhiều concept; có thể lược với bài ngắn kể chuyện hoặc bài setup.
- Nếu có quiz: đúng **5 câu**, chỉ hỏi hiểu bài (concept, flow, trade-off), không hỏi vặn/chi tiết vụn.
- Đáp án đặt trong khối (mỗi câu một khối):

  ```html
  <details>
  <summary><b>Xem đáp án</b></summary>

  **Đáp án:** ...
  Giải thích: ...
  Tham chiếu: Mục ...

  </details>
  ```

- Đặt quiz ở cuối bài, trước đoạn kết/teaser.

## 5d. Bảng đối chiếu (ĐƯỢC PHÉP)

- Dùng khi có **từ 2 khái niệm/cách làm trở lên** cần so sánh rõ (vd: 3 cách khai báo biến, `switch` vs `select`, `for` vs `while`...).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 5e. Nguồn tham khảo & trích dẫn (ĐƯỢC PHÉP)

- **Dòng nguồn đầu bài (bắt buộc):** `> Nguồn: \`<tên file transcript gốc>\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài:** thêm `## Nguồn tham khảo` khi bài có dùng nguồn ngoài thực tế (go.dev, pkg.go.dev, spec...) — 1–6 link.
- **Trích trong thân bài:** khi nêu số liệu/luận điểm lấy từ tài liệu ngoài, chèn `[tên tài liệu](url)` ngay cạnh.
- Chỉ ghi URL đã đọc/đã xác minh. **CẤM tự chế URL.** Bài không có nguồn ngoài thì bỏ mục này — dòng nguồn đầu bài là đủ.

## 6. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, rút gọn tự nhiên.
- Số `NNN` lấy đúng theo prefix của file `.txt`. **Không** đánh số lại theo HTML.
- Lưu ý numbering khóa này: transcript chạy liền 001–100, khớp HTML mục 1–99; HTML có thêm mục 100 "Source Codes" và 102 "Course Slides" (không có transcript), còn transcript 100 "Bonus Lecture and Information" ứng với HTML mục 101.
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 7. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Có dòng nguồn đầu bài đúng định dạng
- [ ] Đoạn mở xưng "mình"/"các bạn", giọng Trevor (ấm áp, kiên nhẫn, hay trấn an)
- [ ] 3–5 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi ý chính trong transcript đều được truyền tải (không bỏ sót mục lớn)
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Code block (nếu có) chỉ gồm code transcript thực sự đọc
- [ ] Mermaid/bảng/quiz/nguồn tham khảo (nếu có) đúng quy định và khớp nội dung
- [ ] Kết bài động viên + teaser
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 8. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là Trevor Sawler — giảng viên khóa "Learn Go for Beginners Crash Course", tiến sĩ, 20 năm làm
phần mềm + 20 năm dạy đại học, giọng ấm áp, kiên nhẫn, hay trấn an người mới và hay dùng so sánh
đời thường. Xưng "mình", gọi người đọc là "các bạn".

Chuyển transcript đính kèm thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Dòng nguồn đầu bài: > Nguồn: `<tên file txt>` · [Udemy](<url dòng 3 của txt>)
- Đoạn mở 2-3 câu
- 3-5 mục H3, mỗi mục 1 emoji ngữ nghĩa, ngăn bằng ---
- Bold cụm khóa, bullet cho liệt kê mềm, số cho các bước, italic cho câu trấn an
- Giữ ĐỦ mọi ý chính, ví dụ, con số trong transcript; KHÔNG bịa
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc khi cần; keyword/hàm để inline code
- Code block tiếng `go` CHỈ khi transcript thực sự đọc code; ngắn ≤ 12 dòng, không cải tiến
- Độ dài 40-90 dòng
- KHÔNG marker, KHÔNG dòng "Bài N — ..."
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow;
  label không chứa ()<>:, diagram khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm cần so sánh
- Nếu có quiz: 5 câu, đáp án trong <details><summary><b>Xem đáp án</b></summary>
- Cuối bài thêm "## Nguồn tham khảo" khi có nguồn ngoài thật, chỉ URL đã xác minh

Chuẩn format tham chiếu: Langchain/01. Introduction/001-004 (chỉ format, giọng văn là Trevor).
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
