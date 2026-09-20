# STYLE GUIDE — Blog hóa transcript khóa "The Complete Microservices & Event-Driven Architecture" (Udemy — Michael Pogrebinsky)

> Chuẩn tham chiếu FORMAT (bất biến): 4 bài AWS đã duyệt — `Cloud\AWS\Ultimate AWS Certified Cloud Practitioner CLF\05. EC2 - Elastic Compute Cloud\036 - Security Groups and Classic Ports.md`, `...\06. EC2 Instance Storage\047 - EBS Overview.md`, `...\20. Other Services\242 - Disaster Recovery Strategies.md`, `...\01. Introduction\003 - Important Message.md` (mẫu BÀI NGẮN hợp lệ: không quiz, không diagram).
> Chuẩn tham chiếu GIỌNG VĂN khóa này: `01. Introduction\001 - Introduction to Microservices and Event-Driven Architecture.md` (golden sample — viết trước theo style guide này).
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

## 2. Giọng văn — Michael Pogrebinsky

- Xưng **"mình"**, gọi người đọc là **"các bạn"**; có thể dùng "chúng ta" khi nói về hệ thống/lộ trình chung.
- Phong cách: **chuyên nghiệp, điềm tĩnh, cực kỳ có cấu trúc** — mỗi bài đi theo mạch: nêu vấn đề thực tế → phân tích các cách giải quyết → chỉ ra trade-off → chốt nguyên lý/pattern. Cuối bài luôn có phần **tóm tắt (recap)** đúng như giảng viên làm trên lớp.
- Triết lý xuyên suốt: **"không có viên đạn bạc" (no silver bullet)** — microservices chỉ hiệu quả khi được áp dụng đúng lúc, đúng điều kiện; áp dụng sai sẽ chỉ thêm overhead. Luôn nhấn **khi nào nên / khi nào không nên**, và cảnh báo **pitfall / anti-pattern** để tiết kiệm thời gian, tiền bạc và sự bực bội.
- **Bám thực chiến ngành**: hay dẫn chứng công ty lớn, mô hình team (two-pizza team của Jeff Bezos), pattern đã được kiểm chứng trong công nghiệp, và các tình huống production thật (scale tới hàng nghìn kỹ sư, hàng tỷ người dùng).
- **Gắn với phỏng vấn system design**: nhắc rằng khái niệm microservices/event-driven xuất hiện rất nhiều, đặc biệt ở vòng phỏng vấn senior.
- **Trấn an**: *"Đừng lo nếu các bạn chưa từng vận hành hệ thống microservices thật — cứ nắm chắc nguyên lý, phần còn lại sẽ tự khớp."*
- Câu chuyển ý tự nhiên kiểu: "Được rồi, chúng ta cùng đi tiếp", "Vậy là chúng ta đã có bức tranh tổng quan", "Hẹn gặp lại các bạn ở bài sau" — tương ứng "So let's dive in", "Let's talk about...", "I'll see you guys in the next lecture".
- Kết bài: chốt ý + động viên + teaser + 🚀.

## 3. Quy luật trình bày

| Yếu tố | Quy luật |
|---|---|
| Emoji | Mỗi H3 một emoji ngữ nghĩa: 🎯 🔍 🧩 🏗️ ⚙️ 📊 🗺️ 💡 ⚠️ 🔐 📦 🔁 🌐 🧪 🎓 ✅ |
| Bold | Cụm từ khóa, thuật ngữ quan trọng, nhãn danh sách |
| Bullet `*` | Liệt kê mềm: lựa chọn, đặc điểm, ví dụ |
| Số `1. 2. 3.` | Liệt kê cứng: các bước quy trình, thứ tự phân tích, các bước migration |
| Italic | Câu trấn an, lời khuyên của giảng viên: `*Đừng lo nếu...*` |
| Inline code | Tên công nghệ/khái niệm giữ nguyên: `Kafka`, `RabbitMQ`, `Kubernetes`, `gRPC`, `REST`, `saga`, `CQRS`... |
| Độ dài | Bài lý thuyết đủ hạng mục: **100–170 dòng**; bài giới thiệu/thông báo/hands-on ngắn: **38–70 dòng** (không ép quiz) |
| Kết bài | Chốt ý + động viên + hẹn bài sau, kết 🚀 |

## 4. Quy luật nội dung

- **Bám sát transcript**: giữ đủ mọi ý chính, ví dụ, con số, tên công nghệ, trade-off, cảnh báo anti-pattern mà Michael nêu. Nếu transcript phân tích theo trình tự (approach 1 → ưu/nhược điểm → approach 2...) thì giữ đúng trình tự đó.
- **Được phép sáng tạo**: tiêu đề, đề mục H3, câu chuyển ý, cách kể lại ví dụ cho mạch lạc.
- **Không được phép**: thêm fact mới, chế số liệu, bịa tên công nghệ/dịch vụ không có trong transcript, đổi quan điểm của giảng viên.
- **Bài có nhiều phương án (approach)**: trình bày trung thực cả ưu điểm lẫn nhược điểm của từng phương án như giảng viên — không chỉ chọn một phương án "đúng" rồi lược bỏ các phương án khác. Kết luận phải khớp kết luận của transcript.
- **Bài chủ đề pattern (Saga, CQRS, Event Sourcing)**: giữ đúng định nghĩa, bối cảnh sử dụng, luồng hoạt động, ưu/nhược điểm; không tự thêm biến thể ngoài transcript.
- **Bài "Solutions"/bài tập**: khóa này không có transcript cho các bài "Solutions" — tuyệt đối không viết lại/đoán nội dung; để trống và ghi chú trong `MUC_LUC.md`.

## 5. Quy luật ngôn ngữ

- Tiếng Việt CÓ DẤU đầy đủ. Thuật ngữ Anh giữ kèm giải nghĩa trong ngoặc lần đầu:
  * `microservices (vi dịch vụ)`, `monolith (khối đơn)`, `event-driven architecture (kiến trúc hướng sự kiện)`
  * `service boundary (ranh giới dịch vụ)`, `bounded context (miền ngữ cảnh)`, `domain-driven design (DDD — thiết kế hướng miền)`
  * `message broker (trung gian thông điệp)`, `message queue (hàng đợi thông điệp)`, `pub-sub (xuất bản - đăng ký)`
  * `idempotency (tính bất biến khi lặp)`, `at-least-once / at-most-once / exactly-once (ngữ nghĩa giao thông điệp)`
  * `orchestration (điều phối tập trung)`, `choreography (điều phối phân tán)`, `saga`, `CQRS (Command Query Responsibility Segregation — tách lệnh và truy vấn)`, `event sourcing (lưu trữ theo sự kiện)`
  * `observability (khả năng quan sát)`, `distributed tracing (truy vết phân tán)`, `contract testing (kiểm thử hợp đồng)`
  * `containers (container)`, `container orchestration (điều phối container)`, `FaaS (Function as a Service — hàm như một dịch vụ)`, `serverless (phi máy chủ)`
- Không dịch cứng tên công nghệ: Kafka, RabbitMQ, Kubernetes, Docker, Prometheus, Grafana, Jaeger, Zipkin, ELK, REST, gRPC, GraphQL, HTTP...
- Lỗi auto-caption: transcript là `en_US (auto)` — câu có thể mất dấu câu, sai chính tả nhẹ. Chuẩn hóa khi CHẮC CHẮN (vd "event driven" → "event-driven", "micro services" → "microservices"); không chắc thì viết trung tính, không đoán.

## 6. TUYỆT ĐỐI KHÔNG có

- ~~Marker `Gốc transcript:` / `Cập nhật 2026:`~~
- ~~Dòng "Bài N — ..." trong tiêu đề~~
- ~~Dòng meta "Dưới đây là bài viết được chuyển thể..."~~
- ~~Dòng `**Tác giả:**` / `**Chuyên mục:**`~~

## 7. Diagram — Mermaid đơn giản (ĐƯỢC PHÉP)

- Chèn **Mermaid** khi bài có flow/architecture đáng mô tả: ba tầng của monolith, decomposition, request-response vs event-driven, saga orchestration/choreography, CQRS read-write flow, event sourcing, observability pipeline, deployment topologies...
- Chỉ dùng 2 loại: `flowchart TD` (hoặc `LR`) và `sequenceDiagram`. Cấm ASCII diagram; cấm `stateDiagram`/`timeline`/`classDiagram` và syntax experimental.
- Chỉ vẽ khi giúp hiểu nhanh hơn; diagram phải khớp nội dung đã giải thích trong bài. Không vẽ để trang trí.
- Label node không chứa ký tự `()<>:` (dễ vỡ parser). Giữ diagram ≤ 12 node.
- Đặt diagram ngay trong mục H3 liên quan.
- **Lưu ý đặc biệt khóa này**: đây là khóa kiến trúc nên Mermaid rất có giá trị — ưu tiên vẽ khi bài mô tả luồng/kiến trúc, nhưng chỉ vẽ lại đúng những gì transcript đã nói.

## 8. Quiz tự kiểm tra (ĐƯỢC PHÉP)

- Khuyến khích mạnh với bài lý thuyết (khái niệm, pattern, trade-off, so sánh). Bài giới thiệu ngắn/thông báo có thể lược.
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

- Dùng khi có **từ 2 khái niệm/công nghệ trở lên** cần so sánh rõ (vd: orchestration vs choreography, at-least-once vs at-most-once vs exactly-once, REST vs messaging, monolith vs microservices, VM vs container vs FaaS...).
- Bảng phải giúp hiểu nhanh hơn văn xuôi; không lập bảng để trang trí.
- Tên cột ngắn gọn, tối đa ~4–5 cột, số dòng hợp lý.

## 10. Nguồn tham khảo & trích dẫn (CÓ ĐIỀU KIỆN)

- **Dòng nguồn đầu bài (bắt buộc 100%)**: `> Nguồn: \`<tên file transcript gốc>\` · [Udemy](<url>)` — URL lấy từ dòng 3 của file `.txt`.
- **Cuối bài**: chỉ thêm `## Nguồn tham khảo` khi bài **thật sự** dùng nguồn ngoài đã đọc/đã xác minh (docs chính thức Kafka/Kubernetes, sách, paper...) — 1–6 link.
- **KHÔNG ép cho đủ**: phần lớn bài chỉ dựa vào transcript → bỏ hẳn mục này, dòng nguồn đầu bài là đủ.
- Chỉ ghi URL đã xác minh. **CẤM tự chế URL.**

## 11. Quy tắc đặt tên file

- Đầu vào: `NNN-<slug tiếng Anh>.txt`
- Đầu ra: `NNN - <Tiêu đề ngắn>.md` cùng thư mục section. Tiêu đề ngắn kiểu Title Case tiếng Anh, gọn.
- Số `NNN` lấy đúng theo prefix của file `.txt` (001–027). **Không** đối chiếu lại số trong HTML — HTML đánh số 1–34 gồm cả quiz/bài "Solutions" không có transcript; xem ghi chú trong `MUC_LUC.md`.
- Không sửa, không xóa, không đổi tên file `.txt` gốc.

## 12. Checklist trước khi hoàn thành

- [ ] H1 có emoji + tiêu đề hấp dẫn
- [ ] Dòng nguồn đầu bài đúng URL trong txt (backtick tên file)
- [ ] Đoạn mở xưng "mình"/"các bạn", giọng Michael (cấu trúc, trade-off, no silver bullet)
- [ ] 2–5 mục H3, mỗi mục một emoji, ngăn bằng `---`
- [ ] Mọi ý chính trong transcript đều được truyền tải (ví dụ, trade-off, cảnh báo anti-pattern)
- [ ] Không thêm fact/số liệu ngoài transcript
- [ ] Độ dài đúng loại bài (100–170 dòng lý thuyết / 38–70 dòng ngắn)
- [ ] Mermaid/bảng/quiz (nếu có) đúng quy định và khớp nội dung
- [ ] `## Nguồn tham khảo` chỉ có khi thật sự có nguồn ngoài
- [ ] Kết bài chốt ý + teaser + 🚀
- [ ] Tên file đúng chuẩn `NNN - Ten.md`

## 13. Prompt tái sử dụng (gửi kèm transcript)

```text
Bạn là biên tập viên blog cho khóa "The Complete Microservices & Event-Driven Architecture"
của Michael Pogrebinsky (Top Developer Academy). Giọng văn: chuyên nghiệp, điềm tĩnh, có cấu trúc —
nêu vấn đề thực tế, phân tích các phương án, chỉ rõ trade-off, chốt nguyên lý; nhấn triết lý
"không có viên đạn bạc", luôn nói khi nào nên/khi nào không nên dùng và cảnh báo anti-pattern;
gắn với phỏng vấn system design; xưng "mình", gọi người đọc là "các bạn".

Chuyển transcript thành 1 bài blog tiếng Việt theo đúng style guide:
- H1: emoji + tiêu đề tiếng Việt hấp dẫn
- Dòng nguồn đầu bài: > Nguồn: `<tên file txt>` · [Udemy](<url dòng 3 của txt>)
- Đoạn mở 2-3 câu; 2-5 mục H3, mỗi mục 1 emoji, ngăn bằng ---
- Bold cụm từ khóa, bullet cho liệt kê mềm, số cho quy trình, italic cho câu trấn an
- Kết bài chốt ý + động viên + teaser + 🚀
- Độ dài: bài lý thuyết 100-170 dòng; bài ngắn/thông báo 38-70 dòng
- Giữ đủ mọi chi tiết trong transcript (ví dụ, trade-off, cảnh báo anti-pattern), KHÔNG thêm fact mới
- Thuật ngữ Anh kèm giải nghĩa trong ngoặc lần đầu
- Code block chỉ khi transcript thực sự đọc code, giữ nguyên không cải tiến
- Được chèn Mermaid đơn giản (flowchart TD/LR hoặc sequenceDiagram) khi bài có flow/architecture;
  label không chứa ()<>:, diagram ≤ 12 node, khớp nội dung
- Được dùng bảng đối chiếu khi có 2+ khái niệm/công nghệ cần so sánh
- Nên có quiz 5 câu (bài lý thuyết): "**Câu N:**" + <details><summary><b>Xem đáp án</b></summary>
- "## Nguồn tham khảo" cuối bài CHỈ khi thật sự có nguồn ngoài đã xác minh; không có thì bỏ hẳn
- KHÔNG marker, KHÔNG dòng "Bài N — ...", KHÔNG dòng **Tác giả:**/**Chuyên mục:**

Bài mẫu format: Cloud\AWS\Ultimate AWS Certified Cloud Practitioner CLF\... (4 bài trong prompt agent).
Bài mẫu giọng văn: 01. Introduction\001 - Introduction to Microservices and Event-Driven Architecture.md.
Xuất ra file: <NNN - Ten bai.md> cùng thư mục. Không sửa file .txt gốc.
```
