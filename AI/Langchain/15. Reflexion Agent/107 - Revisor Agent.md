---
title: 'Bài 107 — Revisor Agent'
course: langchain
lesson: 107
status: edited-verified
source: '107 - Revisor Agent.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.langchain.com/langgraph
---

# Bài 107 — Revisor Agent

> Nguồn: `107 - Revisor Agent.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Viết revision instructions plug vào actor template.
2. Tạo class `ReviseAnswer` kế thừa `AnswerQuestion`, thêm `references`.
3. Dựng reviser chain ép `tool_choice="ReviseAnswer"`.
4. Mô tả luồng revisor: critique cũ + kết quả Tavily → bài mới + citations.

## 2. Nội dung chính theo mạch transcript

### 2.1. Revision instructions

- "Revise your previous answer using the new information. Use the previous critique to add important information... Must include numerical citations... Add a reference section to the bottom (not count towards word limit)... Use the previous critique to remove superfluous information... 250 words."
- Đoạn này plug vào placeholder `{first_instruction}` của actor template (dòng 23 bài 106) — toàn bộ hạ tầng có sẵn, chỉ thêm instruction.

### 2.2. Schema ReviseAnswer (schemas.py)

- `class ReviseAnswer(AnswerQuestion)`: kế thừa answer/reflection/search_queries, thêm `references: list[str]` — citations URL lấy từ search engine.
- Chi tiết search engine hẹn bài 108.

### 2.3. Reviser chain (chains.py)

- `actor_prompt_template.partial(first_instruction=revision_instructions) | llm.bind_tools([ReviseAnswer], tool_choice="ReviseAnswer")` — ép LLM trả đúng object ReviseAnswer.
- Đây là logic chạy trong revision node: nhận article cũ + critique + kết quả Tavily, trả bài sửa + critique mới + queries mới + citations.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Kế thừa Pydantic schema + ép tool_choice | Khớp pattern structured output của LangChain. | https://docs.langchain.com/oss/python/langchain/structured-output |
| Revisor là node chạy chain trong graph | Khớp mẫu node LangGraph. | https://docs.langchain.com/langgraph |

> Ghi nhận: bài ngắn, không API mới; giữ nguyên transcript. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| Revision instructions | Thêm thông tin mới, citations số, cắt thừa, giữ 250 từ |
| ReviseAnswer | AnswerQuestion + references |
| Reviser chain | Template cũ + instruction mới + ép tool ReviseAnswer |

**Một câu chốt:** Revisor không viết lại từ đầu mà viết đè lên bản cũ bằng đúng hai nguyên liệu: lời chê hôm qua và bằng chứng tìm được hôm nay.

## 5. Câu hỏi tự kiểm tra

1. Revision instructions yêu cầu mấy việc?
2. Vì sao phần references không tính vào word limit?
3. `ReviseAnswer` kế thừa gì và thêm gì?
4. Revisor chain tái dùng gì từ bài 106?
5. Đầu vào của revision node gồm những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Bốn việc: dùng critique để thêm thông tin quan trọng, chèn numerical citations, thêm reference section cuối bài, dùng critique để cắt superfluous cho vừa 250 từ.

**2.** Transcript quy định vậy để khuyến khích trích đủ nguồn mà không phải hy sinh nội dung chính.

**3.** Kế thừa toàn bộ `AnswerQuestion` (answer, reflection, search_queries), thêm `references: list[str]`.

**4.** Tái dùng `actor_prompt_template` (chỉ đổi first_instruction), LLM GPT-4 turbo, và kỹ thuật bind tool + ép tool_choice.

**5.** Article trước đó, critique của nó, và kết quả search Tavily từ các queries — bài sau output thêm critique mới, queries mới và citations.

</details>

## 6. Bước tiếp theo

Bài 108 — *ToolNode - Executing Tools* — bọc Tavily thành hai tool và chạy bằng ToolNode.
