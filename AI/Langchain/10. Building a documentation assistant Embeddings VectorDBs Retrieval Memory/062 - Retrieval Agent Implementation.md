---
title: 'Bài 062 — Retrieval agent với retrieve_context và create_agent'
course: 'langchain'
lesson: 62
status: edited-verified
source: '062 - Retrieval Agent Implementation.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 062 — Retrieval agent với retrieve_context và create_agent

> Nguồn: `062 - Retrieval Agent Implementation.md` — giữ mạch Eden: `backend/core.py`, `init_chat_model`, tool `content_and_artifact`, system prompt cite sources.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Tạo package `backend` với `__init__.py` và `core.py`.
- Khởi tạo embeddings `text-embedding-3-small` khớp dimension Pinecone.
- Khởi tạo vector store index `langchain-docs-2026` và LLM bằng `init_chat_model`.
- Viết tool `retrieve_context` trả content + artifact.
- Viết `run_llm(query)` dùng `create_agent` trả answer + context docs.

## 2. Nội dung theo mạch transcript

### 2.1. Files và imports

Trong `backend`:

```bash
touch backend/__init__.py
touch backend/core.py
```

- `__init__.py` để turn thành package.
- `core.py` implement retrieval part.

Imports transcript:

```python
import os
from typing import Any, Dict
from dotenv import load_dotenv
# from langchain.agents import create_agent
# from langchain.chat_models import init_chat_model
# from langchain.messages import ToolMessage
# from langchain_core.tools import tool
# from langchain_pinecone import PineconeVectorStore
# from langchain_openai import OpenAIEmbeddings
```

- `os` + `load_dotenv` quen thuộc.
- `Any`, `Dict` type hints cho function declarations.
- `create_agent` đã thấy trước.
- `init_chat_model` mới: cách convenient init nhanh chat client, nhận string trả đúng chat model, sẽ demo.
- `ToolMessage` vì retrieval pipeline dùng agent có retrieval tool, retrieval sẽ mark là tool message chứa tool execution.
- `tool` để create tool.
- `PineconeVectorStore`, dùng Chroma cũng được, video dùng Pinecone.
- Embeddings model để embed query thành vector trước khi lấy relevant context.

### 2.2. Khởi tạo embeddings, store, model

```python
# load_dotenv()
# embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
# vector_store = PineconeVectorStore(
#     index_name="langchain-docs-2026",
#     embedding=embeddings,
# )
```

- Model phải correlate/match size vectors lúc init vector store Pinecone.
- Index transcript re-record nên tên `langchain-docs-2026`.
- Truyền embeddings object để store biết embed text.

```python
# llm = init_chat_model("openai:gpt-5.2")
```

- Chỉ cần nói provider OpenAI và muốn GPT-5.2 là xong.
- Mở implementation thấy strings các models supported, major ones ở đây.
- Muốn Gemini thì đổi string sang Google GenAI và version theo function.
- Giữ nguyên tên `openai:gpt-5.2` như transcript.

### 2.3. Tool retrieve_context

```python
# @tool(response_format="content_and_artifact")
# def retrieve_context(query: str):
#     """Retrieve relevant documentation to help answer user queries about LangChain."""
#     retrieved_docs = vector_store.as_retriever(
#         search_kwargs={"k": 4}
#     ).invoke(query)
```

- Function tên `retrieve_context`, nhận query là user query.
- Decorator `@tool`, response format `content_and_artifact`.
- Transcript mở source: có thể là `content` hoặc `content_and_artifact`, default `content`.
- `content` thì tool return một value, `content_and_artifact` thì return hai values.
- Convenient để mark information downstream tới application mà không gửi tới LLM.
- Description giúp agent quyết định có dùng tool không, không cần mention return values vì suy từ content/artifact.

Serialize:

```python
# serialized = "\n\n".join(
#     f"Source: {d.metadata.get('source')}\nContent: {d.page_content}"
#     for d in retrieved_docs
# )
# return serialized, retrieved_docs
```

- Lấy vector store, `as_retriever` như section trước, `invoke` perform similarity search với query string.
- `k=4` là số documents tối đa lấy.
- Iterate documents, lấy content và sources đã index, gộp thành big string để augment prompt.
- Return serialized content là content downstream tới LLM, retrieved docs là artifact.
- Phân biệt vì muốn downstream serialized tới LLM, nhưng downstream documents dạng LangChain objects tới application để làm việc, render đẹp.
- Nếu chỉ return serialized thì mất object để làm việc.
- Artifact ở lại application, debug traces sẽ thấy.

### 2.4. run_llm và system prompt

```python
# def run_llm(query: str) -> Dict[str, Any]:
#     """Run RAG retrieval pipeline to answer a question."""
```

- Nhận user query, trả dict có answer là generated answer và context là list retrieved documents.
- Context suy từ retrieved_docs artifact, sẽ thấy ngay.

System prompt giữ nguyên:

```
You are a helpful AI assistant that answers questions about LangChain documentation.
You have access to a tool that retrieves relevant documentation.
Use the tool to find relevant information before answering questions.
Always cite the sources you use in your answers.
If you cannot find the answer in the retrieved documentation, say so.
```

- Đoạn cuối rất quan trọng để khỏi hallucinate khi docs helper không biết.

Tạo agent:

```python
# agent = create_agent(
#     model=llm,
#     tools=[retrieve_context],
#     system_prompt=system_prompt,
# )
```

- Chạy LangGraph under the hood.
- Build message list từ query string thành message role user, content là query.
- Invoke graph với dict `{"messages": [...]}`.
- Response chứa message history gồm tool calls và tool messages.
- Lấy last message `.content` làm answer.

Lấy context từ artifact:

```python
# context_docs = []
# for m in response["messages"]:
#     if isinstance(m, ToolMessage) and getattr(m, "artifact", None):
#         context_docs.extend(m.artifact)
# return {"answer": answer, "context": context_docs}
```

- Muốn show user nơi answer grounded để tạo trust, UX agentic quan trọng.
- Tool trả documents themselves ở artifact nên access từ tool message.
- Iterate messages, tìm type ToolMessage có attribute artifact không empty, tức result tool này.
- Artifact value là list nên extend vào context_docs.
- Trả answer và context list documents từ artifact.

Demo:

```python
# if __name__ == "__main__":
#     print(run_llm("what are deep agents?"))
```

- Chạy debug ở video sau.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `create_agent(model, tools, system_prompt)` chạy LangGraph, invoke `{"messages": [...]}` | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 2 | `init_chat_model("openai:...")` init nhanh chat model theo provider | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 3 | `@tool(response_format="content_and_artifact")` trả content tới LLM, artifact ở lại app | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 4 | `as_retriever(k=4).invoke(query)` similarity search, serialize source + content | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 5 | System prompt cite sources, không biết thì nói không biết | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 6 | Tên index/model lúc quay, chi tiết click IDE | chưa kiểm chứng được | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |

### Code cập nhật (LangChain 1.x)

```python
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chat_models import init_chat_model
from langchain.agents import create_agent
from langchain_core.tools import tool

load_dotenv()
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = PineconeVectorStore(
    index_name=os.environ.get("PINECONE_INDEX_NAME", "langchain-docs-2026"),
    embedding=embeddings,
)
llm = init_chat_model("openai:gpt-5.2")

@tool(response_format="content_and_artifact")
def retrieve_context(query: str):
    """Retrieve relevant documentation to help answer user queries about LangChain."""
    docs = vector_store.as_retriever(search_kwargs={"k": 4}).invoke(query)
    serialized = "\n\n".join(
        f"Source: {d.metadata.get('source')}\nContent: {d.page_content}"
        for d in docs
    )
    return serialized, docs
```

Giải thích:

- Giữ đúng k=4, description, response_format như transcript.
- Chỉ đọc index từ env có fallback để chạy nhiều máy.
- Agent invoke `{"messages": [...]}` như transcript.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Package | `backend/__init__.py` + `core.py` |
| Embeddings | `text-embedding-3-small` khớp dimension |
| Store | Pinecone/Chroma, k=4 |
| Model | `init_chat_model("openai:...")` |
| Tool | `content_and_artifact`, 2 return values |
| Agent | `create_agent` + system prompt cite |
| Output | answer từ last message, context từ artifact |

**Câu chốt: Content cho LLM trả lời, artifact cho app hiển thị sources — tách bạch là RAG sạch.**

## 5. Câu hỏi ôn tập

**1. `content_and_artifact` khác `content` thế nào?**

<details><summary>Đáp án</summary>

`content` return một value tới LLM, `content_and_artifact` return hai, artifact ở lại application không gửi LLM.

</details>

**2. Vì sao embeddings phải khớp index?**

<details><summary>Đáp án</summary>

Vì dimension vectors lúc tạo Pinecone phải bằng output model, sai sẽ không query được theo docs mới.

</details>

**3. System prompt có gì quan trọng?**

<details><summary>Đáp án</summary>

Bắt dùng retrieval tool trước, luôn cite sources, không tìm thấy thì nói không biết để chống hallucinate.

</details>

**4. `run_llm` trả gì?**

<details><summary>Đáp án</summary>

Dict answer từ last message và context list documents từ ToolMessage artifact.

</details>

**5. Vì sao show sources cho user?**

<details><summary>Đáp án</summary>

Để user tới link gốc kiểm chứng, tạo trust, quan trọng cho agentic UX.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `063 - Run Debug Trace RAG Agent.md` — debug messages, ToolMessage content/artifact, trace LangSmith.
