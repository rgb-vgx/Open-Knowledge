---
title: "Bài 160 - RecursiveCharacterTextSplitter"
course: "LangChain"
lesson: "160"
status: "edited-verified"
source: "160 - RecursiveCharacterTextSplitter.md"
verified_date: "2026-09-17"
langchain_version: "langchain >= 1.0, langchain-text-splitters, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["RecursiveCharacterTextSplitter", "Document", "chunking", "RAG"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/text-splitters", "https://github.com/langchain-ai/langchain"]
---

# Bài 160 — RecursiveCharacterTextSplitter

> Bài học được biên soạn từ transcript "RecursiveCharacterTextSplitter".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được RecursiveCharacterTextSplitter dùng để chia Document lớn thành chunks nhỏ.
2. Mô tả chiến lược đệ quy theo separators từ lớn tới nhỏ.
3. So sánh với chia cố định theo ký tự hay token.
4. Giữ đúng thuật ngữ Anh: RecursiveCharacterTextSplitter, Document, chunk, separator.

## 2. Kiến thức cốt lõi

### Splitter này làm gì?

- Là utility class giúp split large documents thành smaller chunks để đưa vào LLM hay RAG.
- Cách làm là recursively by characters: thử separators theo thứ tự phân cấp cho tới khi chunks đủ nhỏ.

### Thứ tự separators

1. Đoạn văn: double newline `\n\n`.
2. Câu/dòng: single newline `\n`.
3. Từ: space.
4. Ký tự đơn lẻ nếu vẫn còn quá lớn.

### Vì sao gọi là đệ quy?

- Sau mỗi lần split, chunk nào vẫn quá lớn sẽ tiếp tục split bằng separator nhỏ hơn.
- Mục tiêu giữ semantically related text together, bảo toàn natural language flow và coherence trong chunks.
- Đây là heuristic, không đảm bảo mọi lần đều coherent, nhưng khác hẳn fixed-length splitting vốn cắt mù quáng.

## 3. Ví dụ và diễn giải

- Văn bản có 3 đoạn dài: splitter trước hết cắt theo `\n\n` thành 3 chunks đoạn.
- Đoạn còn dài quá thì cắt tiếp theo `\n` thành câu, rồi theo space thành từ.
- Kết quả: chunks tôn trọng cấu trúc văn bản gốc, retrieval sau này ít bị mất ngữ cảnh hơn cắt mỗi 500 ký tự.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain text splitters](https://docs.langchain.com/oss/python/langchain/text-splitters), repo [langchain](https://github.com/langchain-ai/langchain).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Bài giữ trung thành transcript; tham số `chunk_size`, `chunk_overlap`, `separators` đọc thêm ở docs mới.

> **Hộp cập nhật:** khi có mạng, đối chiếu default separators, `chunk_size`, `chunk_overlap` và package `langchain-text-splitters` hiện tại.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Mục đích | Chia Document lớn thành chunks vừa context |
| Chiến lược | Đệ quy từ separator lớn tới nhỏ |
| Thứ tự | `\n\n`, `\n`, space, character |
| Ưu điểm | Giữ semantic integrity, tôn trọng cấu trúc |
| Nhược điểm | Vẫn là heuristic, không hoàn hảo |

**Một câu chốt:** Muốn chunk ít vỡ nghĩa, hãy cắt theo cấu trúc từ lớn tới nhỏ thay vì cắt mù quáng.

## 6. Câu hỏi tự kiểm tra

1. Recursive ở đây nghĩa là gì?
2. Kể thứ tự separators trong transcript.
3. Vì sao cách này hơn fixed-length splitting?
4. Giới hạn của phương pháp là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Thử separator lớn trước, chunk nào còn lớn thì đệ quy split tiếp bằng separator nhỏ hơn cho tới khi đủ nhỏ.

**2.** Double newline cho paragraphs, single newline cho sentences/lines, spaces cho words, cuối cùng là individual character.

**3.** Vì tôn trọng inherent structure của text để giữ semantic integrity và coherence, thay vì cắt cố định.

**4.** Chỉ là heuristic, không đảm bảo luôn coherent.

</details>

## 7. Bước tiếp theo

Bài 161 — *Document* — xem container chuẩn gồm page_content và metadata.

Nguồn: transcript gốc `160 - RecursiveCharacterTextSplitter.md`; [LangChain text splitters](https://docs.langchain.com/oss/python/langchain/text-splitters).
