---
title: Phục Hồi Ngữ Cảnh Với CLAUDE.md Và Thiết Lập Luồng Tự Động Code Review (AI
  Duyệt AI)
date: '2026-05-12 15:38:20'
date_gmt: '2026-05-12 08:38:20'
modified: '2026-05-12 15:38:20'
status: publish
slug: phuc-hoi-ngu-canh-voi-claude-md-va-thiet-lap-luong-tu-dong-code-review-ai-duyet-ai
wordpress_id: 765
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/phuc-hoi-ngu-canh-voi-claude-md-va-thiet-lap-luong-tu-dong-code-review-ai-duyet-ai/
categories:
- Claude Code
tags: []
---

## Bài học này nói về gì?

Tiếp nối sự cố "chữa lợn lành thành lợn què" ở bài trước, bài học này tập trung vào cách "vá" lỗ hổng ngữ cảnh bằng lệnh `/init` để tạo file `CLAUDE.md` (Project Memory). Sau khi cấu hình xong, chúng ta kích hoạt lại Agent trên GitHub Issue, can thiệp vào tiến trình của nó theo thời gian thực (Human-in-the-loop), và chứng kiến một kiến trúc CI/CD hoàn chỉnh: Một Agent viết code tạo Pull Request, và một Agent khác tự động nhảy vào Review đoạn code đó.

## Vấn đề thực tế (Pain Point)

1. **Hội chứng "Mất trí nhớ cục bộ" của AI:** Một LLM dù thông minh đến đâu, khi thả vào một codebase hàng ngàn file, nó vẫn bị "mù" về quy chuẩn coding, kiến trúc thư mục, hay các API Contract nội bộ. Nếu không có "bản đồ", nó sẽ phá code.
2. **Sự cô lập của tiến trình ngầm (Blackbox Execution):** Khi Agent chạy trên GitHub Actions, nó là một hộp đen. Nếu nó đang đi sai hướng (như chuẩn bị sửa sai file), làm sao developer có thể "phanh" nó lại trước khi nó tốn token và tạo ra một Pull Request rác?
3. **Thiếu cơ chế kiểm soát chéo:** Nếu AI tự viết code rồi tự merge, rủi ro sập hệ thống là 100%.

## Khái niệm cốt lõi

- **Lệnh `/init` (Project Initialization):** *(Bổ sung từ tài liệu chính thức)* Đây là lệnh CLI dùng để quét toàn bộ codebase, nhận diện ngôn ngữ lập trình, framework, cấu trúc thư mục, và tự động đúc kết thành file `CLAUDE.md` đóng vai trò là System Prompt mặc định cho toàn bộ dự án.
- **Granular Permissions (Cấp quyền chi tiết):** Cơ chế lưu trữ trạng thái phê duyệt (Yes/Always) vào file `settings.local.json`. Nó cho phép Agent nhớ rằng bạn đã cho phép nó chạy lệnh `bash` hoặc `ls`, giúp luồng làm việc không bị gián đoạn.
- **Human-in-the-loop (HITL) qua Markdown UI:** Khả năng giao tiếp ngược giữa hệ thống Agent đang chạy ngầm và con người thông qua việc check/uncheck các ô To-Do list trên GitHub Issue.
- **Maker vs. Checker Architecture:** Một mẫu thiết kế (Design Pattern) kinh điển. Cần có sự tách biệt rạch ròi giữa thực thể tạo ra thay đổi (Claude giải quyết Issue) và thực thể đánh giá thay đổi (Claude chạy Code Review trên PR).

## Claude Code hoạt động như thế nào? (Abstractions & Workflow)

Claude Code abstract đi những khó khăn trong việc quản lý State và Orchestration:

1. **Bootstrap Context:** Khi chạy lệnh `/init`, Agent đóng vai trò như một Scraper, tự động dùng các file system tools để đọc lướt mã nguồn, sau đó tóm tắt kiến trúc dự án và lưu vào `CLAUDE.md`.
2. **Stateful UI Syncing:** Khi chạy trên GitHub, Claude Code sử dụng API của GitHub để render luồng suy nghĩ (Thought process) thành Markdown Checkboxes. Nếu Developer tick vào một ô đang chờ (Pending), Agent ở dưới backend nhận được Webhook update, nó lập tức cập nhật lại Context Window và bỏ qua/chuyển hướng bước đó mà không bị crash.
3. **Pipeline Interception:** Khi PR được tạo, quy trình review không phải do con AI vừa viết code thực hiện. Một GitHub Workflow độc lập (`cloud-code-review.yml`) sẽ được trigger. Nó spin up một phiên bản Agent mới hoàn toàn, cấp cho nó Context là file Diff của PR, và yêu cầu nó đóng vai trò là "Senior Reviewer" để kiểm tra tính an toàn.

## Demo / Flow trong bài học

1. **Khởi tạo bộ nhớ (Project Memory):** Instructor dùng Cursor mở dự án ở Local, chạy lệnh `/init` bằng CLI của Claude Code.
2. **Approve Permissions:** Instructor liên tục cấp quyền cho Claude được liệt kê file, đọc file bash. Mọi sự cho phép này được lưu vào `settings.local.json`.
3. **Commit `CLAUDE.md`:** Instructor yêu cầu AI tự tạo commit và push file `CLAUDE.md` lên GitHub.
4. **Tái kích hoạt (Retry):** Instructor quay lại Issue trên GitHub, tag `@claude-code` một lần nữa, kèm theo một **hint (gợi ý nhỏ)**: *"Chú ý sửa trong hàm icebreaker\_with"*.
5. **Dynamic Interruption (Can thiệp động):** Trong lúc Agent lên To-do list và đang chạy, Instructor chủ động **click vào một Checkbox** trên GitHub UI vì không muốn nó chạy bước đó. Agent nhận diện tín hiệu và cập nhật luồng on-the-fly (tức thời).
6. **Tạo PR & Auto-Review:** Agent đổi đúng tên biến thành `linkedin_url` và tạo Pull Request. Ngay lập tức, Pipeline `Claude Code Review` chạy, phân tích Diff, báo cáo không có bug (nhưng nhắc nhở thiếu Unit Test), và Approve PR. Cuối cùng, Instructor nhấn Merge.

## Phân tích kỹ thuật

### 1. Context Handling: Sự kỳ diệu của `CLAUDE.md`

`CLAUDE.md` không phải là file tài liệu (Documentation) dành cho người. Nó là **Machine-Readable System Prompt**.

Thay vì phải nhét 10,000 tokens mô tả dự án vào mỗi lần chat, file này ép Agent phải tự thiết lập một *Bias (Định kiến)* trước khi suy luận: "Dự án này viết bằng Python, cấu trúc thư mục A, nguyên tắc B". Đây là nền tảng để Agent có được "Domain Knowledge".

### 2. Execution Flow: Real-time UI Interruption

Làm sao thao tác click chuột trên trình duyệt lại tác động đến Agent đang chạy trên máy chủ ảo (GitHub Runner)?

Bản chất Agent chạy một vòng lặp `while(true)`. Ở mỗi chu kỳ, thay vì chỉ tập trung suy luận bước tiếp theo, Claude Code SDK có một tiến trình phụ (side-car) liên tục pull (hoặc nhận webhook) trạng thái của cái comment trên GitHub. Khi state của checkbox đổi từ `[ ]` sang `[x]`, Agent tiêm (inject) một thông điệp "User đã can thiệp" vào LLM Context, ép LLM phải lập kế hoạch lại (Re-planning).

### 3. Architecture: Sự tách biệt của Pipeline Code Review

Việc Claude duyệt code của chính Claude không phải là "vừa đá bóng vừa thổi còi" nếu bạn hiểu đúng kiến trúc.

- **Maker Agent (Giải quyết Issue):** Mang Context tập trung vào việc *sửa lỗi* và *đạt mục tiêu*. Nó dễ sinh ra ảo giác bỏ qua các quy tắc bảo mật.
- **Checker Agent (Review PR):** Là một tiến trình (Process) hoàn toàn tách biệt, được khởi tạo với một System Prompt khác hẳn: *"Ngươi là Security Auditor. Hãy tìm lỗ hổng"*. Sự đối lập về Prompt (Adversarial Prompting) tạo ra cơ chế kiểm soát chéo cực kỳ hiệu quả.

## Ví dụ thực tế (Workflow Engineering cho hệ thống lớn)

Hãy tưởng tượng hệ thống Backend Payment của bạn cần thêm cổng thanh toán Momo.

1. **Maker Agent:** Bạn tag Claude vào Issue. Nhờ `CLAUDE.md` quy định "Luôn áp dụng Clean Architecture", Agent tự động tạo các layer `Repository`, `Usecase`, `Delivery` cho Momo thay vì nhét hết code vào 1 file Controller.
2. **Human-in-the-loop:** Agent in ra To-do list. Bạn thấy nó định tạo bảng DB mới, bạn tick hủy bước đó và comment thêm: "Dùng lại bảng `payments` cũ". Agent tự quay xe.
3. **Checker Agent:** Khi PR mở, `Claude Code Reviewer` quét qua và phát hiện: *"Cảnh báo: Bạn đang log `transaction_id` dạng plaintext ra console. Vi phạm luật bảo mật PCI-DSS được ghi trong `CLAUDE.md`."* Nó reject PR và bắt Maker Agent sửa lại.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Bảo lưu Context** | `/init` giúp tạo cấu hình nhanh chóng. `CLAUDE.md` đi theo repo, mọi developer đều được lợi. | File `CLAUDE.md` có thể bị lỗi thời (Outdated) nếu cấu trúc dự án thay đổi lớn mà dev quên không chạy lại `/init`. |
| **Giao tiếp UI** | Tương tác trực quan qua GitHub Checkboxes, không cần vào terminal gõ lệnh. Tăng trải nghiệm User (UX). | Phụ thuộc vào tốc độ Webhook của GitHub. Nếu mạng lag, Agent có thể chạy lố qua bước bạn định hủy. |
| **AI Review Code** | Chạy 24/7, phát hiện lỗi syntax, lỗi logic cơ bản siêu nhanh. Đánh giá khách quan. | **AI Blindspot (Điểm mù):** Nếu cả 2 Agent đều dùng chung model (VD: Sonnet 3.5), chúng có thể có chung một điểm mù tư duy và cùng bỏ qua một lỗi logic phức tạp. Đôi khi reviewer nhắc nhở những thứ hiển nhiên nhưng lại bỏ qua lỗi Architecture. |

## So sánh với công cụ khác

- **Cursor `.cursorrules`:** Tính năng hoàn toàn tương tự `CLAUDE.md`. Tuy nhiên `.cursorrules` chỉ ảnh hưởng trong phạm vi IDE Cursor ở máy Local, còn `CLAUDE.md` được hệ thống CI/CD của Anthropic đọc và hiểu khi chạy trên Cloud (GitHub Actions).
- **SonarQube / CodeQL (Công cụ phân tích tĩnh):** Các linter truyền thống dựa trên Ruleset cứng (Regex/AST). Chúng bắt lỗi cú pháp tốt nhưng không hiểu logic nghiệp vụ. Claude Code Review phân tích dựa trên *Ngữ nghĩa (Semantic Analysis)*, có thể phát hiện lỗi logic thiết kế (ví dụ: thiếu transaction block trong DB). Kết hợp cả hai là tốt nhất.

## Những điều quan trọng cần nhớ

- **Tuyệt đối không sử dụng Agent trên codebase lớn nếu chưa có `CLAUDE.md` (hoặc cấu hình tương đương).**
- **Lệnh `/init` là bước số 0.** Trước khi làm bất cứ điều gì với Claude Code, hãy chạy lệnh này để nó hiểu nhà của bạn trước.
- **Tận dụng Checkboxes:** Hãy coi cái To-Do list của Agent trên GitHub Issue như một bảng điều khiển (Control Panel). Đừng ngồi nhìn nó chạy sai, hãy can thiệp.
- **AI Review không thay thế Test:** Như Claude đã nhắc nhở trong video, dự án thiếu Unit Test. AI Reviewer chỉ dò lỗi bằng mắt (LLM inference), Unit Test mới đảm bảo code thực thi đúng.

## Góc nhìn dành cho Backend Developer

Dưới góc độ thiết kế hệ thống, mô hình **Maker - Checker** mà bạn vừa thấy là nền tảng của các kiến trúc **Asynchronous Orchestration** (Điều phối bất đồng bộ).

Trong hệ thống tài chính/ngân hàng, một giao dịch lớn luôn cần 1 người tạo lệnh (Maker) và 1 người duyệt lệnh (Checker) để chống gian lận (Segregation of Duties).

Với AI cũng vậy. Việc thiết lập 2 Workflow YAML riêng biệt (một cái bắt sự kiện `issue_comment`, một cái bắt sự kiện `pull_request`) đảm bảo rằng State và Memory của hai quá trình này bị cô lập vật lý trong 2 Runner khác nhau. Điều này chứng minh rằng, để AI an toàn trên Production, chúng ta phải dùng System Design để bao bọc AI, chứ không phải giao phó toàn quyền cho một "Siêu Trí Tuệ" duy nhất.

## Từ khóa / Thuật ngữ (Glossary)

- **Project Memory:** Bộ nhớ dự án, là tệp tin chứa định hướng, cấu trúc, và nguyên tắc viết code của một Repository, giúp AI duy trì nhận thức xuyên suốt.
- **Human-in-the-loop (HITL):** Mẫu thiết kế hệ thống AI trong đó con người giữ vai trò giám sát, có thể can thiệp, đánh giá hoặc chặn lại quyết định của AI theo thời gian thực.
- **Maker vs. Checker (Người làm - Người duyệt):** Nguyên tắc bảo mật phân quyền. Yêu cầu hai cá thể độc lập thực hiện và kiểm tra một hành động nhạy cảm để giảm thiểu lỗi và gian lận.
- **On-the-fly (Tức thời):** Thực hiện một thay đổi hoặc tính toán ngay trong quá trình một chương trình đang chạy mà không cần phải dừng, biên dịch hay khởi động lại nó.
- **Linter:** Công cụ phân tích mã nguồn tĩnh dùng để đánh dấu các lỗi lập trình, lỗi cú pháp, vi phạm phong cách viết code.
