---
title: 'Bài 106 — Actor Agent V2'
course: langchain
lesson: 106
status: edited-verified
source: '106 - Actor Agent V2.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung GPT-4 turbo, JsonOutputToolsParser, PydanticToolsParser; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.langchain.com/oss/python/langchain/prompts
- https://docs.langchain.com/oss/python/langchain/models
---

# Bài 106 — Actor Agent V2

> Nguồn: `106 - Actor Agent V2.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Viết `actor_prompt_template` tái dùng cho cả responder và revisor (system prompt 3 phần + MessagesPlaceholder).
2. Định nghĩa schema Pydantic `Reflection` và `AnswerQuestion` để ép structured output.
3. Dựng `first_responder_chain` bằng function calling (`bind tools` + `tool_choice="AnswerQuestion"`).
4. Chạy thử với đề "AI-powered SOC" và đọc kết quả answer/critique/search queries.

## 2. Nội dung chính theo mạch transcript

### 2.1. Imports

- `datetime` để plug thời gian hiện tại; `load_dotenv`; `JsonOutputToolsParser` + `PydanticToolsParser` (parse function-call thành dict hoặc object Pydantic); `HumanMessage`; `ChatPromptTemplate` + `MessagesPlaceholder`; `ChatOpenAI` (GPT-4 turbo).
- State graph dùng `MessageGraph()` — list messages đơn giản (nhắc lại section 14).

### 2.2. Actor prompt template (tái dùng được)

- System prompt: "You are an expert researcher. Current time is {time}..." + 3 phần: `{first_instruction}` (lần đầu plug "write 250-word essay"), "Reflect and critique your answer. Be severe to maximize improvement.", "Recommend search queries to research information and improve your answer."
- Kèm MessagesPlaceholder lịch sử — vì template này revisor sẽ tái dùng (đổi first_instruction thành revision instructions ở bài 107).
- `.partial(time=lambda: datetime.now().isoformat())` để tự điền giờ khi invoke.

### 2.3. Schema structured output (schemas.py)

- `Reflection(BaseModel)`: `missing` (thiếu gì), `superfluous` (thừa gì — giảng viên phải tra từ điển: unnecessary, không thêm giá trị). Khi bind function calling, LLM bị ground phải điền gọn hai field này.
- `AnswerQuestion(BaseModel)`: `answer` (bài 250 từ), `reflection: Reflection` ("Your reflection on the initial answer." — prompt qua description), `search_queries: list[str]` (1–3 query cải thiện theo critique).
- Mẹo transcript nhấn mạnh: description của field cũng là prompt — cách ground LLM ít người để ý.

### 2.4. first_responder chain và chạy thử

1. `ChatOpenAI(GPT-4 turbo)`, hai parser: JSON dict và Pydantic `AnswerQuestion`.
2. `actor_prompt_template.partial(first_instruction="Provide a detailed 250 word answer.") | llm.bind_tools(tools=[AnswerQuestion], tool_choice="AnswerQuestion") | parser`.
3. Test `if __name__ == "__main__"` với đề AI-powered SOC: lần đầu lỗi thiếu `search_queries` (LLM không trả đủ field) — transcript không fix prompt mà rerun cho qua (proof of concept), gợi ý có thể ép "must provide search queries" hoặc tách prompt riêng.
4. Kết quả: answer về AI-powered SOC (parametric knowledge, đúng nhưng thiếu số vốn từng startup, hơi redundant), reflection soi trúng hai điểm đó, 4 search queries (AI-powered SOC startup funding, Darktrace funding, Vectra capital, Arctic...). Check LangSmith thấy một tool call `AnswerQuestion`.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Function calling + `JsonOutputToolsParser`/`PydanticToolsParser` ép output | Nay LangChain gom dưới API structured output (`with_structured_output`); parser cũ có thể đổi tên theo version. | https://docs.langchain.com/oss/python/langchain/structured-output |
| `ChatPromptTemplate` + placeholder + `.partial(time=...)` | API prompt template vẫn đúng. | https://docs.langchain.com/oss/python/langchain/prompts |
| `ChatOpenAI` GPT-4 turbo | Nên truyền explicit model; default có thể đổi. | https://docs.langchain.com/oss/python/langchain/models |

> Hộp cập nhật: transcript dùng tên parser đời cũ; khi chạy LangChain mới hãy đọc docs structured output hiện tại và thay `bind_tools/tool_choice` hoặc `with_structured_output` theo đúng version đã ghim. Lỗi thiếu `search_queries` là hành vi thật của LLM — đừng coi rerun cho qua là best practice production.

## 4. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| actor_prompt_template | 1 template cho cả responder + revisor |
| Reflection schema | missing + superfluous |
| AnswerQuestion schema | answer + reflection + search_queries |
| tool_choice ép buộc | LLM luôn trả đúng schema |
| Lần chạy đầu | Có thể thiếu field — rerun demo, production nên ép prompt |

**Một câu chốt:** Muốn LLM vừa viết vừa tự chê vừa gợi ý đi tìm bằng chứng, đừng hỏi bằng text tự do — hãy khóa output bằng schema và ép nó gọi đúng tool.

## 5. Câu hỏi tự kiểm tra

1. Vì sao một prompt template dùng được cho cả responder và revisor?
2. Hai field của `Reflection` là gì?
3. Ba field của `AnswerQuestion` là gì?
4. `tool_choice="AnswerQuestion"` có tác dụng gì?
5. Lỗi thiếu `search_queries` nói lên điều gì và transcript xử lý ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì phần thay đổi duy nhất là `{first_instruction}`: responder plug "write 250-word essay", revisor plug revision instructions (bài 107); phần critique + search queries và placeholder lịch sử giữ nguyên.

**2.** `missing` (thiếu thông tin quan trọng mà LLM không sinh ra) và `superfluous` (thông tin thừa, không thêm giá trị).

**3.** `answer` (bản nháp 250 từ), `reflection` (object critique), `search_queries` (1–3 query để cải thiện theo critique).

**4.** Ép LLM luôn gọi tool AnswerQuestion, tức ground response về đúng object đã định nghĩa thay vì text tự do.

**5.** LLM không phải lúc nào cũng trả đủ field dù đã ép schema; transcript thừa nhận và rerun cho qua vì là proof of concept, đồng thời gợi ý fix bằng prompt mạnh hơn hoặc tách prompt riêng.

</details>

## 6. Bước tiếp theo

Bài 107 — *Revisor Agent* — thêm revision instructions và class `ReviseAnswer` có citations.
