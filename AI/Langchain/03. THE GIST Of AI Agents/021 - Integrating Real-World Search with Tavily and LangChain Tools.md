---
title: 'Bài 021 — Tìm Kiếm Thực Tế Với Tavily'
course: 'langchain'
lesson: 21
status: edited-verified
source: '021 - Integrating Real-World Search with Tavily and LangChain Tools.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/providers/tavily/'
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/tools'
---

# Bài 021 — Tìm Kiếm Thực Tế Với Tavily

> Biên soạn từ transcript "021 - Integrating Real-World Search with Tavily and LangChain Tools.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Thay tool tĩnh "Tokyo sunny" bằng `TavilyClient.search(query=...)` search thật.
- Đọc trace job postings: 5 tool calls song song và final answer grounded.
- Giải thích vì sao GPT-5 gọi được nhiều tools một lúc (multiple function calling).
- Áp dụng best practice: bỏ custom tool, dùng built-in `TavilySearch` của team Tavily.

## 1. Từ tool tĩnh sang search thật

Mạch transcript tiếp nối Bài 020:

```python
from tavily import TavilyClient

tavily = TavilyClient()
```

Client lúc init sẽ looking for environment variable `TAVILY_API_KEY` đã cấu hình ở Bài 018. Thay dòng `return "Tokyo weather is sunny"` bằng:

```python
return tavily.search(query=query)
```

`search` nhận argument `query` chính là input của search function. Run lại: log hiện searching over the web. Mở trace, node search execution không còn static string mà là real information — ví dụ weather Tokyo từ weather API kèm top results, có thể control parameter số results nhận về. LLM response cuối elaborate hơn, grounded on real-time information.

## 2. Query việc làm thật và 5 tool calls song song

Đổi message thành query demo Bài 016: search for three job postings for an AI engineer in LangChain in the Bay area in LinkedIn, list details (copy từ repo trong videos resources). Run và đọc log:

- LangChain running search tool 5 lần với 5 queries khác nhau — ví dụ query đầu look inside linkedin.com/jobs tìm LangChain, Bay area, San Francisco, San Jose, AI engineer.
- Output in ra not very nicely nên phải mở trace.

Trong trace:

| Quan sát | Ý nghĩa giữ nguyên lời giảng |
|---|---|
| Input là query việc làm | Human message đầu vào |
| Output LLM là AI response chứa multiple tool calls | AI decides call multiple tool calls |
| 5 tool calls execute in parallel | Vì function calling ở GPT-5 supports multiple function calling (sẽ elaborating sau) |
| Final request chứa all tool calls + answers | Full context cho LLM call cuối |
| Final answer kèm LinkedIn URLs, có posting no longer accepting candidates | Response grounded, vẫn phải tự kiểm chứng |

## 3. Best practice: dùng tool vendor viết sẵn

Giảng viên quay lại code và nêu best practice:

> Ta viết custom tool rồi nhét SDK vào trong — đòi developer biết every bit and byte của SDK. Thực tế không ai biết hết internals, nên hãy trust vendor (team Tavily) viết LangChain tool tốt hơn: description tốt hơn, arguments tốt hơn.

Cách làm:

```bash
uv add langchain-tavily
```

```python
from langchain_tavily import TavilySearch

search_tool = TavilySearch()
```

Xóa custom search tool và `TavilyClient`. Vì đây đã là tool (base tool, LangChain tool) nên chỉ cần initialize object, không send custom arguments. Run lại (fast forward vì lâu), mở trace mới:

- Tên tool là `tavily_search` (transcript ghi "underscore search", đối chiếu bản custom tên `search`).
- Mở một execution: vẫn có `query` như trước nhưng thêm extra arguments do LLM tự quyết mà giảng viên thừa nhận didn't know about: `include_domains: linkedin.com` (chỉ lấy results từ LinkedIn.com) và `search_depth: advanced`.
- Giảng viên hẹn explaining further vì sẽ gặp nhiều examples với Tavily.

Kết quả: answer very similar nhưng a bit more accurate vì agent make được much more specific tool calls, ground answer in better sources. Cuối video giảng viên bring back implementation custom tool để so sánh, rồi `git add`, commit `intro to search agents`, push lên nhánh `project/search-agent`.

```
custom @tool + TavilyClient ──> thay bằng TavilySearch() ──> parallel calls + include_domains + search_depth ──> answer grounded tốt hơn
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `langchain-tavily` + `TAVILY_API_KEY`, toolkit Search/Extract/Crawl/Map | Python lib expose Search, Extract, Crawl, Map endpoints; setup `langchain-tavily`, store key ở `TAVILY_API_KEY` | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |
| `TavilySearch` là LangChain base tool, chỉ cần init không cần args custom | Toolkit classes importable từ `langchain_tavily`, dùng trực tiếp trong `create_agent(model, tools)` | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |
| GPT-5 parallel multiple tool calls qua function calling | Docs agents: execution giữ message record, model calling tools in loop; `@tool` với type hints mandatory | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| `include_domains`, `search_depth: advanced` do LLM tự thêm | Excerpt hiện tại không define `search_depth` hay `include_domains` — chưa kiểm chứng được tên params exact | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |

Code cập nhật (nếu có): giữ code gốc transcript. Tương đương version mới:

```python
from langchain_tavily import TavilySearch

tools = [TavilySearch()]
agent = create_agent(model=llm, tools=tools)
```

Đổi duy nhất: bỏ `TavilyClient` custom, dùng tool vendor maintain; tên tool trong trace là `tavily_search`.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Tool tĩnh không có real-time | Gọi `TavilyClient.search(query)` rồi tiến tới `TavilySearch()` built-in |
| Query phức tạp cần nhiều hướng search | GPT-5 parallel multiple tool calls, final call synthesize tất cả |
| Custom tool mô tả sơ sài | Dùng tool vendor: thêm `include_domains`, `search_depth` giúp answer accurate hơn |
| Muốn tái hiện kết quả | Commit `intro to search agents` trên nhánh `project/search-agent` |

**Một câu chốt:** Đừng tự bọc SDK khi vendor đã viết tool chuẩn — agent của bạn sẽ search sâu và grounded hơn chỉ nhờ đổi một import.

## Câu hỏi tự kiểm tra

1. Dòng nào biến tool tĩnh thành search thật?
2. Vì sao một query việc làm sinh ra tới 5 tool calls?
3. `include_domains` và `search_depth` từ đâu ra?
4. Vì sao nên dùng `TavilySearch` thay vì custom tool?
5. Tên tool trong trace đổi thế nào sau khi chuyển?

<details><summary><b>Xem đáp án</b></summary>

**1.** Thay `return` tĩnh bằng `tavily.search(query=query)` với `TavilyClient()` tự đọc `TAVILY_API_KEY` — từ đó trace có real information thay vì static string.

**2.** Vì GPT-5 supports multiple function calling: AI response chứa multiple tool calls (5 queries LinkedIn/jobs variants) và chúng execute in parallel.

**3.** Do LLM tự quyết khi gọi `TavilySearch` — extra arguments ngoài `query`, ví dụ giới hạn `linkedin.com` và `search_depth: advanced`; giảng viên thừa nhận không biết trước hết args này.

**4.** Vì team Tavily viết description và arguments tốt hơn, biết internals SDK hơn ta — custom tool đòi biết every bit and byte, tool vendor cho specific calls và answer accurate hơn.

**5.** Từ `search` (custom) sang `tavily_search` (built-in của Tavily) — so sánh hai traces là thấy khác biệt tên và độ elaborate của args.

</details>

## Bước tiếp theo

Bài 022 — *Structured Output with LangChain Agents Using Pydantic* — thêm `response_format` để agent trả Pydantic object thay vì text.
