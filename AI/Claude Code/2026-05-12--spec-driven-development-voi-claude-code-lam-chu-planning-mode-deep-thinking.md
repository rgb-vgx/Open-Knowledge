---
title: 'Spec-Driven Development Với Claude Code: Làm Chủ Planning Mode &amp; Deep
  Thinking'
date: '2026-05-12 15:49:23'
date_gmt: '2026-05-12 08:49:23'
modified: '2026-05-12 15:49:23'
status: publish
slug: spec-driven-development-voi-claude-code-lam-chu-planning-mode-deep-thinking
wordpress_id: 767
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/spec-driven-development-voi-claude-code-lam-chu-planning-mode-deep-thinking/
categories:
- Claude Code
tags: []
---

Bài học này đánh dấu sự chuyển đổi tư duy cốt lõi khi làm việc với AI: từ việc sử dụng AI như một "Junior Dev chỉ biết gõ code" sang việc dùng AI như một "Senior/Staff Engineer thiết kế hệ thống". Chúng ta sẽ tìm hiểu tính năng **Planning Mode (Chế độ lập kế hoạch)** kết hợp với **Deep Thinking (Suy luận sâu)** để áp dụng phương pháp *Spec-Driven Development (Lập trình hướng đặc tả)*, giúp kiểm soát hoàn toàn vòng đời phát triển phần mềm bằng AI.

## Vấn đề thực tế (Pain Point)

- **Hội chứng "Runaway AI" (AI mất kiểm soát):** Nếu bạn từng dùng các công cụ AI Coding, bạn chắc chắn đã gặp cảnh này: Bạn chỉ yêu cầu *"Thêm một nút bấm"*, nhưng AI quyết định refactor luôn toàn bộ hệ thống Routing của bạn, xóa mất vài file cấu hình, và làm sập app.
- **"Bắn trước, ngắm sau" (Shoot first, aim later):** Các Agent mặc định luôn khao khát được "Action" (Hành động). Nó thường lao vào gọi tool `edit_file` ngay khi mới đọc lướt qua yêu cầu, dẫn đến việc sửa code bị chắp vá, sinh ra vô số bugs (ảo giác/hallucinations) vì thiếu cái nhìn tổng thể.
- *Giải pháp:* Cần một ranh giới vật lý cô lập giai đoạn "Phân tích" và giai đoạn "Thực thi".

## Khái niệm cốt lõi

- **Planning Mode:** *(Bổ sung từ tài liệu chính thức: Có thể kích hoạt bằng phím tắt UI, gõ `/plan`, hoặc chạy cờ `claude -p` từ terminal).* Đây là một **Read-only Sandbox (Hộp cát chỉ đọc)**. Trong mode này, AI bị tước quyền ghi. Nó chỉ được phép đọc file, tìm kiếm (grep), gọi MCP lấy docs, và lập kế hoạch.
- **Deep Thinking (Extended Chain-of-Thought):** Một cơ chế ép LLM sử dụng nhiều token hơn và thời gian lâu hơn để "suy nghĩ" (`<thinking>`) trước khi đưa ra câu trả lời. Nó khám phá nhiều nhánh logic trong không gian ẩn (latent space) của mô hình để tìm ra giải pháp tối ưu nhất, thay vì giải pháp đầu tiên nó nghĩ ra.
- **Spec-Driven Development (SDD):** Phương pháp phát triển bắt đầu bằng việc viết một bản Đặc tả kỹ thuật (Specification/Spec) cực kỳ chi tiết, sau đó mới dùng bản Spec này làm "hành lang pháp lý" (Context bound) để AI/Dev viết code.

## Claude Code hoạt động như thế nào? (Abstractions & State Machine)

Claude Code abstract quy trình này bằng một **State Machine (Máy trạng thái)** với 2 pha rõ rệt:

1. **Phase 1: Planning (Read-only State)**
   - *Tools được phép:* `read_file`, `grep`, `mcp_call` (chỉ các hàm get/read), `tavily_search`.
   - *Tools bị cấm (Hard-blocked):* `bash` (chạy lệnh hệ thống), `edit_file`, `create_file`, `github_push`.
   - *Output:* Trả về text thuần túy (Markdown Spec) ra Standard Output.
2. **Phase 2: Execution (Write State)**
   - Chỉ xảy ra khi bạn gõ "Yes" (Approve) hoặc ra lệnh `auto-accept`. Claude Code chuyển đổi trạng thái (State transition), mở khóa bộ tools thực thi, nạp file Spec vừa tạo vào System Prompt, và bắt đầu tiến trình sinh code.

## Demo / Flow trong bài học

1. **Khởi động Plan Mode:** Instructor yêu cầu Claude tạo một Spec cho tính năng "Hooks".
2. **Research & Draft:** Claude tự động gọi tool tìm kiếm docs về "Hooks", phân tích, và in ra một bản Spec thô.
3. **Refinement (Tinh chỉnh) & Deep Thinking:** Instructor không hài lòng (không thích dùng UI Carousel, thiếu event hooks). Anh từ chối việc sinh code (chọn "No"), và yêu cầu AI: *"Hãy nghĩ sâu hơn (Think harder) và sửa lại"*.
4. **Deep Thinking kích hoạt:** Giao diện hiển thị quá trình AI đang "vật lộn" suy nghĩ. Nó duyệt lại toàn bộ danh sách event hooks, thiết kế lại UI dạng Cards.
5. **Dump to File:** Khi bản Spec đã hoàn hảo, Instructor không cho phép Claude code ngay. Anh yêu cầu Claude lưu bản Spec này thành một file Markdown (`.claude/feature_spec.md`). File này sau đó được commit vào Git để dùng làm Context cố định cho Subagents ở các bước sau.

## Phân tích kỹ thuật

### 1. Context Scoping (Giới hạn ngữ cảnh)

Lợi ích lớn nhất của Spec-Driven Development là **Giảm nhiễu trọng số (Scoping down LLM weights)**.

Khi bạn thả một AI vào một codebase 100,000 dòng code với một prompt mơ hồ, xác suất sinh ảo giác (hallucination) cực cao vì không gian tìm kiếm quá rộng. Một file Spec chi tiết đóng vai trò như một bộ lọc (Filter), khóa chặt hướng suy luận của LLM vào các function, file, và chuẩn mực cụ thể đã được chốt.

### 2. Prompt Engineering qua "Think Harder"

Trong các mô hình như Claude 3.7 Sonnet (được tối ưu cho Agentic coding), việc bạn nói "Think harder" thực chất là đang kích hoạt cơ chế sinh `Extended Chain of Thought`. Mô hình sẽ tự động sinh ra hàng ngàn token nội bộ (không hiển thị hết cho bạn) để tranh luận với chính nó: *"Nếu dùng Carousel thì sao? Thể hiện bao nhiêu cards? Hook 'after\_generation' có hợp lệ không?"* trước khi chốt hạ kết quả cuối cùng.

### 3. Execution Flow: Tách biệt Strategy và Implementation

Kiến trúc này phản ánh chính xác mô hình **MVC (Model-View-Controller)** trong việc quản lý dự án:

- *Model/Strategy:* Bản Spec (làm cái gì).
- *Controller/Orchestrator:* Dev (người duyệt Spec).
- *View/Implementation:* Code thực thi (làm như thế nào).

## Ví dụ thực tế (Workflow Engineering)

Giả sử bạn cần thực hiện một **Database Migration** phức tạp (đổi kiểu dữ liệu của một cột có hàng triệu records đang chạy live).

- **Không dùng Planning Mode:** Bạn bảo Claude: "Đổi cột A từ Int sang String". Nó lao vào sửa file ORM, chạy lệnh `ALTER TABLE` thẳng trên Terminal, và làm lock database Production.
- **Có dùng Planning Mode:**
  1. Bạn bật `/plan`. Yêu cầu viết Spec.
  2. Claude đọc file DB Schema, đọc code phần API gọi tới cột A.
  3. Trả về Spec: *"Cần làm 3 bước: 1. Tạo cột A\_new kiểu String. 2. Viết script sync data từ A sang A\_new chạy ngầm. 3. Đổi API đọc/ghi sang A\_new. Đã tìm thấy 5 file bị ảnh hưởng."*
  4. Bạn duyệt Spec, lưu thành `migration_plan.md`. Sau đó mới cho Agent thực thi từng bước một.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Tính an toàn** | Cô lập rủi ro. AI không thể tự phá code (0 side-effects) khi đang ở Plan Mode. | **Time-to-first-byte:** Mất thời gian để lấy được dòng code đầu tiên. Không phù hợp cho các task sửa lỗi typo hay CSS nhỏ lẻ tốn 5 giây. |
| **Chất lượng kiến trúc** | Tránh được Technical Debt (Nợ kỹ thuật) vì mọi thứ được quy hoạch trước. | Đòi hỏi Dev phải có kỹ năng Review/Architect tốt để biết bản Spec AI sinh ra là đúng hay sai. |
| **Deep Thinking** | Xử lý được các bài toán logic hệ thống cực kỳ phức tạp. | **Chi phí (Cost/Latency):** Đốt rất nhiều token. Giai đoạn Deep Thinking có thể mất vài phút chờ đợi và tốn chi phí API đáng kể. |

## So sánh với công cụ khác

- **Cursor (Composer Mode):** Cursor cũng có tính năng Composer giúp tạo nhiều file, nhưng thường nó vẫn gộp chung pha "nghĩ" và pha "viết" vào làm một. Dev ít có cơ hội can thiệp vào giữa chừng trừ khi bấm "Reject" toàn bộ.
- **OpenAI o1 / o3-mini:** Các mô hình này có Deep Thinking mặc định. Tuy nhiên, Claude Code ưu việt hơn nhờ việc định nghĩa rạch ròi một **chế độ Read-only (Planning Mode)** ở cấp độ CLI/System thay vì chỉ phụ thuộc vào Model API.

## Những điều quan trọng cần nhớ

- **Plan Mode là một Read-only Sandbox.** Dùng nó để nghiên cứu codebase và thiết kế hệ thống.
- Luôn yêu cầu AI **Dump (Lưu) bản Spec ra một file `.md` vật lý** trước khi bắt đầu code. File này là tài sản (Context Memory) quý giá nhất của dự án.
- "Deep Thinking" (Think harder) tốn tiền và thời gian, nhưng là vũ khí bắt buộc khi đối mặt với các bài toán thay đổi kiến trúc hạ tầng (Infrastructure) hoặc Refactor diện rộng.
- Hãy dừng tư duy "Viết prompt để ra code". Bắt đầu tư duy "Viết prompt để ra bản thiết kế (Spec), rồi dùng bản thiết kế đó để sinh ra code".

## Góc nhìn dành cho BE Developer

Trong thế giới Backend, Planning Mode chính là hiện thân của quy trình viết **RFC (Request for Comments) / Design Document** kinh điển tại các Big Tech.

Khi thiết kế một Microservice mới, một Senior BE sẽ không bao giờ mở IDE lên gõ code ngay. Họ sẽ viết một file Google Doc phân tích: Data model là gì? API endpoints ra sao? Rate limit thế nào? Sequence diagram giữa các service?

Bằng cách sử dụng Planning Mode của Claude Code, bạn đang thuê một "Staff Engineer ảo" để đi rà soát lại toàn bộ repo hiện tại, đối chiếu với các dependency, và soạn sẵn cái RFC đó cho bạn. Việc của bạn (với tư cách là Tech Lead) chỉ là review cái RFC (Spec file) đó, chỉnh sửa (Think harder), rồi duyệt cho nó làm. Đó mới là sức mạnh thực sự của AI Orchestration.

## Từ khóa / Thuật ngữ (Glossary)

- **Spec-Driven Development (SDD):** Quy trình phát triển phần mềm dựa trên các bản đặc tả (specifications) cực kỳ chi tiết được chốt trước khi viết bất kỳ dòng code nào.
- **Planning Mode:** Chế độ vận hành của AI Agent trong đó nó bị tước quyền ghi (Write permission), chỉ được quyền đọc và phân tích hệ thống.
- **Deep Thinking / Chain of Thought:** Cơ chế yêu cầu AI mở rộng quá trình suy luận nội bộ, khám phá nhiều giải pháp, xem xét các edge-cases trước khi đưa ra câu trả lời cuối cùng.
- **Side-effect (Tác dụng phụ):** Trong bối cảnh Agent, đây là việc thực thi một tool làm thay đổi trạng thái của hệ thống (sửa file, xóa DB, commit Git).
- **State Machine (Máy trạng thái):** Mô hình toán học của tính toán, trong đó hệ thống luôn ở một trong các trạng thái hữu hạn tại một thời điểm (VD: Trạng thái Planning vs Trạng thái Execution).
