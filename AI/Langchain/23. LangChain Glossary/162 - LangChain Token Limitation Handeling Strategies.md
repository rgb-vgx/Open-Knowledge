---
title: "Bài 162 - Chiến lược vượt Token Limit"
course: "LangChain"
lesson: "162"
status: "edited-verified"
source: "162 - LangChain Token Limitation Handeling Strategies.md"
verified_date: "2026-09-17"
langchain_version: "langchain classic chains, load_summarize_chain stuff / map_reduce / refine, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["token-limit", "stuff", "map-reduce", "refine", "summarization"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/chains", "https://github.com/langchain-ai/langchain"]
---

# Bài 162 — Chiến lược vượt Token Limit: Stuff, Map Reduce, Refine

> Bài học được biên soạn từ transcript "LangChain Token Limitation Handeling Strategies".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích token limit gồm cả input prompt và generated response.
2. Nói được vì sao app thật chắc chắn chạm trần dù context ngày càng lớn.
3. So sánh stuff, map_reduce và refine qua bài toán summarization.
4. Giữ đúng thuật ngữ Anh: token limit, stuff, map_reduce, refine, load_summarize_chain.

## 2. Kiến thức cốt lõi

### Token limit là gì?

- Mọi LLM đều có predefined token limit cho một interaction, gồm cả input và output.
- Transcript lấy ví dụ 4K thời đầu, Anthropic ra model 100K là cải tiến lớn; số này tăng dần nhưng trần hữu hạn vẫn còn.
- Giả sử đơn giản một token bằng một word; LLM không quan tâm chia bao nhiêu cho prompt và bao nhiêu cho response, miễn tổng không vượt trần.
- Vượt trần sẽ nhận lỗi quá tokens; prompt context quá lớn trong app nâng cao là inevitable.

### Ba chiến lược của LangChain

1. **Stuff:** nhồi mọi Documents vào prompt as is, đúng như stuffed animal nhồi bông. Tốn một API call, trực giác nhất, nhưng vài documents là chạm trần; dù model nuốt vô hạn thì payload gửi server vẫn nghẽn.
2. **Map reduce:** map từng Document thành prompt tóm tắt riêng, gọi LLM song song lấy small summaries, rồi reduce tất cả thành final summary. Mở bằng `load_summarize_chain` với `chain_type="map_reduce"`. Scale огром số documents và chạy nhanh, nhưng tốn nhiều API calls, đắt và dễ mất context ở bước map.
3. **Refine:** coi summarization như `foldl` trong functional programming. Binary function ở đây nhận accumulated summary và Document tiếp theo để combine thành refined summary; initial value là empty string/document. Lặp từ summary rỗng cộng Document 1 thành summary 1, cộng Document 2 thành summary 2 cho tới hết list. Mở bằng `chain_type="refine"`.

## 3. Ví dụ và diễn giải

- Tóm tắt 10 báo cáo: stuff nhồi cả 10 vào một prompt, nhanh gọn nhưng dễ vượt trần.
- Map reduce: 10 workers tóm tắt song song 10 báo cáo rồi một worker gộp 10 summaries, nhanh nhưng có thể rơi chi tiết.
- Refine: đọc báo cáo 1 tóm tắt, mang summary đó đọc tiếp báo cáo 2 để refine, cứ thế tới báo cáo 10; chậm tuần tự nhưng mượt như gấp giấy dần thành hình.
- Ví dụ `foldl` nhân trong transcript: từ 1 nhân 1 ra 1, nhân 2 ra 2, nhân 3 ra 6, nhân 4 ra 24; refine thay phép nhân bằng combine và summarize hai documents.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain chains](https://docs.langchain.com/oss/python/langchain/chains), repo [langchain](https://github.com/langchain-ai/langchain).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- `load_summarize_chain` thuộc LangChain classic chains; app mới có thể dùng LCEL hay LangGraph thay thế nhưng logic stuff/map_reduce/refine trong transcript vẫn giữ nguyên giá trị khái niệm.

> **Hộp cập nhật:** khi có mạng, kiểm tra trạng thái legacy của `load_summarize_chain`, đường dẫn mới của summarization chains và limits context của model đang dùng. Số 4K/100K tokens trong transcript đã lỗi thời so với model hiện tại nhưng nguyên lý trần hữu hạn không đổi.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Trần | Input + output chung một token limit |
| Stuff | Một call, đơn giản, dễ vượt trần |
| Map reduce | Song song, scale tốt, đắt và dễ mất info |
| Refine | Tuần tự kiểu foldl, refine dần, chậm mà mượt |
| Cách gọi | `load_summarize_chain` với chain_type tương ứng |

**Một câu chốt:** Không có chiến lược miễn phí, chỉ có đánh đổi giữa cost, tốc độ và độ mất thông tin.

## 6. Câu hỏi tự kiểm tra

1. Token limit tính trên phần nào?
2. Vì sao stuff trực giác mà kém scale?
3. Map và reduce trong map_reduce làm gì?
4. Refine giống `foldl` ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Tổng input prompt cộng generated response trong một interaction.

**2.** Vì nhồi nguyên Documents as is vào một prompt nên chỉ một API call nhưng nhanh chạm trần và nghẽn payload.

**3.** Map biến mỗi Document thành prompt tóm tắt và gọi LLM song song; reduce gộp các small summaries thành final summary.

**4.** Cùng lặp list để dồn thành một value: `foldl` dùng binary function và initial value, refine dùng combine-summarize và empty summary.

</details>

## 7. Bước tiếp theo

Bài 163 — *Memory Intro: Co-Reference Resolution* — xem LLM stateless vấp ở chữ him ra sao.

Nguồn: transcript gốc `162 - LangChain Token Limitation Handeling Strategies.md`; [LangChain chains](https://docs.langchain.com/oss/python/langchain/chains).
