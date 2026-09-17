---
title: 'Bài 120 — Generation Chain và Node'
course: langchain
lesson: 120
status: edited-verified
source: '120 - Creating the LLM Generation Chain and Node for LangGraph.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript doi hub sang langsmith client pull_prompt + pin commit; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/prompts
- https://docs.smith.langchain.com/
- https://docs.langchain.com/langgraph
---

# Bài 120 — Generation Chain và Node

> Nguồn: `120 - Creating the LLM Generation Chain and Node for LangGraph.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Lấy RAG prompt chuẩn (Lance Martin) và dựng `generation_chain = prompt | llm | StrOutputParser`.
2. Giải thích update bảo mật prompt hub: `pull_prompt` + cờ public + pin commit.
3. Viết test sanity generation với query "agent memory" và đọc trace.
4. Viết node `generate` ghi key generation vào state.

## 2. Nội dung chính theo mạch transcript

### 2.1. Chain (chains/generation.py)

- Imports: hub/client pull prompt, `StrOutputParser` (lấy content thành string), `ChatOpenAI`.
- Prompt RAG chuẩn: role assistant QA, plug `{context}` (documents retrieve/web search) + `{question}`.
- Update giữa video (Eden pop-out): `hub` từ LangChain deprecated, chuyển sang LangSmith client `pull_prompt(identifier)`; mặc định chặn pull public prompt (cờ dangerous) — phải bật explicit; docs coi pulling prompt là executable config, khuyên chỉ dùng prompt đã review và pin theo commit thay vì latest. Cách hiện đại transcript khuyên: paste prompt dạng plain text vào code — khỏi network call, khỏi cần key, biết rõ prompt là gì (repo làm vậy).

### 2.2. Test sanity

- `test_generation_chain`: query "agent memory", retrieve docs, invoke chain với (context, question), in đáp án xem tay — pass, summary đúng chủ đề; sang LangSmith thấy retrieval + documents content + runnable sequence (system "You are an assistant..." + context + question → string). Chạy full suite xanh.

### 2.3. Node (nodes/generate.py)

- Lấy question + documents từ state, chạy chain, update `{"generation": answer}` — node cuối trước END.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| RAG prompt context+question → LLM → StrOutputParser | Pattern RAG chuẩn LangChain. | https://docs.langchain.com/oss/python/langchain/prompts |
| Prompt hub chuyển sang LangSmith client, chặn public mặc định, nên pin commit | Khớp đoạn update bảo mật transcript kể; giữ nguyên vì transcript đã tự cập nhật. | https://docs.smith.langchain.com/ |
| Node ghi generation vào state | Semantics node LangGraph. | https://docs.langchain.com/langgraph |

> Ghi nhận: đây là video transcript tự cập nhật — không cần hộp sửa thêm. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| RAG prompt | context + question → đáp án |
| generation_chain | prompt \| llm \| StrOutputParser |
| Test sanity | In đáp án đọc tay, check trace |
| generate node | Ghi generation vào state |

**Một câu chốt:** Prompt đi mượn thì phải pin đúng bản đã đọc — còn chắc ăn nhất là dán thẳng prompt vào code để khỏi phụ thuộc mạng.

## 5. Câu hỏi tự kiểm tra

1. Prompt RAG chuẩn gồm những placeholder nào?
2. Vì sao docs mới chặn pull public prompt mặc định?
3. Pin commit thay vì latest để chống gì?
4. Vì sao test generation chỉ là sanity check?
5. Node generate khác node retrieve ở key state nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** `{context}` (documents retrieve/web search) và `{question}` (câu gốc), dưới role assistant QA.

**2.** Vì pulling prompt được coi là executable configuration, không phải plain text — prompt lạ có thể chứa chỉ dẫn nguy hiểm nên phải bật cờ explicit khi tin tưởng.

**3.** Chống prompt upstream đổi ngầm làm đổi hành vi app — pin commit giữ hành vi tái lập được.

**4.** Vì chỉ invoke rồi in đáp án đọc tay, không assert nội dung (LLM stochastic) — đủ để biết chain chạy, chưa phải test đúng/sai.

**5.** Retrieve ghi `documents`, generate ghi `generation` — hai key khác nhau trong cùng GraphState.

</details>

## 6. Bước tiếp theo

Bài 121 — *Building and Running the Complete LangGraph Agent* — nối 4 nodes, conditional edge decide_to_generate, compile và chạy.
