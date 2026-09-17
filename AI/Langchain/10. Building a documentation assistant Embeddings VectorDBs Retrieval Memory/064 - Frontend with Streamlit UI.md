---
title: 'Bài 064 — Frontend chat với Streamlit UI'
course: 'langchain'
lesson: 64
status: edited-verified
source: '064 - Frontend with Streamlit UI.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/rag'
- 'https://docs.streamlit.io/'
---

# Bài 064 — Frontend chat với Streamlit UI

> Nguồn: `064 - Frontend with Streamlit UI.md` — giữ mạch Eden: `main.py`, `_format_sources`, session_state, spinner, branch `3-frontend-finish`.

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## 1. Mục tiêu

- Hiểu Streamlit tạo UI Python không cần JavaScript.
- Viết `_format_sources` trích URLs từ metadata.
- Dựng title, sidebar, clear chat bằng session_state.
- Render history bằng `chat_message` và `expander` sources.
- Nhận input bằng `chat_input`, gọi `run_llm` có spinner và error handling.

## 2. Nội dung theo mạch transcript

### 2.1. Vì sao Streamlit

Transcript mở:

- Build frontend cho RAG retrieval pipeline để visually test và QA.
- Dùng Streamlit, open-source package tạo UI intuitive bằng Python.
- Không viết JavaScript, giống chat application trong playground.
- Streamlit khởi đầu cho data scientists visualize data, ví dụ charts chỉ vài dòng Python.
- Disclaimer: không for production, không recommend expose chat app bằng Streamlit.
- Video khác sẽ nói generative UI với TypeScript và Next.js.

### 2.2. Imports và helper sources

Tạo `main.py` mới:

```python
import streamlit as st
# from backend.core import run_llm
```

- `st` là application object làm việc suốt tutorial.
- `run_llm` là agent viết ở `backend.core`.

Helper:

```python
# def _format_sources(context_docs) -> list[str]:
#     urls = []
#     for d in context_docs:
#         meta = getattr(d, "metadata", None)
#         if meta:
#             urls.append(str(meta.get("source", "Unknown")))
#     return urls
```

- Nhận list LangChain documents, trả list URLs.
- Mỗi response từ LLM sau retrieval muốn cite nơi grounding.
- Iterate context_docs, nếu có metadata thì trích URL.
- Không có sources thì ghi `Unknown`.
- Cast string defensive phòng không phải string.

### 2.3. Page config, title, sidebar

```python
# st.set_page_config(page_title="LangChain Documentation Helper", layout="wide")
# st.title("LangChain Documentation Helper")
```

- `set_page_config` cấu hình title và layout.
- Chạy:

```bash
pipenv run streamlit run main.py
# uv tuong duong: uv run streamlit run main.py
```

- Browser pop ra app trống, title tab đã đổi.
- Thêm `st.title` rồi refresh thấy tiêu đề.
- Debug mode default nên không cần stop/run lại.

Sidebar:

```python
# with st.sidebar:
#     st.subheader("Session")
#     if st.button("Clear chat", use_container_width=True):
#         st.session_state.pop("messages", None)
#         st.rerun()
```

- Mọi thứ indent trong sidebar context manager thuộc sidebar.
- `subheader` hiển thị text session.
- Button `Clear chat` width bằng container sidebar.
- Return boolean có click ở last run không.
- Messages sẽ lưu ở `session_state`, là dict giữ intermediate results và data user interactions trước.
- Click thì pop key messages rồi rerun từ clean slate.

### 2.4. Render history

Khởi tạo placeholder khi chưa có messages:

```python
# if "messages" not in st.session_state:
#     st.session_state["messages"] = [{
#         "role": "assistant",
#         "content": "Ask me anything about LangChain docs. I'll retrieve relevant context and cite sources.",
#         "sources": [],
#     }]
```

- `session_state` là dict có key messages là list user/AI messages.
- Artificial message đầu role assistant kèm content và sources rỗng.

Render:

```python
# for msg in st.session_state["messages"]:
#     with st.chat_message(msg["role"]):
#         st.markdown(msg["content"])
#         if msg.get("sources"):
#             with st.expander("Sources"):
#                 for s in msg["sources"]:
#                     st.markdown(f"- {s}")
```

- `chat_message` insert container, role user/assistant/ai/human cho theme và avatar khác nhau.
- Transcript demo đổi role user thành robot rồi lại user.
- `expander` là container expand/collapse tiêu đề Sources.
- Iterate links, format Markdown list items.
- Demo thêm `www.langchain.com`, `www.anthropic.com` thấy 2 items.

### 2.5. Input và gọi agent

```python
# prompt = st.chat_input("Ask a question about LangChain.")
# if prompt:
#     st.session_state["messages"].append({"role": "user", "content": prompt, "sources": []})
#     with st.chat_message("user"):
#         st.markdown(prompt)
```

- `chat_input` là container nhập chat, placeholder text.
- Submit thì lưu vào prompt.
- Append vào session_state để giữ history.
- Hiển thị ngay dưới dạng user message.

Gọi LLM:

```python
#     with st.chat_message("assistant"):
#         try:
#             with st.spinner("Retrieving docs and generating answer."):
#                 response = run_llm(prompt)
#             answer = response.get("answer", "No answer returned.")
#             sources = _format_sources(response.get("context", []))
#             st.markdown(answer)
#             if sources:
#                 with st.expander("Sources"):
#                     for s in sources:
#                         st.markdown(f"- {s}")
#             st.session_state["messages"].append({
#                 "role": "assistant", "content": answer, "sources": sources,
#             })
#         except Exception as e:
#             st.error("Agent failed.")
#             st.exception(e)
```

- Dưới container assistant, bọc try/except vì RAG agent có thể fail, không muốn crash app.
- `spinner` show user something happening.
- Chạy `run_llm(prompt)`, demo viết Hello thấy spinner rồi response.
- Lấy answer key, fallback No answer returned.
- Lấy context key qua `_format_sources` thành URLs hiển thị.
- Hỏi Hello không retrieve gì nên không sources, hỏi What are deep agents thì có answer và sources, đôi khi duplicate source, fix bằng set sau.
- Quên save vào session_state thì response trước biến mất, nên phải append role assistant + content + sources.
- Test Hello rồi Deep agents explain thấy history giữ lại, Clear chat thì sạch.
- Commit repo: `git add main`, `git commit -m "added frontend"`, push, branch `3-frontend-finish`, file `main.py`.
- Hẹn video sau làm generative UI phản ánh tool đang chạy, vì building agents phải communicate state cho user tin tưởng.

## 3. Đối chiếu với docs mới nhất

| # | Khẳng định trong transcript | Kết luận | Link docs |
|---|------------------------------|----------|-----------|
| 1 | Streamlit `set_page_config`, `title`, `sidebar`, `button`, `rerun` dựng app Python | VẪN ĐÚNG | https://docs.streamlit.io/ |
| 2 | `chat_message`, `chat_input`, `markdown`, `expander`, `spinner`, `error` làm chat UI | VẪN ĐÚNG | https://docs.streamlit.io/ |
| 3 | `session_state` dict giữ messages history, pop để clear chat | VẪN ĐÚNG | https://docs.streamlit.io/ |
| 4 | Gọi `run_llm(prompt)` trả answer + context, `_format_sources` lấy metadata source | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 5 | Streamlit không for production, cần generative UI Next.js | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/rag |
| 6 | Lệnh pipenv/uv, tên branch/commit, avatar cụ thể lúc quay | chưa kiểm chứng được | https://docs.streamlit.io/ |

### Code cập nhật (LangChain 1.x)

```python
import streamlit as st
from backend.core import run_llm

st.set_page_config(page_title="LangChain Documentation Helper")

def _format_sources(context_docs):
    urls = []
    for d in context_docs or []:
        meta = getattr(d, "metadata", {}) or {}
        urls.append(str(meta.get("source", "Unknown")))
    # khu duplicate giu nguyen transcript note
    return list(dict.fromkeys(urls))

prompt = st.chat_input("Ask a question about LangChain.")
if prompt:
    response = run_llm(prompt)
    st.markdown(response["answer"])
```

Giải thích:

- Giữ đúng flow transcript, chỉ thêm dedupe bằng dict.fromkeys cho duplicate source transcript nhắc.
- `run_llm` giữ nguyên từ bài 062, UI chỉ gọi và render.

## 4. Tóm tắt một trang

| Khái niệm | Version mới (LangChain 1.x) |
|-----------|------------------------------|
| App | `streamlit run main.py`, Python không JS |
| State | `session_state["messages"]` giữ history |
| Render | `chat_message` + `markdown` + `expander` Sources |
| Input | `chat_input` rồi append user message |
| Call | `spinner` + `run_llm` + try/except |
| Sources | `_format_sources` từ metadata, dedupe |
| Clear | pop messages rồi rerun |
| Repo | Branch `3-frontend-finish`, `main.py` |

**Câu chốt: Streamlit giúp prototype RAG chat có cite sources chỉ trong một file Python.**

## 5. Câu hỏi ôn tập

**1. `session_state` để làm gì?**

<details><summary>Đáp án</summary>

Là dict giữ messages history qua các rerun, pop key messages để clear chat theo docs Streamlit mới.

</details>

**2. `_format_sources` làm gì?**

<details><summary>Đáp án</summary>

Iterate Documents, trích metadata source thành list URLs để render cite, Unknown nếu thiếu.

</details>

**3. Vì sao cần spinner và try/except?**

<details><summary>Đáp án</summary>

Spinner báo retrieving/generating, try/except tránh crash app khi RAG agent fail.

</details>

**4. Vì sao response biến mất nếu quên append?**

<details><summary>Đáp án</summary>

Vì Streamlit rerun mỗi interaction, không save vào session_state thì history mất.

</details>

**5. Vì sao Streamlit không production?**

<details><summary>Đáp án</summary>

Vì thiếu generative UI phản ánh tool state cho user tin tưởng, cần Next.js cho production.

</details>

## 6. Bước tiếp theo

Bài tiếp theo trong DANH_SÁCH_FILE: `065 - Documentation Helper In Production.md` — Chat LangChain Agentic RAG, subqueries, prompts router.
