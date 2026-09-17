---
title: 'Bài 099 — Project Setup'
course: langchain
lesson: 99
status: edited-verified
source: '099 - Project Setup.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript de cap langchain 0.1.16, langgraph 0.38; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://python.langchain.com/docs/how_to/installation/
- https://docs.smith.langchain.com/
---

# Bài 099 — Project Setup

> Nguồn: `099 - Project Setup.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Dựng thư mục dự án reflection agent bằng Poetry.
2. Cài các dependency: python-dotenv, black/isort, langchain, langchain-openai, langgraph.
3. Tạo file `.env` chứa OPENAI_API_KEY và cấu hình LangSmith tracing.
4. Chạy file main sanity-check và xác nhận biến môi trường đã load.

## 2. Nội dung chính theo mạch transcript

### 2.1. Tạo project và môi trường

1. Tạo thư mục `Reflection agent`, `cd` vào.
2. Chạy `poetry init` (enter hết), được `pyproject.toml`.
3. `poetry add python-dotenv black isort langchain langchain-openai langgraph` (transcript ghi GPT-3.5).
4. Mở PyCharm, trỏ interpreter về virtualenv Poetry vừa tạo.

### 2.2. File `.env` và tracing

- `OPENAI_API_KEY` để gọi model.
- LangSmith: API key + `LANGCHAIN_TRACING_V2=true` + `LANGCHAIN_PROJECT=reflection agent` (transcript viết "Lindsmith/Lamb-smith" nhưng ý là LangSmith).
- Giảng viên giả định học viên đã biết cách lấy key.

### 2.3. File main và kiểm tra

1. Tạo file main với `if __name__ == "__main__": print("hello langgraph")`, chạy thử.
2. Thêm `load_dotenv()`, debug kiểm tra `os.environ["OPENAI_API_KEY"]` có giá trị.
3. Mở `poetry.lock`: langchain 0.1.16, langgraph 0.38 — bản mới nhất tại thời điểm quay.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

> WebSearch/WebFetch ngày 2026-09-17 bị hạn chế, chỉ lấy được trang tổng quan. Giữ nguyên quy trình transcript, bổ sung lưu ý cập nhật.

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `poetry add langchain langchain-openai langgraph` | Vẫn đúng; nay nên ghim version vì API LangGraph 1.x đổi nhiều. | https://docs.langchain.com/langgraph |
| `LANGCHAIN_TRACING_V2=true` + project name | Cơ chế tracing LangSmith vẫn dùng biến này; nay có thêm endpoint/region tùy tài khoản. | https://docs.smith.langchain.com/ |
| GPT-3.5 mặc định, langchain 0.1.16 / langgraph 0.38 | Đã cũ: transcript sau (bài 101) tự ghi hình lại cho LangGraph 1.x; khi học nên dùng bản mới và đọc migration guide. | https://github.com/langchain-ai/langgraph |
| PyCharm + Poetry | Quy trình IDE không đổi; có thể thay bằng venv/uv + VS Code. | https://python.langchain.com/docs/how_to/installation/ |

> Hộp cập nhật: transcript dùng Poetry + PyCharm. Nếu bạn dùng `uv`/`pip`, chỉ cần đảm bảo có `langchain`, `langchain-openai`, `langgraph`, `python-dotenv`. Đừng copy y nguyên version 0.x nếu muốn chạy code mới.

## 4. Tóm tắt một trang

| Việc cần làm | Công cụ/file |
|---|---|
| Tạo môi trường | Poetry init + add dependencies |
| Cấu hình key | `.env`: OpenAI + LangSmith |
| Bật tracing | `LANGCHAIN_TRACING_V2=true`, project = reflection agent |
| Sanity check | main in "hello", `load_dotenv`, đọc lại key |

**Một câu chốt:** Dựng xong môi trường và `.env` load được key thì mới bắt đầu viết LangGraph — đừng vội code khi tracing chưa bật.

## 5. Câu hỏi tự kiểm tra

1. Vì sao cần `python-dotenv` và file `.env`?
2. Hai biến nào bật LangSmith tracing và đặt tên project?
3. Vì sao phải kiểm tra version langchain/langgraph trong `poetry.lock`?
4. Lệnh sanity-check đầu tiên trong file main là gì?
5. Nếu đổi sang LangGraph 1.x thì điều gì trong bài setup này vẫn giữ, điều gì phải xem lại?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Để tách key khỏi code: `.env` giữ key, `load_dotenv()` nạp vào `os.environ` khi chạy.

**2.** `LANGCHAIN_TRACING_V2=true` để bật, `LANGCHAIN_PROJECT` để đặt tên hiển thị (ở đây là reflection agent), kèm API key LangSmith.

**3.** Vì transcript ghi cụ thể langchain 0.1.16 / langgraph 0.38; biết version mới đối chiếu được khi API đổi (bài 101 đã phải quay lại cho LangGraph 1.0).

**4.** `print("hello langgraph")` trong `if __name__ == "__main__"` — chạy được mới tính tiếp.

**5.** Giữ: tạo venv, cài 4 nhóm package, `.env` + load key. Xem lại: version cụ thể, tên package con (ví dụ text-splitters/loaders tách riêng ở section sau), IDE tùy bạn.

</details>

## 6. Bước tiếp theo

Bài 100 — *Creating the Reflector Chain and the Tweet Revisor Chain* — viết reflection prompt, generation prompt và hai chain chạy trong graph.
