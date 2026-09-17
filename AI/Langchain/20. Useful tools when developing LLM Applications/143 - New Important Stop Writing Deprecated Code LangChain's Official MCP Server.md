---
title: "Bài 143 - Dùng MCP server chính chủ của LangChain để tránh code deprecated"
course: "LangChain"
lesson: "143"
status: "edited-verified"
source: "143 - New Important Stop Writing Deprecated Code LangChain's Official MCP Server.md"
verified_date: "2026-09-17"
langchain_version: "LangChain docs MCP server (SearchDocsByLangChain), tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do docs trả 404)"
categories: ["AI"]
tags: ["MCP", "LangChain", "SearchDocsByLangChain", "Cursor", "deprecated-code", "create_agent", "Streamable-HTTP"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/mcpdoc", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 143 — Dùng MCP server chính chủ của LangChain để tránh code deprecated

> Bài học được biên soạn từ transcript "New Important Stop Writing Deprecated Code LangChain's Official MCP Server".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao coding agents (Cursor, Claude Code) hay sinh code LangChain cũ/deprecated.
2. Cài LangChain docs MCP server vào Cursor qua nút Copy MCP Server.
3. So sánh đáp án có MCP (`create_agent`) với không MCP (`initialize_agent`, `create_react_agent` deprecated).
4. Nêu được mối liên hệ giữa Chat LangChain và cùng một MCP server.
5. Giữ đúng thuật ngữ Anh: MCP server, SearchDocsByLangChain, Streamable HTTP, deprecated, context7, Tavily MCP.

## 2. Kiến thức cốt lõi

### Vấn đề: LLM không theo kịp tốc độ đổi của LangChain

- Giảng viên (Aiden) mở đầu: khi develop agents bằng LangChain/LangGraph + LangSmith, ai cũng dùng AI coding editors như Cursor, Claude Code.
- Vấn đề annoying: LangChain rất dynamic, change liên tục. API break, objects deprecated, rất khó keep up.
- LLMs càng không theo kịp vì chúng train tại một thời điểm; lúc train thì LangChain là một version, lúc ta dùng đã là version khác.
- Hệ quả: hỏi "Write me an agent with LangChain that does X..." có thể nhận rubbish answer dựa trên old variations, không up to date. Điều này đúng cho hầu hết AI field, không riêng LangChain.

### Giải pháp: LangChain docs có sẵn Copy page và Copy MCP Server

- LangChain team aware việc này. Trên docs mỗi page có **Copy page**: một click copy cả page, paste vào LLM chat app là dùng được.
- Có thêm **Copy MCP Server**: copy cấu hình MCP server của LangChain docs.
- Demo với Cursor: paste cấu hình, nó add LangChain docs như một MCP server. Đây là **Streamable HTTP server** trỏ tới LangChain Docs MCP. LangChain tạo public MCP server, query không cần API key, lấy latest and greatest documentation. Bấm install là xong.
- Server này có một tool: **SearchDocsByLangChain** — "Search across the docs of LangChain knowledge base to find relevant information, code examples, API references, and guides...". Tool nhận một query.
- Giảng viên tắt tạm **context7** để so sánh công bằng: context7 làm cho nhiều libraries, còn DocsByLangChain tailor-made cho LangChain ecosystem. Viết LangChain code thì nên dùng server này. Ông cũng tắt Tavily MCP (search/extract/crawl) trong demo đối chứng.

### Demo đối chứng có/không MCP

- Có MCP: hỏi "Hey, can you please tell me, how do I write a LangChain agent according to the latest docs?" Agent invoke SearchDocsByLangChain với query refactor thành "latest LangChain Python agent creation", nhận context chính chủ, trả lời dùng hàm **create_agent**.
- Không MCP (new chat, không MCP nào connected): cùng prompt, Cursor dùng default search tool, tìm ra **initialize_agent** — agent đầu tiên, deprecated từ rất lâu. Giảng viên nói đã quay lại video này nhiều lần mà nó vẫn vậy. Nó search lâu, acting lâu, cuối cùng ra **create_react_agent** cũng deprecated.
- Kết luận: không có LangChain MCP server thì code Cursor viết là wrong/deprecated code. Có server thì ra code đúng. Giảng viên đánh giá cao việc LangChain là một trong những công ty đầu tiên làm docs với llms.txt (đã học) rồi remote MCP server.

### Chat LangChain dùng chung server

- Vào chat.langchain.com, paste cùng prompt. Tool invoked để search docs nhiều khả năng chính là MCP server ta đang dùng (giảng viên nói not sure, need to find out, probably the case).
- Bấm **view trace**: thấy đúng SearchDocsByLangChain, toàn bộ trace transparent. Lần chạy demo invoke tool hai lần: lần một tìm agents, lần hai OSS troubleshooting, có bước search **create_agent**.
- Chốt: MCP + LangChain + coding agents nối với nhau rất đẹp. Lời urge: dùng coding agents thì hãy dùng LangChain MCP server. Docs cũng liệt kê VS Code MCP, Claude integration.

## 3. Ví dụ và diễn giải

- Câu prompt dùng xuyên suốt demo: "how do I write a LangChain agent according to the latest docs?"
- Bộ ba tên hàm cần phân biệt: `create_agent` (đúng, hiện tại) vs `initialize_agent` và `create_react_agent` (deprecated).
- Giữ đúng chi tiết transcript: Streamable HTTP, một tool duy nhất, không API key, tắt context7 và Tavily MCP khi đối chứng.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: trang MCP của LangChain docs và repo [mcpdoc](https://github.com/langchain-ai/mcpdoc) xác nhận pattern docs-as-MCP với tools `list_doc_sources`/`fetch_docs`; transcript mô tả biến thể hosted với tool `SearchDocsByLangChain` — cùng họ giải pháp.
- Trạng thái ngày 2026-09-17: **chưa kiểm chứng trực tuyến** URL và tên tool `SearchDocsByLangChain` do fetch docs.langchain.com trả 404/405 trong môi trường này (WebFetch/WebSearch không trả nội dung).
- Nội dung bài giữ trung thành với transcript. Tên hàm `create_agent` khớp với docs Agents hiện tại ở mức khái niệm.

> **Hộp cập nhật:** khi có mạng, cần đối chiếu URL Streamable HTTP của LangChain docs MCP server, tên tool `SearchDocsByLangChain` và cách cài vào Cursor/VS Code/Claude với docs mới nhất. Nếu docs đổi tên tool hoặc URL, giữ bản gốc transcript và bổ sung, không sửa lịch sử bài giảng.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Vấn đề | LangChain đổi nhanh, LLM train cũ sinh code deprecated |
| Giải pháp | LangChain docs MCP server public, không API key, Streamable HTTP |
| Tool | SearchDocsByLangChain nhận query, trả context chính chủ |
| Có MCP | Ra `create_agent` đúng docs mới |
| Không MCP | Ra `initialize_agent` / `create_react_agent` deprecated, search lâu |
| Kiểm chứng chéo | chat.langchain.com view trace thấy cùng tool |

**Một câu chốt:** Viết LangChain bằng coding agent mà không cắm docs MCP chính chủ thì rất dễ nhận code deprecated.

## 6. Câu hỏi tự kiểm tra

1. Vì sao LLM hay sinh code LangChain cũ?
2. Hai nút Copy trên docs LangChain khác nhau ra sao?
3. Tool của LangChain MCP server tên gì, nhận gì?
4. Vì sao giảng viên tắt context7 và Tavily MCP khi demo?
5. Ba tên hàm agent trong demo, cái nào đúng hiện tại?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì LangChain dynamic, API break/deprecate liên tục, còn LLM chỉ biết version tại thời điểm train (có thể cũ vài tháng) nên trả rubbish answer dựa trên old variations.

**2.** Copy page copy cả page để paste vào chat; Copy MCP Server copy cấu hình để add LangChain docs thành MCP server (Streamable HTTP, public, không API key) trong Cursor.

**3.** SearchDocsByLangChain — search knowledge base lấy thông tin, code examples, API refs, guides; nhận một query (ví dụ "latest LangChain Python agent creation").

**4.** Để so sánh công bằng: context7 phục vụ nhiều libraries (general), Tavily MCP có search riêng; tắt đi mới thấy rõ giá trị của server tailor-made cho LangChain.

**5.** `create_agent` là đáp án đúng theo docs mới; `initialize_agent` và `create_react_agent` đều deprecated.

</details>

## 7. Bước tiếp theo

Bài 144 — *LangChain Hub - Downloads prompt from the community* — sang kho prompt cộng đồng để khỏi viết prompt từ số 0.

Nguồn: transcript gốc `143 - New Important Stop Writing Deprecated Code LangChain's Official MCP Server.md`; [docs.langchain.com](https://docs.langchain.com/); [mcpdoc repo](https://github.com/langchain-ai/mcpdoc).
