---
title: "Bai 067 - GIST cua LLM"
course: langchain
lesson: 067
status: edited-verified
source: "067 - The GIST of LLMs.md"
verified_date: 2026-09-17
langchain_version: "chua chot patch moi nhat tinh den 2026-09-17; noi dung ly thuyet on dinh"
categories: [AI]
tags: [LLM, language-modeling, prompting-co-ban]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/models", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", "https://platform.openai.com/docs/guides/text"]
---

# Bài 067 — GIST của LLM

> Nguồn transcript: `067 - The GIST of LLMs.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 đối chiếu một phần, chỗ chưa kiểm chứng ghi rõ).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được language modeling là gì theo định nghĩa xác suất đơn giản.
2. Giải thích LLM chỉ là language model được train trên lượng dữ liệu rất lớn.
3. Mô tả cách LLM sinh chữ: đoán từng từ tiếp theo theo xác suất.
4. Hiểu vì sao LLM đôi khi bịa (hallucination) dù nghe rất thuyết phục.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Language modeling là autocomplete siêu thông minh

Transcript dẫn định nghĩa formal từ Wikipedia: phân phối xác suất trên chuỗi từ.

Nói dân dã:

> Language modeling = đoán từ tiếp theo sẽ là gì.

Ví dụ: câu `the dog wigged its ___` kèm một tập từ ứng viên. Model gán mỗi từ một xác suất P, rồi trả ra từ có xác suất cao nhất.

Ký hiệu trong bài:

- Chuỗi đã có: X1, X2, ..., Xt.
- Từ cần đoán: Xt+1.
- V là vocabulary (tập từ vựng).
- Cần tính P(Xt+1 | X1..Xt), với Xt+1 thuộc V.

Không cần nền tảng computer science cũng hiểu được, vì ý tưởng rất trực quan.

### 2.2. Ví dụ đời thường

- Gợi ý khi nhắn tin điện thoại.
- Gợi ý khi gõ search engine.

Đó đều là language model ở dạng đơn giản.

### 2.3. Large language model (LLM) là gì

LLM = language model như trên, nhưng được train trên lượng dữ liệu khổng lồ nên tính xác suất rất giỏi.

Mỗi lần bạn viết prompt, bạn đưa vào một chuỗi từ. LLM đoán từ tiếp theo, rồi đoán tiếp từ tiếp nữa, nối dài thành câu trả lời, luôn chọn từ có xác suất cao nhất trong ngữ cảnh bạn đưa.

Hệ quả quan trọng transcript nhấn mạnh:

> Vì LLM chỉ đoán theo xác suất, đôi khi nó trả ra thứ rất xa sự thật mà nghe vẫn xuôi tai.

Đó là toàn bộ concept LLM ở mức GIST.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Language modeling là tính P(next word \| previous words) | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Khái niệm nền tảng, không đổi. |
| LLM sinh text bằng cách đoán từng token tiếp theo | VẪN ĐÚNG | https://platform.openai.com/docs/guides/text | Docs OpenAI/Anthropic vẫn mô tả autoregressive generation. |
| LLM kém vì đoán xác suất nên có thể bịa | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/models | Lý do docs LangChain khuyên dùng RAG, grounding. |

> Hộp cập nhật 2026-09-17: Không có thay đổi về bản chất. Docs hiện tại bổ sung thêm chi tiết về tokenization, temperature, top-p để điều khiển phân phối xác suất, nhưng transcript không đề cập nên giữ nguyên mạch gốc, không bịa thêm code.

---

## 4. Tóm tắt

| Khái niệm | Version mới / Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Language model | P(Xt+1 \| X1..Xt) | Đoán từ tiếp theo |
| LLM | Language model + huge data | Đoán giỏi hơn, không phải hiểu như người |
| Generation | Lặp lại next-token | Từ nối từ thành câu |
| Rủi ro | Hallucination do đoán xác suất | Cần grounding, verification |

**Chốt: LLM là cỗ máy autocomplete xác suất ở quy mô lớn — hiểu điều này thì mọi kỹ thuật prompt sau đó mới có nền.**

---

## 5. Câu hỏi tự kiểm tra

1. Language modeling tính đại lượng nào?
2. V trong công thức là gì?
3. Vì sao ví autocomplete điện thoại được dùng làm ví von?
4. LLM khác language model thường ở điểm nào?
5. Vì sao LLM có thể trả lời sai mà nghe vẫn thuyết phục?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** P(Xt+1 | X1..Xt) — xác suất từ tiếp theo khi đã biết chuỗi trước đó.

**2.** V là vocabulary, tập từ vựng mà Xt+1 phải thuộc về.

**3.** Vì cả hai đều gợi ý từ tiếp theo dựa trên những gì đã gõ, chỉ khác ở quy mô và độ thông minh.

**4.** LLM được train trên lượng dữ liệu khổng lồ nên tính xác suất chính xác hơn nhiều, chứ nguyên lý đoán từ tiếp theo không đổi.

**5.** Vì nó tối ưu xác suất nghe xuôi tai trong ngữ cảnh, không phải tra cứu sự thật. Xác suất cao không đồng nghĩa đúng sự thật.

</details>

## 6. Bước tiếp theo

Bài 068 — *Prompt là gì và 4 thành phần của prompt* — học cách gọi đúng tên các mảnh instruction, context, input data, output indicator.
