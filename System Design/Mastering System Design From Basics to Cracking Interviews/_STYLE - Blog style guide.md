# STYLE GUIDE — Blog hóa transcript khóa "Mastering System Design: From Basics to Cracking Interviews" (Udemy — Rahul Singh)

> Chuẩn tham chiếu FORMAT (bất biến): 4 bài AWS đã duyệt — `Cloud\AWS\Ultimate AWS Certified Cloud Practitioner CLF\05. EC2 - Elastic Compute Cloud\036 - Security Groups and Classic Ports.md`, `...\06. EC2 Instance Storage\047 - EBS Overview.md`, `...\20. Other Services\242 - Disaster Recovery Strategies.md`, `...\01. Introduction\003 - Important Message.md` (mẫu BÀI NGẮN hợp lệ).
> Chuẩn tham chiếu GIỌNG VĂN khóa này: `01. Introduction\001 - Welcome.md` (golden sample).
> Dùng file này làm checklist khi chuyển mỗi `NNN-*.txt` thành `NNN - *.md`.

---

## 1. Khung xương cố định

```text
# <emoji> <Tiêu đề tiếng Việt, hấp dẫn, có thể thêm vế phụ>

> Nguồn: `<tên file txt>` · [Udemy](<url lấy từ dòng 3 của txt>)

<Đoạn mở 2-3 câu: xưng "mình" - gọi "các bạn", nêu mục đích bài>

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

- Chỉ dùng **H1 + H3**. H2 duy nhất được phép là `## Nguồn tham khảo`.
- Ngăn cách các mục lớn bằng `---`.
- Số mục H3: 2–5 mục tùy độ dài transcript.
- **Dòng nguồn ngay sau H1 (bắt buộc 100% bài)**: tên file trong backtick + link Udemy lấy từ dòng 3 của `.txt`.
- **KHÔNG** có dòng `**Tác giả:**` / `**Chuyên mục:**`.

## 2. Giọng văn — Rahul Singh

- Xưng **"mình"**, gọi người đọc là **"các bạn"**; có thể dùng "chúng ta" khi nói về lộ trình chung.
- Phong cách: **bình tĩnh, mạch lạc, đậm chất người thầy** — đi từ định nghĩa → vì sao quan trọng → trade-off → ví dụ thực tế.
- Nhấn mạnh triết lý xuyên suốt khóa: **"hiếm khi có thiết kế hoàn hảo — mọi quyết định kiến trúc đều là trade-off"**; hiểu trade-off là dấu hiệu của kỹ sư có kinh nghiệm.
- Luôn gắn với **mục tiêu phỏng vấn system design**: học để hiểu bản chất, "thành công trong phỏng vấn là hệ quả tự nhiên của việc hiểu đúng nguyên lý".
- Hay dùng **so sánh đời thường**: kiến trúc sư vẽ bản thiết kế trước khi xây nhà, blueprint trước khi thi công.
- Được phép **trấn an**: *"Đừng lo nếu các bạn chưa từng thiết kế hệ thống lớn — cứ đi từng bước, đây không phải cuộc đua."*
- Câu chuyển ý tự nhiên kiểu: "Được rồi, chúng ta cùng đi tiếp", "Vậy là chúng ta đã có bức tranh tổng quan", "Hẹn gặp lại ở bài sau".
- Kết bài: chốt ý + động viên + teaser + 🚀.

## 3. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 🧩 🏗️ ⚙️ 📊 🗺️ 💡 ⚠️ 🔐 📦 🔁 🌐 🎓 ✅ |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: lựa chọn, đặc điểm, ví dụ |
| Số `1. 2. 3.` | Liệt kê cứng: các bước quy trình, thứ tự phân tích |
| Italic | Câu trấn an, lời khuyên của giảng viên: `*Đừng lo nếu...*` |
| Inline code | Tên protocol/API/khái niệm viết thường giữ nguyên: `TCP`, `REST`, `sharding`, `latency`... |
| Độ dài | Bài lý thuyết đủ hạng mục: **100–170 dòng**; bài giới thiệu/summary/hands-on ngắn: **38–70 dòng** (không ép quiz) |
| Kết bài | Chốt ý + động viên + hẹn bài sau, kết 🚀 |

## 4. Quy luật nội dung

- **Bám sát transcript**: giữ đủ mọi ý chính, con số, tên công nghệ, ví dụ, trade-off Rahul nêu. Nếu transcript giải thích theo trình tự nào thì giữ trình tự đó.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, cách kể lại ví dụ cho mạch lạc.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên công nghệ/dịch vụ không có trong transcript, đổi quan điểm của giảng viên.
- **Bài giải case study (section 12–24)**: giữ đúng cấu trúc 4 bước của khóa (hiểu bài toán & scope → ước lượng scale & điểm nghẽn → high-level design, services/APIs/communication → quyết định tech & infra → final design). Các bài cùng bộ 5 bài của một hệ thống phải **nhất quán số liệu và quyết định với nhau** (đọc lại các bài trước trong cùng section nếu cần); không copy khuôn máy móc giữa các hệ thống khác nhau — mỗi hệ thống có con số và lựa chọn riêng.
- **Bài "Introduction"/"Summary" của section**: tóm đúng nội dung, không hứa hẹn thêm ngoài transcript.
- **Ước lượng (back-of-the-envelope)**: giữ nguyên con số và đơn vị như transcript (kể cả khi giảng viên nói "khoảng", "hơn"); không tự tính lại.

## 5. Quy luật ngôn ngữ

- Tiếng Việt CÓ DẤU đầy đủ. Thuật ngữ Anh giữ kèm giải nghĩa trong ngoặc lần đầu:
  * `scalability (khả năng mở rộng)`, `reliability (độ tin cậy)`, `latency (độ trễ)`, `throughput (thông lượng)`
  * `load balancer (bộ cân bằng tải)`, `reverse proxy (proxy ngược)`, `API gateway (cổng API)`, `CDN (mạng phân phối nội dung)`
  * `sharding (phân mảnh dữ liệu)`, `replication (nhân bản)`, `eventual consistency (nhất quán sau cùng)`, `quorum (đa số phiếu)`
  * `caching (bộ đệm)`, `cache invalidation (vô hiệu hóa cache)`, `message queue (hàng đợi thông điệp)`, `pub-sub (xuất bản - đăng ký)`
  * `failover (chuyển đổi dự phòng)`, `RTO/RPO (thời gian/điểm khôi phục mục tiêu)`, `idempotency (tính bất biến khi lặp)`
  * `monolith (khối đơn)`, `microservices (vi dịch vụ)`, `event-driven (hướng sự kiện)`
- Không dịch cứng tên công nghệ: TCP, UDP, HTTP, HTTPS, REST, GraphQL, gRPC, WebSocket, SSE, JSON, SQL, NoSQL, Kafka, Redis, Cassandra...
- Lỗi auto-caption: transcript là `en_US (auto)` — câu có thể mất dấu câu, sai chính tả nhẹ. Chuẩn hóa khi CHẮC CHẮN (vd "CAP theorem", "Cassandra", "consistent hashing"); không chắc thì viết trung tính, không đoán.

## 6. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~
- ~~Dòng meta "Dưới đây là bài viết được chuyển thể..."~~
- ~~Dòng `**Tác giả:**` / `**Chuyên mục:**`~~

## 7. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/architecture đáng mô tả: luồng request qua load balancer, DNS resolution, client-server, proxy, kiến trúc microservices, event-driven flow, sharding, replication, cache flow, upload video, chat flow...
- Chỉ dùng 2 loại: `flowchart TD` (hoặc `LR`) và `sequenceDiagram`. Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram` và syntax experimental.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.
- **Lưu ý đặc biệt khóa này**: đây là khóa system design nên Mermaid rất có giá trị — ưu tiên vẽ khi bài mô tả kiến trúc/luồng, nhưng chỉ vẽ lại đúng những gì transcript đã nói.

## 8. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- Khuyến khích mạnh với bài lý thuyết (khái niệm, trade-off, so sánh). Bài giới thiệu ngắn/summary/hands-on có thể lược.
- Nếu có quiz: đúng **5 câu**, hỏi hiểu bài (concept, trade-off, khi nào dùng gì), không hỏi vặn/chi tiết vụn.
- Đặt cuối bài, **trước** đoạn kết/teaser; mỗi câu một khối:

  ```text
  **Câu N:** <câu hỏi>

  <details>
  <summary><b>Xem đáp án</b></summary>

  **Đáp án:** <đáp án ngắn>

  Giải thích: <1–2 câu>

  Tham chiếu: Mục <tên mục H3 trong bài>.

  </details>
  ```

## 9. Bảng đối chiếu (ĐƯỢC PHÉP)

- Dùng khi có **từ 2 khái niệm/công nghệ trở lên** cần so sánh rõ (vd: SQL vs NoSQL, TCP vs UDP, forward proxy vs reverse proxy, caching strategies, replication types, scaling strategies...).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 10. Nguồn tham khảo & trích dẫn (CÓ ĐIỀU KIỆN)

- **Dòng nguồn đầu bài (bắt buộc 100%)**: `> Nguồn: \`<tên file transcript gốc>\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài**: chỉ thêm `## Nguồn tham khảo` khi bài **thật sự** dùng nguồn ngoài đã đọc/đã xác minh (tài liệu chính thức, paper, docs công nghệ...) — 1–6 link.
- **KHÔNG ép cho đủ**: phần lớn bài chỉ dựa vào transcript → bỏ hẳn mục này, dòng nguồn đầu bài là đủ.
- Chỉ ghi URL đã xác minh. **CẤM tự chế URL.**

## 11. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, gọn.
- Số `NNN` lấy đúng theo prefix của file `.txt` (trùng với số HTML, 001–128).
- Nhiều bài ở các hệ thống khác nhau trùng tiêu đề gốc (vd "Understanding the Problem & Defining the Scope") — dùng cùng tiêu đề ngắn cũng được, vì mỗi bài nằm trong folder section riêng. Ưu tiên tiêu đề phản ánh đúng nội dung bài.
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 12. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Dòng nguồn đầu bài đúng URL trong txt (backtick tên file)
- [ ] Đoạn mở xưng "mình"/"các bạn", giọng Rahul (bình tĩnh, mạch lạc, nhấn trade-off)
- [ ] 2–5 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi ý chính trong transcript đều được truyền tải (con số, công nghệ, trade-off)
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Độ dài đúng loại bài (100–170 dòng lý thuyết / 38–70 dòng ngắn)
- [ ] Mermaid/bảng/quiz (nếu có) đúng quy định và khớp nội dung
- [ ] `## Nguồn tham khảo` chỉ có khi thật sự có nguồn ngoài
- [ ] Kết bài chốt ý + teaser + 🚀
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 13. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là biên tập viên blog cho khóa "Mastering System Design: From Basics to Cracking Interviews"
của Rahul Singh. Giọng văn: bình tĩnh, mạch lạc, đậm chất người thầy — đi từ định nghĩa đến vì sao
quan trọng rồi trade-off; nhấn triết lý "hiếm khi có thiết kế hoàn hảo, mọi quyết định kiến trúc
đều là trade-off"; gắn với mục tiêu phỏng vấn system design; xưng "mình", gọi người đọc là "các bạn".

Chuyển transcript thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Dòng nguồn đầu bài: > Nguồn: `<tên file txt>` · [Udemy](<url dòng 3 của txt>)
- Đoạn mở 2-3 câu; 2-5 mục H3, mỗi mục 1 emoji, ngăn bằng ---
- Bold cụm từ khóa, bullet cho liệt kê mềm, số cho quy trình, italic cho câu trấn an
- Kết bài chốt ý + động viên + teaser + 🚀
- Độ dài: bài lý thuyết 100-170 dòng; bài ngắn/summary 38-70 dòng
- Giữ đủ mọi chi tiết trong transcript (con số, công nghệ, trade-off), KHÔNG thêm fact mới
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc lần đầu
- Code block chỉ khi transcript thực sự đọc code, giữ nguyên không cải tiến
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow/architecture;
  label không chứa ()<>:, diagram ≤ 12 node, khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm/công nghệ cần so sánh
- Nên có quiz 5 câu (bài lý thuyết): "**Câu N:**" + <details><summary><b>Xem đáp án</b></summary>
- "## Nguồn tham khảo" cuối bài CHỈ khi thật sự có nguồn ngoài đã xác minh; không có thì bỏ hẳn
- KHÔNG marker, KHÔNG dòng "Bài N — ...", KHÔNG dòng **Tác giả:**/**Chuyên mục:**

Bài mẫu format: Cloud\AWS\Ultimate AWS Certified Cloud Practitioner CLF\... (4 bài trong prompt agent).
Bài mẫu giọng văn: 01. Introduction\001 - Welcome.md.
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
