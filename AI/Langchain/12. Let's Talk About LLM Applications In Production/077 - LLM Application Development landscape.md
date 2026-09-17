---
title: "Bai 077 - LLM Application Development Landscape"
course: langchain
lesson: 77
status: edited-verified
source: "077 - LLM Application Development landscape.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; phan loai mang tinh lich su"
categories: [AI]
tags: [landscape, RAG, agents, autonomous-agents]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/rag", "https://docs.langchain.com/oss/python/langchain/agents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 077 — LLM Application Development Landscape

> Nguồn transcript: `077 - LLM Application Development landscape.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ và tên project như thời điểm quay).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Xếp mọi LLM app vào 4 nhóm của giảng viên.
2. Kể ví dụ từng nhóm: children's stories, Quiver, Socrates, AutoGPT.
3. Giải thích RAG + vector store và agent + reasoning khác nhau ở đâu.
4. Hiểu vì sao khóa học dạy đủ agents, vector stores và theory.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Nhóm 1 — Một LLM call đơn

App/feature gom input gửi tới LLM, nhận response, manipulate chút rồi show cho user. Đơn giản, không sophisticated, nhưng nhiều khi mang lại nhiều value. Ví dụ app tạo children's stories từ subjects/topics kèm cartoons và pictures.

### 2.2. Nhóm 2 — RAG + vector store

Nhúng vector store, dùng retrieval augmentation generation + semantic search để lấy relevant chunks trả lời câu hỏi domain-specific. Ví dụ Quiver còn gọi là second brain: dump PDFs, databases, videos, chat history vào, index trong vector store, rồi chat/QA trên data đó. Dump it all rồi chat with it.

### 2.3. Nhóm 3 — Agents chạy non-deterministic code

Nhúng agents, leverage reasoning engine để chạy code non-deterministic: agent tự quyết dùng tools nào lúc nào hợp nhất. Ví dụ Socrates của Torq: đọc alert rồi quyết định remediate bằng security tooling trên hyper automation platform — ví dụ dùng agent cho cybersecurity thực tế.

### 2.4. Nhóm 4 — Agents + vector stores làm long-term memory

Kết hợp cả hai: AutoGPT, GPT Engineer, BabyAGI dùng vector stores làm long-term memory + semantic search để có capabilities cao cấp như mimic human behavior, agents nói chuyện với nhau giải complex tasks. Đây là autonomous agents thời kỳ đầu, pioneering nhưng còn rất sơ khai.

Thông điệp đóng: mọi LLM app hôm nay đều rơi vào một trong các nhóm này; khóa học dạy implement từng pattern — agents, vector stores, tương tác LLM và theory — để tự build.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| 4 nhóm phân loại | VẪN ĐÚNG về bản chất | https://docs.langchain.com/oss/python/langchain/rag | Phân loại sư phạm, docs hiện tại vẫn có RAG, agents, memory tương ứng. |
| Ví dụ Quiver, Torq Socrates, AutoGPT | GIỮ NGUYÊN lịch sử | https://langchain-ai.github.io/langgraph/ | Tên dự án có thể đổi/chết theo thời gian; giữ nguyên minh họa thời điểm quay. |
| Autonomous agents còn sơ khai | ĐỔI một phần | https://langchain-ai.github.io/langgraph/ | Đến 2026 deep agents/subagents đã tiến xa nhưng kiểm soát production vẫn là chủ đề lớn; chưa fetch full nên không khẳng định quá. |

> Hộp cập nhật 2026-09-17: Giữ nguyên phân loại và ví dụ gốc. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Nhóm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Simple call | LLM API | Gửi-nhận-hiển thị |
| RAG | Vector store + semantic search | Chat trên data riêng |
| Agent | Tools + reasoning | Tự chọn tool theo tình huống |
| Agent + memory | Long-term memory | Multi-agent, task phức tạp |

**Chốt: Mọi app đều là biến thể của gọi LLM, gắn thêm retrieval, gắn thêm reasoning, hoặc gắn cả hai.**

---

## 5. Câu hỏi tự kiểm tra

1. Nhóm 1 làm gì và ví dụ là gì?
2. Quiver minh họa pattern nào?
3. Socrates của Torq minh họa điều gì?
4. Long-term memory trong nhóm 4 làm bằng gì?
5. Vì sao giảng viên nói autonomous agents còn sơ khai ở thời điểm quay?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Một LLM call đơn: gửi input, nhận response, manipulate nhẹ rồi hiển thị; ví dụ app children's stories từ subjects/topics.

**2.** RAG + vector store + semantic search để QA trên data riêng dump vào.

**3.** Agent dùng reasoning chạy non-deterministic steps: đọc alert rồi tự chọn tooling để remediate.

**4.** Vector stores + semantic search để lưu và truy hồi thông tin dài hạn.

**5.** Vì AutoGPT, GPT Engineer, BabyAGI mới pioneering, capabilities hay nhưng chưa production-ready, chỉ ở beginning.

</details>

## 6. Bước tiếp theo

Bài 078 — *Privacy và Data Retention* — dữ liệu gửi tới managed LLM đi đâu, ai giữ, bao lâu.
