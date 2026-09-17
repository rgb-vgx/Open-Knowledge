---
title: "Bài 133 - Chạy mcpdoc và cắm vào Claude Desktop"
course: "LangChain"
lesson: "133"
status: "edited-verified"
source: "133 - mcpdoc.md"
verified_date: "2026-09-17"
langchain_version: "mcpdoc (langchain-ai/mcpdoc); Claude Desktop + MCP Inspector, tính đến 2026-09-17"
categories: ["AI"]
tags: ["mcpdoc", "MCP", "llms-txt", "Claude-Desktop", "MCP-Inspector", "stdio", "SSE", "UVX"]
doc_refs: ["https://github.com/langchain-ai/mcpdoc", "https://modelcontextprotocol.io/docs/tools/inspector", "https://modelcontextprotocol.io/docs/learn/architecture"]
---

# Bài 133 — Chạy mcpdoc và cắm vào Claude Desktop

> Bài học được biên soạn từ transcript "mcpdoc".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích mcpdoc hoạt động 2 bước: đọc index `llms.txt` rồi curl fetch URL chi tiết.
2. Chạy thử mcpdoc local bằng UV và verify 2 tools qua MCP Inspector.
3. Cắm mcpdoc vào Claude Desktop qua config, xử lý 2 lỗi kinh điển: ENOENT uvx và relative path.
4. So sánh đáp án không grounding với đáp án grounded real-time về LangGraph memory.
5. Giữ đúng thuật ngữ Anh: mcpdoc, llms.txt, list doc sources, fetch docs, stdio, SSE, uvx.

## 2. Kiến thức cốt lõi

### mcpdoc làm gì

- Đang đứng trong official GitHub repository của MCP doc: server này leverage `llms.txt` của public docs (ví dụ LangGraph) để agents như Cursor, Windsurf, Claude Desktop fetch được up-to-date documentation.
- Vì docs open source GenAI change constantly, index thủ công sẽ stale rất nhanh. mcpdoc scrape từ official website nên luôn tươi.
- Cơ chế 2 bước, transcript ví như cuốn sách: bước 1 đọc "trang mục lục" — tool `llms.txt` chứa URLs + giải thích mỗi URL cover topic gì; bước 2 thấy cần URL nào thì `curl` fetch đúng URL đó. Hết stale documentation.

### Chạy local và verify bằng Inspector

1. mcpdoc viết bằng Python, dùng **UV**: clone repo, tạo virtual environment, activate (thấy `mcpdoc` bên trái), install dependencies theo `uv.lock`.
2. Lấy full path bằng `which uv`. Chạy server local với `llms.txt` tùy chọn (demo dùng LangGraph `llms.txt`), server chạy ở port 8082.
3. Mở terminal thứ hai, chạy MCP Inspector theo lệnh trong repo (`npx...`, bấm Y cài deps, chờ vài phút), Inspector lên ở port 3000.
4. Connect vào SSE server ở 8082 → List tools → thấy 2 tools: `list doc sources` (trả URL tới `llms.txt`) và `fetch docs` (nhận URL, scrape content). Chạy thử: fetch `llms.txt` thấy toàn bộ URLs, agent sau đó sẽ dùng tiếp các URLs đó lấy docs chi tiết.

### Cắm vào Claude Desktop

1. Settings cho thấy chưa có MCP nào. Hỏi thử "what is LangGraph memory?": Claude trả lời từ trained data, nghe có vẻ đúng nhưng không grounded real-time, sẽ stale rất nhanh vì LangGraph/LangChain update liên tục.
2. Vào Settings → Developer → mở MCP config file, paste snippet trong repo: chạy server bằng **uvx** từ mcpdoc directory, URLs trỏ LangGraph docs, transport **stdio**, port 8081 (lúc chạy thử là SSE, giờ đổi sang stdio — cả hai đều work).
3. Restart Claude Desktop. Gặp lỗi **ENOENT** không chạy được uvx: mở logs, activate venv, chạy `which uvx` lấy absolute path, paste vào config, restart → server load.
4. Kiểm tra icon tools thấy server `llms.txt` MCP, nhưng hỏi lại vẫn không đổi. Debug offline ra lỗi thứ hai: uvx cần **absolute path** tới code vì không biết chạy từ directory nào. Sửa path, restart.

### Kết quả grounded

1. Hỏi lại "what is LangGraph memory": agent invoke `list doc sources` (không arguments, vì server init sẵn với LangGraph docs) → được URL tới `llms.txt`.
2. Agent invoke `fetch docs` với URL đó → scrape được content `llms.txt` (topics + URLs).
3. Agent tự tìm URL về memory (`langgraph/concepts/memory`), invoke `fetch docs` lần nữa → allow → fetch real-time content → tóm tắt LangGraph memory grounded từ official docs.

## 3. Ví dụ và diễn giải

- Giữ đúng chi tiết transcript: port thử SSE 8082, port config stdio 8081, Inspector port 3000, 2 tools `list doc sources` / `fetch docs`.
- Giữ đúng 2 lỗi và cách sửa: ENOENT uvx → `which uvx`; path tương đối → absolute path.
- Chuỗi 3 tool calls cho câu memory: list sources → fetch index → fetch page memory.

## 4. Kiểm chứng với docs mới nhất

- Repo chính: [langchain-ai/mcpdoc](https://github.com/langchain-ai/mcpdoc) xác nhận 2 tools `list_doc_sources` và `fetch_docs`, cấu hình `--urls`/yaml/json, remote chỉ tải đúng domain. Kiểm chứng ngày 2026-09-17.
- Docs chính: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) xác nhận chạy qua npx, connect stdio/remote để list/call tools. Kiểm chứng ngày 2026-09-17.
- Transport: docs 2026-07-28 dùng stdio và Streamable HTTP; transcript dùng SSE cho remote — giữ gốc, hiểu tương đương ở mức khái niệm.
- Trạng thái: luồng thực hành **vẫn đúng**, chỉ tên transport remote đã đổi.

> **Hộp cập nhật:** khi cấu hình client mới, ưu tiên transport stdio cho local và Streamable HTTP cho remote. Giữ nguyên các port và câu lệnh trong bài vì đó là lời giảng viên.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| mcpdoc | MCP server đọc `llms.txt` rồi fetch docs chi tiết, chống stale |
| Verify | Chạy UV local + Inspector list/call 2 tools |
| Cắm Claude | Config uvx, stdio, restart, thấy server trong tools |
| 2 lỗi | ENOENT uvx → absolute path uvx; relative code path → absolute path |
| Chuỗi gọi | list sources → fetch index → fetch page cần |
| Kết quả | Đáp án grounded real-time thay vì trained data |

**Một câu chốt:** Muốn docs tươi thì đừng index thủ công, hãy để MCP server đọc mục lục rồi fetch đúng trang khi cần.

## 6. Câu hỏi tự kiểm tra

1. Hai bước hoạt động của mcpdoc là gì?
2. Hai tools của mcpdoc, mỗi tool nhận/trả gì?
3. Vì sao đáp án Claude không MCP bị coi là stale?
4. Hai lỗi khi cắm vào Claude Desktop và cách sửa?
5. Chuỗi tool calls cho câu "LangGraph memory" gồm những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Đọc index `llms.txt` (mục lục URLs + giải thích topics), rồi curl fetch URL chi tiết theo user question. Ví sách: đọc mục lục trước, mở đúng chương sau.

**2.** `list doc sources`: không arguments đặc thù trong demo, trả URL tới `llms.txt`. `fetch docs`: nhận URL, scrape và trả content của URL đó.

**3.** Vì nó trả từ trained data tại thời điểm train, không grounded real-time. Docs LangGraph/LangChain đổi nhanh nên đáp án stale rất nhanh.

**4.** ENOENT uvx → lấy absolute path bằng `which uvx` rồi restart. Relative code path → đổi sang absolute path tới mcpdoc directory rồi restart.

**5.** `list doc sources` lấy URL `llms.txt` → `fetch docs` URL đó lấy index → agent tìm URL memory → `fetch docs` URL memory lấy real-time content rồi tóm tắt.

</details>

## 7. Bước tiếp theo

Bài 134 — *Intro* — sang section 19: tự implement MCP servers rồi MCP client bằng LangChain adapter.

Nguồn: transcript gốc `133 - mcpdoc.md`; [mcpdoc repo](https://github.com/langchain-ai/mcpdoc); [Inspector docs](https://modelcontextprotocol.io/docs/tools/inspector).
