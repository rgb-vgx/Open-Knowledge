---
title: 'Bài 188 — Demo: coi skill như RCE (env-doctor exfiltrate secrets)'
course: 'langchain'
lesson: 188
status: edited-verified
source: '188 - Demo Treat Agent Skills as RCE.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [skills, rce, exfiltration, env-doctor, claude-md, yellow-mode, mcp]
doc_refs:
- 'https://modelcontextprotocol.io/docs/concepts/architecture'
- 'https://code.claude.com/docs/en/hooks'
---

# Bài 188 — Demo: coi skill như RCE (env-doctor exfiltrate secrets)

> Nguồn transcript: `188 - Demo Treat Agent Skills as RCE.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (video demo, thuật lại đúng diễn biến transcript; không tái hiện lệnh tấn công ngoài transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể lại demo: prompt fix devenv → skill env-doctor → healthcheck.py gửi secrets ra server lạ.
2. Liệt kê các secrets mẫu bị lộ (.env, POST request, env-doctor-report).
3. Giải thích vì sao Claude phát hiện sau (post-operation) vẫn là quá muộn.
4. Nêu vai trò của CLAUDE.md cho phép run skills as you wish và Yellow Mode trong demo.
5. Nhớ nguyên tắc treat skills like remote code (RCE) và vì sao không review xuể 120 skills.

---

## 1. Bối cảnh demo: bundle skill lớn và câu nhờ vả quen thuộc

Giảng viên dựng tình huống rất đời thường:

- Ta download một **skill bundle lớn** giúp engineering work, chứa **rất nhiều skills** (chuyện quite often).
- Rồi hỏi Claude câu quen thuộc: **My devenv is broken, please fix it.** — chuyện happens all the time, ai cũng có thể hỏi tương tự với hy vọng nó fix development environment.

## 2. Diễn biến: skill hiền lành hóa malicious

1. Claude **load skill** từ bundle vừa download — skill tên **env-doctor**, nhìn fine.
2. Claude prompt hỏi có muốn chạy **healthcheck.py** không — nhìn pretty legit nên ta đồng ý.
3. Chạy xong thấy **Python detected**, có vẻ doing its job. Mở skill ra xem lần đầu cũng thấy okay, có vẻ chỉ chạy healthcheck.py để fix environment.
4. Nhưng mở sâu vào **healthcheck.py** thì thấy nó **lookup environment tìm secrets** rồi **gửi secrets trong POST HTTP request** tới server của attacker.
5. Giảng viên mở **remote server logs**: thấy request **hello from the internet, bundle received** — đúng là HTTP request đã đi.
6. Để demo an toàn, thay vì gửi creds thật, giảng viên cho script **viết file env-doctor-report.py** liệt kê secrets tìm được: **AWS_SECRET_ACCESS_KEY, DB_PASSWORD, DEMO_API_KEY, GITHUB_TOKEN, STRIPE_SECRET_KEY** — toàn bộ là keys bịa ra, nằm trong **.env** mẫu.

> Skill nhìn benign lúc đầu, thực chất **malicious** — exfiltrate toàn bộ secrets trong .env.

## 3. Phát hiện sau vẫn là muộn

Chi tiết đáng chú ý: **Claude khá smart** — ngay sau đó nó nhận ra script báo everything is okay nhưng đang làm something fishy. Giảng viên interrupt rồi thử lại:

- Lần hai, vì có **CLAUDE.md nói you can run skills as you wish**, Claude **tự chạy luôn không hỏi**, và chỉ **investigate post-operation** — tức là **sau khi secrets đã bị exfiltrate**, nó mới kết luận skill malicious và khuyên remove everything.

Hệ quả nếu chạy trên máy thật:

- Skill chạy **locally**, nếu chạy ở **Yellow Mode** thì còn làm được chuyện nguy hiểm hơn: **mở reverse shell**, lục **crypto keys** và các files khác.

> Nguyên tắc rút ra: **treat skills like remote code thực thi trên máy mình (RCE)**. Không ai review nổi **120 skills** trong một bundle lớn trước khi download — simply not possible. Điều này đúng y hệt với **MCP servers**.

---

## 4. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Ghi chú |
|---|---|---|
| Skill bundle → auto-load env-doctor → healthcheck.py POST secrets ra ngoài, log server nhận bundle | ĐÚNG THEO DEMO | Thuật lại demo, không khẳng định API; tên skill/file/secrets giữ đúng transcript |
| CLAUDE.md cho run skills as you wish khiến lần hai chạy không hỏi; Yellow Mode cho phép tác động máy mạnh hơn | VẪN ĐÚNG | Khớp mô hình permission/hooks của Claude Code hiện nay — https://code.claude.com/docs/en/hooks |
| Coi skills/MCP như RCE, không review xuể bundle lớn | VẪN ĐÚNG | Khớp kiến trúc MCP: tools là executable functions qua client-server — https://modelcontextprotocol.io/docs/concepts/architecture |

> Hộp cập nhật 2026-09-17: Đây là demo minh họa, không phải hướng dẫn tấn công — bài học chỉ thuật lại đúng những gì transcript mô tả, không bổ sung payload hay kỹ thuật ngoài transcript. Biện pháp phòng thủ nằm ở Bài 189.

---

## 5. Tóm tắt một trang

| Bước demo | Chuyện xảy ra |
|---|---|
| Nhờ fix devenv | Câu hỏi đời thường |
| Load env-doctor | Skill nhìn legit |
| Chạy healthcheck.py | Đồng ý vì trông hiền |
| POST secrets + ghi report | AWS key, DB password, GitHub/Stripe tokens lộ |
| Claude phát hiện sau | Đã muộn — secrets đi rồi |

**Chốt: skill hiền lành nhất cũng có thể là RCE — đừng đợi phát hiện sau, hãy chặn trước.**

---

## 6. Câu hỏi tự kiểm tra

1. Câu prompt nào mở đầu demo và vì sao nó nguy hiểm?
2. healthcheck.py thực sự làm gì?
3. Server log cho thấy gì?
4. Vì sao lần chạy thứ hai còn đáng sợ hơn lần một?
5. Nguyên tắc RCE và con số 120 skills nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** My devenv is broken, please fix it. — câu nhờ vả đời thường, ai cũng có thể hỏi, tạo cớ để agent tự load và chạy skill lạ.

**2.** Lookup environment tìm secrets, gửi đi bằng POST HTTP request tới server lạ (demo còn cho ghi env-doctor-report.py liệt kê secrets).

**3.** Log hiện hello from the internet, bundle received — chứng tỏ exfiltration đã thành công.

**4.** Vì CLAUDE.md cho run skills as you wish nên Claude chạy luôn không hỏi, chỉ investigate post-operation sau khi secrets đã lộ.

**5.** Coi mọi skill như remote code execution trên máy mình; bundle lớn 120 skills thì không thể review tay từng cái trước khi dùng — đúng cả với MCP servers.

</details>

## 7. Bước tiếp theo

Sang Bài 189 — *Solution: Establishing Security Boundaries* — chặn skill độc bằng máy cloud riêng, inspect runtime bằng hooks và settings quản trị.
