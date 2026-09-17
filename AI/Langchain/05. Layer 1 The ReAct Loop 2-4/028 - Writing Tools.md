---
title: 'Bài 028 — Viết tools bằng decorator @tool'
course: 'langchain'
lesson: 28
status: edited-verified
source: '028 - Writing Tools.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 028 — Viết tools bằng decorator @tool

> Nguồn: `028 - Writing Tools.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Dựng file `1_agent_loop_langchain_tool_calling.py` và import đúng primitives.
- Hiểu `init_chat_model` khởi tạo chat model chỉ bằng string.
- Viết 2 tools `get_product_price` và `apply_discount` bằng `@tool`.
- Nắm vì sao docstring và type hints chính là mô tả gửi cho LLM.
- Gắn tracing `@traceable` cho vòng lặp để xem trên LangSmith.

## 1. Tạo file và import primitives

1. Giảng viên tạo file mới `1_agent_loop_langchain_tool_calling.py`.
2. Imports mở đầu:
   - `load_dotenv` từ dotenv để load biến môi trường, rồi gọi load ngay.
   - `init_chat_model` từ LangChain — utility khởi tạo chat model chỉ bằng string, ví dụ `openai:gpt-5.2`, không cần import class model cụ thể.
   - Điều kiện duy nhất: phải cài provider package tương ứng, ví dụ muốn dùng OpenAI thì cài `langchain-openai`, muốn dùng Ollama thì cài `langchain-ollama` — cả hai đã cài ở Bài 027.
   - `tool` từ LangChain — decorator biến function thường thành custom tool.
   - `HumanMessage`, `SystemMessage`, `ToolMessage` — wrappers message thống nhất cho mọi model.
3. Nhắc lại ý nghĩa message:
   - `ToolMessage` chứa tool result (observation).
   - `SystemMessage` bọc system prompt gửi cho LLM.
   - `HumanMessage` bọc user input.
4. Lợi ích lớn: một single interface cho mọi model, sau này switch vendor không phải đổi code message.

## 2. Hằng số và model chạy local

1. Đặt `MAX_ITERATIONS = 10` để giới hạn số vòng agent chạy.
2. Giảng viên nói chọn 10 không có lý do đặc biệt, chỉ là heuristic — bất kỳ số nào lớn hơn 2 đều được, miễn là chặn vòng lặp vô hạn.
3. Đặt biến model là `qwen3:1.7b`, tương ứng model đã pull bằng Ollama ở bài setup.
4. Người học có thể dùng model khác, nhưng muốn theo đúng video thì dùng Qwen.

## 3. Tool 1 — `get_product_price`

1. Dùng decorator `@tool` lên function `get_product_price`.
2. Input: tên sản phẩm (`product: str`), output: `float` là giá.
3. Thêm `print` khi function chạy để có visibility lúc debug.
4. Định nghĩa dict giá mẫu: laptop, headphones, keyboard với số ngẫu nhiên.
5. Logic: tra dict theo tên sản phẩm, nếu không khớp (mismatch) thì trả về 0.
6. Giảng viên nhấn mạnh đây là function rất đơn giản, giá trị sư phạm nằm ở cách biến nó thành tool chứ không phải nghiệp vụ.

## 4. Tool 2 — `apply_discount`

1. Dùng decorator `@tool` lên function `apply_discount`.
2. Input: `price` cần giảm + `discount` tier là string (bronze, silver, gold), output: `float`.
3. Mở đầu bằng nhận xét: LLM không giỏi tính toán (math calculations) nên phải để tool làm phép tính.
4. Docstring ghi rõ: apply discount tier to a price and return final price, available tiers are bronze, silver, gold.
5. Thêm `print` visibility như tool 1.
6. Dict phần trăm: bronze 5%, silver 12%, gold 23% — use case hư cấu của e-commerce bot.
7. Công thức: `price * (1 - discount / 100)`, round 2 chữ số thập phân.

```
final = round(price * (1 - discount_pct / 100), 2)
```

## 5. Vì sao docstring và type hints quan trọng

1. Docstring (mô tả làm gì), tên function, arguments nhận gì, return type là gì — tất cả sẽ được gửi cho LLM khi dùng function calling.
2. `@tool` decorator thu thập toàn bộ meta information đó, format gọn gàng theo đúng yêu cầu của từng model provider.
3. Kết quả: một single interface để truyền mô tả tools cho model, không phải tự viết JSON schema cho từng vendor.
4. Giảng viên chạy thử file để chắc không lỗi trước khi viết agent loop.
5. Định nghĩa khung `run_agent(question)` nhận câu hỏi user (ví dụ giá laptop sau gold discount), hiện để trống implementation.
6. Boilerplate chạy file: `if __name__ == "__main__"`, print chào, gọi `run_agent("What is the price for a laptop after applying the gold discount?")` và lưu result.

## 6. Gắn LangSmith tracing thủ công

1. Vì sắp tới tự triển khai agent loop raw (không dùng LangChain lo), nên phải gắn tracing thủ công mới xem được trên LangSmith.
2. Import `traceable` từ langsmith, gắn decorator lên `run_agent` với tên `LangChain Agent Loop`.
3. Mọi code thêm vào trong function sau này sẽ nest dưới một scope trace duy nhất.
4. Chạy thử, sang LangSmith project `ReAct Under The Hood` thấy trace rỗng chỉ có question input — điều này là đúng vì loop chưa viết.
5. Lợi ích nesting: cộng dồn tokens consumed, runtime, cost cho toàn bộ operation.

> Câu chốt: `@tool` + docstring + type hints chính là cách LangChain biến function Python thành mô tả mà LLM hiểu được, khỏi phải viết JSON schema tay.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `init_chat_model` nhận string model, tự map provider (GPT o1/o3 → OpenAI, DeepSeek, Bedrock, Claude Anthropic) | Docs Models: `init_chat_model("provider:model")` + kwargs, cùng object dùng solo hoặc trong agent; profile cần langchain >= 1.1 | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| `@tool` biến function thành custom tool, thu docstring + type hints thành schema cho từng vendor | Docs Models: hàm gắn `@tool` từ `langchain.tools`, rồi `model.bind_tools([...])`, response có `tool_calls` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| `HumanMessage`, `SystemMessage`, `ToolMessage` là single interface cho mọi model | Docs Agents/Models duy trì message roles này; solo use phải tự append ToolMessage cho inference tiếp theo | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| Gắn `@traceable` tên `LangChain Agent Loop` để nest trace, cộng tokens/runtime/cost | Docs LangSmith Observability onboarding bằng account + key, dashboard setup/review; decorator vẫn là cách trace function thủ công | Vẫn đúng | https://docs.langchain.com/langsmith/observability |
| LLM không giỏi math nên để tool tính discount | Khẳng định sư phạm, không phải claim API nên không đối chiếu docs | Chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/models |

### Code cập nhật (nếu có)

Không đổi logic. Cách viết hiện nay:

```python
from langchain.tools import tool

@tool
def get_product_price(product: str) -> float:
    """Look up the price of a product in the catalog."""
    ...
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| `init_chat_model` | Một string là khởi tạo được chat model đúng vendor |
| `@tool` | Biến function Python thành tool LLM gọi được |
| Docstring + type hints | Chính là mô tả tools gửi cho LLM qua function calling |
| Message wrappers | `System/Human/ToolMessage` thống nhất mọi vendor |
| `@traceable` | Nest toàn bộ agent run dưới một trace LangSmith |

**Câu chốt: viết tool chuẩn ngay từ đầu thì các bài agent loop sau chỉ việc bind và gọi, không phải sửa lại mô tả.**

## Câu hỏi tự kiểm tra

1. Muốn dùng `init_chat_model("openai:...")` thì phải cài gì?
2. `@tool` lấy những thông tin nào từ function?
3. `ToolMessage` dùng để chứa gì?
4. `MAX_ITERATIONS = 10` có ý nghĩa gì?
5. Vì sao phải gắn `@traceable` thủ công lên `run_agent`?

<details><summary><b>Xem đáp án</b></summary>

1. Cài `langchain-openai` (tương tự Ollama thì `langchain-ollama`).
2. Tên function, docstring, arguments, return type — format theo yêu cầu từng provider.
3. Tool result (observation) trả về cho LLM ở vòng sau.
4. Heuristic chặn vòng lặp vô hạn, số nào lớn hơn 2 cũng được.
5. Vì tự triển khai loop raw, không có auto tracing của LangChain nên phải nest thủ công để xem tokens/runtime/cost.

</details>

## Bước tiếp theo

Sang Bài 029 — bind tools vào model bằng `bind_tools` và viết defensive system prompt chống hallucination giá.
