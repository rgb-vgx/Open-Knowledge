---
title: 'Bài 027 — Setup môi trường agents under the hood'
course: 'langchain'
lesson: 27
status: edited-verified
source: '027 - Setup.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://docs.langchain.com/langsmith/observability'
---

# Bài 027 — Setup môi trường agents under the hood

> Nguồn: `027 - Setup.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Dựng repo sạch từ branch `project/agents-under-the-hood` để code xuyên suốt section.
- Cài đúng dependencies: langchain, langchain-ollama, langchain-openai, python-dotenv, black, isort.
- Cấu hình `.env` cho OpenAI và LangSmith tracing.
- Kéo và chạy model Qwen3 1.7B bằng Ollama để dùng cho Layer 1-3.
- Kiểm tra Ollama server hoạt động trước khi sang bài agent loop.

## 1. Checkout đúng commit khởi đầu

1. Toàn bộ code của section nằm ở branch `project/agents-under-the-hood`.
2. Giảng viên mở branch trên GitHub, cho thấy starting commit chỉ có file `.gitignore` và một commit duy nhất.
3. Cách về đúng điểm xuất phát trong IDE:
   - Lấy commit hash của starting commit.
   - Chạy `git checkout -b project/agents-under-the-hood <commit-hash>`.
4. Giảng viên gặp lỗi vì bản thân đã ở sẵn commit đó — nghĩa là không cần checkout lại.
5. Bài học rút ra: luôn xác nhận mình đang đứng đúng commit trắng trước khi `uv init`, tránh lẫn code cũ.

## 2. Khởi tạo project Python bằng uv

1. Chạy `uv init` để khởi tạo project.
2. Xóa file `main.py` mặc định vì không cần tới.
3. Cài dependencies bằng `uv add`:
   - `langchain` — core abstractions cho agent loop Layer 1.
   - `langchain-ollama` — integration để gọi open-weights model chạy local.
   - `langchain-openai` — để sau này switch model sang OpenAI ở Bài 031.
   - `python-dotenv` — load biến môi trường từ `.env`.
   - `black` và `isort` — formatting.
4. Sau khi cài, kiểm tra 2 file sinh ra:
   - `pyproject.toml` cập nhật versions và dependencies.
   - `uv.lock` ghim exact versions.
5. Giữ nguyên tắc transcript: cài cả Ollama và OpenAI ngay từ đầu để sau này chỉ đổi string model, không phải sửa dependency.

## 3. Tạo file `.env` cho OpenAI và LangSmith

1. Tạo file mới `.env` trong root project.
2. Dán các biến môi trường giảng viên chuẩn bị sẵn:
   - `OPENAI_API_KEY` — dùng OpenAI models, giảng viên lưu ý key này sẽ bị revoke khi video public.
   - Không cần API key cho Ollama vì mọi thứ chạy local.
   - `LANGSMITH_API_KEY` — bật tracing trên LangSmith platform, key demo cũng sẽ bị revoke.
   - `LANGSMITH_PROJECT` đặt là `ReAct Under The Hood`.
   - Bật LangSmith tracing (ví dụ `LANGSMITH_TRACING=true`).
3. Mục đích LangSmith ở đây: xem runs của agent, dễ hiểu chuyện gì xảy ra từng iteration.
4. Save file, sau đó `git add` và `git commit` với message `Env setup`, rồi push.
5. Giảng viên refresh trang commits trên GitHub để cho thấy commit mới đã lên, trong đó có code setup.

## 4. Tải open-weights model Qwen3 bằng Ollama

1. Giảng viên chọn Qwen vì nhẹ, hỗ trợ function calling, rất hợp để demo agent loop.
2. Nhấn mạnh: bạn có thể dùng bất kỳ model nào, OpenAI, Anthropic, Gemini đều được, miễn là support function calling, không bắt buộc open-weights.
3. Các bước trên ollama.com:
   - Tìm model Qwen3.
   - Trang model ghi đây là latest generation của dòng Qwen, có bản dense và mixture-of-experts.
   - Trang ghi rõ support tool calling.
4. Giảng viên chọn bản Qwen3 1.7B parameters, nặng khoảng 1.4GB.
5. Lý do chọn 1.7B: đã thử bản 0.6B và thấy yếu quá, muốn bản mạnh hơn một chút mà vẫn nhẹ để lưu trữ.
6. Copy tên model để dùng cho lệnh pull.

## 5. Pull, run thử và bật Ollama server

1. Mở terminal, chạy `ollama` để xem các commands khả dụng.
2. Chạy `ollama list` để liệt kê models local — lúc đầu trống, chưa có gì.
3. Chạy `ollama pull <tên-model-qwen3-1.7b>` để tải model về máy, chờ tùy tốc độ mạng.
4. Sau khi tải xong, clear terminal, chạy `ollama run <tên-model>` để vào CLI chat.
5. Gõ thử `Hi`, `How are you doing?` để xác nhận model chạy local tốt.
6. Thoát CLI bằng `/bye`.
7. Chạy `ollama serve` để bật Ollama server, từ đây Python app có thể consume model local.
8. Checkpoint cuối video: Ollama đang chạy + local model sẵn sàng + env variables + dependencies đã cài.
9. Video tiếp theo sẽ bắt đầu Layer 1: tự triển khai agent loop dùng function calling và LangChain primitives.

> Câu chốt: setup chuẩn một lần — uv + 2 LangChain integrations + `.env` tracing + Ollama server — thì cả 3 layers sau chỉ việc code mà không phải quay lại sửa môi trường.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Cài `langchain`, `langchain-ollama`, `langchain-openai` rồi dùng `init_chat_model("ollama:...")` / `init_chat_model("openai:...")` | Docs Models xác nhận `init_chat_model` với identifier `provider:model`, chỉ cần provider package tương ứng đã cài | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Dùng Ollama chạy local, Qwen3 1.7B support tool calling | Docs Ollama integration: chỉ variant được gắn cờ capable mới dùng được, dùng chuẩn OpenAI-compatible, `bind_tools` rồi invoke, response có `tool_calls` | Vẫn đúng | https://docs.langchain.com/oss/python/integrations/chat/ollama |
| Cần model support function calling, vendor nào cũng được | OpenAI docs: control qua `tool_choice`, `parallel_tool_calls`, định nghĩa tools bằng JSON schema; model mới yêu cầu Responses API | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Bật LangSmith tracing với API key + project để xem runs | Docs LangSmith Observability: onboarding bằng account + key, trỏ về dashboard setup và review workflows | Vẫn đúng | https://docs.langchain.com/langsmith/observability |
| `ollama pull`, `ollama list`, `ollama run`, `ollama serve` | Thuộc Ollama CLI/SDK, không phải LangChain API nên không đối chiếu ở docs LangChain | Chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/chat/ollama |

### Code cập nhật (nếu có)

Không đổi logic setup. Cách init model hiện nay theo docs 1.x:

```python
from langchain.chat_models import init_chat_model

llm_ollama = init_chat_model("ollama:qwen3:1.7b")
llm_openai = init_chat_model("openai:gpt-5")
```

Biến môi trường LangSmith hiện tại vẫn dùng project + tracing enabled, xem trang Observability để lấy tên biến mới nhất vì docs đã restructure sang `docs.langchain.com/langsmith`.

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| uv project | `uv init` + `uv add` + `pyproject.toml` + `uv.lock` |
| LangChain integrations | `langchain-ollama` cho local, `langchain-openai` để switch model |
| `init_chat_model` | Một string `provider:model` là đổi được vendor |
| `.env` + LangSmith | Tracing toàn bộ agent runs trong project `ReAct Under The Hood` |
| Ollama + Qwen3 1.7B | Nhẹ (~1.4GB), support tool calling, đủ cho demo |

**Câu chốt: môi trường chuẩn giúp các bài sau chỉ tập trung vào agent loop, không phải debug cài đặt.**

## Câu hỏi tự kiểm tra

1. Branch và trạng thái commit khởi đầu của section là gì?
2. Vì sao phải cài cả `langchain-ollama` và `langchain-openai` ngay từ đầu?
3. File `.env` cần những gì để bật LangSmith tracing?
4. Vì sao giảng viên chọn Qwen3 1.7B mà không phải bản 0.6B?
5. Lệnh nào bật Ollama server để Python app consume được?

<details><summary><b>Xem đáp án</b></summary>

1. Branch `project/agents-under-the-hood`, starting commit chỉ có `.gitignore`.
2. Để sau này switch model chỉ bằng cách đổi string trong `init_chat_model`, không phải cài thêm.
3. `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT=ReAct Under The Hood`, bật tracing.
4. Bản 0.6B thử rồi thấy yếu, bản 1.7B mạnh hơn mà vẫn nhẹ (~1.4GB).
5. `ollama serve` sau khi đã `ollama pull` và test bằng `ollama run`.

</details>

## Bước tiếp theo

Sang Bài 028 — viết 2 tools `get_product_price` và `apply_discount` bằng `@tool` decorator, docstring và type hints làm mô tả cho LLM.
