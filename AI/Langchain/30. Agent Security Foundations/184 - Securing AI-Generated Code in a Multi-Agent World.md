---
title: 'Bài 184 — Khoảng cách giữa code được viết và code secure nổi'
course: 'langchain'
lesson: 184
status: edited-verified
source: '184 - Securing AI-Generated Code in a Multi-Agent World.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [code-volume, security-gap, multi-agent, coding-agents, rbac, testing]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 184 — Khoảng cách giữa code được viết và code secure nổi

> Nguồn transcript: `184 - Securing AI-Generated Code in a Multi-Agent World.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (video bối cảnh ngành, không có claim API cần kiểm chứng; giữ đúng ví dụ transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ lại đồ thị hai đường: code được viết (trên) vs code secure nổi (dưới) theo thời gian.
2. Kể các mốc làm gap giãn ra: ChatGPT copy-paste, coding agents, multi-agent song song, everyone-is-engineer.
3. Giải thích vì sao engineer mặc định ưu tiên shipping hơn testing/security.
4. Nêu vì sao nhóm builders mới (PM, HR, ops) càng nới rộng gap.
5. Nhớ mục tiêu khóa học: bridge gap để viết secure software với coding agents.

---

## 1. Đồ thị hai đường và cuộc rượt đuổi muôn thuở

Trục y là **volume of code**, trục x là **time**:

- Đường trên: lượng **code được viết**.
- Đường dưới: lượng **code ta secure nổi**.
- Giữa hai đường luôn có **gap** — security teams rượt đuổi features mà engineering teams deliver (goose chase).

AI làm gap này giãn ra qua từng mốc:

1. **ChatGPT mới ra:** dev copy-paste code vào IDE như từng làm với Stack Overflow → gap đã lớn lên.
2. **Coding agents:** Cursor, rồi Claude Code, Gemini CLI, Antigravity... Shift từ IDE sang terminal; AI nhúng trong IDE (Cursor tiên phong) hoặc nhả code qua terminal → lượng code tăng vọt.
3. **Multi-agent song song:** dev mở nhiều terminal instances, dùng **sub-agents chạy parallel**; có thể phối hợp Codex + Claude Code + Cursor, mỗi agent nhiều instances → developer tự scale chính mình.
4. **Everyone is an engineer:** không cần là software engineer vẫn viết code. Product, HR, operations dùng Claude Code, Lovable, Cursor để build internal tools và ship — **force multiplier** cho số dòng code.

> Gap giữa code được viết và security architecture bảo vệ nó cứ tăng dần.

## 2. Vì sao gap không tự khép: mặc định của engineer

Thực tế ngành (transcript nhấn mạnh là known in the industry):

- Software engineers quan tâm **shipping**, không mặn mà testing và càng không mặn mà security.
- Thế giới lý tưởng thì họ muốn nghiêm túc với testing/security, nhưng **áp lực ship features từ management** khiến thời gian cho testing/security ít hơn hẳn thời gian viết code.
- Nhiều engineer **không biết sâu về security**: người làm front-end, người làm REST API query database — không nhiều người biết security in depth. (Giảng viên là ngoại lệ may mắn vì cả career ở cybersecurity companies.)

Với nhóm builders mới (ops, HR, PM):

- Họ **không biết security là gì**: không biết **role-based access control**, authorization, authentication, DDoS, lateral movement, privilege escalation.
- Không xuất thân từ thế giới này nên đương nhiên **không xử lý security**.

> Kết quả: gap cứ tăng, ngành không theo kịp — và mục tiêu của course là giúp bạn bridge gap, viết secure software hơn với coding agents.

---

## 3. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Ghi chú |
|---|---|---|
| Các mốc giãn gap: ChatGPT → coding agents → multi-agent → everyone-is-engineer | PHÙ HỢP THỰC TẾ | Quan sát ngành, không phải claim version; tên tools (Cursor, Claude Code, Gemini CLI, Antigravity, Lovable, Codex) giữ đúng transcript |
| Engineer ưu tiên ship hơn test/security; builders mới không biết RBAC/auth/DDoS/lateral movement | PHÙ HỢP THỰC TẾ | Nhận định văn hóa ngành, không có gì lỗi thời cần hộp cập nhật kỹ thuật |

> Hộp cập nhật 2026-09-17: Không có khẳng định API/docs nào cần đính chính. Thuật ngữ RBAC, DDoS, lateral movement, privilege escalation giữ nguyên tiếng Anh.

---

## 4. Tóm tắt một trang

| Mốc | Tác động lên lượng code |
|---|---|
| ChatGPT copy-paste | Gap bắt đầu giãn |
| Coding agents (IDE + terminal) | Code tăng vọt |
| Multi-agent song song | Developer tự scale |
| Everyone is engineer | Force multiplier cuối cùng |

**Chốt: code tăng theo cấp số nhân, khả năng secure tăng tuyến tính — khoảng trống đó chính là bài toán của cả section.**

---

## 5. Câu hỏi tự kiểm tra

1. Hai đường trong đồ thị là gì?
2. Kể 4 mốc làm gap giãn ra.
3. Vì sao engineer ít đầu tư cho testing/security?
4. Nhóm builders mới là ai và vì sao họ nới rộng gap?
5. Mục tiêu của course này là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Đường trên: code được viết; đường dưới: code secure nổi; trục x là time, trục y là volume.

**2.** ChatGPT copy-paste; coding agents (Cursor, Claude Code, Gemini CLI...); multi-agent/sub-agents song song; everyone-is-engineer (PM/HR/ops ship bằng Lovable, Cursor...).

**3.** Áp lực ship từ management; thời gian cho test/security ít hơn viết code; nhiều người không biết sâu security.

**4.** PM, HR, operations... build internal tools bằng coding agents; họ không biết RBAC, auth, DDoS, lateral movement, privilege escalation nên không xử lý security.

**5.** Bridge gap — giúp viết secure software hơn với coding agents.

</details>

## 6. Bước tiếp theo

Sang Bài 185 — *Velocity vs Safety* — trade-off giữa guardrails và tốc độ ship khi gắn coding agent.
