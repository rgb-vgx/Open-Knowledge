---
title: "Bài 126 - LLM thực sự dùng tools ra sao: tool calling"
course: "LangChain"
lesson: "126"
status: "edited-verified"
source: "126 - Theory How LLMs REALLY Use Tools Understanding Tool Calling.md"
verified_date: "2026-09-17"
langchain_version: "MCP spec 2026-07-28; LangChain agents docs, tính đến 2026-09-17"
categories: ["AI"]
tags: ["LLM", "tool-calling", "function-calling", "system-prompt", "MCP", "agents"]
doc_refs: ["https://modelcontextprotocol.io/docs/learn/architecture", "https://docs.langchain.com/oss/python/langchain/agents"]
---

# Bài 126 — LLM thực sự dùng tools ra sao: tool calling

> Bài học được biên soạn từ transcript "Theory How LLMs REALLY Use Tools Understanding Tool Calling".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được vì sao LLM bản chất chỉ là token generator, không tự hành động.
2. Giải thích cơ chế tool calling: system prompt đặc biệt, sinh lời gọi tool, app parse và thực thi.
3. Phân biệt phần của model với phần của application layer (ví dụ web search trong ChatGPT).
4. Nói được vì sao tool calling không đúng 100% nhưng vẫn đủ tốt cho agents.
5. Nêu được MCP đứng ở đâu trong bức tranh này: nơi viết và expose tools.

## 2. Kiến thức cốt lõi

### LLM chỉ sinh text, tools nằm ở application layer

Transcript nhắc lại điểm gốc:

- LLM là token generator: đoán token này nối tiếp token kia, output là text (multimodal thì thêm ảnh/format khác).
- LLM không tự search web, không deep research, không invoke Python function.
- Mọi "siêu năng lực" đó là external code do engineers viết, nằm trong application bọc quanh LLM (ví dụ app ChatGPT desktop/web bọc model).

### Tool calling hoạt động ra sao

Ví dụ câu hỏi "What is the weather right now?":

1. Thay vì bịa ra "25 độ", LLM được nhồi một system prompt rất tinh vi.
2. Nhờ đó nó sinh ra text gọi tool theo format chuẩn của vendor, dễ parse: tên hàm + arguments (ví dụ `get_weather(city=...)`).
3. Application (ChatGPT...) parse output, thấy tool call thì đi invoke đúng chức năng engineers đã viết (ví dụ web search với user query).
4. Sau khi tool chạy xong, app gọi LLM lần nữa với user query gốc + kết quả tool để ra câu trả lời cuối.

Mỗi vendor implement một kiểu, nhưng tất cả quy về một system prompt đặc biệt. Transcript nhắc prompt ReAct đã học trong khóa LangChain là một ví dụ.

### Bản chất thống kê

- LLM đoán token theo xác suất nên việc chọn đúng tool + đúng arguments không đạt 100%.
- Nhưng thực tế đúng phần lớn thời gian, đủ tốt cho agentic applications.

### MCP đứng ở đâu

MCP cho ta tập trung vào việc viết tools và expose chúng trong MCP servers. Tools đó dùng được cho mọi application hỗ trợ function calling — transcript nêu Cursor, Claude Desktop, và kể cả ChatGPT (đã announce hỗ trợ MCP).

## 3. Ví dụ và diễn giải

- Bật web search trong ChatGPT và hỏi giá cổ phiếu NVIDIA: app sinh invocation `web_search(query="NVIDIA stock price")`, chạy search, rồi gọi LLM lần hai với kết quả.
- Hỏi thời tiết: thay vì hallucinate con số, model sinh `get_weather` với arguments thành phố.
- Giữ đúng thuật ngữ Anh: tool calling, system prompt, parse, invoke, hallucinate.

## 4. Kiểm chứng với docs mới nhất

- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) ghi rõ MCP chỉ chuẩn hóa protocol trao đổi context, không quy định AI application dùng LLM hay quản lý context ra sao — khớp với phân tách model/application layer trong transcript. Kiểm chứng ngày 2026-09-17.
- [LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents) xác nhận Agent = Model + Harness, tools đưa vào lúc build để model chọn và harness thực thi — cùng tinh thần vòng lặp gọi tool trong transcript.
- Trạng thái: nội dung khái niệm **vẫn đúng**, không có gì lỗi thời.

> **Hộp cập nhật:** transcript nói ChatGPT "announced" hỗ trợ MCP. Theo docs intro của MCP, hiện ChatGPT đã nằm trong danh sách clients hỗ trợ. Giữ nguyên câu chữ gốc của giảng viên.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| LLM là gì | Token generator, chỉ sinh text |
| Tools là gì | External code ở application layer |
| Tool calling | System prompt đặc biệt khiến model sinh lời gọi hàm parse được |
| Vòng lặp | Sinh tool call → app thực thi → gọi LLM lần hai với kết quả |
| Độ tin cậy | Thống kê, không 100% nhưng đủ tốt |
| Vị trí MCP | Nơi viết và expose tools dùng chung |

**Một câu chốt:** Tool calling là hành vi "độ thêm" ở application layer, còn MCP là nơi chuẩn hóa việc viết và chia sẻ chính những tools đó.

## 6. Câu hỏi tự kiểm tra

1. Vì sao nói LLM "không có siêu năng lực"?
2. Tool calling quy về cái gì ở tầng prompt?
3. Application làm gì sau khi parse được tool call?
4. Vì sao tool calling không bao giờ đạt 100%?
5. MCP giải quyết khâu nào trong pipeline này?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì LLM chỉ đoán và sinh token/text tiếp theo. Mọi hành động ra ngoài (search, gọi hàm, thao tác hệ thống) đều là external code ở application layer, không phải khả năng nội tại của model.

**2.** Một system prompt rất tinh vi khiến model, thay vì hallucinate đáp án, sinh ra lời gọi tool theo format chuẩn dễ parse (tên hàm + arguments).

**3.** App invoke đúng chức năng engineers đã viết, rồi gọi LLM lần nữa với user query gốc cộng kết quả tool để ra đáp án cuối.

**4.** Vì LLM là statistical creature, đoán token theo xác suất nên đôi khi chọn sai tool hoặc sai arguments.

**5.** MCP là nơi ta viết tools và expose chúng trong MCP servers, để mọi application hỗ trợ function calling đều dùng lại được.

</details>

## 7. Bước tiếp theo

Bài 127 — *Theory MCP Architecture* — từ tool calling đi vào kiến trúc tổng thể và mục tiêu của MCP.

Nguồn: transcript gốc `126 - Theory How LLMs REALLY Use Tools Understanding Tool Calling.md`; [architecture](https://modelcontextprotocol.io/docs/learn/architecture); [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents).
