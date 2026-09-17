---
title: "Bài 169 - Agents trong CTF An ninh mạng"
course: "LangChain"
lesson: "169"
status: "edited-verified"
source: "169 - AI Agents in Cybersecurity CTF Competitions.md"
verified_date: "2026-09-17"
langchain_version: "AI agents 2026, CTF, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["CTF", "red-teaming", "autonomous-hacker", "iteration"]
doc_refs: ["https://docs.langchain.com/"]
---

# Bài 169 — Agents trong CTF An ninh mạng

> Bài học được biên soạn từ transcript "AI Agents in Cybersecurity CTF Competitions".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích CTF và red teaming events giúp iterate agent nhanh ra sao.
2. Kể case RSA agent hacking agent và top 1% của Tenzai.
3. Nói được vai trò passion và analogy vận động viên đỉnh cao.
4. Giữ đúng thuật ngữ Anh: CTF, red teaming, autonomous hacker, top 1%.

## 2. Kiến thức cốt lõi

### CTF là gì trong bài?

- Capture the flag là sân chơi quen thuộc của hacking community để security researchers practice và compete.
- Có bản online chạy ngay sau khi có working version của autonomous hacker; Tenzai đăng ký agent đi thi tự nhiên như đi test.

### Hai case được kể

- RSA cách thời điểm quay vài tuần: race agent nào crack 10 hay 11 challenges nhanh nhất, đề bài là hacking into an AI agent, tức agent hacking agent; Tenzai first place.
- Nhiều red teaming events và contests khác cũng top 1%, chi tiết hẹn trong blog Tenzai.

### Vì sao thắng?

- Tenzai founded bởi người hacking for a living, true passion cho craft; CEO Pavel ban đêm tự gửi agent, vài giờ sau check giải được mấy challenges, hôm sau mang tới office iterate chỗ tốt chỗ hỏng.
- Không có passion cho field thì khó build top 1% agent.
- Analogy: build agent thường như going to the gym cho khỏe; build top agent như train competitive athlete để thắng mọi humans và agents.

## 3. Ví dụ và diễn giải

- Tối gửi agent thi 11 flags, sáng xem log: flags dễ ăn gọn, flags khó kẹt ở enumeration, trưa sửa prompt và tools.
- Lặp nhiều đêm như vậy tạo rapid improvement mà lab đóng không có.
- Competitive environment ép agent bộc lộ điểm yếu thật thay vì điểm benchmark đẹp.

## 4. Kiểm chứng với docs mới nhất

- Bài là industry story, không có API để đối chiếu docs LangChain.
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Giữ trung thành transcript; kết quả thi đấu có thể cũ sau thời điểm quay.

> **Hộp cập nhật:** khi có mạng, tìm blog Tenzai về RSA và red teaming để bổ sung số liệu chính thức.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Sân | CTF và red teaming cho practice và compete |
| Cách dùng | Có bản chạy được là gửi thi, đêm chạy ngày iterate |
| Kết quả | RSA first place agent hacking agent, nhiều top 1% |
| Bí quyết | True passion, team hacker thật, train như athlete |

**Một câu chốt:** Muốn agent top 1%, hãy cho nó đấu trường thật và team mê nghề thật.

## 6. Câu hỏi tự kiểm tra

1. CTF dùng để làm gì ở Tenzai?
2. Đề RSA đặc biệt ở điểm nào?
3. Quy trình đêm ngày của CEO là gì?
4. Analogy gym và athlete nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Để test autonomous hacker sớm, practice, compete và rapid improvement từ kết quả thật.

**2.** Là cuộc race crack 10 hay 11 challenges, trong đó agent phải hack vào một AI agent khác.

**3.** Đêm gửi agent, vài giờ sau check giải được mấy, hôm sau mang kết quả tốt xấu tới office để iterate.

**4.** Agent thường như đi gym cho khỏe là đủ; agent đỉnh phải train như vận động viên thi đấu với mọi đối thủ.

</details>

## 7. Bước tiếp theo

Bài 170 — *Harness Engineering* — xem vì sao chia việc cho 100 agents không tự đúng.

Nguồn: transcript gốc `169 - AI Agents in Cybersecurity CTF Competitions.md`.
