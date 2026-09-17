---
title: 'Bài 001 — Giới Thiệu Khóa Học'
course: 'langchain'
lesson: 1
status: edited-verified
source: '001 - Course Introduction.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/overview'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 001 — Giới Thiệu Khóa Học

> Biên soạn từ transcript "001 - Course Introduction.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Nêu được bối cảnh khóa học: iteration thứ ba, cập nhật theo LangChain 1.0.
- Giải thích vì sao khóa học được quay lại: feedback học viên, ví dụ real-world, production và security.
- Mô tả background của giảng viên Eden và góc nhìn AI engineer không cần PhD ML.
- Định vị được LangChain trong vai trò commoditizing machine learning.

## 1. Chào mừng và bối cảnh khóa học

Giảng viên Eden Marcus chào mừng học viên tới khóa "LangChain course developer LLM-powered agents with LangChain and LangGraph". Điểm quan trọng ông nhấn mạnh ngay:

> Đây là iteration / edition thứ ba của khóa học, quay lại toàn bộ để khớp với những thay đổi của LangChain.

Lý do refilm không chỉ vì version mới mà còn vì feedback: hơn 200,000 students và hơn 40,000 reviews đã được tích hợp để reorganize lectures, thêm real-world examples, thêm thảo luận về security và production, thêm sections và lectures mới.

## 2. Cam kết version: LangChain 1.0

Transcript nêu rõ:

- Toàn bộ code được cập nhật để match LangChain latest and greatest version 1.0.
- Giảng viên nói "it should match the following versions of 1.1, 1.2, but we'll wait and see".

Kèm theo là best practices của LangChain để code robust, usable và composable hơn. Đây là lời hứa bảo trì: nếu API đổi, video và code GitHub sẽ được update.

## 3. Giới thiệu giảng viên Eden

| Thông tin | Nội dung trong transcript |
|---|---|
| Tên | Eden, backend development background nhiều năm, chủ yếu ở cybersecurity companies |
| Xuất phát ML | Trước 2023 có zero machine learning experience |
| Bước ngoặt | Nhảy lên generative AI train khi LLM xuất hiện năm 2023 |
| Vai trò cộng đồng | Heavily involved với LangChain ecosystem và open source package từ đầu, official LangChain ambassador, public speaker về LLM applications |
| Quan điểm | LangChain là go-to framework khi building applications; nó commoditizing machine learning để người không PhD, không ML background vẫn build được |
| Title hiện tại | Tự coi mình là AI engineer — khái niệm sẽ bàn thêm trong khóa học |

Cách ví von của giảng viên được giữ nguyên: ông coi LangChain đã chứng kiến "amazing transformation" và có vai trò lớn trong việc phổ cập ML cho người như ông.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Khóa học khớp LangChain 1.0, tiến tới 1.1/1.2 | Docs hiện tại tổ chức theo `docs.langchain.com/oss/python/langchain`, pattern trung tâm là Agent = Model + Harness với `create_agent` | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| LangChain là go-to framework cho LLM applications (agents, RAG) | Overview vẫn định vị LangChain cho agents và RAG workflows, kèm LangGraph orchestration và observability | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| Best practices để code robust, usable, composable | Docs agents nhấn mạnh scaffold minimal, highly configurable với model, tools, prompt, middleware | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): không có — bài này không chứa code.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Khóa học cũ nhanh lỗi thời theo LangChain | Refilm iteration thứ ba khớp LangChain 1.x, cam kết update theo minor versions |
| Học viên sợ lý thuyết ML nặng | Tiếp cận AI engineer: dùng models as black box qua LangChain, không cần PhD |
| Thiếu ví dụ thực tế và production | Bổ sung real-world examples, security, production, best practices composable |
| Chưa rõ học gì tiếp theo | Lộ trình: agents + RAG, kèm LangGraph và LangSmith trong hệ sinh thái |

**Một câu chốt:** Đây là bản quay mới nhất khớp LangChain 1.x, lấy feedback 200.000 học viên làm nền để dạy developer không cần ML background vẫn build được LLM applications.

## Câu hỏi tự kiểm tra

1. Vì sao giảng viên phải refilm khóa học tới lần thứ ba?
2. Cam kết version của khóa học là gì?
3. Background của Eden trước 2023 là gì và điều đó truyền thông điệp gì?
4. "Commoditizing machine learning" nghĩa là gì trong bài này?
5. Hai bổ sung lớn ngoài code update là gì?

<details><summary><b>Xem đáp án</b></summary>

**1. Vì sao refilm lần thứ ba?**

Vì LangChain thay đổi nhanh và để tích hợp feedback học viên: reorganize lectures, thêm ví dụ real-world, security, production, sections mới và update toàn bộ code khớp LangChain 1.0.

**2. Cam kết version?**

Code trong video khớp LangChain 1.0 và được kỳ vọng tương thích các minor tiếp theo kiểu 1.1, 1.2; nếu có breaking changes giảng viên sẽ update course và repo.

**3. Background của Eden?**

Backend developer nhiều năm trong cybersecurity companies, zero ML experience trước 2023, nhảy vào GenAI khi LLM ra đời. Thông điệp: developer thuần vẫn trở thành AI engineer được nhờ LangChain.

**4. Commoditizing machine learning?**

Biến ML từ thứ cần PhD thành commodity mà developer thường cũng dùng được, LangChain là accelerator chính của quá trình đó.

**5. Hai bổ sung lớn?**

Thêm real-world examples kèm thảo luận security/production, và thêm best practices để code robust, usable, composable hơn.

</details>

## Bước tiếp theo

Bài 002 — *Mục Tiêu Khóa Học* — phân biệt agents và RAG applications cùng prerequisites Python, Git, virtual environment.
