---
title: 'Bài 002 — Mục Tiêu Khóa Học'
course: 'langchain'
lesson: 2
status: edited-verified
source: '002 - Course Objectives.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/overview'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 002 — Mục Tiêu Khóa Học

> Biên soạn từ transcript "002 - Course Objectives.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Phân biệt hai loại ứng dụng LLM mà khóa học bao phủ: agents và RAG applications.
- Mô tả vị trí của LangSmith và LangGraph trong hệ sinh thái LangChain.
- Liệt kê các chủ đề production-ready được đề cập: testing, logging, monitoring, alerting, security.
- Chuẩn bị đúng prerequisites: Python, Git cơ bản, virtual environment, environment variables.

## 1. Mục tiêu số một của khóa học

Giảng viên nêu rõ mục tiêu duy nhất:

> Cuối khóa học, bạn đủ năng lực tự phát triển LLM-powered application của riêng mình bằng LangChain.

Ông chia ứng dụng LLM thành hai loại:

| Loại | Ý nghĩa trong khóa học |
|---|---|
| **agents** | Ứng dụng mà LLM tự quyết định gọi tools theo task |
| **RAG applications** | Ứng dụng gắn LLM với dữ liệu riêng chưa từng được train |

Khóa học bao phủ cả hai, không chỉ cách build mà còn cách chúng vận hành under the hood. Giảng viên nhấn mạnh sẽ dive vào LangChain source code để không còn "magic".

## 2. Hệ sinh thái đi kèm: LangSmith và LangGraph

Ngoài LangChain core, học viên sẽ thành thạo:

- **LangSmith** — dùng cho tracing.
- **LangGraph** — dùng cho workflow engineering.

Giảng viên hứa ban đầu nghe chưa hiểu cũng không sao, cuối khóa sẽ hiểu hết.

## 3. Prompt engineering và lịch sử prompting

Khóa học còn bao phủ prompt engineering-based practices, prompt engineering techniques và lịch sử của prompting — được mô tả là nền tảng của mọi ứng dụng GenAI hiện nay.

## 4. Góc nhìn production của software engineer

Xuất thân enterprise software, giảng viên cam kết lồng ghép xuyên suốt các chủ đề production-ready:

1. testing
2. logging
3. monitoring
4. alerting
5. security

Kèm thảo luận các real-world scenarios.

## 5. Đối tượng và prerequisites

Đối tượng chính ban đầu: software engineers và data scientists muốn vào Generative AI, không cần machine learning background. Giảng viên tự kể bản thân năm 2023 có zero ML experience, và cho rằng AI nay là commodity, LangChain là accelerator lớn.

Tuy vậy khóa học rất technical, yêu cầu học viên thoải mái với code: biết viết code, debug code. Đã từng có lawyers, doctors học và thích khóa học, nhưng đó là ngoại lệ.

Prerequisites bắt buộc:

- **Python**: chạy chương trình, viết functions, classes — thành thạo ở mức Python course chuẩn.
- **Git**: `git clone`, `git commit` — không cần fancy.
- **Virtual environment** và **environment variables**.
- Toàn bộ source code quản lý trên GitHub, project bootstrap từ zero step by step, nhưng không dạy lại Python basics.

Cuối video giảng viên nhắc chính sách 30-days money back guarantee, kể cả sau 30 ngày có thể liên hệ trực tiếp để refund.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Ứng dụng LLM chia thành agents và RAG | Docs overview giữ đúng hai nhóm: agents (model + tools loop) và RAG/workflow với retrieval | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| LangSmith dùng cho tracing | LangSmith là observability suite: inspect traces, tool activity, latency | Vẫn đúng | [LangSmith observability](https://docs.langchain.com/langsmith/observability) |
| LangGraph dùng cho workflow engineering / agents | `create_agent` được powered bởi LangGraph ReAct agent under the hood; LangGraph dùng cho production-grade orchestration | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Chỉ cần software experience, không cần ML | Docs hướng tới developers dùng models as black box, không yêu cầu train models | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |

Code cập nhật (nếu có): không có — bài này không chứa code.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Muốn build LLM app mà không biết ML | Dùng LangChain như black-box framework cho developers |
| Chưa phân biệt agents vs RAG | Agents = model gọi tools theo vòng lặp; RAG = gắn dữ liệu riêng vào LLM |
| Thiếu tracing khi lên production | Dùng LangSmith observability |
| Cần workflow bền vững cho agent | Dùng LangGraph / `create_agent` |
| Thiếu nền tảng prompting | Học prompt engineering techniques kèm lịch sử prompting |

**Một câu chốt:** Khóa học lấy năng lực tự build agents và RAG hiểu rõ under the hood làm chuẩn đầu ra, kèm hệ sinh thái LangSmith, LangGraph và tư duy production-ready.

## Câu hỏi tự kiểm tra

1. Hai loại ứng dụng LLM mà khóa học bao phủ là gì?
2. LangSmith và LangGraph phục vụ nhu cầu nào?
3. Vì sao khóa học dive vào source code thay vì chỉ dạy cách dùng?
4. Prerequisites Python/Git nào là bắt buộc?
5. Những chủ đề production-ready nào được lồng ghép xuyên suốt?

<details><summary><b>Xem đáp án</b></summary>

**1.** agents và RAG applications — hai nhóm chính của LLM-powered applications theo giảng viên và docs overview hiện nay.

**2.** LangSmith cho tracing/monitoring; LangGraph cho workflow engineering và orchestration agent production-grade, `create_agent` chạy trên LangGraph under the hood.

**3.** Để không còn "magic": hiểu exactly LangChain làm gì trong quá trình build, tạo nền tảng vững cho lĩnh vực LLM application development.

**4.** Python (chạy code, functions, classes), Git (`clone`, `commit`), virtual environment, environment variables — ở mức standard Python course.

**5.** testing, logging, monitoring, alerting, security, thảo luận theo real-world scenarios.

</details>

## Bước tiếp theo

Bài 007 — *What are we building: LangChain Hello World Chain* — chain đầu tiên tóm tắt thông tin Elon Musk (bỏ qua các bài hành chính 003–005).
