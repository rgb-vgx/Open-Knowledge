---
title: "Bài 151 - Luồng Context của Sub-Agents"
course: "LangChain"
lesson: "151"
status: "edited-verified"
source: "151 - Deep Agents Subagents context flow.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "sub-agents", "context-flow", "context-window"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 151 — Luồng Context của Sub-Agents

> Bài học được biên soạn từ transcript "Deep Agents Subagents context flow".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ được luồng vào ra: main agent gửi một prompt, sub-agent trả một output gọn.
2. Giải thích vì sao sub-agent chỉ tốt bằng prompt nó nhận.
3. Nói được vì sao pattern này là cách nén context thông minh.
4. Giữ đúng thuật ngữ Anh: context window, system prompt, compact, clear, artifact.

## 2. Kiến thức cốt lõi

### Một vào, một ra

- Main agent thread phình theo từng message.
- Khi cần sub-agent, main agent tạo một prompt mới và đẩy sang; đó là toàn bộ context sub-agent thấy lúc khởi động.
- Sub-agent làm độc lập, gọi tools, tích hợp, cuối cùng trả một condensed response về main agent.

### Chất lượng prompt quyết định chất lượng worker

- Sub-agent chỉ giỏi bằng prompt main agent viết cho nó.
- Ta có thể can thiệp để main agent prompt sub-agent sao cho dễ làm và cho kết quả tốt hơn.
- Mỗi lần spawn là một fresh context mới, không mang nguyên lịch sử main thread.

### Giữ main thread lean

- Ủy thác phần nặng cho sub-agent, main conversation chỉ nhận artifact gọn.
- Nhờ vậy đỡ phải `/compact`, `/clear` hay mở instance mới.
- Mỗi side chain chạy system prompt may đo riêng nên giải task hẹp tốt hơn main agent đa năng.

## 3. Ví dụ và diễn giải

- Transcript minh họa context window phình: turn 1 tốn 10k tokens, turn 2 lên 30k, tới turn 5 chạm 100k.
- Dù model có 200k hay 1M tokens, con số vẫn hữu hạn: vượt là fail, gần chạm là đắt, chậm và context pollution.
- Dùng sub-agent: tokens worker tiêu không tính vào main agent; cuối cùng main chỉ nhận khoảng 15k tới 20k tokens summary và code đổi, thay vì toàn bộ lịch sử.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được nội dung mới.
- Số token trong ví dụ giữ nguyên theo transcript ở thời điểm quay; model hiện tại có thể khác nhưng nguyên lý hữu hạn vẫn đúng.

> **Hộp cập nhật:** khi có mạng, đối chiếu giới hạn context của model đang dùng và cách `deepagents` truyền prompt cho sub-agent với docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vào | Một prompt duy nhất từ main agent |
| Ra | Một condensed response / artifact |
| Chạy | Isolated context window riêng |
| Lợi ích | Main lean, ít compact/clear, rẻ và nhanh hơn |
| Điều kiện | Prompt phải viết tốt thì worker mới làm tốt |

**Một câu chốt:** Sub-agent là máy nén context: việc nặng làm ở nhánh, main chỉ giữ tinh chất.

## 6. Câu hỏi tự kiểm tra

1. Sub-agent thấy những gì khi bắt đầu chạy?
2. Vì sao nói sub-agent chỉ tốt bằng prompt nó nhận?
3. Pattern này giúp tránh những lệnh nào trong Claude Code?
4. Vì sao context lớn vẫn gây hại dù chưa vượt limit?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Chỉ thấy prompt duy nhất main agent tạo, không thấy toàn bộ hội thoại trước đó.

**2.** Vì đó là toàn bộ context khởi đầu; prompt mơ hồ thì worker khó làm đúng.

**3.** `/compact` và `/clear` hay mở instance mới, vì main thread đã giữ lean nhờ ủy thác.

**4.** Vì càng nhiều tokens càng đắt, càng chậm và càng dễ context pollution, cho kết quả kém dù request chưa fail.

</details>

## 7. Bước tiếp theo

Bài 152 — *File Systems của Deep Agents* — xem đĩa cứng trở thành engine của context engineering ra sao.

Nguồn: transcript gốc `151 - Deep Agents Subagents context flow.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
