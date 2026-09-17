---
title: "Bài 149 - Planning Tool và Dynamic To-Do Lists"
course: "LangChain"
lesson: "149"
status: "edited-verified"
source: "149 - Deep Agents How Deep Agents Use Dynamic To-Do Lists to Solve Complex Tasks.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "planning-tool", "to-do-list", "Claude-Code"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 149 — Planning Tool và Dynamic To-Do Lists

> Bài học được biên soạn từ transcript "Deep Agents How Deep Agents Use Dynamic To-Do Lists to Solve Complex Tasks".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao deep agents cần explicit planning tool thay vì chỉ chain-of-thought ngầm.
2. Mô tả cấu trúc to-do list động: pending / in progress / completed.
3. Phân biệt retry mù quáng của ReAct với điều chỉnh có định hướng nhờ plan.
4. Giữ đúng thuật ngữ Anh: planning tool, to-do list, pending, in progress, completed.

## 2. Kiến thức cốt lõi

### Không phải planning ngầm mà là planning tường minh

- Chain-of-thought của LLM là planning ngầm, trôi qua theo từng token.
- Deep agents dùng **explicit planning tool**, thường hiện ra như to-do list định dạng markdown.
- Agent chủ động review và update plan giữa các bước thực thi.

### Vòng đời của một task trong plan

- Mỗi task có trạng thái: **pending**, **in progress**, **completed**.
- Task lỗi không bị retry mù quáng như ReAct gốc; agent nhìn lại plan, lái hướng đi tiếp theo.
- User cũng có thể tác động vào task list.

### Minh họa từ Claude Code

- Claude Code có planning tool nội bộ: user không gọi trực tiếp nhưng nhìn thấy nó chạy.
- Transcript dẫn post của Boris Cherny, creator của Claude Code, với lệnh `update to-do` liên tục cập nhật danh sách.
- Kết quả: bám được task phức tạp, thay vì lạc giữa chừng.

## 3. Ví dụ và diễn giải

- Con người làm việc lớn cũng chia nhỏ, gạch đầu dòng, đánh dấu xong để lấy đà dopamine và thấy tiến độ.
- Deep agent làm đúng như vậy: chia task lớn thành danh sách, làm xong gạch đi, thất bại thì sửa plan thay vì lặp lại y nguyên.
- Điểm mấu chốt là tính động: plan không viết một lần rồi bỏ, mà sống cùng quá trình chạy.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), [LangGraph](https://langchain-ai.github.io/langgraph/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; nếu docs mới đổi tên planning middleware hay cấu trúc state, giữ bản gốc và bổ sung hộp cập nhật.

> **Hộp cập nhật:** khi có mạng, đối chiếu cách `deepagents` triển khai planning tool, tên field lưu plan trong agent state và cách hiển thị trong CLI với docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vấn đề | Chain-of-thought ngầm không đủ giữ hướng cho task dài |
| Giải pháp | Explicit planning tool dạng to-do list markdown |
| Trạng thái | pending, in progress, completed, cập nhật liên tục |
| Khác ReAct | Không retry mù quáng, mà steer theo plan |
| Minh họa | Claude Code và lệnh update to-do của Boris Cherny |

**Một câu chốt:** Muốn agent đi đường dài, hãy cho nó một danh sách việc sống, không phải một suy nghĩ thoáng qua.

## 6. Câu hỏi tự kiểm tra

1. Vì sao gọi planning của deep agents là explicit?
2. Ba trạng thái của task trong to-do list là gì?
3. Planning tool giúp tránh hành vi nào của ReAct gốc?
4. Vì sao analogy với cách làm việc của con người là hợp lý?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì plan là đối tượng tường minh do tool quản lý, được review và update giữa các bước, thay vì chỉ là chain-of-thought ngầm trong token.

**2.** pending, in progress, completed.

**3.** Retry mù quáng khi task lỗi; thay vào đó agent dùng plan để lái hướng đi tiếp theo và user cũng có thể can thiệp.

**4.** Vì con người cũng chia việc lớn, theo dõi tiến độ và gạch task xong để giữ động lực; agent bắt chước chiến lược trực giác này.

</details>

## 7. Bước tiếp theo

Bài 150 — *Sub-Agents và Hierarchical Delegation* — xem deep agent đẻ worker chuyên biệt ra sao.

Nguồn: transcript gốc `149 - Deep Agents How Deep Agents Use Dynamic To-Do Lists to Solve Complex Tasks.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
