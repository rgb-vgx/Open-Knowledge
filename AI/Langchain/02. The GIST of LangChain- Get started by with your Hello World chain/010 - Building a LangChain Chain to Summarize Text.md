---
title: 'Bài 010 — Chain Tóm Tắt Văn Bản'
course: 'langchain'
lesson: 10
status: edited-verified
source: '010 - Building a LangChain Chain to Summarize Text.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/tools'
- 'https://docs.langchain.com/oss/python/integrations/chat/openai'
---

# Bài 010 — Chain Tóm Tắt Văn Bản

> Biên soạn từ transcript "010 - Building a LangChain Chain to Summarize Text.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Dựng biến `information` và template tóm tắt với placeholder `{information}`.
- Khởi tạo `PromptTemplate` với `template` và `input_variables` khớp placeholder.
- Giải thích vì sao dùng prompt template thay vì f-string thuần.
- Khởi tạo `ChatOpenAI` với `temperature=0`, `model="gpt-5"` và nối chain bằng LCEL `prompt | llm`, chạy bằng `invoke`.

## 1. Biến `information` — dữ liệu đầu vào

Mạch transcript:

```python
information = "..."  # copy đoạn đầu Wikipedia về Elon Musk
```

Giảng viên lên Google, search Elon Musk, copy đoạn đầu Wikipedia, paste vào biến `information`. Đây là text sẽ được propagate tới LLM. Giữ nguyên cách làm thủ công này — không thêm nguồn dữ liệu khác.

## 2. Template tóm tắt với placeholder

```python
template = """given the information {information} about a person I want you to create a short summary into interesting facts about them."""
```

Placeholder `{information}` trong curly brackets sẽ được substitute bằng biến `information` ở runtime. Giảng viên nhấn mạnh: nhìn vào string là đoán được chỗ này không đứng yên mà sẽ fill in runtime.

Khởi tạo object:

```python
from langchain.prompts import PromptTemplate

summary_prompt_template = PromptTemplate(
    template=template,
    input_variables=["information"],
)
```

`input_variables` là list chứa keys sẽ fill vào runtime, phải match placeholders trong template. Rất giống F-string — và giảng viên đặt ngay câu hỏi: vì sao không dùng f-string cho nhanh?

## 3. Vì sao không dùng f-string

| Lý do | Diễn giải giữ nguyên lời giảng |
|---|---|
| Enforce variables | Bắt buộc supply đúng variables expect; quên input hay misspell thì nhận clean error thay vì gửi broken prompt |
| Reusability và clarity | Prompts thành reusable, dùng lại trong another chain |
| First-class citizen | Được logged, được traced (sẽ demo rất sớm) |
| Debugging dễ hơn | Cả đời debug nhẹ nhàng hơn |
| Safer against prompt injection | Enforce strict formatting và structure, mạnh khi dùng output parsers |

> Kết luận của giảng viên: f-string khuyến khích jamming text cho nhanh thì fine, nhưng muốn code reliable thì dùng prompt templates.

Giảng viên thừa nhận đang nói nhiều buzzwords (output parsers, prompt injection) — hẹn cuối khóa sẽ hiểu hết.

## 4. Tạo chat model `ChatOpenAI`

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(temperature=0, model="gpt-5")
```

Diễn giải từng phần giữ nguyên transcript:

- Đây là cách tương tác với OpenAI model GPT-5, under the hood dùng OpenAI SDK với API key.
- API key nằm trong environment variable `OPENAI_API_KEY` đã load ở Bài 008; LangChain tự search biến này làm credentials. Giảng viên giao exercise: tự check source code `ChatOpenAI` xem đoạn này.
- `temperature=0` điều khiển random/creative vs strict/deterministic:

| Giá trị | Hiệu ứng | Dùng tốt cho |
|---|---|---|
| 0 – 0.3 | deterministic, factual, repeatable | summarization, code, instructions |
| 0.8 – 1 | rất creative | poetry, fiction, out-of-the-box ideas |

Muốn hiểu sâu temperature thì xem theoretical section.

## 5. Nối chain bằng LCEL — toán tử pipe

```python
chain = summary_prompt_template | llm
response = chain.invoke({"information": information})
print(response.content)
```

Giảng viên gọi đây là LangChain Expression Language (LCEL):

```
input dict {"information": ...} ──> PromptTemplate.invoke ──> PromptValue (fancy string) ──> LLM.invoke ──> AIMessage
```

- Đọc từ left to right: format input bằng prompt template trước, rồi pass resulting prompt string vào LLM.
- Pipe operator tạo new runnable chain — runnable nghĩa là invoke được bằng `invoke` với input variables matching prompt template.
- Khi chạy `chain.invoke`, thực chất là gọi `invoke` của `PromptTemplate` với key `information`, tạo prompt value (fancy word của string), rồi pipe sang `LLM.invoke` với prompt value đó. Cách gọi clever này là lý do có tên LangChain.

Giảng viên tự nhận LCEL là hardest thing to comprehend trong LangChain, kể cả implementing agents còn dễ hơn hiểu piping operator. Nếu chưa hiểu ngay là totally okay — sẽ dive deep implementation và nhiều examples. Tóm lại chỉ cần nhớ: lấy biến `information`, plug vào string template, string đó gửi tới LLM.

Khi run: GPT-5 hơi slow nhưng capable nên phải fast forward; cuối cùng print `response.content` ra short summary + hai interesting facts về Elon Musk. Bài sau sẽ debugging và tracing toàn bộ chỗ này với LangSmith.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `ChatOpenAI(temperature=0, model="gpt-5")` từ `langchain_openai`, auth qua `OPENAI_API_KEY` | Import `from langchain_openai import ChatOpenAI`, model như `gpt-5-nano`, `temperature=0`, auth qua `OPENAI_API_KEY` | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |
| `PromptTemplate(template, input_variables)` rồi `prompt \| llm` tạo runnable, chạy `invoke({"information": ...})` | Pattern `create_agent(model, tools, prompt)` assembly từ model + tools + prompt; chain pipe vẫn là cách compose, agent invoke bằng `{"messages": [...]}` | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Docstring + type hints của Python function quyết định việc LLM chọn tool (function calling) | `@tool` từ `langchain.tools`, docstring là model-facing explanation, type annotations mandatory | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |

Code cập nhật (nếu có): giữ code gốc transcript. Tương đương trên version mới:

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

summary_prompt_template = PromptTemplate(
    template="given the information {information} about a person I want you to create a short summary into interesting facts about them.",
    input_variables=["information"],
)
llm = ChatOpenAI(temperature=0, model="gpt-5")
chain = summary_prompt_template | llm
response = chain.invoke({"information": information})
print(response.content)
```

Đổi duy nhất: import `ChatOpenAI` từ package riêng `langchain_openai` (đã làm ở Bài 008); logic pipe và `invoke` giữ nguyên.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Input động theo từng person | Template + `{information}` + `input_variables` khớp placeholder |
| Sợ gửi broken prompt vì typo | Prompt template enforce variables, báo clean error |
| Mỗi vendor gọi LLM một kiểu | `ChatOpenAI(temperature, model)` — interface chung, auth qua `OPENAI_API_KEY` |
| Muốn nối prompt → LLM thành một khối invoke được | LCEL `prompt \| llm` tạo runnable, `invoke` với dict input |
| Chưa hiểu pipe operator | Nhớ mạch duy nhất: fill `information` vào string rồi gửi LLM, đọc left to right |

**Một câu chốt:** Chain Hello World chỉ làm một việc — fill biến `information` vào template rồi pipe sang LLM — nhưng đã chứa đủ pattern LCEL mang theo cả khóa học.

## Câu hỏi tự kiểm tra

1. `input_variables` phải khớp với cái gì trong template?
2. Kể 3 lợi ích của prompt template so với f-string.
3. `temperature=0` phù hợp cho task nào và vì sao?
4. `summary_prompt_template | llm` tạo ra object loại gì và chạy bằng method nào?
5. `response.content` chứa gì?

<details><summary><b>Xem đáp án</b></summary>

**1.** Phải khớp placeholders trong curly brackets của template — ở đây là `information`; sai hoặc thiếu sẽ báo clean error thay vì gửi broken prompt.

**2.** Enforce đúng variables (typo thì lỗi rõ), reusability trong chain khác, và first-class citizen được logged/traced nên debug dễ hơn, kèm safer against prompt injection khi dùng output parsers.

**3.** Phù hợp summarization, code, instructions vì low values 0–0.3 cho response deterministic, factual, repeatable; ngược lại >0.8 dành cho poetry, fiction cần creativity.

**4.** Tạo runnable chain (read left to right: output prompt template thành input LLM), chạy bằng `invoke({"information": information})` — thực chất gọi `invoke` từng component nối tiếp.

**5.** Final string LLM trả về — ở đây là short summary kèm interesting facts về Elon Musk, nằm trong field `content` của AI message.

</details>

## Bước tiếp theo

Bài 011 — *Debugging and Tracing Our LangChain Chain* — soi object `AIMessage`, tokens và metadata trong debugger.
