# STYLE GUIDE — Blog hóa transcript khóa "Ultimate AWS Certified Cloud Practitioner CLF-C02 2026" (Udemy — Stephane Maarek)

> Chuẩn tham chiếu format: 4 bài blog đã duyệt của khóa LangChain tại `C:\Users\ThuyetMT\Documents\work\Open-Knowledge\AI\Langchain\01. Introduction\` (001–004).
> Chuẩn tham chiếu giọng văn khóa này: 4 bài `01. Introduction\001 – 004` (bản AWS do mình viết trước).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md`.

---

## 1. Khung xương cố định

```text
# <emoji> <Tiêu đề tiếng Việt, hấp dẫn, có thể thêm vế phụ (Đừng bỏ qua.../Hướng dẫn...)/>

> Nguồn: `<tên file txt>` · [Udemy](<url lấy từ dòng 3 của txt>)

<Đoạn mở 2-3 câu: chào/tiếp nối hành trình, xưng "mình" - gọi "các bạn", nêu mục đích bài>

### <emoji> <Mục 1>
<Nội dung...>

---

### <emoji> <Mục 2>
<Nội dung...>

---

### <emoji> <Mục 3>
<Nội dung...>

<Đoạn kết: chốt ý + động viên + teaser bài sau + 🚀>
```

- Chỉ dùng **H1 + H3**. Không dùng H2 (trừ `## Nguồn tham khảo` cuối bài).
- Ngăn cách các mục lớn bằng `---`.
- Số mục H3: 2–5 mục tùy độ dài transcript.
- **Dòng nguồn đầu bài** đặt ngay sau H1: `> Nguồn: \`001-Course-Introduction.txt\` · [Udemy](https://ua.udemy.com/...)`.

## 2. Giọng văn — Stephane Maarek

- Xưng **"mình"**, gọi người đọc là **"các bạn"** (giọng mặc định của kho).
- Năng lượng cao, thực dụng, **tập trung thi cử**: nhấn rõ khi một kiến thức "sẽ xuất hiện trong đề thi", "rất hay được hỏi", "đừng bỏ qua".
- **Trấn an người mới**: "đừng lo nếu bạn chưa có nền IT", "cứ từng bước một, đây không phải cuộc đua", "mình sẽ giải thích mọi thứ".
- **Học qua thực hành (learn by doing / hands-on)**: khuyến khích các bạn tự mở AWS console và làm theo, tự tay tạo tài khoản, bấm thử.
- Hay dùng câu dẫn: "Được rồi, chúng ta cùng bắt đầu nào", "Vậy là xong phần này", "Hẹn gặp các bạn ở bài tiếp theo".
- Không lên gân học thuật; giải thích khái niệm bằng ví dụ đời thường và tình huống doanh nghiệp.
- Kết bài luôn có năng lượng tích cực + lời hẹn bài sau + 🚀.

## 3. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 💰 🧱 🔐 ⚙️ 🗺️ 💡 📊 🚀 ⚠️ 🧪 |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: dịch vụ, lựa chọn, kênh liên hệ |
| Số `1. 2. 3.` | Liệt kê cứng: các bước quy trình, thứ tự thao tác |
| Nhãn số | Dạng `**1. Học theo thứ tự:**` hoặc `1. **Tạo tài khoản:**` đều chấp nhận |
| Italic | Câu trấn an, bình luận riêng: `*Đừng lo nếu bạn chưa từng dùng AWS...*` |
| Code | Chỉ chèn code block khi transcript THỰC SỰ đọc code (vd: policy JSON, lệnh CLI). Giữ nguyên như transcript, không cải tiến, không thêm code ngoài transcript |
| Độ dài | 40–90 dòng/bài; khóa lớn có thể 50–120 dòng |
| Kết bài | Chốt ý + động viên + hẹn bài sau, kết 🚀 |

## 4. Quy luật nội dung

- **Bám sát transcript**: mọi chi tiết gốc phải được truyền tải (con số, quy tắc, tên dịch vụ, mã đề thi, lời khuyên, ví dụ). Nếu transcript liệt kê danh sách thì giữ đủ mục.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, emoji.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên dịch vụ/tính năng AWS không có trong transcript, đổi logic lời khuyên của giảng viên.
- Được gộp các câu ngắn rời rạc thành đoạn văn liền mạch; giữ đúng mạch bài giảng.
- Bài hands-on: tóm tắt đúng các bước thao tác trên console (không cần kể từng cú click vụn vặn, nhưng phải đủ để làm lại).

## 5. Quy luật ngôn ngữ

- Tiếng Việt CÓ DẤU đầy đủ là chính. Thuật ngữ Anh giữ kèm giải nghĩa trong ngoặc khi cần:
  * `IAM (Identity and Access Management — quản lý danh tính và truy cập)`
  * `EC2 (Elastic Compute Cloud — máy chủ ảo đàn hồi)`
  * `S3 (Simple Storage Service — dịch vụ lưu trữ đối tượng)`
  * `region (vùng), Availability Zone (vùng sẵn sàng), edge location (điểm biên)`
  * `root user (người dùng gốc), MFA (xác thực đa yếu tố), access key (khóa truy cập)`
  * `free tier (gói miễn phí), hands-on (thực hành trực tiếp), distractor (đáp án gây nhiễu)`
  * `Shared Responsibility Model (Mô hình trách nhiệm chung)`
- Không dịch cứng thuật ngữ kỹ thuật.
- Lỗi auto-caption: chuẩn hóa khi chắc chắn (vd "CLF-C02" giữ nguyên, "Stephane Maarek" đúng chính tả, "S3" không thành "S 3"). Không chắc thì viết trung tính, không đoán.

## 6. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~
- ~~Dòng meta "Dưới đây là bài viết được chuyển thể..."~~

## 7. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/architecture đáng mô tả: mô hình trách nhiệm chung, luồng request qua ELB → ASG → EC2, VPC subnet flow, disaster recovery, vòng đời S3 storage class...
- Chỉ dùng 2 loại: `flowchart TD` (hoặc `LR`) và `sequenceDiagram`. Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram`.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.

## 8. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- **Khuyến khích mạnh với khóa thi này** — bài lý thuyết nên có quiz; bài hands-on/ngắn có thể lược.
- Nếu có quiz: đúng **5 câu**, hỏi hiểu bài (concept, dịch vụ nào dùng cho việc gì, trade-off, con số quan trọng), không hỏi vặn/chi tiết vụn.
- Mỗi câu một khối:

  ```html
  <details>
  <summary><b>Xem đáp án</b></summary>

  **Đáp án:** ...
  Giải thích: ...
  Tham chiếu: Mục ...

  </details>
  ```

- Đặt quiz ở cuối bài, trước đoạn kết/teaser.

## 9. Bảng đối chiếu (ĐƯỢC PHÉP)

- Dùng khi có **từ 2 khái niệm/dịch vụ trở lên** cần so sánh rõ (vd: Security Group vs NACL, RDS vs DynamoDB, CloudWatch vs CloudTrail, các loại storage class...).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 10. Nguồn tham khảo & trích dẫn (ĐƯỢC PHÉP)

- **Dòng nguồn đầu bài (bắt buộc):** `> Nguồn: \`<tên file transcript gốc>\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài:** thêm `## Nguồn tham khảo` khi bài có dùng nguồn ngoài thực tế (trang chính thức AWS docs, trang đề thi...) — 1–6 link.
- **Trích trong thân bài:** khi nêu số liệu/luận điểm lấy từ tài liệu ngoài, chèn `[tên tài liệu](url)` ngay cạnh.
- Chỉ ghi URL đã đọc/đã xác minh. **CẤM tự chế URL.** Bài không có nguồn ngoài thì bỏ mục này — dòng nguồn đầu bài là đủ.

## 11. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, rút gọn tự nhiên.
- Số `NNN` lấy đúng theo prefix của file `.txt`. **Không** đối chiếu lại số HTML (HTML có thêm 6 bài không có transcript, xem `MUC_LUC.md`).
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 12. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Dòng nguồn đầu bài đúng URL trong txt
- [ ] Đoạn mở xưng "mình"/"các bạn"
- [ ] 2–5 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi chi tiết trong transcript đều được truyền tải
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Không có marker; Mermaid/bảng/quiz/nguồn tham khảo (nếu có) đúng quy định và khớp nội dung
- [ ] Kết bài chốt ý + teaser + 🚀
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 13. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là biên tập viên blog cho khóa "Ultimate AWS Certified Cloud Practitioner CLF-C02 2026" của Stephane Maarek.
Giọng văn: năng lượng, thực dụng, tập trung thi cử, trấn an người mới, khuyến khích học qua thực hành;
xưng "mình", gọi người đọc là "các bạn" (giọng mặc định).

Chuyển transcript thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Dòng nguồn đầu bài: > Nguồn: `<tên file txt>` · [Udemy](<url dòng 3 của txt>)
- Đoạn mở 2-3 câu; 2-5 mục H3, mỗi mục 1 emoji, ngăn bằng ---
- Bold cụm từ khóa, bullet cho liệt kê mềm, số cho liệt kê cứng, italic cho câu trấn an
- Kết bài chốt ý + động viên + teaser + 🚀; độ dài 40-90 dòng
- Giữ đủ mọi chi tiết trong transcript (dịch vụ, con số, quy tắc, mẹo thi),
  KHÔNG thêm fact mới, KHÔNG bịa số liệu
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc lần đầu
- Code block chỉ khi transcript thực sự đọc code, giữ nguyên không cải tiến
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow;
  label không chứa ()<>:, diagram ≤ 12 node, khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm/dịch vụ cần so sánh
- Nên có quiz 5 câu (bài lý thuyết), đáp án trong <details><summary><b>Xem đáp án</b></summary>
- KHÔNG marker "Gốc transcript"/"Cập nhật 2026"; KHÔNG dòng "Bài N — ..."

Bài mẫu tham chiếu: Cloud\AWS\Ultimate AWS Certified Cloud Practitioner CLF\01. Introduction\001-004.
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
