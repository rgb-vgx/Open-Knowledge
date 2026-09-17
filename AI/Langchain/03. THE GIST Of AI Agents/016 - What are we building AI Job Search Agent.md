---
title: 'Bài 016 — Demo Job Search Agent'
course: 'langchain'
lesson: 16
status: edited-verified
source: '016 - What are we building AI Job Search Agent.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/integrations/providers/tavily/'
---

# Bài 016 — Demo Job Search Agent

> Biên soạn từ transcript "016 - What are we building AI Job Search Agent.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Mô tả demo search agent: query việc AI engineer, trả về postings kèm URL sources.
- Giải thích vì sao grounding bằng sources tạo trust chống hallucination.
- Nêu giới hạn của LLM thuần: static in time, không có real-time internet.
- Định vị mục tiêu section: implement search engine tương đương bằng LangChain + tools.

## 1. Demo: ChatGPT + Web Search

Mạch demo trong transcript:

1. Mở ChatGPT, bấm plus button, chọn Web Search — cung cấp web search capabilities.
2. Gửi query: "Search for three job postings for an AI engineer using LangChain in the Bay area on LinkedIn and list their details."
3. Quan sát: app hiện trạng thái searching the web, kèm LinkedIn icons — giảng viên gọi đây là cool generative UI, application reflecting what agent is doing (hẹn discuss trong khóa học).
4. Output: mỗi position kèm URL nguồn — ví dụ engineering position đang hiring, LangChain RAG, generative AI software engineer; search chữ LangChain trong trang để cross-check đúng solid job positioning.
5. Cuối response có summary và next steps.

> Giữ nguyên ví dụ Bay area + LinkedIn + LangChain như transcript — không đổi scenario.

## 2. Vì sao sources quan trọng hơn đáp án

Giảng viên nhấn mạnh:

> Source grounding tạo trust giữa user và system. Chỉ có answers thì user không decide được có trustworthy không.

Lý do: LLM có thể hallucinate, generate garbage. Khi có source URLs, user browse, cross-check xem answer có grounded in source không, thậm chí decide có trust source đó không. Đây là quick preview của generative UI nhưng điểm chính vẫn là searching capabilities.

## 3. Giới hạn của LLM thuần

| LLM thuần | Muốn có search |
|---|---|
| Simply text in, text out (multimodal thì thêm images, videos, audios cả in lẫn out) | Phải provide tools cho access bên ngoài |
| Static in time vì trained on large corpus | Cần real-time information qua tools |
| Không có access to internet | Equip search tool, agent tự gọi khi query requires |

Chi tiết train/corpus hẹn ở theory section. Kết luận giữ nguyên lời giảng: muốn cho LLM access kiểu này hay external capabilities thì phải provide them với tools — đó là việc của section này, lần đầu dùng learning agents.

## 4. Bối cảnh lịch sử và mục tiêu section

Story thú vị giảng viên kể: khi tạo course khoảng 2022, ChatGPT và chat apps chưa có built-in search; nay built-in search rất useful và standard. Việc thấy chat apps evolve như vậy là interesting.

Mục tiêu section:

> Implement với LangChain một search engine — LLM có access tới exact same kind of search như trong demo.

```
query việc làm ──> agent ──> search tool ──> chew up results ──> response grounded kèm URLs
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Search agent = LLM + web search tool, chew results rồi trả response grounded kèm URLs | Docs: "an agent is a model calling tools in a loop until a given task is complete", assembly qua `create_agent` với provider model + functions | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Tavily là lựa chọn search cho agent (chi tiết Bài 018) | Tavily là "search engine specifically designed for AI agents", Python lib expose Search/Extract/Crawl/Map, key ở `TAVILY_API_KEY` | Vẫn đúng | [Tavily provider](https://docs.langchain.com/oss/python/integrations/providers/tavily/) |
| LLM static, cần tools để có real-time info | Harness role "get the model the right context at the right time", execution giữ message record và middleware | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): không có — bài này chỉ demo trên ChatGPT UI, chưa có code LangChain.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| LLM trả lời nhưng không kiểm chứng được | Trả kèm source URLs để user cross-check, chống hallucination |
| LLM static, thiếu real-time | Equip web search tool, agent tự gọi khi query requires |
| Muốn UX thấy agent đang làm gì | Generative UI reflecting agent actions (searching indicators, icons) |
| Muốn clone ChatGPT search bằng LangChain | Section này build search agent tương đương với LangChain + tools |

**Một câu chốt:** Search agent đáng tin không phải vì đáp án hay mà vì mỗi đáp án đều grounded trong source có thể kiểm chứng.

## Câu hỏi tự kiểm tra

1. Query demo trong video là gì?
2. Generative UI trong demo thể hiện ở đâu?
3. Vì sao sources tạo trust?
4. Hai giới hạn của LLM thuần được nêu là gì?
5. Mục tiêu của cả section này là gì?

<details><summary><b>Xem đáp án</b></summary>

**1.** "Search for three job postings for an AI engineer using LangChain in the Bay area on LinkedIn and list their details" — gửi cho ChatGPT đã bật Web Search.

**2.** App hiện trạng thái searching the web kèm LinkedIn icons — application reflecting what the agent is doing.

**3.** Vì LLM hallucinate được; có URLs thì user browse và cross-check answer có grounded in source không, rồi decide có trust source đó không.

**4.** Static in time (trained on large corpus) và no access to internet — muốn real-time hay external capabilities phải provide tools.

**5.** Implement với LangChain một search engine: LLM có access tới exact same kind of search như demo, lần đầu dùng agents trong khóa học.

</details>

## Bước tiếp theo

Bài 017 — *The Evolution of LangChain ReAct Agents* — từ ReAct prompting qua tool calling tới `create_agent` trên LangGraph.
