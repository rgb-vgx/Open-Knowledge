---
title: "Bài 170 - Harness Engineering"
course: "LangChain"
lesson: "170"
status: "edited-verified"
source: "170 - Harness Engineering.md"
verified_date: "2026-09-17"
langchain_version: "AI agents 2026, harness và context, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["harness-engineering", "context", "multi-agent", "production"]
doc_refs: ["https://docs.langchain.com/", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 170 — Harness Engineering: Đừng Vội Chia 100 Agents

> Bài học được biên soạn từ transcript "Harness Engineering".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể hành trình nhiều iterations và cảm giác patching không hiệu quả.
2. Giải thích dual process: giữ task nguyên cho agent nhưng scale hệ thống ngoài.
3. Nói được vì sao chia 10 hay 100 agents không tự giải bài 10x hay 100x.
4. Giữ đúng thuật ngữ Anh: harness, architecture, context, delegatable, scale.

## 2. Kiến thức cốt lõi

### Iterations trước khi tới architecture đúng

- Tenzai trải qua more than one iteration của agent; có lúc cảm giác đang patching non-effective, architecture không còn support progress.
- Ra market nhanh không có nghĩa làm nhanh; took a lot more time hơn người ngoài tưởng.
- Quy trình tốt là thử different approaches rồi land on architecture hiện tại; chạy small tests và CTF thấy working well mới scale lên production, và scaling vẫn là process tiếp diễn.

### Dual process của agent state of mind

- Trong agent state of mind, agent không aware có nhiều scale ngoài hay nhiều agents chạy song song.
- Muốn giữ task sao cho không breaking context quá mức vì tác dụng ngược rất lớn.
- Bài toán 1 page vài trăm tới nghìn dòng code không thể cứ chia 10 hay 100 agents là xong 10x hay 100x.

### Bài học harness

- Cần stable environment để cùng một architecture làm được complex tasks hơn.
- Thứ thực sự manage là contexts và effectiveness of context with type: hiểu khi nào được break hay clear context, vùng nào delegatable, vùng nào không.
- May mắn của Tenzai là có đúng experts, engineers và researchers để dựng solid foundation rồi build tiếp.

## 3. Ví dụ và diễn giải

- App nhỏ một agent pentest gọn; app lớn 100x surface mà chia 100 agents mù quáng thì mỗi agent mất context tổng thể, không ai thấy attack path xuyên suốt.
- Harness tốt giống sân vận động ổn định: vẫn một luật chơi, nhưng cầu thủ chạy được trận lớn hơn nhờ quản lý context khéo.
- Dấu hiệu architecture sai là càng patch càng chậm tiến; lúc đó phải dừng vá để đổi foundation.

## 4. Kiểm chứng với docs mới nhất

- Bài là industry insights, không đối chiếu API cụ thể.
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Giữ trung thành transcript; liên hệ sub-agents context isolation ở bài 150 tới 151 để thấy cùng một nguyên lý.

> **Hộp cập nhật:** khi có mạng, đối chiếu patterns multi-agent và context management trong docs LangGraph mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Lịch sử | Nhiều iterations, patching kém hiệu quả rồi đổi architecture |
| Test | Small tests và CTF trước, scale production sau |
| Dual process | Agent giữ context nguyên, hệ thống lo scale ngoài |
| Sai lầm | Chia nhiều agents không tự giải bài lớn |
| Chìa khóa | Stable environment và quản lý effectiveness of context |

**Một câu chốt:** Scale agents là scale kỷ luật context, không phải scale số lượng worker.

## 6. Câu hỏi tự kiểm tra

1. Dấu hiệu architecture không support progress là gì?
2. Vì sao chia 100 agents không giải bài 100x?
3. Dual process nghĩa là gì?
4. Thứ cần manage thực sự là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Càng patch càng thấy non-effective, tiến chậm dù vá nhiều.

**2.** Vì breaking agent context bừa bãi làm mất tổng thể; nhiều worker mà không ai giữ context chung thì không tự đúng.

**3.** Trong đầu agent vẫn làm một task liền mạch, ngoài hệ thống chạy nhiều agents song song; phải giữ hai mặt này không phá nhau.

**4.** Contexts và effectiveness of context: khi nào break, clear, vùng nào delegatable hay không.

</details>

## 7. Bước tiếp theo

Bài 171 — *Variance và Hallucinations* — xem đánh đổi giữa creativity và comprehensiveness.

Nguồn: transcript gốc `170 - Harness Engineering.md`.
