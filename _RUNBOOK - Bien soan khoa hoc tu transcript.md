# RUNBOOK — Biên soạn khóa học từ transcript Udemy thành blog tiếng Việt

> Dành cho phiên làm việc mới. Đọc file này là có thể chạy lại toàn bộ quy trình mà không cần hỏi lại.
> Đã áp dụng thành công cho 3 khóa: LangChain (173 bài), LangGraph (70 bài), BackEnd (59 bài) = **302 bài blog**.

---

## 1. Người dùng chỉ cần cung cấp 4 thứ

| # | Thông tin | Ví dụ |
|---|---|---|
| 1 | Tên khóa | "Nginx Crash Course" |
| 2 | Đường dẫn HTML snapshot Udemy | `...\Open-Knowledge\<Category>\<Course>\Course_ ... .html` (nếu chưa có HTML thì bỏ qua, dùng `# Section:` trong transcript làm cấu trúc) |
| 3 | Đường dẫn thư mục transcript nguồn | `C:\Users\ThuyetMT\Documents\work\mcp\udemy_transcript\transcripts-ua\<course-slug>` |
| 4 | Đường dẫn thư mục đích | `...\Open-Knowledge\<Category>\<Course>` |
| 5 (tuỳ chọn) | Giảng viên / giọng văn đặc biệt | Mặc định giọng trung tính "mình - các bạn" |

**Câu lệnh mở phiên mới (user paste):**

```text
Đọc file C:\Users\ThuyetMT\Documents\work\Open-Knowledge\_RUNBOOK - Bien soan khoa hoc tu transcript.md
và làm khóa mới:
- Tên khóa: <...>
- HTML: <đường dẫn hoặc "không có">
- Transcript nguồn: <đường dẫn>
- Thư mục đích: <đường dẫn>
- Giảng viên: <tên> (giọng văn: <mô tả ngắn hoặc "mặc định">)
```

---

## 2. Sản phẩm cuối cùng

1. N thư mục section `NN. <Tên Section>` theo HTML
2. M file blog `.md` (1 file `.txt` → 1 file `.md`), tên `NNN - <Short Title>.md`
3. `_STYLE - Blog style guide.md` riêng cho khóa (giọng giảng viên)
4. `MUC_LUC.md` — index clickable toàn khóa
5. (tuỳ chọn, hỏi user) xóa file `.txt` bản copy trong thư mục khóa — **bản gốc trong `transcripts-ua` luôn giữ nguyên**

---

## 3. Quy ước bất biến

- **Folder section**: lấy đúng tên từ HTML, dạng `01. Introduction`, `02. ...`. Số 2 chữ số.
- **Tên file `.md`**: `NNN - <Tiêu đề ngắn Title Case>.md`, trong đó `NNN` = prefix 3 số của file `.txt` tương ứng (giữ nguyên numbering nguồn, KHÔNG đánh lại).
- **Numbering**: nếu HTML và transcript lệch số (do HTML có quiz/resource không có transcript), chốt 1 nguồn và ghi chú trong MUC_LUC. Đã gặp 2 kiểu:
  * LangChain/LangGraph: giữ theo số transcript UA (`# N.`)
  * BackEnd: giữ theo numbering HTML (prefix file txt do user organize, có khoảng trống)
- **Không sửa/xóa/đổi tên `.txt`** cho tới khi khóa hoàn tất và user xác nhận dọn.
- Bỏ qua `_ALL.md`, bỏ qua thư mục `Course_ ... _files`.
- Mọi file `.md` viết **UTF-8**, tiếng Việt có dấu đầy đủ.

---

## 4. Quy trình 7 bước

### Bước 0 — Inventory (bắt buộc, không đoán)

Viết script Python tạm vào `C:\Users\ThuyetMT\AppData\Local\Temp\opencode\*.py` rồi chạy (PowerShell không hợp với `python -c` dài, dễ lỗi dấu `&`/nháy).

Script cần xuất ra file text để đọc:
1. Parse HTML (HTMLParser, bỏ `script/style/noscript`): lấy `<title>`, danh sách `Section N: ...`, danh sách bài `N. Tên bài`.
2. Liệt kê thư mục transcript nguồn: tên file, size KB, 3 dòng đầu (`# N.`, `# Section:`, URL).
3. Đối chiếu: số section HTML vs `# Section:` trong transcript; phát hiện bất thường (file thiếu, numbering lệch, caption tiếng lạ).

### Bước 1 — Tạo folder + copy transcript vào đích

Script Python:
- `mkdir` các folder section theo HTML (sanitize: bỏ ký tự không hợp lệ Windows, giữ dấu cách).
- Đọc `# Section:` từng file txt → map sang folder → `shutil.copy2`.
- In tổng kết: mỗi folder bao nhiêu file, file nào không map được.

### Bước 2 — Viết `_STYLE - Blog style guide.md` cho khóa

Copy cấu trúc từ style guide cũ (mẫu tốt: `AI\LangGraph\_STYLE - Blog style guide.md` hoặc `BackEnd\_STYLE - Blog style guide.md`), chỉnh:
- **Giọng giảng viên**: giữ format, đổi voice. 2 giọng đã có tiền lệ:
  * Eden Marco (AI): ấm áp, truyền cảm hứng, "mình là Eden đây"
  * Hussein Nasser (BackEnd): năng lượng, thực chiến, "hiểu under the wire, không black box"
  * Giảng viên mới: đọc 2-3 transcript đầu để bắt giọng (cách xưng, mức trang trọng, từ nhấn)
- **Thuật ngữ kèm note** theo chủ đề khóa (3-6 ví dụ trong style guide).
- **Quy tắc format bất biến** (giữ nguyên từ style guide gốc):
  * H1: 1 emoji + tiêu đề tiếng Việt hấp dẫn
  * Mở bài 2-3 câu xưng "mình", gọi "các bạn"
  * 2-5 mục H3, mỗi mục 1 emoji, ngăn bằng `---`
  * Bold cụm khóa; bullet liệt kê mềm; số liệt kê cứng; italic câu trấn an
  * Kết bài chốt ý + teaser bài sau + 🚀
  * Độ dài: 40-90 dòng (khóa lớn có thể 50-120 dòng)
  * **CẤM**: marker `Gốc transcript:`/`Cập nhật 2026:`, dòng meta "Dưới đây là bài viết được chuyển thể...", dòng "Bài N — ..."
  * Code block: **chỉ chèn khi transcript thực sự đọc code**; giữ nguyên, không cải tiến
  * Diagram: **được chèn Mermaid đơn giản** (`flowchart TD/LR`, `sequenceDiagram`) khi bài có flow/architecture (agent loop, graph, pipeline, handshake...); label không chứa `()<>:`, diagram ≤ 12 node, phải khớp nội dung. Cấm ASCII và các loại diagram khác (`stateDiagram`, `timeline`, `classDiagram`)
  * Bảng đối chiếu: **được phép** khi có 2+ khái niệm cần so sánh rõ; tên cột ngắn gọn, không lập bảng trang trí
  * Quiz: **được phép** (khuyến khích với bài lý thuyết) — nếu có thì đúng 5 câu, đáp án trong `<details><summary><b>Xem đáp án</b></summary>`, đặt cuối bài trước teaser
  * Nguồn: dòng nguồn đầu bài (dạng `> Nguồn: <file txt> · [Udemy](url)`, URL lấy từ dòng 3 của txt) + mục `## Nguồn tham khảo` cuối bài khi có nguồn ngoài thật; chỉ URL đã xác minh, cấm chế link

### Bước 3 — Chạy sub-agent theo wave

**Nguyên tắc chia nhóm:**
- Mỗi agent phụ trách **1 hoặc nhiều folder**, tổng transcript ≤ ~100KB (bài >50KB thì 1 agent 1-2 file).
- Mỗi agent ~3-12 file tùy size. Tránh nhồi >12 file/agent.
- **5-6 agent song song / wave**. Hết wave verify rồi mới chạy wave tiếp.

**Prompt template cho mỗi sub-agent** (đã kiểm chứng qua ~30 lần chạy):

```text
Bạn là biên tập viên blog cho khóa học Udemy "<TÊN KHÓA>" (giảng viên <TÊN>). Nhiệm vụ: chuyển TẤT CẢ file transcript .txt trong phạm vi được giao thành bài blog tiếng Việt theo style đã duyệt. Làm hết mọi file, không dừng giữa chừng.

BƯỚC 0 — ĐỌC TRƯỚC (bắt buộc):
1. Style guide: `<_STYLE - Blog style guide.md của khóa>`
2. 4 bài mẫu FORMAT (chỉ bắt chước cấu trúc/trình bày, giọng văn theo style guide của khóa): `...\AI\Langchain\01. Introduction\001 - Course Introduction.md`, `002`, `003`, `004`

BƯỚC 1 — Với MỖI .txt trong phạm vi: đọc TOÀN BỘ transcript, rồi viết 1 file .md CÙNG thư mục:
- Tên file: `<3 số đầu> - <Tiêu đề ngắn>.md` (Title Case tiếng Anh, gọn). Nếu file .md cùng số đã tồn tại thì ghi đè.
- Nội dung: H1 emoji + tiêu đề Việt hấp dẫn; mở bài 2-3 câu; 3-5 mục H3 emoji + `---`; bold/bullet/số/italic; kết chốt + teaser 🚀; độ dài theo style guide.
- Trung thành transcript: đủ ý, đủ số liệu, đủ tên tool/API giảng viên nhắc; KHÔNG bịa. Được sáng tạo tiêu đề, đề mục, câu chuyển ý.
- CODE: chỉ chèn code block khi transcript thực sự đọc code; giữ nguyên, không cải tiến.
- DIAGRAM: được chèn Mermaid đơn giản (`flowchart TD/LR`, `sequenceDiagram`) khi bài có flow/architecture; label không chứa `()<>:`, tối đa 12 node, khớp nội dung. Cấm ASCII diagram và các loại khác.
- BẢNG: được dùng khi có 2+ khái niệm cần so sánh rõ; tên cột ngắn gọn, không lập bảng trang trí.
- QUIZ: được phép (khuyến khích với bài lý thuyết) — nếu có thì đúng 5 câu, đáp án trong `<details><summary><b>Xem đáp án</b></summary>`, đặt cuối bài trước teaser.
- NGUỒN: thêm dòng nguồn đầu bài (tên file .txt + URL Udemy lấy từ dòng 3 của txt) và mục "## Nguồn tham khảo" cuối bài khi có nguồn ngoài thật; chỉ dùng URL đã xác minh, KHÔNG chế link.
- Tiếng Việt CÓ DẤU đầy đủ. Thuật ngữ Anh kèm giải nghĩa trong ngoặc lần đầu.
- TUYỆT ĐỐI KHÔNG: marker, dòng "Bài N — ...". Chuẩn hóa lỗi auto-caption khi CHẮC CHẮN, không đoán.
- KHÔNG sửa/xóa/đổi tên .txt. Không động thư mục ngoài phạm vi.

BƯỚC 2 — Khi xong: trả về DUY NHẤT 1 message tổng kết ngắn: số file đã tạo, danh sách `NNN - Tên.md`, vấn đề gặp phải. Không paste nội dung bài.

PHẠM VI ĐƯỢC GIAO:
- Thư mục: `<đường dẫn folder section>`
- <Tất cả N file .txt | CHỈ các file có số: ...>
```

### Bước 4 — Verify sau mỗi wave

```powershell
Get-ChildItem -Path "<ROOT>" -Directory | Where-Object { $_.Name -match '^\d\d\.' } | ForEach-Object {
  $md = @(Get-ChildItem -Path $_.FullName -Filter *.md -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^\d{3} - ' })
  $txt = @(Get-ChildItem -Path $_.FullName -Filter *.txt -File -ErrorAction SilentlyContinue)
  "{0} | txt={1} md={2} | {3}" -f $_.Name, $txt.Count, $md.Count, $(if ($txt.Count -eq $md.Count) {'OK'} else {'CHECK'})
}
```

- Spot-check 1-2 file mỗi wave (đọc bằng Read tool): đúng giọng, đủ mục, không lỗi format.
- Kiểm tra anomaly tên file: pattern phải là `^\d{3} - `.

### Bước 5 — Xử lý agent fail

Kinh nghiệm: **~10-15% agent trả kết quả rỗng và không ghi file** (dù state "completed"). Luôn verify sau wave.
- Nếu thiếu file → chạy lại nhóm đó, **chia nhỏ hơn** (2-3 file/agent), thêm câu: *"Đây là lần chạy lại, hãy chắc chắn hoàn thành và TỰ KIỂM TRA file đã ghi thành công trước khi kết thúc."*
- Sau 2 lần fail vẫn không xong → tách 1 file/agent.

### Bước 6 — Tạo `MUC_LUC.md`

Script Python (mẫu tại lịch sử: `build_index.py` / `build_index_be.py` trong temp):
- Sắp xếp folder section tự nhiên, đọc dòng H1 từng file md lấy tiêu đề.
- Format mỗi bài: `- [NNN - Tên](<folder/NNN - Tên.md>) — <tiêu đề H1 bỏ dấu #>`
- Link dùng **angle bracket** `<...>` vì đường dẫn có dấu cách.
- Header ghi: nguồn cấu trúc (HTML + transcript), tổng số, ghi chú các bài không có transcript, trỏ tới `_STYLE - Blog style guide.md`.

### Bước 7 — Dọn `.txt` (chỉ khi user yêu cầu)

- Chỉ xóa file `.txt` trong folder section của khóa; **loại trừ** thư mục `Course_ ... _files`.
- Bản gốc `transcripts-ua\<slug>` + `_ALL.md` phải còn (verify trước khi xóa).
- Script đối chiếu: mỗi txt phải có md cùng số trước khi xóa (an toàn).

### Bước 8 — Retrofit khóa đã viết (khi luật style thay đổi)

Đã chạy thành công cho 302 bài (Mermaid + Bảng + Quiz + Nguồn). Cách chạy:
- **Golden sample trước**: chọn 1 bài có flow, tự tay retrofit đầy đủ 4 hạng mục làm mẫu chuẩn, rồi cho agent tham chiếu bài mẫu đó.
- **Prompt retrofit**: dùng template ở mục 4 với các khác biệt:
  * "CHỈ THÊM nội dung, KHÔNG xóa/viết lại nội dung cũ, KHÔNG đổi tên file" — dùng **Edit tool chèn**, không Write đè.
  * Thêm 4 hạng mục: dòng nguồn sau H1 · Mermaid khi có flow · Bảng khi có so sánh · Quiz 5 câu trước teaser · `## Nguồn tham khảo` cuối file.
  * Nhóm ~7-12 file/agent, 6 agent/wave; mỗi file đều phải tìm URL từ transcript gốc trong `transcripts-ua` (khóa BackEnd ghép theo **tiêu đề** vì numbering lệch).
  * Yêu cầu agent trả về danh sách hạng mục **bỏ qua + lý do** (Mermaid/Bảng/Quiz) để dễ soát.
- **Verify sau mỗi wave**: script đếm `> Nguồn:`, `## Nguồn tham khảo`, `<details>`, ` ```mermaid `, pattern bảng.
- Kết quả chuẩn đã đạt: 302/302 dòng nguồn + refs; 294 quiz; 267 Mermaid; 251 bảng (phần thiếu là các bài setup/thông báo — hợp lệ).

---

## 5. Bài học kinh nghiệm (pitfalls)

1. **Không dùng `python -c` dài trong PowerShell** — dấu `&`, nháy, unicode dễ vỡ. Luôn viết script `.py` vào temp rồi chạy.
2. **Console PowerShell hiển thị lỗi font tiếng Việt** — file vẫn UTF-8 đúng; verify bằng Read tool chứ đừng tin mắt qua `Get-Content`.
3. **Agent có thể tự "sáng tác" ngoài transcript** — prompt phải nhấn "KHÔNG bịa" và phạm vi tuyệt đối; verify spot-check.
4. **Transcript auto-caption sai tên** (Landgraf→LangGraph, "Ethan here"→Eden, "web RTC"→WebRTC...) — chỉ chuẩn hóa khi ngữ cảnh xác nhận; không chắc thì viết trung tính.
5. **Số liệu trong transcript**: giữ nguyên (kể cả khi giảng viên nói "khoảng", "hơn"). Không tự tính lại.
6. **Caption tiếng nước ngoài** (ar_AR, it_IT, fr_FR): dịch nghĩa sang tiếng Việt, không bỏ bài.
7. **Bài quiz/lab/resource/không có transcript**: không bịa, để trống + ghi chú trong MUC_LUC.
8. **Khóa có code vs lý thuyết**: quy tắc code nằm trong style guide từng khóa.
9. **Sau mỗi wave**: cập nhật trạng thái (đã xong folder nào) để không chạy trùng.

---

## 6. Tham chiếu các khóa đã hoàn thành

| Khóa | Bài | Thư mục | Style guide | Mục lục |
|---|---|---|---|---|
| LangChain (Eden Marco) | 173 | `AI\Langchain` | ✓ | ✓ |
| LangGraph (Eden Marco) | 70 | `AI\LangGraph` | ✓ | ✓ |
| Fundamentals of Backend Engineering (Hussein Nasser) | 59 | `BackEnd` | ✓ | ✓ |

- **Mẫu format chuẩn (bất biến)**: `AI\Langchain\01. Introduction\001 - Course Introduction.md` → `004 - Course Community.md`
- **Mẫu style guide**: `AI\LangGraph\_STYLE - Blog style guide.md` (Eden) và `BackEnd\_STYLE - Blog style guide.md` (Hussein)
- **Mẫu MUC_LUC**: `BackEnd\MUC_LUC.md` (gọn, có ghi chú bài thiếu), `AI\Langchain\MUC_LUC.md` (lớn, 30 section)

---

## 7. Checklist nhanh cho phiên mới

```text
[ ] Nhận đủ 4 thông tin từ user
[ ] Bước 0: inventory HTML + transcript, chốt numbering, phát hiện bất thường
[ ] Bước 1: tạo folder + copy txt, verify map đủ
[ ] Bước 2: viết style guide khóa mới (đổi giọng, giữ format)
[ ] Bước 3: chia nhóm agent (≤100KB/nhóm), chạy wave 5-6 agent
[ ] Bước 4: verify counts + spot-check sau MỖI wave
[ ] Bước 5: retry nhóm fail với scope nhỏ hơn
[ ] Bước 6: tạo MUC_LUC.md clickable
[ ] Bước 7: hỏi user có dọn .txt không (giữ bản gốc transcripts-ua)
[ ] Báo cáo tổng kết: số bài, số section, điểm cần lưu ý
```
