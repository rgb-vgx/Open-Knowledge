---
title: 'Bài 049 — RAG 2 bước với LCEL RunnablePassthrough'
course: 'langchain'
lesson: 49
status: edited-verified
source: '049 - Medium Analyzer- 2 Step RAG.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/langchain/expression-language'
---

# Bài 049 — RAG 2 bước với LCEL và RunnablePassthrough

> Nguồn: `049 - Medium Analyzer- 2 Step RAG.md` — giữ mạch Ethan: bản naive so với bản LCEL, `RunnablePassthrough.assign`, `itemgetter`, trace LangSmith gom một chỗ.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Nêu ưu điểm LCEL: declarative, composable, streaming, async, batch, type safety, observability.
- Hiểu `RunnablePassthrough` như identity function giữ input.
- Hiểu `assign(context=...)` thêm key mới vào dict.
- Hiểu `itemgetter("question")` rút string query khỏi dict.
- Hiểu Python function thường tự تبدیل thành RunnableLambda trong LCEL.
- Đọc trace LangSmith của chain hoàn chỉnh.

## 2. Nội dung theo mạch transcript

### 2.1. Imports mới

Thêm ngoài bài 048:

```python
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough
# from operator import itemgetter
```

- `StrOutputParser` đã biết ở sections trước, để lấy `.content`.
- `RunnablePassthrough` như tên: cho input đi qua, không đổi.
- Transcript mở source LangChain: nó gần như identity function, chỉ khác là nếu input là dict thì có thể thêm keys.
- `itemgetter` từ `operator`: tạo callable lấy item bằng indexing, tiện hơn lambda.

### 2.2. Hàm trả về chain, không nhận args

```python
# def create_retrieval_chain_with_lcel():
#     retrieval_chain = ...
#     return retrieval_chain
```

- Hàm không nhận arguments vì input sẽ đưa vào `.invoke()` của chain trả về.
- Chain là Runnable nên có `.invoke`, giống đã học ở videos trước.
- Ba mắt xích cuối transcript paste sẵn:

```
prompt | llm | StrOutputParser
```

- `prompt` đã có `{question}` + `{context}`.
- Pipe vào LLM nghĩa là invoke LLM với input đó.
- Pipe vào StrOutputParser để lấy text answer.
- Phần này transcript nói là thứ đã làm ở sections trước.

### 2.3. Vấn đề 1: format_docs không phải Runnable

Transcript cảnh báo phần tricky:

- `format_docs` là regular Python function, không có `.invoke`.
- Gọi trực tiếp sẽ lỗi.
- Nhưng khi viết `retriever | format_docs | prompt` trong LCEL, LangChain tự convert function thành `RunnableLambda`.
- `RunnableLambda` adheres Runnable interface: invoke, stream, batch được.
- Đây là syntactic sugar quan trọng.

### 2.4. Vấn đề 2: prompt cần 2 keys

Prompt cần `question` và `context`, trong khi output của `retriever | format_docs` chỉ là một string.

Giải pháp transcript:

```python
# RunnablePassthrough.assign(
#     context=itemgetter("question") | retriever | format_docs
# )
```

Ý tưởng:

- `RunnablePassthrough.assign` tạo dict mới gộp input gốc + field tính toán mới.
- Input khi invoke chain là `{"question": "what is pinecone"}`.
- Vì là passthrough nên output vẫn giữ `{"question": ...}`.
- Thêm key `context` với value là subchain chạy trên input gốc.
- Subchain: `itemgetter("question")` moi string query ra, pipe vào retriever, rồi format_docs.
- Tương đương lambda `lambda x: x["question"]`.

Transcript lặp lại 2 lần vì khó:

1. Input `{"question": ...}` vào assign.
2. assign giữ nguyên + chạy subchain để tính `context`.
3. Output `{"question": ..., "context": ...}` pipe vào prompt.
4. Prompt → LLM → StrOutputParser.

> Transcript: Ethan pop-out 2 lần dặn cứ nghỉ uống cà phê rồi xem lại, bản thân anh cũng mất một lúc mới hiểu.

### 2.5. Chạy và so sánh

```python
# chain = create_retrieval_chain_with_lcel()
# result = chain.invoke({"question": query})
# print(result)
```

- Chạy bản không LCEL trước, rồi bản LCEL.
- Đáp án giống nhau, implementation khác.
- Ưu điểm liệt kê: declarative, composable, dùng lại trong components khác, streaming/async/batch/type safety.
- Quan trọng nhất: observability LangSmith tốt hơn nhiều.

### 2.6. Đọc trace gom một chỗ

Transcript show trace:

- Mọi moving parts nằm dưới một `RunnableSequence` vì đây là chain.
- Thấy input question gốc và output raw text cuối.
- Thấy thời gian từng bước, bottleneck ở đâu.
- Mở `assign(context=...)`:
  - Input dict `{"question": ...}`, output dict `{"question": ..., "context": ...}`.
  - Bên trong 3 steps: itemgetter → retriever → format_docs.
  - itemgetter là RunnableLambda moi question string.
  - retriever nhận query, trả 3 docs.
  - format_docs gán vào key `context`.
- Rồi dict này pipe vào ChatPromptTemplate → LLM → parse output.
- Code video này ở repo branch `project/rag-gist`, commit `add HCl based retrieval chain`.

```
{"question": q}
  |-- passthrough giu question
  |-- context = q -> retriever -> format_docs
  v
{"question": q, "context": c} -> prompt -> llm -> str
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `prompt \| llm \| StrOutputParser` là chain Runnable chuẩn LCEL | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 2 | Function thường trong LCEL tự thành RunnableLambda, invoke/stream/batch được | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/expression-language |
| 3 | `RunnablePassthrough.assign(context=...)` giữ input dict và thêm key mới | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/expression-language |
| 4 | `itemgetter("question")` tương đương lambda moi value khỏi dict | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/expression-language |
| 5 | LCEL cho streaming/async/batch/type safety và trace gom một RunnableSequence | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Tên commit, chi tiết click IDE lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

Giữ đúng logic transcript:

```python
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def create_retrieval_chain_with_lcel():
    retrieval_chain = (
        RunnablePassthrough.assign(
            context=itemgetter("question") | retriever | format_docs
        )
        | prompt
        | llm
        | StrOutputParser()
    )
    return retrieval_chain

# chain = create_retrieval_chain_with_lcel()
# print(chain.invoke({"question": "what is pinecone in machine learning"}))
```

Giải thích:

- `retriever`, `format_docs`, `prompt`, `llm` lấy từ bài 048.
- Không đổi keys `question`/`context` để khớp prompt cũ.
- `StrOutputParser()` thay `.content` thủ công.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Chuỗi cuối | `prompt \| llm \| StrOutputParser` |
| Function thường | Tự thành RunnableLambda trong LCEL |
| Passthrough | Identity, giữ input đi qua |
| assign | Thêm `context` vào dict gốc |
| itemgetter | Moi `question` string khỏi dict |
| invoke | `chain.invoke({"question": q})` |
| Trace | Một RunnableSequence, thấy bottleneck |
| Repo | Branch `project/rag-gist`, commit LCEL retrieval |

**Câu chốt: LCEL biến 5 bước thủ công thành một chain duy nhất vừa chạy được vừa trace được.**

## 5. Câu hỏi ôn tập

**1. Vì sao `format_docs` dùng được trong LCEL dù không phải Runnable?**

<details><summary>Đáp án</summary>

Vì LCEL tự convert Python function thành RunnableLambda có đủ invoke/stream/batch theo docs mới.

</details>

**2. `RunnablePassthrough.assign(context=...)` làm gì?**

<details><summary>Đáp án</summary>

Giữ nguyên dict input và thêm key `context` tính từ subchain, output có cả `question` lẫn `context`.

</details>

**3. `itemgetter("question")` tương đương gì?**

<details><summary>Đáp án</summary>

Tương đương `lambda x: x["question"]`, rút string query khỏi dict input.

</details>

**4. Ưu điểm lớn nhất của bản LCEL theo transcript?**

<details><summary>Đáp án</summary>

Observability LangSmith: mọi bước gom dưới một trace RunnableSequence, dễ debug và đo bottleneck.

</details>

**5. Input/output của chain này là gì?**

<details><summary>Đáp án</summary>

Input `{"question": q}`, sau assign thành `{"question": q, "context": c}`, cuối ra string answer.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `050 - LangChain RAG Documentation.md` — phê bình docs agentic RAG vs two-step chain và custom RAG agent LangGraph.
