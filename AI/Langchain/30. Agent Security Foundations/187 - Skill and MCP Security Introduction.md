---
title: 'Bài 187 — Skill và MCP: social proof không bằng security'
course: 'langchain'
lesson: 187
status: edited-verified
source: '187 - Skill and MCP Security Introduction.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [mcp, skills, rce, secrets-manager, trust, due-diligence]
doc_refs:
- 'https://modelcontextprotocol.io/docs/concepts/architecture'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 187 — Skill và MCP: social proof không bằng security

> Nguồn transcript: `187 - Skill and MCP Security Introduction.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (đã đối chiếu kiến trúc MCP qua WebFetch; không bịa thêm ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao MCP và skills là tiến bộ lớn nhưng dùng sai thì rủi ro thật.
2. So sánh cài skill/MCP lạ với download file .exe từ website scam.
3. Nêu vì sao MCP/skills thậm chí nguy hơn .exe chạy một lần.
4. Nhớ nguyên tắc social proof is not equal to security.
5. Kể hai cách làm an toàn hơn: không disclose secrets, và đưa API keys qua secrets manager.

---

## 1. MCP và skills tốt cho ngành, nhưng...

Giảng viên khẳng định: **MCP là amazing protocol**, làm điều rất tốt cho industry; **open format của skills** cũng vậy. Nhưng **dùng sai thì expose bản thân trước real risk**.

## 2. Bạn có dám tải file .exe lạ không?

Câu hỏi mở đầu: có thoải mái download **file .exe** từ kiểu website đáng ngờ không? Đáp án mong đợi là **không**, vì ta được train nhiều năm để tránh:

- Cảm giác scam, có thể có virus, compromise máy.
- Dấu hiệu: màu mè, **fake social proof**, giục làm ngay (everything now) — nhìn là thấy malicious.

Nhưng với **skills** thì khác:

- Thấy một skill đúng thứ đang cần, giải quyết real problem, website rất cool (có thể là **vibe coded** mà ta không nhận ra).
- Ta **không quen examine code của skill**, không biết **ai viết, motive là gì**.
- Vẫn quen tay **install skills on the go, không do due diligence**.
- Dù sau install hiện thông báo **all packages installed, no vulnerabilities** — điều đó **không có nghĩa gì**, vì **bản thân skill có thể đã malicious**.

> Điểm chốt: **skills và MCP server (nhất là open-sourced) tương đương kiểu website scam kia** — đều là code chạy trên máy mình mà mình không biết source/origin, chưa từng nhìn vào code.

## 3. Vì sao nguy hơn cả file .exe

File .exe tải về có thể **chỉ chạy một lần**. Còn **MCP và skills gắn vào coding agent** → **có thể bị trigger nhiều lần**. Trong khi thực trạng ngành là ta đã quen **không inspect, không due diligence** skill và MCP servers.

Cộng thêm cơn sốt chữ **official** (official MCP server, official skill): skill aggregators, repositories đầy **stars và social proof** — nhưng:

> **Social proof is not equal to security.**

Về mặt tâm lý, ta còn quen **overshare cho AI và trust AI by default**: đưa personal data, proprietary data không cần thiết, kể cả personal secrets (giảng viên tự nhận mình cũng từng vậy), rồi đưa cả **API keys nối tới real accounts có real billing**, và tin agent sẽ không go rogue.

## 4. Hai cách làm an toàn hơn

1. **Đừng disclose secrets, đừng tell secrets** — big no-no. Ta không biết information đi đâu, bị log ở đâu, trace ở đâu.
2. Nếu thực sự cần đưa API keys cho agent (nhiều case legitimate), thì đưa qua **secrets manager** — script agent viết sẽ **retrieve in runtime**, thay vì **viết raw API key trực tiếp**.

---

## 5. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại |
|---|---|---|
| MCP client-server: host tạo client cho mỗi server, tool/resource/prompt chạy thay user | VẪN ĐÚNG | MCP host (Claude Code...) quản lý clients, mỗi client giữ dedicated connection tới một server; tools là executable functions — https://modelcontextprotocol.io/docs/concepts/architecture |
| Skill/MCP lạ = code chạy trên máy, chưa rõ origin, trigger nhiều lần | VẪN ĐÚNG | Khớp mô hình tools/resources của MCP: cài là trao quyền thực thi lặp lại, không phải chạy một lần |
| Social proof (stars, official) không bằng security; đừng paste raw secrets, dùng secrets manager | VẪN ĐÚNG | Nguyên tắc vệ sinh secrets chung của ngành; transcript không nêu tên secrets manager cụ thể nên giữ nguyên |

> Hộp cập nhật 2026-09-17: Bài này là cảnh báo hành vi, không có khẳng định version nào lỗi thời. Demo tấn công cụ thể nằm ở Bài 188, biện pháp boundary nằm ở Bài 189.

---

## 6. Tóm tắt một trang

| So sánh | .exe lạ | Skill/MCP lạ |
|---|---|---|
| Bản chất | Code chạy trên máy, không rõ nguồn | Y hệt — code chạy trên máy, không rõ nguồn |
| Số lần chạy | Một lần | Nhiều lần qua agent |
| Due diligence | Đã quen cảnh giác | Chưa quen inspect |
| Social proof | Nhìn là nghi | Stars/official dễ tin lầm |

**Chốt: đừng tin skill/MCP hơn file .exe lạ — social proof không bằng security, secrets thì đi qua secrets manager.**

---

## 7. Câu hỏi tự kiểm tra

1. Vì sao thông báo no vulnerabilities sau install không đảm bảo gì?
2. Skill/MCP nguy hơn .exe ở điểm nào?
3. Social proof gồm những gì và vì sao không đủ?
4. Overshare cho AI biểu hiện ra sao?
5. Hai cách xử lý secrets an toàn hơn là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì check đó chỉ quét packages, còn bản thân skill đã có thể malicious.

**2.** .exe chạy một lần; MCP/skills gắn vào agent nên trigger được nhiều lần, trong khi ta ít inspect chúng.

**3.** Stars, social proof, mác official, aggregators/repositories; chúng nói về độ phổ biến, không nói về độ an toàn.

**4.** Đưa personal/proprietary data, personal secrets không cần thiết; đưa API keys real billing vì trust agent by default.

**5.** Một là không disclose secrets; hai là khi cần thì đưa qua secrets manager để script retrieve in runtime, không viết raw key.

</details>

## 8. Bước tiếp theo

Sang Bài 188 — *Demo: Treat Agent Skills as RCE* — xem skill env-doctor hiền lành exfiltrate secrets ra sao.
