---
title: "Bài 135 - Dựng boilerplate UV cho MCP adapters"
course: "LangChain"
lesson: "135"
status: "edited-verified"
source: "135 - Boilerplate.md"
verified_date: "2026-09-17"
langchain_version: "langchain-mcp-adapters + langgraph + langchain-openai (bản trong video: langchain-core 0.3.5); UV, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "UV", "boilerplate", "venv", "langchain-mcp-adapters", "asyncio", "dotenv", "LangSmith"]
doc_refs: ["https://github.com/langchain-ai/langchain-mcp-adapters", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 135 — Dựng boilerplate UV cho MCP adapters

> Bài học được biên soạn từ transcript "Boilerplate".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Dựng project MCP + LangChain adapters từ số 0 bằng UV: init, venv, install, chạy sanity check.
2. Lấy code mẫu đúng commit từ GitHub khi không muốn làm từ đầu.
3. Chuyển `main.py` sang async và load biến môi trường cho LLM + LangSmith tracing.
4. Giữ đúng thuật ngữ Anh: UV, virtual environment, dependencies, async, dotenv, tracing.

## 2. Kiến thức cốt lõi

### Chuẩn bị repo và branch

1. Muốn bắt đầu từ code của giảng viên: clone repository của course, clone branch `project/langchain MCP adapters`, cd vào `langchain MCP adapters`, checkout đúng commit trong video (lệnh download trong video resources).
2. Làm từ đầu như video: vào GitHub projects, clone MCP crash course repo, đang ở main. Tạo branch mới detached: `git checkout --orphan project/langchain MCP adapters`. Xóa sạch files (`git rm -rf .`) để có clean slate.

### Init project bằng UV

1. `uv init` → sinh README trống, `main.py`, `pyproject.toml`.
2. Mở Cursor IDE, mở terminal, `uv venv` → có `venv`, source/activate (thấy tên env trong ngoặc). Thoát mở lại Cursor thường tự activate.
3. Install dependencies theo example của langchain adapters repo: `langchain MCP adapters` package, `langgraph`, `langchain OpenAI`; MCP package không cần cài riêng vì adapter kéo theo. Thêm `python-dotenv` (trong video đã có sẵn). Xem `pyproject.toml` và `uv.lock` để biết versions — trong video `langchain-core` là 0.3.5, máy bạn có thể mới hơn. Giảng viên hứa giữ videos up to date nếu có breaking changes.

### Sanity check và async main

1. Chạy `uv run main.py` trong venv → thấy output là đạt.
2. Đổi function thành coroutine với `async`, chạy bằng `asyncio.run`, import `asyncio`, chạy lại vẫn work.

### Biến môi trường cho LLM và tracing

1. Tạo `.env` chứa OpenAI API key (hoặc key hãng khác) — dùng managed LLM, miễn support function calling (Anthropic Sonnet, Gemini free tier, DeepSeek...). Giảng viên revoke key ngay sau khi quay.
2. Bốn keys LangChain còn lại phục vụ LangSmith tracing: xem LLM gửi gì/nhận gì. Không bắt buộc: đặt `LANGCHAIN_TRACING_V2=false` là chạy không trace; muốn trace thì lên LangChain platform tạo API key. Project trong video tên `MCP test`.
3. Tạo `.gitignore` bỏ `.env` (file xám đi, git không track) để không push nhầm keys.
4. Trong `main.py`: import `load_dotenv` từ `dotenv`, gọi trước khi code chạy, import `os`, print thử OpenAI API key để verify load đúng.

### Commit và push

- Add tất cả, dùng tính năng AI của Cursor sinh commit message, commit, set upstream rồi push. Lên GitHub chọn branch `project/MCP adapters` thấy `main.py`, `uv.lock`, `pyproject.toml`.

## 3. Ví dụ và diễn giải

- Giữ đúng chi tiết transcript: orphan branch, `uv init`, `uv venv`, `uv run main.py`, async + `asyncio.run`, `.env` + `.gitignore`, Cursor autocomplete và auto commit message.
- Không bịa code ngoài những lệnh và bước giảng viên nêu; transcript gốc không đề cập là cách duy nhất — chỉ là flow trong video.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters) xác nhận dependencies xoay quanh adapter + LangChain/LangGraph và transports stdio/SSE/HTTP; repo ghi đã chuyển sang `langchain.mcp` / `langchain[mcp]`. Kiểm chứng ngày 2026-09-17.
- Versions trong video (langchain-core 0.3.5) đã cũ so với hiện tại — giữ gốc, khi cài mới hãy theo `pyproject.toml`/`uv.lock` hiện hành.
- Trạng thái: flow thực hành **vẫn đúng** ở mức khái niệm; chỉ versions và namespace có thể mới hơn.

> **Hộp cập nhật:** khi dựng project mới, kiểm tra tên package hiện hành (`langchain[mcp]` / `langchain.mcp`) và versions trong docs thay vì ghim đúng số trong video. Flow UV + venv + dotenv + async main không đổi.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Repo | Clone đúng branch/commit hoặc orphan branch làm từ đầu |
| Init | `uv init`, `uv venv`, activate, install adapters + langgraph + openai + dotenv |
| Check | `uv run main.py`, chuyển async với `asyncio.run` |
| Keys | `.env` cho LLM + LangSmith, `.gitignore` bỏ `.env` |
| Verify | `load_dotenv`, print key thử, commit/push |

**Một câu chốt:** Boilerplate xong thì từ bài sau chỉ còn viết MCP client thật.

## 6. Câu hỏi tự kiểm tra

1. Hai cách bắt đầu project trong video là gì?
2. Vì sao không cần cài riêng MCP package?
3. `uv.lock` dùng để làm gì?
4. Không muốn tracing thì làm sao?
5. Vì sao phải có `.gitignore` cho `.env`?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Clone repo course rồi checkout đúng branch/commit mẫu; hoặc tạo orphan branch mới, xóa sạch và `uv init` làm từ đầu.

**2.** Vì khi install LangChain MCP adapters package thì MCP package được kéo theo tự động.

**3.** Ghi exact versions mọi packages trong venv để tái lập môi trường (video nêu langchain-core 0.3.5 làm ví dụ).

**4.** Đặt `LANGCHAIN_TRACING_V2=false`; muốn trace thì lấy API key từ LangChain platform.

**5.** Để git không track `.env`, tránh push nhầm API keys lên repository.

</details>

## 7. Bước tiếp theo

Bài 136 — *Servers* — viết 2 MCP servers: math qua stdio và weather qua SSE.

Nguồn: transcript gốc `135 - Boilerplate.md`; [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters).
