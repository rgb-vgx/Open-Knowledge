---
title: 'Bài 058 — Deep dive Map Extract batch concurrent'
course: 'langchain'
lesson: 58
status: edited-verified
source: '058 - Optional Crawling Deep Dive.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.tavily.com/documentation/api-reference/endpoint/map'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/extract'
---

# Bài 058 — Deep dive Map, Extract batch concurrent (Optional)

> Nguồn: `058 - Optional Crawling Deep Dive.md` — giữ mạch Eden: log pipeline, Map sitemap 500 URLs, `chunk_urls(20)`, `extract_batch`, `async_extract` thành Documents.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Log pipeline `documentation ingestion pipeline` bằng `log_header`.
- Map docs thành sitemap 500 URLs qua LangChain tool.
- Chia sitemap thành batches 20 bằng `chunk_urls`.
- Viết `extract_batch` gọi Extract một batch kèm logging/exception.
- Viết `async_extract` gather concurrent, tách pages và failed batches.
- Tạo LangChain Documents từ URL + raw_content để sẵn sàng chunk.

## 2. Nội dung theo mạch transcript

### 2.1. Crawl gọn vs Map+Extract granular

Transcript nhắc:

- Bài trước khuyên dùng Crawl vì super simple: đưa URL, nó map site, scrape sitemap, filter bằng instructions tự nhiên.
- Ví dụ bảo docs site chỉ lấy everything about agents là nó lọc và scrape hộ.
- Đôi khi muốn more control, customize từng bước, đi sâu parts nhất định.
- Video này show Map + Extract cho LangChain docs.
- Cover batch processing strategies, scraping third-party, rate limiting handling.
- Advanced, optional, nên xem trước rồi tự làm, copy snippets từ repo.

### 2.2. Map sitemap

Logs mở đầu:

```python
# log_header("documentation ingestion pipeline")
# log_info("map", f"starting to map documentation structure from {url}")
```

Giải thích:

- `log_header` in tiêu đề đẹp, `log_info` tím như transcript nói.
- Copy paste từ reference code trong video resources cũng được.

Invoke Map:

```python
# sitemap = tavily_map.invoke({"url": "https://python.langchain.com"})
# urls = sitemap["results"]
```

- `invoke` ở đây là Map tool, wrapper LangChain quanh API thành LinkedIn tool.
- Result là dict, list URLs nằm ở key `results`.
- Log số URLs tìm được qua `len(urls)`.
- Debug thấy sitemap có `results` chứa bunch URLs docs.
- Chạy hết thấy scrape 500 URLs.

### 2.3. Chunk URLs thành batches

Tavily Extract API hỗ trợ batch: một call nhận list URLs, không cần một call mỗi URL.

```python
def chunk_urls(urls, chunk_size=20):
    return [urls[i:i+chunk_size] for i in range(0, len(urls), chunk_size)]
```

- Nhận list URLs + chunk size, trả list of lists là batches.
- Transcript đã cover ở notebook video trước nên không elaborate, basic Python.
- Gọi với sitemap và chunk size 20.
- Đừng để quá lớn vì API không nhận quá nhiều URLs.
- Debug: mỗi element là list 20 URLs, trừ batch cuối là remainder.
- 500 URLs / 20 = 25 batches.
- Log đã chunk xong.

Hai tầng parallelism transcript nhấn:

1. API layer tự parallel trong Extract, ta chỉ cần không gửi quá nhiều URLs theo docs, kiểm soát bằng batch size.
2. Ta fire các requests async, classic IO-bound chờ API complete.
- Trước đây download tay không concurrent mất bunch hours.

### 2.4. Extract một batch

```python
async def extract_batch(batch, batch_no):
    # log start batch_no + len(batch)
    # out = await tavily_extract.ainvoke({"urls": batch})
    # log success + len
    # return out
```

- Coroutine nhận batch là list URLs + batch number để observability.
- Log đang process batch mấy, bao nhiêu URLs.
- `await extract.ainvoke`, input dict format Tavily expect: field `urls`, value là batch.
- Non-blocking vì IO-bound.
- Không exception thì log succeeded và số URLs extract được.

### 2.5. Gather concurrent tất cả

```python
async def async_extract(url_batches):
    # tasks = [extract_batch(b, n) for n, b in enumerate(url_batches)]
    # results = await asyncio.gather(*tasks, return_exceptions=True)
```

- Log trước khi tạo coroutines.
- Enumerate batches để gán number track.
- Tạo coroutine mỗi batch nhưng chưa execute vì chưa await.
- `gather` await tất cả, chúng chạy async, đợi hết mới xong là có entire documentation.
- Logs streaming không thứ tự, first come first go.

Xử lý results:

```python
# all_pages = []
# failed_batches = 0
# for r in results:
#     if isinstance(r, Exception):
#         failed_batches += 1
#     else:
#         for item in r["results"]:
#             all_pages.append(Document(
#                 page_content=item["raw_content"],
#                 metadata={"source": item["url"]},
#             ))
```

- Mỗi element results hoặc là dict chứa extracted content, hoặc exception/error batch failed.
- Exception thì log error, tăng counter.
- Valid thì mỗi item có URL source và raw content.
- Tạo LangChain Document: page_content là content, metadata `source` là URL gốc để track content từ đâu.
- Transcript show ví dụ output bên phải, dặn pause check structure, chỉ data manipulation.
- Log success và failures, return `all_pages` là list Documents docs.

### 2.6. Chạy main và kiểm tra

```python
# all_docs = await async_extract(url_batches)
```

- Đặt breakpoint dòng này, chạy debug.
- Logs hiện 25 batches, fire hết, streaming results không order.
- Paste snippets video sau để đặt breakpoint xem documents, cứ ignore tạm.
- Rerun debug, xem `all_docs` là LangChain Documents có source URL và data.
- Ví dụ một doc `page not found` nghĩa là wrong URL hoặc URL không còn tồn tại.
- Ví dụ khác là docs expression language, looks good, sẵn sàng continue.

```
Map 500 URLs -> chunk 20 -> 25 batches -> gather Extract -> all_pages Documents
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Map tool `invoke({url})` trả `results` list URLs | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/map |
| 2 | Extract nhận `urls` list, `ainvoke` concurrent, trả `results` có url + raw_content | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/extract |
| 3 | Chunk 20, gather async, tách Exception và pages, tạo Document source | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/extract |
| 4 | Hai tầng parallel API + async IO-bound | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/extract |
| 5 | Con số 500 URLs, 25 batches, page not found ví dụ lúc quay | chưa kiểm chứng được | https://docs.tavily.com/documentation/api-reference/endpoint/map |

### Code cập nhật (LangChain 1.x)

```python
import asyncio
from langchain_core.documents import Document

def chunk_urls(urls, chunk_size=20):
    return [urls[i:i+chunk_size] for i in range(0, len(urls), chunk_size)]

async def extract_batch(extractor, batch, batch_no):
    out = await extractor.ainvoke({"urls": batch})
    return out["results"]

async def async_extract(extractor, url_batches):
    tasks = [extract_batch(extractor, b, n) for n, b in enumerate(url_batches)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    all_pages = []
    for r in results:
        if isinstance(r, Exception):
            continue
        for item in r:
            all_pages.append(Document(
                page_content=item["raw_content"],
                metadata={"source": item["url"]},
            ))
    return all_pages
```

Giải thích:

- Giữ đúng keys `urls`, `results`, `raw_content`, `source` như transcript.
- `return_exceptions=True` để tách failed batches như transcript.
- Output vẫn `list[Document]` cho bước chunk sau.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Map | URL docs → 500 URLs ở `results` |
| Chunk | `chunk_urls(20)` → 25 batches |
| Extract batch | `ainvoke({urls: batch})` + logs |
| Gather | `asyncio.gather` concurrent, vô thứ tự |
| Lỗi | Exception → failed_batches counter |
| Document | `raw_content` + `metadata.source` |
| Sẵn sàng | `all_pages` đem đi split/index |

**Câu chốt: Chia 500 URLs thành batches 20 rồi gather Extract là có toàn bộ docs sau vài chục giây.**

## 5. Câu hỏi ôn tập

**1. Vì sao Extract batch 20 mà không gửi hết 500?**

<details><summary>Đáp án</summary>

Vì API giới hạn số URLs mỗi call, quá lớn sẽ bị từ chối; 20 là sweet spot theo transcript.

</details>

**2. `return_exceptions=True` để làm gì?**

<details><summary>Đáp án</summary>

Để gather không fail cả loạt khi một batch lỗi, ta đếm failed_batches và giữ pages thành công.

</details>

**3. Hai tầng parallelism là gì?**

<details><summary>Đáp án</summary>

API tự parallel trong Extract và ta fire nhiều requests async IO-bound qua gather.

</details>

**4. Document tạo từ Extract gồm gì?**

<details><summary>Đáp án</summary>

`page_content` là raw_content và `metadata.source` là URL gốc để trace grounding.

</details>

**5. Doc `page not found` nghĩa là gì?**

<details><summary>Đáp án</summary>

URL sai hoặc không còn tồn tại, vẫn là Document nhưng content báo lỗi, cần lọc khi cần.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `059 - Quick Recap.md` — recap đã load docs, sắp chunk 4000/200 và index.
