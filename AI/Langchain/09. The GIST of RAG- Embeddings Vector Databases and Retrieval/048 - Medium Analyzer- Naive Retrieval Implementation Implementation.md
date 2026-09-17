---
title: 'Bai 048 — Retrieval tho so voi retriever va augment prompt'
course: 'langchain'
lesson: 48
status: edited-verified
source: '048 - Medium Analyzer- Naive Retrieval Implementation Implementation.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 048 — Retrieval thô sơ với retriever và augment prompt

> Nguồn: `048 - Medium Analyzer- Naive Retrieval Implementation Implementation.md` — giữ mạch Eden: tạo `main.py`, so sánh không RAG và có RAG, debug từng bước.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Khởi tạo embeddings, LLM, PineconeVectorStore và `as_retriever(k=3)`.
- Viết prompt `Answer based only on context` và hàm `format_docs`.
- Implement retrieval chain thủ công không LCEL.
- So sánh đáp án GPT-3.5 không RAG và có RAG.
- Đọc trace LangSmith khi chưa gom dưới một chain.

## 2. Nội dung theo mạch transcript

### 2.1. Imports và khởi tạo

Tạo `main.py` cho retrieval, transcript import:

```python
import os
from dotenv import load_dotenv
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.messages import HumanMessage
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# from langchain_pinecone import PineconeVectorStore
```

Giải thích:

- `os` + `load_dotenv` để đọc `.env`.
- `ChatPromptTemplate` tạo RAG prompt.
- `HumanMessage` cho raw invocation demo.
- `ChatOpenAI` làm LLM, `OpenAIEmbeddings` làm embeddings như section trước.
- `PineconeVectorStore` như video ingestion.

Khởi tạo:

```python
# load_dotenv()
# print("initializing components")
# embeddings = OpenAIEmbeddings()
# llm = ChatOpenAI()  # default trong transcript
# vector_store = PineconeVectorStore(
#     index_name=os.environ["PINECONE_INDEX_NAME"],
#     embedding=embeddings,
# )
```

- Chạy sanity check thấy in ra là ổn.
- LLM dùng defaults của LangChain OpenAI, transcript soi thấy là GPT-3.5 Turbo.

### 2.2. Retriever k=3

```python
# retriever = vector_store.as_retriever(search_kwargs={"k": 3})
```

- `as_retriever` trả về `VectorStoreRetriever`.
- Transcript mở docs, nhấn mạnh class này có searching capability do vendor implement.
- `k=3` nghĩa mỗi lần search chỉ lấy 3 documents liên quan nhất, sort theo relevance.
- `retriever` là Runnable, có `invoke`, bên trong gọi `get_relevant_documents`.
- Vendor quyết định implement: Pinecone dùng Pinecone SDK, Chroma dùng implement khác.
- Có bản async `aget_relevant_documents`.

> So sánh transcript: ở `ingestion.py` dùng `from_documents`, ở `main.py` dùng `as_retriever`.

### 2.3. Prompt và format_docs

Prompt transcript viết tay, đơn giản nhưng powerful:

```
Answer the question based only on the following context.
Context: {context}
Question: {question}
Provide a detailed answer.
```

- `{context}` là augmentation, `{question}` là prompt gốc.
- Đúng nghĩa Retrieval Augmented Generation.

Hàm phụ trợ:

```python
def format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)
```

- Nhận `list[Document]`, lấy `page_content` nối bằng newlines.
- Chuỗi này sẽ gửi vào `{context}`.

### 2.4. Demo không RAG bị hallucinate

Query: `what is pinecone in machine learning`.

Raw invocation:

```python
# response = llm.invoke([HumanMessage(content=query)])
```

- GPT-3.5 trả: pinecone algorithm tìm hyperparameters — sai, vì muốn nói Pinecone vector store.
- Đổi sang GPT-5.2 thì trả đúng: managed vector store database.
- Transcript giải thích: GPT-5.2 train năm 2025, lúc đó Pinecone đã established nên có training data, GPT-3.5 thì hallucinate.
- Đây cũng là motivation dùng RAG.

> Giữ nguyên tên model GPT-5.2 như transcript, không sửa.

### 2.5. Retrieval chain không LCEL

Hàm `retrieval_chain_without_lcel(query: str) -> str`:

1. `docs = retriever.invoke(query)` — 3 Documents liên quan nhất.
2. `context = format_docs(docs)` — string lớn.
3. `messages = prompt.format_messages(context=context, question=query)` — list 1 message.
4. `response = llm.invoke(messages)` — AIMessage.
5. `return response.content`.

Transcript liệt kê limitations:

- Invoke thủ công từng bước.
- Không streaming, không async.
- Khó compose vào chains khác.
- Dễ lỗi, khó maintain.
- Video sau fix bằng LCEL.

Chạy thử:

- Không RAG: đáp án sai về hyperparameters.
- Có RAG: `pinecone is a fully managed cloud based vector database...` — đáp án muốn.

### 2.6. Debug và trace

Debug trong Cursor:

- `query` giữ câu hỏi.
- `documents` là list 3 Documents, mỗi cái có `page_content`.
- `context` là string lớn gộp 3 docs.
- `messages` là list 1 message: prompt + context + question.
- `response.content` là answer.

LangSmith:

- Vì không dùng chain/LCEL, traces không gom dưới một chain component, rất inconvenient.
- Thấy `vector_store retrieval` với input query, output 3 docs kèm text + source.
- `format_docs` và populate prompt không hiện vì không phải chain.
- Thấy LLM invocation cuối với full augmented prompt và answer.
- Kết luận: debug/trace khó hơn, video sau bind hết dưới LCEL chain.

```
query -> retriever.invoke -> docs[3] -> format_docs -> prompt -> llm -> answer
```

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `PineconeVectorStore(index_name, embedding).as_retriever(k=3)` tìm relevant chunks | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 2 | Retriever là Runnable, `invoke(query)` gọi `get_relevant_documents`, có bản async | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 3 | Pattern format docs rồi `prompt.format_messages(context, question)` rồi `llm.invoke` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 4 | Không RAG dễ hallucinate, có RAG grounding đúng Pinecone vector DB | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Manual chain khó trace, nên gom dưới LCEL RunnableSequence để quan sát LangSmith | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Tên model GPT-3.5 Turbo / GPT-5.2 và câu trả lời cụ thể lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/rag |

### Code cập nhật (LangChain 1.x)

```python
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

load_dotenv()
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
llm = ChatOpenAI(model="gpt-4o-mini")
vector_store = PineconeVectorStore(
    index_name=os.environ["PINECONE_INDEX_NAME"],
    embedding=embeddings,
)
retriever = vector_store.as_retriever(search_kwargs={"k": 3})

prompt = ChatPromptTemplate.from_template(
    "Answer the question based only on the following context.\n"
    "Context: {context}\nQuestion: {question}\nProvide a detailed answer."
)

def format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)

def retrieval_chain_without_lcel(query: str) -> str:
    docs = retriever.invoke(query)
    context = format_docs(docs)
    messages = prompt.format_messages(context=context, question=query)
    return llm.invoke(messages).content
```

Giải thích:

- Giữ đúng k=3, prompt, flow thủ công như transcript.
- Chỉ đổi model sang tên hiện tại để chạy được, logic không đổi.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Store | `PineconeVectorStore(index_name, embedding)` |
| Retriever | `.as_retriever(k=3)` lấy top-3 docs |
| Prompt | `context` + `question`, detailed answer |
| Format | Nối `page_content` bằng newlines |
| Manual flow | invoke retriever → format → format_messages → invoke LLM |
| Không RAG | Hallucinate pinecone algorithm |
| Có RAG | Đúng managed vector DB |
| Trace | Rời rạc nếu không dùng LCEL chain |

**Câu chốt: Manual retrieval chứng minh RAG grounding hiệu quả, nhưng khó trace và khó tái dùng nếu không gom thành chain.**

## 5. Câu hỏi ôn tập

**1. `as_retriever(k=3)` làm gì?**

<details><summary>Đáp án</summary>

Trả retriever tìm 3 Documents liên quan nhất cho query, sort theo relevance theo docs mới.

</details>

**2. `format_docs` để làm gì?**

<details><summary>Đáp án</summary>

Nối `page_content` các docs thành một string để填 vào `{context}` của prompt.

</details>

**3. Vì sao GPT-3.5 trả sai Pinecone?**

<details><summary>Đáp án</summary>

Vì thiếu context, model hallucinate thành hyperparameter algorithm; có RAG thì grounding đúng vector DB.

</details>

**4. Hạn chế của bản không LCEL?**

<details><summary>Đáp án</summary>

Manual invoke, không streaming/async, khó compose, dễ lỗi, trace LangSmith rời rạc.

</details>

**5. Retriever invoke thực chất chạy gì?**

<details><summary>Đáp án</summary>

Chạy `get_relevant_documents` do vendor implement, ví dụ Pinecone SDK, trả `list[Document]`.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `049 - Medium Analyzer- 2 Step RAG.md` — bản LCEL với `RunnablePassthrough.assign`, `itemgetter`, trace gom một chỗ.
