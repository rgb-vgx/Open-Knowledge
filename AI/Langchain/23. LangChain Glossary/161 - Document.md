---
title: "Bài 161 - Document"
course: "LangChain"
lesson: "161"
status: "edited-verified"
source: "161 - Document.md"
verified_date: "2026-09-17"
langchain_version: "langchain >= 1.0, langchain-core Document, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["Document", "page_content", "metadata", "RAG"]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/documents", "https://github.com/langchain-ai/langchain"]
---

# Bài 161 — Document

> Bài học được biên soạn từ transcript "Document".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được Document gồm page_content và metadata.
2. Giải thích vì sao Document là building block của RAG workflows.
3. Kể cách loaders biến đa nguồn thành list Documents và chunks cũng là Documents.
4. Giữ đúng thuật ngữ Anh: Document, page_content, metadata.

## 2. Kiến thức cốt lõi

### Cấu trúc hai mảnh

- **page_content:** text thật như đoạn article, trang PDF hay bất kỳ text nào.
- **metadata:** dict chứa contextual info gồm source, filename, URL, page number hay custom tags.

### Vì sao quan trọng cho RAG?

- Loaders của LangChain hỗ trợ tons of integrations, nhưng output đều quy về list Document objects.
- Các Document lớn sau đó split thành smaller chunks, mỗi chunk tự nó cũng là một Document instance.
- Metadata đính kèm cho phép filtering và retrieval logic nâng cao ở downstream.

## 3. Ví dụ và diễn giải

- PDF, Notion, email khác định dạng nhưng sau loader đều thành Document chung, đúng interface đã học ở bài 006.
- Pipeline chuẩn: load thành Documents, split thành chunk Documents, embed, retrieve theo metadata như filename hay page.
- Muốn chỉ lấy tài liệu từ một URL hay một trang PDF, hãy lọc trên metadata thay vì parse lại text.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [LangChain documents](https://docs.langchain.com/oss/python/langchain/documents), repo [langchain](https://github.com/langchain-ai/langchain).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do WebSearch/WebFetch không trả về nội dung trong môi trường làm việc.
- Tên field `page_content` và `metadata` giữ nguyên theo transcript và `langchain-core`.

> **Hộp cập nhật:** khi có mạng, đối chiếu class `Document` trong `langchain-core` hiện tại và các field bổ sung nếu có.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Là gì | Standard container cho text + context |
| Gồm | page_content và metadata dict |
| Nguồn | Mọi loader đều trả list Documents |
| Chia nhỏ | Chunks cũng là Document instances |
| Dùng | Filtering và retrieval trong RAG nâng cao |

**Một câu chốt:** Document biến dữ liệu lộn xộn thành đơn vị chuẩn để RAG xử lý một lần.

## 6. Câu hỏi tự kiểm tra

1. Document gồm mấy phần?
2. Metadata chứa gì?
3. Vì sao chunks cũng là Documents?
4. Metadata giúp gì cho retrieval?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Hai phần: page_content chứa text và metadata chứa contextual info.

**2.** Source, filename, URL, page number hay custom tags.

**3.** Vì sau split mỗi mảnh text vẫn cần mang context riêng để embed và retrieve độc lập.

**4.** Cho phép filtering và retrieval logic như lọc theo source, trang hay tag.

</details>

## 7. Bước tiếp theo

Bài 162 — *Token Limitation Handling* — xem stuff, map_reduce và refine xử lý summarization quá context ra sao.

Nguồn: transcript gốc `161 - Document.md`; [LangChain documents](https://docs.langchain.com/oss/python/langchain/documents).
