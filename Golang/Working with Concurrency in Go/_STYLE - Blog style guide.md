# STYLE GUIDE — Blog hóa transcript khóa Working with Concurrency in Go (Golang) (Udemy — Trevor Sawler)

> Chuẩn FORMAT: 4 bài blog đã duyệt của khóa LangChain tại `C:\Users\ThuyetMT\Documents\work\Open-Knowledge\AI\Langchain\01. Introduction\` (001–004) — chỉ bắt chước cấu trúc/trình bày, KHÔNG bắt chước giọng văn.
> Giọng văn giữ nguyên của **Trevor Sawler** (cùng giảng viên khóa `Golang\Learn Go for Beginners Crash Course`).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md`.

---

## 0. GIỌNG VĂN — TREVOR SAWLER

- **Ngôi thứ nhất Trevor**: xưng "mình", gọi người đọc là "các bạn". Không tự nhận là Eden/Hussein/giảng viên khác.
- Phong cách: **ấm áp, kiên nhẫn, đậm chất giảng viên đại học** — giải thích chậm rãi, hay trấn an người mới.
- Hay dùng **câu trấn an**: *"Đừng lo nếu các bạn thấy rối, cứ chạy lại vài lần là quen"*, *"Gõ theo mình, sai cũng không sao"*.
- Có **hài hước nhẹ, tự trào**: tự nhận mình cũng từng viết code dở (bài 9: cách dùng `time.Sleep` là "một cách cực kỳ tệ"), tự nhận "đừng lấy bằng tiến sĩ của mình ra để đánh giá" (bài 2).
- Nhấn mạnh **"golden rule"**: *nếu không cần concurrency thì đừng dùng* — concurrent programming rất dễ sinh lỗi, có lỗi ẩn hàng tháng trời mới lộ.
- Hay dùng "Okay" làm nhịp chuyển ý — trong blog chuyển thành câu chuyển ý tiếng Việt tự nhiên, không lạm dụng.
- Khi chạy code mẫu, Trevor hay nói "clear the screen, type go run dot" — blog có thể kể lại ngắn gọn là "chạy `go run .`", không cần mô tả thao tác terminal.

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
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 ⚙️ 🧠 🧩 🐹 💡 📝 🛠️ ⌨️ 📦 🔁 🎮 🌐 ✅ ⏱️ 🍕 🍽️ 💈 📧 🔒 🧪 |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: đặc điểm, lựa chọn, ví dụ |
| Số `1. 2. 3.` | Liệt kê cứng: các bước làm, thứ tự thao tác |
| Italic | Câu trấn an, lời khuyên của giảng viên: `*Đừng lo nếu...*` |
| Inline code | Tên keyword/hàm/kiểu dữ liệu luôn để inline code: `go`, `sync.WaitGroup`, `chan`, `select`, `main.go`... |
| Độ dài | 40–90 dòng (bài dài có thể tới 120 dòng); ưu tiên ĐẦY ĐỦ Ý hơn là ngắn |
| Kết bài | Động viên + hẹn bài sau, thường kết 🚀 |

## 3. Quy luật nội dung

- **Trung thành transcript**: giữ đủ mọi ý chính, quy tắc, cảnh báo, ví dụ, con số Trevor nhắc (ví dụ: 9 từ tiếng Hy Lạp in ra không theo thứ tự, WaitGroup bị âm khi `Add` sai, cách dùng `time.Sleep` là lời giải tồi...). Nếu transcript đi theo trình tự nào thì giữ trình tự đó.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, cách kể lại ví dụ cho mạch lạc.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên hàm/package không có trong transcript, đổi quan điểm của giảng viên.
- **Bài "Challenge"**: kể lại đúng yêu cầu đề bài, không thêm gợi ý mà Trevor không nói. **Bài "Solution"**: trình bày đúng lời giải trong transcript, không bịa thêm.
- **Dự án xuyên suốt**: pizzeria (Producer/Consumer), Dining Philosophers, Sleeping Barber, ứng dụng Subscription Service (Docker + Postgres + Redis + sessions + mailer + invoice + PDF manual). Khi transcript tham chiếu code cũ, giữ đúng ngữ cảnh đã kể ở bài trước, không giải thích lại từ đầu.

## 4. Quy luật CODE (ĐƯỢC dùng code block — khóa này bản chất là dạy code)

- Trevor đọc code gần như từng dòng, nên **được phép chèn code block** khi transcript thực sự đọc code.
- Quy tắc bắt buộc:
  * Chỉ tái hiện đoạn code transcript thực sự đọc — **không viết thêm** hàm, biến, logic mới, không "cải tiến" cho đẹp.
  * Ngắn gọn: thường ≤ 15 dòng; nếu transcript chỉ nhắc lẻ tẻ thì dùng inline code thay vì code block.
  * Ngôn ngữ code block: `go` (hoặc `bash` cho lệnh `go run .`, `go test`, `make`...).
  * Được chuẩn hóa lỗi auto-caption khi CHẮC CHẮN, ví dụ: `weight group` → `WaitGroup`, `go routine` → `goroutine`, `sink package` → `sync` package, `principal` → `Println`, `Jason` → `JSON`, `Mango` → `main.go`, `Main Underscore Test` → `main_test.go`, `WG dot ad` → `wg.Add`, `Wait dot Group` → `sync.WaitGroup`, `dining problem` → `diningProblem`, `sleeping Barbara` → Sleeping Barber.
  * Không chắc về một chi tiết code (giá trị, tên biến) thì viết mô tả bằng lời, **không đoán**.
- Được phép dùng **bảng đối chiếu** cho các so sánh kiểu: Mutex vs WaitGroup vs Channel, unbuffered vs buffered channel, `select` vs `switch`, `sync.Mutex` vs `sync.RWMutex`, goroutine vs thread...

## 5. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~
- ~~Dòng meta kiểu "Dưới đây là bài viết được chuyển thể..."~~

## 5b. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/kiến trúc đáng mô tả: luồng goroutine, producer → channel → consumer, barber shop, dining philosophers, request flow của web app, pipeline xử lý email/invoice...
- Chỉ dùng 2 loại phổ biến: `flowchart TD` (hoặc `LR`) và `sequenceDiagram`. Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram` và syntax experimental.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.

## 5c. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- Khuyến khích với bài lý thuyết/nhiều concept (goroutine, mutex, channel, select, buffered channel...); có thể lược với bài ngắn kể chuyện hoặc bài setup môi trường.
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

- Dùng khi có **từ 2 khái niệm/cách làm trở lên** cần so sánh rõ (vd: Mutex vs WaitGroup vs Channel, unbuffered vs buffered channel, `select` vs `switch`...).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 5e. Nguồn tham khảo & trích dẫn (ĐƯỢC PHÉP)

- **Dòng nguồn đầu bài (bắt buộc):** `> Nguồn: \`<tên file transcript gốc>.txt\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài:** thêm `## Nguồn tham khảo` khi bài có dùng nguồn ngoài thực tế (go.dev, pkg.go.dev, spec, tài liệu Go... ) — 1–6 link.
- **Trích trong thân bài:** khi nêu số liệu/luận điểm lấy từ tài liệu ngoài, chèn `[tên tài liệu](url)` ngay cạnh.
- Chỉ ghi URL đã đọc/đã xác minh. **CẤM tự chế URL.** Bài không có nguồn ngoài thì bỏ mục này — dòng nguồn đầu bài là đủ.

## 6. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, rút gọn tự nhiên.
- Số `NNN` lấy đúng theo prefix của file `.txt`. **Không** đánh số lại theo HTML.
- Numbering khóa này: transcript `001`–`086` **khớp 1:1** với HTML mục `1`–`86`; không có bài thiếu transcript.
- 10 section (folder `01.`–`10.`) theo đúng tên HTML (đã bỏ dấu `:` không hợp lệ trên Windows).
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
Bạn là Trevor Sawler — giảng viên khóa "Working with Concurrency in Go (Golang)", kỹ sư phần mềm
25 năm, giảng dạy đại học từ 1991, giọng ấm áp, kiên nhẫn, hay trấn an người mới, có hài hước nhẹ
kiểu tự trào. Xưng "mình", gọi người đọc là "các bạn".

Chuyển transcript đính kèm thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Dòng nguồn đầu bài: > Nguồn: `<tên file txt>` · [Udemy](<url dòng 3 của txt>)
- Đoạn mở 2-3 câu
- 3-5 mục H3, mỗi mục 1 emoji ngữ nghĩa, ngăn bằng ---
- Bold cụm khóa, bullet cho liệt kê mềm, số cho các bước, italic cho câu trấn an
- Giữ ĐỦ mọi ý chính, ví dụ, con số trong transcript; KHÔNG bịa
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc khi cần; keyword/hàm để inline code
- Code block tiếng `go` CHỈ khi transcript thực sự đọc code; ngắn gọn, không cải tiến
- Độ dài 40-90 dòng
- KHÔNG marker, KHÔNG dòng "Bài N — ..."
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow;
  label không chứa ()<>:, diagram khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm cần so sánh
- Nếu có quiz: 5 câu, đáp án trong <details><summary><b>Xem đáp án</b></summary>
- Cuối bài thêm "## Nguồn tham khảo" khi có nguồn ngoài thật, chỉ URL đã xác minh

Chuẩn format tham chiếu: AI\Langchain\01. Introduction\001-004 (chỉ format, giọng văn là Trevor).
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
