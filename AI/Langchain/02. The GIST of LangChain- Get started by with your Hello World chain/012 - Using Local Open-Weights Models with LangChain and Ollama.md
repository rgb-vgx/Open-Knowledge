---
title: 'Bài 012 — Model Local Với Ollama'
course: 'langchain'
lesson: 12
status: edited-verified
source: '012 - Using Local Open-Weights Models with LangChain and Ollama.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 012 — Model Local Với Ollama

> Biên soạn từ transcript "012 - Using Local Open-Weights Models with LangChain and Ollama.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Cài Ollama, pull model Gemma 3 về máy và thử bằng `ollama run`.
- Đổi đúng một dòng code để chuyển chain từ GPT-5 sang `ChatOllama` local.
- Giải thích vì sao interface code giữ nguyên khi đổi chat model.
- Đánh đổi được tốc độ/chi phí với chất lượng câu trả lời của open-weights models nhẹ.

## 1. Vì sao video này là minh chứng cho sức mạnh của LangChain

Giảng viên mở đầu bằng tuyên bố giữ nguyên cách ví von:

> Switch LLMs trong LangChain như switch socks — toàn bộ quá trình boils down to một dòng code, chỉ cần init đúng client.

Interface toàn bộ code giữ nguyên, chỉ thay chat model đang dùng. Ngoài self-host open-weights, transcript còn nhắc cloud providers như Groq: chỉ cần generate API key và tạo relevant client. Bài này demo phương án self-host trên máy mình.

## 2. Cài Ollama và pull Gemma 3

Mạch transcript:

1. Vào trang Ollama, download đúng OS (video demo Mac OS, Windows thì theo installation wizard, kéo vào application folder).
2. Mở terminal, gõ `ollama` để thấy CLI và available commands. Gist:
   - `ollama pull <model-full-name>` để pull model.
   - `ollama run <model>` để spin up instance nói chuyện qua CLI.
   - `ollama list` để xem downloaded models.
3. Vào model section trên web Ollama: ví dụ GPT-OSS có nhiều variants kèm size và số parameters, hỗ trợ function calling và agentic tasks, đủ cho cả khóa học — nhưng size massive, không fit máy giảng viên nên không download.
4. Chọn Gemma 3 by Google vì có lighter alternatives; demo chọn bản 270 million parameters vì lightest và fastest. Copy full name, chạy:

```bash
ollama list
ollama pull gemma3:270m
ollama list
ollama run gemma3:270m
```

Gõ `hello` trong CLI, nhận lại `hello how can I help you today` — chứng tỏ model local đã chạy.

## 3. Đổi một dòng code sang `ChatOllama`

```python
from langchain_ollama import ChatOllama

llm = ChatOllama(temperature=0, model="gemma3:270m")
chain = summary_prompt_template | llm
```

Giảng viên paste dòng này, nhắc đã có model trong máy. Import `ChatOllama` từ `langchain-ollama` ở đầu file (package đã cài). Chạy lại tới breakpoint: response về siêu nhanh vì running locally, nhưng khi examine response thì thấy có summary Elon Musk mà không có separate section interesting facts như yêu cầu.

> Trade-off: open-weights lite models thì faster và cheaper, nhưng quality of answer có thể lower hơn first-tier models.

## 4. Khuyến nghị cho phần còn lại của khóa học

Giữ nguyên lời giảng:

- Muốn dùng open-weights thay OpenAI/Google Gemini cho khóa học thì làm được.
- Highly recommend dùng GPT-OSS vì có deep reasoning, supports function calling, suited cho agentic workloads sẽ implement trong khóa học.

```
chain giữ nguyên ──> đổi mỗi dòng llm = ChatOllama(...) ──> chạy local, nhanh, rẻ, chất lượng thấp hơn
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `ChatOllama(temperature=0, model="gemma3:270m")` từ `langchain-ollama`, `invoke` nhận messages trả AI message | Import chat class từ module Ollama, đặt local model + `temperature=0` cho deterministic, `invoke` với list turns, nhận AI message kèm model name, timing, token counts | Vẫn đúng | [Ollama integration](https://docs.langchain.com/oss/python/integrations/chat/ollama) |
| Đổi model chỉ cần đổi client, interface code giữ nguyên | Docs agents liệt kê provider labels gồm Ollama bên cạnh OpenAI, Anthropic, Google với cùng builder `create_agent` | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| GPT-OSS hỗ trợ function calling, suited cho agentic workloads | Integration ghi noted abilities gồm function invocation, schema-shaped answers; gợi ý dùng function-capable model như gpt-oss variant | Vẫn đúng | [Ollama integration](https://docs.langchain.com/oss/python/integrations/chat/ollama) |

Code cập nhật (nếu có): giữ code gốc transcript. Tương đương version mới không đổi tên class:

```python
from langchain_ollama import ChatOllama

llm = ChatOllama(temperature=0, model="gemma3:270m")
```

Khác duy nhất: tên model exact phụ thuộc bản bạn đã `ollama pull` (ví dụ `gemma3:270m` trong video).

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Muốn chạy model local không tốn API | Cài Ollama, `pull` rồi `run` model, gọi qua `langchain-ollama` |
| Sợ đổi model phải viết lại chain | Chỉ đổi dòng khởi tạo chat model, `prompt \| llm` giữ nguyên |
| Model nhẹ chạy nhanh nhưng trả lời sơ sài | Chấp nhận trade-off faster/cheaper vs lower quality; cần agentic thì chọn GPT-OSS hỗ trợ function calling |
| Không biết model nào đủ cho khóa học | Ưu tiên model hỗ trợ function calling và reasoning như GPT-OSS |

**Một câu chốt:** Cùng một chain, thay đúng client `ChatOllama` là chạy local — nhanh và rẻ hơn nhưng phải chấp nhận chất lượng thấp hơn first-tier models.

## Câu hỏi tự kiểm tra

1. Ba lệnh Ollama nào được dùng trong video và mỗi lệnh làm gì?
2. Vì sao giảng viên không download GPT-OSS dù recommend nó?
3. Dòng code duy nhất phải đổi khi chuyển từ GPT-5 sang local là gì?
4. Kết quả Gemma 3 270m thiếu gì so với yêu cầu prompt?
5. Vì sao GPT-OSS được recommend cho phần agentic sắp tới?

<details><summary><b>Xem đáp án</b></summary>

**1.** `ollama pull <name>` để download model, `ollama list` để xem downloaded models, `ollama run <name>` để spin up CLI instance nói chuyện với model.

**2.** Vì size massive, không fit máy giảng viên; thay vào đó demo Gemma 3 bản 270m parameters lightest và fastest.

**3.** Thay `llm = ChatOpenAI(...)` thành `llm = ChatOllama(temperature=0, model="gemma3:270m")` kèm import từ `langchain_ollama` — phần còn lại của chain giữ nguyên.

**4.** Có summary nhưng thiếu separate section interesting facts như prompt yêu cầu — minh họa quality lower của lite open-weights models.

**5.** Vì có deep reasoning, supports function calling, suited cho agentic workloads; docs hiện nay cũng ghi Ollama hỗ trợ function invocation và gợi ý dùng gpt-oss variant cho tool calling.

</details>

## Bước tiếp theo

Bài 013 — *Integrating LangSmith for LangChain Application Tracing* — bật tracing để thấy RunnableSequence, prompt value và token usage.
