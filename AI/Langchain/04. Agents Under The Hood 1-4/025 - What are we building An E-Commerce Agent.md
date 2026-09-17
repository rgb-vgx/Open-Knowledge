---
title: 'Bài 025 — Agent e-commerce mẫu của cả section'
course: 'langchain'
lesson: 25
status: edited-verified
source: '025 - What are we building An E-Commerce Agent.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/models'
---

# Bài 025 — Agent e-commerce mẫu của cả section

> Nguồn: `025 - What are we building An E-Commerce Agent.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Nắm bài toán xuyên suốt section: agent tính giá sau discount.
- Phân biệt 2 tools: tra giá sản phẩm và áp discount theo tier.
- Hiểu các tier bronze, silver, gold tương ứng phần trăm giảm khác nhau.
- Hình dung cách triển khai gọn bằng `create_agent` trước khi bóc tách.
- Chuẩn bị sơ đồ agent loop sẽ cài đặt ở các video sau.

## 1. Bối cảnh cửa hàng e-commerce giả định

1. Giả sử có một cửa hàng e-commerce bán hardware: headphones, keyboards, laptops.
2. Cửa hàng đang chạy promotion và discounts theo tier.
3. Có 3 tier ví dụ: bronze discount, silver discount, gold discount.
4. Mỗi tier tương ứng một discount percentage khác nhau.
5. Đây là use case hư cấu (imaginary) để học, số liệu do giảng viên tự đặt.

## 2. Yêu cầu đặt ra cho agent

1. Agent nhận query từ user, ví dụ giá món hàng sau khi giảm giá.
2. Agent phải trả về price cho item kèm discount đã áp.
3. Ví dụ cụ thể xuyên suốt section: giá laptop sau khi áp gold discount.
4. Đây là agent rất đơn giản (very simple agent) nhưng đủ để minh họa vòng lặp Thought — Action — Observation.

## 3. Thiết kế 2 tools

1. Tool 1 — lấy giá gốc của item:
   - Input: tên sản phẩm, ví dụ laptop.
   - Output: giá, ví dụ giá laptop.
   - Gọi là `get_product_price` trong code các bài sau.
2. Tool 2 — lấy và áp discount theo tier:
   - Input: giá gốc + tier, ví dụ bronze tương ứng giảm 15% trong lời giới thiệu ban đầu.
   - Output: giá cuối sau giảm.
   - Gọi là `apply_discount` trong code các bài sau.
3. Lưu ý: con số phần trăm cụ thể được chốt lại trong code (bronze 5%, silver 12%, gold 23% ở Bài 028), transcript bài này chỉ nêu ý tưởng bronze 15% như ví dụ.

## 4. Nếu dùng LangChain abstraction thì trông ra sao

1. Giảng viên minh họa: nếu dùng `create_agent`, chỉ cần truyền LLM và danh sách tools `[get_price, get_discount]`.
2. Code dạng:

```python
agent = create_agent(llm, tools=[get_product_price, apply_discount])
```

3. Đó chính là Layer 0 đã học: nhanh, gọn, nhưng che giấu toàn bộ agent loop.
4. Section này sẽ không dừng ở đó mà triển khai phiên bản lean (very lean version) để thấy rõ từng bước.

## 5. Sơ đồ sẽ triển khai

1. Diagram trong video mô tả luồng agent sẽ cài đặt: nhận query, chọn tool giá, chọn tool discount, trả đáp án.
2. Sơ đồ này là cầu nối sang Bài 026, nơi giảng viên giải chi tiết từng khối Thought, Action, Observation.
3. Bài tập tư duy: thử tự vẽ lại sơ đồ 2 tools này trước khi xem bài tiếp theo.

> Câu chốt: chỉ với 2 tools đơn giản, ta có đủ chất liệu để học toàn bộ agent loop mà không bị nhiễu nghiệp vụ.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Dùng `create_agent`, truyền LLM + list tools là có agent | Docs Agents: `create_agent(model, tools)` với `system_prompt`, `response_format`, `state_schema` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| Tools là hàm Python có mô tả để LLM dùng | Docs Models: hàm gắn `@tool` từ `langchain.tools`, rồi `model.bind_tools([...])` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Ví dụ bronze 15% trong lời giới thiệu | Chỉ là số minh họa, code chốt bronze 5%, silver 12%, gold 23% | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |

### Code cập nhật (nếu có)

Không cần cập nhật. Cách viết hiện nay:

```python
from langchain.agents import create_agent

agent = create_agent("ollama:qwen3:1.7b", tools=[get_product_price, apply_discount])
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| E-commerce agent | Nhận query giá + tier, trả giá cuối |
| Tool 1 | `get_product_price(product)` tra giá gốc |
| Tool 2 | `apply_discount(price, tier)` áp bronze/silver/gold |
| `create_agent` | Cách gọn nhất để dựng agent mẫu này |
| Lean version | Sẽ tự cài vòng lặp ở các bài sau để học under the hood |

**Câu chốt: bài toán càng đơn giản thì agent loop càng lộ rõ — đó là lý do chọn ví dụ 2 tools này.**

## Câu hỏi tự kiểm tra

1. Cửa hàng mẫu bán những mặt hàng nào?
2. Có mấy tier discount, tên là gì?
3. Agent phải làm gì với query của user?
4. Kể tên 2 tools của agent mẫu.
5. Nếu dùng `create_agent` thì cần truyền gì?

<details><summary><b>Xem đáp án</b></summary>

1. Headphones, keyboards, laptops (hardware).
2. 3 tier: bronze, silver, gold.
3. Trả về giá item sau khi áp discount.
4. `get_product_price` và `apply_discount`.
5. LLM + danh sách tools.

</details>

## Bước tiếp theo

Sang Bài 026 — lý thuyết tổng quan agent loop (ReAct algorithm: Thought, Action, Observation).
