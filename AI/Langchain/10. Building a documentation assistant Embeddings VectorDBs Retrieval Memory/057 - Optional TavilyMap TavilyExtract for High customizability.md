---
title: 'Bài 057 — Tavily Map và Extract tùy biến cao'
course: 'langchain'
lesson: 57
status: edited-verified
source: '057 - Optional TavilyMap TavilyExtract for High customizability.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.tavily.com/documentation/api-reference/endpoint/map'
- 'https://docs.tavily.com/documentation/api-reference/endpoint/extract'
---

# Bài 057 — Tavily Map và Extract tùy biến cao (Optional)

> Nguồn: `057 - Optional TavilyMap TavilyExtract for High customizability.md` — giữ mạch Eden: notebook Colab, Map lấy sitemap, Extract scrape từng page, batch concurrent.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Hiểu Map khám phá website thành sitemap list URLs.
- Hiểu Extract scrape page thành markdown/raw content.
- Dùng LangChain wrapper `TavilyMap`/`TavilyExtract` bằng `invoke`/`ainvoke`.
- Chia URLs thành batches và chạy concurrent bằng `asyncio.gather`.
- Biết khi nào dùng Crawl gọn và khi nào Map+Extract granular.

## 2. Nội dung theo mạch transcript

### 2.1. Vì sao có video optional

Transcript nói:

- Crawl ở bài trước super simple: đưa URL, nó map + scrape + filter bằng instructions.
- Đôi khi muốn more control, customize từng bước, đi sâu vào parts nhất định.
- Video này show Map và Extract cho use case LangChain docs.
- Cover batch processing strategies, scraping với third-party, rate limiting handling.
- Advanced, optional, nên xem trước rồi mới tự làm, copy snippets từ repo.

### 2.2. Setup Colab

Mở notebook trên Google Colab, runtime Python 3.

Cài deps:

```
pip install langchain-tavily certifi rich
```

Giải thích:

- `langchain-tavily` là integration highly maintained, transcript nhấn quan trọng vì third-party API đổi mà integration kém maintain sẽ break.
- `certifi` để gọi API với valid certificate, defensive khi gửi nhiều requests.
- `rich` để log đẹp, `pandas` lọt vào vì transcript viết nhiều code, thực ra không dùng.

Imports:

```python
import asyncio, os, ssl
import certifi
# from langchain_tavily import TavilyMap, TavilyExtract
```

- `asyncio` vì sẽ extract concurrent.
- `ssl` + `certifi` setup SSL context cho mọi request tới Tavily để không bị block.

Lấy API key:

- Bấm plus tạo key trên Tavily, copy value vào env, chạy cell setup.
- Quay xong revoke nên đừng lo lộ.

### 2.3. Map lấy sitemap

```python
# tavily_map = TavilyMap()
# sitemap = tavily_map.invoke({
#     "url": "https://python.langchain.com/docs/introduction",
#     "max_depth": 2,
#     "max_breadth": 20,
#     "limit": 500,
# })
```

- Map nhận URL, traverse website như graph, explore paths, discover và generate sitemap là list URLs.
- Args transcript cover:
  - `max_depth`: đi xa bao nhiêu từ base URL.
  - `max_breadth`: max links follow mỗi level, mỗi page.
  - `limit`: không lấy quá 500 URLs.
- Vì là LangChain tool nên gọi bằng `invoke`.
- Thực chất Tavily wrap SDK thành LangChain tool, dùng trực tiếp cũng được nhưng transcript muốn show integration.
- Kết quả nằm ở key `results`, iterate in đẹp.
- Results đổi theo thời điểm vì docs LangChain thêm/bớt, quan trọng là luôn được sitemap up to date.
- Transcript show 50 URLs đầu, click random URL thấy valid docs page.

### 2.4. Extract một page

```python
# tavily_extract = TavilyExtract()
# out = await tavily_extract.ainvoke({"urls": [sitemap["results"][21]]})
# print(out["results"][0]["raw_content"])
```

- Khởi tạo Extract không args, output markdown/page content.
- Chọn sample URLs, hiện tại list một URL là phần tử 21, muốn bao nhiêu cũng được.
- Dùng `ainvoke` async vì sau này muốn extract concurrent trong ingestion file.
- Input dict key `urls`, value list URLs.
- Output dict key `results`, mỗi item có `url` gốc và `raw_content`.
- Chạy cell thấy scraped content hiển thị đẹp.

### 2.5. Batch concurrent nhiều pages

Bắt buộc khi scale, không scrape sequential vì forever.

```python
def chunk_urls(urls, chunk_size=3):
    return [urls[i:i+chunk_size] for i in range(0, len(urls), chunk_size)]

async def extract_batch(urls, batch_no):
    return await tavily_extract.ainvoke({"urls": urls})
```

- `chunk_urls` nhận list URLs + chunk size, trả list of lists là batches.
- `extract_batch` nhận một batch + batch number để logging, gọi extract, trả result.
- Demo 9 URLs chia 3 batches x 3, tạo coroutines rồi `asyncio.gather`.
- Logs show start batch 1,2,3 có thứ tự nhưng finish khác: batch 2 xong trước batch 1 rồi batch 3 — minh chứng async.
- Càng nhiều batches như ingestion thật càng thấy rõ.

```
500 URLs -> chunk 20 -> 25 batches -> gather concurrent -> all_pages
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `TavilyMap` trả sitemap `results`, args max_depth/max_breadth/limit | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/map |
| 2 | `TavilyExtract` nhận `urls` list, trả `results` có url + raw_content, gọi `ainvoke` | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/extract |
| 3 | LangChain wrapper là tool, gọi `invoke`/`ainvoke` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Chunk URLs + `asyncio.gather` để concurrent, batch number để observability | VẪN ĐÚNG | https://docs.tavily.com/documentation/api-reference/endpoint/extract |
| 5 | Số URLs 50/500, vị trí phần tử 21,包 pandas/rich lúc quay | chưa kiểm chứng được | https://docs.tavily.com/documentation/api-reference/endpoint/map |

### Code cập nhật (LangChain 1.x)

```python
from langchain_tavily import TavilyMap, TavilyExtract

tavily_map = TavilyMap()
sitemap = tavily_map.invoke({
    "url": "https://python.langchain.com/docs/introduction",
    "max_depth": 2,
    "limit": 500,
})
urls = sitemap["results"][:9]

async def run():
    extractor = TavilyExtract()
    out = await extractor.ainvoke({"urls": urls})
    return out["results"]

# import asyncio; asyncio.run(run())
```

Giải thích:

- Giữ đúng keys `url`, `max_depth`, `limit`, `urls`, `results`.
- Rút gọn breadth để chạy nhanh, logic Map rồi Extract không đổi.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Map | URL → sitemap list URLs |
| Args Map | max_depth, max_breadth, limit 500 |
| Extract | urls list → raw_content markdown |
| Gọi | `invoke` sync, `ainvoke` async |
| Batch | chunk_urls rồi gather concurrent |
| Log | batch number để track |
| Chọn | Crawl gọn, Map+Extract granular |

**Câu chốt: Muốn kiểm soát từng bước crawl thì Map lấy URLs rồi Extract concurrent theo batches.**

## 5. Câu hỏi ôn tập

**1. Map và Extract khác nhau gì?**

<details><summary>Đáp án</summary>

Map discover website thành sitemap URLs, Extract scrape content từng URL thành raw_content theo docs Tavily mới.

</details>

**2. Vì sao dùng `ainvoke`?**

<details><summary>Đáp án</summary>

Vì là IO-bound, await được để chạy concurrent nhiều batches thay vì sequential.

</details>

**3. `chunk_urls` để làm gì?**

<details><summary>Đáp án</summary>

Chia list URLs lớn thành sublists batches để mỗi Extract call nhận số URLs vừa phải.

</details>

**4. Vì sao logs finish khác start?**

<details><summary>Đáp án</summary>

Vì coroutines chạy async qua `gather`, batch nào xong trước trả trước, first come first go.

</details>

**5. Khi nào dùng Crawl thay Map+Extract?**

<details><summary>Đáp án</summary>

Khi muốn gọn một call tự map + scrape + filter instructions; Map+Extract khi cần customize từng bước.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `058 - Optional Crawling Deep Dive.md` — Map 500 URLs, `chunk_urls(20)`, `extract_batch`, `async_extract` tạo Documents.
