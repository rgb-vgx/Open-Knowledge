---
title: "Bài 125 - Vì sao cần MCP"
course: "LangChain"
lesson: "125"
status: "edited-verified"
source: "125 - Theory Why MCP Model Context Protocol.md"
verified_date: "2026-09-17"
langchain_version: "MCP spec 2026-07-28; LangChain agents docs, tính đến 2026-09-17"
categories: ["AI"]
tags: ["MCP", "model-context-protocol", "AI-agents", "tools", "Cursor", "Claude-Desktop"]
doc_refs: ["https://modelcontextprotocol.io/docs/getting-started/intro", "https://modelcontextprotocol.io/docs/learn/architecture", "https://docs.langchain.com/oss/python/langchain/agents"]
---

# Bài 125 — Vì sao cần MCP

> Bài học được biên soạn từ transcript "Theory Why MCP Model Context Protocol".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được bài toán MCP giải quyết: tích hợp một lần, dùng cho mọi AI agent.
2. Giải thích vì sao tự viết integration riêng cho từng agent (Cursor, Windsurf, Copilot...) không bền vững.
3. Mô tả ý tưởng "thêm một lớp trừu tượng" của MCP và hiệu ứng flywheel khi nhiều người dùng.
4. Giữ đúng thuật ngữ Anh: MCP, MCP server, AI agent, integration.

## 2. Kiến thức cốt lõi

### Bài toán: mỗi agent một integration

Giả sử bạn có một AI agent biết gửi tin nhắn Slack, đọc/gửi email, query DB:

- Bạn phải tự tìm hiểu Slack API, Gmail API, viết custom code bọc lại thành tool cho agent dùng.
- Có khi bạn còn cố tình viết "thiếu" đi: ví dụ không cho agent quyền delete email, chỉ cho đọc/gửi.
- Với framework như LangChain, một phần việc này có sẵn (built-in tools cho Gmail...), phần còn lại bạn tự viết.

Vấn đề bùng nổ khi agent của bạn thành công và người khác muốn dùng lại chức năng đó ở agent khác:

- Code bạn viết "đo ni đóng giày" cho Cursor thì muốn mang sang Windsurf phải viết lại integration.
- Muốn thêm Lovable, Bolt, GitHub Copilot... thì làm lại từ đầu cho từng nơi.
- Giảng viên chốt: ai muốn viết cả nghìn integrations?

### Giải pháp MCP: thêm một lớp trừu tượng

Nguyên tắc kinh điển trong computer science được transcript nhắc lại:

> Muốn giải một bài toán, hãy thêm một lớp trừu tượng (layer of abstraction).

MCP làm đúng việc đó:

1. Bạn tích hợp **một lần duy nhất** vào MCP server của mình.
2. Mọi agent hỗ trợ MCP protocol đều kết nối được tới MCP server đó.
3. Agent bạn viết tương thích với Cursor thì tự động tương thích với Windsurf mà phía bạn không cần thêm logic.

### Hiệu ứng mạng xã hội

Transcript ví MCP như social media app:

- Ít người dùng thì ít giá trị; hàng triệu người dùng tạo ra flywheel nội dung khổng lồ.
- MCP hiện tại cũng vậy: rất nhiều người dùng, hàng tấn MCP servers ngoài kia, possibilities are endless.

## 3. Ví dụ và diễn giải

- Ví dụ xuyên suốt: agent gửi Slack + Gmail + DB queries. Làm cho một agent thì xong; mang sang N agents thì chi phí nhân N lần nếu không có chuẩn chung.
- Liệt kê cụ thể trong transcript: Cursor, Windsurf, Lovable, Bolt, GitHub Copilot — mỗi cái một integration riêng nếu làm thủ công.
- Mục tiêu của section sau bài này: giúp bạn proficient in MCP — hiểu under the hood, biết dùng MCP servers và tự build MCP servers.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) định nghĩa MCP là open standard kết nối AI applications với external systems (data sources, tools, workflows), ví như "USB-C port for AI applications".
- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) xác nhận mô hình client-server: MCP host (Claude Code, Claude Desktop, VS Code, Cursor...) tạo một MCP client cho mỗi MCP server; local dùng stdio, remote dùng Streamable HTTP. Kiểm chứng ngày 2026-09-17.
- [LangChain Agents](https://docs.langchain.com/oss/python/langchain/agents) xác nhận khái niệm Agent = Model + Harness, tools được đưa vào lúc build — khớp với cách transcript mô tả agent + tools.
- Trạng thái: nội dung transcript **vẫn đúng**, không có gì lỗi thời ở mức khái niệm.

> **Hộp cập nhật:** transcript kể tên các AI code assistants (Cursor, Windsurf, Lovable, Bolt, Copilot) như ví dụ. Danh sách host hỗ trợ MCP hiện đã rộng hơn nhiều (Claude, ChatGPT, VS Code, Cursor... theo docs intro). Giữ nguyên ví dụ gốc của giảng viên.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Bài toán | Mỗi agent cần một integration riêng cho cùng một chức năng |
| Chi phí | Viết lại N lần cho N agents |
| Giải pháp | MCP: một lớp trừu tượng, implement một lần vào MCP server |
| Kết quả | Mọi agent hỗ trợ protocol đều dùng được, không thêm logic |
| Động lực lan tỏa | Càng nhiều người dùng, càng nhiều servers, giá trị càng lớn |

**Một câu chốt:** MCP giải bài toán N integrations bằng cách chuẩn hóa một điểm kết nối duy nhất giữa chức năng và mọi AI agent.

## 6. Câu hỏi tự kiểm tra

1. Vì sao agent gửi được Slack/email/DB vẫn chưa đủ khi muốn chia sẻ cho người khác?
2. Chi phí của cách làm thủ công khi muốn hỗ trợ N agents là gì?
3. MCP áp dụng nguyên tắc nào của computer science?
4. Vì sao transcript ví MCP với social media?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì code được viết tailor-made cho một agent (ví dụ Cursor). Người ở agent khác (ví dụ Windsurf) muốn dùng lại chức năng đó thì phải viết integration riêng.

**2.** Phải viết lại integration N lần, mỗi agent một lần — giảng viên gọi là viết cả nghìn integrations.

**3.** Thêm một lớp trừu tượng: tích hợp một lần vào MCP server, mọi agent hỗ trợ protocol đều kết nối được.

**4.** Vì giá trị đến từ số đông: càng nhiều người dùng và càng nhiều MCP servers được tạo ra thì flywheel giá trị càng lớn, possibilities are endless.

</details>

## 7. Bước tiếp theo

Bài 126 — *Theory How LLMs REALLY Use Tools Understanding Tool Calling* — quay về gốc: LLM thực chất chỉ sinh token, còn tool calling hoạt động ra sao.

Nguồn: transcript gốc `125 - Theory Why MCP Model Context Protocol.md`; [modelcontextprotocol.io intro](https://modelcontextprotocol.io/docs/getting-started/intro); [architecture](https://modelcontextprotocol.io/docs/learn/architecture).
