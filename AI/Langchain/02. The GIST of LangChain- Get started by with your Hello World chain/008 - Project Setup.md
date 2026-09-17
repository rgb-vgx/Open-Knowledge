---
title: 'Bài 008 — Project Setup'
course: 'langchain'
lesson: 8
status: edited-verified
source: '008 - Project Setup.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/chat/openai'
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://docs.langchain.com/oss/python/langchain/overview'
---

# Bài 008 — Project Setup

> Biên soạn từ transcript "008 - Project Setup.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Clone course repository và tạo nhánh orphan sạch cho project Hello World.
- Khởi tạo project Python bằng UV và cài đặt `langchain`, `langchain-openai`, `python-dotenv`, `black`.
- Giải thích vì sao LangChain tách integration packages theo từng provider.
- Cấu hình `.env` với `OPENAI_API_KEY` và load bằng `load_dotenv`, kiểm tra qua `os.environ.get`.

## 1. Clone repo và tạo nhánh sạch

Mạch transcript:

1. Clone course repository (link trong video resources / introduction section). Mọi video đều có commit code tương ứng để đối chiếu.
2. Mở IDE (giảng viên dùng Cursor, nhấn mạnh PyCharm, VSCode hay vim đều được — chỉ cần chạy và debug code).
3. Tạo nhánh mới kiểu orphan:

```bash
git checkout --orphan project/hello-world
```

`--orphan` tạo nhánh không có commit history. Giảng viên xóa sạch file (`rm -rf`) để bắt đầu từ clean slate. Lưu ý trong video: tới lúc bạn clone thì nhánh này đã tồn tại, có thể phải đặt tên khác như `hello-world-1`.

## 2. UV — package manager và virtual environment

Giảng viên dùng UV, mô tả nguyên văn: package manager rất nhanh như pip nhưng nhanh hơn nhiều vì built on Rust, xử lý installing, resolving và running dependencies hiệu quả, đồng thời quản lý isolated environments.

```bash
uv --help
pip install uv
uv init
uv add langchain
```

`uv init` bootstrap project: tạo `main.py` boilerplate (hello world) và `pyproject.toml` liệt kê packages. `uv add langchain` cài LangChain đồng thời tạo virtual environment — khi chạy code thấy tên project trong ngoặc đơn nghĩa là đang chạy trong venv. Giảng viên nói rõ có thể dùng poetry, Pipenv hay bất kỳ manager nào, vì cả khóa học chỉ làm ba việc: install packages, tạo virtual environments, chạy code trong đó.

## 3. Vì sao có package `langchain-openai` riêng

```bash
uv add langchain-openai
```

Đây là integration package chứa OpenAI-specific integrations cho LangChain ecosystem. Lý do tách riêng, giữ nguyên cách giảng viên giải thích:

> Trước đây mọi thứ bundle trong một package gốc; sau một release LangChain split providers (third-party services) thành independent packages để mỗi vendor maintain package của riêng mình.

Nhờ đó bạn không phải download 100 providers khi chỉ dùng OpenAI hay Anthropic; mỗi provider thêm models/features độc lập. Thiết kế này được gọi là nicely decoupled.

Tiếp tục cài:

```bash
uv add python-dotenv black
```

`python-dotenv` để load environment variables từ `.env` files; `black` để format code.

## 4. `.gitignore` và `.env` — API keys là password

Tạo `.gitignore` kiểu Python standard (copy từ GitHub template) để không commit `venv`, API keys. Tạo `.env` chứa environment variables và API keys.

Quy tắc giảng viên lặp đi lặp lại:

> Do not share API keys. Nó như password. Đừng commit lên GitHub — có malicious people scan tự động và abuse, bạn sẽ bị charge nhiều tiền.

Keys trong video đều revoke sau khi quay. Thực hành tốt kèm theo: đặt budget/limit usage trên OpenAI account, phòng khi key leak cũng không max limit.

## 5. Lấy API keys: OpenAI bắt buộc, Gemini và Ollama là lựa chọn

| Provider | Tên biến môi trường | Ghi chú trong transcript |
|---|---|---|
| OpenAI | `OPENAI_API_KEY` | Tên phải exact — LangChain tìm đúng biến này khi gọi OpenAI API; cần credit card, mua credits trước, không free; thiếu sẽ gặp lỗi 429 |
| Google Gemini | `GOOGLE_API_KEY` | Lấy từ Google AI Studio, cần cài `langchain-google-genai` (video không demo) |
| Local open-weights | (không cần key) | Cài `langchain-ollama`, demo ở video sau |

Giảng viên nhắc: cả khóa dùng OpenAI, nhưng bạn có thể dùng bất kỳ LLM nào (Anthropic, Gemini...), có video riêng nói model nào dùng được cho từng project.

## 6. Load biến môi trường trong code

```python
from dotenv import load_dotenv
import os

load_dotenv()
print(os.environ.get("OPENAI_API_KEY"))
```

`load_dotenv()` tìm file `.env`, load values vào environment. In ra thấy đúng giá trị key nghĩa là truy cập được từ code. Cuối video giảng viên xóa code test, chạy `black`, commit `environment setup` và push lên nhánh Hello World để học viên lấy đúng link trong resources.

```
.env ──> load_dotenv() ──> os.environ ──> ChatOpenAI dùng OPENAI_API_KEY ──> OpenAI API
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Cài `langchain` + `langchain-openai` riêng thay vì bundle | Setup dùng `pip install -U langchain-openai` / `uv add langchain-openai`, import từ `langchain_openai` | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |
| Xác thực qua biến `OPENAI_API_KEY` trong environment | Guide yêu cầu tạo platform secret và expose dưới tên `OPENAI_API_KEY`, prompt khi thiếu | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |
| Local models qua package `langchain-ollama` riêng | Ollama gọi qua separate LangChain distribution, import chat class từ module của nó | Vẫn đúng | [Ollama integration](https://docs.langchain.com/oss/python/integrations/chat/ollama) |
| Providers tách thành integration packages độc lập, vendor tự maintain | Docs tổ chức integrations theo từng provider với package cài riêng | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| `GOOGLE_API_KEY` + `langchain-google-genai` cho Gemini | Tên package và pattern biến môi trường theo provider — chi tiết chưa fetch được trang Gemini, chưa kiểm chứng được tên biến exact | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |

Code cập nhật (nếu có): giữ code gốc transcript; tương đương trên version mới không đổi vì chỉ dùng `load_dotenv` + `os.environ` chuẩn Python, và tên package `langchain-openai` giữ nguyên.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Project lẫn lộn history cũ | Nhánh orphan + `.gitignore` Python chuẩn, bắt đầu clean slate |
| Cài đặt chậm, venv rối | UV: `uv init`, `uv add langchain langchain-openai python-dotenv black` |
| Sợ bundle nặng 100 providers | Integration packages tách riêng, chỉ cài provider cần dùng |
| Leak API key lên GitHub | `.env` + `load_dotenv`, key như password, đặt budget limit |
| Muốn đổi LLM | Giữ nguyên code, đổi integration package và biến key tương ứng (`OPENAI_API_KEY`, Ollama local không cần key) |

**Một câu chốt:** Setup chuẩn là repo sạch, venv của UV, packages tách theo provider và API keys nằm trong `.env` không bao giờ commit.

## Câu hỏi tự kiểm tra

1. `git checkout --orphan` khác gì checkout nhánh thường?
2. Vì sao LangChain tách `langchain-openai` khỏi package gốc?
3. `load_dotenv()` làm gì và vì sao cần kiểm tra bằng `os.environ.get`?
4. Vì sao tên `OPENAI_API_KEY` phải exact?
5. Vì sao giảng viên khuyên đặt budget limit trên OpenAI account?

<details><summary><b>Xem đáp án</b></summary>

**1.** `--orphan` tạo nhánh không có commit history — bắt đầu hoàn toàn mới, khác nhánh thường kế thừa history. Transcript dùng kèm xóa sạch file để có clean slate.

**2.** Để mỗi vendor (third-party service) maintain package riêng, thêm models/features độc lập; người dùng chỉ download provider mình cần thay vì 100 providers — nicely decoupled.

**3.** `load_dotenv()` đọc file `.env` và load values vào environment; kiểm tra bằng `os.environ.get("OPENAI_API_KEY")` để xác nhận code truy cập được key trước khi viết chain.

**4.** Vì LangChain tìm đúng tên biến này khi tạo requests tới OpenAI API để lấy responses; sai tên sẽ không authenticate được.

**5.** Để nếu key leak và bị abuse thì cũng không vượt quá limit đã đặt; đồng thời OpenAI không free nên cần kiểm soát chi tiêu credits.

</details>

## Bước tiếp theo

Bài 009 — *LangChain Fundamentals: Prompt Templates, ChatModels and Chains* — building blocks đầu tiên của chain.
