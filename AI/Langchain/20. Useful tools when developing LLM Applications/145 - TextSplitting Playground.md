---
title: "Bài 145 - Text Splitting Playground: nhìn chunk trước khi embed"
course: "LangChain"
lesson: "145"
status: "edited-verified"
source: "145 - TextSplitting Playground.md"
verified_date: "2026-09-17"
langchain_version: "LangChain Text Splitter Playground (RecursiveCharacterTextSplitter), tính đến 2026-09-17"
categories: ["AI"]
tags: ["text-splitting", "chunk-size", "chunk-overlap", "RAG", "vector-store", "RecursiveCharacterTextSplitter"]
doc_refs: ["https://docs.langchain.com/"]
---

# Bài 145 — Text Splitting Playground: nhìn chunk trước khi embed

> Bài học được biên soạn từ transcript "TextSplitting Playground".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao ingest RAG bắt buộc split/chunkify trước khi vào vector store.
2. Nêu được yêu cầu của một chunk tốt: cohesive, vừa đủ nhỏ, không cắt giữa câu.
3. Dùng Text Splitter Playground để chỉnh chunk size, overlap, loại splitter và copy code.
4. Giữ đúng thuật ngữ Anh: text splitter, chunk size, chunk overlap, RecursiveCharacterTextSplitter, vector store.

## 2. Kiến thức cốt lõi

### Vì sao phải split

- Nhiều LLM apps (Medium articles, LangChain docs QA bằng RAG như đã học) đều nối LLM với external data sources.
- Prerequisite: ingest data vào format LLM dễ hiểu — thường là vector store.
- Nhưng trước đó phải **split/chunkify thành chunks nhỏ** vì không thể ném cả cục data vào: sẽ vượt token limitation.
- Nghe trivial nhưng nuanced và hay bị overlooked.

### Chunk tốt là gì

- Mỗi chunk phải có cohesive information mà cả ta và LLM đều hiểu được; không split giữa câu.
- Đủ nhỏ để hiểu và ít tokens, nhưng không quá lớn. Không có đáp án đúng chung — every case needs to be examined differently.
- Hai câu hỏi kinh điển giảng viên hay nhận: chunk size bao nhiêu, overlap bao nhiêu, split theo gì.

### Playground giải gì

- LangChain làm tool **Text Splitter Playground**: visualize cách split text.
- Tìm bằng Google "langchain text splitting playground", chọn kết quả GitHub repo (open source, check được code), bấm link hosted on LangChain (Streamlit publication).
- Cách dùng rất intuitive: chỉnh **chunk size**, **chunk overlap**, cách tính chunk size, chọn **text splitter** (mặc định RecursiveCharacterTextSplitter như trong course). Mỗi lần đổi params, code phía dưới update theo để copy-paste vào workspace.
- Demo: copy text từ LangChain blog → paste vào → Split text → nhìn visually từng chunks có make sense không — đó chính là chunks sẽ embed vào vector store. Nhìn rõ overlap giữa 2 chunks theo overlapping size.
- Transcript chốt: wonderful tool để optimize chunking strategy, visualize chunks và data chúng giữ.

## 3. Ví dụ và diễn giải

- Giữ đúng demo transcript: blog LangChain → copy all text → paste → split → inspect chunks và overlap.
- Giữ đúng tên splitter mặc định: RecursiveCharacterTextSplitter.
- Không bịa values cụ thể vì transcript không nêu số.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: LangChain docs về text splitters xác nhận họ splitter (recursive character và nhiều loại khác) với params chunk size/overlap — khớp transcript ở mức khái niệm.
- Trạng thái ngày 2026-09-17: **chưa kiểm chứng trực tuyến** URL Playground và tên package hiện hành do fetch docs trả 404/405 trong môi trường này.
- Nội dung bài giữ trung thành với transcript.

> **Hộp cập nhật:** khi có mạng, đối chiếu URL Playground hiện tại và tên class splitter trong docs mới (họ text splitter có thể đổi package). Giữ bản gốc transcript, bổ sung thay vì sửa lịch sử.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vì sao split | Vượt token limit nếu ném cả cục; cần ingest vào vector store |
| Chunk tốt | Cohesive, không cắt câu, vừa đủ nhỏ |
| Chỉnh gì | Chunk size, overlap, cách tính, loại splitter |
| Xem gì | Từng chunk visually + overlap + code sinh ra để copy |
| Kết quả | Chunks sẽ embed — nhìn trước, khỏi đoán |

**Một câu chốt:** Chưa nhìn thấy chunks thì chưa nên embed.

## 6. Câu hỏi tự kiểm tra

1. Vì sao không đưa thẳng raw data vào vector store?
2. Chunk tốt khác chunk xấu ở điểm nào?
3. Ba params chính chỉnh trong Playground là gì?
4. Code phía dưới Playground dùng để làm gì?
5. Vì sao không có đáp án chung cho chunk size?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì data thô quá lớn sẽ vượt token limitation; phải chunkify thành pieces nhỏ rồi mới ingest vào format LLM hiểu được như vector store.

**2.** Chunk tốt có cohesive information, không cắt giữa câu, đủ nhỏ để hiểu và ít tokens; chunk xấu rời rạc, quá to hoặc bị cắt ngang ý.

**3.** Chunk size, chunk overlap (và cách tính), loại text splitter (mặc định RecursiveCharacterTextSplitter).

**4.** Phản ánh đúng params đang chỉnh để copy-paste vào workspace, tái lập đúng cách split.

**5.** Vì mỗi case khác nhau về data và nhu cầu — phải examine và visualize từng case, không áp một số cho mọi nơi.

</details>

## 7. Bước tiếp theo

Bài 146 — *LangChain VS LlamaIndex* — chọn framework nào cho RAG và agents.

Nguồn: transcript gốc `145 - TextSplitting Playground.md`; [docs.langchain.com](https://docs.langchain.com/).
