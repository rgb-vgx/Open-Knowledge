---
title: 'Bài 029 — Bind tools và defensive prompting'
course: 'langchain'
lesson: 29
status: edited-verified
source: '029 - Tool Binding and Defensive Prompting.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
---

# Bài 029 — Bind tools và defensive prompting

> Nguồn: `029 - Tool Binding and Defensive Prompting.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Hiểu `run_agent` là khung ReAct loop sẽ cài chi tiết ở Bài 030.
- Biết cách gom tools vào list và dict `tool.name -> tool` để tra cứu khi chạy.
- Khởi tạo LLM bằng `init_chat_model` và bind tools bằng `bind_tools`.
- Viết system prompt defensive chống hallucination giá khi dùng open-weights model.
- Nắm thứ tự messages gửi cho LLM: system trước, human sau.

## 1. Khung hàm `run_agent` và danh sách tools

1. Giảng viên bắt đầu triển khai `run_agent(question)` — chính là agent ReAct loop đã giải thích ở Bài 026.
2. Việc đầu tiên: gom toàn bộ tools vào một list.
3. Tiếp theo: dựng dict mà mỗi phần tử là cặp key-value, key là tool name, value là tool object (function).
4. Cách dựng: lặp qua tools, key truy cập qua thuộc tính name của tool, value là tool đó.
5. Lý do cần dict: kết quả LLM trả về chỉ là tool name dạng string, dict giúp lấy ngay Python object để execute.
6. Giảng viên nói khi dùng tới sẽ thấy rõ hơn.

## 2. Khởi tạo LLM bằng `init_chat_model`

1. Khởi tạo LLM bằng `init_chat_model`.
2. Truyền provider là ollama, model là Qwen3 1.7B parameters — đúng model đã pull ở Bài 027.
3. Nếu muốn dùng OpenAI thì chỉ cần đổi string thành OpenAI + tên model, không cần import object chat model cụ thể.
4. Đây chính là sự tiện lợi của hàm này: không cần import class riêng cho từng vendor.

## 3. Bind tools vào model

1. Lấy model vừa khởi tạo và cho model biết đang có những tools nào bằng `bind_tools`.
2. Hàm nhận list tools và bind vào model.
3. Từ đây, mỗi request gửi tới LLM đều kèm theo tool descriptions.
4. Điều kiện: chỉ hoạt động với LLM hỗ trợ function calling.
5. Nếu LLM support thì answer có thể là một tool call — tức chỉ định tool nào cần invoke.
6. `bind_tools` hoạt động với mọi LangChain chat model hỗ trợ function calling.
7. Ví dụ: muốn dùng OpenAI hay Anthropic — mà tất cả models của họ đều support function calling theo lời giảng viên — thì chỉ cần đổi string, không đổi code.
8. Giảng viên gọi đây là layer of abstraction rất hữu ích, rồi thêm một dòng print và chạy thử để thấy question được in ra.

## 4. System message và defensive prompting

1. Giảng viên gọi phần tiếp theo là brain của agent: chùm prompts gửi tới LLM để tận dụng reasoning, quyết định trả answer hay execute tool.
2. Định nghĩa list messages gửi cho LLM, phần tử đầu là system message (system prompt).
3. Ai muốn hiểu sâu các loại message thì xem lại glossary section.
4. Nội dung gốc: "You are a helpful shopping assistant. You have access to a product catalog tool and a discount tool."
5. Sau đó thêm defensive prompting — chùm strict rules:
   - Rule 1: never guess or assume any product price — ép LLM luôn chọn tool lấy giá.
   - Rule 2: bắt buộc gọi `get_product_price` để lấy real price.
   - Rule 3: chỉ gọi `apply_discount` sau khi đã nhận price từ `get_product_price`, phải truyền đúng price trả về, không bịa số.
6. Lý do thêm rule 3: đang dùng open-weights model Qwen3, reasoning yếu hơn top-tier models, đôi khi hallucinate giá truyền vào discount thay vì dùng số grounded thật.
7. Giảng viên nói đã thêm rule này sau vài iterations thấy lỗi xảy ra, và gợi ý bài tập: bỏ strict rules đi rồi xem chuyện gì xảy ra.
8. Rule 4: never calculate discounts yourself using math, luôn dùng `apply_discount` tool — giảm nguy cơ hallucinate giá mới.
9. Rule 5: nếu user không chỉ discount tier thì hỏi lại tier, không tự assume.
10. Đây là toàn bộ system message: phần general prompt cộng thêm instructions cho agent.

## 5. Thêm user input và chạy thử

1. Phần tử thứ hai của list messages là human message với content là question truyền vào hàm.
2. Trong use case này: "what is the price after applying the gold discount".
3. Save và chạy thử, mọi thứ chạy không lỗi.
4. Bài này dừng ở mức dựng xong messages, Bài 030 sẽ cài vòng lặp thought — action — observation.

> Câu chốt: với model nhỏ chạy local, defensive prompting không phải tối ưu thừa mà là cách bù đắp reasoning yếu để agent không bịa giá.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `init_chat_model("ollama:...")` đổi sang `"openai:..."` là đổi vendor, không đổi code | Docs Models xác nhận identifier `provider:model` + kwargs, cùng object dùng solo hoặc trong agent | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| `bind_tools(list_tools)` gửi tool descriptions mỗi request, LLM support function calling thì trả tool call | Docs Models: `model.bind_tools([...])` với optional choice/parallel flags, output mang requested calls | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Dựng dict `tool.name -> tool` để từ tên string lấy Python object ra invoke | Pattern chuẩn solo use: tự execute function rồi append ToolMessage; embedded use thì tự động | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| System + Human messages là 2 phần tử đầu gửi cho LLM | Docs duy trì roles system/human/ai/tool, solo use phải tự quản lý history | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Mọi model OpenAI/Anthropic đều support function calling | Ngày nay hầu hết SOTA models support tool calling nhưng vẫn phải check variant cụ thể, ví dụ Ollama chỉ variant gắn cờ capable | Đã đổi | https://docs.langchain.com/oss/python/integrations/chat/ollama |

### Code cập nhật (nếu có)

Không đổi logic. Cách viết hiện nay:

```python
from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, HumanMessage

llm = init_chat_model("ollama:qwen3:1.7b")
llm_with_tools = llm.bind_tools(tools)

messages = [
    SystemMessage(content="You are a helpful shopping assistant..."),
    HumanMessage(content=question),
]
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Tools list + dict | Từ tên string tra ra Python object để chạy |
| `init_chat_model` | Một string đổi được vendor |
| `bind_tools` | Đính kèm mô tả tools vào mọi request |
| Defensive prompting | Strict rules chống bịa giá, bịa discount, tự tính toán |
| Messages | System trước, human sau, history nối tiếp ở Bài 030 |

**Câu chốt: bind tools cho LLM biết có gì để gọi, defensive prompt dặn LLM không được bịa — hai việc này phải làm trước khi viết vòng lặp.**

## Câu hỏi tự kiểm tra

1. Vì sao cần dict `tool.name -> tool`?
2. `bind_tools` làm gì mỗi khi gọi LLM?
3. Điều kiện để `bind_tools` có tác dụng là gì?
4. Kể 3 strict rules trong system prompt.
5. Vì sao giảng viên phải thêm rule "truyền đúng price trả về"?

<details><summary><b>Xem đáp án</b></summary>

1. Vì LLM chỉ trả tên tool dạng string, cần dict để lấy Python object ra execute.
2. Gửi kèm tool descriptions trong mọi request tới LLM.
3. LLM phải hỗ trợ function calling.
4. Không đoán giá; bắt buộc gọi `get_product_price`; chỉ gọi `apply_discount` sau khi có giá thật; không tự tính discount; thiếu tier thì hỏi lại (kể 3 trong 5).
5. Vì Qwen3 reasoning yếu, hay hallucinate giá truyền vào discount thay vì dùng observation thật.

</details>

## Bước tiếp theo

Sang Bài 030 — cài vòng lặp ReAct hoàn chỉnh: thought, extract `tool_calls`, invoke tool, append observation, dừng khi hết tool call.
