---
title: "Bai 071 - Chain-of-Thought Prompting"
course: langchain
lesson: 71
status: edited-verified
source: "071 - Chain of Thought Prompting.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem theo paper goc"
categories: [AI]
tags: [prompt, chain-of-thought, cot, reasoning]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/prompt-templates", "https://www.promptingguide.ai/techniques/cot", "https://arxiv.org/abs/2201.11903"]
---

# Bài 071 — Chain-of-Thought Prompting

> Nguồn transcript: `071 - Chain of Thought Prompting.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ và con số như transcript, kể cả chỗ mơ hồ).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao LLM 100B+ vẫn đuối ở bài toán reasoning nhiều bước.
2. Định nghĩa chain-of-thought (CoT).
3. Kể lại 2 câu đố Sean và John trong paper.
4. Phân biệt zero-shot CoT và few-shot CoT.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Vấn đề

LLM lớn làm tốt nhiều task với ít hoặc không cần training thêm, nhưng vẫn bí ở multi-step reasoning: math word problems, commonsense reasoning vốn dễ với người.

Nhóm Google đề xuất chain-of-thought: tách bài toán nhiều bước thành các bước trung gian, để model giải từng bước như người.

### 2.2. Ví dụ trong paper

Câu 1: Sean có 5 đồ chơi Giáng sinh, được mẹ cho 2, bố cho 2. Tổng bao nhiêu? Model trả 9 — đúng (5+2+2).

Câu 2: John chăm 10 con chó, mỗi con mất 5 giờ/ngày, một tuần mất bao nhiêu giờ? Model trả 50 (10x5) — transcript kết luận sai, đáp án đúng là 35. Giữ nguyên mạch transcript: đây là zero-shot prompting nên thiếu sót.

### 2.3. Cách CoT sửa

Lấy câu 1 kèm lời giải mẫu theo kiểu one-shot: nêu rõ bắt đầu từ 5, cộng 2 của mẹ, cộng 2 của bố, bằng 9. Sau đó hỏi lại câu 2, model tự áp dụng mạch nghĩ tương tự, trình bày các bước rồi mới ra đáp án (transcript diễn giải thành 5 giờ/ngày x 7 ngày = 35).

Ý tưởng: guide model giải như người, model sẽ smarter và ra đáp án đúng.

### 2.4. Hai biến thể

- **Zero-shot CoT:** chỉ thêm câu như `let's think step by step`, không đưa cách giải mẫu. Model tự chọn mạch suy luận, thấy được reasoning process nhưng không có prior knowledge.
- **Few-shot CoT:** đính kèm đáp án mẫu của bài tương tự + giải thích đã suy luận thế nào. Model học mạch đó rồi áp cho bài mới, giải được bài similar nhưng không giống hệt theo đúng cách ta muốn.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| CoT từ paper Google, tách intermediate steps | VẪN ĐÚNG | https://arxiv.org/abs/2201.11903 | Paper gốc Wei et al. 2022, không đổi. |
| Zero-shot CoT bằng `let's think step by step` | VẪN ĐÚNG | https://www.promptingguide.ai/techniques/cot | Quy ước chung, giữ nguyên. |
| Few-shot CoT đính kèm reasoning mẫu | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/prompt-templates | Chưa fetch full do giới hạn mạng; giữ mạch gốc, không bịa code. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời về khái niệm. Docs mới bàn thêm self-consistency, tree-of-thought nhưng transcript không đề cập nên không đưa vào lớp 1.

---

## 4. Tóm tắt

| Kỹ thuật | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Standard/zero-shot | Hỏi thẳng | Dễ sai bài nhiều bước |
| Zero-shot CoT | Thêm think step by step | Thấy được suy luận |
| Few-shot CoT | Kèm lời giải mẫu | Áp mạch cũ cho bài mới |

**Chốt: Muốn model làm toán đố nhiều bước thì bắt nó viết ra từng bước trung gian như người.**

---

## 5. Câu hỏi tự kiểm tra

1. CoT sinh ra để giải loại bài nào?
2. Hai câu đố trong paper là gì và kết quả standard prompting ra sao?
3. Few-shot CoT đã làm gì với câu Sean để giúp câu John?
4. Zero-shot CoT khác few-shot CoT thế nào?
5. Vì sao CoT được gọi là bước tiến lớn?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Multi-step reasoning như math word problems và commonsense reasoning mà prompting thường không giải được.

**2.** Sean 5+2+2=9 model đúng; John 10 chó x 5 giờ model trả 50, transcript chốt sai, đúng là 35.

**3.** Đưa đáp án mẫu câu Sean kèm chain-of-thought cách tính, để model bắt chước mạch đó cho câu John.

**4.** Zero-shot chỉ thêm `let's think step by step`, tự do suy luận; few-shot đính kèm đáp án + bước giải mẫu của bài tương tự.

**5.** Vì cho model tiếp cận problem solving giống người: chia nhỏ, giải từng bước trung gian, mở ra nhiều bài toán trước đây không giải được.

</details>

## 6. Bước tiếp theo

Bài 072 — *ReAct Prompting* — ghép reasoning với acting để dùng nguồn ngoài.
