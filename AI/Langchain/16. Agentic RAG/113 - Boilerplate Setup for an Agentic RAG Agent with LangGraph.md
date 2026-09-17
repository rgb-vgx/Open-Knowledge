---
title: 'Bài 113 — Boilerplate Setup Agentic RAG'
course: langchain
lesson: 113
status: edited-verified
source: '113 - Boilerplate Setup for an Agentic RAG Agent with LangGraph.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript bo langchain-community, them langchain-unstructured, langchain-text-splitters; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://python.langchain.com/docs/how_to/installation/
- https://docs.langchain.com/langgraph
- https://docs.smith.langchain.com/
---

# Bài 113 — Boilerplate Setup Agentic RAG

> Nguồn: `113 - Boilerplate Setup for an Agentic RAG Agent with LangGraph.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Dựng project `langgraph-course` bằng Poetry.
2. Cài đúng nhóm package đời mới (không còn langchain-community).
3. Tạo `.env` đủ 4 key + tracing + PYTHONPATH.
4. Chạy main sanity-check và tra code ở branch `1-start-here`.

## 2. Nội dung chính theo mạch transcript

### 2.1. Cài đặt (gồm update 2 năm sau)

- `poetry init`, `poetry add beautifulsoup4` (LangChain dùng khi download web để ingest), `langchain langgraph langchain-hub`, Tavily SDK, Chroma vector store, `python-dotenv`, `black`/`isort`, `pytest`.
- Update quay thêm 2 năm sau: bỏ `langchain-community` (deprecated — đã nói ở RAG intro), thay bằng `langchain-unstructured` (document loaders) + `langchain-text-splitters`; giữ pytest vì test app generative rất quan trọng. Code cũ giữ nguyên trừ imports.
- Giảng viên hứa update repo theo LangChain/LangGraph mới nhất liên tục.

### 2.2. PyCharm + `.env` + main

1. Mở project bằng PyCharm, duyệt Poetry env.
2. `.env`: OpenAI key, LangSmith key, `LANGCHAIN_TRACING_V2=true`, project `CRAG`, Tavily key, `PYTHONPATH` trỏ root project.
3. `main.py`: `load_dotenv()` + `print("Hello Advanced RAG")`, chạy xanh. Code đối chiếu branch `1-start-here`.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Bỏ `langchain-community`, tách loaders/splitters | Khớp hướng modular hóa package LangChain đời mới. | https://python.langchain.com/docs/how_to/installation/ |
| Chroma + Tavily + pytest stack | Giữ nguyên theo transcript; tên package con tra theo version ghim. | https://docs.langchain.com/langgraph |
| Tracing LangSmith project CRAG | Cơ chế tracing LangSmith. | https://docs.smith.langchain.com/ |

> Hộp cập nhật: đừng cài `langchain-community` theo video cũ; dùng `langchain-unstructured` + `langchain-text-splitters` như đoạn update. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Việc | Chi tiết |
|---|---|
| Project | langgraph-course + Poetry |
| Ingest deps | beautifulsoup4, unstructured, text-splitters |
| Agent deps | langchain, langgraph, tavily, chroma |
| Hygiene | dotenv, black/isort, pytest |
| `.env` | OpenAI, LangSmith (+tracing, project CRAG), Tavily, PYTHONPATH |

**Một câu chốt:** Section này setup một lần cho cả ba papers — cài đúng package đời mới ngay từ đầu để khỏi sửa imports về sau.

## 5. Câu hỏi tự kiểm tra

1. Vì sao cần beautifulsoup4?
2. Vì sao bỏ langchain-community?
3. Hai package thay thế loaders/splitters là gì?
4. `.env` cần những gì?
5. Vì sao transcript vẫn giữ pytest cho app LLM?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì LangChain dùng nó khi download file từ web để ingest vào vector store.

**2.** Vì đã deprecated (transcript nhắc đã nói ở RAG intro) — chức năng tách sang package chuyên biệt.

**3.** `langchain-unstructured` cho document loaders, `langchain-text-splitters` cho chunking.

**4.** OpenAI key, LangSmith key + bật tracing + project CRAG, Tavily key, PYTHONPATH trỏ root.

**5.** Vì test app generative quan trọng cho software hygiene dù khó (LLM non-deterministic, third-party, tốn token) — chi tiết triết lý test ở bài 118.

</details>

## 6. Bước tiếp theo

Bài 114 — *Code Structure* — tổ chức package graph/nodes/chains/tests và ingestion theo kiến trúc.
