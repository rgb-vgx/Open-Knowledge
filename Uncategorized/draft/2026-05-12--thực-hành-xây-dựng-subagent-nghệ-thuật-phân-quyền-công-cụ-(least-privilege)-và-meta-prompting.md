---
title: 'Thực Hành Xây Dựng Subagent: Nghệ Thuật Phân Quyền Công Cụ (Least Privilege)
  Và Meta-Prompting'
date: '2026-05-12 16:24:12'
date_gmt: '0000-00-00 00:00:00'
modified: '2026-05-12 16:24:12'
status: draft
slug: thực-hành-xây-dựng-subagent-nghệ-thuật-phân-quyền-công-cụ-(least-privilege)-và-meta-prompting
wordpress_id: 776
author: maithuyetedu
original_url: https://com994947723.wordpress.com/?p=776
categories:
- Uncategorized
tags: []
---

## Bài học này nói về gì?

Chuyển từ lý thuyết sang thực hành, bài học này hướng dẫn từng bước (step-by-step) cách khởi tạo một Subagent mới thông qua giao diện dòng lệnh (CLI Wizard) của Claude Code. Tâm điểm của bài học không chỉ là việc tạo ra một "Chuyên gia Review Code vui tính", mà là cách ứng dụng kỹ thuật **Meta-prompting** (dùng AI viết prompt cho AI) và cơ chế **Tool Whitelisting** (Danh sách trắng công cụ) để định hình ranh giới an toàn cho Agent.

## Vấn đề thực tế (Pain Point)

1. **Khó khăn khi thiết kế Prompt:** Viết một System Prompt tốt cho Agent là một môn nghệ thuật. Nếu tự viết tay từ đầu, dev thường viết quá ngắn, thiếu định dạng (formatting) chuẩn, khiến Agent hoạt động kém hiệu quả.
2. **Rủi ro bảo mật từ "Full Access":** Nếu tự tạo file `.md` thủ công, kỹ sư rất dễ quên khai báo trường `tools`, dẫn đến việc Subagent mặc định có **toàn quyền (all tools)**. Một Agent làm nhiệm vụ Review Code tuyệt đối không được phép có quyền `bash` hay `edit_file` vì nó có thể vô tình sửa code hỏng hoặc tự ý chạy lệnh hệ thống.
3. **Lỗi cấu hình (Syntax Error):** Việc cấu hình sai file Markdown/JSON sẽ làm sập quá trình parse (phân tích cú pháp) của Agent Loop.

*Giải pháp:* Claude Code cung cấp lệnh `/agents` với giao diện tương tác CLI (Wizard) để abstract hóa toàn bộ sự phức tạp này.

## Khái niệm cốt lõi

- **CLI Agent Wizard:** Trình hướng dẫn cấu hình Agent từng bước trên Terminal. Nó tự động chuyển đổi các lựa chọn của bạn (Yes/No, Select box) thành file định nghĩa `.md` chuẩn xác.
- **Meta-prompting:** Kỹ thuật sử dụng một phiên bản LLM (Ví dụ: một tab Claude Web độc lập) để phân tích yêu cầu thô của con người và mở rộng nó thành một System Prompt chuyên nghiệp, cấu trúc rõ ràng để nạp vào cho một LLM khác (Subagent).
- **Tool Whitelisting (Danh sách trắng công cụ):** Cơ chế bảo mật chỉ cho phép (explicitly allow) các công cụ được liệt kê. Bất kỳ công cụ nào không có tên trong danh sách sẽ bị từ chối truy cập (Hard-blocked).
- **Activation Triggers (Từ khóa kích hoạt):** Những cụm từ đặc biệt được nhúng vào phần `Description` (Mô tả) của Subagent để làm tín hiệu định tuyến (Routing signal) cho Main Agent.

## Claude Code hoạt động như thế nào? (Workflow & Abstractions)

*(Bổ sung từ tài liệu chính thức)*:

1. **State Machine của CLI:** Khi bạn gõ `/agents` -> Chọn tạo mới, Claude Code khởi động một cỗ máy trạng thái (State Machine) thu thập 5 tham số: *Description (Mô tả) -> System Prompt -> Tools -> Model -> Color (Màu hiển thị UI)*.
2. **Abstraction của JSON Schema:** Ở bước chọn Tools, bạn chỉ việc dùng phím Space để tích chọn `read_file`, `grep`, `mcp_context7`. Ở backend, Claude Code sẽ ánh xạ (map) các lựa chọn này thành các mảng chuỗi (string arrays) chuẩn xác để lưu vào Markdown Header.
3. **File Generation:** Kết thúc wizard, hệ thống tự động sinh ra một file vật lý (VD: `funny_reviewer.md`) tại thư mục `.claude/agents/` (nếu chọn Project scope). Từ giây phút này, file `.md` đó trở thành một "Plugin" chính thức được nạp vào bộ nhớ của Main Agent ở mọi phiên làm việc tiếp theo trong dự án.

## Demo / Flow trong bài học

1. **Khởi động:** Instructor gõ `/agents` và chọn tạo Subagent ở cấp độ `Project` (để có thể commit lên Git).
2. **Nhập Description & Trigger:** Cung cấp một mô tả ngắn chứa từ khóa kích hoạt: *"Use this agent when you get an input like 'funny review'"*.
3. **Meta-prompting (Trick cực hay):**
   - Instructor nhận ra System Prompt mình tự nghĩ ra quá tệ.
   - Anh mở một cửa sổ Claude Web khác, copy prompt cũ vào và ra lệnh: *"Hãy làm cho cái System Prompt cho Subagent này tốt hơn"*.
   - Claude Web sinh ra một Prompt cực kỳ chi tiết, có định dạng rõ ràng. Anh copy nó dán ngược lại vào CLI.
4. **Phân quyền (Least Privilege):** Ở màn hình chọn Tool, anh bỏ check "All tools". Bật "Advanced options" và **chỉ chọn các tool chỉ đọc (Read-only)** như: `grep`, `ls`, `read_file`, và `mcp_context7`. Bỏ qua hoàn toàn lệnh `bash` và `edit`.
5. **Hoàn tất:** Chọn Model thực thi là `Claude 3.5 Sonnet` (Cân bằng giữa hiệu năng và chi phí), chọn màu hiển thị (Yellow), và lưu file.

## Phân tích kỹ thuật

### 1. Kiến trúc định tuyến (Routing Architecture) qua Activation Triggers

Làm sao Main Agent biết lúc nào nên gọi con "Funny Reviewer"?

Đó là nhờ dòng chữ: *"Use this agent when you get an input like 'funny review'"* nằm ở Header của file.

Đây là kỹ thuật **Semantic Routing (Định tuyến ngữ nghĩa)**. Khi bạn gõ ở Terminal: *"Hãy cho tôi một funny review file `api.ts`"*, Main Agent đọc câu này, đối chiếu với mô tả của tất cả các Subagents, tính toán độ tương đồng (Similarity), và quyết định "Pass" (Chuyển giao) công việc cho Subagent tương ứng.

### 2. Bảo mật ở cấp độ LLM (Tool Whitelisting)

Việc ép Subagent chỉ dùng công cụ Read-only là lớp bảo vệ (Guardrail) mang tính hệ thống.

Ngay cả khi LLM bị "ảo giác" (Hallucinate) và cố tình sinh ra một đoạn JSON yêu cầu thực thi lệnh `bash "rm -rf /"`, thì Claude Code SDK (chạy ở Local) sẽ chặn đứng request này trước khi nó chạm vào hệ điều hành, vì lệnh `bash` không nằm trong mảng `Tools` của file `.md`.

### 3. Model Selection

Tùy thuộc vào tác vụ, bạn có thể thiết lập Model khác nhau cho từng Subagent:

- *Task dễ (Grep log, Regex text):* Có thể chọn mô hình nhỏ, rẻ, nhanh (Haiku).
- *Task khó (Review Architecture, Code Generation):* Chọn mô hình lớn (Sonnet / Opus).Sự linh hoạt này giúp tối ưu hóa chi phí API (FinOps cho AI).

## Ví dụ thực tế (Workflow Engineering cho Backend)

**Xây dựng "Database Migration Auditor" (Kiểm toán viên DB):**

Bạn là BE Dev. Bạn thường xuyên viết các file `.sql` để migrate database.

- **Vấn đề:** Rất hay quên thêm `INDEX`, hoặc viết `DROP COLUMN` làm mất data.
- **Giải pháp tạo Subagent:**
  - *Name:* `db_auditor`
  - *Trigger:* "Kiểm tra file migrate"
  - *Tools:* `read_file`, `grep`. (TUYỆT ĐỐI CẤM `bash` để tránh nó tự chạy psql/mysql client).
  - *System Prompt:* "Ngươi là DBA khó tính. Phân tích file SQL. Nếu thấy lệnh ALTER TABLE mà không có CREATE INDEX đi kèm, hãy cảnh báo. Nếu thấy DROP, yêu cầu user xác nhận lại."Commit Agent này vào dự án. Từ nay về sau, cứ viết xong file SQL, bạn gọi AI review cực kỳ an toàn.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **CLI Wizard** | Trải nghiệm Dev (DX) tuyệt vời. Nhanh gọn, không sợ gõ sai cú pháp Markdown/JSON. Trực quan khi chọn tools. | Thiếu tính năng Preview (Xem trước file) hoặc Dry-run (Chạy thử) trước khi Save hoàn toàn. |
| **Tool Whitelisting** | Tối đa hóa bảo mật. Cách ly rủi ro (Sandboxing) cho từng Agent. | Nếu cấp thiếu Tool, Agent sẽ chạy thất bại (fail) và trả về lỗi không biết làm gì tiếp theo, buộc dev phải vào file `.md` sửa tay. |
| **Meta-Prompting** | Tiết kiệm chất xám cho kỹ sư. Prompt sinh ra có cấu trúc Semantic tốt hơn (có list, headers) giúp LLM Worker dễ hiểu hơn. | Cần phải dùng 2 màn hình / 2 tab, hơi ngắt quãng (context-switch) đối với luồng làm việc thuần Terminal. |

## So sánh với công cụ khác

- **OpenAI GPTs (Custom GPTs):** UI tạo GPTs của OpenAI trên web cũng tương tự, bạn mô tả và nó tự sinh System Prompt (sử dụng GPT-Builder). Tuy nhiên, Custom GPTs chạy trên môi trường Cloud đóng. Subagent của Claude Code được kết xuất ra file vật lý (`.md`), lưu trữ chung với Source Code (Infrastructure as Code) và chạy trực tiếp trên Local Machine của bạn.
- **LangChain / LlamaIndex:** Để cấp quyền Tool trong LangChain, bạn phải viết mã Python khởi tạo mảng `[ReadFileTool(), GrepTool()]` và pass vào `initialize_agent`. Việc này tốn hàng chục dòng code. Claude Code cấu hình chỉ bằng vài cái ấn phím Spacebar.

## Những điều quan trọng cần nhớ

- **Nguyên tắc Quyền hạn tối thiểu (Least Privilege) là bắt buộc.** Đừng bao giờ lười biếng tick chọn "All Tools" cho một Subagent. Agent Review chỉ cần đọc, Agent Coding mới cần ghi.
- **Đừng tự viết System Prompt dài ngoằng.** Hãy viết ý tưởng thô, quăng cho LLM mạnh nhất bạn có, và yêu cầu nó *"Viết lại thành System Prompt cho một AI Agent"*.
- File `.md` của Subagent sinh ra trong cấp `Project` nên được commit vào Git để đồng bộ cho toàn team.
- **Trigger Keyword** trong phần Description là cầu nối giao tiếp giữa bạn, Main Agent và Subagent. Hãy định nghĩa nó thật rõ ràng.

## Góc nhìn dành cho BE Developer

Quá trình cấu hình Tool cho Subagent trong bài học này giống hệt như quá trình bạn cấu hình **IAM Role (Identity and Access Management)** trên AWS hoặc GCP.

- Main Agent giống như **Root Account**.
- Subagent giống như một **IAM User / Service Account**.
- Khi bạn bỏ chọn lệnh `bash` và `edit_file`, bạn đang viết một IAM Policy: `{"Effect": "Deny", "Action": ["system:ExecuteBash", "fs:Write"]}`.Bằng cách tư duy thiết kế hệ thống AI theo định hướng Identity & Access (Quản lý Định danh & Quyền truy cập) ngay từ đầu, bạn sẽ xây dựng được những Agentic Workflow không chỉ thông minh mà còn đáp ứng các tiêu chuẩn bảo mật khắt khe nhất (Compliance) của môi trường doanh nghiệp.

## Từ khóa / Thuật ngữ (Glossary)

- **Meta-prompting:** Kỹ thuật sử dụng trí tuệ của AI để tự động thiết kế, tối ưu hóa hoặc mở rộng câu lệnh (prompt) dùng cho chính các hệ thống AI khác.
- **Tool Whitelisting (Danh sách trắng công cụ):** Một chiến lược bảo mật hệ thống máy tính, trong đó chỉ những công cụ, ứng dụng hoặc IP được liệt kê rõ ràng mới được phép hoạt động, mọi thứ khác đều bị chặn ngầm định.
- **Activation Trigger:** Từ khóa hoặc điều kiện ngữ cảnh đặc thù dùng để đánh thức và chuyển quyền điều khiển cho một đoạn mã hoặc một Subagent cụ thể.
- **Semantic Routing (Định tuyến ngữ nghĩa):** Quá trình điều hướng luồng dữ liệu hoặc request dựa trên ý nghĩa (meaning/intent) của câu lệnh thay vì dựa trên các URL hoặc Endpoint cố định.
- **IAM Role:** Khái niệm trong điện toán đám mây chỉ một tập hợp các quyền hạn (permissions) có thể được gán tạm thời cho một dịch vụ hoặc người dùng để thực thi các tác vụ cụ thể.
