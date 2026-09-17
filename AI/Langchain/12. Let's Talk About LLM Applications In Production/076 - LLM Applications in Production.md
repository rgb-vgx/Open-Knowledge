---
title: "Bai 076 - LLM Applications in Production"
course: langchain
lesson: 76
status: edited-verified
source: "076 - LLM Applications in Production.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; noi dung thach thuc van dung"
categories: [AI]
tags: [production, agents, cost, security, validation]
doc_refs: ["https://docs.langchain.com/langsmith", "https://langchain-ai.github.io/langgraph/", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"]
---

# Bài 076 — LLM Applications in Production

> Nguồn transcript: `076 - LLM Applications in Production.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 đối chiếu một phần, chỗ chưa kiểm chứng ghi rõ).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 7 thách thức đưa agent ra production theo mạch transcript.
2. Giải thích vì sao agent chạy lâu và tốn context window.
3. Hiểu phép nhân xác suất khiến độ tin cậy rơi nhanh theo số bước.
4. Nêu các hướng giảm chi phí và rủi ro bảo mật.
5. Biết khi nào không nên dùng agent.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Chạy lâu vì gọi LLM nối tiếp

Agent dùng LLM làm reasoning engine: mỗi bước, mỗi tool đều sau một LLM call quyết định dùng tool đó. Nhiều calls nối tiếp nhau, call sau chờ call trước, task càng nhiều bước càng thành app chạy rất lâu. Transcript nhắc workaround semantic cache / LLM cache nhưng không dạy trong khóa này.

### 2.2. Context window

Mỗi reasoning step gửi prompt rất lớn. Hầu hết LLM đương thời chịu khoảng 32k tokens, nghe nhiều nhưng app thực tế dễ vượt. Claude Anthropic nhận tới 100k tokens (giữ nguyên con số transcript), nhưng nhồi 100k tokens gây bệnh quên đoạn giữa — xem paper Lost in the Middle. Vậy số bước bị giới hạn bởi context window.

### 2.3. Hallucination và phép nhân xác suất

LLM đoán token nối token nên là statistical creature, luôn có xác suất đúng. Giả sử mỗi bước chọn đúng tool với p = 0.9. Một bước thì tốt, nhưng 6 bước nối tiếp theo multiplication law còn 0.59% (giữ nguyên con số transcript). Task càng dài số này càng rơi. Hướng sửa: fine-tune LLM cho tool selection để p cao hơn, có papers về gọi API chuẩn hơn.

### 2.4. Pricing

Trả tiền theo tokens gửi/nhận. Prompt agent đã lớn, chạy scale hàng triệu requests thì bill rất cao. GPT-4 reason mạnh nhưng chậm và đắt, scale lên có thể không còn worth. Hướng sửa: cache/semantic cache; retrieval augmentation cho tool selection — search tools relevant trước khi gọi reasoning, nhất là khi có quá nhiều tools.

### 2.5. Response validation, security, overkilling

- Validation: dù đáp án đúng mà sai format cũng hỏng app; testing rất phức tạp, giảng viên chưa gặp robust solution.
- Security: agent được cấp quyền query DB, gọi API, nói chuyện third party. Prompt injection hay lộ API key là lộ tools. Cần least privilege, guardrails, gợi ý LLM Guard open-source.
- Overkilling: nếu sequence steps đã biết rõ và viết được bằng code Python deterministic thì đừng dùng agent. Nhiều teams cố dùng agent trong khi code thường robust hơn.

Disclaimer đóng video: agents tiềm năng massive nhưng từ prototype tới production rất thách thức về cost; không nói agents chưa ready, chỉ cần rất cẩn thận.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Agent nhiều LLM calls nối tiếp nên chậm | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | LangGraph docs vẫn nhấn mạnh durable execution, streaming, human-in-the-loop để trị chạy lâu. |
| Context window ~32k, nhồi nhiều gây quên giữa | VẪN ĐÚNG về bản chất | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Con số cụ thể đã cũ, model 2026 context lớn hơn nhiều; giữ số gốc và ghi đã lỗi thời về con số. |
| Cần validation, least privilege, guardrails | VẪN ĐÚNG | https://docs.langchain.com/langsmith | LangSmith tracing + monitors + review workflows đúng để trị validation/monitoring. |
| LLM Guard gợi ý bảo mật | CHƯA KIỂM CHỨNG full | https://docs.langchain.com/langsmith | Chưa fetch full do giới hạn mạng; giữ nguyên gợi ý gốc, không khẳng định hiện trạng project. |

> Hộp cập nhật 2026-09-17: Con số 32k/100k tokens và phép tính 0.59% giữ nguyên theo transcript. Thực tế 2026 context window và pricing đã đổi nhiều, cần check docs vendor hiện tại trước khi áp vào production. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Thách thức | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Latency nối tiếp | Streaming + cache | Agent càng nhiều bước càng chậm |
| Context giới hạn | Chunk, summarize, RAG tools | Prompt to dần theo bước |
| Xác suất nhân | Fine-tune, eval | Càng dài càng dễ trật |
| Cost + format + security | LangSmith, least privilege | Đừng agent khi code thường làm được |

**Chốt: Agent demo thì dễ, production thì trả giá bằng latency, tokens, xác suất lỗi nhân lên và rủi ro bảo mật — phải thiết kế để trị từng thứ.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao agent dễ thành long-running application?
2. Context window giới hạn số bước thế nào?
3. Phép tính 0.9 sau 6 bước trong transcript nói lên điều gì?
4. Hai hướng giảm pricing được nêu là gì?
5. Khi nào transcript khuyên không dùng agent?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì mỗi bước/tool đều sau một LLM call, các calls nối tiếp chờ nhau, task càng nhiều reasoning steps càng lâu.

**2.** Mỗi step gửi prompt huge, dễ vượt 32k tokens; nhồi tới 100k tokens thì model quên đoạn giữa, nên số bước bị trần context chặn lại.

**3.** Xác suất đúng单 bước 0.9 mà 6 bước nối tiếp thì theo multiplication law chỉ còn 0.59% (giữ nguyên số transcript) — càng dài càng rơi.

**4.** Dùng cache/semantic cache thay LLM call; dùng retrieval augmentation cho tool selection để chỉ đưa tools relevant vào reasoning.

**5.** Khi sequence steps đã biết rõ và viết được bằng deterministic Python code thì đừng dùng agent, code thường robust hơn.

</details>

## 6. Bước tiếp theo

Bài 077 — *LLM Application Development Landscape* — xếp mọi app vào 4 nhóm từ LLM call đơn tới autonomous agents.
