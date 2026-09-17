---
title: 'Bai 042 — Gioi thieu RAG Embeddings Vector Database'
course: 'langchain'
lesson: 42
status: edited-verified
source: '042 - Introduction to Retrieval Augmentation Generation RAG.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 042 — Giới thiệu RAG, Embeddings và Vector Database

> Nguồn: `042 - Introduction to Retrieval Augmentation Generation RAG.md` — transcript giữ nguyên mạch của Ethan, ví dụ Burj Khalifa, sách vài GB, cà phê đa ngôn ngữ.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Hiểu `Document` và `DocumentLoader` trong LangChain là gì.
- Hiểu `TextSplitter` và bài toán giới hạn token.
- Hiểu `embeddings`, vector space và khoảng cách ngữ nghĩa.
- Hiểu pipeline RAG: chunk → embed → lưu vector store → retrieve → augment → generate.
- Hiểu vai trò của vector database như Pinecone.

## 2. Nội dung theo mạch transcript

### 2.1. DocumentLoader — cửa ngõ đọc dữ liệu

Transcript mở đầu: LangChain mạnh vì kết nối third-party.

- Google Drive, Notion notebook, file system.
- LangChain viết sẵn wrapper cho từng nguồn.
- Output thống nhất: `Document`.
- `Document` đơn giản là vật chứa text:
  - PowerPoint → text.
  - PDF, image OCR, txt → text.
  - Mọi thứ quy về text.

> Ví von trong transcript: không quan trọng nguồn là Notion hay Drive, ta làm việc với abstraction tên là `Document`.

Code minh họa đúng tinh thần transcript (không thêm logic mới):

```python
# Tu duy DocumentLoader trong transcript
# loader = TextLoader("du-lieu.txt")
# docs: list[Document] = loader.load()
# docs[0].page_content  # text
# docs[0].metadata      # {"source": "du-lieu.txt"}
```

Giải thích:

- `load()` trả về `list[Document]`.
- Mỗi `Document` có `page_content` và `metadata`.
- `metadata.source` sau này dùng để chứng minh grounding.

### 2.2. Token limit và TextSplitter

Transcript nhắc lỗi khó chịu: vượt quá token limit của LLM.

- Cách xử lý trong session này: chia nhỏ văn bản dài thành chunks.
- Nghe đơn giản nhưng phức tạp:
  - Nhiều định dạng file.
  - Nhiều chiến lược chia.
  - Phải giữ tính liên quan ngữ nghĩa.
- `TextSplitter` giúp:
  - Split thành chunks.
  - Sau này ráp lại nếu cần.

```
Tai lieu dai (sach vai GB)
  |
  v
[chunk 1] [chunk 2] ... [chunk 1.000.000]
  |
  v
Xu ly tung phan de vuot qua token limit
```

### 2.3. RAG — Retrieval Augmented Generation

Tên chính thức trong transcript: retrieval augmentation generation, viết tắt RAG.

Ý tưởng cốt lõi:

1. Lấy prompt gốc của user.
2. Augment (bổ sung) bằng context liên quan.
3. LLM trả lời khi đã có context đúng.

Ví dụ sách trong transcript:

- File sách vài GB, hàng triệu tokens.
- Câu hỏi: `What did John do to Alice in the book?`
- Đáp án chỉ nằm ở 1–3 chunks cụ thể.
- Nếu gửi từng chunk đi hỏi LLM:
  - 5 chunks thì ổn.
  - 1 triệu chunks thì tốn tiền, chậm, dư thừa.

Giải pháp mơ ước:

- Bằng cách kỳ diệu nào đó lấy đúng chunks liên quan.
- Chỉ gửi 1–2 API calls.
- Tiết kiệm tiền, nhanh, không dư thừa.
- Cách đó tên là retrieval + augmentation.

### 2.4. Embeddings là gì

Transcript định nghĩa:

- Text embedding là kỹ thuật cổ điển trong NLP nhưng rất hữu ích.
- Ý tưởng: tạo vector space từ text sao cho khoảng cách giữa các vectors mang ý nghĩa.

Khái niệm:

- Vector = dãy số.
- Vector biểu diễn object phức tạp: từ, câu, ảnh, audio trong không gian nhiều chiều gọi là embedding.
- Embedding model = black box:
  - Input: text.
  - Output: array số.
- Ta không quan tâm bên trong model làm gì.
- Chỉ quan tâm: text vào, vector ra.

Tính chất model tốt:

- Text có nghĩa tương tự → vectors gần nhau.

Ví dụ 1 trong transcript:

- Câu 1: `I want to order an extra large coffee`
- Câu 2: `I'll have a tall coffee`
- Câu 3: `quiero pedir cafe extra grande`
- Cả ba nghĩa gần giống nhau, khác ngôn ngữ vẫn gần nhau trong embedding space.

Ví dụ 2 — Burj Khalifa:

- Text A: `how tall is the Burj Khalifa?`
- Text B: đoạn Wikipedia về Burj Khalifa.
- Trong model tốt, hai vectors này rất gần nhau.

Khoảng cách vectors:

- Tính được bằng toán cơ bản.
- Transcript nói thẳng: boring, không cần quan tâm.
- Đã có người tối ưu, chạy rất nhanh.

### 2.5. Vector database và Wikipedia embeddings

Transcript đặt câu hỏi:

- Ai điên mà embed toàn bộ Wikipedia?
- Thực tế có người làm: lấy values của Wikipedia, embed từng paragraph thành vectors.

Minh họa:

```
Query vector (mau cam, hinh vuong)
  |
  +-- neighbor 1 (gan nhat)
  +-- neighbor 2
  +-- neighbor 3
        |
        v
  Lay text goc cua vectors do lam context
```

- Tìm k neighbors gần nhất = tìm context tốt.
- Prompt cuối = query + context.
- Bảo LLM dùng context để trả lời.

Vector database:

- Lưu embeddings.
- Trả về vectors gần nhất trong thời gian ngắn.
- Persist để dùng lại sau.

### 2.6. Recap pipeline sách vài GB

1. File sách vài GB.
2. Split thành hàng nghìn / hàng triệu chunks bằng LangChain.
3. Embed từng chunk thành vector (list số).
4. Lưu vào vector database như Pinecone.
5. User hỏi → embed câu hỏi thành query vector.
6. Đặt query vector vào cùng space, tính vectors gần nhất.
7. Đó chính là relevant chunks.
8. Gửi query + relevant chunks vào LLM.
9. LLM dễ dàng trả lời.

Transcript nhắn:

- Đừng lo nếu chưa hiểu hết, hãy xem lại video.
- Sắp tới sẽ implement toàn bộ bằng LangChain.
- Code nhìn qua rất đơn giản vì LangChain gánh heavy lifting.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `Document` có `page_content` + `metadata.source`, `DocumentLoader.load()` trả `list[Document]` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Chia nhỏ văn bản dài để vượt token limit, `TextSplitter` hỗ trợ ráp lại | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | RAG = Retrieve relevant chunks + Augment prompt + Generate bằng LLM | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Embeddings biến text thành vector, text giống nghĩa thì gần nhau, dùng cosine/Euclidean | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Vector store persist vectors và tìm k neighbors nhanh nhất, ví dụ Pinecone | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 6 | Chi tiết UI Pinecone, số chiều 512/1536, ví dụ Burj Khalifa cụ thể | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

Transcript không đưa code chạy được ở bài này, chỉ mô tả. Cách viết hiện tại theo docs RAG:

```python
from langchain_classic.docstore.document import Document

doc = Document(
    page_content="Burj Khalifa cao 828m.",
    metadata={"source": "wikipedia-burj-khalifa"},
)
print(doc.page_content)
print(doc.metadata["source"])
```

Giải thích:

- Giữ đúng abstraction `Document` như transcript.
- `metadata.source` dùng để grounding như transcript nhấn mạnh.
- Package `langchain_classic` là tên hiện tại cho code ổn định, xem docs RAG.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Document | Vật chứa `page_content` + `metadata`, thống nhất mọi nguồn |
| DocumentLoader | Wrapper đọc Drive/Notion/PDF/TXT, gọi `.load()` |
| TextSplitter | Chia text dài thành chunks, giữ ngữ nghĩa |
| Embeddings | Text → vector số, nghĩa giống → gần nhau |
| Vector store | Lưu vectors, tìm top-k gần nhất cho query |
| RAG | Retrieve → Augment prompt → Generate answer |
| Pinecone | Ví dụ managed vector store trong transcript |

**Câu chốt: RAG giúp LLM trả lời đúng từ chunks liên quan thay vì nhồi cả cuốn sách vào prompt.**

## 5. Câu hỏi ôn tập

**1. `Document` trong LangChain gồm gì?**

<details><summary>Đáp án</summary>

`page_content` chứa text và `metadata` chứa nguồn như `source`, dùng để grounding câu trả lời theo docs mới.

</details>

**2. Vì sao cần `TextSplitter`?**

<details><summary>Đáp án</summary>

Văn bản dài vượt token limit, cần chia thành chunks nhỏ để xử lý từng phần và ráp lại khi cần.

</details>

**3. Embedding model tốt có tính chất gì?**

<details><summary>Đáp án</summary>

Text có nghĩa tương tự thì vectors gần nhau, kể cả khác ngôn ngữ như ví dụ cà phê Anh/Tây Ban Nha.

</details>

**4. Vector database làm gì trong RAG?**

<details><summary>Đáp án</summary>

Persist embeddings và tìm k vectors gần query vector nhất để lấy relevant chunks làm context.

</details>

**5. Ba bước RAG là gì?**

<details><summary>Đáp án</summary>

Retrieval lấy chunks liên quan, Augmentation ghép vào prompt, Generation gọi LLM trả lời.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `043 - Introduction to RAG Implementation.md` — động lực, 4 vấn đề của cách nhồi cả sách và giải pháp chunk + retrieval.
