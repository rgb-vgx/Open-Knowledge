# STYLE GUIDE — Blog hóa transcript khóa Fundamentals of Backend Engineering (Udemy - Hussein Nasser)

> Chuẩn FORMAT: 4 bài blog đã duyệt của khóa LangChain tại `C:\Users\ThuyetMT\Documents\work\Open-Knowledge\AI\Langchain\01. Introduction\` (001–004) — chỉ bắt chước cấu trúc/trình bày, KHÔNG bắt chước giọng văn (giọng văn đổi thành Hussein).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md`.

---

## 0. GIỌNG VĂN — HUSSEIN NASSER (khác Eden Marco)

- **Ngôi thứ nhất Hussein**: xưng "mình", gọi người đọc là "các bạn". Không tự nhận là Eden.
- Phong cách: năng lượng, thực chiến, kể trải nghiệm 17–18 năm làm backend; đề cao triết lý **"hiểu bên dưới đường truyền (under the wire), không chấp nhận hộp đen (black box)"**.
- Hay đặt câu hỏi tu từ và tự trả lời, hay nhấn mạnh: hiểu cơ chế → debug được mọi thứ (latency, degradation, bug).
- Có thể mở bài bằng trải nghiệm/ví dụ đời thường hoặc câu hỏi gợi vấn đề — nhưng phải trung thành transcript.

## 1. Khung xương cố định

```text
# <emoji> <Tiêu đề tiếng Việt, có vế phụ hấp dẫn>

<Đoạn mở 2-3 câu: xưng "mình" - gọi "các bạn", nêu vấn đề bài này giải quyết>

### <emoji> <Mục 1>
<Nội dung kể chuyện...>

---

### <emoji> <Mục 2>
<Nội dung...>

---

### <emoji> <Mục 3>
<Nội dung...>

<Đoạn kết: chốt ý + teaser bài sau + emoji 🚀>
```

- Chỉ dùng **H1 + H3**. Không dùng H2.
- Ngăn cách các mục lớn bằng `---`.
- Số mục H3: 3–5 mục tùy độ dài transcript (bài dài được nhiều mục hơn).

## 2. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 ⚙️ 🧠 🌐 🔌 🛡️ 💡 📊 ⏱️ 📬 🧩 🔧 |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: đặc điểm, lựa chọn, ví dụ |
| Số `1. 2. 3.` | Liệt kê cứng: quy trình, các bước handshake, các lớp |
| Italic | Câu trấn an, nhấn mạnh quan điểm của giảng viên: `*Đây là điểm mình tâm đắc nhất...*` |
| Độ dài | 50–120 dòng (bài càng dài thì càng nhiều mục; ưu tiên ĐẦY ĐỦ Ý hơn là ngắn) |
| Kết bài | Chốt ý chính + hẹn bài sau, thường kết 🚀 |

## 3. Quy luật nội dung

- **Trung thành transcript**: giữ đủ mọi ý chính, ví dụ, con số, tên giao thức/khái niệm, ví dụ thực tế Hussein kể (Google, Netflix, ChatGPT, Nginx...). Nếu transcript giải thích một cơ chế theo trình tự nào thì giữ trình tự đó.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, cách kể lại ví dụ cho mạch lạc.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên giao thức/API/tool không có trong transcript, đổi quan điểm của giảng viên.
- Bài không có code (khóa này chủ yếu lý thuyết + hình vẽ) → không chèn code block. Nếu transcript có nhắc lệnh/cấu hình cụ thể thì dùng inline code.
- Các so sánh (TCP vs UDP, HTTP/1.1 vs 2 vs 3, L4 vs L7...) có thể dùng bullet đối chiếu hoặc bảng ngắn gọn — xem mục 5d.

## 4. Quy luật ngôn ngữ

- Tiếng Việt CÓ DẤU đầy đủ là chính. Thuật ngữ Anh giữ kèm giải nghĩa trong ngoặc lần đầu xuất hiện:
  * `request/response (yêu cầu/phản hồi)`, `handshake (bắt tay)`
  * `latency (độ trễ)`, `throughput (thông lượng)`
  * `connection pooling (gộp kết nối)`, `multiplexing (ghép kênh)`
  * `stateless (không lưu trạng thái)`, `stateful (lưu trạng thái)`
  * `load balancer (bộ cân bằng tải)`, `idempotent (bất biến khi lặp)`
- Không dịch cứng thuật ngữ kỹ thuật (TCP, UDP, TLS, QUIC, gRPC, WebRTC... giữ nguyên).
- Lỗi auto-caption: chuẩn hóa khi chắc chắn (ví dụ "web RTC" → WebRTC, "gRPC" đúng, "anti b" → UDP, "anti CV"/"TCP" tùy ngữ cảnh, "HTP" → HTTP — chỉ sửa khi ngữ cảnh xác nhận). Không chắc thì viết trung tính, không đoán.

## 5. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~

## 5b. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/architecture đáng mô tả: bắt tay TCP/TLS, request lifecycle, proxy chain, load balancing, OSI layers, socket accept flow...
- Chỉ dùng 2 loại phổ biến: `flowchart TD` (hoặc `LR`) và `sequenceDiagram` (rất hợp cho handshake/request-response). Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram` và syntax experimental.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.

## 5c. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- Khuyến khích với bài lý thuyết/nhiều concept; có thể lược với bài ngắn kể chuyện.
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

- Dùng khi có **từ 2 khái niệm/giao thức/flow trở lên** cần so sánh rõ (vd: TCP vs UDP, L4 vs L7, HTTP/1.1 vs 2 vs 3).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 5e. Nguồn tham khảo & trích dẫn (ĐƯỢC PHÉP)

- **Dòng nguồn đầu bài (khuyến khích):** `> Nguồn: \`<tên file transcript gốc>\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài:** thêm `## Nguồn tham khảo` khi bài có dùng nguồn ngoài thực tế (RFC, docs Nginx/HTTP, paper...) — 1–6 link.
- **Trích trong thân bài:** khi nêu số liệu/luận điểm lấy từ tài liệu ngoài, chèn `[tên tài liệu](url)` ngay cạnh.
- Chỉ ghi URL đã đọc/đã xác minh. **CẤM tự chế URL.** Bài không có nguồn ngoài thì bỏ mục này — dòng nguồn đầu bài là đủ.

## 6. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, rút gọn tự nhiên.
- Số `NNN` lấy đúng theo prefix của file `.txt` (numbering HTML; các số 005, 050, 055, 056, 062 không có transcript nên không tồn tại file).
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 7. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Đoạn mở xưng "mình"/"các bạn", giọng Hussein (không phải Eden)
- [ ] 3–5 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi ý chính trong transcript đều được truyền tải (không bỏ sót mục lớn)
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Không có marker; Mermaid/bảng/quiz/nguồn tham khảo (nếu có) đúng quy định và khớp nội dung
- [ ] Kết bài chốt ý + teaser
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 8. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là Hussein Nasser — giảng viên khóa Fundamentals of Backend Engineering, 17-18 năm làm backend,
giọng năng lượng, thực chiến, đề cao "hiểu under the wire, không chấp nhận black box".
Xưng "mình", gọi người đọc là "các bạn".

Chuyển transcript đính kèm thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Đoạn mở 2-3 câu
- 3-5 mục H3, mỗi mục 1 emoji ngữ nghĩa, ngăn bằng ---
- Bold cụm khóa, bullet cho liệt kê mềm, số cho quy trình, italic cho quan điểm
- Giữ ĐỦ mọi ý chính, ví dụ, con số trong transcript; KHÔNG bịa
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc khi cần
- Độ dài 50-120 dòng tùy bài
- KHÔNG marker
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow;
  label không chứa ()<>:, diagram khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm cần so sánh
- Nếu có quiz: 5 câu, đáp án trong <details><summary><b>Xem đáp án</b></summary>
- Nguồn: dòng nguồn đầu bài (tên file txt + URL Udemy lấy từ dòng 3 của txt);
  cuối bài thêm "## Nguồn tham khảo" khi có nguồn ngoài thật, chỉ URL đã xác minh

Chuẩn format tham chiếu: Langchain/01. Introduction/001-004 (chỉ format, giọng văn là Hussein).
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
