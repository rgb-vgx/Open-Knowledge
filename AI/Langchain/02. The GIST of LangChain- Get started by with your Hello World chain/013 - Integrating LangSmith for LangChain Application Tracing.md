---
title: 'Bài 013 — Tracing Với LangSmith'
course: 'langchain'
lesson: 13
status: edited-verified
source: '013 - Integrating LangSmith for LangChain Application Tracing.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/langsmith/observability-quickstart'
- 'https://docs.langchain.com/langsmith/observability'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 013 — Tracing Với LangSmith

> Biên soạn từ transcript "013 - Integrating LangSmith for LangChain Application Tracing.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Đăng ký LangSmith, generate API key và cấu hình 3 biến môi trường tracing.
- Giải thích khi nào cần `LANGSMITH_ENDPOINT` EU và lỗi gặp nếu thiếu.
- Đọc một trace: RunnableSequence, ChatOllama/GPT-5 call, input/output messages, tokens và latency.
- Share trace public và commit code Hello World Chain lên đúng branch.

## 1. Các bước setup tracing

Mạch transcript:

1. Search LangSmith trên browser, sign up (đã có account thì thôi). Có free tier đủ cho khóa học, lúc quay có thể hỏi credit card.
2. Trong dashboard bấm Setup tracing. Các bước liệt kê: install `langchain` (đã có), generate API key, set environment variables.
3. Điền vào `.env` (không dùng quotation marks):

```
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=<key vừa generate, sẽ revoke sau video>
LANGSMITH_PROJECT=Hello World
```

`LANGSMITH_PROJECT` là string tự đặt — project holding mọi traces trên platform. Xong là "entire integration": từ giờ chạy regular LangChain objects là tự động out of the box trace.

## 2. Biến endpoint EU — chi tiết dễ sai nhất

| Trường hợp | Cách làm giữ nguyên lời giảng |
|---|---|
| Ở US như giảng viên trong video | Không cần set `LANGSMITH_ENDPOINT`, default points to US endpoint |
| Ở ngoài US | Bắt buộc set `LANGSMITH_ENDPOINT` trỏ EU region — same URL nhưng có EU prefix |
| Quên set khi ở ngoài US | Gặp authentication error khi LangChain try trace application |

Giảng viên nhấn mạnh chữ very important cho người ngoài US.

## 3. Đọc trace đầu tiên (ChatOllama + Gemma 3)

Chạy lại `main.py` ở debug mode, xong refresh LangSmith:

- Xuất hiện project `hello world` với một runnable sequence run.
- Mở run thấy call tới ChatOllama / Gemma 3: input là human message, output là AI message.
- Cột phải: start time, end time, time to first token (rất quan trọng với một số application), status success hay không, total tokens used.
- Có thể customize thêm tags để filter sau.

Mở rộng node RunnableSequence: gồm hai bước nối tiếp — format string bằng prompt template tạo prompt value, rồi plug output đó vào chat model để send. Đúng mạch LCEL đã học ở Bài 010.

## 4. Trace thứ hai (GPT-5) và view tổng hợp

Comment out dòng Ollama, uncomment dòng GPT-5, run lại file (lần này slow hơn nên fast forward). Refresh LangSmith:

- Xuất hiện second run, tốn 16 seconds, cột trái ghi GPT-5.
- View all traces: thấy mọi runs, filter by tag, filter calls/runs, stats như error rates, median tokens, P90/P50.

Giảng viên đánh giá: LangSmith là một trong những tracing platform tốt nhất cho LLM applications, giá trị sẽ rõ hơn khi implement agents — check agent execution rất convenient và natural.

## 5. Share trace và commit code

- Traces show trong video được link trong videos resources: traces có thể share public lấy shareable link.
- Commit: `git status`, add `main.py`, commit message `hello world chain`, push lên repo. Vào repository, nhánh `project/hello-world`, xem commits là thấy code vừa viết. Link direct để trong videos resources.

```
.env (3 biến) ──> run chain ──> auto trace ──> LangSmith project Hello World ──> RunnableSequence ──> prompt + LLM call
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Bật bằng `LANGSMITH_TRACING=true` | Quickstart dùng `export LANGSMITH_TRACING=true` | Vẫn đúng | [LangSmith observability quickstart](https://docs.langchain.com/langsmith/observability-quickstart) |
| Key ở `LANGSMITH_API_KEY`, project ở `LANGSMITH_PROJECT`, thiếu thì auto-provision default container | Credential ở `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT` steers data về workspace chọn, bỏ trống thì auto-provision standard container | Vẫn đúng | [LangSmith observability quickstart](https://docs.langchain.com/langsmith/observability-quickstart) |
| Ngoài US phải set `LANGSMITH_ENDPOINT` sang EU nếu không sẽ authentication error | `LANGSMITH_ENDPOINT` mandatory khi profile ngoài default US zone, EU là `https://eu.api.smith.langchain.com`, omit trailing `/` để tránh sign-in failure | Vẫn đúng | [LangSmith observability quickstart](https://docs.langchain.com/langsmith/observability-quickstart) |
| Trace gồm RunnableSequence: prompt template rồi LLM call, kèm tokens/latency/status | Run logs là records of live agent behavior cho troubleshooting, quality oversight; agents page inspect traces, tool activity, latency | Vẫn đúng | [LangSmith observability](https://docs.langchain.com/langsmith/observability) |

Code cập nhật (nếu có): giữ nguyên, không đổi tên biến. Chuẩn hiện nay:

```bash
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=<your-key>
export LANGSMITH_PROJECT="Hello World"
# ngoài US:
export LANGSMITH_ENDPOINT="https://eu.api.smith.langchain.com"
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Không thấy chain chạy qua những bước nào | Bật LangSmith: 3 biến môi trường là auto trace mọi run |
| Ở ngoài US bị authentication error | Set `LANGSMITH_ENDPOINT` sang EU, không để trailing `/` |
| Không biết tốn bao nhiêu tokens, first token bao lâu | Đọc trace: start/end time, time to first token, status, total tokens |
| Muốn chia sẻ kết quả debug | Share trace public lấy link, commit `hello world chain` lên nhánh project |

**Một câu chốt:** Ba biến môi trường biến mọi chain thành trace đọc được — prompt nào, model nào, tokens nào, chậm ở đâu.

## Câu hỏi tự kiểm tra

1. Ba biến môi trường LangSmith là gì và mỗi biến làm gì?
2. Khi nào bắt buộc set `LANGSMITH_ENDPOINT`?
3. RunnableSequence trong trace gồm hai bước nào?
4. Cột phải của một run cho biết những gì?
5. Vì sao giảng viên nói giá trị LangSmith sẽ rõ hơn khi tới agents?

<details><summary><b>Xem đáp án</b></summary>

**1.** `LANGSMITH_TRACING=true` để bật tracing, `LANGSMITH_API_KEY` làm credentials, `LANGSMITH_PROJECT=Hello World` chọn project holding traces — xong là regular LangChain objects tự trace out of the box.

**2.** Khi ở ngoài US: phải trỏ sang EU endpoint (same URL thêm EU prefix, hiện nay là `https://eu.api.smith.langchain.com`), nếu không sẽ authentication error khi trace.

**3.** Bước 1 format string bằng prompt template thành prompt value, bước 2 plug output đó vào chat model (ChatOllama/GPT-5) để send — đúng mạch `prompt | llm`.

**4.** Start time, end time, time to first token, status success hay không, total tokens used, kèm khả năng thêm tags để filter; view tổng hợp thêm error rates, median tokens, P90/P50.

**5.** Vì agent execution gồm nhiều LLM calls và tool calls nối tiếp — check execution trên LangSmith convenient và natural hơn debug thủ công từng object.

</details>

## Bước tiếp theo

Bài 014 — *Semantic Versioning in LangChain* — đọc version trong `uv.lock` và hiểu minor/patch tương thích thế nào.
