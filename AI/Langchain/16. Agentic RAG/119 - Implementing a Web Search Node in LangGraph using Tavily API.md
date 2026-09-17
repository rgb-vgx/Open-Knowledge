---
title: 'Bài 119 — Web Search Node Tavily'
course: langchain
lesson: 119
status: edited-verified
source: '119 - Implementing a Web Search Node in LangGraph using Tavily API.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/integrations/tools/tavily_search
- https://docs.langchain.com/langgraph
---

# Bài 119 — Web Search Node bằng Tavily

> Nguồn: `119 - Implementing a Web Search Node in LangGraph using Tavily API.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Tạo file `nodes/web_search.py` với Tavily search tool.
2. Chạy search với `max_results=3` và debug cấu trúc kết quả.
3. Join các `content` thành một Document LangChain duy nhất.
4. Update state: append khi đã có docs relevant, thay khi không có gì.

## 2. Nội dung chính theo mạch transcript

### 2.1. Setup

- Imports: typing, `Document` (đựng kết quả), search tool Tavily (LangChain tool), GraphState; khởi tạo tool `max_results=3`; cần Tavily API key trong `.env` (từ bài 113).

### 2.2. Debug trước khi code

- Thêm `if __name__ == "__main__"`: question "agent memory", documents None — mô phỏng không retrieve được gì relevant.
- `tool.invoke(question)` trả list 3 dict `{content, url}` — debug xác nhận rồi mới code tiếp (phong cách xuyên suốt section: chạy thử rồi mới viết).

### 2.3. Gộp và update state

1. `"\n".join(item["content"])` thành một string lớn.
2. `web_results = Document(page_content=joined)`; nếu state đã có documents relevant thì append, không thì `documents = [web_results]`.
3. Return `{"documents": documents, "question": question}`.
4. Đổi tên file thành `web_search.py` (gạch dưới) cho đúng quy ước import.
- Lưu ý transcript: node này chỉ chạy sau grade_documents nên documents còn lại (nếu có) đều đã relevant.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Tavily tool + max_results | Khớp integration Tavily LangChain. | https://docs.langchain.com/oss/python/integrations/tools/tavily_search |
| Bọc kết quả thành Document | Pattern chuẩn để downstream cho LLM. | https://docs.langchain.com/langgraph |

> Ghi nhận: không nội dung lỗi thời. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Bước | Việc |
|---|---|
| 1 | Tavily invoke question → 3 dict content/url |
| 2 | Join content thành một string |
| 3 | Bọc thành Document |
| 4 | Append hoặc thay documents trong state |

**Một câu chốt:** Kết quả search thô chỉ là list dict — phải nấu thành một Document duy nhất thì LLM mới ăn được chung mâm với documents cũ.

## 5. Câu hỏi tự kiểm tra

1. Mỗi phần tử Tavily trả về gồm key gì?
2. Vì sao join bằng "\n"?
3. Khi nào append, khi nào thay documents?
4. Vì sao node này giả định documents đầu vào (nếu có) đều relevant?
5. Vì sao debug `__main__` trước khi viết logic gộp?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** `content` và `url` — transcript debug thấy rõ list 3 dict như vậy.

**2.** Để nối nội dung 3 kết quả thành một văn bản liền mạch, giữ phân tách dòng.

**3.** Có docs relevant cũ thì append Document web vào list; không có gì thì documents = [web_results].

**4.** Vì node chỉ chạy sau grade_documents đã filter — docs sai đã bị vứt, còn lại đều relevant.

**5.** Để nhìn tận mắt cấu trúc trả về rồi mới viết code parse — tránh đoán sai schema.

</details>

## 6. Bước tiếp theo

Bài 120 — *LLM Generation Chain and Node* — lấy RAG prompt, viết generation chain + node + test.
