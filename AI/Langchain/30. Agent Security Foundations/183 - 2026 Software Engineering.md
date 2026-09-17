---
title: 'Bài 183 — Software Engineering 2026: cách viết code đã đổi khác'
course: 'langchain'
lesson: 183
status: edited-verified
source: '183 - 2026 Software Engineering.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [agentic-coding, code-review, accountability, git-worktrees, ide, security-background]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 183 — Software Engineering 2026: cách viết code đã đổi khác

> Nguồn transcript: `183 - 2026 Software Engineering.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (video bối cảnh, không có claim API/docs cần kiểm chứng; không bịa thêm).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Đối chiếu cách viết software trước 2024 và trong kỷ nguyên agentic coding.
2. Giải thích vì sao vai trò IDE đổi từ workstation chính thành công cụ tra cứu.
3. Mô tả cách agent dùng Git worktrees để làm song song nhiều features.
4. Phân biệt ai mở PR, ai review, ai merge trước đây và hiện nay.
5. Nêu vấn đề accountability khi AI thay người ở khâu review và merge.

---

## 1. Trước 2024: viết code tay trong IDE

Cách giảng viên phát triển code nhiều năm trước khác hẳn người mới vào nghề hôm nay:

- Dùng **IDE** (PyCharm, VS Code), **viết code thủ công** trong IDE.
- Viết code là việc **rất đắt đỏ** (very expensive).

Nhiều kỹ năng thời đó vẫn relevant, thậm chí relevant hơn, nhưng nhiều kỹ năng không còn relevant nữa. Video này làm **background** cho mọi lo ngại security phía sau.

## 2. Hôm nay: coding agent trong terminal

- Hầu như **không dùng IDE nữa**; IDE chỉ còn để **lookup/search code**.
- Phần lớn code do **coding agent** viết **qua terminal**, hoặc qua **agent manager interface** như trong **Codex**.
- Vai trò IDE đổi từ **main workstation** thành thứ ít dùng hơn hẳn.

## 3. Làm song song: từ feature branch tay sang Git worktrees

Ngày xưa:

- Muốn làm nhiều features cùng lúc thì tạo **feature branches**, switch tay mỗi lần đổi việc.
- Mỗi lúc chỉ tiến triển **một task**; có vài task trong backlog để juggle, nhưng tiến độ là **sequential**.
- Lý do: mọi việc đều do developer làm, không thể tiến song song nhiều task.

Hôm nay:

- Agent dùng **Git worktrees**, **spawn nhiều instances** của chính nó.
- Các instances **implement song song nhiều features**, sinh ra **rất nhiều code**.
- Kết quả: lượng code được viết **scale lên rất mạnh**.

## 4. PR, review, merge: từ người sang agent

| Khâu | Ngày xưa | Hôm nay |
|---|---|---|
| **Mở PR** | Software engineer mở, sau khi tự viết tests, gắn CI/CD, kiểm tra mọi thứ chạy | Agent tự quyết định đã xong việc và **tự mở PR** |
| **Review** | Engineer khác trong team/company review | **Coding agent tự review code nó viết** (có thể dùng agent khác); hoặc service AI như **KUDO, Greptile, Buzz** |
| **Merge** | Người bấm nút merge sau pipeline PR/testing | Agent làm thay |

Giai thoại giảng viên kể: ở công ty cybersecurity làm cloud security platform, có một engineer rất smart nhưng rất tedious — review nào cũng soi, phần lớn là nitpicking chứ không tập trung vào value của feature. Mỗi PR qua người này mất **vài ngày, nhiều vòng comment–fix–debate**, có khi **miss deadline**. Đó là mặt trái của human review, nhưng nó scale kém — còn AI review thì scale, nhưng kèm drawbacks.

## 5. Cái giá: accountability và ownership

Khi human review và mở PR:

- Luôn có **người chịu trách nhiệm** (accountable) cho software.
- Có sự cố là biết **blame ai, liên hệ ai để fix**, biết cách motivate họ — người đó sẽ thấy tệ vì production crash.

Với coding agent:

- Vẫn pinpoint được ai merge PR, ai chịu trách nhiệm формально, nhưng **AI không có feelings, không có responsibility**.
- AI không **thức dậy lúc 3:00 AM để fix production** (dù ta có thể chạy agent lúc 3:00 AM liên tục) — ở đây ta cần **human factor vì ownership**.

> Giảng viên chốt: ông all-in cho agentic coding, nhưng về security thì có rất nhiều thứ có thể sai — và đó là nội dung cả series video này.

---

## 6. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Ghi chú |
|---|---|---|
| Chuyển dịch IDE → terminal/agent manager (Codex), agent mở PR, AI review (KUDO, Greptile, Buzz) | PHÙ HỢP THỰC TẾ NGÀNH | Đây là quan sát ngành, không phải claim API; các công cụ nêu tên là ví dụ trong transcript, giữ nguyên |
| Git worktrees cho agent chạy song song | VẪN ĐÚNG | Khớp với thực hành agentic dev hiện nay; transcript không nêu lệnh cụ thể nên không có code cập nhật |

> Hộp cập nhật 2026-09-17: Bài này là video bối cảnh, không chứa khẳng định kỹ thuật về LangChain version nên không có gì lỗi thời. Tên công cụ (Codex, KUDO, Greptile, Buzz) giữ đúng transcript.

---

## 7. Tóm tắt một trang

| Khía cạnh | Trước đây | Hiện nay |
|---|---|---|
| Nơi viết code | IDE, viết tay | Terminal, coding agent viết |
| Làm song song | Feature branch switch tay, sequential | Git worktrees, nhiều instances song song |
| Mở PR | Developer | Agent |
| Review | Human (kỹ nhưng chậm) | AI (scale nhưng thiếu ownership) |
| Merge | Người bấm nút | Agent |

**Chốt: code vẫn là code, nhưng người viết, người review và người chịu trách nhiệm đã đổi — và đó là gốc của mọi vấn đề security phía sau.**

---

## 8. Câu hỏi tự kiểm tra

1. Vai trò IDE đã đổi thế nào?
2. Vì sao ngày xưa không thể tiến song song nhiều task?
3. Git worktrees giúp agent làm gì?
4. Kể 3 khâu đã chuyển từ người sang agent.
5. Vấn đề accountability khi AI review là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Từ main workstation nơi viết code tay thành công cụ phụ để lookup/search code; code chính do coding agent viết qua terminal.

**2.** Vì mọi việc do developer làm tay, mỗi lúc chỉ làm một task; các task khác nằm backlog, tiến độ sequential.

**3.** Spawn nhiều instances làm song song nhiều features, scale lượng code sinh ra.

**4.** Mở PR, code review, merge — trước do người, nay agent (tự mở PR, tự review hoặc qua KUDO/Greptile/Buzz, tự merge).

**5.** Khi human review, có người accountable, biết blame/liên hệ/motivate khi production crash; AI không có feelings và responsibility, không thay được human ownership.

</details>

## 9. Bước tiếp theo

Sang Bài 184 — *Securing AI-Generated Code in a Multi-Agent World* — khoảng cách giữa lượng code được viết và lượng code ta secure nổi.
