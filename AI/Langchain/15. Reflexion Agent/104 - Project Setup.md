---
title: 'Bài 104 — Project Setup Reflexion'
course: langchain
lesson: 104
status: edited-verified
source: '104 - Project Setup.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung GPT-4 turbo; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://python.langchain.com/docs/how_to/installation/
- https://docs.smith.langchain.com/
---

# Bài 104 — Project Setup Reflexion

> Nguồn: `104 - Project Setup.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Dựng project Reflexion bằng Poetry và cài dependencies (thêm Tavily).
2. Tạo `.env` với ba key: OpenAI, Tavily, LangSmith (+ bật tracing).
3. Cấu hình PyCharm runner và kiểm tra load biến môi trường.

## 2. Nội dung chính theo mạch transcript

### 2.1. Dựng project

1. Tạo thư mục (transcript nói nhầm "reflection agent" nhưng ngữ cảnh là project Reflexion), `poetry init`.
2. Cài `python-dotenv`, `black`/`isort`, `langchain`, `langchain-openai`, `langgraph` (transcript ghi GPT-4 turbo ở section này).
3. Mở PyCharm, xác nhận interpreter Poetry ở góc dưới phải.

### 2.2. File `.env`

- `OPENAI_API_KEY` (gọi GPT-4 turbo).
- Key search engine (ngữ cảnh section là Tavily — bài 108 cài `langchain-tavily`).
- Key LangSmith + `LANGCHAIN_TRACING_V2=true` + `LANGCHAIN_PROJECT=reflection agent` (transcript đọc vậy; đúng ra nên đặt tên riêng như reflexion agent để khỏi lẫn trace section 14).

### 2.3. Sanity check

1. Tạo `main.py` với `if __name__ == "__main__": print("hello reflexion")`.
2. Tạo run configuration, thêm `from dotenv import load_dotenv; load_dotenv()`, chạy thấy biến môi trường load OK.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Poetry + PyCharm | Quy trình vẫn đúng; thay IDE thoải mái. | https://python.langchain.com/docs/how_to/installation/ |
| Ba key OpenAI/Tavily/LangSmith | Khớp stack section: GPT-4 turbo + Tavily search + LangSmith tracing. | https://docs.langchain.com/langgraph |
| `LANGCHAIN_TRACING_V2=true` | Cơ chế bật tracing LangSmith. | https://docs.smith.langchain.com/ |

> Hộp cập nhật: transcript không liệt kê version cụ thể ở video này (xem bài 109: LangGraph 1.0.5). Khi chạy mới, ghim version và cài thêm `langchain-tavily` (bài 108).

## 4. Tóm tắt một trang

| Việc | Chi tiết |
|---|---|
| Môi trường | Poetry + PyCharm |
| Dependencies | dotenv, black/isort, langchain, langchain-openai, langgraph (+ tavily sau) |
| `.env` | OpenAI, Tavily, LangSmith + tracing true |
| Kiểm tra | print hello + load_dotenv chạy xanh |

**Một câu chốt:** Reflexion setup giống Reflection, chỉ thêm một key search — có key Tavily mới cho agent "mắt" nhìn ra web.

## 5. Câu hỏi tự kiểm tra

1. Reflexion setup khác Reflection setup ở dependency/key nào?
2. Vì sao cần cả Tavily key lẫn OpenAI key?
3. Tác dụng của `LANGCHAIN_PROJECT`?
4. Vì sao nên đặt tên project khác section 14?
5. Sanity check gồm mấy bước?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thêm search engine (Tavily): dependency `langchain-tavily` (bài 108) và key Tavily trong `.env`.

**2.** OpenAI key để gọi LLM viết/chê/sửa bài; Tavily key để chạy web search lấy dữ liệu thời gian thực ground bài viết.

**3.** Đặt tên hiển thị project trong LangSmith UI để lọc trace.

**4.** Transcript đọc tên project trùng "reflection agent" (nói nhầm); đặt riêng (ví dụ reflexion-agent) để trace hai section không lẫn nhau.

**5.** Hai bước: chạy `print("hello reflexion")` rồi thêm `load_dotenv()` và xác nhận biến môi trường đọc được.

</details>

## 6. Bước tiếp theo

Bài 106 — *Actor Agent V2* — viết first_responder chain với function calling và structured output (bài 105 là resources rỗng nên bỏ qua).
