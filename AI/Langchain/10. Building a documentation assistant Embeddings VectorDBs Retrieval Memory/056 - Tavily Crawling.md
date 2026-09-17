---
title: 'Bài 056 — Crawl tài liệu LangChain bằng Tavily Crawl'
course: 'langchain'
lesson: 56
status: edited-verified
source: '056 - Tavily Crawling.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/crawl'
---

# Bài 056 — Crawl tài liệu LangChain bằng Tavily Crawl

> Nguồn: `056 - Tavily Crawling.md` — giữ mạch Eden: boilerplate `asyncio.run(main)`, Tavily Crawl, max_depth, instructions, biến results thành Documents.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Hiểu web crawling là duyệt hyperlink từ trang này sang trang khác.
- Dùng Tavily Crawl dạng LangChain tool với `invoke`.
- Hiểu `max_depth`, `extract_depth` và bài toán excessive depth.
- Dùng `instructions` tự nhiên để lọc pages khi mapping.
- Biến mỗi result thành LangChain Document có `source` để explainability.

## 2. Nội dung theo mạch transcript

### 2.1. Web crawling và boilerplate

Transcript định nghĩa:

- Web crawling là automated process duyệt website bằng cách follow hyperlinks, click từ page này sang page khác, uncover thêm related content.
- Với agents và autonomous agents, crawling là key capability, nhất là khi cần deeper layers của web mà standard search khó tới.

Boilerplate hiện tại:

```python
# import asyncio
# if __name__ == "__main__":
#     asyncio.run(main())
```

Giải thích:

- `main` là coroutine, phải chạy bằng `asyncio.run`.
- Thêm logs `log_header` và `log_info` từ `logger.py`.
- Log `recommendation ingestion has started` và `using Tavily crawl to start crawling documentation`.
- Chạy thử để thấy logs in ra là set xong.
- Transcript nhắc `log_header` và `log_info` nằm trong `logger.py`.

### 2.2. Invoke Tavily Crawl

```python
# from langchain_tavily import TavilyCrawl
# crawl = TavilyCrawl()
# result = crawl.invoke({
#     "url": "https://python.langchain.com",
#     "max_depth": 1,
#     "extract_depth": "advanced",
# })
```

Giải thích:

- `crawl` là LangChain tool vì dùng package `langchain-tavily`.
- Muốn invoke tool thì dùng `.invoke`, giống agent tools đã học.
- Truyền `url` gốc là docs Python của LangChain.
- `max_depth` định nghĩa crawler đi xa bao nhiêu từ base URL.
- Default là 1, phải là integer, maximum hiện tại là 5.
- `extract_depth="advanced"` retrieve nhiều data hơn gồm tables và embedded content, success rate cao hơn nhưng latency tăng.

> Transcript nói đây là website traversal tool, explore hàng trăm paths song song với extraction và intelligent discovery tích hợp.

### 2.3. Max depth và excessive depth

Transcript trích best practices for crawling:

- Higher max_depth thì runtime dài hơn, no brainer.
- Worst case với certain website topologies có thể exponentially slower.
- Cách smart: start với depth 1 hoặc 2, review results rồi mới tăng nếu cần.
- Lợi kép: iterations nhanh hơn vì runtime ngắn, cheaper vì consume ít resources.
- Số 5 trong video là sau bunch iterations mới chốt để lấy most documents từ docs.

Kết quả thực tế transcript demo:

| max_depth | Thời gian | Số pages |
|-----------|-----------|----------|
| 1 | dưới 1 giây | 18 results |
| 2 | vài giây | 75 pages |
| 5 | 26 giây | 251 results |

- Mỗi crawl page có `url` và `raw_content`.
- Transcript mở ví dụ một page docs, show raw content đã scrape.
- Cảm xúc transcript: crawling là pain, tedious, nhiều room for bugs: rate limiting, bot protection, dynamically rendered pages.
- Bản cũ khóa học crawl tay, students lỗi khác nhau từng máy, rất pain.
- Quan điểm engineer: nếu crawling không phải main business logic thì offload cho third-party giỏi hơn.

### 2.4. Instructions để lọc pages

```python
# result = crawl.invoke({
#     "url": "https://python.langchain.com",
#     "max_depth": 5,
#     "instructions": "search for content on AI agents",
# })
```

- `instructions` là natural language cho crawler dùng trong mapping process.
- Nó bảo crawler page nào nên scrape, page nào skip.
- Là filtering mechanism để results accurate và precise hơn khi tìm field cụ thể.
- Demo: tìm content về AI agents, chạy 30 giây fast-forward, được 23 pages.
- Nhìn slugs URL thấy toàn docs về AI agents, không lẫn thứ khác.
- Transcript note: dù đang ở RAG section nhưng capability này rất useful khi implement AI agents.

Lưu ý quan trọng giữ nguyên transcript:

- Instructions tốt hay dở quyết định results tốt hay dở.
- Tavily dùng argument này để map URLs, giúp filter có crawl/extract hay không.
- Không nên viết questions, phải viết instruction giúp Tavily quyết định crawl hay không.
- Muốn best practices thì đọc trang best practices for crawl mà transcript post.
- Vì có instructions giúp skip irrelevant pages nên có thể để max_depth cao hơn.

### 2.5. Biến results thành Documents

```python
# from langchain_core.documents import Document
# docs = []
# for r in result["results"]:
#     docs.append(Document(
#         page_content=r["raw_content"],
#         metadata={"source": r["url"]},
#     ))
```

Giải thích:

- Iterate qua `results` key, mỗi result có `url` và `raw_content`.
- Tạo LangChain Document: `page_content` là raw content, `metadata` dict với key `source` là URL.
- Metadata này dùng khi retrieval để biết source từ đâu.
- Giúp user explainability: giải thích vì sao AI RAG trả lời như vậy.
- Tạo trust in the system.
- Transcript đổi max_depth về 1 cho faster iterations, đỡ credits, cải thiện latency.
- Debug thấy `docs` là LangChain Documents có page_content và metadata URL.

Recap pipeline tới đây:

```
Documentation -> Tavily Crawl -> LangChain Documents -> text splitting -> index
```

- Video sau là optional: dùng Map và Extract để granular hơn, nhiều control hơn, cũng giúp appreciate Crawl endpoint.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Tavily Crawl là traversal tool, nhận url, max_depth 1-5, extract_depth advanced | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 2 | LangChain wrapper `TavilyCrawl` là tool, gọi bằng `invoke` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Result có `results` list, mỗi item có url và raw_content | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 4 | `instructions` lọc mapping, start depth nhỏ rồi tăng, batch concurrent | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |
| 5 | Tạo Document từ raw_content + metadata source để grounding/trust | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Con số 18/75/251 pages, thời gian 1s/26s/30s lúc quay | chưa kiểm chứng được | https://docs.tavily.com/documentation/api-reference/endpoint/crawl |

### Code cập nhật (LangChain 1.x)

```python
from langchain_tavily import TavilyCrawl
from langchain_core.documents import Document

crawl = TavilyCrawl()
result = crawl.invoke({
    "url": "https://python.langchain.com",
    "max_depth": 1,
    "extract_depth": "advanced",
})
docs = [
    Document(page_content=r["raw_content"], metadata={"source": r["url"]})
    for r in result["results"]
]
print(len(docs))
```

Giải thích:

- Giữ đúng keys `url`, `max_depth`, `extract_depth`, `results` như transcript.
- Chỉ đổi URL về docs Python hiện tại để chạy được.
- Output vẫn là `list[Document]` cho bước split sau.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Crawl | Follow hyperlinks, uncover related content |
| Tool | `TavilyCrawl().invoke({...})` |
| max_depth | 1-5, start nhỏ rồi tăng |
| extract_depth | advanced nhiều tables hơn, chậm hơn |
| instructions | Lọc mapping bằng ngôn ngữ tự nhiên |
| Result | `results: [{url, raw_content}]` |
| Document | `page_content` + `metadata.source` |
| Triết lý | Offload crawling nếu không phải core logic |

**Câu chốt: Crawl đúng depth và instructions thì docs biến thành Documents sạch cho RAG.**

## 5. Câu hỏi ôn tập

**1. Web crawling là gì?**

<details><summary>Đáp án</summary>

Là duyệt website tự động bằng hyperlink từ page này sang page khác để uncover related content, quan trọng cho agents theo docs Tavily mới.

</details>

**2. `max_depth` để làm gì?**

<details><summary>Đáp án</summary>

Định nghĩa crawler đi xa bao nhiêu từ base URL, default 1 max 5, càng cao càng lâu và đắt.

</details>

**3. `extract_depth advanced` trade-off gì?**

<details><summary>Đáp án</summary>

Lấy thêm tables và embedded content, success cao hơn nhưng tăng latency.

</details>

**4. `instructions` viết thế nào cho đúng?**

<details><summary>Đáp án</summary>

Viết instruction giúp Tavily quyết định crawl hay skip URL, không viết questions, càng rõ càng precise.

</details>

**5. Vì sao metadata source quan trọng?**

<details><summary>Đáp án</summary>

Để khi retrieval biết grounding từ URL nào, giải thích cho user và tạo trust theo docs RAG mới.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `057 - Optional TavilyMap TavilyExtract for High customizability.md` — notebook Colab demo Map rồi Extract batch concurrent.
