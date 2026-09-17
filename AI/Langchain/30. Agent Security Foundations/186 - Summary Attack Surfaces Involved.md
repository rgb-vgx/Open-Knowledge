---
title: 'Bài 186 — Hai attack surface của agentic coding'
course: 'langchain'
lesson: 186
status: edited-verified
source: '186 - Summary Attack Surfaces Involved.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: [attack-surface, harness, code-artifact, supply-chain, lateral-movement, multi-tenant]
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://modelcontextprotocol.io/docs/concepts/architecture'
---

# Bài 186 — Hai attack surface của agentic coding

> Nguồn transcript: `186 - Summary Attack Surfaces Involved.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (video phân loại attack surface, không có claim API cần kiểm chứng; giữ đúng thuật ngữ transcript).

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể tên hai attack vector mà course tập trung: harness và code artifact.
2. Giải thích vì sao harness bị compromise thì toàn bộ máy (kể cả production access) gặp nguy.
3. Liệt kê các lỗi trong code artifact: auth, access control, env leak, logic bomb, multi-tenant.
4. Mô tả supply chain attacks tác động cả hai surface ra sao.
5. Hiểu vì sao velocity nhân vấn đề này thành ticking time bomb.

---

## 1. Attack surface 1: bản thân harness

Harness ở đây là **Claude Code, Cursor, Antigravity CLI** — coding agent ta dùng.

Vì sao nó là attack surface lớn:

- Coding agents có quyền **terminal/shell**, **write code để run shell**.
- Có quyền đọc **credentials, API keys, environment variables** — thực chất là **toàn bộ computer**, kể cả secret files.
- Nếu bị compromise thì **mọi file của ta cũng compromise**.

Nguy hiểm hơn: ta thường không chỉ có dev environment — còn có quyền vào **production**: production deployments, image building, production databases. Agent bị compromise có thể **lateral move** sang các môi trường đó.

Nhân với **100 agents chạy cùng lúc** (multi-agent song song) thì bài toán càng lớn: vẫn muốn flexibility, nhưng không muốn sáng dậy thấy **production database bị drop**.

> Nhiệm vụ 1 của course: hiểu cách dùng coding agents sao cho **không tự compromise mình và môi trường của mình**.

## 2. Attack surface 2: code artifact agent viết ra

Code do agent viết có thể mang:

- **Insecure authentication**, không enforce **robust access control**.
- **Exposing environment variables**, **logic bombs**.
- Không handle **multi-tenant data** đúng → **exposing data cho users khác**.

Nhân với velocity và lượng code hôm nay thì đây là **ticking time bomb** của bugs và vulnerabilities mới trong software.

## 3. Supply chain attacks đánh cả hai mặt

Transcript dành riêng một mảng cho **software supply chain attacks** vì đang tăng mạnh. Một package compromise (qua contribution open source hoặc dependency của nó) có thể:

- **Mặt harness:** package bị agent download tạm thời và chạy **trong lúc coding agent đang chạy** → ảnh hưởng **development environment**.
- **Mặt artifact:** package compromise bị cài vào code ship đi → ảnh hưởng **production system**.

Giảng viên hẹn có **dedicated section** về supply chain attacks.

```
Compromised package --(+ open-source contribution / dependency)--> run lúc agent chạy (dev) / ship trong code (prod)
```

---

## 4. Đối chiếu với tài liệu mới nhất

| Claim từ transcript | Kết luận | Ghi chú |
|---|---|---|
| Harness có shell/credentials/env access, compromise thì lateral move tới prod; multi-agent nhân rủi ro | VẪN ĐÚNG | Khớp mô hình MCP host/client/server: MCP server tools chạy local qua STDIO hoặc remote qua HTTP đều là code chạy thay user — https://modelcontextprotocol.io/docs/concepts/architecture |
| Code artifact lỗi auth/access control/env leak/logic bomb/multi-tenant | VẪN ĐÚNG | Phân loại chuẩn, không có gì lỗi thời; chi tiết từng lỗi là nội dung Section 27 |
| Supply chain đánh cả dev lẫn prod | VẪN ĐÚNG | Nhận định ngành, giữ nguyên; transcript hẹn section riêng (transcript gốc không đề cập thêm) |

> Hộp cập nhật 2026-09-17: Thuật ngữ lateral movement, logic bomb, multi-tenant giữ nguyên tiếng Anh. Không thêm biện pháp phòng thủ vì đó là nội dung Bài 189.

---

## 5. Tóm tắt một trang

| Attack surface | Cái bị đánh | Hậu quả |
|---|---|---|
| Harness (Claude Code, Cursor...) | Terminal, shell, creds, env, secret files | Mất máy dev, lateral move tới prod |
| Code artifact | Auth, access control, env, multi-tenant | Bug/vuln ship tới user, ticking time bomb |
| Supply chain | Package compromise | Đánh cả dev (lúc chạy) lẫn prod (lúc ship) |

**Chốt: agentic coding có hai mặt trận — cái máy chạy agent và đống code agent đẻ ra, cộng thêm supply chain đánh cả hai.**

---

## 6. Câu hỏi tự kiểm tra

1. Hai attack surface của course là gì?
2. Vì sao harness bị compromise thì production cũng nguy?
3. Kể các lỗi có thể có trong code artifact.
4. Supply chain attack tác động hai surface ra sao?
5. Vì sao transcript gọi đây là ticking time bomb?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Harness (bản thân coding agent) và code artifact (code agent viết ra).

**2.** Vì agent có shell/creds/env/toàn bộ máy dev, mà dev thường cũng có quyền vào production (deployments, image building, databases) nên attacker lateral move được.

**3.** Insecure authentication, thiếu robust access control, exposing environment variables, logic bombs, sai multi-tenant data dẫn tới exposing data.

**4.** Package compromise chạy lúc agent chạy → trúng dev; cài vào code ship đi → trúng prod.

**5.** Vì velocity nhân số bug/vuln mới lên theo lượng code, trong khi khả năng secure không theo kịp.

</details>

## 7. Bước tiếp theo

Sang Bài 187 — *Skill and MCP Security* — vì sao skill/MCP mở cũng nguy như file .exe lạ, và social proof không bằng security.
