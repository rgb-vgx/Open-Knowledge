---
title: 'Bài 189 — Dựng security boundaries cho skills'
course: 'langchain'
lesson: 189
status: edited-verified
source: '189 - Solution Establishing Security Boundaries.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [security-boundaries, hooks, settings, allowlist, cloud-workspace, skill-vetting]
doc_refs:
- 'https://code.claude.com/docs/en/hooks'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 189 — Dựng security boundaries cho skills

> Nguồn transcript: `189 - Solution Establishing Security Boundaries.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (đã đối chiếu hooks/settings qua WebFetch; không bịa thêm ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 3 lớp phòng thủ trong transcript: máy cloud riêng, inspect runtime, settings quản trị.
2. Giải thích vì sao chạy Claude Code trên máy cloud/workspace vẫn sướng mà an toàn hơn.
3. Mô tả inspect bằng AI/hooks: check từ skill description tới từng script, tại runtime chứ không phải download time.
4. Nêu cách tổ chức dùng .settings để allowlist skills/MCPs đã vet.
5. Hiểu cách enforce hooks cho cả tổ chức qua enterprise mechanisms.

---

## 1. Lớp 1: đừng chạy Claude Code trên máy chính

Nghe tempting và easy, nhưng giải pháp đầu tiên là **không chạy Claude Code trên máy mình**:

- Chạy trên **remote machine, workspace environment, cloud** — vẫn enjoy đầy đủ capabilities.
- Kể cả chạy ở **yellow mode** liều lĩnh, nếu có crash hay exfiltrate thì cũng chỉ trúng **dedicated development machine trên cloud** đã có **security boundaries built in**.

> Đổi máy chạy là đổi blast radius: mất thì mất máy dev dùng một lần, không phải máy chính.

## 2. Lớp 2: inspect bằng AI/hooks tại runtime

Lớp thứ hai: **examine và inspect** nội dung files sắp chạy — thậm chí để **Claude hoặc security tool khác** inspect:

- Áp dụng cho **Python file, shell script, bất kỳ executable nào**, và cả **skills**.
- Trước khi run skill, có thứ gì đó **check skill từ description tới từng script** nó sắp viết.
- Điểm mấu chốt: check này diễn ra **in runtime, not in download time**.
- Làm được nhờ **infrastructure hooks mà Claude cung cấp** — đánh đổi thêm chút runtime để có confidence rằng skills không làm funny business, dù chạy local hay cloud.

Cách này áp dụng cho cả **solo developers lẫn organizations**.

## 3. Lớp 3 (tổ chức): .settings allowlist + enforce hooks

Trong **organization** còn cách tốt hơn: dùng **.settings files của Claude** với cấu hình sẵn:

- Chỉ allow **certain types of skills và MCPs đã vetted bởi admin** — kèm cả **process vet skill** nào được dùng, nào không.
- Không để everybody tự download mọi skills về development environments.
- Tận dụng **setting JSON file** để lấy hooks đã viết ở lớp 2 và **enforce cho mọi developers** qua **enterprise mechanisms** (transcript hẹn show trong demo).

> Kết quả: cả organization aligned — kiểm soát được skill nào chạy, hooks nào bắt buộc.

---

## 4. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại |
|---|---|---|
| Chạy Claude Code trên remote/cloud workspace có boundaries | VẪN ĐÚNG | Thực hành cách ly môi trường chung; transcript không nêu provider cụ thể nên giữ nguyên |
| Hooks inspect skill/description/scripts tại runtime | VẪN ĐÚNG | Hooks chạy tự động tại lifecycle points (PreToolUse...), gồm command/http/mcp_tool/prompt/agent handlers — https://code.claude.com/docs/en/hooks |
| .settings allowlist skills/MCPs vetted, enforce hooks qua enterprise | VẪN ĐÚNG | Settings merge nhiều cấp (user/project/local/managed policy/plugin/skill frontmatter); managed hooks chỉ disable từ managed settings — https://code.claude.com/docs/en/hooks |

> Hộp cập nhật 2026-09-17: Docs hiện nay còn phân biệt disableAllHooks, matcher/if và timeout từng event — transcript không đi vào chi tiết đó nên không đưa vào bài để giữ fidelity. Bài tiếp theo trong khóa nằm ngoài phạm vi transcript được giao.

---

## 5. Tóm tắt một trang

| Lớp phòng thủ | Làm gì | Cho ai |
|---|---|---|
| Máy cloud riêng | Chạy agent xa máy chính, có boundaries | Mọi người |
| Inspect runtime | AI/hooks check description tới scripts, lúc chạy | Solo + tổ chức |
| Settings + enforce | Allowlist skills/MCPs vetted, ép hooks toàn org | Tổ chức |

**Chốt: đừng tin skill — cách ly máy, soi lúc chạy, và khóa danh sách ở cấp tổ chức.**

---

## 6. Câu hỏi tự kiểm tra

1. Vì sao chạy trên cloud vẫn bị exfiltrate mà lại an toàn hơn?
2. Inspect tại runtime khác download time thế nào?
3. Hooks của Claude đóng vai trò gì ở lớp 2?
4. .settings allowlist giải quyết vấn đề gì?
5. Enforce hooks toàn org bằng cách nào theo transcript?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì blast radius gói trong dedicated dev machine trên cloud có boundaries, không phải máy chính chứa mọi secrets.

**2.** Download time chỉ check lúc tải; runtime check từ description tới từng script ngay trước khi chạy, bắt được hành vi lúc thực thi.

**3.** Là infrastructure để gắn logic inspect vào lifecycle, tự chạy trước khi skill/script chạy.

**4.** Chỉ cho dùng skills/MCPs đã vet bởi admin theo process rõ ràng, thay vì ai cũng tự download.

**5.** Nhúng hooks vào setting JSON file rồi enforce cho mọi developers qua enterprise mechanisms (transcript hẹn demo).

</details>
