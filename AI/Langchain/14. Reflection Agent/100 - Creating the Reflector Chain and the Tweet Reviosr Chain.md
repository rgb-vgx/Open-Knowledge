---
title: 'Bài 100 — Reflector Chain và Tweet Revisor Chain'
course: langchain
lesson: 100
status: edited-verified
source: '100 - Creating the Reflector Chain and the Tweet Reviosr Chain.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung GPT-3.5, LCEL; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/prompts
- https://docs.langchain.com/oss/python/langchain/models
- https://langchain-ai.github.io/langgraph/
---

# Bài 100 — Reflector Chain và Tweet Revisor Chain

> Nguồn: `100 - Creating the Reflector Chain and the Tweet Reviosr Chain.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Viết reflection prompt đóng vai viral Twitter influencer chuyên chê tweet.
2. Viết generation prompt đóng vai techie assistant chuyên revise tweet theo critique.
3. Giải thích vai trò của MessagesPlaceholder trong cả hai prompt.
4. Dựng hai chain bằng LCEL: prompt | llm (mặc định GPT-3.5 turbo).

## 2. Nội dung chính theo mạch transcript

### 2.1. File chains.py và imports

- Tạo file `chains.py` chứa mọi prompt và chain dùng trong graph.
- Import `ChatPromptTemplate`, `MessagesPlaceholder` (giữ lịch sử hội thoại, linh hoạt plug messages sau này) và `ChatOpenAI`.

### 2.2. Reflection prompt (phe chê)

- System message: "You are a viral Twitter influencer... Generate critique and recommendation... Always provide detailed recommendations including requests for length, virality, style, etc."
- Kèm `MessagesPlaceholder(variable_name="messages")` chứa toàn bộ lịch sử — mỗi vòng lặp lại plug thêm messages vào để critique tiếp.

### 2.3. Generation prompt (phe sửa)

- System message: "You are a Twitter techie influencer assistant... Generate the best Twitter posts... If the user provides critique, respond with a revised version of your previous attempts."
- Cũng kèm `MessagesPlaceholder("messages")` để nhận mọi reflection và revision trước đó — đây là kỹ thuật prompt engineering: LLM luôn thấy toàn bộ ngữ cảnh.
- Khởi tạo LLM mặc định GPT-3.5 turbo, dựng hai chain LCEL: `generation_chain = generation_prompt | llm`, `reflection_chain = reflection_prompt | llm`. Bài sau mới ráp vào LangGraph.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `ChatPromptTemplate` + `MessagesPlaceholder` | API prompt vẫn tồn tại trong LangChain hiện tại. | https://docs.langchain.com/oss/python/langchain/prompts |
| `ChatOpenAI` mặc định GPT-3.5 | Nay model mặc định và tên package có thể khác; nên truyền explicit `model=`. | https://docs.langchain.com/oss/python/langchain/models |
| LCEL `prompt \| llm` | LCEL vẫn là cách chuẩn dựng chain đơn giản. | https://docs.langchain.com/oss/python/langchain/prompts |

> Hộp cập nhật: transcript không đưa code nguyên văn đầy đủ, chỉ đọc prompt bằng lời. Bài học giữ đúng lời prompt như transcript, không bịa thêm system message. Khi chạy bản mới, ghim `langchain-openai` và chỉ rõ model (ví dụ `gpt-4o-mini`) thay vì trông chờ default.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| Reflection prompt | Chê tweet, gợi ý length/virality/style |
| Generation prompt | Viết/sửa tweet theo critique |
| MessagesPlaceholder | Plug lịch sử mỗi vòng lặp |
| generation_chain / reflection_chain | `prompt \| llm`, chạy trong nodes ở bài 101 |

**Một câu chốt:** Chưa có graph vội — bài này chỉ rèn hai "diễn viên": một ông chuyên chê, một ông chuyên sửa, cả hai đều đọc chung một cuốn nhật ký messages.

## 5. Câu hỏi tự kiểm tra

1. Reflection prompt đóng vai gì và output ra gì?
2. Generation prompt xử lý critique như thế nào?
3. Vì sao cả hai prompt đều cần MessagesPlaceholder?
4. LCEL dựng hai chain này bằng cú pháp gì?
5. LLM mặc định trong transcript là gì, rủi ro khi dựa vào default là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Đóng vai viral Twitter influencer; output là critique và recommendation chi tiết (length, virality, style...).

**2.** Đóng vai techie assistant; nếu user (thực chất là critique được gắn nhãn human ở bài 101) đưa feedback thì trả về bản revised của các attempt trước.

**3.** Vì mỗi vòng lặp lịch sử dài thêm (tweet mới + critique mới); placeholder cho phép plug toàn bộ messages vào prompt mà không phải viết lại template — LLM luôn có full context.

**4.** `generation_prompt | llm` và `reflection_prompt | llm` — pipe của LangChain Expression Language.

**5.** GPT-3.5 turbo mặc định. Rủi ro: default đổi theo version; nên chỉ rõ model để tái lập được kết quả.

</details>

## 6. Bước tiếp theo

Bài 101 — *Defining our LangGraph Graph* — định nghĩa state, hai node, conditional edge và biên dịch graph.
