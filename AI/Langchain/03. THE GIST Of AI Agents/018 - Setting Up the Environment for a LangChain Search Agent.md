---
title: 'Bài 018 — Cài Đặt Môi Trường Search Agent'
course: 'langchain'
lesson: 18
status: edited-verified
source: '018 - Setting Up the Environment for a LangChain Search Agent.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/providers/tavily/'
- 'https://docs.langchain.com/langsmith/observability-quickstart'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 018 — Cài Đặt Môi Trường Search Agent

> Biên soạn từ transcript "018 - Setting Up the Environment for a LangChain Search Agent.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Khởi tạo project search agent bằng `uv init` trên nhánh `project/react-search-agent`.
- Cài đúng dependencies: `langchain`, `langchain-openai`, `langchain-tavily`, `tavily-python`, `python-dotenv`, `black`.
- Giải thích khái niệm provider mở rộng: không chỉ LLM vendor mà cả API services như Tavily.
- Lấy `TAVILY_API_KEY` và cấu hình `.env` kèm LangSmith tracing cho project mới.

## 1. Nhánh code của section

Giảng viên checkout nhánh `project/react-search-agent`. Lưu ý kỹ thuật giữ nguyên lời giảng: vì technical reasons, code được commit lên nhánh này chứ không phải nhánh hiển thị góc dưới trái IDE. Muốn xem code section này thì checkout đúng nhánh này.

```bash
uv init
uv add langchain langchain-openai langchain-tavily tavily-python python-dotenv black
```

Chạy thử `main.py` boilerplate để chắc working trước khi viết agent.

## 2. Tavily — search engine cho agent

Tavily là third party giúp connect agent ra web, cho searching capabilities — đóng vai search engine của agent. Ngoài search còn có Tavily Crawl, Tavily Map, Tavily Extract — các services cho AI agents, sẽ dùng ở sections sau.

Vì sao chọn Tavily, giữ nguyên lời giảng:

| Lý do | Diễn giải |
|---|---|
| Popular nhất hiện nay cho web search trong agent | Featured trong official documentation như default service cho search khi implementing agents |
| API excellent, scales tốt, very easy to use | Lý do kỹ thuật |
| Đi đầu integrate search cho agent | Lý do lịch sử theo giảng viên |
| Free tier generous: 1000 API requests/month | More than enough cho khóa học |

Demo trong API playground: query "what are the latest anthropic models", response trả URL source + content nhắc Claude Opus 4.1 / Claude Ops... Search còn advanced filtering, nhưng section này chỉ basics.

## 3. Provider không chỉ là LLM vendor

Khái niệm quan trọng:

> Provider của LangChain không phải chỉ vendor bán LLM như OpenAI. Nó có thể là vendor expose services qua APIs và clients — như Tavily expose searching và scraping.

`langchain-tavily` là Tavily LangChain integration: team Tavily viết, connect sẵn vào LangChain objects sẽ dùng (hint: LangChain tools). Nhờ đó integrate capabilities vào LangChain/LangGraph apps rất dễ. Đây là thêm một example của LangChain provider.

## 4. Cấu hình `.env` — 5 biến cho project mới

Nội dung `.env` giữ nguyên transcript:

```
OPENAI_API_KEY=<key cũ>
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=<key cũ>
LANGSMITH_PROJECT=search agent
TAVILY_API_KEY=<key mới>
```

Cách lấy Tavily key: vào Tavily, log in (demo log with Google), vào API keys, bấm plus, đặt tên `API key`, limit monthly usage, create, review và copy value vào `.env`.

> Tên biến phải là `TAVILY_API_KEY` với underscore API key — vì LangChain sẽ looking for credentials ở đó để authenticate, working very similarly to `OPENAI_API_KEY`.

Cuối video bắt đầu `main.py` với imports, đầu tiên là import load function để load mọi environment variables từ `.env` như previous section.

```
.env ──> load_dotenv() ──> OPENAI + TAVILY + LANGSMITH ──> agent + traces
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Cài `langchain-tavily` + dùng `TAVILY_API_KEY` trong env | Python lib expose Search/Extract/Crawl/Map endpoints; setup `langchain-tavily`, store key ở `TAVILY_API_KEY` | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |
| Tavily là default/featured search cho agents, có Search/Extract/Crawl/Map | Tavily described as "search engine specifically designed for AI agents"; toolkit gồm Search, Extract, Crawl, Map importable từ `langchain_tavily` | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |
| `LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT=search agent` | Quickstart dùng `export LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT` steers data về workspace | Vẫn đúng | [LangSmith observability quickstart](https://docs.langchain.com/langsmith/observability-quickstart) |
| Provider có thể là API services, gắn vào agent qua tools | `create_agent(model, tools, prompt)` assembly từ model + functions; harness lấy context đúng lúc | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): giữ code gốc transcript. Lệnh tương đương hiện nay:

```bash
uv add langchain langchain-openai langchain-tavily python-dotenv black
```

```python
from dotenv import load_dotenv

load_dotenv()
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Agent cần web search real-time | Dùng Tavily — search engine designed for AI agents, free 1000 req/month |
| Mỗi service gọi API một kiểu | `langchain-tavily` wrap sẵn thành LangChain tools: Search, Extract, Crawl, Map |
| Key để đâu để SDK tự nhận | `.env` với `TAVILY_API_KEY` exact, giống pattern `OPENAI_API_KEY` |
| Muốn trace section mới riêng | Đổi `LANGSMITH_PROJECT` sang `search agent`, giữ `LANGSMITH_TRACING=true` |

**Một câu chốt:** Môi trường search agent chỉ thêm một provider search (Tavily) vào stack cũ — còn lại vẫn là LangChain, OpenAI, dotenv và LangSmith tracing.

## Câu hỏi tự kiểm tra

1. Vì sao cần package `langchain-tavily` riêng thay vì gọi Tavily SDK trực tiếp?
2. Bốn capabilities của Tavily là gì?
3. Vì sao Tavily được gọi là default search cho agents?
4. Tên `TAVILY_API_KEY` vì sao phải exact?
5. `LANGSMITH_PROJECT` đổi sang gì ở section này và để làm gì?

<details><summary><b>Xem đáp án</b></summary>

**1.** Vì team Tavily đã wrap SDK thành LangChain tools, connect sẵn vào LangChain objects — tin vendor viết description và arguments tốt hơn ta tự viết, integrate vào LangChain/LangGraph dễ hơn nhiều.

**2.** Search, Extract, Crawl, Map — Python lib expose cả bốn endpoints cho agent dùng; section này chỉ dùng basics Search.

**3.** Vì popular nhất, API excellent và scale tốt, easy to use, đi đầu integrate search cho agent và featured trong official docs làm default service.

**4.** Vì LangChain tìm đúng tên biến này trong environment variables để authenticate tới Tavily services, giống cách tìm `OPENAI_API_KEY`.

**5.** Đổi sang `search agent` để mọi traces của section gom riêng một project trên LangSmith, tách khỏi project `Hello World` trước đó.

</details>

## Bước tiếp theo

Bài 019 — *Creating Your First LangChain Agent: Tools and LLMs* — viết `@tool` search đầu tiên và gọi `create_agent`.
