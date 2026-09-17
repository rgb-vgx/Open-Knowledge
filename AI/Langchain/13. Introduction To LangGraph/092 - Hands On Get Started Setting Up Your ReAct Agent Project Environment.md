---
title: "Bai 092 - Setup Project ReAct Agent"
course: langchain
lesson: 92
status: edited-verified
source: "092 - Hands On Get Started Setting Up Your ReAct Agent Project Environment.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; lenh poetry/pip co the doi"
categories: [AI]
tags: [setup, poetry, env, LangSmith-tracing, Tavily]
doc_refs: ["https://docs.langchain.com/langgraph", "https://docs.langchain.com/langsmith", "https://python.langchain.com/docs/integrations/tools/tavily_search/"]
---

# Bài 092 — Setup Project ReAct Agent

> Nguồn transcript: `092 - Hands On Get Started Setting Up Your ReAct Agent Project Environment.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên steps poetry và env keys như transcript; lệnh có thể cũ).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Dựng poetry project và .gitignore chặn env.
2. Cài đúng dependencies: langchain, openai, tavily, langgraph, dotenv.
3. Điền .env với OpenAI, LangSmith tracing, Tavily keys.
4. Chạy sanity check main.py load env.
5. Tạo khung react.py và nodes.py cho các video sau.

---

## 2. Nội dung chính theo mạch transcript

Video boilerplate: setup venv bằng poetry, cài deps, điền env keys, xong là sẵn implement ReAct graph.

Từ thư mục trống chạy `poetry init`, enter hết. Thêm `.gitignore` Python chuẩn, quan trọng là không đẩy env/API keys lên GitHub — lấy nội dung từ repo/resources video.

Cài packages: langchain, langchain-openai, langchain-tavily (transcript nói Tavily cho search), langgraph, python-dotenv, thêm black và formatter. Check `pyproject.toml` thấy đủ deps.

Tạo `.env`: OpenAI API key để gọi LLM; LangChain API key + `LANGCHAIN_TRACING_V2=true` + project `react-function-calling` để trace graph và OpenAI calls; Tavily/search API key. Giảng viên nói keys đã revoke trước khi publish.

Tạo `main.py` in `hello react langgraph with function calling` sanity check, import `load_dotenv`, load env, print thử OpenAI key thấy value là ok rồi xóa dòng print. Tạo `react.py` giữ reasoning engine và `nodes.py` (transcript ghi node.py) giữ graph nodes — các video sau implement. Commit `Project Setup`, push, dặn xem branch `project/react-async-function-calling` và commit list.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Poetry init + cài langchain/langgraph/tavily/dotenv | VẪN ĐÚNG về ý | https://docs.langchain.com/langgraph | Tên packages/extras đổi theo version; check docs hiện tại. Bài 091 poetry vs uv trống nên không đối chiếu. |
| Env tracing LANGCHAIN_TRACING_V2 + project | ĐỔI một phần | https://docs.langchain.com/langsmith | LangSmith hiện dùng `LANGSMITH_*`; biến `LANGCHAIN_*` cũ có thể còn tương thích nhưng nên đọc docs mới. |
| .gitignore chặn env | VẪN ĐÚNG | https://docs.langchain.com/langsmith | Nguyên tắc bảo mật bất biến. |

> Hộp cập nhật 2026-09-17: Giữ nguyên steps gốc để trung thành transcript. Khi làm thật: check tên package hiện tại (`langchain-tavily` vs `langchain_community`), dùng biến `LANGSMITH_TRACING/API_KEY/PROJECT` mới, và cân nhắc `uv` thay poetry. Không bịa code ngoài những gì transcript kể.

---

## 4. Tóm tắt

| Việc | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Venv | poetry/uv | Đừng đẩy env lên git |
| Deps | langchain + langgraph + search | Check tên mới |
| Tracing | LangSmith keys | Đọc biến mới |
| Khung code | main/react/nodes | Để video sau điền |

**Chốt: Setup sạch — venv, deps, env, trace — rồi mới viết agent, đừng code chay.**

---

## 5. Câu hỏi tự kiểm tra

1. Vì sao .gitignore phải chặn env?
2. Cần những API keys nào?
3. Ba biến tracing trong transcript là gì?
4. main.py sanity check làm gì?
5. Hai file khung được tạo là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Để không đẩy API keys lên GitHub gây lộ secrets.

**2.** OpenAI (gọi LLM), LangChain/LangSmith (tracing), Tavily/search (tìm kiếm).

**3.** LangChain API key, `LANGCHAIN_TRACING_V2=true`, project `react-function-calling`.

**4.** In câu hello, load_dotenv, print thử OpenAI key thấy value là ok rồi xóa.

**5.** `react.py` giữ reasoning engine và `nodes.py` giữ graph nodes.

</details>

## 6. Bước tiếp theo

Bài 093 — *Coding the Agent Brain* — triple tool, search tool và bind tools bằng function calling.
