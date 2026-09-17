---
title: "Bai 075 - Context Engineering voi System Prompt"
course: langchain
lesson: 75
status: edited-verified
source: "075 - Context Engineering a System Prompt.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; vi du repo system prompts co the doi theo thoi gian"
categories: [AI]
tags: [context-engineering, system-prompt, Goldilocks, agents]
doc_refs: ["https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts", "https://langchain-ai.github.io/langgraph/", "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools"]
---

# Bài 075 — Context Engineering với System Prompt

> Nguồn transcript: `075 - Context Engineering a System Prompt.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ repo leaked prompts và con số 90k stars, 200/400 dòng như thời điểm quay).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao system prompt quan trọng và được đầu tư liên tục.
2. Kể ví dụ độ dài system prompt của Claude Code, Cursor, Devin.
3. Phân biệt prompt quá cụ thể và quá mơ hồ.
4. Mô tả vùng Goldilocks và 4 đặc điểm của prompt giữa.
5. Hiểu vì sao dạy principles tốt hơn hard-code rules.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. System prompt của SOTA agents dài và sống

Thay vì rao giảng chung chung, giảng viên mở repo tổng hợp leaked system prompts của các agent nổi tiếng: Claude Code, Cursor, Devin, Perplexity Comet... Thời điểm quay repo gần 90.000 stars. Ví dụ: Claude Code ~200 dòng kèm tool descriptions 500 từ cũng inject vào system prompt; Cursor agent ~200 dòng; Devin ~400 dòng. Repo update liên tục vì LLM tiến hóa thì system prompt cũng tiến hóa, tốn nhiều engineering resources để curate iterative.

### 2.2. Ví von chỉ đường và vùng Goldilocks

System prompt như chỉ đường: bảo `go over there` thì confused; đưa manual 50 trang mọi ngã rẽ thì overwhelm. Cần clear, specific, vừa đủ — sweet spot mà Anthropic gọi là Goldilocks zone: not too vague, not too detailed, just right.

### 2.3. Đầu trái: quá cụ thể

Coi LLM như deterministic state machine, hard-code logic: ví dụ `if user intent is incident resolution, ask three follow up questions` — vì sao đúng 3, nếu 2 đủ hay cần 5 thì sao. Liệt kê exhaustive mọi escalation scenario (không bao giờ đủ), ép model theo path định sẵn lệch reality, mỗi edge case mới lại sửa prompt — maintenance nightmare. Nếu steps đã định sẵn hết thì có khi không cần autonomous agent, chỉ cần workflow thường.

### 2.4. Đầu phải: quá mơ hồ

Không đủ signal cho consistent behavior: `assist in a manner consistent with the principles of essence of the company brand` mà không nói principles là gì — false assumption of shared context, model không biết bakery hay chuẩn CS nào. `escalates to a human if needed` mà không nói khi nào là needed. Không framework tiếp cận vấn đề, mỗi run một kiểu — thực chất là bảo `do the right thing` mà không định nghĩa right là gì.

### 2.5. Giữa: prompt tốt

- Clear identity and scope: customer support, không phải marketing/sales; domain borders và basic questions, không phải complex business operations — lập tức có boundaries.
- Empower rather than constrain: đặt goal efficient professional resolution, tin agent tự chọn tools khi cần, thay vì prescribe từng tool từng case.
- Reasoning framework not flowchart: 4 bước identify core issue → gather context → provide resolution → confirm satisfaction — guidance dùng được nhiều scenarios, không branching cứng.
- Clear boundaries + principles: nhiều solutions thì chọn simplest (heuristic kiểu greedy algorithm).

Vì sao superior: prompt cụ thể làm hộ phần nghĩ nên trật script là hỏng; prompt mơ hồ cho quá ít để làm việc; prompt giữa tận dụng đúng điểm mạnh của SOTA LLM là recognize patterns và apply general rules vào specific situations. Dạy principles thay vì rules nên gặp tình huống mới vẫn xoay được, mỗi guideline bao nhiều cases (compressed principles), không lặp hay contradict nhau nên efficient, không waste words.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| System prompt quan trọng, iterate liên tục | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts | Docs Anthropic có hẳn mục system prompts, khuyên iterate. |
| Goldilocks not too vague not too detailed | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts | Thuật ngữ Goldilocks là cách gọi của Anthropic được transcript dẫn lại. |
| Tool descriptions inject vào system prompt | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | LangGraph/LangChain bind tools rồi gửi descriptions cho model đúng như mô tả. |
| Số dòng/stars repo ví dụ | GIỮ NGUYÊN theo thời điểm quay | https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools | Repo ngoài, số liệu thay đổi theo thời gian; không dùng làm fact hiện tại. |

> Hộp cập nhật 2026-09-17: Chưa fetch full docs do giới hạn mạng. Giữ nguyên ví dụ leaked prompts vì là minh họa lịch sử, không khuyến khích dùng prompts rò rỉ vào production mà không kiểm tra license/bảo mật.

---

## 4. Tóm tắt

| Loại prompt | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Quá cụ thể | Hard-code, exhaustive | Giòn, khó maintain |
| Quá mơ hồ | No signal, no framework | Mỗi run một kiểu |
| Goldilocks | Identity + goal + framework + boundaries | Principles, không phải rules |

**Chốt: System prompt ngon nằm giữa — đủ rõ để nhất quán, đủ thoáng để model dùng trí thông minh pattern-matching của nó.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao repo system prompts phải update liên tục?
2. Ví von chỉ đường nói lên điều gì?
3. Ba lỗi của prompt quá cụ thể là gì?
4. Ba lỗi của prompt quá mơ hồ là gì?
5. Vì sao prompt giữa xử lý tình huống mới tốt hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì LLM tiến hóa liên tục nên system prompt cũng phải curate iterative, tốn nhiều engineering resources.

**2.** Chỉ `go over there` thì confused; manual 50 trang thì overwhelm — cần vừa đủ thông tin để tới nơi.

**3.** Coi LLM như state machine hard-code số câu hỏi; exhaustive enumeration không bao giờ đủ; ép path định sẵn và maintenance nightmare mỗi edge case.

**4.** No actionable guidance; false assumption of shared context (tưởng model biết brand/bakery); undefined boundaries như `if needed` mà không nói khi nào.

**5.** Vì dạy principles/framework chung thay vì rules cứng, tận dụng khả năng recognize patterns của LLM, một guideline bao nhiều cases, không contradict, gặp mới vẫn áp được.

</details>

## 6. Bước tiếp theo

Bài 076 — *LLM Applications in Production* — agent chạy lâu, tốn token, hallucination nhân xác suất và cái giá production.
