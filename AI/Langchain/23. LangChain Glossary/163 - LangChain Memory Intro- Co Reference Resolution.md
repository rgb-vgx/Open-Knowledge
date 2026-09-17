---
title: "Bài 163 - Memory Intro và Co-Reference Resolution"
course: "LangChain"
lesson: "163"
status: "edited-verified"
source: "163 - LangChain Memory Intro- Co Reference Resolution.md"
verified_date: "2026-09-17"
langchain_version: "langchain memory classic, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["memory", "co-reference-resolution", "stateless", "chat-history"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/memory", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 163 — Memory Intro và Co-Reference Resolution

> Bài học được biên soạn từ transcript "LangChain Memory Intro - Co Reference Resolution".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích LLM stateless nên không tự nhớ hội thoại.
2. Định nghĩa co-reference resolution qua ví dụ him và that.
3. Nói được giải pháp gốc là nhét chat history vào prompt.
4. Nhận ra trần token khi hội thoại dài, mở đường sang các chiến lược memory ở bài sau.
5. Giữ đúng thuật ngữ Anh: stateless, co-reference resolution, chat history, token limit.

## 2. Kiến thức cốt lõi

### LLM stateless

- LLM không lưu thông tin hội thoại trước đó.
- Hỏi who created LangChain được đáp Harrison Chase, hỏi tiếp do you know any YouTube videos related to him thì đáp không biết him là ai, xin thêm context.

### Co-reference resolution

- Là task xác định các expressions, words hay phrases khác nhau cùng chỉ một entity.
- Ở đây him chính là Harrison Chase; muốn LLM làm được phải đưa state và chat history vào prompt.
- Ví dụ thứ hai: past conversation nói thích cold brew coffee, hỏi where else can I find that thì that là cold brew, kèm điều kiện không muốn Starbucks hay Coffee Bean.

### Hệ quả

- Giải pháp gốc của mọi memory là tìm cách tinh vi để pass data giúp LLM resolve co-reference.
- Hội thoại một giờ sẽ quá dài, chắc chắn exceed token limit nên cần chiến lược chọn lọc, sẽ học ở bài memory deep dive.

## 3. Ví dụ và diễn giải

- Prompt mẫu trong transcript: Given the past conversation. Answer my question now, kèm history rồi mới tới câu hỏi that.
- Không history thì that trôi nổi; có history thì LLM biết that là cold brew và biết quán cần tránh.
- Đây là video lý thuyết, không live demo; implementation các class memory hẹn ở phần còn lại của khóa.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain memory](https://docs.langchain.com/oss/python/langchain/memory), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; các class memory classic có thể đã chuyển sang LangGraph checkpointer ở docs mới.

> **Hộp cập nhật:** khi có mạng, đối chiếu memory classic với memory trên LangGraph hiện tại và cách lưu chat history cho co-reference.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vấn đề | LLM stateless, không tự resolve him hay that |
| Khái niệm | Co-reference resolution: nhiều cách nói cùng một entity |
| Giải pháp gốc | Nhét past conversation vào prompt |
| Giới hạn | Hội thoại dài vượt token limit |
| Hẹn | Bài sau đi sâu trimming và summarization |

**Một câu chốt:** Memory bắt đầu từ việc cho LLM thấy quá khứ để hiểu đại từ hiện tại.

## 6. Câu hỏi tự kiểm tra

1. Stateless nghĩa là gì?
2. Co-reference resolution là gì?
3. Vì sao history giúp resolve that trong ví dụ cà phê?
4. Vì sao history đầy đủ vẫn chưa đủ cho hội thoại dài?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** LLM không lưu thông tin các turn trước, mỗi call độc lập nếu không đưa history vào.

**2.** Xác định các từ hay cụm khác nhau cùng chỉ một entity, như him là Harrison Chase.

**3.** Vì history cho biết that là cold brew và biết quán không muốn tới nên LLM suy ra đúng.

**4.** Vì hội thoại dài vượt token limit nên phải chọn lọc, trim hay summarize thay vì nhét tất cả.

</details>

## 7. Bước tiếp theo

Bài 164 — *Memory Deep Dive với LangGraph* — xem trim, summarize và checkpointer lưu ở đâu.

Nguồn: transcript gốc `163 - LangChain Memory Intro- Co Reference Resolution.md`; [LangChain memory](https://docs.langchain.com/oss/python/langchain/memory).
