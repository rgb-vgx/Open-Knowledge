---
title: "Bai 084 - Finished Course Whats Next"
course: langchain
lesson: 84
status: edited-verified
source: "084 - Finished course Whats next.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; vi du Pezzo theo thoi diem quay"
categories: [AI]
tags: [LLMOps, LangSmith, Pezzo, security, next-steps]
doc_refs: ["https://docs.langchain.com/langsmith", "https://docs.langchain.com/oss/python/langchain/overview", "https://github.com/pezzolabs/pezzo"]
---

# Bài 084 — Finished Course, What's Next

> Nguồn transcript: `084 - Finished course Whats next.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên gợi ý Pezzo và review Udemy như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Recap 2 patterns lớn của khóa: agents và RAG.
2. Kể 5 việc LLMOps phải lo: prompt management, monitoring, debugging, evaluation, cost.
3. Biết LangSmith làm gì và Pezzo là alternative nào.
4. Hiểu rủi ro security khi ra production.
5. Biết 2 nguồn học tiếp: LangChain blogs và Twitter.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Recap khóa học

Khóa này là elaborate introduction cho LLM app development, xoay quanh 2 patterns: agents (leverage reasoning, non-deterministic actions) và retrieval augmentation (vector stores, semantic search, embeddings để chat trên proprietary data). Mọi LLM app hoặc dùng pattern này, hoặc pattern kia, hoặc gọi thẳng LLM — giờ đã có tools để build cả ba.

### 2.2. LLMOps là gì

Mài perfect prompt tốn công, LLM đổi là prompt hỏng, muốn đổi model nhanh/rẻ/secure hơn là phải adjust prompt — prompt management là issue lớn. Cần monitor latency, cost mỗi request trả vendor bao nhiêu. Cần debugging khi LLM trả sai, nhất là agents. Cần evaluation vì check tay không scale. Tất cả gom thành field mới: LLMOps.

LangSmith by LangChain: unified platform build production-grade apps — debugging, testing, evaluating, monitoring, dev lifecycle nhanh. Hiện không open-source (giữ nguyên phát biểu thời điểm quay). Alternative open-source: Pezzo — prompt management + tracing + monitoring.

### 2.3. Security và nguồn học

Local khác production: có real customers là phải threat safe. LLM mang attack vectors mới: prompt injection, agents chạm data không được phép. LangChain từng move code unsafe vào experimental directory. Giảng viên gốc security nên nhấn mạnh phải explore, nhất là với LLM.

Học tiếp ở đâu: follow LangChain blogs mỗi tuần ra blog/ideas/implementations mới; join Twitter đọc researchers, apps, use cases, optimizations — news stream thẳng vào đó. Giảng viên update khóa thường xuyên khi có thứ quan trọng, và xin Udemy review để lan tỏa.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| 2 patterns agents + RAG | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/overview | Khung sư phạm khóa học, docs vẫn chia tương ứng. |
| LangSmith debug/test/evaluate/monitor | VẪN ĐÚNG | https://docs.langchain.com/langsmith | WebFetch 2026-09-17 xác nhận tracing, monitors, automations, human ratings. |
| Pezzo alternative open-source | GIỮ NGUYÊN lịch sử | https://github.com/pezzolabs/pezzo | Chưa kiểm chứng trạng thái project hiện tại; phải check repo trước khi dùng. |
| LangSmith không open-source | GIỮ NGUYÊN thời điểm quay | https://docs.langchain.com/langsmith | Mô hình licensing có thể đổi; check docs hiện tại. |

> Hộp cập nhật 2026-09-17: Giữ nguyên gợi ý và lời xin review. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Việc tiếp theo | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| LLMOps | Prompt + monitor + debug + eval | Đừng check tay |
| Platform | LangSmith (Pezzo nếu cần OSS) | Trace tới tiền |
| Security | Injection + least privilege | Local khác production |
| Học tiếp | Blogs + Twitter + Academy | Update liên tục |

**Chốt: Hết khóa mới xong phần gist — muốn production thì lo LLMOps, security, và học tiếp không nghỉ.**

---

## 5. Câu hỏi tự kiểm tra

1. Hai patterns lớn của khóa là gì?
2. LLMOps gồm những việc nào?
3. LangSmith giúp gì?
4. Pezzo được giới thiệu là gì?
5. Hai nguồn học tiếp được gợi ý là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Agents (reasoning + non-deterministic actions) và retrieval augmentation (vector stores, embeddings, semantic search).

**2.** Prompt management, monitoring latency/cost, debugging, evaluation tự động — gom thành LLM operations.

**3.** Unified platform debug, test, evaluate, monitor để build production-grade apps, dev lifecycle nhanh.

**4.** Alternative open-source cho prompt management + tracing + monitoring khi cần OSS.

**5.** Follow LangChain blogs hằng tuần và join Twitter theo researchers/apps/use cases mới.

</details>

## 6. Bước tiếp theo

Bài 085 — *What is LangGraph* — từ chains/acyclic sang graphs có cycles cho agents phức tạp.
