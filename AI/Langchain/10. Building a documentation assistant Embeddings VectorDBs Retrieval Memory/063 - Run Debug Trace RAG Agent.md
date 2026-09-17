---
title: 'Bài 063 — Chạy debug và trace RAG agent'
course: 'langchain'
lesson: 63
status: edited-verified
source: '063 - Run Debug Trace RAG Agent.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone'
---

# Bài 063 — Chạy debug và trace RAG agent

> Nguồn: `063 - Run Debug Trace RAG Agent.md` — giữ mạch Eden: chạy `run_llm("what are deep agents?")`, debug messages, ToolMessage content/artifact, trace LangSmith.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Chạy `run_llm` và thấy dict answer + context.
- Debug response messages: human, AI tool call, tool message.
- Phân biệt ToolMessage content gửi LLM và artifact ở lại app.
- Đọc trace LangSmith: human → model → tool → retriever → final LLM.
- Hiểu vì sao `as_retriever` render đẹp hơn `similarity_search` thô.

## 2. Nội dung theo mạch transcript

### 2.1. Kết quả chạy

Transcript chạy:

```python
# if __name__ == "__main__":
#     print(run_llm("what are deep agents?"))
```

Kết quả có:

- `answer`: text về deep agents.
- `context`: bunch documents có IDs và metadata sources.
- Đó là documents giúp sinh answer.
- Answer ví dụ: deep agent là term LangChain coined cho agents handle complex open-ended tasks over longer time horizons.

```
Query "what are deep agents?"
  -> answer (string)
  -> context (list[Document] + sources)
```

### 2.2. Debug response object

Đặt breakpoint sau `agent.invoke`, xem `response` giữ entire information.

Messages list:

1. Human message input `What are deep agents?`.
   - LangChain tự convert string thành human message object.
2. AI message là tool call muốn invoke `retrieve_context`.
   - Có tool call name, query sẽ gửi, ID.
3. Tool message chứa tool response là result tool execution.

> Transcript: LangChain sẽ execute tool call này ngay sau AI message.

### 2.3. Content vs artifact trong ToolMessage

Vì dùng `response_format="content_and_artifact"` nên tool return hai values.

- Content attribute: string serialized bắt đầu bằng source rồi content pages.
  - Đây là serialized string format đẹp để downstream vào LLM.
- Artifact attribute: list documents.
  - Mỗi document có page_content về deep agents.
  - Đây là pythonic object để app dùng sau, ví dụ render đẹp.

Transcript nhấn:

- List messages này khi gửi tới LLM thì artifact không gửi.
- Artifact là chỗ giữ results cho application, không pollute context.
- Vì đã có sources và documents ở content, không cần gửi lại.
- Nhưng muốn object Python để làm việc sau thì cần artifact.

```
ToolMessage
 |-- content (string) -> gui toi LLM
 |-- artifact (list[Document]) -> giu o app, khong gui LLM
```

- Tới breakpoint format, lấy answer từ last message, gửi context key với context docs để frontend dùng.
- Finish execution thấy all documents printed và answer.

### 2.4. Trace LangSmith dưới LangGraph

Mở LangSmith thấy trace much more readable:

- Chạy dưới LangGraph vì `create_agent` là LangGraph graph.
- Human input `What are deep agents?`.
- Tới model, model quyết định tool call.
- System message hiện ở đây.
- Tool call tới `retrieve_context` với query đã rephrase: `LangChain's deep agent's definition`.
  - Không phải nguyên văn `what are deep agents`.
  - Đây là nice, model tự rephrase cho search tốt hơn.

```
Human -> Model -> retrieve_context("deep agent definition")
  -> retriever -> docs + sources -> Model -> answer
```

- LangChain chạy tool, thấy `retrieve_context` tool.
- Trong tool dùng retriever tìm relevant documents.
- Thấy documents content và source attribute đã đảm bảo valid lúc index.
- Mở view LangGraph state under the hood cũng được, dù chưa học LangGraph, khóa sau sẽ cover.

### 2.5. as_retriever vs similarity_search thô

Transcript so với docs RAG agent:

- Docs dùng vector store raw `similarity_search` tool.
- Ở đây dùng `as_retriever`.
- Lý do: render much more nicely trong LangSmith tracing.
- Nếu dùng similarity search thô thì không index đẹp trong tracing.
- Sau tool execution được docs.
- Final LLM call gồm original prompt history, tool execution results, rồi render answer.
- Check blog deep agents ngoài docs cũng khớp, khóa sau sẽ cover.
- Commit repo: `updated retrieval to latest LangChain code`, push.
- Code video ở branch `2-retrieval-qa-finish`, file `backend/core.py`.

> Giữ nguyên tên branch/commit như transcript.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | `create_agent` invoke trả messages gồm human, AI tool call, ToolMessage | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 2 | `content_and_artifact` tách content gửi LLM và artifact giữ ở app | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 3 | Model rephrase query trước khi gọi retrieval tool | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 4 | `as_retriever.invoke` trace đẹp hơn raw `similarity_search` trong LangSmith | VẪN ĐÚNG | https://docs.langchain.com/oss/python/integrations/vectorstores/pinecone |
| 5 | Trace chạy dưới LangGraph, final call gồm history + tool results | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents |
| 6 | Answer deep agents cụ thể, tên branch/commit lúc quay | chưa kiểm chứng được | https://docs.langchain.com/oss/python/langchain/agents |

### Code cập nhật (LangChain 1.x)

```python
from langchain.messages import ToolMessage

result = run_llm("what are deep agents?")
print(result["answer"])
print([d.metadata.get("source") for d in result["context"]})

# Lay artifact dung nhu transcript
# response = agent.invoke({"messages": [{"role": "user", "content": query}]})
# context_docs = []
# for m in response["messages"]:
#     if isinstance(m, ToolMessage) and getattr(m, "artifact", None):
#         context_docs.extend(m.artifact)
```

Giải thích:

- Giữ đúng query deep agents và cách lấy artifact như transcript.
- `ToolMessage.artifact` là list Documents, không gửi LLM.
- Answer lấy từ last message content.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| Input | Human `what are deep agents?` |
| Tool call | AI gọi `retrieve_context` với query rephrase |
| Content | String source + content gửi LLM |
| Artifact | List Documents giữ ở app |
| Trace | LangGraph: human → model → tool → retriever → answer |
| Retriever | `as_retriever` đẹp hơn raw search |
| Output | answer + context sources |
| Repo | Branch `2-retrieval-qa-finish`, `backend/core.py` |

**Câu chốt: Debug messages và trace cho thấy content nuôi LLM còn artifact nuôi UI.**

## 5. Câu hỏi ôn tập

**1. Response messages gồm gì?**

<details><summary>Đáp án</summary>

Human input, AI tool call retrieve_context, ToolMessage chứa content và artifact theo docs agents mới.

</details>

**2. Content và artifact khác nhau thế nào khi gửi LLM?**

<details><summary>Đáp án</summary>

Content là string serialized gửi LLM, artifact là list Documents ở lại app không gửi để khỏi pollute context.

</details>

**3. Vì sao query tool khác query gốc?**

<details><summary>Đáp án</summary>

Vì model rephrase thành definition search tốt hơn, ví dụ deep agent definition thay vì what are deep agents.

</details>

**4. Vì sao dùng `as_retriever`?**

<details><summary>Đáp án</summary>

Vì trace LangSmith index đẹp hơn raw similarity_search, dễ debug retriever theo docs Pinecone mới.

</details>

**5. Answer và context lấy từ đâu?**

<details><summary>Đáp án</summary>

Answer từ last message content, context từ ToolMessage artifact extend thành list Documents.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `064 - Frontend with Streamlit UI.md` — Streamlit chat, session_state, `_format_sources`, spinner, branch `3-frontend-finish`.
