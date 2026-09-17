---
title: 'Bài 032 — JSON schema tay so với abstraction @tool'
course: 'langchain'
lesson: 32
status: edited-verified
source: '032 - Layer 2 Manual JSON Schemas vs LangChain Tool Abstraction.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/oss/python/integrations/chat/ollama'
- 'https://developers.openai.com/api/docs/guides/function-calling'
---

# Bài 032 — JSON schema tay so với abstraction @tool

> Nguồn: `032 - Layer 2 Manual JSON Schemas vs LangChain Tool Abstraction.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Dựng file `2_agent_loop_raw_function_calling.py` từ bản Layer 1, gỡ bỏ LangChain objects.
- Hiểu vì sao phải tự viết JSON schema khi không còn `@tool` decorator.
- So sánh schema của Ollama với Anthropic để thấy chi phí đổi vendor khi làm raw.
- Nắm cách Ollama Python SDK tự sinh schema từ Google-style docstring.
- Thấy rõ giá trị của LangChain tool abstraction: một interface sinh đúng schema cho từng vendor.

## 1. Tạo file Layer 2 từ bản Layer 1

1. Giảng viên tạo file `2_agent_loop_raw_function_calling.py`, ban đầu để trống.
2. Copy toàn bộ implementation từ video trước (bản LangChain) sang.
3. Mục tiêu: gỡ bỏ mọi LangChain objects — chat model, LangChain tools, LangChain messages.
4. Thay bằng import `ollama`, tức Ollama Python SDK.
5. SDK này đã có sẵn trong virtual environment vì khi cài `langchain-ollama` thì nó được kéo theo như dependency.
6. Hai function `get_product_price` và `apply_discount` không còn `@tool` decorator của LangChain.
7. Muốn vẫn trace được từng function như tool trên LangSmith, giảng viên gắn `@traceable` của LangSmith với run type là tool cho cả hai hàm.

## 2. Vấn đề: biến function Python thành tool LLM hiểu được

1. Hai hàm trên vẫn chỉ là Python functions, cần convert thành tools mà LLM digest được để dùng với function calling.
2. Khi dùng LangChain, `@tool` decorator lo việc này tự động.
3. Giờ làm raw nên phải tự làm, giảng viên mở docs Ollama để tra.
4. Trong docs Ollama, mục tool calling cho thấy khi gọi bằng cURL tới Ollama server phải truyền model, messages, và argument `tools` là một JSON scheme.
5. JSON scheme này mô tả tools đang chạy: tên tools, arguments nhận gì, return value là gì — phải cung cấp tường minh (explicitly).
6. Giảng viên nhận xét: Ollama không có định nghĩa formal rõ ràng về JSON scheme này, chỉ có một example trong docs, tìm trong source code cũng không thấy spec chuẩn nêu rõ phải include gì.
7. Thực tế có thể nhờ Cursor hay Claude Code nhìn example để sinh giúp, nhưng lẽ ra phải có một nơi định nghĩa rõ ràng — đây là điểm gây khó cho developers.

## 3. Soi example JSON schema của Ollama

1. Theo example trong docs, mỗi tool có `type` là function.
2. Bên trong mô tả function: name, description, parameters.
3. Ví dụ parameters có type object, bên trong properties mô tả từng argument, ví dụ `city` type string.
4. Giảng viên nhấn mạnh: điểm cần nhớ là ngay cả đọc official documentation cũng không thấy rõ ràng, phải tự suy từ example.

## 4. Ollama Python SDK có thể tự sinh schema — nhưng kèm điều kiện

1. Chuyển sang tab Python của docs Ollama: example dùng `ollama.chat` object nhận model, messages, và tools.
2. Điểm thú vị: Ollama cụ thể (specifically) có thể convert Python functions thành tools dùng được luôn, chỉ cần truyền functions vào.
3. Nhưng điều kiện là Python functions phải có docstrings theo Google style docstrings — điều này không ghi rõ trong docs.
4. Giảng viên chứng minh bằng cách mở open-source package Ollama, tìm tới implementation của `chat`, search `tools`.
5. Trong source code thấy `tools` có thể là JSON scheme dạng dictionary (như đã thấy ở trên), hoặc Ollama tool object (tương tự LangChain tool nhưng là variation của Ollama), hoặc Python function.
6. Source code ghi rõ Python function cần follow Google style docstring mới convert được thành Ollama tool — thông tin này không rõ từ documentation.

## 5. So sánh với Anthropic để thấy chi phí đổi vendor

1. Giảng viên nhắc: mọi thứ vừa nói chỉ đúng cho Ollama.
2. Mở Anthropic documentation về tool calls: ở đó tools cũng định nghĩa dạng JSON scheme nhưng scheme hơi khác (a bit different).
3. Dĩ nhiên có thể nhờ Claude Code hay Cursor đọc example rồi viết giúp, nhưng nếu tự switch giữa các models thì development cost rất cao, tốn thời gian chỉ để làm integrations.
4. Trong khi đó chỉ cần dùng LangChain interface là có out of the box.

## 6. Viết JSON schema tay cho Ollama trong code

1. Quay lại code, giảng viên nhắc: nếu dùng LangChain thì chỉ cần `@tool` decorator là tự sinh các scheme kiểu này.
2. Giờ làm raw nên tạo list `tools_for_llm`, phần tử đầu là dictionary JSON scheme.
3. Theo docs, `type` là function, sau đó mô tả function: name `get_product_price`, description "Look up a price of a product in the catalog" (tương tự description của function), parameters type object, properties có `product` là keyword argument type string kèm description ví dụ laptop, headphones, keyboard, và `product` là required.
4. Giảng viên thú nhận JSON scheme này đã chuẩn bị trước giờ dạy, derive từ docs — cũng là thứ LangChain giải quyết giúp, không cần tự tạo.
5. Các scheme này LangChain sẽ autogenerate từ descriptions và typings đã viết trong functions.
6. Thêm function thứ hai tương tự; giảng viên khuyên không cần gõ tay từng dòng, nên copy từ GitHub branch.
7. Tóm tắt cuối video:
   - Ollama vẫn có thể auto-generate các schema này nếu truyền functions trực tiếp vào tools.
   - Nhưng cách đó đòi hỏi viết docstrings theo Google docstring format (description, args, returns).
   - Giảng viên cố tình không dùng option đó trong tutorial vì muốn cho thấy `@tool` của LangChain sinh ra các scheme này theo đúng từng vendor — Anthropic một kiểu, Ollama một kiểu, mỗi nơi keywords và formats khác nhau.
   - Đó chính là benefit của LangChain tool abstraction.

> Câu chốt: `@tool` không phải cú pháp cho đẹp — nó là máy dịch một mô tả Python thành đúng dialect JSON schema của từng vendor.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Ollama tool calling cần truyền `tools` là JSON schema mô tả name, description, parameters | Docs Ollama integration: variant capable mới dùng được, chuẩn OpenAI-compatible, `bind_tools` rồi invoke, response có `tool_calls` với id, name, args | Vẫn đúng | https://docs.langchain.com/oss/python/integrations/chat/ollama |
| `@tool` autogenerate JSON schema từ docstring + typings theo đúng từng vendor | Docs Models: hàm gắn `@tool` từ `langchain.tools`, `bind_tools` sinh name/args structure lúc runtime từ type hints và description | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Schema Anthropic khác Ollama, switch vendor khi làm raw rất tốn công | OpenAI docs hiện tại: definitions nằm trong `tools` dùng JSON schema cho `parameters` với `name`, `description`, `strict`; mỗi vendor có thêm flags riêng như `tool_choice`, `parallel_tool_calls` | Vẫn đúng | https://developers.openai.com/api/docs/guides/function-calling |
| Ollama SDK convert Python function cần Google-style docstring, docs không ghi rõ | Thuộc Ollama SDK/source, docs LangChain không mô tả chi tiết này | Chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/chat/ollama |

### Code cập nhật (nếu có)

Không đổi logic. Dạng schema tay trong video vẫn hợp lệ theo chuẩn function calling:

```python
tools_for_llm = [
    {
        "type": "function",
        "function": {
            "name": "get_product_price",
            "description": "Look up a price of a product in the catalog.",
            "parameters": {
                "type": "object",
                "properties": {
                    "product": {
                        "type": "string",
                        "description": "The product, for example laptop, headphones, keyboard.",
                    }
                },
                "required": ["product"],
            },
        },
    },
]
```

Cách hiện nay với LangChain (khuyên dùng):

```python
from langchain.tools import tool

@tool
def get_product_price(product: str) -> float:
    """Look up a price of a product in the catalog."""
    ...
llm_with_tools = llm.bind_tools([get_product_price])
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Raw tools | Tự viết JSON schema: type, name, description, parameters |
| Ollama SDK | Nhận dict schema, Ollama tool, hoặc Python function (cần Google docstring) |
| Vendor khác schema khác | Ollama một kiểu, Anthropic một kiểu |
| `@tool` | Một decorator sinh đúng schema cho từng vendor |
| Chi phí raw | Đổi vendor là viết lại integration |

**Câu chốt: làm raw một lần để thấy vì sao production nên để LangChain lo phần dịch schema.**

## Câu hỏi tự kiểm tra

1. File Layer 2 tên gì, xuất phát từ đâu?
2. Khi gỡ `@tool` thì phải tự làm việc gì?
3. JSON schema cho Ollama gồm những trường nào?
4. Muốn truyền function trực tiếp cho Ollama SDK thì docstring phải theo chuẩn nào?
5. Benefit lớn nhất của `@tool` abstraction là gì?

<details><summary><b>Xem đáp án</b></summary>

1. `2_agent_loop_raw_function_calling.py`, copy từ bản Layer 1.
2. Tự viết JSON schema mô tả tools cho LLM.
3. type function, name, description, parameters (type object, properties, required).
4. Google style docstring (description, args, returns).
5. Một interface sinh đúng JSON schema cho từng vendor, đổi model không phải viết lại.

</details>

## Bước tiếp theo

Sang Bài 033 — viết lại agent loop bằng raw Ollama SDK: dict messages, `tool_calls` dạng object, gọi function trực tiếp, append observation role tool.
